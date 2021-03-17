import { Body, Controller, Get, Post, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id : number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: createTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
        
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus (
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe)  status : TaskStatus) : Promise<Task> {
        return this.tasksService.updateTaskStatus(id,status);
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]>  {
        return this.tasksService.getTasks(filterDto);
    }
    
}
