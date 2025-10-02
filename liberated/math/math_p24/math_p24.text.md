PKvNext Document

KEY: math_p24 | math |  | 654d3c16 | 22 | /papers/SimultaneousSuper-resolutionandDepthEstimationforSatelliteImagesBasedonDiffusionModel.pdf
<!-- PK START doc=math_p24 -->


<!-- PK PAGE 1 doc=math_p24 -->
HHS Public Access
                               Author manuscript
                               Rep U S. Author manuscript; available in PMC 2025 August 01.
Author Manuscript
                    Published in final edited form as:
                     Rep U S. 2024 October ; 2024: 411–418. doi:10.1109/iros58592.2024.10802345.
                    Simultaneous Super-resolution and Depth Estimation for
                    Satellite Images Based on Diffusion Model
                    Yuwei Zhou,
                    Yangming Lee
                    Rochester Institute of Technology.
Author Manuscript
                    Abstract
                         Satellite images provide an effective way to observe the earth surface on a large scale. 3D
                         landscape models can provide critical structural information, such as forestry and crop growth.
                         However, there has been very limited research to estimate the depth and the 3D models of the
                         earth based on satellite images. LiDAR measurements on satellites are usually quite sparse.
                         RGB images have higher resolution than LiDAR, but there has been little research on 3D
                         surface measurements based on satellite RGB images. In comparison with in-situ sensing,
                         satellite RGB images are usually low resolution. In this research, we explore the method that
                         can enhance the satellite image resolution to generate super-resolution images and then conduct
                         depth estimation and 3D reconstruction based on higher-resolution satellite images. Leveraging
                         the strong generation capability of diffusion models, we developed a simultaneous diffusion
                         model learning framework that can train diffusion models for both super-resolution images and
Author Manuscript
                         depth estimation. With the super-resolution images and the corresponding depth maps, 3D surface
                         reconstruction models with detailed landscape information can be generated. We evaluated the
                         proposed methodology on multiple satellite datasets for both super-resolution and depth estimation
                         tasks, which have demonstrated the effectiveness of our methodology.
                    I.   Introduction
                                       In the current era of satellite Earth observation, a multitude of missions are operational,
                                       with their numbers continuing to rise [35]. Satellite remote sensing enables the rapid and
                                       efficient collection of global-scale geospatial data, establishing itself as a vital tool for
                                       accessing and understanding geographic information. Utilizing satellite imagery for large-
                                       scale 3D reconstruction of the Earth’s surface provides precise digital models crucial for
Author Manuscript
                                       urban planning, ecological monitoring, disaster response, and other domains. This capability
                                       enhances spatial understanding and cognition of complex environments, highlighting its
                                       significant research and practical value.
                                       However, satellite images are constrained by imaging conditions, storage, and transmission
                                       bandwidth, making it challenging to acquire high spatial resolution images. As remote
                                       sensing imagery finds increasingly diverse applications, the use of lower quality images
                                       significantly reduces the accuracy of key parameter estimates, severely limiting the research
                    yz4891@rit.edu .


<!-- PK PAGE 2 doc=math_p24 -->
Zhou and Lee                                                                                             Page 2
                                   and application of satellite image data. Therefore, developing super-resolution methods for
Author Manuscript
                                   low-resolution (LR) image data to enhance spatial resolution is crucial for enabling more
                                   detailed analysis and applications of satellite imagery. In the actual satellite remote sensing
                                   image acquisition process, due to the long distance of the satellite orbit and the limitation of
                                   the volume and stability of the imaging system, the resolution of the remote sensing image
                                   data obtained after acquisition is often low. In order to obtain high-resolution remote sensing
                                   images, a direct way is to improve the imaging resolution from the hardware perspective,
                                   which can be very expensive and out of control for common users. Satellite images with
                                   higher resolutions can provide more details of the ground information.
                                   The applications of 3D reconstruction technology have become widespread across various
                                   domains. It serves as a vital tool for modern geospatial analysis and urban planning,
                                   enabling the detailed reconstruction of natural landscapes and man-made structures. By
                                   integrating remote sensing data, aerial imagery, and ground-based surveys, detailed threeAuthor Manuscript
                                   dimensional models of diverse landscape elements can now be created. 3D models based
                                   on satellite images can support the understanding of landscape, such as the growth of
                                   forestry and crops. However, 3D reconstruction techniques specifically tailored for satellite
                                   imagery remain scarce. Recently, diffusion models have garnered increasing attention for
                                   their powerful image generation capabilities across various robot perception tasks. Using the
                                   same training dataset, diffusion models mitigate the convergence issues often faced in GAN
                                   training. The algorithmic foundation of diffusion models involves training parameterized
                                   Markov chains through variational inference, demonstrating superior performance over other
                                   generative models like GANs in numerous tasks. As a conditional model dependent on
                                   priors, diffusion models can generate target data samples from noise sampled from a simple
                                   distribution. This involves both forward and inverse processes, where random noise is
                                   injected into data (forward process) and desired data samples are sampled from it (inverse
Author Manuscript
                                   process). In this paper, we develop diffusion methods specifically targeting satellite images,
                                   which can increase the resolution of the satellite images and build 3D models based on the
                                   enhanced satellite images. The significant contributions of this work are outlined as follows:
                                   1) we have created a pipeline that can create the 3D models from the satellite images.
                                   2) In dealing with the low-resolution issues, we have developed diffusion models that can
                                   create super-resolution images, which can leverage the low-resolution image to interpolate
                                   the pixels accurately. 3) We also have developed a diffusion model that can output the depth
                                   maps, which is one of the first methods targeting satellite images. The super-resolution and
                                   depth estimation tasks are learned simultaneously to further enhance each other. The entire
                                   framework is shown in Fig. 1.
                       II.   Related Work
Author Manuscript
                                   Satellites capture images of objects from great distances, resulting in low-resolution images
                                   from satellite remote sensing devices. Traditional methods to enhance resolution, such as
                                   nearest neighbor interpolation, bilinear interpolation, and bicubic interpolation, rely solely
                                   on information provided by the low-resolution image itself. These techniques often struggle
                                   to accurately reconstruct high-resolution details, leading to mismatches when increasing
                                   resolution.
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 3 doc=math_p24 -->
Zhou and Lee                                                                                            Page 3
                                   With the advancement of deep learning, Convolutional Neural Network (CNN)-based
