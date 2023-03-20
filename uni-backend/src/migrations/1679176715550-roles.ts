import { MigrationInterface, QueryRunner } from "typeorm";

export class roles1679176715550 implements MigrationInterface {
    name = 'roles1679176715550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "roles"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roles" TO "role"`);
    }

}
