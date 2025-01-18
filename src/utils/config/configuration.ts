export default () => ({
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WORKSPACE: process.env.WORKSPACE,
  BACKEND_SECRETS: process.env.BACKEND_SECRETS,
  GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
});
