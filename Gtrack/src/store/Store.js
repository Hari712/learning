import rootReducer from '../screen/reducer'
import rootsaga from '../screen/rootsaga'
import configureStore from './CreateStore'

const createStore = () => {

    return configureStore(rootReducer,rootsaga)
}

const store = createStore()

export default store