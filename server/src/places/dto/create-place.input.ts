import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreatePlaceInput {
    @Field()
    name: string;

    @Field(() => Number)
    latitude: number;

    @Field(() => Number)
    longitude: number;

    @Field()
    address: string;

    @Field(() => ID)
    placeTypeId: string;

    @Field(() => ID)
    cityId: string;
}
