PKvNext Document

KEY: math_p9 | math |  | 38691d14 | 9 | /papers/DeepFontIdentifyYourFontfromAnImage.pdf
<!-- PK START doc=math_p9 -->


<!-- PK PAGE 1 doc=math_p9 -->
DeepFont: Identify Your Font from An Image
                                               Zhangyang Wang1                             Jianchao Yang3 Hailin Jin2 Eli Shechtman2                                       Aseem Agarwala 4
                                                                                              Jonathan Brandt 2 Thomas S. Huang 1
                                                                                                      1
                                                                                                          University of Illinois at Urbana-Champaign
                                                                                                                      2
                                                                                                                        Adobe Research
                                                                                                                3
                                                                                                                  Snapchat Inc 4 Google Inc
                                                  {zwang119, t-huang1}@illinois.edu, jianchao.yang@snapchat.com, {hljin, elishe, jbrandt}@adobe.com,
                                                                                          aseem@agarwala.org
                                         ABSTRACT                                                                                      1.   INTRODUCTION
arXiv:1507.03196v1 [cs.CV] 12 Jul 2015
                                         As font is one of the core design concepts, automatic font                                       Typography is fundamental to graphic design. Graphic
                                         identification and similar font suggestion from an image or                                   designers have the desire to identify the fonts they encounter
                                         photo has been on the wish list of many designers. We                                         in daily life for later use. While they might take a photo of
                                         study the Visual Font Recognition (VFR) problem [4], and                                      the text of a particularly interesting font and seek out an ex-
                                         advance the state-of-the-art remarkably by developing the                                     pert to identify the font, the manual identification process
                                         DeepFont system. First of all, we build up the first avail-                                   is extremely tedious and error-prone. Several websites allow
                                         able large-scale VFR dataset, named AdobeVFR, consisting                                      users to search and recognize fonts by font similarity, includ-
                                         of both labeled synthetic data and partially labeled real-                                    ing Identifont, MyFonts, WhatTheFont, and Fontspring. All
                                         world data. Next, to combat the domain mismatch between                                       of them rely on tedious humans interactions and high-quality
                                         available training and testing data, we introduce a Convo-                                    manual pre-processing of images, and the accuracies are still
                                         lutional Neural Network (CNN) decomposition approach,                                         unsatisfactory. On the other hand, the majority of font se-
                                         using a domain adaptation technique based on a Stacked                                        lection interfaces in existing softwares are simple linear lists,
                                         Convolutional Auto-Encoder (SCAE) that exploits a large                                       while exhaustively exploring the entire space of fonts using
                                         corpus of unlabeled real-world text images combined with                                      an alphabetical listing is unrealistic for most users.
                                         synthetic data preprocessed in a specific way. Moreover, we                                      Effective automatic font identification from an image or
                                         study a novel learning-based model compression approach,                                      photo could greatly ease the above difficulties, and facili-
                                         in order to reduce the DeepFont model size without sacrific-                                  tate font organization and selection during the design pro-
                                         ing its performance. The DeepFont system achieves an ac-                                      cess. Such a Visual Font Recognition (VFR) problem is
                                         curacy of higher than 80% (top-5) on our collected dataset,                                   inherently difficult, as pointed out in [4], due to the huge
                                         and also produces a good font similarity measure for font                                     space of possible fonts (online repositories provide hundreds
                                         selection and suggestion. We also achieve around 6 times                                      of thousands), the dynamic and open-ended properties of
                                         compression of the model without any visible loss of recog-                                   font classes, and the very subtle and character-dependent
                                         nition accuracy.                                                                              difference among fonts (letter endings, weights, slopes, etc.).
                                                                                                                                       More importantly, while the popular machine learning tech-
                                         Categories and Subject Descriptors                                                            niques are data-driven, collecting real-world data for a large
                                                                                                                                       collection of font classes turns out to be extremely difficult.
                                         I.4.7 [Image Processing and Computer Vision]: Fea-                                            Most attainable real-world text images do not have font label
                                         ture measurement; I.4.10 [Image Processing and Com-                                           information, while the error-prone font labeling task requires
                                         puter Vision]: Image Representation; I.5 [Pattern Recog-                                      font expertise that is out of reach of most people. The few
                                         nition]: Classifier design and evaluation                                                     previous approaches [1, 9, 12, 16, 17, 20] are mostly from the
                                                                                                                                       document analysis standpoint, which only focus on a small
                                         General Terms                                                                                 number of font classes, and are highly sensitive to noise,
                                         Algorithms, Experimentation                                                                   blur, perspective distortions, and complex backgrounds. In
                                                                                                                                       [4] the authors proposed a large-scale, learning-based solu-
                                                                                                                                       tion without dependence on character segmentation or OCR.
                                         Keywords                                                                                      The core algorithm is built on local feature embedding, local
                                         Visual Font Recognition; Deep Learning; Domain Adapta-                                        feature metric learning and max-margin template selection.
                                         tion; Model Compression                                                                       However, their results suggest that the robustness to real-
                                                                                                                                       world variations is unsatisfactory, and a higher recognition
                                         Permission to make digital or hard copies of all or part of this work for personal or         accuracy is still demanded.
                                         classroom use is granted without fee provided that copies are not made or distributed            Inspired by the great success achieved by deep learning
                                         for profit or commercial advantage and that copies bear this notice and the full cita-        models [10] in many other computer vision tasks, we de-
                                         tion on the first page. Copyrights for components of this work owned by others than
                                         ACM must be honored. Abstracting with credit is permitted. To copy otherwise, or re-
                                                                                                                                       velop a VFR system for the Roman alphabets, based on
                                         publish, to post on servers or to redistribute to lists, requires prior specific permission   the Convolutional neural networks (CNN), named DeepFont.
                                         and/or a fee. Request permissions from Permissions@acm.org.                                   Without any dependence on character segmentation or con-
                                         MM’15, October 26–30, 2015, Brisbane, Australia.                                              tent text, the DeepFont system obtains an impressive per-
                                          c 2015 ACM. ISBN 978-1-4503-3459-4/15/10 ...$15.00.                                          formance on our collected large real-word dataset, covering
                                         DOI: http://dx.doi.org/10.1145/XXX.XXXXXXX.


