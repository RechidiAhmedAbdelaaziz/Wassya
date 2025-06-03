import { useRef , useState} from "react";
import './style.css'
import { Link } from "react-router-dom";

export default function Seven( {active , setactive , creanciers ,setcreanciers}) {
    let display
    const creanciername = useRef() ;
    const creanciercontact = useRef() ;
    const creancierprice = useRef() ;
    const [editIndex, setEditIndex] = useState(null);
    const [warn, setWarn] = useState("");
    const [fastDays, setFastDays] = useState("");
    const [fastDaysChecked, setFastDaysChecked] = useState(false);

    function handeladd(){
        if ( creanciername.current.value.trim() =='' || creanciercontact.current.value.trim() =='' || creancierprice.current.value.trim() ==''){
            setWarn('Veuillez remplir tous les champs du formulaire avant d\'ajouter.');
            return;
        }
        setWarn("");
        if (editIndex !== null) {
            const updated = [...creanciers];
            updated[editIndex].creanciername = creanciername.current.value;
            updated[editIndex].creanciercontact = creanciercontact.current.value;
            updated[editIndex].creancierprice = creancierprice.current.value;
            setcreanciers(updated);
            setEditIndex(null);
          } else {
            setcreanciers([...creanciers,{creanciername:creanciername.current.value,creanciercontact:creanciercontact.current.value,creancierprice:creancierprice.current.value}])
          }
          creanciername.current.value =''
          creanciercontact.current.value =''
          creancierprice.current.value =''
    }
    function handleDelete(indexdelet){
        setcreanciers((prevItems) => prevItems.filter((_, index) => index !== indexdelet));
        if (editIndex === indexdelet) {
            setEditIndex(null);
            creanciername.current.value =''
            creanciercontact.current.value =''
            creancierprice.current.value =''
        }
    }

    function handleEdit(index){
        creanciername.current.value =  creanciers[index].creanciername  ;
        creanciercontact.current.value =  creanciers[index].creanciercontact ;
        creancierprice.current.value =  creanciers[index].creancierprice ;
        setEditIndex(index);
    }
    function handelsend(){
        setactive(11);
    }
    function handelback(){
        setactive(9)
    }
    if (active ==10){
        display = true
    }

    return (
        <>
        { !display  ?  ""  : 
            <div className="container">
               <div className="bod">
                    <h1 className="page-title">Mes dettes</h1>
                    {warn && <div className="form-warn">{warn}</div>}
                    <p>Veuillez renseigner vos dettes et sélectionner celles à inclure dans votre testament :</p>
                    <div className="debt-form-grid">
                        <label>
                            Nom du créancier :
                            <input type="text" ref={creanciername} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
                        <label>
                            Coordonnées du créancier:
                            <input type="text" ref={creanciercontact} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
                        <label>
                            Montant de la dette :
                            <input type="text" ref={creancierprice} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                        </label>
                        <button className="add-butt" onClick={handeladd} >{editIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
                    </div>
                    <div className="debt-list mt-6">
                        {creanciers.length === 0 ? (
                            <div className="text-gray-400 italic">Aucune dette enregistrée.</div>
                        ) : (
                            <table className="debt-table">
                                <thead>
                                    <tr>
                                        <th>Créancier</th>
                                        <th>Contact</th>
                                        <th>Montant</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {creanciers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.creanciername}</td>
                                        <td>{item.creanciercontact}</td>
                                        <td>{item.creancierprice}</td>
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
                    <div className="debt-form-grid mt-8">
                        <label style={{gridColumn: '1 / -1'}}>
                            <input type="checkbox" checked={fastDaysChecked} onChange={e => setFastDaysChecked(e.target.checked)} />
                            <span style={{marginLeft: '8px'}}>J'ai des jours de jeûne (صيام) à rattraper</span>
                        </label>
                        {fastDaysChecked && (
                            <label style={{gridColumn: '1 / -1'}}>
                                Nombre de jours de jeûne à rattraper :
                                <input type="number" min="1" value={fastDays} onChange={e => setFastDays(e.target.value)} className="mt-1 block w-full border border-gray-300 p-2 rounded" />
                            </label>
                        )}
                    </div>
                    <p className="mt-6 text-sm text-gray-300">Si une personne me doit de l’argent, je lui en fais grâce.</p>
                </div>
                <div className="navigation-buttons mt-4">
                    <button className="nav-button back-button" onClick={handelback}>Back</button>
                    <button className="nav-button next-button" onClick={handelsend}>Next</button>
                </div>
            </div>
    }
    </>
    );
}
