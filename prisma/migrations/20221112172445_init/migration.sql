-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "types" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "satk" INTEGER NOT NULL,
    "sdef" INTEGER NOT NULL,
    "moves" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_legendary" BOOLEAN NOT NULL,
    "is_mythical" BOOLEAN NOT NULL,
    "is_baby" BOOLEAN NOT NULL
);
