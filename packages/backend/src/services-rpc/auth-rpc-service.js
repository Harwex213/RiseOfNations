const login = async ({ body, di }) => {
    /**
     * - get access to current context
     * - what is stored in that context?
     * - apparently should be current user data, e.g. authenticated it or not
     */
}

const adminLogin = async () => {
    /**
     *
     */
}

const register = async () => {
    /**
     *
     */
}

const describe = async () => {
    /**
     *
     */
}

const logout = async () => {
    /**
     *
     */
}

const authRpcService = {
    login: rpc.post(login).schema(),
    adminLogin: rpc.post(adminLogin).schema(),
    register: rpc.post(register).schema(),
    describe: rpc.get(describe).rbac(),
    logout: rpc.delete(logout).rbac(),
}
