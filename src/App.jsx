import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [Picture, setPicture] = useState([]);
  const [Value, setValue] = useState(1);
  
  function nextpage(){
  setValue(Value+1)
}
 function prevpage(){
  setValue(Value-1)
}

  async function getdata() {
    const datainfo = await axios.get(`https://picsum.photos/v2/list?page=${Value}&limit=50`
    );

    setPicture(datainfo.data);
  }
  useEffect(function(){
    getdata();
    
  },[Value])

  

  let printuserdata = "NO data available";

  if (Picture.length > 0) {
    printuserdata = Picture.map(function (elem, idx) {
      return (
       
        <a href={elem.url} target="_blank">
           <div className="h-50 w-55 font-bold bg-white    ">
          <img
            className="h-full w-full rounded-xl object-cover border-2 border-black"
            src={elem.download_url}
            alt=""
          />
          <h1>{elem.author}</h1>
        </div>
        </a>
       
      );
    });
  }
  return (
   
      <>
      <div className="p-2 text-3xlfont-bold flex flex-wrap justify-center gap-8">
        {printuserdata}
      </div >
      <div  className=" mt-10 flex justify-center items-center gap-5 ">
        <button className="cursor-pointer active:scale-95 h-10 w-20 bg-green-600 rounded-4xl" onClick={nextpage}>NEXT..</button>
      <button className="cursor-pointer active:scale-95  w-20  rounded-4xl bg-red-600 h-10" onClick={prevpage}>PREV..</button>
    </div>
    </>
  );
};

export default App;
