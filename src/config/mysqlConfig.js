// src/config/mysqlConfig.js
export const mysqlConfig = {
    host: import.meta.env.VITE_MYSQL_HOST,
    user: import.meta.env.VITE_MYSQL_USER,
    password: import.meta.env.VITE_MYSQL_PASSWORD,
    database: import.meta.env.VITE_MYSQL_DATABASE,
  };
  