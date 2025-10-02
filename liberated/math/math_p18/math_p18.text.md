PKvNext Document

KEY: math_p18 | math |  | 95af8f9a | 11 | /papers/Lai_Font-Agent_Enhancing_Font_Understanding_with_Large_Language_Models_CVPR_2025_paper.pdf
<!-- PK START doc=math_p18 -->


<!-- PK PAGE 1 doc=math_p18 -->
This CVPR paper is the Open Access version, provided by the Computer Vision Foundation.
                                        Except for this watermark, it is identical to the accepted version;
                                  the final published version of the proceedings is available on IEEE Xplore.
      Font-Agent: Enhancing Font Understanding with Large Language Models
                                 Yingxin Lai1,2,† , Cuijie Xu2 , Haitian Shi2 , Guoqing Yang1 ,
                                       Xiaoning Li1 , Zhiming Luo1,3,∗ , Shaozi Li1,3
                     1
                      Department of Artificial Intelligence, Xiamen University, Xiamen, China.
                                                   2
                                                     Graph Origin.
                   3
                     Key Laboratory of Multimedia Trusted Perception and Efficient Computing,
                               Ministry of Education of China, Xiamen University.
                             Abstract
                                                                                                          Font Quality
                                                                                                           Evaluation
The rapid development of generative models has significantly
advanced font generation. However, limited exploration has
been devoted to the evaluation and interpretability of graph-
                                                                            Input      Can you evaluate the quality of this
ical fonts. Existing quality assessment models can only pro-                Text:      font and point out any flaws?
vide basic visual analyses, such as recognizing clarity and                 Input                                                               Font-Agent
                                                                            Image:
brightness, without in-depth explanations. To address these
limitations, we first constructed a large-scale multimodal               This font shows a hand-drawn uppercase letter E and the quality score is 2 ,which
                                                                         reflects the following issues:irregularity: The two legs of the letter are of uneven
dataset named the Diversity Font Dataset (DFD), compris-                 lengths, with the right leg noticeably longer than the left. This may cause a visual
ing 135,000 font-text pairs. This dataset encompasses a wide             imbalance.lack of detail...... structural asymmetry ...............
range of generated font types and annotations, including
                                                                     Figure 1. Comparative Visualization of Font Quality Assessment:
language descriptions and quality assessments, thus pro-
                                                                     Our Automated Framework vs. Expert Select Approaches.
viding a robust foundation for training and evaluating font
analysis models. Based on this dataset, we developed a font
agent built upon a Vision-Language Model (VLM) aiming
to enhance font quality assessment and offer interpretable           its substantial commercial and academic importance, espequestion-answering capabilities. Alongside the original vi-          cially in fields like advertising and social media. Traditional
sual encoder in VLM, we integrated an Edge-Aware Traces              font generation, which demands high precision, typically
(EAT) module to capture detailed edge information of font            relies on manual design processes. However, the emergence
strokes and components. Furthermore, we introduced a Dy-             of text-to-image generation models such as Midjourney [15],
namic Direct Preference Optimization (D-DPO) strategy to             which have become milestones in the digital art and crefacilitate efficient model fine-tuning. Experimental results         ative industries, has significantly impacted this field. This
demonstrate that Font-Agent achieves state-of-the-art per-           advancement enables the generation of personalized content,
formance on the established dataset. To further evaluate the         fosters immense creativity and innovation, and has led to a
generalization ability of our algorithm, we conducted addi-          gradual reduction in design costs [20, 35]. Meanwhile, there
tional experiments on several public datasets. The results           is a growing demand for analyzing the huge amount of fonts
highlight the notable advantage of Font-Agent in both as-            generated in terms of correctness and quality.
sessing the quality of generated fonts and comprehending                 For the font quality assessment task, various classification
their content.                                                       models [6, 14, 54] have been proposed to produce probability
                                                                     values that indicate whether an input image is of good qual-
                                                                     ity. Despite showing improvements in generalization, these
1. Introduction                                                      models cannot provide convincing explanations for their
                                                                     assessments. In contrast, certain studies [45, 68] have at-
                                                                     tempted to use multimodal large language models (MLLMs)
   Font design has attracted significant attention because of        for font evaluation. However, font evaluation requires sig-
∗ Corresponding Author: zhiming.luo@xmu.edu.cn                       nificant professional experience, an aspect not sufficiently
† This work was done during his internship at Graph Origin.          incorporated into the training of MLLMs for font assessment,
                                                               19670


<!-- PK PAGE 2 doc=math_p18 -->
leading to sub-par performance. Thus, building high-level            guages and styles, addressing real-world font evaluation
font quality assessment models still presents significant chal-      challenges.
lenges. Firstly, there is a lack of high-quality font assessment   • Multimodal Font Representation: We propose Fontdatasets containing both quality labels and corresponding            Agent, a method that leverages visual-language models
explanations. Secondly, there remains the challenge of effec-        with multimodal evaluation capabilities. By applying contively building feature representations between font images          volutional layers to the phase and amplitude spectra of font
and textual descriptions.                                            images, Font-Agent excels at assessing fine-grained font
    To facilitate research in this area, we first construct a        details for quality evaluation and font-related questionnew multilingual font evaluation dataset comprising 135,000          answering tasks.
manually annotated fonts across diverse languages and              • State-of-the-Art Performance: Font-Agent achieves leadstyles.This dataset is diverse, high-quality, and manually           ing performance in font quality assessment. Our analyses
generated, covering multiple model outputs and languages             demonstrate its effectiveness and generalization in font
such as English and Chinese. It includes detailed annotations,       evaluation.
such as quality labels, mean opinion scores (MOS), and semantic tags, all carefully labeled by experts to ensure quality    2. Related Work
generation. This makes the dataset a strong foundation for
future research in font generation and quality evaluation.         2.1. Recent Studies on Font Generation
    Building upon this dataset, we develop the Font-Agent,         Recently, various approaches have significantly advanced
a novel font understanding framework based on the Vision-          font generation. For example, transformer-based methods,
Language Model (VLM). The visual and textual encoders              such as DeepVecFont [62], enhance diversity but are limited
in the VLM first encode the font images and text questions         by a small set of glyphs. GAN-based methods, such as FUinto tokens. The decoder then generates the corresponding          NIT [34], achieve style transfer but often suffer quality issues
descriptions related to font quality assessments. Although         when generating complex fonts. Unsupervised approaches,
VLM provides rich cross-domain semantic representations            such as DG-Font [71], show promising visual results, but reof font images and textual queries, we found it still struggles    quire extensive data alignment. To capture local style details,
with understanding local curvature and stroke details essen-       methods such as LF-Font [42] and MX-Font [41] utilize font
tial for the semantic interpretation of font images. To address    component segmentation, while CF-Font [60] incorporates
this issue, we propose an Edge-Aware Traces (EAT) mod-             style vectors to improve consistency across fonts. The diffuule to capture detailed edge information. In our EAT module,       sion model FontDiffuser [70] introduces contrastive learning
we use a frequency-domain attention mechanism to enhance           to address complex font synthesis but requires extensive
visual features related to high-frequency components in the        pretraining. FS-Font [55] aligns the spatial correspondence
font image. Then, the output feature of the EAT module is          between content and style, but is highly sensitive to the qualfused with the visual features from the VLM. Furthermore,          ity of reference fonts. Despite significant progress in font
we introduce a Dynamic Direct Preference Optimization              generation, a key challenge remains: an effective evaluation
(D-DPO) strategy for training Font-Agent. D-DPO addresses          of font quality. Existing methods primarily focus on imkey limitations of traditional methods by optimizing dense,        proving generation quality, lacking robust and interpretable
fine-grained, segment-level preferences, ensuring that hallu-      frameworks for assessing fine-grained font quality, which
cinated segments receive stronger feedback and maintaining         is crucial for real-world applications requiring high visual
factual accuracy. Consequently, D-DPO not only improves            consistency and style accuracy.
the model’s learning efficiency but also mitigates the issue of
uniformly weighting all words, enhancing the model’s capa-          2.2. Image Quality Assesement
bility to distinguish relevant from irrelevant content. D-DPO      Image quality assessment (IQA) is a crucial task in comdynamically adjusts each character’s importance based on           puter vision that directly impacts the performance of image
uncertainty, consistency, and font features, ensuring stronger     generation systems. Common evaluation models, such as
feedback for high-quality characters while minimizing the          Xception [48], Meso4 [1], and EfficientNet-B4 [54], primarimpact of lower-quality ones. Finally, we conduct exper-           ily focus on evaluating overall image similarity or detectiments on our constructed DFD dataset and other widely             ing anomalies in natural images. However, with the rise of
used benchmark datasets to evaluate the effectiveness of our       multimodal text-image models, evaluation approaches have
proposed method.                                                   shifted towards measuring text-image similarity [46]. For
    This paper’s contributions are summarized as follows:          example, ImageReward [67] and PickScore [25] enhance
