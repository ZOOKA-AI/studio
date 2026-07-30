-- Row Level Security Policies
-- Migration: 20260204000001_rls_policies.sql

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can read their own profile
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Admin users can view all users
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Clients table policies
-- Authenticated users can view clients
CREATE POLICY "Authenticated users can view clients" ON clients
    FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can insert, update, or delete clients
CREATE POLICY "Admins can manage clients" ON clients
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Sites table policies
-- Authenticated users can view sites
CREATE POLICY "Authenticated users can view sites" ON sites
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins and supervisors can manage sites
CREATE POLICY "Admins and supervisors can manage sites" ON sites
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('admin', 'supervisor')
        )
    );

-- Tasks table policies
-- Everyone can view tasks
CREATE POLICY "Authenticated users can view tasks" ON tasks
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins can manage tasks
CREATE POLICY "Admins can manage tasks" ON tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Materials table policies
-- Everyone can view materials
CREATE POLICY "Authenticated users can view materials" ON materials
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins can manage materials
CREATE POLICY "Admins can manage materials" ON materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Equipment table policies
-- Everyone can view equipment
CREATE POLICY "Authenticated users can view equipment" ON equipment
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins and supervisors can manage equipment
CREATE POLICY "Admins and supervisors can manage equipment" ON equipment
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('admin', 'supervisor')
        )
    );

-- Schedules table policies
-- Users can view schedules they're assigned to
CREATE POLICY "Users can view their schedules" ON schedules
    FOR SELECT USING (
        supervisor_id = auth.uid() OR
        auth.uid() = ANY(worker_ids) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins and supervisors can create and update schedules
CREATE POLICY "Admins and supervisors can manage schedules" ON schedules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('admin', 'supervisor')
        )
    );

-- Daily Reports table policies
-- Users can view reports they're involved in
CREATE POLICY "Users can view their daily reports" ON daily_reports
    FOR SELECT USING (
        supervisor_id = auth.uid() OR
        auth.uid() = ANY(worker_ids) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Supervisors can create and update their own reports
CREATE POLICY "Supervisors can manage their reports" ON daily_reports
    FOR ALL USING (
        supervisor_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'supervisor'
        )
    );

-- Admins can manage all reports
CREATE POLICY "Admins can manage all reports" ON daily_reports
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Worker Tasks table policies
-- Users can view their own worker tasks
CREATE POLICY "Users can view their worker tasks" ON worker_tasks
    FOR SELECT USING (
        worker_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM daily_reports dr
            WHERE dr.id = daily_report_id AND dr.supervisor_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Supervisors can manage worker tasks for their reports
CREATE POLICY "Supervisors can manage worker tasks" ON worker_tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM daily_reports dr
            WHERE dr.id = daily_report_id 
            AND dr.supervisor_id = auth.uid()
            AND EXISTS (
                SELECT 1 FROM users
                WHERE id = auth.uid() AND role = 'supervisor'
            )
        )
    );

-- Admins can manage all worker tasks
CREATE POLICY "Admins can manage all worker tasks" ON worker_tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Audit Logs table policies
-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- System can insert audit logs (for triggers)
CREATE POLICY "System can insert audit logs" ON audit_logs
    FOR INSERT WITH CHECK (true);
