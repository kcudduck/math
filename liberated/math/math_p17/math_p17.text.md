PKvNext Document

KEY: math_p17 | math |  | a46f8bba | 26 | /papers/IlluminationandReflectancefromShading.pdf
<!-- PK START doc=math_p17 -->


<!-- PK PAGE 1 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                                              1
                                                 Shape, Illumination, and Reflectance
                                                             from Shading
                                                          Jonathan T. Barron, Member, IEEE, and Jitendra Malik, Fellow, IEEE
                                         Abstract—A fundamental problem in computer vision is that of inferring the intrinsic, 3D structure of the world from flat, 2D
                                         images of that world. Traditional methods for recovering scene properties such as shape, reflectance, or illumination rely on
                                         multiple observations of the same scene to overconstrain the problem. Recovering these same properties from a single image
                                         seems almost impossible in comparison — there are an infinite number of shapes, paint, and lights that exactly reproduce a single
                                         image. However, certain explanations are more likely than others: surfaces tend to be smooth, paint tends to be uniform, and
arXiv:2010.03592v1 [cs.CV] 7 Oct 2020
                                         illumination tends to be natural. We therefore pose this problem as one of statistical inference, and define an optimization problem
                                         that searches for the most likely explanation of a single image. Our technique can be viewed as a superset of several classic
                                         computer vision problems (shape-from-shading, intrinsic images, color constancy, illumination estimation, etc) and outperforms
                                         all previous solutions to those constituent problems.
                                         Index Terms—Computer Vision, Machine Learning, Intrinsic Images, Shape from Shading, Color Constancy, Shape Estimation.
                                                                                                            F
                                    1   I NTRODUCTION                                                           tion models, very strong statistical regularities arise
                                                                                                                that are similar to those found in natural images [2],
                                    A     T the core of computer vision is the problem of
                                          taking a single image, and estimating the physi-
                                    cal world which produced that image. The physics of
                                                                                                                [3]. We will construct priors similar to those used
                                                                                                                in natural image statistics, but applied separately to
                                                                                                                shape, reflectance, and illumination. Our algorithm is
                                    image formation makes this “inverse optics” problem
                                                                                                                simply an optimization problem in which we recover
                                    terribly challenging and underconstrained: the space
                                                                                                                the most likely shape, reflectance, and illumination
                                    of shapes, paint, and light that exactly reproduce an
                                                                                                                under these priors that exactly reproduces a single
                                    image is vast.
                                                                                                                image. Our priors are powerful enough that these
                                       This problem is perhaps best motivated using Adel-
                                                                                                                intrinsic scene properties can be recovered from a
                                    son and Pentland’s “workshop” metaphor [1]: con-
                                                                                                                single image, but are general enough that they work
                                    sider the image in Figure 1(a), which has a clear
                                                                                                                across a variety of objects.
                                    percept as a twice-bent surface with a stroke of dark
                                    paint (Figure 1(b)). But this scene could have been                            The output of our model relative to ground-truth
                                    created using any number of physical worlds — it
                                    could be realistic painting on a canvas (Figure 1(c)), a
                                    complicated arrangement of bent shapes (Figure 1(d)),
                                    a sophisticated projection produced by a collection of
                                    lights (Figure 1(e)), or anything in between. The job of
                                    a perceptual system is analogous to that of a prudent
                                    manager in this “workshop”, where we would like
                                    to reproduce the scene using as little effort from our
                                    three artists as possible, giving us Figure 1(b).                                                (a) an image       (b) a likely explanation
                                       This metaphor motivates the formulation of this
                                    problem as one of statistical inference. Though there
                                    are infinitely many possible explanations for a single
                                    image, some are more likely than others. Our goal
                                    is therefore to recover the most likely explanation that
                                    explains an input image. We will demonstrate that in
                                    natural depth maps, reflectance maps, and illumina-
                                                                                                                (c) painter’s explanation   (d) sculptor’s explanation   (e) gaffer’s explanation
                                   • J.T. Barron and J. Malik are with the Department of Electrical Engi-       Fig. 1.    A visualization of Adelson and Pentland’s
                                     neering and Computer Science, University of California at Berkeley,
                                     Berkeley, CA 94720.                                                        “workshop” metaphor [1]. The image in 1(a) clearly
                                     E-mail: barron,malik@eecs.berkeley.edu                                     corresponds to the interpretation in 1(b), but it could
                                                                                                                be a painting, a sculpture, or an arrangement of lights.


<!-- PK PAGE 2 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                      2
                                                            can be seen in Figure 2. Our model is capable of pro-
                                                            ducing qualitatively correct reconstructions of shape,
                                                            surface normals, shading, reflectance, and illumina-
                                                            tion, from a single image. We quantitatively evaluate
                                                            our model on variants of the MIT intrinsic images
                                                            dataset [4], on which we quantitatively outperform all
                                                            previously published intrinsic image or shape-from-
                                                            shading algorithms. We additionally present quali-
                                                            tative results for many more real-world images, for
                                                            which we do not have ground-truth explanations.
                                                               Earlier versions of this work have been presented in
                                                            a piecemeal fashion, over the course of many papers
                                                            [5], [6], [7]. This paper is meant to simplify and unify
                                                            those previous methods.
                                                               This paper will proceed as follows: In Section 2,
                                                            we will review past work as it relates to our own.
                                                            In Section 3 we will formulate our problem as one of
                                                            statistical inference and optimization, with respect to a
                                                            set of priors over shape, reflectance, and illumination.
                                                            In Sections 4, 5, and 6 we present and motivate
                                                            our priors on reflectance, shape, and illumination,
                                                            respectively. In Section 7 we explain how we solve
                                                            our proposed optimization problem. In Section 8 we
                                                            present a series of experiments with our model on
                                                            variants of the MIT Intrinsic Images dataset [4] and
                                                            on real-world images, and in Section 9 we conclude.
                                                             2   P RIOR WORK
                                                            The question of how humans solve the undercon-
                                                            strained problem of perceiving shape, reflectance, and
                                                            illumination from a single image appears to be at
                                                            least one thousand years old, dating back to the
                                                            scientist Alhazen, who noted that ”Nothing of what
                                                            is visible, apart from light and color, can be perceived
                                                            by pure sensation, but only by discernment, infer-
                                                            ence, and recognition, in addition to sensation.” In
                                                            the 19th century the problem was studied by such
                                                            prominent vision scientists as von Helmholtz, Hering
                                                            and Mach [8], who framed the problem as one of
                                                            “lightness constancy” — how humans, when viewing
                                                            a flat surface with patches of varying reflectances
                                                            subject to spatially varying illumination, are able to
                                                            form a reasonably veridical percept of the reflectance
                                                            (“lightness”) in spite of the fact that a darker patch
                                                            under brighter illumination may well have more light
                                                            traveling from it to the eye compared to a lighter patch
                                                            which is less well illuminated.
                                                               Land’s Retinex theory of lightness constancy [9] has
Fig. 2. A single image from our dataset, under three
                                                            been particularly influential in computer vision since
color/illumination conditions. For each condition, we
                                                            its introduction in 1971. It provided a computational
present the ground-truth, the output of SIRFS, the
                                                            approach to the problem in the “Mondrian World”,
output of SIRFS+S (which uses external shape infor-
                                                            a 2D world of flat patches of piecewise constant
mation), and the two best-performing intrinsic image
                                                            reflectance. Retinex theory was later made practical by
techniques (for which we do SFS on the recovered
                                                            Horn [10], who was able to obtain a decomposition of
shading to recover shape).
                                                            an image into its shading and reflectance components
                                                            using the prior belief that sharp edges tend to be
                                                            reflectance, and smooth variation tends to be shading.


<!-- PK PAGE 3 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                      3
   In 1978, Barrow and Tenebaum defined what they           as that of “photoclinometry” [22]. The history of SFS is
called the problem of “intrinsic images”: recovering        well surveyed in [23], [24]. Despite being a severe simproperties such as shape, reflectance, and illumina-        plification of the complete intrinsic images problem,
tion from a single image [11]. In doing so, they            SFS is still a very ill-posed and underconstrained, and
described a challenge in computer vision which is           challenging problem. One notable difficulty in SFS is
still largely unsolved, and which our work directly         the Bas-relief ambiguity [25], which states (roughly)
addresses. Because this problem is so fundamentally         that the absolute orientation and scaling of a surface
underconstrained and challenging, the computer vi-          is ambiguous given only shading information. This
sion community has largely focused its attention on         ambiguity holds true not only for SFS algorithms,
more constrained and tractable sub-problems. Over           but for human vision as well [26]. We address this
time, “intrinsic images” has become synonymous with         ambiguity by imposing priors on shape, building on
the problem that Retinex addressed, that of separating      notions of “smoothness” priors in SFS [27], and by
an image into shading and reflectance components            optionally allowing for external observations of shape
[4], [10], [9]. This area has seen seen some recent         (such as those produced by a stereo system or depth
progress [12], [13], [14], [15], though the performance     sensor) to be introduced.
of Retinex, despite its age, has proven hard to im-            Our model can be viewed as a generalization of
prove upon [4]. The limiting factor in many of these        an “intrinsic image” algorithm or color constancy
“intrinsic image” algorithms appears to be that they        algorithm in which shading is explicitly parametrized
treat “shading” as a kind of image, ignoring the fact       as a function of shape and illumination. Similarly,
that shading is, by construction, the product of some       our model can be viewed as a shape-from-shading
shape and some model of illumination. By addressing         algorithm in which reflectance and illumination are
a superset of this “intrinsic image” problem and re-        unknown, and are recovered. Our model therefore
covering shape and illumination instead of shading,         addresses the “complete” intrinsic images problem, as
our model produces better results than any intrinsic        it was first formulated. By addressing the complete
image technique.                                            problem, rather than two sub-problems in isolation,
   Related to the problem of lightness constancy or         we outperform all previous algorithms for either sub-
“intrinsic images” is the problem of color constancy,       problem. This is consistent with our understanding of
which can be thought of as a generalization of light-       human perception, as humans use spatial cues when
ness constancy from grayscale to color, in which            estimating reflectance and shading [8], [28].
the problem is simplified by assuming that there is            Because the intrinsic images problem is so chaljust one single model of illumination for an entire         lenging given only a single image, a much more
image, rather than a spatially-varying “shading” ef-        popular area of research in computer vision has been
fect. Early techniques for color constancy used gamut       to introduce additional data to better constrain the
mapping techniques [16], finite dimensional models          problem. Instances of this approach are photometric
of reflectance and illumination [17], and physically        stereo [29], which use additional images with different
based techniques for exploiting specularities [18].         illumination conditions to estimate shape, and in later
More recent work uses contemporary probabilistic            work reflectance and illumination [30]. Our algorithm
tools, such as modeling the correlation between colors      produces the same kinds of output as the most adin a scene [19], or performing inference over pri-          vanced photometric stereo algorithm, while requirors on reflectance and illumination [20]. All of this       ing only a single image. “Structure from motion” or
work shares the assumptions of “intrinsic image”            binocular stereo [31], [32] uses multiple images to
algorithms that shape (and to a lesser extent, shading)     recover shape, but ignores shading, reflectance, and
can be ignored or abstracted away.                          illumination. Inverse global illumination [33] recovers
   The second subset of the Barrow and Tenenbaum’s          reflectance and illumination given shape and multiple
original “intrinsic image” formulation that the com-        images, while we recover shape and require only a
puter vision research community has focused on is           single image.
the “shape-from-shading” (SFS) problem. SFS is tra-            Recent work has explored using learning to directly
ditionally defined as: recovering the shape of an object    infer the spatial layout of a scene from a single image
given a single image of it, assuming illumination           [34], [35]. These techniques ignore illumination and
and reflectance are known (or assuming reflectance          reflectance, and produce only a coarse estimate of
is uniform across the entire image). This problem           shape.
formulation is very complimentary to the shape-vs-             A similar approach to our technique is that of
reflectance version of the “intrinsic images” problem,      category-specific morphable models [36] which, given
as it focuses on the parts of the problem which             a single image of a very specific kind of object (a face,
“intrinsic images” ignores, and vice-versa.                 usually), estimates shape, reflectance, and illumina-
   The shape-from-shading problem was first formu-          tion. These techniques use extremely specific models
lated in the computer vision community by Horn in           (priors) of the objects being estimated, and therefore
1975 [21], though the problem existed in other fields       do not work for general objects, while our priors are


<!-- PK PAGE 4 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                  4
general enough to be applicable on a wide variety            removing R as a free parameter. This gives us the
of objects: a single model learned on teabags and            following unconstrained optimization problem:
squirrels can be applied to images of coffee cups and
                                                                     minimize       g(I − S(Z, L)) + f (Z) + h(L)             (2)
turtles.                                                                 Z,L
   The driving force behind our model are our priors
                                                             where g(R), f (Z), and h(L) (Sections 4, 5, and 6,
on shape, reflectance, and illumination. To construct
                                                             respectively) are cost functions for reflectance, shape,
these priors we build upon past work on natural
                                                             and illumination respectively, which we will refer to
image statistics, which has demonstrated that sim-
                                                             as our “priors” on these scene properties 1 . Solving
ple statistics govern local patches of natural images
                                                             this problem (Section 7) corresponds to searching for
[2], [3], [37], and that these statistics can be used
                                                             the least costly (or most likely) explanation {Z, R, L}
for denoising [38], inpainting [39], deblurring [40],
                                                             for image I.
etc. But these statistical regularities arise in natural
images only because of the statistical regularities in
the underlying worlds that produced those images. The        4     P RIORS ON R EFLECTANCE
primary contribution of this work is extended these          Our prior on reflectance consists of three components:
ideas from natural images to the world that produced         1) An assumption of piecewise constancy, which we
that natural image, which is assumed to be composed          will model by minimizing the local variation of logof natural depth maps and natural reflectance images.        reflectance in a heavy-tailed fashion. 2) An assumpThere has been some study of the statistics of natural       tion of parsimony of reflectance — that the palette
depth maps [41], reflectance images [42] and models          of colors with which an entire image was painted
of illumination [43], but ours is the first to use these     tends to be small — which we model by minimizing
statistical observations for recovering all such intrinsic   the global entropy of log-reflectance. 3) An “absolute”
scene properties simultaneously.                             prior on reflectance which prefers to paint the scene
                                                             with some colors (white, gray, green, brown, etc)
                                                             over others (absolute black, neon pink, etc), thereby
3   P ROBLEM F ORMULATION                                    addressing color constancy. Formally, our reflectance
                                                             prior g(A) is a weighted combination of three costs:
$$
We call our problem formulation for recovering intrinsic scene properties from a single image of a                    g(R) = λs gs (R) + λe ge (R) + λa ga (R)                 (3)
$$
(masked) object “shape, illumination, and reflectance
                                                             where gs (R) is our smoothness prior, ge (R) is our
from shading”, or “SIRFS”. SIRFS can be thought of
                                                             parsimony prior, and ga (R) is our “absolute” prior.
as an extension of classic shape-from-shading models
                                                             The λ multipliers are learned through cross-validation
[44] in which not only shape, but reflectance and
                                                             on the training set.
illumination are unknown. Conversely, SIRFS can be
                                                               Our smoothness and parsimony priors are on
framed as an “intrinsic image” technique for recov-
                                                             the differences of log-reflectance, which makes them
ering shading and reflectance, in which shading is
                                                             equivalent to priors on the ratios of reflectance. This
parametrized by a model of shape and illumination.
                                                             makes intuitive sense, as reflectance is defined as a
