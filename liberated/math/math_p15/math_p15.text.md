PKvNext Document

KEY: math_p15 | math |  | 0bcd6c82 | 6 | /papers/FontIdentificationinHistoricalDocumentsUsingActiveLearning.pdf
<!-- PK START doc=math_p15 -->


<!-- PK PAGE 1 doc=math_p15 -->
Font Identification in Historical Documents Using Active Learning
 Anshul Gupta1, Ricardo Gutierrez-Osuna1, Matthew Christy2, Richard Furuta1, Laura Mandell2
                                1Department of Computer Science and Engineering, Texas A&M University
                               2Initiative for Digital Humanities, Media, and Culture, Texas A&M University
                                          {anshulg, rgutier, mchristy, furuta, mandell}@tamu.edu
                            Abstract                                    ern printing, but these two font classes have evolved into
                                                                        multiple subclasses since the first printed book. Knowing
  Identifying the type of font (e.g., Roman, Blackletter) used          the font type and characteristics for each document in a
  in historical documents can help optical character                    collection can substantially improve the performance of
  recognition (OCR) systems produce more accurate text                  OCR systems (La Manna et al. 1999, Imani et al. 2011). In
  transcriptions. Towards this end, we present an active-               large collections, however, hand-tagging each individual
  learning strategy that can significantly reduce the number of
                                                                        document, page and text region according to its font be-
  labeled samples needed to train a font classifier. Our
  approach extracts image-based features that exploit                   comes prohibitive. As an example, the Eighteenth Century
  geometric differences between fonts at the word level, and            Collections Online (ECCO) and Early English Books
  combines them into a bag-of-word representation for each              Online (EEBO) databases –two of the largest collections
  page in a document. We evaluate six sampling strategies               available—contain over 45 million pages.
  based on uncertainty, dissimilarity and diversity criteria, and          To address this problem, we present a font-identification
  test them on a database containing over 3,000 historical              system that can be used to automatically tag individual
  documents with Blackletter, Roman and Mixed fonts. Our
  results show that a combination of uncertainty and diversity
                                                                        documents within a large collection according to their
  achieves the highest predictive accuracy (89% of test cases           fonts1. Font identification is best formulated as a super-
  correctly classified) while requiring only a small fraction of        vised classification problem, and as such it requires labeled
  the data (17%) to be labeled. We discuss the implications of          data for model building. Classification models work best
  this result for mass digitization projects of historical              when they have sufficient labelled data that represent the
  documents.                                                            diversity of exemplars in the corpus. In our case, however,
                                                                        obtaining large amounts of labeled data from a corpus of
                        Introduction                                   45 million page images, with varied font types, is a dauntDigitization provides easy access to most of the documents              ing task. For this reason, we propose an active-learning
published in the modern era, from texts to images and vid-              approach to optimize the hand labeling process. Active
eo. By comparison, printed historical documents—                        learning is a mixed-initiative paradigm where a machine
everything from pamphlets to ballads to multi-volume po-                learning (ML) algorithm and a human work together duretry collections in the hand-press period (roughly 1475-                ing model building: the ML algorithm suggests a few high1800)—are difficult to access by all but the most devoted               value unlabeled exemplars, these are passed to the human
scholars. The need to create machine-searchable collec-                 to obtain labels, the model is adapted based on these newtions has accelerated work on Optical Character Recogni-                ly-labeled exemplars, and the process is repeated until the
tion (OCR) of historical documents.                                     model converges.
   OCR of historical documents is a challenging task, part-                The remaining parts of this document are organized as
ly due to the physical integrity of the documents and the               follows. First, we review the characteristics of historical
quality of the scanned images, but also because of the font             fonts and how they may be exploited for automated classicharacteristics. Historical documents in the hand-press                 fication. Next, we describe the proposed active-learning
period have irregular fonts, and show large variations within a single font class since the early printing processes had           1
                                                                          This work is part of the Early Modern OCR Project (eMOP) at Texas
