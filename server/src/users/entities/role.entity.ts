import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Role {
    @PrimaryColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => User, user => user.role)
    @Field(() => [Role])
    users: User[];
}
