import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { City } from 'src/cities/entities/city.entity';
import { PlaceType } from 'src/place-types/entities/place-type.entity';
import { Place } from 'src/places/entities/place.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>('DATABASE_TYPE'),
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [City, PlaceType, Place, Review, User, Role],
          autoLoadEntities: true,
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
