import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceTypesService } from '../place-types/place-types.service';
import { CitiesService } from '../cities/cities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [PlacesResolver, PlacesService, CitiesService, PlaceTypesService],
})
export class PlacesModule { }
