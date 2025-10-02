PKvNext Document

KEY: math_p28 | math |  | 4a9897d5 | 10 | /papers/Xia_Structure_Preserving_Generative_Cross-Domain_Learning_CVPR_2020_paper.pdf
<!-- PK START doc=math_p28 -->


<!-- PK PAGE 1 doc=math_p28 -->
Structure Preserving Generative Cross-Domain Learning
                                       Haifeng Xia♯ , Zhengming Ding†
                   ♯
                     Department of ECE, Indiana University-Purdue University Indianapolis
                    †
                      Department of CIT, Indiana University-Purdue University Indianapolis
                                                  {haifxia,zd2}@iu.edu
                        Abstract                                  on unlabeled target domain having various distribution with
                                                                  training source. Specifically, for visual data, domain shift
    Unsupervised domain adaptation (UDA) casts a light            results from distinctions of light condition occlusions and
when dealing with insufficient or no labeled data in the tar-     background [4].
get domain by exploring the well-annotated source knowl-             Unsupervised Domain Adaptation (UDA) is a promising
edge in different distributions. Most research efforts on         technique to train a model obtaining lower risk when evalUDA explore to seek a domain-invariant classifier over            uated on target domain [13, 8, 9, 41, 18]. Existing UDA
source supervision. However, due to the scarcity of label         methods [28, 21, 7] generally minimize the risk on source
information in the target domain, such a classifier has a         data firstly and then employ appropriate statistical property
lack of ground-truth target supervision, which dramatically       to eliminate cross-domain discrepancy. There are two comobstructs the robustness and discrimination of the classi-        mon manners to measure discrepancy between distributions
fier. To this end, we develop a novel Generative cross-           of two domains, i.e., discrepancy measurement [20, 22]
domain learning via Structure-Preserving (GSP), which at-         and domain adversarial confusion [44, 19]. Specifically,
tempts to transform target data into the source domain in         discrepancy measurement like maximum mean discrepancy
order to take advantage of source supervision. Specifically,      employs statistical indication (mean of distribution) to meaa novel cross-domain graph alignment is developed to cap-         sure cross-domain difference and aligns the distribution of
ture the intrinsic relationship across two domains during         two domains by constraining this indication. While domain
target-source translation. Simultaneously, two distinct clas-     adversarial confusion aims to seek a domain invariant feasifiers are trained to trigger the domain-invariant feature       ture generator for both domains with a domain confusion
learning both guided with source supervision, one is a tradi-     discriminator in an adversarial training manner. However,
tional source classifier and the other is a source-supervised     these methods still remain restrictive in the alignment betarget classifier. Extensive experimental results on several      tween feature and category due to the neglect of class-level
cross-domain visual benchmarks have demonstrated the ef-          information [23]. They generally suffer from two challengfectiveness of our model by comparing with other state-of-        ing issues: 1) mis-alignment of cross-domain samples from
the-art UDA algorithms.                                           various classes and 2) the learned classifier would lack of
                                                                  generalization on target domain [14].
1. Introduction                                                       To alleviate these disadvantages, target pseudo labels are
                                                                  introduced to effectively enhance class-level alignment dur-
    Deep neural networks have achieved an increasing num-         ing the training process [42, 37]. Moreover, [40] considber of successes in computer vision community with a great        ers the class prior probability defined on two domains as
deal of well-labeled data, which allows deep learning mod-        class-specific weight and modifies original MMD with auxels to easily capture abstract and complex relationship be-       iliary weights to promote discriminative ability of classitween feature and category [44]. In reality, however, col-        fier for target domain. Similarly, a novel metric measure
lecting abundant data with annotation becomes too difficult       formulated in [14] includes intra-class domain discrepancy
and expensive in many learning tasks. The intuitive moti-         and inter-class domain discrepancy. On the other hand, revation to address the realistic issue is to apply knowledge       cent studies [25, 15] pay more attention to the second issue,
extracted from model trained with available annotated sam-        which attempts to make the learned decision boundary roples into target tasks. Such a strategy frequently tends to       bust for target domain. The common strategy to address
be vulnerable for the problem of domain shift [11] as the         this challenge designs two domain-specific classifiers. Subtrained model is more likely to be invalid when assessed          sequently, [30] regards two classifiers as various views for
                                                                4364


<!-- PK PAGE 2 doc=math_p28 -->
$$
the same samples of source domain and maximum their dis-           (ps ✶|S| = 1) represents a Borel probability measure detinction to learn a robust classifier for samples from target      fined on S (pt has the same meaning with ps ), the p-th ordomain. In addition, [16] develops sliced wasserstein dis-         der Gromov-Wasserstein discrepancy (p ∈ [1, ∞)) has the
$$
crepancy (SWD) connecting feature distribution alignment           following formulation:
and wasserstein metric to promote the discrimination of tar-                          Z Z                                       1
                                                                                                L(dsij , dti′ j ′ )p dπii′ dπjj ′ ,
                                                                                                                                  p
$$
get classifier. However, training a target-specific classifier      dgw :=     inf
$$
$$
                                                                              π∈Π(ps ,pt )         S×T
$$
with samples from corresponding domain is inaccessible,
                                                                                                                                           (1)
which certainly obstructs classification accuracy. This issue
$$
                                                                   where L(dsij , dti′ j ′ ) = |ds (si , sj ) − dt (ti′ , tj ′ )|, and the set
$$
stems from the inaccessibility of target label.
$$
   In this paper, we propose a Generative cross-domain             of all probability measure is Π(ps , pt ) drawn from S × T
