enum StatusColor {
    RED = "red",
    ORANGE = "orange",
    GREEN = "green"
}

const LOW_THRESHOLD = 40;
const MEDIUM_THRESHOLD = 80;

export function getChartColor(min: number, max: number, value: number): StatusColor {
    const chartPercentage = calculatePercentage(min, max, value);

    if (chartPercentage <= LOW_THRESHOLD) return StatusColor.RED;
    if (chartPercentage <= MEDIUM_THRESHOLD) return StatusColor.ORANGE;
    return StatusColor.GREEN;
}

function calculatePercentage(minimum:number, maximum:number, value:number) {
    return (value-minimum)/(maximum-minimum) * 100
}