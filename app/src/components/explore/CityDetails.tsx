import { CityDescription } from "../../models/city-description.model";
import { ICity } from "../../models/city.model";

type CityDetailsProps = {
  selectedCity: ICity | null;
  cityDescription: CityDescription;
  setSectionIndex: (index: number) => void;
};

const CityDetails = ({
  selectedCity,
  cityDescription,
  setSectionIndex,
}: CityDetailsProps) => {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-8 md:gap-6">
      <h2 className="text-black font-bold text-4xl">{cityDescription.name}</h2>
      <p className="text-black lg:text-sm text-xs">
        {cityDescription.description}
      </p>
      <div className="flex flex-col justify-start items-center gap-4 w-full">
        {cityDescription.image && (
          <img
            src={cityDescription.image}
            alt="city description"
            className="w-full h-52 object-cover rounded"
          />
        )}
        {selectedCity && (
          <button
            className="border w-36 h-10 rounded-lg bg-blue text-white text-lg shadow-lg"
            onClick={() => {
              setSectionIndex(1);
            }}
          >
            Explorer
          </button>
        )}
      </div>
    </div>
  );
};

export default CityDetails;
