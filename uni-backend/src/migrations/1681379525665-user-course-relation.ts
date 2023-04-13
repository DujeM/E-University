import { MigrationInterface, QueryRunner } from "typeorm";

export class userCourseRelation1681379525665 implements MigrationInterface {
    name = 'userCourseRelation1681379525665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_course" ("userId" character varying NOT NULL, "courseId" uuid NOT NULL, "studentId" uuid, CONSTRAINT "PK_3dd5e91db76f0464fe79e6e1eb4" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD "studentId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "PK_3dd5e91db76f0464fe79e6e1eb4"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "PK_67a940b1d7b3cc2f0e99ab6d23b" PRIMARY KEY ("courseId")`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "PK_67a940b1d7b3cc2f0e99ab6d23b"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "PK_3dd5e91db76f0464fe79e6e1eb4" PRIMARY KEY ("courseId", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_e49da660f758c9a84cf7ddb4842" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_67a940b1d7b3cc2f0e99ab6d23b" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_67a940b1d7b3cc2f0e99ab6d23b"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_e49da660f758c9a84cf7ddb4842"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "PK_3dd5e91db76f0464fe79e6e1eb4"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "PK_67a940b1d7b3cc2f0e99ab6d23b" PRIMARY KEY ("courseId")`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "PK_67a940b1d7b3cc2f0e99ab6d23b"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "PK_3dd5e91db76f0464fe79e6e1eb4" PRIMARY KEY ("userId", "courseId")`);
        await queryRunner.query(`ALTER TABLE "user_course" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD "studentId" uuid`);
        await queryRunner.query(`DROP TABLE "user_course"`);
    }

}
