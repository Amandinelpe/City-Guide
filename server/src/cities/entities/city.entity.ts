import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Place } from '../../places/entities/place.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class City {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @BeforeInsert()
  createUuid() {
      this.id = uuidv4();
  }

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description: string;

  @OneToMany(() => Place, place => place.city, { cascade: true })
  @Field(() => [Place])
  places: Place[];

  @Column("decimal")
  @Field(() => Number)
  latitude: number;

  @Column("decimal")
  @Field(() => Number)
  longitude: number;
  
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  image: string;
}

