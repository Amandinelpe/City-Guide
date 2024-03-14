import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { City } from '../cities/entities/city.entity';
import { PlaceType } from '../place-types/entities/place-type.entity';
import { Place } from '../places/entities/place.entity';
import { Review } from '../reviews/entities/review.entity';
import { Role } from '../users/entities/role.entity';
import { User } from '../users/entities/user.entity';

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
