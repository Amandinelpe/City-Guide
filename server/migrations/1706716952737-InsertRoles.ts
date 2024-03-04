import { Logger } from "@nestjs/common";
import { Role } from "../src/users/entities/role.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRoles1706716952737 implements MigrationInterface {
    private readonly logger = new Logger(InsertRoles1706716952737.name);

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting roles...");
        const roles: Role[] = [
            { id: 1, name: "Utilisateur" } as Role,
            { id: 2, name: "Administrateur" } as Role
        ];

        for (const role of roles) {
            await queryRunner.query(
                `INSERT INTO role ("id", "name") VALUES (${role.id}, '${role.name}')`
            );
        }
        this.logger.log("Roles inserted");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Deleting roles...");
        await queryRunner.query(`DELETE FROM role`);
        this.logger.log("Roles deleted");
    }
}
