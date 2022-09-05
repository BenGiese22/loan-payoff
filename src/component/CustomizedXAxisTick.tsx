
const CustomizedXAxisTick = (props: any) => {

    const { x, y, payload } = props

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#6e6e6e" transform="rotate(-15)">
                {payload.value.substring(0,7)}
            </text>
        </g>
    )

}

export default CustomizedXAxisTick
