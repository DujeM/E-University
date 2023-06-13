import { MigrationInterface, QueryRunner } from "typeorm";

export class eventAndPeriod1685306072021 implements MigrationInterface {
    name = 'eventAndPeriod1685306072021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`CREATE TABLE "period" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order" integer NOT NULL, "start" character varying NOT NULL, "end" character varying NOT NULL, CONSTRAINT "UQ_0e606e4e143495ac4cd16f58561" UNIQUE ("order"), CONSTRAINT "PK_cabecec858892ab647cd28673b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "details" character varying NOT NULL, "recurring" boolean NOT NULL, "startDate" TIMESTAMP NOT NULL, "periodId" uuid, "classroomId" uuid, "courseId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_6fa1aa5e5d771963a7e08ed35fd" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_188beb74e49a549555f148420e0" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_140daa65266ca8ac3beffc2df68" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course" DROP CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_140daa65266ca8ac3beffc2df68"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_188beb74e49a549555f148420e0"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_6fa1aa5e5d771963a7e08ed35fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a940b1d7b3cc2f0e99ab6d23"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63b2ec4f34c89d4b1219f85a80"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "period"`);
        await queryRunner.query(`CREATE INDEX "IDX_67a940b1d7b3cc2f0e99ab6d23" ON "user_course" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63b2ec4f34c89d4b1219f85a80" ON "user_course" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_course" ADD CONSTRAINT "FK_63b2ec4f34c89d4b1219f85a806" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
