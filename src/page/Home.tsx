import { useState } from "react"
import { Grid, Stack, Typography, InputAdornment, TextField, Button } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts'
import Calculator from "../service/calculator"
import CustomizedYAxisTick from "../component/CustomizedYAxisTick"
import InputLoanDetail from "../component/InputLoanDetail"
import Loan from "../type/Loan"
import CustomizedXAxisTick from "../component/CustomizedXAxisTick"
import CustomizedTooltip from "../component/CustomizedTooltip"

const styles = {
    title: {
        paddingTop: "32px"
    },
    inputRow: {
        width: "50vw"
    }
}

const Home = () => {

    const [data, setData] = useState([] as any)
    const [showGraph, setShowGraph] = useState(false)
    const [showGraphButtonText, setShowGraphButtonText] = useState("Show Graph")

    const handleInputLoanDetailData = (data: Loan) => {
        console.log(data)
        if (!showGraph) {
            let calculator = new Calculator()
            const monthBreakdown = calculator.getBreakdownOfLoanPaymentWithAdditionalPayment(
                data.loanAmount,
                data.monthlyPayment,
                data.interestRate,
                data.additionalPayment
            )
            console.log(monthBreakdown)
            setData(monthBreakdown)
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
                                    <XAxis dataKey="name" tick={<CustomizedXAxisTick />} >
                                    </XAxis>
                                    <YAxis type={"number"} tick={<CustomizedYAxisTick />} />
                                    <Tooltip content={<CustomizedTooltip  strokeMonthly={"#8884d8"} strokeAdditional={"#82ca9d"} />} wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }}/>
                                    <Legend verticalAlign="top" height={36} />
                                    <Line name="Minimum Payments" type="monotone" dataKey="remainingBalance" stroke="#8884d8" activeDot={{ r: 8 }}/>
                                    <Line name="w/ Additional Payments" type="monotone" dataKey="additionalPaymentRemainingBalance" stroke="#82ca9d" activeDot={{ r: 8 }}/>
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Home
