import {BusIcon, CarIcon, FamilyVanIcon, KidsIcon, MachineryIcon, PersonnelItemIcon, ShuttleVanIcon, TrailerIcon, TravelIcon, TruckIcon, XyzIcon } from "../component/SvgComponent"
import React from 'react'

const IconConstant = (props) => {

    const { type, height, width, color } = props
    
    switch ( type ) {
        case 'Family Item': return <FamilyVanIcon color={color} />        
            
        case 'Personnel Item': return <PersonnelItemIcon color={color} />         
        
        case 'Bus': return <BusIcon color={color} />          
            
        case 'Machinery': return <MachineryIcon color={color} />           
        
        case 'Van': return <ShuttleVanIcon color={color} />            
            
        case 'Truck': return <TruckIcon color={color} />            
            
        case 'Car': return <CarIcon color={color} />           
            
        case 'Travel': return <TravelIcon color={color} />            
            
        case 'Kids': return <KidsIcon color={color} />            
            
        case 'Trailer': return <TrailerIcon color={color} />           
            
        default: return <CarIcon color={color} />  
    }
}


export default IconConstant