import React from "react";
import "./App.scss";
import Sidebar from "./components/sidebar/sidebar";
import { data } from "./data/categories";
import MySidebar from "./components/sidebar/mySidebar";

function App() {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <MySidebar data={data} />
      <Sidebar data={data} />
    </div>
  );
}

export default App;
