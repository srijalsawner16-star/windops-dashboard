import MetricCard from "../components/dashboard/MetricCard";

import TurbineList from "../components/dashboard/TurbineList";
import TurbineOutputChart from "../components/dashboard/TurbineOutputChart";
import TurbineStatusChart from "../components/dashboard/TurbineStatusChart";
export default function Dashboard({turbines}) {


      const totalTurbines = turbines.length;
      const operationalCount = turbines.filter((turbine)=>turbine.status === 'Operational').length
      const offlineCount = turbines.filter((turbine)=>turbine.status === 'Offline').length;
      const maintenanceCount = turbines.filter((turbine)=>turbine.status === 'Maintenance').length
    return (
        <>

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
          <TurbineStatusChart turbines={turbines} />
          <TurbineOutputChart turbines={turbines} />
    </div>
        </section>

        </>

    )
}
