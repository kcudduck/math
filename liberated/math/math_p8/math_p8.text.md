PKvNext Document

KEY: math_p8 | math |  | d0560e22 | 24 | /papers/DeepFit3DSurfaceFittingviaNeuralNetworkWeightedLeastSquare.pdf
<!-- PK START doc=math_p8 -->


<!-- PK PAGE 1 doc=math_p8 -->
arXiv:2003.10826v1 [cs.CV] 23 Mar 2020
                                   DeepFit: 3D Surface Fitting via Neural Network
                                              Weighted Least Squares
                                                         Yizhak Ben-Shabat and Stephen Gould
                                         The Australian National University, Australian Centre for Robotic Vision
                                                    {yizhak.benshabat,stephen.gould}@anu.edu.au
                                          Abstract. We propose a surface fitting method for unstructured 3D
                                          point clouds. This method, called DeepFit, incorporates a neural net-
                                          work to learn point-wise weights for weighted least squares polynomial
                                          surface fitting. The learned weights act as a soft selection for the neigh-
                                          borhood of surface points thus avoiding the scale selection required of
                                          previous methods. To train the network we propose a novel surface con-
                                          sistency loss that improves point weight estimation. The method enables
                                          extracting normal vectors and other geometrical properties, such as prin-
                                          cipal curvatures, the latter were not presented as ground truth during
                                          training. We achieve state-of-the-art results on a benchmark normal and
                                          curvature estimation dataset, demonstrate robustness to noise, outliers
                                          and density variations, and show its application on noise removal.
                                          Keywords: Normal estimation, surface fitting, least squares, unstruc-
                                          tured 3D point clouds, 3D point cloud deep learning
                                 1       Introduction
                                 Commodity 3D sensors are rapidly becoming an integral component of au-
                                 tonomous systems. These sensors, e.g., RGB-D cameras or LiDAR, provide a
                                 3D point cloud representing the geometry of the scanned objects and surround-
                                 ings. This raw representation, however, is challenging to process since it lacks
                                 connectivity information or structure, and is often incomplete, noisy and contains
                                 point density variations. In particular, processing it by means of convolutional
                                 neural networks (CNNs)—highly effective for images—is problematic because
                                 CNNs require structured, grid-like data as input.
                                     When available, additional local geometric information, such as the surface
                                 normal and principal curvatures at each point, induces a partial local structure
                                 and improves performance of different tasks for interpreting the scene, such as
                                 over-segmentation [1], classification [18] and surface reconstruction [9].
                                     Estimating the normals and curvatures from a raw point cloud with no addi-
                                 tional information is a challenging task due to difficulties associated with sam-
                                 pling density, noise, outliers, and detail level. The common approach is to specify
                                 a neighborhood around a point and then fit a local basic geometric surface (e.g., a
                                 plane) to the points in this neighborhood. The normal at the point under consid-
                                 eration is estimated from the fitted geometric surface. The chosen size (or scale)


<!-- PK PAGE 2 doc=math_p8 -->
2            Y. Ben-Shabat, S. Gould
    Point cloud                                                            Point-wise weight estimation                            Point-wise
                                                          𝑆𝑆𝑖𝑖
              Query point 𝑞𝑞𝑖𝑖                                                                                (512, 256, 128, 1)    weights
                                                    𝑥𝑥1 𝑦𝑦1 𝑧𝑧1                    Local features                   mlp               𝑤𝑤1                 𝑊𝑊
                             k nearest neighbours
                                                    𝑥𝑥2 𝑦𝑦2 𝑧𝑧2                                                                      𝑤𝑤2
                                                                                                                                                    Fit n-Jet
                                                                     PointNet                       Global
                                                                                                    feature                                                          Normal vector
                                                    𝑥𝑥𝑘𝑘 𝑦𝑦𝑘𝑘 𝑧𝑧𝑘𝑘
$$
                                                                                   Local features                                    𝑤𝑤𝑘𝑘       𝛽𝛽 = (𝑀𝑀𝑇𝑇 𝑊𝑊𝑊𝑊)−1
$$
                                                                                          Concatenate
                                                                                                                                                     𝑀𝑀𝑇𝑇 𝑊𝑊𝑊𝑊
                                                                                                    Global                                               𝑀𝑀, 𝐵𝐵
                                                                     Max pool
                                                                                                    feature
                                                                                                                                                                        Principal
                                                                                                                                                                       curvatures
                                                                           Compute Vandermonde matrix (M), and height function vector (B)
Fig. 1: DeepFit pipeline for normal and principal curvature estimation. For each
point in a given point cloud, we compute a global and local representation and
estimate a point-wise wight. Then, we fit an n-jet by solving a weighted least
squares problem.
of the neighborhood introduces an unavoidable trade-off between robustness to
noise and accuracy of fine details. A large neighborhood over-smooths sharp corners and small details but is otherwise robust to noise. A small neighborhood, on
the other hand, may reproduce the normals more accurately around small details
but is more sensitive to noise. Evidently, a robust, scale-independent, data-driven
surface fitting approach should improve normal estimation performance.
    We propose a surface fitting method for unstructured 3D point clouds. It
features a neural network for point-wise weight prediction for weighted least
squares fitting of polynomial surfaces. This approach removes the multi-scale requirement entirely and significantly increases robustness to different noise levels,
outliers, and varying levels of detail. Moreover, the approach enables extracting
normal vectors and additional geometric properties without the need for retraining or additional ground truth information. The main contributions of this paper
are:
    – A method for per-point weight estimation for weighted least squares fitting
      using deep neural networks.
    – A scale-free method for robust surface fitting and normal estimation.
    – A method for principal curvature and geometric properties estimation with-
      out using ground truth labels.
2        Background and Related Work
2.1        Deep learning for unstructured 3D point clouds
The point cloud representation of a 3D scene is challenging for deep learning
methods because it is both unstructured and unordered. In addition, the number
of points in the point cloud varies for different scenes. Several methods have been


