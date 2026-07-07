const express = require('express');

const bodyParser = require('body-parser'); const app = express();
const port = 3000;

// Middleware to parse JSON request bodies 
app.use(bodyParser.json());

// In-memory data storage (temporary for demo) 
let users = [];

// POST: Accept data (create new user) 
app.post('/users', (req, res) => {
	const { id, name, email } = req.body; if (!id || !name || !email) {
		return res.status(400).json({ error: 'All fields (id, name, email) are required' }); 
	}
	
	// Check if user with same ID exists 
	if (users.find(user => user.id === id)) {
		return res.status(409).json({ error: 'User with this ID already exists' }); 
	}
	
	users.push({ id, name, email });	
	res.status(201).json({ message: 'User added successfully' }); 
});

// GET: Retrieve all users 
app.get('/users', (req, res) => { 
	res.status(200).json(users); 
});

// DELETE: Remove a specific user by ID 
app.delete('/users/:id', (req, res) => { 
	const id = req.params.id;
	const index = users.findIndex(user => user.id === id); 
	if (index === -1) {
		return res.status(404).json({ error: 'User not found' }); 
	}

	const deletedUser = users.splice(index, 1);
	res.status(200).json({ message: `User ${deletedUser[0].name} deleted successfully` }); 
});

// Start the server 
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`); 
});