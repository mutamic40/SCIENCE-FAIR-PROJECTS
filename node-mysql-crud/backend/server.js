// server.js

// 1. Load environment variables
require('dotenv').config();

// 2. Import required modules
const express = require('express');
const cors = require('cors');
const db = require('./db'); // The database connection pool from db.js

// 3. Initialize Express app and configuration
const app = express();
const PORT = process.env.PORT || 3000;
const RESOURCE_PATH = `/api/${process.env.RESOURCE || 'projects'}`; // /api/projects

// 4. Middleware setup
app.use(cors()); // Enable CORS so the HTML page can call the API
app.use(express.json()); // Allows parsing of JSON request bodies

// --- 5. REST API Endpoints (CRUD Operations) ---

// GET /api/projects -> List all records
app.get(RESOURCE_PATH, async (req, res) => {
    try {
        // The SELECT * query automatically picks up the new 'supervisor' column
        const [rows] = await db.query('SELECT * FROM projects ORDER BY id DESC');
        res.json(rows); // Return JSON for all responses
    } catch (error) {
        console.error('Error fetching all projects:', error);
        res.status(500).json({ error: 'Failed to retrieve projects.' });
    }
});

// GET /api/projects/:id -> Get one record
app.get(`${RESOURCE_PATH}/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(`Error fetching project ${id}:`, error);
        res.status(500).json({ error: 'Failed to retrieve project.' });
    }
});

// POST /api/projects -> Create a record
app.post(RESOURCE_PATH, async (req, res) => {
    // 💡 CHANGE 1: Include 'supervisor' in destructuring
    const { project_title, student_name, category, grade_level, judges_score, abstract, supervisor } = req.body;

    if (!project_title || !category) {
        return res.status(400).json({ error: 'Missing required fields: project_title and category.' });
    }

    try {
        // 💡 CHANGE 2: Add 'supervisor' to the column list
        const query = `
            INSERT INTO projects (project_title, student_name, category, grade_level, judges_score, abstract, supervisor)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        // 💡 CHANGE 3: Add 'supervisor' to the values array
        const [result] = await db.query(query, [
            project_title,
            student_name,
            category,
            grade_level,
            judges_score,
            abstract,
            supervisor // << New Value
        ]);

        res.status(201).json({
            message: 'Project created successfully.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project.' });
    }
});

// PUT /api/projects/:id -> Update a record
app.put(`${RESOURCE_PATH}/:id`, async (req, res) => {
    const { id } = req.params;
    // 💡 CHANGE 4: Include 'supervisor' in destructuring
    const { project_title, student_name, category, grade_level, judges_score, abstract, supervisor } = req.body;

    // 💡 CHANGE 5: Include 'supervisor' in the check for no fields provided
    if (!project_title && !student_name && !category && grade_level === undefined && judges_score === undefined && !abstract && !supervisor) {
        return res.status(400).json({ error: 'No fields provided for update.' });
    }

    const fields = [];
    const values = [];

    if (project_title) { fields.push('project_title = ?'); values.push(project_title); }
    if (student_name) { fields.push('student_name = ?'); values.push(student_name); }
    if (category) { fields.push('category = ?'); values.push(category); }
    if (grade_level !== undefined) { fields.push('grade_level = ?'); values.push(grade_level); }
    if (judges_score !== undefined) { fields.push('judges_score = ?'); values.push(judges_score); }
    if (abstract) { fields.push('abstract = ?'); values.push(abstract); }
    // 💡 CHANGE 6: Add logic for updating 'supervisor'
    if (supervisor) { fields.push('supervisor = ?'); values.push(supervisor); }

    values.push(id);

    try {
        const query = `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found or no changes made.' });
        }

        res.json({ message: 'Project updated successfully.', id });
    } catch (error) {
        console.error(`Error updating project ${id}:`, error);
        res.status(500).json({ error: 'Failed to update project.' });
    }
});

// DELETE /api/projects/:id -> Delete a record
app.delete(`${RESOURCE_PATH}/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.json({ message: 'Project deleted successfully.', id });
    } catch (error) {
        console.error(`Error deleting project ${id}:`, error);
        res.status(500).json({ error: 'Failed to delete project.' });
    }
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`\n🎉 Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}${RESOURCE_PATH}`);
});