Author Manuscript
                                   approaches have become prominent in the field of super-resolution. These strategies
                                   frequently employ techniques like residual learning [26], [25], [1], [27] or recursive learning
                                   [23]to develop network architectures, significantly improving super-resolution models.
                                   However, CNN-based methods may not effectively capture residual features and often fail
                                   to fully utilize hierarchical features in low-resolution images. Moreover, these networks
                                   have limited capacity for feature extraction within residual blocks, thereby restricting
                                   the learning capability of super-resolution networks. To overcome these limitations,
                                   researchers have introduced Transformer-based networks. Networks such as Hrformer [33]
                                   and Restormer[34] leverage the Transformer’s ability to model long-range dependencies and
                                   are pre-trained on large-scale datasets like ImageNet [4] and COCO[11] By employing
                                   the Vision Transformer [5], these approaches aim to achieve superior results in super-
                                   resolution tasks. Diffusion models have recently gained significant attention in the field
Author Manuscript
                                   of super-resolution due to their robust generative capabilities and iterative refinement
                                   processes. Initial advancements, such as SRDiff (SISR diffusion probabilistic model) [10],
                                   demonstrated the effectiveness of using a forward process to progressively add noise to
                                   images and a reverse process to iteratively remove this noise, resulting in high-quality image
                                   reconstruction.
                                   Super-Resolution via Repeated Refinement (SR3) [21] exemplifies the application of
                                   diffusion models to enhance image resolution. The SR3 framework demonstrates that
                                   diffusion models can effectively address the limitations of CNN-based methods, such as
                                   inadequate feature extraction and limited utilization of hierarchical information. Further
                                   advancements in the field have introduced Latent Diffusion Models (LDMs) [20], which
                                   operate within a lower-dimensional latent space. In addition to these foundational works,
                                   recent research has explored the integration of cross-attention mechanisms and hybrid
Author Manuscript
                                   architectures that combine the strengths of diffusion models and transformers. For example,
                                   reference-based super-resolution (RefSR) [9] leverages cross-attention to incorporate
                                   contextual information from high-resolution reference images. Overall, the integration of
                                   diffusion models into super-resolution frameworks represents a promising direction for
                                   future research and development. By leveraging their iterative refinement capabilities and
                                   ability to model long-range dependencies, diffusion models provide a powerful tool for
                                   overcoming the limitations of traditional and CNN-based methods in the quest for high-
                                   quality, high-resolution image reconstruction
                                   3D reconstruction is pivotal in robotics and automation, leveraging both traditional and deep
                                   learning approaches, which be used for many applications such as crop status estimation
                                   [13] and localization [16], [12]. Traditional methods like Structure from Motion (SfM)
Author Manuscript
                                   [22], simultaneous localization and mapping (SLAM) [15], and Multi-View Stereo (MVS)
                                   [31] reconstruct 3D geometry from images, but these can be computationally intensive
                                   and sensitive to environmental conditions. Recent advancements in deep learning have
                                   transformed this field. Convolutional Neural Networks (CNNs) have shown efficacy in
                                   single-view depth estimation [32] and volumetric reconstruction [28]. For example, methods
                                   such as DeepMVS [2] combine deep learning with MVS for enhanced accuracy. Hybrid
                                   approaches that integrate geometric constraints with neural networks are also gaining
                                   traction [14]. Additionally, Neural Radiance Fields (NeRF) [18] and Transformer-based
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 4 doc=math_p24 -->
Zhou and Lee                                                                                               Page 4
                                     architectures [30] offer innovative solutions by modeling 3D scenes with photorealistic
Author Manuscript
                                     details and effectively capturing global context.
                                     Diffusion models have recently emerged as a promising approach in the field of
                                     3D reconstruction, leveraging their generative capabilities to produce high-quality 3D
                                     models through iterative refinement processes. Early works, such as Denoising Diffusion
                                     Probabilistic Models (DDPM) [7], demonstrated the effectiveness of diffusion processes in
                                     generating detailed structures by progressively refining noisy inputs. Recent advancements
                                     have extended diffusion models to 3D reconstruction tasks. The Diffusion Probabilistic
                                     Model for Point Cloud Generation [17] has shown how diffusion processes can be adapted
                                     to generate 3D point clouds from initial noisy distributions. This model iteratively refines
                                     the point cloud representation, resulting in high-fidelity reconstructions. Similarly, the
                                     application of diffusion models to voxel grids and mesh generation has been explored,
                                     offering new avenues for high-resolution 3D reconstructions with fine-grained details [17].
Author Manuscript
                                     Hybrid approaches that integrate diffusion models with other deep learning techniques have
                                     also been investigated. For example, integrating diffusion processes with convolutional
                                     neural networks (CNNs) and Transformer-based architectures has proven effective in
                                     capturing both local and global features essential for accurate 3D reconstructions [19]. These
                                     methods benefit from the iterative nature of diffusion models, which allows for progressive
                                     enhancement of 3D structures, resulting in more accurate and detailed reconstructions.
                                     Moreover, diffusion models have been applied to multi-view 3D reconstruction tasks, where
                                     they are used to integrate information from multiple 2D images to generate a coherent 3D
                                     model [24]. This approach leverages the ability of diffusion models to handle complex data
                                     distributions, enabling the reconstruction of 3D models with high precision from sparse and
                                     noisy input data.
Author Manuscript
                       III.    Methodology
                                     Our network explores simultaneous super-resolution and depth estimation through the
                                     diffusion model. The entire framework involves super-resolution, depth estimation, and joint
                                     training, described in the following subsections.
                       A.     Joint Training Framework
                                     Training images will be input to the image latent encoder to obtain features for the diffusion
                                     model. Both degraded super-resolution images and the corresponding depth maps are input
                                     into the network, for both SR resolution and depth estimation tasks. The diffusion models
                                     are learned in latent feature space. As depth estimation also involves RGB images as the
                                     input to learn the image content and structure, the latent features from RGB images are also
