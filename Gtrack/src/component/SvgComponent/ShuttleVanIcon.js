import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function ShuttleVanIcon(props) {
    const {color} = props
    return (
        <Svg
            data-name="17-shuttle van"
            width={24.411}
            height={13.174}
            viewBox="0 0 24.411 13.174"
            {...props}
        >
            <G fill={color?color:"#fff"}>
            <Path
                data-name="Path 2330"
                d="M5.512 396H4v1.744a.581.581 0 00.581.581h1.088A3.092 3.092 0 015.512 396z"
                transform="translate(-4 -386.313)"
            />
            <Path
                data-name="Path 2331"
                d="M457.85 396.969a3.082 3.082 0 01-.313 1.356h1.863a.581.581 0 00.581-.581V396h-2.287a3.087 3.087 0 01.156.969z"
                transform="translate(-435.571 -386.313)"
            />
            <Path
                data-name="Path 2332"
                d="M350.519 364a2.519 2.519 0 102.519 2.519 2.519 2.519 0 00-2.519-2.519zm0 3.681a1.162 1.162 0 111.162-1.162 1.162 1.162 0 01-1.162 1.162z"
                transform="translate(-331.339 -355.863)"
            />
            <Path
                data-name="Path 2333"
                d="M46.519 364a2.519 2.519 0 102.519 2.519A2.519 2.519 0 0046.519 364zm0 3.705a1.187 1.187 0 111.187-1.187 1.187 1.187 0 01-1.187 1.187z"
                transform="translate(-42.063 -355.863)"
            />
            <Path
                data-name="Path 2334"
                d="M162.53 396h-8.836a3.092 3.092 0 01-.157 2.325h9.15a3.092 3.092 0 01-.157-2.325z"
                transform="translate(-146.294 -386.313)"
            />
            <Path
                data-name="Path 2335"
                d="M27.071 201.851l-2.805-1.2-2.582-3.873a1.74 1.74 0 00-1.451-.778H5.744A1.746 1.746 0 004 197.744v6.781h2.208a3.092 3.092 0 014.5 0h10.224a3.092 3.092 0 014.5 0h2.983v-.694a2.121 2.121 0 00-1.34-1.979zm-10.284-1.787a.581.581 0 01-.581.581H5.744a.581.581 0 01-.581-.581v-2.321a.581.581 0 01.581-.581h10.461a.581.581 0 01.581.581zm5.68.582h-3.162a.581.581 0 01-.581-.581v-2.325a.581.581 0 01.581-.581H20.5a.775.775 0 01.65.353l1.645 2.532a.387.387 0 01-.325.6z"
                transform="translate(-4 -196)"
            />
            </G>
        </Svg>
    )
}

export default ShuttleVanIcon