PKvNext Document

KEY: math_p21 | math |  | a9ba2de4 | 8 | /papers/MultiSourceDepthEstimationUtilizingRealSyntheticandMonocularDepthDatawithCustomLossFunctions.pdf
<!-- PK START doc=math_p21 -->


<!-- PK PAGE 1 doc=math_p21 -->
Signal, Image and Video Processing (2025) 19:876
https://doi.org/10.1007/s11760-025-04496-8
    ORIGINAL PAPER
Multi-Source Depth Estimation: Utilizing Real, Synthetic, and
Monocular Depth Data with Custom Loss Functions
Muhammad Adeel Hafeez1 · Ganesh Sistu2 · Michael G. Madden1 · Ihsan Ullah1
Received: 26 June 2025 / Revised: 29 June 2025 / Accepted: 1 July 2025 / Published online: 15 July 2025
© The Author(s) 2025
Abstract
Depth estimation from 2D images is an essential task in computer vision with applications in scene understanding, robotics,
and autonomous systems. The performance of supervised depth models depends on network design, loss formulation, data
quality, and fine-tuning strategy. In this study, we propose a progressive fine-tuning approach for metric (absolute-scale)
depth estimation. Our method uses transfer learning across multiple indoor datasets: real, synthetic, and pseudo-labelled.
DenseNet-169 and EfficientNet-B0 backbones are fine-tuned on MIT-G, SUN-RGBD, SceneNet, and NYU2. We apply a
three-scale combined loss with weighted MAE + Edge + SSIM terms at full, 1/2, and 1/4 resolution, and add a perceptual VGG
component, while we keep the global coefficients of the loss at 1 for simplicity and reproducibility. We find that EfficientNet
performs better on the smaller datasets, while DenseNet benefits most from the million-image SceneNet stage and reaches
$$
REL 0.105 and RMSE 0.359 on NYU2, comparable to recent transformer baselines yet using 6× fewer parameters. The
$$
pseudo-labelled MIT-G data is used as a warm-start and shows the potential of reducing annotation cost. All headline metrics
results are based on sensor ground-truth data, avoiding circular evaluation. Qualitative analysis and zero-shot tests on the
unseen iBims-1 benchmark confirm that the models generalise and produce coherent, detailed depth maps across diverse
indoor scenes. The proposed pipeline thus offers a balanced trade-off between accuracy and computational cost for practical
indoor depth estimation.
Keywords Depth Estimation · Transfer Learning · Monocular Depth Estimation · Progressive Fine-Tuning
1 Introduction                                                                research has shifted toward image-based depth estimation
                                                                              from monocular or stereo cameras.
Depth estimation is an important computer-vision task that                       Early image-based work relied on geometric cues (e.g.
provides information about the 3D geometry of a scene,                        vanishing points [4]) or graphical-model formulations such
with applications in robotics [1], autonomous driving [2],                    as MRF/CRF [5], but these methods struggled in complex
augmented reality [3], and more. Traditional approaches                       scenes. The recent advancement of deep learning, from conrely on specialised sensors such as ultrasonic sensors, radar,                volutional neural networks (CNNs) through recent vision
or LiDAR. Because these sensors increase system cost,                         transformers (ViTs), has dramatically improved accuracy and
                                                                              robustness of image based depth estimation [6].
B Ihsan Ullah                                                                    Image-based depth estimation can be divided into binocu-
     ihsan.ullah@universityofgalway.ie                                        lar depth estimation (BDE) and monocular depth estimation
     Muhammad Adeel Hafeez                                                    (MDE). In BDE, depth is calculated using the disparity
     m.hafeez1@universityofgalway.ie                                          between two 2D images through stereo matching and trian-
     Ganesh Sistu                                                             gulation [7], but it performs poorly when the texture is weak
     ganesh.sistu@valeo.com                                                   [8]. MDE, on the other hand, predicts per-pixel depth from a
     Michael G. Madden                                                        single RGB image [9, 10] hence relies on ground-truth maps
     michael.madden@universityofgalway.ie                                     obtained with LiDAR, structured light, or photorealistic ren1                                                                             dering engines [11]. Most state-of-the-art (SOTA) models
     Machine Learning Research Group, School of Computer
     Science, University of Galway, Galway H91 TK33, Ireland                  adopt an encoder–decoder architecture in which a classifi2    Valeo Vision Systems, Valeo, Tuam, Ireland
                                                                                                                                123


<!-- PK PAGE 2 doc=math_p21 -->
876   Page 2 of 8                                                                        Signal, Image and Video Processing (2025) 19:876
cation backbone extracts features and a decoder predicts the         and depth cues [5] but struggled with low-texture scenes
dense depth.                                                         [20]. Modern deep-learning approaches address these chal-
    The performance of an MDE model depends upon several             lenges, though they rely on large data volumes [6]; accuracy
