var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(3000);

app.use(express.static("public"));

console.log("my socket server is running");

var io = socket(server);





var http = require("https");
const fetch = require("node-fetch");

var options = {
  method: "GET",
  hostname: "transloc-api-1-2.p.rapidapi.com",
  port: null,
  path: "/routes.json?callback=call&agencies=48",
  headers: {
    "x-rapidapi-host": "transloc-api-1-2.p.rapidapi.com",
    "x-rapidapi-key": "b6945a4bddmshf6333f8d999ce6ep1e9e82jsn37c38839a439",
    useQueryString: true,
  },
};

var routesName = [];
var routesID = [];
var routesActive = [];

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var bodyJson = JSON.parse(body);
    //console.log(bodyJson.data["48"]);
    var data = bodyJson.data["48"];
    //console.log(data);
    data.forEach((route) => {
      // Log each movie's title
      //console.log(route.long_name);
      routesName.push(route.long_name);
      routesID.push(route.route_id);
      routesActive.push(route.is_active);

      //prints to console
      //console.log(routesName);
    });

    //prints to console
    //console.log(routesName);
  });

  //DOES NOT LOG APPENDED LIST
  //console.log(routesName);
});

req.end();
var http = require("https");
const { isRegExp } = require("util");

var options = {
  method: "GET",
  hostname: "transloc-api-1-2.p.rapidapi.com",
  port: null,
  path: "/stops.json?callback=call&agencies=48",
  headers: {
    "x-rapidapi-host": "transloc-api-1-2.p.rapidapi.com",
    "x-rapidapi-key": "b6945a4bddmshf6333f8d999ce6ep1e9e82jsn37c38839a439",
    useQueryString: true,
  },
};

stopNames = [];
stopLocationslat = [];
stopLocationslng = [];
stopRoutes = [];

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var bodyStops = Buffer.concat(chunks);
    var bodyStopsJson = JSON.parse(bodyStops);
    //console.log(bodyJson.data["48"]);
    var dataStops = bodyStopsJson.data;
    //console.log(data);
    dataStops.forEach((stop) => {
      // Log each movie's title
      //console.log(route.long_name);
      stopNames.push(stop.name);
      stopLocationslat.push(stop.location.lat);
      stopLocationslng.push(stop.location.lng);
      stopRoutes.push(stop.routes);

      //prints to console
      //console.log(routesName);
    });

    //prints to console
    //console.log(routesName);
  });

  //DOES NOT LOG APPENDED LIST
  //console.log(routesName);
});

req.end();

//IDEALLY WANT TO PRINT HERE
//returns empty list
//array indeces not saving globally
//console.log(routesName); */

var activerouteIds = {};
var stopActive = [];

function geoFormat(latitude, longitude) {
  var locationFormatted = latitude.toString() + "," + longitude.toString();
  return locationFormatted;
}

var geoFormatted = [];

var category = "";
var api = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
var apiKey = "&key=AIzaSyBt_dTsA7oBBLPlLPhSP4TMSCYxhuscxwE";
var type = "";
var radius = "&radius=100";
var opennow = "&open_now";
var url = "";

var stopLocations = [];
var activeRoutes = 0;
var places = [];

async function getData(url) {
  const response = await fetch(url);

  return response.json();
}

var locations = [];

async function findPlaces(geoCor, category) {
  url =
    api +
    "location=" +
    geoCor +
    radius +
    opennow +
    "&type=" +
    category +
    apiKey;
  let settings = { method: "Get" };

  const data = await getData(url);
  places = data.results;
  //console.log(places);
  for (let i = 0; i < places.length; i++) {
    var item = places[i];
    //console.log(places[i]);
    if (item.rating && item.rating >= 4.0) {
      locations.push(item.name);
    }
  }

  //console.log(locations);
  return locations;
  /*   fetch(url)
    .then((response) => response.json())
    .then((result) => {
      
      return locations;
    }); */
  //.then((locations) => console.log(locations));
}

async function main(choice) {
  
  var catClient;

  function newConnection(socket) {
    
    socket.on("choice", msg);

    function msg(data) {
      //console.log(data);
      data = catClient;
    }
  }

  for (let i = 0; i < stopNames.length; i++) {
    if (stopActive[i]) {
      stopLocations.push(await findPlaces(geoFormatted[i], choice));
    } else {
      stopLocations.push([]);
    }
  }

  function cleaner(marr) {
    var carr = [];
    var rarr = [];
    var j = -1;

    for (var i = 0, l = marr.length; i < l; i++) {
      if (carr[marr[i][1]] !== true) {
        carr[marr[i][1]] = true;
        rarr[++j] = marr[i];
      }
    }

    return rarr;
  }

  stopLocationsC = cleaner(stopLocations);

  
   var querySpots = [];
   var queryWays = [];
   var queryStops = [];
  

  for (let i = 0; i < stopLocationsC.length; i++) {
    if (stopLocationsC[i]) {
      for (let spot of stopLocationsC[i]) {
        console.log(spot);
        querySpots.push(spot);
        for (let ways of stopRoutes[i]) {
          if (activerouteIds[ways]) {
            console.log("Use the " + routesName[routesID.indexOf(ways)]);
            queryWays.push(routesName[routesID.indexOf(ways)]);
          }
        }
        console.log("Get off at stop " + stopNames[i]);
        queryStops.push(stopNames[i]);
        console.log("");
      }
    }
  }

  return querySpots;
  //console.log(stopLocations);
}

setTimeout(function () {
  /* console.log("Global Route Names");
  console.log(routesName);
  console.log(stopNames); */

  for (let i = 0; i < routesID.length; i++) {
    activerouteIds[routesID[i]] = routesActive[i];
  }

  for (let i = 0; i < stopRoutes.length; i++) {
    activeRoutes = 0;
    for (let j = 0; j < stopRoutes[i].length; j++) {
      if (activerouteIds[stopRoutes[i][j]]) {
        activeRoutes += 1;
        //console.log(activeRoutes);
      }
    }

    if (activeRoutes >= 1) {
      stopActive.push(true);
    } else stopActive.push(false);
  }

  for (let i = 0; i < stopLocationslat.length; i++) {
    geoFormatted.push(geoFormat(stopLocationslat[i], stopLocationslng[i]));
  }
  


  function newConnection(socket) {
    console.log("New connection");
    console.log(socket.id);

    socket.on("choice", msg);

    function msg(data) {
      //console.log(data);
      console.log(data);
     
      socket.emit("placesdata", main(data));
    }
    //send the data to client
  }

  io.sockets.on("connection", newConnection);


  

  //tests to see if activeRouteIds printed
  //console.log(activerouteIds);

  //tests to see if stopActive worked
  //console.log(stopActive);

  //tests geoFormat of coordinates
  //console.log(geoFormatted);
}, 500);
