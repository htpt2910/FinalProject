import os
import pandas as pd
import torch
import torch.nn as nn
from torchvision.models import resnet101


labels = pd.read_csv(os.path.join(os.path.dirname(__file__), "labels.csv")).set_index(
    "id"
)
class_names = [item.replace("_", " ") for item in sorted(labels["breed"].unique())]

model = resnet101()

n_classes = len(class_names)

for param in model.parameters():
    param.requires_grad = False

num_ftrs = model.fc.in_features  # it's 2048, check fc layer of resnet

classifier = nn.Sequential(
    nn.Linear(num_ftrs, 512), nn.ReLU(), nn.Dropout(0.2), nn.Linear(512, n_classes)
)
model.fc = classifier

model.load_state_dict(
    torch.load(
        os.path.join(os.path.dirname(__file__), "model_transfer.pt"),
        map_location=torch.device("cpu"),
    )
)

model.eval()