Author Manuscript
                                     input to the depth estimation branch. Therefore, RGB latent features are jointly learned with
                                     the depth latent features for depth estimation.
                                     Besides feature level joint learning, as both super-resolution and depth estimation interpret
                                     the original images to either high-resolution images or depth maps, the Diffusion U-net will
                                     share the same encoder for both tasks while each task has its own diffusion decoder. This
                                     network design enables network-level joint learning.
                                           Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 5 doc=math_p24 -->
Zhou and Lee                                                                                                 Page 5
                                    The joint learning scheme involves both diffusion optimization and consistency constraint.
Author Manuscript
                                    In the diffusion process, the diffusion models estimate the noise during the inverse process.
                                    Time t is input to the diffusion denoising U-net. The noise output from the diffusion models
                                    ideally should be the same as the noise input during the forward process. The Diffusion
                                    U-net feature outputs are forwarded to super-resolution latent decoder and depth estimation
                                    latent decoder for super-resolution images and depth maps, which we build consistency with
                                    the original input of the framework to further optimize the network.
                       B.   Super-resolution Diffusion
                                    Our approach harnesses the diffusion prior for the task of super-resolution (SR). Drawing
                                    inspiration from the generative power of Stable Diffusion [20] and [29], we incorporate
                                    it as the foundation for our diffusion prior, leading to the development of our super-
                                    resolution diffusion model. We degrade the high-resolution images into low resolution. Low
Author Manuscript
                                    resolution serves as the input while high resolution is the ground truth. The core of our
                                    method revolves around a time-sensitive encoder, which is trained alongside a preexisting,
                                    unmodified Stable Diffusion model. This allows for adaptive conditioning based on the
                                    input image. We reformulate super-resolution as a conditional denoising diffusion problem.
                                    The model is trained to capture the conditional distribution D s ∣ x over the SR image
$$
                                    s ∈ ℝW × H , conditioned on an RGB image x ∈ ℝW × H × 3.
$$
                                    In the forward process, starting from the initial high-resolution image s0 ≔ s, Gaussian
$$
                                    noise is progressively added at each timestep t ∈ 1, …, T , resulting in noisy SR images st
$$
                                    according to the equation below:
$$
                                                                              st = α
$$
                                                                                   ‾ts0 + 1 − α
                                                                                              ‾tϵ,
Author Manuscript
                                                                                                                          (1)
$$
                                    where ϵ N 0, I and α‾t = ∏ts = 1 1 − βs , with β1, …, βT representing the variance schedule. In
$$
                                    the reverse process, the denoising model ϵθ ⋅ , parameterized by θ, is used to progressively
                                    reduce the noise in st and recover st − 1. The goal is to reconstruct the initial SR image s0 from
                                    the noisy images by iteratively applying the denoising model.
                                    The model parameters θ are optimized during training by adding Gaussian noise to pairs
                                    of low-resolution RGB images x and their corresponding SR images s from the training
                                    set. The noise ϵ is randomly sampled at a timestep t, and the model estimates the noise
$$
                                    ϵ̂ = ϵθ st, x, t , minimizing the following objective:
$$
Author Manuscript
                                                                                                           2
$$
                                                                          L = Es0, ϵ N 0, I , t U T ϵ − ϵ̂ 2 .
$$
                                                                                                                          (2)
                                    At inference, starting with a noisy SR image sT , the final SR image s0 is reconstructed
                                    by iteratively applying the learned denoiser ϵθ st, x, t to reduce the noise step by step. To
                                    efficiently train the model, we leverage a pretrained Latent Diffusion Model (LDM), such
                                    as Stable Diffusion v2 [20], which already encodes strong image priors. The architecture
                                          Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 6 doc=math_p24 -->
Zhou and Lee                                                                                                 Page 6
                                   is adapted for super-resolution, conditioned on input low-resolution RGB images. The
Author Manuscript
                                   pretrained VAE from Stable Diffusion is used to encode both the low-resolution RGB image
                                   and the SR image into a latent space.
                                   Diffusion models sometimes exhibit color shifts, as noted in previous studies [3] and
                                   [29]. To resolve this problem, we perform color normalization on the generated image by
                                   matching its mean and variance to those of the low-resolution (LR) input. In particular, let P
                                   denote the LR input and Q̂ the high-resolution (HR) image that is generated. The resulting
                                   color-corrected output, Q, is subsequently calculated as:
                                                                                   Q̂c − μcQ̂ P
$$
                                                                            Qc =             ⋅ σc + μcP
$$
                                                                                      σcQ̂
                                                                                                                          (3)
Author Manuscript
$$
                                   where c ∈ r, g, b denotes the color channel, and μcQ̂ and σcQ̂ (or μcP and σcP ) represent the mean
$$
                                   and standard deviation computed from the c-th channel of Q̂ (or P ), respectively. While
                                   channel matching for pixel-level color correction enhances color fidelity, this method’s
                                   effectiveness may be constrained by the absence of pixel-wise precision. The underlying
                                   limitation stems from its reliance on global statistics, such as the mean and variance of each
                                   channel, which overlooks fine-grained pixel-level semantic details. To address this limitation
                                   and improve visual outcomes in specific scenarios, we introduce a wavelet-based approach
                                   to color correction. This method leverages the fact that color information is primarily found
                                   in the low-frequency components, whereas most degradations occur in the high-frequency
                                   domain. By incorporating the low-frequency content from the input image, we enhance color
                                   fidelity without noticeably affecting overall visual quality. Specifically, for an image I , we
Author Manuscript
                                   apply wavelet decomposition to isolate its high-frequency component Hi and low-frequency
                                   component Li at the i-th scale, as defined below:
$$
                                                                       Li = Ci Li − 1, k , Hi = Li − 1 − Li
$$
                                                                                                                          (4)
$$
                                   where L0 = I, Ci represents the convolution operator with a dilation factor of 2i, and k is the
$$
                                   convolutional kernel. By denoting the l-th low-frequency and high-frequency components of
                                   P or Q̂ as LlP and HlP (or LlQ̂ and HlQ̂), the target high-resolution output Q can be expressed
                                   as:
$$
                                                                                 Q = HlQ̂ + LlP
