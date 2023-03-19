import {
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsIn(['audio', 'image'])
  readonly type: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly  description: string;

  @IsNotEmpty()
  readonly url: string;

  @IsNotEmpty()
  @IsIn(['active', 'inactive'])
  readonly status: string;
}
