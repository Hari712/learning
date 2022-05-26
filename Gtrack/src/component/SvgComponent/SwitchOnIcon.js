import * as React from "react"
import Svg, { G, Rect, Circle } from "react-native-svg"

function SwitchOnIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={14}
            viewBox="0 0 27 14"
            {...props}
        >
            <G data-name="Group 8905" transform="translate(-.34 -.67)">
                <Rect
                    data-name="Rectangle 3623"
                    width={24}
                    height={7}
                    rx={3.5}
                    transform="translate(.34 3.671)"
                    fill="#fff"
                />
                <G
                    data-name="Ellipse 604"
                    transform="translate(13.34 .671)"
                    fill="#0ed100"
                    stroke="#fff"
                    strokeWidth={0.3}
                >
                    <Circle cx={7} cy={7} r={7} stroke="none" />
                    <Circle cx={7} cy={7} r={6.85} fill="none" />
                </G>
            </G>
        </Svg>
    )
}

export default SwitchOnIcon