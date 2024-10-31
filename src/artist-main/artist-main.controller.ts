import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistMainService } from './artist-main.service';
import { CreateArtistMainDto } from './dto/create-artist-main.dto';
import { UpdateArtistMainDto } from './dto/update-artist-main.dto';

@Controller('artist-main')
export class ArtistMainController {
  constructor(private readonly artistMainService: ArtistMainService) {}

  @Post()
  create(@Body() createArtistMainDto: CreateArtistMainDto) {
    return this.artistMainService.create(createArtistMainDto);
  }

  @Get()
  findAll() {
    return this.artistMainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistMainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistMainDto: UpdateArtistMainDto) {
    return this.artistMainService.update(+id, updateArtistMainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistMainService.remove(+id);
  }
}
