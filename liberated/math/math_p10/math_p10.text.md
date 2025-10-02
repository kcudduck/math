PKvNext Document

KEY: math_p10 | math |  | 938d0019 | 12 | /papers/DeepLearningbasedSuper-ResolutionforMedicalVolumeVisualizationwithDirectVolumeRendering.pdf
<!-- PK START doc=math_p10 -->


<!-- PK PAGE 1 doc=math_p10 -->
Deep Learning based Super-Resolution for
                                              Medical Volume Visualization with Direct
                                                         Volume Rendering
                                                 Sudarshan Devkota1 sudarshan.devkota93@knights.ucf.edu
                                                         and Sumanta Pattanaik1 sumant@cs.ucf.edu
arXiv:2210.08080v1 [cs.GR] 14 Oct 2022
                                                           University of Central Florida, Orlando, FL, USA
                                                a)Input                  b)Ours                   c)GT
                                         Fig. 1. Results of our super-resolution network for volumetric rendering with a) input
                                         rendering at a low resolution of 240x240 which is upscaled by a factor of 8x8 to obtain
                                         the high-resolution output b) at 1920x1920. c) is ground truth image.
                                                Abstract. Modern-day display systems demand high-quality render-
                                                ing. However, rendering at higher resolution requires a large number of
                                                data samples and is computationally expensive. Recent advances in deep
                                                learning-based image and video super-resolution techniques motivate us
                                                to investigate such networks for high fidelity upscaling of frames rendered
                                                at a lower resolution to a higher resolution. While our work focuses on
                                                super-resolution of medical volume visualization performed with direct
                                                volume rendering, it is also applicable for volume visualization with other
                                                rendering techniques. We propose a learning-based technique where our
                                                proposed system uses color information along with other supplementary
                                                features gathered from our volume renderer to learn efficient upscaling of
                                                a low resolution rendering to a higher resolution space. Furthermore, to
                                                improve temporal stability, we also implement the temporal reprojection
                                                technique for accumulating history samples in volumetric rendering. Our
                                                method allows high-quality reconstruction of images from highly aliased
                                                input as shown in figure 1.
                                                Keywords: Super-resolution · Volume rendering · Medical imaging


<!-- PK PAGE 2 doc=math_p10 -->
2       S. Devkota et al.
1   Introduction
With recent advancements in imaging technology, medical volume data, such
as computed tomography (CT) scans and Magnetic Resonance Imaging (MRI)
images, are readily available. The rendering performed with these 3D data for
visualization of anatomical structures plays a significant role in today’s clinical
applications. The quality of the 3D volume data, as well as the visual fidelity of
the rendered content, directly affects the diagnosis accuracy in clinical medicine.
For larger volume data, the traversal of the volume becomes increasingly costly
and can negatively affect the frame rate for high resolution rendering.
    In recent years, several works have addressed the goal of resolution augmentation in the medical imaging sector as a software based post-processing
technique rather than an engineering-hardware issue. Such software based techniques have a variety of use cases. For instance, in cases of remote visualizations,
high-resolution rendering from supercomputers can only be saved or streamed at
a compressed lower resolution state due to storage and bandwidth limitations.
This data, when streamed to the client-side, needs to be decompressed and upscaled in such a way that the reconstruction error is kept as low as possible.
Moreover, high-resolution displays in modern-day mobile and Virtual Reality
(VR) systems demand high-resolution and high-quality rendering.
    A variety of high quality image reconstruction techniques have been proposed
to address this issue. Recent works in deep learning have demonstrated that
learning-based image and video super-resolution methods can efficiently upscale
inputs to a higher resolution when the network is trained on low and highresolution pairs of images [4]. In image and video super-resolution literature,
super-resolution is generally studied as a deblurring problem. However, unlike
photographic images, each pixel sample in a rendering is a point sample in space
and time which makes the final rendering to have aliasing artifacts typically
at lower resolution. Thus, upscaling rendered content is considered as an antialiasing and interpolation problem [21].
    In our work, we investigate a deep learning based super-resolution approach
