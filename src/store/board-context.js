import  { createContext } from 'react'



const boardContext = createContext(
    {
        activeToolItem: " ",
        toolActionType : "",
        handleActiveToolItemClick: () => {},
        boardMouseDownhandler : ()=>{},
        elements : [],
        history:[[]],
        index:0,
        boardMouseMoveHandler : ()=>{},
        textAreaBlur : ()=>{},
        undo : ()=>{},
        redo: ()=>{}
    }
)
  


export default boardContext