export const isAuthenticated = (session: any) => {
  if (
    !session ||
    session == null ||
    Math.floor(Date.now()) >= session.expires_at * 1000
  ) {
    return false;
  }

  return true;
};
