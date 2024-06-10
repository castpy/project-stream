// console.log(`Using config: ${process.cwd()}/env/${process.env.NODE_ENV}.env`)

export const configuration = () => ({
  NODE_ENV: process.env.AMBIENT,
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
