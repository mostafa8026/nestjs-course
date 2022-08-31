import {MigrationInterface, QueryRunner} from "typeorm";

export class createPostTable1661862132004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE [dbo].[Post](
            [id] [int] IDENTITY(1,1) NOT NULL,
            [name] [nvarchar](255) NOT NULL
        ) ON [PRIMARY]
        
        ALTER TABLE [dbo].[Post] ADD  CONSTRAINT [PK_c4d3b3dcd73db0b0129ea829f9f] PRIMARY KEY CLUSTERED 
        (
            [id] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Post');
    }

}
