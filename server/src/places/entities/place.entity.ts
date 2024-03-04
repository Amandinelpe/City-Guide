import { ObjectType, Field, ID } from '@nestjs/graphql';
import { City } from '../../cities/entities/city.entity';
import { PlaceType } from '../../place-types/entities/place-type.entity';
import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
@ObjectType()
export class Place {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @BeforeInsert()
    createUuid() {
        this.id = uuidv4();
    }

    @Column()
    @Field()
    name: string;

    @Column("decimal")
    @Field(() => Number)
    latitude: number;

    @Column("decimal")
    @Field(() => Number)
    longitude: number;

    @Column({ nullable: true})
    @Field(() => String, { nullable: true })
    address: string;

    @ManyToOne(() => PlaceType, placeType => placeType.places, { eager: true })
    @Field(() => PlaceType)
    placeType: PlaceType;

    @ManyToOne(() => City, city => city.places, { onDelete: 'CASCADE', eager: true })
    @Field(() => City)
    city: City;

    @OneToMany(() => Review, review => review.place, { onDelete: 'CASCADE', eager: true })
    @Field(() => [Review])
    reviews: Review[];

    @Field(() => Number)
    averageRating: number;
}
