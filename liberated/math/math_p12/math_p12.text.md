PKvNext Document

KEY: math_p12 | math |  | 30a73391 | 15 | /papers/Deep_learning_assisted_Volume_Visualization.pdf
<!-- PK START doc=math_p12 -->


<!-- PK PAGE 1 doc=math_p12 -->
See discussions, stats, and author profiles for this publication at: https://www.researchgate.net/publication/322612433
Deep-Learning-Assisted Volume Visualization
Article in IEEE Transactions on Visualization and Computer Graphics · January 2018
DOI: 10.1109/TVCG.2018.2796085
CITATIONS                                                                                         READS
46                                                                                                821
7 authors, including:
            Hsueh YA Chien                                                                                   Kedar Narayan
            beautynology                                                                                     NCI-Frederick
            15 PUBLICATIONS 342 CITATIONS                                                                    152 PUBLICATIONS 2,218 CITATIONS
               SEE PROFILE                                                                                      SEE PROFILE
            Sriram Subramaniam
            University of British Columbia
            325 PUBLICATIONS 16,772 CITATIONS
               SEE PROFILE
 All content following this page was uploaded by Kedar Narayan on 14 November 2020.
 The user has requested enhancement of the downloaded file.


<!-- PK PAGE 2 doc=math_p12 -->
1
       Deep-learning-assisted Volume Visualization
    Hsueh-Chien Cheng, Antonio Cardone, Somay Jain, Eric Krokos, Kedar Narayan, Sriram Subramaniam,
                                    Amitabh Varshney Fellow, IEEE,
       Abstract—Designing volume visualizations showing various structures of interest is critical to the exploratory analysis of volumetric
       data. The last few years have witnessed dramatic advances in the use of convolutional neural networks for identification of objects in
       large image collections. Whereas such machine learning methods have shown superior performance in a number of applications, their
       direct use in volume visualization has not yet been explored. In this paper, we present a deep-learning-assisted approach that uses a
       convolutional neural network to generate high-level, data-driven representations to distinguish various complex structures, which are
       challenging for conventional approaches based on handcrafted features calculated locally. A significant challenge in designing volume
       visualizations based on the derived high-dimensional deep features lies in efficiently handling the immense amount of information that
       deep learning methods provide. To this end, this paper presents two contributions: 1) a technique that uses spectral methods to
       organize the high-dimensional features into an accessible form that facilitates users’ interactions with the visualization through a simple
       design widget, and 2) a semi-automatic hierarchical exploration of volumetric data. We have validated our approach on two electron
       microscopy volumes and one magnetic resonance imaging dataset.
       Index Terms—Volume visualization, convolutional neural networks
                                                                                F
1     I NTRODUCTION
D      EEP learning and, more specifically, convolutional neural
       networks (CNNs) have received much attention in various
fields including image classification [1], face recognition [2], [3],
                                                                                    addressing the relationships among voxels in a larger context,
                                                                                    which is crucial to characterizing complex structures.
                                                                                        Although the high structural complexity significantly hinders
and segmentation [4], [5]. Given raw images as input, a CNN                         the manual search for suitable feature spaces in the second step of
progressively builds its final outcome by sequentially propagat-                    the current visualization workflow, users can still provide valuable
ing responses from one neural network layer to the next. The                        domain knowledge in a different way. From a machine learning
hierarchical architecture of CNNs mimics the multiscale process                     point of view, the criteria that distinguish different structures can
of human visual system that aggregates lower-level signals into                     be implicitly defined by a large number of examples that include
higher-level concepts. A CNN can therefore learn, by iteratively                    as many structural variants as possible. In this work we train
fitting the network to the data, useful application-dependent repre-                a CNN as if we were solving a classification problem based
sentations [2], [6] that facilitate the search for solutions to complex             on the given examples. After training, the CNN automatically
problems.                                                                           derives a feasible high-level data representation, thus creating a
     The success of volume visualization relies heavily on appro-                   feasible feature space for the visualization of complex structures.
priate voxel representations. Creating volume visualizations in                     Despite improvements in user interfaces [11], [12], [13] and
general requires three steps, each involving various degrees of                     semi-automatic techniques [14], [15], current methods proceed
human intervention. First, users define the criteria (e.g. intensity                with the assumption that a suitable feature space is explicitly
and texture) that distinguish the structures of interest (e.g. soft tis-            defined, not automatically learned. In contrast, the proposed deepsue and bone). Second, based on these user-defined criteria, users                  learning-assisted approach automatically creates a feasible highchoose a suitable voxel representation that forms the feature space                 dimensional feature space in a data-driven way without explicit
to search for solutions (i.e. visualizations). Finally, users interact              specifications from users.
with the visualization tool to create and modify the solutions.                         In the derived feature space, voxels with similar characteristics
In the past, handcrafted features that correspond to specific user-                 are in close proximity. These similar voxels can therefore be
defined criteria (e.g. size [7], [8], texture [9], and visibility [10])             described and selected for visualization with a representative
have been successfully applied as the voxel representation in the                   characteristic feature vector, which essentially defines a point
second step. Nevertheless, as the complexity of criteria grows,                     in the high-dimensional space. Nevertheless, the characteristic
finding features that precisely describe the characteristics of target              feature vector will soon become too complicated to maneuver as
structures is increasingly challenging. Conventional handcrafted                    its dimensionality grows. Previous work alleviates this problem
features no longer suffice because they are defined locally without                 by designing visualizations in a reduced space with manageable
                                                                                    complexity [12], [16]. In this work we present two techniques
•    H.-C. Cheng, S. Jain, E. Krokos, and A. Varshney are with the Department
                                                                                    for this usability problem. The first one reorders the features with
     of Computer Science, University of Maryland, College Park, MD, 20742.          respect to their similarity. With this improved, similarity-aware
     E-mail: {cheng, somay, ekrokos, varshney}@cs.umd.edu                           feature layout, the conventional design widget can select groups
•    A. Cardone and A. Varshney are with the University of Maryland Institute       of similar voxels in the original space without reduction, thus
     for Advanced Computer Studies, College Park, MD, 20742.
     E-mail: {cardone, varshney}@umiacs.umd.edu                                     providing a complementary strength to the dimension reduction-
•    K. Narayan and S. Subramaniam are with the Center for Molecular                based techniques. The second one is a semi-automatic technique
     Microscopy, NCI, NIH, Bethesda, MD, 20850.                                     that generates a hierarchy of volume visualizations for users to
     E-mail: {narayank, subramas}@mail.nih.gov
                                                                                    choose from, thus providing another layer of abstraction on top of


<!-- PK PAGE 3 doc=math_p12 -->
2
the high-dimensional feature space.                                            AlexNet [1] is one of the most recognized contributions in
    In addition to the aforementioned usability issue, we follow           image classification and has become the standard benchmark
the indirect volume rendering framework and design a method to             algorithm. AlexNet contains five convolutional layers followed by
extract surfaces from voxels defined in a high-dimensional feature         two fully-connected layers, and three max-pooling layers mixed
space. We first convert the feature space to a binary scalar field         in between. The last fully-connected layer then connects to the
and then extract a triangular mesh from that binary scalar field           output consisting of 1000 neurons, one for each target class.
using the conventional marching cubes algorithm [17]. Similar to               Most ordinary CNN architectures more or less resemble the
the conventional method, the binary scalar field is obtained by            basic construct of AlexNet but differ in depth. For example,
thresholding an intermediate scalar field, which is controlled by          GoogLeNet [18] has 22 trainable layers, much deeper than
users through the design widget. This conversion can be done               AlexNet, which has seven trainable layers. At this scale of depth,
efficiently in a GPU with little computational overhead.                   kernel sizes have to be kept small to maintain a manageable model
    Although modern rendering techniques and hardware can now              complexity. This limitation in kernel size does not restrict the
render volumetric data interactively, we still need a suitable feature     power of CNNs. In fact, deliberately stacking multiple convoluspace that differentiates target structures and an easy way for users      tional layers with small kernels leads to a large receptive field,
to interactively build the solutions. Whereas there will always be a       which is comparable to that of a large kernel but with fewer
need for users to adjust the visualization results for visual appeal       parameters [19]. Although research in complex problems tends
manually, this paper presents our initial explorations in using deep       to create deeper networks, simply stacking convolutional layers
learning methods to assist the design of volume visualizations.            in a CNN does not always lead to better performance because
We expect that the techniques proposed in this work will be                of the increased model complexity. Addressing the deficiency
useful in many visual computing tools in creating informative              of conventional CNNs, a 152-layer residual network [20] shows
visualizations.                                                            significant improvement over the state-of-the-art architectures.
    In summary, the contributions of this work are:                            Given a sequence of training examples, the training procedure
                                                                           starts with a forward pass through the network, calculates a loss
      •    A deep-learning-assisted approach to automatically derive
                                                                           value with respect to certain criteria, and then adjusts the weights
           high-level features based on information extracted from a
                                                                           associated with the neurons in the network accordingly by the
           larger context than conventional local features.
                                                                           backpropagation algorithm. Training a CNN appropriately can
      •    Based on the high-dimensional abstract feature space, a
                                                                           be challenging because of problems such as overfitting and pre-
           feature reordering technique that groups similar features
                                                                           mature convergence, which deteriorate performance significantly.
           together to facilitate manual visualization design and
                                                                           Dropping connections between random neurons (i.e. removing
           a semi-automatic technique to allow hierarchical explo-
                                                                           them from the network temporarily) avoids co-adaptations among
           ration.
                                                                           them [21], thereby reducing the chance of overfitting but also
      •    A method that converts a high-dimensional feature space
                                                                           slowing down convergence. The slow convergence of CNNs is
           to a binary scalar field that can be used as the input to the
                                                                           partly due to the frequent changes in the distribution of a layer’s
           conventional marching cubes algorithm.
                                                                           input during training. Batch normalization [22] addresses this
    In this paper, we first review the existing work on CNNs               problem by normalizing each feature independently to have a zero
and volume visualization design in Section 2. In Section 3 we              sum and unit variance distribution.
introduce major components in our visualization tool, starting
from extracting useful high-level features with a trained CNN
                                                                           2.2   Volume visualization
