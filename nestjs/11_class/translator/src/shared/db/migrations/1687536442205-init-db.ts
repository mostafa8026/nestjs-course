import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1687536442205 implements MigrationInterface {
    name = 'InitDb1687536442205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "translation" ("id" character varying NOT NULL, "phrase" character varying NOT NULL, "translation" character varying NOT NULL, "fromLang" character varying NOT NULL DEFAULT 'en', "toLang" character varying NOT NULL DEFAULT 'fa', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "likeCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "translationId" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apiKey" ("id" SERIAL NOT NULL, "apiKey" uuid NOT NULL DEFAULT uuid_generate_v4(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_2ae3a5e8e04fb402b2dc8d6ce4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "configuration" ("key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_728df6b8feec6825541b5ec8f93" PRIMARY KEY ("key", "value"))`);
        await queryRunner.query(`CREATE TABLE "error" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cd77c9331f0ee047b819a7abad1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request-monitor" ("id" SERIAL NOT NULL, "method" character varying NOT NULL, "url" character varying NOT NULL, "requestPayload" text, "responsePayload" text, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_324c5fb6d462dd64d831d9a36d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("name" character varying NOT NULL, "shortName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51c28095a8a0f67f688115daf16" UNIQUE ("shortName"), CONSTRAINT "PK_7df7d1e250ea2a416f078a631fb" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "user_translations_translation" ("userId" integer NOT NULL, "translationId" character varying NOT NULL, CONSTRAINT "PK_c0e7ffa7ab0ec8f8b670d83e374" PRIMARY KEY ("userId", "translationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8a74c55f2b3c418bff0f07bf1" ON "user_translations_translation" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82cebdbbae349966f948bf7b3c" ON "user_translations_translation" ("translationId") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_f6c8e438d18f84f96382e196bbc" FOREIGN KEY ("translationId") REFERENCES "translation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apiKey" ADD CONSTRAINT "FK_0a90a7202f6b6a3fb0251426486" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_translations_translation" ADD CONSTRAINT "FK_c8a74c55f2b3c418bff0f07bf11" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_translations_translation" ADD CONSTRAINT "FK_82cebdbbae349966f948bf7b3c7" FOREIGN KEY ("translationId") REFERENCES "translation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_translations_translation" DROP CONSTRAINT "FK_82cebdbbae349966f948bf7b3c7"`);
        await queryRunner.query(`ALTER TABLE "user_translations_translation" DROP CONSTRAINT "FK_c8a74c55f2b3c418bff0f07bf11"`);
        await queryRunner.query(`ALTER TABLE "apiKey" DROP CONSTRAINT "FK_0a90a7202f6b6a3fb0251426486"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_f6c8e438d18f84f96382e196bbc"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82cebdbbae349966f948bf7b3c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8a74c55f2b3c418bff0f07bf1"`);
        await queryRunner.query(`DROP TABLE "user_translations_translation"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "request-monitor"`);
        await queryRunner.query(`DROP TABLE "error"`);
        await queryRunner.query(`DROP TABLE "configuration"`);
        await queryRunner.query(`DROP TABLE "apiKey"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "translation"`);
    }

}
