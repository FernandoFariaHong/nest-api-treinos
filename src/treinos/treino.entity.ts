import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('treinos')
export class Treino {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  exercicio!: string;

  @Column('int')
  series!: number;

  @Column('int')
  repeticoes!: number;

  @Column('float')
  carga!: number; // em kg

  @CreateDateColumn()
  criadoEm!: Date;
}
