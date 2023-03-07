import { stores } from "../../store";

export const cleanCountry = (countryIndex) => {
    const model = stores.currentGame.model;
    const country = model.countries[countryIndex];
    for (const tile of country.land) {
        tile.setCountryIndex(null);
        tile.setBuilding(null);
        tile.setUnit(null);
    }
    country.clearLand();
    country.setIsIgnorable(true);
};
