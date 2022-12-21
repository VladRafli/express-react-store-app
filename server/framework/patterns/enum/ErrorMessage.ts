enum ErrorMessage {
    ValidationError = 'Not satisfying validation requirement.',
    BadCredentials = 'Wrong credentials.',
    BadFormInput = 'Bad form input.',
    PrismaClientKnownRequestError = 'Query engine return a known error related to your request.',
    PrismaClientUnknownRequestError = 'Query engine return a unknown error related to your request.',
    PrismaClientRustPanicError = 'Query engine crashes and exits with a non-zero exit code. Server need to be restarted.',
    PrismaClientInitializationError = 'Something wrong with the query engine connection.',
    PrismaClientValidationError = 'Cannot execute your prisma query. Failed passing validation check.',
    UnknownError = 'Cannot describe current error due unknown nature of the error or undocumented error.'
}

export default ErrorMessage