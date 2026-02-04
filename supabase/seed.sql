-- Seed Data for Testing
-- Created: 2026-02-04
-- This file contains sample data for development and testing

-- Insert sample users
INSERT INTO users (id, role, name, email) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin', 'Admin User', 'admin@example.com'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'supervisor', 'Ahmed Al-Mansour', 'ahmed@example.com'),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'supervisor', 'Sara Ibrahim', 'sara@example.com'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'worker', 'Mohammed Ali', 'mohammed@example.com'),
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'worker', 'Fatima Hassan', 'fatima@example.com')
ON CONFLICT (id) DO NOTHING;

-- Insert admin role
INSERT INTO roles_admin (user_id) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample clients
INSERT INTO clients (id, name, contact_email, contact_phone) VALUES
    ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Royal Plaza', 'contact@royalplaza.com', '+966501234567'),
    ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'Grand Hotel', 'info@grandhotel.com', '+966507654321')
ON CONFLICT (id) DO NOTHING;

-- Insert sample sites
INSERT INTO sites (id, name, client_id, address, special_instructions) VALUES
    ('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Villa Ahmed', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', '123 King Street, Riyadh', 'Handle antique furniture with care'),
    ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Office Building A', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', '456 Business District, Jeddah', 'Access code: 1234'),
    ('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Hotel Lobby', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', '789 Tourism Ave, Dubai', 'Clean during off-peak hours only')
ON CONFLICT (id) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (id, name, description) VALUES
    ('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Cleaning Floors', 'Sweep and mop all floors'),
    ('50eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Window Cleaning', 'Clean all windows inside and out'),
    ('60eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Bathroom Sanitization', 'Deep clean and sanitize bathrooms'),
    ('70eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'Furniture Dusting', 'Dust and polish all furniture')
ON CONFLICT (id) DO NOTHING;

-- Insert sample materials
INSERT INTO materials (id, name, description) VALUES
    ('80eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'Floor Cleaner', 'Multi-surface floor cleaning solution'),
    ('90eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'Glass Cleaner', 'Streak-free glass cleaning spray'),
    ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'Disinfectant', 'Hospital-grade disinfectant'),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'Polish', 'Furniture polish and protector')
ON CONFLICT (id) DO NOTHING;

-- Insert sample equipment
INSERT INTO equipment (id, name, condition, quantity, supervisor) VALUES
    ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'Vacuum Cleaner', 'ممتازة', 5, 'Ahmed Al-Mansour'),
    ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a30', 'Mop and Bucket', 'جيدة', 10, 'Sara Ibrahim'),
    ('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Window Squeegee', 'ممتازة', 3, 'Ahmed Al-Mansour'),
    ('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Cleaning Cart', 'تحتاج صيانة', 2, 'Sara Ibrahim')
ON CONFLICT (id) DO NOTHING;

-- Insert sample schedules
INSERT INTO schedules (id, site_id, start_time, end_time, supervisor_id, worker_ids) VALUES
    (
        'g1eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        '10eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
        '2026-02-05 08:00:00+00',
        '2026-02-05 16:00:00+00',
        'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'::uuid, 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15'::uuid]
    ),
    (
        'h1eebc99-9c0b-4ef8-bb6d-6bb9bd380a34',
        '20eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
        '2026-02-06 09:00:00+00',
        '2026-02-06 17:00:00+00',
        'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'::uuid]
    )
ON CONFLICT (id) DO NOTHING;

-- Insert sample daily report
INSERT INTO daily_reports (
    id, date, site_id, supervisor_id, worker_ids, 
    start_time, end_time, tasks, materials, status
) VALUES
    (
        'i1eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
        '2026-02-04',
        '10eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
        'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        ARRAY['d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'::uuid, 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15'::uuid],
        '08:00',
        '16:00',
        ARRAY['Cleaning Floors', 'Bathroom Sanitization'],
        ARRAY['Floor Cleaner', 'Disinfectant'],
        'completed'
    )
ON CONFLICT (id) DO NOTHING;

-- Insert sample worker tasks
INSERT INTO worker_tasks (id, worker_id, task_id, daily_report_id, hours) VALUES
    (
        'j1eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
        '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
        'i1eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
        4.0
    ),
    (
        'k1eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
        'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
        '60eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
        'i1eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
        4.0
    )
ON CONFLICT (id) DO NOTHING;
