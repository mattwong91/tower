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

  async createComment(commentData){
    const response = await api.post('api/comments', commentData)
    logger.log('[COMMENTS SERVICE] CREATED COMMENT: ', response.data)
    const newComment = new Comment(response.data)
    AppState.comments.unshift(newComment)
  }

  async deleteComment(commentId){
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log('[COMMENTS SERVICE] DELETED COMMENT: ', response.data)
    AppState.comments.splice(commentIndex, 1)
  }

}

export const commentsService = new CommentsService()