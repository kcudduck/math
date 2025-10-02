PKvNext Document

KEY: math_p6 | math |  | 453a1018 | 12 | /papers/Cross-DomainStructurePreservingProjectionforHeterogeneousDomainAdaptation.pdf
<!-- PK START doc=math_p6 -->


<!-- PK PAGE 1 doc=math_p6 -->
Pattern Recognition 123 (2022) 108362
                                                               Contents lists available at ScienceDirect
                                                                  Pattern Recognition
                                                        journal homepage: www.elsevier.com/locate/patcog
Cross-domain structure preserving projection for heterogeneous
domain adaptation
Qian Wang∗, Toby P. Breckon
Department of Computer Science, Durham University, UK
a r t i c l e        i n f o                            a b s t r a c t
Article history:                                        Heterogeneous Domain Adaptation (HDA) addresses the transfer learning problems where data from the
Received 25 December 2020                               source and target domains are of different modalities (e.g., texts and images) or feature dimensions (e.g.,
Revised 25 September 2021
                                                        features extracted with different methods). It is useful for multi-modal data analysis. Traditional domain
Accepted 2 October 2021
                                                        adaptation algorithms assume that the representations of source and target samples reside in the same
Available online 9 October 2021
                                                        feature space, hence are likely to fail in solving the heterogeneous domain adaptation problem. ConKeywords:                                               temporary state-of-the-art HDA approaches are usually composed of complex optimization objectives for
Heterogeneous domain adaptation                         favourable performance and are therefore computationally expensive and less generalizable. To address
Cross-domain projection                                 these issues, we propose a novel Cross-Domain Structure Preserving Projection (CDSPP) algorithm for
Image classiﬁcation                                     HDA. As an extension of the classic LPP to heterogeneous domains, CDSPP aims to learn domain-speciﬁc
Text classiﬁcation                                      projections to map sample features from source and target domains into a common subspace such that
                                                        the class consistency is preserved and data distributions are suﬃciently aligned. CDSPP is simple and has
                                                        deterministic solutions by solving a generalized eigenvalue problem. It is naturally suitable for supervised
                                                        HDA but has also been extended for semi-supervised HDA where the unlabelled target domain samples
                                                        are available. Extensive experiments have been conducted on commonly used benchmark datasets (i.e.
                                                        Oﬃce-Caltech, Multilingual Reuters Collection, NUS-WIDE-ImageNet) for HDA as well as the Oﬃce-Home
                                                        dataset ﬁrstly introduced for HDA by ourselves due to its signiﬁcantly larger number of classes than the
                                                        existing ones (65 vs 10, 6 and 8). The experimental results of both supervised and semi-supervised HDA
                                                        demonstrate the superior performance of our proposed method against contemporary state-of-the-art
                                                        methods.
                                                                                                                           © 2021 Elsevier Ltd. All rights reserved.
1. Introduction                                                                         ferent and the models trained with source domain data are not
                                                                                        directly applicable to the target domain [25].
    Supervised learning can achieve good performance given con-                              Since domain adaptation is a promising solution to the trainsiderable amounts of labelled data for training. One essential fac-                     ing data sparsity issue in many real-world applications, it has been
tor accounting for the recent successes in deep learning and im-                        studied in a variety of research tasks including image classiﬁcaage classiﬁcation is the ImageNet database which contains more                          tion [33], semantic segmentation [41], depth estimation [2], speech
than 14 million hand-annotated images [8]. However, there ex-                           emotion recognition [42], text classiﬁcation [44] and many others.
ist many tasks in real-world applications where suﬃcient labelled                            Domain adaptation approaches aim to model the domain shift
data are not available, hence the performance of traditional super-                     between source and target domains and reduce the discrepancy by
vised learning approaches can degrade signiﬁcantly. One promising                       aligning the data distributions [32,33]. In the scope of classiﬁcatechnique alleviating this problem is transfer learning which aims                      tion problems, this is usually boiled down to aligning the marginal
to transfer knowledge learned from the source domain to the tar-                        and class conditional distributions across domains [3,31]. However,
get domain in which labelled data are sparse and expensive to col-                      most existing works are based on the assumption of homogeneity,
lect [35]. In many scenarios, domain adaptation is required since                       i.e., the source and target data are represented in the same feature
the data distributions in the source and target domains can be dif-                     space with unaligned distributions [32,33,40,41]. These approaches
                                                                                        may not be applicable in situations where the source and target
                                                                                        domains are heterogeneous in the forms of data modalities (e.g.,
  ∗
    Corresponding author.                                                               texts vs images) or representations (e.g., features extracted with
    E-mail      addresses:       qian.wang@durham.ac.uk           (Q.       Wang),      different methods).
toby.breckon@durham.ac.uk (T.P. Breckon).
https://doi.org/10.1016/j.patcog.2021.108362
0031-3203/© 2021 Elsevier Ltd. All rights reserved.


<!-- PK PAGE 2 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                         Pattern Recognition 123 (2022) 108362
    Attempts have been made to extend the success of domain                 approaches to HDA can be roughly categorized into cross-domain
adaptation approaches to the HDA problems, however, it is non-              mapping and common subspace learning.
trivial for the common subspace learning methods due to the heterogeneous feature spaces across the source and target domains.
                                                                            2.1. Cross-domain mapping
One common solution to such extension is to learn two domainspeciﬁc projections instead of one uniﬁed projection for the source
                                                                                Cross-domain mapping approaches learn a projection from the
and target domains in HDA problems [19,30]. Nevertheless, there
                                                                            source to the target domain. The projection can be learned for eiare at least two limitations in these existing methods. One is most
                                                                            ther feature transformation [15,27] or model parameter transformaof them use Maximum Mean Discrepancy (MMD) as the objec-
                                                                            tion (e.g., SVM weights [24,44]). Feature transformation approaches
tive to learn the projection matrices. MMD based objectives have
                                                                            learn a projection to map the source data into the target data
been outperformed by more recent ones based on locality preserv-
                                                                            by aligning the data distribution [15] or the second-order moing projection [18,32] in homogeneous domain adaptation. In HDA
                                                                            ment [27]. As a result, the transformed source data can help to
problems, locality preserving objectives have not been well ex-
                                                                            learn a classiﬁer for the target domain. To avoid mapping a lowerplored despite some attempts in [19,30]. In this paper, we present
                                                                            dimensional feature to a higher-dimensional space, PCA is usually
a succinct yet effective algorithm by extending the locality preserv-
                                                                            employed to learn subspaces for both domains respectively [15] as
ing objectives for heterogeneous domain adaptation. The other lim-
                                                                            a pre-processing which can suffer from information loss.
itation of existing HDA approaches is the way how they exploit the
                                                                                Model parameter transformation approaches focus mainly on
unlabelled target-domain data are sub-optimal. In our work, we
                                                                            SVM classiﬁer weights. For a multi-class classiﬁcation problem,
propose a novel selective pseudo-labelling strategy to take advan-
                                                                            one-vs-all classiﬁers are learned for source and target domains
tage of the unlabelled target-domain data. The selection is based
                                                                            using the respective labelled samples. Subsequently, the crosson the classiﬁcation conﬁdence and applies to a variety of classiﬁ-
                                                                            domain mapping is learned from the paired class-level weight veccation models (e.g., Nearest Neighbour, SVM and Neural Networks).
                                                                            tors [24,44]. Since the number of classes is far less than the num-
    Speciﬁcally, we address the heterogeneous domain adaptation
                                                                            ber of samples, these approaches are more computationally eﬃ-
problem where the source and target data are represented in het-
                                                                            cient but rely too much on the learned classiﬁers and overlooked
erogeneous feature spaces. Following the same spirits of previous
                                                                            abundant information underlying the data distribution.
domain adaptation approaches [31–33], we try to learn a common latent subspace where both source and target data can be
projected and well aligned in the learnt subspace. Speciﬁcally,             2.2. Common subspace learning
we learn domain-speciﬁc projections using a novel Cross-Domain
Structure Preserving Projection (CDSPP) algorithm which is an ex-               Common subspace learning is a more popular strategy for HDA.
tension of the classic Locality Preserving Projection (LPP) algorithm       It learns domain-speciﬁc projections which map source and target
[13]. CDSPP can facilitate class consistency preserving to learn            domain data into a common subspace. To this end, different apdomain-speciﬁc projections which can be used to map heteroge-               proaches have been proposed with varying algorithms, e.g., Manneous data representations into a common subspace for recogni-              ifold Alignment [10,20,30,36], Canonical Correlation Analysis [37],
tion. CDSPP is simple yet effective in solving the heterogeneous            Coding Space Learning [9,19,21], Deep Matrix Completion [16] and
domain adaptation problem as empirically validated by our experi-           Deep Neural Networks [38,43]. Despite the diversity of implemenmental results on several benchmark datasets. To take advantage of          tation, the main objective of common subspace learning based
the unlabelled target-domain data in the semi-supervised HDA set-           HDA is similar, i.e., the alignment of the source and target domains.
ting, a selective pseudo-labelling strategy is employed to progres-             To align the distributions, [15,16,19–21] chose to minimize the
sively optimise the projections and target data label predictions.          Maximum Mean Discrepancy (MMD) in their objectives which,
The contributions of this work can be summarised as follows:                however, can only align the means of domains (for marginal dis-
                                                                            tributions) and the means of classes (for conditional distributions).
   - A novel Cross-Domain Structure Preserving Projection algo-             As a result, the subspace learned via minimizing the MMD is not
      rithm is proposed for heterogeneous domain adaptation and             suﬃciently discriminative. One alternative to MMD is the manifold
      the algorithm has a concise solution by solving a generalized         learning using graph Laplacian [19,20,30].
      eigenvalue problem;                                                       Li et al. [23] proposed a Heterogeneous Feature Augmentation
   - The proposed CDSPP algorithm is naturally for supervised               (HFA) method and its semi-supervised version SHFA by learning
      HDA and we extend it to solve the semi-supervised HDA                 domain-speciﬁc projections and a classiﬁer (i.e. SVM) simultane-
      problems by employing an iterative pseudo-labelling ap-               ously. However, the computational complexity is O (n3 ), where n is
      proach;                                                               the number of labelled samples and makes it extremely slow when
   - We validate the effectiveness of the proposed method on                n is large. Li et al. [21] learned new feature representations for
      several benchmark datasets including the newly introduced             source and target data by encoding them with a shared codebook
      Oﬃce-Home which contains much more classes than the                   which requires the original features have the same dimensions for
      previously used ones; the experimental results provide ev-            source and target domains. PCA was employed for this purpose as
      idence our algorithm outperforms prior art.                           a pre-processing but can suffer from information loss. Lately, the
                                                                            authors incorporated the learning of two domain-speciﬁc projec-
                                                                            tions (in place of PCA) into the coding framework [19]. This work
2. Related work                                                             is similar to ours in the sense of local consistency using the graph
                                                                            regularization, however, it fails to align cross-domain class consis-
    Most exiting research in domain adaptation for classiﬁcation            tency due to the use of k nearest neighbours to construct the simiis based on the assumption of homogeneity [17,18,32]. The ap-               larity graph. In our work, the similarity graph is constructed based
proaches are dedicated to either learning a domain-invariant fea-           on class consistency, hence promoting the cross-domain conditure extraction model (e.g., deep CNN [4,40]) or learning a uni-            tional distribution alignment.
ﬁed feature projection matrix [31–33] for all domains whilst nei-               Transfer Independently Together (TIT) was proposed in [20]. It
ther of them applies to HDA. In this section, we brieﬂy review              also learns domain-speciﬁc projections to align data distributions
related works on heterogeneous domain adaptation. The existing              in the learned common subspace. The algorithm was based on a
                                                                        2


<!-- PK PAGE 3 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                                        Pattern Recognition 123 (2022) 108362
collection of tricks including kernel space, MMD, sample reweight-                    neighbours. The edge weights can be determined by the heat kering and landmark selection. In contrast, our solution is concise                                               ||xi −x j ||2
$$
                                                                                      nel Wi j = e−   t  or the simple binary assignment (i.e. all edges
$$
with one simple objective of cross-domain structure preserving.
                                                                                      have the weights of 1). Note that LPP is an unsupervised learning
Recently, Huang et al. [14] proposed a novel algorithm, named
                                                                                      method without the need for labelling information. In the followheterogeneous discriminative features learning and label propaga-
                                                                                      ing subsection, we will describe how to extend the LPP algorithm
tion (HDL). This algorithm is similar to ours in that both tend
                                                                                      to solve the HDA problems where there exist two heterogeneous
to preserve structure information in the learned common sub-
                                                                                      domains and a mixture of labelled and unlabelled data.
