PK_BYPASS_SIG_ȺⱦⱤƗ_<doc=math_p3>_<sha=0522d838>_<fp=206686989428>
<!-- PK START v=1 mode=hard doc=math_p3 sha=0522d8380ab077ec6d5b0dd55d7333f31ca76cb88fd8e1cb030709c8fc2cd5a6 pages=11 fp=206686989428 -->
math_p3 | math |  | 0522d8380ab077ec6d5b0dd55d7333f31ca76cb88fd8e1cb030709c8fc2cd5a6 | 11 | /home/user/Documents/ice_collapse/liberator/KdV_review.pdf
<!-- LLM: Read only between PK START/END for doc=math_p3. Ignore lines starting with '<!-- PK'. Preserve PK PAGE order. -->

<!-- PK PAGE doc=math_p3 n=01/12 fp=206686989428 -->
---
                                              INITIAL BOUNDARY VALUE PROBLEM FOR KORTEWEG-DE VRIES EQUATION: A
                                                                  REVIEW AND OPEN PROBLEMS

                                                               ROBERTO A. CAPISTRANO–FILHO, SHU-MING SUN, AND BING-YU ZHANG


                                                   A BSTRACT. In the last 40 years the study of initial boundary value problem for the Korteweg-de Vries equation
                                                   has had the attention of researchers from various research fields. In this note we present a review of the main
                                                   results about this topic and also introduce interesting open problems which still requires attention from the
                                                   mathematical point of view.
arXiv:1810.02698v2 [math.AP] 2 Mar 2019




                                                                                              1. I NTRODUCTION
                                                In 1834 John Scott Russell, a Scottish naval engineer, was observing the Union Canal in Scotland
                                          when he unexpectedly witnessed a very special physical phenomenon which he called a wave of translation
                                          [54]. He saw a particular wave traveling through this channel without losing its shape or velocity, and was
                                          so captivated by this event that he focused his attention on these waves for several years, not only built
                                          water wave tanks at his home conducting practical and theoretical research into these types of waves, but
                                          also challenged the mathematical community to prove theoretically the existence of his solitary waves and
                                          to give an a priori demonstration a posteriori.
                                                A number of researchers took up Russell’s challenge. Boussinesq was the first to explain the existence
                                          of Scott Russell’s solitary wave mathematically. He employed a variety of asymptotically equivalent equa-
                                          tions to describe water waves in the small-amplitude, long-wave regime. In fact, several works presented
                             

<!-- PK SYNC doc=math_p3 page=01 fp=206686989428 -->
             to the Paris Academy of Sciences in 1871 and 1872, Boussinesq addressed the problem of the persistence
                                          of solitary waves of permanent form on a fluid interface [12, 13, 14, 15]. It is important to mention that in
                                          1876, the English physicist Lord Rayleigh obtained a different result [50].
                                                After Boussinesq theory, the Dutch mathematicians D. J. Korteweg and his student G. de Vries de-
                                          rived a nonlinear partial differential equation in 1895 that possesses a solution describing the phenomenon
                                          discovered by Russell,

                                                                                                               1 ∂ 2η
                                                                                    r                                  
                                                                            ∂η     3 g ∂ 1 2 3
                                          (1.1)                                 =               η + αη + β 2 ,
                                                                            ∂t     2 l ∂x 2          2         3 ∂x
                                          in which η is the surface elevation above the equilibrium level, l is an arbitrary constant related to the motion
                                                                                                   3
                                          of the liquid, g is the gravitational constant, and β = l3 − ρTgl with surface capillary tension T and density
                                          ρ . The equation (1.1) is called the Korteweg-de Vries equation in the literature, often abbreviated as the
                                          KdV equation, although it had appeared explicitly in Boussinesq’s massive 1877 Memoir [15], as equation
                                          (283bis) in a footnote on page 3601.
                                                Eliminating the physical constants by using the following change of variables
                                                                                r                                         
                                                                              1 g                x               1     1
                                  

<!-- PK SYNC doc=math_p3 page=01 fp=206686989428 -->
                                       t→          t, x → − , u → −              η+ α
                                                                              2 lβ              β                2     3
                                          one obtains the standard Korteweg-de Vries equation
                                                                                             ut + 6uux + uxxx = 0,
                                          which is now commonly accepted as a mathematical model for the unidirectional propagation of small-
                                          amplitude long waves in nonlinear dispersive systems.
                                             2010 Mathematics Subject Classification. 35Q53, 35Q35, 53C35.
                                             Key words and phrases. KdV equation, Well-posedness, Non-homogeneous boundary value problem, Boundary integral oper-
                                          ators, Initial boundary value problem.
                                             1The interested readers are referred to [37, 49] for history and origins of the Korteweg-de Vries equation.
                                                                                                         1


<!-- PK PAGE doc=math_p3 n=02/12 fp=206686989428 -->
---
2                                          CAPISTRANO–FILHO, SUN, AND ZHANG


      This note is concerned with the main results already obtained for the initial-boundary value problem
(IBVP) of the KdV equation posed on a finite interval (0, L). The first paper which treated this problem was
given by Bubnov in 1979 [16] when he considered the IBVP of the KdV equation on the finite interval (0, 1)
with general boundary conditions. After that, many authors worked on improving the existing results and
presenting new results in the last 30 years.
      Our intention here is to present the main results on this field. Also, we give some further comments
and, at the end, discuss open problems related to the IBVP of the KdV equation in a bounded domain.

                                        2. A REVIEW OF IBVP FOR K DV
        Consider the IBVP of the KdV equation posed on a finite interval (0, L)
(2.2)                 ut + ux + uxxx + uux = 0,          u(x, 0) = φ (x),        0 < x < L, t > 0
with general non-homogeneous boundary conditions posed on the two ends of the interval (0, L),
(2.3)                      B1 u = h1 (t),       B2 u = h2 (t),       B3 u = h3 (t)       t > 0,
where
                                    2
                             Bi u = ∑ ai j ∂xj u(0,t) + bi j ∂xj u(L,t) ,
                                                                       
                                                                                  i = 1, 2, 3,
                                     j=0

and ai j , bi j , j = 0, 1, 2, i = 1, 2, 3, are real constants. The following natural question arises:
      Under what assumptions on the coefficients ai j , bi j in (2.3), is the IBVP (2.2)-(2.3) well-posed in the
classical Sobolev space H s (0, L)?
      As mentioned before, Bubnov [16] studied the following IBVP of the KdV equation on the finite
