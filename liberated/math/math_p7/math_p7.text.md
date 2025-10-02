PKvNext Document

KEY: math_p7 | math |  | 6a385ecd | 10 | /papers/CrossViTCross-AttentionMulti-ScaleVisionTransformerforImage.pdf
<!-- PK START doc=math_p7 -->


<!-- PK PAGE 1 doc=math_p7 -->
*&&&$7'*OUFSOBUJPOBM$POGFSFODFPO$PNQVUFS7JTJPO *$$7
                                                                                                                                                          CrossViT: Cross-Attention Multi-Scale Vision Transformer for Image
                                                                                                                                                                                    Classiﬁcation
2021 IEEE/CVF International Conference on Computer Vision (ICCV) | 978-1-6654-2812-5/21/$31.00 ©2021 IEEE | DOI: 10.1109/ICCV48922.2021.00041
                                                                                                                                                                                  Chun-Fu (Richard) Chen, Quanfu Fan, Rameswar Panda
                                                                                                                                                                                               MIT-IBM Watson AI Lab
                                                                                                                                                                                 chenrich@us.ibm.com, qfan@us.ibm.com, rpanda@ibm.com
                                                                                                                                                                             Abstract
                                                                                                                                                     The recently developed vision transformer (ViT) has
                                                                                                                                                 achieved promising results on image classiﬁcation com-
                                                                                                                                                 pared to convolutional neural networks. Inspired by this,
                                                                                                                                                 in this paper, we study how to learn multi-scale feature rep-
                                                                                                                                                 resentations in transformer models for image classiﬁcation.
                                                                                                                                                 To this end, we propose a dual-branch transformer to com-
                                                                                                                                                 bine image patches (i.e., tokens in a transformer) of dif-
                                                                                                                                                 ferent sizes to produce stronger image features. Our ap-
                                                                                                                                                 proach processes small-patch and large-patch tokens with
                                                                                                                                                 two separate branches of different computational complex-
                                                                                                                                                 ity and these tokens are then fused purely by attention multi-
                                                                                                                                                 ple times to complement each other. Furthermore, to reduce
                                                                                                                                                 computation, we develop a simple yet effective token fusion                    Figure 1: Improvement of our proposed approach over
                                                                                                                                                 module based on cross attention, which uses a single token                     DeiT [35] and ViT [11]. The circle size is proportional to
                                                                                                                                                 for each branch as a query to exchange information with                        the model size. All models are trained on ImageNet1K from
                                                                                                                                                 other branches. Our proposed cross-attention only requires                     scratch. The results of ViT are referenced from [45].
                                                                                                                                                 linear time for both computational and memory complexity
                                                                                                                                                 instead of quadratic time otherwise. Extensive experiments
                                                                                                                                                 demonstrate that our approach performs better than or on                       search efforts on transformers in vision have, until very re-
                                                                                                                                                 par with several concurrent works on vision transformer,                       cently, been largely focused on combining CNNs with self-
                                                                                                                                                 in addition to efﬁcient CNN models. For example, on the                        attention [3, 48, 31, 32]. While these hybrid approaches
                                                                                                                                                 ImageNet1K dataset, with some architectural changes, our                       achieve promising performance, they have limited scala-
                                                                                                                                                 approach outperforms the recent DeiT by a large margin of                      bility in computation compared to purely attention-based
                                                                                                                                                 2% with a small to moderate increase in FLOPs and model                        transformers. Vision Transformer (ViT) [11], which uses a
                                                                                                                                                 parameters. Our source codes and models are available at                       sequence of embedded image patches as input to a standard
                                                                                                                                                 https://github.com/IBM/CrossViT.                                               transformer, is the ﬁrst kind of convolution-free transform-
                                                                                                                                                                                                                                ers that demonstrate comparable performance to CNN mod-
                                                                                                                                                                                                                                els. However, ViT requires very large datasets such as Im-
                                                                                                                                                                                                                                ageNet21K [9] and JFT300M [33] for training. DeiT [35]
                                                                                                                                                 1. Introduction
                                                                                                                                                                                                                                subsequently shows that data augmentation and model reg-
                                                                                                                                                    The novel transformer architecture [36] has led to a big                    ularization can enable training of high-performance ViT
                                                                                                                                                 leap forward in capabilities for sequence-to-sequence mod-                     models with fewer data. Since then, ViT has instantly in-
                                                                                                                                                 eling in NLP tasks [10]. The great success of transform-                       spired several attempts to improve its efﬁciency and effec-
                                                                                                                                                 ers in NLP has sparked particular interest from the vision                     tiveness from different aspects [35, 45, 14, 38, 19].
                                                                                                                                                 community in understanding whether transformers can be a                           Along the same line of research on building stronger
                                                                                                                                                 strong competitor against the dominant Convolutional Neu-                      vision transformers, in this work, we study how to learn
                                                                                                                                                 ral Network based architectures (CNNs) in vision tasks                         multi-scale feature representations in transformer models
                                                                                                                                                 such as ResNet [15] and EfﬁcientNet [34]. Previous re-                         for image recognition. Multi-scale feature representations
                                                                                                                                                ¥*&&&                                       
                                                                                                                                                %0**$$7
                                                                                                                                                        Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 2 doc=math_p7 -->
have proven beneﬁcial for many vision tasks [5, 4, 22, 21,                     introduces an efﬁcient global attention to model both con25, 24, 7], but such potential beneﬁt for vision transform-                    tent and position-based interactions that considerably imers remains to be validated. Motivated by the effective-                       proves the speed-accuracy tradeoff of image classiﬁcation
ness of multi-branch CNN architectures such as Big-Little                      models. BoTNet [32] replaced the spatial convolutions with
Net [5] and Octave convolutions [6], we propose a dual-                        global self-attention in the ﬁnal three bottleneck blocks of
branch transformer to combine image patches (i.e. tokens in                    a ResNet resulting in models that achieve a strong perfora transformer) of different sizes to produce stronger visual                   mance for image classiﬁcation on ImageNet benchmark.
features for image classiﬁcation. Our approach processes                       In contrast to these approaches that mix convolution with
small and large patch tokens with two separate branches of                     self-attention, our work is built on top of pure self-attention
different computational complexities and these tokens are                      network like Vision Transformer [11] which has recently
fused together multiple times to complement each other.                        shown great promise in several vision applications.
Our main focus of this work is to develop feature fusion                       Vision Transformer. Inspired by the success of Transformmethods that are appropriate for vision transformers, which                    ers [36] in machine translation, convolution-free models
has not been addressed to the best of our knowledge. We                        that only rely on transformer layers have gone viral in comdo so by an efﬁcient cross-attention module, in which each                     puter vision. In particular, Vision Transformer (ViT) [11]
transformer branch creates a non-patch token as an agent                       is the ﬁrst such example of a transformer-based method to
to exchange information with the other branch by attention.                    match or even surpass CNNs for image classiﬁcation. Many
This allows for linear-time generation of the attention map                    variants of vision transformers have also been recently proin fusion instead of quadratic time otherwise. With some                       posed that uses distillation for data-efﬁcient training of viproper architectural adjustments in computational loads of                     sion transformer [35], pyramid structure like CNNs [38],
each branch, our proposed approach outperforms DeiT [35]                       or self-attention to improve the efﬁciency via learning an
by a large margin of 2% with a small to moderate increase                      abstract representation instead of performing all-to-all selfin FLOPs and model parameters (See Figure 1).                                  attention [42]. Perceiver [19] leverages an asymmetric at-
    The main contributions of our work are as follows:                         tention mechanism to iteratively distill inputs into a tight
                                                                               latent bottleneck, allowing it to scale to handle very large
  • We propose a novel dual-branch vision transformer to
                                                                               inputs. T2T-ViT [45] introduces a layer-wise Tokens-to-
    extract multi-scale feature representations for image
                                                                               Token (T2T) transformation to encode the important local
    classiﬁcation. Moreover, we develop a simple yet ef-
                                                                               structure for each token instead of the naive tokenization
    fective token fusion scheme based on cross-attention,
                                                                               used in ViT [11]. Unlike these approaches, we propose a
    which is linear in both computation and memory to
                                                                               dual-path architecture to extract multi-scale features for bet-
    combine features at different scales.
                                                                               ter visual representation with vision transformers.
  • Our approach performs better than or on par with sev-                      Multi-Scale CNNs. Multi-scale feature representations
    eral concurrent works based on ViT [11], and demon-                        have a long history in computer vision (e.g., image pyra-
    strates comparable results with EfﬁcientNet [34] with                      mids [1], scale-space representation [29], and coarse-to-ﬁne
    regards to accuracy, throughput and model parameters.                      approaches [28]). In the context of CNNs, multi-scale fea-
                                                                               ture representations have been used for detection and recog2. Related Works                                                               nition of objects at multiple scales [4, 22, 44, 26], as well
                                                                               as to speed up neural networks in Big-Little Net [5] and
   Our work relates to three major research directions:                        OctNet [6]. bLVNet-TAM [12] uses a two-branch multiconvolutional neural networks with attention, vision trans-                    resolution architecture while learning temporal dependenformer and multi-scale CNNs. Here, we focus on some rep-                       cies across frames. SlowFast Networks [13] rely on a simresentative methods closely related to our work.                               ilar two-branch model, but each branch encodes different
