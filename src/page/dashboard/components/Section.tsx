import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  actions?: React.ReactNode; // For buttons or other actions in the header
}

const Section: React.FC<SectionProps> = ({ title, children, className = '', titleClassName = '', contentClassName = '', actions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-[#1a1f37] text-slate-100 rounded-xl shadow-xl p-4 sm:p-6 ${className}`}
    >
      {(title || actions) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className={`text-xl font-semibold text-slate-200 ${titleClassName}`}>{title}</h2>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={contentClassName}>
        {children}
      </div>
    </motion.div>
  );
};

export default Section;