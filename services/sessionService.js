class SessionService {
  static sessionCache = new Map(); // Use a Map as an in-memory cache to store session data

  static async storeSessionInCache(sessionId, sessionData) {
    try {
      // Store the serialized session data in the cache using the sessionId as the key
      SessionService.sessionCache.set(sessionId, sessionData);
    } catch (error) {
      // Handle any errors that occur during session storage
      console.error('Error storing session in cache:', error);
    }
  }

  static async getSessionFromCache(sessionId) {
    try {
      // Fetch the serialized session data from the cache using the sessionId as the key
      return SessionService.sessionCache.get(sessionId);
    } catch (error) {
      // Handle any errors that occur during session retrieval from cache
      console.error('Error retrieving session from cache:', error);
      return null;
    }
  }
}

export default SessionService;
