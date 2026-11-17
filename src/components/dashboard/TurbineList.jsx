
import { useState } from "react";
import TurbineCard from "../layouts/TurbineCard";

export default function TurbineList({ turbines }) {

  const [filter, setFilter] = useState('All')
  const filteredTurbines =
  filter === "All"
    ? turbines
    : turbines.filter(
        (turbine) => turbine.status === filter
      );
  return (
    <>
    <div>
    <button onClick={()=>setFilter("Offline")}>Offline</button>
    <button onClick={()=>setFilter("All")}>All</button>
    <button onClick={()=>setFilter("Maintenance")}>Maintenance</button>
    <button onClick={()=>setFilter("Operational")}>Operational</button>
    <p>{filteredTurbines.length > 1 ? `${filteredTurbines.length} turbines found` : `${filteredTurbines.length} turbine found` } </p>
    </div>
    <div className="turbine-list">
      {filteredTurbines.map((turbine) => {
        return (
          <TurbineCard
            key={turbine.id}
            name={turbine.name}
            location={turbine.location}
            power={turbine.power}
            status={turbine.status}
          />
        );
      })}
    </div>

    </>
  );
}
