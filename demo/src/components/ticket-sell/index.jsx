import React, { useEffect } from "react";
import useTicket from "../../hooks/useTicket";

const TicketSell = ({ sellTicket }) => {
  const { createTicket } = useTicket();

  const [username, setUsername] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && price.trim()) {
      const ticket = createTicket(username, price);
      sellTicket(ticket);
    } else {
      console.log("Please enter valid inputs");
    }
  };

  return (
    <div>
      <h1>Ticket Created</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketSell;
