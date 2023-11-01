import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {
  async getTicketsForEventById(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
    return tickets
  }
  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return tickets
  }

  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }

  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (userId != ticket.accountId) {
      throw new Forbidden(`Ticket with id: ${ticketId} does not belong to this user. Delete denied.`)
    }
    ticket.remove()
    return `Ticket with id: ${ticketId} has been deleted.`
  }
}

export const ticketsService = new TicketsService()