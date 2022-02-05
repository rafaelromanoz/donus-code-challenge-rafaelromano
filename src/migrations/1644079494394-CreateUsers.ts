import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1644079494394 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment',
          isGenerated: true,
        },
        {
          name: 'cpf',
          type: 'varchar',
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Users')
    }
}
