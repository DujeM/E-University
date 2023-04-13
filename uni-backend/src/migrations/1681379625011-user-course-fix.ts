import { MigrationInterface, QueryRunner } from "typeorm";

export class userCourseFix1681379625011 implements MigrationInterface {
    name = 'userCourseFix1681379625011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_e49da660f758c9a84cf7ddb4842"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP COLUMN "studentId"`);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD "studentId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_e49da660f758c9a84cf7ddb4842" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
