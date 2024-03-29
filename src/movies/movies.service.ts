import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository, ILike } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { SearchMoviesDto } from './dto/search-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async addFavorite(createMovieDto: CreateMovieDto) {
    const { usuario_id, ...peliculaFavorita } = createMovieDto;
    const usuarioDB = await this.userRepository.findOne({
      where: { id: usuario_id, estado: true },
    });
    if (!usuarioDB) {
      throw new BadRequestException('El usuario no existe o esta inactivo');
    }
    const peliculaExiste = await this.movieRepository.findOne({
      where: {
        imdbID: peliculaFavorita.imdbID,
        estado: true,
        usuarios: {
          id: usuario_id,
        },
      },
    });
    if (peliculaExiste) {
      throw new BadRequestException('La pelicula ya existe');
    }
    const pelicula = this.movieRepository.create({
      ...peliculaFavorita,
      usuarios: [usuarioDB],
    });
    await this.movieRepository.save(pelicula);

    const { usuarios, ...resto } = pelicula;
    const [usuarioID] = usuarios || [];
    const usuario = {
      usuario_id: usuarioID.id,
      estado: usuarioID.estado,
      usuario: usuarioID.usuario,
    };

    return {
      ...resto,
      usuario: usuario,
    };
  }

  async findFavoriteUser(id: string) {
    const pelicuas = await this.movieRepository.find({
      where: {
        usuarios: {
          id: id,
          estado: true,
        },
        estado: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return pelicuas;
  }

  async searchMovies(searchMoviesDto: SearchMoviesDto) {
    const { termino, offset, limit } = searchMoviesDto;
    const peliculasUsuario = await this.movieRepository.find({
      where: {
        title: ILike(`%${termino}%`),
        estado: true,
      },
      skip: offset,
      take: limit,
    });
    return {
      total: peliculasUsuario.length,
      peliculas: peliculasUsuario,
    };
  }

  async removeFavorite(id: string) {
    const pelicula = await this.movieRepository.findOne({
      where: { id, estado: true },
    });

    if (!pelicula) {
      throw new BadRequestException(
        'La pelicula no existe o ha sido eliminado',
      );
    }
    await this.movieRepository.update(id, { estado: false });
    return {
      mensaje: 'Pelicula eliminada',
    };
  }
}
