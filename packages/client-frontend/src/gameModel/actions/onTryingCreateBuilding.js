import { stores } from "../../store";

export const onTryingCreateBuilding = (countryIndex) => {
    const model = stores.currentGame.model;
    const country = model.countries[countryIndex];
    return country.land.filter((tile) => (tile.isHaveBuilding || tile.isHaveUnit) === false);
};