for direct volume rendering (DVR) of 3D medical data. Leveraging prior works on
image and video super-resolution architectures, we present a rendering pipeline
that includes an artificial neural network to perform upscaling of a ray-casted
visualization of medical volumetric data. Motivated by a recent work on supersampling of surface-only rendered content [21], we plan to use the neural supersampling architecture as a basis and extend it for volumetric rendering. Our
proposed pipeline consists of a volume renderer that outputs a low-resolution
rendering of medical volume data along with a number of supplementary features
which enables the super-resolution network to make sensible interpretations of
these features for generating a high-resolution representation of the input. Furthermore, in order to improve the temporal stability and to aid in information
refill, we implement a simple, yet effective way to perform temporal reprojection for volumetric cases. This allows our network to effectively propagate and
aggregate samples from neighboring frames to the current frame.
    We summarize our technical contributions as follows:


<!-- PK PAGE 3 doc=math_p10 -->
Super-resolution for volume rendering      3
 – We demonstrate a learning-based technique that performs up to 8x8 upsam-
   pling of highly aliased volumetric rendering with improved visual fidelity and
   temporal stability.
 – We experimentally verify the effectiveness of supplementing the network with
   additional features to improve the quality of reconstructed image.
 – We implement an effective temporal reprojection technique for the accumu-
   lation of history samples in volumetric rendering.
2     Related Work
2.1   Image and Video Super-resolution
Deep learning-based super-resolution techniques started to gain popularity since
the initial works by [4] where they used deep convolutional neural networks
(CNN) to learn end-to-end mapping between low/high-resolution images. Several other CNN-based models have been proposed since then to improve upon
the network architecture. Instead of learning the direct mapping between input
and output, Kim et al.[12] proposed to learn the residual between the two images
by introducing a very deep network. After the introduction of residual network
[7], Zhang et al.[22] and Lim et al.[16] applied residual blocks to further improve the performance of the network. To improve upon the perceptual quality
of the reconstructed photo-realistic images, Ledig et al.[15] incorporated generative adversarial networks[6] and proposed to use a combination of loss functions
including perceptual loss [11] and adversarial loss[6].
    Video super-resolution (VSR) is more challenging compared to single image
super-resolution in that one needs to gather auxiliary information across misaligned neighboring frames in a video sequence for restoration. In some recent
works, recurrent networks have been widely used in video super-resolution architectures [9][2] which naturally allows for gathering information across multiple
frames. Another group of networks uses motion estimation between frames to
fuse multiframe information and to improve temporal coherence. Jo et al. [10]
proposed to use dynamic upsampling filters for implicit motion compensation
while Kim et al. [13] used a spatio-temporal transformer network for multiple
frame motion estimation and warping.
2.2   Resolution Enhancement for Rendered Content
Several methods have been proposed to improve the visual fidelity of rendered
content or to upsample a rendering performed at a lower resolution. Weiss et
al.[20] used a deep learning-based architecture to upscale the resolution for isosurface rendering. Nvidia recently introduced a super-sampling technique that
uses a deep neural network and temporal history to accumulate samples [5].
Similarly, Xiao et al.[21] demonstrated up to 4x4 upsampling of highly aliased
input. These methods, however, perform image reconstruction for surface-only
rendered content. In our work, we focus on performing up to 8x8 super-resolution


<!-- PK PAGE 4 doc=math_p10 -->
4      S. Devkota et al.
of volumetric visualization with high visual and temporal fidelity. Furthermore,
most of these above methods propose to use motion information between frames
to use temporal history, however, computing screen space motion information
for volumetric rendering is not straightforward.
3     Methodology
In this section, we describe the overall framework of our system.
3.1    Direct Volume Rendering Framework
In our DVR framework, we cast rays from the camera through pixels of the viewport. When the ray reaches the volume contained in an axis-aligned bounding
box, the ray is sampled via ray marching, i.e., stepped along at equal distances.
At every step of the ray, a transfer function maps the interpolated intensity
value at that position to an RGBA vector. As the ray steps through the volume,
a local gradient is combined with a local illumination model to provide realistic
shading of the object. The final pixel value is computed using front-to-back
$$
compositing of the acquired color and alpha (opacity) values along the ray. The
$$
ray is terminated early if either the accumulated opacity reaches close to 1 or
the ray leaves the volume.
     The issue with high-quality super-resolution for rendered content is that the