<!-- PK PAGE 2 doc=math_p9 -->
(a)                                                           (b)
                                                                 (c)
Figure 1: (a) (b) Successful VFR examples with the DeepFont system. The top row are query images
from VFR real test dataset. Below each query, the results (left column: font classes; right column: images
rendered with the corresponding font classes) are listed in a high-to-low order in term of likelihoods. The
correct results are marked by the red boxes. (c) More correctly recognized real-world images with DeepFont.
an extensive variety of font categories. Our technical contributions are listed below:                                                 Table 1: Comparison of All VFR Datasets
    • AdobeVFR Dataset A large set of labeled real-world                 Dataset name       Source    Label?    Purpose        Size      Class
      images as well as a large corpus of unlabeled real-world          VFRWild325 [4]       Real       Y        Test          325         93
      data are collected for both training and testing, which            VFR real test       Real       Y        Test         4, 384      617
      is the first of its kind and is publicly released soon.             VFR real u         Real       N        Train       197, 396       /
      We also leverage a large training corpus of labeled syn-          VFR syn train        Syn        Y        Train      2,383, 000   2, 383
      thetic data augmented in a specific way.                           VFR syn val         Syn        Y        Test        238, 300    2, 383
    • Domain Adapted CNN It is very easy to generate
      lots of rendered font examples but very hard to obtain
      labeled real-world images for supervised training. This
      real-to-synthetic domain gap caused poor generaliza-             played in (c). Although accompanied with high levels of
      tion to new real data in previous VFR methods [4].               background clutters, size and ratio variations, as well as per-
      We address this domain mismatch problem by lever-                spective distortions, they are all correctly recognized by the
      aging synthetic data to obtain effective classification          DeepFont system.
      features, while introducing a domain adaptation tech-
      nique based on Stacked Convolutional Auto-Encoder
      (SCAE) with the help of unlabeled real-world data.
                                                                       2.    DATASET
    • Learning-based Model Compression We introduce                    2.1    Domain Mismatch between Synthetic and
      a novel learning-based approach to obtain a losslessly                  Real-World Data
      compressible model, for a high compression ratio with-
                                                                          To apply machine learning to VFR problem, we require
      out sacrificing its performance. An exact low-rank con-
                                                                       realistic text images with ground truth font labels. How-
      straint is enforced on the targeted weight matrix.
                                                                       ever, such data is scarce and expensive to obtain. MoreFig. 1 shows successful VFR examples using DeepFont. In                over, the training data requirement is vast, since there are
(a)(b), given the real-world query images, top-5 font recog-           hundreds of thousands of fonts in use for Roman characters
nition results are listed, within which the ground truth font          alone. One way to overcome the training data challenge is to
classes are marked out1 . More real-world examples are dis-            synthesize the training set by rendering text fragments for
1
 Note that the texts are input manually for rendering pur-             all the necessary fonts. However, to attain effective recogposes only. The font recognition process does not need any             nition models with this strategy, we must face the domain
content information.                                                   mismatch between synthetic and real-world text images [4].


<!-- PK PAGE 3 doc=math_p9 -->
For example, it is common for designers to edit the spacing,
aspect ratio or alignment of text arbitrarily, to make the
text fit other design components. The result is that characters in real-world images are spaced, stretched and distorted
in numerous ways. For example, Fig. 2 (a) and (b) depict
typical examples of character spacing and aspect ratio differences between (standard rendered) synthetic and real-world
images. Other perturbations, such as background clutter,                            (a)
                                                                                                               (b)
perspective distortion, noise, and blur, are also ubiquitous.
2.2     The AdobeVFR Dataset                                        Figure 2: (a) the different characters spacings be-
   Collecting and labeling real-world examples is notoriously       tween a pair of synthetic and real-world images. (b)
hard and thus a labeled real-world dataset has been absent          the different aspect ratio between a pair of synthetic
for long. A small dataset VFRWild325 was collected in [4],          and real-world image
consisting of 325 real-world text images and 93 classes. However, the small size puts its effectiveness in jeopardy.              Before feeding synthetic data into model training, it is
   Chen et. al. in [4] selected 2,420 font classes to work on.      popular to artificially augment training data using labelWe remove some script classes, ending up with a total of            preserving transformations to reduce overfitting. In [10], the
2,383 font classes. We collected 201,780 text images from           authors applied image translations and horizontal reflections
various typography forums, where people post these images           to the training images, as well as altering the intensities of
seeking help from experts to identify the fonts. Most of them       their RGB channels. The authors in [4] added moderate
come with hand-annotated font labels which may be inaccu-           distortions and corruptions to the synthetic text images:
rate. Unfortunately, only a very small portion of them fall
                                                                       • 1. Noise: a small Gaussian noise with zero mean and
into our list of 2,383 fonts. All images are first converted
                                                                         standard deviation 3 is added to input
