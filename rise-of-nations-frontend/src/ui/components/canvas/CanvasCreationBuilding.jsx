import { useState } from "react";
import { Group, Rect } from "react-konva";
import { canvasConstants } from "../../../common/constants";
import { CanvasBuilding } from "./CanvasBuilding";

const { strokeColors, tileSize } = canvasConstants;

export const CanvasCreationBuilding = ({ buildingType, tile, onClick }) => {
    const [hover, setHover] = useState(false);

    return (
        <Group
            x={tile.row * tileSize}
            y={tile.col * tileSize}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => onClick(tile)}
        >
            <Rect width={tileSize} height={tileSize} stroke={strokeColors.creationBuilding} strokeWidth={1} />
            {hover && <CanvasBuilding type={buildingType} opacity={0.75} />}
        </Group>
    );
};
