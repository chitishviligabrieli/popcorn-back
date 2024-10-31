import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';

@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {
  }

  @Post()
  async createProfession(): Promise<void> {
    await this.professionService.createProfessinos();
  }

  @Post('map')
  async professionMap(): Promise<any> {
    await this.professionService.professionMap();
  }
}
