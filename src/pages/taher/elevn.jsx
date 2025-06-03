import { useRef, useState } from "react";
import './style.css'
import { Link } from "react-router-dom";

export default function Seven( {active , setactive , setdistribue , setmesbiens ,mesbiens}) {
    let display 
    const distribue = useRef();
    const distribuecontact = useRef();
    const bien = useRef();
    const [editIndex, setEditIndex] = useState(null);
    const [warn, setWarn] = useState("");

    function handelsend(){
        setdistribue({distribue:distribue.current.value,distribuecontact:distribuecontact.current.value})
        setactive(12);
    }
    function handleDelete(indexdelet){
        setmesbiens((prevItems) => prevItems.filter((_, index) => index !== indexdelet));
        if (editIndex === indexdelet) {
            setEditIndex(null);
            bien.current.value = '';
        }
    }
    const handeladd = () => {
        const value = bien.current.value.trim();
        if (value === ''){
            setWarn('Veuillez remplir le champ avant d\'ajouter.');
            return;
        } 
        setWarn("");
        if (editIndex !== null) {
            // Update existing item
            const updated = [...mesbiens];
            updated[editIndex] = value;
            setmesbiens(updated);
            setEditIndex(null);
          } else {
            // Add new item
            setmesbiens([...mesbiens, value]);
          }
        bien.current.value = ''; // Clear input
    };
    function handelback(){
        setactive(10)
    }
    const handleEdit = (index) => {
        bien.current.value = mesbiens[index];
        setEditIndex(index);
    };
    if (active ==11){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                <div className="bod">
                    <h1 className="page-title">Mes biens</h1>
                    {warn && <div className="form-warn">{warn}</div>}
                    <p>Veuillez renseigner vos biens et les informations de la personne qui distribuera votre héritage :</p>
                    <div className="debt-form-grid">
                        <label>
                            Héritage distribué par :
                            <input type="text" ref={distribue} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
                        <label>
                            Coordonnées du distributeur :
                            <input type="text" ref={distribuecontact} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
                    </div>
                    <p className="mt-4">Je demande à ce que mes biens soient partagés équitablement conformément à la loi d’Allah.</p>
                    <div className="debt-form-grid mt-4">
                        <label style={{gridColumn: '1 / -1'}}>
                            Ajouter un bien :
                            <input type="text" ref={bien} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            <button className="add-butt" onClick={handeladd}>{editIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
                        </label>
                    </div>
                    <div className="debt-list mt-6">
                        {mesbiens.length === 0 ? (
                            <div className="text-gray-400 italic">Aucun bien enregistré.</div>
                        ) : (
                            <table className="debt-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description du bien</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {mesbiens.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="debt-action-edit"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="debt-action-delete"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
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
