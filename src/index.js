const express = require('express')
const app = express()
const port = 3000
// Import fs module
const fs = require('fs')


//Set up default API
// API to fetch all employees
app.get('/', async (req, res) => {
    res.send('Hello there! enter there api call!')
})

//get all employees

app.get('/getemployeedetails', (req, res) => {
    try {
      // Read employee data from JSON file synchronously
      const employeeData = fs.readFileSync('./data/employee.json', 'utf8');
      const employees = JSON.parse(employeeData).employees;
  
      // For demonstration purposes, we'll return all employees here
      // In practice, you can get employee ID from the request params and find the specific employee
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  });


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))