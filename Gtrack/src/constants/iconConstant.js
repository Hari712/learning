import images from "./images";

const iconConstant = (type) => {
    switch (type) {
        case 'Other': return images.dashBoard.truckIcon 
    
        default: return images.dashBoard.carIcon 
    }


}



export default iconConstant