factors: (i) architecture [10]; (ii) loss function [12]; and (iii)   depends on both loss design [21] and architecture [22]. One
the quantity and quality of the training data [13]. Advanced         of the earliest monocular CNN models was proposed by
CNNs or ViTs leverage multi-scale features and attention,            Eigen et al. [23]. Successive work explored deeper CNNs
while carefully weighted combinations of MAE, edge loss,             [9], pre-training [13], novel losses such as ordinal regression
and SSIM [14] improve the perceptual quality of the depth            [24] and gradient consistency [25], and larger datasets [26].
estimates. Large multi-source datasets improve generali-             GAN-based refinement further improved details in the presation [15]. Recent transformer-based models (DPT [10],              dicted depth [27]. The introduction of vision transformers
Depth Anything [6]) achieved impressive results but require          [28] enabled global reasoning; DPT [10] remains a strong
massive compute budgets and months-long pre-training. This           baseline. Very recent transformer variants such as UniDepth
motivates lighter strategies that reuse conventional CNN             [29] and BinsFormer [30] push accuracy even higher but
backbones while using data from multiple sources.                    at heavy computational cost. Diffusion models [31] provide
    In this work we present a progressive fine-tuning (PF)           another promising direction.
method that incrementally integrates four indoor datasets:              Besides these architecture updates, data strategy is also
NYU2 [16] and SUN-RGBD [17] (real RGB-D), MIT                        very important for MDE design. Synthetic datasets produced
Indoor Scenes with pseudo-depth from Depth Anything                  in simulation offer unlimited, perfectly annotated images
[6, 18], and the large synthetic SceneNet RGB-D [19].                [32, 33], whereas real-world RGB-D data reflect practical
Starting with small real sets, the network learns fundamen-          noise [9]. Combining the two can improve generalisation [34]
tal indoor cues; SceneNet then injects structural diversity;         but also introduces domain gaps [35]. Domain-adaptation
finally, an NYU2 stage refines depth based on the sensor             methods have mixed success, yet hybrid data pipelines are
output data. We adopted the DenseDepth [9] and Efficient-            increasingly popular now a days [36]. Training the model on
Depth [14] frameworks with ImageNet-pre-trained encoders             larger and multiple datasets for depth estimation was pro-
(DenseNet-169 / EfficientNet-B0). Following [14] we keep             posed by MiDaS [13], and the large-scale Depth-Anything
the optimised weights for MAE, edge and SSIM, apply them             pre-training [6] shows that exposure to large data can yield
in a three-scale manner, and add a perceptual term, yielding         robust predictors. Finally, the carbon and hardware demands
a combined loss that balances accuracy and efficiency with-          of such large models are a growing concern [37]. Our study
out further tuning. From SceneNet, we sample 1 M frames              therefore focuses on progressive multi-dataset fine-tuning
(1/5 of the full set), retaining scene diversity while reducing      with mid-sized CNN backbones, aiming to capture these bencomputational cost.                                                  efits while remaining computationally practical.
    Our experiments show that progressive finetuning yields
consistent gains across all datasets: relative error (REL) on
NYU2 drops from 0.142 (single-dataset baseline) to 0.105,            3 METHODOLOGY
and root-mean-square error (RMSE) from 0.471 to 0.359,
competitive with heavier transformer models while running            In this section, we will discuss the details of the datasets,
on a single GPU. Zero-shot tests on iBims-1 further demon-           including their selection and generation. After that, we will
strate improved generalisation. Although inspired by transfer        discuss the model architectures and loss function. The section
learning [9] and mixed-dataset training [13], our contribution       concludes with a description of the performance evaluation
is empirical: we offer a lightweight model that turns existing       metrics.
CNN encoders into strong indoor depth predictors without
industrial-scale pre-training.                                       3.1 Datasets
    The rest of the paper is organised as follows. Section 2
reviews recent literature. Section 3 details the progressive         In this study, we have used datasets from multiple sources
fine-tuning, architecture, and loss functions. Section 4 reports     and applied them to perform progressive fine-tuning of the
ablations and SOTA comparisons, and Section 5 concludes              model. The datasets are summarized below in the table 1.
the paper.                                                              NYU Depth V2 [16] and SUN-RGBD [17] provide high-
                                                                     quality Kinect RGB-D pairs across typical indoor scenes.
                                                                     MIT-G is based on the MIT Indoor Scenes data [18] with
2 Related Work                                                       pseudo-depth from Depth Anything [6], offering additional
                                                                     supervision for a warm start (model weights are initialised
Depth estimation has significantly advanced over the years.          from a short training on MIT-G pseudo-labels before being
Early image-based techniques relied on handcrafted features          further fine-tuned on sensor-labelled datasets). SceneNet
123


<!-- PK PAGE 3 doc=math_p21 -->
Signal, Image and Video Processing (2025) 19:876                                                                                     Page 3 of 8   876
Table 1 Datasets used in progressive fine-tuning (ordered by stage)
Stage     Dataset                 Pairs      Resolution               Depth m     Sensor / Source                      Purpose
$$
1         MIT-G (pseudo)          6.4 k      ≥ 640×480                0.5–10      RGB only + DepthAnything             warm start on pseudo labels
$$
$$
2         SUN-RGBD                10 k       640×480 / 730×530        0.5–10      Kinect v1,v2                         small-scale real refinement
$$
$$
3         SceneNet RGB-D          1M         640×480                  0.5–10      synthetic renderer                   broaden scene diversity
$$
$$
4         NYU Depth V2            120 k      640×480                  0.5–10      Kinect v1                            high-quality fine-tune
$$
RGB-D [19] supplies photorealistic synthetic images span-                    Figure 1 provides a schematic representation of the
ning 13 room types, where we sample 1 M frames to reduce                  generic architecture employed in our study. While we expericomputational cost while preserving variety. Dataset arti-                mented with various state-of-the-art models as encoders, the
facts, such as missing depths values on windows/shining                   decoder design was kept consistent and straightforward to
surfaces and light source, are analysed in Supplement A. Sup-             ensure fair comparisons across the different setups.
plement B presents a visual overview of the four datasets,
illustrating representative RGB–depth pairs from NYU2,                    3.3 Loss Function
SUN-RGBD, MIT-G, and SceneNet.
                                                                          The loss function guides the network during training, and its
                                                                          design strongly influences depth-estimation accuracy [38].
