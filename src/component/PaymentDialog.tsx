import { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, Grid, Input, Typography } from "@mui/material"

const PaymentDialog = ({ dialogState, handleDialogStateChange, submitPayment }: { dialogState: boolean, handleDialogStateChange: any, submitPayment: Function}) => {

    const [paymentName, setPaymentName] = useState('')
    const [paymentAmount, setPaymentAmount] = useState('100')

    const handleSubmit = () => {
        submitPayment({name: paymentName, amount: Number(paymentAmount)})
        setPaymentName('')
        setPaymentAmount('100')
    }

    return (
        <Dialog open={dialogState}>
            <DialogContent>
                <Typography variant="body1">
                    Create an additional payment?
                </Typography>
                <Input
                    autoFocus
                    margin="dense"
                    id="payment-name"
                    type="text"
                    fullWidth
                    value={paymentName}
                    onChange={(e) => setPaymentName(e.target.value)}
                />
                <Input
                    autoFocus
                    margin="dense"
                    id="payment-amount"
                    type="text"
                    fullWidth
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Grid container spacing={1} direction="row" justifyContent="center">
                    <Button onClick={handleDialogStateChange} style={{ marginRight: '8px' }}>Cancel</Button>
                    <Button onClick={handleSubmit} style={{ marginLeft: '8px' }}>Submit</Button> 
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentDialog