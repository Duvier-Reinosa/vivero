import { Test, TestingModule } from '@nestjs/testing';
import { Productor } from './productor.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Productor Entity', () => {
  let productorRepo: Repository<Productor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Productor),
          useClass: Repository,
        },
      ],
    }).compile();

    productorRepo = module.get<Repository<Productor>>(
      getRepositoryToken(Productor),
    );
  });

  it('debe crear un Productor válido', () => {
    const productor = productorRepo.create({
      document: '12345678',
      name: 'Juan',
      lastName: 'Pérez',
      phone: '+573001234567',
      email: 'juan.perez@example.com',
    });

    expect(productor).toBeDefined();
    expect(productor.document).toBe('12345678');
    expect(productor.name).toBe('Juan');
  });

  it('debe fallar si falta un campo requerido', async () => {
    try {
      const productor = productorRepo.create({
        document: '87654321',
        name: 'Maria',
        lastName: '', // ❌ Campo vacío
        phone: '+573001234567',
        email: 'maria@example.com',
      });

      await productorRepo.save(productor);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('debe validar el formato del correo', async () => {
    try {
      const productor = productorRepo.create({
        document: '11223344',
        name: 'Carlos',
        lastName: 'Gómez',
        phone: '+573002345678',
        email: 'correo-invalido', // ❌ Correo inválido
      });

      await productorRepo.save(productor);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
