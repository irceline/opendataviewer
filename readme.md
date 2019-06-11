# Instructions

The aim of the `opendataviewer` is to facilitate in context downloads of open data concerning air pollution.

Public demo:
[https://www.irceline.be/opendataviewer/index.html](https://www.irceline.be/opendataviewer/index.html?lang=en&pollutant=no2&resolution=rioifdm&interval=hmean&lang=en)

Clone or download and run locally (open [index.html](./index.html) in a browser)

## URL-parameters

### `lang`
Translating all controls, labels and downloads
* URL-parameter: `lang`
* possible values: `en` | `nl` | `fr` | `de`
* default value: `en`

### `pollutant`
The different pollutants being modeled and measured
* URL-parameter: `pollutant`
* possible values: `bc` | `no2` | `o3` | `pm10` | `pm25` | `so2`
* default value: `no2`

### `interval`
The different time aggregations of the pollutants
* URL-parameter: `interval`
* possible values: `hmean` | `8hmean` | `24hmean` | `dmean` | `anmean`
* default value: `hmean`

### `resolution`
The resolution of the interpolated layer in the map
* URL-parameter: `resolution`
* possible values: `rio4x4` | `rio1x1` | `rioifdm` | `atmostreet`
* default value: The highest available resolution for a specific combination of `pollutant` and `interval`

### `region`
* URL-parameter: `region`
* possible values: ` ` (Belgium) | `br` (Brussels) | `vl` (Flanders)| `wl` (Wallonia)
* default value: ` `

### `zoom`
Zoom level
* default value: 7

Not yet fully implemented

### `lat`
* default value: 50.51

Not yet fully implemented

### `long`
* default value: 4.5

Not yet fully implemented

### `no_stations`
Display stations on top of modeled layer or not
* URL-parameter: `no_stations`
* possible values: `true` | `false`
* default value: `false`


All data being displayed in this viewer is published under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
