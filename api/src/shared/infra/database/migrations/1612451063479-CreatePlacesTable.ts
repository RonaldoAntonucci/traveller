import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
        name: 'name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'image',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'description',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'address_id',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'category_id',
        type: 'uuid',
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

  private addressForeignKey = new TableForeignKey({
    name: 'PlaceAddress',
    columnNames: ['address_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'addresses',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  private categoryForeignKey = new TableForeignKey({
    name: 'PlaceCategory',
    columnNames: ['category_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'categories',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKey(this.table, this.addressForeignKey);
    await queryRunner.createForeignKey(this.table, this.categoryForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
