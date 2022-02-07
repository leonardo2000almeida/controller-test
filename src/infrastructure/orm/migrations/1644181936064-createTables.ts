import { MigrationInterface, QueryRunner } from "typeorm";
import RedisUseCases from "../../../application/useCases/redis";

export class createTables1644181936064 implements MigrationInterface {
  name = "createTables1644181936064";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "type" text NOT NULL, "cpf_cnpj" text NOT NULL, "status" text NOT NULL DEFAULT 'ativo', "dt_created_at" date NOT NULL DEFAULT now(), "dt_updated_at" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_8c17e6f04bd3fdd6053f3e7ebea" UNIQUE ("name"), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_f9f62556c7092913f2a06975052" UNIQUE ("phone"), CONSTRAINT "UQ_e79f894f802be71d3d2d7d3a14f" UNIQUE ("cpf_cnpj"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contactAddress" ("id" SERIAL NOT NULL, "zipcode" text NOT NULL, "street" text NOT NULL, "number" integer NOT NULL, "complement" text NOT NULL, "district" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "dt_created_at" TIMESTAMP NOT NULL DEFAULT now(), "dt_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "contactId" integer, CONSTRAINT "REL_b6d64fb4c7e8e76ee2d51111b0" UNIQUE ("contactId"), CONSTRAINT "PK_daf4427bbff086952784dba016c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "contactAddress" ADD CONSTRAINT "FK_b6d64fb4c7e8e76ee2d51111b0d" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contactAddress" DROP CONSTRAINT "FK_b6d64fb4c7e8e76ee2d51111b0d"`
    );
    await queryRunner.query(`DROP TABLE "contactAddress"`);
    await queryRunner.query(`DROP TABLE "contact"`);
  }
}
