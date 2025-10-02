PKvNext Document

KEY: math_p27 | math |  | 3601809e | 18 | /papers/Weakly-SupervisedCross-DomainDictionaryLearning.pdf
<!-- PK START doc=math_p27 -->


<!-- PK PAGE 1 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59
DOI 10.1007/s11263-014-0703-y
Weakly-Supervised Cross-Domain Dictionary Learning
for Visual Recognition
Fan Zhu · Ling Shao
Received: 15 March 2013 / Accepted: 14 February 2014 / Published online: 12 March 2014
© Springer Science+Business Media New York 2014
Abstract We address the visual categorization problem                 Keywords Visual categorization · Image classification ·
and present a method that utilizes weakly labeled data from           Human action recognition · Event recognition · Transfer
other visual domains as the auxiliary source data for enhanc-         learning · Weakly-supervised dictionary learning
ing the original learning system. The proposed method aims
to expand the intra-class diversity of original training data
                                                                      1 Introduction
through the collaboration with the source data. In order
to bring the original target domain data and the auxiliary
                                                                      In the past few years, along with the explosion of online
source domain data into the same feature space, we intro-
                                                                      image and video data (Flickr1 , YouTube2 ), the computer
duce a weakly-supervised cross-domain dictionary learning
                                                                      vision community has witnessed a significant amount of
method, which learns a reconstructive, discriminative and
                                                                      applications in content-based image/video search and
domain-adaptive dictionary pair and the corresponding clas-
                                                                      retrieval, human–computer interaction, sport events analysifier parameters without using any prior information. Such
                                                                      sis, etc. These applications are built upon the development
a method operates at a high level, and it can be applied to dif-
                                                                      of several aspects of classical computer vision tasks, such as
ferent cross-domain applications. To build up the auxiliary
                                                                      human action recognition, object localization and image clasdomain data, we manually collect images from Web pages,
                                                                      sification, which, however, remain challenging in real-world
and select human actions of specific categories from a dif-
                                                                      scenarios due to cluttered background, view point changes,
ferent dataset. The proposed method is evaluated for human
                                                                      occlusion, and geometric and photometric variations of the
action recognition, image classification and event recogni-
                                                                      target (Su and Jurie 2012; Yao et al. 2012; Wang and Mori
tion tasks on the UCF YouTube dataset, the Caltech101/256
                                                                      2011, 2009; Jégou et al. 2010; Junejo et al. 2011; Duchenne et
datasets and the Kodak dataset, respectively, achieving out-
                                                                      al. 2009; Marszalek et al. 2009). These issues result in either
standing results.
                                                                      imposing irrelevant information to the target introduced by,
                                                                      e.g., cluttered background, or producing very different repre-
                                                                      sentations for the same target caused by, e.g., geometric and
Communicated by Dr. Trevor Darrell.
                                                                      photometric changes. Many previous methods that manage
F. Zhu · L. Shao (B)                                                  to deal with these issues are proposed and state-of-the-art
College of Electronic and Information Engineering,                    approaches include semantic attributes (Su and Jurie 2012),
Nanjing University of Information Science and Technology,             estimated pose features (Yao et al. 2012), and mined hierarNanjing 210044, China
                                                                      chical features (Gilbert et al. 2011). The conventional framee-mail: ling.shao@ieee.org
                                                                      work applies a robust classifier using human annotated trainF. Zhu · L. Shao                                                      ing data, but it makes the assumption that the testing data stay
Department of Electronic and Electrical Engineering,                  in the same feature space or share the same distribution with
The University of Sheffield, Sheffield S1 3JD, UK
e-mail: ling.shao@sheffield.ac.uk
                                                                      1 http://www.flickr.com/
F. Zhu
e-mail: fan.zhu@sheffield.ac.uk                                       2 http://www.youtube.com/
123


<!-- PK PAGE 2 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                 43
the training data. However, in real-world applications, due to      system can also gain more discriminative power by spanning
the high price of human manual annotation and environmen-           the coverage of training samples’ intra-class variations, as
tal restrictions, sufficient training data that stay in the same    shown in Fig. 2.
feature space or share the same distribution with the testing           Motivated by the above two facts, we introduce a new
data cannot always be guaranteed, in which case insufficient        visual categorization framework that utilizes weakly labeled
training data can limit the potential discriminability of the       data from other domains as the source data (motivated by
trained model. Typical examples are Cao et al. (2013), Gao          the first fact) to span the intra-class diversity of the original
et al. (2011), and Orrite et al. (2011), where only one action      learning system (motivated by the second fact). Following
template is provided for each action class for training, and Liu    the classical single-task cross-domain learning setup (Pan
et al. (2011), where training samples are captured from a dif-      and Yang 2010), our aim is to complete the visual categoferent viewpoint. In these situations, obtaining more labeled       rization task in the target domain. In addition to the mandata is either impossible or expensive, while seeking for an        ually labeled training data in the target domain, the source
alternative way of using data from other domains as compen-         domain data are utilized as extensions of category prototypes
sation can be seen as a possible and economic solution.             in the target domain. Based on the recent success of dic-
   Our work is inspired by two facts of the human vision            tionary learning methods in solving computer vision probsystem. The first fact is that humans are able to learn tens        lems, we present a weakly-supervised cross-domain dictioof thousands of visual categories in their life, which leads        nary learning method to learn a reconstructive, discriminative
to the hypothesis that humans achieve such a capability by          and domain-adaptive dictionary pair and an optimal linear
accumulated information and knowledge (Fei-Fei 2006), as            classifier simultaneously. In order to demonstrate the effecshown in Fig. 1. Another fact is human’s visual impressions         tiveness of our method, we gather supportive evidence by
towards the same action or the same object comes from a             evaluating our method on action recognition, image claswide range, e.g., an action seen from 2D static images versus       sification and event recognition tasks. The UCF YouTube
the same action seen from 3D dynamic movies or an object            dataset (Liu et al. 2009), the Caltech101 dataset (Fei-Fei et
seen from real-world scenes versus the same object seen from        al. 2007), the Caltech 256 dataset (Griffin et al. 2007) and
low-resolution online images. However, the human vision             the Kodak consumer video dataset (Loui et al. 2007) are used
system is still able to correctly distinguish such actions or       as the target domain data in our experiments, while selected
objects regardless of their visual diversities, which, in other     actions in the HMDB51 dataset (Kuehne et al. 2011) and
words, can be explained in the computer vision language that        some indexed Web images or YouTube videos are used as
the human vision system possesses the ability to span the           the source domain data in our experiments. The preliminary
intra-class diversity of the original training data. In a similar   results of our method have been presented in Zhu and Shao
way, we argue that the computer-based visual categorization         (2013).
Fig. 1 Illustration of how a
new object is accumulated to the
human visual system as prior
knowledge for future usage. The
given unknown object is a future
car, which is unacquainted to the
viewer. Since the viewer’s prior
knowledge towards cars spans a
wild coverage of target samples,
shared information (e.g., car
shape and wheels) between the
new object and prior knowledge
is easily discovered.
                                                                                                                          123


<!-- PK PAGE 3 doc=math_p27 -->
44                                                                                                             Int J Comput Vis (2014) 109:42–59
Fig. 2 Illustration of how the categorization system can gain more          boundaries are represented by the dashed lines. The testing sample,
discriminative power through the collaboration with the source domain       which is denoted as a red square with black borders, is misclassified as
data in the 2-dimensional feature space. The purple triangles, the orange   Class 1 according to the original decision boundaries. Proper auxiliary
circles and the red squares denote the training samples from Classes        samples lead to more rational decision boundaries, so that the coverage
1, 2 and 3 respectively, and the corresponding hollow shapes denote         of Class 1 spans against the centre of Class 2. Thus, the testing sample
the auxiliary training samples from Classes 1, 2 and 3. Original deci-      can be correctly labeled (Color figure online)
sion boundaries are represented by the solid lines and the new decision
Fig. 3 Flowchart of the proposed approach. The target domain data           weakly-supervised cross-domain dictionary learning is performed. A
are split into the training part and the testing part, where the training   reconstructive, discriminative and domain-adaptive dictionary pair is
data are used as a set of queries to rank the source domain data within     learned together with the target classifier. The target domain testing
selected categories. A pre-defined number of most relevant source sam-      data can be encoded with the learned target domain dictionary, followples are chosen to construct the transformation matrix, which describes     ing which the labels can be predicted by feeding the new representations
the connections between the source domain data and the target domain        into the learned classifier
data. With the label information of the target domain training samples,
   Our proposed method is illustrated in Fig. 3 and it offers               In addition to the dictionary, classifier parameters are learned
the following two main contributions. Firstly, it attempts to               jointly during the discriminative dictionary function learning
make use of as much as possible existing knowledge by a                     process. Thus, knowledge transfer of the proposed framenovel weakly-supervised visual categorization framework.                    work is accomplished through both the feature level and
An efficient manifold ranking method is applied to the source               the classifier level. As the samples from the source domains
domain for the selection of a pre-defined number of most rel-               are weakly labeled rather than being manually (correctly)
evant instances per category according to the target domain                 labeled, we call our algorithm “Weakly-Supervised Crosstraining data, following which correspondences connecting                   Domain Dictionary Learning”(WSCDDL).
the source domain and the target domain are established                        The remainder of this paper is organized in the folbased on the selected source domain data and the target                     lowing way. Related works are reviewed in Sect. 2. In
domain training data. Secondly, we propose a new cross-                     Sects. 3 and 4, we first extensively discuss related dicdomain dictionary learning method to cope with the feature                  tionary learning techniques and then introduce the prodistribution mismatch problem across the source domain and                  posed cross-domain dictionary learning method. Experimenthe target domain. Specifically, we perform dictionary learn-               tal results on human action recognition, image classificaing upon the correspondences built from both domains so                     tion and event recognition are comprehensively presented
that the projections of data from different domains can obey                in Sect. 5. Finally, the conclusion of this work is given in
the same distribution when limited by the learning function.                Sect. 6.
123


