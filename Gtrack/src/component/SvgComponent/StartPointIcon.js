import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function StartPointIcon(props) {
    return (
        <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
        <G data-name="Group 8728">
            <G
            data-name="Ellipse 915"
            transform="translate(-14008 21530) translate(14008 -21530)"
            fill="none"
            stroke="#52c208"
            strokeWidth={1}
            >
            <Circle cx={8} cy={8} r={8} stroke="none" />
            <Circle cx={8} cy={8} r={7.5} />
            </G>
            <G data-name="Group 8724">
            <Path
                data-name="Path 4929"
                d="M7.487 2.725L1.064.059a.769.769 0 00-1.04.9L.6 3.2h2.8a.233.233 0 110 .467H.6L.024 5.91a.769.769 0 001.04.9l6.423-2.665a.769.769 0 000-1.42z"
                fill="#52c208"
                transform="translate(-14008 21530) rotate(-30 -33157.25 -36907.336)"
            />
            </G>
        </G>
        </Svg>
    )
}

export default StartPointIcon