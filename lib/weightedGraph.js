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
  return minVtx.filter(function(vertex) {
    return vertex != vertices;
  });
};

var findPath = function(source, from, to, paths) {
  paths = paths || [];
  if (source[to] == to)
    return paths.reverse();
  paths.push(source[to]);
  return findPath(source, from, source[to].from, paths);
};

var generateEdges = function(graph) {
  var edges = [];
  for (var index in graph) {
    var vertex = graph[index];
    for (var i = 0; i < vertex.length; i++) {
      var edge = vertex[i];
      if (vertex[i].from == index)
        edges.push(edge);
    }
  }
  return edges;
}

graphs.Edge = function(name, from, to, weight) {
  this.name = name;
  this.from = from;
  this.to = to;
  this.weight = weight;
};

graphs.WeightedGraph.prototype = {
  addVertex: function(vertex) {
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge: function(edge) {
    this.graph[edge.from].push(edge);
  },
  shortestPath: function(from, to) {
    var vertices = Object.keys(this.graph);
    var orderedEdges = generateEdges(this.graph);
    var distance = createDistance(vertices);
    var parentPath = createParentPath(vertices);
    distance[from] = 0;
    parentPath[from] = from;
    for (var i = 0; i < vertices.length; i++) {
      var sortedDistance = vertices.sort(function(v1, v2) {
        return distance[v1] - distance[v2];
      });
      var checkingVertex = selectVertex(vertices, sortedDistance);
      orderedEdges.forEach(function(edge) {
        var newDistance = distance[checkingVertex] + edge.weight;
        if (distance[edge.to] > newDistance) {
          distance[edge.to] = newDistance;
          parentPath[edge.to] = edge;
        }
      });
      var newSetVtx = removeVtx(checkingVertex, vertices);
    }
    var path = findPath(parentPath, from, to)
    return path;
  }
};

module.exports = graphs;