<!-- PK PAGE 3 doc=math_p8 -->
DeepFit       3
proposed to overcome these challenges. Voxel-based methods embed the point
cloud into a voxel grid but suffer from several accuracy-complexity tradeoffs [14].
The PointNet approach [17,18] applies a symmetric, order-insensitive, function
on a high-dimensional representation of individual points. The Kd-Network [12]
imposes a kd-tree structure on the points and uses it to learn shared weights for
nodes in the tree. The recently proposed 3D modified fisher vectors (3DmFV) [2]
represents the points by their deviation from a Gaussian Mixture Model (GMM)
whose Gaussians are uniformly positioned on a coarse grid.
    In this paper we use a PoinNet architecture for estimating point-wise weights
for weighted least squares surface fitting. We chose PointNet since it operates
directly on the point cloud, does not require preprocessing, representation conversion or structure, and contains a relatively low number of parameters,
2.2   Normal Estimation
A classic method for estimating normals uses principal component analysis
(PCA) [10]. Here a neighborhood of points within some fixed scale is chosen
and PCA regression used to estimate a tangent plane. Variants that fit local
spherical surfaces [8] or Jets [6] (truncated Taylor expansion) have also been
proposed. Further detail on Jet fitting is given in Section 2.3. To be robust to
noise, these methods usually choose a large-scale neighborhood, leading them to
smooth sharp features and fail to estimate normals near 3D edges. Computing
the optimal neighborhood size can decrease the estimation error [15] but requires
the (usually unknown) noise standard deviation value and a costly iterative process to estimate the local curvature and additional density parameters.
    A few deep learning approaches have been proposed to estimate normal vectors from unstructured point clouds. Boulch and Marlet proposed to transform
local point cloud patches into a 2D Hough space accumulator by randomly selecting point triplets and voting for that plane’s normal. Then, the normal is
estimated from the accumulator by designing explicit criteria [4] for bin selection or, more recently, by training a 2D CNN [5] to estimate it continuously
as a regression problem. This method does not fully utilize available 3D information since it loses information during the transformation stage. Another
method, named PCPNnet [9], uses a PointNet [17] architecture over local neighborhoods at multiple scales. It achieves good normal estimation performance and
has been extended to estimating principal curvatures. However, it processes the
multi-scale point clouds jointly and requires selecting a predefined set of scales.
A more recent work, Nesti-Net [3] tries to predict the appropriate scale using
a mixture of experts network and a local representation for different scales. It
achieves high accuracy but suffers from high computation time due to the multiple scale computations. Nesti-Net shares PCPNet’s drawback of requiring a
predefined set of scales. A contemporary work [13] uses an iterative plane fitting approach which tries to predict all normals of a local neighborhood and
iteratively adjusts the point weights to best fit the plane.
    In this paper we propose a novel approach for normal estimation by learning
to fit an n-order Jet while predicting informative points’ weights. Our approach


<!-- PK PAGE 4 doc=math_p8 -->
4       Y. Ben-Shabat, S. Gould
removes the need of predefined scales and optimal scale selection since the informative points are extracted at any given scale. Our method generalizes the
contemporary method proposed by Lenssen et. al. [13], avoids the iterative process, and enables the computation of additional geometric properties.
2.3   Jet fitting using least squares and weighted least squares
We now provide background and mathematical notation for truncated Taylor
expansion surface fitting using least-squares (LS) and weighted least-squares
(WLS). We refer the interested reader to Cazals and Pouget [6] for further detail.
    Any regular embedded smooth surface can be locally written as the graph
of a bi-variate “height function” with respect to any z-direction that does not
belong to the tangent space [19]. We adopt the naming convention of Cazals and
Pouget [6] and refer to the truncated Taylor expansion as a degree n jet or n-jet
for short. An n-jet of the height function over a surface is given by:
                                               n X
                                               X k
$$
                    f (x, y) = Jβ,n (x, y) =             βk−j,j xk−j y j              (1)
$$
$$
                                               k=0 j=0
$$
$$
Here β is the jet coefficients vector that consists of Nn = (n + 1)(n + 2)/2 terms.
$$
     In this work we wish to fit a surface to a set of Np 3D points. For clarity,
$$
we move to the matrix notation and specify the Vandermonde matrix M =
$$
$$
(1, xi , yi , ..., xi yin−1 , yin )i=1,...,Np ∈ RNp ×Nn and the height function vector B =
$$
$$
(z1 , z2 , ...zNp )T ∈ RN     p representing the sampled points. We require that every
$$
point satisfy Eq. 1, yielding the system of linear equations:
$$
                                        Mβ = B                                        (2)
$$
When Nn > Np the system is over-determined and an exact solution may not
exist. Therefore we use an LS approximation that minimizes the sum of square
errors between the value of the jet and the height function over all points:
                                                             2
$$
                              β = arg min kM z − Bk                                   (3)
$$
$$
                                       z∈RNn
$$
It is well known that the solution can be expressed in closed-form as:
$$
                                 β = (M T M )−1 M T B                                 (4)
$$
Typically the sampled points include noise and outliers that heavily reduce the
fitting accuracy. To overcome this, the formulation given in Eq. 4 can be extended to a weighted least square problem. In this setting, some points have
$$
more influence on the fitted model than others. Let W ∈ RNp ×Np be a diagonal
$$
$$
weight matrix W = diag(w1 , w2 , ..., wNp ). Each element in the matrix’s diagonal
$$


<!-- PK PAGE 5 doc=math_p8 -->
DeepFit        5
wi corresponds to the weight of that point.
The optimization problem becomes:
                                                        2
$$
                    β = arg min       W 1/2 (M z − B)
$$
$$
                             z∈RNn
$$
                                                              2
                                     Np         Nn
                                     X         X
$$
                      = arg min            wi     Mij zj − Bi 
$$
$$
                             z∈RNn
$$
$$
                                     i=1       j=1