space. However, different objectives have been formulated. Our
algorithm explicitly promotes the intra-class similarity for both
within-domain and cross-domain samples, whilst HDL fails to con-                      3.2. Cross-domain structure preserving projection
sider the intra-class similarity for samples from the same domain
in their formulation. In addition, different strategies of unlabelled                     The supervised version of LPP [34] was proved to be able to
target sample exploration were employed in two algorithms.                            learn a subspace of better separability than other dimensionality
    In summary, although manifold learning has been well studied                      reduction algorithms such as Linear Discriminant Analysis (LDA)
in HDA, the existing formulations for domain-speciﬁc projection                       [33]. One limitation of LPP is that it can only learn the subspace
learning are either ineﬃcient or ineffective. Our approach solves                     from samples represented in a homogeneous feature space. To
this issue and addresses the HDA problem with a novel CDSPP al-                       address this problem, we extend the traditional LPP so that its
gorithm.                                                                              favourable characteristics can beneﬁt cross-domain common sub-
                                                                                      space learning. Speciﬁcally, we aim to learn a projection matrix
$$
3. Method                                                                             Ps ∈ Rds ×d for the source domain and a projection matrix Pt ∈ Rdt ×d
$$
                                                                                      for the target domain to project the samples from source and tar-
    To facilitate our presentation, we ﬁrstly describe the heteroge-                  get domains into a common subspace whose dimensionality is d.
neous domain adaptation problem and notations used throughout                         We expect the samples projections are close to one another if they
$$
this paper. Given a labelled dataset D s = {(xsi , ysi )}, i = 1, 2, . . . , ns       are from the same class regardless of which domain they are from.
$$
$$
from the source domain S, and a labelled dataset Dt = {xti , yti }, i =               To this end, we have the following objective:
$$
$$
1, 2, . . . , nt from the target domain, xsi ∈ Rds and xti ∈ Rdt represent                              n s
$$
                                                                                      min           (i, j
                                                                                                          ||PsT xsi − PsT xsj ||22Wisj
                                                                                      Ps ,Pt
the feature vectors of ith labelled samples in the source and tar-                                  ns nt
get domains respectively; ds and dt are the dimensionalities of                                    + i           ||PsT xsi − PtT xtj ||22Wicj                                    (2)
                                                                                                              j
$$
the source and target features; ysi ∈ Y and yti ∈ Y denote the cor-                                + ni,tj ||PtT xti − PtT xtj ||22Witj )
$$
responding sample labels; ns and nt are the number of source and
$$
labelled target samples respectively. Let X s ∈ Rds ×ns and X t ∈ Rdt ×nt             where P T is the transpose of P ; W s ∈ Rns ×ns is the similarity mabe the feature matrices of labelled source and target data collec-                    trix of the source samples and Wisj = 1 if ysi = ysj , 0 otherwise. Simitively, supervised HDA aims to learn a model from labelled source                     lary, W t ∈ Rnt ×nt is the similarity matrix of the labelled target samand target data, which can be used to classify samples from an un-                    ples and Witj = 1 if yti = ytj , 0 otherwise. W c ∈ Rns ×nt is the crosslabelled dataset D u = {xui }, i = 1, 2, . . . , nu from the target domain,           domain similarity matrix and Wicj = 1 if ysi = ytj , 0 otherwise. It is
$$
$$
whose feature vectors can be collectively denoted as X u ∈ Rdt ×nu .                  noteworthy that all the feature vectors are l2-normalised to get
$$
    The number of labelled target samples nt is usually very small,                   rid of the effect of different magnitudes across features. This prehence it is diﬃcult to capture the data distribution in the target                    processing has been proved to be useful for common subspace
domain. Semi-supervised HDA takes advantage of the unlabelled                         learning in [32–34].
target samples X u during model training and can usually achieve
better performance.                                                                   Proposition 3.1. The objective in Eq. (2) can be reformulated as fol-
    In this section, we describe the CDSPP algorithm which is nat-                    lows:
urally for supervised heterogeneous domain adaptation but can be                                                 tr (X s T Ps PtT X t W c T )
used to address the semi-supervised heterogeneous domain adap-                        max                                                                                        (3)
tation problem by incorporating it into an iterative learning frame-
                                                                                      Ps ,Pt     tr (X Ps PsT X s Ls ) + tr (X t T Pt PtT X t Lt )
                                                                                                         sT
work [32,33] as shown in Fig. 1.
$$
                                                                                      where Ls = Ds − W s + 12 Dcs and Lt = Dt − W t + 12 Dct ; Ds ∈ Rns ×ns is
$$
                                                                                                                     
$$
                                                                                      a diagonal matrix with Dsii = nj s Wisj and Dt ∈ Rnt ×nt is a diago3.1. Locality preserving projection                                                                             n
$$
$$
                                                                                      nal matrix with Dtj j = i t Witj ; Dcs ∈ Rns ×ns is a diagonal matrix
$$
                                                                                                 nt c
$$
                                                                                      with Dii = j Wi j and D ∈ Rnt ×nt is a diagonal matrix with Dctj j =
$$
                                                                                            cs                  ct
    To make the paper self-contained, we brieﬂy describe the orig-                    ns c
inal LPP algorithm [13] before introducing our proposed CDSPP in                        i
                                                                                          Wi j .
the next subsection. Locality Preserving Projection (LPP) was proposed by He and Niyogi [13] to learn a favourable subspace where                      Proof. By ﬁrstly doing the binomial expansion then transforming
the local structures of data in the original feature space can be                     it to the form of matrix multiplication and trace of matrices, the
$$
well preserved. Suppose xi ∈ Rd0 and x j ∈ Rd0 are two data points                    ﬁrst term in Eq. (2) can be reformulated as follows:
$$
                                                                                      n s
in the original feature space, LPP aims at learning a projection ma-                     ||P T xs − PsT xsj ||22Wisj
$$
trix P ∈ Rd×d0 (d << d0 ) so that data points close to each other in                    ns s s Ti
$$
                                                                                          i, j
$$
                                                                                      =  i, j
$$
                                                                                              (xi Ps PsT xsi − 2xsi T Ps PsT xsj + xsj T Ps PsT xsj )Wisj
the original space will still be close in the projected subspace. The                                                                                                          (4)
$$
objective of LPP can be formulated as:                                                = 2 ni s xsi T Ps PsT xsi Dsii − 2 ni,sj xsi T Ps PsT xsjWisj
$$
$$
                                                                                     = 2tr (X s T Ps PsT X s Ds ) − 2tr (X s T Ps PsT X sW s )
$$
min          ||P T xi − P T x j ||22Wi j ,                                 (1)
 P
      i, j                                                                                  In the similar way, the third term in Eq. (2) can be rewritten
                                                                                      as:
where W is the adjacency matrix of the graph constructed by all                       nt
the data points. According to He and Niyogi [13], the edges of                            ||PtT xti − PtT xtj ||22Witj
                                                                                          i, j
                                                                                                                                                                                 (5)
the graph can be created by either  −neighbourhoods or k-nearest                               T                          T
$$
                                                                                      = 2tr (X t Pt PtT X t Dt ) − 2tr (X t Pt PtT X t W t )
$$
                                                                                  3


<!-- PK PAGE 4 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                                          Pattern Recognition 123 (2022) 108362
Fig. 1. An illustration of the heterogeneous domain adaptation problem and our proposed approach using cross-domain structure preserving projection. Left: the HDA
problem aims at recognizing unlabelled target-domain samples with the access of labelled source-domain samples and limited labelled target-domain samples. Right: The
red and the blue colours are used to represent the feature vectors of samples in the target and source domains respectively; markers of different shapes represent samples
from different classes; dashed markers represent unlabelled samples; our proposed CDSPP iteratively learn a common subspace in which the unlabelled target-domain
samples are pseudo-labelled and selectively added to the training data set to promote the subspace learning in the next iteration. (For interpretation of the references to
colour in this ﬁgure legend, the reader is referred to the web version of this article.)
     The second term in Eq. (2) can be rewritten as:                                          Let
ns nt
             ||                   ||
             PsT xsi − PtT xtj 22Wicj                                                                                   tr (PtT ScT Ps )
  i    j
$$
  n s                                                                                 J (Ps , Pt ) =                                                                            (11)
$$
$$
= i        nt
$$
                  (
               xsi T Ps PsT xsi − 2xsi T Ps PtT xtj                                                          tr (           ) + tr (PtT St Pt )
                                                                                                                    PsT Ss Ps
           j
                        T
                  +xtj Pt PtT xtj Wicj )                                                be the objective function in Eq. (3), we calculate the partial deriva-
  n s s T                                                                            tives [26] of J w.r.t. Ps and Pt respectively, set them to 0 and get
$$
= i xi Ps PsT xsi Dcs    ii
$$
                            − 2 ni s nj t xsi T Ps PtT xtjWicj                (6)
                               T                                                       the following equations:
                  + nj t xtj Pt PtT xtj Dctj j
         (                  )          (
$$
= tr X s Ps PsT X s Dcs − 2tr X s T Ps PtT X t W c T
$$
         T
                                                           )                                                2tr (PtT Sc Ps )
$$
                                                                                        Sc Pt =                                       Ss Ps                                      (12)
$$
                        (     T
                  +tr X t Pt PtT X t Dct               )                                            tr (PsT Ss Ps ) + tr (PtT St Pt )
Substitute Eqs. (4)–(6) into the objective Eq. (2), we have the fol-                                           2tr (PtT Sc Ps )
$$
                                                                                        ScT Ps =                                       St Pt                                     (13)
$$
lowing form of objective:                                                                           tr (           ) + tr (PtT St Pt )
                                                                                                           PsT Ss Ps
                                              T
min tr (X s Ps PsT X s Ls ) + tr (X t Pt PtT X t Lt )
                  T                                                                     Note that the coeﬃcients on the right side of Eqs. (12)-(13) are exPs ,Pt                                                                       (7)       actly the objective in Eq. (11). It is easy to construct the following
−tr (X s T Ps PtT X t W c T )                                                           generalized eigenvalue problem by combining Eqs. (12)-(13):
                                                                                                                                 
$$
where Ls = Ds − W s + 12 Dcs and Lt = Dt − W t + 12 Dct .                                   0       Sc      Ps   S              0     Ps
$$
$$
                                                                                                               = s                       .                                      (14)
$$
   Minimizing the objective in Eq. (7) is equivalent to maximizing                          ScT     0       Pt   0              St    Pt
the objective in Eq. (3). 
                                                                                        The maximum objective is given by the largest eigenvalue solution
Proposition 3.2. The objective in Eq. (3) is equivalent to the follow-                  to the generalized eigenvalue problem [13] and the eigenvectors
ing generalized
           eigenvalue problem and the optimal projection ma-                          corresponding to the largest d eigenvalues will form the projection
           P                                                                            matrix Ps and Pt . 
$$
trix P = s can be formed by d eigenvectors corresponding to the
$$
           Pt
largest d eigenvalues:                                                                  3.3. Recognition in the subspace
$$
AP = (B + α I )P                                                             (8)           Once the projection matrices Ps and Pt are learned, we are able
$$
$$
where I ∈ R(ns +nt )×(ns +nt ) is an identity matrix,            α is a hyper-          to project all the labelled samples into the learned common subparameter for regularization [34],  is a diagonal eigenvalue matrix                    space by zis = PsT xsi and zti = PtT xti . Similar to the pre-processing for
$$
and                                                                                     the training data, the feature vectors x need to be l2-normalised
                                          T
                                                                                       before being projected to the subspace. For the same reason, we
       0                    X sW c X t
$$
A=                                                 ,                          (9)       also apply l2-normalisation to the projected vectors z. The l2-
$$
   X tW cT X sT                 0                                                       normalisation re-allocates the projected vectors in the subspace to
                                                                                      the surface of a hyper-sphere which will beneﬁt the measurement
$$
   X s Ls X s T              0                                                          of distances when do the recognition using the nearest neighB=                                 T .                                       (10)       bour method. More importantly, the l2-normalisation adds non-
$$
        0               X t Lt X t
                                                                                        linearity to the process so that our proposed CDSPP method can
Proof. To make the proof process concise, we introduce notations                        handle practical problems when linear projection assumptions do
                                   T                   T
$$
Ss = X s Ls X s T , St = X t Lt X t and Sc = X sW c X t .                               not hold.
$$
                                                                                    4


<!-- PK PAGE 5 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                          Pattern Recognition 123 (2022) 108362
$$
   For each class, we calculate the class mean z̄c for c = 1, 2, . . . , C             Algorithm 2 Semi-supervised HDA using CDSPP.