CNN with Attention. Attention has been widely used in                          frame rates, as opposed to frames with different spatial resmany different forms to enhance feature representations,                       olutions. While multi-scale features have shown to beneﬁt
e.g., SENet [18] uses channel-attention, CBAM [41] adds                        CNNs, it’s applicability for vision transformer still remains
the spatial attention and ECANet [37] proposes an efﬁ-                         as a novel and largely under-addressed problem.
cient channel attention to further improve SENet. There
has also been a lot of interest in combining CNNs with                         3. Method
different forms of self-attention [2, 32, 48, 31, 3, 17, 39].
SASA [31] and SAN [48] deploy a local-attention layer                             Our method is built on top of vision transformer [11], so
to replace convolutional layer. Despite promising results,                     we ﬁrst present a brief overview of ViT and then describe
prior approaches limited the attention scope to local re-                      our proposed method (CrossViT) for learning multi-scale
gion due to its complexity. LambdaNetwork [2] recently                         features for image classiﬁcation.
                                                                            
       Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 3 doc=math_p7 -->
Cat                                        network (FFN). FFN contains two-layer multilayer percep-
                                                                              tron with expanding ratio r at the hidden layer, and one
                                   +
                                                                              GELU non-linearity is applied after the ﬁrst linear layer.
                  MLP header           MLP header                             Layer normalization (LN) is applied before every block, and
                                                                              residual shortcuts after every block. The input of ViT, x0 ,
                                                                              and the processing of the k-th block can be expressed as
$$
                               Multi-Scale Transformer Encoder ⨉K                               x0 = [xcls ||xpatch ] + xpos
$$
          …                                                     …
$$
                                                                                                yk = xk−1 + MSA(LN(xk−1 ))                          (1)
$$
$$
                                                                                                xk = yk + FFN(LN(yk )),
$$
                       Cross-Attention ⨉L
$$
                                                                              where xcls ∈ R1×C and xpatch ∈ RN ×C are the CLS and
$$
$$
                                                                              patch tokens respectively and xpos ∈ R(1+N )×C is the po-
$$
   Transformer Encoder ⨉N                  Transformer Encoder ⨉M             sition embedding. N and C are the number of patch tokens
                                                                              and dimension of the embedding, respectively.
                                                                                  It is worth noting that one very different design of ViT
          …                                                     …             from CNNs is the CLS token. In CNNs, the ﬁnal embedding
                                                                              is usually obtained by averaging the features over all spatial
       Linear projection                       Linear projection              locations while ViT uses the CLS that interacts with patch
                                                                              tokens at every transformer encoder as the ﬁnal embedding.
                                                                              Thus, we consider CLS as an agent that summarizes all the
                                                                              patch tokens and hence the proposed module is designed
      S-Branch                                             L-Branch
                                                                              based on CLS to form a dual-path multi-scale ViT.
         Small patch size Ps                   Large patch size Pl
                                                                              3.2. Proposed Multi-Scale Vision Transformer
             : CLS token               ,    : Image patch token                   The granularity of the patch size affects the accuracy
                                                                              and complexity of ViT; with ﬁne-grained patch size, ViT
Figure 2: An illustration of our proposed transformer                         can perform better but results in higher FLOPs and memory
architecture for learning multi-scale features with cross-                    consumption. For example, the ViT with a patch size of 16
attention (CrossViT). Our architecture consists of a stack                    outperforms the ViT with a patch size of 32 by 6% but the
$$
of K multi-scale transformer encoders. Each multi-scale                       former needs 4× more FLOPs. Motivated by this, our protransformer encoder uses two different branches to process                    posed approach is trying to leverage the advantages from
$$
image tokens of different sizes (Ps and Pl , Ps < Pl ) and                    more ﬁne-grained patch sizes while balancing the complexfuse the tokens at the end by an efﬁcient module based on                     ity. More speciﬁcally, we ﬁrst introduce a dual-branch ViT
cross attention of the CLS tokens. Our design includes dif-                   where each branch operates at a different scale (or patch
ferent numbers of regular transformer encoders in the two                     size in the patch embedding) and then propose a simple yet
branches (i.e. N and M) to balance computational costs.                       effective module to fuse information between the branches.
                                                                                  Figure 2 illustrates the network architecture of our
                                                                              proposed Cross-Attention Multi-Scale Vision Transformer
3.1. Overview of Vision Transformer                                           (CrossViT). Our model is primarily composed of K multi-
                                                                              scale transformer encoders where each encoder consists of
   Vision Transformer (ViT) [11] ﬁrst converts an image                       two branches: (1) L-Branch: a large (primary) branch
into a sequence of patch tokens by dividing it with a cer-                    that utilizes coarse-grained patch size (Pl ) with more transtain patch size and then linearly projecting each patch into                  former encoders and wider embedding dimensions, (2) Stokens. An additional classiﬁcation token (CLS) is added                      Branch: a small (complementary) branch that operates
to the sequence, as in the original BERT [10]. Moreover,                      at ﬁne-grained patch size (Ps ) with fewer encoders and
since self-attention in the transformer encoder is position-                  smaller embedding dimensions. Both branches are fused
agnostic and vision applications highly need position infor-                  together L times and the CLS tokens of the two branches
mation, ViT adds position embedding into each token, in-                      at the end are used for prediction. Note that for each token
cluding the CLS token. Afterwards, all tokens are passed                      of both branches, we also add a learnable position embedthrough stacked transformer encoders and ﬁnally the CLS                       ding before the multi-scale transformer encoder for learning
token is used for classiﬁcation. A transformer encoder is                     position information as in ViT [11].
composed of a sequence of blocks where each block con-                            Effective feature fusion is the key for learning multitains multiheaded self-attention (MSA) with a feed-forward                    scale feature representations. We explore four different fu-
                                                                           
      Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 4 doc=math_p7 -->
