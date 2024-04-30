function dijkstra(graph, start) {
  // Object to store the shortest path distance from start to each node
  const distances = {};
  // Object to store whether a vertex has been visited
  const visited = {};
  // Priority queue to select the vertex with the smallest distance
  const priorityQueue = new PriorityQueue();

  // Initialize distances and priority queue
  for (const vertex in graph) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      priorityQueue.enqueue(vertex, distances[vertex]);
      visited[vertex] = false;
  }

  // Main loop: continue while there are vertices left in the priority queue
  while (!priorityQueue.isEmpty()) {
      // Get the vertex with the smallest distance (not yet visited)
      const { element: currentVertex } = priorityQueue.dequeue();

      // Marked as visited vertex
      visited[currentVertex] = true;

      // Update distances for adjacent vertices
      for (const neighbor in graph[currentVertex]) {
          if (!visited[neighbor]) {
              // Calculate the distance to the neighbor
              const newDistance = distances[currentVertex] + graph[currentVertex][neighbor];

              // Only update if the new distance is smaller
              if (newDistance < distances[neighbor]) {
                  distances[neighbor] = newDistance;
                  priorityQueue.updatePriority(neighbor, newDistance);
              }
          }
      }
  }

  return distances;
}

class PriorityQueue {
  constructor() {
      this.items = [];
  }

  enqueue(element, priority) {
      const queueElement = { element, priority };
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
          if (queueElement.priority < this.items[i].priority) {
              this.items.splice(i, 0, queueElement);
              added = true;
              break;
          }
      }
      if (!added) {
          this.items.push(queueElement);
      }
  }

  dequeue() {
      return this.items.shift();
  }

  isEmpty() {
      return this.items.length === 0;
  }

  updatePriority(element, newPriority) {
      // Remove the item
      for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].element === element) {
              this.items.splice(i, 1);
              break;
          }
      }
      // Reinsert with new priority
      this.enqueue(element, newPriority);
  }
}


const graph = {
 'A': { 'B': 4, 'C': 2 },
 'B': { 'A': 4, 'C': 5, 'D': 10 },
 'C': { 'A': 2, 'B': 5, 'D': 3 },
 'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
