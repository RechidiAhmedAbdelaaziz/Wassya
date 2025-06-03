import React, { useState } from 'react'
import Firstpage from './firstpage'
import Secendpage from './secendpage'
import Thirdpage from './thirdpage'
import Fourthpage from './fourthpage'
import Fifthpage from './fifthpage'
import Sixpage from './zeropage'
import Seven from './finalpage'
import Eight from './eightpage' 
import Nine from './ninepage'
import Ten from './tenpage'
import Elevn from './elevn'
import Tweleve from './tweleve'
import Therteen from './therteen'
import Third2 from  './third2'
import Final from './final'

function Addhouse() {
  
  const [active,setactive] = useState(1); 
  const [user , setuser] = useState({});
  const [laveuse ,setlaveuse] = useState({});
  const [imam , setimam] = useState({});
  const [cimetiere, setcimetiere] = useState({});
  const [responsable, setresponsable] =useState({});
  const [creanciers , setcreanciers] = useState([]);
  const [distribue , setdistribue] = useState({});
  const [mesbiens ,setmesbiens] = useState([]);
  const [today ,settoday] = useState({});

  return (
    <div>
        <Firstpage  active={active} setactive={setactive} user={user} setuser={setuser} />
        <Secendpage  active={active} setactive={setactive}  user={user} setuser={setuser} />
        <Thirdpage   active={active} setactive={setactive}  user={user} setuser={setuser} />
        <Third2     active={active} setactive={setactive} user={user} setuser={setuser} />
        <Fourthpage  active={active} setactive={setactive}  user={user} setuser={setuser} />
        <Fifthpage active={active} setactive={setactive} user={user} setuser={setuser} />
        <Sixpage   active={active} setactive={setactive} user={user} setuser={setuser} />
        <Seven  active={active} setactive={setactive}  laveuse={laveuse} setlaveuse={setlaveuse} />
        <Eight  active={active} setactive={setactive}  setimam={setimam}  />
        <Nine  active={active} setactive={setactive} setcimetiere={setcimetiere} setresponsable={setresponsable} />
        <Ten  active={active} setactive={setactive} creanciers={creanciers} setcreanciers={setcreanciers} />
        <Elevn  active={active} setactive={setactive}  setdistribue={setdistribue} mesbiens={mesbiens} setmesbiens={setmesbiens} />
        <Tweleve  active={active} setactive={setactive}  />
        <Therteen active={active} setactive={setactive}  settoday={settoday}  />
        <Final  active={active} setactive={setactive} user={user} laveuse={laveuse} imam={imam} cimetiere={cimetiere} responsable={responsable} creanciers={creanciers} today={today} mesbiens={mesbiens} distribue={distribue} />
    </div>
  )
}

export default Addhouse