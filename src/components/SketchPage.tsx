import type { LineData } from "../utils/types";
import { GlobalCompositeOperation, LineCap, Tool } from "../utils/enums";
import { Layer, Line, Stage } from "react-konva";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RED_COLOR, WHITE_COLOR } from "../constants/colors";

type SketchPageProps = {
    selectedTool : Tool;
};

const SketchPage = ({
    selectedTool,
} : SketchPageProps) => {
    const isDrawing = useRef(false);
    const [lines, setLines] = useState<LineData[]>([]);

    const handleMouseDown = (event : any) => {
        isDrawing.current = true;

        const position = event.target.getStage()?.getPointerPosition();

        if (!position) {
            return;
        }

        const newLine: LineData = {
            id : uuidv4(),
            points: [position.x, position.y],
            tool: selectedTool
        }

        setLines((prevLine) => [...prevLine, newLine]);
    };

    const handleMouseMove = (event : any) => {
        if (!isDrawing.current) {
            return;
        }

        const position = event.target.getStage().getPointerPosition();

        if (!position) {
            return;
        }

        setLines((prevLines) => {
            const lastLine = prevLines[prevLines.length - 1];
            const updatedLines = {
                ...lastLine,
                points: [...lastLine.points, position.x, position.y],
            };

            return [...prevLines.slice(0, -1), updatedLines];
        });
    };

    const handleMouseUp = () => isDrawing.current = false;

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
        >
            <Layer>
                {lines.map((line) => (
                    <Line 
                        key={line.id}
                        points={line.points}
                        stroke={line.tool === Tool.PEN ? RED_COLOR : WHITE_COLOR}
                        strokeWidth={5}
                        tension={0.5}
                        lineCap={LineCap.ROUND}
                        globalCompositeOperation={
                            line.tool === Tool.ERASER ? 
                            GlobalCompositeOperation.DESTINATION_OUT : GlobalCompositeOperation.SOURCE_OVER
                        }
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default SketchPage;