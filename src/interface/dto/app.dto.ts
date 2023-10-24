import { IsNotEmpty } from "class-validator";

export class AppDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  author: string;

  status: boolean;
}
