import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function OverSpeedIcon(props) {
    return (
        <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
            <G data-name="Group 8472">
            <G data-name="Group 8414">
                <Circle
                data-name="Ellipse 580"
                cx={15}
                cy={15}
                r={15}
                transform="translate(-27 -110) translate(-3 -68) translate(30 178)"
                fill="#fef6f1"
                />
            </G>
            <Path
                d="M14.762 109.5a7.381 7.381 0 00-12.6-5.219A7.333 7.333 0 000 109.5v.432h5.911a1.55 1.55 0 002.8.3 1.564 1.564 0 00.136-.3h5.91zm-6.791.291a.685.685 0 11.073-.519.685.685 0 01-.073.519zm.914-.723v-.011a1.541 1.541 0 00-.372-.675l1.243-2.105-.745-.44-1.243 2.105a1.552 1.552 0 00-1.888 1.126h-5a6.467 6.467 0 01.656-2.443l.96.554.432-.749-.959-.554a6.569 6.569 0 011.788-1.788l.554.959.749-.432-.555-.961A6.467 6.467 0 016.948 103v1.11h.865V103a6.467 6.467 0 012.443.655l-.555.961.749.432.554-.959a6.57 6.57 0 011.788 1.788l-.959.554.432.749.96-.554a6.467 6.467 0 01.656 2.443z"
                transform="translate(-27 -110) translate(35 17.879)"
                fill="#ff7f21"
            />
            </G>
        </Svg>
    )
}

export default OverSpeedIcon