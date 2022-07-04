
const CustomizedYAxisTick = (props: any) => {

    const { x , y, payload } = props

    const numToStringWithCommas = (value: any) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#6e6e6e" transform="rotate(-15)">
                ${numToStringWithCommas(payload.value)}
            </text>
        </g>
    )

}

export default CustomizedYAxisTick
