import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('peliculas')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('favorito')
  addFavorite(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.addFavorite(createMovieDto);
  }

  @Get('lista-favorito/:id')
  findFavoriteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findFavoriteUser(id);
  }

  @Delete('favoritas/eliminar/:id')
  removeFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.removeFavorite(id);
  }
}
