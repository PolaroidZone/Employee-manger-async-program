const express = require('express')
const request = require('request')
const app = express()
const port = 3000
// Import fs module
const fs = require('fs')

//api Url

const apiUrl = 'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees'

app.set('view engine', 'ejs')

app.use(express.static('../view'));
//Set up default API
// API to fetch all employees
app.get('/', async (req, res) => {
    res.render('../view/index.ejs')
})

// API to fetch employee list 

app.get('/employees', async (req, res) => {
  request(apiUrl, {json: true}, (error, response, body) => {
    if (error) {
      return res.status(500).json({message: 'Error getting employees from API!'});
    }
    res.json(body);
  });
});

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

// API to fetch Employee data by ID
app.get('/employee/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employeeData = fs.readFileSync('./data/employee.json', 'utf8');
    const employees = JSON.parse(employeeData).employees;
    const employee = employees.find((emp) => emp.id === id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// API to fetch Project data by ProjectID
app.get('/project/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const projectData = fs.readFileSync('./data/project.json', 'utf8');
    const projects = JSON.parse(projectData).projects;
    const project = projects.find((emp) => emp.id === id);

    if (!project) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// API to get Employee details along with Project details
app.get('/getemployeedetails/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const employeeResponse = await fetch(`http://localhost:3000/employee/${id}`);
    const employee = await employeeResponse.json();

    const projectId = employee.projectId;
    const projectResponse = await fetch(`http://localhost:3000/project/${projectId}`);
    const project = await projectResponse.json();

    const employeeDetailsWithProject = {
      ...employee, 
      project,
    };

    res.json(employeeDetailsWithProject);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))