$$
learning via Structure-Preserving (GSP) model to incor-            with the marginal distributions ps and pt . From the above
porate samples of target domain into training phase with           formulation, the loss function in GW discrepancy firstly
source supervision (Fig. 1). Specifically, a novel met-            measures distance between pairs of samples within each
ric discrepancy is defined to measure cross-domain dis-            compact space and then compares these distances in S with
tinction in terms of the topological structure including in-       those in another space T . Due to the property that meaformation of node and edge. In order to minimize cross-            sure difference between various spaces, GW metric has
domain discrepancy, two-level alignments (i.e., edge-level         been successfully applied to measure discrepancy between
and node-level) are designed to enhance the mitigation of          various graphs [1, 26]. In addition, [38] has theoretically
domain mismatch. The edge-level alignment aims to dis-             proved that GW discrepancy is a pseudo-metric of graph.
cover matching relationship between two domains accord-            Different from these applications only learning matching
ing to node and degree, while the node-level alignment ex-         relation between various graphs, our work not only introploits learned matching relationship to restrict feature rep-      duces node-level alignment into learning process but also
resentation across two domains. Moreover, we develop a             exploits the learned relation to minimize domain discrepsource-supervised target classifier which supervises feature       ancy. Concretely, GW discrepancy is extended to mealearning of target domain with source label. Furthermore,          sure cross-domain distinction in terms of graph distribution
we adopt a symmetrical and adversarial manner to train two         and we formulate the novel metric measure as edge-level
domain-specific classifiers, which not only maximize the           alignment. According to cross-domain feature representadifference between two classifiers but also extract effective      tion, we incorporate graph matching relation produced from
domain invariant features. To this end, our contributions are      edge-level alignment into node-level alignment which disummarized as following:                                           rectly constraints cross-domain feature learning to eliminate
                                                                   domain discrepancy.
   • We introduce a novel metric measure in terms of graph
                                                                       Unsupervised Domain Adaptation (UDA) aims to em-
      distribution and formulate alignments of node-level
                                                                   ploy robust and generalized model to promote the perfor-
      and edge-level. The edge-level alignment is employed
                                                                   mance on target domain. Among them, domain-invariant
      to extract cross-domain matching relation, while node-
                                                                   feature learning attempts to generate discriminative feature
      level operation aims to align feature representation.
                                                                   when aligning distributions of two domains in unsupervised
   • To promote the discriminative ability of classifier, we
                                                                   manner [44]. The typical methods to bound the discrepancy
      develop source-supervised target classifier fed with the
                                                                   of two domains are categorized into two types: domain ad-
      combination of matching relation and features from
                                                                   versarial training [21, 32], and maximum mean discrepancy
      target domain. Moreover, we apply symmetric adver-
                                                                   [14, 20]. The first category attempts to explore adversarial
      sarial manner to train two domain-specific classifiers.
                                                                   manner to generate the same feature space for source and
   • We evaluate our proposed model (GSP) on several vi-
                                                                   target domains, while the other group further constraints
      sual cross-domain benchmarks. GSP approach outper-
                                                                   properties of generated feature distribution. Specifcally,
      forms competitive methods in most domain adaptation
                                                                   [20, 22] pay effort to bound target risk by minimizing the
      tasks, demonstrating the effectiveness of solving UDA
                                                                   difference of distribution mean. In addition, [24, 19, 3]
      problem. Extensive analysis illustrates the function of
                                                                   adopt generative adversarial manner to train network archi-
      each component in GSP method.
                                                                   tecture. When achieving equilibrium, network system syn-
                                                                   thesizes domain-invariant feature confusing the discrimina2. Related Work
                                                                   tor. Moreover, [44] proposes domain symmetric networks
   Gromov-Wasserstein discrepancy (GW) is considered               (SymNets) incorporating classifier and discriminator into a
$$
as an effective tool to measure the difference between two         single frame and training network in symmetric adversarspaces [38]. Given two compact metric spaces (S, ds , ps )         ial way. Compared to SymNets, our method GSP introand (T , dt , pt ) where ds and dt are two independent met-        duces feature of target domain into classifier with the suric measures defined on S and T , respectively, ps ∈ R|S|          pervision of source label. And the symmetric adversarial
$$
                                                                 4365


<!-- PK PAGE 3 doc=math_p28 -->
training manner is mainly exploited to maximum distinc-                (pt ) represents empirical distribution of nodes and it is estition between two domain-specific classifiers.                          mated by normalized node degree.
                                                                           To effectively match two different domains, we pro3. The Proposed Algorithm                                              pose two-level cross-domain alignments, i.e., node-level
                                                                       and edge-level. First of all, we explore GW distance to mea3.1. Preliminaries and Motivation                                      sure the edge similarity across two domains [33]. Metric
                                                                       measures of source domain and target domain are defined as
$$
   For UDA, we are generally given source dataset Ds =
$$
              ns                                                       ds , dt , respectively. In term of these definitions, we extend
$$
{(xsi , yis )}i=1 and target dataset Dt = {xti }ni=1
$$
                                                  t
                                                     where Ds
                                 s ns                                  GW method to measure the discrepancy of cross-domain
$$
includes ns data samples {xi }i=1 with its corresponding
$$
                                                                       topology structure and have the following formulation of
$$
label set {yi }ni=1s
$$
                     , and Dt consists of nt data instances
   t nt                                                                edge-level alignment Le :
$$
{xi }i=1 and the label information for target domain is un-
$$
                                                                                                                                          p1
known. Although it is obvious that the same label space
                                                                                      P
                                                                                                          |Asij − Ati′ j ′ |Ast    st
                                                                                                  P
$$
                                                                           Le =                                                  ′A    ′
$$
$$
is shared by these two domains, the distributions of their                             i,j∈Vs i′ ,j ′ ∈Vt
$$
                                                                                                                             i,i   j,j
                                                                                                                                              (2)
data sample sets are different, which limits the performance
$$
of the trained model from source to target domain. Min-                          = hL(As , At , Ast ), Ast i,
$$
$$
imizing the source risk and bounding the discrepancy be-                                                   |Ast ✶nt = ps , AT st ✶ns =
$$
$$
                                                                                                   ns ×nt
$$
$$
                                                                       where Ast = {Ast ∈ R+
$$
$$
tween two various distributions effectively improve the per-           pt } is the joint distribution of node degree, i.e., Ast ∈
$$
$$
formance of model, which has been verified by abundant                 Π(ps , pt ), L(As , At , Ast ) = As ps ✶T   nt + ✶ns pt At −
$$
                                                                                                                               T T
theoretical analyses.                                                              T
                                                                       2As Ast At is derived from [26], and hA, Bi is the inner
   In this work, we rethink UDA problem from perspec-                  product of matrices A and B.
tive of graph distribution and propose a novel genera-                     To further mitigate the domain mismatch, we bridge the
tive model with structure preserving. Concretely, samples              node-level domain gap. In practice, vis (vjt ) can be reprewithin each domain constitute graph structure with infor-              sented by the feature fis (fjt ). Targeting at coupling the relamation of node, edge and degree. Although there is distri-             tionship between features from various domains, we further
bution discrepancy across two domains, topological struc-              exploit the learned structured information to constrain features of them are more likely to be similar. Thus, the                 ture representation and reduce discrepancy of two domains.
proposed method matches topological information across                 In addition, Ast                                        s       t
                                                                                      ij also indicates the probability that vi and vj
two domains through Gromov-Wasserstein (GW) discrep-                   belong to the same category. Thus, we define the node-level
ancy [38] defined over graph and leverages the learned rela-           alignment as Ln :
tionship to eliminate discrepancy between Ds and Dt with
$$
cross-domain graph alignment. In addition, we develop a                                      Ln = kFs − Ast Ft k2F ,                         (3)
$$
novel source-supervised target classifier jointly with cross-          where k · kF is the Frobenius norm.
domain alignment to make the trained classifier robust to                 To sum up, our two-level cross-domain graph alignment
unlabeled target learning.                                             module is defined by incorporating Eq. (2) and (3) together
                                                                       as follows:
