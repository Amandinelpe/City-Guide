import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePlaceTypeInput  {
  @Field(() => ID)
  id: string;

  @Field({ defaultValue: false })
  activated: boolean;
}
