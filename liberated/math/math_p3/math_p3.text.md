PKvNext Document

KEY: math_p3 | math |  | 22c75b73 | 11 | /papers/Adversarialtransferlearningforcross-domainvisualrecognition.pdf
<!-- PK START doc=math_p3 -->


<!-- PK PAGE 1 doc=math_p3 -->
Knowledge-Based Systems 204 (2020) 106258
                                                            Contents lists available at ScienceDirect
                                                         Knowledge-Based Systems
                                                  journal homepage: www.elsevier.com/locate/knosys
Adversarial transfer learning for cross-domain visual recognition
                                           ∗
Shanshan Wang, Lei Zhang , Jingru Fu
School of Microelectronics and Communication Engineering, Chongqing University, Chongqing 400044, China
article                info                           a b s t r a c t
Article history:                                      In many practical visual recognition scenarios, feature distributions between source domain and the
Received 19 May 2020                                  target domain are quite different, which results in the emergence of general cross-domain visual
Received in revised form 4 July 2020                  recognition problems. To address the problems of visual domain mismatch, we propose a novel shallow
Accepted 11 July 2020
                                                      semi-supervised adversarial transfer learning network, which is called Coupled adversarial transfer
Available online xxxx
                                                      Domain Adaptation (CatDA), for distribution alignment between two domains. The proposed CatDA
Keywords:                                             approach is inspired by cycleGAN, but leveraging multiple shallow multilayer perceptrons (MLPs)
Transfer learning                                     instead of deep networks. Specifically, our CatDA comprises of two symmetric and slim sub-networks,
Adversarial learning                                  such that the coupled adversarial learning framework is formulated. With such symmetry of two
Image classification                                  generators, the input data from source/target domain can be fed into the MLP network for target/source
                                                      domain generation, supervised by two confrontation oriented coupled discriminators. Notably, in
                                                      order to avoid the critical flaw of high-capacity of the feature extraction function during domain
                                                      adversarial training, domain specific loss and domain knowledge fidelity loss are proposed in each
                                                      generator, such that the effectiveness of the proposed transfer network is guaranteed. Additionally, the
                                                      essential difference from cycleGAN is that our method aims to generate domain-agnostic and aligned
                                                      features for domain adaptation and transfer learning rather than synthesize realistic images. We show
                                                      experimentally on a number of benchmark datasets and the proposed approach achieves competitive
                                                      performance over state-of-the-art domain adaptation and transfer learning approaches.
                                                                                                                        © 2020 Elsevier B.V. All rights reserved.
1. Introduction                                                                      solved by fusing the data drawn from multiple different domains,
                                                                                     another dilemma of domain discrepancy is resulted. Recently,
    In cross-domain visual recognition systems, the traditional                      transfer learning or domain adaptation (DA) [3–8] techniques
classifiers usually do not work well on those semantic-related                       which can effectively ease domain shift problem have been probut distribution different tasks. A typical cross-domain problem                     posed, and demonstrated a great success in various cross-domain
is presented in Fig. 1, which illustrates some example images                        visual datasets.
with similar semantics but different distribution. By observing                          It is of great practical importance to explore transfer learning
the Fig. 1, it is easy to understand that the classifier trained with                methods. These methods allow machine learning model to be
the images in the first row cannot work well on the remaining                        self-adapted among multiple knowledge domains, i.e., the trained
images due to the explicit heterogeneity of multiple visual tasks.                   model from one domain can be adapted to another domain and
Mathematically, the reason lies in that the training data and test                   it is the key objective of this paper. A fundamental assumption
data have different feature distributions (i.e. data bias) and do                    underlying transfer learning is that, although the domains differ,
                                                                                     there is sufficient commonality to support such adaptation. Most
not satisfy the condition of independent identical distribution
                                                                                     of the existing transfer learning or DA algorithms seek to bridge
(i.e. i.i.d.) [1,2]. Additionally, to train an accurate classification
                                                                                     the gap between domains by reconstructing a common feature
model, sufficient labeled samples are needed according to the
                                                                                     subspace for general feature representation. In this paper, we
statistical machine learning theory. However, collecting data is
                                                                                     reformulate transfer learning as a conditional image generation
an expensive and time-consuming process. Generally, the data
                                                                                     problem which tends to bridge the gap by generating domain
problem can be relieved by exploiting a few label information
                                                                                     specific data. The mapping function from one domain to anfrom related source domain and leveraging a number of un-                            other can be viewed as the modeling process of a generator,
labeled instances in the target domain for recognition model                         which aligns domain shift problem during data sampling and
training. Although the scarcity of data and labels can be partially                  generating [9]. Recently, generative adversarial network (GAN)
                                                                                     proposed in [10], that tends to generate user-defined images
  ∗ Corresponding author.                                                            by the adversarial mechanism between generator and discrim-
    E-mail address: leizhang@cqu.edu.cn (L. Zhang).                                  inator, has become a mainstream of DA approach [11]. This is
https://doi.org/10.1016/j.knosys.2020.106258
0950-7051/© 2020 Elsevier B.V. All rights reserved.


<!-- PK PAGE 2 doc=math_p3 -->
2                                               S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258
                                                                                           • In order to reduce the distribution discrepancy between do-
                                                                                             mains, we propose a simple but effective coupled adversar-
                                                                                             ial transfer network (CatDA). It is a slim but symmetric ad-
                                                                                             versarial domain adaptation network structured by shallow
                                                                                             multilayer perceptrons (MLPs). Through the proposed net-
                                                                                             work, source and target domains can be generated against
                                                                                             each other with an adversarial mechanism supervised by the
                                                                                             coupled discriminators.
                                                                                           • Inspired by the cycleGAN, our CatDA adopts a cycling struc-
                                                                                             ture and formulates a generative adversarial domain adap-
                                                                                             tation framework. It comprise of two sub-networks with
                                                                                             each carrying a generator and a discriminator. The cou-
                                                                                             pled learning algorithm follows a two-way strategy, such
                                                                                             that arbitrary domain generation can be achieved without
Fig. 1. Different distributions in different domains. It is obvious that if the              constraining the input to be source or target.
images in the first row are employed to train an effective classifier, the classifier      • To avoid the limitation in domain adversarial training that
cannot work well on the remaining images.                                                    feature extraction function has high-capacity, in domain
                                                                                             alignment, we design a semi-supervised domain knowledge
                                                                                             fidelity loss and domain specific loss for domain content
usually modeled by minimizing the approximate domain discrep-                                self-preservation and domain realistic, respectively. In this
ancy via an adversarial objective function. GAN generally carries                            way, domain distortion in domain generation is avoided and
two networks called generator and discriminator, which work                                  the domain-agnostic feature representation become more
against each other. The generator is trained to produce images                               stable and discriminative.
that could confuse the discriminator, while the discriminator                              • A simple but effective MLP network is tailored to handle
tries to distinguish the generated images from real images. This                             the small-scale cross-domain visual recognition datasets. In
adversarial strategy is very suitable for DA problem [12,13], be-                            this way, both the requirements of large-scale samples and
cause domain discrepancy can be easily reduced by adversarial                                the pre-trained processing are avoided. Extensive experigeneration. Therefore, this confrontation principle is exploited                             ments and comparisons on a number of benchmark datasets
to ensure that the discriminator cannot distinguish the source                               demonstrate the effectiveness and competitiveness of CatDA
domain from the generated target domain. In [11], DANN is                                    over state-of-the-art methods.
one of the first work of deep domain adaptation, in which the
adversarial mechanism was used to reduce the gap between the                               The rest of this paper is organized as follows. In Section II, the
source and target domains. Similarly, the GAN inspired domain                           related work in domain adaptation is reviewed. In Section III, we
adaptation (ADDA) with convolutional neural network (CNN) ar-                           present the proposed CatDA method in detail. In Section IV, the
chitecture has also achieved a surprisingly good performance                            experiments and comparisons on a number of common datasets
in [12]. With the success of GAN in domain adaptation, an adver-                        are presented. The discussion is presented in Section V, and finally
sarial domain adaptation framework with domain generators and                           Section VI concludes this paper.
domain discriminators is studied in this work for cross-domain
visual recognition.                                                                     2. Related work
    It is worthy noting that, in GANs [10,14], the realistic of
the generated images is important. However, the purpose of DA                              Our approach involves domain adaptation (DA) and genermethods is to reduce the distribution discrepancy, while the                            ative adversarial methods. Therefore, In this section, the shalrealistic of the generated image is not that important. Therefore,
                                                                                        low domain adaptation, deep domain adaptation, and generative
our focus lies in the domain distribution alignment for cross-
                                                                                        adversarial networks are briefly introduced, respectively.
domain visual recognition rather than generating/synthesizing
images. In this work, we proposed a simple, slim but effective
                                                                                        2.1. Shallow domain adaptation
Coupled adversarial transfer based domain adaptation (CatDA)
algorithm. To be specific, the proposed CatDA is formulated with
                                                                                            In recent years, a number of shallow learning approaches have
the slim and symmetric multilayer perceptron (MLP) structure
instead of deep structure for generative adversarial network.                           been proposed in domain adaptation. Generally, these shallow
CatDA comprises of two symmetric and coupled sub-networks,                              domain adaptation methods are divided into three categories as
with each a generator, a discriminator, a domain specific term                          follows.
and a domain knowledge fidelity term are formulated. CatDA is                               Classifier based approaches. A generic way in this category is
then implemented by coupled learning of the two sub-networks.                           to learn a common classifier on source domain leveraging source
With the symmetry, both domains can be generated from each                              data and a few labeled target data. In AMKL, Duan et al. [3]
other with an adversarial mechanism supervised by the coupled                           proposed an adaptive multiple kernel learning method for video
discriminators, such that the network compatibility for arbitrary                       event recognition. Also, a domain transfer MKL (DTMKL) [15] was
domain generation can be guaranteed.                                                    proposed by jointly learning a SVM and a kernel function for
    In order to avoid the critical flaw of high-capacity of the                         classifier adaptation. Wang et al. [6] proposed the class-specific
network mapping function during domain adversarial training,                            reconstruction for domain adaptation, in which HSIC criterion
the semi-supervised mode is therefore considered in our method.                         was formulated for matching the distribution between samples
In addition, a content fidelity term and a domain loss term                             and labels.
are proposed in the generators for achieving the joint domain-                              Feature augmentation/ transformation based approaches. In
knowledge preservation in both domains. The structure of CatDA                          MMDT, Hoffman et al. [16] proposed a Max-Margin Domain
can be simply described as two generators and two discrimina-                           Transforms method, in which a category specific transformation
tors. Specifically, the main contribution and novelty of this work                      was optimized for domain transfer. Long et al. [17] proposed
are fourfold:                                                                           a Transfer Sparse Coding (TSC) method to learn robust sparse


<!-- PK PAGE 3 doc=math_p3 -->
S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258                                   3
representations, in which the empirical Maximum Mean Discrep-                achieved state-of-the-art results in semi-supervised classification
ancy (MMD) [18] is constructed as the distance measure. Then                 and improves the visual realistic and image quality compared
they [19] also proposed a Transfer Joint Matching approach. This             to GAN. Zhu et al. [36] proposed a cycleGAN for discovering
TJM method aims to learn a non-linear transformation across                  cross-domain relations and transferring style from one domain
domains by minimizing distribution discrepancy based on MMD.                 to another, which was similar with DiscoGAN [9] and DualZhang et al. [20] proposed a regularized subspace alignment                  GAN [37]. The key attributes such as orientation and face identity
method from the manifold [21] criterion perspective.                         are preserved.
   Feature reconstruction based approaches. Different from those                 In [11], DANN is one of the first work in deep domain adapmethods above, domain adaptation is achieved by feature recon-               tation, in which the adversarial mechanism of GAN was used to
struction between domains. Jhuo et al. [22] proposed a RDALR                 bridge the gap between the source and target domains. A novel
method, in which the source samples was reconstructed by the                 ADDA method is proposed in [12] for adversarial domain adaptatarget domain with low-rank constraint model. Similarly, Shao                tion. In this method, the convolutional neural network (CNN) was
et al. [23] proposed a LTSL method by pre-learning a subspace                used for adversarial discriminative feature learning. A GAN based
through principal component analysis (PCA) or linear discrimi-               model [38] that adapted the source domain images to appear to
nant analysis (LDA), then low-rank regularization across domains             be drawn from the target domain was proposed, in which domain
is modeled in this method. Zhang et al. [5] proposed a Latent                image generation was focused. The three works have shown the
Sparse Domain Transfer (LSDT) approach by jointly learning a                 potential of adversarial learning in domain adaptation. Additioncommon subspace and a sparse reconstruction matrix across                    ally, a CyCADA method [39] was proposed for cycle generation,
domains, and this method achieves good results.                              in which the representations in both pixel-level and feature-level
                                                                             are adaptive by enforcing cycle-consistency.
2.2. Deep domain adaptation
                                                                             3. The proposed CatDA
    The other category of data-driven DA method is deep learning
and it has witnessed a series of great success [24–26]. However,             3.1. Notation
for small-data tasks, deep learning method may not improve the
performance too much. Thus, recently, deep domain adaptation                     In our method, the source domain is defined by subscript ‘‘S’’
methods under small-scale tasks have been emerged.                           and target domain is defined by subscript ‘‘T ’’, respectively. The
    Donahue et al. [27] proposed a deep transfer strategy lever-             training set of source and target domain are defined as XS and
aging a CNN network on the large-scale ImageNet for small-scale              XT , respectively. Y denotes the data labels. A generator network
$$
object recognition tasks. Similarly, Razavian et al. [28] also pro-          is denoted as GST : S → T̂ , that embeds data from source domain
$$
posed to train a deep network based on ImageNet for high-level               S to its co-domain T̂ . The discriminator network is denoted as
domain feature extractor. Tzeng et al. [24] proposed a CNN net-              DT , which tries to discriminate the real samples in target domain
$$
work based on DDC method both aligning domains and tasks. In                 and the generated samples in co-domain T̂ . Similarly, GTS : T → Ŝ
$$
DAN, Long et al. [29] proposed a deep transfer network leveraging            aims to map the data from target domain T to its co-domain Ŝ,
MMD loss on the high-level features between the two-streamed                 and DS tries to discriminate the real samples in source domain
fully-connected layers from two domains. Then they also pro-                 and the generated samples in co-domain Ŝ. X̂ST represents the
$$
posed another two famous methods. In RTN [30], they proposed                 generated target data from S → T̂ ; X̂TS represents the generated
$$
$$
a residual transfer network which aims to learn a residual func-             source data from T → Ŝ. Xtest
$$
                                                                                                          T  represents the unlabeled target test
tion between the source and target domain. A joint adaptation                data.
networks (JAN) is another method which was proposed [31]
to learn a adaptation network. This network aligned the joint                3.2. Motivation
distributions across domains with a joint maximum mean discrepancy (JMMD) criterion. Oquab et al. [25] proposed a CNN                      Direct supervised learning of an effective classifier on the
architecture for middle-level feature transfer, which was trained            target domain is not allowed due to the label scarcity. Therefore,
on a large-scale annotated image set. Hu et al. [32] proposed                in this paper, we would like to answer whether the target data
a deep transfer metric learning (DTML) method leveraging the                 can be generated by using the labeled source data, such that
MLPs instead of CNN. The novelty of this method is to learn                  the classifier can be trained on the generated target data with
$$
a set of hierarchical nonlinear transformations. Autoencoder is              labels. Our key idea is to learn a ‘‘source → target’’ generative feaan unsupervised feature representation [33] and Wen et al. [34]              ture representation X̂ST through an adversarial domain generator,
$$
proposed a deep autoencoder based feature reconstruction for                 then a domain-agnostic classifier can be learnt on the generated
domain adaptation, which aims to share the feature represen-                 features for cross-domain applications. Noteworthily, our aim
tation parameters between source and target domains. Recently,               is to minimize the feature discrepancy between domains via
Chen et al. [35] proposed a broad learning system instead of deep            similarly distributed feature generation rather than generating a
system which can also be considered for transfer learning.                   vivid target image. Therefore, a simple and flexible network is
                                                                             much more expected for homogeneous image feature generation,
2.3. Generative adversarial networks                                         instead of very complicated structure (encoder vs. decoder) for
                                                                             realistic image rendering.
   The generative adversarial network (GAN) was first proposed                   Visually, the structure of the standard GAN and conditional
by Goodfellow et al. [10] to generate images and produced a                  GAN are shown in Fig. 2(a) and Fig. 2(b), respectively. There
high impact in deep learning. GAN generally comprises of two                 are several limitations for the two models. In standard GAN,
operators: a generator (G) and a discriminator (D). The discrim-             explicitly supervised data is seldom available, and the randomly
inator discriminates whether the sample is fake or real, while               generated samples can become tricky if the content information
the generator produces samples as real as possible to cheat the              is lost. Thus the trained classifier may not work obviously well.
discriminator. Mirza et al. [14] proposed a conditional generative           In conditional GAN, although a label constraint is imposed, it
adversarial net (CGAN) where both networks G and D receive                   does not guarantee the cross-domain relation because of the onean additional information vector as input. Salimans et al. [13]              directional domain mapping. Since conditional GAN architecture


