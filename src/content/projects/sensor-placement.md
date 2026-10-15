---
title: Sensor Placement with Local Search
description: Exploring how local and evolutionary search balance coverage, sensor count, and overlap on obstacle-filled maps.
technologies: [Genetic algorithms, Simulated annealing, Hill climbing, Beam search]
category: Optimization
featured: true
repository: https://github.com/elham-cheraghi/AI-Projects/tree/main/AI26-PRJ2
visual: sensors
order: 3
---

Placing sensors is a trade-off: more sensors may improve coverage, but can also add unnecessary overlap. This project compares search strategies under a shared objective on grid maps with obstacles.

## Approach

I implemented hill climbing with restarts, simulated annealing, a genetic algorithm, and beam search. Each method optimized the same objective, balancing target coverage, sensor count, and coverage overlap.

## Comparison

I benchmarked all four methods reproducibly across seven maps. Using the same objective and map set made it possible to compare their behavior under the same constraints.

The project brings together local optimization and evolutionary computation, two of my research interests.