information at the to-be-interpolated pixels at the target resolution is completely
missing and since pixels are point-sampled, they are extremely aliased at geometry edges, especially at low resolution. An effective way to handle these aliasing artifacts is temporal anti-aliasing (TAA) which attempts to gather multiple
samples per pixel by distributing the computations across multiple frames. Motivated by this, we implement a similar technique to perform super-resolution
i.e., compute and gather multiple sub-pixel samples across frames and feed this
information to our super-resolution network to upscale the low-resolution rendering. However, for volumetric rendering, accumulating samples from previous
frames presents a few challenges which we discuss in the sections below.
3.1.1 Motion Vector and Depth In rendering, a motion vector defines an
analytically computed screen-space location where a 3D point that is visible at
the current frame i would appear in the previous frame i − 1. The main principle
of temporal methods to perform either anti-aliasing or upsampling is to compute
multiple sub-pixel samples across frames, and then combine those together for
the current frame. The samples from the previous frame are reprojected using
the motion vector to the current frame. The input to our renderer is static
volumetric data without any motion of its own, so performing reprojection using
the motion vector depends entirely on the camera transformation matrices and
depth information. Unfortunately for direct volume rendering, we lack this depth
information since we are not looking at a single position in the world space but a


<!-- PK PAGE 5 doc=math_p10 -->
Super-resolution for volume rendering   5
                                                                 p
                                      pos B
                                                           x
                      current frame                             Volumetric
                         u,v                                      Object
                                  u',v'
                          previous frame
                                          pos A
Fig. 2. Camera movement around a volumetric object from posA to posB. Point x is
the first hit point on the volumetric object when the ray passes through the volume
$$
for the current camera position, while p is a point inside the volume where the alpha
$$
value is maximum along the ray.
number of points in the volume along the ray. Hence, computing motion vectors
to perform reprojection is challenging.
    To overcome this, we implement a naive approach where we use the point of
$$
maximum alpha along the ray to perform reprojection. Since this position will
$$
have the maximum contribution to the final accumulated sample, we found that
this quasi-depth information computed using this heuristic gives an acceptable
approximation for the estimation of motion vector. We start from the current
$$
frame coordinate u, v as shown in figure 2. Once we have the world space position for the point p in space where we have maximum alpha along the ray,
$$
we can use previous camera transformation matrices to reproject this position
back to previous frame coordinates u0 , v 0 . The difference between the two frame
coordinates gives us the screen space motion vector due to camera movement.
3.1.2 Disocclusion and Ghosting Once we have the motion vector between
two consecutive frames, we additionally incorporate temporal anti-aliasing to
our final rendering with an additional compute shader call, thus adding a postprocessing pass to our DVR pipeline. We utilize the history color buffer and
motion vector to gather samples from the previous frame and combine them
with the samples in the current frame. History samples can sometimes be invalid.
Trivially accepting all of the history samples causes ghosting artifacts in the final
rendered image because of disocclusion. As we move the camera, regions of the
volume that were not previously visible may come into view. To address this
issue, similar to [17][18], we resort to using neighborhood clamping which makes
the assumption that colors within the neighborhood of the current sample are
valid contributions to the accumulation process. Specifically, we implemented
3*3 neighborhood clamping which produced reasonably effective results for our
volume rendering case.
3.1.3 Supplementary Features Previous works on reconstruction networks
for surface data [21][14] have shown that supplementing a network with additional features improves the overall performance of the network. This motivates
us to opt for a few supplementary features adapted to our volumetric case. Xiao


<!-- PK PAGE 6 doc=math_p10 -->
6       S. Devkota et al.
Fig. 3. Input feature images from the training dataset. From left to right: a) Final
rendered color image with 3 channels RGB, b) Depth with a single channel and c)
color-opacity vector (opacity is not shown) with 4 channels RGBA at the position where
$$
alpha is maximum along the ray; d) Example Motion vector image with 2 channels.
$$
et al.[21] showed that the reconstruction network benefits with depth as an additional input to the network, but as discussed in section 3.1.1, depth information
is not well defined for the volumetric case, so we resort to using the depth at
$$
the point of maximum alpha value along the ray since the final rendering will
$$
have more contribution from this point. Additionally, we also save color and
opacity values at this point. When adding them as input, we are able to obtain
additional gains with our network (section 5.1).
    In addition to feeding the network with rendered frames and supplementary
