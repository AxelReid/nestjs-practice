export const jwtConstants = () => ({
  secret: process.env.JWT_SECRET,
});

export const google = () => ({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
});
