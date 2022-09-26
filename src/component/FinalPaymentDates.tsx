import { Grid, Typography } from "@mui/material"
import strokeColorUtil from "../util/strokeColorUtil"
import DateUtil from "../util/dateUtil"


const FinalPaymentDates = (props: any) => {

    const finalPaymentDetails = props.finalPaymentDates

    return (
        <Grid item xs={12}>
            <Typography variant="h6">
                Final Payment Dates
            </Typography>
            {
                Object.keys(finalPaymentDetails).map((key: any, index) => {
                    const finalPaymentDetail = finalPaymentDetails[key]

                    const dt = finalPaymentDetail.date
                    const year = dt.getFullYear()
                    const rawMonth = Number(dt.getMonth()+1)
                    const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth.toString()

                    let differenceInMonths = undefined
                    let savedInterest = undefined

                    if (key !== "Standard") {
                        differenceInMonths = DateUtil.getMonthDifference(finalPaymentDetails["Standard"].date, dt)
                        savedInterest = finalPaymentDetail.interestSaved
                    }
                    return (
                        <div key={index}>
                            <Typography variant="body1" color={strokeColorUtil.getStrokeColor(index)}>
                                {key} - {`${year}/${month}`} {differenceInMonths !== undefined && ` - (${differenceInMonths} months earlier)`} {savedInterest !== undefined && ` - ($${savedInterest} Interest Saved)`}
                            </Typography>
                        </div>
                    )
                })
            }
        </Grid>
    )
}

export default FinalPaymentDates
