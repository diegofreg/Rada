import {createReducer,on} from "@ngrx/store";
import {lacreInvalido, lacreValido} from "./finalizar-action";


export const estaSendoUsado = false 

export const mudandoValor = createReducer(
	estaSendoUsado,
	on(lacreInvalido,(state)=> state = false),
	on(lacreValido,(state)=> state = true)
)
