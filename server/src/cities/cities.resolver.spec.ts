import { Test } from '@nestjs/testing';
import { CitiesResolver } from './cities.resolver';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

describe('CitiesResolver', () => {
  let resolver: CitiesResolver;
  let service: Partial<CitiesService>;

  beforeEach(async () => {
    const mockCitiesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        CitiesResolver,
        {
          provide: CitiesService,
          useValue: mockCitiesService,
        },
      ],
    }).compile();

    resolver = module.get<CitiesResolver>(CitiesResolver);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should create a city', async () => {
    const cityInput = { name: 'New City', latitude: 1.23, longitude: 4.56, description: 'A description', image: 'an_image_url' };
    const newCity = new City();
    Object.assign(newCity, cityInput, { id: 'a-unique-id' });

    jest.spyOn(service, 'create').mockResolvedValue(newCity);

    const result = await resolver.createCity(cityInput);
    expect(result).toEqual(newCity);
    expect(service.create).toHaveBeenCalledWith(cityInput);
  });
});
