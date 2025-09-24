
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { DotsVerticalIcon } from './icons';

const colorMap = {
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', area: '#fb923c' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', area: '#22d3ee' },
  green: { bg: 'bg-green-100', text: 'text-green-600', area: '#4ade80' },
  gray: { bg: 'bg-gray-200', text: 'text-gray-700', area: '#9ca3af' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', area: '#c084fc' },
};

const StatCard = ({ title, value, color, chartData }) => {
  const selectedColor = colorMap[color];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${selectedColor.text}`}>{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <DotsVerticalIcon />
        </button>
      </div>
      <div className="flex-grow mt-4 h-20 -mb-6 -mx-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id={`color-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedColor.area} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={selectedColor.area} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px'
              }}
              itemStyle={{ color: selectedColor.text }}
            />
            <Area type="monotone" dataKey="value" stroke={selectedColor.area} strokeWidth={2} fillOpacity={1} fill={`url(#color-${color})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
