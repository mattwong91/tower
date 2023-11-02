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
}

export const ticketsService = new TicketsService()