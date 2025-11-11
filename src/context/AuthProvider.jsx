import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = ()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInUser = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const updateUser = (updatedData) =>{
    return updateProfile(auth.currentUser, updatedData)
  }

  const signOutUser = () =>{
    setLoading(true);
    return signOut(auth)
  }


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false)
    })

    return () =>{
        unsubscribe()
    }
  },[])


  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signInWithGoogle,
    createUser,
    signInUser,
    signOutUser,
    updateUser,
  }
  return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;
