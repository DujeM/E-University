import { MigrationInterface, QueryRunner } from "typeorm";

export class coursePostsFileUrl1691224554132 implements MigrationInterface {
    name = 'coursePostsFileUrl1691224554132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "fileUrl" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
