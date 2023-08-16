import { MigrationInterface, QueryRunner } from "typeorm";

export class coursePosts1689709029757 implements MigrationInterface {
    name = 'coursePosts1689709029757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "courseId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_11f408d519b59c087dda20d3e38" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_11f408d519b59c087dda20d3e38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
