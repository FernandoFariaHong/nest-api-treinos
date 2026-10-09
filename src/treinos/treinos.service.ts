import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { UpdateTreinoDto } from './dto/update-treino.dto';
import { Treino } from './treino.entity';

@Injectable()
export class TreinosService {
  constructor(
    @InjectRepository(Treino)
    private readonly repo: Repository<Treino>,
  ) {}

  criar(dto: CreateTreinoDto): Promise<Treino> {
    const treino = this.repo.create(dto);
    return this.repo.save(treino);
  }

  listar(): Promise<Treino[]> {
    return this.repo.find({ order: { criadoEm: 'DESC' } });
  }

  async buscar(id: number): Promise<Treino> {
    const treino = await this.repo.findOneBy({ id });
    if (!treino) {
      throw new NotFoundException(`Treino ${id} não encontrado`);
    }
    return treino;
  }

  async atualizar(id: number, dto: UpdateTreinoDto): Promise<Treino> {
    const treino = await this.buscar(id);
    Object.assign(treino, dto);
    return this.repo.save(treino);
  }

  async remover(id: number): Promise<void> {
    const treino = await this.buscar(id);
    await this.repo.remove(treino);
  }
}
