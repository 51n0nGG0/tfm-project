enum StatusColor {
    RED = "red",
    ORANGE = "orange",
    GREEN = "green"
}

const LOW_THRESHOLD = 30;
const MEDIUM_THRESHOLD = 70;

export function getChartColor(min: number, max: number, value: number): StatusColor {
    const chartPercentage = calculatePercentage(min, max, value);

    if (chartPercentage <= LOW_THRESHOLD) return StatusColor.GREEN;
    if (chartPercentage <= MEDIUM_THRESHOLD) return StatusColor.ORANGE;
    return StatusColor.RED;
}

function calculatePercentage(minimum:number, maximum:number, value:number) {
    return (value-minimum)/(maximum-minimum) * 100
}