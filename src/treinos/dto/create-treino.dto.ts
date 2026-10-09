import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateTreinoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  exercicio!: string;

  @IsInt()
  @Min(1)
  series!: number;

  @IsInt()
  @Min(1)
  repeticoes!: number;

  @IsNumber()
  @Min(0)
  carga!: number;
}
