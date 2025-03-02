import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.create({
    data: {
      name: 'Alec',
      password: '$2b$10$RF7pJAixgGT6TxYc0Yj6XeYY07kO4veGtcj3XvVNXPG8zRWNtxiH.',
      role: Role.ADMIN,
    },
  });
  const dev1 = await prisma.user.create({
    data: {
      name: 'Sasha',
      password: '$2b$10$/3vgy7ZTx3r9Fy98lb8wzuHXV6TkkPYVrY5g75hYxTsfRGkyEmXpC',
      role: Role.USER,
    },
  });
  console.log({ admin, dev1 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
