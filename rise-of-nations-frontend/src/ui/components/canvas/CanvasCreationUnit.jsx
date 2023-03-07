import { useState } from "react";
import { Group, Rect } from "react-konva";
import { canvasConstants } from "../../../common/constants";
import { CanvasUnit } from "./CanvasUnit";

const { strokeColors, tileSize } = canvasConstants;

export const CanvasCreationUnit = ({ unitType, tile, onClick }) => {
    const [hover, setHover] = useState(false);

    return (
        <Group
            x={tile.row * tileSize}
            y={tile.col * tileSize}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => onClick(tile)}
        >
            <Rect width={tileSize} height={tileSize} stroke={strokeColors.creationUnit} strokeWidth={1} />
            {hover && <CanvasUnit type={unitType} opacity={0.75} />}
        </Group>
    );
};
