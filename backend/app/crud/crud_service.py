from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.models.service_model import Service
from app.schemas import service_schema
from app.crud.crud_breed import get_breed


def get_service(db: Session, service_id: int):
    return db.query(Service).filter(Service.id == service_id).first()


def get_service_by_service_name(db: Session, service_name: str):
    return db.query(Service).filter(Service.service_name == service_name).first()


def get_service_by_breed_id(db: Session, breed_id: int):
    return db.query(Service).filter(Service.breed_id == breed_id).all()


# skip and limit for paging
def get_services(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Service).offset(skip).limit(limit).all()


def create_service(db: Session, service: service_schema.ServiceCreate):
    db_service = get_service_by_service_name(db, service_name=service.service_name)
    if db_service:
        raise HTTPException(status_code=400, detail="Service already registered")

    db_service = Service(service_name=service.service_name, price=service.price)

    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


def update_service(db: Session, service: service_schema.ServiceUpdate, service_id: int):
    db_service = db.get(Service, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")

    service_data = service.dict(exclude_unset=True)
    for key, value in service_data.items():
        print(key, value)
        setattr(db_service, key, value)

    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


def delete_service(service_id: int, db: Session):
    service = db.query(Service).filter(Service.id == service_id)
    service.delete()
    db.commit()
    return {"message": "Successfully delete service {service.service_name}"}
