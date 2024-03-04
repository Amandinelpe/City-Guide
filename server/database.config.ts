import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { User } from './src/users/entities/user.entity';
import { PlaceType } from './src/place-types/entities/place-type.entity';
import { City } from './src/cities/entities/city.entity';
import { Place } from './src/places/entities/place.entity';
import { Role } from './src/users/entities/role.entity';
import { Review } from './src/reviews/entities/review.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: configService.getOrThrow('DATABASE_TYPE'),
  host: configService.getOrThrow('DATABASE_HOST'),
  port: parseInt(configService.getOrThrow('DATABASE_PORT'), 10),
  username: configService.getOrThrow('DATABASE_USERNAME'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  database: configService.getOrThrow('DATABASE_NAME'),
  entities: [User, PlaceType, City, Place, Role, Review],
  migrations: ["migrations/**"]
} as DataSourceOptions);