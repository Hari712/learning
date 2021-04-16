import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FullScreenIcon(props) {
    return (
        <Svg width={14} height={14} viewBox="0 0 14 14" {...props}>
            <Path
            data-name="Path 4585"
            d="M0 .5V4h1V1h3V0H.5a.5.5 0 00-.5.5z"
            fill="#373737"
            />
            <Path
            data-name="Path 4586"
            d="M347.956 0h-3.5v1h3v3h1V.5a.5.5 0 00-.5-.5z"
            transform="translate(-334.456)"
            fill="#373737"
            />
            <Path
            data-name="Path 4587"
            d="M347.456 347.456h-3v1h3.5a.5.5 0 00.5-.5v-3.5h-1z"
            transform="translate(-334.456 -334.456)"
            fill="#373737"
            />
            <Path
            data-name="Path 4588"
            d="M1 344.456H0v3.5a.5.5 0 00.5.5H4v-1H1z"
            transform="translate(0 -334.456)"
            fill="#373737"
            />
        </Svg>
    )
}

export default FullScreenIcon