3.2 Network Architecture                                                  As in our earlier work [14] we started from a weighted loss
                                                                          that mixes Mean Absolute Error (MAE), Edge loss, and
In this study, we have utilized several encoder–decoder-based             SSIM with fixed coefficients {0.6, 0.2, 1.0}; full formulas
models to perform depth estimation on the datasets men-                   and intuition for these three pixel-level terms are reproduced
tioned in the previous subsection. We have progressively                  in Supplement B. Here we focus on the two extensions, perfine-tuned these models and, in this paper, we report the inter-          ceptual loss and the multi-scale strategy, that are different in
mediate and final results. The main goal of fine-tuning these             the present study.
models was to capture both the overall structure and fine
details in the depth maps for all datasets, leading to more               3.3.1 Perceptual Loss
accurate and visually consistent predictions.
    In a previous study [14], the authors explored four encoder           Perceptual loss, also known as feature-based loss, is an
architectures including DenseNet121, DenseNet169, Dense                   important component in deep learning tasks that require highNet201 and EfficientNet-B0, all pre-trained on ImageNet for               level feature matching between predicted and ground truth
classification purposes. Because DenseNet169 and Efficient                images. In the depth estimation, perceptual loss helps the
Net-B0 delivered the best accuracy in that work, we adopt                 model focus not only on getting the absolute depth values
only these two for progressive fine-tuning here. ResNet-50                correct but also on preserving the overall structure and imporwas also tested as an even lighter option but its results were            tant details of the scene [39]. To calculate the perceptual loss,
not comparable.                                                           we used the first three layers of a pre-trained VGG16 on Ima-
    The encoders transform the input images into rich fea-                geNet to extract features.
ture vectors, which are then passed through a series of                      The VGG16 model (or the feature-extraction model) is
up-sampling layers in the decoder. The decoder, incorporat-               applied to both the true and predicted depth maps, producing
ing the skip connections, reconstructs the depth maps from                feature maps which were compared to calculate the mean
these feature vectors. We initially used a simplified decoder             squared loss. By minimizing this loss, the model is encourstructure across all experiments, avoiding batch normalisa-               aged to produce depth predictions that align well with the
tion or other advanced layers, following the findings of [24].            high-level visual features of the true depth map, resulting in
In the final model we introduce a single normalisation layer              more accurate and visually better outputs. The formula to
$$
after each 3×3 convolution; this stabilises training under                calculate the perceptual loss is:
$$
varying indoor lighting, as also noted in [10].
    With this configuration the DenseDepth branch (DenseNet-                                           
                                                                                          
                                                                                          N
                                                                                                                              2 
$$
169 encoder) contains 21.5 M parameters and 98 GFLOPs                     Lperceptual =         mean     φi (Yt ) − φi (Y p )                      (1)
$$
$$
per 640×480 image, whereas the EfficientDepth branch                                      i=1
$$
(EfficientNet-B0 encoder) uses 23.6 M parameters and
146 GFLOPs; full speed-versus-accuracy comparisons with                   where φi represents the feature map extracted from the i-th
transformer baselines are reported in Table 3.                            layer of the VGG16 model and N is total number of lay-
                                                                                                                                          123


<!-- PK PAGE 4 doc=math_p21 -->
876   Page 4 of 8                                                                             Signal, Image and Video Processing (2025) 19:876
Fig. 1 Encoder–decoder architecture (illustrated with DenseNet-        in the corresponding blue UpscaleBlocks. Replacing the encoder stack
169). Orange blocks are the encoder stages with tensor shapes          with ResNet-50 or EfficientNet-B0 yields the other model variants eval-
(B, H /2k , W /2k , Ck ); dashed arrows show skip connections merged   uated in this work
ers used to extract features. In this experiment, the value of         each scale, contributing to a more robust and generalizable
N is three as we use first three layers of VGG for feature             depth prediction. We calculated this loss for three different
extraction.                                                            resolutions:
$$
3.3.2 Combined Loss                                                    Lcombined = L per ceptual + Ldepth{1,0.5,0.25}                     (4)
$$
To make an overall loss, we combined the individual losses             Here we kept the coefficients of these loss components to 1
and proposed a combined loss. The combined loss we pro-                to balance feature-level and pixel-level terms without adding
posed is given below:                                                  a new hyper-parameter search and tuning these coefficients
                                                                       is left for future work.
$$
Lcombined = L per ceptual + Ldepth                              (2)
$$
                                                                       3.4 Performance Evaluation
where Ldepth is a weighted combination of MAE, SSIM and
Edge loss as proposed in [14].                                         To evaluate the output of our models we have used both
                                                                       quantitative and qualitative approaches. In the qualitative
