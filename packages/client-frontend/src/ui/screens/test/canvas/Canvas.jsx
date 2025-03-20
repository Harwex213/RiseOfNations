import { useState } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import imageUrl from "../assets/unit_lvl_1.png";

const tileOptions = {
    res: {
        width: 24,
        height: 24,
    },
    pos: {
        x: 10,
        y: 20,
    },
    stoke: "#c9c9c9",
    stokeWidth: 0.5,
};

const unitCenterDiff = tileOptions.res.width / 6;

const teamColors = {
    green: "#4eb049",
    blue: "#2c5faf",
    red: "#b64343",
    yellow: "#c4b948",
};

const scaleOptions = {
    scaleBy: 1.1,
    maxScale: 2,
    minScale: 1.5,
};

// const tiles = [
//     [true, true, true, true, true, false],
//     [false, true, true, true, true, true],
//     [true, true, true, true, true, false],
// ];

export const Canvas = ({ containerRes }) => {
    const [image] = useImage(imageUrl);
    const [stagePos, setStagePos] = useState({ x: 550, y: 300 });
    const [scale, setScale] = useState(scaleOptions.minScale);

    const handleWheel = (e) => {
        const oldScale = scale;
        const newScale = e.evt.deltaY > 0 ? oldScale / scaleOptions.scaleBy : oldScale * scaleOptions.scaleBy;

        if (newScale > scaleOptions.maxScale || newScale < scaleOptions.minScale) {
            return;
        }

        const stage = e.target.getStage();
        const currentMousePos = stage.getPointerPosition();
        const mousePointTo = {
            x: (currentMousePos.x - stagePos.x) / oldScale,
            y: (currentMousePos.y - stagePos.y) / oldScale,
        };
        const newStagePos = {
            x: (currentMousePos.x / newScale - mousePointTo.x) * newScale,
            y: (currentMousePos.y / newScale - mousePointTo.y) * newScale,
        };

        setScale(newScale);
        setStagePos(newStagePos);
    };
    const handleDragging = (e) => {
        setStagePos({ x: e.target.x(), y: e.target.y() });
    };

    return (
        <Stage width={containerRes.width} height={containerRes.height} onWheel={handleWheel}>
            <Layer
                x={stagePos.x}
                y={stagePos.y}
                scaleX={scale}
                scaleY={scale}
                draggable
                onDragMove={handleDragging}
            >
                <Rect x={-10000} y={-10000} width={20000} height={20000} fill="gray" />
                {/*{tiles.map((row, rowIndex) =>*/}
                {/*    row.map((tile, colIndex) =>*/}
                {/*        tile ? (*/}
                {/*            <RegularPolygon*/}
                {/*                key={`${rowIndex}-${colIndex}`}*/}
                {/*                sides={6}*/}
                {/*                radius={polygonOptions.radius}*/}
                {/*                fill={polygonOptions.fill}*/}
                {/*                x={*/}
                {/*                    polygonOptions.polygonPos.x +*/}
                {/*                    Math.sqrt(3) * polygonOptions.radius * colIndex*/}
                {/*                }*/}
                {/*                y={polygonOptions.polygonPos.y * rowIndex}*/}
                {/*                stroke={polygonOptions.stoke}*/}
                {/*                strokeWidth={polygonOptions.stokeWidth}*/}
                {/*            />*/}
                {/*        ) : null*/}
                {/*    )*/}
                {/*)}*/}
                <Rect
                    x={tileOptions.pos.x}
                    y={tileOptions.pos.y}
                    width={tileOptions.res.width}
                    height={tileOptions.res.height}
                    fill={teamColors.blue}
                    stroke={tileOptions.stoke}
                    strokeWidth={tileOptions.stokeWidth}
                />
                <Image
                    x={tileOptions.pos.x + unitCenterDiff}
                    y={tileOptions.pos.y + unitCenterDiff}
                    image={image}
                />

                <Rect
                    x={tileOptions.pos.x + tileOptions.res.width}
                    y={tileOptions.pos.y}
                    width={tileOptions.res.width}
                    height={tileOptions.res.height}
                    fill={teamColors.red}
                    stroke={tileOptions.stoke}
                    strokeWidth={tileOptions.stokeWidth}
                />
                <Image
                    x={tileOptions.pos.x + unitCenterDiff + tileOptions.res.width}
                    y={tileOptions.pos.y + unitCenterDiff}
                    image={image}
                />

                {/*<RegularPolygon*/}
                {/*    sides={6}*/}
                {/*    radius={polygonOptions.radius}*/}
                {/*    fill={teamColors.red}*/}
                {/*    x={polygonOptions.polygonPos.x + Math.sqrt(3) * polygonOptions.radius}*/}
                {/*    y={polygonOptions.polygonPos.y}*/}
                {/*    stroke={polygonOptions.stoke}*/}
                {/*    strokeWidth={polygonOptions.stokeWidth}*/}
                {/*/>*/}
                {/*<Image*/}
                {/*    x={*/}
                {/*        polygonOptions.polygonPos.x +*/}
                {/*        polygonOptions.radius +*/}
                {/*        polygonOptions.radius / Math.sqrt(9)*/}
                {/*    }*/}
                {/*    y={polygonOptions.polygonPos.y - polygonOptions.radius / 2}*/}
                {/*    image={image}*/}
                {/*/>*/}

                {/*<RegularPolygon*/}
                {/*    sides={6}*/}
                {/*    radius={polygonOptions.radius}*/}
                {/*    fill={teamColors.green}*/}
                {/*    x={polygonOptions.polygonPos.x + (Math.sqrt(3) * polygonOptions.radius) / 2}*/}
                {/*    y={polygonOptions.polygonPos.y + (3 / 2) * polygonOptions.radius}*/}
                {/*    stroke={polygonOptions.stoke}*/}
                {/*    strokeWidth={polygonOptions.stokeWidth}*/}
                {/*/>*/}
                {/*<Image*/}
                {/*    x={polygonOptions.polygonPos.x + polygonOptions.radius / Math.sqrt(5)}*/}
                {/*    y={polygonOptions.polygonPos.y + polygonOptions.radius}*/}
                {/*    image={image}*/}
                {/*/>*/}

                {/*<RegularPolygon*/}
                {/*    sides={6}*/}
                {/*    radius={polygonOptions.radius}*/}
                {/*    fill={teamColors.yellow}*/}
                {/*    x={polygonOptions.polygonPos.x + Math.sqrt(3) * polygonOptions.radius * 1.5}*/}
                {/*    y={polygonOptions.polygonPos.y + (3 / 2) * polygonOptions.radius}*/}
                {/*    stroke={polygonOptions.stoke}*/}
                {/*    strokeWidth={polygonOptions.stokeWidth}*/}
                {/*/>*/}
                {/*<Image*/}
                {/*    x={polygonOptions.polygonPos.x + (polygonOptions.radius / Math.sqrt(5)) * 5}*/}
                {/*    y={polygonOptions.polygonPos.y + polygonOptions.radius}*/}
                {/*    image={image}*/}
                {/*/>*/}
            </Layer>
        </Stage>
    );
};
