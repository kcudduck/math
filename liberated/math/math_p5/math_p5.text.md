PKvNext Document

KEY: math_p5 | math |  | cbf8d576 | 13 | /papers/Cross-DomainImageMatchingwithDeepFeatureMaps.pdf
<!-- PK START doc=math_p5 -->


<!-- PK PAGE 1 doc=math_p5 -->
International Journal of Computer Vision
https://doi.org/10.1007/s11263-018-01143-3
Cross-Domain Image Matching with Deep Feature Maps
Bailey Kong1        · James Supanc̆ic̆ III1 · Deva Ramanan2 · Charless C. Fowlkes1
Received: 22 February 2018 / Accepted: 19 December 2018
© Springer Science+Business Media, LLC, part of Springer Nature 2019
Abstract
We investigate the problem of automatically determining what type of shoe left an impression found at a crime scene. This
recognition problem is made difficult by the variability in types of crime scene evidence (ranging from traces of dust or oil
on hard surfaces to impressions made in soil) and the lack of comprehensive databases of shoe outsole tread patterns. We
find that mid-level features extracted by pre-trained convolutional neural nets are surprisingly effective descriptors for this
specialized domains. However, the choice of similarity measure for matching exemplars to a query image is essential to good
performance. For matching multi-channel deep features, we propose the use of multi-channel normalized cross-correlation
and analyze its effectiveness. Our proposed metric significantly improves performance in matching crime scene shoeprints to
laboratory test impressions. We also show its effectiveness in other cross-domain image retrieval problems: matching facade
images to segmentation labels and aerial photos to map images. Finally, we introduce a discriminatively trained variant and
fine-tune our system through our proposed metric, obtaining state-of-the-art performance.
Keywords Normalized cross-correlation · Similarity metric · Cross-domain image matching
1 Introduction                                                         characteristics such as cuts or scratches which can provide
                                                                       stronger evidence that a specific shoe left a specific mark.
We investigate the problem of automatically determining                   Analysis of shoe tread impressions is made difficult by the
what type (brand/model/size) of shoe left an impression                variability in types of crime scene evidence (ranging from
found at a crime scene. In the forensic footwear examination           traces of dust or oil on hard surfaces to impressions made
literature (Bodziak 1999), this fine-grained category-level            in soil) and the lack of comprehensive datasets of shoe outrecognition problem is known as determining the class char-            sole tread patterns (see Fig. 1). Solving this problem requires
acteristics of a tread impression. This is distinct from the           developing models that can handle cross-domain matching
instance-level recognition problem of matching acquired                of tread features between photos of clean test impressions (or
                                                                       images of shoe outsoles) and photos of crime scene evidence.
                                                                       We face the additional challenge that we would like to use
Communicated by Tae-Kyun Kim, Stefanos Zafeiriou, Ben Glocker and      extracted image features for matching a given crime scene
Stefan Leutenegger.                                                    impression to a large, open-ended database of exemplar tread
                                                                       patterns.
B Bailey Kong                                                             Cross-domain image matching arises in a variety of other
    bhkong@ics.uci.edu
                                                                       application domains beyond our specific scenario of foren-
    James Supanc̆ic̆ III                                               sic shoeprint matching. For example, matching aerial photos
    jsupanci@ics.uci.edu
                                                                       to GIS map data for location discovery (Senlet et al. 2014;
    Deva Ramanan                                                       Costea and Leordeanu 2016; Divecha and Newsam 2016),
    deva@cs.cmu.edu
                                                                       image retrieval from hand drawn sketches and paintings
    Charless C. Fowlkes                                                (Chen et al. 2009; Shrivastava et al. 2011), and match-
    fowlkes@ics.uci.edu
                                                                       ing images to 3D models (Russell et al. 2011). As with
1   Department of Computer Science, University of California,          shoeprint matching, many of these applications often lack
    Irvine, CA 92617, USA                                              large datasets of ground-truth examples of cross-domain
2   Robotics Institute, Carnegie Mellon University,                    matches. This lack of training data makes it difficult to learn
    Pittsburgh, PA 15213, USA                                          cross-domain matching metrics directly from raw pixel data.
                                                                                                                           123


<!-- PK PAGE 2 doc=math_p5 -->
International Journal of Computer Vision
Fig. 1 We would like to match crime scene prints to a database of          matching performance. Here U and V are the linear projection paramtest impressions despite significant cross-domain differences in appear-   eters for laboratory test impression and crime scene photo domains
ance. We utilize a Siamese network to perform matching using a             respectively. W is the per-channel importance weights. And x and y are
multi-channel normalized cross-correlation. We find that per-exemplar,     the projected features of each domain used for matching
per-channel normalization of CNN feature maps significantly improves
Instead traditional approaches have focused on designing                   2 Related Work
feature extractors for each domain which yield domain invariant descriptions (e.g., locations of edges) which can then be              Shoeprint Recognition The widespread success of autodirectly compared.                                                         matic fingerprint identification systems (AFIS) (Lee et al.
    Deep convolutional neural net (CNN) features hierarchies               2001) has inspired many attempts to similarly automate
have proven incredibly effective at a wide range of recog-                 shoeprint recognition. Much initial work in this area focused
nition tasks. Generic feature extractors trained for general-              on developing feature sets that are rotation and translation
purpose image categorization often perform surprising well                 invariant. Examples include, phase only correlation (Guefor novel categorization tasks without performing any fine-                ham et al. 2008), edge histogram DFT magnitudes (Zhang
tuning beyond training a linear classifier (Sharif Razavian                and Allinson 2005), power spectral densities (De Chazal et al.
et al. 2014). This is often explained by appealing to the notion           2005; Dardi et al. 2009), and the Fourier–Mellin transform
that these learned representations extract image features with             (Gueham et al. 2008). Some other approaches pre-align the
invariances that are, in some sense, generic. We might hope                query and database image using the Radon transform (Patil
that these same invariances would prove useful in our setting              and Kulkarni 2009) while still others sidestep global align-
(e.g., encoding the shape of a tread element in a way that                 ment entirely by computing only relative features between
is insensitive to shading, contrast reversals, etc.). However,             keypoints pairs (Tang et al. 2010; Pavlou and Allinson 2006).
our problem differs in that we need to formulate a cross-                  Finally, alignment can be implicitly computed by matching
domain similarity metric rather than simply training a k-way               rotationally invariant keypoint descriptors between the query
classifier.                                                                and database images (Pavlou and Allinson 2006; Wei and
    Building on our previous work (Kong et al. 2017), we                   Gwo 2014). The recent study of Richetelli et al. (2017) carries
