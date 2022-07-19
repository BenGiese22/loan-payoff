import { DataArray } from '@mui/icons-material'
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

    /*
    {
        date: "2020-01-01",
        standardRemainingBalance: 507,
        additional0RemainingBalance: 107,
        additional1RemainingBalance: 0
    }
    */

    /*
    {
        payment: {
            paymentName: "standard",
            paymentamount: 300
        },
        remainingBalance: 507
    }
    */

    /*
    loan
    {
        paymentPlanName: "standard",
        paymentPlanAmount: 300,
        paymentPlanInterestRate: 0.08,
        remainingBalance: 507,
        monthsPaid: 12
    }
    */

    /*
    What does the UI pass in.
    {
        principalAmount: 1000,
        standardPayment: 300,
        interestRate: 0.08
        additionalPayment: 500
    }
    */

    /*
    payment lookup
    {
        standard: 300,
        additional0: 500,
        additional1: 1000
    }
    
    monthCounter


    */

    getBreakdownOfLoanPaymentWithAdditionalPayments(principalAmount: number, monthlyInterestRate: number, paymentLookUp: Object): any {

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

            /*
            Expected Object Return Structure
            {
                date: "2020-01-01",
                standardRemainingBalance: 507,
                additional0RemainingBalance: 107,
                additional1RemainingBalance: 0
            }
            */

            // Check for Final Payment Date
            let finalPaymentDate = results.finalPaymentDates
            if (finalPaymentDate !== undefined) {
                Object.keys(finalPaymentDate).forEach((key: string | number) => {
                    finalPaymentDates[key] = finalPaymentDate[key]
                })
                // Object.keys(paymentBreakdown).forEach((key: string | number) => {
                //     if (key !== "date" && paymentBreakdown[key] === 0) {
                //         finalPaymentDates[key] = paymentBreakdown["date"]
                //     }
                // })
            }

            // Check if we have to continue iterating (we check for if we need to keep going later on)
            if (Object.keys(paymentBreakdown).length > 1) {
                monthPaymentBreakdowns.push(paymentBreakdown)
                monthCounter += 1
            }
        } while (Object.keys(previousMonthBreakdown).length > 1)
        return { monthPaymentBreakdowns: monthPaymentBreakdowns, finalPaymentDates: finalPaymentDates }
    }

    // processPaymentContributions(principalAmount: number, monthlyInterestRate: number, monthCounter: number, previousMonthPaymentBreakdowns: any): any { // TODO create type for payment
    processPaymentContributions(principalAmount: number, monthlyInterestRate: number, monthCounter: number, paymentLookUp: any, previousMonthPaymentBreakdown: any): any {
        var calculatedDateInstance = this.addMonthsToDate(new Date(), monthCounter)

        var paymentBreakdown: any = {
            date: DateUtil.toISOString(calculatedDateInstance)
        }
        var finalPaymentDates: any = {}

        /*
        Passed Object Structure
        {
            date: "2020-01-01",
            standardRemainingBalance: 507,
            additional0RemainingBalance: 107,
            additional1RemainingBalance: 0
        }
        */
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
    //     // var paymentBreakdowns = []
    //     var finalPaymentDates: any = {}


    //     var paymentBreakdownInstance: any = {
    //         name: this.addMonthsToDate(new Date(), monthCounter)
    //     }
    //     for(let previousMonthPaymentBreakdown of previousMonthPaymentBreakdowns) {
    //         if (previousMonthPaymentBreakdown.remainingBalance > 0) {
    //             let remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, previousMonthPaymentBreakdown.payment.paymentAmount, monthlyInterestRate, monthCounter)
    //             if (remainingBalance < 0) {
    //                 remainingBalance = 0
    //                 finalPaymentDates[previousMonthPaymentBreakdown.payment.paymentName] = DateUtil.toISOString(this.addMonthsToDate(new Date(), monthCounter))
    //             }
    //             // paymentBreakdowns.push(
    //             //     {
    //             //         payment: previousMonthPaymentBreakdown.payment,
    //             //         remainingBalance: remainingBalance, 
    //             //         futureDate: this.addMonthsToDate(new Date(), monthCounter)
    //             //     }
    //             // )
    //             paymentBreakdownInstance[previousMonthPaymentBreakdown.payment.paymentName] = remainingBalance
    //         }
    //     }

    //     if (Object.keys(finalPaymentDates).length > 0) {
    //         return { paymentBreakdown: paymentBreakdownInstance, finalPaymentDates: finalPaymentDates }
    //     }
    //     return { paymentBreakdown: paymentBreakdownInstance } 
    // }

    // getBreakdownOfLoanPaymentWithAdditionalPayments(principalAmount: number, monthlyInterestRate: number, paymentContributions: Array<any>): any {
    //     // let firstMonthBreakdown = paymentContributions.map(payment => (
    //     //     { payment: payment, remainingBalance: principalAmount, futureDate: new Date()}
    //     // ))
    //     // let monthPaymentBreakdowns = [firstMonthBreakdown]
    //     let firstMonthBreakdown: any = {
    //         name: new Date()
    //     }
    //     paymentContributions.forEach(payment => {
    //         firstMonthBreakdown[payment.paymentName] = principalAmount
    //     })
    //     var previousMonthPaymentBreakdowns = firstMonthBreakdown
    //     let monthCounter = 1

    //     var finalPaymentDates: any = {}

    //     do {
    //         let results = this.processPaymentContributions(principalAmount, monthlyInterestRate, monthCounter, previousMonthPaymentBreakdowns)
    //         let paymentBreakdown = results.paymentBreakdown
    //         previousMonthPaymentBreakdowns = paymentBreakdown

    //         if (results.finalPaymentDates !== undefined) {
    //             for (let payment of Object.keys(results.finalPaymentDates)) {
    //                 finalPaymentDates[payment] = results.finalPaymentDates[payment]
    //             }
    //         }

    //         if (Object.keys(paymentBreakdown).length > 0) {
    //             monthPaymentBreakdowns.push(paymentBreakdown)
    //             monthCounter += 1
    //         }
    //     } while (previousMonthPaymentBreakdowns.length > 0)
    //     return { monthPaymentBreakdowns: monthPaymentBreakdowns, finalPaymentDates: finalPaymentDates }
    // }

    // processPaymentContributions(principalAmount: number, monthlyInterestRate: number, monthCounter: number, previousMonthPaymentBreakdowns: any): any { // TODO create type for payment
    //     // var paymentBreakdowns = []
    //     var finalPaymentDates: any = {}


    //     var paymentBreakdownInstance: any = {
    //         name: this.addMonthsToDate(new Date(), monthCounter)
    //     }
    //     for(let previousMonthPaymentBreakdown of previousMonthPaymentBreakdowns) {
    //         if (previousMonthPaymentBreakdown.remainingBalance > 0) {
    //             let remainingBalance = this.getRemainingBalanceOnLoan(principalAmount, previousMonthPaymentBreakdown.payment.paymentAmount, monthlyInterestRate, monthCounter)
    //             if (remainingBalance < 0) {
    //                 remainingBalance = 0
    //                 finalPaymentDates[previousMonthPaymentBreakdown.payment.paymentName] = DateUtil.toISOString(this.addMonthsToDate(new Date(), monthCounter))
    //             }
    //             // paymentBreakdowns.push(
    //             //     {
    //             //         payment: previousMonthPaymentBreakdown.payment,
    //             //         remainingBalance: remainingBalance, 
    //             //         futureDate: this.addMonthsToDate(new Date(), monthCounter)
    //             //     }
    //             // )
    //             paymentBreakdownInstance[previousMonthPaymentBreakdown.payment.paymentName] = remainingBalance
    //         }
    //     }

    //     if (Object.keys(finalPaymentDates).length > 0) {
    //         return { paymentBreakdown: paymentBreakdownInstance, finalPaymentDates: finalPaymentDates }
    //     }
    //     return { paymentBreakdown: paymentBreakdownInstance } 
    // }

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
function payment(payment: any, arg1: (payment: any) => void) {
    throw new Error('Function not implemented.')
}

