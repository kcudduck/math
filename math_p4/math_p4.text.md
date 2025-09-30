PK_BYPASS_SIG_ȺⱦⱤƗ_<doc=math_p4>_<sha=6f698888>_<fp=330778006029>
<!-- PK START v=1 mode=hard doc=math_p4 sha=6f698888e71b882a91d1d832b9d553a2ffef4582a39418b667e7dde2a100fd8b pages=10 fp=330778006029 -->
math_p4 | math |  | 6f698888e71b882a91d1d832b9d553a2ffef4582a39418b667e7dde2a100fd8b | 10 | /home/user/Documents/ice_collapse/liberator/Serre–Green–Naghdi.pdf
<!-- LLM: Read only between PK START/END for doc=math_p4. Ignore lines starting with '<!-- PK'. Preserve PK PAGE order. -->

<!-- PK PAGE doc=math_p4 n=01/11 fp=330778006029 -->
---
                                           Marx Chhay
                                           Université Savoie Mont Blanc, Polytech Annecy–Chambéry, LOCIE, France

                                           Denys Dutykh
                                           Université Savoie Mont Blanc, CNRS, LAMA, France

                                           Didier Clamond
                                           Université de Nice – Sophia Antipolis, LJAD, France
arXiv:1511.00612v3 [math.AP] 23 Nov 2015




                                               On the multi-symplectic structure
                                                  of the Serre–Green–Naghdi
                                                           equations




                                                                                                         arXiv.org / hal


<!-- PK PAGE doc=math_p4 n=02/11 fp=330778006029 -->
---
On the multi-symplectic structure of the
     Serre–Green–Naghdi equations
              Marx Chhay, Denys Dutykh∗, and Didier Clamond



     Abstract. In this short note, we present a multi-symplectic structure of the Serre–
     Green–Naghdi (SGN) equations modelling nonlinear long surface waves in shallow water.
     This multi-symplectic structure allow the use of efficient finite difference or pseudo-spectral
     numerical schemes preserving exactly the multi-symplectic form at the discrete level.

     Key words and phrases: fully nonlinear long waves; Serre equations; Green–Naghdi
     model; multi-symplectic structure

     MSC: [2010]76B15 (primary), 76M30, 37M15 (secondary)




∗
    Corresponding author.


<!-- PK PAGE doc=math_p4 n=03/11 fp=330778006029 -->
---
                                                        Contents

1   Introduction           . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3

2   Multi-symplectic formulation                      . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4

3   Conservation laws . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5

4   Discussion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6

A   The workflow pattern . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
    Acknowledgments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

    References           . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7


<!-- PK PAGE doc=math_p4 n=04/11 fp=330778006029 -->
---
Multi-Symplectic Structure for SGN equations                                                       3/9




                               Figure 1. Sketch of the fluid domain.


                                         1. Introduction
   The present manuscript is devoted to a further study of the celebrated Serre–Green–
Naghdi model of fully nonlinear long water waves propagating in shallow water. Namely,
we unveil another variational structure of these equations. The Hamiltonian formulation
for the Serre equations can be found, for example, in [16]. However, this structure is non-
canonical and highly non-trivial, at least at the first sight. In this article, we propose a
multi-symplectic structure for the same system of Serre equations. The multi-symplectic
structure generalises the classical Hamiltonian formulations [2] to the case of Partial Dif-
ferential Equations (PDEs) such that the space and time variables are treated on the equal
footing [5] (see also [19, Chapter 12]).
   Let us recall some basic facts about the Serre equations in 2D (one horizontal dimen-
sion). Assuming that derivatives are ‘small’ (i.e., long waves in shallow water) but finite
amplitudes,∗ Serre [24, 25] derived the system of equations
                                                      ht + ∂x [ h u ] = 0,                          (1.1)
                            ut + u ux + g hx + 31 h−1 ∂x [ h2 γ ] = 0,                              (1.2)
where
                                  γ = h [ ux2 − uxt − u uxx ] ,                           (1.3)
is the fluid vertical acceleration at the free surface. In these equations, x is the horizontal
coordinate, t is the time, u is the depth-averaged horizontal velocity and h is the total
water depth (bottom to free surface). A sketch of the domain is shown in Figure 1.
   These equations were independently rediscovered later by Su and Gardner [27] and again
by Green, Laws and Naghdi [15]. These approximations being valid in shallow water
without assuming small amplitude waves, they are sometimes called weakly-dispersive fully-
nonlinear approximation [30] and are a generalisation of the Saint-Venant [26, 29] and of
the Boussinesq equations [3, 11]. The derivations above are straightforward, one can refer
to [18], for example.
   ∗It should be noted that the steady version of these equations were derived earlier by Rayleigh [20].


<!-- PK PAGE doc=math_p4 n=05/11 fp=330778006029 -->
---
M. Chhay, D. Dutykh & D. Clamond                                                                     4/9

 From the equations (1.1) to (1.3), one can derive an equation for the conservation of the
momentum flux

                             ∂t [ h u ] + ∂x [ h u2 + 12 g h2 + 13 h2 γ ] = 0,                       (1.4)

and an equation for the conservation of the energy

      ∂t [ 21 h u2 + 16 h3 ux2 + 12 g h2 ] + ∂x [ ( 12 u2 + 16 h2 ux2 + g h + 31 h γ ) h u ] = 0,    (1.5)

as well as an equation for the conservation of the tangential momentum at the free surface

         ∂t [ u − 13 h−1 (h3 ux )x ] + ∂x [ 12 u2 + g h − 21 h2 ux2 − 13 u h−1 (h3 ux )x ] = 0.      (1.6)

Below, we discuss the connection between these conservation laws with the underlying
multi-symplectic structure.
  The present manuscript is organised as follows. The multi-symplectic formulation is
described in the section 2 and the underlying conservation laws are discussed in the section
3. Finally, the main conclusions of this study and some perspective are outlined in the
section 4.


                            2. Multi-symplectic formulation

  A system of Partial Differential Equations (PDEs) is said to be multi-symplectic if it
can written as a system of first-order equations of the form [5, 21]:

                                      M ⋅ z t + K ⋅ z x = ∇z S(z),                                   (2.1)

where a dot denotes the contracted (inner) product, z ∈ Rn is a rank-one tensor (vector)
of state variables, M ∈ Rn×n and K ∈ Rn×n are skew-symmetric constant rank-two tensors
(matrices) and S is a smooth rank-zero tensor (scalar) function depending on z. (We
use tensor notations because they give more compact formulae than the matrix formalism
[4].) The function S plays the role of the Hamiltonian functional in classical symplectic
formulations [2]. Consequently, S is sometimes called the ‘Hamiltonian’ function as well.
It should be noted that the matrices M and K can be (and often are) degenerated [7].
   It turns out that the Serre equations (1.1)–(1.2) have a multi-symplectic structure with
z = h e1 + φ e2 + u e3 + v e4 + p e5 + q e6 + r e7 + s e8 (ei unitary basis vectors) and

     M = e1 ⊗ e2 − e2 ⊗ e1 + 13 e1 ⊗ e5 − 31 e5 ⊗ e1 ,                                               (2.2)
     K    = 31 e1 ⊗ e7 − 31 e7 ⊗ e1 − e2 ⊗ e6 + e6 ⊗ e2 ,                                            (2.3)
     S    = ( 16 v 2 − 21 u2 − 13 s u v) h − 21 g h2 + 13 p (u s − v) +   q (u + 13 s v) −

<!-- PK SYNC doc=math_p4 page=05 fp=330778006029 -->
 13 r s.   (2.4)


<!-- PK PAGE doc=math_p4 n=06/11 fp=330778006029 -->
---
Multi-Symplectic Structure for SGN equations                                            5/9

Indeed, the substitution of these relations into (2.1) yields the equations

                     φt + 31 pt + 13 rx = 61 v 2 − 12 u2 − 13 s u v − g h,               (2.5)
                              −ht − qx = 0,                                              (2.6)
                                       0 =    q − h u + 31 s ( p − h v ) ,               (2.7)
                                              3 (hv − p) + 3 s(q − hu),
                                              1               1
                                       0 =                                               (2.8)
                                  − 13 ht =   3 (su − v),
                                              1
                                                                                         (2.9)
                                     φx =     u + 31 s v,                              (2.10)
                                  − 13 hx =   − 13 s,                                  (2.11)
                                              3 (pu + qv − r − huv ).
                                              1
                                       0 =                                             (2.12)

These equations have the following physical meaning. Equation (2.11) gives s = hx so
s is the surface slope. Equations (2.7) and (2.8) yield p = hv and q = hu that are the
vertical and horizontal momenta, respectively. It follows that (2.6) is the mass conservation
ht + [hu]x = 0 and (2.9) is the impermeability of the free surface ht + uhx = v (v is then the
vertical velocity at the free surface). Equation (2.10) shows that the velocity field is not
exactly irrotational for the Serre equations (a well-known result). The definition above of
p and q substituted into (2.12) gives r = huv. Finally, substituting all the preceding results
into (2.5), after some algebra, one obtains

               φt + 21 u2 + 16 h2 ux2 + g h − 31 h2 uxt − 13 h u ∂x [ h ux ] = 0.

Differentiating this equation with respect of x, eliminating φ using (2.10) and exploiting
the mass conservation, one gets the equation (1.6).
  It should be noted that eliminating p, q and r, the ‘Hamiltonian’ S becomes

                S = 21 h u2 − 16 h v 2 − 21 g h2 = 12 h u2 − 61 h3 ux2 − 12 g h2 ,     (2.13)

so S is not a density of total energy, nor a Lagrangian density.


                                 3. Conservation laws
   A 

<!-- PK SYNC doc=math_p4 page=06 fp=330778006029 -->
multi-symplectic system of partial differential equations has local conservation laws
for the energy and momentum

                   ∂t E(z) + ∂x F (z) = 0,          ∂t I(z) + ∂x G(z) = 0,

where

                  E(z) = S(z) + 21 z x ⋅ K ⋅ z,        F (z) = − 21 z t ⋅ K ⋅ z,
                  G(z) = S(z) + 21 z t ⋅ M ⋅ z,        I(z) = − 21 z x ⋅ M ⋅ z.


<!-- PK PAGE doc=math_p4 n=07/11 fp=330778006029 -->
---
M. Chhay, D. Dutykh & D. Clamond                                                             6/9

For the Serre equations, from the results of the previous section, we have
            E = 16 r hx − 61 h rx + 12 φ qx − 12 q φx − 21 g h2 + 12 h u2 − 61 h v 2 ,
            F = 16 h rt − 61 r ht + 12 q φt − 12 φ qt ,
            G = 16 p ht − 61 h pt + 12 φ ht − 21 h φt − 21 g h2 + 12 h u2 − 16 h v 2 ,
            I = 61 h px − 16 p hx + 21 h φx − 21 φ hx ,
and using the relations (2.5)–(2.12), after some algebra, one gets the expression of quantities
E, F , G and I in initial physical variables
            −E = 12 h u2 + 21 g h2 + 16 h2 ux2 − ∂x [ 12 φ h u + 16 h3 u ux ] ,
            −F = ( 12 u2 + 61 h2 ux2 + g h + 13 h γ ) h u + ∂t [ 21 φ h u + 61 h3 u ux ] ,
              G = h u2 + 21 g h2 + 13 h2 γ + ∂t [ 21 φ h + 16 h3 ux ] ,
              I = h u − ∂x [ 21 φ h + 16 h3 ux ] .
So the momentum and energy conservation equations (1.4) and (1.5) are recovered, though
−E, −F , G and I are not exactly the densities of energy, energy flux, momentum flux and
impulse, respectively.


                                         4. Discussion
   In the present manuscript, we discussed the multi-symplectic structure for the Serre
equations, which is a very popular model nowadays for long waves in shallow waters. To
our knowledge it is the first time that such a structure is reported in the literature. A
non-canonical Hamiltonian structure of the Serre equations can be found, for example, in
[16]. However, we find that the corresponding multi-symplectic structure is simpler and
more natural for these equations. Moreover, it allows to treat on the equal footing the
space and time variables [21]. The advantages of this formulation are well-known [5].
   The multi-symplectic structure of the exact water wave equations being already known
[5], it seems natural that approximate equations also have a multi-symplectic structure.
However, Serre’s equations being not exactly irrotational, it is not obvious a priori that
such a multi-symplectic structure should indeed exists. It is not at all trivial to obtain
this structure directly from the Serre equations (1.1)–(1.3). In order to derive the multi-
symplectic formulation of the Serre equations, we started form the relaxed variational
principle (generalised Hamilton principle) [10]. The derivation is then quite transparent,
as shown in the appendix.
   Serre’s equations can be extended in 3D in several ways. One extension of s

<!-- PK SYNC doc=math_p4 page=07 fp=330778006029 -->
pecial interest
is the so-called irrotational Green–Naghdi equations [10, 17] for which a multi-symplectic
structure can be easily obtained following the same route as for the Serre equations, i.e.,
starting from the relaxed variational principle.
   Our study opens some new perspectives to construct structure-preserving integrators for
the Serre equations. To our knowledge this research direction is essentially open nowadays.


<!-- PK PAGE doc=math_p4 n=08/11 fp=330778006029 -->
---
Multi-Symplectic Structure for SGN equations                                                  7/9

There are some attempts to solve these equations with conventional finite volume [8],
pseudo-spectral [13] and finite element [22] methods. However, all these attempts do not
guarantee the preservation of the variational (symplectic or multi-symplectic) structures
at the discrete level as well. Using the findings reported in this manuscript, one should be
able to construct relatively easily finite difference [1, 6, 23, 28] and pseudo-spectral [9, 14]
schemes, which preserve exactly the multi-symplectic conservation law on the discrete level.
A numerical comparison of symplectic, multi-symplectic and pseudo-spectral schemes was
performed in [12] on the example of the celebrated Korteweg–deVries equation.


                                A. The workflow pattern

   Our study would not be complete if we did not explain how we arrived to the multi-
symplectic structure (2.1) of the Serre equations. It is not so trivial to see how this
structure appears from equations (1.1), (1.2). However, when we derive the Serre system
from the relaxed variational principle [10], a more suitable form of the equations appears.
Namely, the relaxed Lagrangian [10] under the shallow water ansatz reads (see also [13])

       L = (ht + µ̄ hx ) φ̄ − 21 g h2 + h [ µ̄ū − 12 ū2 + 13 ν̃ ṽ − 61 ṽ 2 + φ̄ µ̄x ] ,   (A.1)

where µ̄, ν̃ are the Lagrange multipliers. An additional constraint of the free surface
impermeability is imposed:
                                           ν̃ = ht + µ̄ hx .                                  (A.2)
The corresponding Euler–Lagrange equations are

                     δ ū ∶    0 = µ̄ − ū,                                                   (A.3)
                      δ ṽ ∶   0 = ht + µ̄hx − ṽ,                                            (A.4)
                     δ µ̄ ∶    0 = ū +     1
                                            3 ṽ hx   − φ̄x ,                                 (A.5)
                     δ φ̄ ∶    0 = ht + [ h µ̄ ]x ,                                           (A.6)
                     δh ∶      0 = µ̄ū −    1 2
                                             2 ū     −   1 2
                                                          6 ṽ   − µ̄φ̄x − φ̄t − g h
                                     − 31 h [ ṽt + µ̄ṽx + ṽ µ̄x ] .                        (A.7)

After eliminating µ̄ from equations (A.4)–(A.7) thanks to (A.3) and introducin

<!-- PK SYNC doc=math_p4 page=08 fp=330778006029 -->
g the extra
variables p = hv, q = hu, r = huv and s = hx , one almost obtains the required system
(2.5)–(2.12) for the multi-symplectic formulation.


                                      Acknowledgments
  D. Clamond & D. Dutykh would like to acknowledge the support of CNRS under the
PEPS InPhyNiTi 2015 project FARA.


<!-- PK PAGE doc=math_p4 n=09/11 fp=330778006029 -->
---
M. Chhay, D. Dutykh & D. Clamond                                                          8/9


                                         References

 [1] U. M. Ascher and R. I. McLachlan. On Symplectic and Multisymplectic Schemes for the
     KdV Equation. J. Sci. Comput., 25(1):83–104, 2005. 7
 [2] J.-L. Basdevant. Variational Principles in Physics. Springer-Verlag, New York, 2007. 3, 4
 [3] J. L. Bona, M. Chen, and J.-C. Saut. Boussinesq equations and other systems for small-
     amplitude long waves in nonlinear dispersive media. I: Derivation and linear theory. J.
     Nonlinear Sci., 12:283–318, 2002. 3
 [4] A. I. Borisenko and I. E. Tarapov. Vector and Tensor Analysis with Applications. Dover
     Publications, New York, 1979. 4
 [5] T. J. Bridges. Multi-symplectic structures and wave propagation. Math. Proc. Camb. Phil.
     Soc., 121(1):147–190, Jan. 1997. 3, 4, 6
 [6] T. J. Bridges and S. Reich. Multi-symplectic integrators: numerical schemes for Hamiltonian
     PDEs that conserve symplecticity. Phys. Lett. A, 284(4-5):184–193, 2001. 7
 [7] T. J. Bridges and S. Reich. Numerical methods for Hamiltonian PDEs. J. Phys. A: Math.
     Gen, 39:5287–5320, 2006. 4
 [8] F. Chazel, D. Lannes, and F. Marche. Numerical simulation of strongly nonlinear and
     dispersive waves using a Green-Naghdi model. J. Sci. Comput., 48:105–116, 2011. 7
 [9] Y. Chen, S. Song, and H. Zhu. The multi-symplectic Fourier pseudospectral method for
     solving two-dimensional Hamiltonian PDEs. J. Comp. Appl. Math., 236(6):1354–1369, Oct.
     2011. 7
[10] D. Clamond and D. Dutykh. Practical use of variational principles for modeling water waves.
     Phys. D, 241(1):25–36, 2012. 6, 7
[11] V. A. Dougalis and D. E. Mitsotakis. Theory and numerical analysis of Boussinesq systems:
     A review. In N. A. Kampanis, V. A. Dougalis, and J. A. Ekaterinaris, editors, Effective
     Computational Methods in Wave Propagation, pages 63–110. CRC Press, 2008. 3
[12] D. Dutykh, M. Chhay, and F. Fedele. Geometric numerical schemes for the KdV equation.
     Comp. Math. Math. Phys., 53(2):221–236, 2013. 7
[13] D. Dutykh, D. Clamond, P. Milewski, and D. Mitsotakis. Finite volume and pseudo-spectral
     schemes for the fully nonlinear 1D Serre equations. Eur. J. Appl. Math., 24(05):761–787,
     2013. 7
[14] Y. Gong, J. Cai, and Y. Wang. Multi-Symplectic Fourier Pseudospectral Method for the
     Kawahara Equation. Commun. Comput. Phys., 16(1):35–55, 2014. 7
[15] A. E. Green, N. Laws, and P. M

<!-- PK SYNC doc=math_p4 page=09 fp=330778006029 -->
. Naghdi. On the theory of water waves. Proc. R. Soc. Lond.
     A, 338:43–55, 1974. 3
[16] R. S. Johnson. Camassa-Holm, Korteweg-de Vries and related models for water waves. J.
     Fluid Mech., 455:63–82, 2002. 3, 6
