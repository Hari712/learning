import AsyncStorage from '@react-native-community/async-storage';

export const storeItem = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item))
        return true
    } catch (error) {
        throw error
    }
}

export const setItem = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, item)
    } catch (error) {
        throw error
    }
}

export const getValue = async (key, value) => {
    try {
        const retrievedItem =  await AsyncStorage.getItem(key);
        return retrievedItem
    } catch (error) {
        
    }
}

export const getItem = async (key) => {
    try {
        const retrievedItem =  await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
        throw error
    }
    return 
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        throw error
    }
    return 
}