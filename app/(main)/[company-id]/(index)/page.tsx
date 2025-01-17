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
import { BarChart, Bar } from 'recharts';

interface DashboardMetric {
  label: string;
  value: string | number;
  prefix?: string;
  comparison?: number; // Percentage change vs last month
}

export default function MainPage() {
  // Enhanced metrics with month-over-month comparisons
  const metrics: DashboardMetric[] = [
    { label: 'Total Calls', value: 150, comparison: 12.5 },
    { label: 'Success Rate', value: '65%', comparison: 8.3 },
    { label: 'Appointments Scheduled', value: 20, comparison: 25.0 },
    { label: 'Operating Cost', value: '2,500', prefix: '$', comparison: -5.2 },
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

  // Mock data for pie chart (call outcomes) with enhanced colors and formatting
  const callOutcomeData = [
    { name: 'Leads', value: 28, color: '#4CAF50' },    // Green
    { name: 'Prospects', value: 45, color: '#2196F3' }, // Blue
    { name: 'Fails', value: 15, color: '#F44336' },    // Red
    { name: 'Follow-ups', value: 62, color: '#FFC107' } // Amber
  ];

  // Data for bar chart
  const performanceMetrics = [
    { name: 'Leads', value: 28 },
    { name: 'Prospects', value: 45 },
    { name: 'Fails', value: 15 },
    { name: 'Follow-ups', value: 62 },
  ];

  // Data for top performing agents
  const topAgentsData = [
    { name: 'John Smith', calls: 85, success: 65, appointments: 12 },
    { name: 'Emma Davis', calls: 78, success: 60, appointments: 10 },
    { name: 'Michael Chen', calls: 72, success: 55, appointments: 9 },
    { name: 'Sarah Wilson', calls: 70, success: 52, appointments: 8 },
    { name: 'David Brown', calls: 65, success: 48, appointments: 7 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Agent Performance Dashboard</h1>
      <p>This is a dashboard for the agent performance of the company.</p>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-2xl font-bold">
              {metric.prefix}{metric.value}
            </p>
            {metric.comparison !== undefined && (
              <p className={`text-sm ${metric.comparison >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.comparison >= 0 ? '↑' : '↓'} {Math.abs(metric.comparison)}% vs last month
              </p>
            )}
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
                  innerRadius={60} // Added inner radius for donut effect
                  paddingAngle={2} // Added padding between sections
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={{ stroke: '#666666', strokeWidth: 1 }}
                >
                  {callOutcomeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} calls`, name]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '6px',
                    padding: '8px',
                    border: '1px solid #cccccc'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      
      {/* Top Performing Agents Bar Chart */}
      <div className="mt-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Top Performing Agents</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topAgentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#8884d8" name="Total Calls" />
                <Bar dataKey="success" fill="#82ca9d" name="Successful Calls" />
                <Bar dataKey="appointments" fill="#ffc658" name="Appointments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

    </div>
  );
}