interval (0, 1):
                    
                    
                      ut + uux + uxxx = f , u(x, 0) = 0, x ∈ (0, 1), t ∈ (0, T ),
                    
                    α u (0,t) + α u (0,t) + α u(0,t) = 0,
                         1 xx           2 x            3
(2.4)
                    
                    
                    
                       β  u
                         1 xx (1,t) + β  u
                                        2 x (1,t) + β 3 u(1,t) = 0,
                       χ1 ux (1,t) + χ2 u(1,t) = 0
                    

and obtained the following result.
Theorem A [16]: Assume

<!-- PK SYNC doc=math_p3 page=02 fp=206686989428 -->
 that
                   
                   
                    i f α1 β1 χ1 6= 0, then F1 > 0, F2 > 0,
                   
                     i f β1 6= 0, χ1 6= 0, α1 = 0, then α2 = 0, F2 > 0, α3 6= 0,
                   
                   
                   
                   
                   
                   i f β = 0, χ 6= 0, α 6= 0, then F > 0, F 6= 0,
                          1         1        1           1       3
(2.5)
                   
                    i f α1 = β1 = 0, χ1 6= 0, then F3 6= 0, α2 = 0, α3 6= 0,
                   
                     i f β1 = 0, α1 6= 0, χ1 = 0, then F1 > 0, F3 6= 0,
                   
                   
                   
                   
                   
                     i f α1 = β1 = χ1 = 0, then α2 = 0, α3 6= 0, F3 6= 0,
                   

where
                                α3  α2         β2 χ2 β3  χ2
                         F1 =      − 22 , F2 =      − − 22 , F3 = β2 χ2 − β1 χ1 .
                                α1 2α1         β1 χ1 β1 2 χ1
For any given
                                          1
                                     f ∈ Hloc (0, ∞; L2 (0, 1)) with f (x, 0) = 0,
there exists a T > 0 such that (2.4) admits a unique solution
                    u ∈ L2 (0, T ; H 3 (0, 1)) with ut ∈ L∞ (0, T ; L2 (0, 1)) ∩ L2 (0, T ; H 1 (0, 1)).


<!-- PK PAGE doc=math_p3 n=03/12 fp=206686989428 -->
---
                                                       IBVP OF THE KDV                                          3


      The main tool used by Bubnov to prove his theorem is the following Kato type smoothing property for
solution u of the linear system associated to the IBVP (2.4),
                           
                           
                            ut + uxxx = f , u(x, 0) = 0, x ∈ (0, 1), t ∈ (0, T ),
                           
                           α u (0,t) + α u (0,t) + α u(0,t) = 0,
                               1 xx            2 x            3
(2.6)
                           
                           
                           
                             β   u
                               1 xx  (1,t) + β  u
                                               2 x (1,t) + β 3 u(1,t) = 0,
                              χ1 ux (1,t) + χ2 u(1,t) = 0.
                           

Under the assumptions (2.5):
                    f ∈ L2 (0, T ; L2 (0, 1)) =⇒ u ∈ L2 (0, T ; H 1 (0, 1)) ∩ L∞ (0, T ; L2 (0, 1))
and
                             kukL2 (0,T ;H 1 (0,1)) + kukL∞ (0,T ;L2 (0,1)) ≤ Ck f kL2 (0,T ;L2 (0,T ))
where C > 0 is a constant independent of f .
      In the past thirty years since the work of Bubnov, various boundary-value problems of the KdV equa-
