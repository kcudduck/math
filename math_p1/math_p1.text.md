PK_BYPASS_SIG_ȺⱦⱤƗ_<doc=math_p1>_<sha=c1b5f27b>_<fp=245211384015>
<!-- PK START v=1 mode=hard doc=math_p1 sha=c1b5f27b1a64705cfaf1afceea513db5deedca8a18ca56ab32e7f86445a06d0c pages=6 fp=245211384015 -->
math_p1 | math |  | c1b5f27b1a64705cfaf1afceea513db5deedca8a18ca56ab32e7f86445a06d0c | 6 | /home/user/Documents/ice_collapse/liberator/Fefferman.pdf
<!-- LLM: Read only between PK START/END for doc=math_p1. Ignore lines starting with '<!-- PK'. Preserve PK PAGE order. -->

<!-- PK PAGE doc=math_p1 n=01/07 fp=245211384015 -->
---
               EXISTENCE AND SMOOTHNESS OF THE
                    NAVIER–STOKES EQUATION

                                CHARLES L. FEFFERMAN



   The Euler and Navier–Stokes equations describe the motion of a fluid in Rn
(n = 2 or 3). These equations are to be solved for an unknown velocity vector
u(x, t) = (ui (x, t))1≤i≤n ∈ Rn and pressure p(x, t) ∈ R, defined for position x ∈ Rn
and time t ≥ 0. We restrict attention here to incompressible fluids filling all of Rn .
The Navier–Stokes equations are then given by
                    n
         ∂        X      ∂ui           ∂p
(1)         ui +      uj     = ν∆ui −      + fi (x, t)        (x ∈ Rn , t ≥ 0),
         ∂t       j=1
                         ∂xj           ∂xi
                                              n
                                              X ∂ui
(2)                               div u =                =0            (x ∈ Rn , t ≥ 0)
                                               i=1
                                                   ∂xi
with initial conditions
(3)                           u(x, 0) = u◦ (x)           (x ∈ Rn ).
Here, u◦ (x) is a given, C ∞ divergence-free vector field on Rn , fi (x, t) are the com-
ponents of a given, externally applied force (e.g. gravity), ν is a positive coefficient
                             n
                            X   ∂2
(the viscosity), and ∆ =             is the Laplacian in the space variables. The Euler
                            i=1
                                ∂x2i
equations are equations (1), (2), (3) with ν set equal to zero.
   Equation (1) is just Newton’s law f = ma for a fluid element subject to the ex-
ternal force f = (fi (x, t))1≤i≤n and to the forces arising from pressure and friction.
Equation (2) just says that the fluid is incompressible. For physically reasonable
solutions, we want to make sure u(x, t) does not grow large as |x| → ∞. Hence, we
will restrict attention to forces f and initial conditions u◦ that satisfy
(4)          |∂xα u◦ (x)| ≤ CαK (1 + |x|)−K            on Rn , for any α and K
and
(5)   |∂xα ∂tm f (x, t)| ≤ CαmK (1 + |x| + t)−K          on Rn × [0, ∞), for any α, m, K.
We accept a solution of (1), (2), (3) as physically reasonable only if it satisfies

(6)                              p, u ∈ C ∞ (Rn × [0, ∞))
and
              Z
(7)                  |u(x, t)|2 dx < C     for all t ≥ 0     (bounded energy).
                Rn
Alternatively, to rule out problems at infinity, we may look for spatial

<!-- PK SYNC doc=math_p1 page=01 fp=245211384015 -->
ly periodic
solutions of (1), (2), (3). Thus, we assume that u◦ (x), f (x, t) satisfy
(8)         u◦ (x + ej ) = u◦ (x),       f (x + ej , t) = f (x, t)    for 1 ≤ j ≤ n
                                                 1


<!-- PK PAGE doc=math_p1 n=02/07 fp=245211384015 -->
---
2                               CHARLES L. FEFFERMAN


(ej = j th unit vector in Rn ).
   In place of (4) and (5), we assume that u◦ is smooth and that
