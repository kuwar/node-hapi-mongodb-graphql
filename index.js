const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');

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

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
        const filename = file.hapi.filename;
        const data = file._data;
        fs.writeFile('./upload/' + filename, data, err => {
            if (err) {
                reject(err);
            }
            resolve({
                message: 'Upload successfully!'
            });
        });
    });
};

server.route({
    path: '/upload',
    method: 'POST',
    options: {
        payload: {
            output: 'stream',
        }
    },
    handler: (req, h) => {
        const {
            payload
        } = req;
        const response = handleFileUpload(payload.file);
        return response;
    }
});

server.route({
    method: 'GET',
    path: '/upload/{file*}',
    handler: {
        directory: {
            path: 'upload'
        }
    }
});


// Start the server
const start = async () => {
    try {
        await server.register(Inert);

        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`Server running at: ${server.info.uri}`);
};

start();