import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1643846081819 implements MigrationInterface {
    name = 'createTable1643846081819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "type" text NOT NULL, "cpf_cnpj" text NOT NULL, "status" text NOT NULL DEFAULT 'ativo', "dt_created_at" date NOT NULL DEFAULT now(), "dt_updated_at" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_f9f62556c7092913f2a06975052" UNIQUE ("phone"), CONSTRAINT "UQ_e79f894f802be71d3d2d7d3a14f" UNIQUE ("cpf_cnpj"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contactAddress" ("id" SERIAL NOT NULL, "zipcode" text NOT NULL, "street" text NOT NULL, "number" integer NOT NULL, "complement" text, "district" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "dt_created_at" TIMESTAMP NOT NULL DEFAULT now(), "dt_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "contactsId" integer, CONSTRAINT "REL_e1adc548289616f74174f03d05" UNIQUE ("contactsId"), CONSTRAINT "PK_daf4427bbff086952784dba016c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contactAddress" ADD CONSTRAINT "FK_e1adc548289616f74174f03d05d" FOREIGN KEY ("contactsId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contactAddress" DROP CONSTRAINT "FK_e1adc548289616f74174f03d05d"`);
        await queryRunner.query(`DROP TABLE "contactAddress"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
