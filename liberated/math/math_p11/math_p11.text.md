PKvNext Document

KEY: math_p11 | math |  | 13714ea0 | 20 | /papers/DeepVisualDomainAdaptationASurvey.pdf
<!-- PK START doc=math_p11 -->


<!-- PK PAGE 1 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                           1
                                                    Deep Visual Domain Adaptation: A Survey
                                                                                        Mei Wang, Weihong Deng
                                                                         School of Information and Communication Engineering,
                                                                   Beijing University of Posts and Telecommunications, Beijing, China.
                                                                                    wm0245@126.com, whdeng@bupt.edu.cn
                                            Abstract—Deep domain adaptation has emerged as a new              class, a common shared space is generally learned in which
                                         learning technique to address the lack of massive amounts of         the distributions of the two datasets are matched.
                                         labeled data. Compared to conventional methods, which learn             Recently, neural-network-based deep learning approaches
arXiv:1802.03601v4 [cs.CV] 25 May 2018
                                         shared feature subspaces or reuse important source instances
                                         with shallow representations, deep domain adaptation methods         have achieved many inspiring results in visual categorization
                                         leverage deep networks to learn more transferable represen-          applications, such as image classification [62], face recognition
                                         tations by embedding domain adaptation in the pipeline of            [112], and object detection [35]. Simulating the perception
                                         deep learning. There have been comprehensive surveys for             of the human brain, deep networks can represent high-level
                                         shallow domain adaptation, but few timely reviews the emerging       abstractions by multiple layers of non-linear transformations.
                                         deep learning based methods. In this paper, we provide a
                                         comprehensive survey of deep domain adaptation methods for           Existing deep network architectures [71] include convolutional
                                         computer vision applications with four major contributions. First,   neural networks (CNNs) [62], [106], [110], [44], deep belief
                                         we present a taxonomy of different deep domain adaptation            networks (DBNs) [46], and stacked autoencoders (SAEs)
                                         scenarios according to the properties of data that define how        [122], among others. Although some studies have shown that
                                         two domains are diverged. Second, we summarize deep domain           deep networks can learn more transferable representations that
                                         adaptation approaches into several categories based on training
                                         loss, and analyze and compare briefly the state-of-the-art methods   disentangle the exploratory factors of variations underlying the
                                         under these categories. Third, we overview the computer vision       data samples and group features hierarchically in accordance
                                         applications that go beyond image classification, such as face       with their relatedness to invariant factors, Donahue et al.
                                         recognition, semantic segmentation and object detection. Fourth,     [22] showed that a domain shift still affects their perfor-
                                         some potential deficiencies of current methods and several future    mance. The deep features would eventually transition from
                                         directions are highlighted.
                                                                                                              general to specific, and the transferability of the representation
                                                                                                              sharply decreases in higher layers. Therefore, recent work has
                                                              I. INTRODUCTION                                 addressed this problem by deep DA, which combines deep
                                            Over the past few years, machine learning has achieved            learning and DA.
                                         great success and has benefited real-world applications. How-           There have been other surveys on TL and DA over the
                                         ever, collecting and annotating datasets for every new task          past few years [83], [101], [20], [84], [137], [19]. Pan et
                                         and domain are extremely expensive and time-consuming                al. [83] categorized TL under three subsettings, including
                                         processes, sufficient training data may not always be available.     inductive TL, transductive TL, and unsupervised TL, but they
                                         Fortunately, the big data era makes a large amount of data           only studied homogeneous feature spaces. Shao et al. [101]
                                         available for other domains and tasks. For instance, although        categorized TL techniques into feature-representation-level
                                         large-scale labeled video databases that are publicly available      knowledge transfer and classifier-level knowledge transfer.
                                         only contain a small number of samples, statistically, the           The survey written by Patel [84] only focused on DA, a
                                         YouTube face dataset (YTF) consists of 3.4K videos. The              subtopic of TL. [20] discussed 38 methods for heterogeneous
                                         number of labeled still images is more than sufficient [107].        TL that operate under various settings, requirements, and
                                         Hence, skillfully using the auxiliary data for the current task      domains. Zhang et al. [137] were the first to summarize several
                                         with scarce data will be helpful for real-world applications.        transferring criteria in detail from the concept level. These
                                            However, due to many factors (e.g., illumination, pose,           five surveys mentioned above only cover the methodologies
                                         and image quality), there is always a distribution change            on shallow TL or DA. The work presented by Csurka et al.
                                         or domain shift between two domains that can degrade the             [19] briefly analyzed the state-of-the-art shallow DA methods
                                         performance, as shown in Fig. 1. Mimicking the human vision          and categorized the deep DA methods into three subsettings
                                         system, domain adaptation (DA) is a particular case of transfer      based on training loss: classification loss, discrepancy loss and
                                         learning (TL) that utilizes labeled data in one or more relevant     adversarial loss. However, Csurka’s work mainly focused on
                                         source domains to execute new tasks in a target domain. Over         shallow methods, and it only discussed deep DA in image
                                         the past decades, various shallow DA methods have been               classification applications.
                                         proposed to solve a domain shift between the source and target          In this paper, we focus on analyzing and discussing deep
                                         domains. The common algorithms for shallow DA can mainly             DA methods. Specifically, the key contributions of this survey
                                         be categorized into two classes: instance-based DA [6], [18]         are as follows: 1) we present a taxonomy of different deep
                                         and feature-based DA [37], [82], [30], [81]. The first class         DA scenarios according to the properties of data that define
                                         reduces the discrepancy by reweighting the source samples,           how two domains are diverged. 2) extending Csurka’s work,
                                         and it trains on the weighted source samples. For the second         we improve and detail the three subsettings (training with


<!-- PK PAGE 2 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                     2
                         Amazon                        DSLR                           Webcam                   Caltech-256
                                                                      (a)
                             MNIST                                   USPS                                      SVHN
                                                                      (b)
                              LFW                                     BCS                                          CUFS
                                                                       (c)
Fig. 1. (a) Some object images from the ”Bike” and ”Laptop” categories in Amazon, DSLR, Webcam, and Caltech-256 databases. (b) Some digit images
from MNIST, USPS, and SVHN databases. (c) Some face images from LFW, BCS and CUFS databases. Realworld computer vision applications, such as
face recognition, must learn to adapt to distributions specific to each domain.
classification loss, discrepancy loss and adversarial loss) and              {X t , P (X)t }. We see that the partially labeled part, Dtl ,
summarize different approaches used in different DA scenes.                  and the unlabeled parts, Dtu , form the entire target domain,
$$
3) Considering the distance of the source and target domains,                that is, Dt = Dtl ∪ Dtu . Each domain is together with its
$$
$$
multi-step DA methods are studied and categorized into hand-                 task: the former is T s = {Y s , P (Y s |X s )}, and the latter is
$$
$$
crafted, feature-based and representation-based mechanisms.                  T t = {Y t , P (Y t |X t )}. Similarly, P (Y s |X s ) can be learned
$$
4) We provide a survey of many computer vision applications,                 from the source labeled data {xsi , yis }, while P (Y t |X t ) can
such as image classification, face recognition, style transla-               be learned from labeled target data {xtl          tl
                                                                                                                          i , yi } and unlabeled
                                                                                      tu
tion, object detection, semantic segmentation and person re-                 data {xi }.
identification.
   The remainder of this survey is structured as follows.                    B. Different Settings of Domain Adaptation
$$
In Section II, we first define some notations, and then we                      The case of traditional machine learning is Ds = Dt
$$
$$
categorize deep DA into different settings (given in Fig. 2). In             and T s = T t . For TL, Pan et al. [83] summarized that
$$
the next three sections, different approaches are discussed for              the differences between different datasets can be caused by
$$
each setting, which are given in Table I and Table II in detail.             domain divergence Ds 6= Dt (i.e., distribution shift or feature
$$
$$
Then, in Section VI, we introduce some successful computer                   space difference) or task divergence T s 6= T t (i.e., conditional
$$
vision applications of deep DA. Finally, the conclusion of this              distribution shift or label space difference), or both. Based
paper and discussion of future works are presented in Section                on this summary, Pan et al. categorized TL into three main
VII.                                                                         groups: inductive, transductive and unsupervised TL.
                                                                                According to this classification, DA methods are transduc-
                          II. OVERVIEW                                       tive TL solutions with the assumption that the tasks are the
$$
                                                                             same, i.e., T s = T t , and the differences are only caused
$$
$$
A. Notations and Definitions                                                 by domain divergence, Ds 6= Dt . Therefore, DA can be
$$
   In this section, we introduce some notations and definitions              split into two main categories based on different domain
that are used in this survey. The notations and definitions                  divergences (distribution shift or feature space difference):
match those from the survey papers by [83], [19] to maintain                 homogeneous and heterogeneous DA. Then, we can further
consistency across surveys. A domain D consists of a fea-                    categorize DA into supervised, semi-supervised and unsuperture space X and a marginal probability distribution P (X),                  vised DA in consideration of labeled data of the target domain.
$$
where X = {x1 , ..., xn } ∈ X . Given a specific domain                      The classification is given in Fig. 2.
$$
$$
D = {X , P (X)}, a task T consists of a feature space Y                         • In the homogeneous DA setting, the feature spaces
$$
and an objective predictive function f (·), which can also be                      between the source and target domains are identical
$$
viewed as a conditional probability distribution P (Y |X) from                     (X s = X t ) with the same dimension (ds = dt ). Hence,
$$
a probabilistic perspective. In general, we can learn P (Y |X)                     the source and target datasets are generally different in
$$
in a supervised manner from the labeled data {xi , yi }, where                     terms of data distributions (P (X)s 6= P (X)t ).
$$
$$
xi ∈ X and yi ∈ Y.                                                              In addition, we can further categorize the homogeneous DA
$$
   Assume that we have two domains: the training dataset                     setting into three cases:
$$
with sufficient labeled data is the source domain Ds =                          1) In the supervised DA, a small amount of labeled target
$$
{X s , P (X)s }, and the test dataset with a small amount of                        data, Dtl , are present. However, the labeled data are
$$
labeled data or no labeled data is the target domain Dt =                           commonly not sufficient for tasks.
$$


<!-- PK PAGE 3 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                                                 3
                                                                                                                         Labeled data are available in
                                                                                                                               target domain               Supervised
                                                                                                                         Labeled+unlabeled data are
                                                                                                        Homogeneous       available in target domain     Semi-Supervised
                                                                      Feature Space is same between
                                                                        source and target domain
                                                                                                                          No labeled data in target
                                                                                                                                  domain
                                                                                                                                                          Unsupervised
                                             One-step
                                          Domain adaptation
                                                                                                                         Labeled data are available in
                                                                        Feature Space is different                             target domain
                                                                                                                                                           Supervised
                                                                        between source and target
                     Domain                                                      domain
                                         Select Intermediate Domain
                    adaptation                                                                         Heterogeneous     Labeled+unlabeled data are
                                                                                                                                                         Semi-Supervised
                                                                                                                          available in target domain
                                             Multi-step                                                                   No labeled data in target
                                                                                                                                  domain
                                                                                                                                                          Unsupervised
                                          Domain adaptation
Fig. 2. An overview of different settings of domain adaptation
   2) In the semi-supervised DA, both limited labeled data,                                           to realize DA. This approach reliably outperforms current
       Dtl , and redundant unlabeled data, Dtu , in the target                                        state-of-the-art approaches based on traditional hand-crafted
       domain are available in the training stage, which allows                                       features because sufficient representational and transferable
       the networks to learn the structure information of the                                         features can be extracted through deep networks, which can
       target domain.                                                                                 work better on discrimination tasks [22].
   3) In the unsupervised DA, no labeled but sufficient un-                                              In a narrow sense, deep DA is based on deep learning
       labeled target domain data, Dtu , are observable when                                          architectures designed for DA and can obtain a firsthand effect
       training the network.                                                                          from deep networks via back-propagation. The intuitive idea
   • In the heterogeneous DA setting, the feature spaces                                              is to embed DA into the process of learning representation and
      between the source and target domains are nonequivalent                                         to learn a deep feature representation that is both semantically
$$
      (X s 6= X t ), and the dimensions may also generally differ                                     meaningful and domain invariant. With the ”good” feature
$$
$$
      (ds 6= dt ).                                                                                    representations, the performance of the target task would
$$
   Similar to the homogeneous setting, the heterogeneous DA                                           improve significantly. In this paper, we focus on the narrow
setting can also be divided into supervised, semi-supervised                                          definition and discuss how to utilize deep networks to learn
and unsupervised DA.                                                                                  ”good” feature representations with extra training criteria.
   All of the above DA settings assumed that the source
and target domains are directly related; thus, transferring                                           A. Categorization of One-Step Domain Adaptation
knowledge can be accomplished in one step. We call them one-                                             In one-step DA, the deep approaches can be summarized
step DA. In reality, however, this assumption is occasionally                                         into three cases, which refers to [19]. Table 1 shows these three
unavailable. There is little overlap between the two domains,                                         cases and brief descriptions. The first case is the discrepancyand performing one-step DA will not be effective. Fortunately,                                        based deep DA approach, which assumes that fine-tuning the
there are some intermediate domains that are able to draw the                                         deep network model with labeled or unlabeled target data can
source and target domains closer than their original distance.                                        diminish the shift between the two domains. Class criterion,
Thus, we use a series of intermediate bridges to connect                                              statistic criterion, architecture criterion and geometric criterion
two seemingly unrelated domains and then perform one-                                                 are four major techniques for performing fine-tuning.
step DA via this bridge, named multi-step (or transitive) DA                                             • Class Criterion: uses the class label information as
[113], [114]. For example, face images and vehicle images                                                   a guide for transferring knowledge between different
are dissimilar between each other due to different shapes or                                                domains. When the labeled samples from the target
other aspects, and thus, one-step DA would fail. However,                                                   domain are available in supervised DA, soft label and
some intermediate images, such as ’football helmet’, can be                                                 metric learning are always effective [118], [86], [53],
introduced to be an intermediate domain and have a smooth                                                   [45], [79]. When such samples are unavailable, some
knowledge transfer. Fig. 3 shows the differences between the                                                other techniques can be adopted to substitute for class
learning processes of one-step and multi-step DA techniques.                                                labeled data, such as pseudo labels [75], [139], [130],
                                                                                                            [98] and attribute representation [29], [118].
                                                                                                         • Statistic Criterion: aligns the statistical distribution shift
     III. A PPROACHES OF D EEP D OMAIN A DAPTATION                                                          between the source and target domains using some mech-
   In a broad sense, deep DA is a method that utilizes a                                                    anisms. The most commonly used methods for compardeep network to enhance the performance of DA. Under this                                                   ing and reducing distribution shift are maximum mean
