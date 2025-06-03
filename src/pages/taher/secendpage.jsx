import { useState } from "react";
import './style.css'
import { Link } from "react-router-dom";




export default function Firstpage( {active , setactive}) {
   let display 
    function handelsend(){
        setactive(3);
    }
    function handelback(){
        setactive(1)
    }
    if (active ==2){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                    <p class="text-right text-lg font-medium text-white-800 leading-loose mt-15">
                    ﴿ كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِن تَرَكَ خَيْرًۭا ٱلْوَصِيَّةُ لِلْوَٰلِدَيْنِ وَٱلْأَقْرَبِينَ بِٱلْمَعْرُوفِ ۖ حَقًّۭا عَلَى ٱلْمُتَّقِينَ ﴾
                    <br />
                    <span class="text-sm text-gray-600">سورة البقرة – الآية 180</span>
                    </p>
                    <p className="text-lg font-semibold">
                        « On vous a prescrit, quand la mort est proche de l&apos;un de vous et s&apos;il laisse des biens,
                        de faire <span className="text-red">un testament</span> en règle en faveur de ses père et mère et de ses plus proches. 
                        C&apos;est un devoir pour les pieux. »
                    </p>
                <p className="italic">— Sourate 2 – Verset 180</p>
                <div className="navigation-buttons">
                    <button className="nav-button back-button" onClick={handelback}>Back</button>
                    <button className="nav-button next-button" onClick={handelsend}>Next</button>
                </div>
            </div>
    }
    </>
    );
}
