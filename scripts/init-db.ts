const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Créer l'utilisateur administrateur
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Administrateur',
      password: hashedPassword,
    },
  });

  console.log('Utilisateur administrateur créé:', admin);

  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: 'Mon Portfolio',
      siteDescription: 'Un portfolio personnel',
      contactEmail: 'admin@example.com',
      enableContactForm: true,
      maintenanceMode: false,
    },
  });

  console.log('Paramètres du site créés:', settings);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 