not been standardized. Blackletter (or Gothic) and Roman                A&M University (http://emop.tamu.edu), whose overarching goals are to
font classes are the two main font types used in early mod-             produce accurate transcriptions for the ECCO/EEBO collections and
                                                                        create tools (dictionaries, workflows, and databases) that can be used for
                                                                        OCR'ing other collections of early modern texts at libraries and museums
                                                                        elsewhere.


<!-- PK PAGE 2 doc=math_p15 -->
methodology, including the feature extraction process, the                name suggests, mono-font OCR systems deal with a single
sampling strategies used to select informative unlabeled                  font; as a result, they tend to have high recognition accurainstances, and the classification model. Then, we present                 cy. In contrast, omni-font OCR systems can recognize text
an experimental comparison on a database containing over                  printed in any font, but they generally show very poor
3,000 documents with Roman and Blackletter fonts. Our                     recognition accuracy. Finally, multi-font OCR systems
results show that active learning can achieve a classifica-               work on a set of fonts and can produce good results protion accuracy of 89% on test data using a small fraction                  vided the font classes have good separability.
(17%) of the training corpus. The article concludes with a                   OCR systems work well with modern documents, but
discussion of these results and directions for future work.               not for historical documents. The fonts and layout of the
                                                                          historical documents vary substantially from one document
           Background and Related work                                    to other, which makes training a single high-performance
                                                                          OCR engine difficult. Ait-Mohand et al. (2010) proposed
                                                                          an HMM-based multi-font OCR system that modifies its
Historical fonts and their characteristics
                                                                          HMM model for each document to better recognize a speHistorical fonts can be broadly categorized in one of two                 cific font class. When tested on a dataset with 17 modern
categories: Blackletter or Roman. The name Blackletter                    font classes, the authors reported a 98% recognition rate,
refers to a highly ornamental script style of calligraphy that            which is very close to the recognition rates of single-font
was widely used in Europe between the 12th and 17th centu-                OCR systems (99%). An alternative to adapting a multiries. To make printed books look similar to hand-lettered,                font OCR model is to train multiple mono-font OCR sysJohann Gutenberg created font sets based on Blackletter                   tems and direct documents to the respective OCR engine.
(or Gothic) style for the first printing press between 1439               This requires, however, that the font class of each docuand 1455. Blackletter fonts have tall, narrow letters, with               ment be identified in advance.
sharp, straight, angular lines. Characters typically do not                  In an extensive literature survey, Ghosh et al. (2010) orconnect with each other, especially in round letters (see                 ganize font recognition methodologies into two categories
Figure 1a-b). Finally, line strokes also drastically differ in            based on the extracted features: structure-based, and apthickness, and the between-letter spacing is very small,                  pearance-based. Structure-based methods extract the conwhich makes text printed with this font quite difficult to                nected components of characters, and analyze their shape
read.                                                                     and structure to recognize particular fonts. In contrast, ap-
   Compared to Blackletter, Roman typefaces are signifi-                  pearance-based methods use features that can capture the
cantly less ornamental. The first Roman typefaces were                    visual appearance of the individual characters and the way
designed around 1460 by Nicholas Jenson with the inten-                   they are grouped into words, lines and paragraphs. These
tion of making an easier-to-read font. Roman fonts take                   two categories are further divided according to whether
space proportional to their shape, put less emphasis on                   they operate at the document, page, paragraph, or word
angled strokes, and possess serifs. They have curved                      level. Rani et al. (2013) presented a character-level font
strokes, which are also the thinnest parts of a character. In             identifier. Using Gabor and gradient features and an SVMsummary, angled strokes, between-letter spacing, and                      classifier, they reported 99% average accuracy on a dataset
stroke width distribution provide information to discrimi-                with 19,000 images of characters and numerals from 17
nate between these two broad types of fonts.                              fonts for the English language, and 14 fonts for the Gur-
                                          Horizontal
                                                                          mukhi language.
              Thin stroke
                                          serifs                             Whether they are used to classify documents, words, or
  Thick                                                                   characters, font identification systems incur a large cost to
  stroke
                                                                          generate sufficient labeled data to train the classifier. Re-
   (a)     Angled strokes      (b)                     Similar vertical   cent studies, however, have shown that active learning can
                                                       stroke width
                                                                          be very effective in reducing the large overhead of labeling
                                                                          data (Schohn et al. 2000, Fu et al. 2013). Unsurprisingly,
                                                                          active learning has begun to garner attention in the docu-
                                                                          ment analysis community. For example, Bouguelia et al.
   (c)                         (d)
                                                                          (2013) proposed a semi-supervised active learning algo-
                                                                          rithm for stream-based classification of documents into
 Figure 1: (a-b) Characteristics of Blackletter and Roman                 multiple classes, such as bank checks, medical receipts,
         font; (c-d) Corresponding text snippets.                         invoices, or prescriptions. Compared to a model built with
                                                                          a fully labeled training dataset, active learning provided a
Related work                                                              2-3% precision boost while using on average only 36% of
OCR systems are divided into three groups according to                    the labeled data.
the number of fonts present in the document collection:
mono-font, multi-font, and omni-font systems. As the


<!-- PK PAGE 3 doc=math_p15 -->
Methods                                                         estimate of the stroke width. Since each row may have
                                                                                             multiple such stroke widths, we store the count 𝐶𝑖 for each
Figure 2 illustrates the overall font-identification system.
The process starts by selecting a set of seed training images                                row, and then compute the maximum 𝐶𝑚𝑎𝑥 . Next, we
$$
from the ECCO/EEBO collection, which are then passed                                         select rows where 𝐶𝑖 = 𝐶𝑚𝑎𝑥 , and calculate the trimmed
$$
through an OCR system –in our case, the open-source Tes-                                     mean and IQR over their respective stroke widths. Using
seract engine (Smith 2007). OCR outputs generally contain                                    these robust statistics and limiting the computation to rows
$$
a number of noisy bounding boxes (BB) around non-                                            with 𝐶𝑖 = 𝐶𝑚𝑎𝑥 provides further immunity to outliers.
$$
textual elements, such as pictures, decorative elements, or
bleed through. These noisy BBs can be problematic for                                        2. Slant line density
font-identification since they behave as outliers when                                       We estimate the number of slanted lines by applying the
computing features. For this reason, as a first step we apply                                Canny edge detector (Gonzalez et al. 2007) to each word
a de-noising algorithm (Gupta et al. 2015) to eliminate                                      image, followed by the Hough transform (Illingworth et al.
noisy BBs and return only those likely to contain text.                                      1988). We then compute the number of lines with slope in
$$
   Once text BBs have been identified, they undergo an                                       the range 45° ± 5° and −45° ± 5°, and divide it by the
$$
image preprocessing step that normalizes them by size (to                                    number of recognized characters in the word, which is
a height of 400 pixels), filters out salt-and-pepper noise                                   available from the output of the OCR engine. This results
(Gonzalez et al. 2007) and removes skew (Kavallieratou et                                    in an estimate of the slant line density for a word image—
al. 2002). Preprocessed word images are then passed to a                                     see Figure 3b.
feature extraction module, to be described in the next section–see Table 1. The resulting feature vectors (from all the
                                                                                                                            Mid + 20
word images in a page) are then vector quantized and com-                                     (a)                                      Mid   (b)
bined into a bag-of-words feature (BoF) representation for                                                                  Mid - 20
the page. These BoFs become the input to the font classifier.                                                                                              Figure 3: (a) Calculating mean and IQR character
   Starting with a small set of seed training images, we it-                                  width; (b) Results from the Hough transform; green line
eratively train the font classifier and then use it to select                                   segments indicate the detected angled straight lines.
the most informative (yet unlabeled) documents for the
human analyst to label next. This training-labeling process                                  3. Zernike moments
(active learning) is repeated until a performance criterion                                  Finally, we capture the visual appearance of each word
(e.g., a target precision/recall rate) is met.                                               using Zernike Moments (ZMs) (Khotanzad et al. 1990).
                                                                                             ZMs are the projection of the image onto an orthogonal
                         De-noising
            OCR                                                                              basis known as the Zernike polynomials (ZPs):
                              Feature           Select          Tag              Update
                  hOCR       extraction        samples        samples           classifier
                                                                                                                  𝑛+1              ∗
  TIFF
$$
                                                                                                         𝑍𝑚,𝑛 =       ∑ ∑ 𝐼(𝑥, 𝑦)𝑉𝑛𝑚                     (1)
$$
                                                                                                                   𝜋
                                  Preprocess
                                                    Extract word        Extract bag-of-                                 𝑥     𝑦
                                                   image features       word features                                               ∗
                                                                                             where 𝐼(𝑥, 𝑦) is the binary image, 𝑉𝑛𝑚    are the ZPs, and 𝑚
         Figure 2: Steps for active learning based font                                      and 𝑛 are the order of the ZMs. Following Tahmasbi et al.
                         identification.                                                     (2011), we compute the magnitude of first 6 ZMs along
                                                                                             with their transformations (a total of 15 features).
Word-level feature extraction
                                                                                                    Table 1: Features extracted from each word image
As summarized in Table 1, we extract three kinds of                                           Features                 Justification
features to capture font information at the word-image                                        Average (trimmed)        Roman fonts have smaller vertical
level: the stroke width of each letter, the density of slanted                                stroke width             stroke width than blackletter fonts
lines, and the visual appearance of the word.                                                 IQR                      Captures drastic differences in
                                                                                              stroke width             stroke width, typical of black letters
1. Average and IQR stroke width                                                               Slant line density       Blackletters fonts are characterized
We characterize the stroke width by its trimmed mean and                                                               by angled lines and serifs
                                                                                              Zernike                  Captures the overall shape (visual
IQR (interquartile range) on each word image. Namely, we
                                                                                              moments                  appearance) of each font
$$
scan 10% of the rows (41 rows; middle row ± 20 rows) of
$$
each preprocessed word image, and locate transitions from
background to foreground, and transitions from foreground                                    Page-level feature extraction: Bag-of-words model
to background –see green and red points in Figure 3a,                                        Bag-of-word features (BoFs) (Sivic et al. 2003) are widely
respectively. Difference in their x-coordinates serves as an                                 used to capture semantic information in images. BoFs are


<!-- PK PAGE 4 doc=math_p15 -->
usually extracted using small patches in the image, which                     by adding to the logistic cost function a cost derived from
$$
in our case correspond to the word images. To obtain a                        the LP model, which shifts the decision boundary to acBoF for each page, we apply k-means (k=20) to the distri-                     count for the distribution of unlabeled data –see Figure 4a.
$$
bution of local features (across all training documents),
vector quantize each word image, and compute the number                       2. Active sampling
of words assigned to each cluster. To achieve word-count
                                                                              The performance of active learning depends heavily on the
invariance, we normalize each BoFs by the total number of
                                                                              choice of sampling strategy (known as a query function)
words on the page.                                                            that selects the most informative instances for labeling. For
                                                                              this reason, our query function considers three separate
Active learning for font identification                                       criteria:
Active learning comprises of two parts: a base classifier
                                                                              a) Uncertainty. Following Settles (2012), unlabeled inand a sampling engine. The base classifier is trained on a
                                                                                 stances are selected according to the classifier’s uncersmall amount of labeled data (𝐿), and the sampling engine
                                                                                 tainty about their labels –see Figure 4b. In particular,
