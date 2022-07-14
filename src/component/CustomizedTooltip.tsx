// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`${label} : ${payload[0].value}`}</p>
//           <p className="intro">{getIntroOfPage(label)}</p>
//           <p className="desc">Anything you want can be displayed here.</p>
//         </div>
//       );
//     }

//     return null;
//   };


const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;

    // console.log(active, payload, label);

    const hasAdditionalPayment = payload.length > 1;

    // TODO process payload values to have comma

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="date-label">{`Date: ${label}`}</p>
                <p className="remaining_balance">{`Minimum Payments: $${payload[0].value}`}</p>
                { hasAdditionalPayment && <p className="additional_payment">{`w/ Additional Payments: $${payload[1].value}`}</p> }
            </div>
        )
    }

    return null;
}

export default CustomTooltip