definition, shallow methods with deep features [22], [49], [88],                                            discrepancy (MMD) [74], [130], [73], [75], [120], [32],
[80], [138] can be considered as a deep DA approach. DA                                                     correlation alignment (CORAL) [109], [87], Kullbackis adopted by shallow methods, whereas deep networks only                                                   Leibler (KL) divergence [144] and H divergence, among
extract vectorial features and are not helpful for transferring                                             others.
knowledge directly. For example, [76] extracted the convolu-                                             • Architecture Criterion: aims at improving the ability
tional activations from a CNN as the tensor representation,                                                 of learning more transferable features by adjusting the
and then performed tensor-aligned invariant subspace learning                                               architectures of deep networks. The techniques that are


<!-- PK PAGE 4 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                                                          4
                               Traditional Machine Learning                       One-step Domain Adaptation                          Multi-step Domain Adaptation
                                     Different Domain                           Source Domain               Target Domain     Source Domain       intermediate    Target Domain
                                                                                                                                           One-Step
                   Learning System   Learning System    Learning System          Knowledge                  Learning System    Knowledge              Knowledge   Learning System
                                          (a)                                                   (b)                                                      (c)
Fig. 3. Different learning processes between (a) traditional machine learning, (b) one-step domain adaptation and (c) multi-step domain adaptation [83].
                                                                                      TABLE I
                                                                  D IFFERENT D EEP A PPROACHES TO O NE -S TEP DA
              One-step DA
                                                                 Brief Description                                                            Subsettings
              Approaches
                                                                                                                            class criterion [118], [86], [79], [98]
                                                                                                                       [53], [45], [75], [139], [130], [29], [118], [28]
                                            fine-tuning the deep network with labeled or                                      statistic criterion [74], [130], [73]
           Discrepancy-based                                                                                                 [75], [120], [32], [109], [87], [144]
                                          unlabeled target data to diminish the domain shift
                                                                                                                   architecture criterion [69], [54], [68], [95], [128], [89]
                                                                                                                                    geometric criterion [16]
                                          using domain discriminators to encourage domain                                      generative models [70], [4], [57]
            Adversarial-based                                                                                       non-generative models [119], [118], [26], [25], [117]
                                              confusion through an adversarial objective
                                                                                                                                                [85]
             Reconstruction-            using the data reconstruction as an auxiliary task to                       encoder-decoder reconstruction [5], [33], [31], [144]
                 based                                ensure feature invariance                                          adversarial reconstruction [131], [143], [59]
                                                                                     TABLE II
                                                                 D IFFERENT D EEP A PPROACHES TO M ULTI -S TEP DA
                      Multi-step Approaches                   Brief Description
                      Hand-crafted                            users determine the intermediate domains based on experience [129]
                                                              selecting certain parts of data from the auxiliary datasets to compose the intermediate
                      Instance-based
                                                              domains [114], [16]
                                                              freeze weights of one network and use their intermediate representations as input
                      Representation-based
                                                              to the new network [96]
       proven to be cost effective include adaptive batch normal-                                       •    Non-Generative Models: rather than generating models
       ization (BN) [69], [54], [68], weak-related weight [95],                                              with input image distributions, the feature extractor learns
       domain-guided dropout [128], and so forth.                                                            a discriminative representation using the labels in the
   •   Geometric Criterion: bridges the source and target                                                    source domain and maps the target data to the same space
       domains according to their geometrical properties. This                                               through a domain-confusion loss, thus resulting in the
       criterion assumes that the relationship of geometric struc-                                           domain-invariant representations [119], [118], [26], [25],
       tures can reduce the domain shift [16].                                                               [117].
                                                                                                         The third case can be referred to as a reconstruction-based
   The second case can be referred to as an adversarial-based
                                                                                                      DA approach, which assumes that the data reconstruction of
deep DA approach [26]. In this case, a domain discriminator
                                                                                                      the source or target samples can be helpful for improving the
that classifies whether a data point is drawn from the source
                                                                                                      performance of DA. The reconstructor can ensure both specior target domain is used to encourage domain confusion
                                                                                                      ficity of intra-domain representations and indistinguishability
through an adversarial objective to minimize the distance
                                                                                                      of inter-domain representations.
between the empirical source and target mapping distributions.
Furthermore, the adversarial-based deep DA approach can                                                 • Encoder-Decoder Reconstruction: by using stacked aube categorized into two cases based on whether there are                                                  toencoders (SAEs), encoder-decoder reconstruction methgenerative models.                                                                                        ods combine the encoder network for representation
                                                                                                          learning with a decoder network for data reconstruction
   •   Generative Models: combine the discriminative model                                                [5], [33], [31], [144].
       with a generative component in general based on gen-
                                                                                                        • Adversarial Reconstruction: the reconstruction error is
       erative adversarial networks (GANs). One of the typical
       cases is to use source images, noise vectors or both to                                            measured as the difference between the reconstructed and
       generate simulated samples that are similar to the target                                          original images within each image domain by a cyclic
       samples and preserve the annotation information of the                                             mapping obtained via a GAN discriminator, such as dual
       source domain [70], [4], [57].                                                                     GAN [131], cycle GAN [143] and disco GAN [59].


<!-- PK PAGE 5 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                        5
                                                               TABLE III
                                D IFFERENT A PPROACHES USED IN D IFFERENT D OMAIN A DAPTATION S ETTINGS
                                                                              Supervised
$$
                                                                                    √ DA         Unsupervised DA
$$
$$
                                                    Class Criterion                                       √
$$
$$
                                                   Statistic Criterion              √                     √
$$
                          Discrepancy-based
$$
                                                 Architecture Criterion             √
$$
$$
                                                  Geometric Criterion                                     √
$$
$$
                                                   Generative Model                                       √
$$
                          Adversarial-based
$$
                                                 Non-Generative Model                                     √
$$
$$
                                                Encoder-Decoder Model                                     √
$$
                        Reconstruction-based
                                                  Adversarial Model
B. Categorization of Multi-Step Domain Adaptation                     specificity and that fine-tuning can enhance generalization per-
   In multi-step DA, we first determine the intermediate do-          formance. Fine-tuning (can also be viewed as a discrepancymains that are more related with the source and target domains        based deep DA approach) is to train a base network with
than their direct connection. Second, the knowledge transfer          source data and then directly reuse the first n layers to
process will be performed between the source, intermediate            conduct a target network. The remaining layers of the target
and target domains by one-step DA with less information               network are randomly initialized and trained with loss based
loss. Thus, the key of multi-step DA is how to select and             on discrepancy. During training, the first n layers of the target
utilize intermediate domains; additionally, it can fall into three    network can be fine-tuned or frozen depending on the size
categories referring to [83]: hand-crafted, feature-based and         of the target dataset and its similarity to the source dataset
representation-based selection mechanisms.                            [17]. Some common rules of thumb for navigating the 4 major
                                                                      scenarios are given in Table IV.
   • Hand-Crafted: users determine the intermediate do-
      mains based on experience [129].
   • Instance-Based: selecting certain parts of data from the
      auxiliary datasets to compose the intermediate domains
      to train the deep network [114], [16].
   • Representation-Based: transfer is enabled via freezing
      the previously trained network and using their intermedi-
      ate representations as input to the new one [96].
        IV. ONE-STEP DOMAIN ADAPTATION
   As mentioned in Section II-A, the data in the target domain
have three types regardless of homogeneous or heterogeneous
DA: 1) supervised DA with labeled data, 2) semi-supervised            Fig. 4. The average accuracy over the validation set for a network trained
                                                                      with different strategies. Baseline B: the network is trained on dataset B. 2)
DA with labeled and unlabeled data and 3) non-supervised              BnB: the first n layers are reused from baseline B and frozen. The higher
DA with unlabeled data. The second setting is able to be              layers are trained on dataset B. 3) BnB+: the same as BnB but where all
accomplished by combining the methods of setting 1 and                layers are fine-tuned. 4) AnB: the first n layers are reused from the network
                                                                      trained on dataset A and frozen. The higher layers are trained on dataset B.
setting 3; thus, we only focus on the first and third settings        5) AnB+: the same as AnB but where all layers are fine-tuned [133].
in this paper. The cases where the different approaches are
mainly used for each DA setting are shown in Table III. As                • Class Criterion
shown, more work is focused on unsupervised scenes because
                                                                         The class criterion is the most basic training loss in deep
supervised DA has its limitations. When only few labeled
                                                                      DA. After pre-training the network with source data, the
data in the target domain are available, using the source and
                                                                      remaining layers of the target model use the class label
target labeled data to train parameters of models typically
                                                                      information as a guide to train the network. Hence, a small
results in overfitting to the source distribution. In addition, the
                                                                      number of labeled samples from the target dataset is assumed
discrepancy-based approaches have been studied for years and
                                                                      to be available.
produced more methods in many research works, whereas the
                                                                         Ideally, the class label information is given directly in
adversarial-based and reconstruction-based approaches are a
                                                                      supervised DA. Most work commonly uses the negative logrelatively new research topic but have recently been attracting
                                                                      likelihood of the groundPtruth class with softmax as their
more attention.                                                                                   N
$$
                                                                      training loss, L = − i=0 yi log ŷi (ŷi are the softmax
$$
                                                                      predictions of the model, which represent class probabilities)
A. Homogeneous Domain Adaptation                                      [118], [86], [53], [126]. To extend this, Hinton et al. [45]
  1) Discrepancy-Based Approaches: Yosinski et al.[133]               modified the softmax function to soft label loss:
proved that transferable features learned by deep networks                                               exp(zi /T )
$$
                                                                                              qi = P                                            (1)
$$
have limitations due to fragile co-adaptation and representation                                        j (exp(zj /T ))


<!-- PK PAGE 6 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                    6
                                                              TABLE IV
                     S OME C OMMON RULES OF T HUMB FOR D ECIDING F INE - TUNED OR F ROZEN IN THE F IRST N L AYERS . [17]
                                                                         The Size of Target Dataset
                                                                     Low                Medium               High
                             The Distance          Low              Freeze         Try Freeze or Tune        Tune
                               between            Medium      Try Freeze or Tune          Tune               Tune
                           Source and Target       High       Try Freeze or Tune          Tune               Tune
where z i is the logit output computed for each class. T is a            their distribution difference:
temperature that is normally set to 1 in standard softmax, but it                                           (M )       (M )
$$
                                                                                  min J = Sc(M ) − αSb                        X s, X t
$$
                                                                                                                                         
takes a higher value to produce a softer probability distribution                                                  + βDts
over classes. By using it, much of the information about                                              M
                                                                                                      X                2             2       (2)
the learned function that resides in the ratios of very small                                    +γ         ( W (m)         + b(m)       )
                                                                                                                       F             2
$$
probabilities can be obtained. For example, when recognizing                                          m=1
$$
digits, one version of 2 may obtain a probability of 106 of
                                                                         where α, β and γ are regularization parameters and W (m)
being a 3 and 109 of being a 7; in other words, this version
                                                                         and b(m) are the weights and biases of the mth layer of the
of 2 looks more similar to 3 than 7. Inspired by Hinton,                              (M )
                                                                         network. Dts (X s , X t ) is the MMD between representations
[118] fine-tuned the network by simultaneously minimizing
                                                                         of the source and target domains. Sc and Sb define the intrathe domain confusion loss (belonging to adversarial-based
                                                                         class compactness and the interclass separability.
approaches, which will be presented in Section IV-A2) and soft
                                                                            However, what can we do if there is no class label informalabel loss. Using soft labels rather than hard labels can preserve
                                                                         tion in the target domain directly? As we all know, humans
the relationships between classes across domains. Gebru et al.
                                                                         can identify unseen classes given only a high-level descrip-
[29] modified existing adaptation algorithms based on [118]
                                                                         tion. For instance, when provided the description ”tall brown
and utilized soft label loss at the fine-grained class level Lcsof t
                                                                         animals with long necks”, we are able to recognize giraffes.
and attribute level Lasof t .
                                                                         To imitate the ability of humans, [64] introduced high-level
$$
                                                                         semantic attributes per class. Assume that ac = (ac1 , ..., acm )
$$
                                                                         is the attribute representation for class c, which has fixed-
                                                                         length binary values with m attributes in all the classes. The
                                                                         classifiers provide estimates of p(am |x) for each attribute am .
                                                                         In the test stage, each target class y obtains its attribute vector
$$
                                                                         ay in a deterministic way, i.e., p(a|y) = [[a = ay ]]. By applying
$$
                                                                                                   p(y)          y
$$
                                                                         Bayes rule, p(y|a) = p(a     y ) [[a = a ]], the posterior of a test
$$
                                                                         class can be calculated as follows:
                                                                                                                              M
                                                                                        X                            p(y) Y
$$
                                                                           p(y|x) =              p(y|a)p(a|x) =                 p(aym |x) (3)
$$
$$
                                                                                                                     p(ay ) m=1
$$
$$
                                                                                      a∈{0,1}M
$$
                                                                             Gebru et al. [29] drew inspiration from these works and
                                                                         leveraged attributes to improve performance in the DA of fine-
                                                                         grained recognition. There are multiple independent softmax
                                                                         losses that simultaneously perform attribute and class level
                                                                         to fine-tune the target model. To prevent the independent
                                                                         classifiers from obtaining conflicting labels with attribute and
