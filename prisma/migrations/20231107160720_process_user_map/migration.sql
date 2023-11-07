-- CreateTable
CREATE TABLE "ProcessUserMap" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "processId" INTEGER NOT NULL,
    "isCommentVisible" BOOLEAN NOT NULL,
    "hasUserSigned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProcessUserMap_pkey" PRIMARY KEY ("id")
);
