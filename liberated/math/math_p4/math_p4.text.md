PKvNext Document

KEY: math_p4 | math |  | 32c1dcf0 | 13 | /papers/CanMultimodalLargeLanguageModelsUnderstandSpatialRelations.pdf
<!-- PK START doc=math_p4 -->


<!-- PK PAGE 1 doc=math_p4 -->
Can Multimodal Large Language Models Understand Spatial Relations?
                                                   Jingping Liu♢ * , Ziyan Liu♢ , Zhedong Cen♢ , Yan Zhou♢ , Yinan Zou♢ ,
                                                               Weiyan Zhang♢ * , Haiyun Jiang♠ , Tong Ruan♢
                                                    ♢
                                                      School of Information Science and Engineering, East China University
                                                                  of Science and Technology, Shanghai, China
                                                       ♠
                                                         School of Computer Science, Fudan University, Shanghai, China
                                                {jingpingliu,weiyanzhang}@ecust.edu.cn, y30241069@mail.ecust.edu.cn
                                                                                                                                               SpatialMQA
                                                                Abstract
                                             Spatial relation reasoning is a crucial task for
arXiv:2505.19015v2 [cs.CV] 8 Aug 2025
                                             multimodal large language models (MLLMs)
                                                                                                   Q: ( laptop, the student in pink)    Q: ( person, sun )             Q: If you are the woman..., (book,
                                             to understand the objective world. However,           O: ……               A: in front of   O: ……           A: in front of    laptop) O: … A: left of
                                                                                                                                                                                       (c)
                                                                                                                (a)                                 (b)
                                             current benchmarks have issues like relying on                 SpatialSense                                              VSR
                                             bounding boxes, ignoring perspective substi-
                                             tutions, or allowing questions to be answered
                                             using only the model’s prior knowledge with-
                                             out image understanding. To address these               ( sky, behind, forest )              The apple is above the         The book is above the bus
                                                                                                                                          banana
                                             issues, we introduce SpatialMQA, a human-                            (d)                                (e)                               (f)
                                             annotated spatial relation reasoning benchmark
                                             based on COCO2017, which enables MLLMs               Figure 1: Samples from spatial relation reasoning bench-
                                             to focus more on understanding images in the         marks. “Q”, “O”, and “A” in our SpatialMQA denote the
                                             objective world. To ensure data quality, we          question, options, and answer. In SpatialSense (Yang
                                             design a well-tailored annotation procedure,         et al., 2019) and VSR (Liu et al., 2023a), questions are
                                             resulting in SpatialMQA consisting of 5,392          binary classification, with image and text inputs, and
                                             samples. Based on this benchmark, a series           true/false outputs.
                                             of closed- and open-source MLLMs are im-
                                             plemented and the results indicate that the          tities in a given scene (Liu et al., 2023a). For in-
                                             current state-of-the-art MLLM achieves only          stance, in Figure 1(a), given the subject “laptop”
                                             48.14% accuracy, far below the human-level
                                                                                                  and the object “the student in pink”, the model
                                             accuracy of 98.40%. Extensive experimental
                                             analyses are also conducted, suggesting the fu-      needs to infer that the spatial relation between them
                                             ture research directions. The benchmark and          is “in front of”. This task is important because un-
                                             codes are available at https://github.com/           derstanding spatial relations in the objective world
                                             ziyan-xiaoyu/SpatialMQA.git.                         is a fundamental human ability essential for daily
                                                                                                  life (Proulx et al., 2016; Hawes and Ansari, 2020).
                                        1    Introduction                                         For instance, to fully the scene of four students
                                                                                                  discussing at the podium in Figure 1(a), it is nec-
                                        Multimodal large language models have become
                                                                                                  essary to identify the entities (laptop, podium, the
                                        increasingly significant in AI due to their ability to
                                                                                                  student in pink) and their spatial relations (laptop
                                        process and integrate data from multiple sources
                                                                                                  on podium, laptop in front of the student in pink).
                                        such as text and images. Although MLLMs excel
                                                                                                      Several benchmarks exist for spatial relation rea-
                                        in tasks like image recognition (Guo et al., 2023)
                                                                                                  soning, yet they remain insufficient for fully eval-
                                        and classification (Wang et al., 2023), they still face
                                                                                                  uating MLLMs’ ability to understand spatial rela-
                                        challenges with more complex tasks, such as multi-
                                                                                                  tions. These benchmarks can be categorized based
                                        modal understanding and reasoning (Zheng et al.,
                                                                                                  on whether they use bounding boxes (bboxes) to en-
                                        2023), highlighting the need for further exploration
                                                                                                  close subjects and objects. First, benchmarks with
                                        and enhancement of their capabilities.
                                                                                                  bbox annotations, such as SpatialVOC2K (Belz
                                           A critical aspect of evaluating MLLMs is their
                                                                                                  et al., 2018), Rel3D (Goyal et al., 2020), and Spa-
                                        ability to understand spatial relations, which in-
                                                                                                  tialSense+ (Wen et al., 2024), face two main chal-
                                        volves inferring the spatial relations between en-
                                                                                                  lenges. On one hand, the subject or object in the
                                            * Corresponding authors.                              question may not be explicitly visible in images,


<!-- PK PAGE 2 doc=math_p4 -->
Table 1: Overview of spatial relation reasoning benchmarks. “Q. Type”, “Rel.”, “Type”, “Obj. W”, “Per. sub.”, “Kn.”,
and “MQA” stand for “question type”, “relations”, “types of subject or object”, “objective world”, “perspective
substitution” “knowledge”, and “multiple-choice QA”, respectively. “Objective world” indicates whether the
benchmark’s annotations use the objective world as the reference system. “Perspective substitution” means whether
questions involve perspective (first- or third-person). “Knowledge” indicates whether questions in the benchmark
can be answered solely with models’ prior knowledge, without images.
  Benchmark                          Q. Type   # Rel.   # Type     w/o bbox   Obj. W    Per. sub.     w/o Kn.    Size
$$
  SpatialVOC2K (Belz et al., 2018)    Cloze      17        20         ×          ×          ×           ×        2,026
$$
$$
  SpatialSense (Yang et al., 2019)    T or F      9         -         ×          ×        First         ×       17,498
$$
$$
  Rel3D (Goyal et al., 2020)          T or F     30        67         ×          ×          ×           -       27,336
$$
$$
  SpatialSense+ (Wen et al., 2024)    T or F      9         -         ×          ×          ×           ✓        7,254
$$
$$
  SpatialRGPT (Cheng et al., 2024)   OpenQA      12        88         ×          ✓          ×           ✓        1,406
$$
$$
  EmbSpatial (Du et al., 2024)        MQA         6       294         ✓          ×          ×           ×         3640
$$
$$
  VSR (Liu et al., 2023a)             T or F     66        32         ✓        Partly     First         ×       10,972
$$
$$
  SpatialVLM (Chen et al., 2024)     OpenQA       -         -         ✓        Partly       ×           ×          546
