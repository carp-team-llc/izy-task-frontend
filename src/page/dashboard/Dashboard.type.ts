// src/types/index.ts
export interface Task {
  id: string;
  name: string;
  status: 'NEW' | 'PENDING' | 'DOING' | 'COMPLETED' | 'CANCEL' | 'LATE';
  expirationDate: string; // ISO string
  assignee?: string;
  project?: {
    name: string;
  };
}

export interface Project {
  id: string;
  name: string;
  progress: number; // 0-100
  deadline: string; // ISO string
  status: 'ON_TRACK' | 'AT_RISK' | 'OFF_TRACK' | 'COMPLETED';
  memberCount: number;
}

export interface DailyChartDataPoint {
  name: string; // statusInfo.engName
  total: number;
}

export interface DailyChartLegend {
  name: string;
  color: string;
}

// Mock data from UseDailyChart
export interface MockTaskChartItem {
  statusInfo: {
    engName: string;
    color: string;
  };
  total: number;
}

export interface MockDailyChartResponse {
  name?: string;
  taskChart: MockTaskChartItem[];
  totalTask: number;
}