$$
and its solution:
$$
                            β = (M T W M )−1 M T W B                             (5)
$$
    In this work, we choose to focus on n-jet fitting because any order n differential quantity can be computed from the n-jet. This is one of the main advantages
of our method. That is, our method is trained for estimating normal vectors but
is then able to estimate other differential quantities, e.g., principal curvatures,
depending on the jet order.
3     DeepFit
3.1   Learning point-wise weights
The full pipeline for our method is illustrated in Fig. 1. Given a 3D point cloud
$$
S and a query point qi ∈ S we first extract a local subset of points Si using
$$
k-nearest neighbors. We then use a neural network to estimate the weight of
each point in the neighborhood, which will subsequently be used for weighted
least squares surface fitting. Specifically, we feed Si into a PointNet [17] network,
which outputs a global point cloud representation G(Si ). Additionally, we extract
$$
local representations from an intermediate layer for each of the points pj ∈ Si
$$
separately to give g(pj ). These representations are then concatenated and fed
into a multi-layer perceptron h(·) followed by a sigmoid activation function. We
choose a sigmoid in order to limit the output values to be between 0 and 1.
The output of this network is a weight per point that is used to construct the
$$
diagonal point-weight matrix, W = diag(wj ) with
$$
$$
                        wj = sigmoid(h(G(Si ), g(pij ))) +                      (6)
$$
For numerical stability, we add a constant small  in order to avoid the degenrate
case of a zero or poorly conditioned matrix. This weight matrix is then used to
solve the WLS problem of Eq. 5 and approximate the n-jet coefficients β. All
parts of the network are differentiable and therefore it is trained end-to-end.
3.2   Geometric quantities estimation
Given the n-jet coefficients β several geometric quantities can be easily extracted:


<!-- PK PAGE 6 doc=math_p8 -->
6       Y. Ben-Shabat, S. Gould
Normal estimation. The estimated normal vector is given by:
                                       (−β1 , −β2 , 1)
$$
                              Ni =                                               (7)
$$
                                     k(−β1 , −β2 , 1)k2
Shape operator and principal curvatures. For the second order information we compute the Weingarten map of the surface by multiplying the inverse
of the first fundamental form and the second fundamental form. Its eigenvalues are the principal curvatures (k1 , k2 ), and its eigenvectors are the principal
directions. The computation is done in the tangent space associated with the
parametrization.
                                                            −1 
                                             1 + β12 β1 β2
                                                                        
                                 1                               2β3 β4
$$
           MWeingarten = − p 2                            2                     (8)
$$
                            β1 + β22 + 1 β1 β2 1 + β2             β4 2β5
Generally, the principal curvatures can be used as ground truth in training,
however, due to the eigenvalue decomposition, with the high probability of outputting two zero principal curvatures (planes) it suffers from numerical issues
when computing the gradients for backpropagation [7]. Therefore, we compute
the curvatures only at test time. Note that Monge basis and higher order Monge
coefficients can also be computed, similar to [6].
3.3   Consistency loss
In order to learn point-wise weights, we introduce a local consistency loss Lcon .
This loss is composed of two terms, the weighted normal difference term and a
regularization term. The weighted normal difference term computes a weighted
average of the sine of the angle between the ground truth normal and the estimated normal at every local neighborhood point. These normals are computed
$$
analytically by converting the n-jet to the implicit surface form of F (x, y, z) = 0.
$$
Therefore, for every query point qi and its local neighborhood Si we can compute
$$
the normal at each neighboring point pj ∈ Si using:
$$
                                                 T        T
$$
                         ∇F        (−βi ∂M     ∂M
$$
$$
                                        ∂x , βi ∂y , 1)
$$
$$
                   Nj =          =                                               (9)
$$
$$
                        k∇F k pj          k∇F k
$$
                                                               pj
Note that this formulation assumes all points to lie on the surface, for points that
are not on the surface, the normal error will be large, therefore that points weight
will be encouraged to be small. This term can easily converge to an undesired
local minimum by setting all weights to zero. In order to avoid that, we add a
regularization term which computes the negative average log of all weights. In
summary, the consistency loss for a query point qi is then given by:
                                                                  
                                Nq             Nqi
                          1  Xi               X
$$
                Lcon =        −     log(wj ) +      wj |NGT × Nj |             (10)
$$
$$
                         Nqi    j=1            j=1
$$


<!-- PK PAGE 7 doc=math_p8 -->
DeepFit       7
   In contrast to Lenssen et. al. [13], this formulation allows us to avoid solving
multiple linear systems iteratively for each point in the local neighborhood.
   In total, to train the network, we sum several loss terms: The sin loss between
the estimated unoriented normal and the ground truth normal at the query point,
the consistency loss, and PointNet’s transformation matrix regularization terms
$$
Lreg = I − AAT .
$$
$$
                     Ltot = |NGT × Ni | + α1 Lcon + α2 Lreg                   (11)
$$
Here, α1 , and α2 are weighting factors, chosen empirically.
3.4   Implementation notes
In our experiments we report results using DeepFit with the following configuration, unless otherwise stated. A four layer MLP with sizes 512, 256, 128, and
1; a neighborhood size of 256 points, and a 3-order jet. In order to avoid numerical issues, simplify the notation, and reduce the linear algebra operations, we
perform the following pre-processing stages on every local point cloud:
 1. Normalization: we translate the point cloud to position the query point in
    the origin and scale the point cloud to fit a unit sphere.
 2. Basis extraction: we perform principal component analysis (PCA) on the
    point cloud. We then use the resulting three orthonormal eigenvectors as the
    fitting basis so that the vector associated with the smallest eigenvalue is the
    last vector of the basis.
 3. Coordinate frame transformation: We perform a change of coordinates to
    move the points into the coordinate system of the fitting basis.
 4. Preconditioning: we precondition the Vandermonde matrix by performing
$$
    column scaling. Each monomial xki yil is divided by hk+l . That is, M 0 =