uses it to select a batch of the most informative instances
                                                                                 we compute uncertainty for an unlabeled data point 𝑈𝑘
(𝑋) from an unlabeled set (𝑈) for labelling. A human anno-
                                                                                 as the entropy of its class-posterior distribution
tator labels all instances in 𝑋, and these are added to 𝐿 to
                                                                                 p(y|𝑈𝑘 , 𝐿):
retrain the classifier. The entire process of training and
$$
sampling is repeated until convergence.                                            𝐻(𝑦|𝑈𝑘 , 𝐿) = − ∑ 𝑝(𝑦|𝑈𝑘 , 𝐿) log 𝑝(𝑦|𝑈𝑘 , 𝐿)    (3)
$$
                                                                                                    𝑦
                                       Class
                                        1           Labeled     UNC                where 𝐿 is the labeled data and 𝑦 is the label variable
                                        2
                                                    Unlabeled   DIS     DIV        that ranges over all possible labeling of 𝑈𝑘 .
Supervised logistic regression
                                                                              b) Dissimilarity to the labeled data. To promote explo-
                                                                                 ration, we also consider instances that lie in unex-
                                                                                 plored regions of feature space; see Figure 4b. For
                                                                                 each unlabeled instance (𝑈𝑘 ), we find the 5 most-
                                                                                 similar labeled instances (𝐿𝑛 ) based on LLP’s similari-
  Logistic label propagation                                                     ty matrix (𝑆𝑛𝑘 ). Samples with highest dissimilarity 𝐷𝑘
                                                                                 are selected for querying:
                                                                                                         5
                                                                                                      1
