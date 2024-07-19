import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGuardGuard } from './task-guard/task-guard.guard';
import { ReadGuard } from './read/read.guard';
// import { query } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @UseGuards(new TaskGuardGuard())
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  @UseGuards(new ReadGuard())
 
  @Get()
  findAll(@Query('sort')sort?: string) {
    // console.log(sort)
    return this.tasksService.findAll(sort);
  }

  @Get('date')
  getDate(){
    return this.tasksService.getDate()
  }

  @UseGuards(new ReadGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
  
  @UseGuards(new TaskGuardGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }
  
  @UseGuards(new TaskGuardGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  
  
}
