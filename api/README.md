# Raffle Draw Project

# Description:
<<<<<<< HEAD

=======
>>>>>>> 5d66f64800c56a36fcda4f7d5bbf94e577eb2b87
What can be done in this application?

- You will find a single ticket using the given ID
- You will update a single ticket using the given ID

<<<<<<< HEAD
=======

>>>>>>> 5d66f64800c56a36fcda4f7d5bbf94e577eb2b87
# Requirement:

- sell lottery ticket
- update lottery ticket
- delete lottery ticket
- get all tickets
- get ticket by id
- bulk buy (user can buy multiple tickets at a time)
- raffle draw

# Ticket Shape:

- number (unique)
- username
- price
- timestamp

# Routes:

- /tickets/t/:ticketId GET - find single ticket
- /tickets/t/:ticketId PATCH - update ticket by id
- /tickets/t/:ticketId DELETE - delete ticket by id
- /tickets/u/:username GET - find tickets for a given user
- /tickets/sell - create tickets
- /tickets/bulk - bulk sell ticket
- /tickets/draw - find winners
- /tickets/ - find all tickets
