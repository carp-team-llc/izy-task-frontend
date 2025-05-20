const statusColorMap: Record<string, string> = {
  COMPLETED: "#0eb53b",
  CANCEL: "#7d7d7d",
  PENDING: "#c99506",
  LATE: "#d92a02",
  NEW: "#06a2c9",
  DOING: "#ff5482",
  REVIEW: "#FF6900",
};

const priorityColorMap: Record<string, string> = {
  LOW: "#0eb53b",
  NORMAL: "#06a2c9",
  MEDIUM: "#c99506",
  HIGHEST: "#c90000",
};

export { statusColorMap, priorityColorMap };
