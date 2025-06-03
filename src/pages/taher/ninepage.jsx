import { useRef, useState } from "react";
import './style.css'
import { Link } from "react-router-dom";


export default function Seven( {active , setactive , setcimetiere , setresponsable}) {
    let display 
    const cimetiere =useRef();
    const responsable =useRef();
    const responsablecontact =useRef();
    const [warn, setWarn] = useState("");
    const [isMuslimCountry, setIsMuslimCountry] = useState(true);
    const [wantsCustomCemetery, setWantsCustomCemetery] = useState(false);
    const [wantsRapatriement, setWantsRapatriement] = useState(false);

    function handelsend(){
        // If in a Muslim country, no fields are required
        if (!isMuslimCountry) {
            // If wants to choose a cemetery, require it
            if (wantsCustomCemetery && cimetiere.current.value.trim() === '') {
                setWarn('Veuillez indiquer le cimetière souhaité.');
                return;
            }
            // If wants rapatriement, require both fields
            if (wantsRapatriement && (responsable.current.value.trim() === '' || responsablecontact.current.value.trim() === '')) {
                setWarn('Veuillez indiquer le responsable du rapatriement et ses coordonnées.');
                return;
            }
        }
        setWarn("");
        setcimetiere({
            cimetiere: (!isMuslimCountry && wantsCustomCemetery) ? cimetiere.current.value : (isMuslimCountry ? 'Le plus proche de mon lieu de décès (pays musulman)' : ''),
            isMuslimCountry,
            wantsCustomCemetery
        });
        setresponsable((!isMuslimCountry && wantsRapatriement) ? {
            responsable: responsable.current.value,
            responsablecontact: responsablecontact.current.value
        } : {});
        setactive(10);
    }
    function handelback(){
        setactive(8)
    }
    if (active ==9){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                <div className="bod">
                    <h1 className="page-title">Mon enterrement</h1>
                    {warn && <div className="form-warn">{warn}</div>}
                    <p>Veuillez préciser vos souhaits concernant votre enterrement :</p>
                    <div className="debt-form-grid">
                        <label style={{gridColumn: '1 / -1'}}>
                            <input type="checkbox" checked={isMuslimCountry} onChange={e => setIsMuslimCountry(e.target.checked)} />
                            <span style={{marginLeft: '8px'}}>Je meurs dans un pays musulman</span>
                        </label>
                        {isMuslimCountry && (
                            <div style={{gridColumn: '1 / -1', color: '#b30000', fontWeight: 600}}>
                                Je souhaite être enterré le plus rapidement possible au cimetière le plus proche de mon lieu de décès.
                            </div>
                        )}
                        {!isMuslimCountry && (
                            <>
                                <label style={{gridColumn: '1 / -1'}}>
                                    <input type="checkbox" checked={wantsCustomCemetery} onChange={e => setWantsCustomCemetery(e.target.checked)} />
                                    <span style={{marginLeft: '8px'}}>Je souhaite choisir un cimetière spécifique</span>
                                </label>
                                {wantsCustomCemetery && (
                                    <label>
                                        Cimetière souhaité :
                                        <input type="text" ref={cimetiere} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                                    </label>
                                )}
                                <label style={{gridColumn: '1 / -1'}}>
                                    <input type="checkbox" checked={wantsRapatriement} onChange={e => setWantsRapatriement(e.target.checked)} />
                                    <span style={{marginLeft: '8px'}}>Je souhaite que mon rapatriement soit géré par une personne spécifique</span>
                                </label>
                                {wantsRapatriement && (
                                    <>
                                    <label>
                                        Responsable du rapatriement :
                                        <input type="text" ref={responsable} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                                    </label>
                                    <label>
                                        Coordonnées du responsable :
                                        <input type="text" ref={responsablecontact} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                                    </label>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-6 text-sm text-gray-300">
                        Quel que soit l’endroit où je suis enterré, je demande à ce que ma tombe soit conforme à la sunna :<br/>
                        <span style={{color:'#fff'}}>pas de décoration, pas de contours en ciment, pas de pierre tombale avec mon nom. Uniquement une tombe légèrement bombée avec une pierre au niveau de ma tête et une pierre au niveau de mes pieds.</span>
                    </div>
                </div>
                <div className="navigation-buttons mt-4">
                    <button className="nav-button back-button" onClick={handelback}>Retour</button>
                    <button className="nav-button next-button" onClick={handelsend}>Suivant</button>
                </div>
            </div>
        }
        </>
    );
}
