import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';

@Resolver(() => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) { }

  @Mutation(() => Place)
  async createPlace(@Args('createPlaceInput') createPlaceInput: CreatePlaceInput) {
    return await this.placesService.create(createPlaceInput);
  }

  @Query(() => [Place], { name: 'places' })
  async getPlaces() {
    return await this.placesService.findAll();
  }

  @Query(() => Place, { name: 'place' })
  async getPlace(@Args('id', { type: () => ID }) id: string) {
    return await this.placesService.findOne(id);
  }

  @Query(() => [Place], { name: 'placesByCity' })
  async getPlacesByCity(@Args('cityId', { type: () => ID }) cityId: string) {
    const places = await this.placesService.findByCity(cityId);

    return places.map(place => {
      const total = place.reviews.reduce((acc, review) => acc + review.rating, 0);
      return {
        ...place,
        averageRating: place.reviews.length === 0 ? 0 : total / place.reviews.length
      };
    });
  }

  @Mutation(() => Place)
  async updatePlace(@Args('updatePlaceInput') updatePlaceInput: UpdatePlaceInput) {
    return await this.placesService.update(updatePlaceInput.id, updatePlaceInput);
  }

  @Mutation(() => Place)
  async removePlace(@Args('id', { type: () => ID }) id: string) {
    return await this.placesService.remove(id);
  }
}
