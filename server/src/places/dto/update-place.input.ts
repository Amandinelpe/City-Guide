import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePlaceInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  placeTypeId: string;

  @Field(() => ID)
  cityId: string;
}