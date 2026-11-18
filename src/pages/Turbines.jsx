import TurbineList from "../components/dashboard/TurbineList";


export default function Turbines({turbines}) {
    return (
        <section>
            <h2>All Wind Turbines</h2>
            <TurbineList turbines={turbines} />
        </section>
    )
}
