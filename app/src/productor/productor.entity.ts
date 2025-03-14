/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { Finca } from '../finca/finca.entity';

@Entity()
export class Productor {
  @PrimaryColumn()
  @IsNotEmpty()
  document: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsPhoneNumber('CO') // Valida un número de Colombia (ajústalo si es necesario)
  phone: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => Finca, (finca) => finca.productor)
  fincas: Finca[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
