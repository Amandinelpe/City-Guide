import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaceTypeInput {
  @Field()
  googlePlaceTypeName: string;
  
  @Field()
  name: string;

  @Field({ defaultValue: false })
  activated: boolean;
}
