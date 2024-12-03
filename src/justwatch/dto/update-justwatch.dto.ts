import { PartialType } from '@nestjs/mapped-types';
import { CreateJustwatchDto } from './create-justwatch.dto';

export class UpdateJustwatchDto extends PartialType(CreateJustwatchDto) {}
