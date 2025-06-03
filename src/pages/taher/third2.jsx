import { useState } from "react";
import './style.css'
import { Link } from "react-router-dom";




export default function Firstpage( {active , setactive}) {
   let display 
    function handelsend(){
        setactive(4);
    }
    function handelback(){
        setactive(3)
    }
    if (active ==32){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                    <h1 className="page-title">MON TESTAMENT</h1>
                    <div className="flex items-center justify-center  text-white text-2xl font-bold">
                    Quelques rappels concernant l’importance de rédiger son testament
                    </div>
                <div className="navigation-buttons">
                    <button className="nav-button back-button" onClick={handelback}>Retour</button>
                    <button className="nav-button next-button" onClick={handelsend}>Suivant</button>
                </div>
            </div>
    }
    </>
    );
}
