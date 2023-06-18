import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageEntity } from 'src/language/entities/language.entity';
import { Equal, Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly _languageRepository: Repository<LanguageEntity>,
  ) {}

  create(createLanguageDto: CreateLanguageDto) {
    return this._languageRepository.save(createLanguageDto);
  }

  findAll() {
    return this._languageRepository.find();
  }

  async existShortName(shortName: string) {
    console.log(shortName);
    const language = await this._languageRepository.findOneBy({
      shortName: Equal(shortName),
    });

    console.log('lang', language);

    return !!language;
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
