---
title: Neural Ranking of Biological Pathways
description: Learning to rank perturbed biological pathways from gene-expression data, with an emphasis on consistency across sample sizes.
technologies: [PyTorch, R, limma, Contrastive learning]
category: Research
featured: true
repository: https://github.com/elham-cheraghi/Perturbed-Pathways
visual: pathways
order: 1
---

Biological pathway analysis helps connect changes in individual genes to broader biological processes. This research explored neural ranking of perturbed pathways without ground-truth pathway labels.

## Approach

I built an R and `limma` pipeline for gene-level differential-expression analysis across 18 GEO microarray datasets and sample-resampled subsets. A PyTorch network with a RankNet-style architecture then ranked pathways from expression profiles.

The work investigated contrastive objectives inspired by Bootstrap Your Own Latent (BYOL). The focus was on keeping rankings consistent between full and reduced datasets while distinguishing biological conditions.

## Evaluation

Evaluation used study-disjoint five-fold cross-validation and a held-out test set. The project considered both retrieval of highly ranked pathways and discrimination between conditions.

This research was supervised by Dr. Fatemeh Mansoori. The linked repository contains the project code.