• Large-Scale Multilingual Font Dataset: We contrust a             robustness by fine-tuning vision-language models (VLM)
   high-quality multilingual font evaluation dataset compris-      using large datasets with human-annotated scores. Although
   ing 135,000 manually annotated fonts across diverse lan-        these methods perform well to assess natural image quality,
                                                               19671


<!-- PK PAGE 3 doc=math_p18 -->
Stepl: Data Collection            Step2: Data Filtering                 Step 3: Collecting Human Ratings         models such as GANs and Stable Diffusion. Specifically,we
                                Consistency        Normativity             Bad              Good                  employed most common font generation models—including
                                                   Redundant
                                  Clarity                                  Poor             Excellent             VQ-Font [72] , DG-Font [71], and diffusion-based models
   GAN/Diffusion/
                                  Criteria          Diversity              Fair
   Internet/Human                                                                                                 like FontDiffuser [70] and Diff-Font [12] to ensure sample
                                                  Step 4: Collecting Insturctions                                 diversity across our dataset.Similarly we have generated a
    DFD Bench                                     User Input:                                                     colorful logo design model Design, using 9 common models
                                   Can you evaluate the quality of this image?
                                                                                                                  including Diff-Text [76] , Anything to Glyph [59], WordArt
                              Mos Score             Description
                                                                                                  Manual          Designer [66], DS-Fusion [56], DynTypo [37], DynTexture
                            Font content                                                         Correction
                          Quality Description                        The quality is bad,…                         [44], SwapText [69], those cover most of the scenarios of
                             …………..
                                                                                                                  daily font design.
                                                                                                                  Quality Filtering: In this stage, we manually filter low-
         Figure 2. The collection process for DFD Benchmark.                                                      resolution fonts, structural errors, and unbalanced propor-
                                                                                                                  tions. We also removed fonts with similar styles and lan-
                                                                                                                  guage features to ensure diversity.After filtering, the dataset
they face significant challenges when applied to symbolic                                                         contains a total of 135,000 high-quality font samples suitable
graphics, particularly font images [39]. Current models often                                                     for quality evaluation tasks.
overlook fine-grained font details, such as stroke thickness,                                                     Semantic Labeling: In the semantic labeling process, a
character precision, and style consistency—critical elements                                                      team of 15 professional annotators, also experts in the font
in evaluating font-generated images. Moreover, as noted                                                           industry, meticulously labeled various aspects of the fonts.
in [45], large language models (LLMs) lack the ability to                                                         Each font was assigned a quality label (high, medium, or
comprehend local curvature and stroke details essential for                                                       low) and a Mean Opinion Score (MOS) ranging from 1 to
the semantic interpretation of font images. This limitation                                                       5. The annotations included the specific text displayed and
highlights the difficulty these models face in capturing nu-                                                      the font language, along with potential applications such as
anced visual characteristics of fonts, which differ structurally                                                  casual, business, educational, or artistic uses. The fonts were
and semantically from natural images.Therefore, designing                                                         categorized into styles such as serif, sans serif, handwritten,
specialized models for font evaluation is crucial. Unlike gen-                                                    and decorative. Justifications for the quality ratings were proeral IQA models, font evaluation requires detailed analyses                                                       vided, emphasizing readability, aesthetic appeal, technical
of local features, focusing on detail preservation, style consis-                                                 correctness, and suitability for intended use. To further refine
tency, and readability. Existing models, which mainly assess                                                      font feature descriptions, advanced models such as GPT-4o,
global image features, struggle with the unique challenges                                                        Gemini-Pro, and QwenVL were employed for automated
presented by fonts. A dedicated framework for font quality                                                        description generation, with manual corrections made to adassessment could effectively address these issues, offering                                                       dress inaccuracies. As a result, the DFD dataset includes
improved evaluation accuracy, and interpretability.                                                               42,362 pairs of English instruction-image samples derived
                                                                                                                  from 5,321 SVG files, 31,544 pairs of Chinese instruction3. Method                                                                                                         image samples from 3,609 SVG files, 27,690 character sam-
                                                                                                                  ples - including digits and geometric shapes from 5,139 SVG
3.1. DFD Benchmark                                                                                                files, and 33,404 font logo design instruction-image samples
                                                                                                                  from 39,812 SVG files. This comprehensive dataset provides
In this section, we introduce the DFD dataset for assessing                                                       a solid foundation for future research in font generation and
font quality, as shown in Fig. 2 . The dataset construction                                                       quality assessment. Regarding the composition of the dataset,
process, including collection, filtering and annotation.                                                          approximately 63% are English fonts (approximately 85,050
Font Data Collection: In this study, we collected font data                                                       samples), 26% are Chinese fonts (about 35,100 samples), and
from a variety of platforms to ensure diversity and com-                                                          11% are fonts in other languages (about 14,850 samples). In
pliance with licensing requirements. Data sources included                                                        terms of generation methods, 80% of the fonts are machine
international resources such as Google Fonts, Font Squirrel                                                       generated (approximately 108, 000 samples), while 20% are
, DaFont , and 1001 Free Fonts, as well as local Chinese-                                                         manually crafted (approximately 27,000 samples). The qualfocused platforms such as Fangzheng, Hanyi, and Zihun.                                                            ity level distribution is as follows: high quality (MOS 4-5)
To enhance data diversity, we collected approximately 63%                                                         includes 54,000 samples, accounting for 40% of the dataset;
English fonts, 26% Chinese fonts, and 11% other language                                                          medium quality (MOS 2-3) includes 67,500 samples, acfonts. English fonts generally feature simpler stroke struc-                                                      counting for 50%; and low quality (MOS 1) includes 13,500
tures, whereas Chinese fonts exhibit more complex compo-                                                          samples, accounting for 10%.
sitions, which highlights the structural diversity inherent in
font design. In terms of data composition, about 20% of the
fonts were manually created, while 80% was generated using
                                                                                                              19672


<!-- PK PAGE 4 doc=math_p18 -->
Visual Token               Text Token           Trainable          Frozen                        Text-Image Alignment
                                                                                                   Briefly describe the font and
            Dynamic Direct                                                                       analyze the quality of the image.
                                                                                                                                                                                                                                                               Edge Aware Traces
        Preference Optimization
                                                                                                                 Text                          Image
     Model at Iteration t                       Character Evaluation                                                                                                                                                             Input Image                                            Sampled Points
                                                                                                                Encoder                       Encoder
                                                                                                                                                                                                                                                                                                                                                   Feature Map
                   Sample K Responses
                                              Value                                                                                                                                                                                                                     FPS                                                          CNN
         A:The image quality is
              ，
        low the mos score is 1                                                     Dynamic
                                                                                                                    Large Language Model
                                                                                                                                                                        Edge Aware
                                                      Answer
                                                                                    Direct                                                                                Traces
                                                                                  Preference
   Self-Consistency Voting
                                                                                                                                                                                                                                                                                                                                                         FFT
                                                                                 Optimization
                                              Rejected        Chosen
                                                                                                                                                                          Cross
     High/Low Quality                             Weight
                                                                                                                  Projection Layer                                       Attention                                                              IFFT                                   CDC                          Magnitude
     Answer Examples                             Adjustment                                                                                                                                                                                                                                                         Spectrum
                                                                                                                                      Cultural Context
    A A:The image quality is                                                                                                Content
                                                                                                                                          Quality
      high   ，the mos score is 5                                                                                                  Usage                                                                                                                                                                                                             Frequency
                                                                Final
   A* A*:The image quality is
                                                               Output                                                                                                                                                           Output                                                                                                               Domain
          ，
       low the mos score is 1                                                                                                                                                                                                                                                          CDC                               Phase
                                                                                                            This image shows a hand-drawn uppercase letter N and the quality                                                                                                                                            Spectrum
                                                                                                          score is 1, the image quality is low. Which reflects the following issues...
                                                                          Figure 3. Multi-Modal Font network (Font-Agent) architecture.
3.2. Proposed Font-Agent                                                                                                                      the shape of the glyph and reduce computational complexity,
                                                                                                                                              we apply Farthest Point Sampling (FPS) to select a subMulti Model Representation. We introduce Font-Agent, a
$$
                                                                                                                                              set  S = \{ p_0, p_1, \dots , p_{N-1} \}  as representative points. Using
$$
multi-modal font evaluation method based on the fine-tuned
Qwen-VL model [2]. Given an input image X, the font                                                                                           these sampled points, we construct a saliency map  W(x, y) ,
$$
image is processed through a visual encoder EV to extract                                                                                     by setting  W(x_k, y_k) = 1  for each point  p_k \in S . Then,
$$
visual representation tokens Fv :                                                                                                             we apply a Gaussian filter to smooth the map, highlighting
                                                                                                                                              the significant regions of the glyph. Next, we pass the input
