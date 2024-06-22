import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderProducts1719098921038 implements MigrationInterface {
    name = 'OrderProducts1719098921038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Order" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_79772f727dd72ada229f6f8f286" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_0f88449168b8ffae36cb3f8a140" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_0f88449168b8ffae36cb3f8a140"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_79772f727dd72ada229f6f8f286"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "Order"`);
    }

}
