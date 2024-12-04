"use client"
import React from 'react';

const Box = ({ name } : any) => {
    return (
        <button className="bg-slate-200 w-[70px] h-[70px] select-none">
            {name}
        </button>
    );
};

export default Box;