$$
  SpatialMQA (ours)                   MQA         6       128         ✓          ✓      First/Third     ✓        5,392
making it impossible to use bboxes (Liu et al.,             of bboxes. To address the limitations of existing
2023a). As illustrated in Figure 1(b), the sub-             benchmarks, we establish clear annotation guideject “sun” cannot be framed with a bbox in the              lines for SpatialMQA, incorporating questions that
question “Where is the sun located relative to the          involve perspective substitution based on the objecman?”. On the other hand, some spatial relations            tive world as a reference system, while avoiding
in these benchmarks are not grounded in the ob-             questions that can be answered solely through the
jective world, leading to a gap between machine             models’ prior knowledge without images. In adand human cognition. For instance, in Figure 1(d),          dition, we design a three-round annotation procethe sky is objectively above the forest, but Spa-           dure for quality control. To assess the spatial relatialSense marks it as behind the forest. Secondly,          tion reasoning capabilities of MLLMs, we conduct
benchmarks without labeled bboxes, like EmbSpa-             comprehensive experiments using closed-source
tial (Du et al., 2024), VSR (Liu et al., 2023a), and        models such as GPT-4o (Achiam et al., 2023) and
SpatialVLM (Chen et al., 2024), also face two main          Gemini-1.5-flash (Team et al., 2023), as well as
issues. One major issue is that they often ignore           open-source models like LLaVA (Liu et al., 2024)
perspective substitution (first- and third-person).         and SpaceLLaVA (Chen et al., 2024).
Even when included, it is only a small part. For               In summary, our contributions include:
instance, in VSR, only 6% of the benchmark uses
a first-person perspective. This limits the model’s
                                                                 • We introduce a new manually annotated highability to understand spatial relations from differ-
                                                                   quality benchmark for multimodal spatial reent perspectives, which is important for complex,
                                                                   lation reasoning without bboxes.
dynamic scenarios like autonomous driving (Gao
et al., 2024). Another issue is that some questions
in these benchmarks can be answered correctly                    • The main characteristic of SpatialMQA is that
without images, relying only on the model’s prior                  the questions involve perspective substitutions
knowledge. As shown in Figure 1(f), the question                   using the objective world as a reference. Also,
“the book is above the bus” can often be answered                  the questions cannot be answered using only
“No” based on commonsense, without needing to                      the model’s prior knowledge without images.
analyze the image. This prevents a proper evaluation of MLLMs’ image understanding abilities.                    • We evaluate both open- and closed-source
   Hence, in this paper, we introduce SpatialMQA,                  MLLMs on SpatialMQA, indicating that statea new benchmark in a multiple-choice question                      of-the-art (SoTA) methods like GPT-4o and
& answer format, designed to fully evaluate the                    instruction-tuned SpaceLLaVA achieve accuability of MLLMs in multimodal spatial relation                    racies of 40.20% and 48.14%, respectively,
reasoning. The benchmark includes 5,392 sam-                       far below the human accuracy of 98.40%. We
ples based on COCO2017 (Lin et al., 2014), cover-                  further provide detailed analyses and suggest
ing 128 subject and object types, without the use                  future research directions.


<!-- PK PAGE 3 doc=math_p4 -->
Table 2: The definition of the spatial coordinate system (SCS) and its six spatial relations. The coordinates for the
subject are specified as (xs , ys , zs ) and for the object as (xo , yo , zo ).
    Terms         Definition
    SCS           The spatial coordinate system is established based on the objective world, with gravity pointing downward
                  and the observer as the origin. The X-axis spans the observer’s left (negative) to right (positive), the Y-axis
                  from back (negative) to front (positive), and the Z-axis from down (negative) to up (positive).
    left of       The subject is to the left of the object when xs < xo .
    right of      The subject is to the right of the object when xs > xo .
    in front of   The subject is in front of the object when 1) ys · yo > 0, |ys | − |yo | < 0, or 2) ys · yo < 0, ys > 0 > yo .
    behind        The subject is behind the object when 1) ys · yo > 0, |ys | − |yo | > 0, or 2) ys · yo < 0, ys < 0 < yo .
    on/above      The subject is on/above the object when zs > zo .
    below         The subject is below the object when zs < zo .
2     Problem Formulation                                             3.2    Annotation Guidelines
In this paper, we consider the spatial relation                       Based on the collected images, we label each one
reasoning task as a multiple-choice question-                         with a question, options, and the correct answer.
answering problem. Given a text question Q and                        To assist annotators in creating high-quality saman image I, where Q asks about the spatial relation                   ples, we provide annotation guidelines, including
between two target entities, the task requires the                    question types and important precautions.
$$
model to select the correct answer from k (k =                           Question types. Based on the observer’s per2, ..., 6) options. Each option corresponds to a spa-                 spective, we divide the question types into two
$$
$$
tial relation from the pre-defined set R = {left of,                  types: out-of-image and in-image perspectives. In
$$
right of, in front of, behind, on/above, below}, with                 the first type, the observer exists outside the image
their definitions provided in Table 2. For instance,                  and we manually pre-define several question temin Figure 1(a), given the question “Where is the                      plates like “Where is the subject located relative to
laptop located relative to the student in pink?”, an                  the object?”. See Appendix A for more templates.
image, and six options, an ideal model would select                   In the second type, the observer’s perspective is
“in front of” as the correct answer.                                  within the image and can be further divided into
                                                                      two types. The first type uses the object’s perspec3     SpatialMQA Construction                                         tive as the observer’s perspective (also denoted as
                                                                      the first-person perspective). Question templates
In this section, we detail the construction of the                    for this type address the spatial relation between
SpatialMQA benchmark, including image source,                         the subject and the observer (the object), such as “If
annotation guidelines, and annotation procedures.                     you are [object] in the image, where is the subject
                                                                      located relative to you?”. The second type consid3.1     Image Source                                                  ers a living being (third-person perspective) within
In this study, we choose COCO2017 (Lin et al.,                        the image as the observer, distinct from both the
2014) as our image source due to its notable ad-                      subject and the object. It includes question temvantages: 1) Extensive collection. COCO2017 con-                      plates like, “If you are the [living being] in the
tains over 160,000 images, providing a broad selec-                   image, from your perspective, where is the subject
tion for identifying high-quality images to analyze                   located relative to the object?”.
spatial relations. 2) Diverse types: The dataset en-                     Precautions. This part guides annotators in excompasses 80 entity types, covering a wide range                      cluding low-quality samples. There are two main
of entities in the objective world, such as people,                   precautions to consider: Firstly, the question cannot
animals, cars, and food. 3) Multi-entity scenarios:                   be correctly answered based solely on the model’s
The images in COCO2017 often involve multiple                         prior knowledge without an image. For instance,
entities, making it easier to select two appropriate                  the question “the book is above the bus” in Figure
entities to determine their spatial relation. From                    1(f) can be answered as “No” without visual input.
this dataset, we select 30,000 high-quality images                    Secondly, the image must be clear, with the subject
to annotate two entities and their spatial relation.                  or object of the question being easily identifiable.


