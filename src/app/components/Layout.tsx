"use client"
import React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper'
import Item from './Item';
import { useRecoilState } from 'recoil';
import { floorState } from '../atom/floorState';
import { seatState } from '../atom/seatState';

const Layout = () => {

    const [floor, setFloor]: any = useRecoilState(floorState);
    const [seats, setSeats]: any = useRecoilState(seatState);

    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas: any = canvasRef.current;
        canvas.width = 2000;
        canvas.height = 1300;

    }, []);


    useEffect(() => {

        if (!canvasRef) return;
        if (canvasRef.current) {

            // const canvas = canvasEl.current;
            const ctx: any = (canvasRef.current as HTMLCanvasElement).getContext('2d');

            // const ctx: any = canvasRef.current.getContext("2d");
            const image: any = new Image();

            image.src = floor;

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };

        }
        

    }, [floor]);


    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setSeats(
                update(seats, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [seats],
    );



    const [, drop]: any = useDrop(
        () => ({
            accept: "item",
            drop: (item: any, monitor: any) => {

                const delta = monitor.getDifferenceFromInitialOffset();
                let left = Math.round(item.left + delta.x);
                let top = Math.round(item.top + delta.y);

                moveBox(item.id, left, top);
                return undefined
            },

        }),
        [moveBox],
    );


    return (

        <div ref={drop} className="w-[1950px] h-[90vh] mt-4">

            {
                seats.map((seat: any, key: any) => {
                    if (seats[key].floor === floor) {
                        return (
                            <Item
                                key={key}
                                id={key}
                                {...(seats[key])}
                            />
                        )
                    }
                })
            }


            <canvas
                className=""
                ref={canvasRef}
            >
            </canvas>
            



        </div>

    );
};

export default Layout;