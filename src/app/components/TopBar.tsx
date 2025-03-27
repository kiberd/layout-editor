"use client"
import { useRecoilState } from 'recoil';
import { floorState } from '../atom/floorState';
import { editState } from '../atom/editState';
import { addModalState } from '../atom/addModalState';
import { editModalState } from '../atom/editModalState';
import { editTargetDateState } from '../atom/editTargetDateState';
import { Switch, Button } from "@headlessui/react";


import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';



const TopBar = () => {


    const [isAddOpen, setIsAddOpen]: any = useRecoilState(addModalState);
    const [isEditOpen, setIsEditOpen]: any = useRecoilState(editModalState);
    const [targetData, setTargetData] = useRecoilState(editTargetDateState);
    const [floor, setFloor]: any = useRecoilState(floorState);
    const [edit, setEdit]: any = useRecoilState(editState);


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

            <Button onClick={() => setIsAddOpen(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-4">Add User</Button>

            {isAddOpen ? <AddUserModal /> : null}
            {isEditOpen ? <EditUserModal data={targetData} /> : null}
        </div>
    );
};

export default TopBar;