Fusion                                Fusion                                   Fusion                            Fusion                Fusion
Concat
            …            …                     …                     …                    …             …                             …                     …
         (a) All-attention                       (b) Class token                          (c) Pairwise                            (d) Cross-attention
                                                           : CLS token        ,   : Image patch token
Figure 3: Multi-scale fusion. (a) All-attention fusion where all tokens are bundled together without considering any characteristic of tokens. (b) Class token fusion, where only CLS tokens are fused as it can be considered as global representation
of one branch. (c) Pairwise fusion, where tokens at the corresponding spatial locations are fused together and CLS are fused
separately. (d) Cross-attention, where CLS token from one branch and patch tokens from another branch are fused together.
sion strategies: three simple heuristic approaches and the                        its own spatial location of an image, a simple heuristic way
proposed cross-attention module as shown in Figure 3. Be-                         for fusion is to combine them based on their spatial localow we provide the details on these fusion schemes.                               tion. However, the two branches process patches of differ-
                                                                                  ent sizes, thus having different number of patch tokens. We
3.3. Multi-Scale Feature Fusion                                                   ﬁrst perform an interpolation to align the spatial size, and
   Let xi be the token sequence (both patch and CLS to-                           then fuse the patch tokens of both branches in a pair-wise
kens) at branch i, where i can be l or s for the large (pri-                      manner. On the other hand, the two CLS are fused sepamary) or small (complementary) branch. xicls and xipatch                          rately. The output zi of pairwise fusion of branch l and s
represent CLS and patch tokens of branch i, respectively.                         can be expressed as
All-Attention Fusion. A straightforward approach is to                                     ⎡                                                                    ⎤
simply concatenate all the tokens from both branches with-                                                                            
$$
out considering the property of each token and then fuse                            zi = ⎣ g i (             f j (xjcls )) || g i (             f j (xjpatch ))⎦ ,
$$
$$
                                                                                                   j∈{l,s}                            j∈{l,s}
$$
information via the self-attention module, as shown in Figure 3(a). This approach requires quadratic computation                                                                                                              (4)
time since all tokens are passed through the self-attention
module. The output zi of the all-attention fusion scheme                          where f i (·) and g i (·) play the same role as Eq. 2.
can be expressed as
                                                                                  Cross-Attention Fusion. Figure 3(d) shows the basic idea
                             
$$
    y = f l (xl ) || f s (xs ) , o = y + MSA(LN(y)),                              of our proposed cross-attention, where the fusion involves
$$
                                                      (2)                       the CLS token of one branch and patch tokens of the other
$$
    o = ol || os , zi = g i (oi ),
$$
                                                                                  branch. Speciﬁcally, in order to fuse multi-scale features
where f i (·) and g i (·) are the projection and back-projection                  more efﬁciently and effectively, we ﬁrst utilize the CLS tofunctions to align the dimension.                                                 ken at each branch as an agent to exchange information
                                                                                  among the patch tokens from the other branch and then back
Class Token Fusion. The CLS token can be considered as                            project it to its own branch. Since the CLS token already
an abstract global feature representation of a branch since                       learns abstract information among all patch tokens in its
it is used as the ﬁnal embedding for prediction. Thus, a                          own branch, interacting with the patch tokens at the other
simple approach is to sum the CLS tokens of two branches,                         branch helps to include information at a different scale. Afas shown in Figure 3(b). This approach is very efﬁcient as                        ter the fusion with other branch tokens, the CLS token interonly one token needs to be processed. Once CLS tokens are                         acts with its own patch tokens again at the next transformer
fused, the information will be passed back to patch tokens                        encoder, where it is able to pass the learned information
at the later transformer encoder. More formally, the output                       from the other branch to its own patch tokens, to enrich the
zi of this fusion module can be represented as                                    representation of each patch token. In the following, we
                 ⎡                                   ⎤
                                                                                 describe the cross-attention module for the large branch (L-
$$
            zi = ⎣ g i (    f j (xjcls )) || xipatch ⎦ , (3)                      branch), and the same procedure is performed for the small
$$
$$
                         j∈{l,s}                                                  branch (S-branch) by simply swapping the index l and s.
$$
                                                                                      An illustration of the cross-attention module for the large
where f i (·) and g i (·) play the same role as Eq. 2.
                                                                                  branch is shown in Figure 4. Speciﬁcally, for branch l, it
Pairwise Fusion. Figure 3(c) shows how both branches are                          ﬁrst collects the patch tokens from the S-Branch and confused in pairwise fusion. Since patch tokens are located at                       catenates its own CLS tokens to them, as shown in Eq. 5.
                                                                              
         Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 5 doc=math_p7 -->
…
                                              l
                                             ycls                                 where f l (·) and g l (·) are the projection and back-projection
                                                                                  function for dimension alignment, respectively. We empir-
                             Concat
                                                                                  ically show in Section 4.3 that cross-attention achieves the
                                             g l (·)                              best accuracy compared to other three simple heuristic ap-
                                                                                  proaches while being efﬁcient for mult-scale feature fusion.
                                               +
                                              ⨉                                   4. Experiments
                                 Softmax
                                                                                      In this section, we conduct extensive experiments to
                         q            ⨉       k                 v                 show the effectiveness of our proposed CrossViT over ex-
                                                                                  isting methods. First, we check the advantages of our pro-
                        Wq                  Wk              Wv
                                                                                  posed model over the baseline DeiT in Table 2, and then we
                        xlcls                                                    compare with serveral concurrent ViT variants and CNN-
                                             xlcls         …                     based models in Table 3 and Table 4, respectively. More-
                        f l (·)                               Concat              over, we also test the transferability of CrossViT on 5 down-
                                                                                  stream tasks (Table 5). Finally, we perform ablation studies
              …         xlcls                               …                     on different fusion schemes in Table 6 and discuss the effect
         xlpatch   Large Branch                    xspatch Small Branch           of different parameters of CrossViT in Table 7.
Figure 4: Cross-attention module for Large branch. The                            4.1. Experimental Setup
CLS token of the large branch (circle) serves as a query to-                      Dataset. We validate the effectiveness of our proposed apken to interact with the patch tokens from the small branch                       proach on the ImageNet1K dataset [9], and use the top-1
through attention. f l (·) and g l (·) are projections to align                   accuracy on the validation set as the metrics to evaluate
dimensions. The small branch follows the same procedure                           the performance of a model. ImageNet1K contains 1,000
but swaps CLS and patch tokens from another branch.                               classes and the number of training and validation images
                                                                                  are 1.28 millions and 50,000, respectively. We also test
                                                                                  the transferability of our approach using several smaller
                                                                                  datasets, such as CIFAR10 [20] and CIFAR100 [20].
                                               
$$
                   xl = f l (xlcls ) || xspatch ,                        (5)     Training and Evaluation. The original ViT [11] achieves
$$
                                                                                  competitive results compared to some of the best CNN
