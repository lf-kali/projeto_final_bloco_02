import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 128, nullable: false })
  nome: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  descricao: string;
}