features from the current and the previous time steps, we also provide a screen
space 2D motion vector which is used to warp the previous frames to the current
frame. Using optical flow or motion estimation is common in the video superresolution literature (section 2) to capture the temporal dependency between
successive frames and to reduce the complexity of the network. Figure 3 shows
all types of inputs that our network receives.
3.2    Network Architecture
Figure 4 depicts the data flow through our network. The overall network architecture has been inspired from Xiao et al.[21] with a number of modifications
to suit our needs. We implement residual blocks to extract features from the
input since they are easier to train and allow a better flow of information due
to the presence of shortcut connections [7]. For our reconstruction network, we
adopt a similar autoencoder architecture by Hofmann et al. [8] which has been
successfully applied to volumetric data. For the loss formulation, we implement
Charbonnier loss because of its benefits mentioned in section 3.2.5.
3.2.1 Residual Block The first component of the network is a residual block
which is used to extract features from the input frames, where by ‘input frames’,
we mean all the rendered color images from current and previous frames with
their supplementary features excluding motion vector. The residual block we
use in our network has two 3x3 convolutional layers. Each convolutional layer is
followed by a rectified linear unit (ReLU) activation function. After the second
convolutional layer, the output from the layer is added together with the input


<!-- PK PAGE 7 doc=math_p10 -->
Super-resolution for volume rendering                                                                                           7
                                    R
 xi
                                                                                                                                 High resolution
                                    R                                        Warp                                                    output
                                                                                                                                                                                3 x 3 Conv, 32
                                                                                                                                                                                                                    3 x 3 Conv, 8
                                                                                                                                                                                                 ReLU
                                                                                                                                                                                                                                        ReLU
 xi-1                                                                                       C         X        C                                                         X
                                    R                                       Warp2
 xi-2                                                                                                                 LEGENDS:
                                                                                                                                                                                                    1 x 1 Conv, 8
                                                                                                                      R     Residual Block
                                                                                                                            Zero Upsampling
                                                                                                                     Warp   Warping
                                                                                                 Reweighting
                                                                            Warp            C     Network
                                                                                                                      C     Concatenation
                                                                                                                            Reweighting kernel
                                                                                                                            Autoencoder
                                                                            Warp2                                     X     Elementwise product
                                                                                                                                                                         Fig. 5. Residual Block
Fig. 4. Overall network architecture with components
inspired from Xiao et al.[21] and Hofmann et al.[8]
                                                                                                                                                          Skip connections
                                    3 x 3 Conv, 32
            3 x 3 Conv, 32
                                                            3 x 3 Conv, 2
                                                     ReLU
                             ReLU
                                                                                    Scale
                                                                                            Reweighting
                                                                            Tanh
        X                                                                                     Kernels                                                       32
                                                                                                                                                     32          64 64
                                                                                                                                               32                      64 64
                                                                                                                                      32                                         64 64
                                                                                                                                32                                 ConvTranspose2d                                  64 64
                                                                                                                                             Conv + LeakyReLu
                                                                                                                   32 32                                                                                                            64 64      3
                                                                                                                                             Maxpool               Copy and Concat
      Fig. 6. Reweighting Network
                                                                                                                   Fig. 7. Autoencoder for reconstruction of high
                                                                                                                   resolution image
to the residual block, before sending it to the final ReLU activation function.
To transform the input into the desired shape for the addition operation, we
introduce an additional 1x1 convolutional layer in the skip connection.
3.2.2 Zero Upsample and Warping We implement zero upsampling technique [21] to upscale the low-resolution input to the target resolution. In zero
upsampling, every pixel in the low-resolution space is upsampled to be surrounded by pixels with zero values in high-resolution space. Once all the input
frames and the feature maps (extracted from the residual block) are upsampled to target resolution, the previous frames and the corresponding feature
maps are processed further with the warping module, where they are backward
warped to align with the current frame with the help of motion vectors. All input
frames (after zero upsampling and warping) are then concatenated and fed to a
reweighting network as shown in figure 4.
3.2.3 Reweighting Network As discussed in section 3.1.2, there are a few
limitations associated with using motion vectors that prevent its direct use for
accumulating history samples. In addition to disocclusion and ghosting, motion
vectors do not reflect shading and lighting changes between two frames. To address these issues, we leverage a recent work in neural upsampling [21] which uses