$$
                               F_v = \{ n_1, n_2, \dots , n_N \} \in \mathbb {R}^{n \times D} \tag {1}                        (1)             glyph image  X  through a Convolutional Neural Network
$$
$$
                                                                                                                                              (CNN) to obtain the feature map  F(x, y) = \text {CNN}(X) .
$$
Where D is the dimensionality of each token,these tokens                                                                                         We then transform both the feature map and the saliency
capture rich semantic information and demonstrate strong                                                                                      map into the frequency domain using the Fast Fourier Transgeneralization for font recognition tasks. A text instruction t                                                                               form(FFT):
is sampled from a predefined template Q to guide the LLM
in font recognition, represented by text tokens Ft :
$$
                                                                                                                                                F(u, v) = \mathcal {FFT}\{F(x, y)\},\quad W(u, v) = \mathcal {FFT}\{W(x, y)\}
$$
$$
                           F_t = \{ m_1, m_2, \dots , m_M \} \in \mathbb {R}^{m \times D} \tag {2}                            (2)                                                                                        (1)
$$
                                                                                                                                              where (u, v) represents the frequency indices. To emphasize
This instruction helps the pretrained model Mt understand                                                                                     the frequency components corresponding to the important
the visual content Fv and extract relevant features, lever-                                                                                   spatial regions, we define an adaptive weighting function:
aging the capabilities of Qwen-VL [2]. Our method differs
$$
from previous work by integrating both visual and textual en-                                                                                                         H(u, v) = 1 + \gamma \cdot \frac {|W(u, v)|}{\max _{u,v} |W(u, v)|}                                                                                                                      (2)
$$
coders, rather than relying solely on the visual encoder. The
multimodal representation FT is first obtained by combining                                                                                   where γ is a scaling factor controlling the emphasis strength.
both Fv and Ft . Then, the final multimodal representation                                                                                    We enhance the frequency domain feature map by elementfor font analysis is computed by first projecting FT through                                                                                  wise multiplication Fweighted ,then, we apply the inverse
a linear layer proj and subsequently concatenating the result                                                                                 Fourier transform(IFFT) to convert it back to the spatial
with Fv .                                                                                                                                     domain, obtaining the enhanced feature map:
$$
                                                                                                                                                                            \begin {aligned} F_{\text {weighted}}(u, v) = F(u, v) \cdot H(u, v) \\ F_{\text {enhanced}}(x, y) = \mathcal {F}^{-1}\{F_{\text {weighted}}(u, v)\}. \end {aligned}
$$
$$
      F = \text {Cat}\left ( [ \text {proj}(F_T), \text {proj}(F_v)] \right ),F_T = E_L(t, F_v) \tag {3}                      (3)                                                                                                                                                                                                                              (3)
$$
                                                                                                                                              To further capture fine details crucial for distinguishing subEdge Aware Traces.Capturing the fine geometric details                                                                                        tle font differences, we enhance the high-frequency compoof glyphs is crucial for font recognition and quality as-                                                                                     nents. We apply a high-pass filter:
sessment. We extract control points and points along the
Bézier curves defined by each glyph, forming a set of points
$$
 P = \{ p_i \in \mathbb {R}^2 \mid i = 1, 2, \dots , M \} . To efficiently represent                                                                                H_{\text {high}}(u, v) = 1 - \exp \left (-\frac {u^2 + v^2}{2 \sigma ^2}\right ).                                                                                                          (4)
$$
                                                                                                                                   19673


<!-- PK PAGE 5 doc=math_p18 -->
In order to isolate high-frequency features, where σ controls                                                                                                                                                                               probability of character yi given the input x and previous
the bandwidth of the filter. The filtered frequency compo-                                                                                                                                                                                  characters y<i , and N is a normalization factor to ensure
nents are:                                                                                                                                                                                                                                  appropriate weight normalization. The adaptive weight func-
                                                                                                                                                                                                                                            tion w(yi ) is defined as:
$$
                              F_{\text {high}}(u, v) = F(u, v) \cdot H_{\text {high}}(u, v)                                                                                                                                          (5)
$$
We extract the magnitude and phase:
$$
                                                                                                                                                                                                                                                 w(y_i) = \left ( \frac {k}{V(y_i)} \right ) \times \begin {cases} \epsilon , & \text {if } Q(y_i) \geq \theta _{\text {high}}, \\ & C(y_i) \geq \theta _{\text {consistent}}, \\ & F(y_i) \geq \theta _{\text {font}}; \\ \alpha , & \text {otherwise}. \end {cases}    (11)
$$
$$
    \gamma (u, v) = |F_{\text {high}}(u, v)|, \quad \phi (u, v) = \arg \{ F_{\text {high}}(u, v) \}.
$$
                                                                                                     (6)
Then, apply convolution to enhance them:                                                                                                                                                                                                   where V (yi ) is the self-consistency voting count for
                                                                                                                                                                                                                                           character yi , counting the occurrences of position i
                                                                                                                                                                                                                                           in the k candidate outputs {ŷ 1 , ŷ 2 , . . . , ŷ k }. Thresholds
$$
                \gamma _{\text {cdc}} = Conv_{\text {cdc}}(\gamma ), \quad \phi _{\text {cdc}} = Conv_{\text {conv}}(\phi ),                                                                                                         (7)   θhigh , θconsistent , θfont define high-quality characters based on
$$
where Convcdc denotes the Central Difference Convolutional                                                                                                                                                                                 uncertainty, contextual consistency, and font features. The
(CDC) operator [75]. We adopt CDC to integrate local details                                                                                                                                                                               bias parameter ϵ > 1 amplifies the influence of high-quality
into MLLMs and to explore fine-grained difference informa-                                                                                                                                                                                 characters, and α is a small positive number (typically
tion from neighboring pixels. We reconstruct the enhanced                                                                                                                                                                                  0 < α < 1) used to reduce the weight of low-quality characfrequency components Fenhanced (u, v) and transform them                                                                                                                                                                                   ters. The normalization factor N is defined as:
back to the spatial domain:
$$
                                                                                                                                                                                                                                                                                                           N = \epsilon \sum _{y_i \in y_h} \frac {k}{V(y_i)} + \sum _{y_i \in y_l} w(y_i),                                                                                                                              (12)
$$
$$
                      \begin {aligned} F_{\text {enhanced}}(u, v) &= \gamma _{\text {cdc}}(u, v) \cdot e^{i \phi _{\text {cdc}}(u, v)} \\ F_{\text {high-enhanced}}(x, y) &=IFFT\{ F_{\text {enhanced}}(u, v) \}. \end {aligned}
$$
                                                                                                                                                                                                                                     (8)   where yh is the set of high-quality characters satisfying
$$
                                                                                                                                                                                                                                           Q(yi ) ≥ θhigh , C(yi ) ≥ θconsistent , F (yi ) ≥ θfont , and yl
$$
                                                                                                                                                                                                                                           is the remaining set of characters that do not meet the highWe further modulate the enhanced features using the saliency
                                                                                                                                                                                                                                           quality standards. To evaluate font quality using adaptive
map to emphasize important regions:
                                                                                                                                                                                                                                           weights, we define:
$$
        F_{\text {final}}(x, y) = F_{\text {enhanced}}(x, y) \cdot \left (1 + \alpha \cdot W(x, y)\right ) ,                                                                                                                         (9)
$$
$$
where α is a modulation parameter controlling the influence                                                                                                                                                                                                  R_w = \frac {1}{N_w} \sum _{y_i \in y_w} w(y_i) \log \frac {p^*(y_i \mid x, y_{<i})}{p_{\text {ref}}(y_i \mid x, y_{<i})},                                                                                                                                  (13)
$$
of the saliency map W (x, y). This integrated method enables
$$
our model to focus on both critical spatial regions and highfrequency components, effectively capturing the fine details                                                                                                                                                                                                                      R_l = \frac {1}{N_l} \sum _{y_i \in y_l} w(y_i) \log \frac {p^*(y_i \mid x, y_{<i})}{p_{\text {ref}}(y_i \mid x, y_{<i})},                                                                                                             (14)
$$
of glyphs and improving performance in font recognition
and quality assessment tasks.The combination of Ffinal and
                                                                                                                                                                                                                                           where p∗ (yi | x, y<i ) is the probability under the optimized
F is achieved using cross-attention, as referenced in [78].
                                                                                                                                                                                                                                           strategy, pref (yi | x, y<i ) is the probability under the referD-DPO. We propose a novel dynamic adaptive preference
                                                                                                                                                                                                                                           ence strategy, and Nw , Nl are normalization factors. The
optimization method for font quality assessment, which
                                                                                                                                                                                                                                           loss function Lddpo is defined as:
