import axios from "axios";

const API_URL = "http://localhost:4444/api/v1/tickets";

class TicketApi {
  getTickets() {
    const url = API_URL;
    return axios.get(url).then((res) => res.data);
  }

  create() {}

  bulkCreate() {}
}

export default TicketApi;
