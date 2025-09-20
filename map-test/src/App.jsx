import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapWithList from "./MapWithList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapWithList />} />
      </Routes>
    </Router>
  );
}

export default App;