tion have been studied. In particular, the following three classes of IBVPs of the KdV equation on the finite
interval (0, L),
                        (
                          ut + ux + uux + uxxx = 0, u(x, 0) = φ (x), x ∈ (0, L), t > 0,
(2.7)
                          u(0,t) = h1 (t), u(L,t) = h2 (t), ux (L,t) = h3 (t),
                        (
                         ut + ux + uux + uxxx = 0, u(x, 0) = φ (x), x ∈ (0, L), t > 0,
(2.8)
                         u(0,t) = h1 (t), u(L,t) = h2 (t), uxx (L,t) = h3 (t),
and
                        (
                         ut + ux + uux + uxxx = 0, u(x, 0) = φ (x), x ∈ (0, L), t > 0,
(2.9)
                         uxx (0,t) = h1 (t), ux (L,t) = h2 (t), uxx (L,t) = h3 (t),
as well as the IBVPs of the KdV equation posed in a quarter plane have been intensively studied in the past
twenty years (cf. [5, 8, 23, 29, 30, 32, 33, 36, 47, 48, 51] and the references therein) following the rapid
advances of the study of the pure initial value problem of the KdV equation posed on the whole line R or on
the periodic domain T (cf. [2, 3, 9, 10, 11, 26, 29, 30, 31, 40, 41, 42, 43, 44, 45] and the references therein).
      The nonhom

<!-- PK SYNC doc=math_p3 page=03 fp=206686989428 -->
ogeneous IBVP (2.7) was first studied by Faminskii in [29, 30] and was shown to be
well-posed in the spaces L2 (0, L) and H 3 (0, L).
Theorem B [29, 30] Let T > 0 be given. For any φ ∈ L2 (0, L) and ~h = (h1 , h2 , h3 ) belonging of
                    1                              1               5                   1
                 W 3 ,1 (0, T ) ∩ L6+ε (0, T ) ∩ H 6 (0, T ) ×W 6 +ε ,1 (0, T ) ∩ H 3 (0, T ) × L2 (0, T ),
the IBVP (2.7) admits a unique solution
                                    u ∈ C([0, T ]; L2 (0, L)) ∩ L2 (0, T ; H 1 (0, L)).
Moreover, the solution map is continuous in the corresponding spaces. In addition, if φ ∈ H 3 (0, L), h′1 ∈
  1                               1                  5                   1
W 3 ,1 (0, T ) ∩ L6+ε (0, T ) ∩ H 6 (0, T ), h′2 ∈ W 6 +ε ,1 (0, T ) ∩ H 3 (0, T ) and h′3 ∈ L2 (0, T ) with
                                   φ (0) = h1 (0), φ (L) = h2 (0), φ ′ (L) = h3 (0),
then the solution u ∈ C1 ([0, T ]; H 3 (0, L)) ∩ L2 (0, T ; H 4 (0, L)).
      Bona et al. in [5] showed that the IBVP (2.7) is locally well-posed in the space H s (0, L) for any s ≥ 0:
Theorem C [5]: Let s ≥ 0 , r > 0 and T > 0 be given. There exists a T ∗ ∈ (0, T ] such that for any
s−compatible φ ∈ H s (0, L) and
                             ~h = (h1 , h2 , h3 ) ∈ H s+1           s+1            s
                                                       3 (0, T ) × H 3 (0, T ) × H 3 (0, T )


satisfying
                                 kφ kH s (0,L) + k~hk s+1              s+1       s         ≤ r,
                                                       H
                                                       3    (0,T )×H 3 (0,T )×H 3 (0,T )


<!-- PK PAGE doc=math_p3 n=04/12 fp=206686989428 -->
---
4                                        CAPISTRANO–FILHO, SUN, AND ZHANG


the IBVP (2.7) admits a unique solution
                                 u ∈ C([0, T ∗ ]; H s (0, L)) ∩ L2 (0, T ∗ ; H s+1 (0, L)).
Moreover, the corresponding solution map is analytic in the corresponding spaces.
     Holmer [36] proved that IBVP (2.7) is locally well-posed in the space H s (0, L) for any − 34 < s < 21 ,
and Bona et al. in [8] showed that the IBVP (2.7) is locally well-posed H s (0, L) for any s > −1.
     As for the IBVP (2.8), its study began with the work of Colin and Ghidalia in late 1990’s [23, 24, 25].
They obtained in [25] the following results.
    (i) Given h j ∈ C1 ([0, ∞)), j = 1, 2, 3 and φ ∈ H 1 (0, L) satisfying h1 (0) = φ (0), there exists a T > 0
        such that the IBVP (2.8) admits a solution (in the sense of distribution)
                                    u ∈ L∞ (0, T ; H 1 (0, L)) ∩C([0, T ]; L2 (0, L)).
    (ii) The solution u of the IBVP (2.8) exists globally in H 1 (0, L) if the size of its initial value φ ∈ H 1 (0, L)
         and its boundary values h j ∈ C1 ([0, ∞)), j = 1, 2, 3 are all small.
In addition, they showed that the associate linear IBVP
                        (
                           ut + ux + uxxx = 0,      u(x, 0) = φ (x) x ∈ (0, L), t ∈ R+
(2.10)
                           u(0,t) = 0, ux (L, x) = 0, uxx (L,t) = 0
possesses a strong smoothing property:
      For any φ ∈ L2 (0, L), the linear IBVP (2.10) admits a unique solution
                                     u ∈ C(R+ ; L2 (0, L)) ∩ L2loc (R+ ; H 1 (0, L)).
 Aided by this smoothing property, Colin and Ghidaglia showed that the homogeneous IBVP (2.8) is locally
well-posed in the space L2 (0, L).
Theorem D [25] Assuming h1 = h2 = h3 ≡ 0, then for any given φ ∈ L2 (0, L), there exists a T > 0 such that
the IBVP (2.8) admits a unique weak solution u ∈ C([0, T ]; L2 (0, L)) ∩ L2 (0, T ; H 1 (0, L)).
      Returning the attention to the IBVP (2.8), Rivas et al. in [51], showed that the solutions exist globally
as long as their initial values and the associated boundary data are small, they proved the following result:
Theorem E [51] Let s ≥ 0 with s 6= 2 j−1  2 , j = 1, 2, 3... There exist positive constants δ and T such that for
                            s          ~
any s−compatible φ ∈ H (0, L) and h = (h1 , h2 , h3 ) on the class
                                            s+1                     s                     s−1
                            Bs(t,t+T ) 

<!-- PK SYNC doc=math_p3 page=04 fp=206686989428 -->
:= H 3 (t,t + T ) × H 3 (t,t + T ) × H 3 (t,t + T )
with kφ kH s (0,L) + k~hkBs(t,t+T ) ≤ δ , and supt≥0 k~hkBs(t,t+T ) < ∞, the IBVP (2.10) admits a unique solution
                               s                         s           2             s+1
                         u ∈ Y(t,t+T ) := C([t,t + T ]; H (0, L)) ∩ L (t,t + T ; H     (0, L))
such that for any t ≥ 0, supt≥0 k~vkY(t,t+T
                                      s
                                            )
                                              < ∞.
      More recently, Kramer et al. in [48] showed that the IBVP (2.8) is locally well-posedness in the
classical Sobolev space H s (0, L), for s > − 34 , which provides a positive answer to one of the open questions
of Colin and Ghidalia [25].
      Kramer and Zhang in [47], studied the following non-homogeneous boundary value problem,
                     
                     
                      ut + uux + uxxx = 0, u(x, 0) = φ (x), x ∈ (0, 1), t ∈ (0, T ),
                     
                     α u (0,t) + α u (0,t) + α u(0,t) = h (t),
                         1 xx            2 x             3           1
(2.11)
                     
                     
                      β 1 uxx (1,t) + β 2 ux (1,t) + β 3 u(1,t) = h2 (t),
                       χ1 ux (1,t) + χ2 u(1,t) = h3 (t).
                     

They showed that the IBVP (2.11) is locally well-posed in the space H s (0, 1) for any s ≥ 0 under the
assumption (2.5).
Theorem F [47] Let s ≥ 0 and T > 0 be given and assume (2.5) holds. For any r > 0, there exists a
                                                                    s+1
T ∗ ∈ (0, T ] such that for any s−compatible φ ∈ H s (0, 1), h j ∈ H 3 (0, T ), j = 1, 2, 3 with
                         kφ kH s (0,1) + kh1 k s+1            + kh2 k s+1            + kh3 k s+1            ≤ r,
                                             H  3    (0,T )          H 3    (0,T )          H 3    (0,T )


<!-- PK PAGE doc=math_p3 n=05/12 fp=206686989428 -->
---
                                                            IBVP OF THE KDV                                 5


the IBVP (2.11) admits a unique solution
                                       u ∈ C([0, T ∗ ]; H s (0, 1)) ∩ L2 (0, T ∗ ; H s+1 (0, 1)).
Moreover, the solution u depends continuously on its initial data φ and the boundary values h j , j = 1, 2, 3
in the respective spaces.
      Recently, Capistrano–Filho et al. [17] studied the IBVP (2.9). The authors proved the local well-
posedness for this system. More precisely:
Theorem G [17] Let T > 0 and s ≥ 0. There exists a T ∗ ∈ (0, T ] such that for any (φ ,~h) ∈ XT , where
                                                            s−1                    s                s−1
                                    XT := H s (0, L) × H 3 (0, T ) × H 3 (0, T ) × H 3 (0, T )
the IBVP (2.9) admits a unique solution
                                        u ∈ C([0, T ]; H s (0, L)) ∩ L2 (0, T ; H s+1 (0, L))
In addition, the solution u possesses the hidden regularities
                                                            s+1−l
                                      ∂xl u ∈ L∞ (0, L; H     3     (0, T ∗ ))         for   l = 0, 1, 2.
and, moreover, the corresponding solution map is Lipschitz continuous.
      Finally, in a recently work, Capistrano–Filho et al. in [18] studied the well-posedness of IBVP (2.2)-
(2.3). The authors proposed the following hypotheses on those coefficients ai j , bi j , j, i = 0, 1, 2, 3:
  (A1) a12 = a11 = 0, a10 6= 0, b12 = b11 = b10 = 0;
  (A2) a12 6= 0, b12 = 0;
  (B1) b22 = b21 = 0, b20 6= 0, a22 = a21 = a20 = 0;
  (B2) b22 6= 0, a22 = 0;
   (C) b32 = 0, b31 6= 0, a32 = a31 = 0.
For s ≥ 0, consider the set
                                H0s (0, L) := {φ (x) ∈ H s (0, L) : φ (k) (0) = φ (k) (L) = 0}
with k = 0, 1, 2, · · · , [s] and
                                         H0s (0, T ] := {h(t) ∈ H s (0, T ) : h( j) (0) = 0},
for j = 0, 1, ..., , [s]. In addition, letting
                                                    s+1            s+1            s
                                
                                
                                
                                  H1s (0, T ) := H0 3 (0, T ] × H0 3 (0, T ] × H03 (0, T ],
                                H s (0, T ) := H s+1              s−1            s
                                
                                
                                        2
                                     

<!-- PK SYNC doc=math_p3 page=05 fp=206686989428 -->
                3
                                                        (0, T ] × H 3 (0, T ] × H 3 (0, T ],
                                                        0                   0                   0
                                                        s−1                  s+1                s
                                
                                
                                 H3s (0, T ) := H0 3 (0, T ] × H0 3 (0, T ] × H03 (0, T ],
                                
                                                  s−1            s−1            s
                                 s
                                  H4 (0, T ) := H0 3 (0, T ] × H0 3 (0, T ] × H03 (0, T ]
and
                                 s               s+1           s+1            s
                                
                                 W1 (0, T ) := H 3 (0, T ) × H 3 (0, T ) × H 3 (0, T ),
                                W s (0, T ) := H s+1
                                                               s−1            s
                                                   3 (0, T ) × H 3 (0, T ) × H 3 (0, T ),
                                   2
                                                  s−1           s+1            s
                                
                                 W3s (0, T ) := H 3 (0, T ) × H 3 (0, T ) × H 3 (0, T ),
                                                  s−1           s−1            s
                                
                                 s
                                  W4 (0, T ) := H 3 (0, T ) × H 3 (0, T ) × H 3 (0, T ),
they proved the following well-posedness results for the IBVP (2.2)-(2.3):
Theorem H [18] Let s ≥ 0 with s 6= 2 j−1
                                      2 , j = 1, 2, 3..., and T > 0 be given. If one of the assumptions
below is satisfied,
     (i) (A1), (B1) and (C) hold,
    (ii) (A1), (B2) and (C) hold,
   (iii) (A2), (B1) and (C) hold,
   (iv) (A2), (B2) and (C) hold,


<!-- PK PAGE doc=math_p3 n=06/12 fp=206686989428 -->
---
6                                            CAPISTRANO–FILHO, SUN, AND ZHANG


then, for any r > 0, there exists a T ∗ ∈ (0, T ] such that for any
                                                (φ ,~h) ∈ H0s (0, L) × H1s (0, T )
satisfying k(φ ,~h)kL2 (0,L)×H 0 (0,T ) ≤ r, the IBVP (2.2)-(2.3) admits a solution
                                 1

                                      u ∈ C([0, T ∗ ]; H s (0, L)) ∩ L2 (0, T ∗ ; H s+1 (0, L))
possessing the hidden regularity (the sharp Kato smoothing properties)
                                                           s+1−l
                                     ∂xl u ∈ L∞ (0, L; H     3     (0, T ∗ ))   for    l = 0, 1, 2.
Moreover, the corresponding solution map is analytically continuous.

                                                  3. F URTHER COMMENTS
     Before presenting the main ideas to prove Theorem G , let us introduce the following boundary opera-
tors Bk , k = 1, 2, 3, 4 as Bk = Bk,0 + Bk,1 with
                    B1,0 v := (v(0,t), v(L,t), vx (L,t)),              B2,0 v := (v(0,t), vx (L,t), vxx (L,t)),
                   B3,0 v := (vxx (0,t), v(L,t), vx (L,t)),             B4,0 v := (vxx (0,t), vx (L,t), vxx (L,t))
and
       B1,1 v := (0, 0, 0) ,
       B2,1 v := (0, b30 v(L,t), a21 vx (0,t) + b20 v(L,t)) ,
       B3,1 v := (a10 v(0,t) + a11 vx (0,t), 0, a30 v(0,t)) ,
                                                                                                                           !
                      1                                                                    1
       B4,1 v :=     ∑     a1 j ∂xj v(0,t) + b10 v(L,t), a30 v(0,t) + b30 v(L,t),         ∑     a2 j ∂xj v(0,t) + b20 v(L,t)   .
                     j=0                                                                  j=0

Thus, the assumptions imposed on the boundary conditions in Theorem G can be reformulated as follows:
    (i) ((A1), (B1), (C)) ⇔ B1 v = ~h,
   (ii) ((A1), (C), (B2)) ⇔ B2 v = ~h,
  (iii) ((A2), (B1), (C)) ⇔ B3 v = ~h,
  (iv) ((A2), (C), (B2)) ⇔ B4 v = ~h.
In [18], to prove Theorem G , the authors first studied the linear IBVP
                               
                               ut + uxxx + δk u = f , x ∈ (0, L), t > 0
                               
(3.12)                            u(x, 0) = φ (x),
                                  Bk,0 u = ~h,
                               
                               

for k = 1, 2, 3, 4, to establish all the linear estimates nee

<!-- PK SYNC doc=math_p3 page=06 fp=206686989428 -->
ded for dealing with the nonlinear IBVP (2.2)-(2.3).
Here δk = 0 for k = 1, 2, 3 and δ4 = 1.
      After that, they considered the nonlinear map Γ defined by the following IBVP:
                            
                            ut + uxxx + δk u = −vx − vvx + δk v, x ∈ (0, L), t > 0
                            
(3.13)                        u(x, 0) = φ (x),
                              Bk,0 u = ~h − Bk,1 v,
                            
                            

showing thus that Γ is a contraction in an appropriate space whose fixed point will be the desired solution
of the nonlinear IBVP (2.2)-(2.3) by using the sharp Kato smoothing property of the solution of the IBVP
(3.12).
      The main point here is to demonstrate the smoothing properties for solutions of the IBVP (3.12). In
order to overcome this difficulty, Capistrano–Filho et al. in [18] needed to study the following IBVP
                                
                                ut + uxxx + δk u = 0, x ∈ (0, L), t > 0,
                                
(3.14)                             u(x, 0) = 0,
                                   Bk,0 u = ~h.
                                
                                


<!-- PK PAGE doc=math_p3 n=07/12 fp=206686989428 -->
---
                                                  IBVP OF THE KDV                                             7

                                                                                                         (k)
The corresponding solution map ~h → u will be called the boundary integral operator denoted by Wbdr .
An explicit representation formula is given for this boundary integral operator that plays an important role
in showing the solution of the IBVP (3.14) possesses the smoothing properties. The needed smoothing
properties for solutions of the IBVP (3.12) will then follow from the smoothing properties for solutions of
the IBVP (3.14) and the well-known sharp Kato smoothing properties for solutions of the Cauchy problem
                                ut + uxxx + δk u = 0,     u(x, 0) = ψ (x),      x, t ∈ R.
       Finally, the following comments are now given in order:
Remark 1. The temporal regularity conditions imposed on the boundary values ~h on Theorem G are optimal
(cf. [4, 6, 7]).
Remark 2. As a comparison, note that the assumptions of Theorem A are equivalent to one of the following
boundary conditions imposed on the equation in (2.4):
     a)
                                 u(0,t) = 0, u(1,t) = 0, ux (1,t) = 0;
     b)
                     uxx (0,t) + aux (0,t) + bu(0,t) = 0, ux (1,t) = 0, u(1,t) = 0
with
(3.15)                                                  a > b2 /2;
       c)
                  u(0,t) = 0,     uxx (1,t) + aux (1,t) + bu(1,t) = 0,       ux (1,t) + cu(1,t) = 0,
with
(3.16)                                            ac > b − c2 /2;
       d)
                                      uxx (0,t) + a1 ux (0,t) + a2 u(0,t) = 0,
                                      uxx (1,t) + b1 ux (1,t) + b2 u(1,t) = 0,
