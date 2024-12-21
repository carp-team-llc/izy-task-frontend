export default {
  login: "api/v1/auth/login",
  register: "api/v1/auth/register",
  resend_verification: "api/v1/auth/authentication/resend_verify_email",
  forgot_password: "api/v1/auth/authentication/forgot_password",
  check_valid_information: "api/v1/auth/authentication/handle_infomation",
  change_password: "api/v1/auth/authentication/new_password",

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
  create_project: "api/v1/project/create_project",
  metric: "api/v1/project/top_insight",
  todaytask: "api/v1/project/today_tasks",
  total_task_chart: "api/v1/project/total_tasks_chart",
  project_workload: "api/v1/project/project_workload",

  // #region profile
  create_profile: "api/v1/user/profile/create_profile",
  // #endergion
};
