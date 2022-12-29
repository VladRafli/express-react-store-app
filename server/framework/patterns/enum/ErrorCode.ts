enum ErrorCode {
    /**
     * Error for not passing input validation check
     */
    ValidationError = 'ERR_VALIDATION_FAIL',
    /**
     * Error for wrong credentials like not found any username associated with input, or password are not identical
     */
    BadCredentials = 'ERR_BAD_CREDENTIALS',
    /**
     * Error for request body input that value is not correctly written or failed passing validation
     */
    BadFormInput = 'ERR_BAD_FORM_INPUT',
    /**
     * Error for User forbidden to access a resource
     */
    ForbiddenAccess = 'ERR_FORBIDDEN',
    /**
     * Error for failed to authenticate user
     */
    AuthenticationFail = 'ERR_AUTH_FAIL',
    /**
     * Prisma Client throws a PrismaClientKnownRequestError exception if the query engine returns a known error related to the request - for example, a unique constraint violation.
     * 
     * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror
     */
    PrismaClientKnownRequestError = 'ERR_PRISMA_CLIENT_KNOWN_REQUEST',
    /**
     * Prisma Client throws a PrismaClientUnknownRequestError exception if the query engine returns an error related to a request that does not have an error code.
     * 
     * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientunknownrequesterror
     */
    PrismaClientUnknownRequestError = 'ERR_PRISMA_CLIENT_UNKNOWN_REQUEST',
    /**
     * Prisma Client throws a PrismaClientRustPanicError exception if the underlying engine crashes and exits with a non-zero exit code. In this case, the Prisma Client or the whole Node process must be restarted.
     * 
     * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientrustpanicerror
     */
    PrismaClientRustPanicError = 'ERR_PRISMA_CLIENT_RUST_PANIC',
    /**
     * Prisma Client throws a PrismaClientInitializationError exception if something goes wrong when the query engine is started and the connection to the database is created. This happens either:
     * 
     * * When prisma.$connect() is called OR
     * * When the first query is executed
     * 
     * Errors that can occur include:
     * 
     * * The provided credentials for the database are invalid
     * * There is no database server running under the provided hostname and port
     * * The port that the query engine HTTP server wants to bind to is already taken
     * * A missing or inaccessible environment variable
     * * The query engine binary for the current platform could not be found (generator block)
     * 
     * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientinitializationerror
     */
    PrismaClientInitializationError = 'ERR_PRISMA_CLIENT_INITIALIZATION',
    /**
     * Prisma Client throws a PrismaClientValidationError exception if validation fails - for example:
     * 
     * * Missing field - for example, an empty data: {} property when creating a new record
     * * Incorrect field type provided (for example, setting a Boolean field to "Hello, I like cheese and gold!")
     * 
     * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror
     */
    PrismaClientValidationError = 'ERR_PRISMA_CLIENT_VALIDATION_ERROR',
    /**
     * Unknown or undocumented error returned from some code
     */
    UnknownError = 'ERR_UNKNOWN'
}

export default ErrorCode