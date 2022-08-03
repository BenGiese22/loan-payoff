import { useState } from "react"
import { InputAdornment, Stack, TextField, Button } from "@mui/material"
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';


const InputLoanDetail = ({ showGraph, showGraphButtonText, sendDataToParent }: { showGraph: boolean, showGraphButtonText: string, sendDataToParent: Function}) => {

    const [loanAmount, setLoanAmount] = useState('15000')
    const [monthlyPayment, setMonthlyPayment] = useState('250')
    const [interestRate, setInterestRate] = useState('5')
    const [additionalPayments, setAdditionalPayments] = useState([] as any)
    const [optionalName, setOptionalName] = useState('')
    // const [additionalPayment, setAdditionalPayment] = useState('500')

    /**
     * Upon clicking the button, send the data to the parent component
     */
    const handleButtonClick = () => {
        sendDataToParent({
            loanAmount: Number(loanAmount),
            monthlyPayment: Number(monthlyPayment),
            interestRate: Number(formatInterestRate(interestRate)),
            // additionalPayment: Number(additionalPayment)
        })
    }

    /** 
     * Formats the interest rate to a number between 0 and 1.
     */
    const formatInterestRate = (value: string) => {
        let interestRate = Number(value)
        let strInstanceRate = interestRate % 1 !== 0 ? interestRate.toFixed(2).replace('.', '') : value
        if (interestRate < 10) {
            return `0.0${strInstanceRate}`
        } else {
            return `0.${strInstanceRate}`
        }
    }

    /** Validates the Integer Amount Field(s (loanAmount, monthlyPayment, additionalPayment) */
    const validateIntegerAmount = (value: string) => {
        if (value.length === 0) {
            return true
        }
        const integerValue = Number(value)
        return !isNaN(integerValue) && integerValue > 0
    }

    /** Validates the Decimal Amount Field(s) (interestRate) */
    const validatePercentage = (value: string) => {
        if (value.length === 0) {
            return true
        }
        const integerValue = Number(value)
        return !isNaN(integerValue) && integerValue > 0 && integerValue < 100
    }

    /** Validates whether or not the ShowGraph/HideGraph Button can be pressed */
    const validateButton = () => {
        // if (loanAmount.length === 0 || monthlyPayment.length === 0 || interestRate.length === 0 || additionalPayment.length === 0) {
            // return false
        // }
        return true
    }

    // Additional Payments
    const addAdditionalPayment = () => {
        if (additionalPayments.length < 4) {
            setAdditionalPayments([...additionalPayments, {
                name: optionalName,
                amount: Number(500)
            }])
            setOptionalName('')
        }
    }

    // Update an Additional Payment with new value
    const updateAdditionalPayment = (index: number, event: any) => {
        console.log(index, event.target.value)
        additionalPayments[index].amount = Number(event.target.value)
        setAdditionalPayments([...additionalPayments])
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
                disabled={showGraph}
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
                disabled={showGraph}
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
                disabled={showGraph}
            />
            <Button onClick={addAdditionalPayment}>Add Payment</Button>
            <TextField 
                id="optional-namer"
                helperText="Optional Name"
                variant="standard"
                onChange={(e) => setOptionalName(e.target.value)}
                value={optionalName}
            />
            {
                additionalPayments.map((payment: any, index: any) => {
                    return (
                        <Stack direction="row" spacing={2} key={index}>
                            <TextField
                                key={index}
                                id={`additional-payment-${index}`}
                                label="Additional Payment"
                                variant="standard"
                                placeholder="500"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={(e) => updateAdditionalPayment(index, e)}
                                value={payment.amount}
                            />
                            <ClearTwoToneIcon onClick={() => {
                                additionalPayments.splice(index, 1)
                                setAdditionalPayments([...additionalPayments])
                            }} />
                        </Stack>
                    )
                }
                )
            }
            <Button onClick={handleButtonClick} disabled={!validateButton()}>{showGraphButtonText}</Button>
        </Stack>
    )
}

/*
            { <TextField
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
                disabled={showGraph}
            /> 
*/

export default InputLoanDetail
