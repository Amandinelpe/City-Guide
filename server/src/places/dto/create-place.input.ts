import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreatePlaceInput {
    @Field(() => String)
    name: string;

    @Field(() => Number)
    latitude: number;

    @Field(() => Number)
    longitude: number;

    @Field(() => String)
    address: string;

    @Field(() => ID)
    placeTypeId: string;

    @Field(() => ID)
    cityId: string;
}
