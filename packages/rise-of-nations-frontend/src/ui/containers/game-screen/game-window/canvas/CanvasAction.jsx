import { CanvasCreationUnit, CanvasCreationBuilding } from "../../../../components";
import { canvasConstants, gameConstants } from "../../../../../common/constants";
import { gameService } from "../../../../../services";
import { stores } from "../../../../../store";
import { observer } from "mobx-react-lite";
import { Ellipse } from "react-konva";

const { tileSize, strokeColors } = canvasConstants;
const halfTileSize = tileSize / 2;

const TryingCreateUnitAction = ({ possibleTiles, creationUnitType }) => {
    const handleClick = (tile) => {
        gameService.onAction(gameConstants.actions.createUnit, {
            tileRow: tile.row,
            tileCol: tile.col,
            unitType: creationUnitType,
        });
    };

    return possibleTiles.map((tile, index) => (
        <CanvasCreationUnit key={index} unitType={creationUnitType} tile={tile} onClick={handleClick} />
    ));
};

const TryingCreateBuildingAction = ({ possibleTiles, creationBuildingType }) => {
    const handleClick = (tile) => {
        gameService.onAction(gameConstants.actions.createBuilding, {
            tileRow: tile.row,
            tileCol: tile.col,
            buildingType: creationBuildingType,
        });
    };

    return possibleTiles.map((tile, index) => (
        <CanvasCreationBuilding
            key={index}
            buildingType={creationBuildingType}
            tile={tile}
            onClick={handleClick}
        />
    ));
};

const TryingMoveUnitAction = ({ movingUnitTile, possibleTiles }) => {
    const handleClick = (tile) => {
        gameService.onAction(gameConstants.actions.moveUnit, {
            tileRow: movingUnitTile.row,
            tileCol: movingUnitTile.col,
            tileRowMove: tile.row,
            tileColMove: tile.col,
        });
    };

    const tiles = possibleTiles.map((tile, index) => (
        <CanvasCreationUnit
            key={index}
            unitType={movingUnitTile.unit.type}
            tile={tile}
            onClick={handleClick}
        />
    ));

    return (
        <>
            <Ellipse
                onClick={() => gameService.onTryingMoveUnit(movingUnitTile)}
                x={movingUnitTile.row * tileSize + halfTileSize}
                y={movingUnitTile.col * tileSize + halfTileSize}
                radiusX={halfTileSize}
                radiusY={halfTileSize}
                stroke={strokeColors.tileSelected}
                strokeWidth={2}
            />
            {tiles}
        </>
    );
};

export const CanvasAction = observer(() => {
    const currentAction = stores.canvas.currentAction;
    const possibleTiles = stores.canvas.possibleTiles;
    const creationUnitType = stores.canvas.creationUnitType;
    const creationBuildingType = stores.canvas.creationBuildingType;
    const movingUnitTile = stores.canvas.movingUnitTile;

    if (currentAction === canvasConstants.actions.tryingCreateUnit) {
        return <TryingCreateUnitAction possibleTiles={possibleTiles} creationUnitType={creationUnitType} />;
    }
    if (currentAction === canvasConstants.actions.tryingCreateBuilding) {
        return (
            <TryingCreateBuildingAction
                possibleTiles={possibleTiles}
                creationBuildingType={creationBuildingType}
            />
        );
    }
    if (currentAction === canvasConstants.actions.tryingMoveUnit) {
        return <TryingMoveUnitAction possibleTiles={possibleTiles} movingUnitTile={movingUnitTile} />;
    }

    return null;
});
