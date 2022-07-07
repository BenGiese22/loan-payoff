

class Calculator {
    // TODO get amount of interest paid

    // TODO document
    getMonthsUntilLoanIsPaidOff(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number): number {
        const annualInterestRate = monthlyInterestRate / 12
        const months = -(Math.log(1 - (principalAmount * annualInterestRate) / monthlyPayment) / Math.log(1 + annualInterestRate))
        return Math.round(months)
    }

    getRemainingBalanceOnLoan(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number, numberOfPayments: number): number {
        const plusAnnualInterestRate = 1 + monthlyInterestRate / 12
        const front = principalAmount * Math.pow(plusAnnualInterestRate, numberOfPayments)
        const back = (monthlyPayment * (Math.pow(plusAnnualInterestRate, numberOfPayments) - 1)) / (monthlyInterestRate / 12)
        return Math.round(front - back)
    }

    getBreakdownOfLoanPayment(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number): object[] {
        let monthBreakdown = []
        let monthCounter = 0
        var remainingBalance = principalAmount
        do {
            remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, monthlyPayment, monthlyInterestRate, monthCounter)
            if (remainingBalance < 0) {
                remainingBalance = 0
            }
            monthBreakdown.push({ name: String(monthCounter), remainingBalance: remainingBalance })
            monthCounter += 1
        } while (remainingBalance > 0)
        return monthBreakdown
    }

    getBreakdownOfLoanPaymentWithAdditionalPayment(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number, additionalMonthlyPayment: number): object[] {
        let monthBreakdown = []
        let monthCounter = 0
        var remainingBalance = principalAmount
        var additionalPaymentRemainingBalance = principalAmount
        var previousAdditionalPaymentRemainingBalance = undefined
        do {
            remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, monthlyPayment, monthlyInterestRate, monthCounter)
            additionalPaymentRemainingBalance = this.getRemainingBalanceOnLoan(principalAmount, monthlyPayment + additionalMonthlyPayment, monthlyInterestRate, monthCounter)
            if (remainingBalance < 0) {
                remainingBalance = 0
            }

            if (previousAdditionalPaymentRemainingBalance === undefined || (previousAdditionalPaymentRemainingBalance !== undefined && previousAdditionalPaymentRemainingBalance > 0)) {
                if (additionalPaymentRemainingBalance < 0) {
                    additionalPaymentRemainingBalance = 0
                }
                monthBreakdown.push({ name: String(monthCounter), remainingBalance: remainingBalance, additionalPaymentRemainingBalance: additionalPaymentRemainingBalance })
            } else {
                monthBreakdown.push({ name: String(monthCounter), remainingBalance: remainingBalance })
            }

            monthCounter += 1
            previousAdditionalPaymentRemainingBalance = additionalPaymentRemainingBalance
        } while (remainingBalance > 0)
        return monthBreakdown
    }

}

export default Calculator
