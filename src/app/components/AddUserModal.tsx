import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import { Button, Dialog, DialogPanel, DialogTitle, Input, Select, } from "@headlessui/react";
import { useForm } from 'react-hook-form';
import { seatState } from '../atom/seatState';
import { addModalState } from '../atom/addModalState';
import { v4 as uuidv4 } from "uuid";


const AddUserModal = () => {

    const [isOpen, setIsOpen]: any = useRecoilState(addModalState);
    const [seats, setSeats]: any = useRecoilState(seatState);
    const [disable, setDisable]: any = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({


        // defaultValues: {
        //     wid: data ? data.wid : '',
        //     name: data ? data.name : '',
        //     email: data ? data.email : '',
        //     ad: data ? data.ad : '',
        //     dpt: data ? data.dpt : '',
        //     floor: data ? data.floor : '',
        //     laptop: data ? data.laptop : '',
        //     monitor: data ? data.monitor : ''
        // }


    });

    const onSubmit = (data: any) => {


        const newAddInfo = {
            uuid: uuidv4(), 
            top: 500, 
            left: 500, 
            wid: data.wid,
            name: data.name,
            email: data.email,
            ad: data.ad,
            dpt: data.dpt,
            floor: data.floor,
            laptop: data.laptop,
            monitor: data.monitor
        };

        const newSeatArray = [...seats];
        newSeatArray.push(newAddInfo);

        setSeats(newSeatArray);
        reset();
        setIsOpen(false);
    };


    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="space-y-10 border bg-slate-200 p-10 justify-center items-center rounded-xl w-[20vw]">
                    <div className="justify-between flex">
                        <DialogTitle className="font-bold text-3xl">Add User</DialogTitle>
                        <button className="font-bold text-lg" onClick={() => setIsOpen(false)}>close</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="font-bold text-lg">W-ID</label>
                        <Input disabled={disable} className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("wid", { required: true })} />
                        {errors.wid && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}

                        <label className="font-bold text-lg">Name</label>
                        <Input disabled={disable} className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("name", { required: true })} />
                        {errors.name && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}

                        <label className="font-bold text-lg">E-mail</label>
                        <Input disabled={disable} className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("email", { required: true })} />
                        {errors.email && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}

                        <label className="font-bold text-lg">AD Account</label>
                        <Input disabled={disable} className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("ad", { required: true })} />
                        {errors.ad && <div className="text-red-600 mb-4">해당 필드는 필수값 입니다.</div>}

                        <label className="font-bold text-lg block">Department</label>
                        <Select disabled={disable} className="my-3 rounded-lg py-2 px-3 text-sm block w-full" {...register("dpt")}>
                            <option value="TDS">TDS</option>
                            <option value="FBP">FBP</option>
                            <option value="FWFJ">FWFJ</option>
                        </Select>

                        <label className="font-bold text-lg block">Floor</label>
                        <Select disabled={disable} className="my-3 rounded-lg py-2 px-3 text-sm block w-full" {...register("floor")}>
                            <option value="/10.png">10F</option>
                            <option value="/11.jpg">11F</option>
                            <option value="/12.jpg">12F</option>
                        </Select>
                        <label className="font-bold text-lg block">Laptop S/N</label>
                        <Input disabled={disable} className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("laptop", { required: true })} />
                        {errors.laptop && <span className="text-red-600">해당 필드는 필수값 입니다.</span>}
                        <label className="font-bold text-lg block">Monitor S/N</label>
                        <Input disabled={disable} className="my-3 block w-full rounded-lg py-1.5 px-3 text-sm/6" {...register("monitor", { required: true })} />
                        {errors.monitor && <span className="text-red-600">해당 필드는 필수값 입니다.</span>}

                        <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 block" type="submit" >
                                Submit
                        </Button>

                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default AddUserModal;