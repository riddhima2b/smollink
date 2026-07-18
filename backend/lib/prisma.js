const {PrismaClient} = require("../src/generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const primsa = new PrismaClient({ adapter });
module.exports = {primsa};