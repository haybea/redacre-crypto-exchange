import {WebSocketGateway,SubscribeMessage,MessageBody,WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class RateGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('send_rate')
    handleSaveRate(@MessageBody() rate: string): void{
        this.server.emit('new_rate',rate);
    }

}