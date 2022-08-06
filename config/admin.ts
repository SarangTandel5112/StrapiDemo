export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '51c781adecb50102dbd99c730c8c9c2b'),
  },
});
