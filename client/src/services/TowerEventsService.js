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
}

export const towerEventsService = new TowerEventsService()