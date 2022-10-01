import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"
import strokeColorUtil from "../util/strokeColorUtil"
import DateUtil from "../util/dateUtil"

const styles = {
    gridItem: {
        marginBottom: "32px"
    }
}

const FinalPaymentDetails = (props: any) => {

    const finalPaymentDetails = props.finalPaymentDetails

    return (
        <Grid item xs={12} style={styles.gridItem}>
            <Typography variant="h6" align="center">
                Final Payment Breakdown
            </Typography>
            <TableContainer component={Paper} sx={{backgroundColor: '#f5f5f5'}}>
                <Table sx={{ minWidth: 650 }} aria-label="final-payment-breakdown-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Payment Name</TableCell>
                            <TableCell align="right">Final Payment Date</TableCell>
                            <TableCell align="right">Months Saved</TableCell>
                            <TableCell align="right">Money Saved</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                    savedInterest = `$${finalPaymentDetail.interestSaved}`
                                } else {
                                    differenceInMonths = 'N/A'
                                    savedInterest = 'N/A'
                                }

                                const strokeColor = strokeColorUtil.getStrokeColor(index)

                                return (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row" sx={{color: strokeColor}}>
                                            {key}
                                        </TableCell>
                                        <TableCell align="right" sx={{color: strokeColor }}>{`${year}/${month}`}</TableCell>
                                        <TableCell align="right" sx={{color: strokeColor }}>{differenceInMonths}</TableCell>
                                        <TableCell align="right" sx={{color: strokeColor }}>{savedInterest}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default FinalPaymentDetails
