import {IgniteOffIcon, DeviceOfflineIcon, PanicIcon, BatteryIcon, DeviceMovingIcon, BusIcon, CarIcon, FamilyVanIcon, GeoFenceIcon, KidsIcon, MachineryIcon, IgniteOnIcon, OverSpeedIcon, PersonnelItemIcon, ShuttleVanIcon, TrailerIcon, TravelIcon, TruckIcon, XyzIcon, UnderSpeedIcon, FluelLevelcon, EngineIdleIcon, StationaryIcon, DeviceOnlineIcon, GeofenceExitIcon, GeofenceEntryIcon, DeviceStoppedIcon, DefaultAssetIcon } from "../component/SvgComponent"
import React from 'react'
import TempratureIcon from "../component/SvgComponent/TempratureIcon"

const IconConstant = (props) => {

    const { type, height, width, color } = props

    console.log("Image constant props", type, props)
    
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
        
        case 'deviceonline': return <DeviceOnlineIcon color={color} />  
        case 'ignitionon': return <IgniteOnIcon color={color} /> 
        case 'ignitionoff': return <IgniteOffIcon color={color} />  
        case 'overspeed': return <OverSpeedIcon color={color} /> 
        case 'deviceoverspeed': return <OverSpeedIcon color={color} />
        case 'underspeed': return <UnderSpeedIcon color={color} /> 
        case 'lowspeed': return <UnderSpeedIcon color={color} /> 
        case 'deviceoffline': return <DeviceOfflineIcon color={color} /> 
        case 'deviceunknown': return <DeviceOfflineIcon color={color} /> 
        case 'devicemoving': return <DeviceMovingIcon color={color} />
        case 'geofenceexit': return <GeofenceExitIcon color={color} />  
        case 'geofenceentry': return <GeofenceEntryIcon color={color} /> 
        case 'geofenceenter': return <GeofenceEntryIcon color={color} />
        case 'devicestopped': return <DeviceStoppedIcon color={color} /> 
        case 'panic': return <PanicIcon color={color} /> 
        case 'sos': return <PanicIcon color={color} /> 
        case 'lowbattery': return <BatteryIcon color={color} /> 
        case 'fuellevel': return <FluelLevelcon color={color} /> 
        case 'engineidle': return <EngineIdleIcon color={color} /> 
        case 'stationary': return <StationaryIcon color={color} /> 
        case 'temperature': return <TempratureIcon color={color}/>
            
        default: return <DefaultAssetIcon color={color} />  
    }
}


export default IconConstant