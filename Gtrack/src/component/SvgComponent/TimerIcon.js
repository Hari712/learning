import * as React from "react"
import Svg, { G, Path, Text, TSpan } from "react-native-svg"

function TimerIcon(props) {
    return (
        <Svg width={93.195} height={93.195} viewBox="0 0 93.195 93.195" {...props}>
        <G data-name="Group 8852">
            <G data-name="countdown (1)">
            <Path
                data-name="Path 5074"
                d="M93.2 46.6a46.6 46.6 0 10-46.6 46.6 46.6 46.6 0 0046.6-46.6z"
                fill="#f1f0ee"
                transform="translate(-140.902 -351.648) translate(140.902 351.648)"
            />
            <Path
                data-name="Path 5075"
                d="M103.81 60.4a43.4 43.4 0 10-43.4 43.4 43.413 43.413 0 0043.4-43.4z"
                transform="translate(-140.902 -351.648) translate(140.902 351.648) translate(-13.807 -13.807)"
                fill="#ecf2fb"
            />
            <G data-name="Group 8809" fill="#ecf2fb">
                <Path
                data-name="Path 5077"
                d="M291.317 46.6h3.383A46.6 46.6 0 00248.1 0v3.381A43.212 43.212 0 01291.317 46.6z"
                transform="translate(-140.902 -351.648) translate(140.902 351.648) translate(.019) translate(-201.521)"
                />
                <Path
                data-name="Path 5078"
                d="M3.481 248H.1a46.6 46.6 0 0046.6 46.6v-3.381A43.212 43.212 0 013.481 248z"
                transform="translate(-140.902 -351.648) translate(140.902 351.648) translate(.019) translate(-.1 -201.421)"
                />
            </G>
            <G data-name="Group 8810" fill="#06418e">
                <Path
                data-name="Path 5079"
                d="M248.1 291.217v3.383a46.6 46.6 0 0046.6-46.6h-3.381a43.212 43.212 0 01-43.219 43.217z"
                transform="translate(-140.902 -351.648) translate(140.902 351.648) translate(.019) translate(-201.521 -201.421)"
                />
                <Path
                data-name="Path 5080"
                d="M46.7 3.381V0A46.6 46.6 0 00.1 46.6h3.381A43.212 43.212 0 0146.7 3.381z"
                transform="translate(-140.902 -351.648) translate(140.902 351.648) translate(.019) translate(-.1)"
                />
            </G>
            <Path
                data-name="Path 5081"
                d="M93.258 46.209h-46.11V.1h-.939v46.109H.1v.939h46.109v46.11h.939v-46.11h46.11v-.47a1.962 1.962 0 000-.469z"
                transform="translate(-140.902 -351.648) translate(140.902 351.648) translate(-.081 -.081)"
                fill="#c0dafe"
            />
            </G>
            <Text
            data-name={5}
            transform="translate(-140.902 -351.648) translate(177 411)"
            fill="#ff7f21"
            fontSize={35}
            fontFamily="Nunito-ExtraBold, Nunito"
            fontWeight={800}
            >
            <TSpan x={0} y={0}>
                {"5"}
            </TSpan>
            </Text>
        </G>
        </Svg>
    )
}

export default TimerIcon
