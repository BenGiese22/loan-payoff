import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, Grid, InputAdornment, TextField, Typography } from "@mui/material"

// Provide default initialization values for the fields
const defaultPaymentName = ''
const defaultPaymentAmount = '100'

const PaymentDialog = ({ dialogState, handleDialogStateChange, submitPayment }: { dialogState: boolean, handleDialogStateChange: any, submitPayment: Function}) => {

    const [paymentName, setPaymentName] = useState(defaultPaymentName)
    const [paymentAmount, setPaymentAmount] = useState(defaultPaymentAmount)

    const handleSubmit = () => {
        submitPayment({name: paymentName, amount: Number(paymentAmount)})
        resetFields()
    }

    const handleCancel = () => {
        resetFields()
        handleDialogStateChange()
    }

    const resetFields = () => {
        // Reset the fields
        setPaymentName(defaultPaymentName)
        setPaymentAmount(defaultPaymentAmount)
    }

    return (
        <Dialog open={dialogState}>
            <DialogContent>
                <Typography variant="body1">
                    Create an additional payment?
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="payment-name"
                    label="Payment Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={paymentName}
                    onChange={(e) => setPaymentName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="payment-amount"
                    label="Payment Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    value={paymentAmount}
                />
            </DialogContent>
            <DialogActions>
                <Grid container spacing={1} direction="row" justifyContent="center">
                    <Button onClick={handleCancel} style={{ marginRight: '8px' }}>Cancel</Button>
                    <Button onClick={handleSubmit} style={{ marginLeft: '8px' }}>Submit</Button> 
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentDialog
