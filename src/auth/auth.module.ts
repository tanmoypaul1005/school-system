import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret',
      signOptions: {
        expiresIn: getJwtExpiresIn(),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

function getJwtExpiresIn(): StringValue | number {
  const raw = process.env.JWT_EXPIRES_IN ?? '1h';
  return /^\d+$/.test(raw) ? Number(raw) : (raw as StringValue);
}
