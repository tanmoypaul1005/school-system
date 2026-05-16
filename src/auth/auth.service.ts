import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService,
  ) {}

  async register(payload: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    const passwordHash = await bcrypt.hash(payload.password, 10);

    let userId: string;

    if (existing) {
      if (existing.isEmailVerified) {
        throw new ConflictException('Email already registered');
      }

      const updated = await this.prisma.user.update({
        where: { id: existing.id },
        data: {
          password: passwordHash,
          name: payload.name ?? existing.name,
        },
      });

      userId = updated.id;
    } else {
      const created = await this.prisma.user.create({
        data: {
          email: payload.email,
          password: passwordHash,
          name: payload.name,
        },
      });

      userId = created.id;
    }

    const otp = this.generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await this.prisma.userOtp.create({
      data: {
        userId,
        codeHash: otpHash,
        expiresAt: this.getOtpExpiry(),
      },
    });

    await this.mailer.sendOtpEmail(payload.email, otp);

    return { message: 'OTP sent to email' };
  }

  async verifyOtp(payload: VerifyOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or OTP');
    }

    const otpRecord = await this.prisma.userOtp.findFirst({
      where: {
        userId: user.id,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      throw new BadRequestException('OTP expired or not found');
    }

    const isMatch = await bcrypt.compare(payload.otp, otpRecord.codeHash);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or OTP');
    }

    await this.prisma.userOtp.update({
      where: { id: otpRecord.id },
      data: { usedAt: new Date() },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true },
    });

    const token = await this.signToken(user.id, user.email, user.role);

    return { accessToken: token };
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || !user.isEmailVerified) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.signToken(user.id, user.email, user.role);

    return { accessToken: token };
  }

  private generateOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  private getOtpExpiry() {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    return expiresAt;
  }

  private signToken(userId: string, email: string, role: string) {
    return this.jwtService.signAsync({ sub: userId, email, role });
  }
}
