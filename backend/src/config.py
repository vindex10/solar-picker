import dataclasses
import json
import os


@dataclasses.dataclass
class Config:
    hmax_path: str


_CFG = None


def CFG():
    global _CFG
    if _CFG is None:
        raw_cfg = os.environ.get("CFG_ENV")
        _CFG = json.loads(raw_cfg) if raw_cfg is not None else {}
        set_defaults(_CFG)
    return Config(**_CFG)


def set_defaults(config):
    if "hmax_path" not in config:
        config["hmax_path"] = "static/hmax_overall.nc"
