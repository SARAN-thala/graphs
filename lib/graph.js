var graphs = {};
//----------------------------------------------------------------------------------
// UndirectedGraph
//----------------------------------------------------------------------------------

graphs.UndirectedGraph = function() {
  this.graph = {};
};

graphs.UndirectedGraph.prototype = {
  addVertex: function(vertex) {
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge: function(from, to) {
    this.graph[from].push(to);
    this.graph[to].push(from);
  },
  hasEdgeBetween: function(from, to) {
    if (this.graph[from].indexOf(to) < 0)
      return false;
    return true;
  },
  order: function() {
    return (Object.keys(this.graph)).length;
  },
  size: function() {
    var val = 0;
    for (var vertex in this.graph)
      val += this.graph[vertex].length;
    return val / 2;
  },
  pathBetween: function(from, to, visited) {
    visited = visited || [];
    if (from == to)
      return visited.concat(from);
    for (var index in this.graph[from]) {
      var nextPath = this.graph[from][index];
      if (visited.indexOf(nextPath) >= 0) {
        nextPath = this.graph[from][index + 1];
      }
      var path = this.pathBetween(nextPath, to, visited.concat(from));
      if (path.length)
        return path;
    }
    return [];
  }
};



//----------------------------------------------------------------------------------
//  DirectedGraph
//----------------------------------------------------------------------------------
graphs.DirectedGraph = function() {
  this.graph = {};
};

graphs.DirectedGraph.prototype = {
  addVertex: function(vertex) {
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge: function(from, to) {
    this.graph[from].push(to);
  },
  hasEdgeBetween: function(from, to) {
    if (this.graph[from].indexOf(to) < 0)
      return false;
    return true;
  },
  order: function(vertex) {
    return Object.keys(this.graph).length;
  },
  size: function() {
    var val = 0;
    for (var vertex in this.graph)
      val += this.graph[vertex].length;
    return val;
  },
  pathBetween: function(from, to, visited) {
    visited = visited || [];
    if (from == to)
      return visited.concat(from);
    for (var index in this.graph[from]) {
      var nextPath = this.graph[from][index];
      if (visited.indexOf(nextPath) >= 0) {
        nextPath = this.graph[from][index + 1];
      }
      var path = this.pathBetween(nextPath, to, visited.concat(from));
      if (path.length)
        return path;
    }
    return [];
  }
};

module.exports = graphs;