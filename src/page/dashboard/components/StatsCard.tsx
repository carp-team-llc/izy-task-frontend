// src/pages/dashboard/components/StatsCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, iconColor = "text-blue-400", trend, trendValue }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-slate-400';

  return (
    <motion.div
      className="bg-[#252c48] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-100 mt-1">{value}</p>
        </div>
        <div className={`p-3 bg-[#1a1f37] rounded-full ${iconColor}`}>
          <Icon size={24} />
        </div>
      </div>
      {trend && trendValue && (
        <p className={`text-xs mt-2 ${trendColor}`}>
          {trend === 'up' ? '▲' : trend === 'down' ? '▼' : ''} {trendValue}
        </p>
      )}
    </motion.div>
  );
};

export default StatsCard;