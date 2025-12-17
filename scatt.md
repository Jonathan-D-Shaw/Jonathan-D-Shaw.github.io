---
layout: page
title: Scattering from periodic boundaries
---

- _paper_ <a href="https://arxiv.org/abs/2310.12486" class="button primary small icon solid fa-external-link-alt">arXiv</a>
- _slides_ <a href="{{ site.baseurl }}/images/siam-nnp.pdf" class="button primary small icon solid fa-download"></a>

Periodic surfaces have long been used to manipulate wave propagation in
applications such as antennae, radars, diffraction gratings, solar cells, sonic
and photonic crystals, and in buildings like amphitheatres. Scattering from
periodic boundaries, however, is notoriously difficult to compute. Challenges
arise from:
- The _infinite extent of the domain_ (for both exterior and interior problems) and the scattering surface (in 3D) or boundary (in 2D),
- The fact that the infinite domain _cannot be truncated_ without introducing $\mathcal{O}(1)$ errors -- this is precisely because of the wave-guiding property of the surface, leading to power being transported a long way along the surface,
- If the surface is ragged, corners introduce singularities in the computation.

Here, I focus on acoustic scattering problems in 2D, and the boundary is assumed to extend to infinity in the 3rd idmension. The unknown scalar field $u$ corresponds to acoustic pressure. It is obtained by solving a partial differential equation (PDE) called the Helmholtz equation with Neumann boundary conditions (which arise because I assume the surface is sound-hard),
\\[\label{eq:helm-pde} - (\Delta + \omega^2)u = \delta_{\mathbf{x}_0}, \quad \text{in } \Omega, \\]
\\[\label{eq:helm-bc} \mathbf{n}\cdot \nabla u = 0, \quad \text{on } \partial\Omega. \\]
<!-- The geometric setup and notation is shown below, -->

I use _high-order integral equation methods_ to solve scattering problems by
periodic surfaces and tackle the above challenges. This involves rewriting the relevant PDE as a boundary integral, then discretizing the boundary to convert it to a dense linear system, which is then solved. This _reduces the dimensionality_ (and therefore computational complexity) of the problem. 


...More coming soon!
