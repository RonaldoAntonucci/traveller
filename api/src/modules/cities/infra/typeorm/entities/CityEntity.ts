import City from '@modules/cities/domain/City';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cities')
export default class CityEntity extends City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: 'text' })
  description: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
