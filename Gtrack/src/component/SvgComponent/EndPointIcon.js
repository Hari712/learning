import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function EndPointIcon(props) {
    return (
        <Svg width={16} height={16} viewBox="0 0 16 16" {...props}>
        <G data-name="Group 8727">
            <G
            data-name="Ellipse 913"
            transform="translate(-199 -410) translate(199 410)"
            fill="none"
            stroke="#c20808"
            strokeWidth={1}
            >
            <Circle cx={8} cy={8} r={8} stroke="none" />
            <Circle cx={8} cy={8} r={7.5} />
            </G>
            <G data-name="Group 8724">
            <Path
                data-name="Path 4929"
                d="M7.487 2.725L1.064.059a.769.769 0 00-1.04.9L.6 3.2h2.8a.233.233 0 110 .467H.6L.024 5.91a.769.769 0 001.04.9l6.423-2.665a.769.769 0 000-1.42z"
                fill="#c20808"
                transform="translate(-199 -410) rotate(-30 878.848 -169.391)"
            />
            </G>
        </G>
        </Svg>
    )
}

export default EndPointIcon