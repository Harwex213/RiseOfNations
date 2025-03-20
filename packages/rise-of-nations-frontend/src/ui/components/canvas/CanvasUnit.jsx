import UnitLvl1 from "../../containers/game-screen/game-window/canvas/assets/unit_lvl1.png";
import UnitLvl2 from "../../containers/game-screen/game-window/canvas/assets/unit_lvl2.png";
import UnitLvl3 from "../../containers/game-screen/game-window/canvas/assets/unit_lvl3.png";
import useImage from "use-image";
import { Image } from "react-konva";
import { canvasConstants, gameConstants } from "../../../common/constants";

const { tileSize } = canvasConstants;
const { unitTypes } = gameConstants;

const unitTypeToAssetUrl = {
    [unitTypes.lvl1]: UnitLvl1,
    [unitTypes.lvl2]: UnitLvl2,
    [unitTypes.lvl3]: UnitLvl3,
};
export const CanvasUnit = ({ type, opacity }) => {
    const [image] = useImage(unitTypeToAssetUrl[type]);
    return <Image image={image} width={tileSize} height={tileSize} opacity={opacity} />;
};
