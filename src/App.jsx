
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/layouts/AppHeader";
import AppSidebar from "./components/layouts/AppSidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Turbines from "./pages/Turbines";
import './styles/_metric-card.scss';
import TurbineDetails from "./pages/TurbineDetails";
function App() {

  const [turbines, setTurbines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const updateTurbine = (updateTurbine)=>{
    setTurbines((prev)=>prev.map((turbine)=>turbine.id === updateTurbine.id ? updateTurbine : turbine))
  }

  useEffect(()=>{
    async function fetchTurbines() {
      setLoading(true);
      setError("")
      try {
  const response = await fetch("http://localhost:3000/turbines");

  if (!response.ok) {
    throw new Error("Failed to fetch turbines");
  }

  const data = await response.json();
  setTurbines(data);

} catch (error) {
  setError(error.message);
}finally{
  setLoading(false)
}
    }

    fetchTurbines()
  },[])

  if(loading) {
    return <p>Application is loading....</p>
  }
  if (error) {
  return <p>Error: {error}</p>;
}


  return (
    <div className="app-layout">
      <AppSidebar />

      <main className="app-layout__main">
        <AppHeader />

        <Routes>
          <Route path="/" element={ <Dashboard turbines={turbines} />} />
             <Route path="/turbines" element={ <Turbines turbines={turbines} />} />
            <Route path="*" element={<NotFound/>} />
            <Route
  path="/turbines/:id"
  element={<TurbineDetails turbines={turbines} onUpdateTurbine={updateTurbine} />}
/>
        </Routes>


      </main>




    </div>

  );
}

export default App;
