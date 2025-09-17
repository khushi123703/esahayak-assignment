const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.buyer.create({
    data: {
      fullName: "Test User",
      phone: "9876543210",
      city: "Chandigarh",
      propertyType: "Apartment",
      bhk: "2",
      purpose: "Buy",
      timeline: "0-3m",
      source: "Website",
      status: "New",
      ownerId: "demo-user",
    },
  });
}

main()
  .then(() => {
    console.log("✅ Seed data inserted");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
