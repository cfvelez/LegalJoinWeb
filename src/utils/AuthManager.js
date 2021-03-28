
class AuthManager {
  static isAuthenticated(user) {
    return user !== 'undefined' && user !== null;
  }

}

export default AuthManager;
