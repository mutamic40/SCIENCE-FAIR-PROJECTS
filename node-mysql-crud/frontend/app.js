// app.js

const API_URL = 'http://localhost:3000/api/projects'; // Base URL for the API

// DOM Elements
const form = document.getElementById('crud-form');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
const tableBody = document.getElementById('projects-table-body');
const projectIdField = document.getElementById('project-id');

// Helper function to fetch all projects and update the UI
async function fetchProjects() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error fetching data:', error);
        // 💡 FIX: Updated colspan to 8 to match all headers (ID + 6 fields + Actions)
        tableBody.innerHTML = '<tr><td colspan="8">Error loading projects. Check your API server.</td></tr>';
    }
}

// Renders the list of projects in the table
function renderProjects(projects) {
    tableBody.innerHTML = ''; // Clear existing list
    projects.forEach(project => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${project.id}</td>
            <td>${project.project_title}</td>
            <td>${project.student_name || 'N/A'}</td>
            <td>${project.category}</td>
            <td>${project.grade_level || 'N/A'}</td>
            <td>${project.judges_score || 'N/A'}</td>
            <td>${project.supervisor || 'N/A'}</td> 
            <td>
                <button class="action-btn edit-btn" onclick="loadProjectForEdit(${project.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteProject(${project.id})">Delete</button>
            </td>
        `;
    });
}

// Function to handle form submission (CREATE or UPDATE)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = projectIdField.value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    // Collect data from the form
    const projectData = {
        project_title: document.getElementById('project_title').value,
        student_name: document.getElementById('student_name').value,
        category: document.getElementById('category').value,
        grade_level: document.getElementById('grade_level').value ? parseInt(document.getElementById('grade_level').value) : null,
        judges_score: document.getElementById('judges_score').value ? parseFloat(document.getElementById('judges_score').value) : null,
        abstract: document.getElementById('abstract').value,
        supervisor: document.getElementById('supervisor').value // 💡 FIX: Added supervisor field collection
    };

    try {
        const response = await fetch(url, {
            method: method, // POST or PUT
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `${method} failed`);
        }

        // Reset and update UI
        resetForm();
        fetchProjects(); 
        console.log(`${id ? 'Updated' : 'Created'} project successfully.`);

    } catch (error) {
        console.error('Submission Error:', error);
        alert(`Operation failed: ${error.message}`);
    }
});

// Function to load values into the form for editing
async function loadProjectForEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const project = await response.json();

        // Populate form fields
        projectIdField.value = project.id;
        document.getElementById('project_title').value = project.project_title;
        document.getElementById('student_name').value = project.student_name;
        document.getElementById('category').value = project.category;
        document.getElementById('grade_level').value = project.grade_level;
        document.getElementById('judges_score').value = project.judges_score;
        document.getElementById('abstract').value = project.abstract;
        document.getElementById('supervisor').value = project.supervisor; // 💡 FIX: Added supervisor field population

        // Update button text and show cancel button
        submitButton.textContent = 'Save Changes (PUT)';
        cancelButton.style.display = 'block';

    } catch (error) {
        console.error('Error loading project for edit:', error);
        alert('Could not load project data.');
    }
}

// Function to handle DELETE operation
async function deleteProject(id) {
    if (!confirm(`Are you sure you want to delete project ID ${id}?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE' // DELETE operation
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Delete failed');
        }

        // Update UI
        fetchProjects(); 
        console.log(`Deleted project ${id} successfully.`);

    } catch (error) {
        console.error('Deletion Error:', error);
        alert(`Deletion failed: ${error.message}`);
    }
}

// Function to reset the form after Create/Update or Cancel
function resetForm() {
    form.reset();
    projectIdField.value = '';
    submitButton.textContent = 'Create Project';
    cancelButton.style.display = 'none';
}

// Event listener for the Cancel button
cancelButton.addEventListener('click', resetForm);

// Initial load of projects when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects);