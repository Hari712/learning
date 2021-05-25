import * as React from "react"
import Svg, { G, Path, Ellipse } from "react-native-svg"

function BusIcon(props) {
    const {color} = props
    return (
        <Svg width={27.545} height={13.282} viewBox="0 0 27.545 13.282" {...props}>
            <G transform="translate(0 .002)" fill={color?color:"#fff"}>
            <Path
                data-name="Path 2336"
                d="M418.34 156.451h-.984v-.984H414.9v-.984h2.951a.492.492 0 01.492.492v1.476z"
                transform="translate(-392.271 -153.5)"
            />
            <G data-name="Group 2430" transform="translate(2.951 10.329)">
                <Ellipse
                data-name="Ellipse 402"
                cx={1.476}
                cy={1.476}
                rx={1.476}
                ry={1.476}
                transform="translate(18.691)"
                />
                <Ellipse
                data-name="Ellipse 403"
                cx={1.476}
                cy={1.476}
                rx={1.476}
                ry={1.476}
                />
            </G>
            <Path
                data-name="Subtraction 4"
                d="M21.15 11.8H6.394a1.967 1.967 0 00-3.935 0h-.984A1.477 1.477 0 010 10.328V1.473A1.477 1.477 0 011.475 0h20.66a1.477 1.477 0 011.475 1.473v3.444l1.6.649a3.531 3.531 0 011.69 1.827 6.791 6.791 0 01.648 2.842V11.8h-2.461a1.967 1.967 0 00-3.935 0zm-5.5-9.449V10.9h3.8V2.355zm-8.7 6.006a.492.492 0 100 .984h6.825a.492.492 0 000-.984zm14.691-1.472a.492.492 0 000 .984h1.968a.492.492 0 000-.984zM1.966 6.393a.492.492 0 100 .984h11.805a.492.492 0 000-.984zm18.727-4.426v2.951h2.426V1.967zm-10.13 0a1 1 0 00-1 1v.951a1 1 0 001 1h.951a1 1 0 001-1v-.952a1 1 0 00-1-1zm-3.8 0a1 1 0 00-1 1v.951a1 1 0 001 1h.951a1 1 0 001-1v-.952a1 1 0 00-1-1zm-3.8 0a1 1 0 00-1 1v.951a1 1 0 001 1h.951a1 1 0 001-1v-.952a1 1 0 00-1-1zM24.1 11.8h-1.966a.984.984 0 011.967 0zm-18.69 0H3.443a.984.984 0 011.967 0z"
            />
            <Ellipse
                data-name="Ellipse 404"
                cx={1.476}
                cy={1.476}
                rx={1.476}
                ry={1.476}
                transform="translate(2.951 10.329)"
            />
            <Ellipse
                data-name="Ellipse 405"
                cx={1.476}
                cy={1.476}
                rx={1.476}
                ry={1.476}
                transform="translate(21.642 10.329)"
            />
            </G>
        </Svg>
    )
}

export default BusIcon