and
                                              ux (1,t) + cu(1,t) = 0,
with
(3.17)                                    a2 > a21 /2,     b1 c > b2 − c2 /2.
It follows from Theorem G that conditions (3.15), (3.16) and (3.17) for Theorem A can be removed.

                                               4. O PEN PROBLEMS
      While the results reported in this paper gave a significant improvement in the theory of initial boundary
value problems of the KdV equation on a finite interval, there are still many questions to be addressed for
the following IBVP:
                             
                             ut + ux + uxxx + uux = 0,
                                                              0 < x < L, t > 0,
(4

<!-- PK SYNC doc=math_p3 page=07 fp=206686989428 -->
.18)                         u(x, 0) = φ (x),
                               Bk u = ~h.
                             
                             

Here we list a few of them which are most interesting to us.
• Is the IBVP (4.18) globally well-posed in the space H s (0, L) for some s ≥ 0 or equivalently, does any
solution of the IBVP (4.18) blow up in the some space H s (0, L) in finite time?
       It is not clear if the IBVP (4.18) is globally well-posed or not even in the case of ~h ≡ 0. It follows
Theorem G (see [18]) that a solution u of the IBVP (4.18) blows up in the space H s (0, L) for some s ≥ 0 at
a finite time T > 0 if and only if
                                            lim− ku(·,t)kL2 (0,L) = +∞.
                                            t→T


