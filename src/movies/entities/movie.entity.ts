import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'peliculas',
})
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  imdbID: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  poster: string;

  @Column()
  actors: string;

  @Column()
  director: string;

  @Column({
    default: true,
  })
  estado: boolean;

  @ManyToMany(() => User, (usuario) => usuario.peliculas)
  @JoinTable({
    name: 'peliculas_usuarios',
    joinColumn: {
      name: 'pelicula_id',
    },
    inverseJoinColumn: {
      name: 'usuario_id',
    },
  })
  usuarios: User[];
}
