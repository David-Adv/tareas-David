import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @OnEvent('TASK-CREATED-SUCCESSFULLY')
handleEvent(id: string){
  console.log(`NUEVA TAREA: ${id}`);
 
}
}
