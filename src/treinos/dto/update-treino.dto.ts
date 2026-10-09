import { PartialType } from '@nestjs/mapped-types';
import { CreateTreinoDto } from './create-treino.dto';

// No PATCH todos os campos são opcionais
export class UpdateTreinoDto extends PartialType(CreateTreinoDto) {}
