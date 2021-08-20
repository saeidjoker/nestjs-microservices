import { Injectable } from "@nestjs/common";
import { FindConditions, Like, Repository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddTaskInput, AddTaskOutput } from "@todo/todo-client/models/dto/add-task.dto";
import { UpdateTaskInput, UpdateTaskOutput } from "@todo/todo-client/models/dto/update-tasks.dto";
import { DeleteTaskInput } from "@todo/todo-client/models/dto/delete-task.dto";
import { ListTasksInput, ListTasksOutput } from "@todo/todo-client/models/dto/list-tasks.dto";
import { IamClient } from "@iam/iam-client";
import { TaskModelConverter } from "../converters/task.model-converter";
import { RpcErrorHelper } from "@shared/shared/rpc-error.helper";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly iamClient: IamClient,
  ) {
  }

  async add(input: AddTaskInput): Promise<AddTaskOutput> {
    // check if user exists. we don't need the return value,
    // because if the user does not exist, IAM micro-service will raise an exception
    await this.iamClient.internal.getUser({ id: input.userId });

    // create and store the task
    const taskEntity: TaskEntity = {
      id: 0,
      userId: input.userId,
      description: input.description,
      title: input.title,
    };
    await this.taskRepository.insert(taskEntity);

    return {
      task: TaskModelConverter.convert(taskEntity),
    };
  }

  async update(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    // find task
    const taskEntity = await this._getTaskBy({ id: input.id });

    // update and store
    taskEntity.title = input.title;
    taskEntity.description = input.description;
    await this.taskRepository.update({ id: input.id }, {
      title: taskEntity.title,
      description: taskEntity.description,
    });

    return {
      task: TaskModelConverter.convert(taskEntity),
    };
  }

  async delete(input: DeleteTaskInput): Promise<void> {
    const result = await this.taskRepository.delete({ id: input.id });

    if (!result.affected)
      RpcErrorHelper.notFound("Task was not found");
  }

  async list(input: ListTasksInput): Promise<ListTasksOutput> {
    const take = input.size || 20;
    const skip = input.page * take;
    const where: FindConditions<TaskEntity> = {};
    if (!!input.titleFilter) {
      where.title = Like(`%${input.titleFilter}%`);
    }

    const [result, total] = await this.taskRepository.findAndCount({
      where,
      order: { id: "DESC" },
      take,
      skip,
    });

    return {
      list: result,
      total: total,
    };
  }

  private async _getTaskBy(criteria: FindConditions<TaskEntity>): Promise<TaskEntity> {
    const taskEntity = await this.taskRepository.findOne(criteria);

    if (!taskEntity)
      RpcErrorHelper.notFound("Task was not found");

    return taskEntity;
  }
}
