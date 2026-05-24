import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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
  const products = Array.from({ length: 200 }, (_, index) => {
    const num = String(index + 1).padStart(4, '0');
    const price = Number((Math.random() * 490 + 10).toFixed(2));
    const stock = Math.floor(Math.random() * 201);

    return {
      name: `Product ${index + 1}`,
      description: `Product ${index + 1} description`,
      sku: `PRD-${num}`,
      price,
      stock,
      isActive: Math.random() > 0.1,
    };
  });

  await prisma.product.createMany({
    data: products,
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
