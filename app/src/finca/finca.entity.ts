/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Productor } from '../productor/productor.entity';

@Entity()
export class Finca {
  @PrimaryColumn()
  @IsNotEmpty()
  catastroNumber: string;

  @Column()
  @IsNotEmpty()
  city: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Productor, (productor) => productor.fincas, {
    nullable: false,
  })
  productor: Productor;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
