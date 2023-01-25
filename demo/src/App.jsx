import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TicketSell from "./components/ticket-sell";

const App = () => {
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  const handleCreateTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  return (
    <>
      <CssBaseline />
      <TicketSell sellTicket={handleCreateTicket} />
    </>
  );
};

export default App;
