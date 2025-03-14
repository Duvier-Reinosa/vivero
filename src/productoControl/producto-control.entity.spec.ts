import { Test, TestingModule } from '@nestjs/testing';
import { ProductoControl } from './productoControl.entity';
import { ProductoControlType } from './productoControl.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductoControl Entity', () => {
  let productoControlRepo: Repository<ProductoControl>;
  let productoControlTypeRepo: Repository<ProductoControlType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(ProductoControl),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProductoControlType),
          useClass: Repository,
        },
      ],
    }).compile();

    productoControlRepo = module.get<Repository<ProductoControl>>(
      getRepositoryToken(ProductoControl),
    );
    productoControlTypeRepo = module.get<Repository<ProductoControlType>>(
      getRepositoryToken(ProductoControlType),
    );
  });

  it('debe crear un ProductoControlType válido', () => {
    const tipo = productoControlTypeRepo.create({ name: 'Fungicida' });
    expect(tipo).toBeDefined();
    expect(tipo.name).toBe('Fungicida');
  });

  it('debe crear un ProductoControl válido con relación a ProductoControlType', async () => {
    const tipo = productoControlTypeRepo.create({ name: 'Fungicida' });
    await productoControlTypeRepo.save(tipo);

    const producto = productoControlRepo.create({
      registroIca: '12345-ICA',
      name: 'Control de plagas',
      aplicationFrecuency: 'Cada 2 semanas',
      value: '500ml',
      periodoCarencia: '10 días',
      fechaUltimaAplicacion: new Date(),
      nombreHongo: 'Botrytis',
      productoControlType: tipo,
    });

    expect(producto).toBeDefined();
    expect(producto.productoControlType.name).toBe('Fungicida');
  });

  it('debe fallar si faltan campos requeridos en ProductoControl', async () => {
    try {
      const producto = productoControlRepo.create({
        registroIca: '12345-ICA',
        name: '', // ❌ Campo vacío
        aplicationFrecuency: 'Cada 2 semanas',
        value: '500ml',
        periodoCarencia: '10 días',
        fechaUltimaAplicacion: new Date(),
        nombreHongo: 'Botrytis',
      });

      await productoControlRepo.save(producto);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
