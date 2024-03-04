import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertPlaceTypes1706285053873 implements MigrationInterface {
    private readonly logger = new Logger(InsertPlaceTypes1706285053873.name);

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting place types...");
        const placeTypes = [
            { googlePlaceTypeName: "accounting", name: "Comptabilité" },
            { googlePlaceTypeName: "airport", name: "Aéroport" },
            { googlePlaceTypeName: "amusement_park", name: "Parc d'attractions" },
            { googlePlaceTypeName: "aquarium", name: "Aquarium" },
            { googlePlaceTypeName: "art_gallery", name: "Galerie d'art" },
            { googlePlaceTypeName: "atm", name: "Distributeur automatique de billets" },
            { googlePlaceTypeName: "bakery", name: "Boulangerie" },
            { googlePlaceTypeName: "bank", name: "Banque" },
            { googlePlaceTypeName: "bar", name: "Bar" },
            { googlePlaceTypeName: "beauty_salon", name: "Salon de beauté" },
            { googlePlaceTypeName: "bicycle_store", name: "Magasin de vélos" },
            { googlePlaceTypeName: "book_store", name: "Librairie" },
            { googlePlaceTypeName: "bowling_alley", name: "Bowling" },
            { googlePlaceTypeName: "bus_station", name: "Gare routière" },
            { googlePlaceTypeName: "cafe", name: "Café" },
            { googlePlaceTypeName: "campground", name: "Camping" },
            { googlePlaceTypeName: "car_dealer", name: "Concessionnaire automobile" },
            { googlePlaceTypeName: "car_rental", name: "Location de voitures" },
            { googlePlaceTypeName: "car_repair", name: "Réparation de voitures" },
            { googlePlaceTypeName: "car_wash", name: "Lavage de voitures" },
            { googlePlaceTypeName: "casino", name: "Casino" },
            { googlePlaceTypeName: "cemetery", name: "Cimetière" },
            { googlePlaceTypeName: "church", name: "Église" },
            { googlePlaceTypeName: "city_hall", name: "Hôtel de ville" },
            { googlePlaceTypeName: "clothing_store", name: "Magasin de vêtements" },
            { googlePlaceTypeName: "convenience_store", name: "Dépanneur" },
            { googlePlaceTypeName: "courthouse", name: "Tribunal" },
            { googlePlaceTypeName: "dentist", name: "Dentiste" },
            { googlePlaceTypeName: "department_store", name: "Grand magasin" },
            { googlePlaceTypeName: "doctor", name: "Médecin" },
            { googlePlaceTypeName: "drugstore", name: "Droguerie" },
            { googlePlaceTypeName: "electrician", name: "Électricien" },
            { googlePlaceTypeName: "electronics_store", name: "Magasin d'électronique" },
            { googlePlaceTypeName: "embassy", name: "Ambassade" },
            { googlePlaceTypeName: "fire_station", name: "Caserne de pompiers" },
            { googlePlaceTypeName: "florist", name: "Fleuriste" },
            { googlePlaceTypeName: "funeral_home", name: "Funérarium" },
            { googlePlaceTypeName: "furniture_store", name: "Magasin de meubles" },
            { googlePlaceTypeName: "gas_station", name: "Station-service" },
            { googlePlaceTypeName: "gym", name: "Gymnase" },
            { googlePlaceTypeName: "hair_care", name: "Soins capillaires" },
            { googlePlaceTypeName: "hardware_store", name: "Quincaillerie" },
            { googlePlaceTypeName: "hindu_temple", name: "Temple hindou" },
            { googlePlaceTypeName: "home_goods_store", name: "Magasin d'articles ménagers" },
            { googlePlaceTypeName: "hospital", name: "Hôpital" },
            { googlePlaceTypeName: "insurance_agency", name: "Agence d'assurance" },
            { googlePlaceTypeName: "jewelry_store", name: "Magasin de bijoux" },
            { googlePlaceTypeName: "laundry", name: "Laverie" },
            { googlePlaceTypeName: "lawyer", name: "Avocat" },
            { googlePlaceTypeName: "library", name: "Bibliothèque" },
            { googlePlaceTypeName: "light_rail_station", name: "Gare de tramway" },
            { googlePlaceTypeName: "liquor_store", name: "Magasin d'alcool" },
            { googlePlaceTypeName: "local_government_office", name: "Bureau du gouvernement local" },
            { googlePlaceTypeName: "locksmith", name: "Serrurier" },
            { googlePlaceTypeName: "lodging", name: "Logement" },
            { googlePlaceTypeName: "meal_delivery", name: "Livraison de repas" },
            { googlePlaceTypeName: "meal_takeaway", name: "À emporter" },
            { googlePlaceTypeName: "mosque", name: "Mosquée" },
            { googlePlaceTypeName: "movie_rental", name: "Location de films" },
            { googlePlaceTypeName: "movie_theater", name: "Cinéma" },
            { googlePlaceTypeName: "moving_company", name: "Entreprise de déménagement" },
            { googlePlaceTypeName: "museum", name: "Musée" },
            { googlePlaceTypeName: "night_club", name: "Boîte de nuit" },
            { googlePlaceTypeName: "painter", name: "Peintre" },
            { googlePlaceTypeName: "park", name: "Parc" },
            { googlePlaceTypeName: "parking", name: "Stationnement" },
            { googlePlaceTypeName: "pet_store", name: "Magasin pour animaux de compagnie" },
            { googlePlaceTypeName: "pharmacy", name: "Pharmacie" },
            { googlePlaceTypeName: "physiotherapist", name: "Physiothérapeute" },
            { googlePlaceTypeName: "plumber", name: "Plombier" },
            { googlePlaceTypeName: "police", name: "Police" },
            { googlePlaceTypeName: "post_office", name: "Bureau de poste" },
            { googlePlaceTypeName: "primary_school", name: "École primaire" },
            { googlePlaceTypeName: "real_estate_agency", name: "Agence immobilière" },
            { googlePlaceTypeName: "restaurant", name: "Restaurant" },
            { googlePlaceTypeName: "roofing_contractor", name: "Entrepreneur en toiture" },
            { googlePlaceTypeName: "rv_park", name: "Parc de camping-cars" },
            { googlePlaceTypeName: "school", name: "École" },
            { googlePlaceTypeName: "secondary_school", name: "École secondaire" },
            { googlePlaceTypeName: "shoe_store", name: "Magasin de chaussures" },
            { googlePlaceTypeName: "shopping_mall", name: "Centre commercial" },
            { googlePlaceTypeName: "spa", name: "Spa" },
            { googlePlaceTypeName: "stadium", name: "Stade" },
            { googlePlaceTypeName: "storage", name: "Stockage" },
            { googlePlaceTypeName: "store", name: "Magasin" },
            { googlePlaceTypeName: "subway_station", name: "Station de métro" },
            { googlePlaceTypeName: "supermarket", name: "Supermarché" },
            { googlePlaceTypeName: "synagogue", name: "Synagogue" },
            { googlePlaceTypeName: "taxi_stand", name: "Station de taxi" },
            { googlePlaceTypeName: "tourist_attraction", name: "Attraction touristique" },
            { googlePlaceTypeName: "train_station", name: "Gare ferroviaire" },
            { googlePlaceTypeName: "transit_station", name: "Station de transit" },
            { googlePlaceTypeName: "travel_agency", name: "Agence de voyage" },
            { googlePlaceTypeName: "university", name: "Université" },
            { googlePlaceTypeName: "veterinary_care", name: "Soins vétérinaires" },
            { googlePlaceTypeName: "zoo", name: "Zoo" }
        ];

        for (const placeTypeInfo of placeTypes) {
            await queryRunner.query(
                `INSERT INTO place_type ("googlePlaceTypeName", "name", "activated") VALUES ('${placeTypeInfo.googlePlaceTypeName}', '${this.escapeSingleQuotes(placeTypeInfo.name)}', false)`
            );
        }
        this.logger.log("Place types inserted");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Deleting place types...");
        await queryRunner.query(`DELETE FROM place_type`);
        this.logger.log("Place types deleted");
    }

    escapeSingleQuotes(str: string): string {
        return str.replace(/'/g, "''");
    }
}
