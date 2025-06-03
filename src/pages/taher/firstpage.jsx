import { useState } from "react";
import './style.css'
import { Link } from "react-router-dom";




export default function Firstpage( {active , setactive}) {
   let display 
    function handelsend(){
        setactive(2);
    }
    if (active ==1){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container ">
                    <div className="flex items-center justify-center   text-white text-2xl font-bold">
                    <h1 className="page-title">MON TESTAMENT</h1>
                    </div>
                <div className="navigation-buttons">
                    <button className="nav-button next-button" onClick={handelsend}>Next</button>
                </div>
            </div>
    }
    </>
    );
}