<!-- PK PAGE 4 doc=math_p3 -->
4                                              S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258
Fig. 2. (a) The standard GAN is described. (b) The conditional GAN is structured. (c) The structure of the proposed CatDA, which is a slim but symmetric network,
with each stream a generator, a discriminator, a domain loss and a content loss are contained. The two-way generation function is a bijective mapping. Besides the
inherent GAN losses, the domain knowledge fidelity loss (content loss) and the domain specific loss (domain loss) are designed for domain content self-preservation
$$
and domain realistic. XS and XT represent the labeled samples in the source and target domain for training; X̂ST represents the generated data from S → T̂ ; X̂TS
$$
$$
represents the generated data from T → Ŝ. We aim to learn a discriminative classifier through X̂ST as well as the corresponding labels to classify unlabeled target
$$
test data ‘‘Xtest
             T ’’.
                                                                                      the content information of the generated samples. We process
                                                                                      the samples class by class which results in a semi-supervised
                                                                                      structure. The training data in source domain and target domain
                                                                                      per class are preprocessed independently, thus the number of
                                                                                      networks to be trained equals to the number of classes. Specif-
                                                                                      ically, the pipeline of the class-wise CatDA is shown in Fig. 3, and
                                                                                      the class conditional information is used. For each CatDA model,
                                                                                      the generator is a two-layered perceptron and the discriminator
Fig. 3. The pipeline of the class-wise CatDA. In order to avoid the domain            is a three-layered perceptron. Sigmoid function is selected as the
adversarial training limitation that feature extraction function has high-capacity,   activation function in hidden layers. The network structure of the
the semi-supervised method is used in our proposed CatDA to preserve the raw          joint generator and discriminator is described in Fig. 4.
content information in the generated samples. We process the samples class
                                                                                          The proposed CatDA model has a symmetric structure comby class which results in a semi-supervised structure. The training samples in
source domain and target domain per class are preprocessed independently.             prising of two generators and two discriminators, which are
$$
Note that i represents the index of class in source and target and C denotes the      described as two ways across domains (S → T̂ and T → Ŝ). We
$$
$$
number of classes. The number of networks to be trained equals to number C            first describe the model of way-1 (S → T̂ ), which shares the same
$$
of classes.
$$
                                                                                      model and algorithm as way-2 (T → Ŝ).
$$
$$
                                                                                         • Way-1: S → T̂ :
$$
only learns one mapping from one domain to another (one-way),
                                                                                        A target domain discriminator DT is formulated to classify
a two-way coupled adversarial domain generation method with
more freedom is therefore proposed in this paper, as shown in                         whether a generated data is drawn from the target domain (real).
Fig. 2(c). The core of our CatDA model depends on two symmetric                       Thus, the discriminator loss LDT is formulated as
$$
GANs, which then result in a pair of symmetric generative and                         min LDT = − EX T ∼X T [logDT (XT )]
$$
discriminative functions. The two-way generator function can be                        DT
                                                                                                                                                                (1)
recognized as a bijective mapping, and the work flow of the                                       − EX S ∼X S [log(1 − DT (X̂ST ))]
proposed CatDA in implementation can be described as follows.
$$
    First, different from GAN, the image or feature instead of noise                  where X̂ST = GST (XS ). GST is the generator for generating realistic
$$
is fed as input into the model. The way-1 of CatDA comprises of                       data similar to target domain. Therefore, the supervised generator
the generator GST and the discriminator DT . The way-2 comprises                      loss LGST is formulated as
of the generator GTS and the discriminator DS . For way-1, the
$$
source data XS is fed into the generator, and the co-target data                      min LGST = − EX S ∼X S [logDT (X̂ST )]
$$
                                                                                       GST                                                                      (2)
X̂ST is generated. Then the generated target data X̂ST and the
$$
real target data XT are fed into the discriminator network DT for                               = − EX S ∼X S [logDT (GST (XS ))]
$$
adversarial training. For way-2, the similar operation with way-
                                                                                         The two losses in Eqs. (1) and (2) are the inherent loss func1 is conducted. In order to achieve the bijective mapping, we
                                                                                      tions in traditional GAN models. The focus of CatDA is to reexpect that the real source data can be recovered by feeding the
                                                                                      duce the distribution difference across domains. Therefore, in the
generated X̂ST into the generator GTS for progressively learning
                                                                                      proposed CatDA model, two novel loss functions are proposed,
supervised by DS . Similarly, GST is also fine-tuned by feeding the
                                                                                      which are the domain specific loss (domain loss) and the domain
X̂TS supervised by DT to recover the real target training data.
                                                                                      knowledge fidelity loss (content loss).
3.3. Model formulation                                                                   One of the feasible strategies for reducing the domain discrep-
                                                                                      ancy is to find an abstract feature representation under which
   In order to avoid the domain adversarial training limitation                       the source and target domains are similar. This idea has been
of high-capacity of the feature extraction function, the semi-                        explored in [29–31] by leveraging the Maximum Mean Discrepsupervised strategy is used in our proposed CatDA to preserve                         ancy (MMD) criterion, which is used when the source and target


<!-- PK PAGE 5 doc=math_p3 -->
S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258                                   5
                                                                                      Algorithm 1 The Proposed CatDA
$$
                                                                                      Input:    Source data XS = [X1S , ...XCS ],
$$
$$
                                                                                                 target training data XT = [X1T , ...XCT ],
$$
                                                                                                 iterations maxiter1, maxiter2,
                                                                                                 the number C of classes;
                                                                                      Procedure:
$$
                                                                                      For i = 1, ...C do
$$
                                                                                      1. Initialize X̂iST and X̂iTS using traditional GAN:
                                                                                         While iter1 < maxiter1 do
                                                                                          Step1: Train the generator GST and discriminator DT
                                                                                                 by solving problem (1) and (2) using
                                                                                                 back-propagation (BP) algorithm;
$$
                                                                                          Step2: Compute X̂iST = GST (XiS );
$$
                                                                                          Step3: Train the generator GTS and discriminator DS
                                                                                                 by solving the problem (7) using BP algorithm;
$$
                                                                                          Step4: Compute X̂iTS = GTS (XiT );
$$
$$
                                                                                           iter1 = iter1 + 1;
$$
                                                                                         end while
                                                                                      2. Update X̂iST and X̂iTS using the proposed model:
Fig. 4. The network structure of the adversarial training model in CatDA. The            While iter2 < maxiter2 do
input sample for each class is fed into the generator (two-layered perceptrons),          Step1: Train the generator GST and the
and then the generated sample is sent to the discriminator (three-layered                        discriminator DT , by solving the problem
perceptrons) for classifying whether it belongs to the target domain. In order                   (1) and (6) using BP algorithm;
$$
to reduce the distribution mismatch across the generated samples and the                  Step2: Update X̂iST = GST (XiS ) and
$$
$$
real samples, a domain specific loss (i.e. domain loss) is imposed. Further, for                 X̂iTST = GST (X̂iTS ));
$$
preserving the content information of each sample, a domain knowledge fidelity            Step3: Train the generator GTS and the
term (i.e. content loss) is established in our model.                                            discriminator DS , by solving the problem
                                                                                                 (7) and (8) using BP algorithm;
$$
                                                                                          Step4: Update X̂iTS = GTS (XiT ) and
$$
$$
                                                                                                 X̂iSTS = GTS (X̂iST );
$$
$$
data distributions differs. Therefore, in this paper, we focus on the                      iter2 = iter2 + 1;
$$
domain specific loss by a simple and approximate MMD, which is                          end while
formalized to maximize the two-sample test power and minimize                         End
the Type II error (the failure of rejecting a false null hypothesis).                 Output: X̂ST .
For convenience, we define the proposed domain loss as LDomainT ,
which is minimized to help the learning of the generator GST as
shown in Fig. 2(c). Specifically, in order to reduce the distribution
                                                                                       For way-2, the similar models with way-1 are formulated,
mismatch between the generated target data X̂ST and the original
                                                                                    including the source discriminator loss LDS , the source data gentarget data XT , the domain specific loss (domain loss) can be
formulated as                                                                       erator loss LGTS , source domain loss LDomainS , and the target con-
                             2                                                    tent loss LCON2 . Specifically, the loss functions of way-2 can be
$$
min LDomainT =X̂ST − XT                                                   (3)
$$
                             
                                                                                    formulated as follows
 GST
$$
                                                                                     min LDS = −EXS ∼X S [logDS (XS )]
