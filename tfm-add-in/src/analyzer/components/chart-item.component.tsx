import React from "react"
import { GaugeChart, GaugeChartVariant, GaugeValueFormat, ResponsiveContainer } from "@fluentui/react-charting"
import { getChartColor } from "../utils/chart-color.util"


interface ChartItemProps {
    minimum: number,
    maximum: number,
    value: number,
    title: string,
}


const ChartItem:React.FC<ChartItemProps> = ({minimum, maximum, value, title}) => {
    const color = getChartColor(minimum, maximum, value);

    return(
            <GaugeChart
                minValue={minimum}
                maxValue={maximum}
                segments={[
                    { size: value, color: color, legend: "Passed" },
                    {
                        size: maximum - value,
                        color: "lightgrey",
                        legend: "Not",
                    },
                ]}
                chartValue={value} 
                chartTitle={title}
                roundCorners
                hideLegend
                hideTooltip
                hideMinMax
                chartValueFormat={GaugeValueFormat.Fraction}
                variant={GaugeChartVariant.SingleSegment}
            />
    );
}

export default ChartItem;