into gray scale. Those images with our target class labels
are then selected and inspected by independent experts if              • 2. Blur: a random Gaussian blur with standard detheir labels are correct. Images with verified labels are then           viation from 2.5 to 3.5 is added to input
manually cropped with tight bounding boxes and normalized proportionally in size, to be with the identical height           • 3. Perspective Rotation: a randomly-parameterized
of 105 pixels. Finally, we obtain 4,384 real-world test im-              affine transformation is added to input
ages with reliable labels, covering 617 classes (out of 2,383).
Compared to the synthetic data, these images typically have            • 4. Shading: the input background is filled with a
much larger appearance variations caused by scaling, back-               gradient in illumination.
ground clutter, lighting, noise, perspective distortions, and       The above augmentations cover standard perturbations for
compression artifacts. Removing the 4,384 labeled images            general images, and are adopted by us. However, as a very
from the full set, we are left with 197,396 unlabeled real-         particular type of images, text images have various realworld images which we denote as VFR real u.                         world appearances caused by specific handlings. Based on
   To create a sufficiently large set of synthetic training data,   the observations in Fig. 2 , we identify two additional fontwe follow the same way in [4] to render long English words          specific augmentation steps to our training data:
sampled from a large corpus, and generate tightly cropped,
gray-scale, and size-normalized text images. For each class,           • 5. Variable Character Spacing: when rendering
we assign 1,000 images for training, and 100 for validation,             each synthetic image, we set the character spacing (by
which are denoted as VFR syn train and VFR syn val, re-                  pixel) to be a Gaussian random variable of mean 10
spectively. The entire AdobeVFR dataset, consisting of                   and standard deviation 40, bounded by [0, 50].
VFR real test, VFR real u, VFR syn train and VFR syn val,
are made publicly available2 .                                         • 6. Variable Aspect Ratio: Before cropping each
   The AdobeVFR dataset is the first large-scale benchmark               image into a input patch, the image, with heigh fixed,
set consisting of both synthetic and real-world text images,             is squeezed in width by a random ratio, drawn from a
for the task of font recognition. To our best knowledge, so              uniform distribution between 65 and 76 .
far VFR real test is the largest available set of real-world
                                                                    Note that these steps are not useful for the method in [4]
text images with reliable font label information (12.5 times
                                                                    because it exploits very localized features. However, as we
larger than VFRWild325). The AdobeVFR dataset is super
                                                                    show in our experiments, these steps lead to significant perfine-grain, with highly subtle categorical variations, leading
                                                                    formance improvements in our DeepFont system. Overall,
itself to a new challenging dataset for object recognition.
                                                                    our data augmentation includes steps 1-6.
Moreover, the substantial mismatch between synthetic and
                                                                       To leave a visual impression, we take the real-world imreal-world data makes the AdobeVFR dataset an ideal sub-
                                                                    age Fig. 2 (a), and synthesize a series of images in Fig. 3,
ject for general domain adaption and transfer learning re-
                                                                    all with the same text but with different data augmentation
search. It also promotes the new problem area of under-
                                                                    ways. Specially, (a) is synthesized with no data augmentastanding design styles with deep learning.
                                                                    tion; (b) is (a) with standard augmentation 1-4 added; (c)
2.3     Synthetic Data Augmentation: A First Step                   is synthesized with spacing and aspect ratio customized to
                                                                    be identical to those of Fig. 2 (a); (d) adds standard aug-
        to Reduce the Mismatch                                      mentation 1-4 to (c). We input images (a)-(d) through the
2
    http://www.atlaswang.com/deepfont.html                          trained DeepFont model. For each image, we compare its


<!-- PK PAGE 4 doc=math_p9 -->
further decomposed into two sub-networks: a ”shared” low-
                                                                 level sub-network which is learned from the composite set of
        (a) Synthetic, none         (c) Synthetic, 5-6           synthetic and real-world data, and a high-level sub-network
                                                                 that learns a deep classifier from the low-level features.
                                                                    The basic CNN architecture is similar to the popular Im-
                                                                 ageNet structure [10], as in Fig. 5. The numbers along with
         (b) Synthetic, 1-4         (d) Synthetic, 1-6           the network pipeline specify the dimensions of outputs of
$$
                                                                 corresponding layers. The input is a 105 × 105 patch sam-
$$
                                                                 pled from a ”normalized” image. Since a square window may
                                                                 not capture sufficient discriminative local structures, and
                                                                 is unlikely to catch high-level combinational features when
                                                                 two or more graphemes or letters are joined as a single glyph
                                                                 (e.g., ligatures), we introduce a squeezing operation 3 , that
                                                                 scales the width of the height-normalized image to be of a
                                                                 constant ratio relative to the height (2.5 in all our experi-
                                                                 ments). Note that the squeezing operation is equivalent to
                                                                 producing “long” rectangular input patches.
                                                                    When the CNN model is trained fully on a synthetic dataset,
                                                                 it witnesses a significant performance drop when testing on
                                                                 real-world data, compared to when applied to another syn-
           (e) Relative CNN layer-wise responses
                                                                 thetic validation set. This also happens with other models
                                                                 such as in [4], which uses training and testing sets of similar
Figure 3: The effects of data augmentation steps.                properties to ours. It alludes to discrepancies between the
(a)-(d): synthetic images of the same text but with              distributions of synthetic and real-world examples. we prodifferent data augmentation ways. (e) compares rel-              pose to decompose the N CNN layers into two sub-networks
ative differences of (a)-(d) with the real-world image           to be learned sequentially:
Fig. 2 (a), in the measure of layer-wise network activations through the same DeepFont model.                           • Unsupervised cross-domain sub-network Cu , which
                                                                       consists of the first K layers of CNN. It accounts for
                                                                       extracting low-level visual features shared by both synlayer-wise activations with those of the real image Fig. 2             thetic and real-world data domains. Cu will be trained
