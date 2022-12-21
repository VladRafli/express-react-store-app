/**
 * Enum for describe current development phase
 */
enum EnvironmentPhase {
    /**
     * Development phase (Full on code writing)
     */
    DEVELOPMENT = 'development',
    /**
     * Testing phase (Manual or automated testing)
     */
    TESTING = 'testing',
    /**
     * Production phase (Deployed on server)
     */
    PRODUCTION = 'production'
}

export default EnvironmentPhase