Fig. 5. Deep DA by combining domain confusion loss and soft label loss
[118].                                                                   class level, an attribute consistency loss is also implemented.
                                                                             Occasionally, when fine-tuning the network in unsupervised
                                                                         DA, a label of target data, which is called a pseudo label,
                                                                         can preliminarily be obtained based on the maximum poste-
   In addition to softmax loss, there are other methods that             rior probability. Yan et al. [130] initialized the target model
can be used as training loss to fine-tune the target model in            using the source data and then defined the class posterior
$$
supervised DA. Embedding metric learning in deep networks                probability p(yjt = c|xtj ) by the output of the target model.
$$
is another method that can make the distance of samples from
$$
different domains with the same labels be closer while those             With p(yjt = c|xtj ), they assigned pseudo-label ybjt to xtj by
$$
$$
with different labels are far away. Based on this idea, [79]             ybjt = arg max p(yjt = c|xtj ). In [98], two different networks
$$
                                                                                       c
constructed the semantic alignment loss and the separation               assign pseudo-labels to unlabeled samples, another network is
loss accordingly. Deep transfer metric learning is proposed by           trained by the samples to obtain target discriminative repre-
[53], which applies the marginal Fisher analysis criterion and           sentations. The deep transfer network (DTN) [139] used some
MMD criterion (described in Statistic Criterion) to minimize             base classifiers, e.g., SVMs and MLPs, to obtain the pseudo


<!-- PK PAGE 7 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                            7
labels for the target samples to estimate the conditional distri-    of input features and output labels in multiple domain-specific
bution of the target samples and match both the marginal and         layers based on a joint maximum mean discrepancy (JMMD)
the conditional distributions with the MMD criterion. When           criterion. [139] proposed DTN, where both the marginal and
casting the classifier adaptation into the residual learning         the conditional distributions are matched based on MMD. The
framework, [75] used the pseudo label to build the conditional       shared feature extraction layer learns a subspace to match the
entropy E(Dt , f t ), which ensures that the target classifier f t   marginal distributions of the source and the target samples, and
fits the target-specific structures well.                            the discrimination layer matches the conditional distributions
   • Statistic Criterion                                             by classifier transduction. In addition to adapting features
   Although some discrepancy-based approaches search for             using MMD, residual transfer networks (RTNs) [75] added
pseudo labels, attribute labels or other substitutes to labeled      a gated residual layer for classifier adaptation. More recently,
target data, more work focuses on learning domain-invariant          [130] proposed a weighted MMD model that introduces an
representations via minimizing the domain distribution dis-          auxiliary weight for each class in the source domain when the
crepancy in unsupervised DA.                                         class weights in the target domain are not the same as those
                                                                     in the source domain.
   MMD is an effective metric for comparing the distributions
between two datasets by a kernel two-sample test [3]. Given             If φ is a characteristic kernel (i.e., Gaussian kernel or
two distributions s and t, the MMD is defined as follows:            Laplace kernel), MMD will compare all the orders of statistic
                                                                     moments. In contrast to MMD, CORAL [108] learned a linear
                                                              2
$$
 M M D2 (s, t) =     sup     Exs ∼s [φ(xs )] − Ext ∼s [φ(xt )] H     transformation that aligns the second-order statistics between
$$
$$
                   kφkH ≤1                                           domains. Sun et al. [109] extended CORAL to deep neural
$$
                                                          (4)
                                                                     networks (deep CORAL) with a nonlinear transformation.
where φ represents the kernel function that maps the original data to a reproducing kernel Hilbert space (RKHS) and                                           1            2
$$
kφkH ≤ 1 defines a set of functions in the unit ball of RKHS                          LCORAL =         kCS − CT kF                   (7)
$$
                                                                                                   4d2
H.
   Based on the above, Ghifary et al. [32] proposed a model          where k · k2F denotes the squared matrix Frobenius norm. CS
that introduced the MMD metric in feedforward neural net-            and CT denote the covariance matrices of the source and target
works with a single hidden layer. The MMD metric is                  data, respectively.
computed between representations of each domain to reduce               By the Taylor expansion of the Gaussian kernel, MMD can
the distribution mismatch in the latent space. The empirical         be viewed as minimizing the distance between the weighted
estimate of MMD is as follows:                                       sums of all raw moments [67]. The interpretation of MMD
                                                          2          as moment matching procedures motivated Zellinger et al.
                         M              N
                      1 X            1 X                             [134] to match the higher-order moments of the domain dis-
$$
  M M D2 (Ds , Dt ) =       φ(xsi )−       φ(xtj )            (5)    tributions, which we call central moment discrepancy (CMD).
$$
$$
                      M i=1          N j=1
$$
                                                          H          An empirical estimate of the CMD metric for the domain
   Subsequently, Tzeng et al. [120] and Long et al. [73]             discrepancy in the activation space [a, b]N is given by
extended MMD to a deep CNN model and achieved great
                                                                                                      1
$$
success. The deep domain confusion network (DDC) by Tzeng                   CM DK (X s , X t ) =           E(X s ) − E(X t ) 2
$$
et al. [120] used two CNNs for the source and target domains                                       (b − a)
                                                                                            K                                        (8)
with shared weights. The network is optimized for classifi-                                 X      1
cation loss in the source domain, while domain difference is                            +              k
                                                                                                           Ck (X s ) − Ck (X t ) 2
$$
                                                                                            k=2 |b − a|
$$
measured by an adaptation layer with the MMD metric.
                                                                                                           k
$$
              L=LC (X L , y) + λM M D2 (X s X t )             (6)    where Ck (X) = E((x − E(X)) is the vector P          of all k th -
$$
                                                                                                                       1
$$
                                                                     order sample central moments and E(X) = |X| x∈X x is
$$
where the hyperparameter λ is a penalty parameter.                   the empirical expectation.
LC (X L , y) denotes classification loss on the available labeled       The association loss Lassoc proposed by [42] is an alterdata, X L , and the ground-truth labels, y. M M D2 (X s X t )        native discrepancy measure, it enforces statistical associations
denotes the distance between the source and target data. DDC         between source and target data by making the two-step roundonly adapts one layer of the network, resulting in a reduction       trip probabilities Pijaba be similar to the uniform distribution
in the transferability of multiple layers. Rather than using         over the class labels.
a single layer and linear MMD, Long et al. [73] proposed
                                                                       •   Architecture Criterion
the deep adaptation network (DAN) that matches the shift
in marginal distributions across domains by adding multiple             Some other methods optimize the architecture of the netadaptation layers and exploring multiple kernels, assuming that      work to minimize the distribution discrepancy. This adaptation
the conditional distributions remain unchanged. However, this        behavior can be achieved in most deep DA models, such as
assumption is rather strong in practical applications; in other      supervised and unsupervised settings.
words, the source classifier cannot be directly used in the             Rozantsev et al. [95] considered that the weights in cortarget domain. To make it more generalized, a joint adaptation       responding layers are not shared but related by a weight
network (JAN) [74] aligns the shift in the joint distributions       regularizer rw (·) to account for the differences between the


<!-- PK PAGE 8 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                                              8
                                (a) The Deep Adaptation Network (DAN) architecture                                (b) The Joint Adaptation Network (JAN) architecture
                                                                    (c) The Residual Transfer Network (RTN) architecture
Fig. 6. Different approaches with the MMD metric. (a) The deep adaptation network (DAN) architecture [73], (b) the joint adaptation network (JAN)
architecture [74] and (c) the residual transfer network (RTN) architecture [75].
two domains. The weight regularizer rw (·) can be expressed                                     where λ and β are parameters learned from the target data and
as the exponential loss function:                                                               µ(x) and σ(x) are the mean and standard deviation computed
                                 
                                            2
                                                                                               independently for each feature channel. Based on [69], [9]
$$
            rw (θjs , θjt ) = exp θjs − θjt     −1      (9)                                     endowed BN layers with a set of alignment parameters which
$$
                                                                                                can be learned automatically and can decide the degree of
where θjs and θjt denote the parameters of the j th layer of the                                feature alignment required at different levels of the deep
source and target models, respectively. To further relax this                                   network. Furthermore, Ulyanov et al. [121] found that when
restriction, they allow the weights in one stream to undergo a                                  replacing BN layers with instance normalization (IN) layers,
linear transformation:                                                                          where µ(x) and σ(x) are computed independently for each
                                                                2                               channel and each sample, the performance of DA can be
$$
            rw (θjs , θjt ) = exp( aj θjs + bj − θjt                )−1              (10)
$$
                                                                                                further improved.
where aj and bj are scalar parameters that encode the linear                                       Occasionally, neurons are not effective for all domains
transformation. The work of Shu et al. [105] is similar to                                      because of the presence of domain biases. For example, when
[95] using weakly parameter-shared layers. The penalty term                                     recognizing people, the target domain typically contains one
Ω controls the relatedness of parameters.                                                       person centered with minimal background clutter, whereas the
                L                                                                               source dataset contains many people with more clutter. Thus,
                                          2                            2
                          (l)       (l)               (l)        (l)
                X
$$
           Ω=         ( WS − WT               + bS − bT                    )         (11)       the neurons that capture the features of other people and clutter
$$
                                          F                            F                        are useless. Domain-guided dropout was proposed by [128]
                i=1
             (l)   (l)                 (l)     (l)
                                                                                                to solve the problem of multi-DA, and it mutes non-related
where {WS , bS }L                      L
$$
                  l=1 and {WT , bT }l=1 are the parameters                                      neurons for each domain. Rather than assigning dropout with a
$$
        th
of the l layer in the source and target domains, respectively.                                  specific dropout rate, it depends on the gain of the loss function
                                                                                                of each neuron on the domain sample when the neuron is
                                                                                                removed.
$$
                                                                                                                  si = L(g(x)\i ) − L(g(x))                   (13)
$$
                                                                                                where L is the softmax loss function and g(x)\i is the
                                                                                                feature vector after setting the response of the ith neuron to
Fig. 7. The two-stream architecture with related weight [95].                                   zero. In [66], each source domain is assigned with different
$$
                                                                                                parameters, Θ(i) = Θ(0) + ∆(i) , where Θ(0) is a domain
$$
   Li et al. [69] hypothesized that the class-related knowledge                                 general model, and ∆(i) is a domain specific bias term. After
is stored in the weight matrix, whereas domain-related knowl-                                   the low rank parameterized CNNs are trained, Θ(0) can serve
edge is represented by the statistics of the batch normaliza-                                   as the classifier for target domain.
tion (BN) layer [56]. BN normalizes the mean and standard
                                                                                                   • Geometric Criterion
deviation for each individual feature channel such that each
layer receives data from a similar distribution, irrespective                                      The geometric criterion mitigates the domain shift by inof whether it comes from the source or the target domain.                                       tegrating intermediate subspaces on a geodesic path from
Therefore, Li et al. used BN to align the distribution for                                      the source to the target domains. A geodesic flow curve is
recomputing the mean and standard deviation in the target                                       constructed to connect the source and target domains on the
domain.                                                                                         Grassmannian. The source and target subspaces are points on
                                x − µ(X t )                                                     a Grassmann manifold. By sampling a fixed [40] or infinite
                                           
$$
                BN (X t ) = λ                 +β            (12)                                [38] number of subspaces along the geodesic, we can form the
$$
                                  σ(X t )


<!-- PK PAGE 9 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                      9
intermediate subspaces to help to find the correlations between                 labels, or something else. Then, synthetic data with labels are
domains. Then, both source and target data are projected to                     used to train the target model as if no DA were required.
the obtained intermediate subspaces to align the distribution.                  Adversarial-based approaches with generative models are able
   Inspired by the intermediate representations on the geodesic                 to learn such a transformation in an unsupervised manner
path, Chopra et al. [16] proposed a model called deep learning                  based on GAN.
for DA by interpolating between domains (DLID). DLID                               The core idea of CoGAN [70] is to generate synthetic target
generates intermediate datasets, starting with all the source                   data that are paired with synthetic source ones. It consists
data samples and gradually replacing source data with target                    of a pair of GANs: GAN1 for generating source data and
data. Each dataset is a single point on an interpolating path                   GAN2 for generating target data. The weights of the first few
between the source and target domains. Once intermediate                        layers in the generative models and the last few layers in the
datasets are generated, a deep nonlinear feature extractor                      discriminative models are tied. This weight-sharing constraint
using the predictive sparse decomposition is trained in an                      allows CoGAN to achieve a domain-invariant feature space
unsupervised manner.                                                            without correspondence supervision. A trained CoGAN can
   2) Adversarial-Based Approaches: Recently, great success                     adapt the input noise vector to paired images that are from the
has been achieved by the GAN method [39], which estimates                       two distributions and share the labels. Therefore, the shared
generative models via an adversarial process. GAN consists                      labels of synthetic target samples can be used to train the target
of two models: a generative model G that extracts the data                      model.
distribution and a discriminative model D that distinguishes
whether a sample is from G or training datasets by predicting
a binary label. The networks are trained on the label prediction
loss in a mini-max fashion: simultaneously optimizing G to
minimize the loss while also training D to maximize the
probability of assigning the correct label:
$$
           min max V (D, G) = Ex∼pdata (x) [log D(x)]                           Fig. 9. The CoGAN architecture. [70]
$$
             G    D                                                    (14)
                           +Ez∼pz (z) [log(1 − D(G(z)))]
                                                                                   More work focuses on generating synthetic data that are
   In DA, this principle has been employed to ensure that                       similar to the target data while maintaining annotations. Yoo
the network cannot distinguish between the source and target                    et al. [132] transferred knowledge from the source domain to
domains. [119] proposed a unified framework for adversarial-                    pixel-level target images with GANs. A domain discriminator
based approaches and summarized the existing approaches                         ensures the invariance of content to the source domain, and
according to whether to use a generator, which loss function                    a real/fake discriminator supervises the generator to produce
to employ, or whether to share weights across domains. In this                  similar images to the target domain. Shrivastava et al. [104] depaper, we only categorize the adversarial-based approaches                      veloped a method for simulated+unsupervised (S+U) learning
into two subsettings: generative models and non-generative                      that uses a combined objective of minimizing an adversarial
models.                                                                         loss and a self-regularization loss, where the goal is to improve
                                                                                the realism of synthetic images using unlabeled real data. In
                                                                                contrast to other works in which the generator is conditioned
                                                                                only on a noise vector or source images, Bousmalis et al. [4]
                                                                                proposed a model that exploits GANs conditioned on both.
                                                                                The classifier T is trained to predict class labels of both source
                                                                                and synthetic images, while the discriminator is trained to
                                                                                predict the domain labels of target and synthetic images. In
                                                                                addition, to expect synthetic images with similar foregrounds
                                                                                and different backgrounds from the same source images, a
                                                                                content similarity is used that penalizes large differences
                                                                                between source and synthetic images for foreground pixels
