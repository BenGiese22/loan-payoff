

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
        var currentDate = new Date()
        let monthBreakdown = []
        let monthCounter = 0
        var remainingBalance = principalAmount
        do {
            remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, monthlyPayment, monthlyInterestRate, monthCounter)
            let futureDate = this.addMonthsToDate(currentDate, monthCounter)
            if (remainingBalance < 0) {
                remainingBalance = 0
            }
            monthBreakdown.push(this.buildMonthBreakdownInstance(futureDate, remainingBalance, undefined))
            monthCounter += 1
        } while (remainingBalance > 0)
        return monthBreakdown
    }

    getBreakdownOfLoanPaymentWithAdditionalPayment(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number, additionalMonthlyPayment: number): object[] {
        var currentDate = new Date()
        let monthBreakdown = []
        let monthCounter = 0
        var remainingBalance = principalAmount
        var additionalPaymentRemainingBalance = principalAmount
        var previousAdditionalPaymentRemainingBalance = undefined
        do {
            remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, monthlyPayment, monthlyInterestRate, monthCounter)
            additionalPaymentRemainingBalance = this.getRemainingBalanceOnLoan(principalAmount, monthlyPayment + additionalMonthlyPayment, monthlyInterestRate, monthCounter)
            let futureDate = this.addMonthsToDate(currentDate, monthCounter)
            if (remainingBalance < 0) {
                remainingBalance = 0
            }

            if (previousAdditionalPaymentRemainingBalance === undefined || (previousAdditionalPaymentRemainingBalance !== undefined && previousAdditionalPaymentRemainingBalance > 0)) {
                if (additionalPaymentRemainingBalance < 0) {
                    additionalPaymentRemainingBalance = 0
                }
                monthBreakdown.push(this.buildMonthBreakdownInstance(futureDate, remainingBalance, additionalPaymentRemainingBalance))
            } else {
                monthBreakdown.push(this.buildMonthBreakdownInstance(futureDate, remainingBalance, undefined))
            }

            monthCounter += 1
            previousAdditionalPaymentRemainingBalance = additionalPaymentRemainingBalance
        } while (remainingBalance > 0)
        return monthBreakdown
    }

    addMonthsToDate(date: Date, months: number): Date {
        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() + months)
        return newDate
    }

    buildMonthBreakdownInstance( futureDate: Date, remainingBalance: number, additionalPaymentRemainingBalance: any ): object {
        return {
            name: String(futureDate.toISOString().split('T')[0].replace(/-/g, '/')),
            remainingBalance: remainingBalance,
            ...(additionalPaymentRemainingBalance !== undefined && { additionalPaymentRemainingBalance: additionalPaymentRemainingBalance })
        }
    }
}

export default Calculator
