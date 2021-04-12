import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function CircleIcon(props) {
    return (
        <Svg width={18.248} height={18.248} viewBox="0 0 18.248 18.248" {...props}>
            <G
            data-name="Ellipse 884"
            transform="rotate(-51.98 10.505 5.12)"
            fill="#fff"
            stroke="#b5b5b5"
            strokeWidth={1}
            >
            <Circle cx={6.5} cy={6.5} r={6.5} stroke="none" />
            <Circle cx={6.5} cy={6.5} r={6} fill="none" />
            </G>
        </Svg>
    )
}

export default CircleIcon