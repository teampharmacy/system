/*
  Warnings:

  - You are about to drop the column `number` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `numberLeft` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberPurchased` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Medicine_number_key";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "number",
DROP COLUMN "quantity",
ADD COLUMN     "numberLeft" INTEGER NOT NULL,
ADD COLUMN     "numberPurchased" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
