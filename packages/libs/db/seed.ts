import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, but good for testing)
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});

  // Seed categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Technology' },
      { name: 'Science' },
      { name: 'Business' },
      { name: 'Health' },
    ],
    skipDuplicates: true,
  });

  // Seed users
  const users = await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' },
    ],
    skipDuplicates: true,
  });

  // Seed posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: 'The Future of AI',
        content: 'Artificial intelligence is evolving rapidly...',
        authorId: 1, // Alice
        categoryId: 1, // Technology
      },
      {
        title: 'Quantum Computing Breakthroughs',
        content: 'New advancements in quantum computing...',
        authorId: 2, // Bob
        categoryId: 2, // Science
      },
      {
        title: 'Market Trends in 2026',
        content: 'Analyzing the economic landscape...',
        authorId: 3, // Charlie
        categoryId: 3, // Business
      },
      {
        title: 'Healthy Lifestyle Tips',
        content: 'Simple ways to improve your well-being...',
        authorId: 1, // Alice
        categoryId: 4, // Health
      },
      {
        title: 'The Impact of Big Data',
        content: 'How data is shaping industries...',
        authorId: 2, // Bob
        categoryId: 1, // Technology
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });