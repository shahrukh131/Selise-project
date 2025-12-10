import { useState } from "react";

import "./App.css";
import ScheduleView from "./components/ScheduleView";



function App() {
  return (
    <div>
      <h1 className="text-center text-2xl mt-2">Event Time Table</h1> 
      <ScheduleView/>
   
    </div>
  );
}

export default App;