(a) feeding through the same model, by calculating the nor-            in a unsupervised way, using unlabeled data from both
malized MSEs. Fig. 3 (e) shows that those augmentations,               domains. It constitutes the crucial step that further
especially the spacing and aspect ratio changes, reduce the            minimizes the low-level feature gap, beyond the previgap between the feature hierarchies of real-world and syn-             ous data augmentation efforts.
thetic data to a large extent. A few synthetic patches after
full data augmentation 1-6 are displayed in Fig. 4. It is            • Supervised domain-specific sub-network Cs , which
observable that they possess a much more visually similar              consists of the remaining N − K layers. It accounts for
appearance to real-world data.                                         learning higher-level discriminative features for classi-
                                                                       fication, based on the shared features from Cu . Cs
                                                                       will be trained in a supervised way, using labeled data
                                                                       from the synthetic domain only.
                                                                 We show an example of the proposed CNN decomposition in
                                                                 Fig. 5. The Cu and Cs parts are marked by red and green
$$
Figure 4: Examples of synthetic training 105 × 105               colors, respectively, with N = 8 and K = 2. Note that the
$$
patches after pre-processing steps 1-6.                          low-level shared features are implied to be independent of
                                                                 class labels. Therefore in order to address the open-ended
                                                                 problem of font classes, one may keep re-using the Cu sub-
                                                                 network, and only re-train the Cs part.
3.    DOMAIN ADAPTED CNN                                         Learning Cu from SCAE Representative unsupervised
                                                                 feature learning methods, such as the Auto-Encoder and the
3.1   Domain Adaptation by CNN Decomposi-                        Denoising Auto-Encoder, perform a greedy layer-wise pre-
      tion and SCAE                                              training of weights using unlabeled data alone followed by
   Despite that data augmentations are helpful to reduce         supervised fine-tuning ([3]). However, they rely mostly on
the domain mismatch, enumerating all possible real-world         fully-connected models and ignore the 2D image structure.
degradations is impossible, and may further introduce degra-     In [13], a Convolutional Auto-Encoder (CAE) was proposed
dation bias in training. In the section, we propose a learning   to learn non-trivial features using a hierarchical unsuperframework to leverage both synthetic and real-world data,        vised feature extractor that scales well to high-dimensional
using multi-layer CNN decomposition and SCAE-based do-           inputs. The CAE architecture is intuitively similar to the
main adaptation. Our approach extends the domain adap-           the conventional auto-encoders in [18], except for that their
tation method in [7] to extract low-level features that repre-   3
                                                                  Note squeezing is independent from the variable aspect rasent both the synthetic and real-world data. We employs a        tio operation introduced in Section 2.3, as they are for difConvolutional Neural Network (CNN) architecture, which is        ferent purposes.


<!-- PK PAGE 5 doc=math_p9 -->
Figure 5: The CNN architecture in the DeepFont system, and its decomposition marked by different colors
$$
(N =8, K=2).
$$
weights are shared among all locations in the input, preserv-    3.2     Connections to Previous Work
ing spatial locality. CAEs can be stacked to form a deep            We are not the first to look into an essentially “hierarhierarchy called the Stacked Convolutional Auto-Encoder          chical” deep architecture for domain adaption. In [15], the
(SCAE), where each layer receives its input from a latent        proposed transfer learning approach relies on the unsuperrepresentation of the layer below. Fig. 6 plots the SCAE         vised learning of representations. Bengio et. al hypothesized
$$
architecture for our K = 2 case.                                 in [2] that more levels of representation can give rise to more
$$
                                                                 abstract, more general features of the raw input, and that
                                                                 the lower layers of the predictor constitute a hierarchy of
                                                                 features that can be shared across variants of the input
                                                                 distribution. The authors in [7] used data from the union
                                                                 of all domains to learn their shared features, which is dif-
                                                                 ferent from many previous domain adaptation methods that
                                                                 focus on learning features in a unsupervised way from the
                                                                 target domain only. However, their entire network hierarchy
Figure 6: The Stacked Convolutional Auto-Encoder                 is learned in a unsupervised fashion, except for a simple lin-
$$
(SCAE) architecture.                                             ear classier trained on top of the network, i.e., K = N − 1.
$$
                                                                 In [19], the CNN learned a set of filters from raw images
                                                                 as the first layer, and those low-level filters are fixed when
$$
Training Details We first train the SCAE on both syn-            training higher layers of the same CNN, i.e., K = 1. In
$$
thetic and real-world data in a unsupervised way, with a         other words, they either adopt a simple feature extractor
$$
learning rate of 0.01 (we do not anneal it through training).    (K = 1), or apply a shallow classifier (K = N − 1). Our
$$
Mean Squared Error (MSE) is used as the loss function. Af-       CNN decomposition is different from prior work in that:
ter SCAE is learned, its Conv. Layers 1 and 2 are imported
to the CNN in Fig. 5, as the Cu sub-network and fixed. The            • Our feature extractor Cu and classier Cs are both
Cs sub-network, based on the output by Cu , is then trained             deep sub-networks with more than one layer (both K
in a supervised manner. We start with the learning rate at              and N − K are larger than 1), which means that both
0.01, and follow a common heuristic to manually divide the              are able to perform more sophisticated learning. More
learning rate by 10 when the validation error rate stops de-            evaluations can be found in Section 5.2.
creasing with the current rate. The “dropout” technique is
                                                                      • We learn “shared-feature” convolutional filters rather
applied to fc6 and fc7 layers during training. Both Cu and
                                                                        than fully-connected networks such as in [7], the former
Cs are trained with a default batch size of 128, momentum
                                                                        of which is more suitable for visual feature extractions.
