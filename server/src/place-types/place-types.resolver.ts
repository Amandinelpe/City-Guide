import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaceTypesService } from './place-types.service';
import { PlaceType } from './entities/place-type.entity';
import { CreatePlaceTypeInput } from './dto/create-place-type.input';
import { UpdatePlaceTypeInput } from './dto/update-place-type.input';

@Resolver(() => PlaceType)
export class PlaceTypesResolver {
  constructor(private readonly placeTypesService: PlaceTypesService) {}

  @Mutation(() => PlaceType)
  createPlaceType(@Args('createPlaceTypeInput') createPlaceTypeInput: CreatePlaceTypeInput) {
    return this.placeTypesService.create(createPlaceTypeInput);
  }

  @Query(() => [PlaceType], { name: 'placeTypes' })
  getPlaceTypes() {
    return this.placeTypesService.findAll();
  }

  @Query(() => PlaceType, { name: 'placeType' })
  getPlaceType(@Args('id', { type: () => Int }) id: string) {
    return this.placeTypesService.findOne(id);
  }

  @Mutation(() => PlaceType)
  updatePlaceType(@Args('updatePlaceTypeInput') updatePlaceTypeInput: UpdatePlaceTypeInput) {
    return this.placeTypesService.update(updatePlaceTypeInput.id, updatePlaceTypeInput);
  }

  @Mutation(() => PlaceType)
  removePlaceType(@Args('id', { type: () => Int }) id: string) {
    return this.placeTypesService.remove(id);
  }
}
