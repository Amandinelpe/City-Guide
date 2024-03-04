import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Number)
  latitude: number;

  @Field(() => Number)
  longitude: number;

  @Field(() => String, { nullable: true })
  image: string;
}