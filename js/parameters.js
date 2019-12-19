/**
 * All Possible url parameters
 *
 * lat : center latitude of map
 * long: center longitude of map
 * zoom: starting zoom level
 * lang: language
 * pollutant: pollution parameter e.g.: bc, no2,...
 * interval: time granularity
 * resolution: resolution
 * region: Belgium, Flanders,..
 *
 * @returns {string[]} all parameters
 */
function getAllParameters() {
  return ["lat", "long", "zoom", "lang", "pollutant", "no_stations", "interval", "resolution","region"];
}

/**
 * Get all Possible parameter values for limited parameters
 * There are no hard limits for lat, long, zoom.
 *
 * @returns {{no_stations: string[], interval: string[], lang: string[], resolution: string[], pollutant: string[]}}
 */
function getAllParameterValues(){
  return {
    lang: ["en","nl","fr","de"],
    pollutant: ["bc","no2","o3","pm10","pm25","so2"],
    no_stations: ["true","false"],
    interval: ["hmean","24hmean","8hmean","maxhmean","max8hmean","dmean","anmean","19thmaxhmean"],
    resolution: ["atmostreet","rioifdm","rio4x4","rio1x1"],
    region:["","vl","br","wl"],
    zoom:[],
  }
}

/**
 * Get all default parameters.
 */
function getDefaultParameters(){
  return {
      lat: 50.51,
      long: 4.5,
      zoom: 7,
      lang: "en",
      pollutant: "no2",
      no_stations: "false",
      interval: "hmean",
      resolution: "rioifdm",
      region: ""
  }
}

function getProvidedUrlParameters() {
  var paramRegEx = /[?&]+([^=&]+)=([^&]*)/gi;
  var providedParamsTemp = {};
  window.location.href.replace(paramRegEx, function(m, key, value) {
    providedParamsTemp[key] = value;
  });
  return providedParamsTemp;
}

function getDownloadFormats() {
  return ["csv","json","shp"];
}

function createFormat(formatValue, urlOutputFormatValue, fileFormatValue, downloadFormatValue) {
  return {
    format : formatValue,
    urlOutputFormat : urlOutputFormatValue,
    fileFormat: fileFormatValue,
    downloadFormat : downloadFormatValue
  }
}

//The format is different depending on which part of the app it asks
function getSideFormats(downloadFormat) {
  switch (downloadFormat) {
  case "json":
    return createFormat("json","application/json",
                      "json","json");
  case "shp" :
    return createFormat("shp","shape-zip","zip","zip");
  case "csv" :
  default : //csv
    return createFormat("csv", "csv", "csv", "text/csv");
  }
}

function getLanguageSpecificParameters(language) {
  switch(language) {
    case "en": return langEn;
    case "nl": return langNl;
    case "fr": return langFr;
    case "de": return langDe;
    default: return langEn;
  }
}

function getRegionBounds(region) {
  switch (region) {
    // Flanders
    case "vl": return [[50.688,2.545],[51.505,5.911]];
    // Wallonia
    case "wl": return [[49.497,2.842],[50.812,6.408]];
    // Belgium
    case "br":
    case "":
    default: return [[49.5, 3.5], [51.5, 5.5]];
  }
}

function getDefaultLastUpdateParameters(){
  return {
    lastupdate: moment().format('YYYY'),
    maxZoom: 19,
    cql_filter: {},
    interpolated_cql_filter: function() {
      if (this.cql_filter.hasOwnProperty("rio_version")) {
        return "rio_version = \'" + this.cql_filter.rio_version + "\'";
      }
      return "";
    },
    station_cql_filter: function() {
      if (this.cql_filter.hasOwnProperty("network")) {
        return "network = '" + this.cql_filter.network + "'";
      }
      return "";
    }
  }
}

/**
 * Check if providedParameter keys exist and filter out the non-existing ones.
 *
 * @param providedParameters with existing keys
 */
function filterValidProvidedParamKeys(providedParameters) {
  var providedParamResult = {};
  var allParams = getAllParameters();

  for (var property in providedParameters) {
    if (providedParameters.hasOwnProperty(property)) {
      if (isInArray(property, allParams)) {
        providedParamResult[property] = providedParameters[property];
      }
    }
  }
  return providedParamResult;
}

/**
 * Check if the providedParameter values are valid.
 *
 * @param providedParameters
 */
function filterValidProvidedParamValues(providedParameters) {
  var providedParamResult = {};
  var allParamValues = getAllParameterValues();

  for (var property in providedParameters) {
    if (providedParameters.hasOwnProperty(property)) {
      var providedValue = providedParameters[property];

      // Lat, Long & Zoom are valid if they are numbers
      if (property === 'lat' || property === 'long' || property === 'zoom') {
        if (typeof providedValue === 'number') {
          providedParamResult[property] = providedValue;
        }
      } else {

        // all other properties are valid if they exist in the possible values
        if (typeof providedValue === 'string') {
          providedValue = providedValue.toLowerCase();
        }
        var allPropertyValues = allParamValues[property];
        if (isInArray(providedValue, allPropertyValues)) {
          providedParamResult[property] = providedValue;
        }
      }
    }
  }
  return providedParamResult;
}

/**
 * Filter out the invalid provided parameters
 * Add the valid provided parameters to the general parameters.
 * Return general parameters
 */
function setParams(providedParameters) {
  var resultingParameters = getDefaultParameters();

  var providedParamsWithValidKeys = filterValidProvidedParamKeys(providedParameters);
  var validProvidedParams = filterValidProvidedParamValues(providedParamsWithValidKeys);

  for (var property in validProvidedParams) {
    if (validProvidedParams.hasOwnProperty(property)) {
      resultingParameters[property] = validProvidedParams[property];
    }
  }
  return resultingParameters;
}

function setLastUpdateParams(providedLastUpdateParameters) {
  var lastUpdateParamResult = getDefaultLastUpdateParameters();
  if (providedLastUpdateParameters.hasOwnProperty("lastupdate")) {
    lastUpdateParamResult.lastupdate = providedLastUpdateParameters["lastupdate"];
  }
  if (providedLastUpdateParameters.hasOwnProperty("maxZoom")) {
    lastUpdateParamResult.maxZoom = providedLastUpdateParameters["maxZoom"];
  }
  if (providedLastUpdateParameters.hasOwnProperty("cql_filter")) {
    var providedCqlFilter = providedLastUpdateParameters.cql_filter;
    if (providedCqlFilter.hasOwnProperty("rio_version")) {
      lastUpdateParamResult.cql_filter.rio_version = providedCqlFilter.rio_version;
    }
    if (providedCqlFilter.hasOwnProperty("network")) {
      lastUpdateParamResult.cql_filter.network = providedCqlFilter.network;
    }
  }
  return lastUpdateParamResult;
}
