const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Checking Admin user...");
  const adminEmail = 'admin@aakrutidigipress.com';
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('aakruti123', 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password_hash: passwordHash,
      }
    });
    console.log('Default admin created successfully: admin@aakrutidigipress.com / aakruti123');
  } else {
    // Reset admin password to aakruti123 to ensure login always succeeds
    const passwordHash = await bcrypt.hash('aakruti123', 10);
    await prisma.admin.update({
      where: { email: adminEmail },
      data: { password_hash: passwordHash }
    });
    console.log('Admin password reset to aakruti123');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
