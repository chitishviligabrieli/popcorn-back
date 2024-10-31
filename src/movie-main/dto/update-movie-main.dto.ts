import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieMainDto } from './create-movie-main.dto';

export class UpdateMovieMainDto extends PartialType(CreateMovieMainDto) {}
