import { combineReducers } from 'redux'
import { api } from '../services/api'
import { connectToServer } from '../services/socket'
import { key } from '../json/key.json'

var INITIAL_STATE = new Promise((res, rej) => {
    return res({
        message: null,
        error: false
    })
})

function userReducer(before = INITIAL_STATE, data) {
    if(data.type === 'ADD_PLAYER_TO_CHAT') {
        async function responsePlayer() {
            const response = await api.put('/user', {
                name: data.playername
            })
            localStorage.setItem(key, JSON.stringify(response.data))

            return response.data 
        }
        
        return responsePlayer()
    }else if(data.type === 'REMOVE_PLAYER_FROM_CHAT') {
        async function responsePlayer() {
            const response = await api.delete(`/user/${data.playername}`)

            localStorage.setItem(key, JSON.stringify({
                message: null,
                error: false
            }))

            return response.data
        }

        return responsePlayer()
    }
    return before
}

export default combineReducers({
    userReducer
})