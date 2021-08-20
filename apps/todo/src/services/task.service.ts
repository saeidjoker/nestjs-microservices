import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddTaskInput, AddTaskOutput } from "@todo/todo-client/models/dto/add-task.dto";
import { UpdateTaskInput, UpdateTaskOutput } from "@todo/todo-client/models/dto/update-tasks.dto";
import { DeleteTaskInput } from "@todo/todo-client/models/dto/delete-task.dto";
import { ListTasksInput, ListTasksOutput } from "@todo/todo-client/models/dto/list-task.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {
  }

  async add(input: AddTaskInput): Promise<AddTaskOutput> {
    return;
  }

  async update(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    return;
  }

  async delete(input: DeleteTaskInput): Promise<void> {

  }

  async list(input: ListTasksInput): Promise<ListTasksOutput> {
    return;
  }
}
