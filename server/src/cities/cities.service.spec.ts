import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

describe('CitiesService', () => {
  let service: CitiesService;
  let cityRepo: Partial<Record<keyof Repository<City>, jest.Mock>>;

  beforeEach(async () => {
    cityRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOneByOrFail: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as Partial<Record<keyof Repository<City>, jest.Mock>>;

    const module = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useValue: cityRepo,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should create a city', async () => {
    const cityInput = { name: 'New City', latitude: 1.23, longitude: 4.56, description: 'A description', image: 'an_image_url' };
    const newCity = new City();
    Object.assign(newCity, cityInput);

    cityRepo.create.mockReturnValue(newCity);
    cityRepo.save.mockResolvedValue(newCity);

    const result = await service.create(cityInput);

    expect(result).toEqual(newCity);
    expect(cityRepo.create).toHaveBeenCalledWith(cityInput);
    expect(cityRepo.save).toHaveBeenCalledWith(newCity);
  });
});
