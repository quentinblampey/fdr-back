const lo = require('lodash');
const config = require('config');

module.exports = {
    /**
     * Create a new server
     * @param {*} app Express application
     * @returns {}
     */
    Server (app) {
        let server = null;
        return {
            async start () {
                const port = config.get('web.port');
                server = await app.listen(port);

                console.log(`App is ready and listening on port ${port}`);
                return server;
            },
            /**
             * Stop the express server
             * @param {Function} callback Callback function
             * @returns {void}
             */
            async stop () {
                if (!lo.isNull(server)) {
                    await server.close();
                }
            },
        };
    },
};
