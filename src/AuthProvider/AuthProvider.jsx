import { createContext, useEffect, useState } from "react";
import app from "../Firbase/Firbase.config";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // data-theme set up ;
    const [theme, setTheme] = useState(null);
    useEffect(()=>{
        if(window.matchMedia('(prefers-color-schema:dark)').matches){
            setTheme('dark')
        }
        else{
            setTheme('light');
        }
    },[]);


    useEffect(()=>{
        if(theme === 'dark' ){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
    },[theme]);
    const handleThemeSwitch =()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }


  

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

    const facebookLoginSetup =()=>{
        setLoading(true);
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider)
    };

    const gitHubLoginSetup =()=>{
        setLoading(true)
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth,provider);
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
        googleLoginHandle,
        facebookLoginSetup,
        gitHubLoginSetup,
        handleThemeSwitch
    };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;