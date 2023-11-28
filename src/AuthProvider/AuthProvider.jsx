import { createContext, useEffect, useState } from "react";
import app from "../Firbase/Firbase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
  

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
            if(currentUser){
               const userInfo = {email:currentUser?.email} ;
               axiosPublic.post('/jwt',userInfo)
               .then(res=>{
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token);
                    setLoading(false)
                }
               })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        });

        return ()=>{
            unsubscribe();
        }
    },[axiosPublic]);


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