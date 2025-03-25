import http from "node:http";

// todo
const handleRestCall = () => {
    /**
     * - find which entity is handled
     * - detect with method should be called
     * - call method of rest service
     */
}

// todo
const handleRpcCall = () => {
    /**
     * - find which method is called
     * - call appropriate rpc service
     */
}

// todo
const handleRequest = () => {
    try {
        /**
         * - distinguish which service to call, rest or rpc
         */
        const handler = _ ? handleRpcCall : handleRestCall;
    } catch (e) {
        /**
         * - if error instanceof AppError, thus it is handled error
         * - otherwise it is InternalServerError
         */
    }
}

const SERVER_PORT = Number(process.env.SERVER_PORT) || 8080;
const SERVER_IP = Number(process.env.SERVER_IP) || "0.0.0.0"

http.createServer(handleRpcCall).listen(SERVER_PORT, SERVER_IP);