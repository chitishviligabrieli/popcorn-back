import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JustWatchService } from './justwatch.service';
import { CreateJustwatchDto } from './dto/create-justwatch.dto';
import { UpdateJustwatchDto } from './dto/update-justwatch.dto';

@Controller('justwatch')
export class JustwatchController {
  constructor(private readonly justwatchService: JustWatchService) {}

  @Post()
  create(@Body() createJustwatchDto: CreateJustwatchDto) {
    // return this.justwatchService.create(createJustwatchDto);
  }

  @Get()
  findAll() {
    // return this.justwatchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.justwatchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJustwatchDto: UpdateJustwatchDto) {
    // return this.justwatchService.update(+id, updateJustwatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.justwatchService.remove(+id);
  }
}
