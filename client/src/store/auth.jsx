import {createContext} from "react";

export const AuthContext=createContext();

export const AuthProvider= ({children})=>{

const storetokenInLS=()=>{
    return localStorage.setItem("token",serverToken);
};

    return (<AuthContext.Provider value={{storetokenInLS}}>
        {children}
        </AuthContext.Provider>);

};

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
};