$$
Author Manuscript
                                                                                                                          (5)
                                   The low-frequency component LlQ̂ of Q̂ is substituted with LlP to mitigate color bias. For
                                   simplicity, we apply pixel-domain color correction as the default approach. While the
                                   outcomes generated by our approach are visually striking, they may differ from the ground
                                   truth due to the intrinsic randomness of the diffusion model. Furthermore, we employ a
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 7 doc=math_p24 -->
Zhou and Lee                                                                                                           Page 7
                                    Controllable Feature Wrapping (CFW) module, as proposed in CodeFormer [36] and [29],
Author Manuscript
                                    providing adjustable control over the trade-off between fidelity and realism.
$$
                                                                                 If = Id + C Ie, Id; θ × w
$$
                                                                                                                                     (6)
                                    where C ⋅ ; θ represents convolutional layers with trainable parameters θ. In this setup,
                                    a smaller w emphasizes the generative capabilities of Stable Diffusion, producing highly
                                    realistic outputs even under severe degradations. On the other hand, a larger w strengthens
                                    structural guidance from the low-resolution (LR) image, thereby improving fidelity. With
                                    the predicted super-resolution images, we also introduce appearance loss, which is to
                                    make the output super-resolution images to be consistent with the original super-resolution
                                    images before degradation. During the training process, we want to maintain the SR image
Author Manuscript
                                    generated by the diffusion model to match with the original input SR image by combining
                                    the Structural Similarity Index Metric (SSIM) structure [6] and L1 as photometric image
                                    loss LSRconsistency.
                                                                             1        1 − SSIM Iij, I ij
                                                                             N∑
                                                                                                                            l
$$
                                                          LSRconsistency =          α                    + 1 − α Ii,l j − I i, j 1
$$
                                                                                             2
                                                                               i, j
                                                                                                                                     (7)
                                    where N is the number of pixels, Iij and I ij respectively represent input original SR image
                                    and its output SR image. And Iij is i th row and j th column pixel in the original input image.
$$
                                    The simplified SSIM with 3 × 3 block filter is used. And let α = 0.85.
$$
Author Manuscript
                                    The attention layers in Stable Diffusion are highly sensitive to image resolution, often
                                    producing suboptimal outputs for resolutions that differ from the model’s training settings.
                                    This limitation restricts the practical applicability. We divide the larger image into multiple
                                    overlapping patches, processing each one independently. This approach allows for effective
                                    enhancement across images of varying resolutions.
                       C.   Depth Estimation Diffusion
                                    Similarly, we estimate the scene depth through conditional denoising diffusion as [8].
                                    Our model is trained to model the conditional probability distribution D d ∣ x , where
$$
                                    the depth map d ∈ ℝW × H is predicted based on an RGB image x ∈ ℝW × H × 3. In the
$$
                                    forward diffusion process, starting with the original depth map d0 ≔ d, Gaussian noise is
$$
                                    progressively added over a sequence of timesteps t ∈ 1, …, T , producing noisy depth maps
$$
Author Manuscript
                                    dt as described by the equation:
$$
                                                                                   dt = α
$$
                                                                                        ‾td0 + 1 − α
                                                                                                   ‾tϵ,
                                                                                                                                     (8)
                                          Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 8 doc=math_p24 -->
Zhou and Lee                                                                                                Page 8
$$
                                   where ϵ N 0, I represents Gaussian noise, α‾t = ∏ts = 1 1 − βs , and β1, …, βT defines the
$$
Author Manuscript
                                   noise variance schedule. During the reverse process, the model ϵθ ⋅ , parameterized by θ,
                                   iteratively reduces the noise from the noisy depth map dt to recover the previous depth map
                                   dt − 1.
                                   Training involves optimizing the parameters θ by adding noise to pairs of input RGB images
                                   x and their corresponding depth maps d, drawn from the dataset. Noise ϵ is introduced at a
$$
                                   random timestep t, and the model estimates the noise ϵ̂ = ϵθ dt, x, t . The loss function that is
$$
                                   minimized during training is given by:
                                                                                                          2
$$
                                                                         L = Ed0, ϵ N 0, I , t U T ϵ − ϵ̂ 2 .
$$
                                                                                                                        (9)
Author Manuscript
                                   An initial noisy depth map dT sampled from Gaussian noise is input during the inference
                                   stage. The trained denoising network ϵθ dt, x, t is then applied iteratively to progressively
                                   refine the noisy depth map and reconstruct the clean depth map d0.
                                   To enable efficient training, we still employ a pre-trained Latent Diffusion Model (LDM),
                                   specifically Stable Diffusion v2 [20] as super-resolution. We make use of the pre-trained
                                   Variational Autoencoder (VAE) from Stable Diffusion to map both the RGB image and
                                   the depth map into a shared latent space. This latent encoding is crucial for training the
                                   denoising model. Since the VAE was initially developed for RGB images, the depth map
                                   is expanded by duplicating it across three channels, thereby mimicking the structure of
                                   an RGB input. Additionally, the depth map is normalized to maintain affine invariance.
                                   The VAE efficiently reconstructs the depth map with minimal loss, verifying its ability to
Author Manuscript
                                   represent depth data accurately.
                                   In order to condition the latent denoiser ϵθ z d t, z x , t on the input RGB image x, we
                                   concatenate the latent representations of both the depth map and the image into a unified
$$
                                   input, denoted by zt = cat z d t, z x . Consequently, the denoising network’s input channels
$$
                                   are doubled to accommodate this combined latent space. The first layer is carefully adjusted
                                   to ensure consistent activation levels across the expanded input space.
                                   The ground truth depth maps undergo normalization to ensure they predominantly lie
                                   within the range of [−1, 1], corresponding to the input range expected by the VAE. This
                                   transformation guarantees that the depth representations are affine-invariant, regardless of
                                   variations in the underlying data distribution. The normalization process is defined by the
Author Manuscript
                                   following equation:
                                                                                   d − d2
$$
                                                                            d=             − 0.5 × 2,
$$
                                                                                  d95 − d5
                                                                                                                        (10)
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 9 doc=math_p24 -->
Zhou and Lee                                                                                                  Page 9
                                   where d5 and d95 represent the 5% and 95% percentiles of the depth values in d. This
