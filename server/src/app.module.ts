import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { PlaceTypesModule } from './place-types/place-types.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UploadController } from './upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files/files.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      storage: diskStorage({
        destination: '/app/media',
        filename: (_, file, callback) => {
          const now = new Date();
          const year = now.getFullYear();
          const month = (now.getMonth() + 1).toString().padStart(2, '0');
          const day = now.getDate().toString().padStart(2, '0');
          const hour = now.getHours().toString().padStart(2, '0');
          const minute = now.getMinutes().toString().padStart(2, '0');
          const second = now.getSeconds().toString().padStart(2, '0');
          const formattedDate = `${year}${month}${day}${hour}${minute}${second}`;
          const extension = extname(file.originalname);
          const filename = `${formattedDate}${extension}`;
          callback(null, filename);
        },
      }),
    }),
    UsersModule,
    CitiesModule,
    PlaceTypesModule,
    DatabaseModule,
    PlacesModule,
    AuthModule,
    ReviewsModule,
  ],
  controllers: [UploadController, FilesController],
})
export class AppModule {}
