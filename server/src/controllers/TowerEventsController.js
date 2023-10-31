import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
  }

  async createTowerEvent(request, response, next) {
    try {
      const towerEventData = request.body
      const userId = request.userInfo.id
      towerEventData.id = userId
      // TODO AWAIT THE SERVICE AND SEND RESPONSE

    }
    catch (error) {
      next(error)
    }
  }
}