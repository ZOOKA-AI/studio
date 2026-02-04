-- Row Level Security (RLS) Policies
-- Created: 2026-02-04
-- Enable RLS on all tables

-- Enable RLS
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
ALTER TABLE roles_admin ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM roles_admin WHERE roles_admin.user_id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users table policies
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
    ON users FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert users"
    ON users FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can update all users"
    ON users FOR UPDATE
    USING (is_admin(auth.uid()));

-- Clients table policies
CREATE POLICY "Authenticated users can view clients"
    ON clients FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins and supervisors can manage clients"
    ON clients FOR ALL
    USING (
        is_admin(auth.uid()) OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'supervisor')
    );

-- Sites table policies
CREATE POLICY "Authenticated users can view sites"
    ON sites FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins and supervisors can manage sites"
    ON sites FOR ALL
    USING (
        is_admin(auth.uid()) OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'supervisor')
    );

-- Tasks table policies
CREATE POLICY "Authenticated users can view tasks"
    ON tasks FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage tasks"
    ON tasks FOR ALL
    USING (is_admin(auth.uid()));

-- Materials table policies
CREATE POLICY "Authenticated users can view materials"
    ON materials FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage materials"
    ON materials FOR ALL
    USING (is_admin(auth.uid()));

-- Equipment table policies
CREATE POLICY "Authenticated users can view equipment"
    ON equipment FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins and supervisors can manage equipment"
    ON equipment FOR ALL
    USING (
        is_admin(auth.uid()) OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'supervisor')
    );

-- Schedules table policies
CREATE POLICY "Users can view their assigned schedules"
    ON schedules FOR SELECT
    USING (
        auth.uid() = supervisor_id OR 
        auth.uid() = ANY(worker_ids) OR
        is_admin(auth.uid())
    );

CREATE POLICY "Admins and supervisors can manage schedules"
    ON schedules FOR ALL
    USING (
        is_admin(auth.uid()) OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'supervisor')
    );

-- Daily Reports table policies
CREATE POLICY "Users can view reports they're involved in"
    ON daily_reports FOR SELECT
    USING (
        auth.uid() = supervisor_id OR 
        auth.uid() = ANY(worker_ids) OR
        is_admin(auth.uid())
    );

CREATE POLICY "Supervisors can create daily reports"
    ON daily_reports FOR INSERT
    WITH CHECK (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'supervisor')
    );

CREATE POLICY "Supervisors can update their own reports"
    ON daily_reports FOR UPDATE
    USING (
        auth.uid() = supervisor_id OR
        is_admin(auth.uid())
    );

-- Worker Tasks table policies
CREATE POLICY "Users can view their own tasks"
    ON worker_tasks FOR SELECT
    USING (
        auth.uid() = worker_id OR
        EXISTS (
            SELECT 1 FROM daily_reports 
            WHERE daily_reports.id = daily_report_id 
            AND daily_reports.supervisor_id = auth.uid()
        ) OR
        is_admin(auth.uid())
    );

CREATE POLICY "Supervisors can manage worker tasks in their reports"
    ON worker_tasks FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM daily_reports 
            WHERE daily_reports.id = daily_report_id 
            AND daily_reports.supervisor_id = auth.uid()
        ) OR
        is_admin(auth.uid())
    );

-- Audit Logs table policies
CREATE POLICY "Admins can view all audit logs"
    ON audit_logs FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "System can insert audit logs"
    ON audit_logs FOR INSERT
    WITH CHECK (true);

-- Roles Admin table policies
CREATE POLICY "Admins can view admin roles"
    ON roles_admin FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage admin roles"
    ON roles_admin FOR ALL
    USING (is_admin(auth.uid()));