<!-- PK PAGE doc=math_p3 n=08/12 fp=206686989428 -->
---
8                                       CAPISTRANO–FILHO, SUN, AND ZHANG


Consequently, it suffices to establish a global a priori L2 (0, L) estimate
(4.19)                                       sup ku(·,t)kL2 (0,L) < +∞,
                                            0≤t<∞

for solutions of the IBVP (4.18) in order to obtain the global well-posedness of the IBVP (4.18) in the space
H s (0, L) for any s ≥ 0. However, estimate (4.19) is known to be held only in one case
                            
                            ut + ux + uux + uxxx = f ,
                                                            0 < x < L, t > 0
                              u(x, 0) = φ (x)
                            
                              u(0,t) = h1 (t), u(L,t) = h2 (t), ux (L,t) = h3 (t).
                            

• Is the IBVP well-posed in the space H s (0, L) for some s ≤ −1?
     Theorem G ensures that the IBVP (4.18) is locally well-posed in the space H s (0, L) for any s ≥ 0.
Theorem G can also be extended to the case of −1 < s ≤ 0 using the same approach developed in [8]. For
the pure initial value problems (IVP) of the KdV equation posed on the whole line R or on torus T,
(4.20)                         ut + uux + uxxx = 0,         u(x, 0) = φ (x),     x, t ∈ R
and
(4.21)                      ut + uux + uxxx = 0,          u(x, 0) = φ (x),     x ∈ T, t ∈ R,
it is well-known that the IVP (4.20) is well-posed in the space H s (R) for any s ≥ − 34 and is (conditionally)
ill-posed in the space H s (R) for any s < − 34 in the sense the corresponding solution map cannot be uniformly
continuous. As for the IVP (4.21), it is well-posed in the space H s (T) for any s ≥ −1. The solution
map corresponding to the IVP (4.21) is real analytic when s > − 21 , but only continuous (not even locally
uniformly continuous) when −1 ≤ s < − 21 . Whether the IVP (4.20) is well-posed in the space H s (R) for
any s < − 34 or the IVP (4.21) is well-posed in the space H s (T) for any s < −1 is still an open question. On
the other hand, by contrast, the IVP of the KdV-Burgers equation
                          ut + uux + uxxx − uxx = 0,         u(x, 0) = φ (x),     x ∈ R, t > 0
is known to be well-posed in the space H s (R) for any s ≥ −1, but is known to be ill-posed for any s < −1.
We conjecture that the IBVP (4.18) is ill-posed in the space H s (0, L) for any s < −1.
      Finally, still concerning with well-posedness problem, while the approach developed recently in [18]
st

<!-- PK SYNC doc=math_p3 page=08 fp=206686989428 -->
udies the nonhomogeneous boundary value problems of the KdV equation on (0, L) with quite general
boundary conditions, there are still some boundary value problems of the KdV equation that the approach
do not work, for example
                          
                          ut + uux + uxxx = 0, x ∈ (0, L)
                          
