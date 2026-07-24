const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function check() {
  const admin = await prisma.admin.findUnique({ where: { email: 'admin@aakrutidigipress.com' } });
  if (!admin) {
    console.log('ADMIN AUTH CHECK: Admin user not found');
    return;
  }
  const match = await bcrypt.compare('aakruti123', admin.password_hash);
  console.log('ADMIN AUTH CHECK RESULT:', match ? 'SUCCESS (Password matches!)' : 'FAILED');
}

check().finally(() => prisma.$disconnect());
