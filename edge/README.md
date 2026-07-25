# Provife Edge Servisi

Bu servis otopark sahasında çalışacak yerel uygulamanın başlangıç iskeletidir. Kamera akışları, plaka tanıma, bariyer kontrolü ve yerel veri saklama daha sonraki aşamalarda bu katmana eklenecektir.

## Yerel çalıştırma

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r edge\requirements.txt
uvicorn edge.app.main:app --reload
```

Sağlık kontrolü: `http://127.0.0.1:8000/api/v1/health`

