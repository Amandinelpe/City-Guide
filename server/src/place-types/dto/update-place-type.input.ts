import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePlaceTypeInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean, { defaultValue: false })
  activated: boolean;
}