Author Manuscript
                                   normalization step is critical for ensuring that the model focuses solely on estimating
                                   affine-invariant depth.
                                   Building on prior methodologies that employed non-Gaussian noise models or modified
                                   schedules, we introduce a multi-scale noise strategy combined with an annealing schedule
                                   to further optimize training efficiency. Multi-resolution noise is constructed by layering
                                   Gaussian noise across different scales, and as the diffusion process advances, the annealing
                                   schedule gradually shifts towards conventional Gaussian noise.
                                   To generate predictions, the input image is encoded into the latent space, while the depth
                                   latent is initialized with Gaussian noise. The depth map is progressively denoised according
                                   to the fine-tuning schedule, utilizing the DDIM (Denoising Diffusion Implicit Models)
                                   technique for non-Markovian sampling to expedite inference. The final depth map is
Author Manuscript
                                   produced by decoding the latent representation and averaging the output across channels.
                                   The final depth map is enforced to be consistent with the depth ground truth, as the
                                   following equation.
                                                                             α
$$
                                                           LDconsistency =     1 − SSIM dest, dgt + 1 − α   dest − dgt 1
$$
                                                                             2
                                                                                                                           (11)
                                   Here dest refers to the estimated depth from the diffusion model and dgt is the ground truth.
                                   Through L2 loss and SSIM loss, the depth value difference and the structural information
                                   are learned. Due to the inherent stochastic nature of the inference phase, predictions can
Author Manuscript
                                   vary depending on the initial noise sample. To mitigate this variance, we introduce a
                                   test-time ensembling technique, where multiple predictions are aggregated for enhanced
                                   depth estimation. Each prediction is adjusted via joint optimization of scale and shift
                                   parameters, and the final depth map is derived by computing the median across the ensemble
                                   of predictions.
                       IV.    Experiments
                       Dataset and Degradation Process:
                                   To evaluate the performance of our diffusion model in both super-resolution and depth
                                   estimation, we conducted experiments using the DCF2019, EuroSAT, and CORE3D
                                   datasets. The DCF2019 dataset comprises a diverse set of high-resolution satellite images,
                                   making it particularly suitable for assessing both super-resolution and depth estimation
Author Manuscript
                                   capabilities in remote sensing applications. EuroSAT, known for its multispectral satellite
                                   imagery, provides a broader spectrum of data for super-resolution tasks, while CORE3D
                                   includes detailed 3D data, allowing us to validate the model’s depth estimation performance
                                   in complex urban and natural environments.
                                   For super-resolution tasks, we applied a controlled degradation process to simulate low-
                                   resolution (LR) images. The high-resolution (HR) images from all datasets were down-
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 10 doc=math_p24 -->
Zhou and Lee                                                                                           Page 10
                                   scaled using bicubic interpolation with a scaling factor of 4. This process effectively reduces
Author Manuscript
                                   the resolution and removes fine details that are critical for accurate remote sensing analysis.
                                   Additionally, we introduced Gaussian noise, compression artifacts, and blur to mimic real-
                                   world conditions. For instance, Gaussian noise with a standard deviation of 5 was applied to
                                   the DCF2019 dataset, and 7.5 for EuroSAT, while CORE3D was subjected to both noise and
$$
                                   motion blur, using a Gaussian kernel of size 7×7.
$$
                                   For depth estimation tasks, particularly on DCF2019 and CORE3D, we processed the
                                   satellite images by generating pseudo-ground truth depth maps. This was done by aligning
                                   images with available Digital Elevation Models (DEMs) for DCF2019, and using structured-
                                   light techniques to generate precise ground-truth depth maps for CORE3D. These depth
                                   maps serve as reference data, facilitating the model’s learning and evaluation in varied
                                   terrain and urban settings.
Author Manuscript
                       Training and Evaluation:
                                   The diffusion model was trained on these degraded LR images using a progressive denoising
                                   framework for super-resolution, and iterative refinement for depth estimation. The super-
                                   resolution training involved 250 epochs with a batch size of 8, utilizing the Adam optimizer
$$
                                   with an initial learning rate of 5 × 10−5, adjusted dynamically using a cosine annealing
$$
                                   schedule. Depth estimation training was similarly structured, with pre-training on CORE3D
                                   followed by fine-tuning on DCF2019 to adapt to different depth estimation challenges.
                                   For evaluation, we employed standard metrics such as Peak Signal-to-Noise Ratio (PSNR)
                                   and Structural Similarity Index (SSIM) for super-resolution, along with Spectral Angle
                                   Mapper (SAM) for assessing spectral fidelity. For depth estimation, we utilized Absolute
                                   Relative Error (AbsRel), Root Mean Square Error (RMSE), and accuracy thresholds δ1, δ2, δ3
Author Manuscript
                                   to measure the precision and reliability of the depth maps generated by our model.
                       A.   Comparison with Existing Methods
                                   Our diffusion-based approach was systematically evaluated against state-of-the-art methods
                                   across both super-resolution and depth estimation tasks, using datasets including DCF2019,
                                   EuroSAT, and CORE3D. The visual result for super-resolution are shown in Fig. 2, Fig.
                                   3 and Fig. 4, which clearly demonstrate that our results outperform other state-of-the-art
                                   methods. For depth estimation, as shown in Fig. 6 and Fig. 5, our results also show better
                                   outcomes in depth detail preservation. The quantitative results, as summarized in Tables I
                                   and II, clearly demonstrate the superiority of our model in both quantitative and qualitative
                                   metrics, highlighting its robustness and effectiveness across diverse scenarios.
Author Manuscript
                                   In the domain of super-resolution, our model consistently outperformed existing methods
                                   like SeeSR, SAFMN, DAT, SRFormer, and CodeFormer, as Fig. 2, Fig. 3, Fig. 4 and
                                   Table I. Specifically, it achieved higher PSNR and SSIM scores across all datasets, with
                                   an average improvement of 0.95 dB in PSNR and a 0.012 increase in SSIM over the
                                   next best-performing method. This performance reflects our model’s enhanced capability
                                   to recover high-frequency details and produce sharper, more accurate images—critical for
                                   high-resolution satellite imagery analysis. Additionally, our model excelled in preserving
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 11 doc=math_p24 -->
Zhou and Lee                                                                                                   Page 11
                                   spectral fidelity, as evidenced by lower SAM values, which are crucial for remote sensing
