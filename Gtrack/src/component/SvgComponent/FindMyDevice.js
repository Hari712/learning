import * as React from "react";
import Svg, { Defs, G, Rect, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const FindMyDevice = (props) => (
  <Svg
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  width={68}
  height={68}
  viewBox="0 0 68 68"
  {...props}
>
  <Defs></Defs>
  <G id="Group_9150" data-name="Group 9150" transform="translate(-302 -208)">
    <G transform="matrix(1, 0, 0, 1, 302, 208)" filter="url(#Rectangle_4596)">
      <Rect
        id="Rectangle_4596-2"
        data-name="Rectangle 4596"
        width={50}
        height={50}
        rx={13}
        transform="translate(8 8)"
        fill="#ff6c00"
      />
    </G>
    <G id="directions" transform="translate(324 230)">
      <Path
        id="Path_5275"
        data-name="Path 5275"
        d="M0,0H21.6V21.6H0Z"
        fill="none"
      />
      <Path
        id="Path_5276"
        data-name="Path 5276"
        d="M20.285,9.631,12.177,1.523a1.846,1.846,0,0,0-2.547,0l-8.1,8.1a1.792,1.792,0,0,0,0,2.538l8.1,8.1a1.8,1.8,0,0,0,2.538,0l8.09-8.09A1.792,1.792,0,0,0,20.285,9.631ZM10.908,18.99l-8.1-8.1,8.1-8.1,8.1,8.1ZM7.3,10v3.6H9.1V10.9h3.6v2.25L15.849,10,12.7,6.851V9.1H8.2A.9.9,0,0,0,7.3,10Z"
        transform="translate(-0.101 -0.101)"
        fill="#fff"
      />
    </G>
  </G>
</Svg>
);

export default FindMyDevice;
