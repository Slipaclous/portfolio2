-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "visitors" INTEGER NOT NULL,
    "pageviews" INTEGER NOT NULL,
    "avg_duration" INTEGER NOT NULL,
    "bounce_rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
); 