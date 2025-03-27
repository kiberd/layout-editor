"use client"
import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend'
import Box from './Box';
import { useRecoilState } from 'recoil';
import { editState } from '../atom/editState';
import { editModalState } from '../atom/editModalState';
import { editTargetDateState } from '../atom/editTargetDateState';


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

  
  const [edit, setEdit] = useRecoilState(editState);
  const [isOpen, setIsOpen]: any = useRecoilState(editModalState);
  const [targetData, setTargetData] = useRecoilState(editTargetDateState);

  useEffect(() => {
    setTargetData(props);
  } ,[]);

  const { id, name, dpt, floor, left, top} = props;

  const [{ isDragging }, drag, preview]: any = useDrag(
    () => ({
      type: "item",
      canDrag: edit,
      item: { id, name, dpt, floor, left, top},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, name, dpt, floor, left, top, edit],
  );



  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, []);


  const handleClick = () => {
    setTargetData(props);
    setIsOpen(true);
  }


  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      onClick={handleClick}

    >
      <Box name={name} />
    </div>
  )



};

export default Item;