<!-- PK PAGE 4 doc=math_p4 -->
Table 3: Statistics of our SpatialMQA. The samples                             >100                    Subject Types
                                                                                      901
                                                                                      584
                                                                                      569
                                                                                      320
                                                                                      125
                                                                                      111
                                                                                 80
in “first-p”(first-person perspective) and “third-p”(third-                      60
                                                                                 40
person perspective) are both from “In-I”(In-image). The                          20
                                                                                  0
latter has fewer samples due to the limited number of
images that depict three distinct living entities. “Out-I”
means “out-of-image”.                                                                                   Object Types
                                                                               >100
                                                                                      2517
                                                                                       580
                                                                                       313
                                                                                 80
                                                                                 60
               Train    Dev   Test    Total       Ratio    Min.L Max.L Avg.L     40
                                                                                 20
 SpatialMQA 3,780       536   1,076   5,392       100.00    7     34   18.84      0
                              Spatial relations
 left of       1,040    148    296    1,484       27.52     7     34   18.39
 right of        980    139    279    1,398       25.93     8     32   18.50
 in front of     565     80    161      806       14.95     9     33   20.04
 behind          529     75    151      755       14.00     7     34   18.61
 on/above        353     50    100      503        9.33     8     33   18.30
                                                                                   Figure 2: Distributions of subject and object types.
 below           313     44     89      446        8.27     8     32   20.29
                              Question types
 Out-I         1,513    217    452    2,182       40.00    7      33   15.81   their criteria, which in turn helps standardize the
 In-I          2,267    319    624    3,210       60.00    12     34   20.91
  # first-p     2,136   299    590     3,025       94.24    12    34   20.60
                                                                               construction team’s work. The cycle continues
  # third-p       131    20     34       185        5.76    18    34   25.91   until the batch achieves 95% accuracy. Finally,
                                                                               we obtain 5,392 high-quality samples to form Spa3.3      Annotation Procedure                                                  tialMQA.
To create a high-quality benchmark, we organize a                              4      SpatialMQA Analysis
professional team of three annotators, two checkers,                           Benchmark statistics. As reported in Table 3, Spaand one reviewer. All team members are trained                                 tialMQA contains 5,392 samples, divided into trainto understand the definition of the spatial coordi-                            ing, validation, and test sets according to a 7:1:2
nate system, six spatial relations, and annotation                             ratio. In this benchmark, the questions have a miniguidelines. The procedure includes first-round an-                             mum length of 7 words, a maximum length of 34,
notation, second-round checking, and third-round                               and an average length of 18.84. Notably, the minireview.                                                                        mum length of questions in the in-image perspec-
   First-round annotation. We invite three college                             tive is 2-3 times longer than the minimum length
students, assigning 10,000 images to each for an-                              of questions in the entire benchmark, as these quesnotation. According to the guidelines, they write a                            tions typically involve three entities, while other
reasonable question for each image, select options                             questions generally involve only two.
from a predefined set, and mark the correct answer                                Diversity of subject and object types in quesfrom the options.                                                              tions. To verify the diversity of questions in our
   Second-round checking. We invite two other                                  benchmark, we use GPT-4o with in-context learncollege students to simultaneously check the ratio-                            ing (ICL) to extract the subjects and objects in quesnality of all samples. Furthermore, each student is                            tions and classify them into predefined categories.
assigned an additional task. One student is respon-                            This process is detailed in Appendix B. According
sible for checking whether the correct answer to the                           to our statistics, there are 113 subject categories
question can be determined through prior knowl-                                and an additional category that includes all subject
edge without images (corresponding to precaution                               categories with a sample size of five or fewer, and
1). The other student verifies whether the subject                             84 object categories, along with an additional cator object in the image is clear (corresponding to                              egory that encompasses all object categories with
precaution 2). Samples identified as unqualified                               a sample size of five or fewer. Due to the overlap
by the checkers are returned to annotators with ex-                            between subject and object types, we have a total
planations for correction. This process is repeated                            of 128 distinct subject and object types. To provide
until a batch achieves 90% accuracy, as determined                             a more intuitive understanding of these types, we
by the checkers.                                                               present the subject and object types with Top-30
   Third-round review. A verified batch is given                               frequency, as shown in Figure 2.
to a main author for double review. The author                                    Option combinations. In SpatialMQA, the
randomly inspects 20% of the batch samples. Any                                number of question options varies to ensure they
unqualified annotations are returned to the check                              are appropriate for questions. For instance, opteam with explanations, allowing them to refine                                tions like “on/above” and “below” are not suitable


<!-- PK PAGE 5 doc=math_p4 -->
Table 4: Model comparison (%) on our SpatialMQA benchmark. All results are the average of three runs.
    Model              Settings    P       R         F1     Acc      Settings     P       R       F1      Acc
                                                  Open-source MLLMs
    BLIP-vqa-base         -       32.92   20.86    25.54   26.49        FULL     48.12   31.48   38.06   33.64
    BLIP2-opt-2.7B        -       31.31   34.97    33.04   26.86        LoRA     55.20   37.47   44.64   29.93
    InstructBLIP-3B       -       37.42   27.47    31.69   28.53        LoRA     44.22   44.80   44.51   42.38
    mPLUG-Owl-7B          -       34.30   32.90    33.58   26.49        LoRA     36.05   38.59   37.28   31.88
    IDEFICS-9B            -       17.72   25.80    21.00   22.12        LoRA     35.13   36.41   35.76   29.28
    LLaVA1.5-7B           -       30.72   31.18    30.95   29.28        LoRA     46.10   44.56   45.32   46.85
    SpaceLLaVA            -       35.13   32.58    33.81   31.32        LoRA     47.96   46.18   47.05   48.14
                                                  Closed-source MLLMs
                        0-shot    38.55   35.47    36.95   35.40        2-shot   49.30   35.11   41.01   36.80
    Gemini-1.5-flash
                        1-shot    51.47   33.46    40.55   36.20        3-shot   51.52   35.82   42.26   38.00
                        0-shot    48.62   40.19    44.01   40.20        2-shot   48.70   38.36   42.92   38.40
    GPT-4o
                        1-shot    48.04   39.17    43.15   39.00        3-shot   46.76   36.99   41.30   37.80
                                                     Other Methods
    Random Choose         -       30.22   27.97    29.05   27.20         -         -       -       -        -
    Human                 -       98.56   98.40    98.48   98.40     Text-only   23.94   24.58   24.26   24.40(3)
for “where is the motorcycle located relative to the         (LoRA (Hu et al., 2021)) for the other MLLMs.
car?”. Hence, we only include the other four op-             Instruction data is generated by transforming the
tions. Based on the coordinate dimensions, we set            input and output from the training data, and the
the number of options to 2 (two spatial relations            task prompt remains consistent with the previous
in one dimension), 4 (four spatial relations in two          setting.
dimensions), or 6. According to our statistics, 75%
of samples (4036) have 4 options, while 12% (637)
and 13% (719) have 2 and 6 options, respectively.               Closed-source MLLMs. We randomly select
                                                             500 samples in SpatialMQA and adopt Gemini5     Experiments                                            1.5-flash and GPT-4o, two of the most powerful
                                                             models, for our experiments. For both models,
