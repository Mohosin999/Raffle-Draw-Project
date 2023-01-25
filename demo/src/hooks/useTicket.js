import { useState } from "react";
import TicketApi from "../api/index";

const useTicket = () => {
  const [state, setState] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createTicket = async (username, price) => {
    try {
      //   setLoading(true);
      const ticket = await TicketApi.create(username, price);
      setState([...state, ticket]);
      setError("");
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      //   setLoading(false);
    }
  };

  const showAllTickets = async () => {
    try {
      setLoading(true);
      const tickets = await TicketApi.getTickets();
      setState(tickets);
      setError("");
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    }
  };

  return {
    createTicket,
    showAllTickets,
    state,
    error,
    loading,
  };
};

export default useTicket;
