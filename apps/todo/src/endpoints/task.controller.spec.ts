import { Test, TestingModule } from "@nestjs/testing";
import { TaskController } from "./task.controller";
import { TaskService } from "../services/task.service";

describe("TaskController", () => {
  let controller: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = app.get<TaskController>(TaskController);
  });

  describe("root", () => {
    it("should return \"Hello World!\"", () => {
      expect(controller.getHello()).toBe("Hello World!");
    });
  });
});