tackle this problem using similarity measures that are derived             out a comprehensive evaluation of many of these approaches
from normalized cross-correlation (NCC), a classic approach                in a variety of scenarios using a carefully constructed dataset
for matching gray-scale templates. For CNN feature maps,                   of crime scene-like impressions. In contrast to these previous
it is necessary to extend this to handle multiple channels.                works, we handle global invariance by explicitly matching
Our contribution is to propose a multi-channel variant of                  templates using dense search over translations and rotations.
NCC which performs normalization on a per-channel basis
(rather than, e.g., per-feature volume). We find this performs             One-Shot Learning While we must match our crime scene
substantially better than related similarity measures such as              evidence against a large database of candidate shoes, our
the widely used cosine distance. We explain this finding in                database contains very few examples per-class. As such, we
terms of the statistics of CNN feature maps. Finally, we use               must learn to recognize each shoe category with as little
this multi-channel NCC as a building block for a Siamese                   as one training example. This can be framed as a one-shot
network model which can be trained end-to-end to optimize                  learning problem (Li et al. 2006). Prior work has explored
matching performance.                                                      one-shot object recognition with only a single training exam-
                                                                           ple, or “exemplar” (Malisiewicz et al. 2011). Specifically in
123


<!-- PK PAGE 3 doc=math_p5 -->
International Journal of Computer Vision
the domain of shoeprints, Kortylewski and Vetter (2016) fit      is the standardized version of x (similarly for y) and
a compositional active basis model to an exemplar which
$$
could then be evaluated against other images. Alternatively,     μx = E[x]
$$
standardized or whitened off-the-shelf HOG features have
$$
                                                                 σx x = E[(x − μx )2 ]
$$
proven very effective for exemplar recognition (Hariharan
$$
et al. 2012). Our approach is similar in that we examine the     σx y = E[(x − μx )(y − μ y )]
$$
performance of one-shot recognition using generic deep features which have proven surprisingly robust for a huge range     Intuitively, the above corresponds to the correlation between
of recognition tasks (Sharif Razavian et al. 2014).              two transformed random variables that are “whitened” to
                                                                 have zero-mean and unit variance. The normalization ensures
Similarity Metric Learning While off-the-shelf deep features     that correlation coefficient will lie between − 1 and + 1.
work well (Sharif Razavian et al. 2014), they can be often be
fine-tuned to improve performance on specific tasks. In par-     Normalized Cross-Correlation Let us model pixels x from
ticular, for a paired comparison tasks, so-called “Siamese”      an image patch X as corrupted by some i.i.d. noise process
architectures integrate feature extraction and comparison in     and similarly pixels another patch Y (of identical size) as y.
a single differentiable model that can be optimized end-to-      The sample estimate of the Pearson’s coefficient for variables
end. Past work has demonstrated that Siamese networks learn      x, y is equivalent to the normalized cross-correlation (NCC)
good features for person re-identification, face recognition,    between patches X , Y :
and stereo matching (Zbontar and LeCun 2015; Parkhi et al.
2015; Xiao et al. 2016); deep pseudo-Siamese architectures                          1  (x[i] − μx ) (y[i] − μ y )
$$
can even learn to embed two dissimilar domains into a com-       NCC(X , Y ) =             √            √                     (2)
$$
                                                                                   |P|       σx x          σ yy
$$
mon co-domain (Zagoruyko and Komodakis 2015). For shoe                                i∈P
$$
class recognition, we similarly learn to embed two types of
images: (1) crime scene photos and (2) laboratory test impres-   where P refers to the set of pixel positions in a patch and
sions.                                                           means and standard deviations are replaced by their sample
                                                                 estimates.
                                                                    From the perspective of detection theory, normalization
                                                                 is motivated by the need to compare correlation coefficients
3 Multivariate Cross-Correlation                                 across different pairs of samples with non-stationary statistics
                                                                 (e.g., determining which patches {Y 1 , Y 2 , . . .} are the same
In order to compare two corresponding image patches,
                                                                 as a given template patch X where statistics vary from one Y
we extend the approach of normalized cross-correlation
                                                                 to the next). Estimating first and second-order statistics per-
(often used for matching gray-scale images) to work with
                                                                 patch provides a convenient way to handle sources of “noise”
multi-channel CNN features. Interestingly, there is not an
                                                                 that are approximately i.i.d. conditioned on the choice of
immediately obvious extension of NCC to multiple channels,
                                                                 patch P but not independent of patch location.
as evidenced by multiple approaches proposed in the literature (Fisher and Oliver 1995; Martin and Maes 1979; Geiss
et al. 1991; Popper Shaffer and Gillo 1974). To motivate our     Multivariate Extension Let us extend the above formulation
$$
approach, we appeal to a statistical perspective.                for random vectors x, y ∈ R N where N corresponds to the
$$
$$
                                                                 multiple channels of values at each pixel (e.g., N = 3 for
$$
                                                                 a RGB image). The scalar correlation is now replaced by a
Normalized Correlation Let x, y be two scalar random
$$
                                                                 N × N correlation matrix. To produce a final score capturing
$$
variables. A standard measure of correlation between two
                                                                 the overall correlation, we propose to use the trace of this
variables is given by their Pearson’s correlation coefficient
                                                                 matrix, which is equivalent to the sum of its eigenvalues.
(Martin and Maes 1979):
                                                                 As before, we add invariance by computing correlations on
                       σx y                                      transformed variables x̃, ỹ that are “whitened” to have a zero-
$$
ρ(x, y) = E[x̃ ỹ] = √ √                                  (1)    mean and identity covariance matrix:
$$
                      σx x σ yy
                                                                              1
$$
where                                                            ρmulti (x, y) =T r (E[ x̃ ỹ T ])
$$
                                                                              N                        
     x − μx                                                                   1          − 21      − 21
$$
x̃ = √                                                                       = T r Σxx Σxy Σyy                                (3)
$$
        σx x                                                                  N
                                                                                                                       123


<!-- PK PAGE 4 doc=math_p5 -->
International Journal of Computer Vision
where:                                                              Cross-Domain Covariates and Whitening Assuming a
                                                                    diagonal covariance makes strong assumptions about cross-
         −1                                                         channel correlations. When strong cross-correlations exist,
$$
x̃ = Σxx 2 (x − μx ),
$$
                                                                    an alternative approach to reducing computational complex-
$$
Σxx = E[(x − μx )(x − μx )T ],
$$
                                                                    ity is to assume that cross-channel correlations lie within a
$$
Σxy = E[(x − μx )(y − μy )T ].                                      K dimensional subspace, where K ≤ N . We can learn a
$$
                                                                    projection matrix for reducing the dimensionality of features
The above multivariate generalization of the Pearson’s coef-        from both patch X and Y which decorrelates and scales the
ficient is arguably rather natural, and indeed, is similar to       channels to have unit variance:
previous formulations that also make use of a trace operator
$$
on a correlation matrix (Martin and Maes 1979; Popper Shaf-         x̂ = U (x − μx ), U ∈ R K ×N ,      E[ x̂ x̂ T ] = I
$$
fer and Gillo 1974). However, one crucial distinction from
$$
                                                                    ŷ = V (y − μ y ), V ∈ R K ×N ,     E[ ŷ ŷ T ] = I
$$
such past work is that our generalization (3) reduces to (1)
$$
for N = 1. In particular, Martin and Maes (1979) and Pop-           In general, the projection matrix could be different for difper Shaffer and Gillo (1974) propose multivariate extensions        ferent domains (in our case, crime scene versus test prints).
$$
that are restricted to return a nonnegative coefficient. It is      One strategy for learning the projection matrices is applystraightforward to show that our multivariate coefficient will      ing principle component analysis (PCA) on samples from
lie between −1 and +1.                                              each domain separately. Alternatively, when paired training
                                                                    examples are available, one could use canonical correlation
