import { Module } from '@nestjs/common';
import { PlaceTypesService } from './place-types.service';
import { PlaceTypesResolver } from './place-types.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceType } from './entities/place-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceType])],
  providers: [PlaceTypesResolver, PlaceTypesService],
})
export class PlaceTypesModule {}
