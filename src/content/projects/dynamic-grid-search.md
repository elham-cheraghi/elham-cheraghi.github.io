---
title: Search in a Dynamic Grid World
description: Comparing graph-search strategies in a multi-target world with weighted terrain, enemies, weapons, and time-dependent state.
technologies: [A*, Uniform-cost search, Dijkstra, Graph algorithms]
category: Artificial Intelligence
featured: true
repository: https://github.com/elham-cheraghi/AI-Projects/tree/main/AI26-PRJ1
visual: search
order: 2
---

Finding a path becomes more demanding when the world changes over time and the route must visit several targets. This project models that richer search problem rather than a single start-to-goal maze.

## Approach

I implemented breadth-first search, depth-limited and iterative-deepening search, uniform-cost search, and A*. States account for weighted terrain, enemies, weapons, and time-dependent conditions.

For A*, I designed a cached heuristic using Dijkstra distances and a minimum spanning tree. The heuristic retained the optimal path cost found by uniform-cost search while reducing the number of expanded states on the project’s medium benchmark.

## Focus

The project explores how a useful problem-specific heuristic can make optimal search more practical. The repository includes the implementation and the original project context.
