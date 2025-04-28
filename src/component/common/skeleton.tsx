import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className = "", ...props }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#0F0F35] dark:bg-[#05051F] ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
