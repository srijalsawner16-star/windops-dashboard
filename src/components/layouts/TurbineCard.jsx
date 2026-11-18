import '../../styles/_turbinecard.scss'
import {Link} from 'react-router-dom'
export default function TurbineCard({name, location, power, status, id}) {
    return (

      <Link to={`/turbines/${id}`}>
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
      </Link>


    )
}

