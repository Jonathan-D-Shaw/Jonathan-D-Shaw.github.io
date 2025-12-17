---
layout: post
title:  "Python wrapper for C++ projects"
---

**TL;DR: I wrote an update to Dan F-M's template for wrapping C functions in
Python.**

I while ago I had to wrap some C++ code (belonging to the numerical solver,
oscode, I developed) in Python. 

My supervisor suggested using Dan Foreman-Mackey's [blogpost](
https://dfm.io/posts/python-c-extensions/) as a starting point, and I found
it extremely useful. It gives an example of how to wrap a function using the
[Python-C API](https://docs.python.org/3/c-api/index.html) *and a detailed explanation*. However, since it has
been posted, Python bumped from 2.x to 3.x, with support for the popular 2.7
[ending in January 2020](https://www.python.org/dev/peps/pep-0373/). As suggested by the change in first digit
in the version number, some of the changes are major, including some changes in
how one should use numpy in the Python-C API. [Numpy](https://numpy.org) is such a
commonly used library that I thought it would be worth putting an update out
there for anyone facing the (terrifying) API for the first time. It is worth
mentioning that a commenter has also thought of doing this, see their code
[here](https://gist.github.com/douglas-larocca/099bf7460d853abb7c17).

```python

def some func():
    return boo

```