$$
3.2. Cross-Domain Generation via Structure Pre-                                              Lg = Le + Ln .                    (4)
$$
      serving
                                                                       Remark: Edge-level alignment in Eq.(2) integrates the dis3.2.1   Cross-Domain Graph Alignment                                   tinction between arbitrary edges from various domains and
                                                                       graphs’ degree information into a single system. The disExisting approaches [17, 5] achieve promising performance              tance of cross-domain edge reflects domain discrepancy
by benefiting from deep neural networks, e.g., VGG [31]                embedded into Ast . Optimal Ast explores a probabilistic
and ResNet [12]. Those algorithms explore existing deep                assignment to match the source nodes to the target ones.
neural networks as backbone to extract general feature rep-            Compared to edge-level alignment, node-level alignment
resentation and stack cross-domain alignment at the top.               directly focuses on feature representation. Ast
                                                                                                                     ij indicates the
$$
Suppose Fs = {fis }ni=1    s
$$
$$
                              and Ft = {fjt }nj=1  t
$$
                                                       are feature     probability that the source feature fis and target feature fjt
representations from two domains Ds and Dt , respectively.             belong to the same category. According to Eq. (3), crossWith extracted features, we define the measurable graphs               domain samples with the same label tend to be clustered in
of source domain and target domain as Gs (Vs , As , ps ) and           the shared space with similar feature representation.
$$
Gt (Vt , At , pt ), where Vs = {vi }ni=1
$$
                                      s
                                         (Vt ) is the set of nodes
in the corresponding domain, the similarity or distance be-
                                                                       3.2.2    Source-Supervised Target Classifier
tween elements in source domain (target domain) is denoted
$$
as As = [asij ] ∈ Rns ×ns (At ), and ps (pt ) represents Borel         Due to the lack of label information in target domain, exprobability measurement defined on Vs (Vt ). In practice, ps           isting methods to solve UDA problem only employ sam-
$$
                                                                     4366


<!-- PK PAGE 4 doc=math_p28 -->
Target Domain                                     graph alignment
                                                                                              𝐶" (𝐴$" 𝐹" )
                                                     𝐴"                          𝐴$
                                                                        𝐴$"
                                                          𝐹"                  𝐴$" 𝐹"            𝑪𝒕
                                                                                                      𝐶" (𝐹$ )
                                                                                               𝐶$ (𝐴$" 𝐹" )
                              ...
                                      ...
                                              ...                                               𝑪𝒔
                             Generator (G)                                                                                True &
                                                                                                                          False
                                                                   𝐹$
        Source Domain                                                                            𝐶$ (𝐹$ )
Figure 1: Overview of the proposed architecture, where features Fs and Ft are extracted from raw data through generator (VGG or ResNet),
and then we capture matching relationship (blue dotted line) of two domains according to graph distribution. Moreover, two classifiers are
built and fed with same input. We adopt domain adversarial training manner to maximum the difference between them.
ples from source domain to train a domain-invariant classi-             Interestingly, Ct (·) trained on Ast Ft should also be valid
fier shared by target domain. Other works [30, 43] alterna-             to recognize Ft , since Ast Ft and Ft share the same featively design two classifiers corresponding to two domains              ture space. In this sense, we obtain the target classifier with
and maximize distinction of them. To enhance the gener-                 ground-truth source supervision by transforming the target
alization ability of the classifiers to target samples, exist-          features into source ones. Note that Ast Ft can be treated as
ing works normally explore pseudo labels by involving the               a bridge to gap the source and target domains.
target supervision iteratively [42, 37]. However, the funda-                However, considering that the task of Ct is to trigger
mental challenge (e.g., to learn a robust classifier for target         more accurate predictions on target domain, the probabildomain) is still unsolved as ground-truth target label is not           ities generated from Ct (Ast Ft ) and Ct (Fs ) should become
accessible. In order to address this issue, we develop a novel          different. Inspired by [44], symmetric adversarial architecsource-supervised target classifier Ct (·) with structure pre-          ture is exploited to achieve this goal. From Fig. 1, there are
serving, as well as a traditional source-supervised classifier          two parallel classifiers Cs and Ct sharing the same input Fs
Cs (·) under a symmetric adversarial training manner.                   and Ast Ft . And Cs and Ct are built in the same architec-
                                                                        ture including Fully-Connected (FC) layers and one Soft-
   We firstly introduce how to feed unlabeled target samples
                                                                        max layer. For an arbitrary feature input such as fis , the outinto the source-supervised target classifier and then present
$$
                                                                        put of Cs and Ct are denoted as qs (fis ) ∈ RC (qs ✶C = 1)
$$
the whole symmetric adversarial architecture. As discussed
$$
                                                                        and qt (fis ) ∈ RC (qt ✶C = 1), where C is the number of
$$
in section 3.2.1, features Fs extracted from Ds can be rep-
                                                                        classes.
resented by features of target domain Ft under node-level
                                                                            Given features Fs and Ast Ft , two classifiers generate
alignment, i.e., kFs − Ast Ft k2F . WithoutP loss of generality,
                                               nt                       four types of probabilities: qs (Fs ), qs (Ast Ft ), qt (Fs ) and
$$
arbitrary fis has the formulation fis ≈              st t
$$
$$
                                               j=1 aij fj . The
$$
        st                            s                                 qt (Ast Ft ). We train Cs and Ct to make prediction for any
larger aij not only demonstrates vi has similar topological             input by minimizing the following cross-entropy loss:
structure with vjs but also indicates fis and fjt come from
the same class. This strategy is also considered as a tool                            1  X ns s
                                                                                                 yi log qs (fis )
                                                                                                                   
$$
                                                                            Ls = −
$$
$$
extracting samples with larger ast  ij from target domain and                        ns      i=1
$$
ignoring influence of other samples to code fis . Most likely,                              X ns                  X nt            
                                                                                          +          yis log qs (        ast   t
                                                                                                                          ij fj )    ,
$$
the selected samples share the same label with fis , and are                                    i=1                  j=1
$$
                                                                                                                                       (5)
input to train the classifier, which dramatically promote the                         1  X  ns
                                                                                                 yis log qt (fis )
                                                                                                                   
$$
discriminative ability of classifier for samples in target do-              Lt = −
$$
$$
                                                                                     ns      i=1
$$
main.                                                                                       X ns                  X nt            
                                                                                          +          yis log qt (        ast  t
                                                                                                                          ij fj )    .
$$
                                                                                                i=1                 j=1
$$
    Thus, Cs and Ct are developed by taking {Fs , Ys } and
{Ast Ft , Ys } as input, respectively. Noted that Ast Ft shares            Although Cs and Ct leverage same features as input,
the same label information with Fs . Ct also learns to iden-            they should have various identifying functions. The primary
tify the interface among various classes in source domain.              purpose of Cs is to improve prediction accuracy of feature
                                                                    4367


