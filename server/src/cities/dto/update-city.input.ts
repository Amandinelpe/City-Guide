import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCityInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  image: string;
}