$$
Ldepth = 0.6L M AE + 0.2Ledge + L SS I M                        (3)    approach, we plotted the depth maps in ‘plasma’ colour
$$
                                                                       scheme where the darker pixels show the objects near to the
To further enhance the efficiency, we used a multi-scale               camera and brighter pixels show the objects far from the camcombined loss function for Ldepth that calculates losses at            era. Quantitatively we report the six standard metrics widely
multiple resolutions (scales).                                         used in recent work [6, 30]: threshold accuracy (δ1 , δ2 , δ3 ),
   This approach helps the model learn consistent depth                relative error (REL), root-mean-squared error (RMSE), and
predictions across various scales, ensuring that larger struc-         log10 error. All scores are computed after Eigen cropping
tures and fine-grained details are both accurately represented.
By calculating loss at different scales, the model is better
equipped to handle the inherent challenges in depth esti-              4 Experiments and Results
mation, such as varying object sizes, complex textures, and
depth discontinuities. The multi-scale approach also encour-           In this section, we will describe the implementation details
ages the model to focus on different aspects of the scene at           and results for all the experiments.
123


<!-- PK PAGE 5 doc=math_p21 -->
Signal, Image and Video Processing (2025) 19:876                                                                Page 5 of 8   876
4.1 Implementation                                              quantitative results is presented in the Supplementary Mate-
                                                                rial (Section E).
We implemented our proposed models using TensorFlow and
trained them on two different machines. For most of the         4.4 Experiment 3: Multiple Datasets
training, including fine-tuning on the MIT-G, SUN-RGBD,
and NYU2 datasets, we used an NVIDIA GeForce 2080 Ti            In our final experiment, we applied progressive fine-tuning
with 4,352 CUDA cores and 11 GB of GDDR6 memory.                to our models across multiple datasets using the multiscaleTo fine-tune our model on the SceneNet dataset, we utilized     combined loss function. To start, we initialized the encoder
an NVIDIA RTX 6000 Ada Generation GPU with approxi-             with weights pre-trained on ImageNet, while the decoder
mately 48 GB (49,140 MiB) of memory. The training time          weights were initialized randomly. We progressively finevaried between the machines, model and datasets (for exam-      tuned our model on each dataset in sequence: we began with
ple, DenseNet169 training on NYU2 for 50 epochs took 30         the pseudo-labeled MIT-G dataset and the smaller real SUNhours on GeForece 2080 Ti and DenseNet169 training on           RGBD data, then scaled up to the large synthetic SceneNet
SceneNet 1 million images took 100 hours for 50 epochs          dataset, and finally refined the model on the high-quality
on NVIDIA RTX 6000). Building on the previous setup,            NYU2 dataset. This order is important as it allows the model
we trained an encoder-decoder-based model. In all experi-       to adapt to simpler or smaller indoor data first, gain broader
ments, we set the initial learning rate to 0.0001, following    coverage from a large synthetic dataset next, and ultimately
[9, 13]. Empirically, higher rates caused unstable gradients,   achieve finer accuracy by incorporating Kinect-based ground
$$
while lower rates slowed convergence without accuracy gain.     truth. Algorithm 1 outlines our progressive fine-tuning stratWe used the Adam optimiser (β1 = 0.9, β2 = 0.99) for            egy, where we sequentially train the network on each dataset.
$$
its adaptive moment estimates, which stabilise encoder–de-          For evaluation, we tested the model on the test set provided
coder training. The batch size was 4 on the 2080Ti and 8 on     by the NYU2 dataset. The step-by-step fine-tuning approach
the RTX6000, while data augmentation comprised random           allowed the model to progressively learn and adapt to the
$$
horizontal flip, brightness/contrast jitter (±15%).             specific characteristics of each dataset, ultimately enhanc-
$$
                                                                ing its overall performance. Table 2 shows the results of
                                                                the progressive fine-tuning where we trained two differ4.2 Experiment 1: Encoder Architecture
                                                                ent models and fine-tuned them with a series of datasets.
                                                                The final results reveal that EfficientNet initially outperIn this experiment, we evaluated the effect of three com-
                                                                formed DenseNet169 when fine-tuned on smaller datasets
monly used encoder backbones: ResNet50, DenseNet169,
                                                                like MIT-G and SUN-RGBD, achieving slightly better accuand EfficientNetB0, on the task of depth estimation using
                                                                racy across several metrics, including higher values for the
three indoor datasets (NYU2, SUN RGBD, and MIT-G).
                                                                δ thresholds and lower error rates in certain cases. HowWhile ResNet50 provided better computational efficiency,
                                                                ever, when the models were progressively fine-tuned using
both DenseNet169 and EfficientNetB0 showed substantial
                                                                the larger SceneNet dataset, DenseNet169 demonstrated a
accuracy improvements. The decoder architecture was kept
                                                                significant improvement, surpassing EfficientNet in overall
the same across all experiments, using upsampling and skip
                                                                performance. Specifically, DenseNet169 achieved a better
connections to reconstruct the depth map. To ensure con-
                                                                balance of accuracy and error reduction, with a notable
sistency across datasets, we used Eigen cropping during
                                                                improvement in REL (0.105) and RMSE (0.359) compared
evaluation. A detailed analysis of encoder configurations,
                                                                to EfficientNet’s performance on the larger dataset (REL
performance metrics, and dataset-specific results is included
                                                                0.116, RMSE 0.390). This suggests that while EfficientNet
