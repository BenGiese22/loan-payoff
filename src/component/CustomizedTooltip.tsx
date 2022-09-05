import MoneyUtil from "../util/moneyUtil";

const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="date-label">{`Date: ${label.substring(0,7)}`}</p>
                {
                    Object.keys(payload).map((key, index) => {
                        return (
                            <p className="payment-label" key={index} style={{color: payload[index].stroke}}>
                                {`${payload[index].name}: $${MoneyUtil.addCommasToMoney(payload[index].value)}`}
                            </p>
                        )
                    })
                }
            </div>
        )
    }

    return null;
}

export default CustomTooltip