<!-- PK PAGE 5 doc=math_p28 -->
Fs while Ct pays more attention to the prediction of Ast Ft .            is difficult to address domain shift problem, generator to
To achieve this goal, we extract feature Hs (Ht ) from clas-             some extent learns discriminative features for two domains.
sifier Cs (Ct ) before the Softmax layer and then concate-               In terms of these extracted features, we can calculate cosine
                          s                                   t
$$
nate features into Hst        = [Hs (Fs ), Ht (Fs )] and Hst     =       distance within each domain as As and At and then obtain
$$
[Hs (Ast Ft ), Ht (Ast Ft )]. Subsequently, softmax operation            the cross-domain similarity to initialize Ast .
is applied to obtain probability distribution [qs∗ (Fs ), qt∗ (Fs )]
and [qs∗ (Ast Ft ), qt∗ (Ast Ft )]. Alternatively, qs∗ (Fs ) should      Step B: The classifier Ct trained in the first phase produces
be larger than qt∗ (Fs ) but qs∗ (Ast Ft ) is supposed to have           pseudo label Yˆt for target domain Xt . We then calculate
                                                                                                       T
$$
smaller value than qt∗ (Ast Ft ). We adopt the domain adver-             a mask matrix M = Ys Yˆt to filter the irrelevant elesarial training manner in [44] by minimizing the following               ments of Ast with the formulation as M ⊙ Ast , where ⊙
$$
additional cross-entropy losses:                                         means element-wise product operation. Subsequently, we
                       1 Xns          XC                                 optimize Ast according to Eq. (4) and learn optimal cross-
$$
                L sa = −         log(          qs∗k (fjs )),
$$
$$
                       ns    i=1           k=1                           domain graph matching relation.
$$
                                                                (6)
                1 X ns       XC            Xnt st t                      Step C: In this step, we train two classifiers Cs and Ct
$$
       L ta = −         log(        qt∗k (       aij fj )).
$$
$$
                ns  i=1        k=1           j                           when fixing generator G. We take Fs and Ast Ft as input
$$
                                                                         both with source labels as supervised signal. In addition,
   To this end, we can integrate Eq. (5) and Eq. (6) into the            classifier loss not only achieves classification task but also
following Eq. (7) to train classifiers by minimizing:                    minimizes domain adversarial loss. Under this condition,
$$
                 L c = L s + L t + L sa + L t a ,               (7)      classifiers are updated according to:
$$
Thus, this loss function involves classification task and do-                                     min Ls + Lt + Lsa + Lta .                (9)
                                                                                                 Cs ,Ct
main adversarial task.
3.3. Entropy Minimization                                                Step D: Due to symmetric adversarial training, generator
                                                                         should confuse classifiers with Ast Ft and Fs . Concretely,
   Although source-supervised target classifier leverages                target classifier considers Fs as true while source classifier
collaboration of target samples to improve discrimination                produces more value for input Ast Ft . Thus, we define a
of classifier, there is no chance for target classifier to ac-                                           ns       C       nt
$$
                                                                         domain loss as Ld = − n1s                  qs∗k ( ast   t
$$
                                                                                                         P        P       P
cess features of target domain directly. To avoid this is-                                                   log(            ij fj )) −
$$
                                                                                                               i=1     k=1       j
$$
sue, we adopt Entropy minimization (EM) method widely                       ns             C
                                                                          1
