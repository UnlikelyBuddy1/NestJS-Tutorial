import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository,
    ) { }

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if(result.affected===0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id: number, status : TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

}





/* 
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id : string): Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    createTask(createTaskDto: createTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task= {
            id : uuid(),
            title, 
            description,
            status : TaskStatus.OPEN,

        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus ): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;

    } */