where f l (·) is the projection function for dimension align-
                                                                                  models but only when trained on very large-scale datasets
ment. The module then performs cross-attention (CA) be-
                                                                                  (e.g. ImageNet21K [9] and JFT300M [33]). Neverthetween xlcls and xl , where CLS token is the only query as
                                                                                  less, DeiT [35] shows that with the help of a rich set of
the information of patch tokens are fused into CLS token.
                                                                                  data augmentation techniques, ViT can be trained from ImaMathematically, the CA can be expressed as
                                                                                  geNet alone to produce comparable results to CNN models.
$$
         q = xlcls Wq , k = xl Wk , v = xl Wv ,                                Therefore, in our experiments, we build our models based
$$
                                                                          (6)     on DeiT [35], and apply their default hyper-parameters for
$$
    A = softmax(qkT /                     C/h), CA(xl ) = Av,                    training. These data augmentation methods include rand
$$
$$
where Wq , Wk , Wv ∈ RC×(C/h) are learnable param-                                augmentation [8], mixup [47] and cutmix [46] as well as
$$
eters, C and h are the embedding dimension and number                             random erasing [49]. We also apply drop path [34] for
of heads. Note that since we only use CLS in the query,                           model regularization but instance repetition [16] is only enthe computation and memory complexity of generating the                           abled for CrossViT-18 as it does not improve small models.
attention map (A) in cross-attention are linear rather than                           We train all our models for 300 epochs (30 warm-up
quadratic as in all-attention, making the entire process more                     epochs) on 32 GPUs with a batch size of 4,096. Other setup
efﬁcient. Moreover, as in self-attention, we also use multi-                      includes a cosine linear-rate scheduler with linear warm-up,
ple heads in the CA and represent it as (MCA). However, we                        an initial learning rate of 0.004 and a weight decay of 0.05.
do not apply a feed-forward network FFN after the cross-                          During evaluation, we resize the shorter side of an image to
$$
attention. Speciﬁcally, the output zl of a cross-attention                        256 and take the center crop 224×224 as the input. Moremodule of a given xl with layer normalization and residual                        over, we also ﬁne-tuned our models with a larger resolution
$$
$$
shortcut is deﬁned as follows.                                                    (384×384) for fair comparison in some cases. Bicubic in-
$$
      l
                                                                                terpolation was applied to adjust the size of the learnt posi-
$$
    ycls  =f l xlcls + MCA(LN( f l (xlcls ) || xspatch ))                         tion embedding, and the ﬁnetuning took 30 epochs. More
$$
                                                        (7)
$$
       zl = g l ycls
$$
                   l
                        || xlpatch ,                                              details can be found in supplementary material.
                                                                                
       Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 6 doc=math_p7 -->
Model            Patch      Patch size    Dimension    # of heads   M   r          Model             Top-1 Acc.      FLOPs      Throughput      Params
                embedding   Small Large   Small Large
                                                                                                         (%)           (G)       (images/s)       (M)
 CrossViT-Ti     Linear      12     16     96     192      3         4   4
 CrossViT-S      Linear      12     16    192     384      6         4   4          DeiT-Ti          72.2               1.3          2557          5.7
 CrossViT-B      Linear      12     16    384     768      12        4   4
 CrossViT-9      Linear      12     16    128     256      4         3   3
                                                                                    CrossViT-Ti      73.4 (+1.2)        1.6          1668          6.9
 CrossViT-15     Linear      12     16    192     384      6         5   3          CrossViT-9       73.9 (+0.5)        1.8          1530          8.6
 CrossViT-18     Linear      12     16    224     448      7         6   3          CrossViT-9†      77.1 (+3.2)        2.0          1463          8.8
 CrossViT-9†     3 Conv.     12     16    128     256      4         3   3
 CrossViT-15†    3 Conv.     12     16    192     384      6         5   3          DeiT-S           79.8               4.6          966           22.1
 CrossViT-18†    3 Conv.     12     16    224     448      7         6   3          CrossViT-S       81.0 (+1.2)        5.6          690           26.7
                                                                                    CrossViT-15      81.5 (+0.5)        5.8          640           27.4
$$
Table 1: Model architectures of CrossViT. K = 3, N =                                CrossViT-15†     82.3 (+0.8)        6.1          626           28.2
$$
$$
1, L = 1 for all models, and number of heads are same                               DeiT-B           81.8              17.6          314          86.6
$$
for both branches. K denotes the number of multi-scale                              CrossViT-B       82.2 (+0.4)       21.2          239          104.7
transformer encoders. M , N and L denote the number of                              CrossViT-18      82.5 (+0.3)        9.0          430           43.3
transformer encoders of the small and large branches and                            CrossViT-18†     82.8 (+0.3)       9.5           418          44.3
the cross-attention modules in one multi-scale transformer
encoder. r is the expanding ratio of feed-forward network                        Table 2: Comparisons with DeiT baseline on Ima-
(FFN) in the transformer encoder. See Figure 2 for details.                      geNet1K. The numbers in the bracket show the improve-
                                                                                 ment from each change. See Table 1 for model details.
Models. Table 1 speciﬁes the architectural conﬁgurations
of the CrossViT models used in our evaluation. Among                             9 (+3.2%) and CrossViT-15 (+0.8%). As the number of
these models, CrossViT-Ti, CrossViT-S and CrossViT-B                             transformer encoders increases, the effectiveness of conset their large (primary) branches identical to the tiny (DeiT-                  volution layers seems to become weaker, but CrossViTTi), small (DeiT-S) and base (DeiT-B) models introduced in                       18† still gains another 0.3% improvement over CrossViTDeiT [35], respectively. The other models vary by different                      18. We would like to point out that the work of T2T [45]
expanding ratios in FFN (r), depths and embedding dimen-                         concurrently proposes a different approach based on tokensions. In particular, the ending number in a model name                          to-token transformation to address the limitation of linear
tells the total number of transformer encoders in the large                      patch embedding in vision transformer.
branch used. For example, CrossViT-15 has 3 multi-scale                             Despite the design of CrossViT is intended for accuracy,
encoders, each of which includes 5 regular transformers, re-                     the efﬁciency is also considered. E.g., CrossViT-9† and
sulting in a total of 15 transformer encoders.                                   CrossViT-15† incur 30-50% more FLOPs and parameters
    The original ViT paper [11] shows that a hybrid approach                     than the baselines. However, their accuracy is considerably
that generates patch tokens from a CNN model such as                             improved by ∼2.5-5%. On the other hand, CrossViT-18†
ResNet-50 can improve the performance of ViT on the Im-                          reduces the FLOPs and parameters almost by half compared
ageNet1K dataset. Here we experiment with a similar idea                         to DeiT-B while still being 1.0% more accurate.
by substituting the linear patch embedding in ViT by three
convolutional layers as the patch tokenizer. These models                        Comparisons with SOTA Transformers. We further comare differentiated from others by a sufﬁx † in Table 1.                          pare our proposed approach with some very recent concur-
                                                                                 rent works on vision transformers. They all improve the
