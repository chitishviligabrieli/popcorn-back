import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistMainDto } from './create-artist-main.dto';

export class UpdateArtistMainDto extends PartialType(CreateArtistMainDto) {}
