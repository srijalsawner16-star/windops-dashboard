
import { useEffect, useState } from "react";
import "./App.css";
import MetricCard from "./components/dashboard/MetricCard";
import TurbineList from "./components/dashboard/TurbineList";
import AppHeader from "./components/layouts/AppHeader";
import AppSidebar from "./components/layouts/AppSidebar";
import './styles/_metric-card.scss';

function App() {

  const [turbines, setTurbines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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


  const totalTurbines = turbines.length;
  const operationalCount = turbines.filter((turbine)=>turbine.status === 'Operational').length
  const offlineCount = turbines.filter((turbine)=>turbine.status === 'Offline').length;
  const maintenanceCount = turbines.filter((turbine)=>turbine.status === 'Maintenance').length
  return (
    <div className="app-layout">
      <AppSidebar />

      <main className="app-layout__main">
        <AppHeader />
        <div className="metric-grid">
        <MetricCard title="Total Turbines" value={totalTurbines}></MetricCard>
        <MetricCard title="Operational Turbines" value={operationalCount}></MetricCard>
        <MetricCard title="Offline Turbines" value={offlineCount}></MetricCard>

        <MetricCard title="Maintenance Turbines" value={maintenanceCount} />
        </div>

        <section className="app-layout__content">
          <h2>Welcome to WindOps</h2>
          <p>Wind Turbine Operations Dashboard</p>
          <div>
          <TurbineList turbines={turbines} />
    </div>
        </section>

      </main>




    </div>

  );
}

export default App;
