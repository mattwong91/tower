import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

  async getCommentsByEventId(eventId){
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('[COMMENTS SERVICE] GOT COMMENTS FOR THE EVENT: ', response.data)
    AppState.comments = response.data.map(obj => new Comment(obj))
  }

}

export const commentsService = new CommentsService()