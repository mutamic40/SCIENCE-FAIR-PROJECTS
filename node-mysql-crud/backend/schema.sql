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
INSERT INTO science_fair_projects
(student_name, project_title, category, abstract, grade_level, supervisor)
VALUES
('Jenipher Mumba', 'Web Development', 'Web Technology',
 'Interactive website showcasing HTML, CSS, and JavaScript.',
 12, 'Mr. Bwalya'),

('Brian Tembo', 'Pipelining Simulation', 'Computer Architecture',
 'Diagram and simulation of instruction pipelining in modern CPUs.',
 12, 'Dr. Sikazwe'),

('Kondwani Muwamba', 'Population Parameter for Mulungushi University', 'Statistics',
 'Statistical analysis using graphs and charts of university demographic data.',
 11, 'Ms. Mwale'),

('Elizabeth Namukonda', 'Digital Logic Gates', 'Digital Design',
 'Logic gate circuits demonstrated using simulation tools and physical kits.',
 10, 'Dr. Sikazwe'),

('John Smith', 'Computer History Database', 'Database',
 'Timeline supported by a structured database of computer evolution facts.',
 12, 'Mr. Bwalya'),

('Felix Mwape', 'Java Calculator Application', 'OOP & JAVA',
 'Java-based calculator with GUI and basic arithmetic operations.',
 11, 'Ms. Mwale'),

('Grace Chanda', 'Network Security Basics', 'Networking',
 'Introduction to cybersecurity threats and defensive techniques.',
 12, 'Mr. Bwalya'),

('Hassan Ng’ombe', 'Mobile App for Student Timetables', 'Mobile Development',
 'Android app that helps students manage class timetables efficiently.',
 11, 'Dr. Sikazwe'),

('Ireen Musonda', 'AI Chatbot for Library Assistance', 'Artificial Intelligence',
 'Chatbot system designed to help students locate library materials.',
 12, 'Ms. Mwale'),

('Nema Kanyondwi', 'Database for School Inventory', 'Database',
 'SQL-based inventory management system for tracking school assets.',
 10, 'Mr. Bwalya');
