import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

@Resolver(() => City)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) { }

  @Mutation(() => City)
  async createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return await this.citiesService.create(createCityInput);
  }

  @Query(() => [City], { name: 'cities' })
  async getCities() {
    return await this.citiesService.findAll();
  }

  @Query(() => City, { name: 'city' })
  async getCity(@Args('id', { type: () => ID }) id: string) {
    return await this.citiesService.findOne(id);
  }

  @Mutation(() => City)
  async updateCity(@Args('updateCityInput') updateCityInput: UpdateCityInput) {
    return await this.citiesService.update(updateCityInput.id, updateCityInput);
  }

  @Mutation(() => City)
  async removeCity(@Args('id', { type: () => ID }) id: string) {
    return await this.citiesService.remove(id);
  }
}
