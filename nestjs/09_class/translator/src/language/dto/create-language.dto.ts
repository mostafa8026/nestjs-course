import { OmitType } from "@nestjs/mapped-types";
import { LanguageEntity } from "src/language/entities/language.entity";

export class CreateLanguageDto extends OmitType(LanguageEntity, ['createdAt'] as const) {}
