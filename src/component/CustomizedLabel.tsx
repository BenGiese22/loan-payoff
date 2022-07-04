
const CustomizedLabel = (props: any) => {
    const { x, y, stroke, value } = props

    return (
        <g>
            <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
                {value}
            </text>
        </g>
    )
}

export default CustomizedLabel
