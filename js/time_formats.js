var timeFormats = {
  "showTimeFunction": {
    "24hmean": function(lastUpdate) { return moment(lastUpdate).toISOString()},
    "hmean"  : function(lastUpdate) { return moment(lastUpdate).toISOString()},
    "dmean"  : function(lastUpdate) { return moment(lastUpdate).subtract(1, 'days').toISOString()},
    "anmean" : function(lastUpdate) { return moment(lastUpdate).toISOString()},

    "19thmaxhmean": function(lastUpdate) { return moment(lastUpdate).toISOString()},
    "8hmean"      : function(lastUpdate) { return moment(lastUpdate).toISOString()},
    "max8hmean"   : function(lastUpdate) { return moment(lastUpdate).format('YYYY-MM-DD').concat('T00:00:00.000Z')},
    "maxhmean"    : function(lastUpdate) { return moment(lastUpdate).format('YYYY-MM-DD').concat('T00:00:00.000Z')},
    "excday"      : function(lastUpdate) { return moment(lastUpdate).toISOString()}
  },
  "lastUpdateFunction": {
    "24hmean": function(lastUpdate) { return moment(lastUpdate).format("dddd D MMMM YYYY, HH:mm")},
    "hmean"  : function(lastUpdate) { return moment(lastUpdate).format("dddd D MMMM YYYY, HH:mm")},
    "dmean"  : function(lastUpdate) { return moment(lastUpdate).subtract(1, 'days').format('dddd D MMMM YYYY')},
    "anmean" : function(lastUpdate) { return moment(lastUpdate).format('YYYY')},

    "19thmaxhmean"  : function(lastUpdate) { return moment(lastUpdate).format('YYYY')},
    "8hmean"        : function(lastUpdate) { return moment(lastUpdate).format('dddd D MMMM YYYY, HH:mm')},
    "max8hmean"     : function(lastUpdate) { return moment(lastUpdate).format('dddd D MMMM YYYY')},
    "maxhmean"      : function(lastUpdate) { return moment(lastUpdate).format('dddd D MMMM YYYY')},
    "excday"        : function(lastUpdate) { return moment(lastUpdate).subtract(1, 'years').format('YYYY')}
  },
  "changeDateTime": {
    "24hmean" : "hours",
    "hmean"   : "hours",
    "dmean"   : "days",
    "anmean"  : "years",

    "19thmaxhmean": "years",
    "8hmean"      : "hours",
    "max8hmean"   : "days",
    "maxhmean"    : "days",
    "excday"      : "years"
  },
  "changeDateTimeFormat": {
    "24hmean" : "dddd D MMMM YYYY, HH:mm",
    "hmean"   : "dddd D MMMM YYYY, HH:mm",
    "dmean"   : "YYYY-MM-DD",
    "anmean"  : "YYYY",

    "19thmaxhmean": "YYYY",
    "8hmean"      : "dddd D MMMM YYYY, HH:mm",
    "max8hmean"   : "dddd D MMMM YYYY",
    "maxhmean"    : "dddd D MMMM YYYY",
    "excday"      : "YYYY"
  }
};
