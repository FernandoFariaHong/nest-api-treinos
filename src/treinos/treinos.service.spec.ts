import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Treino } from './treino.entity';
import { TreinosService } from './treinos.service';

describe('TreinosService', () => {
  let service: TreinosService;

  const repo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  const treino = { id: 1, exercicio: 'Supino', series: 4, repeticoes: 10, carga: 60 } as Treino;

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [TreinosService, { provide: getRepositoryToken(Treino), useValue: repo }],
    }).compile();
    service = moduleRef.get(TreinosService);
  });

  it('cria um treino', async () => {
    const dto = { exercicio: 'Supino', series: 4, repeticoes: 10, carga: 60 };
    repo.create.mockReturnValue(treino);
    repo.save.mockResolvedValue(treino);

    await expect(service.criar(dto)).resolves.toEqual(treino);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(treino);
  });

  it('lista os treinos', async () => {
    repo.find.mockResolvedValue([treino]);
    await expect(service.listar()).resolves.toEqual([treino]);
  });

  it('busca um treino existente', async () => {
    repo.findOneBy.mockResolvedValue(treino);
    await expect(service.buscar(1)).resolves.toEqual(treino);
  });

  it('lança NotFoundException quando o treino não existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.buscar(99)).rejects.toThrow(NotFoundException);
  });

  it('atualiza só os campos enviados', async () => {
    repo.findOneBy.mockResolvedValue({ ...treino });
    repo.save.mockImplementation(async (t) => t);

    const atualizado = await service.atualizar(1, { carga: 70 });
    expect(atualizado.carga).toBe(70);
    expect(atualizado.exercicio).toBe('Supino');
  });

  it('remove um treino', async () => {
    repo.findOneBy.mockResolvedValue(treino);
    repo.remove.mockResolvedValue(treino);

    await service.remover(1);
    expect(repo.remove).toHaveBeenCalledWith(treino);
  });

  it('não remove um treino que não existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.remover(99)).rejects.toThrow(NotFoundException);
    expect(repo.remove).not.toHaveBeenCalled();
  });
});
