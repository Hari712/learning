import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function BatteryIcon(props) {
    return (
        <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
            <G data-name="Group 8473">
            <G data-name="Group 8415">
                <Circle
                data-name="Ellipse 638"
                cx={15}
                cy={15}
                r={15}
                transform="translate(-27 -177) translate(-3 -84) translate(30 261)"
                fill="#fef6f1"
                />
            </G>
            <Path
                data-name="Path 4545"
                d="M11.683 10.35v.533a1.066 1.066 0 01-1.067 1.067h-8.8A1.066 1.066 0 01.75 10.883V5.817A1.066 1.066 0 011.817 4.75h8.8a1.066 1.066 0 011.067 1.067v.533h.533a.534.534 0 01.533.533v2.934a.534.534 0 01-.533.533z"
                transform="translate(-27 -177) translate(36 184) translate(-.35 -.35)"
                fill="none"
            />
            <Path
                data-name="Path 4546"
                d="M10.267 12h-8.8A1.468 1.468 0 010 10.533V5.467A1.468 1.468 0 011.467 4h8.8a1.468 1.468 0 011.467 1.467V5.6h.129a.934.934 0 01.933.933v2.934a.934.934 0 01-.933.933h-.129v.133A1.468 1.468 0 0110.267 12zm-8.8-7.2a.668.668 0 00-.667.667v5.067a.668.668 0 00.667.667h8.8a.668.668 0 00.667-.667V10a.4.4 0 01.4-.4h.529A.133.133 0 0012 9.467V6.533a.133.133 0 00-.133-.133h-.529a.4.4 0 01-.4-.4v-.533a.668.668 0 00-.667-.667z"
                fill="#ff7f21"
                transform="translate(-27 -177) translate(36 184)"
            />
            <Path
                data-name="Path 4547"
                d="M3.4 11.8a.4.4 0 01-.4-.4v-4a.4.4 0 11.8 0v4a.4.4 0 01-.4.4z"
                transform="translate(-27 -177) translate(36 184) translate(-1.4 -1.4)"
                fill="#ff7f21"
            />
            </G>
        </Svg>
    )
}

export default BatteryIcon