$$
using all the labelled sample from both source and target domains.
$$
                                                                                       Input: labelled source data set D s = {(xsi , ysi )}, i = 1, 2, . . ., ns , laGiven an unlabelled target sample xu , we classify it to the closest
$$
$$
                                                                                           belled target data set Dt = {xti , yti }, i = 1, 2, . . ., nt , unlabelled
$$
class in terms of its Euclidean distances to the class means:
$$
                                                                                           target data set D u = {xui }, i = 1, 2, . . ., nu the dimensionality of
$$
                                                                                           subspace d, number of iteration T .
$$
y∗ = arg minc d (z̄c , PtT xu )                                           (15)
$$
                                                                                       Output: The projection matrix Ps and Pt for source and target doThe proposed CDSPP for supervised HDA is summarized in                                     mains, the labels predicted for unlabelled target data X u .
Algorithm 1.                                                                           Training:
$$
                                                                                        1: Initialize k=1;
$$
                                                                                                                     (0 )
                                                                                        2: Learn the projection Ps        and Pt(0 ) using labelled data D s ∪ Dt
Algorithm 1 Supervised HDA using CDSPP.                                                    by solving the generalized eigenvalue problem in Eq.(8);
$$
Input: labelled source data set D s = {(xsi , ysi )}, i = 1, 2, . . ., ns and           3: Get the unlabelled target data set D u ;
$$
$$
    labelled target data set Dt = {xti , yti }, i = 1, 2, . . ., nt , the dimen-        4: while k ≤ T do
$$
    sionality of subspace d.                                                            5:    Label all the samples from D u by Eq.(15);
Output: The projection matrix Ps and Pt for source and target do-                       6:    Select a subset of (top knu /T most conﬁdent) pseudo-
$$
    mains, the labels predicted for unlabelled target data X u .                              labelled target samples S (k ) ⊆ D u ;
$$
Training:                                                                               7:    Learn Ps(k ) and Pt(k ) using a combination of labelled and
 1: Learn the projection Ps and Pt using labelled data D s ∪ Dt by                            pseudo-labelled data sets D s ∪ Dt ∪ S (k ) ;
$$
    solving the generalized eigenvalue problem in Eq.(8);                               8:    k ← k + 1;
$$
Testing:                                                                                9: end while
 2: Claessify unlabelled target samples X u using Eq.(15).                             Testing:
                                                                                       10: Classify unlabelled target samples X u using Eq. (15).
   Relation to DAMA The CDSPP algorithm is quite similar to
DAMA proposed in [30] at the ﬁrst glance, however, they are es-
                                                                                       4. Experiments
sentially different from each other in that CDSPP does not seek to
push the sample projections belonging to different classes apart,
                                                                                          To evaluate the effectiveness of the proposed method in hetsince the penalty imposed for this purpose (e.g., maximizing the
                                                                                       erogeneous domain adaptation, we conduct thorough experiments
term B in [30]) might misguide the solution to focus too much on
                                                                                       on commonly used benchmark datasets. We compare the proposed
the separation of classes which are originally close to each other
                                                                                       approach with existing HDA methods and analyze its sensitivity to
and hurt the overall separability of the learned subspace. In con-
                                                                                       hyper-parameters.
trast, our objective in Eq. (2) can guarantee the separability of
the learned subspace by promoting the preserving of cluster structures underlying the original data distributions, which is simpler                     4.1. Datasets and experimental settings
but more effective as validated by experiments.
                                                                                          Oﬃce-Caltech [11] is an image dataset containing four do-
                                                                                       mains: Amazon (A), Webcam (W), DSLR (D) and Caltech (C) from
3.4. Extending to semi-supervised HDA                                                  10 common classes. Two image features (i.e. 4096-dim Decaf6 and
                                                                                       800-dim SURF) are used for cross-domain adaptation. Multilingual
   The CDSPP algorithm is naturally suitable for supervised HDA                        Reuters Collection (MRC) [1] is a cross-lingual text classiﬁcation
but can be extended to semi-supervised HDA by incorporating it                         dataset containing 6 classes in 5 languages (i.e. EN, FR, GE, IT, SP).
into an iterative pseudo-labelling framework [33]. Given a set of                      We follow the settings in [15] extracting BoW features and applyunlabelled target samples X u , they can be labelled by Eq. (15). The                  ing PCA to get heterogeneous feature dimensions (i.e. 1131, 1230,
pseudo-labelled target samples can be used to update the projec-                       1417, 1041, 807 respectively) for ﬁve domains. In our experiments,
tion matrices Ps and Pt . However, when the domain shift is large                      SP serves as the target domain and the other four languages as the
and the number of labelled target samples is limited, the pseudo-                      source domains respectively. As a result, we have four HDA tasks.
labels can be wrong for a considerable number of target samples.                       NUS-WIDE [6] and ImageNet [8] datasets are employed for text to
In this case, the mistakenly pseudo-labelled target samples might                      image domain adaptation. Following [5] we consider 8 overlapping
hurt projection learning. To reduce this risk, conﬁdence aware                         classes using tag information represented by 64-dim features from
pseudo-labelling is proposed in [33]. We employ the same idea                          NUS-WIDE as the source domain and 4096-dim Decaf6 features of
and progressively select the most conﬁdently pseudo-labelled tar-                      images from ImageNet as the target domain. However, the above
get samples for the next iteration of CDSPP learning. The proposed                     datasets contain very limited numbers of classes and may not disCDSPP for semi-supervised HDA is summarized in Algorithm 2.                            criminate capabilities of different methods. We introduce Oﬃce-
                                                                                       Home [29] containing four domains (i.e. Art, Clipart, Product and
                                                                                       Real-world) as a new testbed for HDA. We use VGG16 [28] and
3.5. Complexity analysis                                                               ResNet50 [12] models pre-trained on ImageNet to extract 4096-
                                                                                       dim and 2048-dim features. More details of the datasets and pro-
    The time complexity of CDSPP is mainly contributed by two                          tocols used in our experiments are summarized in Table 1.
parts: the matrix multiplications in Eqs. (9)-(10) and the eigen decomposition problem. The complexity of matrix multiplications is                       4.2. Comparative methods
O ((ns + nt )ds dt ). The complexity of eigen decomposition is generally O ((ds + dt )3 ). As a result, the CDSPP algorithm has a complex-                    To evaluate the effectiveness of the proposed CDSPP in differity of O ((ns + nt )ds dt + (ds + dt )3 ). In the case of semi-supervised              ent HDA problems, we conduct a comparative study and compare
HDA, the time complexity will be increased by T times and the                          the performance of CDSPP with state-of-the-art methods in both
value of nt increases by the number of selected pseudo-labelled                        supervised and semi-supervised settings. Speciﬁcally, we comtarget samples in each iteration.                                                      pare with SVMt , HFA [23], CDLS_sup [15] and a variant of DAMA
                                                                                   5


<!-- PK PAGE 6 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                       Pattern Recognition 123 (2022) 108362
                                   Table 1
                                   The statistics of datasets (notations: LSS/c – labelled Source Samples per class; LTS/c –
                                   labelled Target Sample per class; UTS/c – Unlabelled Target Samples per class; all – all
                                   samples except the ones chosen as labelled target samples).
                                     Dataset           # Domain      # Task       # Class    # LSS/c   # LTS/c    # UTS/c
                                     Oﬃce-Caltech      4             16           10         20        3          all
                                     MRC               5             4            6          100       10         500
                                     NUS-ImageNet      2             1            8          100       3          100
                                     Oﬃce-Home         4             16           65         20        3          all
[30] under the supervised HDA setting (i.e. the unlabelled target                        employ different algorithms of transformation matrix learnsamples are not available during training).                                              ing (involving MMD, graph embedding and regularisation) and
                                                                                         different instance weight estimation strategies. The unlabelled
 • SVMt is a baseline method that trains an SVM model on the
                                                                                         target-domain data are also pseudo-labelled to optimize the
   target dataset Dt in a conventional supervised learning manner
                                                                                         transformation matrices iteratively.
   without using the source domain data.
                                                                                       • STN (Soft Transfer Network [38]) jointly learns a domain-shared
 • HFA (Heterogeneous Feature Augmentation [23]) is designed to
                                                                                         classiﬁer and a domain-invariant subspace in an end-to-end
   solve the supervised HDA problem by augmenting the original
                                                                                         manner. The network model is learned by optimising the ob-
   features xs , xt with transformed features P xs , Q xt and zero vec-
                                                                                         jective similar to those in the aforementioned works, i.e., MMD.
   tors. The projection matrices P and Q for the source and target
                                                                                         Besides, the unlabelled target-domain data are used by the soft-
   domains map the original features into a common subspace so
                                                                                         label strategy.
   that the similarity of features across two domains can be di-
                                                                                       • DDACL (Discriminative Distribution Alignment with Cross-
   rectly compared. The objective of learning P and Q is incorpo-
                                                                                         entropy Loss [39]) trains an adaptive classiﬁer by both reduc-
   rated into the framework of classiﬁer (i.e. SVM) training.
                                                                                         ing the distribution divergence and enlarging distances between
 • CDLS_sup (Cross-Domain Landmark Selection [15]) is the super-
                                                                                         class centroids.
   vised version of CDLS which aims to learn a projection matrix
                                                                                       • SSAN (Simultaneous Semantic Alignment Network [22]) em-
   A to map source-domain data into the target domain. The ob-
                                                                                         ploys an implicit semantic correlation loss to transfer the cor-
   jective is to align the cross-domain marginal and conditional
                                                                                         relation knowledge of source categorical prediction distribu-
   data distributions by minimizing the Maximum Mean Discrep-
                                                                                         tions to the target domain. A triplet-centroid alignment mech-
   ancy (MMD).
                                                                                         anism is explicitly applied to align feature representations for
 • DAMA_sup (Domain Adaptation Using Manifold Alignment [30])
                                                                                         each category by leveraging target pseudo-labels. Note that the
   is originally designed for semi-supervised HDA problems. Simi-
                                                                                         results of best accuracy of the test samples throughout the
   lar to our proposed CDSPP, it also aims to learn two projection
                                                                                         training process were reported in [22], we argue that this is
   matrices to map source and target domain data to a common
                                                                                         not achievable in practice since the labels of test samples are
   subspace where the manifolds of data from two domains are
                                                                                         not available during training. Instead, we report the results
   aligned. We adapt it for supervised HDA by considering only
                                                                                         achieved in the last iterations in our experiments.
   labelled data when constructing the feature similarity matrix
                                                                                       • DAMA+ is our adaptation of the original DAMA by incorpo-
   W , the label based similarity matrix W s and dissimilarity ma-
                                                                                         rating the DAMA algorithm into our proposed iterative learn-
   trix W d . Different from the suggestion in the original paper, we
                                                                                         ing framework with selective pseudo-labelling. Speciﬁcally, we
$$
   use an optimal μ = 0.1 throughout our experiments since this
$$
                                                                                         use the supervised version of DAMA described above to ini-
   setting achieves the best performance.
                                                                                         tialise the projection matrices and get the pseudo-labels of
   For semi-supervised HDA, we compare with DAMA [30], SHFA                              unlabelled target-domain data. The selected most conﬁdently
[23], CDLS [15], PA [19], TIT [20], STN [38], DDACL[39], SSAN                            pseudo-labelled target-domain data will contribute to the up-
[22] and DAMA+, our extension of DAMA by incorporating it into                           date of projection matrices in the next iteration of learning.
our iterative learning framework (c.f. Section 3.4).                                     Finally, the optimal projection matrices and predicted target-
                                                                                         domain data labels are obtained.
 • DAMA [30] is employed in the semi-supervised HDA experi-
                                                                                       • CDSPP+PCA is a variant of CDSPP by applying PCA to the
   ments in its original form except the hyper-parameter μ is set
                                                                                         original features and CDSPP is subsequently applied to the
   as 0.1 as our experimental results show empirically it gives the
                                                                                         low-dimensional features. This pre-processing is specially de-
   optimal performance.
                                                                                         signed for handcrafted features in the MRC and NUS-ImageNet
 • SHFA (Semi-supervised HFA [23]) is an extension of HFA. It
                                                                                         datasets and 50 principal components are reserved for all fea-
   takes advantage of the unlabelled target-domain data by re-
                                                                                         tures.
   placing the SVM in HFA with a Transductive SVM (T-SVM)
   [7] model.                                                                           In all experiments, we use the optimal parameters suggested in
 • CDLS [15] is designed for semi-supervised HDA. As described                      the original papers for the comparative methods if not otherwise
   above, it aims to learn a projection matrix A to map source-                     speciﬁed whilst set the hyper-parameters of CDSPP empirically as
$$
   domain data into the target domain so that cross-domain                          d equal to the number of classes in the dataset, α = 10 and T = 5.
$$
   data can be aligned. When unlabelled target-domain data are                      More details of hyper-parameter value selection will be discussed
   available in the semi-supervised HDA, the unlabelled data are                    later.
   pseudo-labelled by the supervised version CDLS_sup. Subse-
   quently, the pseudo-labelled data are used to update the pro-                    4.3. Comparison results
   jection A. The processes are repeated for multiple iterations.
   In particular, the instances are weighted by learnable weights                      Although there exist ﬁxed experimental protocols in terms of
   when constructing the objective function.                                        the number of labelled samples used for training as shown in
 • PA (Progressive Alignment [19]) and TIT (Transfer Indepen-                       Table 1, there is no standard data splits publicly available to fol-
   dently Together [20]) share a similar framework to CDLS but                      low. As will be demonstrated in our experimental results, selecting
                                                                              6


<!-- PK PAGE 7 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                         Pattern Recognition 123 (2022) 108362
                                 Table 2
                                 Mean(std) of classiﬁcation accuracy (%) over ten trials for cross-language and tag-to-image adap-
                                 tation under supervised (denoted by ∗) and semi-supervised settings (each column represents one
$$
                                 Source → Target adaptation task).
$$
$$
                                  Method                  EN→SP       FR→SP           GE→SP       IT→SP       Avg    Tag→Image
$$
                                  SVMt ∗                  67.0(2.4)   67.0(2.4)       67.0(2.4)   67.0(2.4)   67.0   60.6(6.0)
                                  HFA [23] ∗              68.1(3.0)   68.0(3.0)       68.0(3.0)   68.0(3.0)   68.0   67.5(2.5)
                                  CDLS_sup [15] ∗         63.0(3.6)   63.4(2.4)       64.0(2.2)   64.6(3.6)   63.8   66.3(3.9)
                                  DAMA_sup ∗              66.8(2.5)   66.3(3.3)       66.3(3.0)   66.7(2.7)   66.5   66.9(2.6)
                                  CDSPP_sup (Ours) ∗      67.2(2.8)   67.3(2.9)       67.3(2.9)   67.3(2.8)   67.3   67.2(3.0)
                                  DAMA [30]               67.0(2.5)   66.6(3.1)       66.7(3.0)   67.4(2.8)   66.9   67.0(2.5)
                                  SHFA [23]               66.9(3.7)   66.1(2.7)       67.5(3.1)   67.4(2.2)   67.0   68.1(2.7)
                                  CDLS [15]               69.4(3.0)   69.4(3.0)       69.4(3.2)   69.3(3.1)   69.4   69.6(2.1)
                                  PA [19]                 71.4(2.9)   71.6(2.9)       71.7(3.0)   72.3(2.5)   71.7   70.5(4.0)
                                  TIT [20]                67.1(2.8)   67.6(2.6)       66.1(3.5)   67.8(2.0)   67.2   70.7(3.4)
                                  STN [38]                67.1(3.6)   67.3(2.5)       66.9(3.5)   66.7(3.8)   67.0   74.3(5.2)
                                  DDACL [39]              70.2(3.0)   70.4(3.1)       70.8(3.0)   70.9(3.0)   70.6   73.8(2.8)
                                  SSAN [22]               69.9(2.9)   69.4(2.8)       69.3(4.0)   70.2(2.5)   69.7   71.4(1.2)
                                  DAMA +                  68.9(2.1)   68.8(4.0)       68.9(2.7)   68.2(3.5)   68.7   73.4(4.3)
                                  CDSPP (Ours)            69.1(3.2)   69.0(3.6)       68.8(3.2)   68.8(3.0)   68.9   74.7(3.4)
                                  CDSPP+PCA (Ours)        71.2(3.2)   71.7(3.1)       71.4(3.0)   72.1(3.0)   71.6   76.5(3.3)
different samples for training can lead to signiﬁcant performance                     HFA achieves the best performance of 67.5% as opposed to the acvariance. We generate data splits randomly in our experiments1 .                      curacy of 67.2% by our proposed CDSPP_sup. However, HFA is more
To mitigate the biases caused by the data selection, ten random                       computationally expensive than others as discussed in [23]. In the
data splits are generated for each adaptation task. We report the                     semi-supervised HDA setting, our method achieves the best performean and standard deviation of the classiﬁcation accuracy over                        mance with an accuracy of 74.7%. The performance of our CDSPP
these ten trials for each adaptation task. The results for all compar-                can be further improved to 76.5% when PCA is applied to reduce
ative methods are reproduced using the same data splits for a di-                     the dimensionality of the text features to 50.
rect comparison. The implementations released by the authors are                          Similar results can also be observed in Table 3 for the image
employed in our experiments. As a result, the results in this paper                   classiﬁcation experiments on Oﬃce-Caltech. Both HFA and our CDare not comparable with those reported in other papers since dif-                     SPP achieve the same average accuracy of 87.8% in the supervised
ferent sample selections have been used in our experiments. Our                       HDA setting. CDLS_sup performs worse than the baseline method
experimental results of both supervised and semi-supervised HDA                       SVM_t again due to the restricted PCA dimensions as discussed
on four datasets are shown inTables 2–5 from which we can obtain                      above. In the semi-supervised HDA, our CDSPP achieves the best
the following insights.                                                               results in 6 out of 16 adaptation tasks and has the highest average
    Table 2 (except the last column) lists the comparison results on                  accuracy of 92.6%.
the MRC dataset. The baseline method SVMt achieves an accuracy                            The experimental results for the challenging Oﬃce-Home
of 67.0% using only 10 labelled target domain samples per class                       dataset are shown in Tables 4 and 5. The difference between these
for training. The labelled source domain data can beneﬁt the per-                     two tables lies in the features used for the source/target domains
formance with proper domain adaptation but the improvement is                         are VGG16/ResNet50 and ResNet50/VGG16 respectively. In this exmarginal for both HFA and our proposed CDSPP. The supervised                          periment, the methods HFA and SHFA are excluded due to their
version of CDLS uses PCA to learn a subspace from the target do-                      extremely long computation time given the scale of this dataset.
main, hence the dimensionality of subspace cannot be higher than                      It can be seen that CDLS_sup, for the ﬁrst time, outperforms the
nt − 1. Due to such limitation, CDLS_sup performs worse than oth-                     baseline method SVMt on this dataset since the total number of
ers when the number of labelled target samples is small which is                      labelled target samples is 195 which no longer restricts the PCA
usually the case for HDA problems. For the semi-supervised HDA,                       dimension in this algorithm. Two more recent approaches DDACL
DAMA and SHFA perform no better than the baseline method SVMt                         [39] and SSAN [22], however, perform poorly on this more chalwhich was also observed in existing works [15,19,20]. The best per-                   lenging dataset although they achieve good performance on three
formance (71.7%) is achieved by PA [19] and our proposed CD-                          simpler datasets. One reasonable explanation is that these two apSPP is marginally worse with the average classiﬁcation accuracy                       proaches along with many others beneﬁt from the clustering charof 68.9%. However, when applying PCA to reduce the text fea-                          acteristics of the original features and can easily recognize the tartures to a lower dimensionality of 50, the performance of CDSPP                       get samples cluster-wisely. For the more challenging dataset, the
is improved from 68.9% to 71.6%, comparable with the best per-                        classes are prone to overlap in a low-dimensional subspace if the
formance 71.7% achieved by PA. This demonstrates the fact hand-                       projections are not properly learned. The simultaneous learning of
crafted text features (i.e. bag-of-features) used in the MRC dataset                  the classiﬁer and feature projections tends to result in an overﬁtcontain noisy variables which cannot be well handled by the CD-                       ted classiﬁer to the labelled and pseudo-labelled samples and the
SPP algorithm itself but a pre-processing like PCA suﬃces to ad-                      overﬁtting can be an issue when the labelled target samples candress this issue.                                                                     not represent the distribution of their corresponding classes in the
    Table 2 (rightmost column) also presents the results of tag-                      subspace. As a result, they suffer from negative adaptation when
$$
to-image adaptation on the NUS-ImageNet dataset. There is only                        the pseudo-labels are inaccurate at the beginning and less robustone adaptation task (i.e. Tag→Image) in this dataset. In the super-                   ness to the choice of labelled target samples. This also provides
$$
vised HDA setting, the baseline method SVMt is outperformed by                        evidence for the necessity of new test beds for HDA approaches.
all three comparative methods with large margins among which                          In both tables, the best performances were achieved by our CDSPP
                                                                                      for most adaptation tasks in both supervised and semi-supervised
                                                                                      settings. Speciﬁcally, CDSPP achieves an average accuracy of 70.0%
  1
    The data splits and code are released: https://github.com/hellowangqian/          when VGG16 and ResNet50 features were employed for source and
cdspp-hda
                                                                                  7


<!-- PK PAGE 8 doc=math_p6 -->
Q. Wang and T.P. Breckon
    Table 3
    Mean(std) of classiﬁcation accuracy (%) over ten trials on the Oﬃce-Caltech dataset using SURF (source) and Decaf6 (target) features under supervised (denoted by ∗) and semi-supervised settings (each column represents one
$$
    Source → Target adaptation task).
$$
$$
     Method                 C→ C        C→ A        C→ D        C→ W        A→C          A→A          A→D         A→W         D→C         D→A         D→D          D→W          W→C         W→A          W→D         W→W         Avg
$$
     SVMt ∗                 73.6(4.9)   87.9(2.2)   92.3(3.6)   88.4(3.8)   73.6(4.9)    87.9(2.2)    92.3(3.6)   88.4(3.8)   73.6(4.9)   87.9(2.2)   92.3(3.6)    88.4(3.8)    73.6(4.9)   87.9(2.2)    92.3(3.6)   88.4(3.8)   85.5
     HFA [23] ∗             80.1(2.3)   88.9(1.9)   91.6(3.6)   90.7(3.5)   80.2(2.3)    88.9(1.9)    91.5(3.6)   90.5(3.6)   80.2(2.2)   88.8(1.9)   91.8(3.6)    90.7(3.5)    80.2(2.3)   88.8(1.9)    91.5(3.7)   90.6(3.7)   87.8
     CDLS_sup [15] ∗        76.1(2.1)   86.6(3.2)   91.3(4.7)   87.4(3.5)   75.9(3.5)    87.0(2.8)    90.6(3.8)   86.0(3.6)   51.5(4.4)   74.2(2.4)   86.6(3.2)    77.2(5.1)    74.7(4.1)   85.4(3.0)    90.5(3.8)   86.0(3.5)   81.7
     DAMA_sup ∗             78.7(2.4)   87.3(2.2)   91.5(2.6)   88.6(4.3)   77.4(3.2)    85.9(2.4)    90.7(3.3)   88.2(4.1)   79.6(2.2)   88.8(1.6)   90.1(3.6)    89.4(4.1)    78.5(2.6)   87.4(2.0)    89.1(3.1)   88.6(4.7)   86.2
     CDSPP_sup (Ours) ∗     80.3(2.0)   89.0(1.9)   92.0(3.5)   90.7(3.8)   80.3(2.1)    89.1(1.9)    91.7(3.7)   90.7(3.7)   79.8(2.1)   88.9(1.8)   90.4(3.9)    90.1(3.9)    80.4(2.2)   89.0(1.8)    91.5(4.1)   90.6(3.8)   87.8
     DAMA [30]              76.6(2.6)   86.2(1.9)   91.0(2.5)   88.2(4.3)   73.6(4.7)    83.3(2.6)    88.8(3.7)   86.5(4.4)   77.5(2.5)   88.4(1.6)   90.7(4.2)    90.1(3.8)    76.1(2.9)   86.0(2.3)    87.7(4.7)   86.8(5.8)   84.8
     SHFA [23]              77.1(2.8)   86.2(3.8)   93.0(3.6)   90.0(2.6)   80.5(3.1)    86.7(2.2)    94.3(2.5)   90.0(4.0)   81.6(2.1)   88.5(2.9)   93.5(3.9)    92.0(4.1)    80.5(1.8)   88.5(2.4)    93.5(3.5)   89.5(4.2)   87.8
     CDLS [15]              80.6(1.8)   88.8(2.1)   93.0(3.2)   91.1(3.7)   80.6(1.8)    88.8(2.1)    92.0(3.0)   91.0(4.5)   78.4(2.7)   87.2(2.3)   93.0(3.7)    88.9(5.6)    81.0(2.0)   88.6(2.2)    92.1(3.3)   91.4(4.2)   87.9
     PA [19]                87.2(1.1)   90.8(1.3)   92.9(3.3)   93.9(3.9)   87.0(1.1)    90.5(1.7)    94.7(2.5)   94.0(3.9)   87.0(1.3)   90.5(2.0)   94.5(2.8)    94.3(3.7)    87.0(1.3)   90.7(1.5)    93.4(4.1)   92.8(4.6)   91.3
     TIT [20]               84.9(1.7)   89.9(1.6)   94.6(3.1)   92.2(4.3)   84.6(1.5)    89.7(1.7)    94.6(2.2)   92.3(4.9)   82.7(1.5)   88.7(1.9)   94.3(2.7)    92.1(4.0)    84.7(1.6)   89.5(1.8)    92.5(2.8)   92.5(4.3)   90.0
     STN [38]               88.2(1.7)   92.4(0.7)   94.4(2.0)   92.8(4.9)   88.4(1.6)    92.5(0.7)    95.0(2.0)   93.9(4.1)   87.9(1.7)   92.2(0.5)   94.4(2.5)    93.3(5.0)    88.2(1.8)   92.6(0.8)    93.9(3.2)   92.2(5.1)   92.0
     DDACL [39]             86.5(1.6)   91.8(0.9)   94.2(2.8)   93.5(3.4)   86.2(1.9)    83.1(11.2)   89.1(5.9)   92.3(3.9)   86.2(1.7)   91.8(1.1)   93.4(3.6)    93.6(3.0)    86.8(1.7)   92.0(0.8)    94.4(3.2)   94.0(3.1)   90.6
     SSAN [22]              80.9(8.7)   89.8(2.8)   95.8(2.0)   94.2(2.1)   84.9(4.7)    89.0(4.0)    93.1(3.6)   93.1(3.1)   81.0(4.7)   90.3(1.5)   93.9(3.6)    82.6(14.7)   84.3(2.2)   86.9(10.0)   93.5(5.2)   95.0(2.1)   89.3
     DAMA+                  88.1(1.7)   92.7(0.6)   93.9(1.7)   92.2(4.1)   88.0(1.3)    92.9(0.6)    93.9(2.1)   92.8(4.2)   87.7(1.9)   93.2(0.5)   92.1(5.3)    94.0(3.3)    88.1(2.1)   92.7(0.7)    94.8(1.6)   93.5(3.9)   91.9
     CDSPP (Ours)           88.3(0.7)   92.3(0.7)   95.6(1.5)   94.1(4.1)   88.1(1.0)    92.6(0.5)    95.7(1.0)   94.6(3.8)   88.1(0.6)   92.7(0.5)   93.5(4.6)    94.7(3.5)    88.1(1.0)   92.5(0.5)    95.7(1.3)   94.3(3.8)   92.6