fully considers the unique characteristics of fonts to achieve
fine-grained quality control. Unlike traditional methods that
$$
rely solely on log probabilities, we introduce an adaptive                                                                                                                                                                                              L_{\text {ddpo}} = -E(x, y_w, y_l) \left [ \log \sigma (\beta (R_w - R_l)) \right ],                                                                                                                                                                             (15)
$$
weighting strategy based on character uncertainty Q(yi ),
contextual consistency C(yi ), glyph features F (yi ), and self-                                                                                                                                                                           where σ is the sigmoid function, and β is a scaling paramconsistency voting V (yi ). This strategy dynamically adjusts                                                                                                                                                                              eter. Our method improves sensitivity to subtle variations
the weight of each character in the quality assessment, prior-                                                                                                                                                                             that affect readability and appearance by focusing on the
itizing characters with high self-consistency and high font                                                                                                                                                                                basic shapes of the font. The self-consistency voting V (yi )
quality while reducing the impact of low quality characters.                                                                                                                                                                               leverages the model’s own predictions to improve reliability
Our log probability computation formula is:                                                                                                                                                                                                without adding extra computational cost.
                                                                                                                                                                                                                                           4. Experiments
$$
         \log \pi (y \mid x) = \frac {1}{N} \sum _{y_i \in y} w(y_i) \log p(y_i \mid x, y_{<i}),                                                                                                                                    (10)
$$
                                                                                                                                                                                                                                           4.1. Datasets and Metrics.
where y is the font character sequence to be evaluated, x                                                                                                                                                                                   Datasets. To validate the effectiveness of Font-Agent, we
represents the input data or context, p(yi | x, y<i ) is the                                                                                                                                                                                conduct extensive experiments on multiple datasets. For
                                                                                                                                                                                                                                       19674


<!-- PK PAGE 6 doc=math_p18 -->
DFD-UN                  DFD-CN                 DFD-NUM                     Avg.
 Method         Detector         Backbone
                                               ACC (%) AUC (%)         ACC (%) AUC (%)         ACC (%)     AUC (%)      ACC (%) AUC (%)
  Naive        Meso4 [1]         MesoNet          76.3       74.5         77.2       75.3         76.8       74.9          76.8        74.9
  Naive      MesoIncep [1]       MesoNet          78.5       76.7         78.4       73.8         78.3       76.1          78.4       75.53
  Naive      CNN-Aug [13]         ResNet          82.6       78.2         78.2       79.5         79.8       77.4          79.7        78.3
  Naive      Xception [48]       Xception         89.3       87.9         84.9       88.4         85.6       85.8          87.9        86.0
  Naive     EfficientB4 [54]    EfficientNet      86.5       84.7         84.7       85.6         86.3       84.2          85.8        84.8
  LLM       LLaVA-v1.6 [33]      Vicuna7B         63.2       60.5         60.5       60.5         63.1       60.9          62.6       60.6
  LLM      mPLUG-Owl2 [73]     LLaMA-2 7B         73.2       71.5         71.5       74.2         73.6       71.8          72.8       72.5
  LLM        InternVL2 [4]     LLaMA2 7B          71.5       69.3         69.3       72.4         71.8       69.6          70.5       70.8
  LLM         GPT-4o [40]             -           62.1       58.3         61.4       63.7         64.0       59.6          62.5       60.5
  LLM         BLIP2 [30]          OPT 7B          75.1       73.8         73.8       74.6         75.0       73.5          74.6       74.3
  Ours              -                 -        93.9(↑4.6) 96.8(↑8.9)   94.5(↑9.6) 91.8(↑3.4)   93.1(↑6.8) 96.7(↑10.9)   93.8(↑5.9) 95.1(↑9.1)
Table 1. Visual reasoning performance on the DFD dataset, evaluating the ability to understand and reason about English (DFD-UN), Chinese
(DFD-CN), and numeric characters (DFD-NUM). The top model is marked in red, the second in blue, and improvements in green.
font quality assessment,we utilize our self-built DFD dataset             2 [8], Co-Instruct [65], and Compare2Score [65]; (4) Comalong with six widely used public datasets: LIVE [49], CSIQ               monly used text recognition models, including NIMA [53],
[26], KADID-10k [31], BID [7], CLIVE [10], and KonIQ-                     MLSP [11], MUSIQ [23], MaxViT [57], CLIP-IQA+ [61],
10k [16]. For the font recognition task , we evaluate Font-               Aesthetic Predictor [17], LIQE [77], VILA [24], and QAgent on 12 common font recognition datasets: Regular                     Align [64]. In this section, we follow the approach employed
benchmarks (IIIT5k [38], SVT [52], IC13 [21]), Irregular                  in Q-Align [64]. For methods not specifically designed for
Benchmarks (IC15 [22], SVTP [43], CUTE80 [47]), COCO                      quality assessment, we retrain them either by mapping the
Text (COCO) [58], CTW [36], Total Text (TT) [5], OST ex-                  quality labels of the data to binary values (0 and 1) or by
cluded benchmarks (HOST and WOST) [63], and the artistic                  using our font-text pairs. All methods are trained under our
benchmark WordArt [66], and the DFD dataset.                              proposed protocols. We adopt the hyperparameters described
Metrics. For the evaluation metrics, we employ Accuracy                   in the corresponding papers or optimally select improved
(ACC) and Area Under the Curve (AUC) as the primary                       ones when necessary.
measures to assess the model’s ability to distinguish be-                 Protocol 1: Traditional Classification Models. We evaltween high-quality and low-quality fonts. Additionally, we                uated various classification models in cross-language sceuse Spearman’s Rank Correlation Coefficient (SRCC) and                    narios using datasets designed to discriminate font quality.
Pearson’s Linear Correlation Coefficient (PLCC) to evaluate               Annotated image quality labels were employed for classificathe correlation between predicted scores and ground-truth                 tion label mapping and retraining. Our Font-Agent method
rankings in font quality assessment. We also measure font                 achieved the best performance in font quality classification.
recognition performance using Word Accuracy.                              As shown in Table 1, compared to the top-ranking XcepImplementation Details. To train our multimodal font qual-                tion [6] method, Font-Agent exhibits an average improveity assessment model, we followed the Qwen-VL [2] strategy.               ment of over 5% in both ACC and AUC on the DFD dataset.
We utilized the AdamW optimizer with a weight decay of                    Performance enhancement is even more significant when
0.01, a cosine learning rate scheduler, and no warm-up phase.             compared to widely used multimodal large models, such as
The first training phase lasted 15 epochs with a batch size               GPT-4o [40] and BLIP2 [29]. These results indicate Fontof 16 and an initial learning rate of 1 \times 10^{-4} . In the sec-      Agent’s effectiveness in overcoming unreliability and ineffiond phase, the learning rate was reduced to 4 \times 10^{-6} for          ciency issues in font recognition tasks.
an additional 8 epochs, while the batch size remained at 16.              Protocol 2: Multimodal Large Model Methods.We further
Training was conducted on four NVIDIA A100 80GB GPUs.                     evaluated common multimodal large models in font quality
Further details are provided in the Appendix.                             assessment. Since traditional methods lack domain-specific
                                                                          knowledge regarding “high” and “low” font quality, directly
4.2. Evaluation of Font Quality and Recognition                           applying them for comparison is meaningless. Therefore,
     Performance                                                          we provided our annotated font-text pairs as inputs to these
We compare our method with four categories of font quality                methods across the datasets. As shown in Table 1 and Taassessment methods: (1) Traditional classification meth-                  ble 3, despite significant domain shifts from natural images
ods, including Meso4 [1], CNN-Aug [13], Xception [48],                    to graphical images, which typically pose substantial chaland EfficientNet-B4 [54]; (2) Multimodal large model                      lenges to most multimodal large models during domain adapmethods, such as LLaVA-v1.6 [33], mPLUG-Owl2 [73],                        tation, our proposed Font-Agent still achieves the best perforInternVL2 [4], GPT-4o [40], and BLIP2 [30]; (3) Quality as-               mance (see Table 3). This result highlights the effectiveness
sessment models, including IDEFICS [18], XComposer-VL-                    of our method in extracting detailed graphic features.
                                                                   19675


<!-- PK PAGE 7 doc=math_p18 -->
Protocol 3: Image Quality Assessment Models.As shown                                  Method               LIVE    CSIQ    KADID-10k   BID     CLIVE   KonIQ-10k
in Table 1, our Font-Agent outperforms other algorithms                               IDEFICS [18]         0.125   0.669     0.500     0.523   0.146     0.727
in the three cross-language testing scenarios. An interest-                           LLaVA-1.5 [32]       0.170   0.544     0.600     0.579   0.074     0.455
                                                                                      mPLUG-Owl2 [74]      0.484   0.394     0.302     0.613   0.407     0.273