to the marching cubes-based rendering, feature reordering, and
semi-automatic exploration. In Section 4 we present the results            Typical volume rendering techniques can be grouped into two
of applying our method to three volumetric datasets. Finally, we           categories: direct and indirect volume rendering. Direct volume
summarize our approach and provide future research directions in           rendering (DVR) techniques, such as volume ray-casting [23],
Section 5.                                                                 compose a result image by aggregating the colors and opacities of
                                                                           relevant voxels calculated using a user-defined transfer function.
                                                                           Indirect volume rendering (IVR) techniques first generate geomet2         R ELATED W ORK                                                   ric primitives as an intermediate representation and then render
2.1       Convolutional neural networks (CNNs)                             those primitives using conventional 3D computer graphics. For
The basic components of a conventional feedforward CNN include             example, the marching cubes algorithm [17] extracts a triangular
convolutional layers, spatial pooling layers, and fully-connected          mesh that represents an isosurface in a structured grid.
layers. A convolutional layer filters an input tensor with trainable           Despite different ways in composing result images, DVR
kernels, which combine neurons in a fixed receptive field. The             and IVR techniques all require a feature space suitable for the
size of receptive fields directly affects the number of trainable          visualization criteria. Simple structures that are distinguishable by
parameters. A spatial pooling layer outputs an aggregation of              intensity values can be extracted and visualized as corresponding
nearby neurons with a predefined operator. For example, a max-             isosurfaces [17] following the IVR framework. Nevertheless, in
pooling layer outputs the maximum value within a small neighbor-           many applications the complex structures and their surroundings
hood. A fully-connected layer connects every input neuron with             are indistinguishable based on a single isovalue. In these cases the
the output neurons, disregarding their spatial proximity. The raw          target structures may be better extracted as subvolumes composed
output values of neurons in convolution layers and fully-connected         of voxels with intensity values contained in an interval [24], [25].
layers are usually transformed by an activation function (usually              Whereas typical IVR techniques extract geometric primitives
non-linearly) into the result signals, representing the activation         from a scalar field formed by intensity values, DVR techniques
level of neurons.                                                          rely on a transfer function, sometimes defined in an alternative


<!-- PK PAGE 4 doc=math_p12 -->
3
                                                                                                                                 Configuration
feature space derived from intensity, to assign distinct colors and
                                                                                                    Gradient
                                                                                                e
                                                                                             tur
opacities to different structures. Common features such as gradient                               Intensity
                                                                                                            ...
                                                                                            Tex
                                                                                                    Shape
magnitude [11] and curvature [26] allow distinguishing regions
with significant local changes in intensity. Other specialized
features are used for structures with specific characteristics. For
example, twenty texture features have been used to identify voxels
with texture differences [9]. Evaluating the size of structures in                   Volumetric data                                             Visualization
scale-space at each voxel creates a scale field that can be used                                               (a) Conventional workflow
                                                                                           High-dimensional abstract space                  Configuration
to highlight structures of different sizes [7]. An alternative way
to assess structure sizes is by searching in all directions for
neighboring voxels with similar intensities [8].
    Whereas most volume visualizations are done manually, semiautomatic techniques automate specific time-consuming procedures to accelerate the design. Candidate isosurfaces that correspond to meaningful structure boundaries can be selected automat-        Volumetric data                                                                         Visualization
ically based on gradient magnitudes [27]. Exploiting the proximity                                                (b) Proposed workflow
of voxels in the feature space, many semi-automatic techniques
use clustering algorithms to group similar voxels, thus reducing         Figure 1. (a) Conventional workflow requires users to adjust both the
                                                                         feature space and the configuration. (b) Our deep-learning-assisted
the complexity of visualization design [14], [15].                       approach derives from labeled examples a feasible feature space au-
    A prerequisite of successful volume visualizations, including        tomatically, effectively removing the need for an user-defined feature
those created by semi-automatic techniques, is that the selected         space.
feature space must differentiate the target structures. Finding such
a feature space is therefore critical for volume visualization design.
Nevertheless, existing feature spaces, including those formed by         tissue and bone) are distinguishable by their distinct intensity valtexture features, are too local to reliably differentiate complex        ues. This characteristic allows conventional intensity-based feature
structures when given only limited context around each voxel.            spaces to separate these structures effectively. For example, the
In this work, we address this limitation by forming a feature            boundaries of bone may correspond well to a certain isosurface.
space based on high-level features extracted automatically from          With other modalities, such as electron microscopy, the type of
a trained CNN. Based on the derived feature space, we then create        structures to which a voxel belongs is seldom decided solely by the
visualizations following the IVR framework.                              voxel’s intensity value without consulting the arrangement of the
                                                                         neighboring voxels. High intra-class variations further complicate
                                                                         the decision. In addition, gradient only describes local changes in
3     M ETHODOLOGY                                                       intensity values and lacks the capability in depicting the boundary
3.1   Motivation                                                         of complex structures. As a result, intensity and gradient do not
Visualization is crucial to the analysis of volumetric data yet          provide enough information for designing informative visualizait’s design remains labor-intensive. Conventional design workflow        tions for complex structures.
assumes a feasible feature space with which users, after some trial          For example in Figure 2 we compare the meshes formed by
and error, will eventually find configurations suitable for the target   the groundtruth labels of mitochondria (Figure 2b), generated
structures. Nevertheless, so far the feature space is always hand-       using the conventional marching cubes algorithm (Figure 2c), and
crafted with respect to specific application-dependent criteria. This    generated using our deep-learning-assisted approach (Figure 2d)
manual procedure limits the feature space to incorporate only local      for the hippocampus dataset (c.f. Section 4.2). Although the mifeatures because of the limited capability of human to comprehend        tochondria are typically low in intensity, many non-mitochondria
and integrate non-local properties defined in high-dimensional           voxels, for example those belonging to the membranes, are also
spaces. As structural complexity grows, the assumption of having         low in intensity (Figure 2a). As a result the isosurface of isovalue
a feasible feature space is increasingly unrealistic. When the           112, which is close to the average intensity value of mitochonvisualization result does not suffice, users are faced with the non-     dria, does not map precisely to boundaries of mitochondria, thus
trivial choice to modify the feature space, the configuration, or        creating an incomprehensible visualization with severe occlusions
both in the worst case (Figure 1a).                                      of various structures. In contrast, our derived feature space leads
     This observation motivates our deep-learning-assisted ap-           to a visualization of mitochondria comparable to the groundtruth
proach that learns a feasible feature space automatically when           labels.
provided enough examples of the target structures. This approach             The previous example shows the deficiency of conventional
adopts a workflow that effectively replaces the manual search of a       feature spaces in depicting complex structures. In fact, a significant
feasible feature space by the concrete labeling of samples followed      overlap of the two types of voxels (i.e. mitochondria and nonby deep learning (Figure 1b). In contrast to crafting features in a      mitochondria) in the intensity histogram confirms that we cannot
high-dimensional abstract space, the labeling task is much easier        obtain clear boundaries using a different isosurface (Figure 3a).
for typical users, who are domain experts familiar with the data         Adding gradient magnitude as a second dimension does not
but have limited knowledge about computational techniques.               improve separation in the density plot either (Figure 3b). Besides
                                                                         intensity and gradient magnitude, Haralick features [28], a set
