import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { CitiesService } from '../cities/cities.service';
import { PlaceTypesService } from '../place-types/place-types.service';
import { PlaceType } from '../place-types/entities/place-type.entity';
import { City } from '../cities/entities/city.entity';

describe('PlacesService', () => {
  let service: PlacesService;
  let placeRepo: Partial<Record<keyof Repository<Place>, jest.Mock>>;
  let citiesService: Partial<CitiesService>;
  let placeTypesService: Partial<PlaceTypesService>;

  beforeEach(async () => {
    placeRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOneByOrFail: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as Partial<Record<keyof Repository<Place>, jest.Mock>>;

    citiesService = {
      findOne: jest.fn(),
    } as Partial<CitiesService> as jest.Mocked<CitiesService>;

    placeTypesService = {
      findOne: jest.fn(),
    } as Partial<PlaceTypesService> as jest.Mocked<PlaceTypesService>;

    const module = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useValue: placeRepo,
        },
        {
          provide: CitiesService,
          useValue: citiesService,
        },
        {
          provide: PlaceTypesService,
          useValue: placeTypesService,
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('should create a place', async () => {
    const placeInput = {
      name: 'New Place',
      latitude: 1.23,
      longitude: 4.56,
      address: '123 Main St',
      placeTypeId: 'type1',
      cityId: 'city1',
    };

    const placeType = { id: placeInput.placeTypeId, name: 'Type 1' } as PlaceType;
    const city = { id: placeInput.cityId, name: 'City 1' } as City;
    const expectedPlace = new Place();
    Object.assign(expectedPlace, placeInput, { placeType, city });

    placeTypesService.findOne = jest.fn().mockResolvedValue(placeType);
    citiesService.findOne = jest.fn().mockResolvedValue(city);
    placeRepo.create.mockReturnValue(expectedPlace);
    placeRepo.save.mockResolvedValue(expectedPlace);

    const result = await service.create(placeInput);

    expect(result).toEqual(expectedPlace);
    expect(placeTypesService.findOne).toHaveBeenCalledWith(placeInput.placeTypeId);
    expect(citiesService.findOne).toHaveBeenCalledWith(placeInput.cityId);
    expect(placeRepo.create).toHaveBeenCalledWith({
      ...placeInput,
      placeType,
      city,
    });
    expect(placeRepo.save).toHaveBeenCalledWith(expectedPlace);
  });
});
