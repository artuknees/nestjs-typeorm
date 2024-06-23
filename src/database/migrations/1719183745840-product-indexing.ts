import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductIndexing1719183745840 implements MigrationInterface {
    name = 'ProductIndexing1719183745840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_75f8b171dfdad5226f264594c6" ON "Products" ("price", "stock") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_75f8b171dfdad5226f264594c6"`);
    }

}
