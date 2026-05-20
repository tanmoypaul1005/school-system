import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set for Prisma seed');
}

const pool = new Pool({
  connectionString: databaseUrl,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
