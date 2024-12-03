"use client"
import React, { useState } from 'react';
import { useDrag, useDragDropManager } from 'react-dnd';
import { useEffect, useRef } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend'
import Box from './Box';
import { useRecoilState } from 'recoil';
import { editState } from '../atom/editState';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
): any {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
};


const Item = (props: any) => {

  // const itemRef = useRef(null);
  const [edit, setEdit] = useRecoilState(editState);

  const { id, title, left, top } = props;

  const [{ isDragging }, drag, preview]: any = useDrag(
    () => ({
      type: "item",
      canDrag: edit,
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title, edit],
  );



  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, []);


  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      onContextMenu={
        (e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }

    >
      <Box title={title} />

      {
        isOpen ?
        <div>
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">Modify User</MenuButton>
          
          
          
          <MenuItems anchor="bottom" >
            <MenuItem>
            
            <button className="m-2 inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Edit
              </button>
              
            </MenuItem>
            <MenuItem>
              <button className="m-2 inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Delete
              </button>
            </MenuItem>
           
          </MenuItems>
        </Menu></div>
        : null
      }

    </div>
  )



};

export default Item;