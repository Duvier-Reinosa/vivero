CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table if not exists productor (
    document string primary key,
    name string,
    last_name string,
    phone string,
    email string,
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON productor
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table if not exists finca (
    catastro_number string primary key,
    city string,
    productor_id string references productor(document),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);


CREATE TRIGGER set_timestamp BEFORE UPDATE ON finca
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table if not exists vivero(
    code string primary key,
    crop_type string,
    finca_id string references finca(catastro_number),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON vivero
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();


create table if not exists producto_control_type(
    id serial primary key,
    name string,
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

create table if not exists producto_control(
    id serial primary key,
    registro_ica string,
    name string,
    aplication_frecuency string,
    value string,
    periodo_carencia string,
    fecha_ultima_aplicacion timestamp,
    nombre_hongo string,
    producto_control_type_id string references producto_control_type(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON producto_control
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

create table if not exists labor(
    id serial primary key,
    description string,
    vivero_id string references vivero(code),
    producto_control_id string references producto_control(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

CREATE TRIGGER set_timestamp BEFORE UPDATE ON labor
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();