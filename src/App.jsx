
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/layouts/AppHeader";
import AppSidebar from "./components/layouts/AppSidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import TurbineDetails from "./pages/TurbineDetails";
import Turbines from "./pages/Turbines";
import './styles/_metric-card.scss';
function App() {

  const [turbines, setTurbines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const updateTurbine = (updateTurbine)=>{
    setTurbines((prev)=>prev.map((turbine)=>turbine.id === updateTurbine.id ? updateTurbine : turbine))
  }

  const deleteTurbine = (e) => {
    setTurbines((previousTurbines)=>previousTurbines.filter((item) => item.id !== e))
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

const addTurbine = async (newTurbine) => {
  const response = await fetch("http://localhost:3000/turbines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTurbine)
  });

  if (!response.ok) {
    throw new Error("Failed to add turbine");
  }

  const result = await response.json();

  setTurbines((previousTurbines) => [
    ...previousTurbines,
    result
  ]);

  return result;
};




  return (
    <div className="app-layout">
      <AppSidebar />

      <main className="app-layout__main">
        <AppHeader />

        <Routes>
          <Route path="/" element={ <Dashboard turbines={turbines} />} />
             <Route path="/turbines" element={ <Turbines turbines={turbines} onAddTurbine={addTurbine} />} />
            <Route path="*" element={<NotFound/>} />
            <Route
  path="/turbines/:id"
  element={<TurbineDetails turbines={turbines} onUpdateTurbine={updateTurbine} onDeleteTurbine={deleteTurbine} />}
/>
        </Routes>


      </main>




    </div>

  );
}

export default App;
