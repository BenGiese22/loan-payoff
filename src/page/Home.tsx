import { useState } from "react"
import { Grid, Stack, Typography, InputAdornment, TextField, Button } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Calculator from "../service/calculator"

const styles = {
    title: {
        paddingTop: "32px"
    }
}

// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },


const Home = () => {

    // const runCalc = () => {
    //     let calculator = new Calculator()
    //     const monthBreakdown = calculator.getBreakdownOfLoanPayment(1000, 300, 0.08)
    //     return monthBreakdown
    // }


    const [data, setData] = useState([] as any)
    const [hasData, setHasData] = useState(false)
    const [loanAmount, setLoanAmount] = useState('15000')
    const [monthlyPayment, setMonthlyPayment] = useState('1500')
    const [interestRate, setInterestRate] = useState('0.10')
    const [additionalPayment, setAdditionalPayment] = useState('500')


    // useEffect(() => {
    //     const monthBreakdown = runCalc()

    // }, [])

    const handleButtonClick = () => {
        let calculator = new Calculator()
        const monthBreakdown = calculator.getBreakdownOfLoanPaymentWithAdditionalPayment(
            Number(loanAmount),
            Number(monthlyPayment),
            Number(interestRate),
            Number(500)
        )
        setData(monthBreakdown)
        setHasData(true)
    }

    // const yAxisFormatter = (value: any) => {
    //     return `${value}`
    // }

    return (
        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
            <Grid item style={styles.title}>
                <Typography variant="h5">
                    Accelerated Loan Contribution Calculator
                </Typography>
            </Grid>
            <Grid item style={{width: '40vw'}}>
                <Stack direction="row" spacing={2}>
                    <Grid item xs={3}>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                id="loan-amount"
                                label="Loan Amount"
                                variant="standard"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                value={loanAmount}
                            />
                            <TextField
                                id="monthly-payment"
                                label="Monthly Payment"
                                variant="standard"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={(e) => setMonthlyPayment(e.target.value)}
                                value={monthlyPayment}
                            />
                            <TextField
                                id="interest-rate"
                                label="Interest Rate (%)"
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                onChange={(e) => setInterestRate(e.target.value)}
                                value={interestRate}
                            />
                            <TextField
                                id="additional-payment"
                                label="Additional Payment"
                                variant="standard"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={(e) => setAdditionalPayment(e.target.value)}
                                value={additionalPayment}
                            />
                            <Button variant="contained" color="primary" onClick={handleButtonClick}>
                                Show Graph
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={9}>
                        {hasData === true &&
                            <LineChart
                                width={600}
                                height={400}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" label={"Months"} />
                                <YAxis type={"number"} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="remainingBalance" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="additionalPaymentRemainingBalance" stroke="#82ca9d" activeDot={{ r: 8 }} />
                            </LineChart>
                        }
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Home
