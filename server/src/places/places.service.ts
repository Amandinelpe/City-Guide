import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceInput } from './dto/create-place.input';
import { Place } from './entities/place.entity';
import { PlaceType } from 'src/place-types/entities/place-type.entity';
import { City } from 'src/cities/entities/city.entity';
import { UpdatePlaceInput } from './dto/update-place.input';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private readonly placeRepository: Repository<Place>,
    @InjectRepository(PlaceType) private readonly placeTypeRepository: Repository<PlaceType>,
    @InjectRepository(City) private readonly cityRepository: Repository<City>) { }

  async create(createPlaceInput: CreatePlaceInput): Promise<Place> {
    const placeType = await this.placeTypeRepository.findOneByOrFail({ id: createPlaceInput.placeTypeId });
    const city = await this.cityRepository.findOneByOrFail({ id: createPlaceInput.cityId });

    const newPlace = this.placeRepository.create({
      ...createPlaceInput,
      placeType,
      city
    });

    return await this.placeRepository.save(newPlace);
  }

  async findAll(): Promise<Place[]> {
    return await this.placeRepository.find();
  }

  async findOne(id: string): Promise<Place> {
    return await this.placeRepository.findOneByOrFail({ id });
  }

  async findByCity(cityId: string) {
    return await this.placeRepository.find({ where: { city: { id: cityId } } });
  }

  async update(id: string, updatePlaceInput: UpdatePlaceInput): Promise<Place> {
    await this.placeRepository.findOneByOrFail({ id });
    const placeType = await this.placeTypeRepository.findOneByOrFail({ id: updatePlaceInput.placeTypeId });
    const city = await this.cityRepository.findOneByOrFail({ id: updatePlaceInput.cityId });

    await this.placeRepository.update(id, {
      name: updatePlaceInput.name,
      placeType,
      city
    });

    return await this.placeRepository.findOneByOrFail({ id });
  }

  async remove(id: string): Promise<Place> {
    const existingPlace = await this.placeRepository.findOneByOrFail({ id });

    await this.placeRepository.delete(id);

    return existingPlace;
  }
}
