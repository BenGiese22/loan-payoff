import { useState } from "react"
import { InputAdornment, Stack, TextField, Button } from "@mui/material"
import Loan from "../type/Loan";


const InputLoanDetail = ({ showGraphButtonText, sendDataToParent }: { showGraphButtonText: string; sendDataToParent: Function}) => {


    const [loanAmount, setLoanAmount] = useState('15000')
    const [monthlyPayment, setMonthlyPayment] = useState('250')
    const [interestRate, setInterestRate] = useState('5')
    const [additionalPayment, setAdditionalPayment] = useState('500')

    //TODO set validation
    //TODO set validation
    //TODO set validation
    //TODO set validation

    const handleButtonClick = () => {
        sendDataToParent({
            loanAmount: Number(loanAmount),
            monthlyPayment: Number(monthlyPayment),
            interestRate: Number(Number(interestRate) < 10 ? `0.0${interestRate}` : `0.${interestRate}`),
            additionalPayment: Number(additionalPayment)
        })
    }

    const validateIntegerAmount = (value: string) => {
        if (value.length === 0) {
            return true
        }
        const integerValue = Number(value)
        return !isNaN(integerValue) && integerValue > 0
    }

    const validatePercentage = (value: string) => {
        if (value.length === 0) {
            return true
        }
        const integerValue = Number(value)
        return !isNaN(integerValue) && integerValue > 0 && integerValue < 100
    }

    const validateButton = () => {
        if (loanAmount.length === 0 || monthlyPayment.length === 0 || interestRate.length === 0 || additionalPayment.length === 0) {
            return false
        }
        return true
    }

    return (
        <Stack direction="column" spacing={2}>
            <TextField
                id="loan-amount"
                label="Loan Amount"
                variant="standard"
                placeholder="15000"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={(e) => setLoanAmount(e.target.value)}
                value={loanAmount}
                error={!validateIntegerAmount(loanAmount)}
            />
            <TextField
                id="monthly-payment"
                label="Monthly Payment"
                variant="standard"
                placeholder="1000"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                value={monthlyPayment}
                error={!validateIntegerAmount(monthlyPayment)}
            />
            <TextField
                id="interest-rate"
                label="Interest Rate"
                variant="standard"
                placeholder="10"
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                onChange={(e) => setInterestRate(e.target.value)}
                value={interestRate}
                error={!validatePercentage(interestRate)}
            />
            <TextField
                id="additional-payment"
                label="Additional Payment"
                variant="standard"
                placeholder="500"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={(e) => setAdditionalPayment(e.target.value)}
                value={additionalPayment}
                error={!validateIntegerAmount(additionalPayment)}
            />
            <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={!validateButton()}>
                {showGraphButtonText}
            </Button>
        </Stack>
    )
}

export default InputLoanDetail
