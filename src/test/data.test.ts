import { describe, it, expect } from 'vitest';
import { mockAppointments, mockRecentReports, mockStats, mockTasks } from '../lib/data';

describe('Mock Data', () => {
  describe('mockAppointments', () => {
    it('should have valid appointment structure', () => {
      expect(mockAppointments).toBeDefined();
      expect(mockAppointments.length).toBeGreaterThan(0);
      
      mockAppointments.forEach(appointment => {
        expect(appointment).toHaveProperty('id');
        expect(appointment).toHaveProperty('siteName');
        expect(appointment).toHaveProperty('siteAddress');
        expect(appointment).toHaveProperty('startTime');
        expect(appointment).toHaveProperty('endTime');
        expect(appointment).toHaveProperty('status');
      });
    });

    it('should have ISO string dates', () => {
      mockAppointments.forEach(appointment => {
        expect(typeof appointment.startTime).toBe('string');
        expect(typeof appointment.endTime).toBe('string');
        expect(() => new Date(appointment.startTime)).not.toThrow();
        expect(() => new Date(appointment.endTime)).not.toThrow();
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['حجز جديد', 'مكتمل', 'قيد التنفيذ', 'متأخر', 'مجدول', 'مؤجل'];
      mockAppointments.forEach(appointment => {
        expect(validStatuses).toContain(appointment.status);
      });
    });
  });

  describe('mockRecentReports', () => {
    it('should have valid report structure', () => {
      expect(mockRecentReports).toBeDefined();
      expect(mockRecentReports.length).toBeGreaterThan(0);
      
      mockRecentReports.forEach(report => {
        expect(report).toHaveProperty('id');
        expect(report).toHaveProperty('clientName');
        expect(report).toHaveProperty('date');
        expect(report).toHaveProperty('supervisor');
        expect(report).toHaveProperty('status');
        expect(report).toHaveProperty('hours');
      });
    });

    it('should have valid hours', () => {
      mockRecentReports.forEach(report => {
        expect(typeof report.hours).toBe('number');
        expect(report.hours).toBeGreaterThan(0);
      });
    });
  });

  describe('mockStats', () => {
    it('should have all required stats', () => {
      expect(mockStats).toHaveProperty('appointments');
      expect(mockStats).toHaveProperty('workers');
      expect(mockStats).toHaveProperty('reports');
      expect(mockStats).toHaveProperty('revenue');
    });

    it('should have valid stat structure', () => {
      Object.values(mockStats).forEach(stat => {
        expect(stat).toHaveProperty('label');
        expect(stat).toHaveProperty('value');
        expect(stat).toHaveProperty('change');
      });
    });
  });

  describe('mockTasks', () => {
    it('should have valid task structure', () => {
      expect(mockTasks).toBeDefined();
      expect(mockTasks.length).toBeGreaterThan(0);
      
      mockTasks.forEach(task => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('status');
        expect(task).toHaveProperty('priority');
        expect(task).toHaveProperty('dueDate');
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['جديدة', 'قيد التنفيذ', 'مكتملة'];
      mockTasks.forEach(task => {
        expect(validStatuses).toContain(task.status);
      });
    });

    it('should have valid priority values', () => {
      const validPriorities = ['عالية', 'متوسطة', 'منخفضة'];
      mockTasks.forEach(task => {
        expect(validPriorities).toContain(task.priority);
      });
    });
  });
});