ing observation is that VILA [24] and Q-Align [64] are                                XComposer-VL-2 [8]   0.045   0.662     0.672     0.648   0.067     0.059
currently the most advanced image understanding models,                               Co-Instruct [65]     0.672   0.426     0.391     0.695   0.718     0.849
and Q-Align [64] is specifically designed for image quality                           Compare2Score [65]   0.849   0.720     0.870     0.861   0.788     0.858
assessment. However, under the premise of graphical font                              Ours                 0.873   0.741     0.885     0.839   0.807     0.873
input, they did not consider the issues of modality imbalance and unreliability brought about by font graphicalization.                    Table 3. Performance comparison in terms of prediction accuracy
Specifically, some details may be ignored or distorted during                     on six most common Image Quality Assessment datasets. The best
the graphicalization process, affecting the accuracy and con-                     results are highlighted in boldface.
sistency of the assessment. This leads to differences of over
3% in average SRCC and PLCC compared to our method,
further highlighting the effectiveness of our proposed EAT                        widths to analyze performance differences between using
and D-DPO in improving precise control over details.                              Qwen-VL combined with EAT and using Qwen-VL alone.
Protocol 4: Font Recognition Models.Compared to Proto-                            As shown in Table 5, methods equipped with additional
col 1, the multi-font input exacerbates the impact of complex                     frequency-domain detail extraction exhibit a clear perforstrokes, causing the models to underperform in font recog-                        mance improvement over the basic multimodal backbone
nition tasks. However, in this sub-protocol comparison, we                        network. This improvement is especially pronounced withobserve that our method still achieves the best performance                       out the inclusion of other sampling methods. Furthermore,
across various evaluation metrics, even when tested on mul-                       as illustrated in Fig. 4, when integrating our proposed FPS
tiple public font recognition datasets under diverse and com-                     sampling method, the enhancement in detail extraction sigplex conditions (see Table 4). This highlights the advantages                     nificantly surpasses that achieved with Random Sampling
of our proposed multimodal model architecture, particularly                       and KNN methods. These results demonstrate the effectivefor font recognition tasks. Specifically, while existing multi-                   ness and general applicability of EAT for existing quality
modal large models encounter significant challenges in font                       assessment and multimodal strategies.
recognition and quality assessment, our model substantially                       Impact of the D-DPO. Here, our aim is to answer two quesimproves recognition capabilities by effectively capturing                        tions: (1) Is solving the font understanding problem through
detailed font features, demonstrating robust adaptability, es-                    D-DPO more appropriate compared to existing Direct Prefpecially in “complex graphical deployment environments.”                          erence Optimization (DPO) methods ? (2) Is our D-DPO
                                                                                  more capable of enhancing the performance of complex mul-
$$
 Training Set: DFDtrain                         →Testing Set:      DFDtest        timodal fusion frameworks like Qwen-VL+EAT compared
$$
 Method                            #Training    Extra Data?     SRCC PLCC         to existing multimodal methods? From Table 5 , we can
 NIMA (TIP 2018) [53]              125K (92%)        ✗          0.608 0.632       observe that when Qwen-VL+EAT is used as the backbone
 MLSP (CVPR 2019) [11]             125K (92%)        ✗          0.650 0.655
                                                                                  network, our D-DPO surpasses existing large model methods
 MUSIQ (ICCV 2021) [23]            125K (92%)        ✗          0.720 0.735
 MaxViT (ECCV 2022) [57]           125K (92%)        ✗          0.705 0.740
                                                                                  and traditional classification methods. Even for the vanilla
 CLIP-IQA+ (AAAI 2023) [61]        125K (92%)        ✗          0.715 0.718       Qwen-VL, our D-DPO can enhance its performance. This
 Aesthetic Predictor (2023) [17]   125K (92%)        ✗          0.718 0.720       indicates the effectiveness of addressing the font quality
 LIQE (CVPR 2023) [77]             125K (92%)        ✗          0.770 0.760       assessment problem in complex scenarios by focusing on
 VILA (CVPR 2023) [24]             125K (92%)        ✓          0.772 0.770       potential errors. The results in Fig.4 also indicate that, com-
 Q-Align (ICML 2024) [64]          125K (92%)        ✗          0.785 0.815
                                                                                  pared to existing state-of-the-art fine-tuning methods (such
 Ours                              125K (92%)        ✗          0.830 0.823
                                                                                  as DPDP, IPO and TDPO), our D-DPO is more suitable
Table 2. F ONT-AGENT performance on font quality assessment                       for Qwen-VL+EAT, although these three variants modulate
(DFD). All methods are trained using the CUSTOM split setting of                  during modality gradient conflicts and feature fusion, respecour self-established dataset.                                                     tively. Although these two variants improve performance
                                                                                  compared to not fine-tuning at all, their performance is in-
                                                                                  ferior in all cases to that of D-DPO, which modulates in all
4.3. Ablation Study and Discussion                                                situations. This validates the necessity of adaptive modulaEffectiveness of Edge Aware Traces. To validate the effec-                        tion in different scenarios.In Fig. 5, we show the accuracy
tiveness of the proposed EAT module, we compare the net-                          rates and hallucination counts for models with different pawork’s performance before and after removing the module.                          rameter sizes, using varying amounts of feedback data. On
Additionally, we integrate EAT into the backbone of various                       the DFD dataset, as feedback data increases, Font-Agent’s
font-point sampling methods (i.e., Random Sampling, KNN                           hallucination rate and number of hallucinated segments deSampling, and FPS Sampling) and test different filter band-                       crease rapidly. This shows that detailed corrective feedback
                                                                              19676


<!-- PK PAGE 8 doc=math_p18 -->
Regular                                                                   Irregular                                     Occluded                 Others         DFD
                          Method                           Venue                   IIIT                             SVT              IC13           IC15           SVTP            CT80     COCO        CTW           TT       HOST         WOST          WordArt             -           AVG
                                                                                   3000                             647              1015           2077            645             288      9896       1572         2201      2416         2416           1511               -
                  ASTER [51]                              PAMI’18                 95.03                             89.49            93.79          85.48          82.02           90.28     62.25      76.53        78.69     43.34         64.65           65.59         56.34       75.65
                   NRTR [50]                             ICDAR’19                 97.43                             93.82            96.06          85.15          84.03           91.32     65.94      81.74        81.83     50.83         71.52           64.06         61.03       78.82
                   SAR [28]                               AAAI’19                 97.70                             94.13            96.35          87.47          87.60           93.06     67.41      83.91        86.23     46.36         70.32           72.40         55.96       79.91
                  SATRN [27]                              AAAI’20                 97.83                             95.83            97.44          89.46          90.85           96.18     73.06      84.61        87.91     56.71         75.62           75.71         68.05       83.78
                   ABINet [9]                             CVPR’21                 97.90                             95.98            96.16          91.66          90.23           93.75     71.46      83.72        86.01     56.54         75.75           75.25         71.54       83.53
                  PARSeq* [3]                             ECCV’22                 99.10                             97.84            98.13          89.22          96.90           98.61       -          -            -         -             -               -           73.63         -
                  MAERec [19]                             ICCV’23                 98.93                             97.99            98.62          93.04          94.57           98.96     78.84      88.87        93.91     73.97         85.72           82.59         77.08       89.46
                  E2 STR [78]                             CVPR’24                 99.10                             98.15            98.03          92.99          96.43           98.96     77.29      88.36        93.46     73.30         85.51           81.47         76.67       89.20
                              Ours                                 -              99.42                             98.71            99.14          94.06          97.85           99.59     78.60      91.36        96.83     76.54         87.70           84.49         83.57       91.32
     Table 4. Performance comparison of font recognition models on a comprehensive benchmark based on the E2 STR [78] framework. Red and
     Blue indicate the best and second-best performances, respectively.
                                                                DFD-UN                                                DFD-CN                           DFD-NUM
              Method
                                                         ACC (%)         AUC (%)              ACC (%)                          AUC (%)          ACC (%)            AUC (%)                                                    Sorry, I can't evaluate images directly.
              Pre-trained MLLM                             57.5             60.3                           60.4                      58.7            59.2             58.1                                                                                                          LLaVA-Next
              Instructed-MLLM                              79.4             81.2                           79.6                      80.4            80.7             77.8                                              The font appears to be stylized or handwritten.
              EAT only                                     83.5             84.2                           84.0                      85.0            83.8             84.5                                              However, the blurriness may affect readability,especially
              D-DPO only                                   86.4             86.6                           86.2                      86.1            86.5             86.3                                              if viewed from a distance or in smaller sizes....            O1
              Ours                                         93.6             96.8                           94.5                      91.8            93.1             96.7
                                                                                                                                                                                            Can you evaluate the       This picture shows the letters "KFC" made from chicken
                                                                                                                                                                                            quality of this image?     nuggets.......It's very creative and funny, with a simple
     Table 5. Ablation study evaluating the effectiveness of each pro-                                                                                                                                                 design........which has a quality assessment score of 4..... Font-Agent
     posed module. The results demonstrate incremental improvements
     contributed by each component.                                                                                                                                                            Figure 6. Qualitative results of the font quality assessment.
     helps align the behavior of multi-modal large language mod-
     els (MLLMs) effectively.                                                                                                                                                              the DFD dataset, more feedback data significantly reduce
                                                                                                                                                                                           Font-Agent’s hallucination rate and segments, proving that
                  100                                                                                                                                                                      detailed human feedback effectively aligns MLLM behavior.
                                                                         Random Selection                0.9                                                               SRCC
                                                                         kNN Selection                                                                                     PLCC
                   90                                                    FPS Selection                                                                                                     Fig. 6 highlights the superior font understanding of Font-
                                                                                                         0.8
                   80