Fig. 8. Generalized architecture for adversarial domain adaptation. Existing    only by a masked pairwise mean squared error [24]. The
adversarial adaptation methods can be viewed as instantiations of a framework   goal of the network is to learn G, D and T by solving the
with different choices regarding their properties. [119]                        optimization problem:
$$
   •  Generative Models                                                                         min max V (D, G) = αLd (D, G)
$$
                                                                                                 G,T   D
                                                                                                                                             (15)
   Synthetic target data with ground-truth annotations are an                                              +βLt (T, G) + γLc (G)
appealing alternative to address the problem of a lack of
training data. First, with the help of source data, generators                  where α, β, and γ are parameters that control the trade-off
render unlimited quantities of synthetic target data, which are                 between the losses. Ld , Lt and Lc are the adversarial loss,
paired with synthetic source data to share labels or appear as if               softmax loss and content-similarity loss, respectively.
they were sampled from the target domain while maintaining                        • Non-Generative Models


<!-- PK PAGE 10 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                     10
$$
                                                                                min LadvD (X s ,X t , M s , M t ) =
$$
                                                                                 D
                                                                                                   − E(xs )∼(X s ) [log D(M s (xs ))]
                                                                                                   − E(xt )∼(X t ) [log(1 − D(M t (xt )))]
$$
                                                                                      min LadvM (M s , M t ) =
$$
                                                                                     M s ,M t
                                                                                                                                             (16)
                                                                                                     − E(xt )∼(X t ) [log D(M t (xt ))]
                                                                           where the mappings M s and M t are learned from the source
                                                                           and target data, X s and X t . C represents a classifier working
Fig. 10. The model that exploits GANs conditioned on noise vector and
source images. [4]                                                         on the source domain. The first classification loss function Lcls
                                                                           is optimized by training the source model using the labeled
                                                                           source data. The second function LadvD is minimized to train
   The key of deep DA is learning domain-invariant represen-               the discriminator, while the third function LadvM is learning
tations from source and target samples. With these representa-             a representation that is domain invariant.
tions, the distribution of both domains can be similar enough
such that the classifier is fooled and can be directly used in
the target domain even if it is trained on source samples.
Therefore, whether the representations are domain-confused
or not is crucial to transferring knowledge. Inspired by GAN,
domain confusion loss, which is produced by the discriminator,
is introduced to improve the performance of deep DA without                Fig. 12. The Adversarial discriminative domain adaptation (ADDA) archigenerators.                                                                tecture. [119]
                                                                              Tzeng et al. [118] proposed adding an additional domain
                                                                           classification layer that performs binary domain classification
                                                                           and designed a domain confusion loss to encourage its predic-
                                                                           tion to be as close as possible to a uniform distribution over
                                                                           binary labels. Unlike previous methods that match the entire
                                                                           source and target domains, Cao et al. introduced a selective
                                                                           adversarial network (SAN) [8] to address partial transfer
                                                                           learning from large domains to small domains, which assumes
                                                                           that the target label space is a subspace of the source label
Fig. 11. The domain-adversarial neural network (DANN) architecture. [25]   space. It simultaneously avoids negative transfer by filtering
                                                                           out outlier source classes, and it promotes positive transfer
   The domain-adversarial neural network (DANN) [25] in-                   by matching the data distributions in the shared label space
tegrates a gradient reversal layer (GRL) into the standard                 via splitting the domain discriminator into many class-wise
architecture to ensure that the feature distributions over the             domain discriminators. [78] encoded domain labels and class
two domains are made similar. The network consists of                      labels to produce four groups of pairs, and replaced the typical
shared feature extraction layers and two classifiers. DANN                 binary adversarial discriminator by a four-class discriminator.
minimizes the domain confusion loss (for all samples) and                  Volpi et al. [123] trained a feature generator (S) to perform
label prediction loss (for source samples) while maximizing                data augmentation in the source feature space and obtained
domain confusion loss via the use of the GRL. In contrast                  a domain invariant feature through playing a minimax game
to the above methods, the adversarial discriminative domain                against features from S.
adaptation (ADDA) [119] considers independent source and                      Rather than using discriminator to classify domain label,
target mappings by untying the weights, and the parameters                 some papers make some other explorations. Inspired by
of the target model are initialized by the pre-trained source              Wasserstein GAN [1], Shen et al. [102] utilized discriminator
one. This is more flexible because of allowing more domain-                to estimate empirical Wasserstein distance between the source
specific feature extractions to be learned. ADDA minimizes the             and target samples and optimized the feature extractor network
source and target representation distances through iteratively             to minimize the distance in an adversarial manner. In [99],
minimizing these following functions, which is most similar                two classifiers are treated as discriminators and are trained to
to the original GAN:                                                       maximize the discrepancy to detect target samples outside the
                                                                           support of the source, while a feature extractor is trained to
                                                                           minimize the discrepancy by generating target features near
$$
      min Lcls (X s , Y s ) =                                              the support.
$$
     M s ,C
                                         K
                                                                              3) Reconstruction-Based Approaches: In DA, the data re-
              − E(xs ,ys )∼(X s ,Y s )
                                         X
$$
                                               1[k=ys ] log C(M s (xs ))   construction of source or target samples is an auxiliary task
$$
                                         k=1
                                                                           that simultaneously focuses on creating a shared representation


<!-- PK PAGE 11 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                  11
between the two domains and keeping the individual charac-                     capture shared representations, while a private encoder is used
teristics of each domain.                                                      for domain-specific components in each domain. Additionally,
   • Encoder-Decoder Reconstruction                                            a shared decoder learns to reconstruct the input samples by
   The basic autoencoder framework [2] is a feedforward                        both the private and shared representations. Then, a classifier
neural network that includes the encoding and decoding pro-                    is trained on the shared representation. By partitioning the
cesses. The autoencoder first encodes an input to some hidden                  space in such a manner, the shared representations will not
representation, and then it decodes this hidden representation                 be influenced by domain-specific representations such that
back to a reconstructed version. The DA approaches based                       a better transfer ability can be obtained. Finding that the
on encoder-decoder reconstruction typically learn the domain-                  separation loss is simple and that the private features are
invariant representation by a shared encoder and maintain the                  only used for reconstruction in DSNs, [116] reinforced them
domain-special representation by a reconstruction loss in the                  by incorporating a hybrid adversarial learning in a separation
source and target domains.                                                     network and an adaptation network.
   Xavier and Bengio [36] proposed extracting a high-level                        Zhuang et al. [144] proposed transfer learning with deep
representation based on stacked denoising autoencoders (SDA)                   autoencoders (TLDA), which consists of two encoding layers.
[122]. By reconstructing the union of data from various                        The distance in distributions between domains is minimized
domains with the same network, the high-level representations                  with KL divergence in the embedding encoding layer, and
can represent both the source and target domain data. Thus,                    label information of the source domain is encoded using a
a linear classifier that is trained on the labeled data of the                 softmax loss in the label encoding layer. Ghifary et al. [31]
source domain can make predictions on the target domain data                   extended the autoencoder into a model that jointly learns two
with these representations. Despite their remarkable results,                  types of data-reconstruction tasks taken from related domains:
SDAs are limited by their high computational cost and lack                     one is self-domain reconstruction, and the other is betweenof scalability to high-dimensional features. To address these                  domain reconstruction.
crucial limitations, Chen et al. [10] proposed the marginalized                   • Adversarial Reconstruction
SDA (mSDA), which marginalizes noise with linear denoisers;                       Dual learning was first proposed by Xia et al. [43] to reduce
thus, parameters can be computed in closed-form and do not                     the requirement of labeled data in natural language processing.
require stochastic gradient descent.                                           Dual learning trains two ”opposite” language translators, e.g.,
   The deep reconstruction classification network (DRCN)                       A-to-B and B-to-A. The two translators represent a primalproposed in [33] learns a shared encoding representation that                  dual pair that evaluates how likely the translated sentences
provides useful information for cross-domain object recogni-                   belong to the targeted language, and the closed loop measures
tion. DRCN is a CNN architecture that combines two pipelines                   the disparity between the reconstructed and the original ones.
with a shared encoder. After a representation is provided by                   Inspired by dual learning, adversarial reconstruction is adopted
the encoder, the first pipeline, which is a CNN, works for su-                 in deep DA with the help of dual GANs.
pervised classification with source labels, whereas the second                    Zhu et al. [143] proposed a cycle GAN that can translate
pipeline, which is a deconvolutional network, optimizes for                    the characteristics of one image domain into the other in
unsupervised reconstruction with target data.                                  the absence of any paired training examples. Compared to
                                                                               dual learning, cycle GAN uses two generators rather than
     min λLc ({θenc , θlab }) + (1 − λ)Lr ({θenc , θdec })            (17)
$$
                                                                               translators, which learn a mapping G : X → Y and an inverse
$$
$$
where λ is a hyper-parameter that controls the trade-off                       mapping F : Y → X. Two discriminators, DX and DY ,
$$
$$
between classification and reconstruction. θenc , θdec and θlab                measure how realistic the generated image is (G(X) ≈ Y or
$$
$$
denote the parameters of the encoder, decoder and source clas-                 G(Y ) ≈ X) by an adversarial loss and how well the original
$$
sifier, respectively. Lc is cross-entropy loss for classification,             input is reconstructed after a sequence of two generations
                                         2
$$
and Lr is squared loss k x − fr (x) k2 for reconstruction in                   (F (G(X)) ≈ X or G(F (Y )) ≈ Y ) by a cycle consistency loss
$$
which fr (x) is the reconstruction of x.                                       (reconstruction loss). Thus, the distribution of images from
                                                                               G(X) (or F (Y )) is indistinguishable from the distribution Y
                                                                               (or X).
$$
                                                                                      LGAN (G, DY , X, Y ) = Ey∼pdata (y) [log DY (y)]
$$
                                                                                                   +Ex∼pdata (x) [log(1 − DY (G(x)))]
$$
                                                                                        Lcyc (G, F ) = Ex∼data(x) [kF (G(x)) − xk1 ]
$$
                                                                                                                                          (18)
                                                                                                     +Ey∼data(y) [kG(F (y)) − yk1 ]
                                                                               where LGAN is the adversarial loss produced by discriminator
$$
                                                                               DY with mapping function G : X → Y . Lcyc is the
$$
Fig. 13. The deep reconstruction classification network (DRCN) architecture.
[33]                                                                           reconstruction loss using L1 norm.
                                                                                  The dual GAN [131] and the disco GAN [59] were proposed
   Domain separation networks (DSNs) [5] explicitly and                        at the same time, where the core idea is similar to cycle
jointly model both private and shared components of the                        GAN. In dual GAN, the generator is configured with skip
domain representations. A shared-weight encoder learns to                      connections between mirrored downsampling and upsampling


<!-- PK PAGE 12 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                            12
                                                                      spectively, then proposed two new feature mapping functions,
                                                                                                   T                                T
$$
                                                                      ϕs (xs ) = [P xs , xs , 0dt ] and ϕt (xt ) = [Qxt , 0ds , xt ] , to
$$
                                                                      augment the transformed data with their original features and
                                                                      zeros. These projection matrices are found using standard
                                                                      SVM with hinge loss in both the linear and nonlinear cases
                                                                      and an alternating optimization algorithm is proposed to
Fig. 14. The cycle GAN architecture. [143]
                                                                      simultaneously solve the dual SVM and to find the optimal
                                                                      transformations. [124] treated each input domain as a manlayers [93], [57], making it a U-shaped net to share low-level        ifold which is represented by a Laplacian matrix, and used
information (e.g., object shapes, textures, clutter, and so forth).   labels rather than correspondences to align the manifolds.
For discriminators, the Markovian patch-GAN [65] architec-            The asymmetric transformation transforms one of source and
ture is employed to capture local high-frequency information.         target features to align with the other. [142] proposed a
In disco GAN, various forms of distance functions, such as            sparse and class-invariant feature transformation matrix to
mean-square error (MSE), cosine distance, and hinge loss, can         map the weight vector of classifiers learned from the source
be used as the reconstruction loss, and the network is applied        domain to the target domain. The asymmetric regularized
to translate images, changing specified attributes including          cross-domain transfer (ARC-t) [63] used asymmetric, nonhair color, gender and orientation while maintaining all other        linear transformations learned in Gaussian RBF kernel space
components.                                                           to map the target data to the source domain. Extended from
   4) Hybrid Approaches: To obtain better performance, some           [97], ARC-t performed asymmetric transformation based on
of the aforementioned methods have been used simultaneously.          metric learning, and transfer knowledge between domains with
[118] combined a domain confusion loss and a soft label               different dimensions through changes of the regularizer. Since
loss, while [75] used both statistic (MMD) and architecture           we focus on deep DA, we refer the interested readers to [20],
criteria (adapt classifier by residual function) for unsupervised     which summarizes shallow approaches of heterogeneous DA.
DA. [130] introduced class-specific auxiliary weights assigned           However, as for deep methods, there is not much work
by the pseudo-labels into the original MMD. In DSNs [5],              focused on heterogeneous DA so far. The special and effective
encoder-decoder reconstruction approaches separate represen-          methods of heterogeneous deep DA have not been proposed,
tations into private and shared representations, while the MMD        and heterogeneous deep DA is still performed similar to some
criterion or domain confusion loss is helpful to make the             approaches of homogeneous DA.
shared representations similar and soft subspace orthogonality           1) Discrepancy-Based Approach: In discrepancy-based apconstraints ensure dissimilarity between the private and shared       proaches, the network generally shares or reuses the first n
representations. [95] used the MMD between the learned                layers between the source and target domains, which limits the
source and target representations and also allowed the weights        feature spaces of the input to the same dimension. However,
of the corresponding layers to differ. [144] learned domain-          in heterogeneous DA, the dimensions of the feature spaces of
invariant representations by encoder-decoder reconstruction           source domain may differ from those of target domain.
approaches and the KL divergence.                                        In first scenario of heterogeneous DA, the images in differ-
                                                                      ent domains can be directly resized into the same dimensions,
                                                                      so the Class Criterion and Statistic Criterion are still effective