<!-- PK PAGE 8 doc=math_p10 -->
8      S. Devkota et al.
a reweighting network to weed out the inconsistent samples. The reweighting network is shown in figure 6. It is a 3 layer convolutional network that generates
a pixel-wise reweighting channel for each previous frame. For example, for two
previous frames used in our network, we obtain two reweighting channels from
the reweighting network. Each of these reweighting channels undergoes elementwise multiplication with all the channels of each of the previous frame’s feature
maps (after zero upsampling and warping). The result is concatenated with the
current frame’s feature map and fed as an input to an autoencoder.
3.2.4 Autoencoder For the reconstruction of high-resolution images using
the concatenated result from section 3.2.3, we adopt a similar autoencoder network from Hofmann et al. [8]. It uses a fully convolutional encoder and decoder
hierarchy with skip connections as shown in figure 7.
3.2.5 Loss Function We use Charbonnier loss [3] to quantify the error between the high-resolution output and the given ground truth image. Charbonnier
loss is known to be insensitive to outliers and for super-resolution tasks, experimental evaluation has shown that it provides better PSNR/SSIM accuracies over
other conventional loss functions [1].
                                       N
                                   1 X
$$
                              L=         ρ(yi − zi ),                          (1)
$$
$$
                                   N i=0
$$
                    √
$$
    where, ρ(x) = x2 + 2 ,  = 1 × 10−8 , zi denotes the ground truth high
$$
resolution frame, and N denotes the number of pixels.
4   Dataset
In order to generate a high quality dataset, we incorporate 3 different volumetric data (CTA-Cardio: 512x512x321, Manix: 512x512x460, CTA Abdomen
Panoramix: 441x321x215) with different transfer functions. We render 36 videos
from each volume data and each video contains 100 frames. Each of these videos
start from a random camera position in the scene that is selected from a large
candidate pool. We split the dataset generated from each scene into 3 sets: training (80%), validation (10%), and test (10%).
    For ground truth high-resolution images, we render the volume data at
1920x1920 resolution with temporal anti-aliasing turned on. For low-resolution
input, the temporal anti-aliasing feature is turned off and the images are rendered at varying resolutions: 480x480, 240x240, and 120x120. In image and video
super-resolution literature, it is common practice to use blurred and downscaled
versions of the original high-resolution image as low-resolution input to the network. In contrast, our low-resolution input is directly generated from our volume
renderer. We train different networks to perform 4x4, 8x8, and up to 16x16 superresolution with the respective combination of low and high-resolution images.


<!-- PK PAGE 9 doc=math_p10 -->
Super-resolution for volume rendering      9
Table 1. Quantitative comparison between two networks: with and without the use of
$$
additional RGBA information from the point of maximum alpha
$$
                     With additional information Without additional information
      Volume Dataset PSNR(dB) SSIM               PSNR(dB) SSIM
      CTA-Cardio     38.09      0.9705           37.07     0.9683
      Manix          37.92      0.9651           36.96     0.9631
      CTA-Abdomen 31.89         0.9560           31.44     0.9557
                                 a) Bicubic   b) Without    c) With     d) Ground
                                              additional   additional      Truth
                                               feature      feature
Fig. 8. Visual comparison for 8x8 upscaling with different techniques on the CTACardio dataset. Images on the top and bottom row (enlarged sections of the blue and
yellow boxes respectively) are from two different sections of CTA-Chest. a) represents
input upscaled with bicubic interpolation. Comparing b) and c), we notice improved
edges and details in the upscaled image when the super-resolution network is supplemented with additional RGBA information from the point of highest contribution
5     Evaluation
For the evaluation, we compare the performance of different variants of our
network on Peak Signal To Noise Ratio (PSNR) and Structural Similarity Index
(SSIM). The reported results are observed on the validation set.
5.1     Performance Gain with Additional Feature at the Input
As discussed in section 3.1.3, including auxiliary features at the input generally benefits the network to achieve additional performance gain. In table 1, we
compare the observed performance metrics for all the three datasets when we
include an additional feature at the input. The additional feature is the RGBA
information obtained from the point of highest contribution along the ray. In
addition to quantitative improvement in both PSNR and SSIM, we also observe
improved edges and details in the reconstructed images as shown in figure 8.
5.2     Performance Gain with Additional Previous Frames
In table 2, we report the quantitative evaluation of three different networks, each
of which takes a different number of previous frames. We are able to make additional gains on both PSNR and SSIM with additional previous frames supplied


