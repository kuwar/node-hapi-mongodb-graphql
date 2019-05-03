const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
    port: 4000
});

// Add the route for Company
const CompanyRoutes = require("./src/company/routes/company.routes");
server.route(CompanyRoutes);

server.route([{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'I am the home route';
        },
    },
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, h) {
            return 'hello world';
        }
    }
]);

// Start the server
const start = async () => {
    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Server running at: ${server.info.uri}`);
};

start();