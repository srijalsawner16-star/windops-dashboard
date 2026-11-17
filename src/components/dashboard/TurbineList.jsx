
import TurbineCard from "../layouts/TurbineCard";

export default function TurbineList({ turbines }) {
  return (
    <div className="turbine-list">
      {turbines.map((turbine) => {
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
  );
}
