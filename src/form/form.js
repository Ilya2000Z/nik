import React from "react";
import classes from "./form.css";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from "react";
import { useState } from "react";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router";

// const ObjectJsone = new Object()
export default function Form (props){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [media_sourse, setmedia_sourse] = useState(null);
    const [media_sourse_clicadila, setmedia_sourse_clicadila] = useState(null);
    const [country, setcountry] = useState(null);
    const [creative_text, setcreative_text] = useState(null);
    const [site_name, setsite_name] = useState(null);
    const [site_url, setsite_url] = useState(null);
    const [appstore_page, setappstore_page] = useState(null);
    const [onboard, setonboard] = useState(null);
    const [add_description, setadd_description] = useState(null);
    const [idjson, setidjson] = useState(null);
    const [arrqwantity, setArrQwant] = useState([{id:"1"}]) 
    const [showProperty, setShowProperty] = useState(true)
    const [keyinput,setKeyinput] = useState()
    const [valuinput,setValuinput] = useState()
    const [idproper,setidproper] = useState()
    const [arrTopush,setarrTopush] = useState([])
    const [arrValu,seValu] = useState([])
    const [ObjectJsone, setObjectJsone]= useState({});
    const [idProps,setIdprops]=useState(props.id)
    const [imgHref,serImghref]= useState("http://localhost:10002/static/")
    const [typeInLisr, setTypelist] = useState("String")
    let navigate = useNavigate()
    const [showSawe,setShowSave]= useState(false)

   

    function clouseValu(id){
        if(id=="string"){
            setTypelist(id)
            document.getElementsByClassName("img")[0].style.display = null;
            document.getElementsByClassName("img")[0].style.display = "none";
            document.getElementsByClassName("array")[0].style.display = null;
            document.getElementsByClassName("array")[0].style.display = "none";
            document.getElementsByClassName("string")[0].style.display = null;
            document.getElementsByClassName("string")[0].style.display = "block";
        } else if(id=="array"){
            setTypelist(id)
            document.getElementsByClassName("img")[0].style.display = null;
            document.getElementsByClassName("img")[0].style.display = "none";
            document.getElementsByClassName("string")[0].style.display = null;
            document.getElementsByClassName("string")[0].style.display = "none";
            document.getElementsByClassName("array")[0].style.display = null;
            document.getElementsByClassName("array")[0].style.display = "block";
        } else if (id=="img"){
            setTypelist(id)
            document.getElementsByClassName("img")[0].style.display = null;
            document.getElementsByClassName("img")[0].style.display = "block";
            document.getElementsByClassName("string")[0].style.display = null;
            document.getElementsByClassName("string")[0].style.display = "none";
            document.getElementsByClassName("array")[0].style.display = null;
            document.getElementsByClassName("array")[0].style.display = "none";
        }   
    
        
    }

    function deleteCode(props){
        fetch("http://localhost:10002/deleteCode", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(idProps)
            })
            // navigate("/listname")
            // props.getId()
            console.log(props.local)
            window.location.reload();
    }
    function test(a){
        console.log(a)
        delete ObjectJsone[`${a}`]
        setShowProperty(false)
        setTimeout(()=>{setShowProperty(true)},1000)
    }
    function qwantyArr(){
        setShowProperty(false)
        arrTopush.push(valuinput)
       
        arrValu.push(valuinput)
        setValuinput("")
        // setKeyinput("")
        setTimeout(()=>{setShowProperty(true)},300)
        
    }
    function deletearrIndex(a){
        let arr = a.split(' ');
        ObjectJsone[`${arr[0]}`].splice(arr[1], 1);
        setShowProperty(false)
        setTimeout(()=>{setShowProperty(true)},300)
    }
    
    function addproperty(){
        if(valuinput=="imgFor_upLoad"){
            console.log("img test")
            var form = document.getElementById("ImgForm")
            var IMgForm= new FormData(form)
            fetch("http://localhost:10002/addFile", {
              method: 'POST',
              body: IMgForm
            })
            .then(res => res.json())
          .then(
            (result) => {
                
                setValuinput(`${result}`)
       
                var key = keyinput
                if(arrTopush.length>1){
                    var value = arrValu
                } else{
                var value = result
                }
                ObjectJsone[key] = value
                console.log(ObjectJsone)
                setarrTopush([])
                seValu([])
                setValuinput("")
                setKeyinput("")
                setShowProperty(false)
                setTimeout(()=>{setShowProperty(true)},300)
            })
        } else{
        arrqwantity.push({id:`${arrqwantity.length+1}`})
        setShowProperty(false)
        arrqwantity.push()
        setTimeout(()=>{setShowProperty(true)},300)
        var key = keyinput
        if(arrTopush.length>1){
            var value = arrValu
        } else{
        var value = valuinput
        }
        ObjectJsone[key] = value
        console.log(ObjectJsone)
        setarrTopush([])
        seValu([])
        setValuinput("")
        setKeyinput("")
        }
        // console.log(Object.keys(ObjectJsone).length)
    }
    function chengeValuString (valu,key){
        console.log(valu)
        console.log("key"+key)
    }

    function update(){
        console.log(JSON.stringify(ObjectJsone))
        setShowSave(true)
        setTimeout(() => {
            setShowSave(false)
        }, 1000);
        fetch("http://localhost:10002/pushparamcode", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify([media_sourse,media_sourse_clicadila,country,creative_text,site_name,site_url,appstore_page,onboard,add_description,props.id,JSON.stringify(ObjectJsone)])
            })
    }

    useEffect(() => {
        fetch("http://localhost:10002/getdatacode", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.id)
            })
            
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              setmedia_sourse(result[0].media_sourse)
              setmedia_sourse_clicadila(result[0].media_sourse_clicadila)
              setcountry(result[0].country)
              setcreative_text(result[0].creative_text)
              setsite_name(result[0].site_name)
              setsite_url(result[0].site_url)
              setappstore_page(result[0].appstore_page)
              setonboard(result[0].onboard)
              setadd_description(result[0].add_description)
              if(result[0].JsonApp!=null){
                setObjectJsone(result[0].JsonApp)

              } else{
                setObjectJsone({})
              }
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
        <div style={{"marginTop":"15px","marginBottom":"15px"}} >
            <div style={{"position":"absolute","width":"200px","backgroundColor":"red","display":"flex"}}>
                <p style={{"display":"block","margin":"0 auto"}}>Save</p>
            </div>
             <Row>
                    <Col lg={1}></Col>
                        <Col lg={6}>
                        {items.map(item => (
                            <div class="form-floating mb-3" >
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={item.idjson}/>
                                <label for="floatingInput"></label>
                            </div>
                            ))}
                        </Col>
                        <Col lg={2}>
                            <button className={classes.button} id={props.id} onClick={e=>{update(e.target.id)}}>Save</button>
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={1}>
                        <Popup trigger={<FontAwesomeIcon className={classes.icondelete} icon="fa-solid fa-trash" />
} position="right center" modal nested>
                                        {close => (
                                            <div className={classes.modal}>
                                                <button className={classes.close} onClick={close}>
                                                &times;
                                                </button>
                                                <div className={classes.header}>Вы уверены, что хотите удалить код</div>
                                                        <div class="mb-3">
                                                            <button onClick={e=>{deleteCode(e.target.id)}} id={props.id} className={classes.icondelete}>Удалить</button>
                                                        </div>
                                                </div>
                                             )}
                                        </Popup>
                            {/* <FontAwesomeIcon onClick={e=>{deleteCode(e.target.id)}} id={props.id} className={classes.icondelete} icon="fa-solid fa-trash" /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item =>(
                       <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Media Sourse</label>
                            <input style={{"backgroundColor":"#534949","color":"white"}} onChange={e=>{setmedia_sourse(e.target.value)}} value={item.media_sourse} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Media Sourse</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setmedia_sourse_clicadila(e.target.value)}} value={item.media_sourse_clicadila} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                         ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Country</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setcountry(e.target.value)}} value={item.country} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Creative text</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setcreative_text(e.target.value)}} value={item.creative_text} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={4}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Site name</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setsite_name(e.target.value)}} value={item.site_name} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={6}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Site url</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setsite_url(e.target.value)}} value={item.site_url} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">AppStore Page</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setappstore_page(e.target.value)}} value={item.appstore_page} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item => (
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Onboard</label>
                            <input style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setonboard(e.target.value)}} value={item.onboard} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        <Col lg={10}>
                        {items.map(item => (
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Add description</label>
                            <textarea style={{"backgroundColor":"#C4C4C4"}} onChange={e=>{setadd_description(e.target.value)}} value={item.add_description} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        ))}
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <Col lg={1}></Col>
                        {setObjectJsone?
                        <Col lg={10}>
                         {ObjectJsone!=null?
                            <div>   {Object.entries(ObjectJsone).map((item)=>(
                                <Row>
                                <Col lg={4}>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Key</label>
                                    <input value={item[0]} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                </Col>
                                    <Col lg={1}>
                                    <div class="dropdown">
                                    <label for="exampleInputEmail1" class="form-label">Type</label>
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Type
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item"><button onClick={e=>{clouseValu(e.target.id)}} className={classes.button1} style={{"backgroundColor":"#C4C4C4"}}>String</button></a></li>
                                            <li><a class="dropdown-item">  <button className={classes.button1}  style={{"backgroundColor":"#C4C4C4"}}>image</button></a></li>
                                            <li><a class="dropdown-item"> <button onClick={e=>{clouseValu(e.target.id)}} className={classes.button1}  style={{"backgroundColor":"#C4C4C4"}}>String Array</button></a></li>
                                        </ul>
                                    </div>
                                    </Col>
                                 
                                    
                                    {
                                   Array.isArray(item[1])?item[1].map((item1,key)=>(
                                    <Row>
                                        <Col lg={4}>
                                        <div className={classes.leftbord}></div>
                                        <div className={classes.withBord}></div>
                                        </Col>
                                        <Col lg={1}>
                                            <div className={classes.paramBord}>{key}</div>
                                        </Col>
                                            <Col lg={4}>
                                            <div class="mb-3">
                                                <input  value={item1} onChange={e=>{setValuinput(e.target.value)}} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                            </div>
                                            </Col>
                                            <div class="col-lg-1" style={{"marginTop":"0px"}}>
                                                <Button onClick={e=>{deletearrIndex(e.target.id)}} id={item[0]+" "+key} >
                                                {/* <FontAwesomeIcon  className={classes.icondelete1} icon="fa-solid fa-trash" /> */}
                                                    delete
                                                </Button>
                                            </div>
                                    </Row>
                                    )):  <div class="col-lg-7">
                                  
                                   
                                            <div class="col-lg-12">
                                            <div>
                                            <Row>
                                            <Col lg={1}></Col>
                                            <div class="col-lg-6">
                                               
                                                <label for="exampleInputEmail1" class="form-label">Value</label>
                                                {item[1][11]=="/"?
                                                <a href={imgHref+item[1]}><input value={item[1]} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id={item} aria-describedby="emailHelp"/></a>:
                                               <input value={item[1]} onChange={e=>{chengeValuString(e.target.value,"hty")}}  style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id={item} aria-describedby="emailHelp"/>
                                                }
                                            </div>
                                   
                                            <div class="col-lg-1" style={{"marginTop":"30px"}}>
                                                <Button onClick={e=>{test(e.target.id)}} id={item[0]} >
                                                {/* <FontAwesomeIcon  className={classes.icondelete1} icon="fa-solid fa-trash" /> */}
                                                    delete
                                                </Button>
                                            </div>
                                                </Row>
                                            </div>
                                        </div>  
                                        </div>
                                    }
                                {/* <Row>
                                    <Col lg={4}>
                                    <div className={classes.leftbord}></div>
                                    <div className={classes.withBord}></div>
                                    </Col>
                                    <Col lg={1}>
                                        <div className={classes.paramBord}><button onClick={qwantyArr} className={classes.buttonPlus}>+</button></div>
                                    </Col>
                                </Row> */}
                                {/* </div>  */}
                              
                                </Row>
                                
                                ))}</div>
                         :null}
                             <Row>
                            <Col lg={4}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Key</label>
                                <input value={keyinput} onChange={e=>{setKeyinput(e.target.value)}} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            </div>
                            </Col>
                                <Col lg={1}>
                                <div class="dropdown">
                                <label for="exampleInputEmail1" class="form-label">Type</label>
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {typeInLisr}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item"><button id="string"  onClick={e=>{clouseValu(e.target.id)}} className={classes.button1} style={{"backgroundColor":"#C4C4C4"}}>String</button></a></li>
                                        <li><a class="dropdown-item">  <button id="img" onClick={e=>{clouseValu(e.target.id)}} className={classes.button1} style={{"backgroundColor":"#C4C4C4"}}>image</button></a></li>
                                        <li><a class="dropdown-item"> <button id="array" onClick={e=>{clouseValu(e.target.id)}} className={classes.button1}  style={{"backgroundColor":"#C4C4C4"}}>String Array</button></a></li>
                                    </ul>
                                </div>
                                </Col>
                                <Col lg={1}></Col>
                                    <div class="col-lg-5">
                                    <div class="string">
                                    <Row>
                                    <div class="col-lg-8">
                                        <label for="exampleInputEmail1" class="form-label">Value</label>
                                        <input value={valuinput} onChange={e=>{setValuinput(e.target.value)}} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                    </div>
                                        {/* <div class="col-lg-2">
                                        <FontAwesomeIcon className={classes.icondelete1} icon="fa-solid fa-trash" />
                                        </div> */}
                                        </Row>
                                    </div>
                                    <div class="img" style={{"display":"none"}}>
                                    <Row>
                                    <div class="col-lg-8" >
                                        <label for="exampleInputEmail1" class="form-label">Value</label>
                                        <form id="ImgForm">
                                            <input name="myFile" onClick={e=>{setValuinput("imgFor_upLoad")}} style={{"backgroundColor":"#C4C4C4"}} type="file" class="form-control"/>
                                        </form>
                                    </div>
                                        {/* <div class="col-lg-2">
                                        <FontAwesomeIcon className={classes.icondelete1} icon="fa-solid fa-trash" />
                                        </div> */}
                                        </Row>
                                    </div>
                                </div> 
                           
                            </Row>
                             <div class="array" style={{"display":"none"}}>

                             {arrTopush.map((item,key)=>(
                                <Row>
                                    <Col lg={4}>
                                    <div className={classes.leftbord}></div>
                                    <div className={classes.withBord}></div>
                                    </Col>
                                    <Col lg={1}>
                                        <div className={classes.paramBord}>{key}</div>
                                    </Col>
                                        <Col lg={4}>
                                        <div class="mb-3">
                                            <input value={item} onChange={e=>{setValuinput(e.target.value)}} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        </div>
                                        </Col>
                                        {/* <Col lg={1}>
                                            <FontAwesomeIcon  icon="fa-solid fa-trash" />
                                        </Col> */}
                                </Row>
                                ))}
                                 <Row>
                                    <Col lg={4}>
                                    <div className={classes.leftbord}></div>
                                    <div className={classes.withBord}></div>
                                    </Col>
                                    <Col lg={1}>
                                        <div className={classes.paramBord}></div>
                                    </Col>
                                        <Col lg={4}>
                                        <div class="mb-3">
                                            <input value={valuinput} onChange={e=>{setValuinput(e.target.value)}} style={{"backgroundColor":"#C4C4C4"}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        </div>
                                        </Col>
                                        {/* <Col lg={1}>
                                            <FontAwesomeIcon  icon="fa-solid fa-trash" />
                                        </Col> */}
                                </Row>
                           
                            <Row>
                                <Col lg={4}>
                                <div className={classes.leftbord}></div>
                                <div className={classes.withBord}></div>
                                </Col>
                                <Col lg={1}>
                                    <div className={classes.paramBord}><button onClick={qwantyArr} className={classes.buttonPlus}>+</button></div>
                                </Col>
                            </Row>
                            </div> 

                            <Col lg={4}>
                                <div className={classes.plus}>
                                    <button onClick={addproperty} className={classes.button}>+</button>
                                </div>
                            </Col>
                        </Col>
                        :null}
                        
                       
                    </Row>
                   
        </div>
       );
    }
}