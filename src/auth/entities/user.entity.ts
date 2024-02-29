import { Movie } from 'src/movies/entities/movie.entity';
import { BaseEntity } from '../../common/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'usuarios',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  usuario: string;

  @Column()
  nombres: string;

  @Column()
  primer_apellido: string;

  @Column()
  segundo_apellido: string;

  @Column()
  contrasena: string;

  @Column({
    default: true,
  })
  estado: boolean;

  @ManyToMany(() => Movie, (peliculas) => peliculas.usuarios)
  peliculas: Movie[];
}
