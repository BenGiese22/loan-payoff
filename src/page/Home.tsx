import { useState } from "react"
import { Grid, Stack, Typography } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Loan from "../type/Loan"
import Calculator from "../service/calculator"
import strokeColorUtil from "../util/strokeColorUtil"
import CustomizedYAxisTick from "../component/CustomizedYAxisTick"
import InputLoanDetail from "../component/InputLoanDetail"
import CustomizedXAxisTick from "../component/CustomizedXAxisTick"
import CustomizedTooltip from "../component/CustomizedTooltip"
import FinalPaymentDates from "../component/FinalPaymentDates"
import DateUtil from "../util/dateUtil"

const styles = {
    title: {
        paddingTop: "32px"
    },
    inputRow: {
        width: "75vw"
    }
}


const Home = () => {

    const [data, setData] = useState([] as any)
    const [showGraph, setShowGraph] = useState(false)
    const [showGraphButtonText, setShowGraphButtonText] = useState("Show Graph")
    const [payments, setPayments] = useState({} as any)
    const [finalPaymentDates, setFinalPaymentDates] = useState({} as any)
    const [moneySaved, setMoneySaved] = useState({} as any)

    const handleInputLoanDetailData = (data: Loan) => {
        if (!showGraph) {
            let calculator = new Calculator()
            const resultObj = calculator.getBreakdownOfLoanPayments(
                data.loanAmount,
                data.interestRate,
                data.payments
            )
            let monthPaymentBreakdowns = resultObj.monthPaymentBreakdowns
            let resultFinalPaymentDates = resultObj.finalPaymentDates
            setData(monthPaymentBreakdowns)
            setFinalPaymentDates(resultFinalPaymentDates)
            setPayments(data.payments)

            let resultMoneySaved = getMoneySaved(monthPaymentBreakdowns, resultFinalPaymentDates)
            setMoneySaved(resultMoneySaved)

            setShowGraphButtonText("Hide Graph")
            setShowGraph(!showGraph)
        } else {
            setShowGraphButtonText("Show Graph")
            setShowGraph(!showGraph)
        }
    }


    const getMoneySaved = (monthPaymentBreakdowns: [], finalPaymentDates: any): object => {
        const moneySaved: any = {}

        // Iterate over all Keys (All Payments)
        Object.keys(finalPaymentDates).forEach((key) => {
            // Update Key toLowerCase for consistency
            if (key.toLowerCase() !== 'standard') { // Skip Standard as it is the baseline

                // The Final Payment Date for that given Key (Additional Payment) - "2022/09/25" (converted to ISOString)
                let finalPaymentDatesForGivenKey = DateUtil.toISOString(finalPaymentDates[key])

                // Iterate over Month Payment Breakdowns till finding the matching date. Grab "StandardRemainingBalance".
                monthPaymentBreakdowns.forEach((datePaymentsObj: any) => {
                    /*
                    { date: "2022/09/25", StandardRemainingBalance: 15000, OtherKeyRemainingBalance: 15000 }
                    */

                    if (datePaymentsObj.date === finalPaymentDatesForGivenKey) {
                        moneySaved[key] = datePaymentsObj['StandardRemainingBalance']
                        return
                    }
                })

            }
        })

        return moneySaved
    }

    return (
        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
            <Grid item style={styles.title}>
                <Typography variant="h5">
                    Accelerated Loan Contribution Calculator
                </Typography>
            </Grid>
            <Grid item style={styles.inputRow}>
                <Stack direction="row" spacing={2}>
                    <Grid item xs={2}>
                        <InputLoanDetail
                            showGraph={showGraph}
                            showGraphButtonText={showGraphButtonText}
                            sendDataToParent={handleInputLoanDetailData}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        {showGraph === true &&
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={600}
                                    height={600}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 40,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tick={<CustomizedXAxisTick />} >
                                    </XAxis>
                                    <YAxis type={"number"} tick={<CustomizedYAxisTick />} />
                                    <Tooltip
                                        content={<CustomizedTooltip />}
                                        wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                    {
                                        Object.keys(payments).map((key, index) => {
                                            return (
                                                <Line name={key} key={index} type="monotone" dataKey={`${key}RemainingBalance`} stroke={strokeColorUtil.getStrokeColor(index)} activeDot={{ r: 8 }} />
                                            )
                                        })
                                    }
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    </Grid>
                </Stack>
            </Grid>
            {
                Object.keys(finalPaymentDates).length > 0 && showGraph &&
                <FinalPaymentDates finalPaymentDates={finalPaymentDates} moneySaved={moneySaved} />
            }
        </Grid>
    )
}

export default Home
