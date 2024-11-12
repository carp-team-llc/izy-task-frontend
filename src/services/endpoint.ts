export default {
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",

  // #region Chart
  daily_chart: "api/v1/task/daily_chart",
  weekly_chart: "api/v1/task/weekly_chart",
  // #endregion

  load_new_notification: "api/v1/task/load_new_notification",

  // #region Task List
  tasklist: "api/v1/task/task_list_pagination",
  task_list_detail: "api/v1/task/task_list_detail",
  choose_task_list: "api/v1/task/choose_task_list",
  createtasklist: "api/v1/task/create_task_list",
  recenttask: "api/v1/task/recent_task",
  // #endregion

  // #region personal tasks
  createtask: "api/v1/task/create_task",
  personal_tasks: "api/v1/task/tasks_list",
  comments: "api/v1/comments/create_comment",
  detailtask: "api/v1/task/task_detail",
  updatetask: "api/v1/task/update_task",
  // #endregion

  // #region file
  uploadfile: "api/v1/storage/upload/",
  // #endregion

  // #region project
  project_list: "api/v1/project/project_list",
  // #endergion
};
