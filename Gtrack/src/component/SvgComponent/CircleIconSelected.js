import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function CircleIconSelected(props) {
    return (
        <Svg width={18.248} height={18.248} viewBox="0 0 18.248 18.248" {...props}>
            <G data-name="Group 8676" transform="translate(-23.377 -262.376)">
            <G
                data-name="Ellipse 883"
                transform="rotate(-51.98 291.256 112.266)"
                fill="#fff"
                stroke="#ff7f21"
                strokeWidth={1}
            >
                <Circle cx={6.5} cy={6.5} r={6.5} stroke="none" />
                <Circle cx={6.5} cy={6.5} r={6} fill="none" />
            </G>
            <Circle
                data-name="Ellipse 885"
                cx={3.5}
                cy={3.5}
                r={3.5}
                transform="translate(29 268)"
                fill="#ff7f21"
            />
            </G>
        </Svg>
    )
}

export default CircleIconSelected