Author Manuscript
                                   applications. Our model also has the lowest FID value. Despite the increased complexity
                                   of the diffusion process, our method maintained competitive inference times, ensuring that
                                   high-quality super-resolution can be achieved without sacrificing computational efficiency,
                                   making it suitable for real-time or large-scale applications.
                                   In the depth estimation tasks, our model also demonstrated superior performance compared
                                   to methods like EVP, Marigold, Depth-anything, and Ecodepth as Fig. 6 and Fig. 5. As
                                   shown in Table II, our method consistently achieved the lowest Absolute Relative Error
                                   (AbsRel) and Root Mean Square Error (RMSE) across all datasets, indicating its ability
                                   to accurately estimate depth even in complex scenes with varying terrains and structures.
                                   The model also outperformed other methods in all three δ accuracy thresholds (δ1, δ2, δ3),
                                   showing a higher proportion of accurate depth predictions. This is particularly significant
                                   for remote sensing applications, where precise depth estimation is crucial for tasks such as
Author Manuscript
                                   terrain mapping and 3D reconstruction.
                                   Moreover, the comparison highlights that while existing methods like EVP and Marigold
                                   perform adequately, they tend to struggle in scenarios involving complex geometries and
                                   significant depth discontinuities—areas where our diffusion-based approach excels. The
                                   iterative refinement process of our model effectively captures fine details and preserves
                                   structural integrity in the estimated depth maps, setting a new benchmark in the field. We
                                   also extended the depth map to 3D models, as Fig. 7. From various angles, the 3D models
                                   show details structure information for various landscapes, e.g., trees, grass, buildings, lakes,
                                   etc. In summary, our diffusion-based model offers significant improvements in both super-
                                   resolution and depth estimation. The enhanced accuracy, coupled with robust generalization
                                   across diverse datasets, underscores the potential of our approach for widespread adoption in
Author Manuscript
                                   robotics and automation applications, particularly in challenging real-world scenarios.
                       V.    Conclusion
                                   This research aims to enhance satellite image resolution for 3D landscape modeling and
                                   depth estimation. Due to the limitations of sparse LiDAR data and low-resolution RGB
                                   images from satellites, the study introduces a method that generates super-resolution images
                                   using diffusion models, enabling more detailed 3D reconstructions. Gaussian noise is added
                                   to the low-resolution satellite and depth images, which are then processed by a latent
                                   encoder to extract features. A stable diffusion model, followed by a task-specific denoising
                                   U-net, learns the noise distribution. Both the super-resolution and depth estimation tasks
                                   share the same U-net encoder, with each task using its own diffusion desnoising decoder.
                                   The denoised latent features are then decoded to produce super-resolution images and depth
Author Manuscript
                                   maps. The networks are further refined through consistency constraints with noise inputs
                                   and original ground truth. The validation on multiple satellite datasets demonstrates the
                                   effectiveness in generating high-quality 3D models and depth maps of our framework.
                       Acknowledgement
                                   The work is under support of NIH Grant Number 1R15EB034519-01A1 and NSF Grant Number 2346790.
                                          Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 12 doc=math_p24 -->
Zhou and Lee                                                                                                 Page 12
                       References
Author Manuscript
                                   [1]. Chauhan Karansingh, Patel Shail Nimish, Kumhar Malaram, Bhatia Jitendra, Tanwar Sudeep,
                                         Davidson Innocent Ewean, Mazibuko Thokozile F, and Sharma Ravi. Deep learning-based
                                         single-image super-resolution: A comprehensive review. IEEE Access, 2023.
                                   [2]. Chen Rui, Han Songfang, Xu Jing, and Su Hao. Point-based multi-view stereo network. In ICCV,
                                         pages 1538–1547, 2019
                                   [3]. Choi Jooyoung, Lee Jungbeom, Shin Chaehun, Kim Sungwon, Kim Hyunwoo, and Yoon Sungroh.
                                         Perception prioritized training of diffusion models. In CVPR, pages 11472–11481, 2022.
                                   [4]. Deng Jia, Dong Wei, Socher Richard, Li Li-Jia, Li Kai, and Fei-Fei Li. Imagenet: A large-scale
                                         hierarchical image database. In CVPR, pages 248–255, 2009.
                                   [5]. Dosovitskiy Alexey, Beyer Lucas, Kolesnikov Alexander, Weissenborn Dirk, Zhai Xiaohua,
                                         Unterthiner Thomas, Dehghani Mostafa, Minderer Matthias, Heigold Georg, Gelly Sylvain, et
$$
                                         al. An image is worth 16×16 words: Transformers for image recognition at scale. arXiv preprint
$$
                                         arXiv:2010.11929, 2020.
                                   [6]. Godard Clément, Aodha Oisin Mac, and Brostow Gabriel J. Unsupervised monocular depth
Author Manuscript
                                         estimation with left-right consistency. In CVPR, 2017.
                                   [7]. Ho Jonathan, Jain Ajay, and Abbeel Pieter. Denoising diffusion probabilistic models. NeurIPS,
                                         33:6840–6851, 2020.
                                   [8]. Ke Bingxin, Obukhov Anton, Huang Shengyu, Metzger Nando, Daudt Rodrigo Caye,
                                         and Schindler Konrad. Repurposing diffusion-based image generators for monocular depth
                                         estimation. In CVPR, pages 9492–9502, 2024.
                                   [9]. Li G, Xing W, Zhao L, Lan Z, Sun J, Zhang Z, Zhang Q, Lin H, and Lin Z. Self-reference
                                         image super-resolution via pre-trained diffusion large model and window adjustable transformer.
                                         In MM, pages 7981–7992, 2023.
                                   [10]. Li Haoying, Yang Yifan, Chang Meng, Chen Shiqi, Feng Huajun, Xu Zhihai, Li Qi,
                                         and Chen Yueting. Srdiff: Single image super-resolution with diffusion probabilistic models.
                                         Neurocomputing, 479:47–59, 2022.
                                   [11]. Lin Tsung-Yi, Maire Michael, Belongie Serge, Hays James, Perona Pietro, Ramanan Deva,
                                         Dollár Piotr, and Zitnick C Lawrence. Microsoft coco: Common objects in context. In ECCV,
