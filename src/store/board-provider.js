import React, { useCallback, useReducer } from 'react'
import boardContext from './board-context'

import { TOOL_ITEMS,BOARD_ACTIONS,TOOL_ACTION_TYPES } from '../constants';
import { createRoughElement, getSvgPathFromStroke ,isPointNearElement} from '../utils/element';

import getStroke from 'perfect-freehand';

// import { type } from '@testing-library/user-event/dist/type';




const initialBoardState = {
    activeToolItem: TOOL_ITEMS.BRUSH,
    toolActionType : TOOL_ACTION_TYPES.NONE,
    elements:[],
    history:[[]],
    index:0

}

const boardReducer = (state, action) => {
  switch (action.type) {
    
    case BOARD_ACTIONS.CHANGE_TOOL:
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    
    case BOARD_ACTIONS.CHANGE_ACTION_TYPE:
      return{
        ...state,
        toolActionType:action.payload.actionType
      }
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY, stroke, fill, size } = action.payload;
      const newElement = createRoughElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem, stroke, fill, size }
      );

      return {
        ...state,
        toolActionType: state.activeToolItem === TOOL_ITEMS.TEXT ? TOOL_ACTION_TYPES.WRITING : TOOL_ACTION_TYPES.DRAWING,
        elements: [...state.elements, newElement],
      };
    }

    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const { x1, y1, stroke, fill, size, type } = newElements[index];

      switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW: {
          const newElement = createRoughElement(
            index,
            x1,
            y1,
            clientX,
            clientY,
            { type: state.activeToolItem, stroke, fill, size }
          );
          newElements[index] = newElement;

          return {
            ...state,
            elements: newElements,
          };
        }

        case TOOL_ITEMS.BRUSH: {
          newElements[index].points = [...newElements[index].points, { x: clientX, y: clientY }];
          console.log(newElements[index].size);
          newElements[index].path = new Path2D(
            getSvgPathFromStroke(getStroke(newElements[index].points))
          );
          return {
            ...state,
            elements: newElements,
          };
        }

        default:
          break;
      }

      return state;
    }

    case BOARD_ACTIONS.ERASE:{
        const {clientX,clientY} = action.payload;
        const newElements = [...state.elements];
        const newElement = newElements.filter((element)=>{
          console.log(isPointNearElement(element, clientX, clientY));
          return !isPointNearElement(element, {pointX:clientX,pointY: clientY});
        })
        
        const newHistory = state.history.slice(0,state.index+1);
        newHistory.push(newElement);
        return{
          ...state,
          elements: newElement,
          history : newHistory,
          index : state.index +1,
        }
    }

    case BOARD_ACTIONS.CHANGE_TEXT:{
      const index = state.elements.length-1;
      const newElements = [...state.elements];
      newElements[index].text = action.payload.text;
      
      const newHistory = state.history.slice(0,state.index+1);
      newHistory.push(newElements);
    
    return{
      ...state,
      toolActionType : TOOL_ACTION_TYPES.NONE,
      elements: newElements,
      history : newHistory,
      index: state.index +1,
    }
  }
  case BOARD_ACTIONS.DRAW_UP:
    {
      const elementsCopy = [...state.elements];
      const newHistory = state.history.slice(0,state.index+1);
      newHistory.push(elementsCopy);
      return{
        ...state,
        history: newHistory,
        index : state.index + 1, 
      }
    }

  case BOARD_ACTIONS.UNDO:
    {
      if(state.index <= 0) return state
      return{
        ...state,
        elements : state.history[state.index - 1],
        index : state.index - 1
      }
    }
  case BOARD_ACTIONS.REDO:
    {
      if(state.index >= state.history.length - 1)return state;
      return{
        ...state,
        elements : state.history[state.index + 1],
        index : state.index + 1
      }
    }

    default:
      return state;
  }
};

  const BoardProvider = ({children}) => {
    const [boardState,dispatchBoardAction] = useReducer(boardReducer,initialBoardState);
  
//   const [activeToolItem,setActiveToolItem] = useState("LINE")
//   const [elements, setElements] = useState([])

  

  const handleActiveToolItemClick = ((tool)=>{
    // console.log("hello");
    dispatchBoardAction({type : BOARD_ACTIONS.CHANGE_TOOL,
        payload:{
            tool,
        },
    });

});


const handleMouseDown = (event,toolBoxState)=>{
    if(boardState.toolActionType === TOOL_ACTION_TYPES.WRITING)return;
    const {clientX,clientY} = event;
    if(boardState.activeToolItem === TOOL_ITEMS.ERASER){
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload:{
          actionType:TOOL_ACTION_TYPES.ERASING
        },
      })
    }
    else
    {

      dispatchBoardAction({type:BOARD_ACTIONS.DRAW_DOWN,
          payload:{
              clientX,
              clientY,
              stroke: toolBoxState[boardState.activeToolItem]?.stroke,
              fill: toolBoxState[boardState.activeToolItem]?.fill,
              size : toolBoxState[boardState.activeToolItem]?.size,
          },
      });
    }
};
const undoboardHandler = useCallback(()=>{
  dispatchBoardAction({
    type:BOARD_ACTIONS.UNDO
  })
},[]);

const redoBoardhandler = useCallback(()=>{
  dispatchBoardAction({
    type:BOARD_ACTIONS.REDO
  })
},[]);


const textAreaBlurhandler = (text)=>{
    dispatchBoardAction({
      type:BOARD_ACTIONS.CHANGE_TEXT,
      payload :{
        text,
        // stroke : toolBoxState[boardState.activeToolItem]?.stroke,
        // size: toolBoxState[boardState.activeToolItem]?.size
      }
    })

}
const handleMouseMove = (event)=>{
    const {clientX,clientY} = event;
    if(boardState.toolActionType === TOOL_ACTION_TYPES.WRITING)return;
    if(boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING)
    {

      dispatchBoardAction({type:BOARD_ACTIONS.DRAW_MOVE,
          payload:{
              clientX,clientY
          },
      });
    }
    else if(boardState.toolActionType === TOOL_ACTION_TYPES.ERASING)
    {
        dispatchBoardAction({
          type: BOARD_ACTIONS.ERASE,
          payload:{
            clientX,
            clientY
          }})
    }
};

const handleMouseUp = (event)=> {

    if(boardState.toolActionType === TOOL_ACTION_TYPES.WRITING)return;
    if(boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING)
    {
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_UP,
      });
    }
    dispatchBoardAction({type:BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload:{
            actionType: TOOL_ACTION_TYPES.NONE,
        },
    });
};

const boardContextValue = 
    {activeToolItem : boardState.activeToolItem,
    handleActiveToolItemClick,
    elements:boardState.elements,
    toolActionType : boardState.toolActionType,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    textAreaBlur: textAreaBlurhandler,
    undo: undoboardHandler,
    redo: redoBoardhandler};

  return (
    <boardContext.Provider value = {boardContextValue}>
        {children}
    </boardContext.Provider>
  )
}

export default BoardProvider