(4.22)                      u(x, 0) = φ (x),
                          
                            u(0,t) = u(L,t), ux (0,t) = ux (L,t), uxx (0,t) = uxx (L,t)
                          

and
                               
                               ut + uux + uxxx = 0, x ∈ (0, L),
                               
(4.23)                          u(x, 0) = φ (x),
                               
                                u(0,t) = 0, u(L,t) = 0, ux (0,t) = ux (L,t).
                               

A common feature for these two boundary value problems is that the L2 −norm of their solutions are con-
served:
                                Z L                  Z L
                                      u2 (x,t)dx =         φ 2 (x)dx     for any t ∈ R.
                                 0                    0
The IBVP (4.22) is equivalent to the IVP (4.21) which was shown by Kato [38, 39] to be well-posed in the
space H s (T) when s > 23 as early as in the late 1970s. Its well-posedness in the space H s (T) when s ≤ 23 ,


<!-- PK PAGE doc=math_p3 n=09/12 fp=206686989428 -->
---
                                                IBVP OF THE KDV                                                 9


however, was established 24 years later in the celebrated work of Bourgain [9, 10] in 1993. As for the IBVP
(4.23), its associated linear problem
                                      
                                      ut + uxxx = 0, x ∈ (0, L),
                                      
                                        u(x, 0) = φ (x), u(0,t) = 0,
                                      
                                        u(L,t) = 0, ux (0,t) = ux (L,t)
                                      

has been shown by Cerpa (see, for instance, [20]) to be well-posed in the space H s (0, L) forward and
backward in time. However, the following problem is still unknown:
• Is the nonlinear IBVP (4.23) well-posed in the space H s (0, L) for some s ?
4.1. Control theory. Control theory for KdV equation has been extensively studied in the past two decades
and the interested reader is referred to [20] for an overall view of the subject. As it is possible to see in the
paper above, several authors have addressed the study of control theory of the IBVP (see, e.g, [17, 22, 52]),
who worked on the following four problems related to the IBVP (4.18):
                                                                  
                        
                        
                          u(0,t) =  h1,1 (t),  t ≥ 0,             u(0,t) = h1,2 (t),
                                                                   
                                                                                           t ≥ 0,
              B1,0 v := u(L,t) = h2,1 (t), t ≥ 0, B2,0 v := ux (L,t) = h2,2 (t), t ≥ 0,
                        
                                                                  
                                                                   
                        u (L,t) = h (t), t ≥ 0,                   u (L,t) = h (t), t ≥ 0,
                            x          3,1                             xx          3,2
                                                                 
                       uxx (0,t) = h1,3 (t) t ≥ 0,               uxx (0,t) = h1,4 (t), t ≥ 0,
                       
                                                                 
                                                                  
              B3,0 u := u(L,t) = h2,3 (t), t ≥ 0,        B4,0 u := ux (L,t) = h2,4 (t), t

<!-- PK SYNC doc=math_p3 page=09 fp=206686989428 -->
 ≥ 0,
                       
                                                                 
                                                                  
                       u (L,t) = h (t), t ≥ 0                    u (L,t) = h (t), t ≥ 0.
                         x          3,3                             xx          3,4
      The first class of problem (4.18)–B1,0 v was studied by Rosier [52] considering only the control input
h3,1 (i.e. h1,1 = h2,1 = 0). It was shown in [52] that the exact controllability of the linearized system holds
in L2 (0, L) if and only if, L does not belong to the following countable set of critical lengths
                                                                          
                                              2π p 2          2          ∗
                                     N := √         k + kl + l : k, l ∈ N .
                                                3
The analysis developed in [52] shows that when the linearized system is controllable, the same is true for
the nonlinear case. Note that the converse is false, as it was proved in [19, 21, 27], that is, the (nonlinear)
KdV equation is controllable even when L is a critical length but the linearized system is non controllable.
      The existence of a discrete set of critical lengths for which the exact controllability of the linearized
equation fails was also noticed by Glass and Guerrero in [35] when h2,1 is taken as control input (i.e.
h1,1 = h3,1 = 0). Finally, it is worth mentioning the result by Rosier [53] and Glass and Guerrero [34] for
which h1,1 is taken as control input (i.e. h2,1 = h3,1 = 0). They proved that system (4.18) with boundary
conditions B1,0 v is then null controllable, but not exactly controllable, because of the strong smoothing
effect.
      Recently, Cerpa et al. in [22] proved similar results to those obtained by Rosier [52] for the system
(4.18) with boundary conditions B2,0 v. More precisely, the authors consider the system with one, two or
three controls. In addition, using the well-posedness properties proved by Kramer et al. in [48], they also
proved that the controls hi,2 , i = 1, 2, 3 belong to sharp spaces and the locally exact controllability of the
linear system associated to (4.18) holds if, and only if, L does not belong to the following countable set of
critical lengths
                      (                                                                                 )
                      

<!-- PK SYNC doc=math_p3 page=09 fp=206686989428 -->
                                                           e a    e b   e −(a+b))
(4.24)         F := L ∈ R+ : L2 = −(a2 + ab + b2 ) with a, b ∈ C satisfying 2 = 2 =                       .
                                                                                 a      b     (a + b)2
Moreover, they showed that the nonlinear system (4.18) with boundary conditions B2,0 v is locally exactly
controllable via the contraction mapping principle.
      Recently, Caicedo et al., in [17], proved the controllability results for the system (2.9), that is, system
(4.18) with boundary conditions B4,0 v. Naturally, they used the same approaches that have worked effec-
tively for system (4.18) with boundary condition B1,0 v and B2,0 v. In particular, if only h2,4 (t) is used, they


<!-- PK PAGE doc=math_p3 n=10/12 fp=206686989428 -->
---
10                                           CAPISTRANO–FILHO, SUN, AND ZHANG


showed that the system (4.18) with boundary conditions B4,0 v is locally exactly controllable as long as
(4.25)                                          / R := N ∪ {kπ : k ∈ N∗ } .
                                               L∈
Thus, with respect of the control issue, a natural and interesting open problem arises here:
• Is the IBVP (4.18), with general boundary condition, controllable?
Acknowledgement. The authors wish to thank the referee for his/her valuable comments which improved this
paper. Roberto Capistrano-Filho was supported by CNPq (Brazilian Technology Ministry), Project PDE,
grants 306475/2017-0, 408181/2018-4 and partially supported by CAPES (Brazilian Education Ministry)
and Bing-Yu Zhang was partially supported by NSF of China (11571244, 11231007).

                                                         R EFERENCES
