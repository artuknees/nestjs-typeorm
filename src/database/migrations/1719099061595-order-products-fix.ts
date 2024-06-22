import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderProductsFix1719099061595 implements MigrationInterface {
    name = 'OrderProductsFix1719099061595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_79772f727dd72ada229f6f8f286"`);
        await queryRunner.query(`CREATE TABLE "Order-Product" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "PK_b1adbc94ae25c5a10543f16523f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "Order-Product" ADD CONSTRAINT "FK_b389bfa2e49bed7550a7f011ce7" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order-Product" ADD CONSTRAINT "FK_43d84621ef7cc2a75809bc168fd" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order-Product" DROP CONSTRAINT "FK_43d84621ef7cc2a75809bc168fd"`);
        await queryRunner.query(`ALTER TABLE "Order-Product" DROP CONSTRAINT "FK_b389bfa2e49bed7550a7f011ce7"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "Order-Product"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_79772f727dd72ada229f6f8f286" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
