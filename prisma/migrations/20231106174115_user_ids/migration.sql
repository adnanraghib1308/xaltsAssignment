/*
  Warnings:

  - The `userIds` column on the `Process` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Process" DROP COLUMN "userIds",
ADD COLUMN     "userIds" INTEGER[];
