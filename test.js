
const airports = [
  {
    start: "ISB",
    end: "LHR",
    cost: 1000,
  },
  {
    start: "LHR",
    end: "NYC",
    cost: 750,
  },
  {
    start: "CBS",
    end: "NYC",
    cost: 775,
  },
  {
    start: "ISB",
    end: "CBS",
    cost: 575,
  },
  {
    start: "CBS",
    end: "GRC",
    cost: 731,
  },
  {
    start: "NYC",
    end: "GRC",
    cost: 459,
  },
];
function shortestRoute(start, end) {
  var dictionary = {};
  dictionary[start] = { cost: 0, path: start };
  airports
    .filter(function (part) {
      return part.start == start || part.end == start;
    })
    .forEach(function (el, i) {
      if (dictionary[el.end] === void 0) {
        dictionary[el.end] = { cost: el.cost, path: [start , el.end] };
      } else if (dictionary[el.end].cost > el.cost) {
        dictionary[el.end] = { cost: el.cost, path: [start , el.end]};
      }
    });
    console.log(dictionary)
  while (dictionary[end] === void 0) {
    for (var key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        var closed = dictionary[key];
        airports
          .filter(function (part) {
            return (
              part.start == key ||
              part.end == key ||
              part.start == key ||
              part.end == key
            );
          })
          .forEach(function (el, i) {
            var c = el.cost + closed.cost;
            //console.log(el.end)
            if (dictionary[el.end] === void 0) {
              dictionary[el.end] = { cost: c, path: [closed.path , el.end ]};
            } else if (dictionary[el.end].cost > c) {
              dictionary[el.end] = { cost: c, path: [closed.path , el.end ]};
            }
            if (dictionary[el.start] === void 0) {
              dictionary[el.start] = { cost: c, path: [closed.path , el.end ] };
            } else if (dictionary[el.start].cost > c) {
              dictionary[el.start] = { cost: c, path: [closed.path , el.end ] };
            }
          });
      }
    }
  }
  return dictionary[end];
}

var path = shortestRoute("ISB", "GRC");
console.log(path);
