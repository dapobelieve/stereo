import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import {
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class UpdateMediaDto extends PickType(CreateMediaDto, ['status'] as const) {
}
