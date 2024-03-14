import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';
import { Repository } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { User } from '../users/entities/user.entity';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let reviewRepo: Partial<Record<keyof Repository<Review>, jest.Mock>>;
  let placeRepo: Partial<Record<keyof Repository<Place>, jest.Mock>>;
  let userRepo: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    reviewRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };
    placeRepo = {
      findOneByOrFail: jest.fn(),
    };
    userRepo = {
      findOneByOrFail: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: reviewRepo,
        },
        {
          provide: getRepositoryToken(Place),
          useValue: placeRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should create a review', async () => {
    const reviewInput = { comment: 'Great place', rating: 5, userId: 'user-uuid', placeId: 'place-uuid' };
    const newReview = new Review();
    Object.assign(newReview, reviewInput, { user: new User(), place: new Place() });

    placeRepo.findOneByOrFail.mockResolvedValue(new Place());
    userRepo.findOneByOrFail.mockResolvedValue(new User());
    reviewRepo.create.mockReturnValue(newReview);
    reviewRepo.save.mockResolvedValue(newReview);

    const result = await service.create(reviewInput);

    expect(placeRepo.findOneByOrFail).toHaveBeenCalledWith({ id: reviewInput.placeId });
    expect(userRepo.findOneByOrFail).toHaveBeenCalledWith({ id: reviewInput.userId });
    expect(reviewRepo.create).toHaveBeenCalledWith(expect.objectContaining(reviewInput));
    expect(reviewRepo.save).toHaveBeenCalledWith(newReview);
    expect(result).toEqual(newReview);
  });
});