3.1.1 Conventional volume visualization design                           of texture features calculated from a small local neighborhood,
With imaging modalities such as X-Ray and computed tomogra-              also lack the power in depicting mitochondria although they have
phy, structures of different intrinsic material densities (e.g. soft     been successful for other structures in computed tomography


<!-- PK PAGE 5 doc=math_p12 -->
4
                                                                                                   0.040
                                                                                                                                                              Non-mitochondria
                                                                                                   0.035                                                      Mitochondria
                                                                                                   0.030
                                                                                                   0.025
                                                                                      Proportion
                                                                                                   0.020
                                                                                                   0.015
                                                                                                   0.010
                                                                                                   0.005
                                                                                                   0.000
                                                                                                                      0    50         100               150       200       250
                                                                                                                                            Intensity
                                                                                                                                (a) Intensity histogram
            (a) Raw image                       (b) Groundtruth                                                  35
                                                                                                                                                              Non-mitochondria
                                                                                                                 30                                           Mitochondria
                                                                                            Gradient Magnitude
                                                                                                                 25
                                                                                                                 20
                                                                                                                 15
                                                                                                                 10
                                                                                                                  5
                                                                                                                  0
                                                                                                                      0    50         100               150       200       250
                                                                                                                                            Intensity
                                                                                                        (b) Density plot of intensity and gradient magnitude
                                                                                                                 10
                                                                                                                                                              Non-mitochondria
                                                                                                                                                              Mitochondria
$$
    (c) Isosurface (isovalue = 112)          (d) Our visualization                                                5
$$
Figure 2. (a) In the hippocampus dataset, we find it challenging to differ-
                                                                                        PC 2
                                                                                                                  0
entiate mitochondrial regions (orange) from non-mitochondrial regions
using conventional intensity-based feature spaces. (b) The groundtruth                                            5
mitochondria. (c) The isosurface of isovalue 112, which is the average
intensity value of mitochondria, does not correspond well to the bound-
                                                                                                                 10
ary of mitochondria. (d) Our visualization result is comparable to the                                                10        5               0             5                  10
                                                                                                                                              PC 1
groundtruth because it is based on a feasible feature space derived
automatically.                                                                                      (c) Density plot of seven Haralick features after PCA
                                                                              Figure 3. (a) The overlap in the intensity histogram shows that we cannot
                                                                              extract the mitochondria precisely by using a different isosurface. The
and magnetic resonance images [9]. Here we calculate seven                    density plots, in which higher saturation indicates higher density, show
Haralick features (i.e. energy, inertia, inverse difference moment,           that (b) intensity and gradient, and (c) seven selected Haralick features
entropy, correlation, contrast, and sum of entropy) with the same             do not help extract the mitochondria either. The seven Haralick features
configuration used in [9]. After projecting the voxels onto 2D                are projected onto the first two principal components, “PC 1” and “PC 2”,
                                                                              obtained using principal component analysis.
using principal component analysis, the large overlapping near the
center shows that the selected Haralick features do not separate
the mitochondria from the rest of the image (Figure 3c).                      during rendering. The extracted deep features correspond to much
                                                                              higher level concept when compared with local features such as
3.1.2 Deep-learning-assisted visualization design                             gradient magnitude or textures, thus improving their capability in
Previous studies on the hippocampus dataset have shown that                   discerning complex structures.
features depicting both the complex shape of the mitochondria                     Based on the derived feature space, we address practical
and the contextual information around voxels perform better in                issues when creating volume visualizations using deep features
segmentation [29]. If we were to apply the conventional design                (bottom of Figure 4). Even for moderate-sized volumetric data, the
workflow to create visualizations that show mitochondria and                  high dimensionality of features could be overwhelming because
other complex structures presented in this paper, users would                 of the limited memory available to a GPU. Therefore, we use
need to define such sophisticated features themselves. Although               vector quantization to compress the features to a manageable size.
there may exist a combination of novel and established features               Furthermore, because the features that form the high-dimensional
properly configured for those specific targets, searching manually            feature space are not independent, we apply a spectral method to
for that combination is time-consuming and challenging. On the                reorder them. After feature reordering users can easily change the
contrary, our proposed approach uses a CNN to perform that                    visualization by modifying a characteristic feature vector through
search effectively and automatically. Users can therefore focus on            a simple design widget. We also use a semi-automatic method to
creating useful volume visualizations based on the derived feature            accelerate the design of volume visualization by pre-generating a
space.                                                                        tree of visualizations, with which users can explore the volumetric
     Our deep-learning-assisted approach extracts high-level fea-             data hierarchically and interactively.
tures (i.e. deep features) from a trained CNN (top of Figure 4). We
first train the proposed CNN as if we were solving a voxel-wise
classification problem. Because CNNs are powerful in finding                  3.2   Learning high-level features
suitable application-dependent features, we use those features                The high-level features are extracted from a CNN, which contains
to distinguish voxels that belong to various complex structures               three groups of convolutional layers (Table 1). In each group, we


<!-- PK PAGE 6 doc=math_p12 -->
5
                               Patches                Trained CNN                3.2.1 Convolutional layers
     Volumetric                                                                  A convolutional layer slides k trainable kernels Wm,k over the
$$
        data                                                                     input 3D tensor U of size x × y × m, where x and y correspond
$$
                                                                                 to the spatial dimensions, and m denotes the number of input
         Vector quantization                                                     feature maps (or, channels). The layer outputs a 3D tensor V ,
                                                  High-level features
                                                                                 which is connected to the next layer. The i-th output feature map
$$
          A                   B                                                  Vi is calculated as Vi = ∑m Wm,i ∗ Um + bi , where bi denotes the
$$
                                                                                 associated bias term. The convolution can be selectively applied
                                          Index: 1 2 3 ...                       to neurons separated by a predefined distance referred to as
                  C                                                              stride. Here the first convolution uses a stride of two, resulting
                                            Characteristic feature vector
                                                               Interpolate
                                                                                 in a reduction in spatial dimension by half. The output of a
                 Centroids                                                       convolutional layer is always subjected to an activation function,
     A
     B                                                                           which we will introduce next.
     C
         1 2 3                                        1 3       2                3.2.2 Activation function
                                            Spectrally-ordered features          An activation function transforms the values in the i-th feature
                                                                                 map Vi into corresponding activation signals. This bio-inspired
                                                                                 function simulates the activation of neurons by electron signals.
                                                                                 For all convolutional layers and the first fully-connected layer,
                                                                                 we use Parametric Rectified Linear Unit (PReLU) [30], which
                                                                                 learns for the i-th feature map a coefficient ai and scales the value
$$
                                          Marching cubes-based rendering         by ai if the value is negative. When ai = 0, PReLU reduces to
$$
    Semi-automatic exploration                                                   the conventional rectified linear unit, which sets all the negative
                                                                                 values to zero. For the second fully-connected layer, we apply the
Figure 4. Our proposed deep-learning-assisted approach first extracts            soft-max function to calculate the predicted probability of voxel
high-level features from a trained CNN. We then use vector quantization
to encode the extracted high-dimensional features of each voxel by               classes.
the nearest centroid found using k-means clustering. Users modify the
visualization result, which is generated by a marching cubes-based               3.2.3 Max-pooling layers
rendering, either by editing the characteristic feature vector of a target
subvolume or exploring a pre-generated subvolume hierarchy semi-
                                                                                 Max-pooling layers output the maximum of nearby neurons by
automatically.                                                                   scanning the input. This layer is not trainable and is used to reduce
                                                                                 the number of parameters in subsequent layers by setting a stride
                                                                                 larger than one, thereby reducing the spatial dimension. Here we
$$
                                     Table 1                                     use max-pooling with a 2 × 2 window and a stride of two to reduce
$$
                      The architecture of our proposed CNN                       the spatial dimension by half after each group of two convolutions.
         Layer                #channels   #neurons       Kernel       stride     3.2.4 Training
$$
         Convolutional              64      32 × 32          3×3             2   The training data to the CNN is a 65 × 65 patch centered at
$$
$$
         Convolutional              64      32 × 32          3×3             1   each voxel sample selected at random. We draw 400, 000 voxels
$$
$$
         Max-pooling                64      16 × 16          2×2             2
$$
                                                                                 divided equally among the classes to avoid the majority class from
$$
         Convolutional              64      16 × 16          3×3             1   dominating other classes during training. We use a batch size of
$$
$$
         Convolutional              64      16 × 16          3×3             1
$$
                                                                                 200 and train a total of 60, 000 iterations. After 2, 000 iterations
$$
         Max-pooling                64        8×8            2×2             2
$$
                                                                                 the training set is resampled to learn from diverse examples. We
$$
         Convolutional              64        8×8            3×3             1
$$
                                                                                 use ADADELTA solver [31] with a momentum of 0.9 and a decay
$$
         Convolutional              64        8×8            3×3             1
$$
$$
         Max-pooling                64        4×4            2×2             2   of 0.0005 during training.
$$
                                                                                     The input volume is padded with reflection about the edges
$$
         Fully-connected                       200           1×1
$$
$$
         Fully-connected                   #classes          1×1                 before generating patches to accommodate for boundary cases
$$
                                                                                 where the sampled voxel is near an edge. Because the structures of
                                                                                 interest in the target datasets are rotation-invariant, such padding
                                                                                 affects minimally the performance of the CNN.
$$
stack two convolutional layers with 3 × 3 kernels to resemble
$$
$$
the reception field of a 5 × 5 kernel but with fewer trainable                   3.2.5 Class imbalance
$$
parameters. We perform batch normalization for all the convo-                    The CNN trained with balanced classes tends to overestimate the
lutional layers. Also, we use dropout [21] with a probability of 0.5             probability of the minority class in the testing stage because of the
for the first fully-connected layer. The first fully-connected layer             significant disparity in abundance between the training data, which
contains 200 neurons, which connect to neurons in the second                     contain equal amounts of samples among voxel classes, and the
fully-connected layer. Each neuron in the second fully-connected                 testing data, which would have the actual class distribution. Such a
layer corresponds to an individual class in the data. We chose the               class imbalance is increasingly problematic as the disparity grows.
values of parameters based on the results of our preliminary study                   Because the degree of class imbalance in the datasets we
conducted using the target datasets. For other datasets, we may                  used is moderate, a simple way to address this problem is by
need to adjust these parameters depending on the complexity of                   multiplying the predicted probability of each class by the cortarget classes for better performance.                                           responding prior probability, thereby scaling down the predicted


<!-- PK PAGE 7 doc=math_p12 -->
6
probability of the minority class. We have also implemented the            to allow the query of a triangle’s location in the volume, and the
postprocessing technique used in [4], which finds a monotonic              query of the triangle indices (if any) inside of a specific cube.
cubic polynomial to match the predicted probability and the prior          In a histogram pyramid, each space-partitioning square cell stores
probability. Instead of having a constant scaling factor (i.e. the         the number of triangles in the corresponding partition. The levels
class prior), this technique transforms the predicted probability in       from the bottom to the top of the pyramid represent the volumetric
a data-driven way that allows the setting of variable scaling factors      data at increasingly lower spatial resolutions. When constructing
with respect to the probability values.                                    the pyramid, a cell stores the sum of eight corresponding cells
$$
                                                                           (i.e. 2 × 2 × 2) in the previous (bottom) level. Both queries require
$$
3.3   Marching cubes-based rendering                                       a top-down traversal of the pyramid, which only takes a constant
We adapt the conventional marching cubes algorithm [17], which             time that is logarithmic to the size of spatial dimension (or linear to
extracts isosurfaces from a scalar field (e.g. intensity), to instead      the height of pyramid). For visual appeal we smooth the extracted
extract surfaces based on a high-dimensional feature space. Given          triangular mesh by moving each vertex to the average location of
an isovalue, the conventional method converts the input scalar             its adjacent vertices in the mesh. During mesh smoothing the query
field into a binary one using the isovalue as a threshold, which           of adjacent vertices is done by first fetching a list of triangles in the
essentially defines the cut-off value of two target structures. The        current cube and its neighboring cubes (through the second type
marching cubes algorithm then iterates over the set of cubes, each         of queries) and then inspecting each edge of the fetched triangles.
represented by the values of its eight bounding voxels in the binary       We use two vertex buffers to store vertex positions before and after
scalar field, and accumulates the corresponding triangles based on         the smoothing. After each smoothing iteration, we swap the two
the eight bits representation. Because in this work the input is a         vertex buffers to avoid expensive data movement.
multiscalar field formed by the high-dimensional feature space,
we describe in the following a method that converts the input              3.4   Reordering high-dimensional features
multiscalar field to a binary scalar field with which the marching
                                                                           The order of features in conventional volume visualization designs
cubes algorithm can extract surfaces as usual (Figure 5).
                                                                           is usually straightforward and less of a concern because of the
                                                      0                0
                                                                           low dimensionality of feature spaces. Nevertheless, the high-level
                                                                           features extracted from the CNN are 200-dimensional. Further,
       Characteristic feature vector        0                      1
                                                                           some, but not all, of the extracted features could be closely related
                                                                           to each other. If two unrelated features (e.g. i- and j-th feature) are
           ui ui+1                                                         in close proximity along the x-axis of the design widget (left of
$$
                     u = (u1 u2 ... u200)                                  Figure 5), assigning different weights to them in the characteristic
$$
                                                      0                0
                                                                           feature vector (e.g. ui and u j ) may be difficult. In the worst case,
                                                                           such overhead could even overshadow the benefits of applying the
                            u .v > t        1                      0
                                                                           deep-learning-assisted approach.
$$
                                            v = (v1 v2 ... v200)               We address the relationships among features by reorganizing
$$
                                                Feature vector
                                                                           them using spectral ordering, which sorts the features by the
Figure 5. Because the high dimensionality of feature space, we generate    eigenvector of the second smallest eigenvalue of a graph Laplaa binary scalar field by comparing the dot product of the characteristic   cian [33]. We start with a feature-by-voxel matrix M and compute
feature vector u and the feature vector v of each voxel with a threshold   a similarity (adjacency) matrix A by multiplying the matrix by its
t. After that we apply the conventional marching cubes algorithm on the
binarized volume.
$$
                                                                           transpose, resulting in a feature-to-feature matrix: A = MM > .
$$
                                                                               Next, a diagonal matrix D is created by calculating the sum
    Assuming that each voxel is represented by a 200-dimensional           of the i-th row in the similarity matrix A and placing it at D(i, i).
$$
feature vector v = (v1 v2 · · · v200 ), we can decide whether two          The Laplacian matrix L is then calculated as L = D − A. Finally,
$$
voxels belong to the same structure by calculating their dot product       the normalized Laplacian matrix L , which is more robust to non-
                                                                                                                            1      1
$$
and compare it with a threshold t. Following the same intuition,           regular graphs [34], is calculated as L = D− 2 LD− 2 .
$$
we can also decide whether a voxel belongs to a user-defined                   Based on the normalized Laplacian matrix L , we calculate
structure, which is specified by a characteristic feature vector           the eigenvector associated with the second smallest non-negative
$$
u = (u1 u2 · · · u200 ). The value of a voxel v in the binary scalar       eigenvalue (the Fiedler vector). After calculating the Fiedler vecfield, used as the input for the marching cubes algorithm, is              tor, we sort the original ordering of features in the input matrix
$$
calculated as:                                                             M using the values in the Fiedler vector. The result is an ordering
                                   (
$$
                                    1, if u · v ≤ t                        of features where neighboring features are similar. The Fiedler
$$
$$
                        f (u, v) =                               (1)       vector and other eigenvectors associated with small eigenvalues
$$
                                    0, otherwise.
                                                                           also form the basis of spectral clustering [35].
The extracted surface changes with the (binary) value of f (u, v),             We use the following example to show the effect of organizing
which is controlled by the characteristic feature vector u and the         deep features into the spectral order (Figure 6). A bright pixel in
$$
value of threshold t. Users can interactively configure u and t as         the 200 × 200 similarity matrix marks a pair of highly-correlated
$$
well as the color and opacity of the corresponding surface (used           features (Figure 6a). Many pairs of the 200 features are indeed
for blending multiple semi-transparent surfaces) using the design          highly correlated because many pixels are bright. Nevertheless,
widget.                                                                    an arbitrary order of features does not take advantage of such
     The marching cubes algorithm is highly parallelizable because         correlations, resulting in a disorganized similarity matrix (left of
each cube can be processed independently. Our GPU-based paral-             Figure 6a). The spectrally ordered similarity matrix puts similar
lel implementation uses the histogram pyramid data structure [32]          features closer together, resulting in large bright blocks of various


<!-- PK PAGE 8 doc=math_p12 -->
7
                                                                                 80 gigabytes of memory per hundred million voxels. The high
                                                                                 storage demand far exceeds the capability of modern consumer-
                                                                                 level graphic cards.
                                                                                      Possible solutions to this problem are out-of-core rendering
                                                                                 and data compression. For simplicity, we use vector quantization
                                                                                 (VQ) to compress the high-dimensional feature vector v. We use
                                                                                 an incremental k-means algorithm [36] to find Nc voxel clusters
                                                                                 (i.e. code words in the codebook). Each voxel is encoded by
                                                                                 the index of the nearest cluster centroid according to the L2
                                                                                 distance. During rendering, voxels are decoded by referencing the
      (a) Similarity matrix (Left: arbitrary order. Right: spectrally ordered)   codebook.
                                                                                      Reconstruction using VQ, which is a lossy compression tech-
                                                                                 nique, inevitably introduces information loss. The codebook size
                                                                                 Nc is closely related to the reconstruction error of VQ. Choosing
                                                                                 a Nc too small will lead to excessive information loss such that
                                                                                 the reconstructed feature vectors (i.e. the cluster centroids found
$$
                   (b) Characteristic feature vector (t = 0.65)                  by k-means) do not well approximate the actual feature vectors.
$$
                                                                                 On the other hand, choosing a Nc too large will inflate the size
                                                                                 of codebook and require much more computation. A similar
                                                                                 information loss introduced by dimension reduction techniques
                                                                                 has been shown to be tolerable when simplifying the feature space
                                                                                 of volume rendering [12], [16]. In the following we will evaluate
                                                                                 how information loss affects the quality of visualizations created
                                                                                 using our deep-learning-assisted approach.
                                                                                      In Figure 7 we visually evaluate the quality of the visualization
                                                                                 results with various codebook sizes Nc . In this example we use
        (c) Visualization (Left: arbitrary order. Right: spectrally ordered)     a subvolume containing a sporulating bacterium of the bacteria
Figure 6. (a) Before spectral ordering, the similarity matrix, in which          dataset (Figure 7a). By comparing the results shown in Figure 7b–
a bright pixel represents a pair of highly-correlated features, does             7e, the only visually apparent difference is near the center of the
$$
not show apparent pattern. After spectral ordering, highly-correlated            spore, where a small region is excluded from the spore, when Nc =
$$
features are closer to each other. (b) A simple characteristic feature
vector. (c) The arbitrary order of features does not exploit the correlation
                                                                                 64 (black box in Figure 7b); the other three results are comparable
among features, thus leading to broken surfaces. The spectrally ordered          despite the difference in Nc (Figure 7c–7e). Throughout this work,
$$
features allow creating a visualization that reveals interesting structures      we choose Nc = 256 such that the code can be stored in eight bits,
$$
using the same characteristic feature vector.                                    exactly the same size as the intensity values.
sizes along the diagonal (right of Figure 6a). An accessible feature
order therefore allows selecting similar voxels using fewer control
points in the design widget.
    Reordering features into this accessible form is a crucial
$$
step. In this example, we use the same characteristic feature                                                         (b) Nc = 64          (c) Nc = 128
$$
vector, which simply specifies an increasing weight from the first
(leftmost) to the last (rightmost) feature (Figure 6b), and compare
the visualization results obtained before and after reordering
$$
features. An arbitrary feature order does not exploit the similarity                (a) Visualization (Nc = 256)
$$
$$
among features and creates surfaces that are broken into small                                                       (d) Nc = 256          (e) Nc = 512
$$
pieces, which do not correspond well to specific structures (left of
Figure 6c). In contrast, the spectrally ordered features are highly              Figure 7. The size of codebook Nc in VQ controls the amount of infor-
                                                                                 mation loss. The zoom-in views shown in (b–e) are generated from the
structured such that even a simple characteristic feature vector can             same subvolume (red box in (a)) in the bacteria dataset with Nc ranges
$$
reveal some interesting structure (right of Figure 6c).                          from 64 to 512. When Nc = 64, the view shows a noticeable disparity
$$
                                                                                 near the center of the spore (black box in (b)). The results in (c–e) are
                                                                                 comparable without significant visual differences.
3.5     Feature compression
Interactive rendering of volumetric data based on high-                              In some cases where an outlier voxel is replaced by the
dimensional voxel representations can be prohibitive because the                 centroid of the assigned cluster, calculated as the representative
inflated data size may exceed the memory size on modern GPUs.                    for the majority voxels in that cluster, the error leads to an effect
Although directly using 20-dimensional texture features has been                 similar to a low-pass filter. The errors introduced in such cases
shown to be effective previously on small datasets (less than 8.4                are troublesome if those outliers, possibly anomalies or infrequent
million voxels) [9], in this paper we use 200-dimensional features               cases in the data, should be presented (instead of filtered out) in the
and validate our technique on much larger datasets (over one                     visualization. In our applications that focus on creating a general
hundred million voxels). Suppose each feature is stored as a four-               view of the data, the low-pass filtering effect does not obstruct the
byte floating point number, loading all 200 features would require               understanding and interpretation of the visualization results.


<!-- PK PAGE 9 doc=math_p12 -->
8
3.6     Semi-automatic exploration                                     4.2.1   Segmentation performance measures
The extraction of surfaces based on a user-defined characteristic      The segmentation performance is evaluated by three established
feature vector is flexible in identifying various groups of voxels.    performance measures, namely the VOC score [40], the Rand
Nevertheless, even after reordering features, configuring the char-    index [41] and the adjusted Rand index [42]. We also compare
acteristic feature vector can still be tedious. In the past, we have   the effectiveness of two postprocessing techniques using these
used recursive segmentation of intensity-gradient 2D histogram         performance measures.
$$
to group similar voxels into a hierarchy [15]. Here we develop             The VOC score is calculated as VOC = TP+FP+FNTP
$$
                                                                                                                               , where TP,
a similar semi-automatic method to explore volumetric data by          FP, and FN denote the number of true positives, false positives, and
exploiting voxel similarities in high-dimensional feature spaces.      false negatives, respectively. The VOC score penalizes classifiers
This method allows users to efficiently visualize a small set of       with high FP rates, therefore distinguishes reasonable classifiers
surfaces in a pre-calculated hierarchy.                                from classifiers that predict the same class all the time. We
    Given the result of VQ, we perform binary partition recursively    calculate class-wise VOC to evaluate the segmentation quality for
to the adjacency graph based on the L2 distance of the Nc centroids    each class individually.
using spectral clustering [35]. The first binary partition creates         The Rand index (RI) and adjusted Rand index (ARI) assess
two sets of centroids, each corresponds to a group of voxels.          segmentation quality based on the portion of agreements among
$$
Subsequent partitions further subdivide a target set of centroids      all pairs of n voxels. The RI is calculated as RI = a+b       , where
$$
into two disjoint sets. We organize the partition results into a                                                                (n2)
                                                                       a and b denote the number of voxel pairs that belong to the
binary tree, in which a parent node represents the union of the
                                                                       same and different segments in the groundtruth and the generated
two corresponding groups of voxels represented by the two child
                                                                       segmentation. The ARI measures to what extent the segmentation
nodes. The group of voxels represented by a node defines a surface
                                                                       is better than a random segmentation in terms of RI. We calculate
that can be extracted by the marching cubes algorithm. Based on
                                                                       both the RI and ARI to evaluate the overall segmentation quality,
the binary tree, users can select any nodes to interactively and
                                                                       complementary to the class-wise VOC score.
hierarchically explore the volumetric data. For example, selecting
a child node of a parent node shows the subdivision of the surface
that corresponds to the parent node.                                   4.2.2   Dataset 1: Bacteria
$$
                                                                       The first dataset contains one volume of size 1150 × 450 × 400 at
$$
$$
4     E XPERIMENTS                                                     resolution 12nm × 12nm × 12nm. The original anisotropic volume
$$
$$
                                                                       resolution is 3nm × 3nm × 6nm [43]. With this dataset researchers
$$
4.1     Implementation
                                                                       study the sporulation of B. subtilis [44], a common rod-shaped
We implemented the CNN using the Caffe framework [37]. The             gram positive bacterium.
GPU-based parallel implementation of the marching cubes-based              Sporulation (i.e. formation of an endospore) is a unique
volume rendering is implemented using OpenGL and OpenCL1 .             survival mechanism triggered in certain bacteria in response to
The feature reordering and compression are implemented in MAT-         environmental stressors such as nutrient depletion. Once initiated,
LAB and Python, respectively. The training time reported in the        the process of sporulation includes a series of events that are
following is based on a computer with an Intel Xeon 2.6 GHz            tightly regulated both genetically and temporally. This temporal
CPU and an NVIDIA GTX 970 GPU. The training of the CNN                 process results in a sequence of well-defined and replicable mortook about 2.5 hours; the training needs to be done only once          phological states [44], commencing with the asymmetric division
for the training dataset. After training the CNN, the extraction of    of the mother cell, and culminating in the release of a mature
deep features given new unseen data (i.e. forward pass of a trained    spore. The course of cell development is thus of great interest to
CNN) took 3.4 minutes per million voxels.                              biologists, and is often studied in the model system of B. subtilis.
                                                                           This dataset is manually labeled with four classes: Resin, cell
4.2     Results                                                        wall, spore, and others.
Modern electron microscopy now captures images at high resolution in the scale of few nanometers to a couple of angstroms [38].        1)    Resin: The dark region in the background.
High-resolution 3D imaging has become an important tool to study          2)    Cell wall: The bright thin layer separating the interior of
minute changes in morphology and geometry. Focus ion-beam                       a bacterium and the surrounding resin.
scanning electron microscopy (FIB-SEM) is a high resolution 3D            3)    Spore: The large dark oval-shaped structure inside of a
imaging technique that has led to innovations in many biological                sporulating bacterium. The intensity value and shape of a
systems [39]. Besides electron microscopy, magnetic resonance                   spore change over time, depending on the life cycle stage
imaging (MRI) is another important modality, which allows pre-                  of the bacterium. In this dataset, only about 20% of the
cise diagnosis of brain tumor and traumatic brain injury.                       bacteria are sporulating.
    Given large high-resolution volumes, computational tech-              4)    Others: All the other unlabeled subcellular features (e.g.
niques are essential to create visualizations of complex structures             vesicles and cytoplasm).
that were previously inaccessible by conventional methods. In the
                                                                           Figure 8 shows an example of two bacterial cells with the
