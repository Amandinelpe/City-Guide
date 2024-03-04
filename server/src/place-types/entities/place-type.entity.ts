import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Place } from '../../places/entities/place.entity';
import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class PlaceType {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @BeforeInsert()
  createUuid() {
      this.id = uuidv4();
  }
  
  @Column()
  @Field()
  googlePlaceTypeName: string;

  @Column()
  @Field()
  name: string;

  @Column({ default: false })
  @Field({ defaultValue: false })
  activated: boolean;

  @OneToMany(() => Place, place => place.placeType)
  @Field(() => [PlaceType])
  places: PlaceType[];
}
