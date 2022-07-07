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
})
