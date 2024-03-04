import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';

@Resolver(() => City)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation(() => City)
  createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return this.citiesService.create(createCityInput);
  }

  @Query(() => [City], { name: 'cities' })
  getCities() {
    return this.citiesService.findAll();
  }

  @Query(() => City, { name: 'city' })
  getCity(@Args('id', { type: () => ID }) id: string) {
    return this.citiesService.findOne(id);
  }

  @Mutation(() => City)
  removeCity(@Args('id', { type: () => ID }) id: string) {
    return this.citiesService.remove(id);
  }
}