<!-- PK PAGE 4 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                 45
2 Background Work                                                    2009). Using an over-complete dictionary, sparse modeling
                                                                     of signals can approximate the input signal by a sparse linA considerable number of methods have been proposed to               ear combination of items from the dictionary. Many algoaddress visual categorization problems (Maji et al. 2013; Ji et      rithms (Lee et al. 2007; Wang et al. 2010; Wright et al. 2009)
al. 2013; Zafeiriou et al. 2012; Liwicki et al. 2012; Xiang et al.   have been proposed to learn such a dictionary according to
2012; Liu et al. 2012). Reasonable results are achieved using        different criteria. The K-Singular Value Decomposition (Ktraditional machine learning approaches without consider-            SVD) algorithm (Aharon et al. 2006) is a classical dictionary
ing the data distribution mismatch among the training data           learning algorithm that generalizes the K-means clustering
and the testing data when training data are abundant. Trans-         process for adapting dictionaries to efficiently learn an overfer learning (a.k.a., cross-domain learning, domain transfer,        complete dictionary from a set of training signals. The Kdomain adaptation) approaches begin to attract increasing            SVD method focuses on the reconstructive ability, however,
interests in the computer vision community in recent years           since the learning process is unsupervised, the discriminadue to the data explosion on the Internet and the growing            tive capability is not taken into consideration. Consequently,
demands for visual computational tasks. In Cao et al. (2010),        methods that incorporate the discriminative criteria into dicaction detection is conducted across datasets from differ-           tionary learning were proposed in Zhang and Li (2010), Yang
ent visual domains, where the KTH dataset (Schuldt 2004),            et al. (2010), Mairal et al. (2008a, 2008b, 2009), Boureau et
which has a clean background and limited viewpoint and               al. (2010). In addition to the discriminative capability of the
scale changes, is set as the source domain, and the Microsoft        learned dictionary, other criteria designed on top of the protoResearch Action Dataset3 and the TRECVID surveillance                type dictionary learning objective function include multiple
data (Dikmen et al. 2008), which are captured from realistic         dictionary learning (Zhang et al. 2009), category-specific dicscenarios, are used as the target domain. Yang et al. (2007)         tionary learning (Yang et al. 2008), etc. Different from most
and Duan et al. (2012a) addressed the problem of video con-          dictionary learning methods, which learned the dictionary
cept detection using domain transfer approaches. The former          and the classifier separately, Zhang and Li (2010) and Jiang
one utilized the Adaptive Support Vector Machine (A-SVM)             et al. (2011) unified these two learning procedures into a sinto adapt one or more existing classifiers of any type to a new       gle supervised optimization problem and learned a discrimidataset, and the latter proposed a Domain Transfer Multiple          native dictionary and the corresponding classifier simultaneKernel Learning (DTMKL) method to simultaneously learn               ously. Taking a step further, Qiu et al. (2012) and Zheng et al.
a kernel function and a robust SVM classifier by minimizing          (2012) designed dictionaries for the situations that the present
both the structural risk function of SVM and the distribution        training instances are different from the testing instances. The
mismatch of labeled and unlabeled data in different domains.         former presented a general joint optimization function that
Liu et al. (2011) and Li and Zickler (2012) constructed cross-       transforms a dictionary learned from one domain to the other,
domain representations to cope with the cross-view action            and applied such a framework to applications such as pose
recognition problem, where the divergences across domains            alignment, pose and illumination estimation and face recogare caused by view-point changes. Liu et al. (2011) built            nition. The latter achieved promising results on the crossa bipartite graph via unsupervised co-clustering to measure          view action recognition problem with pairwise dictionaries
the visual-word to visual-word relationship across the tar-          constructed using correspondences between the target view
get view and the source view so that a high-level seman-             and the source view. To make use of some data that may
tic feature that bridges the semantic gap between the two            not be relevant to the target domain data, Raina et al. (2007)
vocabularies can be filled. Similarly, Li and Zickler (2012)         proposed a method that applies sparse coding to unlabeled
captured the conceptual idea of “virtual views”to represent          data to break the tremendous amount of data in the source
an action descriptor continuously from an observer’s view-           domain into basic patterns (e.g., edges in the task of image
point to another. Duan et al. (2012b) considered to leverage         classification) so that knowledge can be transferred through
large amounts of loosely labeled web videos for visual event         the bottom level to a high level representation.
recognition using the Adaptive Multiple Kernel Learning (A-              Our approach differs from the above approaches in such
MKL) to fuse the information from multiple pyramid levels            aspects that it more comprehensively learns pairwise dictioand features and cope with the considerable variation in fea-        naries and a classifier while considering the capacity of the
ture distributions between videos across two domains.                dictionaries in terms of reconstructability, discriminability
    Recently, dictionary learning for sparse representation has      and domain adaptability. Additionally, corresponding obserattracted much attention. It has been successfully applied           vations across the domains are not required in our framework.
