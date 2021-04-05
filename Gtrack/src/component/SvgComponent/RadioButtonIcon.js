import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function RadioButtonIcon(props) {
    return (
        <Svg viewBox="0 0 18.248 18.248" width={18.248} height={18.248} {...props}>
            <G
            fill="#fff"
            stroke="#b5b5b5"
            strokeWidth={1}
            transform="rotate(-51.98 10.505 5.12)"
            data-name="Ellipse 878"
            >
            <Circle stroke="none" cx={6.5} cy={6.5} r={6.5} />
            <Circle fill="none" cx={6.5} cy={6.5} r={6} />
            </G>
        </Svg>
    )
}

export default RadioButtonIcon