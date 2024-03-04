import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { v4 as uuidv4 } from 'uuid';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @BeforeInsert()
  createUuid() {
      this.id = uuidv4();
  }

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @ManyToOne(() => Role, role => role.users, { eager: true })
  @Field(() => Role)
  role: Role;

  @OneToMany(() => Review, review => review.user)
  @Field(() => [Review])
  reviews: Review[];
}