of 0.9 and weight decay of 0.0005. The network training is
implemented using the CUDA ConvNet package [10], and             The domain mismatch between synthetic and real-world data
runs on a workstation with 12 Intel Xeon 2.67GHz CPUs            on the lower-level statistics can occur in more scenarios,
and 1 GTX680 GPU. It takes around 1 day to complete the          such as real-world face recognition from rendered images or
entire training pipeline.                                        sketches, recognizing characters in real scenes with synthetic
Testing Details We adopt multi-scale multi-view testing          training, human pose estimation with synthetic images gento improve the result robustness. For each test image, it        erated from 3D human body models. We conjecture that
is first normalized to 105 pixels in height, but squeezed in     our framework can be applicable to those scenarios as well,
width by three different random ratios, all drawn from a         where labeled real-world data is scarce but synthetic data
uniform distribution between 1.5 and 3.5, matching the ef-       can be easily rendered.
fects of squeezing and variable aspect ratio operations during
$$
training. Under each squeezed scale, five 105 × 105 patches      4.    LEARNING-BASED MODEL COMPRESare sampled at different random locations. That constitutes
$$
in total fifteen test patches, each of which comes with dif-           SION
ferent aspect ratios and views, from one test image. As             The architecture in Fig. 5 contains a huge number of paevery single patch could produce a softmax vector through        rameters. It is widely known that the deep models are heavthe trained CNN, we average all fifteen softmax vectors to       ily over-parameterized [5] and thus those parameters can be
determine the final classification result of the test image.     compressed to reduce storage by exploring their structure.


<!-- PK PAGE 6 doc=math_p9 -->
For a typical CNN, about 90% of the storage is taken up           5.    EXPERIMENTS
by the dense connected layers, which shall be our focus for
mode compression.                                                 5.1   Analysis of Domain Mismatch
   One way to shrink the number of parameters is using ma-           We first analyze the domain mismatch between synthetic
$$
trix factorization [6]. Given the parameter W ∈ Rm×n , we         and real-world data, and examine how our synthetic data
$$
factorize it using singular-value decomposition (SVD):            augmentation can help. First we define five dataset varia-
$$
                         W = U SV T                         (1)   tions generated from VFR syn train and VFR real u. These
$$
$$
                                                                  are denoted by the letters N, S, F, R and FR and are exwhere U ∈ R  m×m
$$
$$
                  and V ∈ R    n×n
$$
                                 are two dense orthogonal         plained in Table 2.
$$
matrices and S ∈ Rm×n is a diagonal matrix. To restore an            We train five separate SCAEs, all of the same architecture
$$
approximate W , we can utilize Ue , Ve and S,
                                           e which denote         as in Fig. 6, using the above five training data variants. The
the submatrices corresponding to the top k singular vectors       training and testing errors are all measured by relative MSEs
in U and V along with the top k eigenvalue in S:                  (normalized by the total energy) and compared in Table 1.
                                                                  The testing errors are evaluated on both the unaugmented
                         W e SeVe T
$$
                         f=U                                (2)   synthetic dataset N and the real-world dataset R. Ideally,
$$
                                                                  the better the SCAE captures the features from a domain,
The compression ratio given m, n, and k is k(m+n+1)
                                                 mn
                                                       , which    the smaller the reconstruction error will be on that domain.
is very promising when m, n  k. However, the approxima-             As revealed by the training errors, real-world data contion of SVD is controlled by the decay along the eigenvalues      tains rich visual variations and is more difficult to fit. The
in S. Even it is verified in Fig. 7 that eigenvalues of weight    sharp performance drop from N to R of SCAE N indicates
matrices usually decay fast (the 6-th largest eigenvalue is       that the convolutional features for synthetic and real data
already less than 10% of the largest one in magnitude), the       are quite different. This gap is reduced in SCAE S, and furtruncation inevitably leads to information loss, and potential    ther in SCAE F, which validates the effectiveness of adding
performance degradations, compared to the uncompressed            font-specific data augmentation steps. SCAE R fits the realmodel.                                                            world data best, at the expense of a larger error on N. SCAE
                                                                  FR achieves an overall best reconstruction performance of
                                                                  both synthetic and real-world images.
                                                                     Fig. 8 shows an example patch from a real-world font
                                                                  image of highly textured characters, and its reconstruction
                                                                  outputs from all five models. The gradual visual variations
                                                                  across the results confirm the existence of a mismatch be-
                                                                  tween synthetic and real-world data, and verify the benefit
                                                                  of data augmentation as well as learning shared features.
      (a) Standard scale              (b) Logarithm scale
Figure 7: The plots of eigenvalues for the fc6 layer
weight matrix in Fig. 5. This densely connected
layer takes up 85% of the total model size.                                   (a) original (b) SCAE N (c) SCAE S
   Instead of first training a model then lossy-compressing
its parameters, we propose to directly learn a losslessly
compressible model (the term “lossless” is referred as there
is no further loss after a model is trained). Assuming the
parameter matrix W of a certain network layer, our goal is to
                                                                             (d) SCAE F (e) SCAE R (f) SCAE FR
make sure that its rank is exactly no more than a small
constant k. In terms of implementation, in each iteration,
an extra hard thresholding operation [11] is executed on W        Figure 8: A real-world patch, and its reconstruction
after it is updated by a conventional back propagation step:      results from the five SCAE models.
$$
                      Wk = U Tk (S)V T                      (3)   5.2   Analysis of Network Structure
