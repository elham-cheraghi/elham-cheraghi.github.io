---
title: Logic-Based Minesweeper Agent
description: A rule-based agent combining logical inference with a risk-based fallback when the available clues are ambiguous.
technologies: [Python, PyGame, PyDatalog, Logical inference]
category: Artificial Intelligence
featured: false
repository: https://github.com/elham-cheraghi/AI-Projects/tree/main/AI26-PRJ5
visual: logic
order: 4
---

Minesweeper is a compact setting for exploring what an agent can infer from partial information. This project combines explicit logical rules with a fallback for positions where the clues do not determine a safe move.

## Approach

I built the agent in Python with PyGame and PyDatalog. Safety and danger rules identify cells that can be resolved from known clues, while frontier subset inference adds deductions across overlapping clue neighborhoods.

When deterministic inference is insufficient, the agent uses a risk-based fallback. Evaluation included deterministic boards at several sizes, including a 3,600-cell board.

The source repository includes the agent and the project setup.