<!-- PK PAGE 10 doc=math_p10 -->
10      S. Devkota et al.
Table 2. Performance gain achieved with additional previous frames on CTAAbdomen(table on the left) and CTA-cardio (table on the right) Dataset for 4x4 upsampling. N denotes the number of previous frames.
        N         1      2      3              N         1      2      3
        PSNR (dB) 31.86 32.60 32.98            PSNR (dB) 39.35 39.94 40.49
        SSIM      0.9552 0.9606 0.9638         SSIM      0.9690 0.9755 0.9783
                a) input    b) 1 additional   c) 3 additional   d) Ground
                                 frame            frames           Truth
Fig. 9. Visual comparison for 4x4 upsampling on CTA-Abdomen and CTA-Cardio. a)
is the input to two different networks: one takes a single previous frame whose output
is in b), and the other takes up to 3 previous frames whose output is in c).
to the network. In addition to improvements in the quality of the reconstructed
image (figure 9), incorporating additional frames also improved the temporal
stability of the reconstructed video sequence (video: youtu.be/1FZCQG0SBac).
5.3   Upsampling Ratio
To test the limits of our super-resolution network, we take it one step further
and perform up to 16x super-resolution. The observed PSNR and SSIM metrics
are shown in table 3. The target resolution for all the upsampling ratios was the
same 1920x1920, while the input resolution varied according to the upsampling
ratio. As the upsampling ratio increases, the quality of the reconstructed images steadily deteriorates and the network is unable to reconstruct the low-level
features which are also evident from the images shown in figure 10.
6     Conclusion and Future Work
In our work, we introduced a new pipeline to perform super-resolution for medical volume visualization. Our approach includes several adjustments tailored
to the volumetric nature of the data. Despite our improvements, there are numerous future works that could be performed from here. Currently, all of our
volumetric datasets are static volumetric data without any motion of their own.
The introduction of dynamic volume will add more challenges to the system.


<!-- PK PAGE 11 doc=math_p10 -->
Super-resolution for volume rendering       11
Table 3. Quantitative comparison for various upsampling ratios on the Manix Dataset
                       Upsampling Ratio 4x4    8x8    16x16
                       PSNR(dB)         42.37 37.92 33.65
                       SSIM             0.9787 0.9651 0.9471
Fig. 10. Visual comparison for various upscaling ratios on the Manix dataset. For all
images, target resolution was 1920x1920.
Another future extension could be supplementing our network with additional
volumetric features from multiple depths inside the volume. We believe this can
further improve the reconstruction ability of the super-resolution network.
    Furthermore, it should be noted that our system was designed for offline application and less importance was given to run-time performance. The current
implementation of our network is able to perform super-resolution at an interactive frame rate of 10 fps (0.1018 seconds per frame). With run-time optimizations and integration of TensorRT, which can provide up to 6x faster accelerated
inference[19], our system has the potential to achieve real-time frame-rate.
References
 1. Anagun, Y., Isik, S., Seke, E.: Srlibrary: Comparing different loss func-
    tions for super-resolution over various convolutional architectures. Journal
    of Visual Communication and Image Representation 61, 178–187 (2019).
    https://doi.org/10.1016/j.jvcir.2019.03.027
 2. Chan, K.C.K., Wang, X., Yu, K., Dong, C., Loy, C.C.: Basicvsr: The search for es-
    sential components in video super-resolution and beyond. CoRR abs/2012.02181
    (2020), https://arxiv.org/abs/2012.02181
 3. Charbonnier, P., Blanc-Feraud, L., Aubert, G., Barlaud, M.: Two deterministic
    half-quadratic regularization algorithms for computed imaging. In: Proceedings of
    1st International Conference on Image Processing. vol. 2, pp. 168–172 vol.2 (1994).
    https://doi.org/10.1109/ICIP.1994.413553
 4. Dong, C., Loy, C.C., He, K., Tang, X.: Image super-resolution using deep convolu-
    tional networks. IEEE Transactions on Pattern Analysis and Machine Intelligence
    38(2), 295–307 (2016). https://doi.org/10.1109/TPAMI.2015.2439281
 5. Edelsten, A., Jukarainen, P., Patney, A.: Truly next-gen: Adding deep learning to
    games and graphics. NVIDIA Sponsored Sessions (Game Dev Conference) (2019)
 6. Goodfellow, I., Pouget-Abadie, J., Mirza, M., Xu, B., Warde-Farley, D., Ozair,
    S., Courville, A., Bengio, Y.: Generative adversarial nets. In: Ghahramani, Z.,


