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
        expect(paymentBreakdown['date']).toBe(DateUtil.toISOString(calculator._addMonthsToDate(new Date(), 1)))
        expect(paymentBreakdown['standardRemainingBalance']).toBe(707)
    })

    test("Get MonthBreakdown of loan - 2 Additional Payments", () => {
        let paymentLookUp = {
            standard: 300,
            additional0: 500,
            additional1: 1000
        }
        let results = calculator.getBreakdownOfLoanPayments(1000, 0.08, paymentLookUp)
        expect(results).toBeInstanceOf(Object)
        let monthPaymentBreakdowns = results.monthPaymentBreakdowns
        expect(monthPaymentBreakdowns).toHaveLength(5)
    })

    test("Get MonthBreakdown of loan - No Additional Payments", () => {
        let paymentLookUp = {
            standard: 300
        }
        let results = calculator.getBreakdownOfLoanPayments(1000, 0.08, paymentLookUp)
        expect(results).toBeInstanceOf(Object)
        let monthPaymentBreakdowns = results.monthPaymentBreakdowns
        expect(monthPaymentBreakdowns).toHaveLength(5)
    })

    test("Get MonthBreakdown of loan - My Example", () => {
        let paymentLookUp = {
            standard: 1495
        }
        let results = calculator.getBreakdownOfLoanPayments(59875, 0.031, paymentLookUp)
        expect(results).toBeInstanceOf(Object)
        let monthPaymentBreakdowns = results.monthPaymentBreakdowns
        expect(monthPaymentBreakdowns).toHaveLength(44)
    })

    test("Get MonthBreakdown of loan - Large Example", () => {
        let paymentLookUp = {
            standard: 1199.10
        }
        let results = calculator.getBreakdownOfLoanPayments(167371.45, 0.06, paymentLookUp)
        expect(results).toBeInstanceOf(Object)
        let monthPaymentBreakdowns = results.monthPaymentBreakdowns
        expect(monthPaymentBreakdowns).toHaveLength(241)
    })
})
