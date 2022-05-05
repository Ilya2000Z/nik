import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import classes from "./list.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from "react";
import { useState } from "react";
import Form from "../form/form";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from "react-router";


export default function List(props){




    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [iditem,setIditem] = useState()
    const [show,setShow] = useState(false)
    const [rename, setRename]= useState();
    const [login,setLogin]= useState()
    const [password,setPassword]= useState()
    const [name,setName]= useState()
    let navigate = useNavigate()
    // const [idCode,setidCode] = useState(false)
    function getId (id){
        setShow(false)
        setIditem(id)
        // localStorage.clear();
        // localStorage.setItem('id',JSON.stringify([id,props.id]));
          console.log(JSON.parse(idCode)[0])
        
        setTimeout(()=>{setShow(true)},100)
    }
    var idCode =localStorage.getItem('id')

    function DeleteApp(){
        if (login==="root"&&password=== "12345"){
            fetch("http://localhost:10002/deleteApp", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(JSON.parse(props.local)[0])
            })
            navigate("/listname")
        } else{
            alert("неверный логин или пароль")
        }
    }

    function ChaingeName(){
        fetch("http://localhost:10002/chaingeName", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify([rename,JSON.parse(props.local)[0]])
            })
            window.location.reload();
                       // navigate("/listname")
    }
  
//    console.log(JSON.parse(JSON.stringify(idCode))[0])
//    var Efect = localStorage.getItem('idEfect')
    function addCode(){
        fetch("http://localhost:10002/addlistcode", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(JSON.parse(props.local)[0])
            })
            window.location.reload();
            fetch("http://localhost:10002/getName", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(JSON.parse(props.local)[0])
                })
                .then(res => res.json())
                .then(
                  (result) => {
                    setName(result)
                },)
    }
    useEffect(() => {
        fetch("http://localhost:10002/listcode", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(JSON.parse(props.local)[0])
                
            })
            
          .then(res => res.json())
          .then(
            (result) => {
                console.log(JSON.parse(props.local))
                fetch("http://localhost:10002/getName", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(JSON.parse(props.local)[0])
                    })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log(JSON.parse(props.local)[0])
                            console.log(result)
                            setName(result)
                            setIsLoaded(true);
                        }
                    )
              setItems(result);
            //   console.log(JSON.parse(props.local)[0])
  
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
        <div id="dropRow">
            <div className={classes.RowCustom}>    
                <Col lg={3} style={{"backgroundColor":"#C4C4C4"}}>  
                <p className={classes.nametext}>Name: {name}</p>
                <div className={classes.sidebarCont}>
                    <div style={{"paddingBottom":"10px"}}>
                        <button className={classes.button} onClick={addCode} style={{"backgroundColor":"#8DAA3C"}}>+</button>
                    </div>
                    {items.map(item => (
                    <div style={{"paddingBottom":"10px"}}>
                        <button className={classes.button} onClick={e=>{getId(e.target.id)}} id={item.id} style={{"backgroundColor":"#8B7F7F"}}>{item.idJson}</button>
                    </div>
                     ))}
                    <div className={classes.blockButton}>
                        <div style={{"paddingTop":"10px"}}>
                        <Popup trigger={<button id={props.id} onClick={ChaingeName} className={classes.button} style={{"backgroundColor":"#6FA5B0"}}>Изменить название</button>} position="right center" modal nested>
                        {close => (
                            <div className={classes.modal} >
                                <button className={classes.close} onClick={close}>
                                &times;
                                </button>
                                <div className={classes.header}>Изменить </div>
                                        <div class="mb-3">
                                            <form id="SafePay">
                                                    <input onChange={e=>{setRename(e.target.value)}} type="email" class="form-control" id="floatingPassword" placeholder="name"/>
                                            </form>
                                            </div>
                                            <button className={classes.button} onClick={ChaingeName} style={{"backgroundColor":"#8DAA3C"}}>Изменить</button>
                                        
                                </div>
                                )}
                        </Popup>

                        </div>
                        <div style={{"paddingTop":"10px"}}>
                        <Popup trigger={<button className={classes.button} style={{"backgroundColor":"#B06F6F"}}>Удалить приложение</button>} position="right center" modal nested>
                        {close => (
                            <div className={classes.modal} >
                                <button className={classes.close} onClick={close}>
                                &times;
                                </button>
                                <div className={classes.header} style={{"fontWeight":"bold"}}>Удалить приложение</div>
                                        <div class="mb-3">
                                        <input style={{"marginBottom":"15px"}} onChange={e=>{setLogin(e.target.value)}} type="email" class="form-control" id="floatingPassword" placeholder="login"/>
                                        <input onChange={e=>{setPassword(e.target.value)}} type="email" class="form-control" id="floatingPassword" placeholder="password"/>
                                        </div>
                                    <button className={classes.button} onClick={DeleteApp} style={{"backgroundColor":'red'}}>Удалить</button>
                                </div>
                                )}
                        </Popup>
                        </div>
                    </div>
                </div>   
                </Col>
                <Col lg={9}>
                    {show?<Form id={iditem} getId={props.getId}></Form>:null}
                </Col>
            </div>
        </div>
        );
    }
}