following, we present results with two FIB-SEM images and one
                                                                       aforementioned structures of interest. Nevertheless, because the
MRI dataset of human brain. Besides visualization results, we also
                                                                       bacteria are oriented differently, the appearance of these structures
evaluate the descriptive power of the CNN-derived features by
                                                                       when projecting onto a 2D plane can be significantly different.
using the trained CNN to perform volume segmentation through
                                                                       We divide the original image stack into two sets of equal size
voxel-wise classification.
$$
                                                                       575 × 450 × 400, one for training and validation, and the other for
$$
    1. https://www.khronos.org/opencl/                                 testing.


<!-- PK PAGE 10 doc=math_p12 -->
9
                                                                        Table 2
      The quality measures of the segmentation results for the bacteria and hippocampus datasets. Numbers separated by slashes correspond to
                                    different postprocessing techniques (none / class prior / fitted transformation).
                        Class               Precision                 Recall                    VOC                 Rand index (RI)       Adjusted RI (ARI)
                              Resin    0.996 / 0.995 / 0.995   0.992 / 0.993 / 0.993    0.988 / 0.989 / 0.989
        Bacteria
                           Cell wall   0.931 / 0.963 / 0.943   0.956 / 0.918 / 0.946    0.893 / 0.887 / 0.894
                              Spore    0.813 / 0.947 / 0.860   0.881 / 0.718 / 0.842    0.733 / 0.690 / 0.741
                             others    0.964 / 0.941 / 0.959   0.953 / 0.979 / 0.963    0.921 / 0.922 / 0.925
                         average/all   0.970 / 0.970 / 0.971   0.969 / 0.969 / 0.971    0.943 / 0.941 / 0.945    0.969 / 0.969 / 0.971   0.934 / 0.934 / 0.937
                   Non-mitochondria    0.999 / 0.994 / 0.991   0.959 / 0.989 / 0.993    0.958 / 0.983 / 0.985
        Hippo.
                       Mitochondria    0.571 / 0.820 / 0.873   0.984 / 0.900 / 0.847    0.566 / 0.752 / 0.754
                         average/all   0.976 / 0.985 / 0.985   0.960 / 0.984 / 0.985    0.937 / 0.971 / 0.972    0.923 / 0.969 / 0.971   0.670 / 0.835 / 0.838
                         575              575
        450