$$
                                                                                      DS
where ∥ · ∥ denotes the l2 -norm, X̂ST and XT represents the center
of the co-target data and target data, respectively. Noteworthily,                                   − EXT ∼X T [log(1 − DS (X̂TS ))]
$$
during the network training phase, the sigmoid function is im-                       min LGTS = −EXT ∼X T [logDS (X̂TS )]
$$
posed on the domain loss for probability output normalized to                        GTS
                                                                                                                                                      (7)
[0, 1]. Therefore, the target domain loss shown in Eq. (3) can be
                                                                                                                               2
$$
                                                                                     min LDomainS = 1/(1 + exp(−X̂TS − XS  ))
$$
                                                                                                                               
further written as                                                                   GTS
                                    2                                                                                      2
$$
minLDomainT = 1/(1 + exp(−X̂ST − XT  ))                                            min LCON2 = 1/(1 + exp(−X̂TST − XT  ))
$$
                                                                                                                             
                                                                            (4)
                                    
 GST                                                                                 GST
    Additionally, for preserving the content in source data, we
$$
                                                                                    where X̂TS = GTS (XT ) and X̂TST =GST (GTS (XT )). X̂TS and XS are the
$$
establish a content fidelity term in our model. Ideally, the equality
$$
GTS (GST (XS )) = XS should be satisfied, that is, the generation is                centers of the generated source data and the real source data.
$$
reversible. However, this hard constraint is difficult to be guaran-                Similar to Eq. (6), the objective function of the way-2 generator
teed and thus a relaxed soft constraint is more desirable. To this                  can be formulated as
end, we try to minimize the l2 distance between GTS (GST (XS )) and
$$
                                                                                     min LWay2 = LGTS + LDomainS + LCON2                              (8)
$$
XS and formulate a content loss function LCON1 , i.e. source content                GTS ,GST
loss as follows
                                            2                                         • Complete CatDA Method:
$$
minLCON1 = 1/(1 + exp(−X̂STS − XS  ))                                     (5)
$$
                                            
 GTS
                                                                                        Our CatDA is a coupled net including way-1 and way-2, each
$$
where X̂STS =GTS (GST (XS )), and GTS is a generator of way-2 (T →                  of which learns the bijective mapping from one domain to the
$$
Ŝ). Finally, the objective function of the way-1 generator is com-
                                                                                    other. We train the two ways in CatDA jointly in an alternative
posed of 3 parts:
                                                                                    manner.
$$
 min LWay1 = LGST + LDomainT + LCON1                                        (6)         By joint learning of the Way-1 and Way-2, the generated data
$$
GST ,GTS
                                                                                    X̂ST and X̂TS are fed into the discriminators DT and DS , respec-
$$
   • Way-2: T → Ŝ:                                                                 tively. Then the complete model of CatDA including the generator
$$


<!-- PK PAGE 6 doc=math_p3 -->
6                                                  S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258
                                                                                         is the same as the number of input neurons (i.e. feature dimen-
    Algorithm 2 The Proposed Cross-Domain Method                                         sionality). Then, the output is fed into the discriminator network
    Input: Source data XS ,                                                              where the neurons number of hidden layer is set as 100. The
             a very few target training data XT ,
                                                                                         neurons number in the output layer of the discriminator is set
             source label Y S , target label Y T ,
             target test data Xtest                                                      as 1. The network weights can be optimized by gradient descent
                                 T ;
    Procedure:                                                                           based back-propagation algorithm.
    1. Step1: Compute X̂ST by CatDA method
             using Algorithm 1;                                                          4.2. Compared methods
    2. Step2: Train the classifier f (·) on
             augmented training data [X̂ ST , X T ]
$$
             with label Y = [Y S , Y T ];
$$
                                                                                            The proposed model is flexible and simple, which can be
    3. Step3: Predict the label Ŷ by the classifier,
                                                                                         regarded as a shallow transfer learning approach. Therefore, both
$$
             i.e., Ŷ = f (Xtest                                                         the shallow features (e.g., pixel-level [40], hand-crafted feature)
$$
                            T ).
    Output: Predicted label Ŷ.                                                          and deep features can be fed as input.
                                                                                            In the shallow protocol, the following typical DA approaches
                                                                                         are exploited for performance comparison. Noteworthily, as our
                                                                                         method is a semi-supervised method, for fairness, we compared
G and the discriminator D can be formulated as the follows.                              some methods with semi-supervised manner, such as GFK [41],
$$
    min LG =LWay1 + LWay2                                                                SA [42], LSDT [5] and so on. We follow the standard semiGST ,GTS
$$
                                                                                (9)      supervised manner leveraging partially labeled target data to
$$
    min LD =LDT + LDS
$$
    DT , DS                                                                              train the classifier.
   In detail, the complete training procedure of CatDA is summa-                            • No Adaptation (NA): a naive baseline that learns a linear
rized in Algorithm 1 and Algorithm 2.                                                         SVM classifier on the source domain and a few target sam-
                                                                                              ples, and then applies it to the target domain, which could
3.4. Classification                                                                           be regarded as a lower bound;
                                                                                            • Geodesic Flow Kernel (GFK) [41]: a classic cross-domain
    For classification, the general classifiers are trained by the                            subspace learning approach that aligns two domains with
aligned and augmented training samples [X̂ ST , X T ] with labels                             a geodesic flow in a Grassmann manifold;
$$
Y = [Y S , Y T ]. Note that X̂ ST is the output of Algorithm 1. Finally,                    • Subspace Alignment (SA) [42]: a widely-used feature alignthe recognition accuracy of unlabeled target test data Xtest      T   is                      ment approach that projects the source subspace to the
$$
employed to compare with other methods.                                                       target subspace computed by PCA;
    The whole procedure of the proposed CatDA for cross-domain                              • Robust Domain Adaptation via Low Rank (RDALR) [43]: a
visual recognition is clearly described in Algorithm 2, follow-                               transfer approach by reconstructing the rotated source data
ing which the experiments are then conducted to verify the                                    with the target data via low-rank representation;
effectiveness and superiority of our method.                                                • Low-Rank Transfer Subspace Learning (LTSL) [23]: a
                                                                                              subspace-based reconstruction approach that tends to align
3.5. Remarks                                                                                  the source subspace and the target by using low-rank rep-
                                                                                              resentation, which is similar with RADLR [43];
   In CatDA, we propose a two-way coupled architecture and                                  • Discriminative Transfer (DTSL) [44]: a subspace-based rethis is the key difference with the previous GAN model. In this                               construction approach that tends to align the source to the
architecture, a domain loss and a content loss are designed for                               target by joint low rank and sparse representation;
domain alignment and content fidelity respectively. Note that, the                          • Latent Sparse Domain Transfer (LSDT) [5]: a reconstructionproposed CatDA has a similar structure with the cycleGAN, but                                 based latent sparse transfer learning method that tends to
essentially different in the following aspects.                                               jointly learning the subspace and the sparse representation.
      • The purpose of CatDA aims at achieving domain adaptation                            In Office-31 recognition, we followed the ADGANet [45] to
        in feature representation for cross-domain application by                        compare with some recent deep DA approaches, such as DDC [46],
        domain alignment and content preservation, rather than                           DAN [29], RTN [30], DANN [11], ADDA [12], JAN [47] and ADGANet
        generating realistic pictures. Therefore, a simple yet effec-                    [45]. For fair comparison, the deep features of Office-31 dataset
        tive shallow multilayer perceptrons model instead of deep                        extracted from ResNet-50 with convolutional neural network
        model is proposed in our approach.                                               architecture.
      • In order to avoid the limitation of domain adversarial train-                       In the deep protocol for cross-domain handwritten digits
        ing that feature extraction function has high-capacity, the                      recognition, we have compared with the recent deep DA ap-
        semi-supervised domain adaptation model is adopted in this                       proaches, such as DANN [11], Domain confusion [24], CoGAN [48],
        paper to help preserve the rich content information.                             ADDA [12]and ADGANet [45]. Note that for fair comparison, the
      • For minimizing the domain discrepancy but preserve the                           deep features of handwritten digit datasets extracted using LeNet
        content information, a novel domain loss and a content loss                      with convolutional neural network architecture are fed as the
        are designed. The cycleGAN focus on image generation but                         input of our CatDA model.
        not for cross-domain visual recognition.
                                                                                         4.3. Comparison with some shallow transfer learning
4. Experiments
                                                                                            In this section, five benchmark datasets including 1 4DA office
