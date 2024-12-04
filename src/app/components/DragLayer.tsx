"use client"
import React from 'react';
import BoxDragPreview from './BoxDragPreview';
import { useDragLayer } from 'react-dnd'

const DragLayer = () => {

    const layerStyles: any = {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    };

    function getItemStyles(
        initialOffset: number,
        currentOffset: number

    ) {
        if (!initialOffset || !currentOffset) {
            return {
                display: 'none',
            }
        }

        let { x, y }: any = currentOffset
        const transform = `translate(${x}px, ${y}px)`
        return {
            transform,
            WebkitTransform: transform,
        }
    };

    const { itemType, isDragging, item, initialOffset, currentOffset }: any =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))

    function renderItem() {
        switch (itemType) {
            case "item":
                return <BoxDragPreview name={item.name} />
            default:
                return null
        }
    }

    if (!isDragging) {
        return null
    }

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(initialOffset, currentOffset)}
            >
                {renderItem()}
            </div>
        </div>
    );
};

export default DragLayer;