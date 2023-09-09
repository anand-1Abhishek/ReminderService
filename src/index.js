const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

//const {sendBasicEmail} = require('./services/email-service')
const TicketController = require('./controllers/ticket-controller')

const jobs = require('./utils/job');


const setupAndStartServer = () =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create);

    app.listen(3004,()=>{
        console.log(`server started at port ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'prabhushrianand@gmail.com',
        //     'abhishekanand19472001@gmail.com',
        //     'This is email testing',
        //     'hy, how r you, I like You'
        // );
    });
}

setupAndStartServer();
