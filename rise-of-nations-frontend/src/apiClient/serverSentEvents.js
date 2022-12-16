export const initSse = (connection, url) => {
    return new Promise((resolve, reject) => {
        connection.abortController = new AbortController();
        const signal = connection.abortController.signal;
        connection.eventSource = new EventSource(url, {
            withCredentials: true,
        });

        connection.eventSource.addEventListener(
            "open",
            () => {
                connection.eventSource.addEventListener(
                    "error",
                    () => {
                        connection.abortController.abort();
                        connection.eventSource.close();
                        connection.eventSource = null;
                    },
                    { signal }
                );

                resolve(signal);
            },
            { once: true }
        );

        connection.eventSource.addEventListener(
            "error",
            (e) => {
                reject(e);
            },
            { once: true }
        );
    });
};
