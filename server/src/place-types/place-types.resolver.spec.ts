import { Test } from '@nestjs/testing';
import { PlaceTypesResolver } from './place-types.resolver';
import { PlaceTypesService } from './place-types.service';
import { PlaceType } from './entities/place-type.entity';

describe('PlaceTypesResolver', () => {
  let resolver: PlaceTypesResolver;
  let service: Partial<PlaceTypesService>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaceTypesResolver,
        {
          provide: PlaceTypesService,
          useValue: service,
        },
      ],
    }).compile();

    resolver = module.get<PlaceTypesResolver>(PlaceTypesResolver);
  });

  it('should create a place type', async () => {
    const createInput = { name: 'Park', googlePlaceTypeName: 'park', activated: true };
    const newPlaceType = new PlaceType();
    Object.assign(newPlaceType, createInput, { id: 'uuid' });

    jest.spyOn(service, 'create').mockResolvedValue(newPlaceType);

    const result = await resolver.createPlaceType(createInput);
    expect(result).toEqual(newPlaceType);
    expect(service.create).toHaveBeenCalledWith(createInput);
  });
});
