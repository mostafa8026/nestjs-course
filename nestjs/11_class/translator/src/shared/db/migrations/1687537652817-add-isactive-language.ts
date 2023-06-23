import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsactiveLanguage1687537652817 implements MigrationInterface {
    name = 'AddIsactiveLanguage1687537652817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "language" ADD "isActive" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "isActive"`);
    }

}
