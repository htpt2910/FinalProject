import torch
import io

from sqlalchemy.orm import Session
from app.ai.breed_classify import model, class_names
import PIL.Image
from torchvision import transforms
from app.crud.crud_breed import get_breed_by_name
from fastapi import Depends, APIRouter, UploadFile

from app.db.database import SessionLocal, engine

detect_router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


data_transform = transforms.Compose(
    [
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ]
)


@detect_router.post("/")
def predict_breed_transfer(img: UploadFile, db: Session = Depends(get_db)):
    # load the image and return the predicted breed
    # if there is more than 1 dog, use bounding box and identify all dogs,
    img_content = img.file.read()
    my_image = PIL.Image.open(io.BytesIO(img_content))
    image = my_image.convert("RGB")
    print(image)
    image_transform = data_transform(image).float()
    image_transform = image_transform.unsqueeze(0)
    model.cpu()
    result = model(image_transform)
    _, preds = torch.max(result, 1)

    max_value = torch.max(result, 1).values[0].item()

    if max_value < 3.5:
        return "No result"
    else:
        return get_breed_by_name(db, class_names[preds])
