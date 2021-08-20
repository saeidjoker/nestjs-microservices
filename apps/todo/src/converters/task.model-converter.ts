import { TaskEntity } from "../entities/task.entity";
import { TaskModel } from "@todo/todo-client/models/shared/task.model";

export class TaskModelConverter {
  public static convert(taskEntity: TaskEntity): TaskModel {
    const taskModel = new TaskModel();
    if (!taskEntity) return taskModel;

    taskModel.id = taskEntity.id;
    taskModel.title = taskEntity.title;
    taskModel.description = taskEntity.description;
    taskModel.userId = taskEntity.userId;

    return taskModel;
  }
}
