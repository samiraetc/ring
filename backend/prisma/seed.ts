import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create service types
  const houseCleaning = await prisma.serviceType.create({
    data: { name: 'House Cleaning' },
  });

  const petsitting = await prisma.serviceType.create({
    data: { name: 'Petsitting' },
  });

  const gardening = await prisma.serviceType.create({
    data: { name: 'Gardening' },
  });

  // Create user Jacques (gardening only)
  await prisma.user.create({
    data: {
      name: 'Jacques',
      region: 'Ixelles',
      services: {
        connect: [{ id: gardening.id }],
      },
    },
  });

  // Create user Maria (cleaning + petsitting)
  const maria = await prisma.user.create({
    data: {
      name: 'Maria',
      region: 'Watermael-Boitsfort',
      services: {
        connect: [{ id: petsitting.id }, { id: houseCleaning.id }],
      },
    },
  });

  // Add reviews for Maria
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: 'Amazing service!',
        userId: maria.id,
      },
      {
        rating: 4,
        comment: 'Very kind and punctual.',
        userId: maria.id,
      },
    ],
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