4.2. Main Results                                                                original ViT [11] with respect to efﬁciency, accuracy or
Comparisons with DeiT. DeiT [35] is a better trained ver-                        both. As shown in Table 3, CrossViT-15† outperforms the
sion of ViT, we thus compare our approach with three base-                       small models of all the other approaches with comparable
line models introduced in DeiT, i.e., DeiT-Ti,DeiT-S and                         FLOPs and parameters. Interestingly when compared with
DeiT-B. It can be seen from Table 2 that CrossViT im-                            ViT-B, CrossViT-18† signiﬁcantly outperforms it by 4.9%
proves DeiT-Ti, DeiT-S and DeiT-B by 1.2%, 1.2% and                              (77.9% vs 82.8%) in accuracy while requiring 50% less
0.4% points respectively when they are used as the pri-                          FLOPs and parameters. Furthermore, CrossViT-18† permary branch of CrossViT. This clearly demonstrates that                          forms as well as TNT-B and better than the others, but also
our proposed cross-attention is effective in learning multi-                     has fewer FLOPs and parameters. Our approach is consisscale transformer features for image recognition. By mak-                        tently better than T2T-ViT [45] and PVT [38] in terms of
ing a few architectural changes (see Table 1), CrossViT                          accuracy and FLOPs, showing the efﬁcacy of multi-scale
further raises the accuracy of the baselines by another 0.3-                     features in vision transformers.
0.5% point, with only a small increase in FLOPs and model                        Comparisons with CNN-based Models. CNN-based
parameters. Surprisingly, the convolution-based embed-                           models are dominant in computer vision applications. In
ding provides a signiﬁcant performance boost to CrossViT-                        this experiment, we compare our proposed approach with
                                                                              
         Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 7 doc=math_p7 -->
Model                                            Top-1 Acc. (%)      FLOPs (G)   Params (M)         Model               CIFAR10         CIFAR100     Pet    CropDiseases   ChestXRay8
Peceiver [19] (arXiv, 2021-03)                         76.4             −           43.9            DeiT-S [35]           99.15            90.89    94.93      99.96         55.39
DeiT-S [35] (arXiv, 2020-12)                           79.8            4.6          22.1            DeiT-B [35]           99.10∗           90.80∗   94.39      99.96         55.77
CentroidViT-S [42] (arXiv, 2021-02)                    80.9            4.7          22.3            CrossViT-15           99.00            90.77    94.55      99.97         55.89
PVT-S [38] (arXiv, 2021-02)                            79.8            3.8          24.5            CrossViT-18           99.11            91.36    95.07      99.97         55.94
PVT-M [38] (arXiv, 2021-02)                            81.2            6.7          44.2            ∗ : numbers reported in the original paper.
T2T-ViT-14 [45] (arXiv, 2021-01)                       80.7            6.1∗         21.5
TNT-S [14] (arXiv, 2021-02)                            81.3            5.2          23.8
CrossViT-15 (Ours)                                     81.5            5.8          27.4        Table 5: Transfer learning performance. Our CrossViT
CrossViT-15† (Ours)                                    82.3            6.1          28.2
                                                                                                models are very competitive with the recent DeiT [35] modViT-B@384 [11] (ICLR, 2021)                            77.9            17.6         86.6
DeiT-B [35] (arXiv, 2020-12)                           81.8            17.6         86.6        els on all the downstream classiﬁcation tasks.
PVT-L [38] (arXiv, 2021-02)                            81.7             9.8         61.4
T2T-ViT-19 [45] (arXiv, 2021-01)                       81.4            9.8∗         39.0
T2T-ViT-24 [45] (arXiv, 2021-01)                       82.2            15.0∗        64.1
TNT-B [14] (arXiv, 2021-02)                            82.8            14.1         65.6        inference throughput (images/second) in Table 4. We folCrossViT-18 (Ours)                                     82.5             9.0         43.3        low prior work [35] to report accuracy from the original paCrossViT-18† (Ours)                                    82.8             9.5         44.3
∗ : We recompute the ﬂops by using our tools.                                                   pers. First, when compared to the ResNet family, including
                                                                                                ResNet [15], ResNeXt [43], SENet [18], ECA-ResNet [37]
Table 3: Comparisons with recent transformer-based                                              and RegNet [30], CrossViT-15 outperforms all of them in
models on ImageNet1K. All models are trained using only                                         accuracy while being smaller and running more efﬁciently
ImageNet1K dataset. Numbers are referenced from their                                           (except ResNet-101, which is slightly faster). In addition,
recent version as of the submission date.                                                       our best models such as CrossViT-15† and CrossViT-18†,
                                                                                                when evaluated at higher image resolution, are encourag-
 Model                                   Top-1 Acc.       FLOPs       Throughput    Params
                                                                                                ingly competitive against EfﬁcientNet [34] with regard to
                                            (%)            (G)        (images/s)     (M)        accuracy, throughput and parameters. We expect neural ar-
 ResNet-101 [15]                                76.7          7.80        678        44.6       chitecture search (NAS) [50] to close the performance gap
 ResNet-152 [15]                                77.0          11.5        445        60.2       between our approach and EfﬁcientNet.
$$
 ResNeXt-101-32×4d [43]                         78.8           8.0        477        44.2
$$
$$
 ResNeXt-101-64×4d [43]                         79.6          15.5        289        83.5       Transfer Learning. Despite our model achieves bet-
$$
 SEResNet-101 [18]                              77.6           7.8        564        49.3       ter accuracy on ImageNet1K compared to the baselines
 SEResNet-152 [18]                              78.4          11.5        392        66.8       (Table 2), it is crucial to check generalization of the
 SENet-154 [18]                                 81.3          20.7        201       115.1       models by evaluating transfer performance on tasks with
 ECA-Net101 [37]                                78.7           7.4        591        42.5       fewer samples. We validate this by performing trans-
 ECA-Net152 [37]                                78.9          10.9        428        59.1
                                                                                                fer learning on 5 image classiﬁcation tasks, including CI-
 RegNetY-8GF [30]                               79.9           8.0        557        39.2
 RegNetY-12GF [30]                              80.3          12.1        439        51.8       FAR10 [20], CIFAR100 [20], Pet [27], CropDisease [23],
 RegNetY-16GF [30]                              80.4          15.9        336        83.6       and ChestXRay8 [40]. While the ﬁrst four datasets con-
 RegNetY-32GF [30]                              81.0          32.3        208       145.0       tains natural images, ChestXRay8 consists of medical im-
 EfﬁcienetNet-B4@380 [34]                       82.9           4.2        356         19        ages. We ﬁnetune the whole pretrained models with 1,000
 EfﬁcienetNet-B5@456 [34]                       83.7           9.9        169         30
 EfﬁcienetNet-B6@528 [34]                       84.0          19.0        100         43        epochs, batch size 768, learning rate 0.01, SGD optimizer,
 EfﬁcienetNet-B7@600 [34]                       84.3          37.0         55         66        weight decay 0.0001, and using the same data augmen-
 CrossViT-15                                    81.5           5.8        640        27.4       tation in training on ImageNet1K. Table 5 shows the re-
 CrossViT-15†                                   82.3           6.1        626        28.2       sults. While being better in ImageNet1K, our model is on
 CrossViT-15†@384                               83.5          21.4        158        28.5
 CrossViT-18                                    82.5          9.03        430        43.3
                                                                                                par with DeiT models on all the downstream classiﬁcation
 CrossViT-18†                                   82.8           9.5        418        44.3       tasks. This result assures that our models still have good
 CrossViT-18†@384                               83.9          32.4        112        44.6       generalization ability rather than only ﬁt to ImageNet1K.
 CrossViT-18†@480                               84.1          56.6         57        44.9
                                                                                                4.3. Ablation Studies