In this section, we implement state-of-the-art mod-          we employ two settings: zero-shot reasoning and
els on our newly constructed SpatialMQA bench-               few-shot reasoning. In the first setting, we input immark, aiming at assessing their performance and              ages, questions, and options, and use a task prompt
identifying the underlying challenges.                       to guide the MLLM to output answers. Detailed
                                                             prompts are provided in Appendix D. In the sec5.1    Baselines
                                                             ond setting, we use 1-shot, 2-shot, and 3-shot ICL
We mainly select three types of methods: open-               with the same instructions. The ICL examples are
source MLLMs, closed-source MLLMs, and oth-                  randomly selected from the training set and fixed
ers.                                                         for all samples in the test set.
   Open-source MLLMs. We use BLIP (Li et al.,
2022), BLIP2 (Li et al., 2023), InstructBLIP (Dai
et al., 2024), mPLUG-Owl (Ye et al., 2023),                     Other methods. We further design two methIDEFICS (Laurençon et al., 2023), LLaVA (Liu                 ods: random selection and manual answering. In
et al., 2024), and SpaceLLaVA (Chen et al., 2024)            the first method, we use a random function to sefor comparison. Two settings are designed: direct            lect an answer from the options for each question.
inference and instruction tuning. In the first setting,      In the second method, we randomly select 500
models directly produce the answer given an im-              samples from SpatialMQA and invite three college
age, a question, and multiple options. Note that             students (different from the annotation team in Secall models except BLIP receive a task prompt, as             tion 3.3) to answer the questions. The final answer
described in Appendix C. In the second setting,              is determined by majority voting, and if the three
we use different tuning strategies: full parameter           students provide different answers, the question is
updates for BLIP and parameter-efficient tuning              considered incorrect.


<!-- PK PAGE 6 doc=math_p4 -->
Table 5: Results (Acc %) grouped by question types and answer types. Q1, Q2, and Q3 represent the question
from the “Out-of-image” perspective, “first-person” , and “third-person” perspectives in images. Ax, Ay, and Az
represent answers involving “left of” and “right of” on the X-axis, “in front of” and “behind” on the Y-axis, and
“on/above” and “below” on the Z-axis. † and ‡ denote the best few-shot settings in the Main Results, specifically
3-shot and 1-shot, respectively.
  Model                 Settings         Q1            Q2            Q3          Ax         Ay          Az
                                                Open-source MLLMs
  BLIP-vqa-base           Full          40.93         36.10         52.94       39.65      25.64       28.57
  BLIP2-opt-2.7B         LoRA           32.30         28.47         23.53       11.65      49.04       53.97
  InstructBLIP-3B        LoRA           44.47         40.68         44.12       36.17      48.72       50.79
  mPLUG-Owl-7B           LoRA           37.83         28.14         17.65       17.74      46.47       50.79
  IDEFICS-9B             LoRA           33.41         26.95         14.71       15.13      45.51       45.50
  LLaVA1.5-7B            LoRA           53.14         40.99         64.71       55.71      29.64       48.13
  SpaceLLaVA             LoRA           54.87         42.37         58.82       56.00      51.85       31.41
                                                Closed-source MLLMs
                         0-shot         42.73         26.83         50.00       39.17      26.25       41.00
  Gemini-1.5-flash
                       Few-shot†        48.18         26.83         52.94       49.58      21.88       36.00
                         0-shot         44.09         33.74         61.76       37.08      47.50       36.00
  GPT-4o
                       Few-shot‡        45.00         32.52         47.06       38.75      38.75       40.00
                                                   Other Methods
  Random Choose             -           30.00         24.80         26.47       25.42      27.50       31.00
                        Text-only       25.91         23.17         23.53       23.75      25.00       25.00
  Human
                            -           98.51         98.24         100.00      98.61      97.79       98.68
5.2   Settings and Metrics                                    Among closed-source LLMs, GPT-4o performs
The hyperparameter settings for the open-source               best with zero-shot learning, but its accuracy deMLLMs are detailed in Appendix E. These models                creases as the number of ICL samples increases. In
are executed on a workstation with two NVIDIA                 contrast, Gemini’s accuracy improves with more
A100-PCIE-40GB GPUs. In the experiments, we                   ICL samples. The reasons for these opposing rereport four metrics: precision (P), recall (R), F1,           sults are explained in “Impact of different ICL exand accuracy (Acc).                                           amples” of Section 5.4. 3) In other methods, when
                                                              humans answer questions without images, the accu5.3   Main Results                                            racy is 24.40% (based on a random selection of 500
We perform all baseline methods on our Spa-                   samples from the test set), which is comparable to
tialMQA benchmark. The experimental results                   random selection and significantly lower than the
are presented in Table 4. From the table, we no-              accuracy achieved with images. This indicates that
tice that: 1) All MLLMs perform poorly on Spa-                our benchmark heavily relies on images to answer
tialMQA, with significant room for improvement                questions. In other words, our benchmark rarely
compared to the human accuracy of 98.40%. The                 includes questions that can be answered solely with
best-performing model, SpaceLLaVA with LoRA,                  prior knowledge. Furthermore, manual annotation
achieves only 48.14% accuracy, despite being fine-            reveals that only 3 out of 500 samples could be
tuned on LLaVA with a large amount of spatial                 answered using prior knowledge alone.
VQA samples. Notably, LLaVA’s visual instruction
                                                              5.4   Detailed Analysis
tuning also involves incorporating coordinate data
with bboxes and corresponding captions. This indi-            Group analysis of question types and answer
cates that our SpatialMQA benchmark presents a                types. As mentioned in Section 3.2, question types
significant challenge for MLLMs. 2) Among open-               include “Out-of-image” (denoted as Q1) and “Insource MLLMs, instruction-tuned models excel in               image” (further divided into “first-person perspecspatial relation reasoning compared to those with-            tive” (Q2) and “third-person perspective” (Q3)).
out instruction tuning. For instance, the instruction-        In addition, we classify the answer types as Ax,
tuned SpaceLLaVA shows a 16.82% accuracy im-                  Ay, and Az, representing answers involving left
provement over its non-instruction-tuned version.             of and right of on the X-axis, in front of and be-


<!-- PK PAGE 7 doc=math_p4 -->
Table 6: Results (Acc %) for different ICL.       Table 7: Impact (Acc %) of images and option counts.
   Model              Settings   Alig.     Misalig.                                                 All          Part
                       1-shot    36.42       35.16        Random              -                 17.20            27.20
   Gemini-1.5-flash    2-shot    37.14       35.94
                       3-shot    38.28       37.09                            Q+O               23.20            27.60
                                                          Gemini-1.5-flash
                                                                              I+Q+O             29.60            35.40
                       1-shot    39.09       37.75
   GPT-4o              2-shot    39.43       36.96                            Q+O               26.40            27.80
                                                          GPT-4o
                       3-shot    39.88       35.87                            I+Q+O             33.80            40.20
hind on the Y-axis, and on/above and below on            50%                       47%
                                                                             41%           SpaceLLaVA             GPT-4o
the Z-axis, respectively. The results are listed in      40%
Table 5. From the table, we observe that human
reasoning abilities in spatial relations are gener-      30%          23%
ally consistent across different groups, but all mod-    20%    17%                      16%          15% 14%
                                                                                                                  11%
els display significant performance discrepancies                                              8%                        8%
                                                         10%
within these groups. For instance, human scores for
Ax, Ay, and Az are consistently around 98%, while         0%
SpaceLLaVA with LoRA exhibits a maximum per-                       IRSO       FRS         LCR             IILN     Other
formance gap of 24.59% in these groups. This                       Figure 3: Distribution of error types.
suggests that it is essential to improve the model’s
reasoning abilities in various spatial relations in a
balanced manner.                                        form similarly to random selection and significantly
                                                        underperform MLLMs with I+Q+O. This indicates
   Impact of different ICL examples. We intro-
                                                        that our benchmark heavily relies on image inputs
duce ICL samples for closed-source MLLMs in
                                                        and cannot depend solely on the model’s prior
experiments. To explore the impact of different
                                                        knowledge. 2) MLLMs with Q+O still perform
ICL examples, we divide them into two categories:
                                                        significantly better than random selection (17.20%)
aligned with the input question type and misaligned.
                                                        when given a fixed set of six options. This is beFor evaluation, we randomly selected 100 samples
                                                        cause some of the options in this set contradict comfor question types Q1, Q2, and Q3 respectively (if
                                                        mon sense, allowing the model to exclude them,
a certain category has fewer than 100 samples, we
                                                        even without image inputs. This observation is why
use all available samples). The results are listed in
                                                        we remove options that contradict commonsense
Table 6. From the results, we notice that models
                                                        from our benchmark.
with aligned ICL examples outperform those with
misaligned ICL examples. For instance, GPT-4o
with aligned 3-shot ICL examples improves ac-           5.5    Error Types
curacy by 4.01% over misaligned ones. Notably,
the decrease in GPT-4o’s spatial relation reasoning     To guide future research in spatial relation reaability, mentioned in Section 5.3, may be due to        soning for MLLMs, we analyze 200 error samthe misalignment of examples with the input ques-       ples produced by SpaceLLaVA and GPT-4o on
tion type. In contrast, Gemini’s performance im-        SpatialMQA. After manual classification, error
proves with more ICL examples in the misaligned         types are divided into four categories and other
setting. This could indicate that Gemini effectively    errors: (a) incorrect recognition of subjects and obutilizes a wider range of examples to enhance gen-      jects (IRSO), (b) failure in perspective substitution
eralization and extract relevant features despite the   (FRS), (c) lack of commonsense reasoning ability
misalignment.                                           (LCR), and (d) incorrect identification of spatial
  Impact of images and option counts. We con-           relations for letters and numbers (IILN). The erduct analysis experiments by either removing im-        ror distribution is shown in Figure 3. We observe
ages (I) in the input or using a fixed count of six     that FRS errors are the most frequent, with IRSO,
options (O). The results are listed in Table 7. From    LCR, and IILN errors being comparable. To illusthe results, we draw the conclusions: 1) MLLMs          trate these error types more intuitively, we provide
with Q+O, when tested with varying options, per-        examples, as shown in Figure 4.


<!-- PK PAGE 8 doc=math_p4 -->
SpaceLLaVA
                          Q: Where is the spoon located relative                                Q: If you were the cat in the image,
                          to the slice of bread?                                                where would the keyboard relative to
                                                                          (b)                   you?
    (a)                   O: in front of, behind, left of, right of
                                                                                                O: in front of, behind, left of, right of
                          A: behind          P: left of                                         A: in front of     P: right of
                   Q: If you were the man wearing the hat in the                          Q: For the black letters on the white sign in
                   image, where would the sun be located                                  the middle of the image, where is the letter E
                   relative to you?                                                       located relative to the letter Y?
    (c)                                                                   (d)
                   O: in front of, behind, left of, right of                              O: on/above, below, left of, right of
                   A: in front of       P: behind                                         A: on/above      P: below
                                                                        GPT-4o
                       Q: Where is the fork located relative to the                             Q: If you were the cat in the image,
                       knife?                                                                   where would the goblet be located in
                                                                                                your body?
    (a)                O: in front of, behind, left of, right of
                                                                          (b)                   O: on/above, below, in front of, behind,
                                                                                                left of, right of
                       A: left of            P: right of                                        A: in front of       P: left of
                            Q: If you were the baby in the image,                        Q: For the black letters on the white fence in
                            where would the sun be at you at this                        the image, where is the letter F located
                            time?                                                        relative to the letter B?
    (c)                                                                   (d)
                            O: in front of, behind, left of, right of                    O: on/above, below, left of, right of
                            A: in front of          P: behind                            A: on/above         P: left of
Figure 4: Error examples. (a), (b), (c), and (d) describe examples of the IRSO, FRS, LCR, and IILN types,
respectively. “A” and “P” represent the ground truth answer and predicted answer.
6    Related Work                                                          on out-of-image perspectives and do not always an-
                                                                           notate samples based on the objective world. Note
Spatial relation reasoning. Identifying spatial                            that SpatialVLM’s test set is small and not yet openrelations between subjects and objects in images                           sourced. EgoThink is limited to the first-person
is crucial for understanding the world. Bench-                             perspective, with fewer than 100 samples in its spamarks for this task fall into two main types:                              tial reasoning benchmark. While VSR considers
those with bboxes and those without. The for-                              different perspectives, only 6% of its data covers
mer are sourced from either synthetic or real-                             them, and some questions can be answered using
world scenes. CLEVR (Johnson et al., 2017) and                             prior knowledge without images.
Rel3D (Goyal et al., 2020) are typical examples                               Multimodal large language models. With the
of synthesized benchmarks, but they do not accu-                           development of MLLMs, many researchers have
rately reflect real-world scenes. Hence, several                           applied these models to multimodal downstream
real-scene benchmarks have been proposed, in-                              tasks. MLLMs can be divided into two categories:
cluding SpatialVOC2K (Belz et al., 2018), Spa-                             closed- and open-source models. Typical closedtialSense (Yang et al., 2019), SpatialSense+ (Wen                          source MLLMs include GPT-4o and Gemini. Comet al., 2024), SpatialRGPT-Bench (Cheng et al.,                            mon methods to adapt these models for multi2024), NLVR2 (Suhr et al., 2017), COCO (Lin                                modal tasks mainly include ICL (Shukor et al.,
et al., 2014), and GQA (Hudson and Manning,                                2023; Liu et al., 2023b) and Chain-of-Thought
2019). However, they still use bboxes, which cause                         (CoT) (Zhang et al., 2024; Wang et al., 2024).
two problems: first, some complex spatial rela-                            Typical open-source MLLMs include BLIP2 (Li
tions can’t be fully captured with bboxes (Liu et al.,                     et al., 2023), LLaVA (Liu et al., 2024), and
2023a); second, bboxes make it easier for mod-                             SpaceLLaVA (Chen et al., 2024). Due to their
els to solve tasks without fully understanding the                         relatively limited instruction-following capabiliimage (Wen et al., 2024). Typical benchmarks                               ties, open-source MLLMs often require instrucfor the latter include EmbSpatial-Bench (Du et al.,                        tion tuning for downstream tasks. This tuning can
2024), MME (Fu et al., 2023), SpatialVLM (Chen                             involve full parameter updates or minimal paramet al., 2024), EgoThink (Cheng et al., 2023), and                          eter updates, such as LoRA (Hu et al., 2021) and
VSR (Liu et al., 2023a). The first three focus only                        P-tuning v2 (Liu et al., 2021). Despite the promis-