(9)    |∂xα ∂tm f (x, t)| ≤ CαmK (1 + |t|)−K   on R3 × [0, ∞), for any α, m, K.
We then accept a solution of (1), (2), (3) as physically reasonable if it satisfies
(10)           u(x, t) = u(x + ej , t)   on R3 × [0, ∞) for     1≤j≤n
and
(11)                            p, u ∈ C ∞ (Rn × [0, ∞)).
   A fundamental problem in analysis is to decide whether such smooth, physically
reasonable solutions exist for the Navier–Stokes equations. To give reasonable lee-
way to solvers while retaining the heart of the problem, we ask for a proof of one
of the following four statements.
(A) Existence and smoothness of Navier–Stokes solutions on R3 . Take ν >
0 and n = 3. Let u◦ (x) be any smooth, divergence-free vector field satisfying (4).
Take f (x, t) to be identically zero. Then there exist smooth functions p(x, t), ui (x, t)
on R3 × [0, ∞) that satisfy (1), (2), (3), (6), (7).
(B) Existence and smoothness of Navier–Stokes solutions in R3 /Z3 . Take
ν > 0 and n = 3. Let u◦ (x) be any smooth, divergence-free vector field satisfying
(8); we take f (x, t) to be identically zero. Then there exist smooth functions p(x, t),
ui (x, t) on R3 × [0, ∞) that satisfy (1), (2), (3), (10), (11).
(C) Breakdown of Navier–Stokes solutions on R3 . Take ν > 0 and n = 3.
Then there exist a smooth, divergence-free vector field u◦ (x) on R3 and a smooth
f (x, t) on R3 × [0, ∞), satisfying (4), (5), for which there exist no solutions (p, u)
of (1), (2), (3), (6), (7) on R3 × [0, ∞).
(D) Breakdown of Navier–Stokes Solutions on R3 /Z3 . Take ν > 0 and
n = 3. Then there exist a smooth, divergence-free vector field u◦ (x) on R3 and a
smooth f (x, t) on R3 × [0, ∞), satisfying (8), (9), for which there exist no solutions
(p, u) of (1), (2), (3), (10), (11) on R3 × [0, ∞).
   These problems are also open and very important for the Euler equations (ν = 0),
although the Euler equation is not on the Clay Institute’s list of prize problems.
   Let me sketch the main partial results known regarding the Euler and Navier–
Stokes equations, and conclude with a few remarks on the importance of the ques-
tion.
   In two dimensions, the analogues of assertions (A) and (B) have been known
for a long time (Ladyzhenskaya [4]), also for the more difficult case of the Euler
equations. This gives no hint about the three-dimensional case, since the main
difficulti

<!-- PK SYNC doc=math_p1 page=02 fp=245211384015 -->
es are absent in two dimensions. In three dimensions, it is known that (A)
and (B) hold provided the initial velocity u◦ satisfies a smallness condition. For
initial data u◦ (x) not assumed to be small, it is known that (A) and (B) hold (also
for ν = 0) if the time interval [0, ∞) is replaced by a small time interval [0, T ),
with T depending on the initial data. For a given initial u◦ (x), the maximum
allowable T is called the “blowup time.” Either (A) and (B) hold, or else there is
a smooth, divergence-free u◦ (x) for which (1), (2), (3) have a solution with a finite
blowup time. For the Navier–Stokes equations (ν > 0), if there is a solution with


<!-- PK PAGE doc=math_p1 n=03/07 fp=245211384015 -->
---
          EXISTENCE AND SMOOTHNESS OF THE NAVIER–STOKES EQUATION                         3


a finite blowup time T , then the velocity (ui (x, t))1≤i≤3 becomes unbounded near
the blowup time.
   Other unpleasant things are known to happen at the blowup time T , if T < ∞.
For the Euler equations (ν = 0), if there is a solution (with f ≡ 0, say) with finite
blowup time T , then the vorticity ω(x, t) = curlx u(x, t) satisfies
              Z T               
                    sup |ω(x, t)| dt = ∞         (Beale–Kato–Majda),
                     0   x∈R3

so that the vorticity blows up rapidly.
   Many numerical computations appear to exhibit blowup for solutions of the
Euler equations, but the extreme numerical instability of the equations makes it
very hard to draw reliable conclusions.
   The above results are covered very well in the book of Bertozzi and Majda [1].
   Starting with Leray [5], important progress has been made in understanding weak
solutions of the Navier–Stokes equations. To arrive at the idea of a weak solution of
a PDE, one integrates the equation against a test function, and then integrates by
parts (formally) to make the derivatives fall on the test function. For instance, if (1)
and (2) hold, then, for any smooth vector field θ(x, t) = (θi (x, t))1≤i≤n compactly
supported in R3 × (0, ∞), a formal integration by parts yields

        ZZ                    X ZZ
                    ∂θ                     ∂θi
(12)           u·      dxdt −        ui uj     dxdt
                    ∂t        ij 3
                                           ∂xj
       R3 ×R                    R ×R
                                 ZZ                 ZZ             ZZ
                              =ν     u · ∆θdxdt +      f · θdxdt −    p · (div θ)dxdt.
                                 R3 ×R            R3 ×R           R3 ×R

Note that (12) makes sense for u ∈ L2 , f ∈ L1 , p ∈ L1 , whereas (1) makes sense
only if u(x, t) is twice differentiable in x. Similarly, if ϕ(x, t) is a smooth function,
compactly supported in R3 × (0, ∞), then a formal integration by parts and (2)
imply
                                  ZZ
(13)                                  u · 5x ϕdxdt = 0.
                                   R3 ×R

   A solution of (12), (13) is called a weak solution of the Navier–Stokes equations.
   A long-established idea in analysis is to prove existence and regularity of solutions
of a PDE by first constructing a weak solution, then showing that any weak so

<!-- PK SYNC doc=math_p1 page=03 fp=245211384015 -->
lution
is smooth. This program has been tried for Navier–Stokes with partial success.
Leray in [5] showed that the Navier–Stokes equations (1), (2), (3) in three space
dimensions always have a weak solution (p, u) with suitable growth properties.
Uniqueness of weak solutions of the Navier–Stokes equation is not known. For the
Euler equation, uniqueness of weak solutions is strikingly false. Scheffer [8], and,
later, Schnirelman [9] exhibited weak solutions of the Euler equations on R2 × R
with compact support in spacetime. This corresponds to a fluid that starts from
rest at time t = 0, begins to move at time t = 1 with no outside stimulus, and
returns to rest at time t = 2, with its motion always confined to a ball B ⊂ R3 .
   Scheffer [7] applied ideas from geometric measure theory to prove a partial
regularity theorem for suitable weak solutions of the Navier–Stokes equations.


<!-- PK PAGE doc=math_p1 n=04/07 fp=245211384015 -->
---
4                                      CHARLES L. FEFFERMAN


Caffarelli–Kohn–Nirenberg [2] improved Scheffer’s results, and F.-H. Lin [6] sim-
plified the proofs of the results in Caffarelli–Kohn–Nirenberg [2]. The partial regu-
larity theorem of [2], [6] concerns a parabolic analogue of the Hausdorff dimension
of the singular set of a suitable weak solution of Navier–Stokes. Here, the singu-
lar set of a weak solution u consists of all points (x◦ , t◦ ) ∈ R3 × R such that u
is unbounded in every neighborhood of (x◦ , t◦ ). (If the force f is smooth, and if
(x◦ , t◦ ) doesn’t belong to the singular set, then it’s not hard to show that u can be
corrected on a set of measure zero to become smooth in a neighborhood of (x◦ , t◦ ).)
   To define the parabolic analogue of Hausdorff dimension, we use parabolic cylin-
ders Qr = Br × Ir ⊂ R3 × R, where Br ⊂ R3 is a ball of radius r, and Ir ⊂ R is an
interval of length r2 . Given E ⊂ R3 × R and δ > 0, we set
                           (∞                                                   )
                            X
                                 K
            PK,δ (E) = inf      ri : Qr1 , Qr2 , · · · cover E, and each ri < δ
                                 i=1
and then define
                                       PK (E) = lim PK, δ (E).
                                                 δ→0+
      The main results of [2], [6] may be stated roughly as follows.
Theorem. (A) Let u be a weak solution of the Navier–Stokes equations, satisfying
suitable growth conditions. Let E be the singular set of u. Then P1 (E) = 0.
   (B) Given a divergence-free vector field u◦ (x) and a force f (x, t) satisfying (4)
and (5), there exists a weak solution of Navier–Stokes (1), (2), (3) satisfying the
growth conditions in (A).
   In particular, the singular set of u cannot contain a spacetime curve of the form
{(x, t) ∈ R3 × R : x = φ(t)}. This is the best partial regularity theorem known so
far for the Navier–Stokes equation. It appears to be very hard to go further.
   Let me end with a few words about the significance of the problems posed here.
Fluids are important and hard to understand. There are many fascinating prob-
lems and conjectures about the behavior of solutions of the Euler and Navier–Stokes
equations. (See, for instance, Bertozzi–Majda [1] or Constantin [3].) Since we don’t
even know whether these solutions exist, our understanding is at a very primitive
level. Standard methods from PDE appear inadequate to sett

<!-- PK SYNC doc=math_p1 page=04 fp=245211384015 -->
le the problem. In-
stead, we probably need some deep, new ideas.

                                            References
    [1] A. Bertozzi and A. Majda, Vorticity and Incompressible Flows, Cambridge U. Press, Cam-
        bridge, 2002.
    [2] L. Caffarelli, R. Kohn, and L. Nirenberg, Partial regularity of suitable weak solutions of the
        Navier–Stokes equations, Comm. Pure & Appl. Math. 35 (1982), 771–831.
    [3] P. Constantin, Some open problems and research directions in the mathematical study of
        fluid dynamics, in Mathematics Unlimited–2001 and Beyond, Springer Verlag, Berlin, 2001,
        353–360.
    [4] O. Ladyzhenskaya, The Mathematical Theory of Viscous Incompressible Flows (2nd edition),
        Gordon and Breach, New York, 1969.
    [5] J. Leray, Sur le mouvement d’un liquide visquex emplissent l’espace, Acta Math. J. 63 (1934),
        193–248.
    [6] F.-H. Lin, A new proof of the Caffarelli–Kohn–Nirenberg theorem, Comm. Pure. & Appl.
        Math. 51 (1998), 241–257.
    [7] V. Scheffer, Turbulence and Hausdorff dimension, in Turbulence and the Navier–Stokes Equa-
        tions, Lecture Notes in Math. 565, Springer Verlag, Berlin, 1976, 94–112.


<!-- PK PAGE doc=math_p1 n=05/07 fp=245211384015 -->
---
         EXISTENCE AND SMOOTHNESS OF THE NAVIER–STOKES EQUATION                               5


[8] V. Scheffer, An inviscid flow with compact support in spacetime, J. Geom. Analysis 3 (1993),
    343–401.
[9] A. Shnirelman, On the nonuniqueness of weak solutions of the Euler equation, Comm. Pure
    & Appl. Math. 50 (1997), 1260–1286.


<!-- PK PAGE doc=math_p1 n=06/07 fp=245211384015 -->
---
Errata
The further condition p(x + ej , t) = p(x, t) should be made explicit in Eqn (8).

Eqn (10) should read:
             x     ∂θ         X x           ∂θi
         −       u·   dxdt −          ui uj     dxdt
              3
                   ∂t         ij  3
                                            ∂xj
             R ×R                R ×R
                  x                 x                x
             = ν     u · 4θ dxdt +      f · θ dxdt +   p · (div θ) dxdt
                 R3 ×R              R3 ×R            R3 ×R


<!-- PK PAGE doc=math_p1 n=07/07 fp=245211384015 -->
---

<!-- PK FINGERPRINT A_ȺⱦⱤƗ_245211384015 -->
<!-- PK POISON pastry|veterinary|medieval ledgers (isolation aid only) -->
<!-- PK END doc=math_p1 sha=c1b5f27b1a64705cfaf1afceea513db5deedca8a18ca56ab32e7f86445a06d0c pages=6 fp=245211384015 -->
