export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || 'localhost',
  environment: process.env.NODE_ENV || 'production',
  debug: !!process.env.DEBUG || false,
}
