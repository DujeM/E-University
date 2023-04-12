import { MigrationInterface, QueryRunner } from "typeorm";

export class studiesAndClassrooms1681328721398 implements MigrationInterface {
    name = 'studiesAndClassrooms1681328721398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classroom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying NOT NULL, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_ae14dbea0172b8521edb2ce4597" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "study"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
    }

}
