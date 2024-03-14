import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceInput } from './dto/create-place.input';
import { Place } from './entities/place.entity';
import { UpdatePlaceInput } from './dto/update-place.input';
import { CitiesService } from '../cities/cities.service';
import { PlaceTypesService } from '../place-types/place-types.service';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private readonly placeRepository: Repository<Place>,
    private readonly citiesService: CitiesService,
    private readonly placeTypesService: PlaceTypesService) { }

  async create(createPlaceInput: CreatePlaceInput): Promise<Place> {
    const placeType = await this.placeTypesService.findOne(createPlaceInput.placeTypeId);
    const city = await this.citiesService.findOne(createPlaceInput.cityId);

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
    const placeType = await this.placeTypesService.findOne(updatePlaceInput.placeTypeId);
    const city = await this.citiesService.findOne(updatePlaceInput.cityId);

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
