import { ApiProperty } from "@nestjs/swagger";

export class DeleteTaskInput {
  @ApiProperty({ required: true, title: "ID of this task", minimum: 1 })
  id: number;
}
