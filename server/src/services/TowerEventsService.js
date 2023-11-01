import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

  async getTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find()
      .populate('creator', 'name picture')
      .populate('ticketCount')
    return towerEvents
  }

  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
      .populate('creator', 'name picture')
      .populate('ticketCount')
    if (!towerEvent) {
      throw new BadRequest(`No event was found with eventId: ${eventId}`)
    }
    return towerEvent
  }

  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', 'name picture')
    await towerEvent.populate('ticketCount')
    return towerEvent
  }

  async editTowerEventById(towerEventData, userId, eventId) {
    const towerEvent = await this.getTowerEventById(eventId)
    if (userId != towerEvent.creatorId) {
      throw new Forbidden('You do not own this event. Cannot make changes.')
    }

    if (towerEvent.isCanceled) {
      throw new BadRequest('This event is cancelled. Cannot make changes.')
    }
    const keys = Object.keys(towerEventData)
    keys.forEach(key => {
      if (key == 'isCanceled') {
        return
      }
      towerEvent[key] = towerEventData[key]
    })

    await towerEvent.save()
    return towerEvent
  }

  async cancelEventById(eventId, userId) {
    const towerEvent = await this.getTowerEventById(eventId)
    if (userId != towerEvent.creatorId) {
      throw new Forbidden('You do not own this event. Cannot make changes')
    }
    towerEvent.isCanceled = true
    towerEvent.save()
    return `The event with id: ${eventId} has been cancelled.`
  }
}

export const towerEventsService = new TowerEventsService()