400
                                                                                                                     (b) Groundtruth          (c) None
Figure 8. (left) The bacteria dataset is divided into the left and right
halves for training and testing. (right) Both the spores (green) and
the vesicles (yellow arrow) in the two sporulating bacteria are low                            (a) Raw image
in intensity. Because the difference in intensity between a spore and
other structures (e.g. vesicle and cytoplasm) can be small, conventional
intensity-based feature spaces will not differentiate them well.
                                                                                                                      (d) Class prior    (e) Fitted transform
                                                                                       Figure 9. This example shows the spore (green) in (b) the groundtruth
    In the following we evaluate the quality of the segmen-                            labels and the segmentation results (c) generated without postprocesstation results and compare the effectiveness of the two post-                          ing, and postprocessed with (d) class prior and (e) fitted transform for
                                                                                       the raw image in (a). Simply scaling the predicted probability by class
processing techniques that address the class imbalance prob-                           prior resulted in many false negatives for the spore class. In contrast,
lem (c.f. Section 3.2.5). In the training volume of the bacteria                       the data-driven fitted transformation of probability is more robust and
dataset, the proportion of (resin, cell wall, spore, others) is                        generates a result comparable to the groundtruth.
(0.472, 0.119, 0.034, 0.374), respectively. Because of the scarcity
of the spores (0.034), we expect an overestimation of the abundance of spores in the testing stage. Interestingly the result shows                   is effective for complex structures.
that simple postprocessing using class prior can actually deterio-                         For example, the two characteristic feature vectors shown
rate segmentation performance. Table 2 compares the performance                        in Figure 10e correspond the surfaces extracted for the spores
measures obtained with and without postprocessing. For the bac-                        (Figure 10a and Figure 10b) and the cell walls (Figure 10c),
teria dataset, using class prior as the scaling factor of predicted                    respectively. Combining the two extracted surfaces leads to a
probability overestimated the effect of class imbalance and scaled                     composite visualization showing both structures (Figure 10d).
down the predicted probability of minority classes (i.e. spore) too                    The close relationships between the semantics and the derived
much, resulted in a significant drop in recall for the spore class                     deep features are attributed to the semantic information, in the
(from 0.881 to 0.718).                                                                 form of the voxel classes, users provide to the CNN in the
    Figure 9 shows a concrete example comparing the segmenta-                          training stage. Grouping semantically-related features together in
tion results (Figure 9c–9e) of the input image (Figure 9a) with                        the design widget with spectral ordering facilitates the editing
the groundtruth (Figure 9b). Applying postprocessing using class                       of characteristic feature vectors to target voxels with specific
prior resulted in a significant increase in false negatives (Figure 9d)                semantics. Further studies are needed to examine the constitutes
than before postprocessing (Figure 9c), therefore lowered the VOC                      of these semantically-coherent features and whether they can be
score of the spore class from 0.793 to 0.690. In contrast, the fitted                  reused for building visualizations for different target structures.
transformation postprocessing is more robust in handling various
classes because it derives suitable scaling factors in a data-driven                   4.2.3    Dataset 2: Hippocampus
way (Figure 9e). Given this flexibility, the fitted transformation                     The second dataset2 [29], [45] contains two volumes of
$$
increased the VOC scores of all four classes as well as the RI and                     hippocampus, each of size 1024 × 768 × 165 and resolution
$$
$$
ARI even though the scores are only marginally better than those                       5nm × 5nm × 5nm. Abnormal changes in morphology and spatial
$$
without postprocessing.                                                                distribution of mitochondria are known to be related to cancer and
    Having validated the segmentation results, we next present                         neurodegenerative diseases such as Parkinson’s disease [46]. Betour results on volume visualization using the extracted deep                           ter visualization and segmentation of mitochondria are therefore
features. We have shown in Section 3.1.1 that conventional feature                     crucial to the study of these diseases. Both volumes in this dataset
spaces, though useful in many cases, are ineffective for complex
structures. We will now show our deep-learning-assisted approach                         2. http://cvlab.epfl.ch/data/em


<!-- PK PAGE 11 doc=math_p12 -->
10
                                                                  (b) Spore                       (c) Cell wall                     (d) Composite result
         (a) All spores in the bacteria dataset
                                                                                        (e) Characteristic feature vectors
