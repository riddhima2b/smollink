const {PrismaClient} = require("../src/generated/prisma");
const primsa = new PrismaClient();
module.exports = {primsa};