The SIRFS problem formulation is:
                                                             ratio of reflected light to incident light, but is also
             maximize       P (R)P (Z)P (L)                  crucial to the success of our algorithm: Consider the
               R,Z,L                                         reflectance-map ρ implied by log-image I and log-
$$
            subject to      I = R + S(Z, L)            (1)   shading S(Z, L), such that ρ = exp(I − S(Z, L)). If we
$$
                                                             were to manipulate Z or L to increase S(Z, L) by some
Where R is a log-reflectance image, Z is a depth-map,        constant α across the entire image, then ρ would be diand L is a spherical-harmonic model of illumination          vided by exp(α) across the entire image, which would
[45]. Z and R are “images” with the same dimensions          accordingly decrease the differences between pixels of
as I, and L is a vector parametrizing the illumination.      ρ. Therefore, if we placed priors on the differences
S(Z, L) is a “rendering engine” which linearizes Z           of reflectance it would be possible to trivially satisfy
into a set of surface normals, and produces a log-           our priors by manipulating shape or illumination to
shading image from those surface normals and L (see          increase the intensity of the shading image. However,
$$
Appendix A for a thorough explanation). P (R), P (Z),        in the log-reflectance case R = I − S(Z, L), increasing
$$
and P (L) are priors on reflectance, shape, and illumination, respectively, whose likelihoods we wish to           1. Throughout this paper we use the term “prior” loosely. We
maximize subject to the constraint that the log-image        refer to loss functions or regularizers on Z, A, and L as “pri-
                                                             ors” because they often have an interpretation as the negative
I is equal to a rendering of our model R+S(Z, L). We         log-likelihood of some probability density function. We refer to
can simplify this problem formulation by reformulat-         minimizing entropy as a “prior”, which is again an abuse of
ing the maximum-likelihood aspect as minimizing a            terminology. Our occluding contour “prior” and our external obser-
                                                             vation “prior” require first observing the silhouette of an object or
sum of cost functions (by taking the negative log of         some external observation of shape, respectively, and are therefore
P (R)P (Z)P (L)) and by absorbing the constraint and         posteriors, not priors.


<!-- PK PAGE 5 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                     5
$$
                                                                       (a) some R        (b) gs (R) (cost)   (c) ∇gs (R) (influence)
$$
                                                                   Fig. 4. Here we have a color reflectance image R,
                                                                   and its cost and influence (derivative of cost) under our
                                                                   multivariate GSM smoothness prior. Strong, colorful
      (a) univariate/grayscale GSM    (b) multivariate/color GSM   edges, such as those caused by reflectance variation,
                                                                   are very costly, while small edges, such as those
Fig. 3. Our smoothness prior on log-reflectance is a
                                                                   caused by shading, are less costly. But in terms of
univariate Gaussian scale mixture on the differences
                                                                   influence — the gradient of cost with respect to each
between nearby reflectance pixels for grayscale im-
                                                                   pixel — we see an inversion: because sharp edges lie
ages, or a multivariate GSM for color images. These
                                                                   in the tails of the GSM, they have little influence, while
distribution prefers nearby reflectance pixels to be
                                                                   shading variation has great influence. This means that
similar, but its heavy tails allow for rare non-smooth
                                                                   during inference our model attempts to explain shading
discontinuities. Our multivariate color model captures
                                                                   (small, achromatic variation) in the image by varying
the correlation between color channels, which means
                                                                   shape, while explaining sharp or chromatic variation by
that chromatic variation in log-reflectance lies further
                                                                   varying reflectance.
out in the tails, making it more likely to be ignored
during inference.
                                                                   the mixture:
all of S by α (increasing the brightness of the shading
image) simply decreases all of R by α, and does                                                  M
                                                                                                 X
                                                                                                       αj N x ; 0, σj2
                                                                                                                         
$$
not change the differences between log-reflectance                          c(x; α, σ) = − log                                   (5)
$$
$$
values (it would, however, affect our absolute prior                                             j=1
$$
on reflectance). Priors on the differences of log-albedo
are therefore invariant to scaling of illumination or              We set the mean of the GSM is 0, as the most likely
shading, which means they behave similarly in well-                reflectance image under our model should be flat. We
$$
lit regions as in shadowed regions, and cannot be                  set M = 40 (the GSM has 40 discrete Gaussians),
$$
trivially satisfied.                                               and αR and σ R are trained on reflectance images in
                                                                   our training set using expectation-maximization. The
                                                                   log-likelihood of our learned model can be seen in
4.1     Smoothness                                                 Figure 3(a).
The reflectance images of natural objects tend to be                  Gaussian scale mixtures have been used previously
piecewise constant — or equivalently, variation in                 to model the heavy-tailed distributions found in natreflectance images tends to be small and sparse. This              ural images [38], for the purpose of denoising or inis the insight that underlies the Retinex algorithm [4],           painting. Effectively, using this family of distributions
[9], [10], and informs more recent intrinsic images                gives us a log-likelihood which looks like a smooth,
work [13], [14], [15].                                             heavy-tailed spline which decreases monotonically
   Our prior on grayscale reflectance smoothness is                with distance from 0. Because it is monotonically dea multivariate Gaussian scale mixture (GSM) placed                 creasing, the cost of log-reflectance variation increases
on the differences between each reflectance pixel and              with the magnitude of variation, but because the
its neighbors. We will maximize the likelihood of R                distribution is heavy tailed, the influence of variation
under this model, which corresponds to minimizing                  (the derivative of log-likelihood) is strongest when
the following cost function:                                       variation is small (that is, when variation resembles
                                                                   shading) and weaker when variation is large. This
$$
         gs (R) =
$$
                  X X
                           c (Ri − Rj ; αR , σ R )   (4)           means that our model prefers a reflectance image
                        i
                                                                   that is mostly flat but occasionally varies heavily,
$$
                            j∈N (i)
$$
                                                                   but abhors a reflectance image which is constantly
$$
Where N (i) is the 5 × 5 neighborhood around pixel i,              varying slightly. This behavior is similar to that of the
$$
Ri − Rj is a the difference in log-RGB from pixel i to             Retinex algorithm, which operates by shifting strong
pixel j, and c (· ; α, σ) is the negative log-likelihood           gradients to the reflectance image and weak gradients
of a discrete univariate Gaussian scale mixture (GSM),             to the shading image.
parametrized by α and σ, the mixing coefficients and                  To extend our model to color images, we simply exstandard deviations, respectively, of the Gaussians in             tend our smoothness prior to a multivariate Gaussian


<!-- PK PAGE 6 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                 6
scale mixture
                  X X
$$
       gs (R) =                 C (Ri − Rj ; αR , σ R , ΣR )   (6)
$$
$$
                  i   j∈N (i)
$$
Where Ri −Rj is now a 3-vector of the log-RGB differences, α are mixing coefficients, σ are the scalings of
the Gaussians in the mixture, and Σ is the covariance
matrix of the entire GSM (shared among all Gaussians
of the mixture).
                                  M
                                  X
$$
      C(x ; α, σ, Σ) = − log            αj N (x ; 0, σj Σ)     (7)
$$
                                  j=1
                                                                     Fig. 5. Three grayscale log-reflectance images from
$$
We set M = 40 (the GSM has 40 discrete Gaussians),
$$
                                                                     our dataset and their marginal distributions. Logand we train αR , σ R , and ΣR on color reflectance im-
                                                                     reflectance in an image tend to be grouped around
ages in our training set (we train a distinct model from
                                                                     certain values, or equivalently, these distributions tend
the grayscale smoothness model). The log-likelihood
                                                                     to be low-entropy.
of our learned model, and the training data used to
learn that model, can be seen in Figure 3(b).
   In color images, variation in reflectance tends to
                                                                     the most clear peakedness in its distribution, natural
manifest itself in both the luminance and chrominance
                                                                     objects like ”apple” show significant clustering.
of an image (white transitioning to blue, for example)
                                                                        We will therefore construct a prior which encourwhile shading, assuming the illumination is mostly
                                                                     ages parsimony – that our representation of the rewhite, primarily affects the luminance of an image
                                                                     flectance of the scene be economical and efficient,
(light blue transitioning to dark blue, for example).
                                                                     or “sparse”. This is effectively a instance of Occam’s
Past work has exploited this insight by building spe-
                                                                     razor, that one should favor the simplest possible excialized models that condition on the chrominance
                                                                     planation. We are not the first to explore global parsivariation of the input image [4], [10], [13], [14], [15].
                                                                     mony priors on reflectance: different forms of this idea
By placing a multivariate prior over differences in
                                                                     have been used in intrinsic images techniques [15],
reflectance, we are able to capture the correlation of
                                                                     photometric stereo [46], shadow removal [47], and
the different color channels, which implicitly encour-
                                                                     color representation [48]. We use the quadratic enages our model to explain chromatic variation using
                                                                     tropy formulation of [49] to minimize the entropy of
reflectance and achromatic variation using shading
                                                                     log-reflectance, thereby encouraging parsimony. Forwithout the need for any hand-crafted heuristics.
                                                                     mally, our parsimony prior for reflectance is:
See Figure 4 for a demonstration of this effect. Our
model places more-colorful edges further into the tails                                 
                                                                                              N X N                    2
                                                                                                                          
                                                                                                                            
of the distribution, thereby reducing their influence.                                     1 X              (R i − R j )
$$
                                                                       ge (R) = − log               exp −         2
$$
                                                                                                                            
$$
Again, this is similar to color variants of the Retinex                                    Z i=1 j=1             4σR
$$
$$
algorithm [4] which uses the increased chrominance                                    √
$$
$$
of an edge as a heuristic for it being a reflectance edge.                  Z = N 2 4πσ 2                                    (8)
$$
But this approach (which is common among intrinsic
                                                                     This is quadratic entropy (a special case of Rényi
image algorithms) of using image chrominance as
                                                                     entropy) for a set of points x assuming a Parzen
a substitute for reflectance chrominance means that
                                                                     window (a Gaussian kernel density estimator, with
these techniques fail when faced with non-white il-
                                                                     a bandwidth of σR ) [49]. Effectively, this is a “soft”
lumination, while our model is robust to non-white
                                                                     and differentiable generalization of Shannon entropy,
illumination.
                                                                     computed on a set of real values rather than a discrete
                                                                     histogram. By minimizing this quantity, we encourage
4.2    Parsimony                                                     all pairs of reflectance pixels in the image to be similar
In addition to piece-wise smoothness, the second                     to each other. However, minimizing this entropy does
property we expect from reflectance images is for                    not force all pixels to collapse to one value, as the
there to be a small number of reflectances in an                     “force” exerted by each pair falls off exponentially
image — that the palette with which an image was                     with distance — it is robust to outliers. This prior efpainted be small. As a hard constraint, this is not true:            fectively encourages Gaussian “clumps” of reflectance
even in painted objects, there are small variations in               values, where the Gaussian clumps have standard
reflectance. But as a soft constraint, this assumption               deviations of roughly σR .
holds. In Figure 5 we show the marginal distribution                    At first glance, it may seem that this global parsiof grayscale log-reflectance for three objects in our                mony prior is redundant with our local smoothness
dataset. Though the man-made ”cup1” object shows                     prior: Encouraging piecewise smoothness seems like it


<!-- PK PAGE 7 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                7
$$
                                                            Σ = ΦΛΦT , and from that construct the whitening2
$$
$$
                                                            transformation WR = ΦΛ1/2 ΦT . The bandwidth of
$$
                                                            the Parzen window is σR , which determines the scale
                                                            of the clusters produced by minimizing this entropy
                                                            measure, and is tuned through cross-validation (inde-
                                                            pendently of the same variable for the grayscale case).
  (a) No parsimony   (b) No smoothness      (c) Both        See Figure 7 for a motivation of this model.
                                                               Naively computing this quadratic entropy measure
Fig. 6. A demonstration of the importance of both           requires calculating the difference between all N logour smoothness and parsimony priors on reflectance.         reflectance values in the image with all other N logUsing only a smoothness prior, as in 6(a), allows           reflectance values, making it quadratically expensive
for reflectance variation across disconnected regions.      in N to compute naively. In Appendix B we describe
Using only the parsimony prior, as in 6(b), encourages      an accurate linear-time algorithm for approximating
reflectance to take on a small number of values, but        this quadratic entropy and its gradient, based on the
does not encourage it to form large piecewise-constant      bilateral grid [50].
regions. Only by using the two priors in conjunction, as
in 6(c), does our model correctly favor a normal, paint-    4.3    Absolute Reflectance
like checkerboard configuration.
                                                            The previously described priors were imposed on
                                                            relative properties of reflectance: the differences be-
                                                            tween nearby or not-nearby pixels. We must impose
                                                            an additional prior on absolute reflectance: the raw
should cause entropy to be minimized indirectly. This
                                                            value of each pixel in the reflectance image. Without
is often true, but there are common situations in which
                                                            such a prior (and the prior on illumination presented
both of these priors are necessary. For example, if two
                                                            in Section 6) our model would be equally pleased to
regions are separated by a discontinuity in the image
                                                            explain a gray pixel in the image as gray reflectance
then optimizing for local smoothness will never cause
                                                            under gray illumination as it would nearly-black rethe reflectance on both sides of the discontinuity to be
                                                            flectance under extremely-bright illumination, or blue
similar. Conversely, simply minimizing global entropy
                                                            reflectance under yellow illumination, etc.
may force reflectance to take on a small number of
                                                               This sort of prior is fundamental to colorvalues, but need not produce large piecewise-smooth
                                                            constancy, as most basic white-balance or autoregions. The merit of using both priors in conjunction
                                                            contrast/brightness algorithms can be viewed as minis demonstrated in Figure 6.
                                                            imizing a similar sort of cost: the gray-world as-
   Generalizing our grayscale parsimony prior to color      sumption penalizes reflectance for being non-gray,
reflectance images requires generalizing our entropy
model to higher dimensionalities. A naive extension           2. Our whitening transformation of reflectance is not strictly
                                                            correct, as we do not first center the data by subtracting the
of this one-dimensional entropy model to three di-          mean. This was done both for mathematical and computational
mensions is not sufficient for our purposes: The RGB        convenience, and because the origin of the space of log-reflectance
channels of natural reflectance images are highly cor-      (absolute white) is arguable the most reasonable choice for the
                                                            “center” of our data.
related, causing a naive “isotropic” high-dimensional
entropy measure to work poorly. To address this, we
pre-compute a whitening transformation from logreflectance images in the training set, and compute an
isotropic entropy measure in this whitened space during inference, which gives us an anisotropic entropy
measure. Formally, our cost function is quadratic entropy in the space of whitened log-reflectance:
                                                !
                   N X N                       2                  (a) Correct        (b) Wrong Shape        (c) Wrong Light
                1 X             kWR (Ri − Rj )k2
$$
ge (R)= − log            exp −         2
$$
                                                  
$$
                Z i=1 j=1            4σR                    Fig. 7.     Some reflectance images and their cor-
$$
                                                    (9)     responding log-RGB scatterplots. Mistakes in estiWhere WR is the whitening transformation learned            mating shape or illumination produce shading-like or
$$
from reflectance images in our training set, as fol-        illumination-like errors in the inferred reflectance, causlows: Let X be a 3 × n matrix of the pixels in the          ing the log-RGB distribution of the reflectance to be
$$
reflectance images in our training set. We compute the      “smeared”, and causing entropy (and therefore cost) to
$$
matrix Σ = XXT , take its eigenvalue decomposition          increase.
$$