Figure 10. (a) The visualization of the spores in the bacteria dataset generated using the deep-learning-assisted approach. We show in the next
two figures (b) the spore and (c) the cell wall of a bacterial cell. By rendering both semi-transparent surfaces at a time, (d) the composite result
$$
shows both the spore and the cell wall. (e) The characteristic feature vectors used to generate the green (t = 0.36) and orange (t = 0.46) surfaces.
$$
contain manually-labeled mitochondria (Figure 11). All the other              voxels have similar predicted probabilities for both classes in the
structures are considered as non-mitochondria.                                hippocampus dataset. After adjusting the predicted probabilities,
    Previous studies have shown that contextual features improve              more voxels in the hippocampus dataset change their predicted
segmentation quality over standard features including intensity               class from mitochondria (minority class) to non-mitochondria
histogram, gradient magnitude, and texture-related features cal-              (majority class).
culated locally [29]. Similar to the high-level features derived by               We have shown that the visualization results of the bacteria
CNNs, the contextual features describe relationships among voxels             dataset (c.f. Figure 10) indicate that the derived deep features are
in a large neighborhood, thereby allowing them to depict more pre-            semantically meaningful. In that example the features align closely
cisely the structures of mitochondria. Nevertheless, the contextual           with the classes assigned by users. For a voxel class with large
features are handcrafted instead of automatically learned.                    intra-class variations, the derived deep features may each detect
    We use the first volume for training and validation, and                  only a subset of the variants in the same class. For solving a
the second volume for testing. The first volume is divided into               classification problem, the CNN aggregates these features in the
$$
the training and the validation sets of size 768 × 768 × 165 and              last fully-connected layer to detect that specific class as a whole.
$$
$$
256 × 768 × 165, respectively.                                                For creating interesting visualizations, we can use these features
$$
                                1024
                                                                              targeting different sets of voxels to show subclasses within a user-
                                                                              assigned class.
        768
165
Figure 11. (left) The hippocampus dataset consists of two volumes for
training and testing (not shown here), both of the same size. (right) Both
the mitochondria (orange) and membranes (yellow arrow) are low in
intensity, thus making them inseparable using intensity-based features.
                                                                                        (a) Raw image                        (b) Composite result
    The second part of Table 2 shows that the postprocessings are
much more influential in addressing the class imbalance problem
in the hippocampus dataset, where the mitochondria occupy about
four percent of the voxels in the training volume. After applying
the two postprocessing techniques, the precision for mitochondria
increased significantly whereas the recall decreased only mod-                                            (c) Transfer function
erately. As a result, the VOC scores of mitochondria increased
                                                                              Figure 12. (a) Within the non-mitochondria region (outside of the orange
from 0.566 to 0.752 (class prior) and 0.754 (fitted transformation).          regions), subregions with noticeably different characteristics can be
Both postprocessing techniques generated VOC scores that are                  identified. (b) The extracted deep features can be used to show the nonhigher than 0.741, which is the state-of-the-art previously reported          mitochondria regions without membranes (blue subvolumes in the left).
                                                                              (c) The two characteristic feature vectors correspond to the mitochondria
$$
in [29]. Overall, the RI and ARI both improved substantially after            (orange, t = 63), and the non-mitochondria regions without membranes
$$
$$
postprocessing.                                                               (blue, t = 49) in the composite visualization.
$$
    Compared with the bacteria dataset, the postprocessing has a
larger impact on performance in the hippocampus dataset than that                 For example in Figure 12b, the mitochondria (orange) and
in the bacteria dataset. Such a difference occurred because more              the non-mitochondria regions in the left (blue) correspond to the


<!-- PK PAGE 12 doc=math_p12 -->
11
orange and blue characteristic feature vectors (Figure 12c). Although the same (non-mitochondria) class is assigned to both nonmitochondria regions in the left and right during training, the CNN
derived different features to detect them because of their distinct
appearance. In the left the single largest non-mitochondria region
is bright and uniform, whereas the non-mitochondria regions in the
right consist of small bright regions separated by dark membranes.
As a result the blue characteristic feature vector generates only the
surface in the left.                                                                            (a) Groundtruth                (b) Composite result
4.2.4 Dataset 3: Multimodal Brain Tumor Image Segmentation Benchmark (BRATS)
The Multimodal Brain Tumor Image Segmentation Benchmark
(BRATS) [47] contains MRI images taken with glioma patients.
Here we report results generated with the dataset released with
the MICCAI 2013 data challenge3 . In this dataset, each sample
volume consists of four channels, namely the T1, T1c, T2, and
Flair channels. All samples in the training set are manually labeled. In clinical practice, physicians decide the tissue types based
on the results of multiple channels to diagnose more precisely.
The structures of interest in this dataset are the edema, necrosis,
non-enhancing and enhancing tumor. The boundaries between
abnormal tissues and normal tissues (e.g. the gray matter, the
                                                                                                      (c) Nodes and corresponding surfaces
white matter and the cerebrospinal fluid) are usually ambiguous.
Figure 13 shows an example of the four channels and the four                        Figure 14. (a) The visualization of groundtruth labels. (b) The composite
types of abnormal tissues. Typical volumes are cube-shaped,                         result generated using the semi-automatic method. (c) The binary tree
                                                                                    allows hierarchical exploration of the volume. The four child subvolumes
composed of about six to eight million voxels, resampled and
                                                                                    (represented by the leaf nodes) are created by partitioning the parent
registered into 1mm isotropic resolution.                                           subvolume (represented by the purple node).
                                                                                        The visualization presented here is created for a sample with
                                                                                    diagnosis of high-grade gliomas (i.e. HG 0011) in the BRATS
                                                                                    dataset (Figure 14). Following the hierarchical exploration pro-
                                                                                    cedure from the top to the bottom of the tree, the final four
                                                                                    surfaces correspond to four leaf nodes in the binary partition
                                                                                    tree (Figure 14c). Comparing the composite result (Figure 14b)
            (a) T1                  (b) T1c
                                                                                    created with the four surfaces obtained using the semi-automatic
                                                                                    method with the groundtruth (Figure 14a), we can see some in-
                                                                                    consistencies near the center of the tumorous region. For example,
                                                                                    the yellow region (enhancing tumor) that wraps around the red
                                                          (e) Groundtruth
                                                                                    region (necrosis) is more apparent in our composite result. These
                                                                                    inconsistencies are due to the difficulty in precisely identifying
                                                                                    the ambiguous boundaries between tissues of different types. In
                                                                                    fact, the BRATS dataset is so challenging that the evaluation of
            (c) T2                 (d) Flair
                                                                                    segmentation performance is done after merging multiple voxel
Figure 13. A slice in the volume for the (a) T1, (b) T1c, (c) T2, and (d)           classes (e.g. complete tumor for all four classes and core tumor
Flair channels. (e) The groundtruth labels of the necrosis (red), edema             for the three classes excluding edema [47]). We can also flexibly
(green), non-enhancing tumor (blue), and enhancing tumor (yellow).                  choose to visualize the complete tumor by selecting the purple
                                                                                    node (top left corner of Figure 14c), which represents the union of
    Here we report the visualization results based on the deep fea-
                                                                                    the four child subvolumes represented by the leaf nodes.
tures extracted from a recently published CNN-based method [5],
which is designed specifically for the BRATS dataset. Instead of                        As more and more research applied CNN-based method to this
training from scratch, we use the trained CNN model provided by                     dataset recently (from three in 2014 to nine in 2016), we expect the
the authors of the original study as a feature extractor that gener-                derived high-level features to be more powerful in the future. Our
ates 256 deep features4 for each voxel. We focus on showcasing                      deep-learning-assisted approach will continue to benefit from the
the application of our visualization design given an alternative                    advances in the deep learning methods. Another interesting remark
high-dimensional feature space, which in this case is also derived                  in applying our deep-learning-assisted approach to multimodal
by a trained CNN model.                                                             data is that the interactions among the four different channels are
                                                                                    addressed by the first convolution layer. Therefore, the final deep
  3. http://braintumorsegmentation.org/                                             features we extracted are derived both from a larger context and
  4. Output of the second fully-connected layer (layer 10 in the original paper).   across various channels. Combining information across channels


<!-- PK PAGE 13 doc=math_p12 -->
12
is crucial to effectively visualize multimodal data. In particular
                                                                                                          12                                                      160
for MRI, using the joint histogram of multiple channels as the
                                                                                                          11                                                      140
feature space has been shown to be effective in showing normal
                                                                                                                                                                       Mean squared error (MSE)
                                                                                                          10                               BRATS            ME
tissues such as cerebrospinal fluid and gray matter [48]. For the                                                                                           MSE   120
                                                                                 Mean error (ME)
tumorous tissues targeted here, the deep features may provide the                                          9
                                                                                                           8                                                ME    100
required context information and descriptive power that lead to                                                                         Hippocampus
better visualizations.                                                                                     7                                                      80
                                                                                                           6                                                MSE
                                                                                                                                                                  60
                                                                                                           5
4.3   Rendering speed and computation time                                                                                                                        40
                                                                                                           4                                                ME
                                                                                                                                          Bacteria
Our deep-learning-assisted volume visualization introduces extra                                           3                                                MSE   20
                                                                                                               32 64   128       256                  512
steps to decode each voxel and create the binary scalar field if                                                             Number of clusters
compared with the conventional marching cubes algorithm. In our
                                                                                                                        (a) Reconstruction error
implementation referencing a codebook, which maps the code of
a voxel to its corresponding feature vector v, is a simple texture
look-up. Updating the binary scalar field requires re-evaluating                                          20
Equation 1, which can be calculated in parallel efficiently by
                                                                                 time-per-megavoxel (s)
vector arithmetic in the GPU.                                                                             15
                                                                                                                                                      k-means
    We measure the rendering speed with an NVIDIA Quadro                                                                                              VQ
K6000 GPU5 . For a volume with 43 million voxels, our GPU-                                                10
based volume renderer can render surfaces of similar size (470k
triangles) about 45 and 40 frames per second using the conven-                                             5
tional marching cubes algorithm and our deep-learning-assisted
approach, respectively. Five iterations of smoothing of the mesh                                           0
                                                                                                               32 64   128       256                  512
