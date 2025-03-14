/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class ProductoControlType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;
}

@Entity()
export class ProductoControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  registroIca: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  aplicationFrecuency: string;

  @Column()
  @IsNotEmpty()
  value: string;

  @Column()
  @IsNotEmpty()
  periodoCarencia: string;

  @Column({ type: 'timestamp' })
  fechaUltimaAplicacion: Date;

  @Column()
  @IsNotEmpty()
  nombreHongo: string;

  @ManyToOne(() => ProductoControlType, { nullable: false })
  productoControlType: ProductoControlType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
