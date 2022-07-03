import { Grid, Input, Stack, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, TextField, Button } from "@mui/material"
import { useState } from "react"
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
        // console.log(monthBreakdown)
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
            <Grid item>
                <Stack direction="column" spacing={2}>
                    <Grid item>
                        <Stack direction="row" spacing={4}>
                            <Stack direction="column" spacing={2}>
                                {/* <Typography>
                                    Loan Amount
                                </Typography> */}
                                {/* <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Loan Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                    />
                                </FormControl> */}
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
                            </Stack>
                            <Stack direction="column" spacing={2}>
                                {/* <Typography>
                                    Monthly Payment
                                </Typography> */}
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
                            </Stack>
                            <Stack direction="column" spacing={2}>
                                {/* <Typography>
                                    Interest Rate (%)
                                </Typography> */}
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
                            </Stack>
                            <Stack direction="column" spacing={2}>
                                <Button variant="contained" color="primary" onClick={handleButtonClick}>
                                    Show Graph
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                    {/* <Stack direction="column">
                        <Input defaultValue="Current Monthly Payment" />
                        <Input defaultValue="Loan Principal + Any Acrrued Interest" />
                        <Input defaultValue="Interest Rate" />
                    </Stack> */}
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
                            <XAxis dataKey="name" label={"Months"}/>
                            <YAxis type={"number"} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="remainingBalance" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="additionalPaymentRemainingBalance" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Home