Decorrelated Channel Statistics The above formulation can           analysis (CCA) (Mardia et al. 1980), which jointly learn the
be computationally cumbersome for large N , since it requires       projections that maximize correlation across domains. An
obtaining sample estimates of matrices of size N 2 . Suppose        added benefit of using orthogonalizing transformations such
we make the strong assumption that all N channels are uncor-        as PCA/CCA is that transformed data satisfies the diagonal
related with each other. This greatly simplifies the above          assumptions (globally) allowing us to estimate patch multiexpression, since the covariance matrices are then diagonal         variate correlations in this projected space with diagonalized
$$
matrices:                                                           covariance matrices of size K × K .
$$
$$
Σxy = diag({σxc yc })                                               Global Versus Local Whitening There are two distinct
$$
                                                                    aspects to whitening (or normalizing) variables in our prob-
$$
Σxx = diag({σxc xc })
$$
                                                                    lem setup to be determined: (1) assumptions on the structure
$$
Σyy = diag({σ yc yc })                                              of the sample mean and covariance matrix, and (2) the data
$$
                                                                    over which the sample mean and covariance are estimated.
Plugging this assumption into (3) yields the simplified             In choosing the structure, one could enforce an unrestricted
expression for multivariate correlation                             covariance matrix, a low-rank covariance matrix (e.g., PCA),
                                                                    or a diagonal covariance matrix (e.g., estimating scalar means
                  1 
                     N
                          σxc yc                                    and variances). In choosing the data, one could estimate these
$$
ρmulti (x, y) =       √       √                              (4)
$$
                  N     σxc xc σ yc yc                              parameters over individual patches (local whitening) or over
                    c=1
                                                                    the entire dataset (global whitening). In Sect. 5, we empiriwhere the diagonal multivariate statistic is simply the average     cally explore various combinations of these design choices
of N per-channel correlation coefficients. It is easy to see that   which are computationally feasible (e.g., estimating a fullthis sum must lie between −1 and +1.                                rank covariance matrix locally for each patch would be too
                                                                    expensive). We find a good tradeoff to be global whitening (to
                                                                    decorrelate features globally), followed by local whitening
Multi-channel NCC The sample estimate of (4) yields a
                                                                    with a diagonal covariance assumption (e.g., MCNCC).
multi-channel extension of NCC which is adapted to the
                                                                       To understand the value of global and per-patch normalpatch:
                                                                    ization, we examine the statistics of CNN feature channels
                                                                    across samples of our dataset. Figures 2 and 3 illustrate how
                        1   (xc [i]−μxc ) (yc [i]−μ yc )
                             N
$$
MCNCC(X , Y ) =                 √             √                     the per-channel normalizing statistics (μc , σc ) vary across
$$
                      N |P|         σxc xc        σ yc yc           patches and across channels. Notably, for some channels,
$$
                            c=1 i∈P
$$
                                                                    the normalizing statistics change substantially from patch to
The above multi-channel extension is similar to the final for-      patch. This makes the results of performing local, per-patch
mulation in Fisher and Oliver (1995), but is derived from a         normalization significantly different from global, per-dataset
statistical assumption on the channel correlation.                  normalization.
123


<!-- PK PAGE 5 doc=math_p5 -->
International Journal of Computer Vision
                                                                             MCNCCW (X , Y )
                                                                                                                                                    
                                                                                              
                                                                                              N
                                                                                                              1  (xc [i] − μxc ) (yc [i] − μ yc )
$$
                                                                                          =         Wc                √               √
$$
                                                                                                             |P|        σxc xc          σ yc yc
$$
                                                                                              c=1                i∈P
$$
                                                                                                                                                 (5)
                                                                             This per-channel weighting can undo the effect of scaling
                                                                             by the standard deviation in order to re-weight channels
                                                                             by their informativeness. Furthermore, since the features
Fig. 2 Distribution of patch channel means For each query image
                                                                             x, y are themselves produced by a CNN model, we can
(patch) we match against the database, our proposed MCNCC similarity measure normalizes ResNet-50 ‘res2x’ feature channels by their        consider the parameters of that model as additional canindividual mean and standard deviation. For uniformly sampled patches,       didates for optimization. In this view, PCA/CCA can be
we denote the normalizing mean for channel c using the random vari-          seen as adding an extra linear network layer prior to the
able μc . For each channel, we plot the standard deviation of μc above
                                                                             correlation calculation. The parameters of such a layer can
with channels sorted by increasing standard deviation. When the mean
response for a channel varies little from one patch to the next (small       be initialized using PCA/CCA and then discriminatively
std, left), we can expect that a global, per-dataset transformation (e.g.,   tuned. The resulting “Siamese” architecture is illustrated in
PCA or CCA whitening) is sufficient to normalize the channel response.       Fig. 1.
However, for channels where individual patches in the dataset have very
different channel means (large std, right), normalizing by the local (perpatch) statistics provides additional invariance                             Siamese Loss To train the model, we minimize a hinge-loss:
                                                                                           α          β                
                                                                             arg min         W 22 +   U 2F + V 2F
                                                                             W ,U ,V ,b    2          2
                                                                                    
                                                                                +         max 0, 1 − z s,t MCNCCW (φU (X s ), φV (Y t )) + b
                                                                                    s,t
                                                                                                                                                 (6)
Fig. 3 Normalizing channel statistics As shown in the histograms of
Fig. 2, for some feature channels, patches have wildly different means       where we have made explicit the function φ which comand standard deviations. For channel 14 (left), the statistics (and hence    putes the deep features of two shoeprints X s and Y t , with W ,
normalization) are similar from one patch to the next while for channel      U , and V representing the parameters for the per-channel
256 (right), means and standard deviations vary substantially across
patches. CNN channel activations are positive so means and standard
                                                                             importance weighting and the linear projections for the two
deviations are strongly correlated                                           domains respectively. b is the bias and z s,t is a binary
                                                                             same-source label (i.e., +1 when X s and Y t come from
                                                                             the same source and −1 otherwise). Finally, α is the reg-
    One common effect of both global and local whitening                     ularization hyperparameter for W and β is the same for U
is to prevent feature channels that tend to have large means                 and V .
and variances from dominating the correlation score. How-                        We implement φ using a deep architecture, which is
ever, by the same merit this can have the undesirable effect                 trainable using standard backpropagation. Each channel conof amplifying the influence of low-variance channels which                   tributes a term to the MCNCC which itself is just a single
may not be discriminative for matching. In the next section                  channel (NCC) term. The operation is symmetric in X and
we generalize both PCA and CCA using a learning frame-                       Y , and the gradient can be computed efficiently by reusing
work which can learn channel decorrelation and per-channel                   the NCC computation from the forward pass:
importance weighting by optimizing a discriminative performance objective.                                                             d NCC(xc , yc )       1
$$
                                                                                             =    √       ( ỹc [ j] + x̃c [ j]NCC(xc , yc ))