$$
                                                                                               𝐷𝑘 =     ∑ 1 − 𝑆𝑛𝑘                   (4)
$$
                                                                                                      5
                                                                                                        𝑛=1
               (a)               (b)                Feature space             c)   Diversity. At each iteration, our sampling engine se-
 Figure 4: (a) Example decision boundaries produced by                             lects a batch of 20 unlabeled instances. To prevent in-
  logistic regression and LLP (Kobayashi et al. 2012).                             stances within a batch from being too similar to each
      Filled markers represent labeled instances; (b)                              other, we incorporate a diversity metric that constructs
   Illustration of the different active sampling criteria.                         the batch 𝑋 as follows:
                                                                                   (1) Initialize 𝑋 with the unlabeled instance that has
1. Base classifier                                                                      the largest score: 𝐻(𝑦|𝑈𝑘 ) + 𝐷𝑘
                                                                                   (2) For each remaining unlabeled instance (𝑈𝑘 ), calWe use a modified label-propagation model proposed by
                                                                                        culate its diversity factor (𝐷′𝑘 ) as:
$$
Kobayashi et al. (2012) known as Logistic Label Propagation (LLP). In label propagation (LP), all training instances                                  𝐷′𝑘 = 𝑚𝑖𝑛(1 − 𝑆𝑛𝑘 )                 ( 5)
$$
                                                                                                        𝑛
