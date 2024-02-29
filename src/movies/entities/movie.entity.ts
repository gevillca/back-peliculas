import { User } from 'src/auth/entities/user.entity';
import { BaseEntity } from '../../common/base.entity';
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
export class Movie extends BaseEntity {
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

  @ManyToMany(() => User, (usuario) => usuario.peliculas, { cascade: true })
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
