import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <Spinner></Spinner>
    }

    if(!user){
        return <Navigate state={location?.pathname} to={'/login'}></Navigate>
    }
  return children;
};

export default PrivateRoute;
