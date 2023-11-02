import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

  async getMyTickets(){
    const response = await api.get('account/tickets')
    AppState.tickets = response.data.map(obj => new Ticket(obj))
  }

  async deleteTicket(ticketId){
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log('[TICKET SERVICE] DELETED TICKET: ', response.data)
    AppState.tickets = AppState.tickets.filter(ticket => ticket.id != ticketId)
  }

  async getTicketsByEventId(eventId){
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('[TICKET SERVICE] GET TICKETS BY EVENT ID: ', response.data)
    const tickets = response.data.map(obj => new Ticket(obj))
    AppState.tickets = tickets
  }

  async createTicket(eventId){
    const response = await api.post('api/tickets', {eventId})
    logger.log('[TICKET SERVICE] CREATE TICKET: ', response.data)
    const ticket = new Ticket(response.data)
    AppState.tickets.push(ticket)
  }

  clearData(){
    AppState.tickets = []
  }
}

export const ticketsService = new TicketsService()