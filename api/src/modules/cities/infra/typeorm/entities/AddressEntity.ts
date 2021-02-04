import Address from '@modules/cities/domain/Address';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
export default class AddressEntity extends Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column({ nullable: true })
  number: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
