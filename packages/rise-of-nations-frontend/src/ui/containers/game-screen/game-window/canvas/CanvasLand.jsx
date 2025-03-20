import { observer } from "mobx-react-lite";
import { Group, Rect } from "react-konva";
import { canvasConstants } from "../../../../../common/constants";
import { CanvasBuilding, CanvasUnit } from "../../../../components";
import { gameService } from "../../../../../services";
import { stores } from "../../../../../store";

const { fillColors, tileSize } = canvasConstants;
const currentGame = stores.currentGame;

export const CanvasLand = observer(({ model, tile }) => {
    const fill = tile.isBelongsToCountry ? model.countries[tile.countryIndex].color : fillColors.land;
    const handleClick = () => {
        if (
            tile.isHaveUnit === false ||
            tile.unit.makingMoveInTurn ||
            tile.countryIndex !== currentGame.userCountryIndex
        ) {
            return;
        }
        gameService.onTryingMoveUnit(tile);
    };

    return (
        <Group x={tile.row * tileSize} y={tile.col * tileSize} onClick={handleClick}>
            <Rect width={tileSize} height={tileSize} fill={fill} />
            {tile.isHaveBuilding && <CanvasBuilding type={tile.building} />}
            {tile.isHaveUnit && <CanvasUnit type={tile.unit.type} />}
        </Group>
    );
});