Author Manuscript
                                         2014.
                                   [12]. Lu Guoyu. Image-based localization for self-driving vehicles based on online network adjustment
                                         in a dynamic scope. In IJCNN, 2022.
                                   [13]. Lu Guoyu. Bird-view 3d reconstruction for crops with repeated textures. In IEEE IROS, pages
                                         4263–4270, 2023
                                   [14]. Lu Guoyu. Deep unsupervised visual odometry via bundle adjusted pose graph optimization. In
                                         IEEE ICRA, pages 6131–6137, 2023.
                                   [15]. Lu Guoyu. Slam based on camera-2d lidar fusion. In IEEE International Conference on Robotics
                                         and Automation (ICRA), 2024.
                                   [16]. Lu Guoyu, Yan Yan, Ren Li, Song Jingkuan, Sebe Nicu, and Kambhamettu Chandra. Localize
                                         me anywhere, anytime: a multi-task point-retrieval approach. In IEEE ICCV, pages 2434–2442,
                                         2015.
                                   [17]. Luo Shitong and Hu Wei. Diffusion probabilistic models for 3d point cloud generation. In CVPR,
                                         pages 2837–2845, 2021.
                                   [18]. Mildenhall Ben, Srinivasan Pratul P, Tancik Matthew, Barron Jonathan T, Ramamoorthi Ravi, and
Author Manuscript
                                         Ng Ren. Nerf: Representing scenes as neural radiance fields for view synthesis. Communications
                                         of the ACM, pages 99–106, 2021.
                                   [19]. Mo Shentong, Xie Enze, Chu Ruihang, Hong Lanqing, Niessner Matthias, and Li Zhenguo.
                                         Dit-3d: Exploring plain diffusion transformers for 3d shape generation. NeurIPS, 36, 2024.
                                   [20]. Rombach Robin, Blattmann Andreas, Lorenz Dominik, Esser Patrick, and Ommer Björn. High-
                                         resolution image synthesis with latent diffusion models. In CVPR, pages 10684–10695, 2022.
                                          Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 13 doc=math_p24 -->
Zhou and Lee                                                                                               Page 13
                                   [21]. Saharia Chitwan, Ho Jonathan, Chan William, Salimans Tim, Fleet David J, and Norouzi
                                         Mohammad. Image super-resolution via iterative refinement. IEEE TPAMI, 45(4):4713–4726,
Author Manuscript
                                         2022.
                                   [22]. Schonberger Johannes L and Frahm Jan-Michael. Structure-from-motion revisited. In CVPR,
                                         pages 4104–4113, 2016.
                                   [23]. Tai Ying, Yang Jian, and Liu Xiaoming. Image super-resolution via deep recursive residual
                                         network. In CVPR, pages 3147–3155, 2017.
                                   [24]. Tang Shitao, Chen Jiacheng, Wang Dilin, Tang Chengzhou, Zhang Fuyang, Fan Yuchen, Chandra
                                         Vikas, Furukawa Yasutaka, and Ranjan Rakesh. Mvdiffusion++: A dense high-resolution
                                         multi-view diffusion model for single or sparse-view 3d object reconstruction. arXiv preprint
                                         arXiv:2402.12712, 2024.
                                   [25]. Tian Chunwei, Xu Yong, Zuo Wangmeng, Lin Chia-Wen, and Zhang David. Asymmetric cnn for
                                         image superresolution. IEEE TSMC-S, 52(6):3718–3730, 2021.
                                   [26]. Tian Chunwei, Xu Yong, Zuo Wangmeng, Zhang Bob, Fei Lunke, and Lin Chia-Wen. Coarse-to-
                                         fine cnn for image super-resolution. TMM, 23:1489–1502, 2020
                                   [27]. Vasilescu Vlad, Datcu Mihai, and Faur Daniela. A cnn-based sentinel-2 image super-resolution
Author Manuscript
                                         method using multiobjective training. IEEE-TGRS, 61:1–14, 2023.
                                   [28]. Wang Fangjinhua, Galliani Silvano, Vogel Christoph, Speciale Pablo, and Pollefeys Marc.
                                         Patchmatchnet: Learned multi-view patchmatch stereo. In CVPR, pages 14194–14203, 2021.
                                   [29]. Wang Jianyi, Yue Zongsheng, Zhou Shangchen, Chan Kelvin CK, and Loy Chen Change.
                                         Exploiting diffusion prior for real-world image super-resolution. IJCV, pages 1–21, 2024.
                                   [30]. Wu Xianfeng, Liu Xinyi, Wang Junfei, Wu Xianzu, Lai Zhongyuan, Zhou Jing, and Liu Xia.
                                         Transformer-based point cloud classification. In ISAIR, pages 218–225. Springer, 2022.
                                   [31]. Yao Yao, Luo Zixin, Li Shiwei, Fang Tian, and Quan Long. Mvsnet: Depth inference for
                                         unstructured multi-view stereo. In ECCV, 2018.
                                   [32]. Yin Zhichao and Shi Jianping. Geonet: Unsupervised learning of dense depth, optical flow and
                                         camera pose. In CVPR, 2018.
                                   [33]. Yuan Yuhui, Fu Rao, Huang Lang, Lin Weihong, Zhang Chao, Chen Xilin, and Wang Jingdong.
                                         Hrformer: High-resolution vision transformer for dense predict. NeurIPS, 34:7281–7293, 2021.
                                   [34]. Syed Waqas Zamir Aditya Arora, Khan Salman, Hayat Munawar, Khan Fahad Shahbaz, and
Author Manuscript
                                         Yang Ming-Hsuan. Restormer: Efficient transformer for high-resolution image restoration. In
                                         CVPR, 2022.
                                   [35]. Zhao Qiang, Yu Le, Du Zhenrong, Peng Dailiang, Hao Pengyu, Zhang Yongguang, and Gong
                                         Peng. An overview of the applications of earth observation satellite data: impacts and future
                                         trends. Remote Sensing, 14(8):1863, 2022.
                                   [36]. Zhou Shangchen, Chan Kelvin, Li Chongyi, and Loy Chen Change. Towards robust blind face
                                         restoration with codebook lookup transformer. NeurIPS, 35:30599–30611, 2022.
Author Manuscript
                                         Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 14 doc=math_p24 -->
Zhou and Lee                                                                                           Page 14
Author Manuscript
                                   Fig. 1.
                                   The framework for our simultaneous super-resolution and depth estimation algorithm
