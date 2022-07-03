

class Calculator {

    // TODO document
    getMonthsUntilLoanIsPaidOff(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number): number {
        const annualInterestRate = monthlyInterestRate / 12
        const months = -(Math.log(1 - (principalAmount * annualInterestRate) / monthlyPayment) / Math.log(1 + annualInterestRate))
        return Math.round(months)
    }

    getRemainingBalanceOnLoan(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number, numberOfPayments: number): number {
        const numerator = principalAmount * Math.pow(1 + monthlyInterestRate, numberOfPayments)
        const denominator = monthlyPayment * ((Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) / monthlyInterestRate)
        return Math.round(numerator - denominator)
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
            monthBreakdown.push({name: String(monthCounter), remainingBalance: remainingBalance})
            monthCounter += 1
        } while (remainingBalance > 0)
        return monthBreakdown
    }

}

export default Calculator
