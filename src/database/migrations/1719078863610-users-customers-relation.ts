import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersCustomersRelation1719078863610 implements MigrationInterface {
    name = 'UsersCustomersRelation1719078863610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Customer" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Customer" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_615aa22e593ac0f129436b2eff6" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "Customer" DROP CONSTRAINT "UQ_b127d8a59da461611b74cd3c517"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "role" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_615aa22e593ac0f129436b2eff6" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_615aa22e593ac0f129436b2eff6"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "role" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Customer" ADD CONSTRAINT "UQ_b127d8a59da461611b74cd3c517" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_615aa22e593ac0f129436b2eff6"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Customer" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Customer" DROP COLUMN "createdAt"`);
    }

}
