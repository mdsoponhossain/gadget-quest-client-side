import { createContext, useEffect, useState } from "react";
import app from "../Firbase/Firbase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";


export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  

    const handleSignUp = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    };

    const handleSignIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    };

    const googleLoginHandle =()=>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }



    const updateUserProfile =(userInfo)=>{
        setLoading(true)
       return  updateProfile(auth.currentUser,userInfo)
    };


    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false)
        });

        return ()=>{
            unsubscribe();
        }
    },[]);


    const handleSignOut =()=>{
        setLoading(true)
        return signOut(auth)
    }

    const authInfo = {
        handleSignUp,
        handleSignIn,
        handleSignOut,
        updateUserProfile,
        user,
        loading,
        googleLoginHandle
    };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;