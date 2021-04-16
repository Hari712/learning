import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function MenuIcon(props) {
    return (
        <Svg width={4} height={22} viewBox="0 0 4 22" {...props}>
            <G data-name="Group 7986" transform="translate(-343 -17)" fill="#b5b5b5">
            <Circle
                data-name="Ellipse 831"
                cx={2}
                cy={2}
                r={2}
                transform="translate(343 17)"
            />
            <Circle
                data-name="Ellipse 832"
                cx={2}
                cy={2}
                r={2}
                transform="translate(343 26)"
            />
            <Circle
                data-name="Ellipse 833"
                cx={2}
                cy={2}
                r={2}
                transform="translate(343 35)"
            />
            </G>
        </Svg>
    )
}

export default MenuIcon