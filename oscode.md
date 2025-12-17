---
layout: page
title: Frequency-independent solvers for oscillatory ODEs
---


#### Contents
1. Introduction 
2. [`oscode` - fixed order](#oscode)
3. [`riccati` - arbitrarily high order](#riccati)

#### 1. Introduction

The methods described here were developed to solve second order, linear, homogeneous ODEs, i.e. those of the form
\\[\label{eq:osc} u'' + 2\gamma(t)u'(t) + \omega^2(t)u(t) = 0, \quad t \in [t_0, t_1]. \\]
I generally work with initial value problems (IVPs) with initial conditions
\\[ u(t_0) = u_0, \quad u'(t_0) = u'_0, \\]
but the methods may be used to solve boundary value problems (BVPs) as well.
I assume that $\omega(t)$ and $\gamma(t)$ are real-valued functions and $\omega(t) > 0$, but $u$ may be complex.
This equation describes a generalized harmonic oscillator with time-dependent frequency $\omega(t)$ and friction term $\gamma(t)$. Depending on the magnitude of $\omega$ and $\gamma$, the solution oscillates rapidly or varies smoothly, sometimes switching back-and-forth between the two behaviors within the solution range $[t_0, t_1]$. For example, the analytic solution of
\\[\label{eq:burst} u'' + \frac{100}{(1+t^2)^2}u(t) = 0, \quad t \in [t_0, t_1] \\]
undergoes a burst of oscillations around $t = 0$, as plotted below:
<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/burst.jpg" alt="" height='400'></a>
</p>
If one were to solve (\ref{eq:burst}) with any polynomial-based numerical method, (e.g. Runge--Kutta, linear multistep, spectral, simplectic integrators), the method would need to use a few discretization nodes _per wavelength of oscillations_, meaning that its computational effort would scale as $\mathcal{O}(\omega)$. 

This is _prohibitively slow_ at large $\omega$! _What to do?_ The general strategy behind my solvers is:

1. _Use a more suitable basis._ Both methods described below use
_asymptotic_ expansions designed for oscillatory functions to approximate
$u(t)$ in regions where it is highly oscillatory, which allow for much larger
stepsizes for the same number of discretization nodes (function
evaluations/computational effort) than a polynomial approximation. These asymptotic expansions, however, only yield good approximations of $u$ if $\omega$, $\gamma$ are sufficiently smooth and $\omega$ is large. Therefore,
2. _Switch bases depending on how $u$ behaves._ My methods use the asymptotic expansions when $\omega$ is sufficiently large, but automatically switch over to a polynomial-based solver when $u$ is not so oscillatory.
3. _Adapt._ Update the stepsize/discretization length to keep the _local error estimate_ below some user-defined tolerance. 

_Why should one care?_ Equations like (\ref{eq:osc}) are ubiquitous in physics
and mathematics, and at the time of writing the papers listed below, no
numerical method was able to deal with the solution exhibiting both highly
oscillatory and nonoscillatory within the $t$-range of interest. I developed
these solvers for use in primordial cosmology, but they found applications in
fluid dynamics, astroparticle physics, quantum mechanics, and special function
evaluation.

#### 2.  oscode - fast numerical solution of **osc**illatory **o**rdinary **d**ifferential **e**quations <a name="oscode"></a>

- developed in collaboration with Will Handley, Mike Hobson, and Anthony Lasenby (University of Cambridge, UK)
- _paper_ <a href="http://dx.doi.org/10.1103/PhysRevResearch.2.013030" class="button primary small icon solid fa-external-link-alt">DOI</a> <a href="https://arxiv.org/abs/1906.01421" class="button primary small icon solid fa-external-link-alt">arXiv</a>
- _slides_ <a href="https://fruzsinaagocs.github.io/images/IoA_Wednesday_talk.pdf" class="button primary small icon solid fa-download"></a> from a recent talk
- _video summary_ <a href="https://www.youtube.com/watch?v=u7E82j8UIM4" class="button primary small icon solid fa-play"></a>
- _open-source code_ (in C++ and Python) <a href="https://github.com/fruzsinaagocs/oscode" class="button primary small icon solid fa-external-link-alt">GitHub</a>
and its _documentation_ <a href="https://oscode.readthedocs.io/en/latest/introduction.html" class="button primary small icon solid fa-external-link-alt"></a>


`oscode` switches between a 4th order Runge--Kutta method and a time-stepper
based on the Wentzel--Kramers--Brillouin expansion (abbreviated WKB, with a
fixed number of terms retained in the expansion) to advance the solution. At
this order, the method is most efficient if the required (relative) accuracy is
4-6 digits.

The WKB expansion is widely used in quantum mechanics to approximate
steady-state wavefunctions in 1D potential wells, but has largely been applied
analytically ("by hand"). This works fine if it only needs to be done once, but
if an oscillatory ODE needs to be solved repeatedly with different
coefficients, it quickly becomes unfeasible.

In cosmological inference, this is exactly what happens. In a Markov-chain
Monte Carlo run, each point in parameter space defines a different family of
ODEs, which need to be solved in order to compute a quantity called the
_primordial power spectrum_. The ODE, called the Mukhanov--Sasaki equation,
controls the evolution of quantum-scale perturbations during cosmic inflation.
We later observe these fluctuations as anisotropies in the Cosmic Microwave
Backgound (CMB), from which we can therefore make inference about the overall
structure and evolution of the Universe. In a typical MCMC run (provided the
primordial power spectrum needs to be evaluated numerically), $10^5$-$10^6$ spectra are calculated, which means around $10^8$-$10^9$ oscillatory ODE solves. Each oscillatory ODE
solve can therefore at most take around a millisecond. 

With `oscode` this is possible: the primordial spectra below
belong to closed universes with increasing initial curvature - it would take
**$\geq $** **30 minutes** to compute one of these on my laptop with a Runge--Kutta method from `scipy`, and
takes about **1 s** with `oscode` at the same tolerance.

<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/spectra.gif" alt="" height='400'></a>
</p>

More uses of `oscode` in math and physics:
- Cosmology of closed universes:
    - _Primordial power spectra for curved inflating universes_ <a href="https://arxiv.org/abs/1907.08524" class="button primary small icon solid fa-external-link-alt">arXiv</a>
    - _Finite inflation in curved space_ <a href="https://arxiv.org/abs/2205.07374" class="button primary small icon solid fa-external-link-alt">arXiv</a>
- _On physical optics approximation of stratified shear flows with eddy viscosity_ <a href="https://arxiv.org/abs/1908.05457" class="button primary small icon solid fa-external-link-alt">arXiv</a>
- Some _fast solvers for the 1D stationary Schroedinger equation_ that follow a similar strategy, but are higher order, have been developed, e.g. <a href="https://arxiv.org/abs/2102.03107" class="button primary small icon solid fa-external-link-alt">arXiv</a>



#### 3. riccati: arbitrarily high-order solver for oscillatory ODEs <a name="riccati"></a>

- work with Alex Barnett (Flatiron Institute)
- _paper_ <a href="https://arxiv.org/abs/2212.06924" class="button primary small icon solid fa-external-link-alt">arXiv</a>
- _slides_ <a href="{{ site.baseurl }}/images/riccati-slides.pdf" class="button primary small icon solid fa-download"></a>
- _code repository_ <a href="https://github.com/fruzsinaagocs/riccati" class="button primary small icon solid fa-external-link-alt">GitHub</a> and _documentation_ <a href="https://riccati.readthedocs.io/en/latest/" class="button primary small icon solid fa-external-link-alt"></a>

`riccati` builds on some of the ideas behind `oscode`, but the underlying
methods it chooses between (in oscillatory/nonoscillatory regions of the
solution) are different and, importantly, _arbitrarily high order_. This
ensures that `riccati` remains efficient even if 10-12 digits of accuracy are
required.

In oscillatory regions, we introduced a novel asymptotic expansion, which we
named adaptive Riccati defect correction (ARDC). Its main advantage lies with
its simplicity: not only can the expansion be computed recursively, the
recursion formula only depends on the previous term (as opposed to all previous
terms for the WKB approximation). It can be computed numerically, without
writing out analytic formulae. This also allowed us to _prove_ that the
expansion reduces the residual (~error) geometrically for the first
$\mathcal{O}(\omega)$ iterations, and put an upper bound on its error.

In regions where the solution is slowly varying, `riccati` switches to
_spectral collocation_ based on Chebyshev polynomials. The degree of
polynomials used can be set by the user.

Below is the numerical solution of the Airy equation, $u'' + ut = 0$ from $t = 1$ to $t = 10^8$, computed by `riccati`. I asked for 12 digits of accuracy, which it achieves initially, until the condition number of the problem increases and no longer allows this. The blue dashed line indicates an estimate of the best accuracy allowed by the conditioning of the problem -- this is achieved. 


<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/airy-numsol.jpg" alt="" height='700'></a>
</p>










