
  
  export const updateCanvas = async(canvasId, elements)=>{

     
        const token = localStorage.getItem("token");
        
        if (!canvasId || !token) return;
    
        try {
          await fetch("https://collaboard-backend-4zw3.onrender.com/canvas/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              canvasId,
              name: "",
              elements: elements,
            }),
          });
          console.log("Canvas auto-saved");
        } catch (err) {
          console.error("Error auto-saving canvas:", err);
        }
     
  }

