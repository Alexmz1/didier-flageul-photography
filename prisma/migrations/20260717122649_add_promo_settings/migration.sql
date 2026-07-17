-- CreateTable
CREATE TABLE "promo_settings" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "description" TEXT,
    "price" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promo_settings_pkey" PRIMARY KEY ("id")
);
