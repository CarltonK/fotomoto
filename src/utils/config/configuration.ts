export default () => ({
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WORKSPACE: process.env.WORKSPACE,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
});