in the Supplementary Material (Section D).
                                                                adapted well to smaller datasets, DenseNet’s architecture
                                                                leveraged the larger SceneNet dataset more effectively. As
4.3 Experiment 2: Loss Function                                 a result, DenseNet achieved better depth-estimation perfor-
                                                                mance across various metrics after fine-tuning. To assess
In this experiment, we compared several loss functions using    whether catastrophic forgetting occurred, we re-evaluated the
DenseNet169 and EfficientNetB0 encoders. Building on the        model on the previously used datasets after each new finebaseline weighted loss, we evaluated the addition of per-       tuning step. Specifically, once the model was fine-tuned on
ceptual and multi-scale components. While perceptual loss       the fully synthetic SceneNet, we checked its performance on
did not yield notable numerical improvements, introduc-         MIT-G and SUN-RGBD. We observed a slight drop in accuing a multi-scale formulation showed marginal gains. These      racy at that stage, but after the final fine-tuning on NYU2,
improvements became more evident when models were               the performance on earlier datasets improved again. Overtrained using a progressive fine-tuning strategy. A detailed    all, these changes were small, indicating that catastrophic
breakdown of loss configurations, experimental settings, and    forgetting was not observed in our multi-dataset fine-tuning
                                                                                                                     123


<!-- PK PAGE 6 doc=math_p21 -->
876   Page 6 of 8                                                                             Signal, Image and Video Processing (2025) 19:876
Table 2 Performance of Progressive Fine-Tuning
Model               Fine-tuning Sequence                         δ1 ↑          δ2 ↑        δ3 ↑        REL↓          RMSE↓           Log10 ↓
DenseNet169         MIT-G, NYU2                                  0.853         0.954       0.995       0.142         0.4712          0.062
                    MIT-G, SUN-RGBD, NYU2                        0.861         0.961       0.995       0.129         0.4215          0.053
                    MIT-G, SUN-RGBD, SceneNet, NYU2              0.897         0.972       0.994       0.105         0.358           0.045
EfficientNet        MIT-G, NYU2                                  0.8368        0.9680      0.991       0.131         0.4172          0.055
                    MIT-G, SUN-RGBD, NYU2                        0.882         0.979       0.996       0.172         0.4015          0.051
                    MIT-G, SUN-RGBD, SceneNet, NYU2              0.880         0.9528      0.995       0.114         0.3893          0.049
approach. It is worth noting that MIT-G serves only as                    practical difference in applications such as robotics navigaan inexpensive warm-start, and final-reported metrics were                tion or AR scene understanding.
computed on sensor-based test sets, so no circular evaluation                Table 3 shows a comparison with different SOTA where
arises from the use of Depth-Anything pseudo-labels.                      Depth-Anything-L achieves the highest accuracy on all four
                                                                          metrics, but does so with 335M parameters, 624 GFLOPs,
$$
                                                                          and a 375ms latency. On the other hand, our DenseDepthAlgorithm 1 Progressive Fine-Tuning Strategy                              PF model reaches a competitive δ1 = 0.897 and REL 0.105
$$
$$
Require: Pre-trained encoder E (e.g., DenseNet169/EfficientNetB0)         while using 16× fewer parameters and running in 36.7ms.
$$
 with ImageNet weights;                                                   This demonstrates that the proposed progressive fine-tuning
$$
 Datasets {D1 , D2 , . . . , Dk } (where k = 4 in this work);
$$
$$
 Learning rate η = 1 × 10−4 ;                                             can deliver strong indoor depth performance without the
$$
 Combined loss function Lcombined .                                       computational overhead of recent transformer-based modEnsure: Fine-tuned depth estimation model M.                              els. Our EfficientDepth-PF offers a similar trade-off, whereas
1: Initialize decoder weights randomly.                                   older CNN baselines lag in both accuracy and efficiency.
$$
2: M ← Combine(E, decoder)
$$
     Attach the newly created decoder on top of E.
                                                                          Further analysis of training stability, overfitting prevention
$$
3: for i ← 1 to k do                                                      strategies, and loss convergence behavior is provided in Sup4:    Train(M, Di , Lcombined , η)                                        plementary Section E.1.
$$
     Continue training M on Di ; both encoder and decoder update via
   Adam.
5:    Evaluate(M, {D j | j < i})
     Check earlier datasets to monitor performance.
6: end for
7: return M
                                                                          4.5 Zero-shot testing
   Sample predictions from the final models (DenseNet169                  To test the generalization of our final model, which was
and EfficientNetB0) on all four datasets are provided in the              trained on multiple indoor datasets, we used the iBims-1
Supplementary Material (Section F). These results highlight               dataset [40] for zero-shot testing which was not seen during
the models’ ability to handle common visual challenges,                   training. This dataset contains 100 RGB-D image pairs of
such as missing depth values, reflective surfaces, and scene              various indoor scenes, making it a suitable choice for zerocomplexity. The qualitative evaluation complements the                    shot testing. Due to differences in sensors, resolution, and
quantitative findings and supports the observed strengths of              depth ranges in the iBims-1 dataset, we selected the scaleeach encoder. Overall, both models demonstrated strong per-               invariant log error as a performance metric, as proposed in
formance, but DenseNet’s ability to preserve small depth                  [41] and used in various studies [29, 42].
                                                                                                                   The SILog error
