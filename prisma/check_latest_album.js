const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkLatestAlbum() {
  console.log("Checking latest albums in local database...\n");
  const albums = await prisma.albumProduct.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { collection: true }
  });

  console.log(`Total Albums Found: ${albums.length}\n`);
  albums.forEach((a, i) => {
    console.log(`${i + 1}. Name: "${a.name}"`);
    console.log(`   Slug: ${a.slug}`);
    console.log(`   Status: ${a.status}`);
    console.log(`   Collection: ${a.collection ? a.collection.name : 'N/A'}`);
    console.log(`   Created At: ${a.createdAt.toISOString()}`);
    console.log("-----------------------------------------");
  });

  await prisma.$disconnect();
}

checkLatestAlbum();
