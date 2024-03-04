import { Injectable } from '@nestjs/common';
import { CreatePlaceInput } from './dto/create-place.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { PlaceType } from 'src/place-types/entities/place-type.entity';
import { City } from 'src/cities/entities/city.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private readonly placeRepository: Repository<Place>,
    @InjectRepository(PlaceType) private readonly placeTypeRepository: Repository<PlaceType>,
    @InjectRepository(City) private readonly cityRepository: Repository<City>) {}
  
  async create(createPlaceInput: CreatePlaceInput) {
    const placeType = await this.placeTypeRepository.findOneByOrFail({ id: createPlaceInput.placeTypeId });
    const city = await this.cityRepository.findOneByOrFail({ id: createPlaceInput.cityId });

    const newPlace = this.placeRepository.create({
      ...createPlaceInput,
      placeType,
      city
    });

    return this.placeRepository.save(newPlace);
  }

  findAll() {
    return this.placeRepository.find();
  }

  findOne(id: string) {
    return this.placeRepository.findOneByOrFail({ id });
  }

  async findByCity(cityId: string) {
    return await this.placeRepository.find({ where: { city: { id: cityId } } });
  }

  remove(id: string) {
    const existingPlace = this.placeRepository.findOneByOrFail({ id });
    
    this.placeRepository.delete(id);
    
    return existingPlace;
  }
}