changes across different indoor environments stood out.                   was calculated using the formula 100 Var(εlog ), with an
Compared to a baseline [9] using a single dataset (RMSE                   average value of 50.34 when no cropping was applied and
0.465), our progressive fine-tuning method reduces the                    missing depth values (windows or reflective surfaces) were
RMSE to 0.358, a 23% improvement. Although our final                      left unchanged. The score was improved to 48.26 when the
results do not surpass all SOTA benchmarks, they were                     missing depth values were replaced with nearby pixel values.
achieved using a more limited training set and computational              Sample predictions and visual comparisons are provided in
budget. Moreover, our approach generalises well to unseen                 the Supplementary Material (Section F). The results illustrate
indoor environments, as shown by our zero-shot tests on                   that both DenseNet169 and EfficientNetB0 retained strong
iBims-1 in Section 4.5. Since we predict absolute depth rather            performance in unfamiliar environments, though minor overthan relative scales, even these improvements can make a                  smoothing was observed around complex structural edges.
123


<!-- PK PAGE 7 doc=math_p21 -->
Signal, Image and Video Processing (2025) 19:876                                                                                    Page 7 of 8    876
Table 3 Comparison with state-of-the-art monocular depth models on NYU2 (Eigen test split). Inference latency is measured on an Apple M2 Pro
MacBook Pro (10-core CPU, 16-core GPU). Best value in each column is shown in bold
Model                              Parameters (M)           GFLOPs          δ1 ↑          REL ↓          RMSE ↓           log10 ↓          Time (ms)
DenseDepth-PF (ours)               21.5                     98              0.897         0.105          0.359            0.045            36.7
EfficientDepth-PF (ours)           23.6                     146             0.880         0.114          0.389            0.049            47.9
DPT-Hybrid [10]                    123                      220             0.904         0.110          0.357            0.045            98.4
Depth Anything-L [6]               335                      624             0.984         0.056          0.206            0.024            374.7
UniDepth [29]                      648                      1113            0.972         0.062          0.232            –                696
Alhashim. et, al. [9]              42.6                     138             0.846         0.123          0.465            0.053            51
Paul. et, al. [38]                 48                       147             0.845         0.123          0.524            0.053            57
5 Conclusions                                                               Competing interests The authors declare no competing interests.
                                                                            Open Access This article is licensed under a Creative Commons
The progressive fine-tuning approach that we have intro-                    Attribution 4.0 International License, which permits use, sharing, adapduced in this paper demonstrates that the choice of encoder                 tation, distribution and reproduction in any medium or format, as
and dataset size play an important role in achieving accurate               long as you give appropriate credit to the original author(s) and the
depth estimation. While EfficientNet outperforms                            source, provide a link to the Creative Commons licence, and indi-
                                                                            cate if changes were made. The images or other third party material
DenseNet169 on smaller datasets such as MIT-G and SUN-                      in this article are included in the article’s Creative Commons licence,
RGBD, DenseNet’s performance is significantly improved                      unless indicated otherwise in a credit line to the material. If material
when trained on the larger SceneNet dataset. The use of a                   is not included in the article’s Creative Commons licence and your
multiscale loss function enables both models to capture finer               intended use is not permitted by statutory regulation or exceeds the
                                                                            permitted use, you will need to obtain permission directly from the copydepth transitions, with DenseNet169 producing more reli-                    right holder. To view a copy of this licence, visit http://creativecomm
able results on complex indoor scenes. Overall, our results                 ons.org/licenses/by/4.0/.
suggest that DenseNet169 is better suited for large-scale
datasets, making it a strong candidate for depth estimation
tasks in real-world applications. Zero-shot results on iBims1 further show that the final network generalises beyond the
datasets seen during fine-tuning and predicts metric depth                  References
with consistent structure. Future work will explore tuning the
global loss coefficients, adding lightweight attention mod-                  1. Dong, X., Garratt, M.A., Anavatti, S.G., Abbass, H.A.: Towards
ules, and extending progressive fine-tuning to outdoor scenes                   real-time monocular depth estimation for robotics: A survey. IEEE
and mixed-sensor benchmarks.                                                    Trans. Intell. Transp. Syst. 23(10), 16940–16961 (2022)
                                                                             2. Xue, F., Zhuo, G., Huang, Z., Fu, W., Wu, Z., Ang, M.H.: Toward
Acknowledgements This publication has emanated from research con-               hierarchical self-supervised monocular absolute depth estimation
ducted with the financial support of Taighde Éireann - Research Ireland         for autonomous driving applications. In: 2020 IEEE/RSJ Internaunder Grant No. 18/CRT/6223 and SFI/12/RC/2289_P2 the Insight                   tional Conference on Intelligent Robots and Systems (IROS), pp.
Research Ireland Centre for Data Analytics. It is in partnership with           2330–2337 (2020)
VALEO.                                                                       3. Diaz, C., Walker, M., Szafir, D.A., Szafir, D.: Designing for depth
                                                                                perceptions in augmented reality. In: 2017 IEEE International SymAuthor Contributions M.A.H. designed the experiments, conducted                 posium on Mixed and Augmented Reality (ISMAR), pp. 111–122
