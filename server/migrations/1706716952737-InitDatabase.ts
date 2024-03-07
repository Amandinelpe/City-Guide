import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";
import { fakerFR as faker } from '@faker-js/faker'
import { Role } from "../src/users/entities/role.entity";
import { User, hashPassword } from "../src/users/entities/user.entity";
import { City } from "../src/cities/entities/city.entity";
import { PlaceType } from "../src/place-types/entities/place-type.entity";
import { Place } from "../src/places/entities/place.entity";
import { Review } from "../src/reviews/entities/review.entity";

export class InitDatabase1706716952737 implements MigrationInterface {
    private readonly logger = new Logger(InitDatabase1706716952737.name);

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Initialize database...");
        await this.resetTables(queryRunner);

        await this.insertRoles(queryRunner);
        await this.insertUsers(queryRunner);
        await this.insertCities(queryRunner);
        await this.insertPlaceTypes(queryRunner);
        await this.insertPlaces(queryRunner);
        await this.insertReviews(queryRunner);
        this.logger.log("Database initialized");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Deleting all data...");
        await this.resetTables(queryRunner);
        this.logger.log("All data deleted");
    }

    private async resetTables(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Resetting all tables...");

        await queryRunner.query(`SET CONSTRAINTS ALL DEFERRED`);

        await queryRunner.query(`DELETE FROM "review"`);
        await queryRunner.query(`DELETE FROM "place"`);
        await queryRunner.query(`DELETE FROM "place_type"`);
        await queryRunner.query(`DELETE FROM "city"`);
        await queryRunner.query(`DELETE FROM "user"`);
        await queryRunner.query(`DELETE FROM "role"`);

        await queryRunner.query(`SET CONSTRAINTS ALL IMMEDIATE`);

        this.logger.log("All tables reset");
    }

    private async insertRoles(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting roles...");
        const roles: Role[] = [
            queryRunner.manager.create(Role, { id: 1, name: "Utilisateur" }),
            queryRunner.manager.create(Role, { id: 2, name: "Administrateur" }),
        ];

        await queryRunner.manager.save(roles);
        this.logger.log("Roles inserted");
    }

    private async insertUsers(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting users...");

        const userRole = await queryRunner.manager.findOneOrFail(Role, { where: { name: "Utilisateur" } });
        const adminRole = await queryRunner.manager.findOneOrFail(Role, { where: { name: "Administrateur" } });

        const hashedPassword = await hashPassword("test");

        const testUsers: User[] = [
            {
                email: 'admin@gmail.com',
                password: hashedPassword,
                firstName: 'Amandine',
                lastName: 'Leporace',
                role: adminRole,
            } as User,
            {
                email: 'leporace.amandine@gmail.com',
                password: hashedPassword,
                firstName: 'Amandine',
                lastName: 'Leporace',
                role: userRole,
            } as User,
        ];

        const users = queryRunner.manager.create(User, testUsers);
        await queryRunner.manager.save(users);

        for (let i = 0; i < 20; i++) {
            const user = queryRunner.manager.create(User, {
                email: faker.internet.email(),
                password: hashedPassword,
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                role: userRole,
            });

            await queryRunner.manager.save(user);
        }

        this.logger.log("Users inserted");
    }

    private async insertCities(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting cities...");

        const citiesData: City[] = [
            {
                name: "Bordeaux",
                description: `Bordeaux est une ville dynamique située dans le sud-ouest de la France, réputée pour son vin, son architecture élégante et son ambiance conviviale.\n\nParmi ses lieux d'intérêt :\n- Le Quartier Saint-Pierre\n- La Cité du Vin\n- La Place des Quinconces\n- Le Pont de Pierre\n- La Rue Sainte-Catherine\n- La Basilique Saint-Michel`,
                latitude: 44.837789,
                longitude: -0.57918,
                image: '20240227102844.webp'
            } as City,
            {
                name: "Marseille",
                description: `Marseille, la plus grande ville du sud de la France, est un melting-pot vibrant de cultures méditerranéennes, offrant un mélange unique de patrimoine historique, de cuisine délicieuse et de paysages pittoresques. \nVoici quelques-uns de ses lieux d''intérêt :\n- Le Vieux-Port\n- La Basilique Notre-Dame de la Garde\n- Le quartier du Panier\n- Le Parc national des Calanques`,
                latitude: 43.296482,
                longitude: 5.36978,
                image: '20240227103149.jpeg'
            } as City,
            {
                name: "Paris",
                description: `Paris, la ville lumière, est une métropole vibrante et culturellement riche, regorgeant de sites emblématiques et de quartiers pittoresques.\nVoici quelques-uns de ses lieux d''intérêt :\n- La Tour Eiffel\n- Le Louvre\n- Notre-Dame de Paris\n- Les Champs-Élysées\n- Montmartre\n\nParis offre également une multitude de parcs et de jardins pittoresques, des croisières sur la Seine, une scène gastronomique renommée.`,
                latitude: 48.856614,
                longitude: 2.3522219,
                image: '20240227103448.jpeg'
            } as City,
        ];

        const cities = queryRunner.manager.create(City, citiesData);

        await queryRunner.manager.save(cities);
        this.logger.log("Cities inserted");
    }

    private async insertPlaceTypes(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting place types...");

        const placeTypesData = [
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

        for (const placeTypeInfo of placeTypesData) {
            await queryRunner.query(
                `INSERT INTO place_type ("googlePlaceTypeName", "name", "activated") VALUES ('${placeTypeInfo.googlePlaceTypeName}', '${this.escapeSingleQuotes(placeTypeInfo.name)}', false)`
            );
        }
        this.logger.log("Place types inserted");
    }

    private async insertPlaces(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting places...");

        const placesData = [
            { name: "La Cité du Vin", latitude: 44.8624022, longitude: -0.5506215, address: "134 Quai de Bacalan, 33300 Bordeaux", placeTypeName: "Musée", cityName: "Bordeaux" },
            { name: "CAPC musée d'art contemporain de Bordeaux", latitude: 44.848285, longitude: -0.572163, address: "7 Rue Ferrere, 33000 Bordeaux", placeTypeName: "Musée", cityName: "Bordeaux" },
            { name: "Musée d'Aquitaine", latitude: 44.8355592, longitude: -0.5749556, address: "20 Cours Pasteur, 33000 Bordeaux", placeTypeName: "Musée", cityName: "Bordeaux" },
            { name: "Musée des Beaux-Arts de Bordeaux", latitude: 44.837366, longitude: -0.580543, address: "20 Cours d'Albret, 33000 Bordeaux", placeTypeName: "Musée", cityName: "Bordeaux" },
            { name: "Gare Saint Jean - Belcier", latitude: 44.8245925, longitude: -0.5547879, address: "137 Rue des Terres de Borde, 33800 Bordeaux", placeTypeName: "Gare routière", cityName: "Bordeaux" },
            { name: "Auchan Hypermarché Bordeaux-Lac", latitude: 44.8807385, longitude: -0.5662981, address: "Avenue des 40 Journaux, 33300 Bordeaux", placeTypeName: "Supermarché", cityName: "Bordeaux" },
            { name: "Auchan Hypermarché Bordeaux Mériadeck", latitude: 44.8390208, longitude: -0.5833709, address: "Rue Claude Bonnier, 33000 Bordeaux", placeTypeName: "Supermarché", cityName: "Bordeaux" },
            { name: "Carrefour Market Bordeaux Grands Hommes", latitude: 44.843325, longitude: -0.5772856, address: "Place des Grands Hommes, 33000 Bordeaux", placeTypeName: "Supermarché", cityName: "Bordeaux" },
            { name: "Monop' Bordeaux Intendance", latitude: 44.8422808, longitude: -0.5742952, address: "4 Cours de l'Intendance, 33000 Bordeaux", placeTypeName: "Supermarché", cityName: "Bordeaux" },
            { name: "Lidl", latitude: 44.86214, longitude: -0.555719, address: "44 Rue Lucien Faure, 33300 Bordeaux", placeTypeName: "Supermarché", cityName: "Bordeaux" },
            { name: "InterContinental Bordeaux - Le Grand Hôtel, un hôtel IHG", latitude: 44.8424207, longitude: -0.5748135, address: "2-5 Place de la Comédie, 33000 Bordeaux", placeTypeName: "Logement", cityName: "Bordeaux" },
            { name: "ibis Bordeaux Centre Mériadeck", latitude: 44.8364272, longitude: -0.583126, address: "35 Cours Maréchal Juin, 33000 Bordeaux", placeTypeName: "Logement", cityName: "Bordeaux" },
        ];

        for (const placeData of placesData) {
            const placeType = await queryRunner.manager.findOneOrFail(PlaceType, { where: { name: placeData.placeTypeName } });
            const city = await queryRunner.manager.findOneOrFail(City, { where: { name: placeData.cityName } });

            const place = queryRunner.manager.create(Place, {
                name: placeData.name,
                latitude: placeData.latitude,
                longitude: placeData.longitude,
                address: placeData.address,
                placeType: placeType,
                city: city,
            });

            await queryRunner.manager.save(place);
        }

        this.logger.log("Places inserted");
    }

    private async insertReviews(queryRunner: QueryRunner): Promise<void> {
        this.logger.log("Inserting reviews...");

        const users = await queryRunner.manager.findBy(User, { role: { name: "Utilisateur" } });
        const places = await queryRunner.manager.find(Place);

        for (let i = 0; i < 100; i++) {
            const user = faker.helpers.arrayElement(users);
            const place = faker.helpers.arrayElement(places);

            const review = queryRunner.manager.create(Review, {
                user: user,
                place: place,
                rating: faker.number.int({ min: 1, max: 5 }),
                comment: faker.lorem.sentence(),
            });

            await queryRunner.manager.save(review);
        }

        this.logger.log("Reviews inserted");
    }

    private escapeSingleQuotes(str: string): string {
        return str.replace(/'/g, "''");
    }
}
