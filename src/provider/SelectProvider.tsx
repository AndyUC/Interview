import React, { ReducerAction, createContext, useContext, useReducer, useState } from "react";
import { ContextProviderProps} from "./ContextProviderProps";
import { State, initState } from "./orderStore";


type SelectContextType={
    select:number[],
    setSelect:React.Dispatch<React.SetStateAction<number[]>>
}

export const SelectContext = createContext<SelectContextType>({select:[],setSelect:():any=>{}});
export const useCartContext = ()=>useContext(SelectContext)