$$
where Tk will keep the largest k eigenvalues in S while set-      Fixing Network Depth N . Given a fixed network comting others to zeros. Wk is best rank-k approximation of          plexity (N layers), one may ask about how to best decomW , as similarly in (2). However, different from (2), the         pose the hierarchy to maximize the overall classification perproposed method incorporates low-rank approximation into          formance on real-world data. Intuitively, we should have
model training and jointly optimize them as a whole, guar-        sufficient layers of lower-level feature extractors as well as
anteeing a rank-k weight matrix that is ready to be com-          enough subsequent layers for good classification of labeled
pressed losslessly by applying (1). Note there are other alter-   data. Thus, the depth K of Cu should neither be too small
natives, such as vector quantization methods [8], that have       nor too large.
been applied to compressing deep models with appealing               Table 3 shows that while the classification training error
$$
performances. We will investigate utilizing them together         increases with K, the testing error does not vary monotonto further compress our model in the future.                      ically. The best performance is obtained with K = 2 (3
$$


<!-- PK PAGE 7 doc=math_p9 -->
$$
Table 2: Comparison of Training and Testing Errors (%) of Five SCAEs (K = 2)
$$
                     Methods                Training Data                 Train     Test
                                                                                 N       R
                     SCAE N     N: VFR syn train, no data augmentation    0.02  3.54 31.28
                     SCAE S   S: VFR syn train, standard augmentation 1-4 0.21  2.24 19.34
                     SCAE F      F: VFR syn train, full augmentation 1-6  1.20  1.67 15.26
                     SCAE R       R:VFR real u, real unlabeled dataset    9.64  5.73 10.87
                    SCAE FR      FR: Combination of data from F and R     6.52  2.02 14.01
Table 3: Top-5 Testing Errors (%) for Different    Table 4: Top-5 Testing Errors (%) for Different
$$
CNN Decompositions (Varying K, N = 8)              CNN Decompositions (Varying K, N = K + 6)
$$
      K          0     1     2     3     4      5            K          1     2     3     4
     Train      8.46 9.88  11.23 12.54 15.21 17.88          Train     11.46 11.23 10.84 10.86
 VFR real test 20.72 20.31 18.21 18.96 22.52 25.97      VFR real test 21.58 18.21 18.15 18.24
                                                                 to Cu . All trained models are evaluated in term of top-1
                                                                 and top-5 classification errors, on the VFR syn val dataset
                                                                 for validation purpose. Benefiting from large learning ca-
                                                                 pacity, it is clear that DeepFont models fit synthetic data
$$
      (a) K=1       (b) K=2       (c) K=4      (d) K=5           significantly better than LFE. Notably, the top-5 errors of
$$
                                                                 all DeepFont models (except for DeepFont CAE R) reach
Figure 9: The reconstruction results of a real-world             zero on the validation set, which is quite impressive for such
patch using SCAE FR, with different K values.                    a fine-grain classification task.
                                                                    We then compare DeepFont models with LFE on the orig-
                                                                 inal VFRWild325 dataset in [4]. As seen from Table 5, while
slightly worse), where smaller or larger values of K give sub-   DeepFont S fits synthetic training data best, its performance
$$
stantially worse performance. When K = 5, all layers are         is the poorest on real-world data, showing a severe overlearned using SCAE, leading to the worst results. Rather         fitting. With two font-specific data augmentations added
$$
than learning all hidden layers by unsupervised training, as     in training, the DeepFont F model adapts better to realsuggested in [7] and other DL-based transfer learning work,      world data, outperforming LFE by roughly 8% in top-5 erour CNN decomposition reaches its optimal performance            ror. An additional gain of 2% is obtained when unlabeled
when higher-layer convolutional filters are still trained by     real-world data is utilized in DeepFont CAE FR. Next, the
supervised data. A visual inspection of reconstruction re-       DeepFont models are evaluated on the new VFR real test
sults of a real-world example in Fig. 9, using SCAE FR with      dataset, which is more extensive in size and class coverage.
different K values, shows that a larger K causes less informa-   A large margin of around 5% in top-1 error is gained by
tion loss during feature extraction and leads to a better re-    DeepFont CAE FR model over the second best (DeepFont
construction. But in the meantime, the classification result     F), with its top-5 error as low as 18.21%. We will use Deepmay turn worse since noise and irrelevant high frequency de-     Font CAE FR as the default DeepFont model.
tails (e.g. textures) might hamper recognition performance.         Although SCAE R has the best reconstruction result on
$$
The optimal K =2 corresponds to a proper “content-aware”         real-world data on which it is trained, it has large training
$$
smoothening, filtering out “noisy” details while keeping rec-    and testing errors on synthetic data. Since our supervised
ognizable structural properties of the font style.               training relies fully on synthetic data, an effective feature
Fixing Cs or Cu Depth. We investigate the influences of          extraction for synthetic data is also indispensable. The erK (the depth of Cu ) when the depth of Cs (e.g. N − K)           ror rates of DeepFont CAE R are also worse than those of
keeps fixed. Table 4 reveals that a deeper Cu contributes        DeepFont CAE FR and even DeepFont F on the real-world
little to the results. Similar trends are observed when we fix   data, due to the large mismatch between the low-level and
K and adjust N (and thus the depth ofCs ). Therefore, we         high-level layers in the CNN.
$$
choose N = 8, K=2 to be the default setting.
$$
5.3   Recognition Performances on VFR Datasets
   We implemented and evaluated the local feature embeddingbased algorithm (LFE) in [4] as a baseline, and include the
four different DeepFont models as specified in Table 5. The
first two models are trained in a fully supervised manner on
F, without any decomposition applied. For each of the later
two models, its corresponding SCAE (SCAE FR for DeepFont CAE FR, and SCAE R for DeepFont CAE R) is first
trained and then exports the first two convolutional layers      Figure 10: Failure VFR examples using DeepFont.


