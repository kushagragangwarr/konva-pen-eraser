import Toolbar from './components/Toolbar';
import SketchPage from './components/SketchPage';
import { useState } from 'react';
import { Tool } from './utils/enums';

const App = () => {
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.PEN);
    
    return (
        <>
            <Toolbar selectedTool = {selectedTool} setSelectedTool = {setSelectedTool}/>
            <SketchPage selectedTool = {selectedTool}/>
        </>
    );
}

export default App;
