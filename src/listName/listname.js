import React, { useState } from "react";
import classes from "./listname.css"
import { Button, Col, Row } from "react-bootstrap";
import Popup from 'reactjs-popup';
import { useEffect } from "react";
import { useNavigate } from "react-router";



export default function Listname (props){



    const [name,setName] = useState() 
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
   
    let navigate = useNavigate()
  
    function gotoapplist (id,name){
        props.getName(name)
        props.getId(id)
        navigate(`/list/${id}`)
    }

    function addApp (){
        if(name!=null){
            fetch("http://localhost:10002/addProject", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(name)
            })
            navigate("/listname")
            window.location.reload();
        } else {
            alert("Введите имя")
        }
    }
  useEffect(() => {
    fetch("http://localhost:10002/list", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },})
        
      .then(res => res.json())
      .then(
        (result) => {
          console.log("rrr"+props.local)
          setItems(result);
          setTimeout(()=>{
          if(props.local.length!=0){
          setIsLoaded(true);
          }
        },300)
          
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div>
              <Col lg={3} style={{"backgroundColor":"#C4C4C4"}}>  
                <div className={classes.sidebarCont}>
                    <div style={{"paddingBottom":"10px"}}>
                    <Popup trigger={<button className={classes.button} style={{"backgroundColor":"#8DAA3C"}}>+</button>} position="right center" modal nested>
                                        {close => (
                                            <div className={classes.modal}>
                                                <button className={classes.close} onClick={close}>
                                                &times;
                                                </button>
                                                <div className={classes.header}>Добавить App</div>
                                                        <div class="mb-3">
                                                            <form id="SafePay">
                                                                 <input onChange={e=>{setName(e.target.value)}} type="email" class="form-control" id="floatingPassword" placeholder="name"/>
                                                            </form>
                                                            <button className={classes.button} onClick={addApp} style={{"backgroundColor":"#8DAA3C"}}>Добавить</button>
                                                        </div>
                                                </div>
                                             )}
                                        </Popup>
                    </div>
                    {items.map(item => (
                    <div style={{"paddingBottom":"10px"}}>
                        <button id={item.id} onClick={e=>gotoapplist(e.target.id,e.target.name)} name={item.name} className={classes.button} style={{"backgroundColor":"#8B7F7F"}}>{item.name}</button>
                    </div>
                     ))}
                </div>   
                </Col>
             </div>
     );
    }
}