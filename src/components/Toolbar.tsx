import { Tool } from "../utils/enums";


type ToolBarProps = {
    selectedTool: Tool;
    setSelectedTool: React.Dispatch<React.SetStateAction<Tool>>;
  };

const Toolbar = ({selectedTool, setSelectedTool} : ToolBarProps) => {
    return (
        <div>
            <select
                name="tool"
                value={selectedTool}
                onChange={(event) => {
                    setSelectedTool(event.target.value as Tool);
                }}
            >
                <option value={Tool.PEN}>Pen</option>
                <option value={Tool.ERASER}>Eraser</option>
            </select>
        </div>
    );
};

export default Toolbar;