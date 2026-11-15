import '../../styles/_turbinecard.scss'
export default function TurbineCard({name, location, power, status}) {
    return (

        <div >
        <h2>{name}</h2>
        <p>{location}</p>
        <p>{power}</p>
        <p
  className={`status ${
    status === "Operational"
      ? "status--operational"
      : status === "Maintenance"
        ? "status--maintenance"
        : "status--offline"
  }`}
>{status}</p>
        </div>


    )
}

