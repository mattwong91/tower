import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .get('/:eventId/tickets', this.getTicketsForEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.editTowerEventById)
      .delete('/:eventId', this.cancelEventById)
  }

  async getTowerEvents(request, response, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents()
      return response.send(towerEvents)
    }
    catch (error) {
      next(error)
    }
  }

  async getTowerEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const towerEvent = await towerEventsService.getTowerEventById(eventId)
      return response.send(towerEvent)
    }
    catch (error) {
      next(error)
    }
  }

  async getTicketsForEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventTickets = await ticketsService.getTicketsForEventById(eventId)
      return response.send(eventTickets)
    }
    catch (error) {
      next(error)
    }
  }

  async createTowerEvent(request, response, next) {
    try {
      const towerEventData = request.body
      towerEventData.creatorId = request.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
      response.send(towerEvent)

    }
    catch (error) {
      next(error)
    }
  }

  async editTowerEventById(request, response, next) {
    try {
      const towerEventData = request.body
      const userId = request.userInfo.id
      const eventId = request.params.eventId
      const towerEvent = await towerEventsService.editTowerEventById(towerEventData, userId, eventId)
      return response.send(towerEvent)
    }
    catch (error) {
      next(error)
    }
  }

  async cancelEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await towerEventsService.cancelEventById(eventId, userId)
      return response.send(message)
    }
    catch (error) {
      next(error)
    }
  }
}