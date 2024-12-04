"use client"
import React from 'react';

const BoxDragPreview = ({ name }: any) => {
    return (
        <div className="bg-slate-200 w-[70px] h-[70px]">
           {name}
        </div>
    );
};

export default BoxDragPreview;