import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treino } from './treino.entity';
import { TreinosController } from './treinos.controller';
import { TreinosService } from './treinos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Treino])],
  controllers: [TreinosController],
  providers: [TreinosService],
})
export class TreinosModule {}
