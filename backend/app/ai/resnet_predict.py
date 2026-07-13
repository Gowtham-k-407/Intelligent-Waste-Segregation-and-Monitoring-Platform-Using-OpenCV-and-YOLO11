import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---------------- MODEL ----------------

model = models.resnet50(weights=None)

model.fc = nn.Sequential(
    nn.Linear(2048, 512),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(512, 2),
    nn.LogSoftmax(dim=1)
)

MODEL_PATH = "models/waste_resnet50.pth"

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)

model.to(device)
model.eval()

# ---------------- CLASSES ----------------

classes = [
    "Biodegradable",
    "Non-Biodegradable"
]

# ---------------- TRANSFORM ----------------

transform = transforms.Compose([
    transforms.Resize(255),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

# ---------------- PREDICT ----------------

def predict(image_path):

    image = Image.open(image_path).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0).to(device)

    with torch.no_grad():

        output = model(image)

        probs = torch.exp(output)

        confidence, predicted = torch.max(probs, 1)

    return {
        "prediction": classes[predicted.item()],
        "confidence": round(confidence.item() * 100, 2)
    }