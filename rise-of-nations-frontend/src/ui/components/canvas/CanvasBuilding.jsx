import FarmAsset from "../../containers/game-screen/game-window/canvas/assets/farm.png";
import TowerLvl1 from "../../containers/game-screen/game-window/canvas/assets/tower_lvl1.png";
import TowerLvl2 from "../../containers/game-screen/game-window/canvas/assets/tower_lvl2.png";
import useImage from "use-image";
import { Image } from "react-konva";
import { canvasConstants, gameConstants } from "../../../common/constants";

const { tileSize } = canvasConstants;
const { buildingTypes } = gameConstants;

const buildingTypeToAssetUrl = {
    [buildingTypes.farm]: FarmAsset,
    [buildingTypes.tower1]: TowerLvl1,
    [buildingTypes.tower2]: TowerLvl2,
};
export const CanvasBuilding = ({ type, opacity }) => {
    const [image] = useImage(buildingTypeToAssetUrl[type]);
    return <Image image={image} width={tileSize} height={tileSize} opacity={opacity} />;
};