with 470k triangles took about 0.26 second, which is too slow if                                                             Number of clusters
we perform smoothing every time the mesh changes while users
                                                                                                                             (b) Running Time
interact with the design widget. Consequently we perform mesh
smoothing optionally.                                                  Figure 15. (a) The reconstruction error of vector quantization decreases
    Figure 15 shows the mean and mean squared error (Figure 15a)       as the size of codebook (i.e. number of clusters) increases. (b) Larger
                                                                       codebook requires much more time running k-means and VQ.
and the time to perform k-means clustering and VQ with Nc
ranging from 32 to 512 (Figure 15b). Here we measure error as the
L2 distance between the actual and reconstructed vectors. As the       manual and trial-and-error process. A distinct line of research
value of Nc increases, both errors decrease exponentially, whereas     focuses on minimizing human involvement by creating volume
the running time increases linearly. The reconstruction error for      visualizations automatically [50]. These automatic techniques can
the BRATS dataset is larger than the other two datasets possibly       also be adapted to search for solutions in the deep-feature-based
because the deep features are generated from multimodal data,          feature space we introduced.
which contain much more information.                                       Our current supervised-learning-based approach requires la-
                                                                       beled data for training the CNN; this limitation could be miti4.4   Discussion                                                       gated by applying unsupervised learning. For example, instead of
                                                                       training a CNN for classification, train an autoencoder [51] that
In the previous sections, we have shown that the proposed deep-        learns to reconstruct voxels from intermediate codes, which also
learning-assisted volume visualization is powerful in discerning       represent high-level features derived directly from the data. The
complex structures using high-level features extracted from a          other techniques used in our deep-learning-assisted approach still
trained CNN. Ideally we would want to know the corresponding           apply to those derived abstract features despite of the way they
high-level concept each individual feature represents. Understand-     are generated. Nevertheless, unsupervised techniques, while not
ing these derived features is an ongoing pursuit in the deep learn-    relying on user inputs, at the same time eliminate valuable suping community [6], [49]. As of now the limited interpretability        plementary domain knowledge from the learning process. Without
of deep features indeed causes difficulties in establishing the        incorporating any prior knowledge on the data, the derived features
connections between a deep-feature-based characteristic feature        will not always be suitable for the target structures. Further studies
vector and the corresponding visualization result. Interestingly, by   are needed to understand whether and how unsupervised learning
organizing features using spectral ordering, users can still design    can help visualize complex volumetric data.
useful volume visualizations without directly interpreting each
feature dimension that defines the feature space. An alternative
                                                                       5    C ONCLUSIONS AND F UTURE W ORK
strategy, used in our semi-automatic method, is to circumvent the
interpretability problem by providing another layer of abstraction     Designing volume visualizations is challenging because the curand hide the underlying features from users. This strategy is also     rent workflow requires users to explicitly define a feasible feature
used by many other semi-automatic methods.                             space for the target structures. Existing studies have focused on
    Although the choice of features evolves from intensity to          visualizing structures based on specific handcrafted local features.
locally-derived features (e.g. texture) and, as introduced in this     As the complexity of structures increases, the difficulty of defining
paper, deep features, volume visualization design remains a            a suitable feature space also increases significantly.
                                                                           In this work, instead of relying on handcrafted features, we
  5. This is different from the GPU used for training the CNN.         use convolutional neural networks (CNNs) to derive automatically


<!-- PK PAGE 14 doc=math_p12 -->
13
useful features from the data. In contrast to the local features that              [16] H. S. Kim, J. P. Schulze, A. C. Cone, G. E. Sosinsky, and M. E. Martone,
have been used in the past, the features extracted from the CNNs                        “Dimensionality reduction on multi-dimensional transfer functions for
                                                                                        multi-channel volume data sets,” Information Visualization, vol. 9, no. 3,
depict high-level concepts that are difficult to describe by local                      pp. 167–180, 2010.
features. We organize the extracted high-dimensional abstract                      [17] W. E. Lorensen and H. E. Cline, “Marching Cubes: A high resolution 3D
features by spectral ordering such that similar abstract features are                   surface construction algorithm,” in Proceedings of the Annual Conference
close together in the design widget, thereby facilitating interactive                   on Computer Graphics and Interactive Techniques, ser. SIGGRAPH ’87.
                                                                                        New York, NY, USA: ACM, 1987, pp. 163–169.
exploratory visualization. In addition, we present a semi-automatic
                                                                                   [18] C. Szegedy, W. Liu, Y. Jia, P. Sermanet, S. Reed, D. Anguelov, D. Erhan,
technique that creates a binary tree of volume visualizations,                          V. Vanhoucke, and A. Rabinovich, “Going deeper with convolutions,”
which allow users to hierarchically explore volumetric data by                          in Proceedings of IEEE Conference on Computer Vision and Pattern
traversing the tree.                                                                    Recognition, Sep. 2014, pp. 1–9.
                                                                                   [19] K. Simonyan and A. Zisserman, “Very deep convolutional networks for
    In the future we plan to apply fully-convolutional network with                     large-scale image recognition,” in Proceedings of International Confer3D convolutions to further address the spatial relationships among                      ence on Learning Representations, 2015.
voxels and accelerate the time-consuming voxel-wise prediction.                    [20] K. He, X. Zhang, S. Ren, and J. Sun, “Deep residual learning for image
Another possible extension is combining features from different                         recognition,” in Proceedings of IEEE Conference on Computer Vision
                                                                                        and Pattern Recognition, 2016.
layers in the CNN to design visualizations at various granularities,
                                                                                   [21] N. Srivastava, G. Hinton, A. Krizhevsky, I. Sutskever, and R. Salakhutpossibly showing substructures within a structure.                                      dinov, “Dropout: A simple way to prevent neural networks from over-
                                                                                        fitting,” The Journal of Machine Learning Research, vol. 15, no. 1, pp.
                                                                                        1929–1958, 2014.
ACKNOWLEDGMENTS                                                                    [22] S. Ioffe and C. Szegedy, “Batch normalization: Accelerating deep net-
                                                                                        work training by reducing internal covariate shift,” in Proceedings of
R EFERENCES                                                                             International Conference on Machine Learning, 2015, pp. 448–456.
                                                                                   [23] J. Kruger and R. Westermann, “Acceleration techniques for GPU-based
[1]  A. Krizhevsky, I. Sutskever, and G. E. Hinton, “ImageNet classification            volume rendering,” in Proceedings of IEEE Conference on Visualization,
     with deep convolutional neural networks,” in Proceedings of the Annual             Washington, DC, USA, 2003, pp. 287–292.
     Conference on Advances in Neural Information Processing Systems,              [24] I. Fujishiro, Y. Maeda, H. Sato, and Y. Takeshima, “Volumetric data
     2012, pp. 1097–1105.                                                               exploration using interval volume,” IEEE Transactions on Visualization
[2] Q. Le, “Building high-level features using large scale unsupervised                 and Computer Graphics, vol. 2, no. 2, pp. 144–155, 1996.
     learning,” in Proceedings of IEEE International Conference on Acoustics,
                                                                                   [25] P. Bhaniramka, C. Zhang, D. Xue, R. Crawfis, and R. Wenger, “Volume
     Speech and Signal Processing, May 2013, pp. 8595–8598.
                                                                                        interval segmentation and rendering,” in Proceedings of IEEE Symposium
[3] Y. Sun, Y. Chen, X. Wang, and X. Tang, “Deep learning face representa-
                                                                                        on Volume Visualization and Graphics, Oct. 2004, pp. 55–62.
     tion by joint identification-verification,” in Proceedings of the Annual
     Conference on Advances in Neural Information Processing Systems,              [26] G. Kindlmann, R. Whitaker, T. Tasdizen, and T. Moller, “Curvature-
     2014, pp. 1988–1996.                                                               based transfer functions for direct volume rendering: Methods and
                                                                                        applications,” in Proceedings of IEEE Conference on Visualization, 2003,
[4] D. Ciresan, U. Meier, and J. Schmidhuber, “Multi-column deep neural
                                                                                        pp. 513–520.
     networks for image classification,” in Proceedings of IEEE Conference
     on Computer Vision and Pattern Recognition, Jun. 2012, pp. 3642–3649.         [27] T. Gerstner, “Multiresolution extraction and rendering of transparent
[5] S. Pereira, A. Pinto, V. Alves, and C. A. Silva, “Brain tumor segmentation          isosurfaces,” Computers & Graphics, vol. 26, no. 2, pp. 219–228, Apr.
     using convolutional neural networks in MRI images,” IEEE Transactions              2002.
     on Medical Imaging, vol. 35, no. 5, pp. 1240–1251, May 2016.                  [28] R. M. Haralick, “Statistical and structural approaches to texture,” Pro-
[6] J. T. Springenberg, A. Dosovitskiy, T. Brox, and M. Riedmiller, “Striving           ceedings of the IEEE, vol. 67, no. 5, pp. 786–804, 1979.
     for simplicity: The all convolutional net,” in Proceedings of International   [29] A. Lucchi, C. Becker, P. M. Neila, and P. Fua, “Exploiting enclosing
     Conference on Learning Representations Workshop, 2015.                             membranes and contextual cues for mitochondria segmentation,” in
[7] C. Correa and K.-L. Ma, “Size-based transfer functions: A new volume                Proceedings of International Conference on Medical Image Computing
     exploration technique,” IEEE Transactions on Visualization and Com-                and Computer-Assisted Intervention, 2014, pp. 65–72.
     puter Graphics, vol. 14, no. 6, pp. 1380–1387, 2008.                          [30] K. He, X. Zhang, S. Ren, and J. Sun, “Delving deep into rectifiers:
[8] S. Wesarg, M. Kirschner, and M. F. Khan, “2D histogram based volume                 Surpassing human-level performance on imagenet classification,” in Pro-
     visualization: Combining intensity and size of anatomical structures,”             ceedings of IEEE International Conference on Computer Vision, 2015,
     International Journal of Computer Assisted Radiology and Surgery,                  pp. 1026–1034.
     vol. 5, no. 6, pp. 655–666, 2010.                                             [31] M. D. Zeiler, “ADADELTA: An adaptive learning rate method,”
