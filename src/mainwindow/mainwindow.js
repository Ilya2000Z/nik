import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Entryform from "../entryform/entryform";

export default function Mainwindow(){
    return(
        <div>
            <div>
            <BrowserRouter>
                 <Routes>
                    <Route path="/" element={<Entryform></Entryform>}/>
                 </Routes>
            </BrowserRouter>
            </div>
        </div>
    )
}