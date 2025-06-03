import { useRef, useState } from "react";
import './style.css'
import { Link } from "react-router-dom";

export default function Firstpage( {active , setactive , user, setuser }) {
    const prénom = useRef()
    const nom = useRef()
    const date = useRef()
    const ville = useRef()
    const pays = useRef()
    const [warn, setWarn] = useState("");
    

   let display 
    function handelsend(){
        if ( prénom.current.value.trim() =='' || nom.current.value.trim() =='' || date.current.value.trim() =='' || ville.current.value.trim() =='' || pays.current.value.trim() =='' ){
            setWarn('Veuillez remplir tous les champs du formulaire avant de continuer.');
            return;
       }
       setWarn("");
        setuser({prénom:prénom.current.value,nom:nom.current.value,date:date.current.value,ville:ville.current.value,pays:pays.current.value})
        setactive(5); 
    }
    function handelback(){
        setactive(32)
    }
    if (active ==4){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                  <div className="bod">
                        <div className="pt-6 space-y-2">
                            <h1 className="page-title">MON TESTAMENT</h1>
                            {warn && <div className="form-warn">{warn}</div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label>
                                Prénom :
                                <input type="text" ref={prénom} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            </label>
                            <label>
                                Nom :
                                <input type="text" ref={nom} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            </label>
                            <label>
                                Date de naissance :
                                <input type="date" ref={date} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            </label>
                            <label>
                                Ville de naissance :
                                <input type="text" ref={ville} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            </label>
                            <label>
                                Pays de naissance :
                                <input type="text" ref={pays} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            </label>
                            </div>
                        </div>
                  </div>
                <div className="navigation-buttons">
                    <button className="nav-button back-button"onClick={handelback}>Retour</button>
                    <button className="nav-button next-button" onClick={handelsend}>Suivant</button>
                </div>
            </div>
    }
    </>
    );
}
