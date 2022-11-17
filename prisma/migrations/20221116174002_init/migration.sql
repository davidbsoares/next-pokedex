/*
  Warnings:

  - Added the required column `spd` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
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
    "spd" INTEGER NOT NULL,
    "moves" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_legendary" BOOLEAN NOT NULL,
    "is_mythical" BOOLEAN NOT NULL,
    "is_baby" BOOLEAN NOT NULL
);
INSERT INTO "new_Pokemon" ("atk", "def", "description", "height", "hp", "id", "image", "is_baby", "is_legendary", "is_mythical", "moves", "name", "satk", "sdef", "types", "weight") SELECT "atk", "def", "description", "height", "hp", "id", "image", "is_baby", "is_legendary", "is_mythical", "moves", "name", "satk", "sdef", "types", "weight" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