<!-- PK PAGE 8 doc=math_p9 -->
Another interesting observation is that all methods get        difficult to be adapted, those examples fail mostly because
similar top-5 errors on VFRWild325 and VFR real test, show-      there are neither specific augmentation steps handling their
ing their statistical similarity. However, the top-1 errors of   effects, nor enough examples in VFR real u to extract corDeepFont models on VFRWild325 are significantly higher           responding robust features.
than those on VFR real test, with a difference of up to 10%.
In contrast, the top-1 error of LFE rises more than 13% on       5.4    Evaluating Font Similarity using DeepFont
VFR real test than on VFRWild325. For the small VFR-                There are a variety of font selection tasks with different
Wild325, the recognition result is easily affected by “bad”      goals and requirements. One designer may wish to match a
examples (e.g, low resolution or highly compressed images)       font to the style of a particular image. Another may wish
and class bias (less than 4% of all classes are covered). On     to find a free font which looks similar to a commercial font
the other hand, the larger VFR real test dataset dilutes the     such as Helvetica. A third may simply be exploring a large
possible effect of outliers, and examines a lot more classes.    set of fonts such as Adobe TypeKit or Google Web Fonts.
                                                                 Exhaustively exploring the entire space of fonts using an
                                                                 alphabetical listing is unrealistic for most users. The authors
                                                                 in [14] proposed to select fonts based on online crowdsourced
                                                                 attributes, and explore font similarity, from which a user
                                                                 is enabled to explore other visually similar fonts given a
                                                                 specific font. The font similarity measure is very helpful for
                                                                 font selection, organization, browsing, and suggestion.
                                                                    Based on our DeepFont system, we are able to build up
$$
                                                                 measures of font similarity. We use the 4096 × 1 outputs of
$$
                                                                 the fc7 layer as the high-level feature vectors describing font
                                                                 visual appearances. We then extract such features from all
                                                                 samples in VFR syn val Dataset, obtaining 100 feature vec-
                                                                 tors per class. Next for each class, the 100 feature vectors
                             (a)                                 is averaged to a representative vector. Finally, we calculate
                                                                 the Euclidean distance between the representative vectors of
                                                                 two font classes as their similarity measure. Visualized ex-
                                                                 amples are demonstrated in Fig. 11. For each example, the
                                                                 top is the query image of a known font class; the most simi-
                                                                 lar fonts obtained by the font similarity measures are sorted
                                                                 below. Note that although the result fonts can belong to
                                                                 different font families from the query, they share identifiable
                                                                 visual similarities by human perception.
                                                                    Although not numerically verified as in [14], the DeepFont
                                                                 results are qualitatively better when we look at the top-10
                                                                 most similar fonts for a wide range of query fonts. The
                                                                 authors of [14] agree per personal communication with us.
                             (b)
                                                                 5.5    DeepFont Model Compression
                                                                    Since the fc6 layer takes up 85% of the total model size, we
                                                                 first focus on its compression. We start from a well-trained
                                                                 DeepFont model (DeepFont CAE FR), and continue tuning
                                                                 it with the hard thresholding (3) applied to the fc6 parame-
                                                                 ter matrix W in each iteration, until the training/validation
                                                                 errors reach the plateau again.
                                                                    Table 6 compares the DeepFont models compressed us-
                                                                 ing conventional matrix factorization (denoted as the “lossy”
                                                                 method), and the proposed learning based method (denoted
                                                                 as the “lossless” method), under different compression ratios
                                                                 (fc6 and total size counted by parameter numbers). The
                             (c)                                 last column of Table 6 lists the top-5 testing errors (%) on
                                                                 VFR real test. We observe a consistent margin of the “lossFigure 11: Examples of the font similarity. For each             less” method over its “lossy” counterpart, which becomes
one, the top is the query image, and the renderings              more significant when the compression ratio goes low (more
$$
with the most similar fonts are returned.                        than 1% when k = 5). Notably, when k = 100, the pro-
$$
                                                                 posed “lossless” compression suffers no visible performance
   Fig. 10 lists some failure cases of DeepFont. For example,    loss, while still maintaining a good compression ratio of 5.79.
the top left image contains extra “fluff” decorations along         In practice, it takes around 700 megabytes to store all the
text boundaries, which is nonexistent in the original fonts,     parameters in our uncompressed DeepFont model, which is
that makes the algorithm incorrectly map it to some “artis-      quite huge to be embedded or downloaded into most custic” fonts. Others are affected by 3-D effects, strong obsta-    tomer softwares. More aggressively, we reduce the output
cles in foreground, and in background. Being considerably        sizes of both fc6 and fc7 to 2048, and further apply the pro-


<!-- PK PAGE 9 doc=math_p9 -->
Table 5: Comparison of Training and Testing Errors on Synthetic and Real-world Datasets (%)
                Methods      Training Data Training   VFR syn val   VFRWild325    VFR real test
                             Cu      Cs     Error    Top-1 Top-5 Top-1 Top-5 Top-1 Top-5
                  LFE         /       /       /      26.50   6.55  44.13   30.25  57.44  32.69
               DeepFont S     /       F      0.84     1.03    0    64.60   57.23  57.51  50.76
              DeepFont F      /       F      8.46     7.40    0    43.10   22.47  33.30  20.72
           DeepFont CAE FR FR         F     11.23     6.58    0    38.15 20.62 28.58 18.21
            DeepFont CAE R    R       F     13.67     8.21   1.26  44.62   29.23  39.46  27.33
                                                                   [5] M. Denil, B. Shakibi, L. Dinh, N. de Freitas, et al.
