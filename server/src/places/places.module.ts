import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceType } from '../place-types/entities/place-type.entity';
import { City } from '../cities/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, PlaceType, City])],
  providers: [PlacesResolver, PlacesService],
})
export class PlacesModule { }
