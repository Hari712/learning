import * as React from "react"
import Svg, { Defs, G, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function LiveEndPointIcon(props) {
    const { isDeviceOnline } = props

    return (
        <Svg width={54} height={54} viewBox="0 0 54 54" {...props}>
        <Defs></Defs>
        <G data-name="Group 8896">
            <G
            filter="url(#a)"
            transform="translate(-213.652 7.873) translate(213.65 -7.87)"
            >
            <Circle
                data-name="Ellipse 409"
                cx={18}
                cy={18}
                r={18}
                transform="translate(8 8)"
                // fill={isDeviceOnline ? "#1bbe15" : "#ff2121"}
                fill={"#ff8b3e"}
                opacity={0.38}
            />
            </G>
            <G
            filter="url(#b)"
            transform="translate(-213.652 7.873) translate(213.65 -7.87)"
            >
            <Circle
                data-name="Ellipse 408"
                cx={5.5}
                cy={5.5}
                r={5.5}
                transform="translate(20 20)"
                // fill={isDeviceOnline ? "#1bbe15" : "#ff2121"}
                fill={"#ff8b3e"}
            />
            </G>
        </G>
        </Svg>
    )
}

export default LiveEndPointIcon