8
    Table 4
    Mean(std) of classiﬁcation accuracy (%) over ten trials on the Oﬃce-Home dataset using VGG16 (source) and ResNet50 (target) features under supervised (denoted by ∗) and semi-supervised settings (each column represents
$$
    one Source → Target adaptation task).
$$
$$
     Method                 A→A         A→C         A→P         A→R          C→ A         C→ C        C→ P        C→ R        P→A         P→C          P→P          P→R         R→A         R→C          R→P         R→R         Avg
$$
     SVMt ∗                 51.8(1.2)   41.4(1.6)   71.0(1.4)   65.8(2.3)    51.8(1.2)    41.4(1.6)   71.0(1.4)   65.8(2.3)   51.8(1.2)   41.4(1.6)    71.0(1.4)    65.8(2.3)   51.8(1.2)   41.4(1.6)    71.0(1.4)   65.8(2.3)   57.5
     CDLS_sup [15] ∗        58.7(0.9)   45.7(1.5)   75.0(0.8)   69.8(1.9)    53.4(1.0)    48.6(1.0)   73.9(0.9)   67.8(1.8)   55.0(0.9)   45.9(1.4)    78.0(0.8)    70.2(1.5)   56.5(1.1)   46.8(1.5)    76.2(0.5)   72.4(1.4)   62.1
     DAMA_sup ∗             56.6(2.8)   43.6(2.2)   72.0(1.4)   67.8(2.4)    42.7(4.8)    39.8(5.4)   64.8(5.9)   57.5(4.5)   52.4(3.9)   40.4(4.1)    70.1(5.7)    63.6(3.8)   51.8(3.6)   42.4(3.4)    68.8(5.1)   65.5(4.7)   56.2
     CDSPP_sup (Ours) ∗     60.8(1.2)   49.5(1.1)   76.3(0.8)   71.9(1.8)    59.4(1.4)    50.4(1.0)   76.1(0.9)   71.6(1.8)   59.8(1.2)   49.6(1.1)    78.0(0.9)    72.4(1.4)   60.4(1.3)   49.8(0.9)    76.9(1.0)   73.3(1.6)   64.8
     DAMA [30]              55.6(3.3)   43.8(2.1)   71.1(2.1)   66.4(3.5)    43.1(4.7)    39.3(5.2)   62.9(5.7)   56.4(4.7)   52.1(4.1)   40.4(4.6)    69.9(4.3)    64.3(5.3)   51.9(3.6)   42.0(4.3)    68.3(5.0)   65.1(4.5)   55.8
     CDLS [15]              62.1(0.9)   46.9(1.2)   76.8(0.7)   71.5(2.3)    55.7(1.3)    47.4(1.2)   76.7(0.6)   70.8(2.0)   56.4(1.1)   47.0(1.2)    77.8(0.6)    71.5(2.0)   56.7(1.2)   47.6(1.3)    77.5(0.4)   72.2(2.0)   63.4
                                                                                                                                                                                                                                        Pattern Recognition 123 (2022) 108362
     PA [19]                59.8(1.2)   48.2(1.5)   80.0(1.2)   75.5(1.8)    59.8(1.1)    48.2(1.3)   80.0(1.3)   75.4(1.9)   59.5(1.5)   48.2(1.4)    80.0(1.6)    75.7(1.9)   59.6(1.3)   48.2(1.5)    79.9(1.4)   75.7(1.8)   65.8
     TIT [20]               55.6(1.0)   44.7(1.3)   74.3(1.0)   70.3(1.8)    56.1(0.9)    45.5(1.1)   74.7(0.7)   70.2(1.7)   55.9(1.1)   45.3(1.3)    74.9(0.9)    70.2(1.8)   55.5(1.5)   44.6(1.4)    74.7(0.8)   69.9(2.0)   61.4
     STN [38]               62.6(1.4)   51.2(1.5)   78.7(3.9)   74.5(4.3)    56.1(3.8)    52.2(2.2)   77.0(4.0)   71.1(6.0)   60.7(1.3)   49.3(6.0)    82.4(1.0)    75.8(2.8)   61.0(1.3)   50.6(3.2)    80.4(0.9)   75.7(4.4)   66.2
     DDACL [39]             50.3(2.2)   39.8(2.4)   59.4(2.8)   56.1(3.4)    45.1(2.0)    36.3(3.0)   60.9(2.9)   56.8(2.0)   40.3(1.5)   34.2(2.3)    55.7(9.1)    43.0(9.9)   41.9(2.4)   36.5(2.0)    52.4(5.1)   51.5(9.2)   47.5
     SSAN [22]              50.5(1.9)   40.1(3.0)   70.9(1.8)   63.9(3.0)    43.9(2.9)    42.5(5.0)   67.8(1.2)   61.9(2.9)   44.1(2.6)   38.1(3.5)    77.3(0.9)    66.2(1.3)   45.7(3.9)   38.6(3.8)    71.7(4.0)   68.8(2.5)   55.8
     DAMA+                  62.1(2.4)   49.0(1.4)   77.7(1.9)   75.0(2.5)    54.0(5.2)    44.7(6.1)   75.6(3.7)   69.0(3.4)   60.9(2.7)   46.9(3.1)    76.9(3.5)    72.5(1.9)   60.3(1.9)   48.6(3.7)    76.7(2.8)   73.4(3.3)   63.9
     CDSPP (Ours)           65.7(1.0)   54.8(2.0)   81.0(1.5)   78.4(1.1)    65.0(1.4)    55.1(1.6)   80.9(1.6)   78.5(1.2)   65.6(0.4)   54.7(1.9)    81.5(1.1)    78.8(1.0)   65.5(0.9)   54.6(1.6)    80.9(1.6)   79.4(0.9)   70.0