$$
$$
    M D−1 with D the diagonal matrix D = diag(1, h, h2 , ..., hn ). We use the
$$
$$
    mean of the norm k(xi , yi )k as h. The new system is then M 0 (Dβ) = B and
$$
$$
    β = D−1 (M 0T W M 0 )−1 M 0T W B.
$$
Note that after the normal is estimated we apply the inverse transform to output
the result in the original coordinate frame.
4     Results
4.1   Dataset and training details
For training and testing we used the PCPNet shape dataset [9]. The training set
consists of eight shapes: four CAD objects (fandisk, boxunion, flower, cup) and
four high quality scans of figurines (bunny, armadillo, dragon and turtle). All
shapes are given as triangle meshes and densely sampled with 100k points. The
data is augmented by introducing i.i.d. Gaussian noise for each point’s spacial
location with a standard deviation of 0.012, 0.006, 0.00125 w.r.t the bounding


<!-- PK PAGE 8 doc=math_p8 -->
8         Y. Ben-Shabat, S. Gould
box size. This yields a set with 3.2M training examples. The test set consists of
22 shapes, including figurines, CAD objects, and analytic shapes. For evaluation
we use the same 5000 point subset per shape as in Guerrero et al. [9].
    All variations of our method were trained using 32,768 (1024 samples by
32 shapes) random subsets of the 3.2M training samples at each epoch. We
used a batch size of 256, the Adam optimizer and a learning rate of 10−3 . The
implementation was done in PyTorch and trained on a single Nvidia RTX 2080
GPU.
4.2     Normal estimation performance
We use the RMSE metric for comparing the proposed DeepFit to other deep
learning based methods [9,3,13] and classical geometric methods [10,6]. Additionally, we analyze robustness for two types of data corruption:
    – Point density—applying two sampling regimes for point subset selection: gra-
      dient, simulating effects of distance from the sensor, and stripes, simulating
      local occlusions.
    – Point perturbations–adding Gaussian noise to the points coordinates with
      three levels of magnitude specified by σ, given as a percentage of the bound-
      ing box.
For the geometric methods, we show results for three different scales: small,
medium and large, which correspond to 18, 112, 450 nearest neighbors. For the
deep learning based methods we show the results for the single-scale (ss) and
multi-scale (ms) versions.
    Table 1 shows the unoriented normal RMSE results for the methods detailed
above. It can be seen that our method slightly outperforms all other methods
for low, medium and no noise augmentation and for gradient density augmentation. For high noise, and striped occlusion augmentation we are a close second
to the contemporary work of Lenssen et al. [13] which only estimates the normal
vectors while DeepFit also estimates other geometric properties, e.g., principal
curvatures. The results also show that all method’s performance deteriorate as
the noise level rises. In this context, both PCA and Jet perform well for specific
noise-scale pairs. In addition, for PCPNet, using a multiple scales only mildly improves performance. Nesti-Net’s mixture of experts mitigate the scale-accuracy
tradeoff well at the cost of computational complexity. DeepFit’s soft point selection process overcomes this tradeoff. In the supplemental materials we perform
additional evaluation using the percentage of good points (PGPα) metric.
    Figure 2a depicts a visualization of DeepFit’s results on three point clouds.
Here the normal vectors are mapped to the RGB cube. It shows that for complex
shapes (pillar, liberty) with high noise levels, the general direction of the normal
vector is predicted correctly, but, the fine details and exact normal vector are not
obtained. For a basic shape (Boxysmooth) the added noise does not affect the
results substantially. Most notably, DeepFit shows robustness to point density
corruptions. Figure 2b depicts a visualization of the angular error in each point


<!-- PK PAGE 9 doc=math_p8 -->
DeepFit        9
                                                                  Len-
             Our
                         PCA               Jet          PCPNet ssen Nesti-
   Aug.     Deep-
                          [10]             [6]             [9]    et. al Net
             Fit
                                                                   [13]
   scale      ss    small med large small med large ss         ms   ss ms (MoE)
   None      6.51    8.31 12.29 16.77 7.60 12.35 17.35 9.68 9.62 6.72    6.99
 Noise σ
 0.00125    9.21 12.00 12.87 16.87 12.36 12.84 17.42 11.46 11.37 9.95       10.11
   0.006    16.72 40.36 18.38 18.94 41.39 18.33 18.85 18.26 18.87 17.18     17.63
   0.012    23.12 52.63 27.5 23.5 53.21 27.68 23.41 22.8 23.28 21.96        22.28
 Density
 Gradient    7.31   9.14 12.81 17.26 8.49 13.13 17.8 13.42 11.7 7.73         9.00
  Stripes    7.92   9.42 13.66 19.87 8.61 13.39 19.29 11.74 11.16 7.51       8.47
 average     11.8   21.97 16.25 18.87 21.95 16.29 19.02 14.56 14.34 11.84   12.41
Table 1: Comparison of the RMSE angle error for unoriented normal vector
estimation of our DeepFit method to classical geometric methods (PCA [10] and
$$
Jet [6] - for three scales small, med, and large corresponding to k = 18, 122, 450),
$$
and deep learning methods (PCPNet [9], Lenssen et. al [13], and Nesti-Net [3])
for the different methods using a heat map. For the Jet method [6] we display
the results for medium scale. For all methods, it can be seen that more errors
occur in regions with small details, high curvature e.g. edges and corners, and
complex geometry. DeepFit suffers the least from this effect due to its point-wise
weight estimation, which allows it to adapt to the different local geometryand
disregard irrelevant points in the fitting process.
    Figure 3 qualitatively visualizes the performance of DeepFit’s point-wise
weight prediction network. The colors of the points correspond to weight magnitude, mapped to a heatmap ranging from 0 to 1 i.e. red points highly affect
the fit while blue points have low influence. It shows that the network learns to
$$
adapt well to corner regions (column n = 1), assigning high weights to points on
$$
one plane and excluding points on the perpendicular one. Additionally, it shows
how the network adapted the weight to achieve a good fit for complex geometries
$$
(column n = 2, 3, 4).
$$
    Fig. 4 shows the unoriented normal RMSE results for different parameter