$$
Table 4: Comparisons with CNN models on ImageNet1K. Models are evaluated under 224×224 if not spec-                                           In this section, we ﬁrst compare the different fusion apiﬁed. The inference throughput is measured under a batch                                        proaches (Section 3.3), and then analyze the effects of difsize of 64 on a Nvidia Tesla V100 GPU with cudnn 8.0. We                                        ferent parameters of our architecture design, including the
$$
report the averaged speed over 100 iterations.                                                  patch sizes, the channel width and depth of the small branch
                                                                                                and number of cross-attention modules. At the end, we also
                                                                                                validate that the proposed can cooperate with other concursome of the best CNN models including both hand-crafted                                         rent works for better accuracy.
(e.g., ResNet [15]) and search based ones (e.g., Efﬁcient-                                      Comparison of Different Fusion Schemes. Table 6 shows
Net [34]). In addition to accuracy, FLOPs and parameters,                                       the performance of different fusions schemes, including (I)
run-time speed is measured for all the models and shown as                                      no fusion, (II) all-attention, (III) class token fusion, (IV)
                                                                                              
          Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 8 doc=math_p7 -->
Top-1     FLOPs     Params    Single Branch Acc. (%)            Model         Patch size    Dimension                     Top-1     FLOPs   Params
                                                                                                  Small Large   Small Large   K   N   M   L   Acc. (%)    (G)     (M)
 Fusion             Acc. (%)    (G)       (M)      L-Branch    S-Branch
                                                                                     CrossViT-S    12    16     192    384    3   1   4   1     81.0      5.6     26.7
 None                 80.2       5.3      23.7       80.2         0.1                A             8     16     192    384    3   1   4   1     80.8      6.7     26.7
 All-Attention        80.0       7.6      27.7       79.9         0.5                B             12    16     384    384    3   1   4   1     80.1      7.7     31.4
 Class Token          80.3       5.4      24.2       80.6         7.6                C             12    16     192    384    3   2   4   1     80.7      6.3     28.0
                                                                                     D             12    16     192    384    3   1   4   2     81.0      5.6     28.9
 Pairwise             80.3       5.5      24.2       80.3         7.3                E             12    16     192    384    6   1   2   1     80.9      6.6     31.1
 Cross-Attention      81.0       5.6      26.7       68.1         47.2
                                                                                  Table 7: Ablation study with different architecture
Table 6: Ablation study with different fusions on Im-                             parameters on ImageNet1K. The blue color indicates
ageNet1K. All models are based on CrossViT-S. Single                              changes from CrossViT-S.
branch Acc. is computed using CLS from one branch only.
                                                                                  duces more FLOPs and parameters. This is because patch
pairwise fusion, and (V) the proposed cross-attention fu-                         token from the other branch is untouched, and the advansion. Among all the compared strategies, the proposed                             tages from stacking more than one cross-attention is small
cross-attention fusion achieves the best accuracy with minor                      as cross-attention is a linear operation without any nonlinincrease in FLOPs and parameters. Surprisingly, despite the                       earity function. Likewise, using more multi-scale transuse of additional self-attention to combine information be-                       former encoders also does not help in performance which
tween two branches, all-attention fails to achieve better per-                    is the similar case to increase the capacity of S-branch.
formance compared to the simple class token fusion. While
the primary L-branch dominates in accuracy by diminishing                         Importance of CLS Tokens. We experiment with one
the effect of complementary S-branch in other fusion strate-                      model based on CrossViT-S without CLS tokens, where
gies, both of the branches in our proposed cross-attention                        the model averages the patch tokens of one branch as the
fusion scheme achieve certain accuracy and their ensemble                         CLS token for cross attention with the other branch. This
becomes the best, suggesting that these two branches learn                        model achieved 80.0% accuracy which is is 1% worse than
different features for different images.                                          CrossViT-S (81.0%) on ImageNet1K, showing effective-
                                                                                  ness of CLS token in summarizing information of current
Effect of Patch Sizes. We perform experiments to under-                           branch for passing to another one through cross-attention.
stand the effect of patch sizes in our CrossViT by testing
two pairs of patch sizes such as (8, 16) and (12, 16), and                        Cooperation with Concurrent Works. Our proposed
observe that the one with (12, 16) achieves better accuracy                       cross-attention is also capable of cooperating with other
with fewer FLOPs as shown in Table 7 (A). Intuitively, (8,                        concurrent ViT variants. We consider T2T-ViT [45] as a
16) should get better results as patch size of 8 provides more                    case study and use the T2T module to replace linear projec-
ﬁne-grained features; however, it is not good as (12, 16) be-                     tion of patch embedding in both branches on CrossViT-18.
cause of the large difference in granularity between the two                      CrossViT-18+T2T achieves an top-1 accuracy of 83.0% on
$$
branches, which makes it difﬁcult for smooth learning of                          ImageNet1K, additional 0.5% improvement over CrossViTthe features. For the pair (8, 16), the number of patch to-                       18. This shows that our proposed cross-attention is also cakens are 4× difference while the ratio of patch tokens are                        pable of learning multi-scale features for other ViT variants.
$$
$$
only 2× for the model with (12, 16).
$$
Channel Width and Depth in S-branch. Despite our                                  5. Conclusion
cross-attention is designed to be light-weight, we check the                         In this paper, we present CrossViT, a dual-branch vision
performance by using a more complex S-branch, as shown                            transformer for learning multi-scale features, to improve the
in Table 7 (B and C). Both models increase FLOPs and pa-                          recognition accuracy for image classiﬁcation. To effectively
rameters without any improvement in accuracy, which we                            combine image patch tokens of different scales, we further
think is due to the fact that L-branch has the main role to                       develop a fusion method based on cross-attention to exextract features while S-branch only provides additional in-                      change information between two branches efﬁciently in linformation; thus, a light-weight branch is enough.                                 ear time. With extensive experiments, we demonstrate that
Depth of Cross-Attention and Number of Multi-Scale                                our proposed model performs better than or on par with sevTransformer Encoders. To increase frequency of fu-                                eral concurrent works on vision transformer, in addition to
sion across two branches, we can either stack more cross-                         efﬁcient CNN models. While our current work scratches the
attention modules (L) or stack more multi-scale transformer                       surface on multi-scale vision transformers for image clasencoders (K) (by reducing M to keep the same total depth                          siﬁcation, we anticipate that in future there will be more
of a model). Results are shown in Table 7 (D and E). With                         works in developing efﬁcient multi-scale transformers for
CrossViT-S as baseline, too frequent fusion of branches                           other vision applications, including object detection, sedoes not provide any performance improvement but intro-                           mantic segmentation, and video action recognition.
                                                                               
          Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 9 doc=math_p7 -->
