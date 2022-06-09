import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function PanicIconClick(props) {
    return (
        <Svg width={18.696} height={18.696} viewBox="0 0 50 50" {...props}>
        <G data-name="Group 8851">
            <G
            data-name="Rectangle 4344"
            transform="translate(-310 -321) translate(310 321)"
            fill="#fff"
            stroke="#f33"
            strokeWidth={1}
            >
            <Rect width={50} height={50} rx={13} stroke="none" />
            <Rect x={0.5} y={0.5} width={49} height={49} rx={12.5} fill="none" />
            </G>
            <Path
            data-name="Path 4"
            d="M27.466 50.2L15.427 29.344a1.816 1.816 0 00-3.143 0L.245 50.2a1.816 1.816 0 001.572 2.723h24.077a1.816 1.816 0 001.572-2.723zM13.872 35.766a1.376 1.376 0 011.373 1.413l-.227 7.92a1.152 1.152 0 01-2.3 0l-.221-7.92a1.38 1.38 0 011.375-1.413zm-.017 14.325a1.43 1.43 0 111.43-1.43 1.431 1.431 0 01-1.43 1.431z"
            fill="#f33"
            transform="translate(-310 -321) translate(321 304.562)"
            />
        </G>
        </Svg>
    )
}

export default PanicIconClick