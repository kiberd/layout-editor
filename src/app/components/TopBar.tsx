"use client"
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { floorState } from '../atom/floorState';
import { editState } from '../atom/editState';
import { seatState } from '../atom/seatState';
import { Switch, Button, Description, Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label, Legend, Select, Textarea } from "@headlessui/react";

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from "uuid";



const TopBar = () => {


    const [isOpen, setIsOpen]: any = useState(false);
    const [floor, setFloor]: any = useRecoilState(floorState);
    const [edit, setEdit]: any = useRecoilState(editState);
    const [seats, setSeats]: any = useRecoilState(seatState);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {

        const newAddInfo: any = {
            uuid: uuidv4(), top: 500, left: 500, name: data.name, floor: data.floor, dpt: data.dpt
        };

       const newSeatArray: any = [...seats];
       newSeatArray.push(newAddInfo);

       setSeats(newSeatArray);
       reset();
       setIsOpen(false);

    };



    const handleChangeSelect = (e: any) => {
        setFloor(e.target.value);
    };



    return (
        <div className="bg-gray-300 h-18 py-4 px-14 flex-row" >
            <select className="mx-6" onChange={handleChangeSelect} value={floor.url}>
                <option value="/10.png" >10층</option>
                <option value="/11.jpg" >11층</option>
                <option value="/12.jpg">12층</option>
            </select>

            <Switch
                checked={edit}
                onChange={() => {
                    setEdit(!edit);

                }}
                className={`${edit ? "bg-blue-700" : "bg-gray-200 mr-4"
                    } relative inline-flex h-5 w-10 items-center rounded-full mr-4`}
            >
                <span
                    className={`${edit ? "translate-x-6" : "translate-x-1"
                        } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                />
                <div></div>
            </Switch>

            <Button onClick={() => setIsOpen(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-4">Add User</Button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="space-y-10 border bg-slate-200 p-10 justify-center items-center rounded-xl w-[20vw]">


                        <div className="justify-between flex">
                            <DialogTitle className="font-bold text-3xl">Add User</DialogTitle>
                            <button className="font-bold text-lg" onClick={() => setIsOpen(false)}>close</button>
                        </div>
                        

                        
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <label className="font-bold text-lg">Name</label>
                            <Input className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("name",  { required: true })} />
                            {errors.name && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}

                            <label className="font-bold text-lg">E-mail</label>
                            <Input className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("email",  { required: true })} />
                            {errors.email && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}

                            <label className="font-bold text-lg">AD Account</label>
                            <Input className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("ad",  { required: true })} />
                            {errors.ad && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}



                            <label className="font-bold text-lg block">Department</label>
                            <Select className="my-3 rounded-lg py-2 px-3 text-sm block w-full" {...register("dpt")}>
                                <option value="TDS">TDS</option>
                                <option value="FBP">FBP</option>
                                <option value="FWFJ">FWFJ</option>
                            </Select>

                            <label className="font-bold text-lg block">Floor</label>
                            <Select className="my-3 rounded-lg py-2 px-3 text-sm block w-full" {...register("floor")}>
                                <option value="/10.png">10F</option>
                                <option value="/11.jpg">11F</option>
                                <option value="/12.jpg">12F</option>
                            </Select>

                            <label className="font-bold text-lg block">Laptop S/N</label>
                            <Input className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("laptop",  { required: true })} />
                            {errors.laptop && <span className="text-red-600">해당 필드는 필수값 입니다.</span>}


                            <label className="font-bold text-lg block">Monitor S/N</label>
                            <Input className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("monitor",  { required: true })} />
                            {errors.monitor && <span className="text-red-600">해당 필드는 필수값 입니다.</span>}

                            



                            <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 block" type="submit" >Submit</Button>
                            
                        </form>




                    </DialogPanel>
                </div>
            </Dialog>

        </div>
    );
};

export default TopBar;