B. Heterogeneous Domain Adaptation                                    and are mainly used. For example, given an RGB image and
   In heterogeneous DA, the feature spaces of the source              its paired depth image, [41] used the mid-level representation
$$
and target domains are not the same, Xs 6= Xt, and the                learned by CNNs as a supervisory signal to re-train a CNN
$$
dimensions of the feature spaces may also differ. According           on depth images. To transform an RGB object detector into
to the divergence of feature spaces, heterogeneous DA can be          a RGB-D detector without needing complete RGB-D data,
further divided into two scenarios. In one scenario, the source       Hoffman et al. [48] first trained an RGB network using labeled
and target domain both contain images, and the divergence of          RGB data from all categories and finetuned the network with
feature spaces is mainly caused by different sensory devices          labeled depth data from partial categories, then combined mid-
(e.g., visual light (VIS) vs. near-infrared (NIR) or RGB              level RGB and depth representations at fc6 to incorporate
vs. depth) and different styles of images (e.g., sketches vs.         both modalities into the final object class prediction. [77] first
photos). In the other scenario, there are different types of          trained the network using large face database of photos and
media in source and target domain (e.g., text vs. image and           then finetuned it using small database of composite sketches;
language vs. image). Obviously, the cross-domain gap of the           [72] transferred the VIS deep networks to the NIR domain in
second scenario is much larger.                                       the same way.
   Most heterogeneous DA with shallow methods fall into                  In second scenario, the features of different media can
two categories: symmetric transformation and asymmetric               not be directly resized into the same dimensions. Therefore,
transformation. The symmetric transformation learns feature           discrepancy-based methods fail to work without extra process.
transformations to project the source and target features onto        [105] proposed weakly shared DTNs to transfer labeled infora common subspace. Heterogeneous feature augmentation                 mation across heterogeneous domains, particularly from the
(HFA) [23] first transformed the source and target data into          text domain to the image domain. DTNs take paired data, such
a common subspace using projection matrices P and Q re-               as text and image, as input to two SAEs, followed by weakly


<!-- PK PAGE 13 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                              13
parameter-shared network layers at the top. Chen et al. [12]        [129] transferred knowledge from daytime satellite imagery
proposed transfer neural trees (TNTs), which consist of two         to poverty prediction with the help of some nighttime light
stream networks to learn a domain-invariant feature represen-       intensity information as an intermediate domain.
tation for each modality. Then, a transfer neural decision forest
(Transfer-NDF) [94], [61] is used with stochastic pruning for
                                                                    B. Instance-Based Approaches
adapting representative neurons in the prediction layer.
   2) Adversarial-Based Approach: Using Generative Models              In other problems where there are many candidate intercan generate the heterogeneous target data while transferring       mediate domains, some automatic selection criterion should
some information of source domain to them. [111] employed           be considered. Similar to the instance-transfer approaches
a compound loss function that consists of a multiclass GAN          proposed by Pan [83], because the samples of the source
loss, a regularizing component and an f-constancy component         domain cannot be used directly, the mixture of certain parts of
to transfer unlabeled face photos to emoji images. To generate      the source and target data can be useful for constructing the
images for birds and flowers based on text, [90] trained a GAN      intermediate domain.
conditioned on text features encoded by a hybrid character-            Tan et al. [114] proposed distant domain transfer learning
level convolutional-recurrent neural network. [135] proposed        (DDTL), where long-distance domains fail to transfer knowlstacked generative adversarial networks (StackGAN) with con-        edge by only one intermediate domain but can be related
ditioning augmentation for synthesizing photo-realistic images      via multiple intermediate domains. DDTL gradually selects
from text. It decomposes the synthesis problem into several         unlabeled data from the intermediate domains by minimizing
sketch-refinement processes. Stage-I GAN sketches the primi-        reconstruction errors on the selected instances in the source
tive shape and basic colors of the object to yield low-resolution   and intermediate domains and all the instances in the target
image, and Stage-II GAN completes details of the object to          domain simultaneously. With removal of the unrelated source
produce a high-resolution photo-realistic image.                    data, the selected intermediate domains gradually become
                                                                    closer to the target domain from the source domain:
                                                                                                     nS
                                                                                                  1 X                 2
$$
                                                                     J1 (fe , fd , vS , vT ) =          v i x̂i − xiS 2
$$
$$
                                                                                                 nS i=1 S S
$$
                                                                                                     nI
                                                                                                 1 X                  2
                                                                                           +            v i x̂i − xiI 2               (19)
$$
                                                                                                 nI i=1 I I
$$
                                                                                                     nT
                                                                                                  1 X               2
                                                                                           +            x̂i − xiT     + R(vS , vT )
$$
                                                                                                 nT i=1 T           2
$$
                                                                    where x̂iS , x̂iT and x̂iI are reconstructions of source data
Fig. 15. The StackGAN architecture. [135]
                                                                    S i , target data T i and intermediate data I i based on the
   3) Reconstruction-Based Approach: The Adversarial Re-            autoencoder, respectively, and fe and fd are the parameters
                                                                                                                                         >
$$
construction can be used in heterogeneous DA as well. For           of the encoder and decoder, respectively. vS = (vS1 , ..., vSnS )
$$
                                                                                          n    >
$$
example, the cycle GAN [143], dual GAN [131] and disco              and vI = (vI1 , ..., vI I ) , vSi , vIi ∈ 0, 1 are selection indicators
$$
GAN [59] used two generators, GA and GB , to generate               for the ith source and intermediate instance, respectively.
sketches from photos and photos from sketches, respectively.        R(vS , vT ) is a regularization term that avoids all values of
Based on cycle GAN [143], [125] proposed a multi-adversarial        vS and vI being zero.
network to avoid artifacts of facial photo-sketch synthesis by          The DLID model [16] mentioned in Section IV-A1 (Geoleveraging the implicit presence of feature maps of different       metric Criterion) constructs the intermediate domains with a
resolutions in the generator subnetwork.                            subset of the source and target domains, where source samples
                                                                    are gradually replaced by target samples.
            V. M ULTI -S TEP D OMAIN A DAPTATION
   For multi-step DA, the selection of the intermediate domain      C. Representation-Based Approaches
is problem specific, and different problems may have different
                                                                       Representation-based approaches freeze the previously
strategies.
                                                                    trained network and use their intermediate representations
                                                                    as input to the new network. Rusu et al. [96] introduced
A. Hand-Crafted Approaches                                          progressive networks that have the ability to accumulate and
   Occasionally, the intermediate domain can be selected by         transfer knowledge to new domains over a sequence of expeexperience, that is, it is decided in advance. For example, when    riences. To avoid the target model losing its ability to solve
the source domain is image data and the target domain is            the source domain, they constructed a new neural network for
composed of text data, some annotated images will clearly be        each domain, while transfer is enabled via lateral connections
crawled as intermediate domain data.                                to features of previously learned networks. In the process,
   With the common sense that nighttime light intensities           the parameters in the latest network are frozen to remember
can be used as a proxy for economic activity, Xie et al.            knowledge of intermediate domains.


<!-- PK PAGE 14 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                             14
                                                                    also compared them with DANN and DLID under a supervised
                                                                    DA setting.
                                                                       In [119], MNIST2 (M), USPS3 (U), and SVHN4 (S) digit
                                                                    datasets (shown in Fig. 1(b)) are used for a cross-domain hand-
                                                                    written digit recognition task, and the experiment showed the
                                                                    comparison results on some adversarial-based methods, such
                                                                    as DANN, CoGAN [70] and ADDA [119], where the baseline
                                                                    is VGG-16 [106].
                                                                    B. Face Recognition
                                                                       The performance of face recognition significantly degrades
Fig. 16. The progressive network architecture. [96]
                                                                    when there are variations in the test images that are not
                                                                    present in the training images. The dataset shift can be caused
                                                                    by poses, resolution, illuminations, expressions, and modality.
     VI. A PPLICATION OF D EEP D OMAIN A DAPTATION                  Kan et al. [58] proposed a bi-shifting auto-encoder network
   Deep DA techniques have recently been successfully applied       (BAE) for face recognition across view angle, ethnicity, and
in many real-world applications, including image classifica-        imaging sensor. In BAE, source domain samples are shifted
tion, object recognition, face recognition, object detection,       to the target domain, and sparse reconstruction is used with
style translation, and so forth. In this section, we present        several local neighbors from the target domain to ensure its
different application examples using various visual deep DA         correction, and vice versa. Single sample per person domain
methods. Because the information of commonly used datasets          adaptation network (SSPP-DAN) in [51] generates synthetic
for evaluating the performance is provided in [137] in detail,      images with varying poses to increase the number of samples
we do not introduce it in this paper.                               in the source domain and bridges the gap between the synthetic
                                                                    and source domains by adversarial training with a GRL in real-
                                                                    world face recognition. [107] improved the performance of
A. Image Classification
                                                                    video face recognition by using an adversarial-based approach
   Because image classification is a basic task of computer         with large-scale unlabeled videos, labeled still images and synvision applications, most of the algorithms mentioned above         thesized images. Considering that age variations are difficult
were originally proposed to solve such problems. Therefore,         problems for smile detection and that networks trained on the
we do not discuss this application repeatedly, but we show how      current benchmarks do not perform well on young children,
much benefit deep DA methods for image classification can           Xia et al. [127] applied DAN [73] and JAN [74] (mentioned
bring. Because different papers often use different parameters,     in Section IV-A1) to two baseline deep models, i.e., AlexNet
experimental protocols and tuning strategies in the preprocess-     and ResNet, to transfer the knowledge from adults to infants.
ing steps, it is quite difficult to perform a fair comparison
among all the methods directly. Thus, similar to the work
of Pan [83], we show the comparison results between the
proposed deep DA methods and non-adaptation methods using
only deep networks. A list of simple experiments taken from
some published deep DA papers are presented in Table V.
   In [74], [134], and [118], the authors used the Office-31
dataset1 as one of the evaluation data sets, as shown in Fig.
1(a). The Office dataset is a computer vision classification data   Fig. 17. The single sample per person domain adaptation network (SSPPset with images from three distinct domains: Amazon (A),            DAN) architecture. [51]
DSLR (D), and Webcam (W). The largest domain, Amazon,
has 2817 labeled images and its corresponding 31 classes,
which consists of objects commonly encountered in office            C. Object Detection
settings. By using this dataset, previous works can show the          Recent advances in object detection are driven by regionperformance of methods across all six possible DA tasks. [74]       based convolutional neural networks (R-CNNs [35], fast Rshowed comparison experiments among the standard AlexNet            CNNs [34] and faster R-CNNs [91]). They are composed
[62], the DANN method [25], and the MMD algorithm and               of a window selection mechanism and classifiers that are
its variations, such as DDC [120], DAN [73], JAN [74] and           pre-trained labeled bounding boxes by using the features
RTN [75]. Zellinger et al. [134] evaluated their proposed CMD       extracted from CNNs. At test time, the classifier decides
algorithm in comparison to other discrepancy-based methods          whether a region obtained by sliding windows contains the
(DDC, deep CROAL [109], DLID [16], AdaBN [69]) and the              object. Although the R-CNN algorithm is effective, a large
adversarial-based method DANN. [118] proposed an algorithm
combining soft label loss and domain confusion loss, and they         2 http://yann.lecun.com/exdb/mnist/
                                                                      3 http://statweb.stanford.edu/∼tibs/ElemStatLearn/data.html
  1 https://cs.stanford.edu/∼jhoffman/domainadapt/                    4 http://ufldl.stanford.edu/housenumbers/


<!-- PK PAGE 15 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                            15
                                                                TABLE V
                             C OMPARISON BETWEEN T RANSFER L EARNING AND N ON -A DAPTATION L EARNING M ETHODS
               Data Set
                                  Source vs. Target   Baselines                Deep Domain Adaptation Methods
               (reference)
                                                      AlexNet         DDC        DAN          RTN         JAN        DANN
$$
                                      A vs. W         61.6±0.5      61.8±0.4     68.5       73.3±0.3    75.2±0.4    73.0±0.5
$$
$$
                                      D vs. W         95.4±0.3      95.0±0.5   96.0±0.3     96.8±0.2    96.6±0.2    96.4±0.3
$$
$$
            Office-31 Dataset         W vs. D         99.0±0.2      98.5±0.4   99.0±0.3     99.6±0.1    99.6±0.1    99.2±0.3
$$
$$
            ACC (unit:%)[74]          A vs. D         63.8±0.5      64.4±0.3   67.0±0.4     71.0±0.2    72.8±0.3    72.3±0.3
$$
$$
                                      D vs. A         51.1±0.6      52.1±0.6   54.0±0.5     50.5±0.3    57.5±0.2    53.4±0.4
$$
$$
                                      W vs. A         49.8±0.4      52.2±0.4   53.1±0.5     51.0±0.1    56.3±0.2    51.2±0.5
$$
                                        Avg             70.1          70.6       72.9         73.7        76.3        74.3
                                                      AlexNet     Deep CORAL    CMD          DLID        AdaBN       DANN
$$
                                      A vs. W           61.6          66.4     77.0±0.6       51.9        74.2         73
$$
$$
                                      D vs. W           95.4          95.7     96.3±0.4       78.2        95.7        96.4
$$
$$
            Office-31 Dataset         W vs. D           99.0          99.2     99.2±0.2       89.9        99.8        99.2
$$
$$
           ACC (unit:%)[134]          A vs. D           63.8          66.8     79.6±0.6         -         73.1          -
