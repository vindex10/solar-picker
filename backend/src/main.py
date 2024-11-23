from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model.hmax import HMAX

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origin_regex=".*")


@app.get("/hmax")
async def hmax(lat: float, lon: float):
    hmax_at_loc = float(HMAX().sel(latitude=lat, longitude=lon, method="nearest").hmax.data)
    return {"hmax": hmax_at_loc}
