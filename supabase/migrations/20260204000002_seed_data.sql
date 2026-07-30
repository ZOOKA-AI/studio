-- Seed Data for Development and Testing
-- Migration: 20260204000002_seed_data.sql

-- Insert sample tasks
INSERT INTO tasks (id, name, description) VALUES
    ('11111111-1111-1111-1111-111111111111', 'تنظيف الأرضيات', 'تنظيف جميع أنواع الأرضيات بالمواد المناسبة'),
    ('22222222-2222-2222-2222-222222222222', 'تنظيف النوافذ', 'تنظيف النوافذ الداخلية والخارجية'),
    ('33333333-3333-3333-3333-333333333333', 'تنظيف الحمامات', 'تنظيف وتعقيم الحمامات'),
    ('44444444-4444-4444-4444-444444444444', 'تنظيف المطبخ', 'تنظيف المطبخ والأجهزة'),
    ('55555555-5555-5555-5555-555555555555', 'كنس وتنظيف السجاد', 'كنس وتنظيف السجاد والموكيت')
ON CONFLICT (id) DO NOTHING;

-- Insert sample materials
INSERT INTO materials (id, name, description) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'منظف الأرضيات', 'منظف متعدد الأغراض للأرضيات'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'منظف النوافذ', 'منظف خاص للزجاج والنوافذ'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'معقم الحمامات', 'معقم قوي للحمامات'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'منظف المطبخ', 'منظف لإزالة الدهون'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ملمع الأثاث', 'ملمع خشبي للأثاث')
ON CONFLICT (id) DO NOTHING;

-- Note: User data, clients, sites, and other sensitive data should be added through the application
-- or through secure administrative processes, not through seed migrations.

COMMENT ON TABLE tasks IS 'Sample cleaning tasks for the Royal Clean Dashboard';
COMMENT ON TABLE materials IS 'Sample cleaning materials for the Royal Clean Dashboard';
