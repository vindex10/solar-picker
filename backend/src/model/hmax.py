import xarray as xr

from config import CFG

_HMAX = None


def HMAX() -> xr.Dataset:
    global _HMAX
    if _HMAX is None:
        _HMAX = xr.load_dataset(CFG().hmax_path)
    return _HMAX
