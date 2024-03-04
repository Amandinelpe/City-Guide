import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Place } from '../places/entities/place.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createReviewInput: CreateReviewInput): Promise<Review> {
    const place = await this.placeRepository.findOneByOrFail({ id: createReviewInput.placeId });
    const user = await this.userRepository.findOneByOrFail({ id: createReviewInput.userId });

    const newReview = this.reviewRepository.create({
      ...createReviewInput,
      place,
      user
    });

    return this.reviewRepository.save(newReview);
  }
}