to a variety of computer vision tasks, e.g., face recogni-           While most previous knowledge transfer algorithm focus on
tion (Wright et al. 2009) and image denoising (Zhou et al.           the situations where the target domain is incomplete, but have
                                                                     not attempted to utilize other domain data as an aide for
3 http://research.microsoft.com/~zliu/ActionRecoRsrc                 enhancing present categorization systems, in our approach,
                                                                                                                          123


<!-- PK PAGE 5 doc=math_p27 -->
46                                                                                                 Int J Comput Vis (2014) 109:42–59
the learned classifier in the target domain becomes more dis-      under the sparsity constraint, thus one has to seek alternacriminative against intra-class variations as a result of the      tive methods to approximate the solution, e.g., the greedy
learning process that integrates with source domain data.          algorithms Matching Pursuit (MP) (Mallat and Zhang 1993)
                                                                   and Orthogonal Matching Pursuit (OMP) (Pati et al. 1993),
                                                                   which sequentially select the dictionary atoms. More details
3 Dictionary Learning                                              on optimizing the objective function under the l0 -norm con-
                                                                   straint are given in Sect. 3.3.
3.1 Reconstruction
                                                                   3.2.2 Dictionary Learning with l1 -Norm
$$
Let y ∈ n denote an n-dimensional input signal, and suppose it can be reconstructed by the linear transformation of an    The Basis Pursuit (BP) (Chen et al. 1993) suggests an alterN -dimensional projection coefficient x ∈  N via a projec-        native sparse solution by relaxing the l0 -norm with the higher
$$
$$
tion dictionary D ∈ n×N . Considering the reconstruction          order l1 -norm. The dictionary learning problem in Eq. (3) can
$$
error, the transformation can be formulated as:                    be reformulated as follows with the l1 -norm constraint:
$$
y = Dx + E(x).                                              (1)    E(x) = y − Dx22 , s.t.x1 ≤ T.                            (4)
$$
where we use E(x) to represent the reconstruction error, then      Again, such a problem can be solved iteratively by alternatthe optimal dictionary and coefficient can be obtained by          ingly optimizing D or the sparse code x while fixing the
$$
minimizing E(x). We quantitatively measure E(x) using:             other. When the dictionary D is fixed, the optimization probE(x) = y − Dx22 .                                         (2)    lem is equivalent to a linear regression problem with l1 -norm
$$
                                                                   regularization on the coefficients, which can be solved by
It is worth to point out that if the dimension of the projection   the feature-sign search algorithm (Lee et al. 2006). When
coefficient x is larger than the dimension of input signal y,      the sparse code x is fixed, the problem is reduced to a Least
i.e., N > n, the solution to the unconstrained optimization        square problem with quadratic constraints, so that it can be
problem in Eq. (2) is not unique, thus it leads to the over-       solved by the Lagrange dual as in Lee et al. (2006).
fitting problem.
                                                                   3.3 Classification via Dictionary Learning
3.2 Sparsity Constraints
                                                                   A classifier f (x) can be directly employed to the sparse
The sparsity constraints for dictionary learning attract more
                                                                   representation x for classification, and the classifier can be
attention recently, and applications that can benefit from spar-
                                                                   obtained by satisfying:
sity include compression, regularization in inverse problems,
$$
etc. The commonly used sparsity constraints are l0 -norm and       W = arg min L{h, f (x, W )} + λW 2F ,                      (5)
$$
l1 -norm.                                                                      W
                                                                   where L is the classification loss function, e.g., quadratic loss
3.2.1 Dictionary Learning with l0 -Norm                            function and hinge loss function, h indicates the label of x,
                                                                   W denotes the classifier parameters and λ is a regularization
l0 -norm is the lowest normalization form, and it indicates        parameter for preventing overfitting. However, separating the
the solution with fewest non-zero entries. When learning a         dictionary learning stage from the classification procedure
dictionary with the l0 -norm sparse constraint, Eq. (2) can be     might lead to a suboptimal D. Previous approaches (Zhang
formulated as:                                                     and Li 2010; Yang et al. 2010; Mairal et al. 2008a,b, 2009;
                                                                   Jiang et al. 2011) attempt to jointly learn a dictionary and a
$$
E(x) = y − Dx22 , s.t.x0 ≤ T,                           (3)
$$
                                                                   classifier for classification tasks. In this case, the dictionary
where T is the sparsity constraint factor that limits the number   learning problem can be formulated as:
$$
of non-zero elements in the sparse codes, so that the number of items in the decomposition of each x is less than T .       < D, W, x > = arg min y − Dx 22 + L{h, f (x, W )}
$$
                                                                                    D,W,x
                                                                                                                     (6)
Updating both x and D simultaneously is generally NP-hard;
$$
                                                                                + λW 22 , s.t.x0 ≤ T.
$$
however, we can manage to seek an improved D when fixing
x, or seek an optimal x when fixing D. Thus, the construction         An extra classification term can encourage the data to be
of dictionary D is achieved through iteratively minimizing         smooth. However, if we deal with data from two domains, the
the reconstruction error and learning a reconstructive dictio-     classification term can only guarantee the local smoothness
nary for sparse representations (Aharon et al. 2006). Given D,     in each respective domain. Thus, we introduce a new term to
the computation of the sparse code x is generally NP-hard          seek the global smoothness across both domains.
123


<!-- PK PAGE 6 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                                         47
4 Domain Adaptation via Dictionary Learning                                  element in each column of Gc while discarding the remain
                                                                             elements, i.e., we only ensure a one-to-one correspondence
We denote Yt as L n-dimensional target domain instances,                     for each source domain instance:
and Ys as M source domain n-dimensional instances, i.e.,                                 
$$
                                                                                            1, if Gc (i, j) = max(Gc (:, j))
$$
$$
Yt = [yt1 , . . . , ytL ] ∈ n×L and Ys = [ys1 , . . . , ysM ] ∈             Ac (i, j) =                                            (9)
$$
$$
n×M . Learning a reconstructive dictionary pair while pur-                                 0, otherwise.
$$
$$
suing the global smoothness can be accomplished by solving                   Once the set of transformation matrices for all the C catethe following optimization problems:                                         gories are computed, the global transformation matrix A ∈
$$
$$
                                                                              L×M can be obtained by filling all the category-specific
$$
$$
< Dt , Ds , X t , X s > = arg         min           Yt − Dt X t 22         sub-matrices into A:
$$
                                 Dt ,Ds ,X t ,X s
                                                                                  ⎛                     ⎞
                            + Ys − Ds X s 22 + Φ([X t X s ])                      A1
                                                                                  ⎜       A2            ⎟
$$
                            s.t.∀i, [ xti 0 , xsi 0 ] ≤ T,         (7)        ⎜                     ⎟
$$
$$
                                                                             A=⎜               .        ⎟,                          (10)
$$
                                                                                  ⎝              . .    ⎠
where Φ(·) is designed to measure the distances of sim-                                              AC
$$
ilar cross-domain instances of the same category, Dt =
$$
$$
[dt1 , . . . , dtN ] ∈ n×N is the learned target domain dictio-             where all the blank elements are set to 0, so that A is a binary
$$
$$
nary, X t = [xt1 , . . . , xtL ] ∈  N ×L is the set of target domain        matrix. Since A is computed in a category-specific manner,
$$
$$
sparse codes, Ds = [ds1 , . . . , dsN ] ∈ n×N is the learned                target domain training samples can only be connected to
$$
$$
source domain dictionary and X s = [xs1 , . . . , xsM ] ∈  N ×M             those source domain samples of the same category. Thus,
$$
is the set of source domain sparse codes, respectively. The                  overall smoothness across both domains can be guaranteed
number of dictionary items N is set to be larger than either                 after such a transformation. Assuming A leads to a perfect
L or M to ensure that the dictionaries are over-complete. To                 mapping across the sparse codes X t and X s and each matched
define Φ(·), we aim to force the sparse codes that possess the               pair of samples in different domains possesses an identical
$$
same class label to be close to each other, and thus geometri-               representation after encoding, then X tT −AX sT 22 = 0. Since
$$
cally simple decision boundaries are preferred. To this end,                 these two terms are computed with l2 normalization, if they
$$
Zheng et al. (2012) presented a strategy that manually sets                  equal to zero, we can obtain X tT = AX sT , i.e., X t = X s AT .
$$
up a set of correspondence training instances for cross-view                 By transforming the source domain data to match the target
action recognition, where the same action pair performed in                  domain data, we formulate the new objective function as:
different views are encouraged to share the same representa-                 < Dt , Ds , X t , X s >
tion when being projected onto the cross-view dictionary pair.
$$
                                                                               = arg        min           Yt − Dt X t 22 + (Ys − Ds X s )AT 22
$$
Inspired by such a strategy, we measure the cross-domain                               Dt ,Ds ,X t ,X s
$$
divergence by constructing virtual correspondences across                      = arg min Yt − Dt X t 22 + Ys AT − Ds X s AT 22
$$
both domains through a transformation matrix A. Given                                  Dt ,Ds ,X t
$$
Φ([X t X s ]) = X tT − AX sT 22 , Eq. (7) can be written as:                 = arg min Yt − Dt X t 22 + Ys AT − Ds X t 22
$$
                                                                                       Dt ,Ds ,X t
$$
< Dt , Ds , X t , X s > = arg         min           Yt − Dt X t 22           s.t.∀i, xti 0 ≤ T.                                                  (11)
$$
                                 Dt ,Ds ,X t ,X s
                            +Ys − Ds X s 22 + X tT − AX sT 22               Following Zhang and Li (2010), Mairal et al. (2008a;
$$
                            s.t.∀i, [ xti 0 , xsi 0 ] ≤ T.         (8)   2008b, 2009), and Jiang et al. (2011), we include a label
$$
                                                                             consistency regularization term and the classification error
However, in our case, rather than cross-view action pairs,                   of a linear predictive classifier f (x) into the objective functhe data we are dealing with come from different datasets,                   tion to further enhance the global smoothness. Thus, the new
so that setting up correspondence instances is not possible.                 objective function for cross-domain dictionary learning is
We turn to seek an alternative solution to building up such                  updated as:
correspondences. For each category, we introduce a trans-
$$
                                                                             < Dt , Ds , X t , A, W >= arg               min           Yt − Dt X t 22
$$
formation matrix Ac . The general sense of Ac is that it maps                                                       Dt ,Ds ,X t ,A,W
the most similar source domain instance to a target domain                     + Ys AT − Ds X t 22 + αQ − ϑ X t 2 + βH − W X t 22
instance of the same category. We adopt a fuzzy category-
$$
                                                                               s.t.∀i, xti 0 ≤ T,                                                  (12)
$$
specific searching method to compute each Ac . Considering
that Ytc and Ysc are the c-th category data from both domains,               where W are the coefficients of the linear classifier f (x), H
we first compute the Gaussian distances between each pair                    are the class labels of target domain data, ϑ is a linear transof data between Ytc and Ysc , and store the result in a matrix               formation matrix that maps the the original sparse codes to be
Gc . Then Ac can be computed by preserving the maximum                       in correspondence with the target discriminative sparse codes
                                                                                                                                              123


<!-- PK PAGE 7 doc=math_p27 -->
48                                                                                                              Int J Comput Vis (2014) 109:42–59
$$
Q = [q1 , q2 , . . . , q L ] ∈  L×L of the input signal Yt . Specif-         updating stage and sparse coding stage. In the dictionary
$$
$$
ically, qi = [qi1 , qi2 , . . . , qiK ]T = [0, . . . , 1, 1, . . . , 0]T ∈    updating stage, each dictionary element is updated sequen-
$$
$$
 L×1 , and the non-zeros occur at those indices where yti ∈ Yt               tially to better represent the original data in both the source
$$
$$
and X tk ∈ X t share the same class label. Given X t =                        domain and the target domain as well as the discriminative
$$
$$
[x1 , x2 , . . . , x6 ] and Yt = [y1 , y2 , . . . , y6 ], and assuming x1 ,   property along with the training data. When pursuing a better
$$
x2 , y1 and y2 are from class 1, x3 , x4 , y3 and y4 are from                 dictionary D, the sparse codes X t are frozen, and each dictioclass 2, x5 , x6 , y5 and y6 are from class 3, Q is then defined              nary element is updated through a straightforward solution
with the following form:                                                      which tracks down a rank-one approximation to the matrix
 ⎛                             ⎞                                              of residuals. Following K-SVD, the kth element of the dic-
   1 1 0 0 0 0
                                                                              tionary D and its corresponding coefficients, i.e. the kth row
 ⎜1 1 0 0 0 0 ⎟
 ⎜                             ⎟                                              in the coefficient matrix X t , are denoted as dk and xk respec-
 ⎜0 0 1 1 0 0 ⎟
 ⎜                             ⎟                                                                                   j
$$
                                                                              tively. Let Sk = Y − j=k d j xt and we further denote xk
$$
 ⎜0 0 1 1 0 0 ⎟,                                                       (13)
 ⎜                             ⎟
 ⎝0 0 0 0 1 1 ⎠                                                               and Sk as the results we obtain when all zero entries in xk
                                                                              and Sk are discarded, respectively. Thus, each dictionary ele-
   0 0 0 0 1 1
                                                                              ment dk and its correspondingly non-zero coefficients xk can
$$
and H = [h 1 , h 2 , . . . , h L ] ∈ C×L are the class labels of             be computed by
$$
Yt , where the non-zero element indicates the class of an input
$$
                                                                              < dk , xk >= arg min  Sk − dk xk 2F .                       (17)
$$
$$
signal within each column h i = [0, . . . , 1, . . . , 0]T ∈ C×1 .                                  dk , x k
$$
Following the same example in (13), H can be defined as:
                                                                              The approximation in Eq. (17) is achieved through perform-
⎛                            ⎞
   1 1 0 0 0 0                                                                ing Singular Value Decomposition (SVD) on Sk :
⎝0 0 1 1 0 0 ⎠ .                                              (14)
$$
                                                                              SV D( Sk ) = U Σ V T
$$
   0 0 0 0 1 1
$$
                                                                                      dk = U (:, 1)
$$
Scalers α and β are set to control the relative contribution
$$
                                                                                      xk = Σ(1, 1)V (1, :),                                 (18)
$$
of the terms Q − ϑ X t 2 and H − W X t 22 . By solving
the optimization problem in Eq. (12), the reconstructive, dis-                where U (:, 1) indicates the first column of U and V (1, :)
criminative and domain-adaptive dictionary pair Dt and Ds                     indicates the first row of V .
as well as the optimal classifier parameter W can be obtained.                   At the sparse coding stage, we compute the “best match-
                                                                              ing” projections X t of the multidimensional training data
4.1 Optimization                                                              onto the updated dictionary D using an appropriate pursuit
                                                                              algorithm. As introduced above, given the fixed D, the opti4.1.1 Solving WSCDD with the K-SVD algorithm                                  mization of Eq. (16) remains NP-hard under the l0 -norm con-
                                                                              straint. Therefore the OMP algorithm is adopted to approxWe rewrite Eq. (12) as:                                                       imate the solution in a computationally efficient way. The
                                                                              proposed cross-domain dictionary learning method is sum-
$$
 < Dt , Ds , X t , W >= arg min                                               marized in Algorithm 1.
$$
                            Dt ,Ds ,X t ,W
   ⎛         ⎞ ⎛          ⎞
        Yt            Dt                                                      4.1.2 Initialization
   ⎜ Ys AT ⎟ ⎜ Ds ⎟
  ⎜         ⎟ ⎜          ⎟
$$
   ⎝ √α Q ⎠ − ⎝ √αϑ ⎠ X t 2 , s.t.∀i, xt 0 ≤ T, (15)
$$
                                 2         i
$$
      √              √                                                        To initialize Dt and Ds , we run the K-SVD algorithm several
$$
        βH             βW                                                     times on both of them within each category, and then combine
To make it clear, we write the left side of Eq. (15) as                       all K-SVD outputs in each respective domain. To initialize ϑ
$$
                      √        √                                              and W , we employ the multivariate ridge regression model
$$
$$
Y = (YtT , (Ys AT )T , α Q T , √ β H T )T √and the right side
$$
$$
of Eq. (15) as D = (DtT , DsT , (α)ϑ T , (β)W T )T , where                    (Golub et al. 1999) with l2 -norm regularization as follows:
$$
$$
column-wise l2 normalization is applied to D, so that opti-                    ϑ = arg min Q − ϑ X t 2 + ϕ1 ϑ22 ,
$$
                                                                                           ϑ
mizing Eq. (15) is cast as optimizing Eq. (16):                                                                                             (19)
$$
                                                                              W = arg min H − W X t 2 + ϕ2 W 22 ,
$$
$$
< D, X t >= arg min Y − D X t 22 , s.t.∀i, xti 0 ≤ T.                                 W
$$
                       D,X t
                                                                              which yields the following solutions:
                                                                      (16)
$$
                                                                               ϑ = Q X tT (X t X tT + ϕ1 I )−1 ,
$$
Such an optimization problem can be solved using the K-                                                                                     (20)
$$
                                                                              W = H X tT (X t X tT + ϕ2 I )−1 ,
$$
SVD (Aharon et al. 2006) algorithm. Specifically, Eq. (16)
can be solved in an iterative manner through both dictionary                  where X t can be computed given the initialized Dt .
123


<!-- PK PAGE 8 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                      49
     Input : Input signals Yt and Ys , discriminative sparse code Q,       tialize the dictionary with a few different random matri-
             target domain class label H , sparsity constraint             ces in several runs. Such a strategy is applied in our
             parameter T , balancing parameters α and β, dictionary        approach.
             size N and maximum iteration Max.iter .
     Output: Cross-domain dictionary pair D̃t and D̃s , transformation
             matrixes A and ϑ̃, and linear classifier parameter W̃ .       4.2 Classification
 1 Compute A by combining each transformation matrix Ac for all
     C classes;                                                            Since Dt , Ds , ϑ and W are jointly normalized in the opti-
 2 Initialize Dt , Ds , ϑ and W ;                                          mization procedure, they cannot be directly applied to con-
                       ⎛     ⎞       ⎛     ⎞
                         Yt             Dt
                     ⎜ Ys AT ⎟       ⎜ Ds ⎟                                struct the classification framework. Also, since W is obtained
$$
   Reformulate Y = ⎜   √ ⎟           ⎜√ ⎟
$$
$$
                     ⎝ α Q ⎠ and D = ⎝ αϑ ⎠;                               with the un-normalized D, simply re-normalizing D is not
$$
$$
                       √               √
$$
 3                       βH             βW                                 applicable. According to the lemma in Zhang and Li (2010),
$$
 4 D 0 ← D;                                                                D̃t , D̃s , ϑ̃ and W̃ can be computed as:
$$
$$
 5 for i ← 1 to Max.iter do
$$
 6     Sparse coding stage:                                                          dt1    d2           dK
$$
                                                                           D̃t =          , 2t , . . . , Kt
$$
 7      Compute X t using OMP according to:                                         dt 2 dt 2
                                                                                      1                 dt 2
 8
                                                                                     ds1    d2           dK
$$
                           (i−1)                                           D̃s =          , 2s , . . . , Ks
$$
$$
        E(x) = Y − D              X t 22 , s.t.∀i, xti 0 ≤ T,                   ds 2 ds 2
$$
                                                                                      1                 ds 2
                                                                                                                                     (21)
        Dictionary updating stage:                                                ϑ1      ϑ2                ϑK
 9
$$
                                                                            ϑ̃ =        ,        , . . . ,
$$
$$
10    for k ← 1 to N do                                                          ϑ 1 2 ϑ 2 2           ϑ K 2
$$
                                           j
$$
11        Compute Sk = Y − j=k d j xt ;                                             w1      w2                wK
$$
$$
          Discard all zero entries in xk and Sk , and obtain xk and Sk ;    W̃ =           ,        , . . . ,
$$
12
                                                                                    w 1 2 w 2 2           w K 2
13        Apply a Singular Value Decomposition (SVD) operation
          on Sk :                                                             Given a target domain query sample yti , its sparse repre-
$$
          SV D( Sk ) = U V T ,
$$
14
                                                                           sentation xti can be computed through ( D̃)t . With the linear
$$
15        dk ← U (:, 1), xk ← (1, 1)V (1, :)
$$
16    end                                                                  classifier f (x), the label l of yti can be predicted as:
$$
17    D i ← D updated
$$
18 end
$$
                                                                           l = arg min(l j = W̃ xti ).                               (22)
$$
                                                                                      j
19 Decompose D to obtain Ds , Dt , ϑ and W ;
20 Compute D̃t , D̃s , ϑ̃ and W̃ according to Equation (21).
 Algorithm 1: Weakly-Supervised Cross-Domain Dic-                          5 Experiments
 tionary Learning.
                                                                           5.1 Experimental Data Preparation
4.1.3 Convergence Analysis                                                 To demonstrate the effectiveness of the proposed method,
                                                                           we evaluate it on action recognition, image classification
The convergence proof of the proposed WSCDD method                         and event recognition tasks. For event recognition and action
can be given similarly as the K-SVD algorithm (Aharon                      recognition, the source domain data are obtained from an
et al. 2006). At the dictionary updating stage, each dictio-               existing dataset or selected categories of an existing dataset.
nary element and its corresponding coefficients are updated                For image classification, the source domains are constructed
by minimizing quadratic functions, and the remaining dic-                  by choosing 20 image categories (chosen according to the
tionary elements are updated upon the previous updates.                    ascending alphabetic order) and use the first 100 results
Consequently, the MSE of the overall reconstruction error                  returned from Google Image Search for each chosen category
is monotonically decreasing with respect to the dictionary                 as the source domain data, where the indexing procedure is
updating iterations. At the sparse coding stage, computa-                  performed by simply searching the category names. Since the
tion of the “best matched” coefficients under the l0 -norm                 retrieved images are very noisy, we apply the manifold rankconstraint also leads to a reduction in MSE conditioned                    ing (Zhou et al. 2004a,b) algorithm as a pre-processing stage
on the success of the OMP algorithm. Finally, since MSE                    for the source domain data. As the source domain data are
is non-negative, the optimization procedure is monotoni-                   weakly labeled, we allow 5 samples per category as labeled
cally decreasing and bounded by zero from below, thus                      in the source domain. The average ranking scores of the unlathe convergence of the proposed dictionary learning method                 beled source domain data are obtained by treating both the
is guaranteed. The typical strategy to avoid the optimiza-                 target domain data and the labeled source domain data as
tion procedure getting stuck in a local minimum is to ini-                 queries, and rank the unlabeled source domain data. We keep
                                                                                                                               123


<!-- PK PAGE 9 doc=math_p27 -->
50                                                                                              Int J Comput Vis (2014) 109:42–59
Fig. 4 Example images from
video sequences in the UCF
YouTube dataset
the first 20−30 % instances from the ranked source domain        ing dataset, our case closely resembles real-world scenarios,
data for each image category, and filter out the remaining       where the source domain data can contain a wide range of
retrieved data. The same ranking procedure is applied to the     noise levels. In correspondence with the target domain action
action recognition and the event recognition task, where we      categories, we choose 7 body movements from the HMDB51
keep the most highly ranked 30 instances from the source         dataset, including ride bike, dive, golf, jump, kick ball, ride
domain dataset for the former, and the most highly ranked        horse and shoot ball.
80 % instances from the source domain dataset for the latter.       We adopt the dense trajectories (Wang et al. 2011) as
We denote both scenarios of the proposed WSCDDL method           the low-level action video representation to distinguish the
when manifold ranking is utilized or not as WSCDDL-              motion of interest. To leverage the motion information in
MR and WSCDDL-EU respectively in image classification,           the dense trajectories, a set of local descriptors are comaction recognition and event recognition experiments.            puted within space-time volumes around the trajectories
                                                                 at multiple spatial and temporal scales, and these features
5.2 Action Recognition                                           include the HOGHOF (Laptev et al. 2008), the optical flow
                                                                 (Ikizler-Cinbis and Sclaroff 2010) and the Motion BoundThe UCF YouTube dataset and the HMDB51 dataset are               ary Histogram (MBH) (Dalal et al. 2006). Specifically, the
used for the action recognition task, where the UCF YouTube      HOGHOF feature is a combination of appearance informadataset is used as the target domain and the HMDB51 dataset      tion (captured by HOG Dalal and Triggs 2005) and local
is used as the source domain. The UCF YouTube dataset            motion probabilities (captured by Histogram of Optical Flow
(shown in Fig. 4) is a realistic dataset that contains camera    (HOF)). Since motion is the most important cue for analyzshaking, cluttered background, variations in actors’ scale,      ing actions, the optical flow works effectively by computvariations in illumination and view point changes. There are     ing the relative motion between the observer and the scene.
11 actions including cycling, diving, golf swinging, soccer      MBH represents the gradient of the optical flow by sepajuggling, jumping, horse-back riding, basketball shooting,       rately computing the derivatives for the horizontal and vervolleyball spiking, swinging, tennis swinging and walking        tical components of the optical flow, so that relative motion
with a dog, and these actions are performed by 25 actors.        between pixels is encoded. Changes in the optical flow field
The HMDB51 dataset (shown in Fig. 5) contains video              being preserved and constant motion information being supsequences which are extracted from commercial movies as          pressed, the MBH descriptor can effectively eliminate noise
well as YouTube, and it represents a fine multifariousness of    caused by background motion compared with video stabilizalight conditions, situations and surroundings in which actions   tion (Ikizler-Cinbis and Sclaroff 2010) and motion compencan appear, different recording camera types and viewpoint       sation (Uemura et al. 2008) approaches (Wang et al. 2011).
changes. Since the HMDB51 dataset is a more challeng-            Despite its powerful capability of describing action motions,
123


<!-- PK PAGE 10 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                               51
Fig. 5 Example images from
video sequences in the selected
body movements of the
HMDB51 dataset
the dense trajectories come with two weaknesses: (1) trajec-      200 local dense trajectories features are randomly selected
tories tend to drift from their initial locations during motion   from each video sequence when constructing the codebook.
tracking, which is a common problem in tracking; (2) the          We run our method on five different partitions of the UCF
large quantity of local trajectory descriptors leads to high      YouTube dataset, where we randomly choose all action catcomputational complexity and memory consumption for the           egories performed by the number of 5/9/16/20/24 actors as
coding methods, such as VQ and SC. To cope with the first         the training actions while using the remaining actions as the
issue, the length of a trajectory is limited to a pre-defined     testing actions for each partition. 30 most relevant actions are
number of frames. Taking the second issue into account,           chosen from each of the 7 source domain categories using
a Locality-constrained Linear Coding (LLC) (Wang et al.           manifold ranking, and they are represented in the same man2010) scheme is adopted instead of VQ and SC. LLC rep-            ner as the target domain actions and coded with the same
resents the low-level dense trajectories by multiple bases.       codebook. The weight α on the label constraint term and the
In addition to achieving less quantization error, the explicit    weight β on the classification error term are set as 4 and
locality adaptor in LLC guarantees the local smooth sparsity.     2 respectively, and 50 iterations of SVD decomposition are
$$
    Dense trajectories are extracted from raw action video √      executed during optimization (We use the same values of α,
$$
sequences with 8 spatial scales spaced by a factor of 1/ 2,       β and K-SVD maximum iteration for the image classificaand feature points are sampled on a grid spaced by 5 pixels       tion and event recognition tasks). To avoid over-fitting, the
and tracked in each scale, separately. Each point at frame t      dictionary size is set to be larger when more training data
is tracked to the next frame t + 1 by median filtering in a       are available at the training stage. The results are demondense optical flow field. To avoid the drifting problem, the      strated in Table 1 for all five partitions, where we use the size
$$
length of a trajectory is limited to 15 frames. HOGHOF and        of 200, 300, 500, 700 and 900 for each partition. We comMBH are computed within a 32 × 32 × 15 volume along the           pare the performance of the baseline LLC, sparse coding
$$
dense trajectories, where each volume is sub-divided into a       methods K-SVD (Aharon et al. 2006) and LC-SVD (Jiang et
$$
spatio-temporal grid of size 2 × 2 × 3 to impose more struc-      al. 2011), and transfer learning methods FR (Daumé 2007)
$$
tural information in the representation. Considering both effi-   and A-SVM (Yang et al. 2007) with the proposed WSCDDL
ciency and the construction error, LLC coding scheme is           method. Results are reported on both scenarios where the
applied to the low-level local dense trajectories features with   source domain data are included or excluded in Tables 1 and
30 local bases, and the codebook size is set to be 4,000 for      2 respectively. Comparing Tables 1 and 2, we can discover
all training-testing partitions. To reduce the complexity, only   that for many cases, brute-forcing the knowledge from the
                                                                                                                        123


<!-- PK PAGE 11 doc=math_p27 -->
52                                                                                                                    Int J Comput Vis (2014) 109:42–59
Table 1 Performance
                                             Algorithm               LLC (Wang K-SVD (Aharon LC-KSVD (Jiang WSCDDL-                     WSCDDL-MR
comparison between the
                                                                     et al. 2010) et al. 2006) et al. 2011) EU
WSCDDL and other methods on
the UCF YouTube dataset when                 Dictionary learning     N/A         Unsupervised         Supervised           Supervised   Supervised
the source domain data are only
used by the WSCDDL                           Source data             No          No                   No                   Yes          Yes
                                             24 actors (%)           86.67       82.22                86.67                88.89        91.11
                                             20 actors (%)           75.42       68.75                75.42                77.50        78.30
                                             16 actors (%)           70.88       63.96                72.08                73.03        73.03
                                             09 actors (%)           61.41       55.70                65.25                66.31        66.05
                                             05 actors (%)           54.10       50.05                56.55                56.66        57.19
Best results are in bold
Table 2 Recognition results on the UCF YouTube dataset when using the HMDB dataset as the source domain
Algorithm                LLC (Wang       K-SVD (Aharon             LC-KSVD (Jiang     FR (Daumé     A-SVM (Yang et         WSCDDL-EU    WSCDDL-MR
                         et al. 2010)    et al. 2006)              et al. 2011)       2007)         al. 2007)
Dictionary learning      N/A             Unsupervised              Supervised         Supervised    Supervised             Supervised   Supervised
Source data              Yes             Yes                       Yes                Yes           Yes                    Yes          Yes
24 actors (%)            86.67           77.78                     82.22              83.74         82.51                  88.89        91.11
20 actors (%)            70.21           72.08                     75.42              74.88         79.05                  77.50        78.30
16 actors (%)            70.17           67.54                     72.08              71.56         72.46                  73.03        73.03
09 actors (%)            61.80           59.15                     64.72              62.77         61.65                  66.31        66.05
05 actors (%)            53.35           48.88                     54.10              54.09         51.54                  56.66        57.19
Best results are in bold
Table 3 Performance comparison of the WSCDDL with state-of-the-art methods under the leave-one-actor-out setting on the UCF YouTube dataset
Methods                  Liu et al. (2009)            Ikizler-Cinbis and Sclaroff (2010)           BoF             WSCDDL-EU            WSCDDL-MR
Results (%)              71.2                         75.21                                        80.02           81.13                82.32
Best result is in bold
source domain into the target domain irrespective of their                             For image representations, we choose the dense SIFT
divergence can cause certain performance degeneration. On                           (Lowe et al. 2004) plus LLC (Wang et al. 2010) model. The
$$
the other hand, the proposed WSCDDL method consistently                             SIFT descriptors are extracted from 16 × 16 pixel patches
$$
leads to the best performance over all the partitions. Figure 7                     and densely sampled from each image on a grid with the step
shows the convergence analysis and performance of vary-                             size of 8 pixels. We evaluate our method with both dictioing dictionary size of the WSCDDL-MR method. Figure 10                              nary sizes 1024 and 4096. The same values of the weights
shows the confusion matrix comparisons between the LLC                              α, β and K-SVD iterations are adopted as in the action
method and the WSCDDL-MR method for all five partitions.                            recognition task. We compare the performance of the proIn order to compare the WSCDDL method with state-of-the-                            posed WSCDDL approach and state-of-the-art approaches
art methods, we further demonstrate its performance under                           in Table 4. Results on six different numbers of training data
the leave-one-actor-out setting in Table 3.                                         are reported, and all the results are averaged over 5 times
                                                                                    of different randomly selected training and testing images
5.3 Image Classification                                                            to guarantee the reliability. For the LLC (Wang et al. 2010),
                                                                                    K-SVD (Aharon et al. 2006) and LC-SVD (Jiang et al. 2011)
We utilize the Caltech101 dataset as the target domain and                          methods, we consider both scenarios of whether the source
some collected Web images as the source domain for the                              domain data are included. For fair comparisons, we choose
image classification task. The Caltech101 image dataset                             both dictionary size 1,024 and 4,096 to test the proposed
(shown in Fig. 6) consists of 101 categories (e.g., accor-                          method. Figure 6 shows samples of 6 categories with high
dion, cannon, and chair), and each category contains 30–800                         classification accuracies when using 30 training images per
images. The source domain data of the Caltech101 dataset                            category. As shown in Fig. 8, the proposed WSCDDL method
are constructed by a set of images returned by Google Image                         results in larger improvements over others when fewer samSearch (shown in Fig. 6) (Fig. 7).                                                  ples are used for training, which demonstrates its effective-
123


<!-- PK PAGE 12 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                        53
Fig. 6 Example images from classes with high classification accuracy from the Caltech101 dataset
Fig. 7 Performance analysis on the UCF YouTube dataset when actions performed by 24 actors are used in the training data. a The optimization
process of the objective function for WSCDDL-MR with 50 iterations. b Performance when varying the dictionary size
ness in terms of utilizing the source domain data. Figure 9             variations on object location, pose, and size. Similar as the
demonstrates the performance of all the 101 image categories            strategy adopted in constructing the source domain for the
(Fig. 10).                                                              Caltech101 dataset, 400 images from 20 categories indexed
   We further evaluate our method on the more challeng-                 by Google Images are used as the source domain. We evaluate
ing Caltech 256 dataset (Griffin et al. 2007), which con-               our approach on both 15 and 30 training images per class,
tains 30,607 images of 256 categories. Compared to the Cal-             and set the dictionary size to 1,024 or 4,096 respectively.
tech101 dataset, it is much more difficult due to the large             We compare our method with state-of-the-art approaches as
                                                                                                                                123


<!-- PK PAGE 13 doc=math_p27 -->
54                                                                                                           Int J Comput Vis (2014) 109:42–59
Table 4 Comparison with the
state-of-the-art methods on the     Number of training samples                 5 (%)      10 (%)     15 (%)      20 (%)      25 (%)      30 (%)
Caltech101 dataset
                                    Malik (Zhang et al. 2006)                  46.6       55.8       59.1        62.0        −           66.2
                                    Griffin (Griffin et al. 2007)              44.2       54.5       59.0        63.3        65.8        67.6
                                    SRC (Wright et al. 2009)                   48.8       60.1       64.9        67.7        69.2        70.7
                                    LLC (Wang et al. 2010)                     51.15      59.77      65.43       67.74       70.16       73.44
                                    LLC (Wang et al. 2010) (source)            21.43      36.37      51.11       60.02       67.55       72.17
                                    K-SVD (Aharon et al. 2006)                 39.63      50.30      58.82       64.73       67.92       71.04
                                    K-SVD (Aharon et al. 2006) (source)        20.42      35.64      44.93       53.69       60.07       66.07
                                    LC-KSVD (Jiang et al. 2011)                46.25      57.73      68.45       70.79       72.83       73.75
                                    LC-KSVD (Jiang et al. 2011) (source)       48.95      62.71      67.14       70.17       73.39       75.05
$$
                                    WSCDDL-EU (N = 1,024)                      60.62      67.81      70.09       72.98       76.17       77.30
$$
$$
                                    WSCDDL-MR (N = 1,024)                      61.31      68.69      71.59       74.73       76.82       78.44
$$
$$
                                    CRBM (Sohn et al 2011) (N = 4,096)         56.7       66.7       71.3        74.2        76.2        77.8
$$
$$
                                    WSCDDL-EU (N = 4,096)                      63.47      68.90      70.88       74.01       77.54       78.68
$$
$$
Best results are in bold            WSCDDL-MR (N = 4,096)                      64.05      69.31      72.39       75.22       78.40       79.02
$$
Fig. 8 Performance analysis on the Caltech101 dataset. a The opti-        the number of training samples per class varies from 5 to 30 (The dicmization process of the objective function for WSCDDL-MR with 50          tionary size of WSCDDL-MR is set to 1,024)
iterations. b Means and standard deviations of different methods when
Fig. 9 Performance on all the categories of the Caltech101 dataset achieved by the WSCDDL-MR (The dictionary size of WSCDDL-MR is set
to 1,024) method when using 30 training images per category
123


<!-- PK PAGE 14 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59     55
Fig. 10 Comparison of the
confusion matrixes between the
baseline ScSPM and the
WSCDDL on five different data
partitions of the UCF YouTube
dataset
                                    123


<!-- PK PAGE 15 doc=math_p27 -->
56                                                                                                       Int J Comput Vis (2014) 109:42–59
Table 5 Recognition results on the Caltech256 dataset                    dataset was collected by Kodak from about 100 real users
Number of training samples                   15 (%)          30 (%)      over the period of one year, and it includes two video sub-
                                                                         sets from two different sources, where the first part contains
Griffin et al. (2007)                        28.3            34.10       Kodak’s video data which includes 1,358 video clips conYang et al. (2009)                           27.73           34.02       tributed by involved users and the second part contains 1,873
K-SVD (Aharon et al. 2006)                   25.33           30.62       clips downloaded from the YouTube website after removing
SRC (Wright et al. 2009)                     27.86           33.33       TV commercial videos and low-quality videos. Similarly,
$$
WSCDDL-EU (N = 1,024)                        29.68           35.78       the additional videos collected by Duan et al. (2012b) conWSCDDL-MR (N = 1,024)                        31.89           36.86       tain two parts, which are the self-collected consumer videos
$$
$$
LLC (Wang et al. 2010) (N = 4,096)           34.36           41.19       and downloaded YouTube videos. To resemble the real-world
$$
$$
CRBM (Sohn et al 2011) (N = 4,096)           35.09           42.05       scenario, the downloaded YouTube videos are not additionWSCDDL-EU (N = 4,096)                        36.21           42.33       ally annotated so that they can remain in a loosely labeled
$$
$$
WSCDDL-MR (N = 4,096)                        37.42           42.80       setting. Thus, only the self-collected consumer videos from
$$
                                                                         the dataset used in Duan et al. (2012b) possess precise labels.
Best results are in bold
                                                                         The total numbers of consumer videos and YouTube videos
                                                                         are 195 and 906, respectively, and each video belongs to
shown in Table 5, where our approach consistently leads to               only one event category. Following the settings in Duan et al.
the best performance. Figure 11 shows samples from 5 cat-                (2012b), six events, namely “birthday”, “picnic”, “parade”,
egories with high classification accuracies when using 30                “show”, “sports” and “wedding” are chosen for experiments.
images per category.                                                     The target domain is constructed using both the consumer
                                                                         videos from the Kodak dataset and additional self-collected
5.4 Event Recognition                                                    consumer videos in Duan et al. (2012b). On the other hand,
                                                                         the second part of the Kodak dataset and the loosely labeled
We compare our proposed method WSCDDL with state-                        YouTube videos used in Duan et al. (2012b) constitute the
of-the-art transfer learning methods on the event recogni-               source domain. In the target domain, three consumer videos
tion task using the Kodak Consumer Videos and a set of                   from each event (18 videos in total) are randomly chosen
additional videos. The Kodak consumer video benchmark                    as the labeled training videos and the remaining videos are
Fig. 11 Example images of the categories with high classification accuracy from the Caltech256 dataset
123


<!-- PK PAGE 16 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                                                                                                                       57
                                                                                                            WSCDDL-MR
                                                                                                                                                                         used as the test data. In order to set up a fair comparison
$$
                                                                                                                            58.42 ± 2.25
$$
$$
                                                                                                                                                          62.60 ± 1.76
$$
$$
                                                                                                                                           39.11 ± 2.76
$$
                                                                                                                                                                         in correspondence with the experimental results in Duan
                                                                                                                                                                         et al. (2012b), we use the same low-level features, which
                                                                                                                                                                         are SIFT features and ST features. For each sampled frame,
                                                                                                                                                                         which is sampled at the sampling rate of 2 frames per sec-
                                                                                                                                                                         ond, the 128-dimensional SIFT features are extracted from
                                                                                                            WSCDDL-Eu
$$
                                                                                                                                                          61.92 ± 2.89
$$
$$
                                                                                                                            57.18 ± 0.84
$$
$$
                                                                                                                                           37.80 ± 1.77
$$
                                                                                                                                                                         the salient regions, which are detected by the Difference-of-
                                                                                                                                                                         Gaussians (DoG) interest point detector (Lowe et al. 2004).
                                                                                                                                                                         The 162-dimensional local ST feature is the concatenation
                                                                                                                                                                         of the 72-dimensional HOG feature and the 90-dimensional
                                                                                                                                                                         HOF feature. We also conduct experiments in the same three
                                                                                                                                                                         cases as in Duan et al. (2012b): (a) dictionaries and classi-
                                                                                                            A-MKL (Duan
                                                                                                                                                                         fiers are learned based on SIFT features, (b) dictionaries and
$$
                                                                                                                            47.14 ± 2.34
$$
$$
                                                                                                                                                          58.20 ± 1.87
$$
$$
                                                                                                                                           37.24 ± 1.58
$$
                                                                                                            et al. 2012b)
                                                                                                                                                                         classifiers are learned based on ST features and (c) dictio-
                                                                                                                                                                         naries and classifiers are learned on both SIFT and ST fea-
                                                                                                                                                                         tures. Based on the same experimental settings as in Duan et
                                                                                                                                                                         al. (2012b), we compare our method WSCDDL with SVM-
                                                                                                                                                                         AT, SVM-T, FR (Daumé 2007), A-SVM (Yang et al. 2007),
                                                                                                            DTSVM (Duan
                                                                                                                                                                         MKL (Duan et al. 2009), DTSVM (Duan et al. 2009) and
$$
                                                                                                                            52.36 ± 1.88
$$
$$
                                                                                                                                           31.07 ± 2.60
$$
$$
                                                                                                                                                          53.78 ± 2.99
$$
                                                                                                            et al. 2009)
                                                                                                                                                                         A-MKL (Duan et al. 2012b), where SVM-AT denotes the
                                                                                                                                                                         case that labeled training samples are obtained from both the
                                                                                                                                                                         target domain and the source domain, and correspondingly
                                                                                                                                                                         SVM-T denotes the case that labeled training samples are
                                                                                                                                                                         only obtained from the target domain. Table 6 demonstrates
                                                                                                            MKL (Duan et
                                                                                                                                                                         the recognition results of the proposed WSCDDL method
$$
                                                                                                                                                          46.92 ± 2.53
$$
$$
                                                                                                                            47.19 ± 2.59
$$
$$
                                                                                                                                           35.34 ± 1.55
$$
                                                                                                                                                                         and other cross-domain methods. We can observe that SVM-
                                                                                                            al. 2009)
                                                                                                                                                                         T consistently outperforms SVM-AT in both scenarios of
                                                                                                                                                                         (b) and (c), which indicates that brutally including the ST
                                                                                                                                                                         features of source domain videos may degrade the recogni-
                    Table 6 Comparison with the state-of-the-art methods on the Kodak and YouTube dataset
                                                                                                                                                                         tion performance. The proposed WSCDDL method consis-
                                                                                                            A-SVM (Yang
                                                                                                                                                                         tently outperforms other cross-domain methods in all three
$$
                                                                                                                                                          32.40 ± 4.99
$$
$$
                                                                                                                            38.42 ± 7.93
$$
$$
                                                                                                                                           24.95 ± 1.25
$$
                                                                                                            et al. 2007)
                                                                                                                                                                         cases.
                                                                                                                                                                         6 Conclusion
$$
                                                                                                                                           28.44 ± 2.61
$$
$$
                                                                                                                                                          44.11 ± 3.57
$$
$$
                                                                                                                            49.98 ± 5.63
$$
                                                                                                            FR (Daumé
                                                                                                                                                                         In this paper, we have presented a novel visual categoriza-
                                                                                                                                                                         tion framework using the weakly-supervised cross-domain
                                                                                                            2007)
                                                                                                                                                                         dictionary learning algorithm. Auxiliary domain knowledge
                                                                                                                                                                         is utilized to span the intra-class diversities, so that the over-
                                                                                                                                                                         all performance of the original system can be improved. The
                                                                                                                                                                         proposed framework only requires a small set of labeled
$$
                                                                                                                                           24.73 ± 2.22
$$
$$
                                                                                                                            53.93 ± 5.58
$$
$$
                                                                                                                                                          36.23 ± 3.37
$$
                                                                                                                                                                         samples in the source domain. By means of a transforma-
                                                                                                            SVM-AT
                                                                                                                                                                         tion matrix, dictionary learning is performed on both the
                                                                                                                                                                         source domain data and the target domain data while no
                                                                                                                                                                         correspondence annotations between the two domains are
                                                                                                                                                                         required. Promising results are achieved on action recogni-
$$
                                                                                                                                                          42.00 ± 4.94
$$
$$
                                                                                                                                           32.56 ± 2.08
$$
$$
                                                                                                                            42.32 ± 5.50
$$
                                                                                                                                                                         tion, image classification and event recognition tasks, where
                                                                                                            SVM-T
                                                                                                                                                                         knowledge from either the Web or a related dataset is
                                                                                                                                                                         transferred to standard benchmark datasets. The proposed
                                                                                                                                                                         framework leads to an interesting topic for future investi-
                                                                                                                                                                         gation when large scale source and target domain data are
                                                                                                                                             (b)
                                                                                                                              (a)
                                                                                                                                                            (c)
                                                                                                                                                                         available.
                                                                                                                                                                                                                               123


<!-- PK PAGE 17 doc=math_p27 -->
58                                                                                                                Int J Comput Vis (2014) 109:42–59
References                                                                   Ji, S., Xu, W., Yang, M., & Yu, K. (2013). 3D convolutional neural
                                                                                 networks for human action recognition. IEEE Transaction on Pattern
Aharon, M., Elad, M., & Bruckstein, A. (2006). K-SVD: An algorithm               Analysis and Machine Intelligence, 35, 221–231.
   for designing overcomplete dictionaries for sparse representation.        Jiang, Z., Lin, Z., & Davis, L. S. (2011) Learning a discriminative
   IEEE Transaction on Signal Processing, 54(11), 4311–4322.                     dictionary for sparse coding via label consistent K-SVD. CVPR.
Borgwardt, K. M., Gretton, A., Rasch, M. J., Kriegel, H. P., Schölkopf,      Junejo, I. N., Dexter, E., Laptev, I., & Pérez, P. (2011). View-
   B., & Smola, A. J. (2006). Integrating structured biological data             independent action recognition from temporal self-similarities. IEEE
   by kernel maximum mean discrepancy. Bioinformatices, 22, e49–                 Transaction on Pattern Analysis and Machine Intelligence, 33, 172–
   e57.                                                                          185.
Boureau, Y., Bach, F., LeCun, Y., & Ponce, J. (2010). Learning mid-          Kuehne, H., Jhuang, H., Garrote, E., Poggio, & T., Serre, T. (2011).
   level features for recognition. CVPR.                                         HMDB: A large video database for human motion recognition.
Cao, L., Liu, Z., & Huang, T. S. (2010). Cross-dataset action detection.         ICCV.
   CVPR.                                                                     Kullback, S. (1987). The kullback-leibler distance. The American StaCao, X., Wang, Z., Yan, P., & Li, X. (2013). Transfer learning for pedes-        tistician, 41, 340–341.
   trian detection. Neurocomputing, 100, 51–57.                              Laptev, I., Marszalek, M., Schmid, C., & Rozenfeld, B. (2008). Learning
Chen, S. S., Donoho, L. D., & Saunders, A. M. (1993). Atomic decom-              realistic human actions from movies. CVPR.
   position by basis pursuit. IEEE Transaction on Signal Processing,         Laptev, I. (2005). On space-time interest points. Internation Journal of
   41(12), 3397–3415.                                                            Computer Vision, 64, 107–123.
Dalal, N., & Triggs, B. (2005). Histograms of oriented gradients for         Lazebnik, S., Schmid, C., & Ponce, J. (2006) Beyond bags of features:
   human detection. CVPR.                                                        Spatial pyramid matching for recognizing natural scene categories.
Dalal, N., Triggs, B., & Schmid, C. (2006). Human detection using                CVPR.
   oriented histograms of flow and appearance. ECCV.                         Lee, H., Battle, A., Raina, R., & Andrew, Ng. (2007). Efficient sparse
Daumé III, Hal, Frustratingly easy domain adaptation, Proceedings of             coding algorithms. NIPS.
   the Annual Meeting Association for Computational Linguistics, pp.         Lee, H., Battle, A., Raina, R., & Ng, A. (2006). Efficient sparse coding
   256–263 (2007).                                                               algorithms. NIPS.
Dikmen, M., Ning, H., Lin, D. J., Cao, L., Le, V., Tsai, S. F., et al.       Li, R., & Zickler, T. (2012). Discriminative virtual views for cross-view
   (2008). Surveillance event detection. TRECVID Video Evaluation                action recognition. CVPR.
   Workshop.                                                                 Liu, J., Luo, J., & Shah, M. (2009). Recognizing realistic actions from
Dollár, P., Rabaud, V., Cottrell, G., & Belongie, S. (2005). Behavior            videos “in the wild”. CVPR.
   recognition via sparse spatio-temporal features, IEEE International       Liu, J., Shah, M., Kuipers, B., & Savarese, S. (2011). Cross-view action
   Workshop on Visual Surveillance and Performance Evaluation of                 recognition via view knowledge transfer. CVPR.
   Tracking and Surveillance, pp. 65–72 .                                    Liu, L., Shao, L., & Rockett, P. (2012). Boosted key-frame selection
Duan, L., Tsang, I. W., & Xu, D. (2012). Domain transfer multiple                and correlated pyramidal motion-feature representation for human
   kernel learning. IEEE Transaction on Pattern Analysis and Machine             action recognition. Pattern Recognition. doi:10.1016/j.patcog.2012.
   Intelligence, 34, 465–479.                                                    10.004.
Duan, L., Tsang, I. W., Xu, D., & Maybank, J. S. (2009). Domain              Liwicki, S., Zafeiriou, S., Tzimiropoulos, G., & Pantic, M. (2012). Effi-
   transfer svm for video concept detection. CVPR.                               cient online subspace learning with an indefinite kernel for visual
Duan, L., Xu, D., Tsang, I. W., & Luo, J. (2012). Visual event recognition       tracking and recognition. IEEE Transaction on Neural Networks and
   in videos by learning from web data. IEEE Transaction on Pattern              Learning Systems, 23, 1624–1636.
   Analysis and Machine Intelligence, 34, 1667–1680.                         Loui, A., Luo, J., Chang, S., Ellis, D., Jiang, W., Kennedy, l., Lee, K.,
Duchenne, O., Laptev, I., Sivic, J., Bach, F., & Ponce, J. (2009). Auto-         & Yanagawa, K. (2007). Kodak’s consumer video benchmark data
   matic annotation of human actions in video. ICCV.                             set: concept definition and annotation. IWMIR.
Fei-Fei, L. (2006). Knowledge transfer in learning to recognize visual       Lowe, D. (2004). Distinctive image features from scale-invariant key-
   objects classes. ICDL.                                                        points. International Journal of Computer Vision, 60, 91–110.
Fei-Fei, L., Fergus, R., & Perona, P. (2007). Learning generative            Lowe, D. G., Luo, J., Chang, S. F., Ellis, D., Jiang, W., Kennedy, L., et
   visual models from few training examples. An incremental bayesian             al. (2004). Distinctive image features from scale-invariant keypoints.
   approach tested on 101 object categories. Computer Vision and                 International Journal of Computer Vision, 60(2), 91–110.
   Image Understanding, 106, 59–70.                                          Mairal, J., Bach, F., Ponce, J., Sapiro, G,. & Zisserman, A. (2008).
Gao, X., Wang, X., Li, X., & Tao, D. (2011). Transfer latent variable            Discriminative learned dictionaries for local image analysis. CVPR.
   model based on divergence analysis. Pattern Recognition, 44, 2358–        Mairal, J., Bach, F., Ponce, J., Sapiro, G., & Zisserman, A. (2009).
   2366.                                                                         Supervised dictionary learning. NIPS.
Gilbert, A., Illingworth, J., & Bowden, R. (2011). Action recognition        Mairal, J., Leordeanu, M., Bach, F., Hebert, M., & Ponce, J. (2008)
   using mined hierarchical compound features. IEEE Transaction on               Discriminative sparse image models for class-specific edge detection
   Pattern Analysis and Machine Intelligence, 33, 883–897.                       and image interpretation. ECCV.
Golub, G., Hansen, P., & O’Leary, D. (1999). Tikhonov regularization         Maji, S., Berg, A., & Malik, J. (2013). Efficient classification for additive
   and total least squares. Journal on Matrix Analysis and Applications,         Kernel SVMs. IEEE Transaction on Pattern Analysis and Machine
   21(1), 185–194.                                                               Intelligence, 35, 66–77.
Gregor, K., & LeCun, Y. (2010). ICML: Learning fast approximations           Mallat, S. G., & Zhang, Z. (1993). Matching pursuits with time-
   of sparse coding. New York: Saunders.                                         frequency dictionaries. IEEE Transaction on Signal Processing,
Griffin, G., Holub, A., & Perona, P. (2007). Caltech-256 object category         41(12), 3397–3415.
   dataset, CIT Technical Report 1694.                                       Marszalek, M., Laptev, I., & Schmid, C. (2009). Actions in context.
Ikizler-Cinbis, N., Sclaroff, S. (2010). Object, scene and actions: Com-         CVPR.
   bining multiple features for human action recognition. ECCV.              Orrite, C., Rodríguez, M., & Montañés, M. (2011). One-sequence learnJégou, H., Douze, M., & Schmid, C. (2010). Improving bag-of-features             ing of human actions. Human Behavior Unterstanding, 7065, 40–51.
   for large scale image search. International Journal of Computer           Pan, S. J., & Yang, Q. (2010). A survey on transfer learning. IEEE
   Vision, 87, 316–336.                                                          Transaction on Knowledge and Data Engineering, 22, 1345–1359.
123


<!-- PK PAGE 18 doc=math_p27 -->
Int J Comput Vis (2014) 109:42–59                                                                                                                   59
Pati, Y., & Ramin, R. (1993). Orthogonal matching pursuit: Recursive          Yang, L., Jin, R., Sukthankar, R., & Jurie, F. (2008). Unifying discrimi-
   function approximation with applications to wavelet decomposition.           native visual codebook generation with classifier training for object
   Asilomar Conference on Signals, Systems and Computers, 4, 40–44.             category recognition. CVPR.
Qiu, Q., Patel, V. M., Turaga, P., & Chellappa, R. (2012). Domain adap-       Yang, J., Yan, R., & Hauptmann, A. G. (2007). Cross-domain video
   tive dictionary learning. ECCV.                                              concept detection using adaptive SVMs. ACM MM.
Raina, R., Battle, A., Lee, H., Packer, B., & Ng, A. Y. (2007). Self-taught   Yang, J., Yu, K., Gong, Y., Huang, T. (2009). Linear spatial pyramid
   learning: Transfer learning from unlabeled data. ICML.                       matching using sparse coding for image classification. CVPR.
Schuldt, C., Laptev, I., & Caputo, B. (2004). Recognizing human               Yang, J., Yu, K., & Huang, T. (2010). Supervised translation-invariant
   actions: A local svm approach. ICPR.                                         sparse coding. CVPR.
Sidenblada, H., & Black, M. J. (2003). Learning the statistics of people      Yao, A., Gall, J., & Van, L. G. (2012). Coupled action recognition
   in images and video. International Journal of Computer Vision, 54,           and pose estimation from multiple views. International Journal of
   183–209.                                                                     Computer Vision, 100, 16–37.
Sohn, K., Jung, D., Lee, H., & Hero, A. (2011) Efficient learning of          Zafeiriou, S., Tzimiropoulos, G., Petrou, M., & Stathaki, T. (2012) Reg-
   sparse, distributed, convolutional feature representations for object        ularized kernel discriminant analysis with a robust kernel for face
   recognition. ICCV.                                                           recognition and verification. NIPS.
Su, Y., & Jurie, F. (2012). Improving image classification using semantic     Zhang, H., Berg, C. A., Maire, M., & Malik, J. (2006) SVM-KNN:
   attributes. International Journal of Computer Vision, 100, 1–19.             Discriminative nearest neighbor classification for visual category
Uemura, H., Ishikawa, S., Mikolajczyk, K. (2008). Feature tracking and          recognition. CVPR.
   motion compensation for action recognition. BMVC.                          Zhang, Q., & Li, B. (2010). Discriminative K-SVD for dictionary learnWang, H., Klaser, A., Schmid, C., Liu, C. (2011). Action recognition            ing in face recognition. CVPR.
   by dense trajectories. CVPR.                                               Zhang, W., Surve, A., Fern, X., & Dietterich, T. (2009). Learning nonWang, H., Ullah, M., Klaser, A., Laptev, I., Schmid, C. (2009). Evalua-         redundant codebooks for classifying complex objects. ICML.
   tion of local spatio-temporal features for action recognition. BMVC.       Zheng, J., Jinag, Z., Phillips,P. J., & Chellappa, R. (2012) Cross-view
Wang, J., Yang, J., Yu, K., Lv, F., huang, T., Gong, Y. (2010). Locality-       action recognition via a transferable dictionary pair. BMVC.
   constrained linear coding for image classification. CVPR.                  Zhou, D., Bousquet, O., Lal, T., Weston, J., Gretton, A., & Schölkopf,
Wang, Y., & Mori, G. (2009). Max-margin hidden conditional random               B. (2004). Learning with local and global consistency. NIPS.
   fields for human action recognition. CVPR.                                 Zhou, M., Chen, H., Paisley, J., Ren, L., Sapiro, G., & Carin, L. (2009).
Wang, Y., & Mori, G. (2011). Hidden part models for human action                Non-parametric bayesian dictionary learning for sparse image rep-
   recognition: Probabilistic versus max margin. IEEE Transaction on            resentations. NIPS.
   Pattern Analysis and Machine Intelligence, 33, 1310–1323.                  Zhou, D., Weston, J., Gretton, A., Bousquet, O., & Schölkopf, B. (2004).
Wright, J., Yang, Y. A., Ganesh, A., Sastry, S. S., & Ma, Y. (2009).            Ranking on data manifolds. NIPS.
   IEEE Transaction on Pattern Analysis and Machine Intelligence,             Zhu, F., & Shao, L. (2013). Enhancing action recognition by cross-
   31, 210–227.                                                                 domain dictionary learning. BMVC.
Xiang, S., Nie, F., Meng, G., Pan, C., & Zhang, C. (2012). Discrimina-
   tive least squares regression for multiclass classification and feature
   selection. IEEE Transaction on Neural Networks and Learning Sys-
   tems, 23, 1738–1754.
                                                                                                                                          123
<!-- PK END doc=math_p27 -->