$$
                                                                                d xc [ j]      |P| σxc xc
                                                                                                                                            (7)
4 Learning Correlation Similarity Measures
                                                                             Derivation of NCC Gradient To derive the NCC gradient, we
In order to allow for additional flexibility of weighting the                first expand it as a sum over individual pixels indexed by i
relevance of each channel we consider a channel-weighted                     and consider the total derivative with respect to input feature
variant of MCNCC parameterized by vector W :                                 x[ j]
                                                                                                                                          123


<!-- PK PAGE 6 doc=math_p5 -->
International Journal of Computer Vision
d NCC(x, y)                                                            matching, but focus on a single modality of test impressions.
   d x[ j]
$$
                                                                     We extract 512 query patches (random selected 97 × 97 pixel
$$
$$
         1          ∂ x̃[i] ∂ x̃[i] ∂μx   ∂ x̃[i] ∂σx x               sub-windows) from test impressions that have two or more
$$
$$
    =        ỹ[i]          +            +
$$
$$
       |P|           ∂ x[ j] ∂μx ∂ x[ j] ∂σx x ∂ x[ j]                 matching tread patterns in the database. The task is then
$$
            i∈P
                                                                 (8)   to retrieve from the database the set of relevant prints. As
                                                                       the query patches are smaller than the test impressions, we
where we have have dropped the channel subscript for clarity.          search over spatial translations (with a stride of 1), using the
$$
The partial derivative ∂∂x[
$$
                         x̃[i]
$$
                            j] = σx x , if and only if i = j and
$$
$$
                                √1                                     maximizing correlation value to score the match to the test
$$
                                                                       impression. We do not need to search over rotations as all test
is zero otherwise. The remaining partials derive as follows:
                                                                       impressions were aligned to a canonical orientation. When
$$
∂ x̃[i]        1                      ∂μx       1                      querying the database, the original shoeprint the query was
$$
$$
        = −√                                 =
$$
$$
∂μx           σx x                   ∂ x[ j]   |P|                     extracted from is removed (i.e., the results do not include the
$$
$$
∂ x̃[i]     1                        ∂σx x     2 (x[ j] − μx )         self-match).
$$
$$
        =        (x[i] − μx )                =                            We carry out these experiments using a dataset that con-
$$
$$
∂σx x       3/2
$$
$$
          2σx x                      ∂ x[ j]         |P|
$$
                                                                       tains 387 test impression of shoes and 137 crime scene
Substituting them into Eq. 8, we arrive at a final expression:         prints collected by the Israel National Police (Yekutieli et al.
                                                                       2012). As this dataset is not publicly available, we used this
d NCC(x, y)                                                            dataset primarily for the diagnostic analysis and for training
   d x[ j]                                                             and validating learned models. In these diagnostic experi-
        ỹ[ j]    1                                                   ments, except where noted otherwise, we use the 256-channel
$$
  =      √     +      ỹ[i]
$$
     |P| σx x    |P|                                                   ‘res2bx’ activations from a pre-trained ResNet-50 model.1
                        i∈P
                                                                       We evaluated feature maps at other locations along the net-
           −1       2 (x[i] − μx ) (x[ j] − μx )                       work, but found those to performed the best.
$$
    ×       √     +
$$
         |P| σx x                   3/2
                             2|P|σx x
         1                                                             Global Versus Local Normalization Figure 4 shows retrieval
$$
  =      √
$$
      |P| σx x                                                         performance in terms of the tradeoff of precision and recall at
                                                                     different match thresholds. In the legend we denote different
               1            (x[i]−μx ) (x[ j]−μx )
$$
    × ỹ[ j]+      ỹ[i] −1+                                           schemes in square brackets, where the first term indicates
$$
              |P|                    σx x
$$
                     i∈P                                               the centering operation and the second term indicates the
$$
         1                   1          1                            normalization operation. A · indicates the absence of the
$$
  =      √        ỹ[ j]−        ỹ[i]+      ỹ[i]x̃[i]x̃[ j]          operation. μ and σ indicate that standardization was per-
$$
      |P| σx x              |P|         |P|
$$
                               i∈P            i∈P                      formed using local (i.e., per-exemplar) statistics of features
$$
       1                                                               over the entire (3D) feature map. μc and σc indicate local
$$
  =    √     ( ỹ[ j] + x̃[ j]NCC(x, y))                         (9)
$$
    |P| σx x                                                           per-channel centering and normalization. μ̄c and σ̄c indicate
                                                                       global per-channel centering and normalization (i.e., statiswhere we have made use of the fact that ỹ is zero-mean.               tics are estimated over the whole dataset). Therefore, simple
                                                                       unnormalized cross-correlation is indicated as [·, ·], cosine
                                                                       distance is indicated as [μ, σ ], and our proposed MCNCC
5 Diagnostic Experiments                                               measure is indicated as [μc , σc ].
                                                                          We can clearly see from the left panel of Fig. 4 that using
To understand the effects of feature channel normalization on          per-channel statistics estimated independently for each comretrieval performance, we compare the proposed MCNCC                   parison gives substantial gains over the baseline methods.
measure to two baseline approaches: simple unnormalized                Centering using 3D (across-channel) statistics is better than
cross-correlation and cross-correlation normalized by a sin-           either centering using global statistics or just straight correlagle μ and σ estimated over the whole 3D feature volume. We             tion. But cosine distance (which adds the scaling operation)
note that the latter is closely related to the “cosine similarity”     decreases performance substantially for the low recall region.
which is popular in many retrieval applications (cosine simi-          In general, removing the mean response is far more imporlarity scales by σ but does not subtract μ). We also consider          tant than scaling by the standard deviation. Interestingly, in
variants which only perform partial standardization and/or             the case of cosine distance and global channel normalization,
whitening of the input features.                                       scaling by the standard deviation actually hurts performance
Partial Print Matching We evaluate these methods in a setup            1 Pretrained model was obtained from http://www.vlfeat.org/matconv
that mimics the occurrence of partial occlusions in shoeprint          net/models/imagenet-resnet-50-dag.mat.
123


