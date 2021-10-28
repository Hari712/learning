import mapKeys from 'lodash/mapKeys';
export let notificationEvents = [{ attributes: {alarm: "lowBattery"},
alarm: "lowBattery",
deviceId: 125,
geofenceId: 0,
id: 1339,
maintenanceId: 0,
positionId: 5856,
serverTime: "2021-10-27T04:55:23.498+0000",
type: "alarm"}, {attributes: {},
deviceId: 170,
geofenceId: 0,
id: 2628,
maintenanceId: 0,
positionId: 0,
serverTime: "2021-10-27T12:35:35.116+0000",
type: "deviceOnline"}]
export let readEvents = []
export let isNewEvent = false

export const setNotificationEvents = (item) => {
    notificationEvents = [...item, ...notificationEvents]
    isNewEvent = true
}

export const setReadNotificationEvents = (item) => {  
    let array = mapKeys(readEvents,'id')  
    readEvents = Object.values({ ...array, [item.id]: item})    
    
    let result = notificationEvents.filter((nitem) =>!readEvents.some((readItem) => readItem.id === nitem.id))
    isNewEvent = result.length > 0 ? true : false
}

export const isReadEvent = (item) => {
    let array = readEvents.filter((nitem) => nitem.id === item.id)
    return array.length ? true : false
}

export const removeEvent = (item) => {
    notificationEvents = notificationEvents.filter((nitem) => nitem.id != item.id)
}

// export const readSocketData = (item) => {

// }