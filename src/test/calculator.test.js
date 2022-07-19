import Calculator from "../service/calculator"
import DateUtil from "../util/dateUtil"


describe("Calculator", () => {

    let calculator

    beforeEach(() => {
        calculator = new Calculator()
    })

    test("Get number of months until loan is paid off - mortgage example", () => {
        let result = calculator.getMonthsUntilLoanIsPaidOff(167371.45, 1199.10, 0.06)
        expect(result).toBe(240)
    })

    test("Get number of months until loan is paid off - simple example", () => {
        let result = calculator.getMonthsUntilLoanIsPaidOff(10000, 300, 0.08)
        expect(result).toBe(38)
    })

    test("Get number of months until loan is paid off - my example", () => {
        let result = calculator.getMonthsUntilLoanIsPaidOff(59875, 1495, 0.031)
        expect(result).toBe(42)
    })

    test("Get remaining balance on loan", () => {
        let result = calculator.getRemainingBalanceOnLoan(10000, 300, 0.08, 5)
        expect(result).toBe(8818)
    })

    test("Get remaining balance on loan - my example", () => {
        let result = calculator.getRemainingBalanceOnLoan(59875, 1495, 0.031, 5)
        expect(result).toBe(53139)
    })

    test("Get MonthBreakdown of loan", () => {
        let monthBreakdownResult = calculator.getBreakdownOfLoanPayment(1000, 300, 0.08)
        console.log(monthBreakdownResult)
        expect(monthBreakdownResult).toHaveLength(5)
    })

    test("Get MonthBreakdown of loan - my example", () => {
        let monthBreakdownResult = calculator.getBreakdownOfLoanPayment(59875, 1495, 0.031)
        expect(monthBreakdownResult).toHaveLength(44)
    })

    test("Get MonthBreakdown of loan - large example", () => {
        let monthBreakdownResult = calculator.getBreakdownOfLoanPayment(167371.45, 1199.10, 0.06)
        expect(monthBreakdownResult).toHaveLength(241)
    })

    test("Process Payment Contributions", () => {

        let paymentLookUp = {
            standard: 300,
            additional0: 1000,
        }

        let previousPaymentBreakdown = {
            date: "2020-01-01",
            standardRemainingBalance: 1000,
            additional0RemainingBalance: 1000,
        }
        let results = calculator.processPaymentContributions(1000, 0.08, 1, paymentLookUp, previousPaymentBreakdown)
        expect(results).toBeInstanceOf(Object)
        let paymentBreakdown = results.paymentBreakdown
        expect(paymentBreakdown).toBeInstanceOf(Object)
        expect(paymentBreakdown['date']).toBe(DateUtil.toISOString(calculator.addMonthsToDate(new Date(), 1)))
        expect(paymentBreakdown['standardRemainingBalance']).toBe(707)
    })

    test("Get MonthBreakdown of loan - 2 Additional Payments", () => {
        // let paymentContributions = [
        //     { paymentName: 'standard', paymentAmount: 300 },
        //     { paymentName: 'additional0', paymentAmount: 500 },
        //     { paymentName: 'additional1', paymentAmount: 1000 }
        // ]
        let paymentLookUp = {
            standard: 300,
            additional0: 500,
            additional1: 1000
        }
        let results = calculator.getBreakdownOfLoanPaymentWithAdditionalPayments(1000, 0.08, paymentLookUp)
        expect(results).toBeInstanceOf(Object)
        let monthPaymentBreakdowns = results.monthPaymentBreakdowns
        expect(monthPaymentBreakdowns).toHaveLength(5)
    })
})
