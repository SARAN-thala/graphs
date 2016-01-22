var graphs = {};


graphs.UndirectedGraph = function() {
  this.graph = {};
};

graphs.UndirectedGraph.prototype = {
  addVertex: function(vertex) {
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge: function(from, to) {
    this.graph[from].push(to);
  },
  hasEdgeBetween: function(from, to) {
    return this.graph[from].indexOf(to) || this.graph[to].indexOf(from);
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
    // console.log(this.graph[from].indexOf(to));
    if (this.graph[from].indexOf(to) == 0)
      return true;
    return false;
  }
}

module.exports = graphs;