import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableContact1643914852977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "type" text NOT NULL, "cpf_cnpj" text NOT NULL, "status" text NOT NULL DEFAULT 'ativo', "dt_created_at" date NOT NULL DEFAULT now(), "dt_updated_at" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_f9f62556c7092913f2a06975052" UNIQUE ("phone"), CONSTRAINT "UQ_e79f894f802be71d3d2d7d3a14f" UNIQUE ("cpf_cnpj"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
