import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAccount1644085049053 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Accounts',
      columns: [
        {
          type: 'int',
          name: 'id',
          isGenerated: true,
          generationStrategy: 'increment',
          isPrimary: true,
        },
        {
          name: 'balance',
          type: 'decimal',
          scale: 3
        },
        {
          name: 'userId',
          type: 'int'
        },
      ],
      foreignKeys: [
        {
          name: 'userId',
          referencedTableName: 'Users',
          referencedColumnNames: ['id'],
          columnNames: ['userId'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    }))
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Accounts');
    }

}
