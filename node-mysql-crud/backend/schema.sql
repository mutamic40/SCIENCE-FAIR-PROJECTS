-- Database Name: campus_crud
CREATE DATABASE IF NOT EXISTS campus_crud;
USE campus_crud;

-- Drop table if it exists to allow for easy recreation
DROP TABLE IF EXISTS projects;

-- Create the Projects table (Resource: projects)
-- Now includes the 'supervisor' field
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Required Fields
    project_title VARCHAR(200) NOT NULL,
    student_name VARCHAR(150),

    -- Additional fields (Category, Grade, Score, Abstract, Supervisor)
    category VARCHAR(50) NOT NULL,
    grade_level INT,
    judges_score DECIMAL(5, 2), -- Score out of 100
    abstract TEXT,
    supervisor VARCHAR(150), -- << ADDED: This field was missing from CREATE TABLE

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Updated INSERT statements for the projects table (Group 13)
-- Now includes 'judges_score' (to match CREATE TABLE) and 'supervisor'
INSERT INTO projects (project_title, student_name, category, abstract, grade_level, judges_score, supervisor) VALUES
('Web Development', 'Alice Mwansa', 'Web Technology', 'Interactive website showcasing HTML, CSS, and JavaScript.', 12, 91.50, 'Mr. Bwalya'),
('Pipelining Simulation', 'Brian Tembo', 'Computer Architecture', 'Diagram and simulation of instruction pipelining in modern CPUs.', 12, 88.00, 'Dr. Sikazwe'),
('Population Parameter for Mulungushi University', 'Chipo Banda', 'Statistics', 'Statistical analysis using graphs and charts of university demographic data.', 11, 85.25, 'Ms. Mwale'),
('Digital Logic Gates', 'Daniel Phiri', 'Digital Design', 'Logic gate circuits demonstrated using simulation tools and physical kits.', 10, 89.90, 'Dr. Sikazwe'),
('Computer History Database', 'Emily Zulu', 'Database', 'Timeline supported by a structured database of computer evolution facts.', 12, 94.75, 'Mr. Bwalya'),
('Java Calculator Application', 'Felix Mwape', 'OOP & JAVA', 'Java-based calculator with GUI and basic arithmetic operations.', 11, 87.50, 'Ms. Mwale'),
('Network Security Basics', 'Grace Chanda', 'Networking', 'Introduction to cybersecurity threats and defensive techniques.', 12, 92.00, 'Mr. Bwalya'),
('Mobile App for Student Timetables', 'Hassan Ng’ombe', 'Mobile Development', 'Android app that helps students manage class timetables efficiently.', 11, 90.10, 'Dr. Sikazwe'),
('AI Chatbot for Library Assistance', 'Ireen Musonda', 'Artificial Intelligence', 'Chatbot system designed to help students locate library materials.', 12, 95.50, 'Ms. Mwale'),
('Database for School Inventory', 'Jackson Lungu', 'Database', 'SQL-based inventory management system for tracking school assets.', 10, 84.90, 'Mr. Bwalya');