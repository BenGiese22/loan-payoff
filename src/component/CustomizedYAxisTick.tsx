import MoneyUtil from "../util/moneyUtil"

const CustomizedYAxisTick = (props: any) => {

    const { x, y, payload } = props

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#6e6e6e" transform="rotate(-15)">
                ${MoneyUtil.addCommasToMoney(payload.value)}
            </text>
        </g>
    )

}

export default CustomizedYAxisTick
