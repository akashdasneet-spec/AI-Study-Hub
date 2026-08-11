import { IsNumber, IsString, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

export class CreateFocusSessionDto {
  @IsNumber()
  @Min(1)
  @Max(180)
  durationMinutes!: number;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