data analysis, and drafted the initial manuscript. G.S. provided industry       (2017)
insights and supported the practical application perspective. M.G.M.         4. Tsai, Y.-M., Chang, Y.-L., Chen, L.-G.: Block-based vanishing
and I.U. supervised the research, provided guidance on methodology,             line and vanishing point detection for 3d scene reconstruction. In:
reviewed results, and critically revised the manuscript. All authors            2006 International Symposium on Intelligent Signal Processing
reviewed and approved the final manuscript.                                     and Communications, pp. 586–589 (2005)
                                                                             5. Liu, B., Gould, S., Koller, D.: Single image depth estimation
Funding Open Access funding provided by the IReL Consortium. This               from predicted semantic labels. In: 2010 IEEE Computer Socipublication has emanated from research conducted with the finan-                ety Conference on Computer Vision and Pattern Recognition, pp.
cial support of Taighde Éireann – Research Ireland under Grant No.              1253–1260 (2010)
18/CRT/6223 and SFI/12/RC/2289_P2 the Insight Research Ireland               6. Yang, L., Kang, B., Huang, Z., Xu, X., Feng, J., Zhao, H.: Depth
Centre for Data Analytics. It is in partnership with VALEO.                     anything: Unleashing the power of large-scale unlabeled data. In:
                                                                                Proceedings of the IEEE/CVF Conference on Computer Vision and
Data Availability No datasets were generated or analysed during the             Pattern Recognition, pp. 10371–10381 (2024)
current study.                                                               7. Žbontar, J., LeCun, Y.: Stereo matching by training a convolutional
                                                                                neural network to compare image patches. J. Mach. Learn. Res.
                                                                                17(65), 1–32 (2016)
                                                                                                                                         123


<!-- PK PAGE 8 doc=math_p21 -->
876    Page 8 of 8                                                                                    Signal, Image and Video Processing (2025) 19:876
 8. Liu, F., Zhou, S., Wang, Y., Hou, G., Sun, Z., Tan, T.: Binocular         27. Hendra, A., Kanazawa, Y.: Tp-gan: Simple adversarial network
    light-field: Imaging theory and occlusion-robust depth perception             with additional player for dense depth image estimation. IEEE
    application. IEEE Trans. Image Process. 29, 1628–1640 (2019)                  Access 11, 44176–44191 (2023)
 9. Alhashim, I., Wonka, P.: High quality monocular depth estimation          28. Dosovitskiy, A.: An image is worth 16x16 words: Transformers
    via transfer learning. arXiv preprint arXiv:1812.11941 (2018)                 for image recognition at scale. arXiv preprint arXiv:2010.11929
10. Ranftl, R., Bochkovskiy, A., Koltun, V.: Vision transformers for              (2020)
    dense prediction. In: Proceedings of the IEEE/CVF International           29. Piccinelli, L., Yang, Y.-H., Sakaridis, C., Segu, M., Li, S., Van Gool,
    Conference on Computer Vision, pp. 12179–12188 (2021)                         L., Yu, F.: Unidepth: Universal monocular metric depth estimation.
11. Richter, S.R., Hayder, Z., Koltun, V.: Playing for benchmarks. In:            In: Proceedings of the IEEE/CVF Conference on Computer Vision
    Proceedings of the IEEE International Conference on Computer                  and Pattern Recognition, pp. 10106–10116 (2024)
    Vision, pp. 2213–2222 (2017)                                              30. Li, Z., Wang, X., Liu, X., Jiang, J.: Binsformer: Revisiting adaptive
12. Lu, Z., Chen, Y.: Joint self-supervised depth and optical flow                bins for monocular depth estimation. IEEE Transactions on Image
    estimation towards dynamic objects. Neural Process. Lett. 55(8),              Processing (2024)
    10235–10249 (2023)                                                        31. Ke, B., Obukhov, A., Huang, S., Metzger, N., Daudt, R.C.,
13. Ranftl, R., Lasinger, K., Hafner, D., Schindler, K., Koltun, V.:              Schindler, K.: Repurposing diffusion-based image generators for
    Towards robust monocular depth estimation: Mixing datasets for                monocular depth estimation. In: Proceedings of the IEEE/CVF
    zero-shot cross-dataset transfer. IEEE Trans. Pattern Anal. Mach.             Conference on Computer Vision and Pattern Recognition, pp.
    Intell. 44(3), 1623–1637 (2020)                                               9492–9502 (2024)
14. Hafeez, M.A., Madden, M.G., Sistu, G., Ullah, I.: Depth estimation        32. Schreiber, A.M., Hong, M., Rozenblit, J.W.: Monocular depth
    using weighted-loss and transfer learning. Proceedings Copyright              estimation using synthetic data for an augmented reality training
    780, 787                                                                      system in laparoscopic surgery. In: 2021 IEEE International Con15. Bailly, A., Blanc, C., Francis, É., Guillotin, T., Jamal, F., Wakim,          ference on Systems, Man, and Cybernetics (SMC), pp. 2121–2126
    B., Roy, P.: Effects of dataset size and interactions on the predic-          (2021)
    tion performance of logistic regression and deep learning models.         33. Ullah, I., Abinesh, S., Smyth, D.L., Karimi, N.B., Drury, B., Glavin,
    Comput. Methods Programs Biomed. 213, 106504 (2022)                           F.G., Madden, M.G.: A virtual testbed for critical incident investi16. Silberman, N., Hoiem, D., Kohli, P., Fergus, R.: Indoor segmen-               gation with autonomous remote aerial vehicle surveying, artificial
    tation and support inference from rgbd images. In: Computer                   intelligence, and decision support. In: ECML PKDD 2018 Work-
    Vision–ECCV 2012: 12th European Conference on Computer                        shops: Nemesis 2018, UrbReas 2018, SoGood 2018, IWAISe 2018,
    Vision, Florence, Italy, October 7-13, 2012, Proceedings, Part V              and Green Data Mining 2018, Dublin, Ireland, September 10-14,
    12, pp. 746–760 (2012). Springer                                              2018, Proceedings 18, pp. 216–221 (2019). Springer
