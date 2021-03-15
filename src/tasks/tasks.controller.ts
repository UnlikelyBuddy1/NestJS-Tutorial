import { Body, Controller, Get, Post, Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id : string){
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: createTaskDto): Task{
        return this.tasksService.createTask(createTaskDto);
        
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus (
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe)  status : TaskStatus) : Task {
        return this.tasksService.updateTaskStatus(id,status);
    }
}