(labeled+unlabeled) are treated as nodes in a fully connected graph, and labels are propagated to unlabeled data                                  where 𝑆𝑛𝑘 is the similarity between 𝑈𝑘 and the
points according to their proximity to the labeled data:                               𝑛𝑡ℎ sample already in 𝑋–see eq. (2)
                                                                                   (3) Select sample 𝑈𝑘 with the largest combined score
                                                      2
                                       ||𝑋𝑖 − 𝑋𝑗 ||                                    (𝐻(𝑦|𝑈𝑘 ) + 𝐷𝑘 + 𝐷′𝑘 ), and add it to 𝑋.
                                                                      (2)
$$
                     𝑆𝑖𝑗 = exp(−                          )                        (4) Repeat steps (2) and (3) above until 20 unlabeled
$$
                                               𝜎2
where 𝑋𝑖 and 𝑋𝑗 are the features vectors for document 𝑖                                instances have been selected.
and 𝑗, respectively, and 𝜎 is the bandwidth hyperparameter. A major drawback of LP is its computational                                                   Results
complexity during recall; LP must reconstruct the whole                       To evaluate the effectiveness of our font classifier, we desimilarity matrix for new instances, and then re-estimate                     vised two experiments to evaluate our feature set (Table 1)
their class-posteriors to predict their labels. In contrast,                  and determine the best active learning query function. In a
LLP trains a logistic classifier in a semi-supervised fashion                 first experiment, we examined whether the proposed fea-


