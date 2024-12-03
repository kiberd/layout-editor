"use client"
import React from 'react';
import TopBar from './TopBar';
import Layout from './Layout';
import DragLayer from './DragLayer';

const Canvas = () => {

    return (
        <>
            <div>
                <TopBar />
                <div className="flex justify-center">
                    <Layout/>
                    <DragLayer />
                </div>
            </div>
        </>
    );
};

export default Canvas;