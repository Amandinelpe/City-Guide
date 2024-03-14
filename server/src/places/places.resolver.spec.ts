import { Test } from '@nestjs/testing';
import { PlacesResolver } from './places.resolver';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';

describe('PlacesResolver', () => {
  let resolver: PlacesResolver;
  let service: PlacesService;

  beforeEach(async () => {
    const mockPlacesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByCity: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PlacesResolver,
        {
          provide: PlacesService,
          useValue: mockPlacesService,
        },
      ],
    }).compile();

    resolver = module.get<PlacesResolver>(PlacesResolver);
    service = module.get<PlacesService>(PlacesService);
  });

  it('should create a place', async () => {
    const placeInput = {
      name: 'Place 1',
      latitude: 1.23,
      longitude: 4.56,
      address: '123 Main St',
      placeTypeId: 'type1',
      cityId: 'city1',
    };
    const expectedPlace = new Place();
    Object.assign(expectedPlace, placeInput, { id: 'a-unique-id' });

    jest.spyOn(service, 'create').mockResolvedValue(expectedPlace);

    const result = await resolver.createPlace(placeInput);
    expect(result).toEqual(expectedPlace);
    expect(service.create).toHaveBeenCalledWith(placeInput);
  });
});
