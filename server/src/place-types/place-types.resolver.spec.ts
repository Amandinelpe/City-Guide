import { Test, TestingModule } from '@nestjs/testing';
import { PlaceTypesResolver } from './place-types.resolver';
import { PlaceTypesService } from './place-types.service';

describe('PlaceTypesResolver', () => {
  let resolver: PlaceTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceTypesResolver, PlaceTypesService],
    }).compile();

    resolver = module.get<PlaceTypesResolver>(PlaceTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