$$
$$
                                      D vs. A           51.1          52.8     63.8±0.7         -         59.8          -
$$
$$
                                      W vs. A           49.8          51.5     63.3±0.6         -         57.4          -
$$
                                        Avg             70.1          72.1       79.9           -         76.7          -
                                                                                                        Domain      Confusion
                                                      AlexNet       DLID        DANN      Soft Labels
                                                                                                        Confusion   +Soft
$$
                                      A vs. W         56.5±0.3       51.9      53.6±0.2     82.7±0.7    82.8±0.9    82.7±0.8
$$
$$
                                      D vs. W         92.4±0.3       78.2      71.2±0.0     95.9±0.6    95.6±0.4    95.7±0.5
$$
$$
            Office-31 Dataset         W vs. D         93.6±0.2       89.9      83.5±0.0     98.3±0.3    97.5±0.2    97.6±0.2
$$
$$
           ACC (unit:%)[118]          A vs. D         64.6±0.4         -           -        84.9±1.2    85.9±1.1    86.1±1.2
$$
$$
                                      D vs. A         47.6±0.1         -           -        66.0±0.5    66.2±0.4    66.2±0.3
$$
$$
                                      W vs. A         42.7±0.1         -           -        65.2±0.6    64.9±0.5    65.0±0.5
$$
                                        Avg             66.2           -           -          82.17       82.13       82.22
            MNIST, USPS,                              VGG-16        DANN       CoGAN         ADDA
$$
              and SVHN                M vs. U         75.2±1.6     77.1±1.8    91.2±0.8     89.4±0.2
$$
$$
             digits datasets          U vs. M         57.1±1.7     73.0±2.0    89.1±0.8     90.1±0.8
$$
$$
           ACC (unit:%)[119]          S vs. M         60.1±1.1       73.9          -        76.0±1.8
$$
amount of bounding box labeled data is required to train                D. Semantic Segmentation
each detection category. To solve the problem of lacking                    Fully convolutional network models (FCNs) for dense prelabeled data, considering the window selection mechanism as             diction have proven to be successful for evaluating semantic
being domain independent, deep DA methods can be used in                segmentation, but their performance will also degrade unclassifiers to adapt to the target domain.                              der domain shifts. Therefore, some work has also explored
                                                                        using weak labels to improve the performance of semantic
                                                                        segmentation. Hong et al. [52] used a novel encoder-decoder
                                                                        architecture with attention model by transferring weak class
   Because R-CNNs train classifiers on regions just like clas-          labeled knowledge in the source domain, while [60], [103]
sification, weak labeled data (such as image-level class labels)        transferred weak object location knowledge.
are directly useful for the detector. Most works learn the detec-           Much attention has also been paid to deep unsupervised DA
tor with limited bounding box labeled data and massive weak             in semantic segmentation. Hoffman et al. [50] first introduced
labeled data. The large-scale detection through adaptation              it, in which global domain alignment is performed using FCNs
(LSDA) [47] trains a classification layer for the target domain         with adversarial-based training, while transferring spatial layand then uses a pre-trained source model along with output              out is achieved by leveraging class-aware constrained multiple
layer adaptation techniques to update the target classification         instance loss. Zhang et al. [140] enhanced the segmentation
parameters directly. Rochan et al. [92] used word vectors               performance on real images with the help of virtual ones. It
to establish the semantic relatedness between weak labeled              uses the global label distribution loss of the images and local
source objects and target objects and then transferred the              label distribution loss of the landmark superpixels in the target
bounding box labeled information from source objects to target          domain to effectively regularize the fine-tuning of the semantic
objects based on their relatedness. Extending [47] and [92],            segmentation network. Chen et al. [15] proposed a framework
Tang et al. [115] transferred visual (based on the LSDA model)          for cross-city semantic segmentation. The framework assigns
and semantic similarity (based on work vectors) for training            pseudo labels to pixels/grids in the target domain and jointly
an object detector on weak labeled category. [13] incorporated          utilizes global and class-wise alignment by domain adversarial
both an image-level and an instance-level adaptation compo-             learning to minimize domain shift. In [14], a target guided
nent into faster R-CNN and minimized the domain discrepancy             distillation module adapts the style from the real images by
based on adversarial training. By using bounding box labeled            imitating the pre-trained source network, and a spatial-aware
data in a source domain and weak labeled data in a target               adaptation module leverages the intrinsic spatial structure to
domain, [55] progressively fine-tuned the pre-trained model             reduce the domain divergence. Rather than operating a simple
with domain-transfer samples and pseudo-labeling samples.               adversarial objective on the feature space, [100] used a GAN


<!-- PK PAGE 16 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                 16
to address domain shift in which a generator projects the                   a person, person re-ID recognizes whether this person has
features to the image space and a discriminator operates on                 been in another camera to compensate for the limitations of
this projected image space.                                                 fixed devices. Recently, deep DA methods have been used in
                                                                            re-ID when models trained on one dataset are directly used
                                                                            on another. Xiao et al. [128] proposed the domain-guided
                                                                            dropout algorithm to discard useless neurons for re-identifying
                                                                            persons on multiple datasets simultaneously. Inspired by cy-
                                                                            cle GAN and Siamese network, the similarity preserving
                                                                            generative adversarial network (SPGAN) [21] translated the
                                                                            labeled source image to the target domain, preserving self
                                                                            similarity and domain-dissimilarity in an unsupervised manner,
                                                                            and then it trains re-ID models with the translated images using
                                                                            supervised feature learning methods.
                                                                            G. Image Captioning
                                                                               Recently, image captioning, which automatically describes
                                                                            an image with a natural sentence, has been an emerging
                                                                            challenge in computer vision and natural language processing.
Fig. 18. The architecture of pixel-level adversarial and constraint-based   Due to lacking of paired image-sentence training data, DA
adaptation. [50]
                                                                            leverages different types of data in other source domains
                                                                            to tackle this challenge. Chen et al. [11] proposed a novel
E. Image-to-Image Translation                                               adversarial training procedure (captioner v.s. critics) for cross-
                                                                            domain image captioning using paired source data and un-
   Image-to-image translation has recently achieved great suc-              paired target data. One captioner adapts the sentence style from
cess with deep DA, and it has been applied to various tasks,                source to target domain, whereas two critics, namely domain
such as style transferring. Specially, when the feature spaces              critic and multi-modal critic, aim at distinguishing them. Zhao
of source and target images are not same, image-to-image                    et al. [141] fine-tuned the pre-trained source model on limited
translation should be performed by heterogeneous DA.                        data in the target domain via a dual learning mechanism.
   More approaches of image-to-image translation use a
dataset of paired images and incorporate a DA algorithm into
generative networks. Isola et al. [57] proposed the pix2pix                                       VII. C ONCLUSION
framework, which uses a conditional GAN to learn a mapping                     In a broad sense, deep DA is utilizing deep networks to
from source to target images. Tzeng et al. [117] utilized do-               enhance the performance of DA, such as shallow DA methods
main confusion loss and pairwise loss to adapt from simulation              with features extracted by deep networks. In a narrow sense,
to real-world data in a PR2 robot. However, several other                   deep DA is based on deep learning architectures designed for
methods also address the unpaired setting, such as CoGAN                    DA and optimized by back propagation. In this survey paper,
[70], cycle GAN [143], dual GAN [131] and disco GAN [59].                   we focus on this narrow definition, and we have reviewed deep
   Matching the statistical distribution by fine-tuning a deep              DA techniques on visual categorization tasks.
network is another way to achieve image-to-image translation.                  Deep DA is classified as homogeneous DA and heterogeGatys et al. [27] fine-tuned the CNN to achieve DA by the                   neous DA, and it can be further divided into supervised, semitotal loss, which is a linear combination between the content               supervised and unsupervised settings. The first setting is the
and the style loss, such that the target image is rendered in the           simplest but is generally limited due to the need for labeled
style of the source image maintaining the content. The content              data; thus, most previous works focused on unsupervised
loss minimizes the mean squared difference of the feature                   cases. Semi-supervised deep DA is a hybrid method that
representation between the original image and generated image               combines the methods of the supervised and unsupervised
in higher layers, while the style loss minimizes the element-               settings.
wise mean squared difference between the Gram matrix of                        Furthermore, the approaches of deep DA can be classified
them on each layer. [68] demonstrated that matching the                     into one-step DA and multi-step DA considering the distance
Gram matrices of feature maps is equivalent to minimizing the               of the source and target domains. When the distance is
MMD. Rather than MMD, [87] proposed a deep generative                       small, one-step DA can be used based on training loss. It
correlation alignment network (DGCAN) that bridges the                      consists of the discrepancy-based approach, the adversarialdomain discrepancy between CAD synthetic and real images                    based approach, and the reconstruction-based approach. When
by applying the content and CORAL losses to different layers.               the source and target domains are not directly related, multi-
                                                                            step (or transitive) DA can be used. The key of multi-step
F. Person Re-identification                                                 DA is to select and utilize intermediate domains, thus falling
  In the community, person re-identification (re-ID) has be-                into three categories, including hand-crafted, feature-based and
come increasingly popular. When given video sequences of                    representation-based selection mechanisms.


<!-- PK PAGE 17 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                                17
   Although deep DA has achieved success recently, many                          [12] W.-Y. Chen, T.-M. H. Hsu, Y.-H. H. Tsai, Y.-C. F. Wang, and M.-S.
issues still remain to be addressed. First, most existing al-                         Chen. Transfer neural trees for heterogeneous domain adaptation. In
                                                                                      European Conference on Computer Vision, pages 399–414. Springer,
gorithms focus on homogeneous deep DA, which assumes                                  2016.
that the feature spaces between the source and target domains                    [13] Y. Chen, W. Li, C. Sakaridis, D. Dai, and L. Van Gool. Domain
are the same. However, this assumption may not be true in                             adaptive faster r-cnn for object detection in the wild. arXiv preprint
                                                                                      arXiv:1803.03243, 2018.
many applications. We expect to transfer knowledge without                       [14] Y. Chen, W. Li, and L. Van Gool. Road: Reality oriented adapthis severe limitation and take advantage of existing datasets                        tation for semantic segmentation of urban scenes. arXiv preprint
                                                                                      arXiv:1711.11556, 2017.
to help with more tasks. Heterogeneous deep DA may attract                       [15] Y.-H. Chen, W.-Y. Chen, Y.-T. Chen, B.-C. Tsai, Y.-C. F. Wang, and
increasingly more attention in the future.                                            M. Sun. No more discrimination: Cross city adaptation of road scene
   In addition, deep DA techniques have been successfully                             segmenters. arXiv preprint arXiv:1704.08509, 2017.
                                                                                 [16] S. Chopra, S. Balakrishnan, and R. Gopalan. Dlid: Deep learning
applied in many real-world applications, including image                              for domain adaptation by interpolating between domains. In ICML
classification, and style translation. We have also found that                        workshop on challenges in representation learning, volume 2, 2013.
                                                                                 [17] B. Chu, V. Madhavan, O. Beijbom, J. Hoffman, and T. Darrell. Best
only a few papers address adaptation beyond classification                            practices for fine-tuning visual classifiers to new domains. In Computer
and recognition, such as object detection, face recognition,                          Vision–ECCV 2016 Workshops, pages 435–442. Springer, 2016.
semantic segmentation and person re-identification. How to                       [18] W.-S. Chu, F. De la Torre, and J. F. Cohn. Selective transfer machine
                                                                                      for personalized facial action unit detection. In Proceedings of the
achieve these tasks with no or a very limited amount of data is                       IEEE Conference on Computer Vision and Pattern Recognition, pages
probably one of the main challenges that should be addressed                          3515–3522, 2013.
by deep DA in the next few years.                                                [19] G. Csurka. Domain adaptation for visual applications: A comprehen-
                                                                                      sive survey. arXiv preprint arXiv:1702.05374, 2017.
   Finally, since existing deep DA methods aim at aligning                       [20] O. Day and T. M. Khoshgoftaar. A survey on heterogeneous transfer
marginal distributions, they commonly assume shared label                             learning. Journal of Big Data, 4(1):29, 2017.
                                                                                 [21] W. Deng, L. Zheng, G. Kang, Y. Yang, Q. Ye, and J. Jiao.
space across the source and target domains. However, in                               Image-image domain adaptation with preserved self-similarity and
realistic scenario, the images of the source and target domain                        domain-dissimilarity for person re-identification.        arXiv preprint
may be from the different set of categories or only a few                             arXiv:1711.07027, 2017.
                                                                                 [22] J. Donahue, Y. Jia, O. Vinyals, J. Hoffman, N. Zhang, E. Tzeng, and
categories of interest are shared. Recently, some papers [8],                         T. Darrell. Decaf: A deep convolutional activation feature for generic
[7], [136] have begun to focus on this issue and we believe it                        visual recognition. In International conference on machine learning,
is worthy of more attention.                                                          pages 647–655, 2014.
                                                                                 [23] L. Duan, D. Xu, and I. Tsang. Learning with augmented features
                                                                                      for heterogeneous domain adaptation. arXiv preprint arXiv:1206.4660,
              VIII. ACKNOWLEDGEMENTS                                                  2012.
                                                                                 [24] D. Eigen, C. Puhrsch, and R. Fergus. Depth map prediction from a
  This work was partially supported by the National Natural                           single image using a multi-scale deep network. In Advances in neural
Science Foundation of China under Grant Nos. 61573068,                                information processing systems, pages 2366–2374, 2014.
                                                                                 [25] Y. Ganin and V. Lempitsky. Unsupervised domain adaptation by