Author Manuscript
                                   targeting satellite images. Gaussian noise is added to the low-resolution satellite images
                                   and the depth images. The noisy images are input to the latent encoder to learn the
                                   latent features. A fixed stable diffusion model followed by task-specific denoising U-net
                                   learns the noise distribution. As both tasks interpolate super-resolution images and depth
                                   maps based on the same image inputs and latent features, the super-resolution and depth
                                   estimation diffusion models share the same diffusion desnoising U-net encoder. With the
                                   shared encoded features, each task has its own diffusion desnoising decoder to output the
                                   noise, which we build the consistency constraint with the input noise. The denoised latent
                                   features are input to the latent decoder to output the estimated super-resolution images and
                                   depth maps, which are utilized to build consistency constraints with the original ground
                                   truth.
Author Manuscript
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 15 doc=math_p24 -->
Zhou and Lee                                                                                         Page 15
Author Manuscript
Author Manuscript
                                   Fig. 2.
                                   Super-resolution results on the DCF2019 dataset. The figure compares our diffusion-based
                                   model with other state-of-the-art methods, showcasing the superior ability of our approach
                                   to recover fine details and textures.
Author Manuscript
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 16 doc=math_p24 -->
Zhou and Lee                                                                                         Page 16
Author Manuscript
                                   Fig. 3.
                                   Super-resolution results on the EuroSAT dataset. The comparison highlights the
Author Manuscript
                                   effectiveness of our model in preserving spectral fidelity and producing sharper images
                                   compared to other methods.
Author Manuscript
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 17 doc=math_p24 -->
Zhou and Lee                                                                                        Page 17
Author Manuscript
Author Manuscript
                                   Fig. 4.
                                   Super-resolution results on the CORE3D dataset. Our model demonstrates superior
                                   performance in reconstructing high-resolution images with better structural consistency and
                                   accuracy.
Author Manuscript
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 18 doc=math_p24 -->
Zhou and Lee                                                                                      Page 18
Author Manuscript
Author Manuscript
                                   Fig. 5.
                                   Depth estimation results on the DCF2019 dataset. The comparison shows that our diffusion-
                                   based model achieves lower error rates and higher accuracy in depth prediction compared
                                   with existing methods.
Author Manuscript
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 19 doc=math_p24 -->
Zhou and Lee                                                                                       Page 19
Author Manuscript
Author Manuscript
                                   Fig. 6.
                                   Depth estimation results on the CORE3D dataset. This figure illustrates the robustness of
                                   our approach in handling complex geometric structures and varying terrains, outperforming
                                   other state-of-the-art models.
Author Manuscript
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 20 doc=math_p24 -->
Zhou and Lee                                                                                         Page 20
Author Manuscript
Author Manuscript
Author Manuscript
                                   Fig. 7.
                                   3D model experimental results, showcasing different angles of the reconstructed model.
                                   This figure highlights the capability of our approach to accurately capture and reconstruct
                                   3D structures from multiple perspectives, demonstrating superior detail preservation across
                                   various angles.
Author Manuscript
                                             Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 21 doc=math_p24 -->
Zhou and Lee                                                                               Page 21
                                                                               TABLE I
                    Super-Resolution Results on DCF2019, EuroSAT, and CORE3D Datasets
Author Manuscript
                      Dataset       Method      PSNR (dB)   SSIM     SAM     LPIPS    FID
                                      Ours        29.87      0.912   3.15     0.112   36.4
                                     SeeSR        28.92      0.901   3.34     0.126   39.2
                                    SAFMN         28.56      0.896   3.48     0.131   44.8
                     DCF2019
                                      DAT         28.12      0.893   3.61     0.140   47.6
                                   SRFormer       28.74      0.898   3.42     0.128   48.7
                                   CodeFormer     28.33      0.890   3.53     0.135   46.2
                                      Ours        31.12      0.925   2.92     0.098   54.8
                                     SeeSR        30.24      0.913   3.10     0.109   61.1
                                    SAFMN         29.87      0.910   3.24     0.114   63.4
                     EuroSAT
                                      DAT         29.45      0.905   3.31     0.122   68.6
                                   SRFormer       30.02      0.911   3.17     0.111   69.5
Author Manuscript
                                   CodeFormer     29.66      0.906   3.28     0.117   65.9
                                      Ours        30.48      0.918   3.07     0.105   35.1
                                     SeeSR        29.56      0.907   3.22     0.116   41.5
                                    SAFMN         29.14      0.903   3.35     0.121   42.8
                     CORE3D
                                      DAT         28.78      0.898   3.41     0.129   48.9
                                   SRFormer       29.38      0.905   3.27     0.119   40.3
                                   CodeFormer     28.95      0.899   3.39     0.124   45.7
Author Manuscript
Author Manuscript
                                                Rep U S. Author manuscript; available in PMC 2025 August 01.


<!-- PK PAGE 22 doc=math_p24 -->
Zhou and Lee                                                                                   Page 22
                                                                                  TABLE II
                    Depth Estimation Results on DCF2019, EuroSAT, and CORE3D Datasets
Author Manuscript
                     Dataset          Method          AbsRel ↓   RMSE ↓     Log10 ↓    δ1      δ2      δ3
                                       Ours            0.085       4.12      0.036     0.927   0.974   0.992
                                   Depth-anything      0.093       4.45      0.039     0.915   0.966   0.988
                     DCF2019         Marigold          0.098       4.52      0.041     0.912   0.963   0.985
                                       EVP             0.102       4.63      0.043     0.907   0.961   0.983
                                     Ecodepth          0.095       4.48      0.040     0.910   0.964   0.986
                                       Ours            0.081       3.95      0.035     0.930   0.976   0.991
                                   Depth-anything      0.089       4.23      0.038     0.918   0.970   0.989
                     CORE3D          Marigold          0.092       4.28      0.039     0.915   0.967   0.987
                                       EVP             0.096       4.35      0.041     0.911   0.964   0.986
                                     Ecodepth          0.090       4.25      0.038     0.916   0.968   0.988
Author Manuscript
Author Manuscript
Author Manuscript
                                                    Rep U S. Author manuscript; available in PMC 2025 August 01.
<!-- PK END doc=math_p24 -->