4.1. Experimental protocol                                                               dataset, 2 office-31 dataset, 3 COIL-20 object dataset, 4 MSRC-
                                                                                         VOC 2007 datasets and 5 handwritten digits are conducted for
   In our method, the total number of layers is set as 3. The                            cross-domain visual recognition. Visually, in Fig. 5, it is shown
neurons number of the output layer in the generator network                              some samples from 4DA office dataset. Several example images


<!-- PK PAGE 7 doc=math_p3 -->
S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258                                          7
                                                                                                  Fig. 6. Some samples from COIL-20 dataset.
               Fig. 5. Some samples on 4DA office datasets.
from COIL-20 object dataset are shown in Fig. 6, several example
images from MSRC and VOC 2007 datasets are described in Fig. 7,
and several example images from the handwritten digits datasets
are shown in Fig. 8. From the cross-domain images, the visual het-                         Fig. 7. Some samples from MSRC and VOC 2007 datasets.
erogeneity is significantly observed, and multiple cross-domain
tasks are naturally formulated.
    Office 4DA (Amazon, Webcam, DSLR and Caltech 256)
datasets [41]:
    There are four domains in Office 4DA datasets, which are Amazon (A), Webcam (W),1 DSLR (D) and Caltech (C).2 These datasets
contain 10 object classes. It is a common dataset in cross-domain
problem. The experimental configuration in our method is followed in [41], and the experiment extracted the 800-bin SURF                                Fig. 8. Some examples from handwritten digits datasets.
features [41] for comparison. Every two domains are selected as
the source and target domain in turn. As the source domain, 20
samples per object are selected from Amazon, and 8 samples per
class are chosen from Webcam, DSLR and Caltech. However, as                          Columbia Object Image Library (COIL-20) dataset [54].
target training samples, 3 images per class are selected, while                     The COIL-20 dataset3 contains 20 objects with 72 multi-pose
the rest samples in target domains are used as target testing                    images per class and total 1440 gray scale images. We follow the
data. The experimental results of different domain adaptation                    experimental protocol in [44] in our experiments, so this dataset
methods are shown in Table 1. From the results, we observe that                  is divided into two subsets C1 and C2, with each 2 quadrants
the proposed CatDA shows competitive recognition performance                     are included. Specifically, the poses of quadrants 1 and 3 are
and the superiority is therefore proved. Noteworthily, we also                   selected as the C1 set and the poses of quadrants 2 and 4 consist
exhibit the unsupervised version of our method on this dataset.                  the C2 set. The two subsets have different distribution due to
The asterisk (∗ ) in Table 1 indicates that we use our method as an              the pose rotation but relevant in semantic describing the same
unsupervised manner and the results are not good. From the last                  objects, therefore it comes to a domain adaptation problem. We
lines in Table 1, it is obvious that the semi-supervised manner is               choose the subsets of C1 and C2 as source and target domain
necessary and competitive in our simple network.                                 alternatively, and the cross-domain recognition performance is
    Office 3DA (Office-31 dataset [51]):                                         shown in Table 3. From Table 3, it is obvious that the proposed
    This dataset contains three domains such as Amazon (A), We-                  CatDA shows a significantly superior recognition performance
bcam (W) and Dslr (D). It contains 4652 images from 31 object                    (93.0%) in average over other state-of-the-art shallow DA methclasses. With each domain worked as source and target alterna-                   ods. This demonstrates that the proposed CatDA can generate
$$
tively, 6 cross-domain tasks are formed, e.g., A → D, W → D,                     similar feature representation with the target domain, such that
$$
etc. In experiment, we follow the experimental protocol as [52]                  the heterogeneity can be effectively reduced.
for the semi-supervised strategy. In our method, 3 images per                       MSRC4 and VOC 2007datasets [44]:
class are selected when they are used as target training data,                      The MSRC dataset contains 18 classes including 4323 images,
while the rest samples in target domains are used for testing.                   while the VOC 2007 dataset contains 20 concepts with 5011
The recognition accuracy is reported in Table 2. We can achieve                  images. These two datasets have 6 shared semantic categories:
the competitive results with [52]. Noteworthily, we do not use                   airplane, bicycle, bird, car, cow and sheep. In such way, the two
any auxiliary and discriminative methods only the simple MLP                     domain are constructed to share the same label set. Our crossnetwork.                                                                         domain experimental protocol is followed in [19]. We select 1269
 1 http://www.eecs.berkeley.edu/~mfritz/domainadaptation/.                         3 http://www.cs.columbia.edu/CAVE/software/softlib/coil-20.php.
 2 http://www.vision.caltech.edu/Image_Datasets/Caltech256/.                       4 http://research.microsoft.com/en-us/projects/objectclassrecognition.


<!-- PK PAGE 8 doc=math_p3 -->
8                                                   S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258
Table 1
Recognition performance (%) of different transfer learning methods in 4DA office datasets.
    4DA Tasks    NA      HFA [49]     ARC-t [4]         MMDT [16]        SGF [50]   GFK [41]      SA [42]     LTSL-PCA[23]    LTSL-LDA[23]     LSDT [5]   Ours∗   Ours
$$
    A→D          55.9    52.7         50.2              56.7             46.9       50.9          55.1        50.4            59.1             52.9       46.0    60.5
$$
$$
    C →D         55.8    51.9         50.6              56.5             50.2       55.0          56.6        49.5            59.6             56.0       50.6    59.4
$$
$$
    W →D         55.1    51.7         71.3              67.0             78.6       75.0          82.3        82.6            82.6             75.7       68.3    60.7
$$
$$
    A→C          32.0    31.1         37.0              36.4             37.5       39.6          38.4        41.5            39.8             42.2       39.0    37.6
$$
$$
    W →C         30.4    29.4         31.9              32.2             32.9       32.8          34.1        36.7            38.5             36.9       33.0    34.3
$$
$$
    D→C          31.7    31.0         33.5              34.1             32.9       33.9          35.8        36.2            36.7             37.6       31.1    36.9
$$
$$
    D→A          45.7    45.8         42.5              46.9             44.9       46.2          45.8        45.7            47.4             46.6       39.3    50.9
$$
$$
    W →A         45.6    45.9         43.4              47.7             43.0       46.2          44.8        41.9            47.8             46.6       41.5    53.2
$$
$$
    C →A         45.3    45.5         44.1              49.4             42.0       46.1          45.3        49.3            50.4             47.7       44.0    50.4
$$
$$
    C →W         60.3    60.5         55.9              63.8             54.2       57.0          60.7        50.4            59.5             57.6       49.5    67.6
$$
$$
    D→W          62.1    62.1         78.3              74.1             78.6       80.2          84.8        81.0            78.3             83.1       72.7    69.0
$$
$$
    A→W          62.4    61.8         55.7              64.6             54.2       56.9          60.3        52.3            59.5             57.2       47.4    68.0
$$
    Av erage     48.5    47.4         49.5              52.5             49.7       51.6          53.7        51.5            54.9             53.3       46.9    54.0
The asterisk (∗ ) indicates that we use our method as an unsupervised manner.
                          Table 2
                          Recognition accuracy (%) of different transfer learning methods in office-31 dataset.
                           Tasks           AVC [51]            AKT [4]      SGF [50]       GFK [41]         GMDA [53]        GIDR [52]       Ours
$$
                           A → W           48.0                50.4         57.0           46.4             45.0             52.4            54.8
$$
$$
                           D → W           31.0                36.1         36.0           61.3             61.0             57.8            57.2
$$
$$
                           W → D           27.0                25.3         37.0           66.3             66.0             58.3            58.1
$$
                           Av erage        35.3                37.3         43.3           58.0             57.3             56.2            56.7
                          Table 3
                          Recognition performance (%) of different transfer learning methods in COIL-20 dataset.
                           Tasks             SourceOnly           TSL       RDALR [43]         LTSL [23]      DTSL [44]       LSDT [5]       Ours
$$
                           C1 → C2           82.7                 80.0      80.7               75.4           84.6            89.7           94.3
$$
$$
                           C2 → C1           84.0                 75.6      78.8               72.2           84.2            85.5           91.7
$$
                           Av erage          83.3                 77.8      79.7               73.8           84.4            81.6           93.0
images from MSRC as the source domain and 1530 images from                                 for training. After the 5 random splits, the average classification
VOC 2007 as the target domain to construct a cross-domain task                             accuracies are described in Table 5. From Table 5, we observe that
MSRC vs. VOC 2007. Then we switch the two datasets ( VOC 2007                              our method shows competitive recognition performance comvs. MSRC ) to construct the other task. For feature extraction, all                        pared to other state-of-the-art methods in average, but slightly
images are uniformly re-scaled to 256 pixels, and the VLFeat open                          lower than the GFK classifier.
source package is used to extract the 128-dimensional dense SIFT
(DSIFT) features. Then K -means clustering is leveraged to obtain                          4.4. Comparison with some deep transfer learning
a 240-dimensional codebook.
    By following [55], the source training sample set contains                                 In this section, some experiments are deployed on office-31
