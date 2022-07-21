import { DataArray } from '@mui/icons-material'
import DateUtil from '../util/dateUtil'

class Calculator {
    // TODO get amount of interest paid

    /**
     * @param {number} principalAmount - The amount of money borrowed
     * @param {number} monthlyPayment - The monthly payment amount
     * @param {number} monthlyInterestRate - The monthly interest rate
     * 
     * @returns {number} The number of payments that will be made
     */
    getMonthsUntilLoanIsPaidOff(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number): number {
        const annualInterestRate = monthlyInterestRate / 12
        const months = -(Math.log(1 - (principalAmount * annualInterestRate) / monthlyPayment) / Math.log(1 + annualInterestRate))
        return Math.round(months)
    }

    /**
     * @param {number} principalAmount - The amount of money borrowed
     * @param {number} monthlyPayment - The monthly payment amount
     * @param {number} monthlyInterestRate - The monthly interest rate
     * @param {number} numberOfPayments - The number of payments that have been made
     * 
     * @returns {number} The remaining balance on the loan after the number of payments have been made
     */
    getRemainingBalanceOnLoan(principalAmount: number, monthlyPayment: number, monthlyInterestRate: number, numberOfPayments: number): number {
        const plusAnnualInterestRate = 1 + monthlyInterestRate / 12
        const front = principalAmount * Math.pow(plusAnnualInterestRate, numberOfPayments)
        const back = (monthlyPayment * (Math.pow(plusAnnualInterestRate, numberOfPayments) - 1)) / (monthlyInterestRate / 12)
        return Math.round(front - back)
    }

    /**
     * @param {number} principalAmount - The amount of money borrowed
     * @param {number} monthlyInterestRate - The monthly interest rate
     * @param {Object} paymentLookUp - An object containing the monthly payment amounts for each payment type
     * 
     * @returns {Object} An object containing the monthly payment breakdown for each payment type and the final payment dates
     */
    getBreakdownOfLoanPayments(principalAmount: number, monthlyInterestRate: number, paymentLookUp: Object): any {
        // TODO validate input.

        // Create the first Month Breakdown
        let firstMonthBreakdown: any = {
            date: DateUtil.toISOString(new Date())
        }
        Object.keys(paymentLookUp).forEach((key: string | number) => {
            firstMonthBreakdown[`${key}RemainingBalance`] = principalAmount
        })

        var monthPaymentBreakdowns = [firstMonthBreakdown]
        var previousMonthBreakdown = firstMonthBreakdown
        let monthCounter = 1

        var finalPaymentDates: any = {}

        do {
            let results = this.processPaymentContributions(principalAmount, monthlyInterestRate, monthCounter, paymentLookUp, previousMonthBreakdown)
            let paymentBreakdown = results.paymentBreakdown
            previousMonthBreakdown = results.paymentBreakdown

            // Check for Final Payment Date
            let finalPaymentDate = results.finalPaymentDates
            if (finalPaymentDate !== undefined) {
                Object.keys(finalPaymentDate).forEach((key: string | number) => {
                    finalPaymentDates[key] = finalPaymentDate[key]
                })
            }

            // Check if we have to continue iterating (we check for if we need to keep going later on)
            if (Object.keys(paymentBreakdown).length > 1) {
                monthPaymentBreakdowns.push(paymentBreakdown)
                monthCounter += 1
            }
        } while (Object.keys(previousMonthBreakdown).length > 1)
        return { monthPaymentBreakdowns: monthPaymentBreakdowns, finalPaymentDates: finalPaymentDates }
    }

    /**
     * @param {number} principalAmount - The amount of money borrowed
     * @param {number} monthlyInterestRate - The monthly interest rate
     * @param {number} monthCounter - The number of payments that have been made
     * @param {Object} paymentLookUp - An object containing the monthly payment amounts for each payment type
     * @param {Object} previousMonthBreakdown - The previous month breakdown
     * 
     * @return {Object} An object containing the monthly payment breakdown for each payment type and the final payment dates
     */
    processPaymentContributions(principalAmount: number, monthlyInterestRate: number, monthCounter: number, paymentLookUp: any, previousMonthPaymentBreakdown: any): any {
        var calculatedDateInstance = this._addMonthsToDate(new Date(), monthCounter)
        var paymentBreakdown: any = {
            date: DateUtil.toISOString(calculatedDateInstance)
        }
        var finalPaymentDates: any = {}

        Object.keys(previousMonthPaymentBreakdown).forEach((key: string | number) => {
            if (key !== "date") {
                let keyString = key.toString()
                let index = keyString.indexOf("RemainingBalance")
                let keyName = keyString.substring(0, index) // 'standard' or 'additional0' or 'additional1'
                if (previousMonthPaymentBreakdown[key] > 0) {
                    let remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, paymentLookUp[keyName], monthlyInterestRate, monthCounter)
                    if (remainingBalance < 0) {
                        remainingBalance = 0
                        finalPaymentDates[keyName] = calculatedDateInstance
                    }

                    paymentBreakdown[`${keyName}RemainingBalance`] = remainingBalance
                }
            }
        })
        return { paymentBreakdown: paymentBreakdown, finalPaymentDates: finalPaymentDates }
    }

    /**
     * @param {Date} date - The date that we add N number of months to
     * @param {number} months - The N number of months to add to the date
     * 
     * @return {Date} The Date Object that is the result of adding N number of months to the date
     */
    _addMonthsToDate(date: Date, months: number): Date {
        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() + months)
        return newDate
    }

}

export default Calculator

