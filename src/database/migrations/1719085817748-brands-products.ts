import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandsProducts1719085817748 implements MigrationInterface {
    name = 'BrandsProducts1719085817748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Brand" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Brand" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_b091e9b9c5356946549bc4cc6ad" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_b091e9b9c5356946549bc4cc6ad"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "Brand" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Brand" DROP COLUMN "createdAt"`);
    }

}
