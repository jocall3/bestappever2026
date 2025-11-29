import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Cleared existing data.');

  const saltRounds = 10;
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Seed users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      passwordHash: hashedPassword,
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      passwordHash: hashedPassword,
    },
  });

  const charlie = await prisma.user.create({
    data: {
      name: 'Charlie',
      email: 'charlie@example.com',
      passwordHash: hashedPassword,
    },
  });
  console.log('Seeded users:', { alice, bob, charlie });

  // Seed categories
  const techCategory = await prisma.category.create({
    data: { name: 'Technology' },
  });
  const scienceCategory = await prisma.category.create({
    data: { name: 'Science' },
  });
  const businessCategory = await prisma.category.create({
    data: { name: 'Business' },
  });
  console.log('Seeded categories:', { techCategory, scienceCategory, businessCategory });

  // Seed posts
  await prisma.post.create({
    data: {
      title: 'The Future of AI',
      content: 'Artificial intelligence is evolving rapidly...',
      authorId: alice.id,
      categoryId: techCategory.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Quantum Computing Breakthroughs',
      content: 'New advancements in quantum computing...',
      authorId: bob.id,
      categoryId: scienceCategory.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Market Trends in 2026',
      content: 'Analyzing the economic landscape...',
      authorId: charlie.id,
      categoryId: businessCategory.id,
    },
  });
  console.log('Seeded posts.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });