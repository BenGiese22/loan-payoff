
class StrokeColor {

    static strokeColors: string[] = [
        "#8884d8",
        "#82ca9d",
        "#83bfd1",
        "#ca8982",
        "#d8af84",
        "#d19a83"
    ]

    static getStrokeColor(index: number): string {
        return this.strokeColors[index]
    }

}

export default StrokeColor
