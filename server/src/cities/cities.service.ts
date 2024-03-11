import { Injectable } from '@nestjs/common';
import { CreateCityInput } from './dto/create-city.input';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { UpdateCityInput } from './dto/update-city.input';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>) { }

  async create(createCityInput: CreateCityInput): Promise<City> {
    const newCity = this.cityRepository.create(createCityInput);

    return await this.cityRepository.save(newCity);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find();
  }

  async findOne(id: string): Promise<City> {
    return await this.cityRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateCityInput: UpdateCityInput): Promise<City> {
    const existingCity = await this.cityRepository.findOneByOrFail({ id });

    await this.cityRepository.update(id, updateCityInput);

    return existingCity;
  }

  async remove(id: string): Promise<City> {
    const existingCity = await this.cityRepository.findOneByOrFail({ id });

    await this.cityRepository.delete(id);

    return existingCity;
  }
}