<!-- PK PAGE 12 doc=math_p10 -->
12      S. Devkota et al.
    Welling, M., Cortes, C., Lawrence, N., Weinberger, K. (eds.) Advances in Neural
    Information Processing Systems. vol. 27. Curran Associates, Inc. (2014)
 7. He, K., Zhang, X., Ren, S., Sun, J.: Deep residual learning for image recognition.
    In: IEEE CVPR. pp. 770–778 (2016). https://doi.org/10.1109/CVPR.2016.90
 8. Hofmann, N., Martschinke, J., Engel, K., Stamminger, M.: Neural denoising for
    path tracing of medical volumetric data. Proc. ACM Comput. Graph. Interact.
    Tech. 3(2) (aug 2020). https://doi.org/10.1145/3406181
 9. Isobe, T., Jia, X., Gu, S., Li, S., Wang, S., Tian, Q.: Video super-resolution with
    recurrent structure-detail network. ArXiv abs/2008.00455 (2020)
10. Jo, Y., Oh, S.W., Kang, J., Kim, S.J.: Deep video super-resolution network us-
    ing dynamic upsampling filters without explicit motion compensation. In: IEEE
    CVPR. pp. 3224–3232 (2018). https://doi.org/10.1109/CVPR.2018.00340
11. Johnson, J., Alahi, A., Li, F.: Perceptual losses for real-time style transfer and
    super-resolution. ECCV (03 2016)
12. Kim, J., Lee, J.K., Lee, K.M.: Accurate image super-resolution using
    very deep convolutional networks. In: IEEE CVPR. pp. 1646–1654 (2016).
    https://doi.org/10.1109/CVPR.2016.182
13. Kim, T.H., Sajjadi, M.S.M., Hirsch, M., Schölkopf, B.: Spatio-temporal transformer
    network for video restoration. In: ECCV (2018)
14. Koskela, M., Immonen, K., Mäkitalo, M., Foi, A., Viitanen, T., Jääskeläinen,
    P., Kultala, H., Takala, J.: Blockwise multi-order feature regression for real-
    time path-tracing reconstruction. ACM Trans. Graph. 38(5) (jun 2019).
    https://doi.org/10.1145/3269978
15. Ledig, C., Theis, L., Huszar, F., Caballero, J., Cunningham, A., Acosta, A., Aitken,
    A., Tejani, A., Totz, J., Wang, Z., Shi, W.: Photo-realistic single image super-
    resolution using a generative adversarial network. In: CVPR. pp. 105–114 (07
    2017). https://doi.org/10.1109/CVPR.2017.19
16. Lim, B., Son, S., Kim, H., Nah, S., Lee, K.M.: Enhanced deep residual networks
    for single image super-resolution. In: IEEE CVPR Workshops. pp. 1132–1140 (07
    2017). https://doi.org/10.1109/CVPRW.2017.151
17. Lottes, T.: Tssaa temporal super sampling aa (2011), http://timothylottes.
    blogspot.com/2011/04/tssaa-temporal-super-sampling-aa.html
18. Pedersen,      L.J.F.P.:    Temporal      reprojection     anti-aliasing   in    in-
    side        (2018),       http://s3.amazonaws.com/arena-attachments/655504/
    c5c71c5507f0f8bf344252958254fb7d.pdf?1468341463
19. Sardana, A.: Accelerating inference up to 6x faster in pytorch
    with       torch-tensorrt      (2021),      https://developer.nvidia.com/blog/
    accelerating-inference-up-to-6x-faster-in-pytorch-with-torch-tensorrt/
20. Weiss, S., Chu, M., Thuerey, N., Westermann, R.: Volumetric isosur-
    face rendering with deep learning-based super-resolution. IEEE Transac-
    tions on Visualization and Computer Graphics 27(6), 3064–3078 (2021).
    https://doi.org/10.1109/TVCG.2019.2956697
21. Xiao, L., Nouri, S., Chapman, M., Fix, A., Lanman, D., Kaplanyan, A.: Neu-
    ral supersampling for real-time rendering. ACM Trans. Graph. 39(4) (2020).
    https://doi.org/10.1145/3386569.3392376
22. Zhang, Y., Tian, Y., Kong, Y., Zhong, B., Fu, Y.: Residual dense net-
    work for image super-resolution. In: IEEE CVPR. pp. 2472–2481 (06 2018).
    https://doi.org/10.1109/CVPR.2018.00262
<!-- PK END doc=math_p10 -->
