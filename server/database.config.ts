import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/users/entities/user.entity';
import { PlaceType } from './src/place-types/entities/place-type.entity';
import { City } from './src/cities/entities/city.entity';
import { Place } from './src/places/entities/place.entity';
import { Role } from './src/users/entities/role.entity';
import { Review } from './src/reviews/entities/review.entity';

const configService = new ConfigService();

const db = new DataSource({
  type: configService.get<string>('DATABASE_TYPE'),
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [User, PlaceType, City, Place, Role, Review],
  migrations: ["migrations/**"],
} as DataSourceOptions);

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity: any) => `"${entity.tableName}"`)
    .join(', ');

  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;