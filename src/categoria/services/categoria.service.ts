import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findByID(id: number): Promise<Categoria> {
    const buscaCategoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
    });
    if (!buscaCategoria) {
      throw new HttpException(
        `Categoria de id ${id} não encontrada!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return buscaCategoria;
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findAllByDescricao(descricao: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    if (!categoria.id) {
      throw new HttpException(
        'ID da categoria é obrigatório para atualizar!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findByID(categoria.id);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoriaRepository.delete(id);
  }
}
