-- CreateTable
CREATE TABLE "Urgamal" (
    "id" SERIAL NOT NULL,
    "mn_code" TEXT NOT NULL,
    "mn_name" TEXT NOT NULL,
    "lat_code" TEXT NOT NULL,
    "latin_name" TEXT,
    "nas" TEXT NOT NULL,
    "amjdral_helber" TEXT NOT NULL,
    "aj_ahuin_bueleg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Urgamal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Urgamal_mn_code_key" ON "Urgamal"("mn_code");
CREATE INDEX "Urgamal_mn_name_idx" ON "Urgamal"("mn_name");
CREATE INDEX "Urgamal_latin_name_idx" ON "Urgamal"("latin_name");
CREATE INDEX "Urgamal_aj_ahuin_bueleg_idx" ON "Urgamal"("aj_ahuin_bueleg");
