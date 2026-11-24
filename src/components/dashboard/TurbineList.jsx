
import { useState } from "react";
import TurbineCard from "../layouts/TurbineCard";

export default function TurbineList({ turbines }) {

  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTurbines =

    turbines.filter((turbine)=>{
      const matchesStatus = filter === 'All' || turbine.status === filter;

      const matchesSearch =

      turbine.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      turbine.location.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesStatus && matchesSearch;
    })

  return (
    <>
    <div>
    <div className="search-contianer">
      <input type="text"
      placeholder="Search by turbine name or location.."
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}


      />
    </div>
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
            id={turbine.id}
          />
        );
      })}
    </div>

    </>
  );
}
