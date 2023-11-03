import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {
  async getTowerEvents(){
    const response = await api.get('api/events')
    logger.log('[TOWER EVENTS SERVICE] GET EVENTS: ', response.data)
    AppState.towerEvents = response.data.map(obj => new TowerEvent(obj))
  }

  async getMyEvents(userId){
    const response = await api.get('api/events')
    let towerEvents = response.data.map(obj => new TowerEvent(obj))
    AppState.myTowerEvents = towerEvents.filter(towerEvent => towerEvent.creatorId == userId)
    logger.log('[TOWER EVENTS SERVICE] GET MY EVENTS: ', AppState.towerEvents)
  }

  async getTowerEventById(eventId){
    const response = await api.get(`api/events/${eventId}`)
    logger.log('[TOWER EVENTS SERVICE] GOT EVENT BY ID: ', response.data)
    AppState.activeEvent = new TowerEvent(response.data)
  }

  async createEvent(eventData){
    const response = await api.post('api/events', eventData)
    logger.log('[TOWER EVENTS SERVICE] CREATED EVENT: ', response.data)
    const newEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(newEvent)
    return newEvent
  }

  async deleteEvent(eventId){
    const response = await api.delete(`api/events/${eventId}`)
    return response.data
  }

  clearData(){
    AppState.towerEvents = []
    AppState.activeEvent = null
  }
}

export const towerEventsService = new TowerEventsService()