<!-- PK PAGE 8 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                           8
                                                              we simply use a 3D spline, trained on whitened log-
                                                              reflectance pixels in our training set. Formally, to train
                                                              our model we minimize the following:
                                                                                                      !
                                                                                         X                 p
                                                              minimize < F, N > + log       exp (−Fi ) + λ J(F) + 2
                                                                   F
                                                                                             i
$$
                                                                  J(F) = F2xx + F2yy + F2zz + 2F2xy + 2F2yz + 2F2xz   (12)
$$
                                                              Where F is our 3D spline describing cost, N is a
    (a) Training data and PDF           (b) Samples           3D histogram of the whitened log-RGB reflectance in
                                                              our training data, and J(·) is a smoothness penalty
Fig. 8. A visualization of our “absolute” prior on            (the thin-plate spline smoothness energy, made more
grayscale reflectance, trained on the MIT Intrinsic Im-       robust by taking its square root). The smoothness
ages dataset [4]. In 8(a) we have the log-likelihood of       multiplier λ is tuned through cross-validation. As in
our density model, and the data on which it was trained.      our parsimony prior, we use whitened log-reflectance
In 8(b) we have samples from our model, where the x           to address the correlation between channels, which
axis is sorted by cost (y axis is random).                    is necessary as our smoothness term is isotropic. A
                                                              visualization of our prior can be seen in Figure 9.
                                                                 During inference, we maximize the likelihood of the
the white-world assumption penalizes reflectance for          color reflectance image R by minimizing its cost under
being non-white, and gamut-based models penalize              our learned model:
reflectance for lying outside of a gamut of previously-                               X
$$
seen reflectances. We experimented with variations or                        ga (R) =    F(WR Ri )               (13)
$$
combinations of these types of models, but found that                                    i
what worked best was using a regularized smooth               where F(WR Ri ) is the value of F at the coordispline to model the log-likelihood of log-reflectance         nates specified by the 3-vector WRi , the whitened
values.                                                       reflectance at pixel i (WR is the same as in Section 4.2).
  For grayscale images, we use a 1D spline, which we          To make this function differentiable, we compute F(·)
have fit to log-reflectance images in the training set as     using trilinear interpolation.
follows:                                                        We trained our absolute color prior on the MIT
                                                              Intrinsic Images dataset [4], and used that learned
                                       !    q
                         X
              T
 minimize f n + log          exp (−fi ) + λ (f 00 )2 + 2     model in all experiments shown in this paper. How-
    f
                                i                             ever, the MIT dataset is very small and this absolute
                                                   (10)       prior contains very many parameters (hundreds, in
Where f is our spline, which determines the non-              contrast to our other priors which are significantly
normalized negative log-likelihood (cost) assigned            more constrained), which suggests that we may be
to every reflectance, n is a 1D histogram of log-             overfitting to the small set of reflectances in the
                                       00
reflectance in our training data, and f is the second         MIT dataset. To address this concern, we trained
derivative of the spline, which we robustly penalize (       an additional version of our absolute prior on the
is a small value added in to make our regularization          color reflectances in the OpenSurfaces dataset [51],
differentiable everywhere). Minimizing the sum of the         which is a huge and varied dataset that is presumfirst two terms is equivalent to maximizing the likeli-       ably a more accurate representation of real-world
hood of the training data (the second term is the log         reflectances. Both models can be seen in Figure 9,
of the partition function for our density estimation),        where we see that the priors we learn for each dataset
and minimizing the third term causes the spline to            are somewhat different, but that both prefer lighter,
be piece-wise smooth. The smoothness multiplier λ is          desaturated reflectances. We ran some additional extuned through cross-validation. A visualization of our        periments using our OpenSurfaces model instead of
prior can be found in Figure 8.                               our MIT model (not presented in this paper), and
   During inference, we maximize the likelihood of the        found that the outputs of each model were virtually
grayscale reflectance image R by minimizing its cost          indistinguishable. This is a testament to the robustness
under our learned model:                                      of our model, and suggests that we are not overfitting
                                                              to the color reflectances in the MIT dataset.
                          X
$$
                 ga (R) =    f (Ri )               (11)
$$
                                    i
where f (Ri ) is the value of f at Ri , the log-reflectance   5        P RIORS ON S HAPE
at pixel i, which we computed using linear interpola-         Our prior on shape consists of three components: 1)
tion (so that this cost is differentiable).                   An assumption of smoothness (that shapes tend to
   To generalize this model to color reflectance images,      bend rarely), which we will model by minimizing


<!-- PK PAGE 9 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                             9
   (a) Training data      (b) PDF            (c) Samples
                                                                         (a) some shape Z        (b) mean curvature H(Z)
                                                                  Fig. 10. A visualization of a shape and its mean
$$
                                                                  curvature (blue = positive, red = negative, white =
$$
                                                                  0). Planes and soap films have 0 mean curvature,
                                                                  spheres and cylinders have constant mean curvature,
                                                                  and mean curvature varies where shapes bend.
   (d) Training data      (e) PDF            (f) Samples
Fig. 9. A visualization of our “absolute” prior on color          5.1   Smoothness
reflectance. We train two versions of our prior, one on           There has been much work on modeling the statistics
the MIT Intrinsic Images dataset [4] that we use in our           of natural shapes [41], [52], with one overarching
experiments (top row) and one on the OpenSurfaces                 theme being that regularizing some function of the
dataset for comparison [51] (bottom row). In the first-           second derivatives of a surface is effective. However,
column we have the log-RGB reflectance pixels in our              this past work has severe issues with invariance to
training set, and in the second column we have a                  out-of-plane rotation and scale. Working within difvisualization of the 3D spline PDF that we fit to that            ferential geometry, we present a shape prior based on
data. In the third column we have samples from the                the variation of mean curvature, which allows us to
PDF, where the x axis is sorted by cost (y axis is                place smoothness priors on Z that are invariant to
random). For both datasets, our model prefers less                rotation and scale.
saturated, more earthy or subdued colors, and abhors                 To review: mean curvature is the divergence of the
brightly lit neon-like colors or very dark colors — the           normal field. Planes and soap films have 0 mean
high-cost reflectances often do not even look like paint,         curvature everywhere, spheres and cylinders have
but instead appear glowing and luminescent.                       constant mean curvature everywhere, and the sphere
                                                                  has the smallest total mean curvature among all con-
                                                                  vex solids with a given surface area [53]. See Figure 10
the variation of mean curvature. 2) An assumption                 for a visualization. Mean curvature is a measure of
of isotropy of the orientation of surface normals (that           curvature in world coordinates, not image coordinates,
shapes are just as likely to face in one direction as             so (ignoring occlusion) the marginal distribution of
they are another) which reduces to a well-motivated               H(Z) is invariant to out-of-plane rotation of Z — a
“fronto-parallel” prior on shapes. 3) An prior on the             shape is just as likely viewed from one angle as from
orientation of the surface normal near the boundary               another. In comparison, the Laplacian of Z and the
of masked objects, as shapes tend to face outward at              second partial derivatives of Z can be made large
the occluding contour. Formally, our shape prior f (Z)            simply due to foreshortening, which means that priors
is a weighted combination of four costs:                          placed on these quantities [52] would prefer certain
                                                                  shapes simply due to the angle from which those
$$
          f (Z) = λk fk (Z) + λi fi (Z) + λc fc (Z)        (14)   shapes are observed — clearly undesirable.
$$
                                                                     But priors on raw mean curvature are not scalewhere fk (Z) is our smoothness prior, fi (Z) is our               invariant. Were we to minimize |H(Z)|, then the most
isotropy prior, and fc is our bounding contour prior.             likely shape under our model would be a plane, while
The λ multipliers are learned through cross-validation            spheres would be unlikely. Were we to minimize
on the training set.                                              |H(Z) − α| for some constant α, then the most likely
   Most of our shape priors are imposed on intermedi-             shape under our model would be a sphere of a certain
ate representations of shape, such as mean curvature              radius, but larger or smaller spheres, or a resized
or surface normals. This requires that we compute                 image of the same sphere, would be unlikely. Clearly,
these intermediate representations from a depth map,              such scale sensitivity is an undesirable property for
calculate the cost and the gradient of cost with respect          a general-purpose prior on natural shapes. Inspired
to those intermediate representations, and backprop-              by previous work on minimum variation surfaces
agate the gradients back onto the shape. In the ap-               [54], we place priors on the local variation of mean
pendix we explain in detail how to efficiently compute            curvature. The most likely shapes under such priors
these quantities and backpropagate through them.                  are surfaces of constant mean curvature, which are


<!-- PK PAGE 10 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                           10
well-studied in geometry and include soap bubbles
and spheres of any size (including planes). Priors
on the variation of mean curvature, like priors on
raw mean curvature, are invariant to rotation and
viewpoint, as well as concave/convex inversion.
$$
   Mean curvature is defined as the average of principle curvatures: H = 12 (κ1 +κ2 ). It can be approximated
$$
on a surface using filter convolutions that approximate first and second partial derivatives, as shown in
[55].                                                                (a) Smoothness                 (b) Samples
                                                 
            1 + Zx2 Zyy − 2Zx Zy Zxy + 1 + Zy2 Zxx           Fig. 11. To encourage shapes to be smooth, we model
$$
   H(Z) =                               3/2
$$
                       2 1 + Zx2 + Zy2                       the variation in mean curvature of shapes using a
                                                    (15)     Gaussian scale mixture, shown in 11(a). In 11(b) we
In Appendix C we detail how to calculate and dif-            show patches of shapes in our training data, sorted
ferentiate H(Z) efficiently. Our smoothness prior for        from least costly (upper left) to most costly (lower right).
shapes is a Gaussian scale mixture on the local varia-       Likely shapes under our model look like soap-bubbles,
tion of the mean curvature of Z:                             and unlikely shapes look contorted.
            X X
$$
   fk (Z) =          c (H(Z)i − H(Z)j ; αk , σ k ) (16)
$$
$$
             i   j∈N (i)
$$
$$
Notation is similar to Equation 4: N (i) is the 5 × 5
$$
neighborhood around pixel i, H(Z) is the mean curvature of shape Z, and H(Z)i −H(Z)j is the difference
between the mean curvature at pixel i and pixel j.
c (· ; α, σ) is defined in Equation 5, and is the negative
log-likelihood (cost) of a discrete univariate Gaussian
scale mixture (GSM), parametrized by α and σ, the
mixing coefficients and standard deviations, respec-               (a) An isotropic shape       (b) Our isotropy prior
tively, of the Gaussians in the mixture. The mean of
the GSM is 0, as the most likely shapes under our            Fig. 12. We assume the surfaces of shapes to be
$$
model should be smooth. We set M = 40 (the GSM               isotropic — equally likely to face in any orientation,
$$
has 40 discrete Gaussians), and αk and σ k are learned       like in a sphere. However, observing an isotropic shape
from our training set using expectation-maximization.        imposes a bias, as observed surfaces are more likely
The log-likelihood of our learned model can be seen in       to face the observer than to be perpendicular to the obFigure 11(a), and the likelihoods it assigns to different    server (as shown by the red gauge figure “thumbtacks”
shapes can be visualized in Figure 11(b). The learned        placed on the sphere in 12(a)). We undo this bias by
GSM is very heavy tailed, which encourages shapes to         imposing a prior on N z , shown in 12(b), which coarsely
be mostly smooth, and occasionally very non-smooth           resembles our training data.
— or equivalently, our prior encourages shapes to
bend rarely.
                                                                Intuitively, one may assume that imposing this
                                                             isotropy assumption requires no effort: if our prior
5.2   Surface Isotropy                                       assumes that all surface orientations are equally likely,
Our second prior on shapes is motivated by the ob-           doesn’t that correspond to a constant cost for all
servation that shapes tend to be oriented isotropically      surface orientations? However, this ignores the fact
in space. That is, it is equally likely for a surface to     that once we have observed a surface in space, we
face in any direction. This assumption is not valid          have introduced a bias: observed surfaces are much
$$
in many settings, such as man-made environments              more likely to face the observer (N z ≈ 1) than to
$$
$$
(which tend to be composed of floors, walls, and             be perpendicular to the observer (N z ≈ 0). We must
$$
ceilings) or outdoor scenes (which are dominated by          therefore impose an isotropy prior to undo this bias.
the ground-plane). But this assumption is more true             We will derive our isotropy prior analytically. Asfor generic objects floating in space, which tend to         sume surfaces are oriented uniformly, and that the
resemble spheres (whose surface orientations are truly       surfaces are observed under orthogonal perspective
isotropic) or sphere-like shapes — though there is           with a view direction (0, 0, −1). It follows that all N z
often a bias on the part of photographers towards            (the z-component of surface normals, relative to the
imaging the front-faces of objects. Despite its prob-        viewer) are distributed uniformly between 0 and 1.
lems, this assumption is still effective and necessary.      Upon observation, these surfaces (which are assumed


<!-- PK PAGE 11 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                         11
to have identical surface areas) have been foreshortened, such that the area of each surface in the image
is N z . Given the uniform distribution over N z and
this foreshortening effect, the probability distribution
over N z that we should expect at a given pixel in the
image is proportional to N z . Therefore, maximizing
the likelihood of our uniform distribution over orientation in the world is equivalent to minimizing the
following in the image:
                       X
                                 z
                                                                (a) A cropped object an its normals (b) Our occluding contour prior
$$
            fi (Z) = −    log Nx,y (Z)              (17)
$$
                       x,y                                   Fig. 13. In 13(a) we have an image and surface
         z                                                   normals of a subset of a cup, in our dataset. The side
Where   Nx,y (Z)   is the z-component of the surface
                                                             of this cup are “limbs”, points where the surface normal
normal of Z at position (x, y) (defined in Appendix
                                                             faces outward and is perpendicular to the occluding
A).
                                                             contour, while the top of the cup are “edges”, sharp
   Though this was derived as an isotropy prior, the
                                                             discontinuities where the surface is oriented arbitrarily.
shape which maximizes the likelihood of this prior is
                                                             Our heavy-tailed prior over surface orientation at the
not isotropic, but is instead (because of the nature of
                                                             occluding contour in 13(b) models the behavior of
MAP estimation) a fronto-parallel plane. This gives
                                                             limbs, but is robust to the outliers caused by edges.
us some insight into the behavior of this prior —
it serves to as a sort of “fronto-parallel” prior. This
prior can therefore be thought of as combating the
bas-relief ambiguity [25] (roughly, that absolute scale      information [59]. At the occluding contour of an oband orientation are ambiguous), by biasing our shape         ject, the surface is tangent to all rays from the vanestimation towards the fronto-parallel members of the        tage point. Under orthographic projection (which we
bas-relief family.                                           assume), this means the z-component of the normal
   Our prior on N z is shown in Figure 12(b) compared        is 0, and the x and y components are determined by
to the marginal distribution of N z in our training          the contour in the image. In principle, this property is
data. Our model fits the data well, but not perfectly.       absolutely true, but in practice the occluding contour
We experimented with learning distributions on N z           of a surface tends to be composed of limbs (points
empirically, but found that they worked poorly com-          where the surface is tangent to rays from the vantage
pared to our analytical prior. We attribute this to the      point, like the smooth side of a cylinder) and edges
aforementioned photographer’s bias towards fronto-           (an abrupt discontinuity of the surface, like the top
parallel surfaces, and to data sparsity when N z is          of a cylinder or the edge of a piece of paper) [60].
close to 0.                                                  See Figure 13(a) for an example of a shape which
   It is worth noting that − log (N z ) is proportional to   contains both phenomena. Of course, this taxonomy
