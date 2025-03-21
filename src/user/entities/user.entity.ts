import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  answers: {
    id: number;
    partnerId: number;
    linkUrl: string;
    answer: {
      questionId: number;
      answer: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }[];

  @Column('json', { nullable: true })
  uniqueLinks: {
    linkUrl: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDone: boolean;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('json', { nullable: true })
  results: any[];

  @Column({ nullable: true })
  partnerId: number;

  @Column({ nullable: true })
  sex: 'M' | 'F';

  @Column('json', { nullable: true })
  partnerIds: number[];

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isLocked: boolean;

  @VersionColumn()
  version: number;
}