Word Accuracy
                                                                                                         0.7
                                                                                                                                                                                           Agent compared to existing models. This work advances
                                                                                             Scores
                   70
                   60                                                                                    0.6                                                                               practical font recognition and quality assessment. However,
                   50                                                                                    0.5                                                                               Font-Agent performance can improve with ongoing bench-
                   40          HOST                      WOST                   DFD                      0.4                                                                               mark efforts. We expect more feedback data to further boost
                                                                                                                           O
                                                                                                                                      OP
                                                                                                                                              IPO
                                                                                                                                                            PO
                                                                                                                                                                        PO
                                                                                                                                                                                           performance and drive future research.
                                                                                                                       DP
                                                                                                                                     DP
                                                                                                                                                        TD
                                                                                                                                                                      DD
     Figure 4. Qualitative results of the font quality assessment with
     different point selection and different dpo method.
                                                                                                                                                                                           5. Conclusion
                                                                                                               94
                                                                                                                                                                          93.8%
                                                                                Accuracy
                                                                                AUC
                                                                                                               92
                                                                                                                                                                      89.7%
                                                                                                                                                                                           Hallucination continues to be a major obstacle to the prac-
                                                                                                               90
                  95                 93.895.1                                                                                                               87.5%
                                                                                92.2
                                                                                                               88
                                                                                                               86                            84.5%                                         tical implementation of MLLMs. To address this issue, we
                                                                                                               84
                  90                                                                                                                                                      84.5%
                                                                                             Performance (%)
                                                                    89.5 88.4                                                                                                              propose Font-Agent, an innovative framework specifically
Performance (%)
                                                                                  87.289.1                     82
                                                                                                                            78.5%                                     81.6%
                                                       87.4 85.5                                               80
                  85                                                                                           78                                           79.2%
                                                82.1                                                           76
                                                                                                               74
                                                                                                                    75.3%
                                                                                                                                             76.5%                                         developed to enhance the reliability and interpretability of
                                   81.4                                                                        72
                  80
                         79.3                                                                                  70
                                                                                                                            72.5%                                                          font-quality evaluation and recognition across multiple lan-
                            75.9                                                                               68
                  75
                  72.5
                                                                                                               66
                                                                                                               64                                                  Qwen2-VL_7B             guages. By incorporating fine-grained human feedback, our
                                                                                                               62   63.0%                                          Qwen2-VL_2B
                  70
                        0.1    0.3        0.5      0.7
                                                Filter Bandwidth
                                                                   1.0      1.3        1.5
                                                                                                               60
                                                                                                                     10k       30k            60k            90k       110k 120k           model is closely aligned with user expectations, substan-
                                                                                                                                 Number of Samples (in Thousands)
                                                                                                                                                                                           tially reducing errors in long-form font evaluations while
     Figure 5. Comparison between different filter bandwidth strategies                                                                                                                    maintaining both accuracy and usefulness. Experimental
     and scaling effects of annotation quality for quality assessments                                                                                                                     results indicate that Font-Agent consistently surpasses exist-
     performance on DFD.                                                                                                                                                                   ing models in terms of both reliability and cross-language
                                                                                                                                                                                           recognition. Future research will focus on systematically
     Discussion. Fig. 5 shows accuracy and hallucination rates                                                                                                                             expanding dataset coverage and developing robust validation
     for models with varying parameters and feedback data. On                                                                                                                              protocols across a variety of practical application domains.
                                                                                                                                                                                   19677


<!-- PK PAGE 9 doc=math_p18 -->
6. Acknowledgment                                                       [11] Franz Götz-Hahn, Vlad Hosu, Hanhe Lin, and Dietmar Saupe.
                                                                             Konvid-150k: A dataset for no-reference video quality assessThis work is supported by the National Natural Science                       ment of videos in-the-wild. In IEEE Access 9. IEEE, 2021. 6,
Foundation of China (No. 62276221, No. 62376232), the                        7
Fujian Provincial Natural Science Foundation of China                   [12] Haibin He, Xinyuan Chen, Chaoyue Wang, Juhua Liu, Bo
(No. 2022J01002).                                                            Du, Dacheng Tao, and Qiao Yu. Diff-font: Diffusion model
                                                                             for robust one-shot font generation. International Journal of
References                                                                   Computer Vision, pages 1–15, 2024. 3
                                                                        [13] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun.
 [1] Darius Afchar, Vincent Nozick, Junichi Yamagishi, and Isao              Deep residual learning for image recognition. In Proceedings
     Echizen. Mesonet: a compact facial video forgery detection              of the IEEE/CVF Conference on Computer Vision and Pattern
     network. In Proceedings of the IEEE International Workshop              Recognition, pages 770–778, 2016. 6
     on Information Forensics and Security, 2018. 2, 6                  [14] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun.
 [2] Jinze Bai, Shuai Bai, Shusheng Yang, Shijie Wang, Sinan Tan,            Deep residual learning for image recognition. In Proceedings
     Peng Wang, Junyang Lin, Chang Zhou, and Jingren Zhou.                   of the IEEE/CVF Conference on Computer Vision and Pattern
     Qwen-VL: A versatile vision-language model for understand-              Recognition, pages 770–778, 2016. 1
$$
     ing, localization, text reading, and beyond. arXiv preprint        [15] David Holz. Midjourney. url = https://www.midjourney.com/,
$$
     arXiv:2308.12966, 2023. 4, 6                                            2023. 1
 [3] Darwin Bautista and Rowel Atienza. Scene text recognition          [16] Vlad Hosu, Hanhe Lin, Tamas Sziranyi, and Dietmar Saupe.
     with permuted autoregressive sequence models. In European               KonIQ-10k: An ecologically valid database for deep learning
     Conference on Computer Vision, pages 178–196. Springer,                 of blind image quality assessment. IEEE Transactions on
     2022. 8                                                                 Image Processing, 29:4041–4056, 2020. 6
 [4] Zhanzhan Cheng, Fan Bai, Yunlu Xu, Gang Zheng, Shiliang            [17] Heng Huang, Xin Jin, Yaqi Liu, Hao Lou, Chaoen Xiao, Shuai
     Pu, and Shuigeng Zhou. Focusing attention: Towards accurate             Cui, Xinning Li, and Dongqing Zou. Predicting scores of
     text recognition in natural images. In Proceedings of the               various aesthetic attribute sets by learning from overall score
     IEEE international conference on computer vision, pages                 labels. arXiv preprint arXiv:2312.03222, 2023. 6, 7
     5076–5084, 2017. 6                                                 [18] Huggingface. Introducing idefics: An open reproduction of
 [5] Chee Kheng Ch’ng and Chee Seng Chan. Total-text: A com-                 state-of-the-art visual language model, 2023. 6, 7
     prehensive dataset for scene text detection and recognition. In    [19] Qing Jiang, Jiapeng Wang, Dezhi Peng, Chongyu Liu, and
     2017 14th IAPR international conference on document anal-               Lianwen Jin. Revisiting scene text recognition: A data per-
     ysis and recognition (ICDAR), pages 935–942. IEEE, 2017.                spective. In Proceedings of the IEEE/CVF International
     6                                                                       Conference on Computer Vision, pages 20543–20554, 2023.
 [6] François Chollet. Xception: Deep learning with depthwise               8
     separable convolutions. In Proceedings of the IEEE/CVF             [20] Yue Jiang, Zhouhui Lian, Yingmin Tang, and Jianguo Xiao.
     Conference on Computer Vision and Pattern Recognition,                  Scfont: Structure-guided chinese font generation via deep
     2017. 1, 6                                                              stacked networks. In Proceedings of the AAAI conference on
 [7] Alexandre Ciancio, A. L. N. T. Targino da Costa, E. A. B.               artificial intelligence, pages 4015–4022, 2019. 1
     da Silva, Amir Said, Ramin Samadani, and Pere Obrador.             [21] Dimosthenis Karatzas, Faisal Shafait, Seiichi Uchida,
     No-reference blur assessment of digital pictures based on               Masakazu Iwamura, Lluis Gomez i Bigorda, Sergi Robles
     multifeature classifiers. IEEE Transactions on Image Process-           Mestre, Joan Mas, David Fernandez Mota, Jon Almazan Al-
     ing, 20(1):64–75, 2011. 6                                               mazan, and Lluis Pere De Las Heras. Icdar 2013 robust read-
 [8] Xiaoyi Dong, Pan Zhang, Yuhang Zang, Yuhang Cao, Bin                    ing competition. In 2013 12th international conference on
     Wang, Linke Ouyang, Xilin Wei, Songyang Zhang, Haodong                  document analysis and recognition, pages 1484–1493. IEEE,
     Duan, Maosong Cao, et al. InternLM-XComposer2: Master-                  2013. 6
     ing free-form text-image composition and comprehension in          [22] Dimosthenis Karatzas, Lluis Gomez-Bigorda, Anguelos Nico-
     vision-language large model. CoRR, abs/2401.16420, 2024.                laou, Suman Ghosh, Andrew Bagdanov, Masakazu Iwa-
     6, 7                                                                    mura, Jiri Matas, Lukas Neumann, Vijay Ramaseshan Chan-
 [9] Shancheng Fang, Hongtao Xie, Yuxin Wang, Zhendong Mao,                  drasekhar, Shijian Lu, et al. Icdar 2015 competition on robust
     and Yongdong Zhang. Read like humans: Autonomous, bidi-                 reading. In 2015 13th international conference on document
     rectional and iterative language modeling for scene text recog-         analysis and recognition (ICDAR), pages 1156–1160. IEEE,
     nition. In Proceedings of the IEEE/CVF Conference on Com-               2015. 6
     puter Vision and Pattern Recognition, pages 7098–7107, 2021.       [23] Junjie Ke, Qifei Wang, Yilin Wang, Peyman Milanfar, and
     8                                                                       Feng Yang. MUSIQ: Multi-scale image quality transformer.
