import '../../styles/_metric-card.scss'

export default function MetricCard({title, value}) {
    return (

        <div className="metric-card">
            <h3 className="metric-card__title">{title}</h3>
            <h2 className="metric-card__value">{value}</h2>
        </div>

    )
}
