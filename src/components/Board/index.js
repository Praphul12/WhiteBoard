import { useEffect, useRef ,useContext, useLayoutEffect} from 'react';

import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from '../../constants';
import toolboxContext from '../../store/toolbox-context';
import  classNames from './index.module.css'

function Board() {

  const canvasRef = useRef(null);
  const textAreaRef = useRef();
  const {toolBoxState} = useContext(toolboxContext);
  const {elements,handleMouseDown,handleMouseMove,toolActionType,handleMouseUp,textAreaBlur,undo,redo} = useContext(boardContext);
  useLayoutEffect(()=>
  {
    //get our canvas
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
  },[]);

  useEffect(()=>{

    function handleKeyDown(event){
      if(event.ctrlKey && event.key === "z")
      {
        undo();
      }
      else if(event.ctrlKey && event.key === "y")
      {
          redo();
      }
    }
    document.addEventListener("keydown",handleKeyDown);
    return()=>{
      document.removeEventListener("keydown",handleKeyDown);
    }
  },[undo,redo])
  useEffect(()=>{
    
    const textarea = textAreaRef.current;
    if(toolActionType === TOOL_ACTION_TYPES.WRITING)
    {
      setTimeout(()=>{

        textarea.focus();
      },0);
    }
  },[toolActionType])
  useLayoutEffect(()=>{
    //need a context to draw on canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    // const context = canvas.getContext("2d");
    //get the roughjs canvas
    context.clearRect(0,0,canvas.width,canvas.height);
    const roughCanvas = rough.canvas(canvas);
    //create a generator so as to draw anything
    
    
    elements.forEach(element => {
      if(element.type === TOOL_ITEMS.BRUSH)
      {
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.strokeStyle = element.stroke;
          context.lineWidth = element.size;
          context.stroke(element.path);

      }
      else if(element.type === TOOL_ITEMS.TEXT)
      {
        console.log(element);
        context.textbaseline = "top";
        context.font = `${element.size}px Caveat`;
        context.fillStyle = element.stroke;
        context.fillText(element.text, element.x1, element.y1);
        context.restore();
      }
      else 
      {
        roughCanvas.draw(element.roughElement)
      }
    });
    
  },[elements])


  const boardMouseDownhandler = (event)=>{
    handleMouseDown(event,toolBoxState);
  }

  const boardMouseMoveHandler = (event) =>{
   
      handleMouseMove(event);

  }

  const boardMouseUphandler = (event)=>{
    handleMouseUp(event);
  }
  return (
    <> 
    
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
        ref={textAreaRef}
        id={elements[elements.length-1]}
        type = "text"
        className={classNames.textElementBox}
        style={
          {
            top : elements[elements.length - 1].y1,
            left : elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length -1]?.stroke
          }
        }
        onBlur={(event)=> textAreaBlur(event.target.value, toolBoxState)}
      />
      )
      }
      <canvas  onMouseDown={boardMouseDownhandler} ref = {canvasRef} onMouseMove={boardMouseMoveHandler} onMouseUp={boardMouseUphandler} id = "canvas"/>
   
    </>
  );
}

export default Board;