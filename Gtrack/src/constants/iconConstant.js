import images from "./images";
import {XyzIcon } from "../component/SvgComponent"

const iconConstant = (type) => {
    switch (type) {
        case 'Other': return images.dashBoard.truckIcon 
    
        default: return images.dashBoard.carIcon 
    }


}



export default iconConstant