<!-- PK PAGE 9 doc=math_p4 -->
ing progress of current MLLMs, they still perform        no harmful content, such as gender bias, racial dispoorly on our constructed SpatialMQA benchmark.          crimination, or inappropriate material.
7   Conclusion                                           Acknowledgments
We introduce SpatialMQA, a manually annotated            This paper was supported by the National Natumultimodal spatial relation reasoning benchmark          ral Science Foundation of China (No. 62306112),
based on COCO2017. To address the weak-                  Shanghai Sailing Program (No. 23YF1409400),
nesses of existing benchmarks, SpatialMQA is             and Shanghai Pilot Program for Basic Research
constructed without bboxes, involving perspective        (No. 22TQ1400100-20).
substitutions based on the objective world and excluding questions that can be answered solely by         References
model’s prior knowledge without images. We
implement a series of closed- and open-source            Josh Achiam, Steven Adler, Sandhini Agarwal, Lama
                                                           Ahmad, Ilge Akkaya, Florencia Leoni Aleman,
MLLMs and conducted extensive experimental                 Diogo Almeida, Janko Altenschmidt, Sam Altman,
analyses. The results indicate that SpatialMQA is a        Shyamal Anadkat, et al. 2023. Gpt-4 technical report.
challenging benchmark worth further exploration.           arXiv preprint arXiv:2303.08774.
                                                         Anja Belz, Adrian Muscat, Pierre Anguill,
Limitations                                                Mouhamadou Sow, Gaétan Vincent, and Yas-
                                                           sine Zinessabah. 2018. Spatialvoc2k: A multilingual
While SpatialMQA offers a valuable benchmark for           dataset of images with annotations and features for
evaluating current MLLMs, it has two main limita-          spatial relations between objects. In Proceedings
tions: 1) SpatialMQA is created to assess the perfor-      of the 11th International Conference on Natural
                                                           Language Generation, pages 140–145.
mance of MLLMs in spatial relation reasoning. To
ensure high data quality, we design a manual anno-       Wenxiao Cai, Yaroslav Ponomarenko, Jianhao Yuan, Xitation process, which guarantees a well-constructed        aoqi Li, Wankou Yang, Hao Dong, and Bo Zhao.
and reliable test set. However, this method limits         2024.    Spatialbot: Precise spatial understand-
                                                           ing with vision language models. arXiv preprint
the scale of the training set, making it insufficient      arXiv:2406.13642.
for fully fine-tuning MLLMs. Although several
automatic annotation tools for spatial relation rea-     Boyuan Chen, Zhuo Xu, Sean Kirmani, Brain Ichter,
                                                           Dorsa Sadigh, Leonidas Guibas, and Fei Xia. 2024.
soning are mentioned in (Chen et al., 2024; Cheng          Spatialvlm: Endowing vision-language models with
et al., 2024; Cai et al., 2024), they are unsuitable       spatial reasoning capabilities. In Proceedings of the
for SpatialMQA due to its complex real-world sam-          IEEE/CVF Conference on Computer Vision and Patples from multiple perspectives. 2) SpatialMQA             tern Recognition, pages 14455–14465.
currently covers six basic spatial relations (left of,   An-Chieh Cheng, Hongxu Yin, Yang Fu, Qiushan
right of, in front of, behind, on/above, and below),       Guo, Ruihan Yang, Jan Kautz, Xiaolong Wang, and
and does not include more complex relations. We            Sifei Liu. 2024. Spatialrgpt: Grounded spatial reafocus on these six because experimental results            soning in vision language model. arXiv preprint
                                                           arXiv:2406.01584.
show they already pose significant challenges to
current MLLMs. Mastering these fundamental re-           Sijie Cheng, Zhicheng Guo, Jingwen Wu, Kechen Fang,
lations is essential before tackling more complex           Peng Li, Huaping Liu, and Yang Liu. 2023. Can
                                                            vision-language models think from a first-person perspatial reasoning tasks.
                                                            spective? arXiv preprint arXiv:2311.15596.
Ethical Statement                                        Wenliang Dai, Junnan Li, Dongxu Li, Anthony
                                                          Meng Huat Tiong, Junqi Zhao, Weisheng Wang,
Our SpatialMQA benchmark is built upon                    Boyang Li, Pascale N Fung, and Steven Hoi.
COCO2017 (Lin et al., 2014), which is licensed un-        2024. Instructblip: Towards general-purpose vision-
                                                          language models with instruction tuning. Advances
der the Creative Commons Attribution 4.0 License.         in Neural Information Processing Systems, 36.
This license allows us to distribute and re-annotate
the dataset, as long as the original work is properly    Mengfei Du, Binhao Wu, Zejun Li, Xuanjing Huang,
                                                          and Zhongyu Wei. 2024. Embspatial-bench: Benchcited. Hence, we release SpatialMQA under the             marking spatial understanding for embodied tasks
CC-BY 4.0 license. Additionally, we have care-            with large vision-language models. arXiv preprint
fully reviewed the benchmark to ensure it contains        arXiv:2406.05756.


<!-- PK PAGE 10 doc=math_p4 -->
Chaoyou Fu, Peixian Chen, Yunhang Shen, Yulei Qin,         Tsung-Yi Lin, Michael Maire, Serge Belongie, James
  Mengdan Zhang, Xu Lin, Zhenyu Qiu, Wei Lin, Jin-           Hays, Pietro Perona, Deva Ramanan, Piotr Dollár,
  rui Yang, Xiawu Zheng, Ke Li, Xing Sun, and Ron-           and C Lawrence Zitnick. 2014. Microsoft coco:
  grong Ji. 2023. Mme: A comprehensive evaluation            Common objects in context. In Computer Vision–
  benchmark for multimodal large language models.            ECCV 2014: 13th European Conference, Zurich,
  ArXiv, abs/2306.13394.                                     Switzerland, September 6-12, 2014, Proceedings,
                                                             Part V 13, pages 740–755. Springer.
Haoxiang Gao, Yaqian Li, Kaiwen Long, Ming Yang,
  and Yiqing Shen. 2024. A survey for founda-              Fangyu Liu, Guy Emerson, and Nigel Collier. 2023a.
  tion models in autonomous driving. arXiv preprint          Visual spatial reasoning. Transactions of the Associ-
  arXiv:2402.01105.                                          ation for Computational Linguistics, 11:635–651.
