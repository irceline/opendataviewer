/**
 * @param timeAggregation e.g. anmean, hmean,..
 * @param dataFormat is the resolution, e.g. rio1x1, atmostreet,..
 * @returns url to get lastupdate time
 */
function getUrlToGetLastUpdate(timeAggregation,dataFormat) {
  var adaptedTimeAggregation;
  switch (timeAggregation) {
    case "19thmaxhmean":
    case "excday":
    case "anmean":
      adaptedTimeAggregation = "anmean";
      break;
    case "max8hmean":
    case "24hmean":
    case "8hmean":
    case "hmean":
      adaptedTimeAggregation = "hmean";
      break;
    case "dmean":
    default: adaptedTimeAggregation = timeAggregation;
    break;
  }

  return "https://www.irceline.be/air/time_" + adaptedTimeAggregation + "_" + dataFormat + "_json.php";
}

function getWorkspace(dataFormat) {
 var workspace;
 switch (dataFormat) {
   case "rioifdm":
   case "atmostreet":
     workspace = "rioifdm";
     break;
   case "rio1x1":
   case "rio4x4":
     workspace = "rio";
     break;
   default:
     workspace = dataFormat;
      break;
 }
 return workspace;
}

function getLegendUrl(parameters) {
  return "https://www.irceline.be/air/legend/" +
         parameters.pollutant + "_" +
         parameters.interval + "_" +
         parameters.lang.toUpperCase() + ".svg";
}

function getWmsBaseUrl() {
  return "https://geo.irceline.be/wms";
}

function getStationLayerName(parameters) {
  var nameParameters = [parameters.pollutant, parameters.interval, "station"];
  return "" + nameParameters.join("_");
}

function getInterpolatedLayerName(parameters) {
  var nameParameters = [parameters.pollutant, parameters.interval];
  if (parameters.resolution === 'rio1x1') {
    nameParameters.push('1x1');
  }
  var workspaceName = getWorkspace(parameters.resolution);
  var layerName = workspaceName + ":" + nameParameters.join("_");

  //Add region if necessary (not for Belgium and currently also not for Brussels)
  if (parameters.region === "" || parameters.region === "br") {
    return layerName;
  } else {
    return layerName + "_" + parameters.region;
  }
}
