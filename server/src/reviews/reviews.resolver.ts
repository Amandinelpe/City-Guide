import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Mutation(() => Review)
    async createReview(
        @Args('createReviewInput') createReviewInput: CreateReviewInput,
    ) {
        return await this.reviewsService.create(createReviewInput);
    }
}
