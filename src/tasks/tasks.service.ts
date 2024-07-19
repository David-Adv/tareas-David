import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DATABASE_PATH  } from '../common/constants/glabal.constants'
import * as fs from "fs/promises"
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  constructor(private eventEmitter: EventEmitter2) {}

 async create(task: CreateTaskDto) {
   
    const tasks = await this.findAll()
    const generatedId = crypto.randomUUID().toString()
    tasks.push({
      id: generatedId, ...task
    })
    await fs.writeFile(DATABASE_PATH, JSON.stringify(tasks))

    this.eventEmitter.emit('TASK-CREATED-SUCCESSFULLY',generatedId)
  }

async  findAll(sort? :string) :Promise <CreateTaskDto[]> {
  const file = (await fs.readFile(DATABASE_PATH))
  const allTasks :CreateTaskDto[] = JSON.parse(file.toString())


    if(sort == 'priority')
      return allTasks.sort((a,b) => b[sort] - a[sort])

    if (sort == 'scheduledTime') return allTasks.sort((a, b) => {
      const date1 = new Date(a.scheduledTime).getTime() || 0
      const date2 = new Date(b.scheduledTime).getTime() || 0

      return date2 - date1;
    })
    

  return allTasks;
  
  }

  async findOne(id: string) {
    const allTasks =   await this.findAll()
    const task = allTasks.findIndex(task => task.id == id)

    if (!task) throw new NotFoundException()
      return task
  }

 async update(id: string, updateTaskDto: UpdateTaskDto) {
 const tareas = await this.findAll()


  const laTareaIndex = tareas.findIndex( item => item.id == id )
  // console.log(updateTaskDto)

  if(laTareaIndex == -1) throw new BadRequestException("id no valido") 


  tareas[laTareaIndex] = {...tareas[laTareaIndex], ...updateTaskDto}

  // console.log(laTareaIndex)

  await fs.writeFile(DATABASE_PATH, JSON.stringify(tareas))

    return  tareas[laTareaIndex];

  }

  async remove(id: string) {


    const tareas = await this.findAll()

    const tareaIndex = tareas.findIndex(item => item.id == id)
    tareas.splice(tareaIndex, 1);
   

    if(tareaIndex == -1) throw new BadRequestException("id no valido") 

    await fs.writeFile(DATABASE_PATH, JSON.stringify(tareas))

    return `Se elimino la tarea pibe`;
  }

  getDate(): string {
    const date = new Date().toString()
    return date
 }
}
