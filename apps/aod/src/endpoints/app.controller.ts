import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { IamClient } from "@iam/iam-client";
import { TodoClient } from "@todo/todo-client";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginInput, LoginOutput } from "@iam/iam-client/models/dto/login.dto";
import { IsPublic } from "../auth/meta-data/is.public";
import { RegisterInput, RegisterOutput } from "@iam/iam-client/models/dto/register.dto";
import { ListUsersOutput } from "@iam/iam-client/models/dto/list-users.dto";
import { NeedsRole } from "../auth/meta-data/needs-any-role";
import { AddTaskInput, AddTaskOutput } from "@todo/todo-client/models/dto/add-task.dto";
import { UpdateTaskInput, UpdateTaskOutput } from "@todo/todo-client/models/dto/update-tasks.dto";
import { ListTasksInput, ListTasksOutput } from "@todo/todo-client/models/dto/list-tasks.dto";

@Controller()
export class AppController {
  constructor(
    private readonly iamClient: IamClient,
    private readonly todoClient: TodoClient,
  ) {
  }

  @ApiOperation({ summary: "Login into your account" })
  @ApiResponse({ type: LoginOutput })
  @Post("users/login")
  @IsPublic()
  login(@Body() input: LoginInput): Promise<LoginOutput> {
    return this.iamClient.user.login(input);
  }

  @ApiOperation({ summary: "Register a new account" })
  @ApiResponse({ type: RegisterOutput })
  @Post("users/register")
  @IsPublic()
  register(@Body() input: RegisterInput): Promise<RegisterOutput> {
    return this.iamClient.user.register(input);
  }

  @ApiOperation({ summary: "Get a list of all users" })
  @ApiResponse({ type: ListUsersOutput })
  @Get("users/list")
  @NeedsRole("ADMIN")
  listUsers(): Promise<ListUsersOutput> {
    return this.iamClient.user.list();
  }

  @ApiOperation({ summary: "Add a new task" })
  @ApiResponse({ type: AddTaskOutput })
  @Post("tasks/add")
  @NeedsRole("ADMIN")
  addTask(@Body() input: AddTaskInput): Promise<AddTaskOutput> {
    return this.todoClient.task.add(input);
  }

  @ApiOperation({ summary: "Update a task" })
  @ApiResponse({ type: UpdateTaskOutput })
  @Put("tasks/update/:id")
  @NeedsRole("ADMIN")
  updateTask(
    @Param("id") id: number, @Body() input: Omit<UpdateTaskInput, "id">,
  ): Promise<UpdateTaskOutput> {
    const arg: UpdateTaskInput = {
      id,
      ...input,
    };
    return this.todoClient.task.update(arg);
  }

  @ApiOperation({ summary: "Delete a task" })
  @Delete("tasks/delete/:id")
  @NeedsRole("ADMIN")
  deleteTask(@Param("id") id: number): Promise<void> {
    return this.todoClient.task.delete({ id });
  }

  @ApiOperation({ summary: "List tasks" })
  @ApiResponse({ type: ListTasksOutput })
  @Get("tasks/list")
  listTasks(@Query() input: ListTasksInput): Promise<ListTasksOutput> {
    return this.todoClient.task.list(input);
  }
}
