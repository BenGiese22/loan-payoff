import { Grid, Typography } from "@mui/material"
import strokeColorUtil from "../util/strokeColorUtil"
import DateUtil from "../util/dateUtil"


const FinalPaymentDates = (props: any) => {

    const finalPaymentDates = props.finalPaymentDates

    return (
        <Grid item xs={12}>
            <Typography variant="h6">
                Final Payment Dates
            </Typography>
            {
                Object.keys(finalPaymentDates).map((key: any, index) => {
                    const finalPaymentDate = finalPaymentDates[key]
                    const year = finalPaymentDate.getFullYear()
                    const rawMonth = Number(finalPaymentDate.getMonth()+1)
                    const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth.toString()

                    let differenceInMonths = undefined

                    if (key !== "Standard") {
                        differenceInMonths = DateUtil.getMonthDifference(finalPaymentDates["Standard"], finalPaymentDate)
                    }
                    return (
                        <div key={index}>
                            <Typography variant="body1" color={strokeColorUtil.getStrokeColor(index)}>
                                {key} - {`${year}/${month}`} {differenceInMonths !== undefined && ` - (${differenceInMonths} months earlier)`}
                            </Typography>
                        </div>
                    )
                })
            }
        </Grid>
    )
}

export default FinalPaymentDates
