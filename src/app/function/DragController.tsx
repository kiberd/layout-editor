"use client"
import React from 'react';
import { useRecoilState } from 'recoil';
import { useDragDropManager } from 'react-dnd';
import { editState } from '../atom/editState';

const DragController = () => {


  const [edit, setEdit] = useRecoilState(editState);

  const manager = useDragDropManager();

  if (edit) {
    manager.dispatch(manager.getActions().beginDrag());
  } else {
    manager.dispatch(manager.getActions().endDrag());
  }

  return (
    <div>

    </div>
  );
};

export default DragController;