Ankit Goyal, Kaiyu Yang, Dawei Yang, and Jia Deng.         Haotian Liu, Chunyuan Li, Qingyang Wu, and Yong Jae
  2020. Rel3d: A minimally contrastive benchmark for         Lee. 2024. Visual instruction tuning. Advances in
  grounding spatial relations in 3d. Advances in Neural      neural information processing systems, 36.
  Information Processing Systems, 33:10514–10525.
                                                           Weihao Liu, Fangyu Lei, Tongxu Luo, Jiahe Lei, Shizhu
Zixian Guo, Bowen Dong, Zhilong Ji, Jinfeng Bai, Yi-         He, Jun Zhao, and Kang Liu. 2023b. Mmhqa-
  wen Guo, and Wangmeng Zuo. 2023. Texts as im-              icl: Multimodal in-context learning for hybrid ques-
  ages in prompt tuning for multi-label image recogni-       tion answering over text, tables and images. arXiv
  tion. In Proceedings of the IEEE/CVF Conference            preprint arXiv:2309.04790.
  on Computer Vision and Pattern Recognition, pages
  2808–2817.                                               Xiao Liu, Kaixuan Ji, Yicheng Fu, Weng Lam Tam,
                                                             Zhengxiao Du, Zhilin Yang, and Jie Tang. 2021. PZachary Hawes and Daniel Ansari. 2020. What explains         tuning v2: Prompt tuning can be comparable to fine-
  the relationship between spatial and mathematical          tuning universally across scales and tasks. arXiv
  skills? a review of evidence from brain and behavior.      preprint arXiv:2110.07602.
  Psychonomic bulletin & review, 27:465–482.
                                                           Michael J Proulx, Orlin S Todorov, Amanda TayEdward J Hu, Yelong Shen, Phillip Wallis, Zeyuan
                                                             lor Aiken, and Alexandra A de Sousa. 2016. Where
  Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang,
                                                             am i? who am i? the relation between spatial cog-
  and Weizhu Chen. 2021. Lora: Low-rank adap-
                                                             nition, social cognition and individual differences
  tation of large language models. arXiv preprint
                                                             in the built environment. Frontiers in psychology,
  arXiv:2106.09685.
                                                             7:158846.
Drew A Hudson and Christopher D Manning. 2019.
  Gqa: A new dataset for real-world visual reasoning       Mustafa Shukor, Alexandre Rame, Corentin Dancette,
  and compositional question answering. In Proceed-         and Matthieu Cord. 2023. Beyond task performance:
  ings of the IEEE/CVF conference on computer vision        evaluating and reducing the flaws of large multimodal
  and pattern recognition, pages 6700–6709.                 models with in-context-learning. In The Twelfth In-
                                                            ternational Conference on Learning Representations.
Justin Johnson, Bharath Hariharan, Laurens Van
  Der Maaten, Li Fei-Fei, C Lawrence Zitnick, and          Alane Suhr, Mike Lewis, James Yeh, and Yoav Artzi.
  Ross Girshick. 2017. Clevr: A diagnostic dataset           2017. A corpus of natural language for visual reason-
  for compositional language and elementary visual           ing. In Proceedings of the 55th Annual Meeting of the
  reasoning. In Proceedings of the IEEE CVPR, pages          Association for Computational Linguistics (Volume
  2901–2910.                                                 2: Short Papers), pages 217–223.
Hugo Laurençon, Daniel van Strien, Stas Bekman, Leo        Gemini Team, Rohan Anil, Sebastian Borgeaud,
  Tronchon, Lucile Saulnier, Thomas Wang, Siddharth          Yonghui Wu, Jean-Baptiste Alayrac, Jiahui Yu,
  Karamcheti, Amanpreet Singh, Giada Pistilli, Yacine        Radu Soricut, Johan Schalkwyk, Andrew M Dai,
  Jernite, et al. 2023. Introducing idefics: An open re-     Anja Hauth, et al. 2023. Gemini: a family of
  production of state-of-the-art visual language model,      highly capable multimodal models. arXiv preprint
  2023. URL https://huggingface. co/blog/idefics. Ac-        arXiv:2312.11805.
  cessed, pages 09–18.
                                                           Junjie Wang, Wei Li, Yinjian Wang, Ran Tao, and Qian
Junnan Li, Dongxu Li, Silvio Savarese, and Steven Hoi.       Du. 2023. Representation-enhanced status replay
  2023. Blip-2: Bootstrapping language-image pre-            network for multisource remote-sensing image clas-
  training with frozen image encoders and large lan-         sification. IEEE Transactions on Neural Networks
  guage models. In International conference on ma-           and Learning Systems.
  chine learning, pages 19730–19742. PMLR.
                                                           Lei Wang, Yi Hu, Jiabang He, Xing Xu, Ning Liu, Hui
Junnan Li, Dongxu Li, Caiming Xiong, and Steven              Liu, and Heng Tao Shen. 2024. T-sciq: Teaching
  Hoi. 2022. Blip: Bootstrapping language-image pre-         multimodal chain-of-thought reasoning via large lan-
  training for unified vision-language understanding         guage model signals for science question answering.
  and generation. In International conference on ma-         In Proceedings of the AAAI Conference on Artificial
  chine learning, pages 12888–12900. PMLR.                   Intelligence, volume 38, pages 19162–19170.


<!-- PK PAGE 11 doc=math_p4 -->
Chuan Wen, Dinesh Jayaraman, and Yang Gao. 2024.
  Can transformers capture spatial relations between
  objects? arXiv preprint arXiv:2403.00729.
Kaiyu Yang, Olga Russakovsky, and Jia Deng. 2019.
  Spatialsense: An adversarially crowdsourced bench-
  mark for spatial relation recognition. In Proceedings
  of the IEEE/CVF International Conference on Com-
  puter Vision, pages 2051–2060.
Qinghao Ye, Haiyang Xu, Guohai Xu, Jiabo Ye,
  Ming Yan, Yiyang Zhou, Junyang Wang, An-
  wen Hu, Pengcheng Shi, Yaya Shi, et al. 2023.
  mplug-owl: Modularization empowers large lan-
  guage models with multimodality. arXiv preprint
  arXiv:2304.14178.
Daoan Zhang, Junming Yang, Hanjia Lyu, Zijian Jin,
  Yuan Yao, Mingkai Chen, and Jiebo Luo. 2024.
  Cocot: Contrastive chain-of-thought prompting for
  large multimodal models with multiple image inputs.
  arXiv preprint arXiv:2401.02582.
Ge Zheng, Bin Yang, Jiajin Tang, Hong-Yu Zhou, and
  Sibei Yang. 2023. Ddcot: Duty-distinct chain-of-
  thought prompting for multimodal reasoning in lan-
  guage models. Advances in Neural Information Pro-
  cessing Systems, 36:5168–5191.