References                                                                     [12] Quanfu Fan, Chun-Fu Richard Chen, Hilde Kuehne, Marco
                                                                                    Pistoia, and David Cox. More is less: Learning efﬁcient
 [1] Edward H Adelson, Charles H Anderson, James R Bergen,                          video representations by big-little network and depthwise
     Peter J Burt, and Joan M Ogden. Pyramid methods in image                       temporal aggregation. In Advances in Neural Information
     processing. RCA engineer, 29(6):33–41, 1984. 2                                 Processing Systems, pages 2261–2270, 2019. 2
 [2] Irwan Bello. Lambdanetworks: Modeling long-range inter-                   [13] Christoph Feichtenhofer, Haoqi Fan, Jitendra Malik, and
     actions without attention. In International Conference on                      Kaiming He. Slowfast networks for video recognition. In
     Learning Representations, 2021. 2                                              Proceedings of the IEEE International Conference on Com-
 [3] Irwan Bello, Barret Zoph, Ashish Vaswani, Jonathon Shlens,                     puter Vision, pages 6202–6211, 2019. 2
     and Quoc V Le. Attention augmented convolutional net-                     [14] Kai Han, An Xiao, Enhua Wu, Jianyuan Guo, Chunjing Xu,
     works. In Proceedings of the IEEE/CVF International Con-                       and Yunhe Wang. Transformer in transformer. arXiv preprint
     ference on Computer Vision, pages 3286–3295, 2019. 1, 2                        arXiv:2103.00112, 2021. 1, 7
 [4] Zhaowei Cai, Quanfu Fan, Rogerio S Feris, and Nuno Vas-                   [15] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun.
     concelos. A uniﬁed multi-scale deep convolutional neural                       Deep Residual Learning for Image Recognition. In The IEEE
     network for fast object detection. In European conference                      Conference on Computer Vision and Pattern Recognition,
     on computer vision, pages 354–370. Springer, 2016. 2                           June 2016. 1, 7
 [5] Chun-Fu (Richard) Chen, Quanfu Fan, Neil Mallinar, Tom                    [16] Elad Hoffer, Tal Ben-Nun, Itay Hubara, Niv Giladi, Torsten
     Sercu, and Rogerio Feris. Big-Little Net: An Efﬁcient Multi-                   Hoeﬂer, and Daniel Soudry. Augment your batch: Improving
     Scale Feature Representation for Visual and Speech Recog-                      generalization through instance repetition. In Proceedings of
     nition. In International Conference on Learning Represen-                      the IEEE/CVF Conference on Computer Vision and Pattern
     tations, 2019. 2                                                               Recognition, June 2020. 5
 [6] Yunpeng Chen, Haoqi Fan, Bing Xu, Zhicheng Yan, Yan-                      [17] Han Hu, Zheng Zhang, Zhenda Xie, and Stephen Lin. Lo-
     nis Kalantidis, Marcus Rohrbach, Shuicheng Yan, and Ji-                        cal relation networks for image recognition. In Proceedings
     ashi Feng. Drop an octave: Reducing spatial redundancy in                      of the IEEE/CVF International Conference on Computer Vi-
     convolutional neural networks with octave convolution. In                      sion, pages 3464–3473, 2019. 2
     Proceedings of the IEEE/CVF International Conference on                   [18] J. Hu, L. Shen, and G. Sun. Squeeze-and-excitation net-
     Computer Vision, pages 3435–3444, 2019. 2                                      works. In 2018 IEEE/CVF Conference on Computer Vision
 [7] Bowen Cheng, Bin Xiao, Jingdong Wang, Honghui Shi,                             and Pattern Recognition, pages 7132–7141, 2018. 2, 7
     Thomas S. Huang, and Lei Zhang. Higherhrnet: Scale-aware                  [19] Andrew Jaegle, Felix Gimeno, Andy Brock, Oriol Vinyals,
     representation learning for bottom-up human pose estima-                       Andrew Zisserman, and Joao Carreira. Perceiver: General
     tion. In IEEE/CVF Conference on Computer Vision and Pat-                       perception with iterative attention. In Marina Meila and Tong
     tern Recognition, June 2020. 2                                                 Zhang, editors, Proceedings of the 38th International Con-
 [8] Ekin Dogus Cubuk, Barret Zoph, Jon Shlens, and Quoc                            ference on Machine Learning, volume 139 of Proceedings
     Le. RandAugment: Practical Automated Data Augmenta-                            of Machine Learning Research, pages 4651–4664. PMLR,
     tion with a Reduced Search Space. In H Larochelle, M Ran-                      18–24 Jul 2021. 1, 2, 7
     zato, R Hadsell, M F Balcan, and H Lin, editors, Advances                 [20] Alex Krizhevsky, Geoffrey Hinton, et al. Learning multiple
     in Neural Information Processing Systems, pages 18613–                         layers of features from tiny images. 2009. 5, 7
     18624. Curran Associates, Inc., 2020. 5                                   [21] Xiang Li, Wenhai Wang, Xiaolin Hu, and Jian Yang. Selec-
 [9] Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li,                         tive kernel networks. In Proceedings of the IEEE/CVF Con-
     and Li Fei-Fei. Imagenet: A large-scale hierarchical image                     ference on Computer Vision and Pattern Recognition, June
     database. In 2009 IEEE conference on computer vision and                       2019. 2
     pattern recognition, pages 248–255. Ieee, 2009. 1, 5                      [22] Tsung-Yi Lin, Piotr Dollár, Ross Girshick, Kaiming He,
[10] Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina                         Bharath Hariharan, and Serge Belongie. Feature pyra-
     Toutanova. BERT: Pre-training of deep bidirectional trans-                     mid networks for object detection. In Proceedings of the
     formers for language understanding. In Proceedings of the                      IEEE conference on computer vision and pattern recogni-
     2019 Conference of the North American Chapter of the As-                       tion, pages 2117–2125, 2017. 2
     sociation for Computational Linguistics: Human Language                   [23] Sharada P Mohanty, David P Hughes, and Marcel Salathé.
     Technologies, Volume 1 (Long and Short Papers), pages                          Using deep learning for image-based plant disease detection.
     4171–4186, Minneapolis, Minnesota, June 2019. Associa-                         Frontiers in plant science, 7:1419, 2016. 7
     tion for Computational Linguistics. 1, 3                                  [24] Seungjun Nah, Tae Hyun Kim, and Kyoung Mu Lee. Deep
[11] Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov,                         multi-scale convolutional neural network for dynamic scene
     Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner,                            deblurring. In Proceedings of the IEEE Conference on Com-
     Mostafa Dehghani, Matthias Minderer, Georg Heigold, Syl-                       puter Vision and Pattern Recognition, July 2017. 2
     vain Gelly, Jakob Uszkoreit, and Neil Houlsby. An image is                [25] Alejandro Newell, Kaiyu Yang, and Jia Deng. Stacked Hour-
     worth 16x16 words: Transformers for image recognition at                       glass Networks for Human Pose Estimation. In Bastian
     scale. In International Conference on Learning Representa-                     Leibe, Jiri Matas, Nicu Sebe, and Max Welling, editors, Pro-
     tions, 2021. 1, 2, 3, 5, 6, 7                                                  ceedings of the European Conference on Computer Vision,
                                                                            
       Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.


<!-- PK PAGE 10 doc=math_p7 -->
pages 483–499, Cham, 2016. Springer International Publish-                     Conference on Computer Vision and Pattern Recognition,
     ing. 2                                                                         2020. 2, 7
[26] Alejandro Newell, Kaiyu Yang, and Jia Deng. Stacked hour-                 [38] Wenhai Wang, Enze Xie, Xiang Li, Deng-Ping Fan, Kaitao
     glass networks for human pose estimation. In European con-                     Song, Ding Liang, Tong Lu, Ping Luo, and Ling Shao. Pyra-
     ference on computer vision, pages 483–499. Springer, 2016.                     mid vision transformer: A versatile backbone for dense pre-
     2                                                                              diction without convolutions, 2021. 1, 2, 6, 7
