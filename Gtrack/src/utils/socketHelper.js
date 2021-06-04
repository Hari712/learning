import mapKeys from 'lodash/mapKeys';
export let notificationEvents = []
export let readEvents = []
export let isNewEvent = false

export const setNotificationEvents = (item) => {
    notificationEvents = [...notificationEvents, ...item]
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