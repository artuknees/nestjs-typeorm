import { MigrationInterface, QueryRunner } from "typeorm";

export class DateFields1719076147869 implements MigrationInterface {
    name = 'DateFields1719076147869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "createdAt"`);
    }

}
