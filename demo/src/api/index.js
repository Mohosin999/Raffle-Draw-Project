import axios from "axios";

const API_URL = "http://localhost:4444/api/v1/tickets";

class TicketAPI {
  getTickets() {
    const url = API_URL;
    return axios.get(url).then((res) => res.data);
  }

  create(username, price) {
    const url = `${API_URL}/sell`;
    return axios.get(url).then((res) => res.data);
  }
}

const TicketApi = new TicketAPI();

export default TicketApi;
