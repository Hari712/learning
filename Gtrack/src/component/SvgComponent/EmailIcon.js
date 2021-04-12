import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EmailIcon(props) {
    return (
        <Svg width={12.184} height={9.388} viewBox="0 0 11.184 8.388" {...props}>
            <Path
            d="M10.135 59.882H1.048A1.05 1.05 0 000 60.93v6.291a1.05 1.05 0 001.048 1.049h9.087a1.05 1.05 0 001.048-1.048V60.93a1.05 1.05 0 00-1.048-1.048zm0 .7a.347.347 0 01.134.027l-4.677 4.053-4.678-4.054a.348.348 0 01.134-.027zm0 6.99H1.048a.35.35 0 01-.348-.351v-5.874l4.664 4.042a.35.35 0 00.458 0l4.664-4.042v5.875a.35.35 0 01-.351.349z"
            transform="translate(0 -59.882)"
            fill="#b5b5b5"
            />
        </Svg>
    )
}

export default EmailIcon