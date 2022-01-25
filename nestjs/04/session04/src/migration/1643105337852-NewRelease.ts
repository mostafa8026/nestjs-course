import {MigrationInterface, QueryRunner} from "typeorm";

export class NewRelease1643105337852 implements MigrationInterface {
    name = 'NewRelease1643105337852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "typeorm2.dbo.post.title", "name"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "name" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "name" nvarchar(255) NOT NULL`);
        await queryRunner.query(`EXEC sp_rename "typeorm2.dbo.post.name", "title"`);
    }

}
