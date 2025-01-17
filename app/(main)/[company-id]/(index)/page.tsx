'use client';

import { calls } from '@/app/this/constants/garbage';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface DashboardMetric {
  label: string;
  value: string | number;
  prefix?: string;
}

export default function MainPage() {
  // Enhanced metrics with more detailed information
  const metrics: DashboardMetric[] = [
    { label: 'Total Calls', value: 150 },
    { label: 'AI Agent Calls', value: 100 },
    { label: 'Setter Calls', value: 50 },
    { label: 'Total Costs', value: '2,500', prefix: '$' },
    { label: 'Total Revenue', value: '12,000', prefix: '$' },
    { label: 'Prospects', value: 45 },
    { label: 'Leads', value: 28 },
    { label: 'Fails', value: 15 },
    { label: 'Follow-ups', value: 62 },
    { label: 'Appointments Scheduled', value: 20 },
    { label: 'Success Rate', value: '65%' },
    { label: 'Avg Call Duration', value: '4:30' },
  ];

  // Mock data for line chart (calls over time)
  const callTrendData = [
    { date: '2024-03-14', calls: 20, success: 12 },
    { date: '2024-03-15', calls: 25, success: 15 },
    { date: '2024-03-16', calls: 30, success: 20 },
    { date: '2024-03-17', calls: 22, success: 14 },
    { date: '2024-03-18', calls: 28, success: 18 },
    { date: '2024-03-19', calls: 35, success: 25 },
    { date: '2024-03-20', calls: 32, success: 22 },
  ];

  // Mock data for pie chart (call outcomes)
  const callOutcomeData = [
    { name: 'Leads', value: 28, color: '#4CAF50' },
    { name: 'Prospects', value: 45, color: '#2196F3' },
    { name: 'Fails', value: 15, color: '#F44336' },
    { name: 'Follow-ups', value: 62, color: '#FFC107' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Agent Performance Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-2xl font-bold">
              {metric.prefix}{metric.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Line Chart */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Call Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calls" stroke="#2196F3" name="Total Calls" />
                <Line type="monotone" dataKey="success" stroke="#4CAF50" name="Successful Calls" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Call Outcomes</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={callOutcomeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {callOutcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

    </div>
  );
}

