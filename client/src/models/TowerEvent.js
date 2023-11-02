export class TowerEvent{
  constructor(data){
    this.id = data.id || data._id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator
    this.ticketCount = data.ticketCount
    this.availability = this.computeAvailability
  }

  get computeAvailability(){
    const availability = this.capacity - this.ticketCount
    if(availability < 0){
      return 0
    }
    return availability
  }
}