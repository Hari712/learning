import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function LiveStartPointIcon(props) {
    const { isDeviceOnline } = props

    return (
        <Svg width={7} height={7} viewBox="0 0 7 7" {...props}>
        <Circle
            data-name="Ellipse 410"
            cx={3.5}
            cy={3.5}
            r={3.5}
            fill={isDeviceOnline ? "#1bbe15" : "#ff2121"}
            // fill={"#ff7f21"}
        />
        </Svg>
    )
}

export default LiveStartPointIcon
