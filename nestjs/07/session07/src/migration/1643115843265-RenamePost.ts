import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamePost1643115843265 implements MigrationInterface {
  name = 'RenamePost1643115843265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `EXEC sp_rename "typeorm_prod.dbo.post.name", "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `EXEC sp_rename "typeorm_prod.dbo.post.title", "name"`,
    );
  }
}
