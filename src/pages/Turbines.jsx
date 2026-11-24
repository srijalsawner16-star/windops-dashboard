import TurbineList from "../components/dashboard/TurbineList";
import TurbineForm from "../components/turbines/TurbineForm";


export default function Turbines({turbines, onAddTurbine}) {
    return (
        <section>
            <h2>All Wind Turbines</h2>
            <TurbineList turbines={turbines} />
            <TurbineForm onAddTurbine={onAddTurbine} />
        </section>
    )
}
