import DateUtil from '../util/dateUtil'

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

    getBreakdownOfLoanPaymentWithAdditionalPayments(principalAmount: number, monthlyInterestRate: number, paymentContributions: Array<any>): any {
        let firstMonthBreakdown = paymentContributions.map(payment => (
            { payment: payment, remainingBalance: principalAmount, futureDate: new Date()}
        ))
        let monthPaymentBreakdowns = [firstMonthBreakdown]
        var previousMonthPaymentBreakdowns = firstMonthBreakdown
        let monthCounter = 1

        var finalPaymentDates: any = {}

        do {
            let results = this.processPaymentContributions(principalAmount, monthlyInterestRate, monthCounter, previousMonthPaymentBreakdowns)
            let paymentBreakdowns = results.paymentBreakdowns
            previousMonthPaymentBreakdowns = paymentBreakdowns

            if (results.finalPaymentDates !== undefined) {
                for (let payment of Object.keys(results.finalPaymentDates)) {
                    finalPaymentDates[payment] = results.finalPaymentDates[payment]
                }
            }

            if (paymentBreakdowns.length !== 0) {
                monthPaymentBreakdowns.push(paymentBreakdowns)
                monthCounter += 1
            }
        } while (previousMonthPaymentBreakdowns.length > 0)
        return { monthPaymentBreakdowns: monthPaymentBreakdowns, finalPaymentDates: finalPaymentDates }
    }

    processPaymentContributions(principalAmount: number, monthlyInterestRate: number, monthCounter: number, previousMonthPaymentBreakdowns: any): any { // TODO create type for payment
        var paymentBreakdowns = []
        var finalPaymentDates: any = {}

        for(let previousMonthPaymentBreakdown of previousMonthPaymentBreakdowns) {
            if (previousMonthPaymentBreakdown.remainingBalance > 0) {
                let remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, previousMonthPaymentBreakdown.payment.paymentAmount, monthlyInterestRate, monthCounter)
                if (remainingBalance < 0) {
                    remainingBalance = 0
                    finalPaymentDates[previousMonthPaymentBreakdown.payment] = DateUtil.toISOString(this.addMonthsToDate(new Date(), monthCounter))
                }
                paymentBreakdowns.push(
                    {
                        payment: previousMonthPaymentBreakdown.payment,
                        remainingBalance: remainingBalance, 
                        futureDate: this.addMonthsToDate(new Date(), monthCounter)
                    }
                )
            }
        }

        if (Object.keys(finalPaymentDates).length > 0) {
            return { paymentBreakdowns: paymentBreakdowns, finalPaymentDates: finalPaymentDates }
        }
        return { paymentBreakdowns: paymentBreakdowns } 
    }

    addMonthsToDate(date: Date, months: number): Date {
        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() + months)
        return newDate
    }

    buildMonthBreakdownInstance( futureDate: Date, remainingBalance: number, additionalPaymentRemainingBalance: any ): object {
        return {
            name: DateUtil.toISOString(futureDate),
            remainingBalance: remainingBalance,
            ...(additionalPaymentRemainingBalance !== undefined && { additionalPaymentRemainingBalance: additionalPaymentRemainingBalance })
        }
    }
}

export default Calculator