<!-- PK PAGE 9 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                                                                                                                                                                                                      Pattern Recognition 123 (2022) 108362
                                                                                                                                                                                                                                                                         target domains, signiﬁcantly better than the second-best perfor-
              Mean(std) of classiﬁcation accuracy (%) over ten trials on the Oﬃce-Home dataset using ResNet50 (source) and VGG16 (target) features under supervised (denoted by ∗) and semi-supervised settings (each column represents
                                                                                                                                                                                                                                                                         mance 66.2% achieved by STN [38]. Similar results can be observed
                                                                                                                                                                                                                                                   61.9
                                                                                                                                                                                                                                                   47.6
                                                                                                                                                                                                                                                   55.1
                                                                                                                                                                                                                                                   49.8
                                                                                                                                                                                                                                                   55.6
                                                                                                                                                                                                                                                   57.6
                                                                                                                                                                                                                                                   53.7
                                                                                                                                                                                                                                                   37.8
                                                                                                                                                                                                                                                   47.5
                                                                                                                                                                                                                                                   54.2
                                                                                                                                                                                                                                                   50.2
                                                                                                                                                                                                                                                   57.0
                                                                                                                                                                                                                                                   60.1
                                                                                                                                                                                                                                          Avg
                                                                                                                                                                                                                                                                         in Table 5, CDSPP achieves the best performance of 61.9% as op-
                                                                                                                                                                                                                                                                         posed to the second-best 60.1% by STN [38]. The signiﬁcant perfor-
                                                                                                                                                                                                                                                   72.1(1.8)
                                                                                                                                                                                                                                                   56.3(2.9)
                                                                                                                                                                                                                                                   66.4(2.0)
                                                                                                                                                                                                                                                   60.3(2.1)
                                                                                                                                                                                                                                                   65.0(2.1)
                                                                                                                                                                                                                                                   60.9(3.5)
                                                                                                                                                                                                                                                   69.6(1.6)
                                                                                                                                                                                                                                                   67.4(1.4)
                                                                                                                                                                                                                                                   62.5(2.1)
                                                                                                                                                                                                                                                   71.6(1.3)
                                                                                                                                                                                                                                                   45.5(4.4)
                                                                                                                                                                                                                                                   57.9(3.5)
                                                                                                                                                                                                                                                   64.6(2.1)
                                                                                                                                                                                                                                                                         mance improvement gained by CDSPP on the Oﬃce-Home dataset
$$
                                                                                                                                                                                                                                          R→R                            is attributed to the fact this dataset is much more challenging than
$$
                                                                                                                                                                                                                                                                         other datasets since it contains much more classes (65 vs 10, 8, 6).
                                                                                                                                                                                                                                                   76.6(1.0)
                                                                                                                                                                                                                                                   63.3(1.7)
                                                                                                                                                                                                                                                   70.9(1.2)
                                                                                                                                                                                                                                                   60.9(4.6)
                                                                                                                                                                                                                                                   70.1(1.3)
                                                                                                                                                                                                                                                   65.0(4.4)
                                                                                                                                                                                                                                                   73.1(1.0)
                                                                                                                                                                                                                                                   73.7(1.2)
                                                                                                                                                                                                                                                   69.4(1.2)
                                                                                                                                                                                                                                                   46.5(3.7)
                                                                                                                                                                                                                                                   63.3(2.2)
                                                                                                                                                                                                                                                   67.1(2.4)
                                                                                                                                                                                                                                                   75.8(1.8)
                                                                                                                                                                                                                                                                         We believe Oﬃce-Home is a more appropriate testbed for discrim-
                                                                                                                                                                                                                                          R→P
                                                                                                                                                                                                                                                                         inating different HDA methods.
                                                                                                                                                                                                                                                                             In addition, the performance comparison between DAMA and
                                                                                                                                                                                                                                                                         DAMA+ provide further evidence that the use of the iterative
                                                                                                                                                                                                                                                   44.9(2.0)
                                                                                                                                                                                                                                                   30.5(1.6)
                                                                                                                                                                                                                                                   37.1(1.1)
                                                                                                                                                                                                                                                   34.4(1.6)
                                                                                                                                                                                                                                                   39.4(1.1)
                                                                                                                                                                                                                                                   34.8(2.6)
                                                                                                                                                                                                                                                   38.5(1.3)
                                                                                                                                                                                                                                                   38.2(1.2)
                                                                                                                                                                                                                                                   41.7(1.4)
                                                                                                                                                                                                                                                   24.9(1.6)
                                                                                                                                                                                                                                                   36.0(1.3)
                                                                                                                                                                                                                                                   29.6(1.7)
                                                                                                                                                                                                                                                   36.3(2.2)
                                                                                                                                                                                                                                                                         learning framework described in Section 3.4 is beneﬁcial to semi-
                                                                                                                                                                                                                                          R→C
                                                                                                                                                                                                                                                                         supervised HDA. On the other hand, the superior performance of
                                                                                                                                                                                                                                                                         CDSPP to DAMA+ across all datasets validates the fact that our CD-
                                                                                                                                                                                                                                                   55.0(1.3)
                                                                                                                                                                                                                                                   40.3(1.4)
                                                                                                                                                                                                                                                   48.6(1.1)
                                                                                                                                                                                                                                                   45.3(3.2)
                                                                                                                                                                                                                                                   49.0(1.2)
                                                                                                                                                                                                                                                   45.3(3.4)
                                                                                                                                                                                                                                                   52.3(1.0)
                                                                                                                                                                                                                                                   51.2(0.9)
                                                                                                                                                                                                                                                   45.9(1.6)
                                                                                                                                                                                                                                                   52.7(1.9)
                                                                                                                                                                                                                                                   32.4(2.7)
                                                                                                                                                                                                                                                   37.5(2.3)
                                                                                                                                                                                                                                                   49.9(3.1)
                                                                                                                                                                                                                                                                         SPP is essentially different from DAMA as discussed in Section 3.3.
                                                                                                                                                                                                                                          R→A
                                                                                                                                                                                                                                                                         In the supervised HDA experiments, CDSPP also outperforms our
                                                                                                                                                                                                                                                                         adaptation of DAMA consistently on four datasets and the per-
                                                                                                                                                                                                                                                                         formance gap on the challenging Oﬃce-Home dataset is particu-
                                                                                                                                                                                                                                                   71.8(1.6)
                                                                                                                                                                                                                                                   56.3(2.9)
                                                                                                                                                                                                                                                   64.6(1.9)
                                                                                                                                                                                                                                                   56.4(4.0)
                                                                                                                                                                                                                                                   64.1(1.9)
                                                                                                                                                                                                                                                   59.8(3.5)
                                                                                                                                                                                                                                                   67.9(1.6)
                                                                                                                                                                                                                                                   67.3(1.9)
                                                                                                                                                                                                                                                   62.4(2.1)
                                                                                                                                                                                                                                                   70.7(1.4)
                                                                                                                                                                                                                                                   39.9(7.3)
                                                                                                                                                                                                                                                   58.0(1.9)
                                                                                                                                                                                                                                                   61.4(3.9)
                                                                                                                                                                                                                                                                         larly signiﬁcant. The other interesting phenomenon that can be ob-
                                                                                                                                                                                                                                          P→R
                                                                                                                                                                                                                                                                         served from Tables 3-4 is the semi-supervised DAMA (i.e. the orig-
                                                                                                                                                                                                                                                                         inal version in [30]) performs no better than its supervised version
                                                                                                                                                                                                                                                   77.3(1.2)
                                                                                                                                                                                                                                                   63.3(1.7)
                                                                                                                                                                                                                                                   73.1(1.0)
                                                                                                                                                                                                                                                   62.2(4.0)
                                                                                                                                                                                                                                                   71.3(1.4)
                                                                                                                                                                                                                                                   65.5(5.6)
                                                                                                                                                                                                                                                   73.6(1.2)
                                                                                                                                                                                                                                                   75.6(0.8)
                                                                                                                                                                                                                                                   69.8(0.9)
                                                                                                                                                                                                                                                   49.0(7.9)
                                                                                                                                                                                                                                                   69.0(2.9)
                                                                                                                                                                                                                                                   68.1(2.5)
                                                                                                                                                                                                                                                   76.0(1.8)
                                                                                                                                                                                                                                                                         (i.e. DAMA_sup adapted by ourselves). This demonstrates that the
                                                                                                                                                                                                                                                                         way how DAMA [30] exploits the unlabelled target-domain data is
                                                                                                                                                                                                                                          P→P
                                                                                                                                                                                                                                                                         ineffective. By contrast, the selective pseudo-labelling strategy em-
                                                                                                                                                                                                                                                                         ployed in our proposed CDSPP is more effective and can be readily
                                                                                                                                                                                                                                                   45.0(1.6)
                                                                                                                                                                                                                                                   30.5(1.6)
                                                                                                                                                                                                                                                   36.4(0.8)
                                                                                                                                                                                                                                                   31.8(3.6)
                                                                                                                                                                                                                                                   38.9(0.8)
                                                                                                                                                                                                                                                   32.0(4.1)
                                                                                                                                                                                                                                                   36.8(1.2)
                                                                                                                                                                                                                                                   38.1(1.4)
                                                                                                                                                                                                                                                   36.4(1.1)
                                                                                                                                                                                                                                                   41.7(1.4)
                                                                                                                                                                                                                                                   23.4(2.8)
                                                                                                                                                                                                                                                   29.9(1.7)
                                                                                                                                                                                                                                                   33.3(3.6)
                                                                                                                                                                                                                                                                         used by other HDA algorithms.
                                                                                                                                                                                                                                          P→C
                                                                                                                                                                                                                                                   54.7(1.2)
                                                                                                                                                                                                                                                   40.3(1.4)
                                                                                                                                                                                                                                                   47.2(1.2)
                                                                                                                                                                                                                                                   44.1(4.0)
                                                                                                                                                                                                                                                   48.5(1.1)
                                                                                                                                                                                                                                                   44.3(3.7)
                                                                                                                                                                                                                                                   49.7(1.2)
                                                                                                                                                                                                                                                   51.2(1.1)
                                                                                                                                                                                                                                                   46.8(1.7)
                                                                                                                                                                                                                                                   53.0(1.2)
                                                                                                                                                                                                                                                   32.0(2.7)
                                                                                                                                                                                                                                                   38.1(2.0)
                                                                                                                                                                                                                                                   48.9(3.1)
                                                                                                                                                                                                                                          P→A
                                                                                                                                                                                                                                                                         4.4. On the number of labelled target samples
                                                                                                                                                                                                                                                   71.4(1.9)
                                                                                                                                                                                                                                                   56.3(2.9)
                                                                                                                                                                                                                                                   62.0(1.6)
                                                                                                                                                                                                                                                   56.3(3.0)
                                                                                                                                                                                                                                                   63.4(1.8)
                                                                                                                                                                                                                                                   55.7(5.0)
                                                                                                                                                                                                                                                   63.6(1.4)
                                                                                                                                                                                                                                                   67.4(1.6)
                                                                                                                                                                                                                                                   62.0(2.2)
                                                                                                                                                                                                                                                   69.6(1.0)
                                                                                                                                                                                                                                                   44.0(3.5)
                                                                                                                                                                                                                                                   53.4(3.4)
                                                                                                                                                                                                                                                   63.2(3.7)
                                                                                                                                                                                                                                                                             We conducted additional experiments of semi-supervised HDA
                                                                                                                                                                                                                                          C→ R
                                                                                                                                                                                                                                                                         to compare our proposed CDSLPP with other methods when dif-
                                                                                                                                                                                                                                                                         ferent numbers of labelled target samples were used for training.
                                                                                                                                                                                                                                                                         Speciﬁcally, we set the number of labelled target samples as 5, 10,
                                                                                                                                                                                                                                                   75.7(1.6)
                                                                                                                                                                                                                                                   63.3(1.7)
                                                                                                                                                                                                                                                   68.7(1.2)
                                                                                                                                                                                                                                                   69.5(1.5)
                                                                                                                                                                                                                                                   69.5(1.2)
                                                                                                                                                                                                                                                   73.6(1.2)
                                                                                                                                                                                                                                                   69.3(1.1)
                                                                                                                                                                                                                                                   75.3(1.2)
                                                                                                                                                                                                                                                   62.1(1.5)
                                                                                                                                                                                                                                                   68.3(3.3)
                                                                                                                                                                                                                                                   60.3(6.0)
                                                                                                                                                                                                                                                   60.2(6.2)
                                                                                                                                                                                                                                                   50.8(1.9)
                                                                                                                                                                                                                                                                         15 or 20 for the MRC dataset whilst for the other three datasets
                                                                                                                                                                                                                                          C→ P
                                                                                                                                                                                                                                                                         the investigated numbers of labelled target samples were within
                                                                                                                                                                                                                                                                         the collection of {1, 3, 5, 7, 9}. For the MRC and NUS-ImageNet
                                                                                                                                                                                                                                                   46.0(1.6)
                                                                                                                                                                                                                                                   30.5(1.6)
                                                                                                                                                                                                                                                   39.2(1.0)
                                                                                                                                                                                                                                                   32.5(3.7)
                                                                                                                                                                                                                                                   40.4(1.3)
                                                                                                                                                                                                                                                   32.0(4.5)
                                                                                                                                                                                                                                                   39.8(1.2)
                                                                                                                                                                                                                                                   38.2(1.2)
                                                                                                                                                                                                                                                   36.4(1.1)
                                                                                                                                                                                                                                                   42.5(1.2)
                                                                                                                                                                                                                                                   24.3(1.6)
                                                                                                                                                                                                                                                   32.3(2.3)
                                                                                                                                                                                                                                                   32.9(4.1)
$$
                                                                                                                                                                                                                                                                         datasets, all adaptation tasks (i.e. E N/F R/GE /IT → SP and T ag →
$$
                                                                                                                                                                                                                                          C→ C
                                                                                                                                                                                                                                                                         Image, respectively) were repeated for ten trials with randomly se-
                                                                                                                                                                                                                                                                         lected data (the same as those used in the previous experiment).
                                                                                                                                                                                                                                                                         To save computational time without loss of generality, we only
                                                                                                                                                                                                                                                   54.5(1.2)
                                                                                                                                                                                                                                                   40.3(1.4)
                                                                                                                                                                                                                                                   46.4(1.2)
                                                                                                                                                                                                                                                   43.4(2.4)
                                                                                                                                                                                                                                                   48.3(1.2)
                                                                                                                                                                                                                                                   43.1(4.0)
                                                                                                                                                                                                                                                   47.8(1.4)
                                                                                                                                                                                                                                                   51.2(1.4)
                                                                                                                                                                                                                                                   47.0(1.7)
                                                                                                                                                                                                                                                   51.2(1.1)
                                                                                                                                                                                                                                                   31.8(2.3)
                                                                                                                                                                                                                                                   37.9(1.6)
                                                                                                                                                                                                                                                   49.7(1.9)
                                                                                                                                                                                                                                                                         conducted the ﬁrst four adaptation tasks for the ﬁrst three tri-
                                                                                                                                                                                                                                          C→ A
$$
                                                                                                                                                                                                                                                                         als for the Oﬃce-Caltech (C → C, C → A, C → D, C → W ) and Oﬃce-
$$
$$
                                                                                                                                                                                                                                                                         Home (A → A, A → C, A → P, A → R with VGG16 and ResNet50 as
$$
                                                                                                                                                                                                                                                   71.7(1.4)
                                                                                                                                                                                                                                                   56.3(2.9)
                                                                                                                                                                                                                                                   63.5(2.0)
                                                                                                                                                                                                                                                   60.3(1.8)
                                                                                                                                                                                                                                                   63.7(2.0)
                                                                                                                                                                                                                                                   57.8(3.4)
                                                                                                                                                                                                                                                   65.9(1.3)
                                                                                                                                                                                                                                                   67.4(1.6)
                                                                                                                                                                                                                                                   62.5(1.8)
                                                                                                                                                                                                                                                   69.2(1.5)
                                                                                                                                                                                                                                                   46.8(1.6)
                                                                                                                                                                                                                                                   56.5(2.6)
                                                                                                                                                                                                                                                   65.4(2.5)
                                                                                                                                                                                                                                                                         the source and target features, respectively) datasets in this exper-
                                                                                                                                                                                                                                          A→R
                                                                                                                                                                                                                                                                         iment. For each dataset, the average classiﬁcation accuracy over all
                                                                                                                                                                                                                                                                         the conducted adaptation tasks in this dataset is reported for com-
                                                                                                                                                                                                                                                                         parison.
                                                                                                                                                                                                                                                   75.2(1.6)
                                                                                                                                                                                                                                                   63.3(1.7)
                                                                                                                                                                                                                                                   69.6(1.1)
                                                                                                                                                                                                                                                   65.9(1.4)
                                                                                                                                                                                                                                                   69.5(1.3)
                                                                                                                                                                                                                                                   66.2(1.7)
                                                                                                                                                                                                                                                   73.7(1.2)
                                                                                                                                                                                                                                                   71.1(0.8)
                                                                                                                                                                                                                                                   69.4(0.9)
                                                                                                                                                                                                                                                   74.9(1.0)
                                                                                                                                                                                                                                                   52.2(4.0)
                                                                                                                                                                                                                                                   61.9(3.7)
                                                                                                                                                                                                                                                   71.1(1.5)
                                                                                                                                                                                                                                                                             The experimental results are shown in Fig. 2 from which we can
                                                                                                                                                                                                                                          A→P
                                                                                                                                                                                                                                                                         draw some conclusions. (1) The performance of all methods is im-
                                                                                                                                                                                                                                                                         proved with the increase of labelled target samples since more la-
                                                                                                                                                                                                                                                   44.7(1.8)
                                                                                                                                                                                                                                                   30.5(1.6)
                                                                                                                                                                                                                                                   36.5(1.0)
                                                                                                                                                                                                                                                   35.6(1.8)
                                                                                                                                                                                                                                                   39.2(1.0)
                                                                                                                                                                                                                                                   33.6(2.5)
                                                                                                                                                                                                                                                   36.6(1.1)
                                                                                                                                                                                                                                                   38.3(1.3)
                                                                                                                                                                                                                                                   36.4(1.2)
                                                                                                                                                                                                                                                   41.2(2.4)
                                                                                                                                                                                                                                                   27.5(1.6)
                                                                                                                                                                                                                                                   30.4(2.3)
                                                                                                                                                                                                                                                   37.5(1.2)
                                                                                                                                                                                                                                                                         belled target samples provide additional information for the train-
                                                                                                                                                                                                                                          A→C
                                                                                                                                                                                                                                                                         ing. (2) The performance margins between different methods de-
$$
              one Source → Target adaptation task).
