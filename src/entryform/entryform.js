import React from "react";
import classes from "./entryform.css"
import { useState } from "react";
import { Row,Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Entryform(props){
    var pass = "0000"
    var log = "root"
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [errPass, seterrPassd] = useState(false);
    let navigate = useNavigate()
    function logButtom(){
        if(pass==password||log==username)
        {
        props.getStoreg('id')
        navigate("/listname")
        }
    }
    return(
        <div>
        <Col lg={5} className={classes.regForm} style={{"padding":"30px"}}>
         <h3>Вход</h3>
        <div class="form-floating mb-3" >
             <input onChange={e=>{setusername(e.target.value)}} type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
             <label for="floatingInput">user</label>
         </div>
         <div class="form-floating mb-3">
             <input onChange={e=>{setpassword(e.target.value)}} type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
             <label for="floatingPassword">password</label>
         </div>
         <Row>
         <Col lg={6}>
             <div>
                 {errPass?<div style={{"marginTop":"10px","color":"red"}}>Неверный Email или пароль</div>:null}
             </div>
             </Col>
             <Col log={6}>
                 <div className={classes.singButton}>                           
                         <button type="submit" onClick={logButtom} class="btn btn-primary">Войти в систему</button>
                 </div>
             </Col>
         </Row>
     </Col>    
 </div>
    )
}