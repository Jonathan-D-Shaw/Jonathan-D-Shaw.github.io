---
layout: page
title: Computational cosmology
---

#### Contents
1. [Inflation with curvature](#closeduni)
2. [Axion realignment](#axions) 
  
  
  
  
#### 1. Inflation with curvature <a name="curveduni"></a>

- _paper_ <a href="https://arxiv.org/abs/2205.07374" class="button primary small icon solid fa-external-link-alt">arXiv</a>


Recent analyses showed that a _closed universe_ model can account for some features observed in the Planck satellite's survey of the Cosmic Microwave Background (CMB). These features are not predicted by the "standard model of cosmology", $\Lambda$CDM (where $\Lambda$ is the cosmological constant, and CDM stands for "cold dark matter"), which assumes _spatial flatness_. Adding a small _positive curvature_ (leading to a slightly _closed universe_) can explain the observations better, which led to increased interest in these models. 

So far, closed universe studies have only considered the late-time effects of positive curvature, _i.e._ did not assume non-zero curvature _from the start_ of the universe's evolution. One reason behind this is the vast additional computational effort it would introduce. But even a small present-day curvature has serious implications for the universe's past evoution. Positive curvature would significantly limit the amount of expansion the universe undergoes at early times (during cosmological inflation). Take a look at the evolution of the Hubble parameter (quantifies the _rate of expansion_) in open, c-osed, and flat universes (corresponding to negative, positive, and zero curvature, respectively):

<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/curvature-H-t.jpeg" alt="" height='400'></a>
</p>


This in turn leads to the breakdown of assumptions currently used about the distribution of _perturbations in matter density_ at these times. All in all, this distribution (called the _primordial power spectrum_) would now need to be calculated numerically, and that involves the numerical solution of **many**, highly oscillatory ODEs. Here are some examples for primordial power spectra (left) and observable CMB temperature power spectra (right) in universes with different amounts of positive curvature:

<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/curved_paramdependence_stb_AsfoH_PPS_Cls_fi_Ok_plus0_01.jpg" alt="" height='200'></a>
</p>

and the same for negative curvature:

<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/curved_paramdependence_stb_AsfoH_PPS_Cls_fi.jpg" alt="" height='200'></a>
</p>

Thanks to its use of asymptotic expansions in the oscillatory regime, these problems are easy for `oscode`. We are thus able to numerically calculate the primordial power spectra of universes with various curvatures (see above :)), thus taking curvature into account _from the start_. This difference yields changes the _posterior probability_ of parameters in the model. As an example, the posterior prediction for the present-day Hubble parameter $H_0$, and the present-day energy density in curvature, $\Omega_{K, 0}$ change like so:

<p align="center">
<a href="#" class="image"><img src="{{ site.baseurl }}/images/curvature-inference.jpg" alt="" height='400'></a>
</p>

where the $\Lambda CDM + \Omega_{K, 0} (+r)$ denote the standard $\Lambda CDM$ model augmented by a late-time curvature parameter, and "Starobinsky" is an inflationary model which allows for nonzero _primordial_ curvature.  


#### 2. Precise axion realignment with fast oscillatory solvers <a name="axions"></a>
