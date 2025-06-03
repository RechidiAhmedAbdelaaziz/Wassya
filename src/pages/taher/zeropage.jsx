import { useState } from "react";
import './style.css'






export default function Firstpage( {active , setactive}) {
   let display 
    function handelsend(){
        setactive(7);
    }
    function handelback(){
        setactive(5)
    }
    if (active ==6){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                <div className="bod">
                    <h1 className="page-title">MON TESTAMENT</h1>
                    <p>Vous devez cocher les cases que vous souhaitez faire apparaître sur votre testament</p>
                    <p> J'atteste qu'il n'y a d'autre divinité qu’Allah qui mérite l’adoration, et j'atteste que Mohammad صلى الله عليه وسلم est Son Serviteur et Messager et
                        que l'heure arrivera, pas de doute à son sujet, et qu'Allah ressuscitera ceux qui sont dans les tombeaux. <br />
                        Je recommande à ma famille et mes proches et à tous ceux qui m’aiment d’invoquer en ma faveur le pardon et la miséricorde
                        lorsqu’ils apprendront mon décès et qu’ils ne pleurent pas sur moi d’une manière exagérée ou en élevant la voix. <br />
                    Je me désavoue de toute innovation ou péché que vous pourrez être amenés à faire lors de ma préparation et ce, jusqu’à
                        mon enterrement. <br />
                    Que ceux qui se trouveront dans le pays de ma mort n’informent pas mes enfants qui ne s’y trouvent pas, et encore
                        moins les autres personnes, qu’après m’avoir enterré, et ce, pour que les sentiments n’entrent pas en jeu et qu’à cause
                        de cela mon enterrement soit retardé, demandant au seigneur de le rencontrer alors qu’il m’a pardonné mes péchés
                        antérieurs et ultérieurs… </p>
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