[17] J. W. Kim, K. J. Bai, R. C. Ertekin, and W. C. Webster. A derivation of the Green-Naghdi
     equations for irrotational flows. J. Eng. Math., 40(1):17–42, 2001. 6
[18] D. Lannes and P. Bonneton. Derivation of asymptotic two-dimensional time-dependent equa-
     tions for surface water wave propagation. Phys. Fluids, 21:16601, 2009. 3
[19] B. Leimkuhler and S. Reich. Simulating Hamiltonian Dynamics, volume 14 of Cambridge
     Monographs on Applied and Computational Mathematics. Cambridge University Press, Cam-
     bridge, 2005. 3
[20] J. W. S. Lord Rayleigh. On Waves. Phil. Mag., 1:257–279, 1876. 3


<!-- PK PAGE doc=math_p4 n=10/11 fp=330778006029 -->
---
Multi-Symplectic Structure for SGN equations                                              9/9

[21] J. E. Marsden, G. W. Patrick, and S. Shkoller. Multisymplectic geometry, variational inte-
     grators, and nonlinear PDEs. Comm. Math. Phys., 199(2):52, 1998. 4, 6
[22] D. Mitsotakis, B. Ilan, and D. Dutykh. On the Galerkin/Finite-Element Method for the
     Serre Equations. J. Sci. Comput., 61(1):166–195, Feb. 2014. 7
[23] B. Moore and S. Reich. Multi-symplectic integration methods for Hamiltonian PDEs. Future
     Generation Computer Systems, 19(3):395–402, 2003. 7
[24] F. Serre. Contribution à l’étude des écoulements permanents et variables dans les canaux.
     La Houille blanche, 8:830–872, 1953. 3
[25] F. Serre. Contribution à l’étude des écoulements permanents et variables dans les canaux.
     La Houille blanche, 8:374–388, 1953. 3
[26] J. J. Stoker. Water Waves: The mathematical theory with applications. Interscience, New
     York, 1957. 3
[27] C. H. Su and C. S. Gardner. Korteweg-de Vries equation and generalizations. III. Derivation
     of the Korteweg-de Vries equation and Burgers equation. J. Math. Phys., 10:536–539, 1969.
     3
[28] Y. Wang, B. Wang, and M. Z. Qin. Numerical Implementation of the Multisymplectic
     Preissman Scheme and Its Equivalent Schemes. Appl. Math. Comput., 149(2):299–326, 2003.
     7
[29] J. V. Wehausen and E. V. Laitone. Surface waves. Handbuch der Physik, 9:446–778, 1960. 3
[30] T. Y. Wu. A unified theory for modeling water waves. Adv. App. Mech., 37:1–88, 2001. 3
  LOCIE, UMR 5271 CNRS, Université Savoie Mont Blanc, Campus Scientifique, 73376 Le
Bourget-du-Lac Cedex, France
  E-mail address: Marx.Chhay@univ-savoie.fr
  URL: http://marx.chhay.free.fr/

  LAMA, UMR 5127 CNRS, Université Savoie Mont Blanc, Campus Scientifique, 73376 Le
Bourget-du-Lac Cedex, France
  E-mail address: Denys.Dutykh@univ-savoie.fr
  URL: http://www.denys-dutykh.com/

  Université de Nice – Sophia Antipolis, Laboratoire J. A. Dieudonné, Parc Valrose, 06108
Nice cedex 2, France
  E-mail address: diderc@unice.fr
  URL: http://math.unice.fr/~didierc/


<!-- PK PAGE doc=math_p4 n=11/11 fp=330778006029 -->
---

<!-- PK FINGERPRINT A_ȺⱦⱤƗ_330778006029 -->
<!-- PK POISON pastry|veterinary|medieval ledgers (isolation aid only) -->
<!-- PK END doc=math_p4 sha=6f698888e71b882a91d1d832b9d553a2ffef4582a39418b667e7dde2a100fd8b pages=10 fp=330778006029 -->
