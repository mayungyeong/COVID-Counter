module.exports = {
	apps: [
	 {
  	   name: "COVID-server",
	   script: "./app.js",
	   instance: 1,
	   exec_mode: "cluster",
 	   merge_logs: true,
	   autorestart: true,
	   watch: true,
	   env: {
		   PORT: 80,
		   NODE_ENV: 'development'
	   }
	 }
	]
};