17. Song, S., Lichtenberg, S.P., Xiao, J.: Sun rgb-d: A rgb-d scene           34. Tonioni, A., Rahnama, O., Joy, T., Stefano, L.D., Ajanthan, T.,
    understanding benchmark suite. In: Proceedings of the IEEE Con-               Torr, P.H.: Learning to adapt for stereo. In: Proceedings of the
    ference on Computer Vision and Pattern Recognition, pp. 567–576               IEEE/CVF Conference on Computer Vision and Pattern Recogni-
    (2015)                                                                        tion, pp. 9661–9670 (2019)
18. Quattoni, A., Torralba, A.: Recognizing indoor scenes. In: 2009           35. Gupta, S., Ullah, I., Madden, M.: Coyote: A dataset of challeng-
    IEEE Conference on Computer Vision and Pattern Recognition,                   ing scenarios in visual perception for autonomous vehicles. In:
    pp. 413–420 (2009)                                                            AISafety@ IJCAI (2021)
19. McCormac, J., Handa, A., Leutenegger, S., Davison, A.J.: Scenenet         36. Bhanushali, J., Muniyandi, M., Chakravarthula, P.: Cross-domain
    rgb-d: Can 5m synthetic images beat generic imagenet pre-training             synthetic-to-real in-the-wild depth and normal estimation for 3d
    on indoor segmentation? In: Proceedings of the IEEE International             scene understanding. In: Proceedings of the IEEE/CVF Confer-
    Conference on Computer Vision, pp. 2678–2687 (2017)                           ence on Computer Vision and Pattern Recognition, pp. 1290–1300
20. Bleyer, M., Rhemann, C., Rother, C.: Patchmatch stereo-stereo                 (2024)
    matching with slanted support windows. In: Bmvc, vol. 11, pp.             37. Hao, K.: Training a single ai model can emit as much carbon as
    1–11 (2011)                                                                   five cars in their lifetimes. MIT technology Review 75, 103 (2019)
21. Carvalho, M., Le Saux, B., Trouvé-Peloux, P., Almansa, A., Cham-          38. Paul, S., Jhamb, B., Mishra, D., Kumar, M.S.: Edge loss functions
    pagnat, F.: On regression losses for deep depth estimation. In: 2018          for deep-learning depth-map. Machine Learning with Applications
    25th IEEE International Conference on Image Processing (ICIP),                7, 100218 (2022)
    pp. 2915–2919 (2018)                                                      39. Liu, X., Gao, H., Ma, X.: Perceptual losses for self-supervised
22. Ming, Y., Meng, X., Fan, C., Yu, H.: Deep learning for monocular              depth estimation. In: Journal of Physics: Conference Series, vol.
    depth estimation: A review. Neurocomputing 438, 14–33 (2021)                  1952, p. 022040 (2021). IOP Publishing
23. Eigen, D., Fergus, R.: Predicting depth, surface normals and seman-       40. Koch, T., Liebel, L., Fraundorfer, F., Korner, M.: Evaluation of
    tic labels with a common multi-scale convolutional architecture. In:          cnn-based single-image depth estimation methods. In: Proceed-
    Proceedings of the IEEE International Conference on Computer                  ings of the European Conference on Computer Vision (ECCV)
    Vision, pp. 2650–2658 (2015)                                                  Workshops, pp. 0–0 (2018)
24. Fu, H., Gong, M., Wang, C., Batmanghelich, K., Tao, D.: Deep              41. Eigen, D., Puhrsch, C., Fergus, R.: Depth map prediction from a
    ordinal regression network for monocular depth estimation. In: Pro-           single image using a multi-scale deep network. Advances in neural
    ceedings of the IEEE Conference on Computer Vision and Pattern                information processing systems 27 (2014)
    Recognition, pp. 2002–2011 (2018)                                         42. Sagar, A.: Monocular depth estimation using multi scale neural
25. Shim, D., Kim, H.J.: Learning a geometric representation for data-            network and feature fusion. In: Proceedings of the IEEE/CVF Win-
    efficient depth estimation via gradient field and contrastive loss. In:       ter Conference on Applications of Computer Vision, pp. 656–662
    2021 IEEE International Conference on Robotics and Automation                 (2022)
    (ICRA), pp. 13634–13640 (2021)
26. Cabon, Y., Murray, N., Humenberger, M.: Virtual kitti 2. arXiv
    preprint arXiv:2001.10773 (2020)
                                                                              Publisher’s Note Springer Nature remains neutral with regard to juris-
                                                                              dictional claims in published maps and institutional affiliations.
123
<!-- PK END doc=math_p21 -->