$$
                                                                                                                                                                                                                                                                         crease when more labelled target samples are used for training.
                                                                                                                                                                                                                                                                         This phenomenon demonstrates these methods have different ca-
                                                                                                                                                                                                                                                   55.6(1.1)
                                                                                                                                                                                                                                                   40.3(1.4)
                                                                                                                                                                                                                                                   51.4(1.1)
                                                                                                                                                                                                                                                   46.9(1.8)
                                                                                                                                                                                                                                                   49.7(1.1)
                                                                                                                                                                                                                                                   46.7(2.0)
                                                                                                                                                                                                                                                   54.9(1.1)
                                                                                                                                                                                                                                                   51.4(1.0)
                                                                                                                                                                                                                                                   46.8(1.7)
                                                                                                                                                                                                                                                   52.6(1.5)
                                                                                                                                                                                                                                                   33.8(2.3)
                                                                                                                                                                                                                                                   42.2(4.1)
                                                                                                                                                                                                                                                   49.1(2.9)
                                                                                                                                                                                                                                                                         pabilities of cross-domain knowledge transfer which is of vital im-
                                                                                                                                                                                                                                          A→A
                                                                                                                                                                                                                                                                         portance when there are limited labelled data in the target do-
                                                                                                                                                                                                                                                                         main. (3) Our proposed CDSPP algorithm outperforms the oth-
                                                                                                                                                                                                                                                   CDLS_sup [15] ∗
                                                                                                                                                                                                                                                                         ers in three out of four datasets regardless of the number of la-
                                                                                                                                                                                                                                                   CDSPP (Ours)∗
                                                                                                                                                                                                                                                   CDSPP (Ours)
                                                                                                                                                                                                                                                   DAMA_sup ∗
                                                                                                                                                                                                                                                                         belled target samples. The superiority of CDSPP to other methods
                                                                                                                                                                                                                                                   DDACL [39]
                                                                                                                                                                                                                                                   DAMA [30]
                                                                                                                                                                                                                                                   CDLS [15]
                                                                                                                                                                                                                                                   SSAN[22]
                                                                                                                                                                                                                                                                         is more signiﬁcant when less labelled target samples are available.
                                                                                                                                                                                                                                                   STN [38]
                                                                                                                                                                                                                                                   TIT [20]
                                                                                                                                                                                                                                                   DAMA+
                                                                                                                                                                                                                                          Method
                                                                                                                                                                                                                                                   PA [19]
                                                                                                                                                                                                                                                   SVMt ∗
                                                                                                                                                                                                                                                                         (4) On the MRC dataset, our method performs the best when 5 la-
              Table 5
                                                                                                                                                                                                                                                                         belled target samples are used but outperformed by CDLS [15] and
                                                                                                                                                                                                                                                                         [19] when more labelled target samples are available.
                                                                                                                                                                                                                                                                     9


<!-- PK PAGE 10 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                    Pattern Recognition 123 (2022) 108362
                                   Fig. 2. Comparison results when different numbers of labelled target samples are used.
                                                    Fig. 3. Performance sensitivity to hyper-parameters.
4.5. On the effect of hyper-parameters                                           sensitive to the value of α . Similar ﬁndings have been validated in
                                                                                 the traditional LPP algorithm by Wang and Chen [34].
    In all our experiments described above, we empirically set the                   Finally, we are concerned about the number of iterations
$$
dimensionality of the common subspace d equal to the number                      T by setting T = {1, 3, 5, 7, 9, 11, 15, 21}. The right-side graph in
$$
$$
of classes in the dataset and set the hyper-parameters α = 10 (c.f.              Fig. 3 shows that the CDSPP algorithm performs generally well
$$
$$
Eq. (8)) and the number of iterations T = 5 (c.f. Algorithm 2). In               when T ≥ 5. Increasing the number of iterations further can
$$
this experiment, we will show how these values were selected                     only improve the performance on the NUS-ImageNet dataset very
and the fact that our algorithm is not sensitive to these hyper-                 marginally but will increase the computational cost signiﬁcantly.
$$
parameters across all the datasets. Similar to the experimental set-             As a result, we selected T = 5 as the optimal value in all our extings in the previous section, we repeated all the adaptation tasks              periments.
$$
for ten trials for the MRC and NUS-ImageNet datasets and repeated
the ﬁrst four adaptation tasks for the ﬁrst three trials for the                 4.6. Qualitative evaluation
Oﬃce-Caltech and Oﬃce-Home datasets to save time without loss
of generality. The average accuracy over all the investigated adap-                  To give an intuitive explanation of how our algorithm can
tation tasks is reported for each dataset when a speciﬁc hyper-                  align two heterogeneous domains progressively, we take the tagparameter value is used.                                                         to-image adaptation task in the NUS-ImageNet dataset as an ex-
    Firstly, we investigate the effect of the subspace                           ample and visualise the distribution of samples in the learned subdimension d. The values of d were from the set                                   space. As shown in Fig. 4(a), the original features from the two
{2, 4, 6, 8, 10, 16, 32, 64/65, 128, 256, 512} which contains the                domains are independent of each other although the clustering
class numbers of four datasets (i.e. 6, 8, 10 and 65) as well as                 characteristics are evident. Figure 4(b) illustrates how the three
other candidate values less or greater than the class numbers. The               labelled target samples (“circles”) are pulled closer to the correexperimental results are shown in the left graph of Fig. 3. It is not            sponding source classes (“squares”) after the ﬁrst iteration of CDhard to see that the best performance can be achieved when the                   SPP. More importantly, due to the property of structure preservavalue of d is no less than the number of classes in each dataset.                tion of CDSPP, the unlabelled target samples (“crosses”) are also
A greater value of d does not further improve the performance                    moving towards their corresponding source clusters. In Fig. 4(c),
but a smaller value of d leads to a signiﬁcant performance drop.                 we can see more target samples are pseudo-labelled (“crosses”
As a result, it is easy to select an optimal value of the subspace               within “circles”) and the source and target domains are further
dimension for our proposed CDSPP.                                                aligned. Such progressive pseudo-labelling and domain alignment
    Subsequently, We investigate the effect of the regularization pa-            are enhanced in Fig. 4(d) and no signiﬁcant improvement can be
rameter α in Eq. (8) by conducting experiments with the values of                observed in the following iterations (e) and (f). This is consistent
α selected from {0.01, 0.1, 1, 10, 100, 10 0 0}. The experimental re-            with the recognition results achieved by our CDSPP in this particusults are shown in the middle graph of Fig. 3 from which we can                  lar experiment (i.e. from the ﬁrst to the ﬁfth iteration, recognition
see that the optimal values of α should be between 10 and 100                    accuracy is 70.1%, 76.7%, 79.1%, 78.9% and 79.0%, respectively).
across all datasets. A smaller value of α leads to performance drops                 It is obvious that the clustering of eight classes has converged
for all datasets except Oﬃce-Caltech. This validates the necessity of            after the third iteration and the two domains are relatively well
the regularization term in Eq. (8) in our method and it is not very              aligned. The samples which are misclassiﬁed in the ﬁnal iteration
                                                                                 are those located in the overlapping regions of two classes. The
                                                                            10


<!-- PK PAGE 11 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                                Pattern Recognition 123 (2022) 108362
Fig. 4. Visualisation of the learned subspace for the NUS-ImageNet dataset (i.e. the tag to image adaptation task) using the proposed CDSPP, best view in colour. (Results
are from one of the ten trials with a speciﬁc random seed; eight classes 1–8 are represented by different colours; “squares”: labelled source samples; “crosses”: unlabelled
target samples; “circles”: labelled or pseudo-labelled target samples; (a) the original features learned by two separate PCA projections independently; (b)–(f) projections in
the subspace learned by CDSPP after 1st-5th iteration.).
overlap comes from the original features as shown in Fig. 4(a) and                          Table 6
                                                                                            Computation time (s) of different methods on four datasets (the total time of
can be mitigated in different ways. The best way is to extract more
                                                                                            all adaptation tasks in each dataset is calculated).
discriminative features to avoid such distribution overlap from the
beginning which, however, is beyond our focus of this paper. Al-                              Method           MRC      NUS-ImageNet       Oﬃce-Caltech      Oﬃce-Home
ternatively, one can use a more capable domain adaptation algo-                               DAMA [30]        46       7                  58                477
rithm such as our proposed CDSPP to mitigate the class overlap by                             SHFA [23]        917      25                 255               Inf
learning the most discriminative features from the original ones.                             CDLS [15]        168      6                  47                272
                                                                                              PA [19]          617      30                 121               3991
In addition, the choice of labelled target samples also makes a dif-
                                                                                              TIT [20]         175      11                 52                1740
ference. Taking a closer look at Fig. 4(a), we can see one of the                             STN [38]         2734     343                7134              40,857
three randomly selected labelled target samples for class 5 is far                            DDACL [39]       622      169                2940              3421
away from the target cluster of class 5. When this outlier is pulled                          SSAN [22]        9520     1229               13,245            47,145
                                                                                              DAMA +           49       21                 288               1390
closer to the source cluster of class 5, some samples from class 2
                                                                                              CDSPP (Ours)     16       7                  161               256
and class 6 are also mistakenly pulled close to the source cluster
of class 5 as shown in Fig. 4(b). These observations also imply it
is important to choose the most representative target samples to
                                                                                          of Oﬃce-Home in our experiment hence is marked as In f in the
label for improved performance in practice.
                                                                                          table. STN and SSAN take the most time across all datasets since
                                                                                          neural networks are trained for a large number of iterations which
4.7. On the computational eﬃciency                                                        is generally much less eﬃcient compared with our CDSPP which
                                                                                          can be solved by eigen-decomposition.
    We compare the computational eﬃciency of different methods by calculating the time cost of each method in the experi-                            5. Conclusion and future work
