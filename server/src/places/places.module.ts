import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceTypesService } from '../place-types/place-types.service';
import { CitiesService } from '../cities/cities.service';
import { CitiesModule } from '../cities/cities.module';
import { PlaceType } from '../place-types/entities/place-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, PlaceType]), CitiesModule],
  providers: [PlacesResolver, PlacesService, CitiesService, PlaceTypesService],

})
export class PlacesModule { }