[9] J. Caban and P. Rheingans, “Texture-based transfer functions for direct             arXiv:1212.5701 [cs], Dec. 2012.
     volume rendering,” IEEE Transactions on Visualization and Computer            [32] C. Dyken, G. Ziegler, C. Theobalt, and H.-P. Seidel, “High-speed march-
     Graphics, vol. 14, no. 6, pp. 1364–1371, Nov. 2008.                                ing cubes using HistoPyramids,” Computer Graphics Forum, vol. 27,
[10] C. Correa and K.-L. Ma, “Visibility histograms and visibility-driven               no. 8, pp. 2028–2039, Dec. 2008.
     transfer functions,” IEEE Transactions on Visualization and Computer          [33] M. Fiedler, “Algebraic connectivity of graphs,” Czechoslovak Mathemat-
     Graphics, vol. 17, no. 2, pp. 192–204, Feb. 2011.                                  ical Journal, vol. 23, no. 2, pp. 298–305, 1973.
[11] J. Kniss, G. Kindlmann, and C. Hansen, “Multidimensional transfer             [34] F. R. Chung, Spectral Graph Theory. American Mathematical Soc.,
     functions for interactive volume rendering,” IEEE Transactions on Vi-              1997, vol. 92.
     sualization and Computer Graphics, vol. 8, no. 3, pp. 270–285, 2002.
                                                                                   [35] J. Shi and J. Malik, “Normalized cuts and image segmentation,” IEEE
[12] X. Zhao and A. E. Kaufman, “Multi-dimensional reduction and transfer
                                                                                        Transactions on Pattern Analysis and Machine Intelligence, vol. 22,
     function design using parallel coordinates.” in Proceedings of IEEE
                                                                                        no. 8, pp. 888–905, 2000.
     International Conference on Volume Graphics, 2010, pp. 69–76.
[13] R. Maciejewski, Y. Jang, I. Woo, H. Jänicke, K. Gaither, and D. Ebert,       [36] D. Sculley, “Web-scale k-means clustering,” in Proceedings of the Inter-
     “Abstracting attribute space for transfer function exploration and design,”        national Conference on World Wide Web. ACM, 2010, pp. 1177–1178.
     IEEE Transactions on Visualization and Computer Graphics, vol. 19,            [37] Y. Jia, E. Shelhamer, J. Donahue, S. Karayev, J. Long, R. Girshick,
     no. 1, pp. 94–107, Jan. 2013.                                                      S. Guadarrama, and T. Darrell, “Caffe: Convolutional architecture for fast
[14] R. Maciejewski, I. Woo, W. Chen, and D. S. Ebert, “Structuring feature             feature embedding,” in Proceedings of the ACM International Conference
     space: A non-parametric method for volumetric transfer function gen-               on Multimedia, 2014, pp. 675–678.
     eration,” IEEE Transactions on Visualization and Computer Graphics,           [38] A. Bartesaghi, A. Merk, S. Banerjee, D. Matthies, X. Wu, J. L. S.
     vol. 15, no. 6, pp. 1473–1480, 2009.                                               Milne, and S. Subramaniam, “2.2 Å resolution cryo-EM structure of
[15] C. Y. Ip, A. Varshney, and J. JaJa, “Hierarchical exploration of volumes           β -galactosidase in complex with a cell-permeant inhibitor,” Science, vol.
     using multilevel segmentation of the intensity-gradient histograms,”               348, no. 6239, pp. 1147–1151, Jun. 2015.
     IEEE Transactions on Visualization and Computer Graphics, vol. 18,            [39] K. Narayan and S. Subramaniam, “Focused ion beams in biology,”
     no. 12, pp. 2355–2363, 2012.                                                       Nature Methods, vol. 12, no. 11, pp. 1021–1031, Oct. 2015.


<!-- PK PAGE 15 doc=math_p12 -->
14
[40] M. Everingham, L. Van Gool, C. K. Williams, J. Winn, and A. Zisser-                                    Somay Jain Somay Jain received a B.Tech
     man, “The pascal visual object classes (VOC) challenge,” International                                 (Honors) in Computer Science from International
     Journal of Computer Vision, vol. 88, no. 2, pp. 303–338, 2010.                                         Institute of Information Technology, Hyderabad
[41] W. M. Rand, “Objective criteria for the evaluation of clustering methods,”                             in 2015. He is currently pursuing M.S. in Com-
     Journal of the American Statistical Association, vol. 66, no. 336, pp.               PLACE             puter Science from University of Maryland, Col-
     846–850, 1971.                                                                       PHOTO             lege Park. His research interests include com-
[42] L. Hubert and P. Arabie, “Comparing partitions,” Journal of Classifica-               HERE             puter graphics, computer vision and using them
     tion, vol. 2, no. 1, pp. 193–218, Dec. 1985.                                                           in biomedical applications.
[43] K. Narayan, C. M. Danielson, K. Lagarec, B. C. Lowekamp, P. Coffman,
     A. Laquerre, M. W. Phaneuf, T. J. Hope, and S. Subramaniam, “Multi-
     resolution correlative focused ion beam scanning electron microscopy:
     Applications to cell biology,” Journal of Structural Biology, vol. 185,
     no. 3, pp. 278–284, Mar. 2014.
[44] I. S. Tan and K. S. Ramamurthi, “Spore formation in Bacillus subtilis,”
     Environmental Microbiology Reports, vol. 6, no. 3, pp. 212–225, Jun.
     2014.                                                                                                  Eric Krokos Biography text here.
[45] A. Lucchi, Y. Li, and P. Fua, “Learning for structured prediction using
     approximate subgradient descent with working sets,” in Proceedings of
     IEEE Conference on Computer Vision and Pattern Recognition, Jun.
                                                                                          PLACE
     2013, pp. 1987–1994.
                                                                                          PHOTO
[46] A. C. Poole, R. E. Thomas, L. A. Andrews, H. M. McBride, A. J.
                                                                                           HERE
     Whitworth, and L. J. Pallanck, “The PINK1/Parkin pathway regulates
     mitochondrial morphology,” Proceedings of the National Academy of
     Sciences of the United States of America, vol. 105, no. 5, pp. 1638–1643,
     Feb. 2008.
[47] B. H. Menze, A. Jakab et al., “The multimodal brain tumor image
     segmentation benchmark (BRATS),” IEEE Transactions on Medical
     Imaging, vol. 34, no. 10, pp. 1993–2024, Oct. 2015.
[48] J. Kniss, J. P. Schulze, U. Wössner, P. Winkler, U. Lang, and C. Hansen,
     “Medical applications of multi-field volume rendering and VR tech-
     niques,” in Proceedings of the Joint Eurographics - IEEE Conference on                                 Kedar Narayan Biography text here.
     Visualization, ser. VISSYM’04. Aire-la-Ville, Switzerland, Switzerland:
     Eurographics Association, 2004, pp. 249–254.
[49] J. Donahue, Y. Jia, O. Vinyals, J. Hoffman, N. Zhang, E. Tzeng, and                  PLACE
     T. Darrell, “Decaf: A deep convolutional activation feature for generic              PHOTO
     visual recognition,” in Proceedings of International Conference on Ma-                HERE
     chine Learning, 2014, pp. 647–655.
[50] M. Ruiz, A. Bardera, I. Boada, I. Viola, M. Feixas, and M. Sbert,
     “Automatic transfer functions based on informational divergence,” IEEE
     Transactions on Visualization and Computer Graphics, vol. 17, no. 12,
     pp. 1932–1941, 2011.
[51] G. E. Hinton and R. R. Salakhutdinov, “Reducing the dimensionality of
     data with neural networks,” Science, vol. 313, no. 5786, pp. 504–507,
     Jul. 2006.
                                                                                                            Sriram Subramaniam Biography text here.
                                Hsueh-Chien Cheng received the B.S. degree                PLACE
                                in Computer Science from National Tsing Hua               PHOTO
                                University and M.S. degree in Computer Science             HERE
                                and Information Engineering from National Tai-
       PLACE                    wan University. He is currently a Ph.D. candidate
       PHOTO                    in the Department of Computer Science at the
        HERE                    University of Maryland. His research interests
                                include computer graphics and data visualization
                                with biomedical applications.
                                                                                                           Amitabh Varshney is the Director of the Insti-
                                                                                                           tute for Advanced Computer Studies (UMIACS)
                                                                                                           and Professor of Computer Science at the Uni-
                                                                                                           versity of Maryland at College Park. He has a
                        Antonio Cardone earned a Ph.D. in Mechanical                      PLACE            Ph.D. in Computer Science from UNC Chapel
                        Engineering at University of Maryland, College                    PHOTO            Hill and a B.Tech. in Computer Science from IIT
                        Park in 2005. Shortly after he joined the National                 HERE            Delhi. Dr. Varshneys research is on exploring
                        Institute of Standards and Technology (NIST) as
      PLACE                                                                                                large data visualization and interaction including
                        Research Associate. Since 2010 Dr. Cardone
      PHOTO                                                                                                spatial and temporal summarization, multireso-
                        is also a Research Scientist for the Institute for
       HERE                                                                                                lution hierarchies, gesture recognition for virtual
                        Advanced Computer Studies at the University
                                                                                                           environments, and visual interaction with wall-
                        of Maryland. His research is funded by a NIST
                                                                                    sized tiled displays. He is the Director of the NVIDIA CUDA Center
                        Research Grant, on which he is Principal In-
                                                                                    of Excellence at Maryland. Varshney received a NSF CAREER Award
                        vestigator. Dr. Cardones research focuses on
                                                                                    and the IEEE Visualization Technical Achievement Award in 2004. He
                        computational geometry, image processing and
                                                                                    served as the Chair of the IEEE Visualization and Graphics Technical
CAD/CAM with application in bioinformatics, material science and engi-
                                                                                    Committee 2008 2011. He has served as the Associate Editor for IEEE
neering design. His work is carried out in collaboration with scientists
                                                                                    TVCG 1999 2003, and is currently the Associate Editor-in-Chief of IEEE
at the National Institutes of Health, where Dr. Cardone is a Special
                                                                                    TVCG.
Volunteer since 2006.
       View publication stats
<!-- PK END doc=math_p12 -->
