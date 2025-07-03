-- CreateTable
CREATE TABLE "PlantInstance" (
    "id" SERIAL NOT NULL,
    "plantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "plantTypeId" INTEGER NOT NULL,

    CONSTRAINT "PlantInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT,

    CONSTRAINT "PlantType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlantInstance" ADD CONSTRAINT "PlantInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantInstance" ADD CONSTRAINT "PlantInstance_plantTypeId_fkey" FOREIGN KEY ("plantTypeId") REFERENCES "PlantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
