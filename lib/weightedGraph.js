var graphs = {};

graphs.WeightedGraph = function() {
  this.graph = {};
};

var createParentPath = function(vertices) {
  var path = {};
  for (var i = 0; i < vertices.length; i++) {
    path[vertices[i]] = '';
  };
  return path;
};

var createDistance = function(vertices) {
  var path = {};
  for (var i = 0; i < vertices.length; i++) {
    path[vertices[i]] = Number.POSITIVE_INFINITY;
  };
  return path;
};

var selectVertex = function(vertices, sortedDistance) {
  for (var index in sortedDistance) {
    if (vertices.indexOf(sortedDistance[index]) >= 0)
      return sortedDistance[index];
  }
};

var removeVtx = function(vertices, minVtx) {
  vertices.filter(function(vertex, i) {
    if (vertex == minVtx)
      return vertices.splice(i, 1);
  });
  return vertices;
};

var findEdgesOf = function(from, allEdges) {
  return allEdges.filter(function(each) {
    return each.from == from;
  });
};

var findPath = function(source, from, to, paths) {
  paths = paths || [];
  if (from == to)
    return paths.concat(from);
  if (paths.indexOf(to) == -1) {
    var vertex = source[to];
    var path = findPath(source, from, vertex, paths.concat(to));
  }
  return path;
};

graphs.Edge = function(name, from, to, weight) {
  this.name = name;
  this.from = from;
  this.to = to;
  this.weight = weight;
};

graphs.WeightedGraph.prototype = {
  addVertex: function(vertex) {
    this.graph[vertex] = this.graph[vertex] || {};
  },
  addEdge: function(edge) {
    this.graph[edge.from][edge.to] = this.graph[edge.from][edge.to] || edge;
  },
  shortestPath: function(from, to) {
    var vertices = Object.keys(this.graph);
    var graph = this.graph;
    var distance = createDistance(vertices);
    var parentPath = createParentPath(vertices);
    distance[from] = 0;
    parentPath[from] = from;
    var edges = [];
    var paths = [];
    vertices.map(function(vertex) {
      return (Object.keys(graph[vertex]).forEach(function(adj) {
        edges.push(graph[vertex][adj])
      }));
    });
    while (vertices.length > 0) {
      var minVtx = vertices.reduce(function(v1, v2) {
        return distance[v1] <= distance[v2] ? v1 : v2;
      });
      vertices = removeVtx(vertices, minVtx);
      var adjVtx = findEdgesOf(minVtx, edges);
      adjVtx.forEach(function(adjV) {
        if (distance[adjV.to] > distance[minVtx] + adjV.weight) {
          distance[adjV.to] = distance[minVtx] + adjV.weight;
          parentPath[adjV.to] = minVtx;
        }
      });
    }
    var path = findPath(parentPath, from, to).reverse();
    edges.filter(function(eachEdge) {
      path.forEach(function(v, i) {
        if (eachEdge.from == v && eachEdge.to == path[i + 1])
          paths.push(eachEdge);
      })
    });
    return paths;
  }
};

module.exports = graphs;