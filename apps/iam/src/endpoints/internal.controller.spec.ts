import { Test, TestingModule } from "@nestjs/testing";
import { InternalController } from "./internal.controller";
import { UserService } from "../services/user.service";

describe("InternalController", () => {
  let controller: InternalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InternalController],
      providers: [UserService],
    }).compile();

    controller = app.get<InternalController>(InternalController);
  });

  describe("root", () => {
    it("should return \"HEALTH: \" something...", () => {
      expect(controller.healthCheck()).toContain("HEALTH: ");
    });
  });
});
