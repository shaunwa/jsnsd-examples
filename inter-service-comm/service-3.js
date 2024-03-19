const express = require('express');

const app = express();

const notes = [
    { id: 101, userId: 1, text: "Meeting at 10 AM" },
    { id: 102, userId: 2, text: "Buy groceries" },
    { id: 103, userId: 3, text: "Schedule dentist appointment" },
    { id: 104, userId: 1, text: "Book flight tickets" },
    { id: 105, userId: 4, text: "Prepare presentation" },
    { id: 106, userId: 5, text: "Call plumber" },
    { id: 107, userId: 2, text: "Send out email updates" },
    { id: 108, userId: 3, text: "Plan weekend getaway" },
    { id: 109, userId: 4, text: "Finish project report" },
    { id: 110, userId: 5, text: "Renew gym membership" },
];

app.get('/users/:userId/notes', (req, res) => {
    const { userId: userIdRaw } = req.params;
    const userId = Number(userIdRaw);
    const userNotes = notes.filter(note => note.userId === userId);
    res.json(userNotes);
});

app.listen(5000, () => console.log(`Server is running on http://localhost:5000`));