'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from "./components/Canvas";


export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
        <Canvas />
    </DndProvider>
  );
}
