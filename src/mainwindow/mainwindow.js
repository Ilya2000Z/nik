import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Entryform from "../entryform/entryform";
import List from "../list/list";
import Listname from "../listName/listname";




export default function Mainwindow(){
    const [id,setId]= useState()
    const [name,setName]= useState()
    // localStorage.setItem('id','')
    function getStoreg(a){
        // localStorage.clear()
        console.log(id)
        localStorage.setItem('id',id);
    }
    let local = localStorage.getItem('id')
   
    function getId(a){
        setId(a)
        console.log("feferfref"+a)
        if(a!=null){
            localStorage.setItem('id',JSON.stringify([a]));
            
        }
        // console.log(JSON.parse(local))
    }
    function getName(a){
        setName(a)
    }
    return(
        <div>
            <div>
            <BrowserRouter>
                 <Routes>
                    <Route path="/" element={<Entryform getStoreg={getStoreg}></Entryform>}/>
                    <Route path="/list/:id" element={<List local={local} getStoreg={getStoreg} getId={getId} id={id} name={name}></List>}/>
                    <Route path="/listname"element={<Listname local={local} getName={getName} getId={getId}></Listname>}/>
                 </Routes>
            </BrowserRouter>
            </div>
        </div>
    )
}