$$
choices of our method. We explore different Jet orders n = 1, 2, 3, 4, and a
$$
$$
different number of neighboring points k = 64, 128, 256, It shows that using a
$$
large neighborhood size highly improves the performance in high noise cases
while only minimally affecting the performance in low noise. It also shows that
all jet orders are comparable with a small advantage for order 1-jet (plane) and
order 3-jet which is an indication for a bias in the dataset towards low curvature
geometry. Additional ablation results, including more augmentations and the
PGPα metric are provided in the supplemental material.
    Timing and efficiency performance are provided in the supplemental material.
DeepFit is faster and has fewer parameters than PCPNet and Nesti-Net and has
the potential of only being slightly slower than CGAL implementation of Jet


<!-- PK PAGE 10 doc=math_p8 -->
10     Y. Ben-Shabat, S. Gould
                   (a)                                      (b)
Fig. 2: (a) DeepFit’s normal estimation results for different noise levels (columns
1-4), and density distortions (columns 5-6). The colors of the points are normal
vectors mapped to RGB. (b) Normal estimation error visualization results of
DeepFit compared to other methods for three types of point clouds without
noise. The colors of the points correspond to angular difference, mapped to a
heatmap ranging from 0-60 degrees.
Fig. 3: DeepFit point-wise weight prediction. Three views of different n-jet surface fits. The colors of the points correspond to weight magnitude , mapped to
a heatmap ranging from 0 to 1; see color bar on the right i.e. red points highly
affect the fit while blue points have low influence.
                                        .


<!-- PK PAGE 11 doc=math_p8 -->
DeepFit    11
$$
                                        n=1   n=2                n=3       n=4
$$
                             No Noise                                              High Noise
             8.0                                                 32
                                                                 30
angle RMSE
                                                    angle RMSE
             7.5
             7.0                                                 28
                                                                 26
             6.5
                                                                 24
             6.0
                   64      128                256                     64         128                 256
                          Number of points                                       Number of points
                             (a)                                                    (b)
 Fig. 4: Normal estimation RMSE results for DeepFit ablations for (a) no noise
 and (b) high noise augmentations. Comparing the effect of number of neighboring
 points and jet order.
 fitting because the forward pass for weight estimation is linear with respect to
 the number of points and the network weights.
 4.3               Principal curvature estimation performance
 Figure 5 qualitatively depicts DeepFit’s results on five point clouds. For vi-
 sualization, the principal curvatures are mapped to RGB values according to
 the commonly used mapping given in its bottom right corner i.e. both positive
 (dome) are red, both negative (bowl) are blue, one positive and one negative
 (saddle) are green, both zero (plane) are white, and one zero and one posi-
 tive/negative (cylinder) are yellow/cyan. For consistency in color saturation we
 map each model differently according to the mean and standard deviation of the
 principal curvatures. Note that the curvature sign is determined by the ground
 truth normal orientation.
     For quantitative evaluation we use the normalized RMSE metric curvature
 estimation evaluation proposed in Guerrero et. al. [9] and given in Eq. 12, for
 comparing the proposed method to other deep learning based [9] and geometric
 methods [6]. Table 2 summarizes the results and shows an average error reduc-
 tion of 35% and 13.7% for maximum and minimum curvatures respectively. We
 analyze robustness for the same types of data corruptions as in normal estima-
 tion i.e. point perturbation and density. DeepFit significantly outperforms all
 other methods for maximum principal curvature k1 . For the minimum principal
 curvature k2 DeepFit outperforms all methods for low and no noise augmenta-
 tion in addition to gradient and striped density augmentation, however PCPNet
 has a small advantage for medium and high noise levels. The results for the


<!-- PK PAGE 12 doc=math_p8 -->
12      Y. Ben-Shabat, S. Gould
Fig. 5: Curvature estimation results visualization. The colors of the points corresponds to the mapping of k1 , k2 to the color map given in the bottom right.
$$
Values in the range [−(µ(|ki |) + σ(|ki |)), µ(|ki |) + σ(|ki |)]|i=1,2 .
$$
minimum curvature are very sensitive since most values are close to zero.
                                kj − kGT
$$
                      Dkj =                  ,    for j = 1, 2.                 (12)
$$
                              max{|kGT |, 1}
    The normalized RMSE metric is visualized in Fig. 6 for DeepFit and PCPNet
as the magnitude of the error vector mapped to a heatmap. It can be seen that
more errors occur near edges, corners and small regions with a lot of detail and
high curvature. These figures show that for both simple and complex geometric
shapes DeepFit is able to predict the principal curvatures reliably.
4.4   Surface reconstruction and noise removal
We further investigate the effectiveness of our surface fitting in the context of two
subsequent applications—Poisson surface reconstruction [11] and noise removal.
Surface reconstruction. Fig. 7a shows the results for the classical Jet fitting
and our DeepFit approach. Since the reconstruction requires oriented normals,
we orient the normals, in both methods, according to the ground truth normal.
It shows that using DeepFit, the poisson reconstruction is moderately more
satisfactory by being smoother overall, and crispier near corners. It also retains
small details (liberty crown, cup rim).
Noise removal. The point-wise weight prediction network enables a better
fit by reducing the influence of neighboring points. This weight can also be
interpreted as the network’s confidence of that point to lie on the object’s surface.
Therefore, we can use the weight to remove points with low confidence. We first


<!-- PK PAGE 13 doc=math_p8 -->
DeepFit      13
          Our PCP-                                  Our PCP-
                           Jet                                      Jet
 Aug.    Deep- Net                         Aug.    Deep- Net
                           [6]                                       [6]
          Fit   [9]                                 Fit   [9]
 output k1 +n k1 +n k1      k1   k1        output k2 +n k2 +n k2     k2   k2
  scale    ss   ms small med. large         scale    ss   ms small med. large
  None    1.00 1.36 2.19 6.55 2.97          None    0.46 0.54 1.61 2.91 1.59
