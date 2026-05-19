import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set for Prisma seed');
}

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
});

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const courses = Array.from({ length: 20 }, (_, index) => {
    const num = String(index + 1).padStart(3, '0');
    return {
      name: `Course ${index + 1}`,
      code: `CRS-${num}`,
    };
  });

  const teachers = Array.from({ length: 20 }, (_, index) => {
    const num = String(index + 1).padStart(2, '0');
    return {
      name: `Teacher ${index + 1}`,
      email: `teacher${num}@school.local`,
      password: passwordHash,
      role: Role.TEACHER,
      isEmailVerified: true,
    };
  });

  await prisma.course.createMany({
    data: courses,
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: teachers,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
