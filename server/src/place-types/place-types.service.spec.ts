import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlaceType } from './entities/place-type.entity';
import { PlaceTypesService } from './place-types.service';
import { Repository } from 'typeorm';

describe('PlaceTypesService', () => {
  let service: PlaceTypesService;
  let placeTypeRepo: Partial<Record<keyof Repository<PlaceType>, jest.Mock>>;

  beforeEach(async () => {
    placeTypeRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOneByOrFail: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaceTypesService,
        {
          provide: getRepositoryToken(PlaceType),
          useValue: placeTypeRepo,
        },
      ],
    }).compile();

    service = module.get<PlaceTypesService>(PlaceTypesService);
  });

  it('should create a place type', async () => {
    const createInput = { name: 'Park', googlePlaceTypeName: 'park', activated: true };
    const newPlaceType = new PlaceType();
    Object.assign(newPlaceType, createInput);

    placeTypeRepo.create.mockReturnValue(newPlaceType);
    placeTypeRepo.save.mockResolvedValue(newPlaceType);

    const result = await service.create(createInput);

    expect(placeTypeRepo.create).toHaveBeenCalledWith(createInput);
    expect(placeTypeRepo.save).toHaveBeenCalledWith(newPlaceType);
    expect(result).toEqual(newPlaceType);
  });
});
