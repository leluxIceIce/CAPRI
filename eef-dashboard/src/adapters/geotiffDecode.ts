// Browser-side GeoTIFF decode (the I/O half the pure geotiffAdapter leaves to
// the caller). Turns an uploaded .tif/.tiff file into a DecodedRaster that
// rasterToDataCube() can grid into the dashboard's DataCube.
//
// This is what makes the dashboard's analysis run over REAL ocean-colour rasters
// (Sentinel-3 OLCI, Copernicus, Earthdata tiles, …) instead of the synthetic
// sin/cos generator.

import { fromArrayBuffer } from "geotiff";
import type { DecodedRaster, GeoTiffInput } from "./geotiffAdapter";
import { VARIABLE_METADATA, type VariableName } from "../types";

/** Decode an uploaded GeoTIFF ArrayBuffer into a DecodedRaster (all bands). */
export async function decodeGeoTiff(buffer: ArrayBuffer): Promise<DecodedRaster> {
  const tiff = await fromArrayBuffer(buffer);
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();

  // readRasters() returns one flat typed array per band (samplesPerPixel),
  // each in row-major y*width + x order — exactly what DecodedRaster wants.
  const rasters = (await image.readRasters()) as unknown as ArrayLike<number>[];
  const bands: ArrayLike<number>[] = Array.from(
    { length: rasters.length },
    (_, b) => rasters[b]
  );

  if (bands.length === 0) {
    throw new Error("GeoTIFF contains no readable bands.");
  }

  // GDAL_NODATA tag (string) → number, when present, so fill pixels are skipped.
  const noDataRaw = image.getGDALNoData();
  const noData =
    noDataRaw === null || noDataRaw === undefined ? undefined : Number(noDataRaw);

  return { width, height, bands, noData: Number.isFinite(noData) ? noData : undefined };
}

/**
 * Default sequential band → variable mapping (band 0 → first variable, …),
 * capped at the number of bands actually present. Real tiles rarely carry all
 * 14 channels; the unmapped ones are zero-filled by rasterToDataCube. The UI
 * surfaces this mapping so the user can see exactly what each band became.
 */
export function defaultBandMap(bandCount: number): Record<number, VariableName> {
  const order = Object.keys(VARIABLE_METADATA) as VariableName[];
  const map: Record<number, VariableName> = {};
  const n = Math.min(bandCount, order.length);
  for (let b = 0; b < n; b++) map[b] = order[b];
  return map;
}

/** One-call convenience: uploaded file → GeoTiffInput ready for rasterToDataCube. */
export async function geoTiffFileToInput(file: File, gridSize = 20): Promise<GeoTiffInput> {
  const buffer = await file.arrayBuffer();
  const raster = await decodeGeoTiff(buffer);
  return {
    raster,
    bandMap: defaultBandMap(raster.bands.length),
    gridSize,
    timestamp: new Date().toISOString(),
  };
}