the surface area of Z. Our prior on slant therefore          is somewhat false — all edges are limbs, but some are
has a helpful interpretation as a prior on minimal           so small that they appear to be edges, and some are
surface area: we wish to minimize the surface area of        just small enough relative to the image resolution that
Z, where the degree of the penalty for increasing Z’s        the “limb” assumption begins to break down.
surface area happens to be motivated by an isotropy             We present a “soft” version of a limb constraint, one
assumption. This notion of placing priors on surface         which captures the “limb”-like behavior we expect
area has been explored previously [56], but not in the       to see but which can be violated by edges or small
context of isotropy. And of course, this connection          limbs. Because our dataset consists of masked objects,
relates our model to the study of minimal surfaces           identifying the occluding contour C is trivial (see
in mathematics [53], though this connection is some-         Figure 14(a)). For each point i on C, we estimate ni ,
what tenuous as the fronto-parallel planes favored by        the local normal to the occluding contour in the image
our model are very different from classical minimal          plane. Using those we regularize the surface normals
surfaces such as planes and soap films.                      in Z along the boundary by minimizing the following
                                                             loss:
                                                                                                              γ
                                                                           X
$$
5.3   The Occluding Contour                                       fc (Z) =    (1 − (Nix (Z)nxi + Niy (Z)nyi )) c  (18)
$$
                                                                               i∈C
The occluding contour of a shape (the contour that
surrounds the silhouette of a shape) is a powerful           Where N (Z) is the surface normal of Z, as defined in
$$
cue for shape interpretation [57] which often dom-           Appendix A. We set γc = 0.75, which fits the training
$$
inates shading cues [58], and algorithms have been           data best, and which performs best in practice. The
presented for coarsely estimating shape given contour        inner product of ni and Ni (both of which are unit-


<!-- PK PAGE 12 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                          12
                                                                           (a) “Laboratory” Data/Samples   (b) “Natural” Data/Samples
                                                                       Fig. 15. We use two datasets: the “laboratory”-style
                                                                       illuminations of the MIT intrinsic images dataset [4]
    (a) occluding contour normals   (b) shape-from-contour output      which are harsh, mostly-white, and well-approximated
                                                                       by point sources, and a dataset of “natural” illuminaFig. 14. A subset of our model that includes only our                  tions, which are softer and much more colorful. Shown
priors on shape is equivalent to a shape-from-contour                  here are some illuminations from the training sets of
model. Given only the normals of the silhouette of the                 our two datasets, and samples from a multivariate
object in 14(a), we can produce the coarse estimate of                 Gaussian fit to each training set (our illumination prior
the shape of the object in 14(b).                                      from Section 6), rendered on Lambertian spheres. In
                                                                       each visualization the illuminations are sorted from
                                                                       least costly (upper left) to most costly (lower right)
norm) is 1 when both vectors are oriented in the                       according to either our “Laboratory” or “Natural” illumisame direction, in which case the loss is 0. If the                    nation priors.
normals do not agree, then some cost is incurred.
This cost corresponds to a heavy-tailed distribution
(shown in Figure 13(b)) which encourages the surface                   regularization, as the space of log-shading SH illuorientation to match the orientation of the occluding                  minations is surprisingly well-modeled by a simple
contour at limbs, allows surface normals to violate this               multivariate Gaussian while the space of traditional
assumption at edges.                                                   SH illumination coefficients is not.
  This occluding-contour prior, when combined with                        See Figure 15 for examples of SH illuminations in
our priors on smooth and isotropic shapes, allows us                   our different training sets, as well as samples from
to easily define an ablation of our entire model that                  our model. The illuminations in Figure 15 come from
corresponds to a shape-from-contour algorithm: we                      two different datasets (see Section 8) for which we
simply optimize with respect to these shape priors,                    build two different priors. We see that our samples
and ignore our priors on reflectance and illumination,                 look similar to the illuminations in the training set,
thereby ignoring all but the silhouette of the input                   suggesting that our model fits the data well. The
image. An example of the output of our shape-from-                     illuminations in these visualizations are sorted by
contour model can be seen in Figure 14(b), and this                    their likelihoods under our priors, which allows us to
model is evaluated quantitatively against our com-                     build an intuition for what these illumination priors
plete SIRFS model in Section 8.                                        encourage. More likely illuminations tend to be lit
                                                                       from the front and are usually less saturated and
6     P RIORS OVER I LLUMINATION                                       more ambient, while unlikely illuminations are often
Because illumination is unknown, we must regular-                      lit from unusual angles and tend to exhibit strong
ize it during inference. Our prior on illumination is                  shadowing and colors.
extremely simple: we fit a multivariate Gaussian to
the spherical-harmonic illuminations in our training
set. During inference, the cost we impose is the
                                                                       7     O PTIMIZATION
(non-normalized) negative log-likelihood under that                    To estimate shape, illumination, and reflectance, we
model:                                                                 must solve the optimization problem in Equation 2.
                                                                       This is a challenging optimization problem, and naive
$$
          h(L) = λL (L − µL )T Σ−1
$$
                                L (L − µL )                     (19)
                                                                       gradient-based optimization with respect to Z and L
where µL and ΣL are the parameters of the Gaussian                     fails badly. We therefore present an effective multiwe learned, and λL is the multiplier on this prior                     scale optimization technique, which is similar in spirit
(learned on the training set).                                         to multigrid methods [61], but extremely general and
   We use a spherical-harmonic (SH) model of illumi-                   simple to implement. We will describe our technique
nation, so L is a 9 (grayscale) or 27 (color, 9 dimen-                 in terms of optimizing a(X), where a(·) is some loss
sions per RGB channel) dimensional vector. In con-                     function and X is some signal.
trast to traditional SH illumination, we parametrize                      Let us define G, which constructs a Gaussian pyralog-shading rather than shading. This choice makes                     mid from a signal. Because Gaussian pyramid conoptimization easier as we don’t have to deal with                      struction is a linear operation, we will treat G as
“clamping” illumination at 0, and it allows for easier                 a matrix. Instead of minimizing a(X) directly, we


<!-- PK PAGE 13 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                               13
$$
minimize b(Y ), where X = G T Y :                            2011 Macbook Pro, using a straightforward Matlab/C
$$
                                                             implementation. Optimization takes roughly twice as
$$
      [`, ∇Y `] = b(Y ) :                             (20)
$$
                                                             long if the image is color. See Appendix E for a
                   T
$$
           X ← G Y // reconstruct signal                     description of some methods we use to make the
$$
$$
           [`, ∇X `] ← a(X) // compute loss & gradient       evaluation of our loss function more efficient.