ments. The experiments are conducted on a laptop with an Intel Core i5-7300HQ CPU @ 2.5 GHz and 32 GB memory. For neu-                                   We propose a novel algorithm CDSPP for HDA and extend it to
ral network based methods STN and SSAN, the Nvidia Titan Xp                               the semi-supervised setting by incorporating it into an iterative
GPUs are used. The results are shown in Table 6. The computa-                             learning framework. Experimental results on several benchmark
tional time is calculated by averaging the time for all adaptation                        datasets demonstrate the proposed CDSPP is not only computatasks (i.e. 4, 1, 16 and 16 tasks for MRC, NUS-ImageNet, Oﬃce-                            tionally eﬃcient but also can achieve state-of-the-art performance
Caltech and Oﬃce-Home respectively) over three trials. By compar-                         on four datasets. We also investigate the effect of the number of
ison, our proposed CDSPP is generally the most eﬃcient method                             labelled target samples in the performance of different methods
on three out of four datasets. The exception on Oﬃce-Caltech is                           and found that the use of too many labelled target samples will
because CDLS and TIT use dimensionality reduction such as PCA to                          suppress the performance distinction among different methods.
reduce the dimensionality of Decaf features from 4096 to a much                           The newly introduced benchmark dataset Oﬃce-Home for HDA is
lower value whilst our CDSPP uses the original 4096-dimensional                           proved a proper testbed for HDA since it is more challenging with
features. From Table 6 we can also see different methods have                             much more classes than others and the performances of investhe varying capability of scaling to larger datasets (e.g., from NUS-                     tigated methods on this dataset are more signiﬁcantly varied. In
ImageNet to Oﬃce-Home) in terms of both feature dimensional-                              addition, the proposed method for HDA is not sensitive to hyperity and the number of samples. In particular, SHFA takes an ex-                           parameters and it is easy to select optimal hyper-parameter values
cessively long time before completing one single adaptation task                          across varying datasets.
                                                                                     11


<!-- PK PAGE 12 doc=math_p6 -->
Q. Wang and T.P. Breckon                                                                                                                        Pattern Recognition 123 (2022) 108362
    One limitation of the proposed method is that its performance                                [22] S. Li, B. Xie, J. Wu, Y. Zhao, C.H. Liu, Z. Ding, Simultaneous semantic alignrelies on the quality of pre-extracted features. As we have observed                                  ment network for heterogeneous domain adaptation, in: Proceedings of the
                                                                                                      28th ACM International Conference on Multimedia, 2020, pp. 3866–3874.
in our experiments on the MRC dataset, proper pre-processing                                     [23] W. Li, L. Duan, D. Xu, I.W. Tsang, Learning with augmented features for suof features can affect the domain adaptation performance signif-                                      pervised and semi-supervised heterogeneous domain adaptation, IEEE Trans.
icantly. One direction of future work to address this issue is to                                     PAMI 36 (6) (2013) 1134–1148.
                                                                                                 [24] A.S. Mozafari, M. Jamzad, A SVM-based model-transferring method for heterounify the feature extraction neural networks and domain adapta-                                       geneous domain adaptation, Pattern Recognit. 56 (2016) 142–158.
tion. For HDA, the source and target domains are different either                                [25] V.M. Patel, R. Gopalan, R. Li, R. Chellappa, Visual domain adaptation: a survey
in the data modality (e.g., text and image) or in the feature space.                                  of recent advances, IEEE Signal Process. Mag. 32 (3) (2015) 53–69.
                                                                                                 [26] K.B. Petersen, M.S. Pedersen, et al., The matrix cookbook, Tech. Univ. Denmark
As a result, two individual neural networks are needed for feature
                                                                                                      7 (15) (2008) 510.
extraction before feeding the features into the domain adaptation                                [27] C. Shen, Y. Guo, Unsupervised heterogeneous domain adaptation with sparse
module. Our selective pseudo-labelling strategy described in this                                     feature transformation, in: ACML, 2018, pp. 375–390.
                                                                                                 [28] K. Simonyan, A. Zisserman, Very deep convolutional networks for large-scale
paper can also be easily applied to exploit the unlabelled target-
                                                                                                      image recognition, ICLR, 2015.
domain data when training the uniﬁed neural networks for HDA.                                    [29] H. Venkateswara, J. Eusebio, S. Chakraborty, S. Panchanathan, Deep hashing
                                                                                                      network for unsupervised domain adaptation, in: CVPR, 2017, pp. 5018–5027.
Declaration of Competing Interest                                                                [30] C. Wang, S. Mahadevan, Heterogeneous domain adaptation using manifold
                                                                                                      alignment, IJCAI, 2011.
                                                                                                 [31] J. Wang, W. Feng, Y. Chen, H. Yu, M. Huang, P.S. Yu, Visual domain adap-
    The authors declare that they have no known competing ﬁnan-                                       tation with manifold embedded distribution alignment, in: ACMMM, 2018,
cial interests or personal relationships that could have appeared to                                  pp. 402–410.
                                                                                                 [32] Q. Wang, T.P. Breckon, Unsupervised domain adaptation via structured predicinﬂuence the work reported in this paper.                                                             tion based selective pseudo-labeling, AAAI, 2020.
                                                                                                 [33] Q. Wang, P. Bu, T.P. Breckon, Unifying unsupervised domain adaptation and
References                                                                                            zero-shot visual recognition, IJCNN, 2019.
                                                                                                 [34] Q. Wang, K. Chen, Zero-shot visual recognition via bidirectional latent embed-
 [1] M. Amini, N. Usunier, C. Goutte, Learning from multiple partially observed                       ding, Int. J. Comput. Vis. 124 (3) (2017) 356–383.
     views-an application to multilingual text categorization, in: NeurIPS, 2009,                [35] K. Weiss, T.M. Khoshgoftaar, D. Wang, A survey of transfer learning, J. Big Data
     pp. 28–36.                                                                                       3 (1) (2016) 9.
 [2] A. Atapour-Abarghouei, T.P. Breckon, Real-time monocular depth estimation us-               [36] H. Wu, H. Zhu, Y. Yan, J. Wu, Y. Zhang, M.K. Ng, Heterogeneous domain adap-
     ing synthetic data with domain adaptation via image style transfer, in: CVPR,                    tation by information capturing and distribution matching, IEEE Trans. Image
     2018, pp. 2800–2810.                                                                             Process. 30 (2021) 6364–6376.
 [3] C. Chen, Z. Chen, B. Jiang, X. Jin, Joint domain alignment and discriminative               [37] Y. Yan, W. Li, M.K. Ng, M. Tan, H. Wu, H. Min, Q. Wu, Learning discrimina-
     feature learning for unsupervised deep domain adaptation, AAAI, 2019.                            tive correlation subspace for heterogeneous domain adaptation, in: IJCAI, 2017,
 [4] C. Chen, W. Xie, W. Huang, Y. Rong, X. Ding, Y. Huang, T. Xu, J. Huang, Progres-                 pp. 3252–3258.
     sive feature alignment for unsupervised domain adaptation, in: CVPR, 2019,                  [38] Y. Yao, Y. Zhang, X. Li, Y. Ye, Heterogeneous domain adaptation via soft transfer
     pp. 627–636.                                                                                     network, in: ACMMM, 2019, pp. 1578–1586.
 [5] W.-Y. Chen, T.-M.H. Hsu, Y.-H.H. Tsai, Y.-C.F. Wang, M.-S. Chen, Transfer neu-              [39] Y. Yao, Y. Zhang, X. Li, Y. Ye, Discriminative distribution alignment: a uniﬁed
     ral trees for heterogeneous domain adaptation, in: ECCV, Springer, 2016,                         framework for heterogeneous domain adaptation, Pattern Recognit. 101 (2020)
     pp. 399–414.                                                                                     107165.
 [6] T.-S. Chua, J. Tang, R. Hong, H. Li, Z. Luo, Y. Zheng, NUS-WIDE: a real-world web           [40] Y. Zhang, H. Tang, K. Jia, M. Tan, Domain-symmetric networks for adversarial
     image database from national university of singapore, in: ACM International                      domain adaptation, in: CVPR, 2019, pp. 5031–5040.
     Conference on Image and Video Retrieval, 2009, p. 48.                                       [41] S. Zhao, B. Li, X. Yue, Y. Gu, P. Xu, R. Hu, H. Chai, K. Keutzer, Multi-source do-
 [7] R. Collobert, F. Sinz, J. Weston, L. Bottou, Large scale transductive SVMs, J.                   main adaptation for semantic segmentation, in: NeurIPS, 2019, pp. 7285–7298.
     Mach. Learn. Res. 7 (Aug) (2006) 1687–1712.                                                 [42] H. Zhou, K. Chen, Transferable positive/negative speech emotion recognition
 [8] J. Deng, W. Dong, R. Socher, L.-J. Li, K. Li, L. Fei-Fei, ImageNet: a large-scale                via class-wise adversarial domain adaptation, in: ICASSP, 2019, pp. 3732–3736.
     hierarchical image database, in: CVPR, 2009, pp. 248–255.                                   [43] J.T. Zhou, S.J. Pan, I.W. Tsang, A deep learning framework for hybrid heteroge-
 [9] W.-Y. Deng, Y.-Y. Dong, G.-D. Liu, Y. Wang, J. Men, Multiclass heterogeneous                     neous transfer learning, Artif. Intell. (2019).
     domain adaptation via bidirectional ECOC projection, Neural Netw. 119 (2019)                [44] J.T. Zhou, I.W. Tsang, S.J. Pan, M. Tan, Multi-class heterogeneous domain adap-
     313–322.                                                                                         tation, J. Mach. Learn. Res. 20 (57) (2019) 1–31.
[10] W.-C. Fang, Y.-T. Chiang, A discriminative feature mapping approach to hetero-
     geneous domain adaptation, Pattern Recognit. Lett. 106 (2018) 13–19.                        Qian Wang is now a research associate in Department of Computer Science at
[11] B. Gong, Y. Shi, F. Sha, K. Grauman, Geodesic ﬂow kernel for unsupervised do-               Durham University, UK. He received his BSc and MEng degrees from University
     main adaptation, in: CVPR, IEEE, 2012, pp. 2066–2073.                                       of Science and Technology of China in 2010 and 2013 respectively, PhD from The
[12] K. He, X. Zhang, S. Ren, J. Sun, Deep residual learning for image recognition,              University of Manchester in 2017. His research interests include zero-shot learning,
     in: CVPR, 2016, pp. 770–778.                                                                deep learning and domain adaptation.
[13] X. He, P. Niyogi, Locality preserving projections, in: NeurIPS, 2004,
     pp. 153–160.                                                                                Toby Breckon is currently a Professor within the Departments of Engineering and
[14] J. Huang, Z. Zhou, J. Shang, C. Niu, Heterogeneous domain adaptation with la-               Computer Science, Durham University (UK). His key research interests lie in the do-
     bel and structural consistency, Multimed. Tools Appl. (2020) 1–21.                          main of computer vision and image processing and he leads a range of research
[15] Y.-H. Hubert Tsai, Y.-R. Yeh, Y.-C. Frank Wang, Learning cross-domain land-                 activity in this area. Prof. Breckon holds a PhD in informatics (computer vision)
     marks for heterogeneous domain adaptation, in: CVPR, 2016, pp. 5081–5090.                   from the University of Edinburgh (UK). He has been a visiting member of faculty at
[16] H. Li, S.J. Pan, R. Wan, A.C. Kot, Heterogeneous transfer learning via deep ma-             the Ecole Suprieure des Technologies Industrielles Avancées (France), Northwestern
     trix completion with adversarial kernel embedding, AAAI, 2019.                              Polytechnical University (China), Shanghai Jiao Tong University (China) and Waseda
[17] J. Li, E. Chen, Z. Ding, L. Zhu, K. Lu, H.T. Shen, Maximum density divergence for           University (Japan). Prof. Breckon is a Chartered Engineer, Chartered Scientist and
     domain adaptation, IEEE Trans. Pattern Anal. Mach. Intell. (2020).                          a Fellow of the British Computer Society. In addition, he is an Accredited Senior
[18] J. Li, M. Jing, K. Lu, L. Zhu, H.T. Shen, Locality preserving joint transfer for do-        Imaging Scientist and Fellow of the Royal Photographic Society. He led the devel-
     main adaptation, IEEE Trans. Image Process. 28 (12) (2019) 6103–6115.                       opment of image-based automatic threat detection for the 2008 UK MoD Grand
[19] J. Li, K. Lu, Z. Huang, L. Zhu, H.T. Shen, Heterogeneous domain adaptation                  Challenge winners [R.J. Mitchell Trophy, (2008), IET Innovation Award (2009)]. His
     through progressive alignment, IEEE Trans. Neural Netw. Learn. Syst. 30 (5)                 work is recognised as recipient of the Royal Photographic Society Selwyn Award for
     (2018) 1381–1391.                                                                           early-career contribution to imaging science (2011).http://www.durham.ac.uk/toby.
[20] J. Li, K. Lu, Z. Huang, L. Zhu, H.T. Shen, Transfer independently together: a gen-          breckon/
     eralized framework for domain adaptation, IEEE Trans. Cybern. 49 (6) (2018)
     2144–2155.
[21] J. Li, K. Lu, L. Zhu, Z. Li, Locality-constrained transfer coding for heteroge-
     neous domain adaptation, in: Australasian Database Conference, Springer, 2017,
     pp. 193–204.
                                                                                            12
<!-- PK END doc=math_p6 -->