<!-- PK PAGE 5 doc=math_p15 -->
tures can discriminate between Blackletter and Roman                                                            oracle2 that played the role of the human labeler. These
fonts at the word level. In a second experiment, we evalu-                                                      newly-labeled documents were added to the training set 𝐿,
ated the complete system using six possible active sam-                                                         the font classifier was retrained, and its performance was
pling strategies derived from combinations of three query                                                       tested on the 600 instances in the test set. We repeated this
criteria described in the previous section. For these exper-                                                    process until all unlabeled data was consumed, recording
iments, we created a dataset consisting of 3,272 document                                                       the size of the labeled data set and classifier accuracy. For
images from the ECCO/EEBO databases: 1,005 printed in                                                           comparison, we included a baseline system that iteratively
Blackletter, 1,768 in Roman, and 498 with text in both                                                          selected a random set of 20 documents. For evaluation
fonts (Mixed). Each of these documents was hand labeled                                                         purposes, the LLP bandwidth parameter was set to 300.
by domain experts on the eMOP team.                                                                             Each experiment was repeated 20 times with a new set of
                                                                                                                random seeds to get a stable performance estimate.
Evaluating word-image features                                                                                     To ascertain the relative merit and degree of compleTo compare the discriminatory power of the different                                                            mentarity of the three selection criteria, we report perforword-level feature sets, we randomly selected 500 Black-                                                        mance for each of them in isolation3 and for each of their
letter documents and 500 Roman documents, and extracted                                                         linear combinations:
$$
                                                                                                                             𝑆1 (𝑘) = 𝐻(𝑦|𝑈𝑘 , 𝐿)
$$
the 18 features shown in Table 1. We then trained a logistic
$$
regression classifier to predict the class label for each                                                                    𝑆2 (𝑘) = 𝐷𝑘
$$
$$
word. The threshold for the classifier output was selected                                                                   𝑆3 (𝑘) = 𝐻(𝑦|𝑈𝑘 , 𝐿) + 𝐷𝑘
$$
$$
by maximizing the accuracy through 5-fold cross-                                                                             𝑆4 (𝑘) = 𝐷𝑘 + 𝐷𝑘′
$$
$$
validation. Results are summarized in Figure 5a. The slant                                                                   𝑆5 (𝑘) = 𝐻(𝑦|𝑈𝑘 , 𝐿) + 𝐷𝑘′
$$
$$
angle density and character width (SLD-CW) feature set                                                                       𝑆6 (𝑘) = 𝐻(𝑦|𝑈𝑘 , 𝐿) + 𝐷𝑘′ + 𝐷𝑘
$$
achieves 58% classification rate, whereas the ZM feature
set achieves 81%. When the two feature sets are combined                                                        where 𝐻(𝑦|𝑈𝑘 , 𝐿) is the uncertainty measure, 𝐷𝑘′ is the
(ALL), classification performance improves modestly to                                                          diversity factor, and 𝐷𝑘 is the dissimilarity measure.
84%. These results indicate that all the extracted features                                                        Learning curves for these scoring functions and the
are important for font identification, and that they provide                                                    baseline random selection are shown in Figure 6a. The best
high between-class separability –even at the word level.                                                        performer is 𝑆5 (uncertainty+diversity), which requires 523
                                                                                                                labeled samples (17%) to achieve a maximum average test
            1                                                        Black        Roman           Mixed         accuracy of 89%. The uncertainty criterion alone (𝑆1 ) also
                                                   0.2
           0.8                                                                                                  performs well, achieving a maximum test accuracy of 88%
                                                   0.1
Accuracy
           0.6                                                                                                  using 503 labeled samples.
                                           PCA-2
                                                     0
           0.4                                                                                                     In a final analysis, we calculated the area under the
           0.2
                                                   -0.1
                                                                                                                curve (AUC) of each learning curve as a scalar perfor-
            0
                                                   -0.2
                                                                                                                mance measure for each active sampling approach. Results
                       ALL   ZM   SLD-CW           -0.3
                                                          -0.3 -0.2 -0.1     0    0.1 0.2   0.3     0.4   0.5   are summarized in Figure 6b. Based on the AUC values,
                 (a)                               (b)                           PCA-1
                                                                                                                the uncertainty criterion performs marginally better than
     Figure 5: (a) Cross-validated accuracy for classifiers                                                     the sampling based on uncertainty+diversity. The remain-
   trained using 18 features (ALL), Zernike moments (ZM),                                                       ing sampling techniques, all of which use dissimilarity,
  and slant line density and character width (SLD-CW); (b)                                                      perform notably worse. This may be attributed to the char-
  Principal components analysis of the dataset using page-                                                      acteristics of our dataset. As shown in Figure 5b, the distri-
  level features (BoFs); each point represents a document.                                                      bution of BoFs reveals a good degree of separability be-
                                                                                                                tween Roman and Blackletter fonts, with some overlap