Table 6: Performance Comparisons of Lossy and                          Predicting parameters in deep learning. In NIPS,
Lossless Compression Approaches                                        pages 2148–2156, 2013.
           fc6 size  Total size Ratio Method Error
                                                                   [6] E. L. Denton, W. Zaremba, J. Bruna, Y. LeCun, and
 default 150,994,944 177,546,176 NA     NA     18.21
                                                                       R. Fergus. Exploiting linear structure within
                                       Lossy   20.67
$$
  k=5       204,805   26,756,037 6.64                                  convolutional networks for efficient evaluation. In
$$
                                      Lossless 19.23
                                                                       NIPS, pages 1269–1277, 2014.
                                       Lossy   19.25
$$
  k=10      409,610   26,960,842 6.59                              [7] X. Glorot, A. Bordes, and Y. Bengio. Domain
$$
                                      Lossless 18.87
                                                                       adaptation for large-scale sentiment classification: A
                                       Lossy   19.04
$$
  k=50    2,048,050   28,599,282 6.21                                  deep learning approach. In ICML, 2011.
$$
                                      Lossless 18.67
                                                                   [8] Y. Gong, L. Liu, M. Yang, and L. Bourdev.
                                       Lossy   18.68
$$
 k=100    4,096,100   30,647,332 5.79                                  Compressing deep convolutional networks using vector
$$
                                      Lossless 18.21
                                                                       quantization. arXiv preprint arXiv:1412.6115, 2014.
                                                                   [9] M.-C. Jung, Y.-C. Shin, and S. N. Srihari. Multifont
                                                                       classification using typographical attributes. In
$$
posed compression method (k = 10) to the fc6 parameter                 ICDAR, pages 353–356. IEEE, 1999.
$$
matrix. The obtained “mini” model, with only 9, 477, 066          [10] A. Krizhevsky, I. Sutskever, and G. E. Hinton.
parameters and a high compression ratio of 18.73, becomes              Imagenet classification with deep convolutional neural
less than 40 megabytes in storage. Being portable even on              networks. In NIPS, pages 1097–1105, 2012.
mobiles, It manages to keep a top-5 error rate around 22%.
                                                                  [11] Z. Lin, M. Chen, and Y. Ma. The augmented lagrange
                                                                       multiplier method for exact recovery of corrupted
6.   CONCLUSION                                                        low-rank matrices. arXiv preprint:1009.5055, 2010.
   In the paper, we develop the DeepFont system to remark-        [12] H. Ma and D. Doermann. Gabor filter based
ably advance the state-of-the-art in the VFR task. A large             multi-class classifier for scanned document images. In
set of labeled real-world data as well as a large corpus of un-        ICDAR, volume 2, pages 968–968. IEEE, 2003.
labeled real-world images is collected for both training and      [13] J. Masci, U. Meier, D. Cireşan, and J. Schmidhuber.
testing, which is the first of its kind and will be made pub-          Stacked convolutional auto-encoders for hierarchical
licly available soon. While relying on the learning capacity           feature extraction. In ICANN, pages 52–59. 2011.
of CNN, we need to combat the mismatch between available          [14] P. O’Donovan, J. Lı̄beks, A. Agarwala, and
training and testing data. The introduction of SCAE-based              A. Hertzmann. Exploratory font selection using
domain adaption helps our trained model achieve a higher               crowdsourced attributes. ACM TOG, 33(4):92, 2014.
than 80% top-5 accuracy. A novel lossless model compres-          [15] R. Raina, A. Battle, H. Lee, B. Packer, and A. Y. Ng.
sion is further applied to promote the model storage effi-             Self-taught learning: transfer learning from unlabeled
ciency. The DeepFont system not only is effective for font             data. In ICML, pages 759–766. ACM, 2007.
recognition, but can also produce a font similarity measure
                                                                  [16] R. Ramanathan, K. Soman, L. Thaneshwaran,
for font selection and suggestion.
                                                                       V. Viknesh, T. Arunkumar, and P. Yuvaraj. A novel
                                                                       technique for english font recognition using support
7.   REFERENCES                                                        vector machines. In ARTCom, pages 766–769, 2009.
 [1] C. Avilés-Cruz, R. Rangel-Kuoppa, M. Reyes-Ayala,           [17] H.-M. Sun. Multi-linguistic optical font recognition
     A. Andrade-Gonzalez, and R. Escarela-Perez.                       using stroke templates. In ICPR, volume 2, pages
     High-order statistical texture analysis: font                     889–892. IEEE, 2006.
     recognition applied. PRL, 26(2):135–145, 2005.               [18] P. Vincent, H. Larochelle, Y. Bengio, and P.-A.
 [2] Y. Bengio. Learning deep architectures for ai.                    Manzagol. Extracting and composing robust features
     Foundations and trends R in Machine Learning,                     with denoising autoencoders. In ICML, pages
     2(1):1–127, 2009.                                                 1096–1103. ACM, 2008.
 [3] Y. Bengio, P. Lamblin, D. Popovici, and                      [19] T. Wang, D. J. Wu, A. Coates, and A. Y. Ng.
     H. Larochelle. Greedy layer-wise training of deep                 End-to-end text recognition with convolutional neural
     networks. NIPS, 19:153, 2007.                                     networks. In ICPR, pages 3304–3308. IEEE, 2012.
 [4] G. Chen, J. Yang, H. Jin, J. Brandt, E. Shechtman,           [20] Y. Zhu, T. Tan, and Y. Wang. Font recognition based
     A. Agarwala, and T. X. Han. Large-scale visual font               on global texture analysis. IEEE TPAMI, 2001.
     recognition. In CVPR, pages 3598–3605. IEEE, 2014.
<!-- PK END doc=math_p9 -->
