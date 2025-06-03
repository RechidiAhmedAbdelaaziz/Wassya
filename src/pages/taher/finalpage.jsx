import { useRef, useState } from "react";
import './style.css'
import { Link } from "react-router-dom";




export default function Seven( {active , setactive , setlaveuse}) {
   let display 
   const Laveuse =useRef();
   const laveusecontact = useRef();
   const [warn, setWarn] = useState("");
    function handelsend(){
        if ( Laveuse.current.value.trim() =='' || laveusecontact.current.value.trim() ==''  ){
            setWarn('Veuillez remplir tous les champs du formulaire avant de continuer.');
            return;
       }        
       setWarn("");
        setlaveuse({ laveuse:Laveuse.current.value, laveusecontact:laveusecontact.current.value})
        setactive(8);
    }
    function handelback(){
        setactive(6)
    }
    if (active ==7){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                <div className="bod">
                    <h1 className="page-title">Ma préparation</h1>
                    {warn && <div className="form-warn">{warn}</div>}
                    <p>Vous devez cocher les cases que vous souhaitez faire apparaître sur votre testament</p>
                        <label>
                            Je souhaite que mon corps soit lavé par :
                            <input type="text" ref={Laveuse} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
                        <label>
                            Voici ses coordonnées :
                            <input type="text" ref={laveusecontact} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
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
