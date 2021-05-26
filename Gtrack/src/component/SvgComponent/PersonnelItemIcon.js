import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"

function PersonnelItemIcon(props) {
    const {color} = props
    return (
        <Svg width={17.181} height={13.969} viewBox="0 0 17.181 13.969" {...props}>
            <Path
            data-name="Path 2370"
            d="M1.164 53.131H6.3v-4.812H0v6.3h1.164z"
            transform="translate(0 -48.319)"
            fill={color?color:"#fff"}
            />
            <Path
            data-name="Path 2371"
            d="M70.481 225.654a.993.993 0 100-1.986h-5.308v1.986z"
            transform="translate(-63.016 -217.863)"
            fill={color?color:"#fff"}
            />
            <Path
            data-name="Path 2372"
            d="M115.345 403.677a1.986 1.986 0 003.973 0z"
            transform="translate(-111.527 -391.913)"
            fill={color?color:"#fff"}
            />
            <Path
            data-name="Path 2373"
            d="M82.979 144.457c.1 0 .191 0 .285.014l-.716-3.821h.992v-.993h-1.179l-.186-.993h-3.888v.993h1.531l.942 5.793h-3.636l-.577-1.3a1.974 1.974 0 01-1.065.311h-4.8a3.455 3.455 0 00-.336 1.49v.5h9.824a2.984 2.984 0 012.809-1.994z"
            transform="translate(-68.016 -135.673)"
            fill={color?color:"#fff"}
            />
            <Ellipse
            data-name="Ellipse 407"
            cx={1.986}
            cy={1.986}
            rx={1.986}
            ry={1.986}
            transform="rotate(-82.996 13.997 -.465)"
            fill={color?color:"#fff"}
            />
        </Svg>
    )
}

export default PersonnelItemIcon