[27] Omkar M. Parkhi, Andrea Vedaldi, Andrew Zisserman, and                    [39] Xiaolong Wang, Ross Girshick, Abhinav Gupta, and Kaim-
     C. V. Jawahar. Cats and dogs. In IEEE Conference on Com-                       ing He. Non-local neural networks. In Proceedings of the
     puter Vision and Pattern Recognition, 2012. 7                                  IEEE conference on computer vision and pattern recogni-
[28] Marco Pedersoli, Andrea Vedaldi, Jordi Gonzalez, and                           tion, pages 7794–7803, 2018. 2
     Xavier Roca. A coarse-to-ﬁne approach for fast deformable                 [40] Xiaosong Wang, Yifan Peng, Le Lu, Zhiyong Lu, Mo-
     object detection. Pattern Recognition, 48(5):1844–1853,                        hammadhadi Bagheri, and Ronald M Summers. Chestx-
     2015. 2                                                                        ray8: Hospital-scale chest x-ray database and benchmarks on
[29] Pietro Perona and Jitendra Malik. Scale-space and edge de-                     weakly-supervised classiﬁcation and localization of common
     tection using anisotropic diffusion. IEEE Transactions on                      thorax diseases. In Proceedings of the IEEE conference on
     pattern analysis and machine intelligence, 12(7):629–639,                      computer vision and pattern recognition, pages 2097–2106,
     1990. 2                                                                        2017. 7
[30] Ilija Radosavovic, Raj Prateek Kosaraju, Ross Girshick,                   [41] Sanghyun Woo, Jongchan Park, Joon-Young Lee, and In So
     Kaiming He, and Piotr Dollar. Designing network design                         Kweon. Cbam: Convolutional block attention module. In
     spaces. In IEEE/CVF Conference on Computer Vision and                          Proceedings of the European Conference on Computer Vi-
     Pattern Recognition, June 2020. 7                                              sion, September 2018. 2
[31] Prajit Ramachandran, Niki Parmar, Ashish Vaswani, Irwan                   [42] Lemeng Wu, Xingchao Liu, and Qiang Liu. Centroid trans-
     Bello, Anselm Levskaya, and Jon Shlens. Stand-Alone Self-                      formers: Learning to abstract with attention. arXiv preprint
     Attention in Vision Models. In H Wallach, H Larochelle, A                      arXiv:2102.08606, 2021. 2, 7
     Beygelzimer, F d Alch e Buc, E Fox, and R Garnett, editors,               [43] Saining Xie, Ross Girshick, Piotr Dollár, Zhuowen Tu, and
     Advances in Neural Information Processing Systems. Curran                      Kaiming He. Aggregated Residual Transformations for Deep
     Associates, Inc., 2019. 1, 2                                                   Neural Networks. In The IEEE Conference on Computer
[32] Aravind Srinivas, Tsung-Yi Lin, Niki Parmar, Jonathon                          Vision and Pattern Recognition, July 2017. 7
     Shlens, Pieter Abbeel, and Ashish Vaswani.           Bottle-              [44] Songfan Yang and Deva Ramanan. Multi-scale recognition
     neck transformers for visual recognition. arXiv preprint                       with dag-cnns. In Proceedings of the IEEE international
     arXiv:2101.11605, 2021. 1, 2                                                   conference on computer vision, pages 1215–1223, 2015. 2
[33] C. Sun, A. Shrivastava, S. Singh, and A. Gupta. Revisiting
                                                                               [45] Li Yuan, Yunpeng Chen, Tao Wang, Weihao Yu, Yujun Shi,
     unreasonable effectiveness of data in deep learning era. In
                                                                                    Francis EH Tay, Jiashi Feng, and Shuicheng Yan. Tokens-
     2017 IEEE International Conference on Computer Vision,
                                                                                    to-token vit: Training vision transformers from scratch on
     pages 843–852, 2017. 1, 5
                                                                                    imagenet, 2021. 1, 2, 6, 7, 8
[34] Mingxing Tan and Quoc Le. EfﬁcientNet: Rethinking Model
                                                                               [46] Sangdoo Yun, Dongyoon Han, Seong Joon Oh, Sanghyuk
     Scaling for Convolutional Neural Networks. In Kamalika
                                                                                    Chun, Junsuk Choe, and Youngjoon Yoo. CutMix: Regu-
     Chaudhuri and Ruslan Salakhutdinov, editors, Proceedings
                                                                                    larization Strategy to Train Strong Classiﬁers With Localiz-
     of the 36th International Conference on Machine Learning,
                                                                                    able Features. In Proceedings of the IEEE/CVF International
     pages 6105–6114, Long Beach, California, USA, June 2019.
                                                                                    Conference on Computer Vision, Oct. 2019. 5
     PMLR. 1, 2, 5, 7
                                                                               [47] Hongyi Zhang, Moustapha Cisse, Yann N. Dauphin, and
[35] Hugo Touvron, Matthieu Cord, Matthijs Douze, Francisco
                                                                                    David Lopez-Paz. mixup: Beyond empirical risk minimiza-
     Massa, Alexandre Sablayrolles, and Herve Jegou. Train-
                                                                                    tion. In International Conference on Learning Representa-
     ing data-efﬁcient image transformers & distillation through
                                                                                    tions, 2018. 5
     attention. In Marina Meila and Tong Zhang, editors, Pro-
     ceedings of the 38th International Conference on Machine                  [48] Hengshuang Zhao, Jiaya Jia, and Vladlen Koltun. Explor-
     Learning, volume 139 of Proceedings of Machine Learning                        ing self-attention for image recognition. In Proceedings of
     Research, pages 10347–10357. PMLR, 18–24 Jul 2021. 1,                          the IEEE/CVF Conference on Computer Vision and Pattern
     2, 5, 6, 7                                                                     Recognition, June 2020. 1, 2
[36] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszko-                   [49] Zhun Zhong, Liang Zheng, Guoliang Kang, Shaozi Li,
     reit, Llion Jones, Aidan N Gomez, ukasz Kaiser, and Illia                      and Yi Yang. Random Erasing Data Augmentation. Pro-
     Polosukhin. Attention is All you Need. In I Guyon, U V                         ceedings of the AAAI Conference on Artiﬁcial Intelligence,
     Luxburg, S Bengio, H Wallach, R Fergus, S Vishwanathan,                        34(07):13001–13008, Apr. 2020. 5
     and R Garnett, editors, Advances in Neural Information Pro-               [50] Barret Zoph, Vijay Vasudevan, Jonathon Shlens, and Quoc V.
     cessing Systems. Curran Associates, Inc., 2017. 1, 2                           Le. Learning transferable architectures for scalable image
[37] Qilong Wang, Banggu Wu, Pengfei Zhu, Peihua Li, Wang-                          recognition. In Proceedings of the IEEE Conference on Com-
     meng Zuo, and Qinghua Hu. Eca-net: Efﬁcient channel at-                        puter Vision and Pattern Recognition, June 2018. 7
     tention for deep convolutional neural networks. In The IEEE
                                                                            
       Authorized licensed use limited to: Istanbul Universitesi. Downloaded on November 09,2022 at 09:17:41 UTC from IEEE Xplore. Restrictions apply.
<!-- PK END doc=math_p7 -->
