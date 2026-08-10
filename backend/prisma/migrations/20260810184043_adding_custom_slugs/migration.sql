/*
  Warnings:

  - A unique constraint covering the columns `[customSlug]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Link_longUrl_key";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "customSlug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Link_customSlug_key" ON "Link"("customSlug");

-- CreateIndex
CREATE INDEX "Link_longUrl_idx" ON "Link"("longUrl");
