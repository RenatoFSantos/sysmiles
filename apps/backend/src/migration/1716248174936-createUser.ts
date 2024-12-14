import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1716248174936 implements MigrationInterface {
    name = 'CreateUser1716248174936';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "User" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "created" TIMESTAMP(6) NOT NULL DEFAULT now(), "updated" TIMESTAMP(6) NOT NULL DEFAULT now(), "user_sg_user" character varying(20) NOT NULL, "user_nm_name" character varying(25) NOT NULL, "user_nm_lastname" character varying(50), "user_dt_birthdate" TIMESTAMP, "user_ds_email" character varying(100) NOT NULL, "user_ds_phone" character varying(20), "user_ds_smartphone" character varying(20), "user_ds_whatsapp" character varying(20), "user_cd_password" character varying(50) NOT NULL, "user_cd_recovery" character varying(50) NOT NULL, "user_cd_type" character(1) NOT NULL DEFAULT 'V', "user_tx_avatar" character varying(500) DEFAULT '/photo_default.jpg', "user_cd_refreshtoken" character varying(500), CONSTRAINT "PK_1c132e5f5e8f89bf114bb7f8823" PRIMARY KEY ("uid")); COMMENT ON COLUMN "User"."active" IS 'Active: 0 = False/ 1 = true'; COMMENT ON COLUMN "User"."deleted" IS 'Deleted: 0 = False/ 1 = true'; COMMENT ON COLUMN "User"."created" IS 'Creation date'; COMMENT ON COLUMN "User"."updated" IS 'Update date'; COMMENT ON COLUMN "User"."user_sg_user" IS 'Codname'; COMMENT ON COLUMN "User"."user_nm_name" IS 'Name'; COMMENT ON COLUMN "User"."user_nm_lastname" IS 'Lastname'; COMMENT ON COLUMN "User"."user_dt_birthdate" IS 'Birth Date'; COMMENT ON COLUMN "User"."user_ds_email" IS 'Email'; COMMENT ON COLUMN "User"."user_ds_phone" IS 'Phone'; COMMENT ON COLUMN "User"."user_ds_smartphone" IS 'Smartphone'; COMMENT ON COLUMN "User"."user_ds_whatsapp" IS 'Whatsapp'; COMMENT ON COLUMN "User"."user_cd_password" IS 'Password'; COMMENT ON COLUMN "User"."user_cd_recovery" IS 'Password Recovery'; COMMENT ON COLUMN "User"."user_cd_type" IS 'User type: A-Administrador, G-Gerente, O-Operador, V-Visualizador'; COMMENT ON COLUMN "User"."user_tx_avatar" IS 'Avatar'; COMMENT ON COLUMN "User"."user_cd_refreshtoken" IS 'Refreshtoken'`
        );
        await queryRunner.query(
            `CREATE TABLE "RefreshToken" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "created" TIMESTAMP(6) NOT NULL DEFAULT now(), "updated" TIMESTAMP(6) NOT NULL DEFAULT now(), "expiresIn" integer NOT NULL, "userId" character varying(50) NOT NULL, "userUid" uuid, CONSTRAINT "PK_05a59d53146a6cb4615d1795306" PRIMARY KEY ("uid")); COMMENT ON COLUMN "RefreshToken"."active" IS 'Active: 0 = False/ 1 = true'; COMMENT ON COLUMN "RefreshToken"."deleted" IS 'Deleted: 0 = False/ 1 = true'; COMMENT ON COLUMN "RefreshToken"."created" IS 'Creation date'; COMMENT ON COLUMN "RefreshToken"."updated" IS 'Update date'`
        );
        await queryRunner.query(
            `ALTER TABLE "RefreshToken" ADD CONSTRAINT "FK_27eea6b2033c9e18a1d3f8fccc2" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RefreshToken" DROP CONSTRAINT "FK_27eea6b2033c9e18a1d3f8fccc2"`);
        await queryRunner.query(`DROP TABLE "RefreshToken"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }
}
