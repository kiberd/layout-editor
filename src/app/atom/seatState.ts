import { atom } from "recoil";

export const seatState = atom({
    key: 'seatState', 
    // default: {
    //     a: { top: 20, left: 80, title: '', floor: "/10.jpg" },
    //     b: { top: 400, left: 100, title: '', floor: "/11.jpg" },
    //     c: { top: 600, left: 100, title: '', floor: "/11.jpg" },
    //     d: { top: 800, left: 200, title: '', floor: "/12.jpg" },
    //     e: { top: 550, left: 600, title: '', floor: "/10.jpg" },
    // }, 
    default: [
       
    ], 
});



