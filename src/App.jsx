
import "./App.css";
import TurbineList from "./components/dashboard/TurbineList";
import AppHeader from "./components/layouts/AppHeader";
import AppSidebar from "./components/layouts/AppSidebar";

function App() {
  const turbines = [
  { id: 1, name: "WT-001", location: "Mumbai", power: "2.5 MW", status: "Operational" },
  { id: 2, name: "WT-002", location: "Pune", power: "3.0 MW", status:"Maintenance" },
  { id: 3, name: "WT-003", location: "Nashik", power: "2.0 MW", status:"Offline" },
];
  return (
    <div className="app-layout">
      <AppSidebar />

      <main className="app-layout__main">
        <AppHeader />

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
