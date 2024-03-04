import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewsResolver } from './reviews.resolver';
import { Place } from '../places/entities/place.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Place, User])],
  providers: [ReviewsService, ReviewsResolver]
})
export class ReviewsModule {}
