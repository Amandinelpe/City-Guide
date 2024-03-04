import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @BeforeInsert()
    createUuid() {
        this.id = uuidv4();
    }

    @Column()
    @Field()
    comment: string;

    @Column()
    @Field()
    rating: number;

    @ManyToOne(() => Place, place => place.reviews, { onDelete: 'CASCADE' })
    @Field(() => Place)
    place: Place;

    @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE', eager: true })
    @Field(() => User)
    user: User;
}
