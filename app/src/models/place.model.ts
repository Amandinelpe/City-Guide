import { ICity } from "./city.model";
import { PlaceType } from "./place-type.model";
import { Review } from "./review.model";

export interface IPlace {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    placeType: PlaceType;
    city: ICity;
    reviews: Review[];
    averageRating: number;
}