Noise σ                                   Noise σ
0.00125 1.00 1.48 57.35 6.68 2.90         0.00125 0.47 0.53 25.83 2.98 1.53
  0.006   0.98 1.46 60.91 9.86 3.30         0.006   0.57 0.51 22.27 4.88 1.73
  0.012   1.21 1.59 49.40 10.78 3.58        0.012   0.68 0.53 18.17 5.22 1.84
Density                                   Density
Gradient 0.59 1.32 2.07 1.40 1.53         Gradient 0.31 0.61 2.04 0.79 0.83
 Stripes   0.6 1.09 2.04 1.54 1.89         Stripes 0.31 0.55 1.92 0.89 1.09
average 0.89 1.38 28.99 6.13 2.69         average 0.466 0.54 11.97 2.94 1.43
 reduc. 35.5%                              reduc. 13.7%
Table 2: Comparison of normalized RMSE for (left) maximal (k1 ) and (right)
minimal (k2 ) principal curvature estimation of our DeepFit method to the classic
Jet [6] with three scales, and PCPNet [9]
Fig. 6: Curvature estimation error results for DeepFit compared PCPNet. The
numbers under each point cloud are its normalized RMSE errors in the format
(k1 , k2 ). The color corresponds to the L2 norm of the error vector mapped to a
heatmap ranging from 0-5.


<!-- PK PAGE 14 doc=math_p8 -->
14      Y. Ben-Shabat, S. Gould
                                                             (b)
                   (a)
Fig. 7: DeepFit performance in two subsequent application pipelines: (a) Poisson surface reconstruction using estimated normal vectors from the classical Jet
fitting and the proposed DeepFit. (b) Noise removal results using DeepFit predicted weights.
aggregate the weights by summing all of its weight prediction from all of its
neighbors. Then we compute the mean and standard   PdeviationP of the aggregateed
weights and remove points under a threshold of µ( wi ) − σ( wi ). The output
point cloud contains less points than the original one and the removed points
are mostly attributed to outliers or noise. The results are depicted in Fig. 7b.
5    Summary
In this paper we presented a novel method for deep surface fitting for unstructured 3D point clouds. The method consists of estimating point-wise weights for
solving a weighted least square fitting of an n-jet surface. Our model is fully differentiable and can be trained end-to-end. The estimated weights (at test time)
can be interpreted as the a confidence measure for every point in the point cloud
and used for noise removal. Moreover, the formulation enables the computation
of normal vectors and higher order geometric quantities like principal curvatures.
The approach demonstrates high accuracy, robustness and efficiency compared
to state-of-the-art methods. This is attributed to its ability to adaptively select
the neighborhood of points through a learned model while leveraging classic robust surface fitting approaches, allowing the network to achieve high accuracy
with a low number of parameters and computation time.
References
 1. Yizhak Ben-Shabat, Tamar Avraham, Michael Lindenbaum, and Anath Fischer.
    Graph based over-segmentation methods for 3d point clouds. Computer Vision
    and Image Understanding, 2018.


<!-- PK PAGE 15 doc=math_p8 -->
DeepFit       15
 2. Yizhak Ben-Shabat, Michael Lindenbaum, and Anath Fischer. 3dmfv: Three-
    dimensional point cloud classification in real-time using convolutional neural net-
    works. IEEE Robotics and Automation Letters, 3(4):3145–3152, 2018.
 3. Yizhak Ben-Shabat, Michael Lindenbaum, and Anath Fischer. Nesti-net: Normal
    estimation for unstructured 3d point clouds using convolutional neural networks. In
    Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition,
    pages 10112–10120, 2019.
 4. Alexandre Boulch and Renaud Marlet. Fast and robust normal estimation for
    point clouds with sharp features. In Computer Graphics Forum, volume 31, pages
    1765–1774. Wiley Online Library, 2012.
 5. Alexandre Boulch and Renaud Marlet. Deep learning for robust normal estimation
    in unstructured point clouds. Computer Graphics Forum, 35(5):281–290, 2016.
 6. Frédéric Cazals and Marc Pouget. Estimating differential quantities using polyno-
    mial fitting of osculating jets. Computer Aided Geometric Design, 22(2):121–146,
    2005.
 7. Zheng Dang, Kwang Moo Yi, Yinlin Hu, Fei Wang, Pascal Fua, and Mathieu
    Salzmann. Eigendecomposition-free training of deep networks with zero eigenvalue-
    based losses. In Proceedings of the European Conference on Computer Vision
    (ECCV), pages 768–783, 2018.
 8. Gaël Guennebaud and Markus Gross. Algebraic point set surfaces. ACM Trans-
    actions on Graphics (TOG), 26(3):23, 2007.
 9. Paul Guerrero, Yanir Kleiman, Maks Ovsjanikov, and Niloy J Mitra. Pcpnet learn-
    ing local shape properties from raw point clouds. Computer Graphics Forum,
    37(2):75–85, 2018.
10. Hugues Hoppe, Tony DeRose, Tom Duchampt, John McDonald, and Werner Stuet-
    zle. Surface reconstruction from unorganized points. Computer Graphics, 26:2,
    1992.
11. Michael Kazhdan, Matthew Bolitho, and Hugues Hoppe. Poisson surface recon-
    struction. In Proceedings of the fourth Eurographics symposium on Geometry pro-
    cessing, volume 7, 2006.
12. Roman Klokov and Victor Lempitsky. Escape from cells: Deep kd-networks for the
    recognition of 3d point cloud models. In The IEEE International Conference on
    Computer Vision (ICCV), pages 863–872, Oct 2017.
13. Jan Eric Lenssen, Christian Osendorfer, and Jonathan Masci. Differentiable iter-
    ative surface normal estimation. arXiv preprint arXiv:1904.07172, 2019.
