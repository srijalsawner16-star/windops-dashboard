import { Link, useParams } from "react-router-dom";
export default function TurbineDetails({turbines}) {

    const {id} = useParams();

    const turbine = turbines.find((item) => item.id === id)


    return (
        <section>
            <Link to="/turbines">
  ← Back to Turbines
</Link>
            <h2>Turbine Details</h2>
            <div>
  {turbine ? (
    <>
      <p>{turbine.name}</p>
      <p>{turbine.location}</p>
      <p>{turbine.power}</p>
      <p>{turbine.status}</p>
    </>
  ) : (
    <p>Turbine not found</p>
  )}
</div>
        </section>
    )

}
