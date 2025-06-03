import React from 'react'

function tweleve({active , setactive  }) {
   let display 

    function handelsend(){
        setactive(13);
    }
    function handelback(){
        setactive(11)
    }
    if (active ==12){
        display = true
    }
  return (
        <>
        { !display  ?  ""  : 
            <div className="container">
                <div className="bod">
                    <h1 className="page-title">Mon testament</h1>
                    <p className='mb-15'>Vous devez cocher les cases que vous souhaitez faire apparaître sur votre testament</p>
                    <p>Allah, permet moi de remercier les bienfaits que Tu m’as octroyés, à moi et mes parents, et de faire de bonnes actions qui Te
                    satisfassent et améliore ma descendance. Je me repentis à Toi et je suis du nombre des musulmans. </p>
                </div>
                <div className="navigation-buttons">
                    <button className="nav-button back-button" onClick={handelback}>Retour</button>
                    <button className="nav-button next-button" onClick={handelsend}>Suivant</button>
                </div>
            </div>
    }
    </>
  )
}

export default tweleve