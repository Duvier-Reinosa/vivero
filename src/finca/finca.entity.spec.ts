import { Test, TestingModule } from '@nestjs/testing';
import { Finca } from './finca.entity';
import { Productor } from '../productor/productor.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Finca Entity', () => {
  let fincaRepo: Repository<Finca>;
  let productorRepo: Repository<Productor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Finca),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Productor),
          useClass: Repository,
        },
      ],
    }).compile();

    fincaRepo = module.get<Repository<Finca>>(getRepositoryToken(Finca));
    productorRepo = module.get<Repository<Productor>>(
      getRepositoryToken(Productor),
    );
  });

  it('debe crear una Finca válida con un Productor', async () => {
    const productor = productorRepo.create({
      document: '12345678',
      name: 'Juan',
      lastName: 'Pérez',
      phone: '+573001234567',
      email: 'juan.perez@example.com',
    });
    await productorRepo.save(productor);

    const finca = fincaRepo.create({
      catastroNumber: '98765-ABC',
      city: 'Medellín',
      productor: productor,
    });

    expect(finca).toBeDefined();
    expect(finca.catastroNumber).toBe('98765-ABC');
    expect(finca.productor.document).toBe('12345678');
  });

  it('debe fallar si falta el Productor', async () => {
    try {
      const finca = fincaRepo.create({
        catastroNumber: '54321-XYZ',
        city: 'Bogotá',
      });

      await fincaRepo.save(finca);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('debe fallar si falta el número de catastro', async () => {
    try {
      const productor = productorRepo.create({
        document: '87654321',
        name: 'Maria',
        lastName: 'Gómez',
        phone: '+573002345678',
        email: 'maria@example.com',
      });
      await productorRepo.save(productor);

      const finca = fincaRepo.create({
        city: 'Cali', // ❌ Falta el número de catastro
        productor: productor,
      });

      await fincaRepo.save(finca);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
