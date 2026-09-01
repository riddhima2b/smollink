-- CreateTable
CREATE TABLE "Click" (
    "clickId" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device" TEXT,
    "country" TEXT,
    "referrer" TEXT,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("clickId")
);

-- CreateIndex
CREATE INDEX "Click_linkId_idx" ON "Click"("linkId");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
