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

    const handleInputLoanDetailData = (data: Loan) => {
        if (!showGraph) {
            let calculator = new Calculator()
            const resultObj = calculator.getBreakdownOfLoanPayments(
                data.loanAmount,
                data.interestRate,
                data.payments
            )
            let monthPaymentBreakdowns = resultObj.monthPaymentBreakdowns
            let finalPaymentDates = resultObj.finalPaymentDates
            setData(monthPaymentBreakdowns)
            setFinalPaymentDates(finalPaymentDates)
            setPayments(data.payments)
            setShowGraphButtonText("Hide Graph")
            setShowGraph(!showGraph)
        } else {
            setShowGraphButtonText("Show Graph")
            setShowGraph(!showGraph)
        }
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
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Final Payment Dates
                    </Typography>
                    {
                        Object.keys(finalPaymentDates).map((key, index) => {
                            const finalPaymentDate = finalPaymentDates[key]
                            const year = finalPaymentDate.getFullYear()
                            const rawMonth = Number(finalPaymentDate.getMonth()+1)
                            const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth.toString()
                            return (
                                <div key={index}>
                                    <Typography variant="body1" color={strokeColorUtil.getStrokeColor(index)}>
                                        {key} - {`${year}/${month}`}
                                    </Typography>
                                </div>
                            )
                        })
                    }
                </Grid>
            }
        </Grid>
    )
}

export default Home