Evaluating the active learning system                                                                           with the Mixed class. This arrangement of data makes exTo evaluate the overall system, we randomly selected 600                                                        ploration less useful because most of the information is
documents (200 per class) as a test set, and used the re-                                                       captured by instances at the class boundaries. As a result,
maining 2,672 documents as the training set. From these,                                                        active sampling strategies that involve exploration need
we randomly selected 3 labeled documents (one per class)                                                        more labeled data to reach a desired accuracy compared
as a seed-set (𝑋) to train the LLP font classifier; the re-                                                     with a more exploitative technique that samples at the class
maining 2,669 documents became the unlabeled set (𝑈).                                                           boundaries.
  After each step of training, the active learner selected a
batch with the 20 most informative documents in 𝑈 (based
on the scoring function), and queried their labels from an                                                      2
                                                                                                                  The oracle in this case was the training dataset itself, which had been
                                                                                                                fully labeled in advance.
                                                                                                                3
                                                                                                                  We do not consider Diversity in isolation because its primary use is to
                                                                                                                aid other sampling techniques to pick diverse unlabeled instances.


<!-- PK PAGE 6 doc=math_p15 -->
0.9
                                                                                                                  work will also explore the development of graphical user
                                                                                                                  interfaces and interactive machine learning strategies (e.g.
                              0.8
                                                                                                                  Cueflik (Fogarty et al. 2008)) to allow scholars to tag, ex-
                                                                                                                  plore and understand large document collections more effi-
      Average test accuracy
                              0.7
                                                                                                                  ciently.
                              0.6
(a)                                                                                              RANDOM
                                                                                                 UNC
                              0.5                                                                DIS
                                                                                                                                              References
                                                                                                 UNC+DIV          Ait-Mohand, K., L. Heutte, T. Paquet and N. Ragot (2010). Font
                                                                                                 UNC+DIV+DIS
                              0.4                                                                                 adaptation of an HMM-based OCR system. Proceedings of SPIE 7534,
                                                                                                 DIS+DIV
                                                                                                 UNC+DIS          Document Recognition and Retrieval XVII. 7534: 75340-75348.
                              0.3
                                 0                     500                          1000                   1500   Bouguelia, M.-R., Y. Belaïd and A. Belaïd (2013). A stream-based semi-
                                                             Size of labeled data                                 supervised active learning approach for document classification.
                               35
                                                                                                                  Proceedings of ICDAR. 611-615.
                               30
                                                                                                                  Fogarty, J., D. Tan, A. Kapoor and S. Winder (2008). CueFlik: interactive
                               25
                                                                                                                  concept learning in image search. Proceedings of SIGCHI. 29-38.
(b)                            20
                      AUC
                                                                                                                  Fu, Y., X. Zhu and B. Li (2013). "A survey on instance selection for
                               15
                                                                                                                  active learning." Knowledge and information systems 35(2): 249-283.
                               10
                                5
                                                                                                                  Ghosh, D., T. Dube and A. P. Shivaprasad (2010). "Script recognition—A
                                                                                                                  review." IEEE Trans. on Pattern Analysis and Machine Intelligence
                                0
                                     UNC+DIV   UNC+DIV+DIS   DIS+DIV        UNC            DIS       UNC+DIS      32(12): 2142-2161.
  Figure 6: (a) Learning curves and (b) normalized AUC                                                            Gonzalez, R. C. and R. E. Woods (2007) Digital image processing 3
    for different sampling techniques. Black line in (b)                                                          edition: Prentice Hall.
                 denotes random sampling.                                                                         Gupta, A., R. Gutierrez-Osuna, M. Christy, C. Boris, A. Loretta, L.
                                                                                                                  Grumbach, R. Furuta and L. Mandell (2015). Automatic assessment of
                                                       Discussion                                                 OCR quality in historical documents. Proceedings of AAAI. 1735-1741.
                                                                                                                  Illingworth, J. and J. Kittler (1988). "A survey of the Hough transform."
