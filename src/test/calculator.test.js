import Calculator from "../service/calculator";


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

    test("Get remaining balance on loan", () => {
        let result = calculator.getRemainingBalanceOnLoan(10000, 300, 0.08, 5)
        expect(result).toBe(12933)
    })

    test("Get MonthBreakdown of loan", () => {
        let monthBreakdownResult = calculator.getBreakdownOfLoanPayment(1000, 300, 0.08)
        expect(monthBreakdownResult).toHaveLength(6)
    })

})
