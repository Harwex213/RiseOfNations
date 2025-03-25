class AppError extends Error {
    constructor(code) {
        super(code);
    }
}

const createError = (code) => new AppError(code);

// todo
const generateErrorResponse = (error) => {
    /**
     * generate json from AppError
     */
}

// todo
const translateError = (() => {
    /**
     * - load all translates from `translates` folder with split by locales
     */

    // todo
    return (locale, errorCode) => {
        /**
         * - get appropriate errorCodeToMessageMap by localed
         * - translate by errorCode
         */
    }
})

/**
 * - определить константы ошибок
 * - мы их будем возвращать фронту
 * - фронт их будет транслейтить через этот сервис
 */

export {
    createError,
    generateErrorResponse,
}