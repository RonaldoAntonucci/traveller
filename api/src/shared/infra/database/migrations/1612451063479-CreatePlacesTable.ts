import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePlacesTable1612451063479
  implements MigrationInterface {
  private table = new Table({
    name: 'places',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
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
