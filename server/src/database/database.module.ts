import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.getOrThrow('DATABASE_TYPE'),
          host: configService.getOrThrow('DATABASE_HOST'),
          port: parseInt(configService.getOrThrow('DATABASE_PORT'), 10),
          username: configService.getOrThrow('DATABASE_USERNAME'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
          database: configService.getOrThrow('DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