<!-- PK PAGE 7 doc=math_p5 -->
International Journal of Computer Vision
Fig. 4 Comparing MCNCC to baselines for image retrieval within the          as [·, ·]). Finally, μ̄c and σ̄c denote computing the average per-channel
same domain. The methods are denoted by two operations in square            statistics across the dataset. The left panel shows the performance on the
brackets: centering and normalization, respectively. μ and σ denote         raw features, whereas the right panel compares globally whitened feacomputing the statistics across all channels, μc and σc denote computing    tures using PCA (solid lines) against their corresponding raw features
per-channel statistics, and · denotes the absence of the operation (e.g.,   (dotted lines) (Best viewed in color) (Color figure online)
MCNCC is denoted as [μc , σc ], whereas cross-correlation is denoted
(i.e., [μ, σ ] versus [μ, ·] and [μ̄c , σ̄c ] versus [μ̄c , ·] respec-          As shown in Table 1, we see a similar pattern to what we
tively). As normalization re-weights channels, we posit that                observed with ResNet-50’s ‘res2bx’ features. Namely, that
this may be negatively effecting the scores by down-weighing                straight cross-correlation (denoted as [·, ·]) performs poorly,
important signals or boosting noisy signals.                                while MCNCC (denoted as [μc , σc ]) performs the best. One
                                                                            significant departure from the previous results for ‘res2bx’
                                                                            features is how models using entire feature volume statistics
Channel Decorrelation Recall that, for efficiency reasons,
                                                                            perform. Centering using 3D statistics (denoted as [μ, ·])
our multivariate estimate of correlation assumes that chan-
                                                                            yields performance that is closer to straight correlation, on
nels are largely decorrelated. We also explored decorrelating
                                                                            the other hand, standardizing using 3D statistics (denoted as
the channels globally using a full-dimension PCA (which
                                                                            [μ, σ ]) yields performance that is closer to MCNCC when
also subtracts out the global mean μ̄c ). The right panel of
                                                                            using GoogLeNet’s ‘conv2x’ and DeepVGG-16’s ‘x12’ feaFig. 4 shows a comparison of these decorrelated feature
                                                                            tures.
channels (solid curves) relative to baseline ResNet channels
                                                                                When we look at the difference between the per-channel
(dotted curves). While the decorrelated features outperform
                                                                            and the across-channel (3D) statistics for query patches, we
baseline correlation (due to the mean subtraction) we found
                                                                            observe significant difference in sparsity of μc compared
that full MCNCC on the raw features performed better than
                                                                            to μ: ‘conv2x’ is about 2x more sparse than ‘x12,’ which
on globally decorrelated features. This may be explained in
                                                                            itself is about 2x more sparse than ‘res2bx.’ The level of
part due to the fact that decorrelated features show an even
                                                                            sparsity correlates with the performance of [μ, ·] compared to
wider range of variation across different channels which may
                                                                            straight correlation across the different features. The features
exacerbate some of the negative effects of scaling by σc .
                                                                            where μc is more sparse, using μ overshifts across more
                                                                            channels leading to less performance gain relative to straight
Other Feature Extractors To see if this behavior was spe-                   correlation. When we look at the difference between σ and
cific to the ResNet-50 model, we evaluate on three additional               σc , we observe that σ is on average larger than σc . This means
features: raw pixels, GoogLeNet, and DeepVGG-16. From
the GoogLeNet model2 we used the 192-channel ‘conv2x’
activations, and from the DeepVGG-16 model3 we used                         Table 1 Ablation study on the two normalized cross-correlation
                                                                            schemes across different features
the 256-channel ‘x12’ activations. We chose these partic-
                                                                            Features                  [·, ·]   [μ, ·]   [μ, σ ]   [μc , ·]   [μc , σc ]
ular CNN feature maps because they had the same or similar
spatial resolution as ‘res2bx’ and were the immediate output                Raw Pixels                0.04     0.20     0.45      –          –
of a rectified linear unit layer.                                           ResNet-50 (res2bx)        0.15     0.44     0.32      0.55       0.77
                                                                            GoogLeNet (conv2x)        0.07     0.09     0.68      0.61       0.81
2 Pretrained model was obtained from http://www.vlfeat.org/matconv          DeepVGG-16 (x20)          0.09     0.31     0.73      0.51       0.76
net/models/imagenet-googlenet-dag.mat.                                      We measure performance using mean average precision, higher is better.
3 Pretrained model was obtained from http://www.vlfeat.org/matconv          As the images are gray-scale single-channel images, for raw pixels [μ, ·]
net/models/imagenet-vgg-verydeep-16.mat.                                    and [μ, σ ] are identical to [μc , ·] and [μc , σc ], respectively
                                                                                                                                         123


<!-- PK PAGE 8 doc=math_p5 -->
International Journal of Computer Vision
that compared to σc , using σ dampens the effect of noisy           CCA [μc , σc · Wc ]. Our final model, CCA [μc , σc · Wc ] ft,
channels rather than boosting them. Looking at the change           jointly fine-tunes the linear projections and the per-channel
of performance from [μ, ·] to [μ, σ ] for different features, we    weights together. The model with learned per-channel imporsimilarly see improvement roughly correlates to how much            tance weights has 257 parameters (a scalar for each channel
larger σ is than σc .                                               and a single bias term), and was learned using a support vector
$$
                                                                    machine solver with a regularization value of α = 100. The
$$
                                                                    linear projections (CCA) were learned using canoncorr,
6 Cross-Domain Matching Experiments                                 MATLAB’s canonical correlation analysis function. Our
$$
                                                                    final model, CCA [μc , σc · Wc ] ft, was fine-tuned using graIn this section, we evaluate our proposed system in settings        dient descent with an L2 regularization value of α = 100 on
$$
$$
that closely resembles various real-world scenarios where           the per-channel importance weights and β = 1 on the linear
$$
$$
query images are matched to a database containing images            projections. This full model has 131K parameters (2 × 2562
$$
from a different domain than that of the query. We focus            projections, 256 channel importance, and 1 bias).
primarily on matching crime scene prints to a collection of             As seen in the left panel of Fig. 5, learning per-channel
test impressions, but also demonstrate the effectiveness of         importance weights, [μc , σc ·Wc ], yields substantial improveMCNCC on two other cross-domain applications: semantic              ments, outperforming [μc , σc ] and CCA [μc , σc ] when recall
segmentation label retrieval from building facade images,           is less than 0.34. When learning both importance weights and
and map retrieval from aerial photos.4 As in our diagnostic         linear projections, we see gains across all recall values as our
experiments, we use the same pre-trained ResNet-50 model.           Siamese network significantly outperforms all other models.
We use the 256-channel ‘res2bx’ activations for the shoeprint       However, we observe only marginal gains when fine-tuning
and building facade data, but found that the 1024-channel           the whole model. We expect this is due in part to the small
‘res4cx’ activations performed better for the map retrieval         amount of training data which makes it difficult to optimize
task.                                                               parameters without overfitting.
                                                                        We subsequently tested these same models (without any
6.1 Shoeprint Retrieval                                             retraining) on the FID-300 benchmark (shown in the right
                                                                    panel of Fig. 5). In this, and in later experiments, we use
In addition to the internal dataset described in Sect. 5, we also   cumulative match characteristic (CMC) which plots the perevaluated our approach on a publicly available benchmark,           centage of correct matches (recall) as a function of the
the footwear identification dataset (FID-300) (Kortylewski          number of database items reviewed. This is more suitable
et al. 2014). FID-300 contains 1175 test impressions and 300        for performance evaluation than other information retrieval
crime scene prints. The task here is similar to the diagnos-        metrics such as precision-recall or precision-at-k since there
tic experiments on patches, but now matching whole prints           is only a single correct matching database item for each query.
across domains. As the crime scene prints are not aligned to a      CMC is easily interpreted in terms of the actually use-case
canonical orientation, we search over both translations (with       scenario (i.e., how much effort a forensic investigator must
a stride of 2) and rotations (from − 20◦ to + 20◦ with a stride     expend in verifying putative matches to achieve a given level
of 4◦ ). For a given alignment, we compute the valid support        of recall).
region P where the two images overlap. The local statistics             On FID-300, we observe the same trend as on the
and correlation is only computed within this region.                Israeli dataset—models with more learned parameters per-
    As mentioned in Sect. 4, we can learn both the linear           form better. However, even without learning (i.e., [μc , σc ])
projections of the features and the importance of each chan-        MCNCC significantly outperforms using off-the-shelf CNN
nel for the retrieval task. We demonstrate that such learning       features the previously published state-of-the-art approaches
is feasible and can significantly improve performance. We           (Kortylewski et al. 2014; Kortylewski and Vetter 2016;
use a 50/50 split of the crime scene prints of the Israeli          Kortylewski 2017). The percentage of correct matches at topdataset for training and testing, and determine hyperparam-         1% and top-5% of the database image reviewed for ACCV
eters settings using tenfold cross-validation. In the left panel    are 14.67 and 30.67, for BMVC16 are 21.67 and 47.00, for
of Fig. 5 we compare the performance of three different             LoG16 are 59.67 and 73.33, for [μc , σc ] are 72.67 and 82.33,
models with varying degrees of learning. The model with             and for CCA [μc , σc ] ft are 79.67 and 86.33. In Fig. 6, we
no learning is denoted as [μc , σc ], with learned per-channel      visualize the top-10 retrieved test impressions for a subset of
weights is denoted as [μc , σc · Wc ], with learned projections     crime scene query prints from FID-300. These results correis denoted as CCA [μc , σc ], and with piece-wise learned           spond to the CMC curves for [μc , σc ] and CCA [μc , σc · Wc ]
linear projections and per-channel weights is denoted as            of the right panel of Fig. 5.
4 Our code is available at http://github.com/bkong/MCNCC.
123


<!-- PK PAGE 9 doc=math_p5 -->
International Journal of Computer Vision
Fig. 5 Comparing MCNCC with uniform weights (denoted as                     sions for crime scene prints. The left panel shows our five methods on
[μc , σc ]), learned per-channel weights (denoted as [μc , σc · Wc ]),      the Israeli dataset. The right panel compares variants of our proposed
learned linear projections (denoted as CCA [μc , σc ]), piece-wise          system against the current state-of-the-art, as published in: ACCV14
learned projection and per-channel weights (denoted as CCA [μc , σc ·       (Kortylewski et al. 2014), BMVC16 (Kortylewski and Vetter 2016)
Wc ]), and jointly learned projection and per-channel weights (denoted      and LoG16 (Kortylewski 2017) using cumulative match characteristic
as CCA [μc , σc · Wc ] ft) for retrieving relevant shoeprint test impres-   (CMC) (Color figure online)
Fig. 6 FID-300 retrieval results. The left column shows the query crime scene prints, the middle column shows the top-8 results for [μc , σc ], and
the right column shows the top-8 results for CCA [μc , σc · Wc ]. Green boxes indicate the corresponding ground truth test impression (Color figure
online)
Partial Occlusion To analyze the effect of partial occlusion                the exception of “full size” prints. While “full size” query
on matching accuracy, we split the set of crime scene query                 prints might be expected to include more relevant features for
prints into subsets with varying amounts of occlusion. For                  matching, we have observed that in the benchmark dataset
this we use the proxy of pixel area of the cropped crime                    they are often corrupted by additional “noise” in the form of
scene print compared to its corresponding test impression.                  smearing or distortion of the print and marks left by overlapThe prints were then grouped into 4 categories with roughly                 ping impressions.
equal numbers of examples: “Full size” prints are those
whose pixel-area ratios fall between [0.875, 1], “3/4 size”                 Background Clutter We also examined how performance
between [0.625, 0.875), “half size” between [0.375, 0.625),                 was affected by the amount of irrelevant background clutter
and “1/4 size” between [0, 0.375). In Table 2 we compare                    in the crime scene print. We use the ratio of the pixel area
the performance of models [μc , σc ], CCA [μc , σc ], and CCA               of the cropped crime scene print over the pixel area of the
[μc , σc · Wc ]. As expected, the correct match rate gener-                 original crime scene print as a proxy for the amount of releally increases for all models as the pixel area ratio increases             vant information in a print. Prints with a ratio closer to zero
and more discriminative tread features are available, with                  contain a lot of background, while prints with a ratio closer
                                                                                                                                       123


<!-- PK PAGE 10 doc=math_p5 -->
International Journal of Computer Vision
Table 2 Occlusion study on
                                           Print size                              All prints     Full size      3/4 size      Half size       1/4 size
FID-300
                                           (# prints)                              (300)          (88)           (78)          (71)            (63)
                                           Top-1%         [μc , σc ]               72.7           78.4           82.1          71.8            53.0
                                                          CCA [μc , σc ]           76.8           83.0           85.9          73.2            60.3
                                                          CCA [μc , σc · Wc ]      79.0           84.1           85.9          78.9            63.5
                                           Top-10%        [μc , σc ]               87.7           87.5           92.3          85.9            84.1
                                                          CCA [μc , σc ]           88.7           93.2           91.0          87.3            81.0
                                                          CCA [μc , σc · Wc ]      89.3           93.2           91.0          91.6            79.4
                                           The crime scene query prints are binned by looking at the ratio of query pixel area to the pixel area of the
                                           corresponding ground-truth test impression. Performance is measured as the percentage of correct matches
                                           retrieved (higher is better)
                                  [·, ·]                 [μc , σc ]                                           [·, ·]                  [μc , σc ]
Fig. 7 Visualizing image regions that have the greatest influence on            and the image regions of the pair that have greatest influence on pospositive correlation between image pairs. Each group of images shows,           itive MCNCC. Each row shows the same crime scene query aligned
from left to right, the original crime scene print and test impression being    with a true matching impression (left) and with a non-matching test
compared, the image regions of the pair that have the greatest influ-           impression (right)
ence on positive correlation score when using raw cross-correlation,
to one contain little irrelevant information. We selected 257                   would likely be willing to mark valid regions of query image,
$$
query prints with a large amount of background (ratio ≤ 0.5).                   limiting the effect of background clutter.
$$
    When performing matching over these whole images we
found that the percentage of correct top-1% matches dropped                     Visualizing Image Characteristics Relevant to Positive Corfrom 72.4 to 15.2% and top-10% dropped from 88.3 to                             relations To get an intuitive understanding of what image
33.5%. This drop in performance is not surprising given that                    features are utilized by MCNCC, we visualize what image
our matching approach aims to answer the question of what                       regions have a large influence the positive correlation
print is present, rather than detecting where a print appears in                between paired crime scene prints and test impressions. For
an image and was not trained to reject background matches.                      a pair of images, we backpropagate gradients to the image
We note that in practical investigative applications, the quan-                 from each spatial bin in the feature map which has a positity of footwear evidence is limited and a forensic examiner                    tive normalized correlation. We then produce a mask in the
                                                                                image domain marking pixels whose gradient magnitudes
123


<!-- PK PAGE 11 doc=math_p5 -->
International Journal of Computer Vision
Fig. 8 Segmentation retrieval for building facades. The left panel            (denoted as [μ, σ ]). The right panel shows example retrieval results for
compares MCNCC with learned linear projections and per-channel                CCA [μc , σc · Wc ]. The left column shows the query facade image.
importance weights (denoted as CCA [μc , σc · Wc ]) and MCNCC with            Green boxes indicate the corresponding ground truth segmentation label
no learning (denoted as [μc , σc ]) to other baseline metrics: Cosine simi-   (Color figure online)
larity, Euclidean distance, and NCC using across-channel local statistics
are in the top 20th percentile. Figure 7 compares this posi-                  tance, and normalized cross-correlation using across-channel
tive relevance map for regular correlation (inner product of                  local statistics (denoted as [μ, σ ]). We can see in the left panel
the raw features) and normalized correlation (inner product                   of Fig. 8 that MCNCC performs significantly better than the
of the standardized features). We can see that with normal-                   baselines. MCNCC returns the true matching label map as
ized correlation, the image regions selected are similar for                  the top scoring match in 39.2% of queries. In corresponding
both images despite the domain shift between the query and                    top match accuracy for normalized cross-correlation using
match. In contrast, the visualization for regular correlation                 across-channel local statistics is 25.2%, for Cosine similarity
shows much less coherence across the pair of images and                       is 18.3%, and for Euclidean distance is 6.0%. When learning
often attends to uninformative background edges and blank                     parameters with MCNCC (denoted as CCA [μc , σc · Wc ]),
regions.                                                                      using a 50/50 training-test split, we see significantly bet-
                                                                              ter retrieval performance (96.4% for reviewing one database
6.2 Segmentation Retrieval for Building Facades                               item). The right panel of Fig. 8 shows some example retrieval
                                                                              results for this model.
To further demonstrate the robustness of MCNCC for cross
domain matching, we consider the task of retrieving seg-                      6.3 Retrieval of Maps from Aerial Imagery
mentation label maps which match for a given building
facade query image. We use the CMP Facade Database                            Finally, we evaluate matching performance on the problem
(Radim Tyleček 2013) which contains 606 images of facades                    of retrieving map data corresponding to query aerial photos.
from different cities around the world and their correspond-                  We use a dataset released by Isola et al. (2017) that contains
ing semantic segmentation labels. These labels can be viewed                  2194 pairs of images scraped from Google Maps. For simas a simplified “cartoon image” of the building facade by                     plicity in treating this as a retrieval task, we excluded map
mapping each label to a distinct gray level.                                  tiles which consisted entirely of water. Both aerial photos
   In our experiments, we generate 1657 matching pair by                      and map images were converted from RGB to gray-scale
resizing the original 606 images (base + extended dataset) to                 prior to feature extraction (see the right panel of Fig. 9 for
$$
either 512 × 1536 or 1536 × 512 depending on their aspect                     examples). We compare MCNCC to three baseline similarity
$$
$$
ratio and crop out non-overlapping 512 × 512 patches. We                      metrics: Cosine, Euclidean distance, and normalized crossprune this set by removing 161 patches which contain more                     correlation using across-channel local statistics (denoted as
$$
than 50% background pixels to get our final dataset. Exam-                    [μ, σ ]).
ples from this dataset can be seen in the right panel of Fig. 8.                  The results are shown in the left panel of Fig. 9.
In order treat the segmentation label map as an image suitable                MCNCC outperforms the baseline Cosine and Euclidean
for the pre-trained feature extractor, we scale the segmenta-                 distance measures, but this time performance of normalized
tion labels to span the whole range of gray values (i.e., from                cross-correlation using local per-exemplar statistics averaged
[1 − 12] to [0 − 255]).                                                       over all channels and Cosine similarity are nearly iden-
   We compare MCNCC (denoted in the legend as [μc , σc ])                     tical. For top-1 retrieval performance, MCNCC is correct
to three baseline similarity metrics: Cosine, Euclidean dis-                  98.7% of the time, normalized cross-correlation using across-
                                                                                                                                          123


<!-- PK PAGE 12 doc=math_p5 -->
International Journal of Computer Vision
Fig. 9 Retrieval of maps from aerial imagery. The left panel com-        shows retrieval results for [μc , σc ]. The left column shows the query
pares MCNCC with no learning (denoted as [μc , σc ]) to other baseline   aerial photo. Green boxes indicate the corresponding ground-truth map
metrics: Cosine similarity, Euclidean distance, and NCC using across-    image (Color figure online)
channel per-exemplar statistics (denoted as [μ, σ ]). The right panel
channel local statistics and Cosine similarity are correct               Acknowledgements We thank Sarena Wiesner and Yaron Shor for pro95.8%, and Euclidean distance is correct 28.6% of the time               viding access to their dataset. This work was partially funded by the
                                                                         Center for Statistics and Applications in Forensic Evidence (CSAFE)
when retrieving only one item. We show example retrieval
                                                                         through NIST Cooperative Agreement #70NANB15H176.
results for MCNCC in the right panel of Fig. 9. We did
not evaluate any learned models in this experiment since
the performance of baseline MCNCC left little room for
improvement.                                                             References
                                                                         Bodziak, W. J. (1999). Footwear impression evidence: Detection, recov-
                                                                              ery and examination. Boca Raton, FL: CRC Press.
                                                                         Chen, T., Cheng, M. M., Tan, P., Shamir, A.,& Hu, S. M. (2009).
7 Conclusion                                                                  Sketch2photo: Internet image montage. In ACM transactions on
                                                                              graphics (TOG) (Vol. 28). ACM.
In this work, we proposed an extension to normalized                     Costea, D., & Leordeanu, M. (2016). Aerial image geolocalization from
                                                                              recognition and matching of roads and intersections. arXiv preprint
cross-correlation suitable for CNN feature maps that per-                     arXiv:1605.08323.
forms normalization of feature responses on a per-channel                Dardi, F., Cervelli, F., & Carrato, S. (2009). A texture based shoe
and per-exemplar basis. The benefits of performing per-                       retrieval system for shoe marks of real crime scenes. Image Analexemplar normalization can be explained in terms of spatially                 ysis and Processing-ICIAP, 2009, 384–393.
                                                                         De Chazal, P., Flynn, J., & Reilly, R. B. (2005). Automated processlocal whitening which adapts to non-stationary statistics of                  ing of shoeprint images based on the Fourier transform for use
the input. Relative to other standard feature normalization                   in forensic science. IEEE Transactions on Pattern Analysis and
schemes (e.g., cosine similarity), per-channel normaliza-                     Machine Intelligence, 27(3), 341–350.
tion accommodates variation in statistics of different feature           Divecha, M., & Newsam, S. (2016). Large-scale geolocalization of
                                                                              overhead imagery. In Proceedings of the 24th ACM SIGSPATIAL
channels.                                                                     international conference on advances in geographic information
   Utilizing MCNCC in combination with CCA provides                           systems, ACM.
a highly effective building block for constructing Siamese               Fisher, R. B., & Oliver, P. (1995). Multi-variate cross-correlation and
network models that can be trained in an end-to-end discrim-                  image matching. In Proceedings of the British Machine Vision
                                                                              Conference (BMVC).
inative learning framework. Our experiments demonstrate                  Geiss, S., Einax, J., & Danzer, K. (1991). Multivariate correlation
that even with very limited amounts of data, this framework                   analysis and its application in environmental analysis. Analytica
achieves robust cross-domain matching using generic feature                   Chimica Acta, 242, 5–9.
extractors combined with piece-wise training of simple linear            Gueham, M., Bouridane, A., & Crookes, D. (2008). Automatic recog-
                                                                              nition of partial shoeprints using a correlation filter classifier. In
feature-transform layers. This approach yields state-of-the-                  International machine vision and image processing conference,
art performance for retrieval of shoe tread patterns match-                   2008. IMVIP’08 (pp. 37–42).
ing crime scene evidence. We expect our findings here will               Hariharan, B., Malik, J., & Ramanan, D. (2012). Discriminative decorbe applicable to a wide variety of single-shot and exemplar                   relation for clustering and classification. Computer Vision-ECCV,
                                                                              2012, 459–472.
matching tasks using CNN features.                                       Isola, P., Zhu, J. Y., Zhou, T., & Efros, A. A. (2017). Image-to-image
                                                                              translation with conditional adversarial networks. In Proceedings
123


<!-- PK PAGE 13 doc=math_p5 -->
International Journal of Computer Vision
      of the IEEE conference on computer vision and pattern recogni-         Senlet, T., El-Gaaly, T., & Elgammal, A. (2014). Hierarchical semantic
      tion.                                                                       hashing: Visual localization from buildings on maps. In 2014 22nd
Kong, B., Supancic, J. S., Ramanan, D., & Fowlkes, C. C. (2017). Cross-           international conference on pattern recognition (ICPR) (pp. 2990–
      domain forensic shoeprint matching. In British Machine Vision               2995).
      Conference (BMVC).                                                     Sharif Razavian, A., Azizpour, H., Sullivan, J., & Carlsson, S. (2014).
Kortylewski, A. (2017). Model-based image analysis for forensic shoe              CNN features off-the-shelf: An astounding baseline for recogni-
      print recognition. Ph.D. thesis, University_of_Basel.                       tion. In Proceedings of the IEEE conference on computer vision
Kortylewski, A., & Vetter, T. (2016). Probabilistic compositional active          and pattern recognition workshops (pp. 806–813).
      basis models for robust pattern recognition. In British machine        Shrivastava, A., Malisiewicz, T., Gupta, A., & Efros, A. A. (2011).
      vision conference.                                                          Data-driven visual similarity for cross-domain image matching.
Kortylewski, A., Albrecht, T., & Vetter, T. (2014). Unsupervised                  ACM Transactions on Graphics (ToG), 30(6), 154.
      footwear impression analysis and retrieval from crime scene data.      Tang, Y., Srihari, S. N., Kasiviswanathan, H., & Corso, J. J. (2010).
      In Asian conference on computer vision (pp. 644–658). Springer,             Footwear print retrieval system for real crime scene marks. In
      New York.                                                                   International workshop on computational forensics (pp. 88–100).
Lee, H. C., Ramotowski, R., & Gaensslen, R. (2001). Advances in fin-              Springer, New York.
      gerprint technology. Boca Raton, FL: CRC Press.                        Wei, C. H., & Gwo, C. Y. (2014). Alignment of core point for shoeprint
Li, F. F., Fergus, R., & Perona, P. (2006). One-shot learning of object           analysis and retrieval. In 2014 international conference on infor-
      categories. IEEE Transactions on Pattern Analysis and Machine               mation science, electronics and electrical engineering (ISEEE)
      Intelligence, 28(4), 594–611.                                               (Vol. 2, pp. 1069–1072).
Malisiewicz, T., Gupta, A., & Efros, A. A. (2011). Ensemble of               Xiao, T., Li, H., Ouyang, W., & Wang, X. (2016). Learning deep
      exemplar-SVMs for object detection and beyond. In 2011 IEEE                 feature representations with domain guided dropout for person re-
      international conference on computer vision (ICCV) (pp. 89–96).             identification. In Proceedings of the IEEE conference on computer
Mardia, K. V., Kent, J. T., & Bibby, J. M. (1980). Multivariate analy-            vision and pattern recognition (pp. 1249–1258).
      sis (probability and mathematical statistics). London: Academic        Yekutieli, Y., Shor, Y., Wiesner, S., & Tsach, T. (2012). Expert assisting
      Press.                                                                      computerized system for evaluating the degree of certainty in 2D
Martin, N., & Maes, H. (1979). Multivariate analysis. London: Aca-                shoeprints. Technical report, Technical Report, TP-3211, National
      demic Press.                                                                Institute of Justice.
Parkhi, O. M., Vedaldi, A., & Zisserman, A. (2015). Deep face recog-         Zagoruyko, S., & Komodakis, N. (2015). Learning to compare image
      nition. In BMVC (Vol. 1).                                                   patches via convolutional neural networks. In Proceedings of the
Patil, P. M., & Kulkarni, J. V. (2009). Rotation and intensity invari-            IEEE conference on computer vision and pattern recognition (pp.
      ant shoeprint matching using gabor transform with application to            4353–4361).
      forensic science. Pattern Recognition, 42(7), 1308–1317.               Zbontar, J., & LeCun, Y. (2015). Computing the stereo matching cost
Pavlou, M., & Allinson, N. (2006). Automatic extraction and classi-               with a convolutional neural network. In Proceedings of the IEEE
      fication of footwear patterns. Intelligent Data Engineering and             conference on computer vision and pattern recognition (pp. 1592–
      Automated Learning-IDEAL, 2006, 721–728.                                    1599).
Popper Shaffer, J., & Gillo, M. W. (1974). A multivariate extension          Zhang, L., & Allinson, N. (2005). Automatic shoeprint retrieval system
      of the correlation ratio. Educational and Psychological Measure-            for use in forensic investigations. In UK workshop on computa-
      ment, 34(3), 521–524.                                                       tional intelligence.
Radim Tyleček, R.Š. (2013). Spatial pattern templates for recognition
      of objects with regular structure. In Proceedings of the GCPR,
      Saarbrucken, Germany.                                                  Publisher’s Note Springer Nature remains neutral with regard to jurisRichetelli, N., Lee, M. C., Lasky, C. A., Gump, M. E., & Speir, J. A.        dictional claims in published maps and institutional affiliations.
      (2017). Classification of footwear outsole patterns using fourier
      transform and local interest points. Forensic Science International,
      275, 102–109.
Russell, B. C., Sivic, J., Ponce, J., & Dessales, H. (2011). Automatic
      alignment of paintings and photographs depicting a 3D scene. In
      2011 IEEE international conference on computer vision work-
      shops (ICCV workshops) (pp. 545–552).
                                                                                                                                          123
<!-- PK END doc=math_p5 -->
