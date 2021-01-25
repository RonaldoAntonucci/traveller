import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCitiesTable1611607797747
  implements MigrationInterface {
  private table = new Table({
    name: 'cities',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'image',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'text',
        isNullable: false,
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
