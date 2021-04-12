import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function MenuIconClicked(props) {
    return (
        <Svg width={4} height={22} viewBox="0 0 4 22" {...props}>
            <G data-name="Group 8684" transform="translate(-345 -18)" fill="#ff7f21">
            <Circle
                data-name="Ellipse 831"
                cx={2}
                cy={2}
                r={2}
                transform="translate(345 18)"
            />
            <Circle
                data-name="Ellipse 832"
                cx={2}
                cy={2}
                r={2}
                transform="translate(345 27)"
            />
            <Circle
                data-name="Ellipse 833"
                cx={2}
                cy={2}
                r={2}
                transform="translate(345 36)"
            />
            </G>
        </Svg>
    )
}

export default MenuIconClicked