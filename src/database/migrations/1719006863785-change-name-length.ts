import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameLength1719006863785 implements MigrationInterface {
    name = 'ChangeNameLength1719006863785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, CONSTRAINT "UQ_b127d8a59da461611b74cd3c517" UNIQUE ("name"), CONSTRAINT "PK_60596e16740e1fa20dbf0154ec7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Products" ("id" SERIAL NOT NULL, "name" character varying(220) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name"), CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_0ac420e8701e781dbf1231dc230" UNIQUE ("name"), CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Brand" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "UQ_d5e17921ddbc54ccf0a68d8fae6" UNIQUE ("name"), CONSTRAINT "PK_a4a45d0f897767860c6c8209b96" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Brand"`);
        await queryRunner.query(`DROP TABLE "Category"`);
        await queryRunner.query(`DROP TABLE "Products"`);
        await queryRunner.query(`DROP TABLE "Customer"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
