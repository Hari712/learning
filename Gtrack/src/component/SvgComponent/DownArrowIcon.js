import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function DownArrowIcon(props) {
    const { color='#fff', ...restProps } = props
    return (
        <Svg width={11.788} height={5.665} viewBox="0 0 11.788 5.665" {...restProps}>
            <G data-name="down-arrow (1)">
            <G data-name="Group 4541">
                <Path
                data-name="Path 4131"
                d="M11.654 126.642a.478.478 0 00-.651 0l-4.783 4.534a.478.478 0 01-.652 0l-4.782-4.535a.478.478 0 00-.651 0 .422.422 0 000 .619l4.782 4.534a1.435 1.435 0 001.953 0l4.783-4.534a.422.422 0 00.001-.618z"
                transform="translate(0 -126.513) translate(0 126.513) translate(0 -126.513)"
                fill={color}
                />
            </G>
            </G>
        </Svg>
    )
}

export default DownArrowIcon