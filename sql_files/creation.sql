CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table if not exists productor (
    document text primary key,
    name text,
    last_name text,
    phone text,
    email text,
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON productor
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table if not exists finca (
    catastro_number text primary key,
    city text,
    productor_id text references productor(document),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);


CREATE TRIGGER set_timestamp BEFORE UPDATE ON finca
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table if not exists vivero(
    code text primary key,
    crop_type text,
    finca_id text references finca(catastro_number),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON vivero
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();


create table if not exists producto_control_type(
    id serial primary key,
    name text,
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

create table if not exists producto_control(
    id serial primary key,
    registro_ica text,
    name text,
    aplication_frecuency text,
    value text,
    periodo_carencia text,
    fecha_ultima_aplicacion timestamp,
    nombre_hongo text,
    producto_control_type_id integer references producto_control_type(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON producto_control
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table if not exists labor(
    id serial primary key,
    description text,
    vivero_id text references vivero(code),
    producto_control_id integer references producto_control(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);


CREATE TRIGGER set_timestamp BEFORE UPDATE ON labor
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();