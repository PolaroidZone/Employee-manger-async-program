const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = 3000;

// Helper function 
async function readJsonFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// Get employee data by ID
app.get('/employee/:id', async (req, res) => {
  try {
    const employees = await readJsonFile('employees.json');
    const employeeId = parseInt(req.params.id);

    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get project data by ID
app.get('/project/:id', async (req, res) => {
  try {
    const projects = await readJsonFile('projects.json');
    const projectId = parseInt(req.params.id);

    const project = projects.find((proj) => proj.id === projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get employee details with project information
app.get('/getemployeedetails/:id', async (req, res) => {
  try {
    const employees = await readJsonFile('employees.json');
    const employeeId = parseInt(req.params.id);

    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const projects = await readJsonFile('projects.json');
    const project = projects.find((proj) => proj.id === employee.projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const employeeDetailsWithProject = { ...employee, project };
    res.json(employeeDetailsWithProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
