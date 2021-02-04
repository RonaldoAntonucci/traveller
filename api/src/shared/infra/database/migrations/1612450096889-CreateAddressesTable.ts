import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAddressesTable1612450096889
  implements MigrationInterface {
  private table = new Table({
    name: 'addresses',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'zip_code',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'street',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'neighborhood',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'number',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
