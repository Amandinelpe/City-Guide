import { Injectable } from '@nestjs/common';
import { CreatePlaceTypeInput } from './dto/create-place-type.input';
import { UpdatePlaceTypeInput } from './dto/update-place-type.input';
import { PlaceType } from './entities/place-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaceTypesService {
  constructor(@InjectRepository(PlaceType) private readonly placeTypeRepository: Repository<PlaceType>) { }

  create(createPlaceTypeInput: CreatePlaceTypeInput) {
    const newPlaceType = this.placeTypeRepository.create(createPlaceTypeInput);

    return this.placeTypeRepository.save(newPlaceType);
  }

  findAll() {
    return this.placeTypeRepository.find();
  }

  async findOne(id: string): Promise<PlaceType> {
    return await this.placeTypeRepository.findOneByOrFail({ id });
  }

  update(id: string, updatePlaceTypeInput: UpdatePlaceTypeInput) {
    const existingPlaceType = this.placeTypeRepository.findOneByOrFail({ id });

    this.placeTypeRepository.update(id, updatePlaceTypeInput);

    return existingPlaceType;
  }

  remove(id: string) {
    const existingPlaceType = this.placeTypeRepository.findOneByOrFail({ id });

    this.placeTypeRepository.delete(id);

    return existingPlaceType;
  }
}
