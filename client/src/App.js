import React from "react";
import {  Container} from "@material-ui/core";

import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = ()=>{

    const user = JSON.parse(localStorage.getItem("profile"));
    // const navigate = useNavigate();
    const Authentication = ()=>{
        if(!user){
            return  <Auth /> 
        }
        else{
            return <Navigate to="/posts" replace={true} />
        }
    }
    const Navigation = ()=>{
        return <Navigate to="/posts" replace={true} />
    }
    return (
        <BrowserRouter>
             <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigation />}  />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/auth" element={<Authentication />} />
                </Routes>

            </Container>
        </BrowserRouter>
    )
}

export default App;