export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '28d8d69a054e8efc01ae15707795b1bd'),
  },
});