all the labeled samples in the source domain, 4 labeled target                             dataset and handwritten digit datasets for comparison with some
samples per class randomly selected from the target domain                                 classic state-of-the-art deep transfer learning approaches.
formulate the labeled target training data, and the rest unlabeled                             Deep features of Office-31 dataset [51]:
examples are recognized as the target testing data. The experi-                                For fair comparison, we extract the deep features of Officemental results of different domain adaptation methods are shown                            31 dataset by the ResNet-50 architecture. From the results, we
in Table 4. From the results, we observe that the proposed CatDA                           observe that our method (91.3% in average) outperforms stateoutperforms other DA methods.                                                              of-the-art deep domain adaptation methods. Especially, com-
    Cross-domain handwritten digits datasets:                                              pared with ADGANet [45] which is proposed from the generative
    Three handwritten digits datasets: MNIST5 , USPS6 and SE-                              method, our accuracy exceeds it by 4.8%. This demonstrates that
MEION7 with 10 classes from digit 0 ∼ 9 are used for eval-                                 our model can effectively alleviate the model bias problem. Simiuating the proposed CatDA method. The MNIST dataset con-                                   lar with 4DA dataset, we also exhibit the unsupervised version of
$$
sists of 70,000 instances with image size of 28 × 28, the USPS                             our method on this dataset. The asterisk (∗ ) in Table 6 indicates
$$
$$
dataset consists of 9,298 samples with image size of 16 × 16,                              that we use our method as an unsupervised manner and the
$$
and SEMEION dataset consists of 2593 images with image size                                results are not so good.
$$
of 16 × 16. In experiments, we adopt the strategy that crop the                                Deep features of handwritten digits datasets:
$$
$$
MNIST dataset into 16 × 16. For DA experiment, every dataset of                                In this section, a new handwritten digits dataset SVHN8 (see
$$
handwritten digits is used as the source domain and target do-                             Fig. 8) is introduced. During generation, the content information
$$
main alternatively, and totally 6 cross-domain tasks are obtained.                         is easy to be changed by GAN without supervision (e.g., 3 →
$$
In experiment, 100 samples per class from source domain and 10                             8 in generation), however, in our method, the semi-supervised
samples per category from target domain are randomly chosen                                strategy can help completely avoid such incorrect generation.
                                                                                               We have experimentally validated our proposed method in
    5 http://yann.lecun.com/exdb/mnist/.                                                   MNIST, USPS and SVHN datasets. These datasets share 10 classes
    6 http://www-i6.informatik.rwth-aachen.de/~keysers/usps.html.
    7 http://archive.ics.uci.edu/ml/datasets/Semeion+Handwritten+Digit.                        8 http://ufldl.stanford.edu/housenumbers/.


<!-- PK PAGE 9 doc=math_p3 -->
S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258                                                                                 9
                          Table 4
                          Recognition accuracy (%) of shallow transfer learning methods in MSRC and VOC 2007.
                            Tasks                    NA          DTMKT-f [15]           MMDT [16]                 KMM [56]       GFK [41]         LSDT [5]           Ours
$$
                            MSRC → VOC2007           36.3        36.9                   36.0                      36.1           29.5             36.9               36.8
$$
$$
                            VOC2007 → MSRC           64.3        65.0                   62.1                      64.8           50.7             59.3               65.1
$$
                            Av erage                 50.3        51.0                   49.1                      50.5           40.1             48.1               51.0
                          Table 5
                          Recognition performance (%) of shallow transfer learning in handwritten digits recognition.
                            Tasks                      NA        A-SVM           SGF [50]          GFK [41]          SA [42]     LTSL [23]         LSDT [5]          Ours
$$
                            MNIST → USPS               78.8      78.3            79.2              82.6              78.8        83.2              79.3              81.0
$$
$$
                            SEMEION → USPS             83.6      76.8            77.5              82.7              82.5        83.6              84.7              80.2
$$
$$
                            MNIST → SEMEION            51.9      70.5            51.6              70.5              74.4        72.8              69.1              69.6
$$
$$
                            USPS → SEMEION             65.3      74.5            70.9              76.7              74.6        65.3              67.4              78.0
$$
$$
                            USPS → MNIST               71.7      73.2            71.1              74.9              72.9        71.7              70.5              75.6
$$
$$
                            SEMEION → MNIST            67.6      69.3            66.9              74.5              72.9        67.6              70.0              75.8
$$
                            Av erage                   69.8      73.8            69.5              77.0              76.0        74.0              73.5              76.7
Table 6
Recognition performance (%) of deep transfer learning methods in Office-31 dataset.
 Tasks       SourceOnly        TCA[57]     GFK[41]        DDC[46]         DAN[29]           RTN[30]          DANN[11]          ADDA[12]          JAN[47]       ADGANet [45]            Ours∗      Ours
$$
 A→W         68.4              72.7        72.8           75.6            80.5              84.5             82.0              86.2              85.4          89.5                    87.9       93.7
$$
$$
 D→W         96.7              96.7        95.0           96.0            97.1              96.8             96.9              96.2              97.4          97.9                    91.1       94.9
$$
$$
 W →D        99.3              99.6        98.2           98.2            99.6              99.4             99.1              98.4              99.8          99.8                    91.4       96.0
$$
$$
 A→D         68.9              74.1        74.5           76.5            78.6              77.5             79.4              77.8              84.7          87.7                    90.8       96.1
$$
$$
 D→A         62.5              61.7        63.4           62.2            63.6              66.2             68.2              69.5              68.6          72.8                    72.0       84.0
$$
$$
 W →A        60.7              60.9        61.0           61.5            62.8              64.8             67.4              68.9              70.0          71.4                    74.1       82.8
$$
 Av erage    76.1              77.6        77.5           78.3            80.4              81.5             82.2              82.9              84.3          86.5                    84.5       91.3
The asterisk (∗ ) indicates that we use our method as an unsupervised manner.
                Table 7
                Recognition performance (%) of deep transfer learning methods in handwritten digits recognition.
                 Tasks                   Source only          DANN [11]          Domain                      CoGAN [48]          ADDA [12]              ADGANet [45]         Ours
                                                                                 confusion [24]
$$
                 MNIST → USPS            75.2                 77.1               79.1                        91.2                89.4                   92.8                 87.9
$$
$$
                 USPS → MNIST            57.1                 73.0               66.5                        89.1                90.1                   90.8                 95.9
$$
$$
                 SVHN→ MNIST             60.1                 73.9               68.1                        −                   76.0                   92.4                 75.1
$$
                 Av erage                64.1                 74.7               71.2                        −                   85.2                   92.0                 86.1
of digits. In our method, the deep features of three datasets are                                    Table 8
extracted by LeNet model. For adaptation tasks between MNIST                                         The time cost (s) with different number of layers on different datasets.
and USPS, the training protocol established in [19] is followed,                                          Tasks                       3 layers            4 layers          5 layers           6 layers
$$
where 2000 images from MNIST and 1800 images from USPS                                                    C1 → C2                     17.25               51.09             102.48             148.02
$$
$$
are randomly sampled. While for adaptation task between SVHN                                              MSRC → VOC                  4.38                8.83              17.50              25.44
$$
$$
                                                                                                          SVHN→ MNIST                 753.72              2275.78           4090.25            7600.42
$$
and MNIST, the full training sets are employed for comparison
against [11]. All the domain adaptation tasks are conducted by
following the experimental protocol in [12]. The key difference
between [12] and our method lies in that the ADDA [12] is                                            training instead of GPU. Also, the time cost is much lower as
convolutional neural network structured method while ours is
                                                                                                     shown in Table 8, from which we can observe that the compumultilayer perceptron structured method. In ADDA, an essential
                                                                                                     tational speed is quite fast for three layered MLP model. Conproblem is that the generated samples may be randomly changed
$$
(e.g., 3 → 8 instead of 3 → 3). While in our method, this problem                                    sidering that our three layered shallow network can achieve
$$
can be solved by establishing multiple class-wise models. In our                                     competitive performance and fast computational time, we choose
experimental setting, 10 samples per class from target domain are                                    this three layered model in our method. Our experiments are
randomly selected and 5 random splits are considered totally. The                                    implemented on the runtime environment with a PC of Intel i7classification accuracies of some different methods are reported                                     4790K CPU, 4.00 GHz, 32 GB RAM. It is noteworthy that the time
in Table 7. From the cross-domain recognition results, we can                                        for data preprocessing and classification is excluded.
observe that our CatDA model outperforms most state-of-the-art
methods with 1% improvement in average, and only lower than
the recent ADGANet [45] method.                                                                      5.2. Evaluation of layer number
5. Discussion
                                                                                                         For insight of the impact of layers, we show the results of
