import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getCommentsForEventById(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
    return comments
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (userId != comment.creatorId) {
      throw new Forbidden(`The comment at id: ${commentId} does not belong to this user. Delete is denied.`)
    }
    comment.remove()
    return `The comment with id: ${commentId} has been deleted.`
  }
}

export const commentsService = new CommentsService()