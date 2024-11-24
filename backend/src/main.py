from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model.hmax import HMAX

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"],     allow_methods=["*"],
    allow_headers=["*"],)


@app.get("/hmax")
async def hmax(lat: float, lon: float):
    hmax_at_loc = float(HMAX().sel(latitude=lat, longitude=lon, method="nearest").hmax.data)
    if hmax_at_loc != hmax_at_loc:
        hmax_at_loc = None
    return {"hmax": hmax_at_loc}
