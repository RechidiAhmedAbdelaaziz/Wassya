import { useState } from "react";
import './style.css'
import { Link } from "react-router-dom";




export default function Firstpage( {active , setactive}) {
   let display 
    function handelsend(){
        setactive(32);
    }
    function handelback(){
        setactive(2)
    }
    if (active ==3){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
            <div className="bod">
                <div className="p-6 bg-black-50 text-white-900">
                <h1 className="page-title">MON TESTAMENT</h1>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Aider à rédiger votre testament.</li>
                        <li>Aucune information n’est enregistrée par notre site.</li>
                    </ul>
            </div>
            </div>
                <div className="navigation-buttons">
                    <button className="nav-button back-button" onClick={handelback}>Back</button>
                    <button className="nav-button next-button" onClick={handelsend}>Next</button>
                </div>
        </div>
    }
    </>
    );
}
