import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function MarkerIcon(props) {
    return (
        <Svg width={11} height={11} viewBox="0 0 11 11" {...props}>
        <Circle
            data-name="Ellipse 914"
            cx={5.5}
            cy={5.5}
            r={5.5}
            fill="#ff7f21"
        />
        </Svg>
    )
}

export default MarkerIcon