5.1. Computational efficiency                                                                        different number of layers in Table 9, from which we can observe
                                                                                                     that the performance does not always show an upward trend
   As the proposed CatDA model is simple in cross-domain visual                                      with increasing layers and the three layered shallow network can
recognition system, CPU is enough for model optimization and                                         achieve competitive performance.


<!-- PK PAGE 10 doc=math_p3 -->
10                                             S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258
Table 9                                                                              our method. It combined the GAN model and source classifier
Recognition performance (%) with different number of layers on different             together, and there is no additional constraint. The results in
datasets.
                                                                                     Table 6 show that our method has competitiveness compared
 Tasks                  3 layers        4 layers        5 layers       6 layers
                                                                                     with it. Additionally, CyCADA method [39] is also similar with
$$
 C1 → C2                94.3            93.3            93.3           93.7
$$
                                                                                     ours and we both adopted the cycleGAN model. However, it
$$
 C2 → C1                91.7            91.8            91.3           90.8
$$
                                                                                     focuses on the image synthetic quality while we aim to minimize
$$
 MNIST → USPS           87.9            88.3            88.2           88.3
$$
                                                                                     the between-domain feature discrepancy.
$$
 USPS → MNIST           95.9            96.0            96.1           96.0
$$
$$
 SVHN→ MNIST            75.1            84.8            91.1           92.8
$$
 Average                89.0            90.9            92.0           92.3
                                                                                     6. Conclusion
                                                                                         In this paper, we propose a new transfer learning method from
                                                                                     the perspective of feature generation for cross-domain visual
                                                                                     recognition. Specifically, a coupled adversarial transfer domain
                                                                                     adaptation (CatDA) framework comprising of two generators, two
                                                                                     discriminators, two domain specific loss terms and two content
                                                                                     fidelity loss terms is proposed in a semi-supervised mode for
                                                                                     domain and intra-class discrepancy reduction. This symmetric
                                                                                     model can achieve bijective mapping, such that the domain fea-
                                                                                     ture can be generated alternatively benefiting from the reversible
                                                                                     characteristic of the proposed model. Consider that our focus
                                                                                     is the domain feature generation with distribution disparity re-
                                                                                     moved for cross-domain applications, rather than realistic image
                                                                                     generation, a shallow yet effective MLP transfer network is there-
                                                                                     fore considered. Extensive experiments on several benchmark
                                                                                     datasets demonstrate the superiority of the proposed method
                                                                                     over some other state-of-the-art DA methods.
Fig. 9. Feature visualization of data distribution. Both (a) and (c) show feature        In our future work, benefit from the strong feature learning
$$
distribution of source (MNIST) and target domain (USPS). (b) shows the feature       capability of deep neural network (e.g. convolutional neural netdistribution of the generated data (M → Û). Both (d) and (f) show the feature       work), deep adversarial domain adaptation framework that owns
$$
distribution of source domain (Amazon) and target domain (Webcam). (e) shows         similar model with CatDA should be focused. Compared with
$$
the distribution of the generated samples (A → Ŵ ).                                 CatDA, deep methods extract high dimensional semantic features
$$
                                                                                     to achieve good performance but they need large-scale samples
                                                                                     to train the network. Hence, fine-tuning based parameter transfer
5.3. Model visualization                                                             from big data to small data can be leveraged for improving the
                                                                                     network adaptation.
    In this section, for better insight of the CatDA model, visualization of class distribution is explored. We visualize the                      CRediT authorship contribution statement
features for further validating the effectiveness of our model. The
t-SNE [27] visualization method is employed on the source do-                           Shanshan Wang: Method, Experiment, Writing - original draft.
$$
main and target domain in the M → U task of handwritten digits                       Lei Zhang: Proposal, Method, Writing, Editing. Jingru Fu: Experdatasets (shallow domain adaptation) and A → W task of 3DA                           iment, Validation, Editing.
$$
office datasets (deep domain adaptation) for feature visualization.
From the (b) and (e) in Fig. 9, it is obvious that the better clus-                  Declaration of competing interest
tering characteristic is achieved and the feature discriminative
power is improved in the generated data. As a result, the visual                         The authors declare that they have no known competing finanrecognition cross-domain performance is improved. It is worthy                       cial interests or personal relationships that could have appeared
noting that as shown in Fig. 9 the discrimination of the generated                   to influence the work reported in this paper.
features becomes better than raw features. The reason is that in
our semi-supervised domain adaptation method, a partial target                       Acknowledgments
label information is used for feature generation, which, therefore,
improves the discrimination of the generated features.                                  This work was supported by the National Science Fund of
                                                                                     China under Grants (61771079) and Chongqing Youth Talent
5.4. Remarks                                                                         Program, China.
    The proposed method is an adversarial feature adaptation                         References
model, which can be used for semi-supervised and unsupervised
domain adaptation. We have to claim that (1) the proposed CatDA                       [1] S.J. Pan, Q. Yang, A survey on transfer learning, IEEE Trans. Knowl. Data
is completely different from GAN that it cannot be used for image                         Eng. 22 (10) (2010) 1345–1359.
                                                                                      [2] H. Lu, L. Zhang, Z. Cao, W. Wei, K. Xian, C. Shen, A.V.D. Hengel, When
synthesis in its current form, but only for domain adaptive feature
                                                                                          unsupervised domain adaptation meets tensor representations, in: ICCV,
representation. This is because the inputs fed into our CatDA                             2017.
are still features such as the low-level hand-crafted feature or                      [3] L. Duan, D. Xu, I.W. Tsang, J. Luo, Visual event recognition in videos by
deep features by an off-the-shelf CNN model, rather than image                            learning from web data, in: CVPR, 2010, pp. 1959–1966.
pixels. (2) The proposed model is not CNN based, so it may not                        [4] B. Kulis, K. Saenko, T. Darrell, What you saw is not what you get:
                                                                                          Domain adaptation using asymmetric kernel transforms, in: CVPR, 2011,
compare with deep networks. However, deep features can be fed                             pp. 1785–1792.
into our model for fair comparison as is presented in Table 6. (3)                    [5] L. Zhang, W. Zuo, D. Zhang, LSDT: Latent sparse domain transfer learning
ADGANet [45] adopted the GAN backbone which is similar with                               for visual adaptation, IEEE Trans. Image Process. 25 (3) (2016) 1177–1191.


<!-- PK PAGE 11 doc=math_p3 -->
S. Wang, L. Zhang and J. Fu / Knowledge-Based Systems 204 (2020) 106258                                               11
 [6] S. Wang, L. Zhang, W. Zuo, B. Zhang, Class-specific reconstruction transfer       [31] M. Long, H. Zhu, J. Wang, M.I. Jordan, Deep transfer learning with joint
     learning for visual recognition across domains, IEEE Trans. Image Process.             adaptation networks, in: ICML, 2016.
     29 (2019) 2424–2438.                                                              [32] J. Hu, J. Lu, Y.-P. Tan, Deep transfer metric learning, in: ICCV, 2015, pp.
 [7] F. Liu, G. Zhang, J. Lu, Heterogeneous domain adaptation: An unsupervised              325–333.
     approach, IEEE Trans. Neural Netw. Learn. Syst. (2020).                           [33] Y. Yang, Q.M.J. Wu, Y. Wang, Autoencoder with invertible functions for
 [8] H. Zuo, G. Zhang, W. Pedrycz, V. Behbood, J. Lu, Fuzzy regression transfer             dimension reduction and image reconstruction, IEEE Trans. Syst. Man
     learning in takagi-sugeno fuzzy models, IEEE Trans. Fuzzy Syst. (2016) 1.              Cybern. A 48 (7) (2016) 1065–1079.
 [9] T. Kim, M. Cha, H. Kim, J.K. Lee, J. Kim, Learning to discover cross-domain       [34] L. Wen, L. Gao, X. Li, A new deep transfer learning based on sparse auto-
     relations with generative adversarial networks, in: ICML, 2017.                        encoder for fault diagnosis, IEEE Trans. Syst. Man Cybern. A 49 (1) (2018)
[10] I.J. Goodfellow, J. Pouget-Abadie, M. Mirza, B. Xu, D. Warde-Farley, S. Ozair,         136–144.
     A. Courville, Y. Bengio, Generative adversarial nets, in: NIPS, 2014, pp.         [35] C. Chen, Z. Liu, Broad learning system: An effective and efficient incremen-
     2672–2680.                                                                             tal learning system without the need for deep architecture, IEEE Trans.
