import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import { ColorConstant } from './../../constants/ColorConstants';

function DefaultAssetIcon(props) {
    const { color } = props
    return (
        <Svg width={17.275} height={12.226} viewBox="0 0 17.275 12.226" {...props}>
        <G data-name="Group 16757">
            <Path
            data-name="Path 38167"
            d="M17.176 9.49a.444.444 0 00-.343-.163h-1.681a5.731 5.731 0 00-1.57-2.571c-2.125-1.4-7.763-1.4-9.888 0a5.76 5.76 0 00-1.57 2.571H.442a.443.443 0 00-.433.532l.249 1.207a.442.442 0 00.433.353h.5a2.987 2.987 0 00-.719 1.951 2.924 2.924 0 00.924 2.2l.019.015v1.685a.664.664 0 00.663.663H3.63a.664.664 0 00.663-.663v-.679h8.688v.679a.664.664 0 00.663.663H15.2a.665.665 0 00.663-.663v-1.655a3.035 3.035 0 00.194-4.2h.531a.441.441 0 00.433-.353l.249-1.206a.446.446 0 00-.094-.366zM4.422 7.864c1.694-1.115 6.736-1.115 8.429 0a5.47 5.47 0 011.14 2.157H3.283a5.47 5.47 0 011.139-2.157zm-1.984 5.673a1.305 1.305 0 111.305 1.305 1.305 1.305 0 01-1.305-1.305zm11.111 1.305a1.305 1.305 0 111.305-1.305 1.305 1.305 0 01-1.305 1.305z"
            transform="translate(0 -5.707) translate(0 5.707) translate(0 -5.707)"
            fill={color ? color : ColorConstant.WHITE}
            />
        </G>
        </Svg>
    )
}

export default DefaultAssetIcon