We have developed a font-identification system for histori-                                                       Computer vision, graphics, and image processing 44(1): 87-116.
cal documents that uses active learning to reduce the
                                                                                                                  Imani, M. B., M. R. Keyvanpour and R. Azmi (2011). "Semi-supervised
amount of labeled data required to train a classifier. The                                                        Persian font recognition." Procedia Computer Science 3: 336-342.
system extracts image-based features that capture differ-
                                                                                                                  Kavallieratou, E., N. Fakotakis and G. Kokkinakis (2002). "Skew angle
ences between Blackletter and Roman font families at the                                                          estimation for printed and handwritten documents using the Wigner–Ville
letter and word levels. When tested on a dataset containing                                                       distribution." Image and Vision Computing 20(11): 813-824.
500 Blackletter documents and 500 Roman documents, the                                                            Khotanzad, A. and Y. H. Hong (1990). "Invariant image recognition by
system achieves an 84% classification rate at the word lev-                                                       Zernike moments." IEEE Trans. on Pattern Analysis and Machine
el. These features are then combined into a single feature                                                        Intelligence. 12(5): 489-497.
vector for each document page through a bag-of-word fea-                                                          Kobayashi, T., K. Watanabe and N. Otsu (2012). "Logistic label
tures (BoFs) representation, and then used to train logistic                                                      propagation." Pattern Recognition Letters 33(5): 580-588.
label propagation (LLP) model.                                                                                    La Manna, S., A. Colia and A. Sperduti (1999). Optical font recognition
   We evaluated six different active sampling strategies                                                          for multi-font OCR and document processing. Proceedings of DEXA.
based on uncertainty, dissimilarity and diversity criteria,                                                       549-553.
and compared them against random active sampling. When                                                            Rani, R., R. Dhir and G. S. Lehal (2013). Script identification of pretested on a document collection with over 3,000 documents                                                         segmented multi-font characters and digits. Proceedings of ICDAR. 1150-
(Blackletter, Roman and Mixed), our results show that a                                                           1154.
combined uncertainty+diversity criterion can achieve an                                                           Schohn, G. and D. Cohn (2000). Less is more: Active learning with
89% classification accuracy on test using only a small frac-                                                      support vector machines. Proceedings of ICML. 839-846.
tion (17%) of all the training instances. Further analysis                                                        Settles, B. (2012). "Active learning." Synthesis Lectures on Artificial
(results not shown) reveals that most misclassification er-                                                       Intelligence and Machine Learning 6(1): 1-114.
rors (79%) occur for Mixed-font documents, with addition-                                                         Sivic, J. and A. Zisserman (2003). Video Google: A text retrieval
al errors arising due to italicized Roman fonts with slant                                                        approach to object matching in videos. Proceedings of ICCV. 1470-1477.
line density similar to Blackletter, as well as thin Blacklet-                                                    Smith, R. (2007). An Overview of the Tesseract OCR Engine.
ter fonts with mean and IQR character width comparable to                                                         Proceedings of ICDAR. 2: 629-633.
that of Roman fonts.                                                                                              Tahmasbi, A., F. Saki and S. B. Shokouhi (2011). "Classification of
   Our work has focused on font identification but can be                                                         benign and malignant masses based on Zernike moments." Computers in
easily adapted to identify other problems in historical doc-                                                      Biology and Medicine 41(8): 726-735.
ument collections, such as bleed through, graphic content,
musical scripts, and decorative page elements. Further
<!-- PK END doc=math_p15 -->
