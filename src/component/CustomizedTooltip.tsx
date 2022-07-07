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

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className="intro">{label}</p>
                <p className="desc">Anything you want can be displayed here.</p>
            </div>
        )
    }

    return null;
}

export default CustomTooltip
