import * as React from "react"
import Svg, { G, Circle, Rect } from "react-native-svg"

function ToggleButtonIconClicked(props) {
    return (
        <Svg viewBox="0 0 21 11" width={21} height={11} {...props}>
            <G data-name="Group 8601">
            <G data-name="Group 4466">
                <G
                data-name="Group 4493"
                transform="translate(-170 -316) translate(169 316)"
                >
                <Rect
                    fill="#ffddc5"
                    transform="translate(1 2)"
                    width={20}
                    height={7}
                    rx={3}
                    data-name="Rectangle 3623"
                />
                <Circle
                    fill="#ff7f21"
                    transform="translate(11)"
                    cx={5.5}
                    cy={5.5}
                    r={5.5}
                    data-name="Ellipse 604"
                />
                </G>
            </G>
            </G>
        </Svg>
        )
}

export default ToggleButtonIconClicked