$$
$$
           ∇Y ` ← G∇X // backpropagate gradient                We use this same multiscale optimization scheme
$$
                                                             with L-BFGS to solve the optimization problems in
We initialize Y to a vector of all 0’s, and then solve for   Equations 10 and 12, though we use different filter
$$
X̂ = G T (arg minY b(Y )) using L-BFGS. Any arbitrary        magnitudes for the pyramids. Naive single-scale opgradient-based optimization technique could be used,         timization for these problems works poorly.
$$
but L-BFGS worked best in our experience.
   The choice of the filter used in constructing our
Gaussian pyramid is crucial. We found that 4-tap             8    E XPERIMENTS
binomial filters work well, and that the choice of           Quantitatively evaluating the accuracy of our model
the magnitude of the filter dramatically affects mul-        is challenging, as there are no pre-existing datasets
tiscale optimization. If the magnitude is small, then        with ground-truth shape, surface normals, shading,
the coefficients of the upper levels of the pyramid          reflectance, and illumination. Thankfully, the MIT
are so small that they are effectively ignored, and          Intrinsic Images dataset [4] provides ground-truth
optimization fails (and in the limit, a filter magnitude     shading and reflectance for 20 objects (one object
of 0 reduces our model to single-scale optimization).        per image), and includes many additional images of
Conversely, if the magnitude is large, then the coarse       each object under different illumination conditions.
scales of the pyramid are optimized and the fine scales      Given this, we have created the MIT-Berkeley Intrinsic
are ignored. The filter that we found worked best            Images dataset, an augmented version of the MIT
$$
is: √18 [1, 3, 3, 1], which has twice the magnitude of       Intrinsic Images dataset in which we have used phothe filter that would normally be used for Gaussian          tometric stereo on the additional images of each object
$$
pyramids. This increased magnitude biases optimiza-          to estimate the shape of each object and the spherical
tion towards adjusting coarse scales before fine scales,     harmonic illumination for each image. An example
without preventing optimization from eventually op-          object in our dataset can be seen in Figure 2, and
timizing fine scales. This filter magnitude does not         the appendix contains additional images and details
appear to be universally optimal — different tasks           of our photometric stereo algorithm. In all of our
appear to have different optimal filter magnitudes.          experiments, we use the following test-set: cup2, deer,
Note that this technique is substantially different from     frog2, paper2, pear, potato, raccoon, sun, teabag1,
standard coarse-to-fine optimization, in that all scales     turtle. The other 10 objects are used for training.
are optimized simultaneously. As a result, we find              An additional difficulty in evaluation is the choice
much lower minima than standard coarse-to-fine tech-         of error metrics. Constructing error metrics for specific
niques, which tend to keep coarse scales fixed when          intrinsic scene properties such as a depth map or a
optimizing over fine scales. Optimization is also much       reflectance image is challenging, as naive choices such
faster than comparable coarse-to-fine techniques.            as mean-squared-error often correspond very poorly
   To optimizing Equation 2 we initialize Z and L            with the perceptual salience of an error. Additionally,
$$
to ~0 ( L = ~0 is equivalent to an entirely ambient,         constructing a single error metric that describes all
$$
white illumination) and optimize with respect to a           errors in each intrinsic scene property is difficult. We
vector that is a concatenation of G T Z and a whitened       therefore present six different error metrics that have
version of L. We optimize in the space of whitened           been designed to capture different kinds of important
illuminations because the Gaussians we learn for il-         errors for each intrinsic scene property: Z-MAE is the
lumination mostly describe a low-rank subspace of            shift-invariant absolute error between the estimated
SH coefficients, and so optimization in the space of         shape and the ground-truth shape. N -MAE is the
unwhitened illumination is ill-conditioned. We pre-          mean error between our estimated normal field and
compute a whitening transformation for ΣL and µL ,           ground-truth normal field, in radians. S-MSE and
and during each evaluation of the loss in gradi-             R-MSE are the scale-invariant mean-squared-error of
ent descent we unwhiten our whitened illumination,           our recovered shading and reflectance, respectively.
compute the loss and gradient, and backpropagate             RS-MSE is the error metric introduced in conjuncthe gradient onto the whitened illumination. After           tion with the MIT intrinsic images dataset [4], which
optimizing Equation 2 we have a recovered depth              measures a locally scale-invariant error for both remap Ẑ and illumination L̂, with which we calculate a        flectance and shading3 . L -MSE is the scale-invariant
$$
reflectance image R̂ = I − S(Ẑ, L̂). When illumination      MSE of a rendering of our recovered illumination
$$
is known, L is fixed. Optimizing to near-convergence
(which usually takes a few hundred iterations) for a          3. The authors of [4] refer to this error metric to as “LMSE”, but
1-2 megapixel grayscale image takes 1-5 minutes on a         we will call it RS-MSE to minimize confusion with L -MSE


<!-- PK PAGE 14 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                                               14
on a sphere, relative to a rendering of the ground-         like, and III: the input is a color image and the
truth illumination. To summarize these individual           illumination is “natural”. For all tasks, we use the
error metrics, we report an “average” error metric,         same training/test split, and for each task we tune a
which is the geometric mean of the previous six             different set of hyperparameters on the training set
error metrics. For each error metric and the average        (λs , λe , λa , σR , λk , λi , λc , and λL ), and fit a different
metric, we report the geometric mean of error across        prior on illumination (as in Section 6). Hyperparamthe test-set images. The use of the geometric mean          eters are tuned using coordinate descent to minimize
prevents the average error from being dominated by          our “average” error metric for the training set. For
individual error metrics with large dynamic ranges,         each task, we compare SIRFS against several intrinor by particularly challenging images. See Appendix         sic images algorithms (meant to decompose an imF for a thorough explanation of our choice of error         age into shading and reflectance components), upon
metrics.                                                    which we’ve run a shape-from-shading algorithm
   Though the MIT dataset has a great deal of variety       on the shading image. For the sake of a generous
in terms of the kinds of objects used, the illumination
in the dataset is very “laboratory”-like — lights are
white, and are placed at only a few locations rela-                           I. Grayscale Images, Laboratory Illumination
tive to the object. See Figure 15(a) for examples of             (1)
                                                                             Algorithm
                                                                        Naive Baseline
                                                                                                   Z -MAE N -MAE S -MSE R-MSE RS -MSE L -MSE
                                                                                                    25.56  0.7223 0.0571 0.0426 0.0353 0.0484
                                                                                                                                                         Avg.
                                                                                                                                                        0.2061
these “laboratory” illuminations. In contrast, natural           (2)
                                                                 (3)
                                                                        Retinex [4], [10] + SFS
                                                                        Tappen et al. [14] + SFS
                                                                                                    67.15
                                                                                                    41.96
                                                                                                           0.8342
                                                                                                           0.7413
                                                                                                                  0.0311 0.0265
                                                                                                                  0.0354 0.0252
                                                                                                                                0.0289
                                                                                                                                0.0285
                                                                                                                                       0.0484
                                                                                                                                       0.0484
                                                                                                                                                        0.2002
                                                                                                                                                        0.1835
illuminations exhibit much more color and variety:               (4)
                                                                 (A)
                                                                        Shen et al. [13] + SFS
                                                                        SIRFS
                                                                                                    45.57
                                                                                                    31.00
                                                                                                           0.8293 0.0493 0.0427 0.0436 0.0484
                                                                                                           0.5343 0.0156 0.0177 0.0209 0.0103
                                                                                                                                                        0.2348
                                                                                                                                                        0.0998
the sun is yellow, outdoor shadows are often tinted              (B)
                                                                 (C)
                                                                        SIRFS, no R-smoothness
                                                                        SIRFS, no R-parsimony
                                                                                                    27.25
                                                                                                    23.53
                                                                                                           0.5361
                                                                                                           0.4862
                                                                                                                  0.0267 0.0255
                                                                                                                  0.0224 0.0261
                                                                                                                                0.0290
                                                                                                                                0.0228
                                                                                                                                       0.0152
                                                                                                                                       0.0167
                                                                                                                                                        0.1279
                                                                                                                                                        0.1170
blue, man-made illuminants have different colors,                (D)
                                                                 (E)
                                                                        SIRFS, no R-absolute
                                                                        SIRFS, no Z-smoothness
                                                                                                    24.02
                                                                                                    29.05
                                                                                                           0.5023
                                                                                                           0.5783
                                                                                                                  0.0190 0.0201
                                                                                                                  0.0241 0.0227
                                                                                                                                0.0222
                                                                                                                                0.0337
                                                                                                                                       0.0122
                                                                                                                                       0.0125
                                                                                                                                                        0.1037
                                                                                                                                                        0.1254
and indirect illumination from colored objects may               (F)    SIRFS, no Z-isotropy        98.07  0.7560 0.0200 0.0198 0.0268 0.0104           0.1419
                                                                 (G)    SIRFS, no Z-contour         34.29  0.7676 0.0208 0.0207 0.0232 0.0231           0.1351
cause very colorful illuminations. To acquire some               (H)    SIRFS, no L-gaussian        26.75  0.5929 0.0270 0.0212 0.0327 0.1940           0.1964
                                                                  (I)   SIRFS, no Z-multiscale      25.58  0.7233 0.0571 0.0426 0.0353 0.0414           0.2009
illumination models that are more representative of               (J)   SIRFS, no L-whitening       33.93  0.5837 0.0207 0.0208 0.0256 0.0119           0.1171
                                                                 (K)    Shape-from-Contour          18.96 0.4192 0.0571 0.0426  0.0353 0.0484           0.1791
the variety seen in the natural world, we took all
                                                               (S) shape observation                4.83   0.1952      -        -        -        -        -
of the environment maps from the sIBL Archive4 ,             (A+S) SIRFS + shape observation        3.72   0.2414   0.0128   0.0176   0.0210   0.0096   0.0586
                                                             (A+L) SIRFS + known illumination      27.32   0.4944   0.0175   0.0179   0.0225      -        -
expanded that set of environment maps by shifting
and mirroring them and varying their contrast and                                II. Color Images, Laboratory Illumination
saturation (saturation is only ever decreased, never             (1)
                                                                             Algorithm
                                                                        Naive Baseline
                                                                                                   Z -MAE N -MAE S -MSE R-MSE RS -MSE L -MSE
                                                                                                    25.56  0.7223 0.0577 0.0455 0.0354 0.0489
                                                                                                                                                         Avg.
                                                                                                                                                        0.2092
increased) and produced spherical harmonic illumi-               (2)
                                                                 (3)
                                                                        Retinex [4], [10] + SFS
                                                                        Tappen et al. [14] + SFS
                                                                                                    85.34
                                                                                                    41.96
                                                                                                           0.8056
                                                                                                           0.7413
                                                                                                                  0.0204 0.0186
                                                                                                                  0.0361 0.0379
                                                                                                                                0.0163
                                                                                                                                0.0347
                                                                                                                                       0.0489
                                                                                                                                       0.0489
                                                                                                                                                        0.1658
                                                                                                                                                        0.2040
nations from the resulting environment maps. Af-                 (4)
                                                                 (5)
                                                                        Shen et al. [13] + SFS
                                                                        Gehler et al. [15] + SFS
                                                                                                    55.95
                                                                                                    53.36
                                                                                                           0.8529
                                                                                                           0.6844
                                                                                                                  0.0528 0.0458
                                                                                                                  0.0106 0.0101
                                                                                                                                0.0398
                                                                                                                                0.0131
                                                                                                                                       0.0489
                                                                                                                                       0.0489
                                                                                                                                                        0.2466
                                                                                                                                                        0.1166
ter removing similar illuminations, the illuminations            (A)
                                                                 (B)
                                                                        SIRFS
                                                                        SIRFS, no R-smoothness
                                                                                                    19.24
                                                                                                    19.23
                                                                                                          0.3914 0.0064 0.0098 0.0125 0.0096
                                                                                                           0.4046 0.0125 0.0163 0.0214 0.0092
                                                                                                                                                        0.0620
                                                                                                                                                        0.0824
were split into training and test sets. See Figure 15(b)         (C)
                                                                 (D)
                                                                        SIRFS, no R-parsimony
                                                                        SIRFS, no R-absolute
                                                                                                    19.45
                                                                                                    22.98
                                                                                                           0.4312
                                                                                                           0.4288
                                                                                                                  0.0096 0.0149
                                                                                                                  0.0085 0.0113
                                                                                                                                0.0140
                                                                                                                                0.0135
                                                                                                                                       0.0091
                                                                                                                                       0.0095
                                                                                                                                                        0.0731
                                                                                                                                                        0.0704
for examples of these “natural” illuminations. Each              (E)
                                                                 (F)
                                                                        SIRFS, no Z-smoothness
                                                                        SIRFS, no Z-isotropy
                                                                                                    19.28
                                                                                                    84.08
                                                                                                           0.4367
                                                                                                           0.7013
                                                                                                                  0.0114 0.0116
                                                                                                                  0.0117 0.0128
                                                                                                                                0.0219
                                                                                                                                0.0160
                                                                                                                                       0.0088
                                                                                                                                       0.0103
                                                                                                                                                        0.0773
                                                                                                                                                        0.1063
object in the MIT dataset was randomly assigned an               (G)
                                                                 (H)
                                                                        SIRFS, no Z-contour
                                                                        SIRFS, no L-gaussian
                                                                                                    32.59
                                                                                                    20.81
                                                                                                           0.7351
                                                                                                           0.4631
                                                                                                                  0.0103 0.0146
                                                                                                                  0.0199 0.0140
                                                                                                                                0.0173
                                                                                                                                0.0183
                                                                                                                                       0.0444
                                                                                                                                       0.1272
                                                                                                                                                        0.1186
                                                                                                                                                        0.1358
illumination (such that training illuminations were               (I)
                                                                  (J)
                                                                        SIRFS, no Z-multiscale
                                                                        SIRFS, no L-whitening
                                                                                                    25.62
                                                                                                    24.96
                                                                                                           0.7237
                                                                                                           0.4766
                                                                                                                  0.0574 0.0453
                                                                                                                  0.0106 0.0156
                                                                                                                                0.0353
                                                                                                                                0.0188
                                                                                                                                       0.0401
                                                                                                                                       0.0138
                                                                                                                                                        0.2022
                                                                                                                                                        0.0894
assigned to training objects, etc), and each object was          (K)    Shape-from-Contour          18.96  0.4192 0.0577 0.0455 0.0354 0.0489           0.1818
re-rendered under its new illumination, using that             (S) shape observation                4.83   0.1952      -        -        -        -        -
                                                             (A+S) SIRFS + shape observation        3.40   0.2126   0.0070   0.0111   0.0153   0.0063   0.0420
object’s ground-truth shape and reflectance. We will         (A+L) SIRFS + known illumination      18.58   0.3761   0.0076   0.0120   0.0146      -        -
refer to this new pseudo-synthetic dataset of naturally illuminated objects as our “natural” illumination                            III. Color Images, Natural Illumination
                                                                             Algorithm             Z -MAE N -MAE S -MSE R-MSE RS -MSE L -MSE             Avg.
dataset, and we will refer to the original MIT images            (1)
                                                                 (2)
                                                                        Naive Baseline
                                                                        Retinex [4], [10] + SFS
                                                                                                    25.56
                                                                                                    26.76
                                                                                                           0.7223
                                                                                                           0.5851
                                                                                                                  0.0283 0.0266
                                                                                                                  0.0174 0.0174
                                                                                                                                0.0125
                                                                                                                                0.0083
                                                                                                                                       0.0371
                                                                                                                                       0.0371
                                                                                                                                                        0.1364
                                                                                                                                                        0.1066
as the “laboratory” illumination dataset. From our               (3)
                                                                 (4)
                                                                        Tappen et al. [14] + SFS
                                                                        Gehler et al. [15] + SFS
                                                                                                    53.87
                                                                                                    37.66
                                                                                                           0.7255
                                                                                                           0.6398
                                                                                                                  0.0255 0.0280
                                                                                                                  0.0162 0.0150
                                                                                                                                0.0268
                                                                                                                                0.0105
                                                                                                                                       0.0371
                                                                                                                                       0.0371
                                                                                                                                                        0.1740
                                                                                                                                                        0.1149
experience applying our model to real-world images,              (A)
                                                                 (B)
                                                                        SIRFS
                                                                        SIRFS, no R-smoothness
                                                                                                    28.21
                                                                                                    28.41
                                                                                                           0.4057
                                                                                                           0.4192
                                                                                                                  0.0055 0.0046
                                                                                                                  0.0061 0.0057
                                                                                                                                0.0036 0.0103
                                                                                                                                0.0062 0.0104
                                                                                                                                                        0.0469
                                                                                                                                                        0.0546
these “natural” illuminations appear to be much more             (C)
                                                                 (D)
                                                                        SIRFS, no R-parsimony
                                                                        SIRFS, no R-absolute
                                                                                                    28.90
                                                                                                    20.63
                                                                                                           0.4184 0.0073 0.0064
                                                                                                          0.3538 0.0068 0.0058
                                                                                                                                0.0041
                                                                                                                                0.0039
                                                                                                                                       0.0107
                                                                                                                                       0.0091
                                                                                                                                                        0.0540
                                                                                                                                                        0.0466
representative of the sort of illumination we see                (E)
                                                                 (F)
                                                                        SIRFS, no Z-smoothness
                                                                        SIRFS, no Z-isotropy
                                                                                                    24.68
                                                                                                    50.49
                                                                                                           0.4441 0.0087 0.0062 0.0095
                                                                                                           0.4015 0.0046 0.0039 0.0037
                                                                                                                                       0.0099
                                                                                                                                       0.0086
                                                                                                                                                        0.0618
                                                                                                                                                        0.0475
in uncontrolled environments, though the dataset is              (G)
                                                                 (H)
                                                                        SIRFS, no Z-contour
                                                                        SIRFS, no L-gaussian
                                                                                                    41.27
                                                                                                    20.22
                                                                                                           0.7036
                                                                                                           0.3937
                                                                                                                  0.0094 0.0083
                                                                                                                  0.0100 0.0088
                                                                                                                                0.0062
                                                                                                                                0.0075
                                                                                                                                       0.0256
                                                                                                                                       0.0483
                                                                                                                                                        0.0843
                                                                                                                                                        0.0796
heavily biased towards more colorful illuminations.               (I)
                                                                  (J)
                                                                        SIRFS, no Z-multiscale
                                                                        SIRFS, no L-whitening
                                                                                                    25.64
                                                                                                    51.74
                                                                                                           0.7205
                                                                                                           0.9430
                                                                                                                  0.0279 0.0279
                                                                                                                  0.0140 0.0106
                                                                                                                                0.0124
                                                                                                                                0.0066
                                                                                                                                       0.0291
                                                                                                                                       0.0777
                                                                                                                                                        0.1316
                                                                                                                                                        0.1246
We attribute this to a photographer’s bias towards               (K)    Shape-from-Contour          19.55  0.4253 0.0283 0.0266 0.0125 0.0371           0.1194
“interesting” environment maps in the sIBL Archive.            (S) shape observation
                                                             (A+S) SIRFS + shape observation
                                                                                                    4.83
                                                                                                    3.17
                                                                                                           0.1952
                                                                                                           0.1471
                                                                                                                       -
                                                                                                                    0.0034
                                                                                                                                -
                                                                                                                             0.0032
                                                                                                                                         -
                                                                                                                                      0.0030
                                                                                                                                                  -
                                                                                                                                               0.0049
                                                                                                                                                           -
                                                                                                                                                        0.0206
   Given our dataset, we will evaluate our model on          (A+L) SIRFS + known illumination      10.28   0.1957   0.0018   0.0014   0.0022      -        -
the task of recovering all intrinsic scene properties
from a single image of a masked object, under three                                   TABLE 1
different conditions: I: the input is a grayscale image          We evaluate SIRFS on three different variants of our
and the illumination is “laboratory”-like, II: the input         dataset, and we compare SIRFS to several baseline
is a color image and the illumination is “laboratory”-           techniques, several ablations, and two extensions in
                                                                      which additional information is provided.
 4. http://www.hdrlabs.com/sibl/archive.html


<!-- PK PAGE 15 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                       15
                                                               but our recovered shape and surface normals are sig-
                                                               nificantly better, demonstrating the value of a unified
                                                               technique over a piecewise system that first does in-
                                                               trinsic images, and then does shape from shading. For
                                                               color images under “natural” illumination, SIRFS out-
    (a) Achromatic illumination   (b) Chromatic illumination   performs all baseline models by a very large margin,
Fig. 16.     Chromatic illumination dramatically helps         it is the only model that can reason well about color
shape estimation. Achromatic isophotes (K-means                illumination and (implicitly) color shading. From our
clusters of log-RGB values) are very elongated, while          ablation study, we see that each prior contributes
chromatic isophotes are usually more tightly localized.        positively to performance, though the improvement
Therefore, under achromatic lighting a very wide range         we get from each prior is greater in the grayscale case
of surface orientations appear similar, but under chro-        than in the color/natural case. This makes sense, as
matic lighting only similar orientations appear similar.       color images under natural illumination contain much
                                                               more information than in grayscale images, and so the
                                                               “likelihood” dominates our priors during inference.
                                                               Our ablation study also shows that our multiscale
comparison, the SFS algorithm uses our shape priors,           optimization is absolutely critical to performance. Surwhich boosts each baseline’s performance (detailed             prisingly, our shape-from-contour baseline performs
in Appendix H). We also compare against a “naive”              very well in terms of our shape/normal error metrics.
$$
algorithm, which is a baseline in which Z = ~0 and             This is probably just a reflection of the fact that all
$$
$$
L = ~0. Because the intrinsic image baselines do               models are bad at absolute shape reconstruction, due
$$
$$
not estimate illumination, we use L = ~0 as their              to the inherent ambiguity in shape-from-shading, and
$$
prediction. We were forced to use different baseline           so the overly-smooth shape predicted by the shapetechniques for different tasks, as some baselines do           from-contour model, by virtue of being smooth and
not have code available for running on new imagery,            featureless, has a low error relative to the more elaboand some code that was designed for color images               rate depth maps produced by other models. Of course,
crashes when run on grayscale images.                          the shape-from-contour model performs poorly on all
   We also compare against several ablations of our            other error metrics, as we would expect. This analmodel in which components have been removed:                   ysis of the inherent difficulty of shape estimation is
models B-H omit priors by simply setting their λ               further demonstrated by model A+S, which includes
hyperparameters to 0, and models I and J omit our              external shape information, and which therefore permultiscale optimization over Z and our whitened                forms much better in terms of our shape/normal error
optimization over L respectively. Model K is a shape-          metrics, but surprisingly performs similarly to model
from-contour technique, in which only our shape-               A (basic SIRFS) in terms of all other error metrics.
$$
priors are non-zero and L = ~0, so the only effective          From the performance of model A+L we see that
$$
input to the model is the silhouette of the object (for        knowing the illumination of the scene a-priori does
this baseline, the hyperparameters have been com-              not help much when the illumination is laboratorypletely re-tuned on the training set). We also compare         like, but helps a great deal when the illumination
against two extensions of SIRFS: model A+L, in which           is “natural” — which makes sense, as more-varied
the ground-truth illumination is known (and fixed              illumination simply makes the reconstruction task
during optimization), and model A+S, in which we               more difficult. One surprising conclusion we can draw
provide a blurry version of the ground-truth shape             is that, though the intrinsic image baselines perform
$$
(convolved with a Gaussian kernel with σ = 30)                 worse in the presence of “natural” illumination, SIRFS
$$
as input. See Appendix D for a description of an               actually performs better in natural illumination, as it
additional shape “prior” we use to incorporate the             can exploit color illumination to better disambiguate
external shape observation for this one variant of our         between shading and reflectance (Figure 4), and promodel. Model S shows the performance of just the               duce higher-quality shape reconstructions (Figure 16).
blurry ground-truth shape provided as input to model           This finding is consistent with recent work regarding
A+S, for reference. The performance of SIRFS relative          shape-from-shading under natural illumination [62].
to some of these baselines and extensions can be see           However, we should mention that some of the imin Table 1, in Figure 2 and in the appendices.                 proved performance in the natural illumination task
   From Table 1, we see that SIRFS outperforms all             may be due to the fact that the images are pseudobaseline techniques. For grayscale images, the im-             synthethic (their shading images were produced using
provement is substantial: our error is roughly half            our spherical-harmonic rendering) and so they are
that of the best technique. For color images under             Lambertian and contain no cast shadows.
“laboratory” illumination, our recovered shading and              In Figure 17, we demonstrate a simple graphics
reflectance images are only slightly better than those         application using the output of our model, for a
of the best-performing intrinsic image technique [15],         color image under laboratory illumination. Given just


<!-- PK PAGE 16 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                        16
     (a) Input Image       (b) Modified shape    (c) Modified reflectance   (d) Modified light   (e) Modified orientation
Fig. 17. Our system has obvious graphics applications. Given only a single image, we can estimate an object’s
shape, reflectance, or illumination, modify any of those three scene properties (or simply rotate the object), and
then re-render the object.
the output of our model from a single image, we              ages, and qualitatively correct illumination. Our recan synthesize novel images in which the shape,              covered shape and surface normals are often somereflectance, illumination, or orientation of the object      what wrong, as evidenced by the new synthesized
has been changed. The output is not perfect — the            views of each object, but our “relit” objects are often
absolute shape is often very incorrect, as we saw in         very compelling. The most common mistakes made
Table 1, which is due to the inherent ambiguity and          in shading/reflectance estimation are usually due to
difficulty in estimating shape from shading. But such        our model assuming that the dominant color of the
shape errors are usually only visible when rotating the      object is due to illumination, not reflectance (such as
object, and this inherent ambiguity in shape percep-         in the two pictures of faces) which we believe is due to
tion often works in our favor when only manipulating         biases in our training data towards white reflectances
reflectance, illumination, or fine-scale shape — low-        and colorful illumination.
frequency errors in shape-estimation made by our
model are often not noticed by human observers,
because both the model and the human are bad at              9    C ONCLUSION
using shading to estimate coarse shape.                      We have presented SIRFS, a model which takes as
                                                             input a single (masked) image of an object, and pro8.1 Real-World Images                                        duces as output a reasonable estimate of the shape,
Though our model quantitatively performs very well           surface normals, reflectance, shading, and illuminaon the MIT-Berkeley Intrinsic Images dataset, this           tion which produced that image. At the core of SIRFS
dataset is not very representative of the variety of         is a series of priors on shape, reflectance, and ilnatural objects in the world — materials are very Lam-       lumination: surfaces tend to be isotropic and bend
bertian, many reflectances are very synthetic-looking,       infrequency, reflectance images tend to be piecewise
and illumination is not very varied. We therefore            smooth and low-entropy, and illumination tends to
present an additional experiment in which we ran             be natural. Given these priors and our multiscale
our model on arbitrary masked images of natural              optimization technique, we can infer the most-likely
objects. We acquired many images (some with an               explanation of a single image subject to our priors
iPhone camera, some with a DSLR, some downloaded             and the constraint that the image be explained. Our
from the internet), manually cropped the object in           unified approach to this problem outperforms all prethe photo, and used them as input to our model.              vious solutions to its constituent problems of shapeIn Figure 18 we visualize the output of our model:           from-shading and intrinsic image recovery on our
the recovered shape, normals, reflectance, shading,          challenging dataset, and produces reasonable results
and illumination, a synthesized view of the object           on arbitrary masked images of real-world objects in
from a different angle, and a synthesized rendering          uncontrolled environments. This suggests that the
of the object using a different (randomly generated)         shape-from-shading and intrinsic images problem forillumination. We did two experiments: one in which           mulations may be fundamentally limited, and attenwe used a grayscale version of the input image and           tion should be refocused towards developing models
our laboratory illumination model, and one in which          that jointly reason about shape and illumination in
we used the color input image and our natural illumi-        addition to shading and reflectance.
nation model. We use the same code and hyperparam-              But of course, our model has some limitations.
eters for all images in the two constituent tasks, where     Because shading is an inherently poor cue for lowour hyperparameters are identical to those used in the       frequency shape estimation [25], [26] our model often
previous experiments with the MIT-Berkeley Intrinsic         makes mistakes in coarse shape estimation. To address
Images dataset.                                              this, we have presented a method for incorporating
   We see that our model is often able to produce            some external observation of shape, such as one
extremely compelling shading and reflectance im-             from a stereo algorithm or a depth sensor, and we


<!-- PK PAGE 17 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                     17
Fig. 18. Our model produces reasonable results on real, manually cropped images of objects. Here are images
of arbitrary objects in uncontrolled illumination environments which were downloaded or taken on consumer
cameras. For each image, we have the output of our model, and two renderings of our recovered model: one in
which we rotate the object, and one in which we relight the object. We run our algorithm on a grayscale version
of the image (left), and on the original color image (right). For the color images, we use our “natural” illumination
model. The code and parameters used for these images are the same as in all other experiments.


<!-- PK PAGE 18 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                          18
have demonstrated that by incorporating some low-                    [13] J. Shen, X. Yang, Y. Jia, and X. Li, “Intrinsic images using
frequency external shape observation (such as what a                      optimization,” CVPR, 2011.
                                                                     [14] M. F. Tappen, W. T. Freeman, and E. H. Adelson, “Recovering
stereo algorithm or a depth sensor would provide)                         intrinsic images from a single image,” TPAMI, 2005.
we can produce high-quality shape estimates. We                      [15] P. Gehler, C. Rother, M. Kiefel, L. Zhang, and B. Schoelkopf,
assume that materials are Lambertian, which is often                      “Recovering intrinsic images with a global sparsity prior on
                                                                          reflectance,” NIPS, 2011.
a reasonable approximation but can causes problems                   [16] D. A. Forsyth, “A novel algorithm for color constancy,” IJCV,
for objects with specularities. Thankfully, because of                    1990.
the modular nature of our algorithm, our simple                      [17] L. T. Maloney and B. A. Wandell, “Color constancy: a method
                                                                          for recovering surface spectral reflectance,” JOSA A, 1986.
Lambertian rendering engine can easily be replaced                   [18] G. Klinker, S. Shafer, and T. Kanade, “A physical approach to
by a more sophisticated model. We assume that im-                         color image understanding,” IJCV, 1990.
ages consist of single, masked objects, while real-                  [19] G. Finlayson, S. Hordley, and P. Hubel, “Color by correlation:
                                                                          a simple, unifying framework for color constancy,” TPAMI,
world natural scenes contain severe occlusion and                         2001.
support relationships. We also assume illumination                   [20] D. H. Brainard and W. T. Freeman, “Bayesian color constancy,”
is global, and we ignore illumination issues such as                      JOSA A, 1997.
                                                                     [21] B. K. P. Horn, “Obtaining shape from shading information,”
cast shadows, mutual illumination, or other sources                       in The Psychology of Computer Vision, 1975.
of spatially-varying illumination [56], [63]. To address             [22] T. Rindfleisch, “Photometric method for lunar topography,”
these two issues of occlusion and spatially-varying                       Photogrammetric Engineering, 1966.
                                                                     [23] M. J. Brooks and B. K. P. Horn, Shape from shading. MIT Press,
illumination in natural scenes, we have investigated                      1989.
into the interplay between SIRFS and segmentation                    [24] R. Zhang, P.-S. Tsai, J. E. Cryer, and M. Shah, “Shape-fromtechniques, by generalizing SIRFS to a mixture model                      shading: a survey,” TPAMI, 2002.
                                                                     [25] P. Belhumeur, D. Kriegman, and A. Yuille, “The Bas-Relief
of shapes and lights which are embedded in a soft                         Ambiguity,” IJCV, 1999.
segmentation of a scene [64]. Another limitation of our              [26] J. Koenderink, A. van Doorn, C. Christou, and J. Lappin,
technique is that our priors on shape and reflectance                     “Shape constancy in pictorial relief,” Perception, 1996.
                                                                     [27] K. Ikeuchi and B. Horn, “Numerical shape from shading and
are independent of the category of object present in                      occluding boundaries,” Artificial Intelligence, 1981.
the scene. We see this as a strength of our model,                   [28] H. Boyaci, K. Doerschner, J. L. Snyder, and L. T. Maloney,
as it means that our priors are general enough to                         “Surface color perception in three-dimensional scenes,” Visual
                                                                          Neuroscience, 2006.
generalize across object categories, but presumably an               [29] R. Woodham, “Photometric method for determining surface
extension of our model which uses object recognition                      orientation from multiple images,” Optical engineering, 1980.
techniques to produce class-specific priors should per-              [30] R. Basri, D. Jacobs, and I. Kemelmacher, “Photometric stereo
                                                                          with general, unknown lighting,” IJCV, 2007.
form better.                                                         [31] R. Hartley and A. Zisserman, Multiple view geometry in com-
                                                                          puter vision. Cambridge University Press, 2003.
                                                                     [32] B. Triggs, P. F. McLauchlan, R. I. Hartley, and A. W. Fitzgibbon,
ACKNOWLEDGMENTS                                                           “Bundle adjustment - a modern synthesis,” ICCV, 1999.
J.B. was supported by NSF GRFP and ONR MURI                          [33] Y. Yu, P. Debevec, J. Malik, and T. Hawkins, “Inverse global
                                                                          illumination: recovering reflectance models of real scenes from
N00014-10-10933. Thanks to Trevor Darrell, Bruno                          photographs,” SIGGRAPH, 1999.
Olshausen, David Forsyth, Bill Freeman, Ted Adelson,                 [34] D. Hoiem, A. A. Efros, and M. Hebert, “Recovering surface
and Estee Schwartz.                                                       layout from an image,” IJCV, 2007.
                                                                     [35] A. Saxena, M. Sun, and A. Ng, “Make3d: learning 3d scene
                                                                          structure from a single still image,” TPAMI, 2008.
R EFERENCES                                                          [36] V. Blanz and T. Vetter, “A morphable model for the synthesis
                                                                          of 3D faces,” SIGGRAPH, 1999.
[1]  E. Adelson and A. Pentland, “The perception of shading and      [37] J. Huang and D. Mumford, “Statistics of natural images and
     reflectance,” Perception as Bayesian inference, 1996.                models,” CVPR, 1999.
[2] D. Field, “Relations between the statistics of natural images    [38] J. Portilla, V. Strela, M. J. Wainwright, and E. P. Simoncelli,
     and the response properties of cortical cells,” JOSA A, 1987.        “Image denoising using scale mixtures of gaussians in the
[3] D. Ruderman and W. Bialek, “Statistics of natural images:             wavelet domain,” IEEE Trans. Image Process, 2003.
     Scaling in the woods,” Physical Review Letters, 1994.           [39] S. Roth and M. J. Black, “Fields of experts: A framework for
[4] R. Grosse, M. K. Johnson, E. H. Adelson, and W. T. Freeman,           learning image priors,” CVPR, 2005.
     “Ground-truth dataset and baseline evaluations for intrinsic    [40] R. Fergus, B. Singh, A. Hertzmann, S. T. Roweis, and W. Free-
     image algorithms,” ICCV, 2009.                                       man, “Removing camera shake from a single photograph,”
[5] J. T. Barron and J. Malik, “High-frequency shape and albedo           SIGGRAPH, 2006.
     from shading using natural image statistics,” CVPR, 2011.       [41] J. Huang, A. B. Lee, and D. Mumford, “Statistics of range
[6] ——, “Shape, albedo, and illumination from a single image of           images,” CVPR, 2000.
     an unknown object,” CVPR, 2012.                                 [42] F. Romeiro and T. Zickler, “Blind reflectometry,” ECCV, 2010.
[7] ——, “Color constancy, intrinsic images, and shape estima-        [43] R. O. Dror, A. S. Willsky, and E. H. Adelson, “Statistical
     tion,” ECCV, 2012.                                                   characterization of real-world illumination,” JOV, 2004.
[8] A. Gilchrist, Seeing in Black and White. Oxford University       [44] B. K. P. Horn, “Shape from shading: A method for obtaining
     Press, 2006.                                                         the shape of a smooth opaque object from one view,” MIT,
[9] E. H. Land and J. J. McCann, “Lightness and retinex theory,”          Tech. Rep., 1970.
     JOSA, 1971.                                                     [45] R. Ramamoorthi and P. Hanrahan, “An Efficient Representa-
[10] B. K. P. Horn, “Determining lightness from an image,” Com-           tion for Irradiance Environment Maps,” CGIT, 2001.
     puter Graphics and Image Processing, 1974.                      [46] N. Alldrin, S. Mallick, and D. Kriegman, “Resolving the gener-
[11] H. Barrow and J. Tenenbaum, “Recovering intrinsic scene              alized bas-relief ambiguity by entropy minimization,” CVPR,
     characteristics from images,” Computer Vision Systems, 1978.         2007.
[12] M. Bell and W. T. Freeman, “Learning local evidence for         [47] G. D. Finlayson, M. S. Drew, and C. Lu, “Entropy minimization
     shading and reflectance,” ICCV, 2001.                                for shadow removal,” IJCV, 2009.


<!-- PK PAGE 19 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                        19
$$
[48] I. Omer and M. Werman, “Color lines: Image specific color         pixel: ni = [Nix , Niy , Niz ]T . Rendering that point with
$$
     representation,” CVPR, 2004.                                      spherical harmonics is:
[49] J. C. Principe and D. Xu, “Learning from examples with
$$
     quadratic mutual information,” Workshop on Neural Networks        S(ni , L)    = [n ; 1]T M[ni ; 1]                            (23)
$$
     for Signal Processing, 1998.                                                     i                                              
[50] J. Chen, S. Paris, and F. Durand, “Real-time edge-aware image                       c1 L9 c1 L5             c1 L8       c2 L4
     processing with the bilateral grid,” SIGGRAPH, 2007.                              c1 L5 −c1 L9             c1 L6       c2 L2     
$$
[51] S. Bell, P. Upchurch, N. Snavely, and K. Bala, “Opensurfaces: A          M     = 
$$
                                                                                       c1 L8 c1 L6
                                                                                                                                       
     richly annotated catalog of surface appearance,” SIGGRAPH,                                                  c3 L7       c2 L3     
     2013.                                                                               c2 L4 c2 L2             c2 L3   c4 L1 − c5 L7
[52] O. Woodford, P. Torr, I. Reid, and A. Fitzgibbon, “Global
     stereo reconstruction under second-order smoothness priors,”
     TPAMI, 2009.
$$
                                                                            c1 = 0.429043       c2 = 0.511664
$$
$$
[53] D. Hilbert and C. S. Vossen, Geometry and the Imagination.             c3 = 0.743125       c4 = 0.886227       c5 = 0.247708
$$
     Chelsea Publishing Company, 1956.
[54] H. P. Moreton and C. H. Séquin, “Functional optimization for     Note that S(ni , L) is the log-shading at pixel i, not
     fair surface design.” in SIGGRAPH, 1992.
[55] P. Besl and R. Jain, “Segmentation through variable-order
                                                                       the shading. This is different from the traditional
     surface fitting,” TPAMI, 1988.                                    usage of spherical harmonic illumination. Directly
[56] D. A. Forsyth, “Variable-source shading analysis,” IJCV, 2011.    modeling log-shading makes optimization easier by
[57] J. Koenderink, “What does the occluding contour tell us about
     solid shape?” Perception, 1984.
                                                                       guaranteeing that shading is greater than 0 without
[58] P. Mamassian, D. Kersten, and D. C. Knill, “Categorical local-    needing to clamp shading at 0, as is normally done.
     shape perception,” Perception, 1996.                              The gradient of the log-shading at this point with
[59] M. Brady and A. Yuille, “An extremum principle for shape
     from contour,” TPAMI, 1983.
                                                                       respect to the surface normal is:
[60] J. Malik, “Interpreting line drawings of curved objects,” IJCV,
     vol. 1, 1987.
$$
                                                                                    Bi = ∇ni S(ni , L) = 2nT
$$
                                                                                                           i M[:, 1 : 3]
[61] D. Terzopoulos, “Image analysis using multigrid relaxation
     methods,” TPAMI, 1986.                                            Where B is a three-channel image, where B x is the
[62] M. K. Johnson and E. H. Adelson, “Shape estimation in natural     gradient of S with respect to N x , etc. Given the log-
     illumination,” CVPR, 2011.                                        shading, we can infer what the log-albedo at this point
[63] D. Forsyth and A. Zisserman, “Reflections on shading,”
     TPAMI, 1991.
                                                                       must be:
[64] J. T. Barron and J. Malik, “Intrinsic scene properties from a
$$
     single rgb-d image,” CVPR, 2013.                                                       Ai = Ii − S(ni , L)                     (24)
$$
[65] A. Adams, J. Baek, and M. A. Davis, “Fast high-dimensional
$$
     filtering using the permutohedral lattice,” Eurographics, 2012.   After calculating g(A) and ∇A g(A), we can backprop-
$$
[66] J. Koenderink, A. Van Doorn, C. Christou, and J. Lappin,          agate the gradient onto Z as follows:
     “Perturbation study of shading in pictures,” Perception, 1996.
$$
[67] A. Blake, A. Zisserman, and G. Knowles, “Surface descriptions              DS      = −∇A g(A)                                  (25)
$$
     from stereo and shading,” Image and Vision Computing, 1986.                               x             y              z
$$
                                                                                 Dx     = B × F11 + B × F12 + B × F13
$$
$$
                                                                                   Dy   = B x × F12 + B y × F22 + B z × F23
$$
$$
A PPENDIX A                                                                ∇Z g(A)      =    (DS × Dx ) ? hx3 + (DS × Dy ) ? hy3
$$
L INEARIZATION AND R ENDERING
$$
                                                                       where × is component-wise multiplication of two
$$
Here we will detail how to calculate S(Z, L) (the
                                                                       images and ? is cross-correlation.
log-shading of some depth map Z subject to some
                                                                          Let us construct the matrix J, the Jacobian matrix
spherical harmonic illumination L) and its analytical
                                                                       of all partial derivatives of S with respect to L, which
derivative efficiently, for the purpose of calculating A
                                                                       is a n by 9 matrix (where n is the number of pixels in
and backpropagating losses on A back onto Z . First,
                                                                       S), where row i is:
we convert Z into a set of surface normals:
$$
                                                                       Ji = c4, 2c2 Niy , 2c2 Niz , 2c2 Nix , 2c1 Nix Niy , 2c1 Niy Niz ,
$$
                                                                             
             Z ∗ hx3        Z ∗ hy3                   1
$$
     Nx =            , Ny =         ,         Nz =                             c3 Niz Niz − c5 , 2c1 Nix Niz , c1 (Nix Nix − Niy Niy )
$$
                                                                                                                                        
               B      q       B                       B
                                        2              2
$$
                B=        1 + (Z ∗ hx3 ) + (Z ∗ hy3 )          (21)    We can use this matrix to backpropagate the gradient
$$
                                                                       of the loss with respect to S onto L, as follows:
$$
where ∗ is convolution. We also compute the following:                                                                                         ∇L g(A)    = J T DS                    (26)
$$
$$
              F11     =    (1 − N x × N x ) × N z                        We have described how to linearize a depth map,
$$
                                                                       compute a log-shading image of that linearization
$$
              F22     =    (1 − N y × N y ) × N z
$$
                                                                       with respect to a grayscale spherical-harmonic model
$$
              F13     = − (N x × N z × N z )                           of illumination, and backpropagate a gradient with
$$
$$
              F23     = − (N y × N z × N z )                           respect to that shading image onto the depth map and
$$
$$
              F12     = − (N x × N y × N z )                   (22)    the illumination model. To do the same for a color
$$
                                                                       image, we simply do the same procedure three times
$$
where × is component-wise multiplication of two                        — though for efficiency’s sake we need only linearize
$$
images. Let us look at the surface normal at one                       the depth map once.


<!-- PK PAGE 20 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                    20
A PPENDIX B                                                  fenceposts assigned to datapoint xi are bL and bU ,
E FFICIENT Q UADRATIC E NTROPY                               where bL is the largest fencepost below it, and bU is
                                                             the smallest fencepost above it:
Here we will detail a novel method for calculating the
$$
quadratic entropy measure introduced in [49], which                 bL = b(xi − RL )/W c,    bU = bL + 1        (32)
$$
we use in our parsimony prior on log-reflectance.
Let x be a vector, N is the length of x, and σ is            xi will be assigned to those bins according to these
the bandwidth parameter (the width of the Gaussian           weights:
bump around each element of x). Then the quadratic
$$
entropy of x under the Parzen window defined by x                   wL = (xi − bL )/W,      wU = 1 − wL         (33)
$$
and σ is defined as:
                                                           When adding xi to the histogram, we just add these
                        N X N                    2
                                                    
                      1 X            (x i −  x j )           two weights to the appropriate bins:
$$
  H(x) = − log                exp −                  
$$
$$
                     Z i=1 j=1            4σ 2
$$
$$
                √                                                    nL = nL + wL ,    nU = nU + wU             (34)
$$
$$
     Z = N 2 4πσ 2                                    (27)
$$
                                                             The partial derivatives of the histogram with respect
Note that we will use H(·) here to describe entropy,         to xi are simple:
rather than mean curvature. Our first insight is that
$$
this can be re-expressed as a function on a histogram                      ∂nL   1          ∂nU   1
$$
$$
                                                                               =− ,             =               (35)
$$
$$
of x. Let W be the bin-width of the histogram of x,                        ∂xi   W          ∂xi   W
$$
let M be the number of bins, and let na be the count
                                                             With this, we can construct the Jacobian J of n with
of x in bin a. Then:
                                                             respect to x, which is a M by N sparse matrix. With
                  M      M                           !
                                        W 2 (a − b)2         this, we can calculate the gradient of H with respect
                                   
                 X      X   nb
$$
  H(n) = − log       na        exp −                         to x:
$$
                 a=1
                            Z               4σ 2
                        b=1
$$
                                                      (28)                  ∇H(x) ≈ J T ∇H(n)                   (36)
$$
Though the computation complexity of this formulation is still quadratic with respect to M , if the            This approximation to quadratic entropy is, in prachistogram is constructed such that many datapoints           tice, extremely efficient and extremely accurate. Other
fall in the same bin this formulation can be much            techniques exist for computing approximations to this
more efficient in practice. Our second insight is that       quantity, most notably the fast Gauss transform and
this can be expressed as a convolution of n with a           the improved fast Gauss transform. Also, H(x) could
small Gaussian filter. Let g be a Gaussian filter:           be computed exactly using the naive formulation in
                                W 2 d2                       Equation 27. The naive formulation is completely
                                      
                      1
$$
                gd = exp −                            (29)   intractable, as the computation complexity is O(N 2 ).
$$
                      Z          4σ 2
$$
                                                             The FGT-based algorithms are O(N log N ), and proWhere d is distance from the center. With this, we can       vide no efficient way to compute ∇H(x), which
$$
rewrite H(n) as follows:                                     makes those algorithms impossible to use in our
$$
              H(n) = − log nT (n ∗ g)
$$
                                      
                                                   (30)      gradient-based optimization scheme. Our approxima-
                                                             tion has a complexity of O(N ) (provided the kernel
$$
Where ∗ is convolution. This quantity is extremely           in the convolution is small) and allows for ∇H(x)
$$
efficient to compute, provided that the lengths of n         to be approximated extremely efficiently. In practice,
and g are small, which is true provided that the range       our model produces approximations of entropy that
of x is not much larger than σ, which is generally true      are usually within 0.01% of the true entropy, which is
in practice.                                                 similar to the accuracy obtained using the fast Gauss
   This formulation also allows us to easily compute         transform or the improved fast Gauss transform, and
the gradient of V (n) with respect to n:                     is 10 or 100 times faster than the FGT-based algo-
                                                           rithms.
                             −2
$$
             ∇H(n) =                  (n ∗ g)      (31)         This techniques for computing quadratic entropy
$$
                         nT (n ∗ g)
                                                             for a univariate signal can easily be generalized to
Histogramming is a non-smooth operation, making              higher dimensions. We use a three-dimensional genthis approximation to entropy not differentiable with        eralization to compute the quadratic entropy of a
respect to x. However, if instead of standard his-           color (whitened) log-reflectance image. Instead of contogramming we use linear interpolation to construct          structing a 1D histogram with linear interpolation, we
n, then the gradient with respect to x is non-zero and       construct a 3D histogram using trilinear interpolation,
can be calculated easily.                                    and instead of convolving our 1D kernel with a
  Let RL and RU define the bounds on the range of            Gaussian filter, we convolve the 3D histogram with
$$
the bins, with RU = min(x) and RL = max(x). The              three separable Gaussian filters.
$$


<!-- PK PAGE 21 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                                       21
   Note that this formulation is extremely similar to                       they will be used to backpropagate the gradient of the
the bilateral grid [50], which is a tool for high-                          loss function using the chain rule.
dimensional Gaussian filtering (used mostly for bi-
                                                                                                                    3Zx N
$$
lateral filtering, hence the name). The calculation                                    Fx   =   2(Zx Zyy − Zxy Zy ) −
$$
of our entropy measure is extremely similar to the                                                                   M2
                                                                                                                    3Zy N
$$
“splat, blur, slice” pipeline in other high-dimensional                                Fy   = 2(Zxx Zy − Zx Zxy ) −
$$
                                                                                                                     M2
Gaussian filtering works [65], except that after the
$$
                                                                                     Fxx    = 1 + Zy2
$$
“slice” operation we take the inner product of the
$$
input “signal” and the blurred output signal. This                                   Fyy    =   1 + Zx2
$$
$$
means that we need not actually compute the slice                                    Fxy    = −2Zx Zy                             (40)
$$
operation, but can instead just compute the inner
$$
product directly in the histogram space. This connec-                       Given f (H(Z)) and ∇H(Z) f , a loss function and the
$$
tion means that the body of work for efficiently com-                       gradient of that loss function with respect to H(Z),
$$
puting this quantity in the context of image filtering                      we can calculate ∇Z f , the gradient of the loss with
$$
can be directly adapted to the problem of computing                         respect to Z, as follows:
$$
high-dimensional entropy measures. Recent work [65]                                     ∇H(Z) f
$$
$$
suggests that for dimensionalities of 3, our bilateral                         B   =                                               (41)
$$
                                                                                          D
$$
grid formulation is the most efficient among exist-                         ∇Z f   =    (BFx ) ? hx3 + (BFy ) ? hy3
$$
ing techniques, but that this entropy measure could                                                               yy             xy
                                                                                   +    (BFxx ) ? hxx
                                                                                                   3 + (BFyy ) ? h3 + (BFxy ) ? h3
be computed reasonably efficiently in significantly
higher-dimensional spaces (up to 8 or 16) using more                        Adjacent variables are component-wise multiplication
sophisticated techniques.                                                   of two images, / is component-wise division, ∗ is
                                                                            convolution and ? is cross-correlation.
A PPENDIX C
M EAN C URVATURE                                                            A PPENDIX D
Here we will detail how to calculate H(Z) (the mean                         N OISY S HAPE O BSERVATION
curvature of a depth map Z, not entropy) and its
                                                                            One of the reasons that using shading cues to recover
analytical derivative efficiently. Mean curvature on a
                                                                            shape (as we are attempting here) is challenging, is
surface is a function of the first and second partial
                                                                            that shading is a fundamentally poor cue for lowderivatives of that surface.
                                                                          frequency (coarse) shape variation. Shading is directly
            1 + Zx2 Zyy − 2Zx Zy Zxy + 1 + Zy2 Zxx                          indicative of only the shape of a point relative to
$$
   H(Z) =
$$
                       2 1 + Zx2 + Zy2
                                       3/2                                 its neighbors: fine-scale variations in shape produce
                                                   (37)                     sharp, localized changes in an image, while coarseTo calculate this for a discrete depth map, we will                         scale shape variations produce very small, subtle
first approximate the partial derivatives using filter                      changes across an entire image. Both algorithms [25]
convolutions.                                                               and humans [66] therefore make errors in estimating
                                                                            coarse depth when using only shading. Bas relief
$$
                 Zx = Z ∗ hx3 ,       Zy = Z ∗ hy3                   (38)   sculptures take advantage of this by conveying the
$$
$$
    Zxx = Z ∗ hxx
$$
$$
               3 ,            Zyy = Z ∗ hyy
$$
$$
                                         3 ,   Zxy = Z ∗ hxy
$$
                                                          3
                                                                            impression of a rich, deep 3D scene, using only the
                                                                        shading produced by a physically shallow object.
                       1 0 –1                      1 2 1
$$
               hx3 = 18  2            y     1
$$
$$
                          0 – 2  , h3 = 8  0 0 0                            To deal with this issue, we will construct our prior
$$
                       1 0 –1                     –1 –2 –1                  on shape to allow for an external observation of shape
         
            1 0 –1
                                 
                                      1 2 1
                                                             
                                                                1 –2 1
                                                                           to be incorporated into inference. This observation
 hxy
$$
  3  = 1 
$$
       4
            0 0  0  ,   hyy
$$
                          3  =  1 
$$
                                4
                                    – 2  – 4  – 2  , hxx
$$
                                                       3  = 1 
$$
                                                            4
                                                                2 – 4 2    may be produced by a stereo algorithm, or by some
           –1 0 1                     1 2 1                     1 –2 1      depth sensor such as a laser rangefinder or the Kinect.
We then compute the following intermediate “im-                             These depth sensors or stereo algorithms often proages”, and use them to compute H(Z).                                        duce depth maps which are noisy or incomplete, or
            q                                                               most often blurry — lacking fine-scale shape detail.
$$
   M =        1 + Zx2 + Zy2                                                 Because of the complementary strengths of stereo
$$
                                                                            and shading, combining the two can often yield very
$$
     N     =     (1 + Zx2 )Zyy − 2Zx Zy Zxy + (1 + Zy 2 )Zxx
$$
                                                                            accurate results [67], [5].
$$
     D     =     2M 3                                                          We will construct a loss function to encourage our
$$
$$
H(Z)       = N/D                                                     (39)   recovered depth Z to resemble the raw sensor depth
$$
                                                                            Ẑ:
When computing H(Z), we also compute the follow-                                                                              γ2o
                                                                                             X
$$
ing, which are stored until after the loss function with                        fo (Z, Ẑ) =    ((Z ∗ b(σZ ))i − Ẑi )2 + 2       (42)
$$
respect to H(Z) has been calculated, at which point                                         i


<!-- PK PAGE 22 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                              22
This is simply a hyperlaplacian distribution with an              entropy: splat the signal into a histogram, compute the
exponent of γo on the difference between (Z ∗ b(σZ ))             loss of the histogram, and then backpropagate onto
and Ẑ at every pixel, with  added in to make the                the data. For even more efficiency, we can use the
loss differentiable everywhere. b(σZ ) is a 2D Gaussian           same histogram for both the entropy prior and the
filter with a standard deviation of σZ , and ∗ is convo-          absolute prior, which means that for each evaluation
lution, so (Z ∗ b(σZ ))i is the value of a blurry version         of the loss function, we only need to compute one hisof our shape estimate Z at pixel location i. We tune              togram from the reflectance and one backpropagation
γo on the training set, which sets it to ∼ 1, and we set          from the histogram to the reflectance.
$$
 = 1/100. The robust nature of this cost encourages Z
$$
to resemble Ẑ, while allowing it to occasionally differ          A PPENDIX F
drastically. In our experiments we use Z ∗ ∗b(30) as our          E RROR M ETRICS
Ẑ, which is a reasonably proxy for a stereo algorithm
$$
or low-resolution depth-sensor, and we set σZ = 30                Choosing good error metrics for this task is chalas that value (unsurprisingly) performs best during               lenging. We will use the geometric mean of six error
$$
cross-validation.                                                 metrics: two for shape, one for illumination, one for
   For the one variant of our model in which we incor-            shading, one for reflectance, and the MIT intrinsic
porate a noisy external shape observation, our prior              images error metric introduced in [4], which we
on shapes gains an additional term, and becomes:                  will refer to as RS-MSE (though which the original
                                                                  authors call “LMSE”). We use the geometric mean
$$
 f (Z) = λk fk (Z) + λi fi (Z) + λc fc (Z) + λo fo (Z, Ẑ) (43)   of these metrics as it is insensitive to the different
$$
                                                                  dynamic ranges of the constituent error metrics, and
Where λo is cross-validated on the training set.
                                                                  is difficult to trivially minimize in practice.
                                                                     Our first shape error metric is:
A PPENDIX E                                                                                1    X
$$
E FFICIENT C OMPUTATION                                              Z-MAE(Ẑ, Z ∗ ) = min                   ∗
$$
                                                                                                    Ẑx,y − Zx,y +b (44)
                                                                                           n β x,y
Our model is fairly computationally expensive. Evaluating our loss function and its gradient takes close             This is the shift-invariant absolute error between the
to a second, and optimization requires that the loss              estimated shape Ẑ and the ground-truth shape Z ∗ .
be evaluated hundreds of times. To make this model                This error metric is sensitive to all errors in shape esmore tractable, we use some additional tricks to speed            timation, except for the absolute distance of the shape
up the computation of the loss function.                          from the viewer (which is unknowable under ortho-
   First, our smoothness priors for reflectance and               graphic projection). It can be computed efficiently by
shape require repeatedly computing the negative log-              setting b to the median of Ẑ − Z ∗ .
likelihood of a Gaussian scale mixture. Computing                    Our second shape error metric is:
this naively is very expensive, but it can be made                                       1X                       
$$
extremely efficient by pre-computing a lookup ta-                    N -MAE(N̂ , N ∗ ) =                         ∗
$$
                                                                                               arccos N̂x,y · Nx,y     (45)
                                                                                         n x,y
ble of the negative log-likelihood, and indexing into
that to compute the gradient and its loss. For the                This is the mean error between the normal field N̂
multivariate GSM used in our smoothness prior for                 of our estimated shape Ẑ and the normal field N ∗ of
color reflectance, we can construct a lookup table of             the ground-truth shape Z ∗ , in radians. This metric is
negative log-likelihood with respect to Mahalanobis               most sensitive to very fine-scale errors in Ẑ, which is
distance under the covariance matrix Σ in our GSM.                what determines surface orientation.
   When computing our smoothness priors, it’s often                  For illumination, our error metric is:
fastest to pre-compute the pairs of pixels within all
$$
5 × 5 windows, and construct a sparse matrix where                                   1      X
$$
$$
                                                                    L -MSE(L̂, L∗ ) = min       ||αV (L̂)x,y − V (L∗ )x,y ||22
$$
for each pair, we have a row in which the column                                     n  α
                                                                                            x,y
corresponding to one pixel in the pair is set to 1 and                                                                   (46)
the column corresponding to the other pixel is set to             Which is the scale-invariant MSE of a rendering of
−1. With this, a vector of pairwise distances between             our recovered illumination L̂ and the ground-truth
pixels can be computed efficiently with one sparse                illumination L∗ . V (L) is a function that renders the
matrix-vector product. Also, expressing this pairwise             spherical harmonic illumination L on a sphere and
distance computation as a matrix multiplication al-               returns the log-shading. V (L)x,y is a 3-vector of loglows gradients to be easily backpropagated from the               RGB at position (x, y) in the renderings. The α mulvector of differences onto the raw pixels by simply               tiplier makes this error metric invariant to absolute
multiplying the gradient vector by the transpose of               scaling, meaning that estimating illumination to be
this matrix.                                                      twice as bright or half as bright doesn’t change the
   The prior for absolute reflectance can be computed             error. But because there is only one multiplier rather
efficiently using the same bilateral-grid trick used for          than individual scalings for each RGB channel, this


<!-- PK PAGE 23 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                     23
error metric is sensitive to the overall color of the       MSE of shading and reflectance, normalized so that
illuminant. This choice seems consistent with what          an estimate of all zeros has the maximum score of 1:
we would like: estimating absolute intensity of an                                     1 e(ŝ, s∗ ) e(r̂, r∗ )
                                                                                                              
                                                                              ∗ ∗
$$
illuminant from a single image is both incredibly             RS-MSE(ŝ, r̂, s , r ) =             +             (49)
$$
                                                                                       2 e(ŝ, 0)    e(r̂, 0)
difficult and not very useful, but estimating the color
of the illuminant is a reasonable thing to expect           Where e(·) is the sum of the scale-invariant MSE at
$$
from an algorithm, and would be useful for many             all local windows w of size 20 × 20, spaced in steps of
$$
applications (color constancy, relighting, reflectance      10:
estimation, etc). We impose our error metric in the
                                                                                    X                  2
$$
                                                                       e(x̂, x∗ ) =   min kαx̂w − x∗w k2       (50)
$$
space of visualizations of the illumination rather than                                  α
                                                                                  w∈W
in the space of the actual spherical harmonic coefficients that generated that visualization, both because        As an aside, in our error metrics we repeatedly use
it makes our error metric invariant to the choice of        scale-invariant MSE, of the form:
illumination model, and because we found that often                                              2
                                                                                min kαx̂ − x∗ k2                 (51)
the recovered illumination could look quite similar                              α
to the ground-truth, while having a very different
                                                            The closed-form solution to this problem is:
spherical harmonic representation.
   For shading and reflectance, we use:                                        T ∗             2
                                                                                x̂ x           ∗
                                                                                        x̂ − x                   (52)
                     1      X                    2                               x̂T x̂
$$
     S-MSE(ŝ, s∗ ) = min         αŝx,y − s∗x,y 2  (47)                                         2
$$
                     n α x,y
                     1      X                    2           A PPENDIX G
$$
     R-MSE(r̂, r∗ ) = min                    ∗
$$
                                  αr̂x,y − rx,y     (48)
                     n α x,y                     2           DATASET
These are the scale-invariant MSEs of our recovered         Here we will detail how we recover “ground-truth”
$$
shading ŝ = exp(S(Ẑ, L̂)) and reflectance r̂ = exp(R̂).   shape and spherical harmonic illumination for each
$$
Just like in L -MSE, we are invariant to absolute           image of each object in our dataset. This is a simple
scaling of all RGB channels at once, but not invariant      photometric stereo algorithm, in which we optimize
to scaling each channel individually. This makes these      over shapes and illuminations to minimize the aberror metrics sensitive to errors in estimating the         solute error between renderings of our dataset and
overall color of the shading and reflectance images,        the actual images in our dataset. Absolute error is
but invariant to illumination. Note that these error        used to give us robustness to errors due to shadows
metrics are of shading and reflectance, not of log-         and specularities, which our rendering engine (and
shading and log-reflectance, even though the rest of        therefore, our dataset) do not consider or address
this paper is written almost entirely in terms of log-      properly. Recovered shapes and illuminations were
intensity. We could have used shift-invariant error         then cleaned up by hand to address bas-relief ambimetrics in log-intensity space, but we found these to       guity issues[25]. We treat each RGB channel of each
be too sensitive to errors in dark regions of the image     image as a separate image.
— places in which we’d expect any algorithm to do             To account for varying reflectance, we compute a
worse, simply because there is less signal.                 “shading” image for each image on our dataset.
$$
  Our final error metric is the metric introduced in                       s∗i,j = exp(Ii,j − Ri )               (53)
$$
conjunction with the MIT intrinsic images dataset [4],
which the authors refer to as LMSE, but which we               We will now detail each step in the inner loop of our
will call RS-MSE to minimize confusion with L -MSE.         iterative photometric stereo algorithm. We first take
This metric measures error for both reflectance and         each current shape estimate Z, and linearize it to get
shading, and is locally scale-invariant. The intent of      a set of fixed surface normals. For each image j, we
the local scale-invariance is to make the metric in-        solve for the SH illumination that minimizes absolute
sensitive to low-frequency errors in either shading or      error between the rendering and the shading image:
reflectance. In keeping with this spirit, we apply this                         X
$$
error metric individually to each RGB channel and                  Lj ← arg min     | exp(S(ni , L)) − s∗i,j |  (54)
$$
take the mean of those three errors as RS-MSE, mak-                        L      i
ing this error metric not just robust to low-frequency
                                                            This optimization problem is solved using Iteratively
error, but robust to most errors in estimating the
                                                            Reweighted Least-Squares. We then fix each image’s
color of the illumination. This error metric therefore
                                                            illumination Lj , and optimize over each object’s norserves to be somewhat complementary to S-MSE
                                                            mals ni .
and R-MSE, which are sensitive to everything except                             X
$$
absolute intensity.                                              ni ← arg min      | exp(S(n, Lj )) − s∗i,j | (55)
$$
  RS-MSE is the mean of the local scale-invariant                          n
                                                                                 j


<!-- PK PAGE 24 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                         24
This optimization is done with L-BFGS. In this step,
the normals are decoupled, and so surface integrability is not enforced. Given this estimate of surface normals, we can compute a integrable surface Z which
approximates this normal field using least-squares:
                                  2                 2           (a) Depth map        (b) Shading
               X
                         x    nxi            y    nyi
$$
 Z ← arg min         Z ∗h − z       + Z ∗h − z
$$
          Z      i
                              ni                  ni
   These three optimization steps are repeated until
convergence (30 iterations). For the first 10 iterations,
we constrain all of the illuminations belonging to the
same object to be scaled and shifted versions of each            (c) Surface normals   (d) Reflectance    (e) images
other, but for the next 20 iterations we allow each
illumination for every image to vary freely. The result     Fig. 19. An object from our dataset. In 19(a), 19(b),
of this algorithm is an estimate of Z for each object       19(c), and 19(d) we have our “ground-truth” shape,
and an estimate of L for each RGB channel of every          shading, surface normals, and reflectance, respecimage.                                                      tively. The shading and reflectance images come from
   This photometric stereo algorithm still suffers from     the MIT Intrinsic Images dataset [4], and the shape and
Bas-Relief ambiguity[25] issues, despite the abun-          surface normals were produced by our photometric
dance of data. We therefore manually adjust each            stereo algorithm. In 19(e) we have three columns,
recovered Z over the three parameters of the Bas-           where the first contains the images from the MIT
Relief ambiguity by hand. Also, some regions of Z           Intrinsic Images dataset [4], the third contains the
are clearly incorrect due to shadows. These regions         illuminations recovered by our photometric stereo algoare manually removed (and are not included in the           rithm for each image, and the second column contains
evaluation of our error metrics which concern Z).           renderings of our ground-truth for each illumination,
After these manual tweaks to each shape, we update          which demonstrate that our recovered models are reathe set of illuminations to minimize absolute error         sonable. The second to last row of Figure 19(e) is the
once again. The two “cup” and “teabag” images did           “shading” image from the MIT dataset, and the last
not have discriminative enough shape features for           row is the “diffuse” image, which is used as input to
photometric stereo to recover reasonable second-order       our model. The illumination on the last row is therefore
spherical harmonic illuminations, so for those objects      what is referred to as the “ground-truth” illumination for
we instead recover only first-order spherical harmonic      this scene, in the rest of the paper.
illumination parameters (equivalent to point-light +
ambient illumination), and set the other coefficients
to 0.
   The MIT Intrinsic Images dataset was not acquired
with the goal of having the product of the “shading” and “reflectance” images be exactly equal to the
diffuse image, which our model (and our baseline
models) assume. That is, a lambertian rendering of
our recovered shape and illumination resembles a                   (a) Depth map        (b) Shading
scaled version of the original “shading” image. We
correct for this by adjusting the brightness of the
“shading” image such that it matches our rendering
in a least-squares sense, and we use this “corrected”
shading image in all of our experiments.
   Note that the optimization tools we use for our               (c) Surface normals   (d) Reflectance    (e) images
photometric stereo algorithm are completely disjoint
                                                            Fig. 20. Another object from our dataset, shown in the
from the optimization techniques used by algorithm
                                                            same format as Figure 19. Note that our illumination
in our paper, despite the fact that those techniques
                                                            model cannot capture the cast shadows in the input
could have been adapted to do photometric stereo.
                                                            images, which is why our renderings are shadowless.
This was done intentionally to dispel any concerns
that our results might be good simply because they
were obtained using similar techniques as our photometric stereo algorithm.
   Examples of our recovered shapes and illumina-           already contained in the MIT Intrinsic Images dataset,
tions, as well as the shading and reflectance images        can be seen in Figures 19 and 20.


<!-- PK PAGE 25 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                                  25
A PPENDIX H
S HAPE F ROM S HADING
Our model for recovering shape and albedo given a
single image and illumination can easily be reduced to
a model for doing classic shape-from-shading (recovering shape given a single image and illumination).
Our optimization problem becomes:
          minimize      λ|I − S(Z, L)| + f (Z)        (56)
              Z
Where I is the input log-image, and λ is a multiplier
that trades off the importance of the reconstruction
terms against the regularizer on Z. f (Z) and S(Z, L)
are the same as defined in the paper. Optimization
is done using our multiscale optimization algorithm.
This SFS algorithm is similar to past algorithms which
optimize over a linearized representation of a depth
map, with the primary difference being our choice of
f (Z).
   This SFS algorithm is run on the shading images
produced by the “intrinsic image” algorithms we
benchmark against. This is a very generous comparison on our part, as we are effectively giving these
other algorithms one-half of the model we present
here, and we are assuming that illumination is known.
We used our own shape-from-shading algorithm for
fairness’s sake, as it appears to outperform previous SFS algorithms. This means, however, that our
improvement over these algorithms is not as much
a reflection of the effectiveness of f (Z) in isolation,
but is instead a demonstration of the effectiveness
of optimizing over f (Z) and g(A) to jointly recover
shape and albedo, as opposed to recovering a shading
image and then recovering shape from that shading
image.
                                                             Fig. 21. Here we have a single image from the
                                                             MIT-Berkeley Intrinsic Images dataset, under three
                                                             color/illumination conditions. For each condition, we
                                                             present the ground-truth, the output of SIRFS, the
                                                             output of SIRFS+S (which uses external shape infor-
                                                             mation), and the two best-performing intrinsic image
                                                             techniques (for which we do SFS on the recovered
                                                             shading to recover shape).


<!-- PK PAGE 26 doc=math_p17 -->
IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE                                             26
Fig. 22. Here we have another image from the MITBerkeley Intrinsic Images dataset.
                                                            Fig. 23. Here we have another image from the MIT-
                                                            Berkeley Intrinsic Images dataset.
<!-- PK END doc=math_p17 -->
