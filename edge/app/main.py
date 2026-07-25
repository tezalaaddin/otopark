from datetime import UTC, datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: datetime


class SiteSummary(BaseModel):
    site_name: str
    capacity: int
    occupied: int
    available: int
    cameras_online: int
    cameras_total: int
    barriers_ready: int
    barriers_total: int


app = FastAPI(
    title="Provife Yerel Otopark API",
    description="Kamera, OCR, geçiş ve saha cihazları için yerel öncelikli servis.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/v1/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="provife-edge",
        version="0.1.0",
        timestamp=datetime.now(UTC),
    )


@app.get("/api/v1/site/summary", response_model=SiteSummary)
def site_summary() -> SiteSummary:
    """İlk arayüz entegrasyonu için örnek saha özeti."""
    return SiteSummary(
        site_name="Provife Merkez",
        capacity=120,
        occupied=78,
        available=42,
        cameras_online=2,
        cameras_total=2,
        barriers_ready=2,
        barriers_total=2,
    )