[10] Deepti Ghadiyaram and Alan C. Bovik. Massive online                     In IEEE International Conference on Computer Vision, pages
     crowdsourced study of subjective and objective picture qual-            5148–5157, 2021. 6, 7
     ity. IEEE Transactions on Image Processing, 25(1):372–387,         [24] Junjie Ke, Keren Ye, Jiahui Yu, Yonghui Wu, Peyman Milan-
     2016. 6                                                                 far, and Feng Yang. Vila: Learning image aesthetics from user
                                                                   19678


<!-- PK PAGE 10 doc=math_p18 -->
comments with vision-language pretraining. In Proceedings             conference on computer vision and pattern recognition, pages
     of the IEEE/CVF Conference on Computer Vision and Pattern             2687–2694. IEEE, 2012. 6
     Recognition (CVPR), pages 10041–10051, 2023. 6, 7                [39] Kunato Nishina and Yusuke Matsui. Svgeditbench: A bench-
[25] Yuval Kirstain, Adam Polyak, Uriel Singer, Shahbuland Ma-             mark dataset for quantitative assessment of llm’s svg editing
     tiana, Joe Penna, and Omer Levy. Pick-a-pic: An open dataset          capabilities. arXiv preprint arXiv:2404.13710, 2024. 3
     of user preferences for text-to-image generation. Advances       [40] OpenAI. Gpt-4 technical report. ArXiv, abs/2303.08774,
     in Neural Information Processing Systems, 36:36652–36663,             2023. 6
     2023. 2
                                                                      [41] Song Park, Sanghyuk Chun, Junbum Cha, Bado Lee, and
[26] Eric C Larson and Damon M Chandler. Most apparent dis-                Hyunjung Shim. Few-shot font generation with localized
     tortion: Full-reference image quality assessment and the role         style representations and factorization. In Proc. AAAI, pages
     of strategy. Journal of Electronic Imaging, 19(1):011006–             2393–2402, 2021. 2
     011006, 2010. 6
                                                                      [42] Song Park, Sanghyuk Chun, Junbum Cha, Bado Lee, and
[27] Junyeop Lee, Sungrae Park, Jeonghun Baek, Seong Joon Oh,
                                                                           Hyunjung Shim. Multiple heads are better than one: Few-shot
     Seonghyeon Kim, and Hwalsuk Lee. On recognizing texts
                                                                           font generation with multiple localized experts. In ICCV,
     of arbitrary shapes with 2d self-attention. In Proceedings of
                                                                           pages 13900–13909, 2021. 2
     the IEEE/CVF Conference on Computer Vision and Pattern
     Recognition Workshops, pages 546–547, 2020. 8                    [43] Trung Quy Phan, Palaiahnakote Shivakumara, Shangxuan
                                                                           Tian, and Chew Lim Tan. Recognizing text with perspective
[28] Hui Li, Peng Wang, Chunhua Shen, and Guyu Zhang. Show,
                                                                           distortion in natural scenes. In Proceedings of the IEEE
     attend and read: A simple and strong baseline for irregular
                                                                           international conference on computer vision, pages 569–576,
     text recognition. In Proceedings of the AAAI conference on
                                                                           2013. 6
     artificial intelligence, pages 8610–8617, 2019. 8
[29] Junnan Li, Dongxu Li, Silvio Savarese, and Steven Hoi. BLIP-     [44] Guo Pu, Shiyao Xu, Xixin Cao, and Zhouhui Lian. Dynamic
     2: Bootstrapping language-image pre-training with frozen              texture transfer using patchmatch and transformers. arXiv
     image encoders and large language models. In International            preprint arXiv:2402.00606, 2024. 3
     Conference on Machine Learning, pages 19730–19742, 2023.         [45] Zeju Qiu, Weiyang Liu, Haiwen Feng, Zhen Liu, Tim Z Xiao,
     6                                                                     Katherine M Collins, Joshua B Tenenbaum, Adrian Weller,
[30] Junnan Li, Dongxu Li, Silvio Savarese, and Steven Hoi. Blip-          Michael J Black, and Bernhard Schölkopf. Can large lan-
     2: Bootstrapping language-image pre-training with frozen              guage models understand symbolic graphics programs? arXiv
     image encoders and large language models. arXiv preprint              preprint arXiv:2408.08313, 2024. 1, 3
     arXiv:2301.12597, 2023. 6                                        [46] Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya
[31] Hanhe Lin, Vlad Hosu, and Dietmar Saupe. KADID-10k:                   Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry,
     A large-scale artificially distorted IQA database. In Inter-          Amanda Askell, Pamela Mishkin, Jack Clark, et al. Learning
     national Conference on Quality of Multimedia Experience,              transferable visual models from natural language supervision.
     pages 1–3, 2019. 6                                                    In International Conference on Machine Learning, pages
[32] Haotian Liu, Chunyuan Li, Yuheng Li, and Yong Jae Lee.                8748–8763, 2021. 2
     Improved baselines with visual instruction tuning. CoRR,         [47] Anhar Risnumawan, Palaiahankote Shivakumara, Chee Seng
     abs/2310.03744, 2023. 7                                               Chan, and Chew Lim Tan. A robust arbitrary text detection
[33] Haotian Liu, Chunyuan Li, Qingyang Wu, and Yong Jae Lee.              system for natural scene images. Expert Systems with Appli-
     Visual instruction tuning. In Advances in Neural Information          cations, 41(18):8027–8048, 2014. 6
     Processing Systems, pages 1–25, 2024. 6                          [48] Andreas Rossler, Davide Cozzolino, Luisa Verdoliva, Chris-
[34] Ming-Yu Liu, Xun Huang, Arun Mallya, Tero Karras, Timo                tian Riess, Justus Thies, and Matthias Nießner. Faceforen-
     Aila, Jaakko Lehtinen, and Jan Kautz. Few-shot unsupervised           sics++: Learning to detect manipulated facial images. In
     image-to-image translation. In Proc. ICCV, pages 10551–               Proceedings of the IEEE/CVF Conference on International
     10560, 2019. 2                                                        Conference on Computer Vision, 2019. 2, 6
[35] Yitian Liu and Zhouhui Lian. Qt-font: High-efficiency font       [49] Hamid R. Sheikh, Muhammad F. Sabir, and Alan C. Bovik.
     synthesis via quadtree-based diffusion models. In SIGGRAPH            A statistical evaluation of recent full reference image quality
     2024 Conference Papers, 2024. 1                                       assessment algorithms. IEEE Transactions on Image Process-
[36] Yuliang Liu, Lianwen Jin, Shuaitao Zhang, Canjie Luo, and             ing, 15(11):3440–3451, 2006. 6
     Sheng Zhang. Curved scene text detection via transverse and      [50] Fenfen Sheng, Zhineng Chen, and Bo Xu. Nrtr: A no-
     longitudinal sequence connection. Pattern Recognition, 90:            recurrence sequence-to-sequence model for scene text recog-
     337–345, 2019. 6                                                      nition. In 2019 International conference on document analysis