[11] Y. Ganin, E. Ustinova, H. Ajakan, P. Germain, H. Larochelle, F. Laviolette, M.         Neural Netw. Learn. Syst. 29 (1) (2018) 10–24.
     Marchand, V. Lempitsky, Domain-adversarial training of neural networks,           [36] J.Y. Zhu, T. Park, P. Isola, A.A. Efros, Unpaired image-to-image translation
     J. Mach. Learn. Res. (2015).                                                           using cycle-consistent adversarial networks, in: ICCV, 2017.
[12] E. Tzeng, J. Hoffman, K. Saenko, T. Darrell, Adversarial discriminative           [37] Z. Yi, H. Zhang, P. Tan, M. Gong, DualGAN: Unsupervised dual learning for
     domain adaptation, in: CVPR, 2017.                                                     image-to-image translation, in: ICCV, 2017, pp. 2868–2876.
[13] T. Salimans, I. Goodfellow, W. Zaremba, V. Cheung, A. Radford, X. Chen,           [38] K. Bousmalis, N. Silberman, D. Dohan, D. Erhan, D. Krishnan, Unsupervised
     X. Chen, Improved techniques for training GANs, in: NIPS, 2016, pp.                    pixel-level domain adaptation with generative adversarial networks, in:
     2234–2242.                                                                             CVPR, 2017.
[14] M. Mirza, S. Osindero, Conditional generative adversarial nets, Comput. Sci.      [39] J. Hoffman, E. Tzeng, T. Park, J.-Y. Zhu, P. Isola, K. Saenko, A. A. Efros,
     (2014) 2672–2680.                                                                      T. Darrell, CYCADA: Cycle-consistent adversarial domain adaptation, 2017,
[15] L. Duan, I.W. Tsang, D. Xu, Domain transfer multiple kernel learning, IEEE             arXiv.
     Trans. Pattern Anal. Mach. Intell. 34 (3) (2012) 465–479.                         [40] J. Hoffman, D. Wang, F. Yu, T. Darrell, FCNs in the wild: Pixel-level
[16] J. Hoffman, E. Rodner, J. Donahue, B. Kulis, K. Saenko, Asymmetric and                 adversarial and constraint-based adaptation, 2016, arXiv.
     category invariant feature transformations for domain adaptation, Int. J.         [41] B. Gong, Y. Shi, F. Sha, K. Grauman, Geodesic flow kernel for unsupervised
     Comput. Vis. 109 (1–2) (2014) 28–41.                                                   domain adaptation, in: CVPR, 2012, pp. 2066–2073.
[17] M. Long, G. Ding, J. Wang, J. Sun, Y. Guo, P.S. Yu, Transfer sparse coding        [42] B. Fernando, A. Habrard, M. Sebban, T. Tuytelaars, Unsupervised vi-
     for robust image representation, in: ICCV, 2013, pp. 407–414.                          sual domain adaptation using subspace alignment, in: ICCV, 2014, pp.
[18] A. Iyer, J. Nath, S. Sarawagi, Maximum mean discrepancy for class ratio                2960–2967.
     estimation: Convergence bounds and kernel selection, in: ICML, 2014, pp.          [43] S.F. Chang, D.T. Lee, D. Liu, I. Jhuo, Robust visual domain adaptation with
     530–538.                                                                               low-rank reconstruction, in: CVPR, 2013, pp. 2168–2175.
[19] M. Long, J. Wang, G. Ding, J. Sun, P.S. Yu, Transfer joint matching for           [44] Y. Xu, X. Fang, J. Wu, X. Li, D. Zhang, Discriminative transfer subspace
     unsupervised domain adaptation, in: CVPR, 2014, pp. 1410–1417.                         learning via low-rank and sparse representation, IEEE Trans. Image Process.
[20] L. Zhang, S. Wang, G.-B. Huang, W. Zuo, J. Yang, D. Zhang, Manifold                    25 (2) (2015) 850–863.
     criterion guided transfer learning via intermediate domain generation, IEEE       [45] S. Sankaranarayanan, Y. Balaji, C.D. Castillo, R. Chellappa, Generate to
     Trans. Neural Netw. Learn. Syst. 30 (12) (2019) 3759–3773.                             adapt: Aligning domains using generative adversarial networks, in: CVPR,
[21] X. Yang, M. Wang, D. Tao, Person re-identification with metric learning                2018.
     using privileged information, IEEE Trans. Image Process. 27 (2) (2017)            [46] E. Tzeng, J. Hoffman, N. Zhang, K. Saenko, T. Darrell, Deep domain
     791–805.                                                                               confusion: Maximizing for domain invariance, 2014, arXiv.
[22] I.-H. Jhuo, D. Liu, D. Lee, S.-F. Chang, Robust visual domain adaptation with     [47] M. Long, H. Zhu, J. Wang, M.I. Jordan, Deep transfer learning with joint
     low-rank reconstruction, in: CVPR, 2012, pp. 2168–2175.                                adaptation networks, in: ICML, 2017, pp. 2208–2217.
[23] M. Shao, D. Kit, Y. Fu, Generalized transfer subspace learning through            [48] M.Y. Liu, O. Tuzel, Coupled generative adversarial networks, 2016.
     low-rank constraint, Int. J. Comput. Vis. 109 (1–2) (2014) 74–93.                 [49] L. Duan, D. Xu, I. Tsang, Learning with augmented features for
[24] E. Tzeng, J. Hoffman, T. Darrell, K. Saenko, Simultaneous deep transfer                heterogeneous domain adaptation, 2012, arXiv.
     across domains and tasks, in: ICCV, 2015, pp. 4068–4076.                          [50] R. Gopalan, R. Li, R. Chellappa, Domain adaptation for object recognition:
[25] M. Oquab, L. Bottou, I. Laptev, J. Sivic, Learning and transferring mid-               An unsupervised approach, in: ICCV, 2011, pp. 999–1006.
     level image representations using convolutional neural networks, in: CVPR,        [51] K. Saenko, B. Kulis, M. Fritz, T. Darrell, Adapting visual category models to
     2014, pp. 1717–1724.                                                                   new domains, in: ECCV, 2010, pp. 213–226.
[26] H. Fan, L. Zheng, C. Yan, Y. Yang, Unsupervised person re-identification:         [52] R. Gopalan, R. Li, R. Chellappa, Unsupervised adaptation across domain
     Clustering and fine-tuning, ACM Trans. Multimedia Comput. Commun.                      shifts by generating intermediate data representations, IEEE Trans. Pattern
     Appl. 14 (4) (2018) 1–18.                                                              Anal. Mach. Intell. 36 (11) (2014) 2288–2302.
[27] J. Donahue, Y. Jia, O. Vinyals, J. Hoffman, N. Zhang, E. Tzeng, T. Darrell, De-   [53] J. Zheng, M.Y. Liu, R. Chellappa, P.J. Phillips, A Grassmann manifold-based
     caf: A deep convolutional activation feature for generic visual recognition,           domain adaptation approach, in: Pattern Recognition (ICPR), 2012 21st
     in: ICML, 2014, pp. 647–655.                                                           International Conference on, 2012.
[28] A. Sharif Razavian, H. Azizpour, J. Sullivan, S. Carlsson, CNN features off-      [54] C. Rate, C. Retrieval, Columbia object image library (COIL-20), Computer
     the-shelf: an astounding baseline for recognition, in: CVPR, 2014, pp.                 (2011).
     806–813.                                                                          [55] W. Wang, H. Wang, C. Zhang, Y. Gao, Fredholm multiple kernel learning
[29] M. Long, Y. Cao, J. Wang, M. Jordan, Learning transferable features with               for semi-supervised domain adaptation, in: AAAI, 2017.
     deep adaptation networks, in: ICML, 2015, pp. 97–105.                             [56] J. Huang, A.J. Smola, A. Gretton, K.M. Borgwardt, B. Scholkopf, Correcting
[30] M. Long, H. Zhu, J. Wang, M.I. Jordan, Unsupervised domain adaptation                  sample selection bias by unlabeled data, in: NIPS, 2006, pp. 601–608.
     with residual transfer networks, in: NIPS, 2016, pp. 136–144.                     [57] S.J. Pan, I.W. Tsang, J.T. Kwok, Q. Yang, Domain adaptation via transfer
                                                                                            component analysis, IEEE Trans. Neural Netw. 22 (2) (2011) 199–210.
<!-- PK END doc=math_p3 -->
