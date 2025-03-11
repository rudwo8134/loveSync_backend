import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class QuestionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @Column('simple-array')
  options: {
    id: number;
    text: string;
    score: number;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn({ default: 0 })
  version: number;
}
