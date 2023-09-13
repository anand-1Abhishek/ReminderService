const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const {createChannel,subscribeMessage} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');

//const {sendBasicEmail} = require('./services/email-service')
const TicketController = require('./controllers/ticket-controller')
const EmailService = require('./services/email-service');

const jobs = require('./utils/job');


const setupAndStartServer = async () =>{

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    
    app.post('/api/v1/tickets',TicketController.create);
    
    const channel = await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);
    
    app.listen(3004,()=>{
        console.log(`server started at port ${PORT}`);
        //jobs();
        // sendBasicEmail(
        //     'prabhushrianand@gmail.com',
        //     'abhishekanand19472001@gmail.com',
        //     'This is email testing',
        //     'hy, how r you, I like You'
        // );
    });
}

setupAndStartServer();