[37] Yifang Men, Zhouhui Lian, Yingmin Tang, and Jianguo Xiao.             and recognition (ICDAR), pages 781–786. IEEE, 2019. 8
     Dyntypo: Example-based dynamic text effects transfer. In         [51] Baoguang Shi, Mingkun Yang, Xinggang Wang, Pengyuan
     Proceedings of the IEEE/CVF Conference on Computer Vi-                Lyu, Cong Yao, and Xiang Bai. Aster: An attentional scene
     sion and Pattern Recognition, pages 5870–5879, 2019. 3                text recognizer with flexible rectification. IEEE transactions
[38] Anand Mishra, Karteek Alahari, and CV Jawahar. Top-down               on pattern analysis and machine intelligence, 41(9):2035–
     and bottom-up cues for scene text recognition. In 2012 IEEE           2048, 2018. 8
                                                                 19679


<!-- PK PAGE 11 doc=math_p18 -->
[52] Cunzhao Shi, Chunheng Wang, Baihua Xiao, Song Gao, and          [66] Xudong Xie, Ling Fu, Zhifei Zhang, Zhaowen Wang, and
     Jinlong Hu. End-to-end scene text recognition using tree-            Xiang Bai. Toward understanding wordart: Corner-guided
     structured models. Pattern Recognition, 47(9):2853–2866,             transformer for scene text recognition. 2022. 3, 6
     2014. 6                                                         [67] Jiazheng Xu, Xiao Liu, Yuchen Wu, Yuxuan Tong, Qinkai
[53] Hossein Talebi and Peyman Milanfar. Nima: Neural image               Li, Ming Ding, Jie Tang, and Yuxiao Dong. Imagereward:
     assessment. IEEE TIP, 2018. 6, 7                                     Learning and evaluating human preferences for text-to-image
[54] Mingxing Tan and Quoc Le. Efficientnet: Rethinking model             generation, 2023. 2
     scaling for convolutional neural networks. In Proceedings       [68] Xu Yan, Zhihao Yuan, Yuhao Du, Yinghong Liao, Yao Guo,
     of the International Conference on Machine Learning, pages           Zhen Li, and Shuguang Cui. Clevr3d: Compositional lan-
     6105–6114. PMLR, 2019. 1, 2, 6                                       guage and elementary visual reasoning for question answer-
[55] Licheng Tang, Yiyang Cai, Jiaming Liu, Zhibin Hong, Ming-            ing in 3d real-world scenes. arXiv preprint arXiv:2112.11691,
     ming Gong, Minhu Fan, Junyu Han, Jingtuo Liu, Errui Ding,            2021. 1
     and Jingdong Wang. Few-shot font generation by learning         [69] Qiangpeng Yang, Jun Huang, and Wei Lin. Swaptext: Im-
     fine-grained local styles. In Proc. CVPR, pages 7895–7904,           age based texts transfer in scenes. In Proceedings of the
     2022. 2                                                              IEEE/CVF Conference on Computer Vision and Pattern
[56] Maham Tanveer, Yizhi Wang, Ali Mahdavi-Amiri, and Hao                Recognition, pages 14700–14709, 2020. 3
     Zhang. Ds-fusion: Artistic typography via discriminated and     [70] Zhenhua Yang, Dezhi Peng, Yuxin Kong, Yuyi Zhang, Cong
     stylized diffusion. In Proceedings of the IEEE/CVF Interna-          Yao, and Lianwen Jin. Fontdiffuser: One-shot font gener-
     tional Conference on Computer Vision, pages 374–384, 2023.           ation via denoising diffusion with multi-scale content ag-
     3                                                                    gregation and style contrastive learning. arXiv preprint
[57] Zhengzhong Tu, Hossein Talebi, Han Zhang, Feng Yang,                 arXiv:2312.12142, 2023. 2, 3
     Peyman Milanfar, Alan Bovik, and Yinxiao Li. Maxvit: Multi-     [71] Li Sun Yangchen Xie, Xinyuan Chen and Yue lu. Dg-font:
     axis vision transformer. ECCV, 2022. 6, 7                            Deformable generative networks for unsupervised font gener-
[58] Andreas Veit, Tomas Matera, Lukas Neumann, Jiri Matas, and           ation. In Proceedings of the IEEE Conference on Computer
     Serge Belongie. Coco-text: Dataset and benchmark for text            Vision and Pattern Recognition, 2021. 2, 3
     detection and recognition in natural images. arXiv preprint     [72] Mingshuai Yao, Yabo Zhang, Xianhui Lin, Xiaoming Li, and
     arXiv:1601.07140, 2016. 6                                            Wangmeng Zuo. Vq-font: Few-shot font generation with
[59] Changshuo Wang, Lei Wu, Xiaole Liu, Xiang Li, Lei Meng,              structure-aware enhancement and quantization. In AAAI,
     and Xiangxu Meng. Anything to glyph: Artistic font synthesis         2024. 3
     via text-to-image diffusion model. In SIGGRAPH Asia 2023        [73] Q. Ye, H. Xu, G. Xu, J. Ye, M. Yan, Y. Zhou, J. Wang, A.
     Conference Papers, pages 1–11, 2023. 3                               Hu, P. Shi, Y. Shi, and et al. mPLUG-Owl: Modularization
[60] Chi Wang, Min Zhou, Tiezheng Ge, Yuning Jiang, Hujun Bao,            empowers large language models with multimodality. CoRR,
     and Weiwei Xu. Cf-font: Content fusion for few-shot font             abs/2304.14178, 2023. 6
     generation. In Proc. CVPR, pages 1858–1867, 2023. 2             [74] Qinghao Ye, Haiyang Xu, Jiabo Ye, Ming Yan, Haowei Liu,
[61] Jianyi Wang, Kelvin CK Chan, and Chen Change Loy. Ex-                Qi Qian, Ji Zhang, Fei Huang, and Jingren Zhou. mPLUG-
     ploring clip for assessing the look and feel of images. In           Owl2: Revolutionizing multi-modal large language model
     AAAI, 2023. 6, 7                                                     with modality collaboration. CoRR, abs/2311.04257, 2023. 7
[62] Yizhi Wang and Zhouhui Lian. Deepvecfont: Synthesizing          [75] Zitong Yu, Chenxu Zhao, Zezheng Wang, Yunxiao Qin, Zhuo
     high-quality vector fonts via dual-modality learning. ACM            Su, Xiaobai Li, Feng Zhou, and Guoying Zhao. Searching cen-
     Transactions on Graphics (TOG), 40(6):1–15, 2021. 2                  tral difference convolutional networks for face anti-spoofing.
[63] Yuxin Wang, Hongtao Xie, Shancheng Fang, Jing Wang,                  In CVPR, 2020. 5
     Shenggao Zhu, and Yongdong Zhang. From two to one:              [76] Lingjun Zhang, Xinyuan Chen, Yaohui Wang, Yue Lu, and Yu
     A new scene text recognizer with visual language model-              Qiao. Brush your text: Synthesize any scene text on images
     ing network. In Proceedings of the IEEE/CVF International            via diffusion model. 2023. 3
     Conference on Computer Vision, pages 14194–14203, 2021.         [77] Weixia Zhang, Guangtao Zhai, Ying Wei, Xiaokang Yang, and
     6                                                                    Kede Ma. Blind image quality assessment via vision-language
[64] Haoning Wu, Zicheng Zhang, Weixia Zhang, Chaofeng Chen,              correspondence: A multitask learning perspective. In IEEE
     Chunyi Li, Liang Liao, Annan Wang, Erli Zhang, Wenxiu                Conference on Computer Vision and Pattern Recognition,
     Sun, Qiong Yan, Xiongkuo Min, Guangtao Zhai, and Weisi               pages 14071–14081, 2023. 6, 7
     Lin. Q-align: Teaching lmms for visual scoring via discrete     [78] Zhen Zhao, Jingqun Tang, Chunhui Lin, Binghong Wu, Can
     text-defined levels. arXiv preprint arXiv:2312.17090, 2023.          Huang, Hao Liu, Xin Tan, Zhizhong Zhang, and Yuan Xie.
     Equal Contribution by Wu, Haoning and Zhang, Zicheng.                Multi-modal in-context learning makes an ego-evolving scene
     Corresponding Authors: Zhai, Guangtao and Lin, Weisi. 6, 7           text recognizer. In Proceedings of the IEEE/CVF Conference
[65] Haoning Wu, Hanwei Zhu, Zicheng Zhang, Erli Zhang,                   on Computer Vision and Pattern Recognition, pages 15567–
     Chaofeng Chen, Liang Liao, Chunyi Li, Annan Wang, Wenxiu             15576, 2024. 5, 8
     Sun, Qiong Yan, et al. Towards open-ended visual quality
     comparison. CoRR, abs/2402.16641, 2024. 6, 7
                                                                19680
<!-- PK END doc=math_p18 -->
