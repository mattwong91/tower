export class Comment{
  constructor(data){
    this.id = data.id || data._id
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    this.isAttending = data.isAttending
    this.creator = data.creator
  }
}