used in [35] to promote the robustness of classifier. Entropy                                    qt∗k (fjs )). Under this circumstance, gener-
                                                                            P              P
                                                                         ns         log(
$$
minimization function aims to simultaneously optimize two                     i=1          k=1
$$
classifiers and has the following formulation:                           ator synthesises domain-invariant features by adversarial
                                                                         training. Specifically, we train generator with fixed clas-
                       1 X nt                                            sifiers by minimizing objective function:
$$
           Lem = −               qs (fit ) log(qs (fit ))
$$
$$
                      nt     i=1
$$
                                                           (8)
                       1 X nt                                                         min Ls + Lt + λ1 (Ln + Ld ) + λ2 Lem ,             (10)
                   −             qt (fit ) log(qt (fit )),                             G
$$
                      nt     i=1
$$
                                                                         where λ1 and λ2 control the relative importance of domain
where qs (fjt ) indicates the probability of target sample fjt
                                                                         alignment and entropy minimization.
and qt (fjt ) means the output of target classifier for fjt . Dur-
                                                                            Finally, we repeat Step B, Step C and Step D to obtain
ing the initial training phase, features of target domain lack-
                                                                         optimal solution for our model.
ing of discrimination are simply labeled with incorrect category and are difficult to be identified correctly in the later
training phase. According to suggestion in [44], we only                 4. Experiment
employ entropy minimization loss function to train generator instead of updating all parameters in our network.                      The proposed method is evaluated on three popular
                                                                         benchmark datasets of unsupervised domain adaptation and
3.4. Optimization                                                        compared with other state-of-the-art algorithms.
   There are three components: generator, graph alignment
                                                                         4.1. Experimental Setting
and classifier in our proposed model to be optimized iteratively. We provide the following four steps to illustrate the            Office-31 is considered as a standard benchmark dataset for
optimization.                                                            UDA problem [29]. It contains 4,110 images collected from
Step A: During the initial training phase, we use source in-             three various domains: Amazon Website (A), Web camera
stances with corresponding label to train Cs and Ct and up-              (W) and Digital SLR camera (D). Although images of three
date generator G. Although such a simple training manner                 domains are captured under distinctive conditions, A, W
                                                                       4368


<!-- PK PAGE 6 doc=math_p28 -->
Table 1: Top-1 Accuracy (%) on Office-31 dataset for UDA (ResNet-50) and the best result is in bold type.
    Method     ResNet-50    DNN      DANN [10]     JAN [22]     SimNet [27]    SymNets [44]     TADA[36]      SAFN [39]          Ours
$$
    A→W          68.4       80.5       82.0          85.4          88.6           90.8            94.3          90.3             92.9
$$
$$
    D→W          96.7       97.1       96.9          97.4          98.2           98.8            98.7          98.7             98.7
$$
$$
    W→D          99.3       99.6       99.1          98.4          99.7           100             99.8          100              99.8
$$
$$
    A→D          68.9       78.6       79.7          77.8          85.3           93.9            91.6          90.7             94.5
$$
$$
    D→A          62.5       63.6       68.2          69.5          73.4           74.6            72.9          73.4             75.9
$$
$$
    W→A          60.7       62.8       67.4          68.9          71.6           72.5            73.0          71.2             74.9
$$
     Avg         76.1       80.4       82.2          82.9          86.2           88.4            88.4          87.6             89.5
             Table 2: Top-1 Accuracy (%) on Office-Home dataset for UDA (ResNet-50) and the best result is in bold type.
         Method      ResNet-50     DANN [10]      JAN [22]    DSR [2]    SymNets [44]     TADA [36]      SAFN [39]        Ours
$$
         Ar→ Cl        34.9          45.6           45.9       53.4         47.8            53.1           52.0           56.8
$$
$$
         Ar→ Pr        50.0          59.3           61.2       71.6         72.9            72.3           71.7           75.5
$$
$$
         Ar→ Rw        58.0          70.1           68.9       77.4         78.5            77.2           76.3           78.9
$$
$$
         Cl→ Ar        37.4          47.0           50.4       57.1         64.2            59.1           64.2           61.3
$$
$$
         Cl→ Pr        41.9          58.5           59.7       66.8         71.3            71.2           69.9           69.4
$$
$$
         Cl→ Rw        46.2          60.9           61.0       69.3         74.2            72.1           71.9           74.9
$$
$$
         Pr→ Ar        38.5          46.1           45.8       56.7         64.2            59.7           63.7           61.3
$$
$$
         Pr→ Cl        31.2          43.7           43.4       49.2         48.8            53.1           51.4           52.6
$$
$$
         Pr→ Rw        60.4          68.5           70.3       75.7         79.5            78.4           77.1           79.9
$$
$$
         Rw→ Ar        53.9          63.2           63.9       68.0         74.5            72.4           70.9           73.3
$$
$$
         Rw→ Cl        41.2          51.8           52.4       54.0         52.6            60.0           57.1           54.2
$$
$$
         Rw→ Pr        59.9          76.8           76.8       79.5         82.7            82.9           81.5           83.2
$$
           Avg         46.1          57.6           58.3       64.9         67.6            67.6           67.3           68.4
and D share the same label space with 31 categories. In              [2], TADA [36], and SAFN [39]. JAN is implemented
addition, the biggest challenge of domain adaptation in this         with the released code. Moreover, we cite the results of
dataset is imbalanced across three domains. Specifically,            DANN, SymNets, DSR, TADA and SAFN directly from
Amazon domain consists of 2,817 images, while DSLR do-               corresponding papers [10, 44, 2, 36] for a fair comparison
main and Webcam domain only contain 498 and 795 im-                  as we adopt the exact the same experimental protocol.
ages, respectively. We evaluate six domain adaptation tasks          Implementation details. We implement the proposed
in Office-31.                                                        method on Tensorflow. The ResNet-50 (without the last FC
Office-Home is another more challenging dataset for visual           layer) pre-trained on ImageNet dataset [6] is employed to
domain adaptation [34]. It includes 15,500 images belong-            extract features from raw images. We only fine-tune paing to 65 categories. These images containing various daily          rameters of ResNet-50 on source domain. The architecture
objects are captured in office or home scenes. There are             in classifier Cs and Ct both include two-layer FC layers
four different domains: Artistic images (Ar), Clip Art (Cl),         with activation function as Relu. We adopt Adam optiProduct images (Pr) and Real-World images (Rw), which                mizer to update all parameters and select the learning rate
                                                                               η0
$$
forms 12 adaptation tasks.                                           ηp = (1+ap)   b , where p is linearly changing from 0 to 1. We
$$
$$
ImageCLEF-DA dataset is another popular standard                     set the initial learning rate η0 = 0.01, α = 10 and β = 0.75
$$
benchmark for unsupervised domain adaptation including               according to strategy in [44]. λ1 and λ2 are selected from
three domains: Caltech-256 (C), ImageNet ILSVRC 2012                 {10−4 , 10−3 , 10−2 , 10−1 , 1}. Finally, we obtain the classi-
(I) and Pascal VOC 2012 (P). Arbitrary domain includes               fication accuracy in target domain using Ct .
12 categories and each class contains 50 images. Different from Office-Home and Office-31, three domains in this            4.2. Comparison Results
dataset have the same scale. There are six unsupervised do-             Table 1 shows classification accuracy result of domain
main adaptation tasks to be evaluated.                               adaptation task on Office-31 dataset. The proposed apComparisons. We compare our structure preserving                     proach overpasses all compared methods in terms of avermethod with generative adversarial algorithms: DANN                  age accuracy. Due to imbalanced condition across three do-
[10], SymNets [44] and maximum mean discrepancy based                mains, it is difficult for model to transfer knowledge learned
on approaches: JAN [22] and other deep models like DSR               in a small-scale dataset into another larger domain. How-
                                                                  4369


<!-- PK PAGE 7 doc=math_p28 -->
2.0                               2.0
                                            1.8                               1.8
                                            1.6                               1.6
                                            1.4                               1.4
                                            1.2                               1.2
                                            1.0                               1.0
        (a) ResNet (Office-31)        (b) Ours (Office-31) P:Fs , Y:Ft               (c) Ours (Office-31)         (d) Ours (Office-31)
                                      2.0
                                      1.8
                                      1.6
                                      1.4
                                      1.2
                                      1.0
      (e) ResNet (Office-Home)                    (f) Ours (Office-Home)            (g) Ours (Office-Home)    (h) Ours (Office-Home)
Figure 2: Comparison of t-SNE visualization of ResNet-50 and our learned feature representations. (a): t-SNE of ResNet (Office-31)
with Fs and Ft . (b): t-SNE of Ours (Office-31) with Fs and Ft . (c): t-SNE of Ours (Office-31) with Fs and Ast Ft . (d): t-SNE of Ours
(Office-31) with Ast Ft and Ft . (e): t-SNE of ResNet (Office-Home) with Fs and Ft . (f): t-SNE of Ours (Office-31) with Fs and Ft . (g):
t-SNE of Ours (Office-Home) with Fs and Ast Ft . (h): t-SNE of Ours (Office-Home) with Ast Ft and Ft . We compute t-SNE with the
$$
output of the last FC layer on Office-31 task A → W and Office-Home task Ar→Cl. Purple indicates Fs , Yellow denotes Ft and Green
$$
represents Ast Ft .
ever, different from the results of other algorithms in tasks                Table 3: Top-1 Accuracy (%) on ImageCLEF-DA dataset for UDA
$$
D → A and W → A, our model shows less sensitive to                           (ResNet-50) and the best result is in bold type.
$$
imbalanced circumstance. The main reason for success of
$$
                                                                                       Method    I→ P P→ I I→ C C→ I C→ P P→ C
$$
our model is that we introduce cross-domain graph information into our method. Alignment with graph discovers                               ResNet-50 74.8 83.9 91.5     78  65.5 91.2
similarity of topological structure and utilizes consistency                            DAN       74.5 82.2 92.8 86.3 69.2 89.8
to address domain shift. On the other hand, target classifier                        DANN [10]     75   86 96.2   87  74.3 91.5
with cross-domain graph provides feature learning of target                           JAN [22]    76.8 88 94.7 89.5 74.2 91.7
domain with more label information from source domain.                               CDAN [21] 76.7 90.6 97      90.5 74.5 93.5
                                                                                    SymNets [44] 80.2 93.6 97    93.4 78.7 96.4
    The classification results about 12 domain adaptation                            SAFN [39] 79.3 93.8 96.3 91.7 77.6 95.3
tasks on the Office-Home [34] is reported in Table 2. As
                                                                                        Ours      79.4 91.9 97.9 94.1 76.5 97.2
we all know, since office-Home dataset has more categories
than office-31 dataset, it is difficult for the same method
                                                                             our model achieves the best performance in most cases e.g.,
to produce better result than its performance in office-31
$$
                                                                             P → C, C → I and I → C, demonstrating the effecdataset. Compared to ResNet-50 only fine-tuned in source
$$
                                                                             tiveness of our proposed method in solving domain adapdomain, impressive improvements have been obtained with
                                                                             tation problem. In addition, compared to traditional adverthe mentioned methods. The performance of our method
                                                                             sarial training methods (DANN and CDAN), our model and
significantly achieves improvements when compared with
                                                                             SymNets both perform better results than them, benefiting
other algorithms. Although the results of SymNets on tasks
$$
                                                                             from symmetric adversarial training manner. Two classiCl → Ar, Cl → Pr and Rw → Cl are higher, our method
$$
                                                                             fiers in symmetric adversarial method tend to describe the
substantially promotes classification accuracy in most cases
                                                                             same feature from various perspectives. Thus, the discrimiand obtains better average performance. Specifically, our
                                                                             native ability of target classifier is improved dramatically.
$$
model produces higher accuracy with large margin for several difficult tasks such as Ar → Cl and Ar → Pr task.                       4.3. Ablation Study
$$
It indicates that the proposed method effectively eliminates
domain discrepancy and extracts domain-invariant feature                     4.3.1      t-SNE visualization
by graph alignment and domain adversarial alignment.                         To understand the effect of graph alignment, we utilize t-
   Table 3 reports classification accuracy on ImageCLEF-                     SNE visual technique to observe distribution of features
DA dataset. Different from previous two datasets, each                       in 2D-space. We compute t-SNE with output of the last
$$
domain in this dataset has the same number of samples.                       FC layer in generator and conduct experiments on OfficeAll methods even ResNet-50 totally obtain impressive ac-                     31 (A→W) and Office-Home (Ar→Cl) for the original
$$
curacy. According to comparison with mentioned methods,                      ResNet-50 features and our model. According to Fig. 2
                                                                           4370


<!-- PK PAGE 8 doc=math_p28 -->
(a)                               (b)
$$
                                                                      Figure 4: Visualization of cross-domain graph Ast on (a) OfficeFigure 3: Parameter analysis of our proposed model GSP. We con-       31 (D→ W) with 31 categories and (b) ImageCLEF-DA (P→ C)
$$
$$
duct experiment on Office-31 for task D → A and investigate           with 12 categories.
$$
classification accuracy with varying parameters λ1 and λ2 . (Red:
λ1 , Blue: λ2 )                                                       Fig. 3 reports results. According to Fig. 3, as λ1 goes
                                                                      up, classification accuracy tend to be improved and then
(a), there are a few overlaps between target instances (yel-          be reduced gradually, illustrating our model is sensitive to
low) and samples of source domain (purple), demonstrating             parameter λ1 which adjusts importance of domain advercross-domain distribution exists large difference named do-           sarial term. However, our method becomes stable when
main shift. Through feature learning phase with GSP, target           raising the value of λ2 . GSP achieves optimal result with
$$
samples are embedded into source domain in Fig. 2 (b).                λ1 = 0.01 and λ2 = 0.1.
$$
When comparing the location of target samples in Fig. 2 (a)
and Fig. 2 (b), We also know that there is a phenomenon               4.3.3   Cross-domain Graph Analysis
of translation resulting from the influence of graph alignment which matches target samples with source data points.            In addition to t-SNE analysis, we also visualize graph
The comparison between Fs and Ast Ft is shown in Fig. 2               matching Ast to observe the performance of edge-level
(c). Different from Ft , almost all Ast Ft are attached to fea-       alignment which attempts to discover cross-domain matchtures of source domain. It illustrates that GSP learns cross-         ing relation. Ideally, Ast                       s
                                                                                              ij has large value when fi and fj
                                                                                                                               t
                                                                                                                  st
domain matching relation and exploits it to transform target          belong to the same category, otherwise, Aij tends to be
$$
domain into source domain. Since source domain (A) con-               small. We conduct experiments on Office-31 (W → D)
$$
$$
tains more samples than target domain (W), space expanded             and ImageCLEF-DA (P → C) and extract the optimal Ast
$$
by Ast Ft becomes larger than that of Ft in Fig. 2 (d). Thus,         shown in Fig. 4. The visualization of graph exhibits diagreducing domain discrepancy tends to be obstructed with               onal block structure which means GSP explores edge-level
difference between Ast Ft and Ft . In addition, focusing on           alignment to capture cross-domain matching information.
the center of Fig. 2 (e), this area are occupied by abundant
target samples with a few source instances. GSP employs               5. Conclusion
graph information to discover cross-domain similarity and                 In this paper, we rethink Unsupervised Domain Adaptatransfers data points of target domain into the corresponding         tion (UDA) from the perspective of graph distribution and
instances of source domain in Fig. 2 (f), meaning our model           propose Generative Cross-domain learning via Structure
effectively achieves domain adaptation. Similar with Fig. 2           Preserving (GSP) to address domain shift problem. GSP
(e), Ast Ft mostly are embedded into source domain. The               model mainly contains two important components: graph
last Fig. 2 (h) shows relationship between Ast Ft and Ft              alignment and source-supervised target classifier. Graph
on office-home dataset. Abundant overlaps between them                alignment utilizes edge-level alignment to capture crossmeans they share the same space. Thus, we transform tar-              domain matching relation and incorporates relation into
get domain into source domain through Ast Ft .                        node-level alignment to eliminate domain shift. Moreover,
                                                                      we introduce matching information into classifiers and de4.3.2   Parameter analysis
                                                                      velop source-supervised target classifier exploiting label of
In this section, we conduct experiments to observe                    source domain to supervise feature learning of target dothe performance of our model with parameters λ1 and                   main. To maximize difference of two classifiers, we adopt
λ2 . The control variations method is adopted to in-                  symmetric adversarial training manner to train neural netvestigate experimental results. We select value from                  work. Extensive experimental results and analyses on sev-
$$
{10−4 , 10−3 , 10−2 , 10−1 , 1}. Concretely, when fixing pa-          eral cross-domain visual benchmarks have illustrated the eframeter λ1 , we change parameter λ2 from 10−4 to 1. The               fectiveness of GSP model by comparing with other competparameter analysis is conducted on Office-31 (D → A) and              itive methods.
$$
                                                                    4371


<!-- PK PAGE 9 doc=math_p28 -->
References                                                              [13] Shuhui Jiang, Zhengming Ding, and Yun Fu. Heterogeneous
                                                                             recommendation via deep low-rank sparse collective factor-
 [1] Alexander M Bronstein, Michael M Bronstein, Ron Kim-                    ization. IEEE transactions on pattern analysis and machine
     mel, Mona Mahmoudi, and Guillermo Sapiro.                   A           intelligence, 2019. 1
     gromov-hausdorff framework with diffusion geometry for
                                                                        [14] Guoliang Kang, Lu Jiang, Yi Yang, and Alexander G Haupt-
     topologically-robust non-rigid shape matching. Interna-
                                                                             mann. Contrastive adaptation network for unsupervised do-
     tional Journal of Computer Vision, 89(2-3):266–286, 2010.
                                                                             main adaptation. In Proceedings of the IEEE Conference
     2
                                                                             on Computer Vision and Pattern Recognition, pages 4893–
 [2] Ruichu Cai, Zijian Li, Pengfei Wei, Jie Qiao, Kun Zhang,                4902, 2019. 1, 2
     and Zhifeng Hao. Learning disentangled semantic represen-
                                                                        [15] Abhishek Kumar, Prasanna Sattigeri, Kahini Wadhawan,
     tation for domain adaptation. In IJCAI: proceedings of the
                                                                             Leonid Karlinsky, Rogerio Feris, Bill Freeman, and Gregory
     conference, volume 2019, page 2060. NIH Public Access,
                                                                             Wornell. Co-regularized alignment for unsupervised domain
     2019. 6
                                                                             adaptation. In Advances in Neural Information Processing
 [3] Xinyang Chen, Sinan Wang, Mingsheng Long, and Jianmin                   Systems, pages 9345–9356, 2018. 1
     Wang. Transferability vs. discriminability: Batch spectral
                                                                        [16] Chen-Yu Lee, Tanmay Batra, Mohammad Haris Baig, and
     penalization for adversarial domain adaptation. In Interna-
                                                                             Daniel Ulbricht. Sliced wasserstein discrepancy for unsuper-
     tional Conference on Machine Learning, pages 1081–1090,
                                                                             vised domain adaptation. In Proceedings of the IEEE Con-
     2019. 2
                                                                             ference on Computer Vision and Pattern Recognition, pages
 [4] Ziliang Chen, Jingyu Zhuang, Xiaodan Liang, and Liang                   10285–10295, 2019. 2
     Lin. Blending-target domain adaptation by adversarial meta-
                                                                        [17] Seungmin Lee, Dongwan Kim, Namil Kim, and Seong-Gyun
     adaptation networks. In Proceedings of the IEEE Conference
                                                                             Jeong. Drop to adapt: Learning discriminative features for
     on Computer Vision and Pattern Recognition, pages 2248–
                                                                             unsupervised domain adaptation. In Proceedings of the IEEE
     2257, 2019. 1
                                                                             International Conference on Computer Vision, pages 91–
 [5] Safa Cicek and Stefano Soatto. Unsupervised domain adap-                100, 2019. 3
     tation via regularized conditional alignment. arXiv preprint
                                                                        [18] Shuang Li, Chi Harold Liu, Qiuxia Lin, Qi Wen, Limin Su,
     arXiv:1905.10885, 2019. 3
                                                                             Gao Huang, and Zhengming Ding. Deep residual correction
 [6] Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li,                  network for partial domain adaptation. IEEE Transactions
     and Li Fei-Fei. Imagenet: A large-scale hierarchical image              on Pattern Analysis and Machine Intelligence, 2020. 1
     database. In 2009 IEEE conference on computer vision and
                                                                        [19] Hong Liu, Mingsheng Long, Jianmin Wang, and Michael
     pattern recognition, pages 248–255. Ieee, 2009. 6
                                                                             Jordan. Transferable adversarial training: A general ap-
 [7] Zhengming Ding, Sheng Li, Ming Shao, and Yun Fu. Graph                  proach to adapting deep classifiers. In International Con-
     adaptive knowledge transfer for unsupervised domain adap-               ference on Machine Learning, pages 4013–4022, 2019. 1,
     tation. In Proceedings of the European Conference on Com-               2
     puter Vision, pages 37–52, 2018. 1
                                                                        [20] Mingsheng Long, Yue Cao, Jianmin Wang, and Michael I
 [8] Zhengming Ding, Ming Shao, and Yun Fu. Robust multi-                    Jordan. Learning transferable features with deep adaptation
     view representation: a unified perspective from multi-view              networks. arXiv preprint arXiv:1502.02791, 2015. 1, 2
     learning to domain adaption. In Proceedings of the 27th In-
                                                                        [21] Mingsheng Long, Zhangjie Cao, Jianmin Wang, and
     ternational Joint Conference on Artificial Intelligence, pages
                                                                             Michael I Jordan. Conditional adversarial domain adapta-
     5434–5440, 2018. 1
                                                                             tion. In Advances in Neural Information Processing Systems,
 [9] Jiahua Dong, Yang Cong, Gan Sun, Bineng Zhong, and Xi-                  pages 1640–1650, 2018. 1, 2, 7
     aowei Xu. What can be transferred: Unsupervised domain
                                                                        [22] Mingsheng Long, Han Zhu, Jianmin Wang, and Michael I
     adaptation for endoscopic lesions segmentation. In Proceed-
                                                                             Jordan. Deep transfer learning with joint adaptation net-
     ings of the IEEE Conference on Computer Vision and Pattern
                                                                             works. In Proceedings of the 34th International Conference
     Recognition, 2020. 1
                                                                             on Machine Learning-Volume 70, pages 2208–2217. JMLR.
[10] Yaroslav Ganin, Evgeniya Ustinova, Hana Ajakan, Pas-                    org, 2017. 1, 2, 6, 7
     cal Germain, Hugo Larochelle, François Laviolette, Mario
                                                                        [23] Yawei Luo, Liang Zheng, Tao Guan, Junqing Yu, and Yi
     Marchand, and Victor Lempitsky. Domain-adversarial train-
                                                                             Yang. Taking a closer look at domain shift: Category-level
     ing of neural networks. The Journal of Machine Learning
                                                                             adversaries for semantics consistent domain adaptation. In
     Research, 17(1):2096–2030, 2016. 6, 7
                                                                             Proceedings of the IEEE Conference on Computer Vision
[11] Arthur Gretton, Alex Smola, Jiayuan Huang, Marcel Schmit-               and Pattern Recognition, pages 2507–2516, 2019. 1
     tfull, Karsten Borgwardt, and Bernhard Schölkopf. Covari-
                                                                        [24] Zhongyi Pei, Zhangjie Cao, Mingsheng Long, and Jianmin
     ate shift by kernel mean matching. Dataset shift in machine
                                                                             Wang. Multi-adversarial domain adaptation. In Thirty-
     learning, 3(4):5, 2009. 1
                                                                             Second AAAI Conference on Artificial Intelligence, 2018. 2
[12] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun.
                                                                        [25] Xingchao Peng, Qinxun Bai, Xide Xia, Zijun Huang, Kate
     Deep residual learning for image recognition. In Proceed-
                                                                             Saenko, and Bo Wang. Moment matching for multi-source
     ings of the IEEE conference on computer vision and pattern
                                                                             domain adaptation. In Proceedings of the IEEE International
     recognition, pages 770–778, 2016. 3
                                                                             Conference on Computer Vision, pages 1406–1415, 2019. 1
                                                                      4372


<!-- PK PAGE 10 doc=math_p28 -->
[26] Gabriel Peyré, Marco Cuturi, and Justin Solomon. Gromov-              In Proceedings of the IEEE Conference on Computer Vision
     wasserstein averaging of kernel and distance matrices. In In-          and Pattern Recognition, pages 2517–2526, 2019. 5
     ternational Conference on Machine Learning, pages 2664–           [36] Ximei Wang, Liang Li, Weirui Ye, Mingsheng Long, and
     2672, 2016. 2, 3                                                       Jianmin Wang. Transferable attention for domain adaptation.
[27] Pedro O Pinheiro. Unsupervised domain adaptation with                  In AAAI Conference on Artificial Intelligence (AAAI), 2019.
     similarity learning. In Proceedings of the IEEE Conference             6
     on Computer Vision and Pattern Recognition, pages 8004–           [37] Shaoan Xie, Zibin Zheng, Liang Chen, and Chuan Chen.
     8013, 2018. 6                                                          Learning semantic representations for unsupervised domain
[28] Subhankar Roy, Aliaksandr Siarohin, Enver Sangineto,                   adaptation. In International Conference on Machine Learn-
     Samuel Rota Bulo, Nicu Sebe, and Elisa Ricci. Unsupervised             ing, pages 5419–5428, 2018. 1, 4
     domain adaptation using feature-whitening and consensus           [38] Hongteng Xu, Dixin Luo, Hongyuan Zha, and Lawrence
     loss. In Proceedings of the IEEE Conference on Computer                Carin. Gromov-wasserstein learning for graph matching and
     Vision and Pattern Recognition, pages 9471–9480, 2019. 1               node embedding. arXiv preprint arXiv:1901.06003, 2019. 2,
[29] Kate Saenko, Brian Kulis, Mario Fritz, and Trevor Dar-                 3
     rell. Adapting visual category models to new domains. In          [39] Ruijia Xu, Guanbin Li, Jihan Yang, and Liang Lin. Larger
     European conference on computer vision, pages 213–226.                 norm more transferable: An adaptive feature norm approach
     Springer, 2010. 5                                                      for unsupervised domain adaptation. In Proceedings of the
[30] Kuniaki Saito, Kohei Watanabe, Yoshitaka Ushiku, and Tat-              IEEE International Conference on Computer Vision, pages
     suya Harada. Maximum classifier discrepancy for unsuper-               1426–1435, 2019. 6, 7
     vised domain adaptation. In Proceedings of the IEEE Con-          [40] Hongliang Yan, Yukang Ding, Peihua Li, Qilong Wang,
     ference on Computer Vision and Pattern Recognition, pages              Yong Xu, and Wangmeng Zuo. Mind the class weight bias:
     3723–3732, 2018. 1, 4                                                  Weighted maximum mean discrepancy for unsupervised do-
[31] Shuran Song, Samuel P Lichtenberg, and Jianxiong Xiao.                 main adaptation. In Proceedings of the IEEE Conference
     Sun rgb-d: A rgb-d scene understanding benchmark suite. In             on Computer Vision and Pattern Recognition, pages 2272–
     Proceedings of the IEEE conference on computer vision and              2281, 2017. 1
     pattern recognition, pages 567–576, 2015. 3                       [41] Guanglei Yang, Haifeng Xia, Mingli Ding, and Zhengming
[32] Eric Tzeng, Judy Hoffman, Kate Saenko, and Trevor Dar-                 Ding. Bi-directional generation for unsupervised domain
     rell. Adversarial discriminative domain adaptation. In Pro-            adaptation. In Thirty-Fourth AAAI Conference on Artificial
     ceedings of the IEEE Conference on Computer Vision and                 Intelligence, 2020. 1
     Pattern Recognition, pages 7167–7176, 2017. 2                     [42] Weichen Zhang, Wanli Ouyang, Wen Li, and Dong Xu.
[33] Titouan Vayer, Laetita Chapel, Rémi Flamary, Romain Tave-             Collaborative and adversarial network for unsupervised do-
     nard, and Nicolas Courty. Fused gromov-wasserstein dis-                main adaptation. In Proceedings of the IEEE Conference
     tance for structured objects: theoretical foundations and              on Computer Vision and Pattern Recognition, pages 3801–
     mathematical properties. arXiv preprint arXiv:1811.02834,              3809, 2018. 1, 4
     2018. 3                                                           [43] Yang Zhang, Philip David, and Boqing Gong. Curricu-
[34] Hemanth Venkateswara, Jose Eusebio, Shayok Chakraborty,                lum domain adaptation for semantic segmentation of urban
     and Sethuraman Panchanathan. Deep hashing network for                  scenes. In Proceedings of the IEEE International Conference
     unsupervised domain adaptation. In Proceedings of the IEEE             on Computer Vision, pages 2020–2030, 2017. 4
     Conference on Computer Vision and Pattern Recognition,            [44] Yabin Zhang, Hui Tang, Kui Jia, and Mingkui Tan. Domain-
     pages 5018–5027, 2017. 6, 7                                            symmetric networks for adversarial domain adaptation. In
[35] Tuan-Hung Vu, Himalaya Jain, Maxime Bucher, Matthieu                   Proceedings of the IEEE Conference on Computer Vision
     Cord, and Patrick Pérez. Advent: Adversarial entropy min-             and Pattern Recognition, pages 5031–5040, 2019. 1, 2, 4,
     imization for domain adaptation in semantic segmentation.              5, 6, 7
                                                                     4373
<!-- PK END doc=math_p28 -->