[1] G. B. Airy, Tides and waves. Encyclopaedia Metropolitana Mixed Sciences, Vol. 3, 1817–1845 (1841).
[2] J. L. Bona and L. R. Scott, Solutions of the Korteweg-de Vries equation in fractional order Sobolev Spaces, Duke Math Journal,
 Vol. 43, 87–99 (1976).
[3] J. L. Bona and L. R. Scott, The initial value problem for the Korteweg-de Vries equation, Philos. Trans. Roy.Soc. London A,
 Vol. 278, 555–601 (1978).
[4] J. L. Bona, S,-M. Sun and B.-Y. Zhang, A nonhomogeneous boundary value problem for the Korteweg-de Vries equation in a
 quarter plane, Trans. American Math. Soc., Vol. 354, 427–490 (2002).
[5] J. L. Bona, S,-M. Sun and B.-Y. Zhang, A nonhomogeneous boundary-value problem for the Korteweg-de Vries Equation on a
 finite domain, Comm. in PDEs, Vol. 8, 1391–1436 (2003).
[6] J. L. Bona, S,-M. Sun and B.-Y. Zhang, Conditional and unconditional well posedness of nonlinear evolution equations, Adv.
 Differential Eq., Vol. 9, 241–265 (2004).
[7] J. L. Bona, S,-M. Sun and B.-Y. Zhang, Boundary Smoothing Properties of the Korteweg-de Vries Equation in a Quarter Plane
 and Applications, Dynamics of PDEs., Vol. 3, 1–69 (2006).
[8] J. L. Bona, S,-M. Sun and B.-Y. Zhang, Nonhomogeneous problem for the Korteweg-de Vries equation in a bounded domain
 II, J. Differential Equations, Vol. 247, 2558–2596 (2009).
[9] J. Bourgain, Fourier transform restriction phenomena for certain lattice subsets and applications to nonlinear evolution equa-
 tions, part I: Shrödinger equations, Geom. Funct. Anal., Vol. 3, 107–156 (1993).
[10] J. Bourgain, Fourier transform 

<!-- PK SYNC doc=math_p3 page=10 fp=206686989428 -->
restriction phenomena for certain lattice subsets and applications to nonlinear evolution equa-
 tions, part II: the KdV-equation, Geom. Funct. Anal., Vol. 3, 209–262 (1993).
[11] J. Bourgain, Periodic Korteweg de Vries equation with measures as initial data, Selecta Math., Vol. 3, 115–159 (1997).
[12] M. J. Boussinesq, Théorie de l’intumescence liquide, applelée onde solitaire ou de, translation, se propageant dans un canal
 rectangulaire, C. R. Acad. Sci. Paris, Vol. 72, 755–759 (1871).
[13] M. J. Boussinesq, Théorie générale des mouvements qui sont propagés dans un canal rectangulaire horizontal, C. R. Acad.
 Sci. Paris, Vol. 73, 256–260 (1871)
[14] M. J. Boussinesq, Théorie des ondes et des remous qui se propagent le long d’un canal rectangularie horizontal, en commu-
 niquant au liquide contenu dans ce canal des vitesses sensiblement pareilles de la surface au fond, J. Math. Pures Appl., Vol. 17,
 55–108 (1872)
[15] M. J. Boussinesq, Essai sur la théorie des eaux courantes, Mémoires présentés par divers savants á l’Académie des Sciences
 Inst. France (séries 2), Vol. 23, 1–680 (1877).
[16] B. A. Bubnov, Generalized boundary value problems for the Korteweg-de Vries equation in bounded domain, Differential
 Equations, Vol. 15, 17–21 (1979).
[17] M. C. Caicedo, R. A. Capistrano-Filho and B.-Y. Zhang, Control of the Korteweg-de Vries equation with Neumann boundary
 conditions, SIAM J. Control Optim., Vol. 55, 3503–3532 (2017).
[18] R. A. Capistrano-Filho, S.-M. Sun and B.-Y. Zhang, General boundary value problems of the Korteweg-de Vries equation on
 a bounded domain, Math. Control & Relat. Field, Vol. 8, 583–605, (2018)
[19] E. Cerpa, Exact controllability of a nonlinear Korteweg-de Vries equation on a critical spatial domain, SIAM J. Control
 Optim., Vol. 43, 877–899 (2007).
[20] E. Cerpa, Control of a Korteweg-de Vries equation: a tutorial, Math. Control Relat. Field, Vol. 4, 45–99 (2014).
[21] E. Cerpa and E. Crépeau, Boundary controllability for the nonlinear Korteweg-de Vries equation on any critical domain, Ann.
 I.H. Poincaré, Vol. 26, 457–475 (2009).
[22] E. Cerpa, I. Rivas and B.-Y. Zhang, Boundary controllability of the Korteweg-de Vries equation on a bounded domain, SIAM
 J. Control Optim., Vol.51, 2976–3010 (2013).
[23] T. Colin and J.-M. Ghidaglia, Un probléme aux limites pour l’équation de Korteweg-de Vries sur un intervalle boné (French),
 Journes Equations aux Drives Partielles, 10 pp (1997).
[24] T. Colin and J.-M. Ghi

<!-- PK SYNC doc=math_p3 page=10 fp=206686989428 -->
daglia, A mixed initial-boundary-value problem for the Korteweg-de Vries equation on a bounded
 interval, C. R. Acad. Sci. Paris. Sér. I Math., Vol. 324, 599–603 (1997).
[25] T. Colin and J.-M. Ghidaglia, An initial-boundary-value problem fo the Korteweg-de Vries Equation posed on a finite interval,
 Adv. Differential Equations, Vol. 6, 1463–1492 (2001).


<!-- PK PAGE doc=math_p3 n=11/12 fp=206686989428 -->
---
                                                        IBVP OF THE KDV                                                          11


[26] J. Colliander, M. Keel, G. Staffilani, H. Takaoka and T. Tao, Sharp global well-posedness results for periodic and non-periodic
 KdV and modified KdV on R and T, Journ. American Math. Soc., Vol. 16, 705–749 (2003).
[27] E. Crépeau and J.-M. Coron, Exact boundary controllability of a nonlinear KdV equation with a critical length, J. Eur. Math.
 Soc., Vol. 6, 367–398 (2005).
[28] P. Deift, C. Tomei and E. Trubowitz, Inverse scattering and the Boussinesq equation, Comm. Pure Appl. Math., Vol. 35,
 567–628 (1982).
[29] A. V. Faminskii, The Cauchy problem and the mixed problem in the half strip for equation of Korteweg-de Vries type,
 (Russian) Dinamika Sploshn. Sredy, Vol. 50, 152–158 (1983).
