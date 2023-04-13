import { MigrationInterface, QueryRunner } from "typeorm";

export class courseStudyRelation1681329604608 implements MigrationInterface {
    name = 'courseStudyRelation1681329604608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "studyId" uuid`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_dab2f6e83c007a12b90a8a3a113" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_dab2f6e83c007a12b90a8a3a113"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "studyId"`);
    }

}
