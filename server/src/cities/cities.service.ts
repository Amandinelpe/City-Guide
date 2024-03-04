import { Injectable } from '@nestjs/common';
import { CreateCityInput } from './dto/create-city.input';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>) {}
  
  create(createCityInput: CreateCityInput) {
    const newCity = this.cityRepository.create(createCityInput);

    return this.cityRepository.save(newCity);
  }

  async findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  findOne(id: string): Promise<City> {
    return this.cityRepository.findOneByOrFail({ id });
  }

  remove(id: string) {
    const existingCity = this.cityRepository.findOneByOrFail({ id });
    
    this.cityRepository.delete(id);
    
    return existingCity;
  }
}