14. Daniel Maturana and Sebastian Scherer. Voxnet: A 3d convolutional neural net-
    work for real-time object recognition. In IEEE/RSJ International Conference on
    Intelligent Robots and Systems (IROS), pages 922–928. IEEE, 2015.
15. Niloy J Mitra and An Nguyen. Estimating surface normals in noisy point cloud
    data. In Proceedings of the Nineteenth Annual Symposium on Computational ge-
    ometry, pages 322–328. ACM, 2003.
16. Pushmeet Kohli Nathan Silberman, Derek Hoiem and Rob Fergus. Indoor seg-
    mentation and support inference from RGBD images. In European Conference on
    Computer Vision (ECCV), pages 746–760, 2012.
17. Charles R. Qi, Hao Su, Kaichun Mo, and Leonidas J. Guibas. Pointnet: Deep learn-
    ing on point sets for 3d classification and segmentation. In The IEEE Conference
    on Computer Vision and Pattern Recognition (CVPR), July 2017.
18. Charles Ruizhongtai Qi, Li Yi, Hao Su, and Leonidas J Guibas. Pointnet++: Deep
    hierarchical feature learning on point sets in a metric space. In Advances in neural
    information processing systems, pages 5099–5108, 2017.


<!-- PK PAGE 16 doc=math_p8 -->
16      Y. Ben-Shabat, S. Gould
19. Michael D Spivak. A comprehensive introduction to differential geometry. Publish
    or perish, 1970.


<!-- PK PAGE 17 doc=math_p8 -->
DeepFit      17
6     Supplementary Material
6.1   Normal and principal curvature estimation performance
Performance on real data. We qualitatively evaluate the performance of our
method on the NYU Depth V2 dataset [16]. This dataset was captured using a
Kinect v1 RGBD camera and contains indoor scene environment and includes
missing data and a noise pattern that is significantly different than the PCPNet
dataset. Specifically, the noise often has the same magnitude as some of the
features. Most importantly, this dataset, much like other real-world datasets,
does not have ground truth normals. Fig. 8 and Fig. 9 show the performance of
DeepFit’s normal and principal curvature estimation respectively compared to
Jet. DeepFit was trained with 256 points, however, since the network’s weights
are shared between the points it can be used with any neighborhood size. In
these results we show the performance for 128, 256, 512, 1024 neighboring points.
It shows that DeepFit is less sensitive to noise and is able to overcome the oversmoothing affect commonly attributed to using a large neighborhood while also
preserving fine details.
Additional normal estimation results. We evaluate the normal estimation
performance on the PCPNet datast using the percentage of good points (PGP α)
metric. Fig 10 shows the results of different learning based methods for increasing
α values . It shows that for low and medium noise levels, DeepFit is comparable
to Lenssen et.al. [13] while in all other categories their performance is better.
This is most likely attributed to the dataset bias towards flat and low curvature
surfaces, in which case, our method does not pose an advantage. DeepFit main
advantage is in curvy surfaces where an n-jet yields a better fit than a plane.
     We evaluate DeepFit’s normal estimation performance using RMSE for different n-jet orders and number of points in the neighborhood. The results are
shown in Fig. 11. It shows that the increase in the number of neighboring points
slightly decreases the performance in the no noise augmentation however it significantly improves the performance in high noise. This is mainly attributed to
the weight estimation network that softly selects the most relevant points for the
fit. It also shows that 1-jet (planes) perform well, however higher order jets have
an advantage in the low and medium noise augmentation categories. In theory,
the higher order jets have the capacity to fit planes, however in practice it is not
always the case.
     Fig. 12 depicts a visualization of DeepFit’s results on PCPNet point clouds.
Here the normal vectors are mapped to the RGB cube. Fig. 13 depicts a visualization of the angular error in each point for the PCPNet dataset. Here, the
points’ color correspond to angular difference, mapped to a heatmap ranging
from 0-60 degrees. It shows that for complex shapes with high noise levels, the
general direction of the normal vector is predicted correctly, but, the fine details
and exact normal vector are not obtained. For basic shapes the added noise does
not affect the results substantially. Most notably, DeepFit shows robustness to
point density corruptions.


<!-- PK PAGE 18 doc=math_p8 -->
18     Y. Ben-Shabat, S. Gould
Fig. 8: Normal estimation results for DeepFit and Jet on NYU Depth V2 dataset
for different neighborhoods sizes (128, 256, 512, 1024). The colors of the points
are normal vectors mapped to RGB and projected to the image plane.
Fig. 9: Principal curvature estimation results for DeepFit and Jet on NYU Depth
V2 dataset for different neighborhoods sizes (128, 256, 512, 1024). The colors of
the points correspond to their principal curvature values using the colormap in
the bottom-left corner and projected to the image plane.


<!-- PK PAGE 19 doc=math_p8 -->
DeepFit                     19
             1.0              No Noise                                          1.0                Low Noise                                       1.0             Medium Noise
             0.8                                                                0.8                                                                0.8
             0.6                                                                0.6                                                                0.6
PGP
                                                                   PGP
                                                                                                                                      PGP
             0.4                            DeepFit                             0.4                            DeepFit                             0.4                          DeepFit
                                            Lenssen et. al.                                                    Lenssen et. al.                                                  Lenssen et. al.
             0.2                            Nesti-Net                           0.2                            Nesti-Net                           0.2                          Nesti-Net
                                            PCPNet                                                             PCPNet                                                           PCPNet
             0.00       5   10     15   20        25          30                0.00        5    10       15   20    25          30                0.00        5    10   15    20     25          30
             1.0             High Noise                                         1.0        Variable Density: Gradient                              1.0        Variable Density: Striped
             0.8                                                                0.8                                                                0.8
             0.6                                                                0.6                                                                0.6
