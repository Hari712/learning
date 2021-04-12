import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationIcon(props) {
    return (
        <Svg width={12.007} height={16.01} viewBox="0 0 12.007 16.01" {...props}>
            <Path
            data-name="location-pin (1)"
            d="M9 0a6.032 6.032 0 00-6 6.047c0 4.738 5.439 9.631 5.671 9.836a.5.5 0 00.666 0c.231-.206 5.671-5.1 5.671-9.837A6.032 6.032 0 009 0zm0 9.339A3.335 3.335 0 1112.339 6 3.339 3.339 0 019 9.339z"
            transform="translate(-3)"
            fill="#fff"
            />
        </Svg>
    )
}

export default LocationIcon