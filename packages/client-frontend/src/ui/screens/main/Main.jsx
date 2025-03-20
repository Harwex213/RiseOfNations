import { useRef, useState } from "react";
import tileGrass from "./samples/tile_grass.png";
import { ReactComponent as Warrior } from "./samples/unit.svg";
import "./Main.css";

const teams = {
    red: "red",
    blue: "blue",
};

const unitTypes = {
    warrior: "warrior",
};
const unitTypeToIcon = {
    [unitTypes.warrior]: Warrior,
};
const tileTypes = {
    grass: "grass",
};
const tileTypeToImg = {
    [tileTypes.grass]: tileGrass,
};

const tilesAmount = {
    width: 60,
    height: 28,
};
const tiles = Array.from(Array(tilesAmount.height), () => {
    return Array.from(Array(tilesAmount.width), () => ({
        type: tileTypes.grass,
        unit: null,
    }));
});
tiles[2][6].unit = {
    type: unitTypes.warrior,
    team: teams.red,
};
tiles[6][9].unit = {
    type: unitTypes.warrior,
    team: teams.blue,
};

const teamToUnitTileColor = {
    [teams.red]: "tile__unit_red",
    [teams.blue]: "tile__unit_blue",
};
const TileUnit = ({ unit }) => {
    if (unit === null) {
        return null;
    }
    const Unit = unitTypeToIcon[unit.type];
    const className = "tile__unit " + teamToUnitTileColor[unit.team];

    return <Unit className={className} />;
};

const Tile = ({ tile }) => {
    return (
        <div className="tile">
            <TileUnit unit={tile.unit} />
            <img
                src={tileTypeToImg[tile.type]}
                alt="tile"
                className="tile__background"
                style={{
                    width: "30px",
                    height: "30px",
                }}
            />
        </div>
    );
};

const Main = () => {
    const gridRef = useRef();
    const [gridPos, setGridPos] = useState({ x: 0, y: 0 });
    const [mouseState, setMouseState] = useState({
        isMouseDown: false,
        mouseDownPos: { x: 0, y: 0 },
    });

    return (
        <div
            ref={gridRef}
            className="grid"
            style={{
                transform: `translate(${gridPos.x}px, ${gridPos.y}px)`,
            }}
        >
            {tiles.map((row, rowIndex) => (
                <div key={rowIndex} className="grid__row">
                    {row.map((tile, tileIndex) => (
                        <Tile key={tileIndex} tile={tile} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Main;
