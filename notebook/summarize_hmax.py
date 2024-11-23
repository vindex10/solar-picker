import xarray as xr
import argparse


def main(input_file, output_file):
    d = xr.load_dataset(input_file)
    hmax_overall = d["hmax"].max(dim="time")
    hmax_overall.to_netcdf(output_file, format="NETCDF4")


def parse_args(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("input_file", help="Input netcdf file.")
    parser.add_argument(
        "--output-file", default="hmax_overall.nc", help="Output file name."
    )
    parsed = parser.parse_args(argv)
    return (parsed.input_file, parsed.output_file)


if __name__ == "__main__":
    main(*parse_args())