61471048, and 61375031, and Beijing Nova Program under                                backpropagation. In International Conference on Machine Learning,
Grant No. Z161100004916088.                                                           pages 1180–1189, 2015.
                                                                                 [26] Y. Ganin, E. Ustinova, H. Ajakan, P. Germain, H. Larochelle, F. Lavio-
                             R EFERENCES                                              lette, M. Marchand, and V. Lempitsky. Domain-adversarial training of
                                                                                      neural networks. Journal of Machine Learning Research, 17(59):1–35,
 [1] M. Arjovsky, S. Chintala, and L. Bottou. Wasserstein gan. arXiv                  2016.
     preprint arXiv:1701.07875, 2017.                                            [27] L. A. Gatys, A. S. Ecker, and M. Bethge. Image style transfer using
 [2] Y. Bengio. Learning deep architectures for ai. Foundations and Trends            convolutional neural networks. In Proceedings of the IEEE Conference
     in Machine Learning, 2(1):1–127, 2009.                                           on Computer Vision and Pattern Recognition, pages 2414–2423, 2016.
 [3] K. M. Borgwardt, A. Gretton, M. J. Rasch, H.-P. Kriegel, B. Schölkopf,     [28] W. Ge and Y. Yu. Borrowing treasures from the wealthy: Deep
     and A. J. Smola. Integrating structured biological data by kernel                transfer learning through selective joint fine-tuning. arXiv preprint
     maximum mean discrepancy. Bioinformatics, 22(14):e49–e57, 2006.                  arXiv:1702.08690, 2017.
 [4] K. Bousmalis, N. Silberman, D. Dohan, D. Erhan, and D. Krishnan.            [29] T. Gebru, J. Hoffman, and L. Fei-Fei. Fine-grained recognition in
     Unsupervised pixel-level domain adaptation with generative adversarial           the wild: A multi-task domain adaptation approach. arXiv preprint
     networks. arXiv preprint arXiv:1612.05424, 2016.                                 arXiv:1709.02476, 2017.
 [5] K. Bousmalis, G. Trigeorgis, N. Silberman, D. Krishnan, and D. Erhan.       [30] M. Gheisari and M. S. Baghshah. Unsupervised domain adaptation via
     Domain separation networks. In Advances in Neural Information                    representation learning and adaptive classifier learning. Neurocomput-
     Processing Systems, pages 343–351, 2016.                                         ing, 165:300–311, 2015.
 [6] L. Bruzzone and M. Marconcini. Domain adaptation problems: A                [31] M. Ghifary, W. Bastiaan Kleijn, M. Zhang, and D. Balduzzi. Domain
     dasvm classification technique and a circular validation strategy. IEEE          generalization for object recognition with multi-task autoencoders. In
     transactions on pattern analysis and machine intelligence, 32(5):770–            Proceedings of the IEEE international conference on computer vision,
     787, 2010.                                                                       pages 2551–2559, 2015.
 [7] P. P. Busto and J. Gall. Open set domain adaptation. In The                 [32] M. Ghifary, W. B. Kleijn, and M. Zhang. Domain adaptive neural net-
     IEEE International Conference on Computer Vision (ICCV), volume 1,               works for object recognition. In Pacific Rim International Conference
     page 3, 2017.                                                                    on Artificial Intelligence, pages 898–904. Springer, 2014.
 [8] Z. Cao, M. Long, J. Wang, and M. I. Jordan. Partial transfer learning       [33] M. Ghifary, W. B. Kleijn, M. Zhang, D. Balduzzi, and W. Li. Deep
     with selective adversarial networks. arXiv preprint arXiv:1707.07901,            reconstruction-classification networks for unsupervised domain adap-
     2017.                                                                            tation. In European Conference on Computer Vision, pages 597–613.
 [9] F. M. Carlucci, L. Porzi, B. Caputo, E. Ricci, and S. R. Bulò. Autodial:        Springer, 2016.
     Automatic domain alignment layers. In International Conference on           [34] R. Girshick. Fast r-cnn. In Proceedings of the IEEE international
     Computer Vision, 2017.                                                           conference on computer vision, pages 1440–1448, 2015.
[10] M. Chen, Z. Xu, K. Weinberger, and F. Sha. Marginalized denoising           [35] R. Girshick, J. Donahue, T. Darrell, and J. Malik. Rich feature
     autoencoders for domain adaptation. arXiv preprint arXiv:1206.4683,              hierarchies for accurate object detection and semantic segmentation. In
     2012.                                                                            Proceedings of the IEEE conference on computer vision and pattern
[11] T.-H. Chen, Y.-H. Liao, C.-Y. Chuang, W.-T. Hsu, J. Fu, and M. Sun.              recognition, pages 580–587, 2014.
     Show, adapt and tell: Adversarial training of cross-domain image            [36] X. Glorot, A. Bordes, and Y. Bengio. Domain adaptation for large-scale
     captioner. In The IEEE International Conference on Computer Vision               sentiment classification: A deep learning approach. In Proceedings
     (ICCV), volume 2, 2017.


<!-- PK PAGE 18 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                             18
     of the 28th international conference on machine learning (ICML-11),            neural decision forests. In Proceedings of the IEEE International
     pages 513–520, 2011.                                                           Conference on Computer Vision, pages 1467–1475, 2015.
[37] B. Gong, K. Grauman, and F. Sha. Connecting the dots with landmarks:      [62] A. Krizhevsky, I. Sutskever, and G. E. Hinton. Imagenet classification
     Discriminatively learning domain-invariant features for unsupervised           with deep convolutional neural networks. In Advances in neural
     domain adaptation. In International Conference on Machine Learning,            information processing systems, pages 1097–1105, 2012.
     pages 222–230, 2013.                                                      [63] B. Kulis, K. Saenko, and T. Darrell. What you saw is not what you get:
[38] B. Gong, Y. Shi, F. Sha, and K. Grauman. Geodesic flow kernel                  Domain adaptation using asymmetric kernel transforms. In Computer
     for unsupervised domain adaptation. In Computer Vision and Pattern             Vision and Pattern Recognition (CVPR), 2011 IEEE Conference on,
     Recognition (CVPR), 2012 IEEE Conference on, pages 2066–2073.                  pages 1785–1792. IEEE, 2011.
     IEEE, 2012.                                                               [64] C. H. Lampert, H. Nickisch, and S. Harmeling. Learning to detect
[39] I. Goodfellow, J. Pouget-Abadie, M. Mirza, B. Xu, D. Warde-Farley,             unseen object classes by between-class attribute transfer. In Computer
     S. Ozair, A. Courville, and Y. Bengio. Generative adversarial nets. In         Vision and Pattern Recognition, 2009. CVPR 2009. IEEE Conference
     Advances in neural information processing systems, pages 2672–2680,            on, pages 951–958. IEEE, 2009.
     2014.                                                                     [65] C. Li and M. Wand. Precomputed real-time texture synthesis with
[40] R. Gopalan, R. Li, and R. Chellappa. Domain adaptation for object              markovian generative adversarial networks. In European Conference
     recognition: An unsupervised approach. In Computer Vision (ICCV),              on Computer Vision, pages 702–716. Springer, 2016.
     2011 IEEE International Conference on, pages 999–1006. IEEE, 2011.        [66] D. Li, Y. Yang, Y.-Z. Song, and T. M. Hospedales. Deeper, broader
[41] S. Gupta, J. Hoffman, and J. Malik. Cross modal distillation for               and artier domain generalization. In Computer Vision (ICCV), 2017
     supervision transfer. In Proceedings of the IEEE Conference on                 IEEE International Conference on, pages 5543–5551. IEEE, 2017.
     Computer Vision and Pattern Recognition, pages 2827–2836, 2016.           [67] Y. Li, K. Swersky, and R. Zemel. Generative moment matching
[42] P. Haeusser, T. Frerix, A. Mordvintsev, and D. Cremers. Associative            networks. In Proceedings of the 32nd International Conference on
     domain adaptation. In International Conference on Computer Vision              Machine Learning (ICML-15), pages 1718–1727, 2015.
     (ICCV), volume 2, page 6, 2017.                                           [68] Y. Li, N. Wang, J. Liu, and X. Hou. Demystifying neural style transfer.
[43] D. He, Y. Xia, T. Qin, L. Wang, N. Yu, T. Liu, and W.-Y. Ma. Dual              arXiv preprint arXiv:1701.01036, 2017.
     learning for machine translation. In Advances in Neural Information       [69] Y. Li, N. Wang, J. Shi, J. Liu, and X. Hou. Revisiting batch normaliza-
     Processing Systems, pages 820–828, 2016.                                       tion for practical domain adaptation. arXiv preprint arXiv:1603.04779,
[44] K. He, X. Zhang, S. Ren, and J. Sun. Deep residual learning for image          2016.
     recognition. In Proceedings of the IEEE conference on computer vision     [70] M.-Y. Liu and O. Tuzel. Coupled generative adversarial networks. In
     and pattern recognition, pages 770–778, 2016.                                  Advances in neural information processing systems, pages 469–477,
[45] G. Hinton, O. Vinyals, and J. Dean. Distilling the knowledge in a              2016.
     neural network. arXiv preprint arXiv:1503.02531, 2015.                    [71] W. Liu, Z. Wang, X. Liu, N. Zeng, Y. Liu, and F. E. Alsaadi. A
[46] G. E. Hinton, S. Osindero, and Y.-W. Teh. A fast learning algorithm            survey of deep neural network architectures and their applications.
     for deep belief nets. Neural computation, 18(7):1527–1554, 2006.               Neurocomputing, 234:11–26, 2017.
[47] J. Hoffman, S. Guadarrama, E. S. Tzeng, R. Hu, J. Donahue, R. Gir-        [72] X. Liu, L. Song, X. Wu, and T. Tan. Transferring deep representation
     shick, T. Darrell, and K. Saenko. Lsda: Large scale detection through          for nir-vis heterogeneous face recognition. In Biometrics (ICB), 2016
     adaptation. In Advances in Neural Information Processing Systems,              International Conference on, pages 1–8. IEEE, 2016.
     pages 3536–3544, 2014.                                                    [73] M. Long, Y. Cao, J. Wang, and M. Jordan. Learning transferable
[48] J. Hoffman, S. Gupta, J. Leong, S. Guadarrama, and T. Darrell. Cross-          features with deep adaptation networks. In International Conference
     modal adaptation for rgb-d detection. In Robotics and Automation               on Machine Learning, pages 97–105, 2015.
     (ICRA), 2016 IEEE International Conference on, pages 5032–5039.           [74] M. Long, J. Wang, and M. I. Jordan. Deep transfer learning with joint
     IEEE, 2016.                                                                    adaptation networks. arXiv preprint arXiv:1605.06636, 2016.
[49] J. Hoffman, E. Tzeng, J. Donahue, Y. Jia, K. Saenko, and T. Darrell.      [75] M. Long, H. Zhu, J. Wang, and M. I. Jordan. Unsupervised domain
     One-shot adaptation of supervised deep convolutional models. arXiv             adaptation with residual transfer networks. In Advances in Neural
     preprint arXiv:1312.6204, 2013.                                                Information Processing Systems, pages 136–144, 2016.
[50] J. Hoffman, D. Wang, F. Yu, and T. Darrell. Fcns in the wild:             [76] H. Lu, L. Zhang, Z. Cao, W. Wei, K. Xian, C. Shen, and A. van den
     Pixel-level adversarial and constraint-based adaptation. arXiv preprint        Hengel. When unsupervised domain adaptation meets tensor represen-
     arXiv:1612.02649, 2016.                                                        tations. In The IEEE International Conference on Computer Vision
[51] S. Hong, W. Im, J. Ryu, and H. S. Yang. Sspp-dan: Deep domain                  (ICCV), volume 2, 2017.
     adaptation network for face recognition with single sample per person.    [77] P. Mittal, M. Vatsa, and R. Singh. Composite sketch recognition via
     arXiv preprint arXiv:1702.04069, 2017.                                         deep network-a transfer learning approach. In Biometrics (ICB), 2015
[52] S. Hong, J. Oh, H. Lee, and B. Han. Learning transferrable knowledge           International Conference on, pages 251–256. IEEE, 2015.
     for semantic segmentation with deep convolutional neural network. In      [78] S. Motiian, Q. Jones, S. Iranmanesh, and G. Doretto. Few-shot
     Proceedings of the IEEE Conference on Computer Vision and Pattern              adversarial domain adaptation. In Advances in Neural Information
     Recognition, pages 3204–3212, 2016.                                            Processing Systems, pages 6673–6683, 2017.
[53] J. Hu, J. Lu, and Y.-P. Tan. Deep transfer metric learning. In            [79] S. Motiian, M. Piccirilli, D. A. Adjeroh, and G. Doretto. Unified
     Proceedings of the IEEE Conference on Computer Vision and Pattern              deep supervised domain adaptation and generalization. In The IEEE
     Recognition, pages 325–333, 2015.                                              International Conference on Computer Vision (ICCV), volume 2, 2017.
[54] X. Huang and S. Belongie. Arbitrary style transfer in real-time with      [80] H. V. Nguyen, H. T. Ho, V. M. Patel, and R. Chellappa. Dash-n: Joint
     adaptive instance normalization. arXiv preprint arXiv:1703.06868,              hierarchical domain adaptation and feature learning. IEEE Transactions
     2017.                                                                          on Image Processing, 24(12):5479–5491, 2015.
[55] N. Inoue, R. Furuta, T. Yamasaki, and K. Aizawa. Cross-domain             [81] S. Pachori, A. Deshpande, and S. Raman. Hashing in the zero shot
     weakly-supervised object detection through progressive domain adap-            framework with domain adaptation. Neurocomputing, 2017.
     tation. arXiv preprint arXiv:1803.11365, 2018.                            [82] S. J. Pan, I. W. Tsang, J. T. Kwok, and Q. Yang. Domain adaptation via
[56] S. Ioffe and C. Szegedy. Batch normalization: Accelerating deep                transfer component analysis. IEEE Transactions on Neural Networks,
     network training by reducing internal covariate shift. In International        22(2):199–210, 2011.
     Conference on Machine Learning, pages 448–456, 2015.                      [83] S. J. Pan and Q. Yang. A survey on transfer learning. IEEE
[57] P. Isola, J.-Y. Zhu, T. Zhou, and A. A. Efros. Image-to-image                  Transactions on knowledge and data engineering, 22(10):1345–1359,
     translation with conditional adversarial networks. arXiv preprint              2010.
     arXiv:1611.07004, 2016.                                                   [84] V. M. Patel, R. Gopalan, R. Li, and R. Chellappa. Visual domain