<!-- PK PAGE 12 doc=math_p4 -->
A      Question Templates                                         Table 9: Task prompts for open-source MLLMs.
In Section 3.2, we design three types of questions.              Models        Task prompt
For each type, we manually define several question               BLIP          Input: Image: <image>, Question: {questemplates, as listed in Table 8. Q1, Q2, and Q3                                tion}, Options: {options}. \n Output:
indicate that the sample’s question type is “Out-of-             BLIP2, In- You are currently a senior expert in spaimage”, the first-, and third-person perspective of              structBLIP, tial relation reasoning. \n Given an Im-
“In-image”, respectively.                                        IDEFICS,    age, a Question, and Options, your task
                                                                 mPLUG-      is to answer the correct spatial relation.
              Table 8: Question Template.                        Owl,        Note that you only need to choose one
                                                                 LLaVA,      option from all options without explain-
        Question Template                                        SpaceLLaVA ing any reason. \n Input: Image: <im-
$$
        Is ×× located to the left or right of ××?                            age>, Question: {question}, Options:
$$
$$
  Q1    Which side of ×× is ×× located on?                                   {options}. \n Output:
$$
$$
        Where is ×× located relative to ××?
$$
$$
        If you are ×× in the image, is ×× located to your    Table 10: Instruction data format for open-source
$$
  Q2    left or right?                                       MLLMs.
$$
        If you are ×× in the image, which side of ×× is
$$
$$
        ×× located on?                                           Models        Instruction
$$
$$
        If you are ×× in the image, where is ×× located          BLIP          Input: Image: <image>, Question: {ques-
$$
        relative to you?                                                       tion} Options: {options}. \n Output: {an-
$$
        If you are ×× in the image, from your perspective,                     swer}
$$
$$
  Q3    is ×× located to the left or right of ××?                BLIP2, In- You are currently a senior expert in spa-
$$
$$
        If you are ×× in the image, from your perspective,       structBLIP, tial relation reasoning. \n Given an Im-
$$
$$
        which side of ×× is ×× located on?                       IDEFICS,    age, a Question, and Options, your task
$$
$$
        If you are ×× in the image, from your perspective,       LLaVA,      is to answer the correct spatial relation.
$$
$$
        where is ×× located relative to ××?                      SpaceLLaVA Note that you only need to choose one
$$
                                                                             option from all options without explain-
                                                                             ing any reason. \n Input: Image: <imB      Statistics of Subject and Object Types                                age>, Question: {question}, Options:
                                                                             {options}. \n Output: {answer}
In Section 4, we use GPT-4o with ICL to extract
the subjects and objects in questions and classify               mPLUG-        The following is a conversation between
                                                                 Owl           a curious human and an AI assistant. \n
them into predefined categories. The process is as
                                                                               Human: <image> \n Human: You are curfollows. First, we adopt GPT-4o with ICL to ex-                                rently a senior expert in spatial relation
tract the subject and object of each question in Spa-                          reasoning. \n Given an Image, a QuestialMQA. Second, we randomly select 500 samples                                tion, and Options, your task is to answer
from the entire benchmark and manually define                                  the correct spatial relation. Note that you
common types, in addition to the original 80 types                             only need to choose one option from all
                                                                               options without explaining any reason. \n
from COCO2017, resulting in a total of 90 types.                               Input: Image: <image>, Question: {quesThird, we employ GPT-4o with ICL to classify ev-                               tion}, Options: {options}. \n Output: \n
ery subject and object into these 90 types. Finally,                           A: {answer}
samples that are not classified into predefined types
are manually categorized into new types.
                                                             E      Hyperparameter Settings
C      Details of Open-source MLLMs
                                                             Details of the hyperparameter settings for openIn Section 5.1, we consider open-source MLLMs as             source MLLMs are presented in Table 12.
baseline models. The task prompts and instruction
data format of these models are presented in Tables          F      Annotation Tool
9 and 10.                                                    To enhance annotation efficiency, we develop a tool
                                                             used for annotating (Figure 5) and checking (Figure
D      Details of Closed-source MLLMs
                                                             6) samples in SpatialMQA, as well as answering
In Section 5.1, we consider closed-source MLLMs              (Figure 7) questions in the test set for evaluators.
as baseline models. The task prompts of these                Each volunteer was compensated at a rate of $17
models are listed in Table 11.                               per hour.


<!-- PK PAGE 13 doc=math_p4 -->
Table 11: Task prompts for closed-source MLLMs.
              Task prompt
  Zero-shot   You are currently a senior expert in spatial
              relation reasoning. \n Given an Image, a
              Question, and Options, your task is to an-
              swer the correct spatial relation. Note that
              you only need to choose one option from all
              options without explaining any reason. \n
              Input: Image: <image>, Question: {ques-
              tion}, Options: {options}. \n Output:
  Few-shot    You are currently a senior expert in spa-
              tial relation reasoning. \n Given an Image,
              a Question, and Options, your task is to                              数据构建
              answer the correct spatial relation. Note         Figure 5: First-round annotation page in our tool.
              that you only need to choose one option
              from all options without explaining any rea-
              son. \n Given the following 3 examples
                                                                                    数据构建
              to learn the spatial relation reasoning task:
              \n Example1: Input: Image: <image> \n
              Question: For the clock in the image, does
              the hour hand point above or below the 9
              scales?, Options: on/above; below. \n Out-
              put: above. \n Example2: ... \n Example3:
              ... \n Input: Image: <image> \n Question:
              {question}, Options: {options}. \n Output:
  Text-only   You are currently a senior expert in spatial
                                                                                    数据审阅
              relation reasoning. \n Given an Image, a
              Question, and Options, your task is to an-
              swer the correct spatial relation. Note that
              you only need to choose one option from
              all options without explaining any reason.                            数据审阅
              \n Input: Question: {question}, Options:        Figure 6: Second-round checking and third-round re-
              {options}. \n Output:                           view pages in our tool.
Table 12: Hyperparameter settings for open-source
MLLMs. “Ep”, “BS”, “ES”, “LR”, “Opt”, “LR.
                                                                                                                     数据测
S”, “PAW8”, “ExpLR” and “LD” stand for “Epochs”,
“Batch Size”, “Early Stop”, “Learning Rate”, “Optimizer”, “LR Schedule”, “Paged_Adamw_8bit”, “ExponentialLR”, and “Linear Decay”, respectively.
 Model            Ep BS ES        LR       Opt       LR. S
 BLIP             30   8     5   6e-7    AdamW      ExpLR
 BLIP2            30   8     5   4e-5    AdamW      ExpLR
 InstructBLIP     30   8     5   4e-5    AdamW      ExpLR
 mPLUG-Owl        10   8     -   5e-5    AdamW       LD
 IDEFICS          10   8     -   2e-4     PAW8       LD           Figure 7: Human evaluation page in our tool.
 LLaVA            10   8     -   2e-4    AdamW      Cosine
 SpaceLLaVA       10   8     -   2e-4    AdamW      Cosine
<!-- PK END doc=math_p4 -->
