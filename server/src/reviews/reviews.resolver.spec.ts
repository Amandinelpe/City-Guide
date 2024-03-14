import { Test } from '@nestjs/testing';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { Place } from '../places/entities/place.entity';
import { User } from '../users/entities/user.entity';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;
  let service: Partial<ReviewsService>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        ReviewsResolver,
        {
          provide: ReviewsService,
          useValue: service,
        },
      ],
    }).compile();

    resolver = module.get<ReviewsResolver>(ReviewsResolver);
  });

  it('should create a review', async () => {
    const reviewInput = { comment: 'Great place', rating: 5, userId: 'user-uuid', placeId: 'place-uuid' };
    const newReview = new Review();
    Object.assign(newReview, reviewInput, { id: 'review-uuid', user: new User(), place: new Place() });

    jest.spyOn(service, 'create').mockResolvedValue(newReview);

    const result = await resolver.createReview(reviewInput);
    expect(result).toEqual(newReview);
    expect(service.create).toHaveBeenCalledWith(reviewInput);
  });
});