PGP
                                                                   PGP
                                                                                                                                      PGP
             0.4                            DeepFit                             0.4                            DeepFit                             0.4                          DeepFit
                                            Lenssen et. al.                                                    Lenssen et. al.                                                  Lenssen et. al.
             0.2                            Nesti-Net                           0.2                            Nesti-Net                           0.2                          Nesti-Net
                                            PCPNet                                                             PCPNet                                                           PCPNet
             0.00       5   10     15   20        25          30                0.00        5    10       15   20    25          30                0.00        5    10   15    20     25          30
Fig. 10: Comparison of the percentage of good points (PGP) metric for unoriented normal estimation of the proposed DeepFit to other deep learning methods
(PCPNet [9], Nesti-Net [3], Lenssen et. al. [13]). Here, α is the threshold for measuring the percentage of good points.
                                                                                                      .
$$
                                                                            n=1                 n=2            n=3                n=4
$$
                                 No Noise                                       10.0                  Low Noise                                                    Medium Noise
                                                                                                                                                   21
             8.0                                                                 9.8
                                                                                                                                                   20
angle RMSE
                                                                   angle RMSE
                                                                                                                                      angle RMSE
             7.5                                                                 9.6
                                                                                                                                                   19
             7.0
                                                                                 9.4                                                               18
             6.5
                                                                                 9.2                                                               17
             6.0
                   64        128                         256                           64         128                       256                          64        128                       256
                            Number of points                                                     Number of points                                                  Number of points
                              High Noise                                                   Variable Density: Gradient                                         Variable Density: Striped
                                                                                9.0                                                                9.5
             32
                                                                                8.5                                                                9.0
             30
angle RMSE
                                                                   angle RMSE
                                                                                                                                      angle RMSE
                                                                                8.0                                                                8.5
             28
                                                                                7.5                                                                8.0
             26
             24                                                                 7.0                                                                7.5
                   64       128                          256                          64          128                       256                          64         128                      256
                            Number of points                                                     Number of points                                                  Number of points
Fig. 11: Comparison of the angle RMSE metric for different DeepFit variants.
Ablations include different n-jet order (1, 2, 3, 4) and number of neighboring
points (64, 128, 256).
                                                                                                      .


<!-- PK PAGE 20 doc=math_p8 -->
20     Y. Ben-Shabat, S. Gould
Additional principal curvature estimation results. Fig. 14 qualitatively
depicts DeepFit’s results on the PCPNet dataset. For visualization, the principal
curvatures are mapped to RGB values according to the commonly used mapping
given in Fig. 5 i.e. both positive (dome) are red, both negative (bowl) are blue,
one positive and one negative (saddle) are green, both zero (plane) are white, and
one zero and one positive/negative (cylinder) are yellow/cyan. For consistency
in color saturation we map each model differently according to the mean and
standard deviation of the principal curvatures. Note that the curvature sign is
determined by the ground truth normal orientation. DeepFit’s normalized RMSE
metric is visualized in Fig. 15 as the magnitude of the error vector mapped to
a heatmap. It can be seen that more errors occur near edges, corners and small
regions with a lot of detail and high curvature. Moreover, these visualizations
show that for low noise levels, the principal curvature estimation is reliable, as
expected, the reliability declines with the insertion of high magnitude noise.
6.2   Efficiency
Table 3 shows a comparison between the number of parameters and run time
between different deep learning based normal estimation methods. It can be
seen that DeepFit has a significantly lower number of parameters compared to
Nesti-Net and PCPNet and more parameters than Lenssen et. al.. This gap in
the number of parameters can be explained by the lack of point structure in our
method while Lessen et. al. construct a graph. Constructing a graph introduces
a limitation with respects to the number of neighboring points, i.e. training and
testing has to be done on the same neighborhood size, using a PointNet architecture allows to train and test on different sizes of neighborhoods. DeepFit’s ,
number of parameters is mainly attributed to the PointNet transformation subnetworks. The reported run time is the average run time for a batch of size 64
(i.e. computing normals for 64 points simultaneously). We chose a batch of 64
in order to fairly compare to the more resource intensive methods (Nesti-Net).
Most methods, including ours, can compute in larger batches for faster performance, particularly Lenssen et. al. that are able to fit a full size point cloud
(100k points) in a single batch on the GPU.
                                                               Lenssen et.
           Method       Our DeepFit Nesti-Net [3] PCPNet [9]
                                                                 al. [13]
        Parameters         3.5M         179M         22M          7981
       Exec time (per
                          0.35ms        266ms       0.61ms       0.13ms
           point)
Table 3: Number of parameters and execution time performance for deep learning
normals estimation methods. Run time is averaged for batches of size 64.


<!-- PK PAGE 21 doc=math_p8 -->
DeepFit      21
Fig. 12: DeepFit’s normal estimation results for different noise levels (columns
1-4), and density distortions (columns 5-6). The colors of the points are normal
vectors mapped to RGB.


<!-- PK PAGE 22 doc=math_p8 -->
22     Y. Ben-Shabat, S. Gould
Fig. 13: Normal estimation error visualization for different noise levels (columns
1-4), and density distortions (columns 5-6). The colors of the points correspond
to angular difference, mapped to a heatmap ranging from 0-60 degrees. The
number above each point cloud is the RMSE.


<!-- PK PAGE 23 doc=math_p8 -->
DeepFit      23
Fig. 14: Curvature estimation results visualization. The colors of the points corresponds to the mapping of k1 , k2 to the color map given in Fig 5. Values in the
$$
range [−(µ(|ki |) + σ(|ki |)), µ(|ki |) + σ(|ki |)]|i=1,2 .
$$


<!-- PK PAGE 24 doc=math_p8 -->
24     Y. Ben-Shabat, S. Gould
Fig. 15: Curvature estimation error results. The numbers under each point cloud
are its RMSE and normalized RMSE. The color corresponds to the L2 norm of
the error vector mapped to a heatmap ranging from 0-5.
<!-- PK END doc=math_p8 -->
