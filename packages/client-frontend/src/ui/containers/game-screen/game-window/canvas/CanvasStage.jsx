import { Stage, Layer, Rect } from "react-konva";
import { gameConstants, canvasConstants } from "../../../../../common/constants";
import { observer } from "mobx-react-lite";
import { CanvasLand } from "./CanvasLand";
import { stores } from "../../../../../store";
import { CanvasAction } from "./CanvasAction";

const canvasStore = stores.canvas;
const mapSizes = gameConstants.generationMapConfig.mapSizes;
const { fillColors, tileSize } = canvasConstants;
const stageSizes = {
    width: mapSizes.width * tileSize,
    height: mapSizes.height * tileSize,
};

export const CanvasStage = observer(({ model }) => {
    const tiles = model.tilesArray.map((tile, index) => <CanvasLand key={index} model={model} tile={tile} />);

    return (
        <Stage width={stageSizes.width} height={stageSizes.height}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={stageSizes.width}
                    height={stageSizes.height}
                    fill={fillColors.background}
                />
                {tiles}
                {canvasStore.isActionSet && <CanvasAction />}
            </Layer>
        </Stage>
    );
});
