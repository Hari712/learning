import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function TruckIcon(props) {
    const {color} = props
    return (
        <Svg width={20.958} height={14.834} viewBox="0 0 20.958 14.834" {...props}>
            <G data-name="Group 8673" fill={color?color:"#fff"} fillRule="evenodd">
            <Path
                data-name="Path 1944"
                d="M-3514.371-641.148a9.155 9.155 0 00-.151-.922 1.96 1.96 0 00-1.753-1.529 3.642 3.642 0 00-1.561.091 1.951 1.951 0 00-1.449 1.674c-.037.217-.05.438-.08.706a5.233 5.233 0 01-.752-.09.587.587 0 01-.437-.548 2.157 2.157 0 01-.018-.231c0-3.352-.01-6.7 0-10.056a2.619 2.619 0 011.511-2.426 1.919 1.919 0 01.914-.2h9.69c.054 0 .108 0 .182.008v.191q.016 6.215.035 12.429a.791.791 0 01-.893.9h-5.243z"
                transform="translate(3520.575 654.674)"
            />
            <Path
                data-name="Path 1945"
                d="M-3105.87-572.025a7.6 7.6 0 00-.138-.839 2.05 2.05 0 00-1.585-1.526 2.6 2.6 0 00-2.065.235 2.407 2.407 0 00-1.182 1.84l-.029.229a.927.927 0 01-1.17-.6 1.112 1.112 0 01-.033-.311v-9.291a1.216 1.216 0 01.043-.343c.132-.445.287-.563.749-.564a6.453 6.453 0 014.08 1.317 5.282 5.282 0 011.412 1.859 10.609 10.609 0 01.927 3.041 21.046 21.046 0 01.157 4.119 2.245 2.245 0 01-.184.68.272.272 0 01-.2.145c-.258.019-.523.009-.782.009zm-2.56-4.885v-.008h1.957c.24 0 .318-.084.26-.321-.184-.743-.344-1.495-.589-2.218a2.669 2.669 0 00-1.508-1.692 3.763 3.763 0 00-1.9-.261.633.633 0 00-.649.713c.005 1.083.028 2.167.013 3.25a.531.531 0 00.558.544c.62-.024 1.239-.007 1.858-.007z"
                transform="translate(3125.635 585.565)"
            />
            <Path
                data-name="Path 1946"
                d="M-3445.935-284.3a1.265 1.265 0 011.26 1.266 1.267 1.267 0 01-1.271 1.258 1.262 1.262 0 01-1.263-1.263 1.245 1.245 0 011.274-1.261z"
                transform="translate(3449.645 296.594)"
            />
            <Path
                data-name="Path 1947"
                d="M-3036.541-281.375a1.258 1.258 0 01-1.242-1.315 1.268 1.268 0 011.284-1.21 1.266 1.266 0 011.241 1.318 1.263 1.263 0 01-1.283 1.207z"
                transform="translate(3053.81 296.209)"
            />
            </G>
        </Svg>
    )
}

export default TruckIcon