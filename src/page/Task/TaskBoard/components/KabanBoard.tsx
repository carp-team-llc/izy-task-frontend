
import { useState } from "react";
import Column from "./Column";


const KabanBoard = () => {
  return (
    <div className="bg-blue-400 px-3 py-3">
      <Column id='1' name='hi' statusKey="hoho"/>
    </div>
  )
}

export default KabanBoard;