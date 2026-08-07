import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ImportYoutubeDto {
  @IsString()
  @IsNotEmpty()
  youtubeUrl!: string;

  @IsString()
  @IsOptional()
  title?: string;
}