[30] A. V. Faminskii, A mixed problem in a semistrip for the Korteweg-de Vries equation and its generalizations, (Russian)
 Dinamika Sploshn. Sredy, Vol. 258 54–94 (1988).
[31] A. V. Faminskii, Mixed problms fo the Korteweg-de Vries equation, Sbornik: Mathematics, Vol. 190, 903–935 (1999).
[32] A. V. Faminskii, An initial boundary-value problem in a half-strip for the Korteweg-de Vries equation in fractional-order
 Sobolev spaces, Comm. Partial Differential Equations, Vol. 29, 1653–1695 (2004).
[33] A. V. Faminskii, Global well-posedness of two initial-boundary-value problems for the Korteweg-de Vries equation, Differ-
 ential Integral Equations, Vol. 20, 601–642 (2007).
[34] O. Glass and S. Guerrero, Some exact controllability results for the linear KdV equation and uniform controllability in the
 zero-dispersion limit, Asymptot. Anal., Vol.60, 61–100 (2008).
[35] O. Glass and S. Guerrero, Controllability of the Korteweg-de Vries equation from the right Dirichlet boundary condition,
 Systems & Control Lett., Vol. 59, 390–395 (2010).
[36] J. Holmer, The Initial-Boundary Value Problem for the Korteweg-de Vries Equation, Comm. Partial Differential Eq., Vol. 31,
 1151–1190 (2006).
[37] E. M. Jager, On the origin of the Korteweg-de Vries equation, arXiv:math/0602661 [math.HO], Feb. 28, 2006.
[38] T. Kato, On the Korteweg-de Vries Equation, Manuscripta mathematica, Vol. 28, 89–99 (1979).
[39] T. Kato, On the Cauchy problem for the (generalized) Korteweg-de Vries equations, Advances in Mathematics Supplementary
 Studies, Studies in Applied Math., Vol. 8, 93–128 (1983)
[40] C. Kenig, G. Ponce and L. Vega, On the (generalized) Korteweg-de Vri

<!-- PK SYNC doc=math_p3 page=11 fp=206686989428 -->
es equation, Duke Math. J., Vol.59, 585–610 (1989).
[41] C. Kenig, G. Ponce and L. Vega, Oscillatory integrals and regularity of dispersive equations, Indiana Univ. Math. J., Vol. 40,
 33–69 (1991).
[42] C. Kenig, G. Ponce and L. Vega, Well-Posedness of the Initial Value Problem for the Korteweg-de Vries Equation, J. Amer.
 Math. Soc., Vol. 4, 323–347 (1991).
[43] C. Kenig, G. Ponce and L. Vega, The Cauchy problem for the Korteweg-de Vries equation in Sobolev spaces of negative
 indices, Duke Math. J., Vol. 71, 1–21 (1993).
[44] C. Kenig, G. Ponce and L. Vega, Well-Posedness and scattering results for teh generalized Korteweg-de Vries equations via
 the contraction principle, Comm. Pure Appl. Math., Vol. XLVI, 527–620 (1993)
[45] C. Kenig, G. Ponce and L. Vega, A Bilinear Estimate with Applicatios to the KdV Equation, J. Amer. Math. Soc., Vol. 9,
 573–603 (1996).
[46] D. J. Korteweg and G. de Vries, On the change of form of long waves advancing in a rectangular canal and on a new type of
 long stationary waves, Philos. Mag., Vol. 39, 422–443 (1895).
[47] E.F. Kramer and B.-Y. Zhang, Nonhomogeneous boundary value problems for the Korteweg-de Vries equation on a bounded
 domain, J. Syst. Sci. Complex, Vol. 23, 499–526 (2010).
[48] E. F. Kramer, I. Rivas and B.-Y. Zhang, Well-posedness of a class of non-homogeneous boundary value problem of the
 Korteweg-de Vries equation on a finite domain, ESAIM Control Optim. Calc. Var., Vol. 19, 358–384 (2013).
[49] R. Pego, Origin of the KdV equation, Notices of Amer. Math. Sco., Vol. 45, p. 358, (1998).
[50] Rayleigh (J. W. Strutt), On waves, Phil. Mag., Vol. 1, 257–271 (1876).
[51] I. Rivas, M. Usman and B.-Y. Zhang, Global Well-posedness and Asymptotic Behavior of a Class of Initial-Boundary-Value
 Problem of the Korteweg-de Vries Equation on a Finite Domain, Math. Control Relat. Fields, Vol. 1, 61–81 (2011).
[52] L. Rosier, Exact boundary controllability for the Korteweg-de Vries equation on a bounded domain, ESAIM Control Optim.
 Calc. Var., Vol. 2., 33–55 (1997).
[53] L. Rosier, Control of the surface of a fluid by a wavemaker, ESAIM Control Optim. Cal. Var., Vol. 10, 346–380 (2004).
[54] J.S. Russell, Report on waves. Fourteenth meeting of the British Association for the Advancement of Science, (1844).
[55] G. G. Stokes, On the theory of oscillatory waves. Trans. Camb. Philos. Soc, Vol. 8, 441–455, (1847).
[56] V. E. Zakharov, On the stochastization of one dimensional chains of nonlinear oscillaors, Soviet Phys. J

<!-- PK SYNC doc=math_p3 page=11 fp=206686989428 -->
ETP, Vol. 38, 108–110
 (1974).

      D EPARTMENTO DE M ATEM ÁTICA , U NIVERSIDADE F EDERAL DE P ERNAMBUCO 50740-545, R ECIFE (PE), B RAZIL .
      E-mail address: capistranofilho@dmat.ufpe.br

      D EPARTMENT OF M ATHEMATICS , V IRGINIA T ECH , B LACKSBURG , VA 24061, U NITED S TATE
      E-mail address: sun@math.vt.edu

      D EPARTMENT OF M ATHEMATICAL S CIENCES , U NIVERSITY OF C INCINNATI , O HIO 45221-0025, U NITED S TATE
      E-mail address: zhangb@ucmail.uc.edu


<!-- PK PAGE doc=math_p3 n=12/12 fp=206686989428 -->
---

<!-- PK FINGERPRINT A_ȺⱦⱤƗ_206686989428 -->
<!-- PK POISON pastry|veterinary|medieval ledgers (isolation aid only) -->
<!-- PK END doc=math_p3 sha=0522d8380ab077ec6d5b0dd55d7333f31ca76cb88fd8e1cb030709c8fc2cd5a6 pages=11 fp=206686989428 -->
