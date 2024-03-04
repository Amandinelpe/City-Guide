import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReviewInput {
    @Field()
    comment: string;
    
    @Field(() => Number)
    rating: number;
    
    @Field(() => ID)
    userId: string;
    
    @Field(() => ID)
    placeId: string;
}
