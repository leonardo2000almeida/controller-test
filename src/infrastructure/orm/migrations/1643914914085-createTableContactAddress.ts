import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableContactAddress1643914914085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contactAddress" ("id" SERIAL NOT NULL, "zipcode" text NOT NULL, "street" text NOT NULL, "number" integer NOT NULL, "complement" text, "district" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "dt_created_at" TIMESTAMP NOT NULL DEFAULT now(), "dt_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "contactsId" integer, CONSTRAINT "REL_e1adc548289616f74174f03d05" UNIQUE ("contactsId"), CONSTRAINT "PK_daf4427bbff086952784dba016c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contactAddress" ADD CONSTRAINT "FK_e1adc548289616f74174f03d05d" FOREIGN KEY ("contactsId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contactAddress" DROP CONSTRAINT "FK_e1adc548289616f74174f03d05d"`);
        await queryRunner.query(`DROP TABLE "contactAddress"`);
    }

}