[58] M. Kan, S. Shan, and X. Chen. Bi-shifting auto-encoder for unsuper-            adaptation: A survey of recent advances. IEEE signal processing
     vised domain adaptation. In Proceedings of the IEEE International              magazine, 32(3):53–69, 2015.
     Conference on Computer Vision, pages 3846–3854, 2015.                     [85] K.-C. Peng, Z. Wu, and J. Ernst. Zero-shot deep domain adaptation.
[59] T. Kim, M. Cha, H. Kim, J. Lee, and J. Kim. Learning to discover cross-        arXiv preprint arXiv:1707.01922, 2017.
     domain relations with generative adversarial networks. arXiv preprint     [86] X. Peng, J. Hoffman, X. Y. Stella, and K. Saenko. Fine-to-coarse
     arXiv:1703.05192, 2017.                                                        knowledge transfer for low-res image classification. In Image Process-
[60] A. Kolesnikov and C. H. Lampert. Seed, expand and constrain: Three             ing (ICIP), 2016 IEEE International Conference on, pages 3683–3687.
     principles for weakly-supervised image segmentation. In European               IEEE, 2016.
     Conference on Computer Vision, pages 695–711. Springer, 2016.             [87] X. Peng and K. Saenko. Synthetic to real adaptation with deep genera-
[61] P. Kontschieder, M. Fiterau, A. Criminisi, and S. Rota Bulo. Deep              tive correlation alignment networks. arXiv preprint arXiv:1701.05524,


<!-- PK PAGE 19 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                                                                                                19
      2017.                                                                            learning. In AAAI, pages 2604–2610, 2017.
 [88] A. Raj, V. P. Namboodiri, and T. Tuytelaars. Subspace alignment based      [115] Y. Tang, J. Wang, B. Gao, E. Dellandréa, R. Gaizauskas, and L. Chen.
      domain adaptation for rcnn detector. arXiv preprint arXiv:1507.05578,            Large scale semi-supervised object detection using visual and semantic
      2015.                                                                            knowledge transfer. In Proceedings of the IEEE Conference on
 [89] S.-A. Rebuffi, H. Bilen, and A. Vedaldi. Learning multiple visual                Computer Vision and Pattern Recognition, pages 2119–2128, 2016.
      domains with residual adapters. arXiv preprint arXiv:1705.08045,           [116] J.-C. Tsai and J.-T. Chien. Adversarial domain separation and adapta-
      2017.                                                                            tion. In Machine Learning for Signal Processing (MLSP), 2017 IEEE
 [90] S. Reed, Z. Akata, X. Yan, L. Logeswaran, B. Schiele, and H. Lee.                27th International Workshop on, pages 1–6. IEEE, 2017.
      Generative adversarial text to image synthesis.          arXiv preprint    [117] E. Tzeng, C. Devin, J. Hoffman, C. Finn, P. Abbeel, S. Levine,
      arXiv:1605.05396, 2016.                                                          K. Saenko, and T. Darrell. Adapting deep visuomotor representations
 [91] S. Ren, K. He, R. Girshick, and J. Sun. Faster r-cnn: Towards real-time          with weak pairwise constraints. CoRR, vol. abs/1511.07111, 2015.
      object detection with region proposal networks. In Advances in neural      [118] E. Tzeng, J. Hoffman, T. Darrell, and K. Saenko. Simultaneous
      information processing systems, pages 91–99, 2015.                               deep transfer across domains and tasks. In Proceedings of the IEEE
 [92] M. Rochan and Y. Wang. Weakly supervised localization of novel ob-               International Conference on Computer Vision, pages 4068–4076, 2015.
      jects using appearance transfer. In Proceedings of the IEEE Conference     [119] E. Tzeng, J. Hoffman, K. Saenko, and T. Darrell. Adversarial
      on Computer Vision and Pattern Recognition, pages 4315–4324, 2015.               discriminative domain adaptation. arXiv preprint arXiv:1702.05464,
 [93] O. Ronneberger, P. Fischer, and T. Brox. U-net: Convolutional networks           2017.
      for biomedical image segmentation. In International Conference on          [120] E. Tzeng, J. Hoffman, N. Zhang, K. Saenko, and T. Darrell. Deep
      Medical Image Computing and Computer-Assisted Intervention, pages                domain confusion: Maximizing for domain invariance. arXiv preprint
      234–241. Springer, 2015.                                                         arXiv:1412.3474, 2014.
 [94] S. Rota Bulo and P. Kontschieder. Neural decision forests for semantic     [121] D. Ulyanov, A. Vedaldi, and V. Lempitsky. Improved texture networks:
      image labelling. In Proceedings of the IEEE Conference on Computer               Maximizing quality and diversity in feed-forward stylization and tex-
      Vision and Pattern Recognition, pages 81–88, 2014.                               ture synthesis. arXiv preprint arXiv:1701.02096, 2017.
 [95] A. Rozantsev, M. Salzmann, and P. Fua. Beyond sharing weights for          [122] P. Vincent, H. Larochelle, I. Lajoie, Y. Bengio, and P.-A. Manzagol.
      deep domain adaptation. arXiv preprint arXiv:1603.06432, 2016.                   Stacked denoising autoencoders: Learning useful representations in a
 [96] A. A. Rusu, N. C. Rabinowitz, G. Desjardins, H. Soyer, J. Kirkpatrick,           deep network with a local denoising criterion. Journal of Machine
      K. Kavukcuoglu, R. Pascanu, and R. Hadsell. Progressive neural                   Learning Research, 11(Dec):3371–3408, 2010.
      networks. arXiv preprint arXiv:1606.04671, 2016.                           [123] R. Volpi, P. Morerio, S. Savarese, and V. Murino. Adversarial feature
 [97] K. Saenko, B. Kulis, M. Fritz, and T. Darrell. Adapting visual category          augmentation for unsupervised domain adaptation. arXiv preprint
      models to new domains. In European conference on computer vision,                arXiv:1711.08561, 2017.
      pages 213–226. Springer, 2010.                                             [124] C. Wang and S. Mahadevan. Heterogeneous domain adaptation
 [98] K. Saito, Y. Ushiku, and T. Harada. Asymmetric tri-training for                  using manifold alignment. In IJCAI proceedings-international joint
      unsupervised domain adaptation. arXiv preprint arXiv:1702.08400,                 conference on artificial intelligence, volume 22, page 1541, 2011.
      2017.                                                                      [125] L. Wang, V. A. Sindagi, and V. M. Patel. High-quality facial photo-
 [99] K. Saito, K. Watanabe, Y. Ushiku, and T. Harada. Maximum classi-                 sketch synthesis using multi-adversarial networks. arXiv preprint
      fier discrepancy for unsupervised domain adaptation. arXiv preprint              arXiv:1710.10182, 2017.
      arXiv:1712.02560, 2017.                                                    [126] X. Wang, X. Duan, and X. Bai. Deep sketch feature for cross-domain
[100] S. Sankaranarayanan, Y. Balaji, A. Jain, S. N. Lim, and R. Chellappa.            image retrieval. Neurocomputing, 207:387–397, 2016.
      Learning from synthetic data: Addressing domain shift for semantic         [127] Y. Xia, D. Huang, and Y. Wang. Detecting smiles of young children
      segmentation. 2017.                                                              via deep transfer learning. In Proceedings of the IEEE Conference on
[101] L. Shao, F. Zhu, and X. Li. Transfer learning for visual categorization:         Computer Vision and Pattern Recognition, pages 1673–1681, 2017.
      A survey. IEEE transactions on neural networks and learning systems,       [128] T. Xiao, H. Li, W. Ouyang, and X. Wang. Learning deep feature repre-
      26(5):1019–1034, 2015.                                                           sentations with domain guided dropout for person re-identification. In
[102] J. Shen, Y. Qu, W. Zhang, and Y. Yu. Wasserstein distance guided                 Proceedings of the IEEE Conference on Computer Vision and Pattern
      representation learning for domain adaptation. 2017.                             Recognition, pages 1249–1258, 2016.
[103] W. Shimoda and K. Yanai. Distinct class-specific saliency maps for         [129] M. Xie, N. Jean, M. Burke, D. Lobell, and S. Ermon. Transfer learning
      weakly supervised semantic segmentation. In European Conference on               from deep features for remote sensing and poverty mapping. 2015.
      Computer Vision, pages 218–234. Springer, 2016.                            [130] H. Yan, Y. Ding, P. Li, Q. Wang, Y. Xu, and W. Zuo. Mind the class
[104] A. Shrivastava, T. Pfister, O. Tuzel, J. Susskind, W. Wang, and R. Webb.         weight bias: Weighted maximum mean discrepancy for unsupervised
      Learning from simulated and unsupervised images through adversarial              domain adaptation. arXiv preprint arXiv:1705.00609, 2017.
      training. arXiv preprint arXiv:1612.07828, 2016.                           [131] Z. Yi, H. Zhang, P. T. Gong, et al. Dualgan: Unsupervised dual learning
[105] X. Shu, G.-J. Qi, J. Tang, and J. Wang. Weakly-shared deep transfer              for image-to-image translation. arXiv preprint arXiv:1704.02510, 2017.
      networks for heterogeneous-domain knowledge propagation. In Pro-           [132] D. Yoo, N. Kim, S. Park, A. S. Paek, and I. S. Kweon. Pixel-level
      ceedings of the 23rd ACM international conference on Multimedia,                 domain transfer. In European Conference on Computer Vision, pages
      pages 35–44. ACM, 2015.                                                          517–532. Springer, 2016.
[106] K. Simonyan and A. Zisserman. Very deep convolutional networks for         [133] J. Yosinski, J. Clune, Y. Bengio, and H. Lipson. How transferable are
      large-scale image recognition. arXiv preprint arXiv:1409.1556, 2014.             features in deep neural networks? In Advances in neural information
[107] K. Sohn, S. Liu, G. Zhong, X. Yu, M.-H. Yang, and M. Chandraker.                 processing systems, pages 3320–3328, 2014.
      Unsupervised domain adaptation for face recognition in unlabeled           [134] W. Zellinger, T. Grubinger, E. Lughofer, T. Natschläger, and
      videos. arXiv preprint arXiv:1708.02191, 2017.                                   S. Saminger-Platz. Central moment discrepancy (cmd) for domain-
[108] B. Sun, J. Feng, and K. Saenko. Return of frustratingly easy domain              invariant representation learning. arXiv preprint arXiv:1702.08811,
      adaptation. In AAAI, volume 6, page 8, 2016.                                     2017.
[109] B. Sun and K. Saenko. Deep coral: Correlation alignment for deep           [135] H. Zhang, T. Xu, H. Li, S. Zhang, X. Huang, X. Wang, and D. Metaxas.
      domain adaptation. In Computer Vision–ECCV 2016 Workshops, pages                 Stackgan: Text to photo-realistic image synthesis with stacked genera-
      443–450. Springer, 2016.                                                         tive adversarial networks. In IEEE Int. Conf. Comput. Vision (ICCV),
[110] C. Szegedy, W. Liu, Y. Jia, P. Sermanet, S. Reed, D. Anguelov,                   pages 5907–5915, 2017.
      D. Erhan, V. Vanhoucke, and A. Rabinovich. Going deeper with               [136] J. Zhang, Z. Ding, W. Li, and P. Ogunbona. Importance weighted
      convolutions. In Proceedings of the IEEE conference on computer                  adversarial nets for partial domain adaptation.         arXiv preprint
      vision and pattern recognition, pages 1–9, 2015.                                 arXiv:1803.09210, 2018.
[111] Y. Taigman, A. Polyak, and L. Wolf. Unsupervised cross-domain image        [137] J. Zhang, W. Li, and P. Ogunbona. Transfer learning for cross-dataset
      generation. arXiv preprint arXiv:1611.02200, 2016.                               recognition: A survey. 2017.
[112] Y. Taigman, M. Yang, M. Ranzato, and L. Wolf. Deepface: Closing the        [138] L. Zhang, Z. He, and Y. Liu. Deep object recognition across do-
      gap to human-level performance in face verification. In Proceedings              mains based on adaptive extreme learning machine. Neurocomputing,
      of the IEEE conference on computer vision and pattern recognition,               239:194–203, 2017.
      pages 1701–1708, 2014.                                                     [139] X. Zhang, F. X. Yu, S.-F. Chang, and S. Wang. Deep transfer network:
[113] B. Tan, Y. Song, E. Zhong, and Q. Yang. Transitive transfer learning.            Unsupervised domain adaptation. arXiv preprint arXiv:1503.00591,
      In Proceedings of the 21th ACM SIGKDD International Conference                   2015.
      on Knowledge Discovery and Data Mining, pages 1155–1164. ACM,              [140] Y. Zhang, P. David, and B. Gong. Curriculum domain adaptation for
      2015.                                                                            semantic segmentation of urban scenes. In The IEEE International
[114] B. Tan, Y. Zhang, S. J. Pan, and Q. Yang. Distant domain transfer


<!-- PK PAGE 20 doc=math_p11 -->
Manuscript accepted by Neurocomputing 2018                                          20
      Conference on Computer Vision (ICCV), volume 2, page 6, 2017.
[141] W. Zhao, W. Xu, M. Yang, J. Ye, Z. Zhao, Y. Feng, and Y. Qiao. Dual
      learning for cross-domain image captioning. In Proceedings of the 2017
      ACM on Conference on Information and Knowledge Management,
      pages 29–38. ACM, 2017.
[142] J. T. Zhou, I. W. Tsang, S. J. Pan, and M. Tan. Heterogeneous domain
      adaptation for multiple classes. In Artificial Intelligence and Statistics,
      pages 1095–1103, 2014.
[143] J.-Y. Zhu, T. Park, P. Isola, and A. A. Efros. Unpaired image-to-image
      translation using cycle-consistent adversarial networks. arXiv preprint
      arXiv:1703.10593, 2017.
[144] F. Zhuang, X. Cheng, P. Luo, S. J. Pan, and Q. He. Supervised
      representation learning: Transfer learning with deep autoencoders. In
      IJCAI, pages 4119–4125, 2015.
<!-- PK END doc=math_p11 -->
