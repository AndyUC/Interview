import React, { ReducerAction, createContext, useContext, useReducer, useState } from "react";
import { ContextProviderProps} from "./ContextProviderProps";
import { State, initState } from "./orderStore";


type MainContextType={
    state:State,
    dispatch:React.Dispatch<any>
}

export const MainContext = createContext<MainContextType>({state:initState,dispatch:():any=>{}});
export const useCartContext = ()=>useContext(MainContext)