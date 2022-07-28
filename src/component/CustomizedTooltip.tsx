import MoneyUtil from "../util/moneyUtil";

const CustomTooltip = (props: any) => {
    const { active, payload, label, strokeMonthly, strokeAdditional } = props;

    const hasAdditionalPayment = payload.length > 1;

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="date-label">{`Date: ${label}`}</p>
                <p className="remaining_balance" style={{color: strokeMonthly}}>
                    {`Minimum Payments: $${MoneyUtil.addCommasToMoney(payload[0].value)}`}
                </p>
                { hasAdditionalPayment && 
                <p className="additional_payment" style={{color: strokeAdditional}}>
                    {`w/ Additional Payments: $${MoneyUtil.addCommasToMoney(payload[1].value)}`}
                </p> 
                }
            </div>
        )
    }

    return null;
}

export default CustomTooltip
