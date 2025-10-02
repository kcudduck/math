PKvNext Document

KEY: math_p19 | math |  | 3f63490c | 9 | /papers/MachineLearningforMolecularandMaterialsScience.pdf
<!-- PK START doc=math_p19 -->


<!-- PK PAGE 1 doc=math_p19 -->
Review                                                                                                                                   https://doi.org/10.1038/s41586-018-0337-2
Machine learning for molecular and
materials science
­­Keith T. Butler1, Daniel W. Davies2, Hugh Cartwright3, Olexandr Isayev4* & Aron Walsh5,6*
    Here we summarize recent progress in machine learning for the chemical sciences. We outline machine-learning
    techniques that are suitable for addressing research questions in this domain, as well as future directions for the field.
    We envisage a future in which the design, synthesis, characterization and application of molecules and materials is
    accelerated by artificial intelligence.
T
        he Schrödinger equation provides a powerful structure–                                      generating, testing and refining scientific models. Such techniques are
        property relationship for molecules and materials. For a given                              suitable for addressing complex problems that involve massive combi-
        spatial arrangement of chemical elements, the distribution of                               natorial spaces or nonlinear processes, which conventional procedures
electrons and a wide range of physical responses can be described. The                              either cannot solve or can tackle only at great computational cost.
development of quantum mechanics provided a rigorous theoretical                                       As the machinery for artificial intelligence and machine learning
foundation for the chemical bond. In 1929, Paul Dirac famously proclaimed                           matures, important advances are being made not only by those in mainthat the underlying physical laws for the whole of chemistry are “completely                        stream artificial-intelligence research, but also by experts in other fields
known”1. John Pople, realizing the importance of rapidly developing                                 (domain experts) who adopt these approaches for their own purposes. As
computer technologies, created a program—Gaussian 70—that could                                     we detail in Box 1, the resources and tools that facilitate the application
perform ab initio calculations: predicting the behaviour, for molecules                             of machine-learning techniques mean that the barrier to entry is lower
of modest size, purely from the fundamental laws of physics2. In the 1960s,                         than ever.
the Quantum Chemistry Program Exchange brought quantum chemistry                                       In the rest of this Review, we discuss progress in the application of
to the masses in the form of useful practical tools3. Suddenly, experi-                             machine learning to address challenges in molecular and materials
mentalists with little or no theoretical training could perform quantum                             research. We review the basics of machine-learning approaches, idencalculations too. Using modern algorithms and supercomputers,                                       tify areas in which existing methods have the potential to accelerate
systems containing thousands of interacting ions and electrons can now                              research and consider the developments that are required to enable more
be described using approximations to the physical laws that govern the                              wide-ranging impacts.
world on the atomic scale4–6.
   The field of computational chemistry has become increasingly pre-                                Nuts and bolts of machine learning
dictive in the twenty-first century, with activity in applications as wide                          With machine learning, given enough data and a rule-discovery algoranging as catalyst development for greenhouse gas conversion, materials                            rithm, a computer has the ability to determine all known physical laws
discovery for energy harvesting and storage, and computer-assisted drug                             (and potentially those that are currently unknown) without human
design7. The modern chemical-simulation toolkit allows the properties                               input. In traditional computational approaches, the computer is little
of a compound to be anticipated (with reasonable accuracy) before it has                            more than a calculator, employing a hard-coded algorithm provided
been made in the laboratory. High-throughput computational screening                                by a human expert. By contrast, machine-learning approaches learn
has become routine, giving scientists the ability to calculate the properties                       the rules that underlie a dataset by assessing a portion of that data
of thousands of compounds as part of a single study. In particular, den-                            and building a model to make predictions. We consider the basic steps
sity functional theory (DFT)8,9, now a mature technique for calculating                             involved in the construction of a model, as illustrated in Fig. 1; this
the structure and behaviour of solids10, has enabled the development of                             constitutes a blueprint of the generic workflow that is required for the
extensive databases that cover the calculated properties of known and                               successful application of machine learning in a materials-discovery
hypothetical systems, including organic and inorganic crystals, single                              process.
molecules and metal alloys11–13.
   The emergence of contemporary artificial-intelligence methods has                                Data collection
the potential to substantially alter and enhance the role of computers in                           Machine learning comprises models that learn from existing (trainscience and engineering. The combination of big data and artificial intel-                          ing) data. Data may require initial preprocessing, during which missligence has been referred to as both the “fourth paradigm of science”14                             ing or spurious elements are identified and handled. For example, the
and the “fourth industrial revolution”15, and the number of applications                            Inorganic Crystal Structure Database (ICSD) currently contains more
in the chemical domain is growing at an astounding rate. A subfield of                              than 190,000 entries, which have been checked for technical mistakes
artificial intelligence that has evolved rapidly in recent years is machine                         but are still subject to human and measurement errors. Identifying
learning. At the heart of machine-learning applications lie statistical algo-                       and removing such errors is essential to avoid machine-learning
rithms whose performance, much like that of a researcher, improves with                             algorithms being misled. There is a growing public concern about
training. There is a growing infrastructure of machine-learning tools for                           the lack of reproducibility and error propagation of experimental data
1
  ISIS Facility, Rutherford Appleton Laboratory, Harwell Campus, Harwell, UK. 2Department of Chemistry, University of Bath, Bath, UK. 3Department of Chemistry, Oxford University, Oxford, UK.
4
  Eshelman School of Pharmacy, University of North Carolina at Chapel Hill, Chapel Hill, NC, USA. 5Department of Materials Science and Engineering, Yonsei University, Seoul, South Korea.
6
  Department of Materials, Imperial College London, London, UK. *e-mail: olexandr@olexandrisayev.com; a.walsh@imperial.ac.uk
                                                                                                                                   2 6 J U LY 2 0 1 8 | V O L 5 5 9 | N AT U R E | 5 4 7
                                                                     © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 2 doc=math_p19 -->
RESEARCH Review
  Box 1                                                                            can be used for more general analysis and classification of data or to
                                                                                   identify previously unrecognized patterns in large datasets17.
  Learning to learn
                                                                                   Data representation
  One of the most exciting aspects of machine-learning techniques is               Even though raw scientific data are usually numerical, the form in
  their potential to democratize molecular and materials modelling                 which data are presented often affects learning. In many types of
  by reducing the computer power and prior knowledge required for                  spectroscopy, the signal is acquired in the time domain, but for inter-
  entry. Just as Pople’s Gaussian software made quantum chemistry                  pretation it is converted to the frequency domain using the Fourier
  more accessible to a generation of experimental chemists,                        transform. Like scientists, a machine-learning algorithm might learn
  machine-learning approaches, if developed and implemented                        more effectively using one format than the other. The process of con-
  correctly, can broaden the routine application of computer                       verting raw data into something more suitable for an algorithm is called
  models by non-specialists. The accessibility of machine-learning                 featurization or feature engineering.
  technology relies on three factors: open data, open software                         The more suitable the representation of the input data, the more
  and open education. There is an increasing drive for open data                   accurately can an algorithm map it to the output data. Selecting how
  within the physical sciences, with an ideal best practice outlined               best to represent the data could require insight into both the underlying
  recently98,99. Some of the open software being developed is listed               scientific problem and the operation of the learning algorithm, because
  in Table 2. There are also many excellent open education resources               it is not always obvious which choice of representation will give the best
  available, such as massive open online courses (MOOCs).                          performance; this is an active topic of research for chemical systems18.
     fast.ai (http://www.fast.ai) is a course that is “making neural nets              Many representations are available to encode structures and properties.
  uncool again” by making them accessible to a wider community of                  One example is the Coulomb matrix19, which contains information
  researchers. One of the advantages of this course is that users start            on atomic nuclear repulsion and the potential energy of free atoms,
  to build working machine-learning models almost immediately.                     and is invariant to molecular translations and rotation. Molecular
  However, it is not for absolute beginners, requiring a working                   systems also lend themselves to descriptions as graphs20. In the solid
  knowledge of computer programming and high-school-level                          state, the conventional description of crystal structures that uses trans-
  mathematics.                                                                     lation vectors and fractional coordinates of the atoms is not appro-
     DataCamp (https://www.datacamp.com) offers an excellent                       priate for machine learning because a lattice can be represented in an
  introduction to coding for data-driven science and covers many                   infinite number of ways by choosing a different coordinate system.
  practical analysis tools relevant to chemical datasets. This course              Representations based on radial distribution functions21, Voronoi
  features interactive environments for developing and testing code                tessellations22 or property-labelled materials fragments23 are among
  and is suitable for non-coders because it teaches Python at the                  the new ways in which this problem is being tackled.
  same time as machine learning.
     Academic MOOCs are useful courses for those wishing to get                    Choice of learner
  more involved with the theory and principles of artificial intelligence          When the dataset has been collected and represented appropriately, it
  and machine learning, as well as the practice. The Stanford MOOC                 is time to choose a model to learn from it. A wide range of model types
  (https://www.coursera.org/learn/machine-learning) is popular,                    (or learners) exists for model building and prediction. Supervised-
  with excellent alternatives available from sources such as https://              learning models may predict output values within a discrete set (such
  www.edx.org (see, for example, ‘Learning from data (introductory                 as categorizing a material as a metal or an insulator) or a continuous
  machine learning)’) and https://www.udemy.com (search for                        set (such as polarizability). Building a model for the former requires
  ‘Machine learning A–Z’). The underlying mathematics is the topic of              classification, whereas the latter requires regression. A range of learn-
  a course from Imperial College London (https://www.coursera.org/                 ing algorithms can be applied (see Table 1), depending on the type of
  specializations/mathematics-machine-learning).                                   data and the question posed. It may be helpful to use an ensemble of
     Many machine-learning professionals run informative blogs                     different algorithms, or of similar algorithms with different values for
  and podcasts that deal with specific aspects of machine-learning                 their internal parameters (known as ‘bagging’ or ‘stacking’), to create a
  practice. These are useful resources for general interest as well as             more robust overall model. We outline some of the common algorithms
  for broadening and deepening knowledge. There are too many                       (learners) in the following.
  to provide an exhaustive list here, but we recommend https://                       Naive Bayes classifiers24 are a collection of classification algorithms
  machinelearningmastery.com and http://lineardigressions.com as                   based on Bayes’ theorem that identify the most probable hypothesis,
  a starting point.                                                                given the data as prior knowledge about the problem. Bayes’ theorem
                                                                                   provides a formal way of calculating the probability that a hypothesis
                                                                                   is correct, given a set of existing data. New hypotheses can then be
published in peer-reviewed scientific literature. In certain fields, such          tested and the prior knowledge updated. In this way, the hypothesis
as cheminformatics, best practices and guidelines have been established            (or model) with the highest probability of correctly representing the
to address these problems16.                                                       data can be selected.
   The training of a machine-learning model may be supervised,                        In k-nearest-neighbour25 methods, the distances between samples
semi-supervised or unsupervised, depending on the type and amount                  and training data in a descriptor hyperspace are calculated. They are
of available data. In supervised learning, the training data consist of sets       so called because the output value for a prediction relies on the values
of input and associated output values. The goal of the algorithm is to             of the k ‘nearest neighbours’ in the data, where k is an integer. Nearestderive a function that, given a specific set of input values, predicts the         neighbour models can be used in both classification and regression
output values to an acceptable degree of fidelity. If the available dataset        models: in classification, the prediction is determined by the class of
consists of only input values, unsupervised learning can be used in                the majority of the k nearest points; in regression, it is determined by
an attempt to identify trends, patterns or clustering in the data. Semi-           the average of the k nearest points.
supervised learning may be of value if there is a large amount of input               Decision trees26 are flowchart-like diagrams used to determine a
data, but only a limited amount of corresponding output data.                      course of action or outcome. Each branch of the tree represents a pos-
   Supervised learning is the most mature and powerful of these                    sible decision, occurrence or reaction. The tree is structured to show
approaches, and is used in the majority of machine-learning studies in             how and why one choice may lead to the next, with branches indicating
the physical sciences, such as in the mapping of chemical composition              that each option is mutually exclusive. Decision trees comprise a root
to a property of interest. Unsupervised learning is less common, but               node, leaf nodes and branches. The root node is the starting point of
5 4 8 | N AT U R E | V O L 5 5 9 | 2 6 J U LY 2 0 1 8
                                                        © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 3 doc=math_p19 -->
Review RESEARCH
                             Input                                                  Output
                                                                                                      values is often problematic. Consequently, the development of auto-
  First generation
 Structure-property        Structure              Local optimization                Property
                                                                                                      matic optimization algorithms is an area of active investigation, as is
     calculation                                      algorithm                                       their incorporation into accessible packages for non-expert users (see
                                                                                                      Table 2).
Second generation                                      Global
                                                                                    Structure,
 Crystal structure       Composition                 optimization
                                                                                    property
                                                                                                      Model optimization
    prediction                                        algorithm
                                                                                                      When the learner (or set of learners) has been chosen and predictions
                                                                                                      are being made, a trial model must be evaluated to allow for optimiza-
  Third generation
                         Chemical and
                                                                                Composition,          tion and ultimate selection of the best model. Three principal sources of
                                                                                 structure,
    Statistically
   driven design
                         physical data
                                                   Machine learning
                                                                                  property
                                                                                                      error arise and must be taken into account: model bias, model variance
                                                                                                      and irreducible errors, with the total error being the sum of these. Bias
                                                                                                      is the error from incorrect assumptions in the algorithm and can result
  (i) Data collection      (ii) Representation    (iii) Type of learning (iv) Model selection
  • Experiment              • Optimize format      • Supervised           • Cross-validation          in the model missing underlying relationships. Variance is sensitivity
  • Simulation              • Remove noise         • Semi-supervised      • Ensembles                 to small fluctuations in the training set. Even well-trained machine-
  • Databases               • Extract features     • Unsupervised         • Anomaly checks            learning models may contain errors due to noise in the training data,
                                                                                                      measurement limitations, calculation uncertainties, or simply outliers
Fig. 1 | Evolution of the research workflow in computational chemistry.                               or missing data. Poor model performance usually indicates a high bias
The standard paradigm in the first-generation approach is to calculate
                                                                                                      or a high variance, as illustrated in Fig. 2.
the physical properties of an input structure, which is often performed
via an approximation to the Schrödinger equation combined with local
                                                                                                         High bias (also known as underfitting) occurs when the model is not
optimization of the atomic forces. In the second-generation approach,                                 flexible enough to adequately describe the relationship between inputs
by using global optimization (for example, an evolutionary algorithm)                                 and predicted outputs, or when the data are insufficiently detailed to
an input of chemical composition is mapped to an output that contains                                 allow the discovery of suitable rules. High variance (or overfitting)
predictions of the structure or ensemble of structures that the combination                           occurs when a model becomes too complex; typically, this occurs as
of elements are likely to adopt. The emerging third-generation approach                               the number of parameters is increased. The diagnostic test for overis to use machine-learning techniques with the ability to predict                                     fitting is that the accuracy of a model in representing training data
composition, structure and properties provided that sufficient data are                               continues to improve, while the performance in estimating test data
available and an appropriate model is trained. Four stages of training a                              plateaus or declines.
machine-learning model with some of the common choices are listed in
                                                                                                         The key test for the accuracy of a machine-learning model is its
the bottom panel.
                                                                                                      successful application to unseen data. A widely used method for
                                                                                                      determining the quality of a model involves withholding a randomly
                                                                                                      selected portion of data during training. This withheld dataset, known
the tree. Both root and leaf nodes contain questions or criteria to be                                as a test set, is shown to the model once training is complete (Fig. 2).
addressed. Branches are arrows connecting nodes, showing the flow                                     The extent to which the output data in the validation set is accurately
from question to answer. Decision trees are often used in ensemble                                    predicted then provides a measure of the effectiveness of training.
methods (meta-algorithms), which combine multiple trees into one                                      Cross-validation is reliable only when the samples used for training
predictive model to improve performance.                                                              and validation are representative of the whole population, which may
   Kernel methods are a class of algorithms, the best known members                                   present problems if the sample size is small or if the model is applied
of which are support vector machine and kernel ridge regression27. The                                to data from compounds that are very different to those in the original
name ‘kernel’ comes from the use of a kernel function—a function that                                 dataset. A careful selection of methods for evaluating the transferability
transforms input data into a higher-dimensional representation that                                   and applicability of a model is required in such cases.
makes the problem easier to solve. In a sense, a kernel is a similarity
function provided by the domain expert: it takes two inputs and creates                               Accelerating the scientific method
an output that quantifies how similar they are.                                                       Whether through the enumeration and analysis of experimental data
   Artificial neural networks and deep neural networks28 loosely mimic                                or the codification of chemical intuition, the application of informatics
the operation of the brain, with artificial neurons (the processing unit)                             to guide laboratory chemists is advancing rapidly. In this section, we
arranged in input, output and hidden layers. In the hidden layers, each                               explore how machine learning is helping to progress and to reduce the
neuron receives input signals from other neurons, integrates those                                    barriers between chemical and materials design, synthesis, charactersignals and then uses the result in a straightforward computation.                                    ization and modelling. We also describe some of the important develConnections between neurons have weights, the values of which rep-                                    opments in the field of artificial intelligence for data-mining existing
resent the stored knowledge of the network. Learning is the process                                   literature.
of adjusting the weights so that the training data are reproduced as
accurately as possible.                                                                               Guiding chemical synthesis
   Whatever the model, most learners are not fully autonomous, requiring                              Organic chemists were among the first scientists to recognize the
at least some guidance. The values of internal variables (hyperparameters)                            potential of computational methods in laboratory practice. E. J. Corey’s
are estimated beforehand using systematic and random searches, or                                     Organic Chemical Simulation of Synthesis (OCSS) program29, develheuristics. Even modest changes in the values of hyperparameters can                                  oped 50 years ago, was an attempt to automate retrosynthetic analysis.
improve or impair learning considerably, and the selection of optimal                                 In a synthetic chemistry route, the number of possible transformations
Table 1 | Classes of machine-learning techniques and some chemical questions they could answer
 Class                         Bayesian                             Evolutionarya                  Symbolist                     Connectionist                Analogist
 Method                        Probabilistic inference              Evolving structures            Logical inference             Pattern recognition          Constrained optimization
 Algorithms include            Naive Bayes                          Genetic algorithm              Rules                         Artificial neural networks   Nearest neighbour
                               Bayesian networks                    Particle swarm                 Decision trees                Back propagation             Support vectors
 Chemical query                Is my new theory valid?              What molecule gives            How do I make this            What compound did I          Find a structure–property
                                                                    this property?                 material?                     synthesize?                  relation
The classes shown were chosen following ref. 97.
a
  Although evolutionary algorithms are often integrated into machine-learning procedures, they form part of a wider class of stochastic search algorithms.
                                                                                                                                       2 6 J U LY 2 0 1 8 | V O L 5 5 9 | N AT U R E | 5 4 9
                                                                       © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 4 doc=math_p19 -->
RESEARCH Review
Table 2 | Publicly accessible learning resources and tools related to machine learning
  Name                 Description                                                                                      URL
  General-purpose machine-learning frameworks
  Caret                Package for machine learning in R                                                                https://topepo.github.io/caret
  Deeplearning4j       Distributed deep learning for Java                                                               https://deeplearning4j.org
  H2O.ai               Machine-learning platform written in Java that can be imported as a Python or R library          https://h2o.ai
  Keras                High-level neural-network API written in Python                                                  https://keras.io
  Mlpack               Scalable machine-learning library written in C++                                                 https://mlpack.org
  Scikit-learn         Machine-learning and data-mining member of the scikit family of toolboxes built around the       http://scikit-learn.org
                       SciPy Python library
  Weka                 Collection of machine-learning algorithms and tasks written in Java                              https://cs.waikato.ac.nz/ml/weka
  Machine-learning tools for molecules and materials
  Amp                  Package to facilitate machine learning for atomistic calculations                                https://bitbucket.org/andrewpeterson/amp
  ANI                  Neural-network potentials for organic molecules with Python interface                            https://github.com/isayev/ASE_ANI
  COMBO                Python library with emphasis on scalability and efficiency                                       https://github.com/tsudalab/combo
  DeepChem             Python library for deep learning of chemical systems                                             https://deepchem.io
  GAP                  Gaussian approximation potentials                                                                http://libatoms.org/Home/Software
  MatMiner             Python library for assisting machine learning in materials science                               https://hackingmaterials.github.io/matminer
  NOMAD                Collection of tools to explore correlations in materials datasets                                https://analytics-toolkit.nomad-coe.eu
  PROPhet              Code to integrate machine-learning techniques with quantum-chemistry approaches                  https://github.com/biklooost/PROPhet
  TensorMol            Neural-network chemistry package                                                                 https://github.com/jparkhill/TensorMol
per step can range from around 80 to several thousand30; for compar-                       reagents at a given step, limiting the number of choices available to the
ison, there are only tens of potential moves at each game position in                      algorithm. The contextual rules (typically many thousands of them) are
chess31. In chemical synthesis, human experts are required to specify                      of utmost importance if a machine relying on a traditional algorithm
conditional and contextual rules, which exclude large sets of potential                    is to compete with an expert. Recent breakthroughs in the Chematica
                                                                                           program have shown that computers can be more efficient than humans
                                                                                           in these tasks32.
                                                                     Training score           The combination of extremely complex systems and huge num-
                                                                     Test score
                                                                                           bers of potential solutions, which arise from competing objective
                                                                                           functions (such as cost, purity, time and toxicity), make synthetic chem-
                                                                                           istry ill-suited to the application of traditional algorithmic approaches.
                                                                                           However, because of this complexity, synthesis is one area of research
                                                                                           that can benefit most from the application of artificial intelligence.
                                                                                              Deep-learning approaches, which typically rely on many-layered
                                                                                           artificial neural networks or a combination of artificial neural networks
                                                                                           and other learning techniques such as Boltzmann machines, are
                                                                                           showing particular promise for predicting chemical-synthesis routes
                                                                                           by combining rules-based expert systems with neural networks that
Error
                                                                                           rank the candidate synthetic pathways33 or the likelihood of a pre-
                                                                                           dicted product by applying the rules34. One artificial neural network
                                                                                           that learned from examples taken from the chemical literature was able
                                                                                           to achieve a level of sophistication such that trained chemists could not
                 Underfitting                                  Overfitting                 distinguish between computer- and human-expert-designed routes30.
                                                                                           However, a severe drawback of rules-based systems is that they have
                                                                                           difficulty operating outside their knowledge base.
                                                                                              Alternatives to rules-based synthesis prediction have also been
                                                                                           proposed, for example, so-called sequence-to-sequence approaches,
                                     Model complexity                                      which are based on the relationships between organic chemistry and
Fig. 2 | Errors that arise in machine-learning approaches. Errors                          linguistics. By casting molecules as text strings, these relationships
can arise during both the training of a new model (blue line) and the                      have been applied in several chemical-design studies35,36. In sequenceapplication of a built model (red line). A simple model may suffer from                    to-sequence approaches, a model is fed an input of products and then
high bias (underfitting), whereas a complex model may suffer from high                     outputs reactants as a SMILES string37. A similar approach has also
variance (overfitting), which leads to a bias–variance trade-off. In the                   been applied to retrosynthesis38. Future developments in areas such as
underfitting region the model performance can improve with further                         one-shot learning (as recently applied to drug discovery)39 could lead to
parameterization, whereas in the overfitting region the model performance
                                                                                           wider application of non-rules-based methods in fields such as natural
will decrease. The optimal point for a model is just before the performance
on the testing set starts to deteriorate with increased parameterization,
                                                                                           product synthesis, for which training data are scarce.
which is indicated by the dashed vertical line. The model shown here is                       Beyond the synthesis of a target molecule, machine-learning models
built on an example from https://kaggle.com, available at https://keeeto.                  can be applied to assess the likelihood that a product will crystallize.
github.io/blog/bias_variance. The shaded areas show the standard                           By applying feature-selection techniques, a two-parameter model
deviations of the fits for model training (blue) and testing (red).                        capable of predicting the propensity of a given molecule to crystallize
5 5 0 | N AT U R E | V O L 5 5 9 | 2 6 J U LY 2 0 1 8
                                                              © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 5 doc=math_p19 -->
Review RESEARCH
with an accuracy of around 80% has been demonstrated40. Crucially,               f electron) systems and for the latest generation of quantum materials
this model had access to a training set of more than 20,000 crystalline          (such as iron pnictide superconductors), which often require a more
and non-crystalline compounds. The availability of such open-access              sophisticated many-body Hamiltonian. Drawing from the growing
databases is pivotal for the further development of similar predictive           number of structure–property databases (Table 3), accurate univermodels41. In another study, a model was trained to predict the reaction          sal density functionals can be learned from data50,51. Early examples
conditions for new organically templated inorganic-product formation             include the Bayesian error-estimation functional52 and combinatorially
with a success rate of 89%42.                                                    optimized DFT functionals53. Going beyond the standard approach to
   A less explored avenue of machine learning is how to best sample the          DFT, the need to solve the Kohn–Sham equations can be by-passed
set of possible experimental set-ups. Active learning predicts the optimal       by learning density-to-energy and density-to-potential maps directly
future experiments that are required to better understand a given problem.       from training systems54.
It was recently applied to help to understand the conditions for the                 Equally challenging is the description of chemical processes across
synthesis and crystallization of complex polyoxometalate clusters43.             length scales and timescales, such as the corrosion of metals in the presStarting from initial data on failed and successful experiments, the             ence of oxygen and water. A realistic description of chemical interactions
machine-learning approach directed future experiments and was                    (bond forming and breaking) including solvents, interfaces and disorder
shown to be capable of covering six times as much crystallization space          is still limited by the computational cost of available quantum-mechanical
as a human researcher in the same number of experiments.                         approaches. The task of developing transferrable analytic force fields is
   Computational assistance for the planning and direction of chemical           a well-defined problem for machine learning55,56. It has been demonsynthesis has come a long way since the early days of hand-coded expert          strated that, in simple materials, approximate potential-energy surfaces
systems. Much of this progress has been achieved in the past five years.         learned from quantum-mechanical data can save orders of magnitude
Incorporation of artificial-intelligence-based chemical planners, with           in processing cost57,58. Although the combination of methods with varadvances in robotic synthesis43, promises a rich new frontier in the             ying levels of approximation is promising, much work is needed in the
production of novel compounds.                                                   quantification and minimization of error propagation across methods.
                                                                                 In this context, initiatives for error estimation such as the DAKOTA
Assisting multi-dimensional characterization                                     package (https://dakota.sandia.gov) are critically important.
The structure of molecules and materials is typically deduced by a combination of experimental methods, such as X-ray and neutron diffrac-             Targeting discovery of new compounds
tion, magnetic and spin resonance, and vibrational spectroscopy. Each            We have considered how machine learning can be used to enhance and
approach has a certain sensitivity and length scale, and information             integrate synthesis, characterization and modelling. However, machine
from each method is complementary. Unfortunately, it is rare that data           learning can also reveal new ways of discovering compounds. Models
are fully assimilated into a coherent description of atomic structure.           that relate system descriptors to desirable properties are already used
Analyses of individual streams often result in conflicting descriptions          to reveal previously unknown structure–property relationships59,60. So
of the same compound44. A solution could be to incorporate real-time             far, the fields of molecular (primarily pharmaceutical and medicinal)
data into the modelling, with results then returned to the experiment,           and materials chemistry have experienced different degrees of uptake
forming a feedback loop45. Machine learning represents a unifying                of machine-learning approaches to the design of new compounds, in
framework that could enable the synergy of synthesis, imaging, theory            part owing to the challenges of representing the crystal structure and
and simulations.                                                                 morphology of extended solids.
   The power of machine-learning methods for enhancing the link
between modelling and experiment has been demonstrated in the                    Crystalline solids. The application of machine learning to the discovery
field of surface science. Complex surface reconstructions have been              of functional materials is an emerging field. An early report in 1998
characterized by combining ab initio simulations with multi-stage                applied machine learning to the prediction of magnetic and optoelecpattern-recognition systems that use convolutional neural networks46.            tronic materials61, but the number of studies has risen substantially
Machine-learning methods have also recently shown promise in areas               only since 201062–64. The complexity of games like Go is reminiscent
such as microstructural characterization47 and the identification of             of certain problems in materials science65,66, such as the description of
interesting regions in large, complex, neutron-scattering, volumetric            on-lattice interactions that govern chemical disorder, magnetism and
(three-dimensional) datasets48. Another example of machine learn-                ferroelectricity. Even for representations of small unit cells, the number
ing opening new avenues in an area of complicated characterization is            of configurations of a disordered crystal can quickly exceed the limitaphase transitions of highly correlated systems; neural networks have             tions of conventional approaches. An inverse-design procedure illusbeen trained to encode topological phases of matter and thus identify            trated how such a combinatorial space for an alloy could be harnessed
transitions between them49.                                                      to realize specific electronic structure features67. Similar inverse-design
                                                                                 approaches have also been applied in molecular chemistry to tailor
Enhancing theoretical chemistry                                                  ground- and excited-state properties68.
Modelling is now commonly considered as being equally impor-                        Predicting the likelihood of a composition to adopt a given crystal
tant as synthesis and characterization for successful programmes of              structure is a good example of a supervised classification problem in
research. Using atomistic simulations, the properties of a molecule or           machine learning. Two recent examples involve predicting how likely
material can, in principle, be calculated for any chemical composition           a given composition is to adopt the so-called Heusler and half-Heusler
and atomic structure. In practice, the computations grow rapidly in              crystal structures. The first predicts the likelihood that a given compocomplexity as the size of the system increases, so considerable effort           sition will adopt the Heusler structure and is trained on experimental
is devoted to finding short-cuts and approximations that enable the              data69. This approach was applied to screen hypothetical compositions
properties of the material to be calculated to an acceptable degree of           and successfully identified 12 new gallide compounds, which were subfidelity, without the need for unreasonable amounts of computer time.            sequently verified experimentally. In the second, a random forest model
   Approaches based on DFT have been successful in predicting the                was trained on experimental data to learn the probability that a given
properties of many classes of compounds, offering generally high                 ABC stoichiometry would adopt the half-Heusler structure70.
accuracy at reasonable cost. However, DFT and related electronic-                   As an alternative to learning from experimental data, calculated
structure techniques are limited by the exchange-correlation functional          properties can be used as a training set for machine learning. Assessing
that describes non-classical interactions between electrons. There are           the degree of similarity between electronic band structures has been
notable limitations of the current approximations for weak chemical              shown to yield improved photocathodes for dye-sensitized solar cells71.
interactions (such as in layered materials), for highly correlated (d and        A machine-learning model, trained to reproduce energies for the
                                                                                                            2 6 J U LY 2 0 1 8 | V O L 5 5 9 | N AT U R E | 5 5 1
                                                     © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 6 doc=math_p19 -->
RESEARCH Review
Table 3 | Publicly accessible structure and property databases for molecules and solids
 Name                                      Description                                                                         URL
 Computed structures and properties
 AFLOWLIB                                  Structure and property repository from high-throughput ab initio calculations       http://aflowlib.org
                                           of inorganic materials
 Computational Materials Repository        Infrastructure to enable collection, storage, retrieval and analysis of data from   https://cmr.fysik.dtu.dk
                                           electronic-structure codes
 GDB                                       Databases of hypothetical small organic molecules                                   http://gdb.unibe.ch/downloads
 Harvard Clean Energy Project              Computed properties of candidate organic solar absorber materials                   https://cepdb.molecularspace.org
 Materials Project                         Computed properties of known and hypothetical materials carried out using a         https://materialsproject.org
                                           standard calculation scheme
 NOMAD                                     Input and output files from calculations using a wide variety of electronic-        https://nomad-repository.eu
                                           structure codes
 Open Quantum Materials Database           Computed properties of mostly hypothetical structures carried out using a           http://oqmd.org
                                           standard calculation scheme
 NREL Materials Database                   Computed properties of materials for renewable-energy applications                  https://materials.nrel.gov
 TEDesignLab                               Experimental and computed properties to aid the design of new thermo­               http://tedesignlab.org
                                           electric materials
 ZINC                                      Commercially available organic molecules in 2D and 3D formats                       https://zinc15.docking.org
 Experimental structures and properties
 ChEMBL                                    Bioactive molecules with drug-like properties                                       https://www.ebi.ac.uk/chembl
 ChemSpider                                Royal Society of Chemistry’s structure database, featuring calculated and           https://chemspider.com
                                           experimental properties from a range of sources
 Citrination                               Computed and experimental properties of materials                                   https://citrination.com
 Crystallography Open Database             Structures of organic, inorganic, metal–organic compounds and minerals              http://crystallography.net
 CSD                                       Repository for small-molecule organic and metal–organic crystal structures          https://www.ccdc.cam.ac.uk
 ICSD                                      Inorganic Crystal Structure Database                                                https://icsd.fiz-karlsruhe.de
 MatNavi                                   Multiple databases targeting properties such as superconductivity and               http://mits.nims.go.jp
                                           thermal conductance
 MatWeb                                    Datasheets for various engineering materials, including thermoplastics, semi-       http://matweb.com
                                           conductors and fibres
 NIST Chemistry WebBook                    High-accuracy gas-phase thermochemistry and spectroscopic data                      https://webbook.nist.gov/chemistry
 NIST Materials Data Repository            Repository to upload materials data associated with specific publications           https://materialsdata.nist.gov
 PubChem                                   Biological activities of small molecules                                            https://pubchem.ncbi.nlm.nih.gov
elpasolite crystal structure (ABC2D6), was applied to screen all two                  measured structural properties75. Machine learning has a long history
million possible combinations of elements that satisfy the formula,                   in the development of quantitative structure–activity relationships,
revealing chemical trends and identifying 128 new materials72. Such                   stretching back over half a century76.
models are expected to become a central feature in the next generation                   Molecular science is benefitting from cutting-edge algorithmic develof high-throughput virtual screening procedures.                                      opments in machine learning such as generative adversarial networks77
   The majority of crystal-solid machine-learning studies so far have                 and reinforcement learning for the computational design of biologically
concentrated on a particular type of crystal structure. This is because               active compounds. In a generative adversarial network, two models
of the difficulty of representing crystalline solids in a format that can             are trained simultaneously: a generative model (or generator) captures
be fed easily to a statistical learning procedure. By concentrating on                the distribution of data while a discriminative model (or discriminaa single structure type, the representation is inherently built into the              tor) estimates the probability that a sample came from the training set
model. Developing flexible, transferrable representations is one of the               rather than the generator. The training procedure for the generator
important areas of research in machine learning for crystalline solids                is to maximize the probability of the discriminator making an error
(see subsection ‘Data representation’). As we will see below, the use of              (Fig. 3). Models based on objective-reinforced generative adversarmachine learning in molecular chemistry is more advanced than in                      ial networks78 are capable of generating new organic molecules from
the solid state, to a large extent owing to the greater ease with which               scratch. Such models can be trained to produce diverse molecules that
molecules can be described in a manner amenable to algorithmic                        contain specific chemical features and physical responses, through a
interpretation.                                                                       reward mechanism that resembles classical conditioning in psychology.
                                                                                      Using reinforcement learning, newly generated chemical structures
Molecular science. The quantitative structure–activity relationship is                can be biased towards those with the desired physical and biological
now a firmly established tool for drug discovery and molecular design.                properties (de novo design).
With the development of massive databases of assayed and virtual
molecules73,74, methods for rapid, reliable, virtual screening of these               Reclaiming the literature
molecules for pharmacological (or other) activity are required to                     A final area for which we consider the recent progress of machine learning
unlock the potential of such molecules. Models based on quantitative                  (across all disciplines) is tapping into the vast amount of knowledge that
structure–activity relationships can be described as the application of               already exists. Although the scientific literature provides a wealth of
statistical methods to the problem of finding empirical relationships of              information to researchers, it is increasingly difficult to navigate owing
$$
the type Pi = k′(D1, D2, …, Dn), where Pi is the property of interest, k′ is a        to the proliferation of journals, articles and databases. Text mining
$$
(typically linear) mathematical transformation and Di are calculated or               has become a popular approach to identifying and extracting
5 5 2 | N AT U R E | V O L 5 5 9 | 2 6 J U LY 2 0 1 8
                                                          © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 7 doc=math_p19 -->
Review RESEARCH
                                              O
                                                                            Sample
                                          N          N
                                      O       N      N
                                                                                                                            Real
                                    Real-world molecules
                                                                                                      Discriminator                      Loss
                        Latent random
                           variable                                                                                         Fake
                                                  Generator                 Sample
Fig. 3 | The generative adversarial network (GAN) approach to                             from real data. The two artificial neural networks are optimizing a
molecular discovery. Two models—a generator and a discriminator—                          different and opposing objective function, or loss function, in a zero-sum
play a continuous ‘game’. The generator learns to map from a latent                       game. The general mathematical formulation for the GAN approach
random variable (noise) to a particular distribution of molecules. The                    to unsupervised machine learning is outlined in ref. 77.
discriminator learns to get better and better at distinguishing fake data
information from unstructured text sources. This approach can be used                     which is determined by the validity and relevance of these descriptors. A
to extract facts and relationships in a structured form to create special-                good descriptor must be simpler to obtain than the target property and
ized databases, to transfer knowledge between domains and, more gen-                      of as low dimensionality as possible85. In the context of materials, useful
erally, to support research decision-making79. Text mining is applied to                  descriptors86 and approaches for adapting simple existing heuristics
answer many different research questions, including in the discovery                      for machine learning have been outlined87; however, much work
of drug–protein target associations, the analysis of high-throughput                      remains to develop powerful new descriptions. In the field of molecular
experiments and the development of systematic materials databases80.                      reactions, advances such as the use of neural networks to create
Owing to the heterogeneous nature of written resources, the automated                     fingerprints for molecules in reactions are leading to improvements
extraction of relevant information is far from trivial. To address this,                  in synthesis prediction88. As has been demonstrated by the successtext mining has evolved into a sophisticated and specialized field where                  ful adoption of the concept of molecular fragments23, the field of
text-processing and machine-learning techniques are combined.                             crystalline-materials design can learn much from advances in molecular
   In cases where supplementary data are provided with a publication,                     nomenclature and representation.
it is made available in various formats and databases, often without
validated or standardized metadata. The issue of data and metadata                        Quantum learning
interoperability is key. Some examples of forward-looking initiatives                     Whereas classical computing processes bits that are either 1 or 0, quanthat are pushing accessible, reusable data in scientific research are The                 tum computers use the quantum superposition of states to process
Molecular Sciences Software Institute (http://molssi.org) and the Open                    qubits that are both 1 and 0 at the same time89. This parallelization leads
Science Monitor (https://ec.europa.eu/research/openscience).                              to an exponential speedup in computational efficiency as the number of
                                                                                          (qu)bits used increases90. Computational chemistry is a strong candiFrontiers in machine learning                                                             date to benefit from quantum computing because solving Schrödinger’s
There are many opportunities for further breakthroughs in machine                         equation on a quantum computer that consists of interacting electrons
learning to provide even greater advances in the automated design and                     has a natural fit91. One of the challenges for quantum computing is
discovery of molecules and materials. Here we highlight some frontiers                    knowing how to detect and correct errors that may occur in the data.
in the field.                                                                             Despite substantial efforts in industry and academia, no error-corrected
                                                                                          qubits have been built so far. Quantum machine learning explores the
More knowledge from smaller datasets                                                      application of machine-learning approaches to quantum problems, and
Machine-learning approaches typically require large amounts of data                       vice versa—the application of quantum computing to machine-learning
for learning to be effective. Although this is rarely an issue in fields such             problems. The possibility of exponential speedups in optimization
as image recognition, in which millions of input datasets are available,                  problems means that quantum machine learning has enormous potenin chemistry or materials science we are often limited to hundreds or                     tial. In problems such as optimizing synthetic routes92 or improving a
thousands, if not fewer, high-quality data points. Researchers need to                    given metric (for example, optical absorption for solar energy matebecome better at making the data associated with our publications                         rials) where multiple acceptable solutions exist, loss of qubit fidelity is
accessible in a computer-readable form. Another promising solution                        less serious than when certainty is required. The physical sciences could
to the problem of limited datasets is meta-learning, whereby knowledge                    prove a particularly rich field for quantum-learning applications93,94.
is learned within and across problems81. New developments such as
neural Turing machines82 and imitation learning83 are enabling the                        Establishing new principles
realization of this process. A Bayesian framework has recently been                       Automatic discovery of scientific laws and principles95,96 by inspecreported to achieve human-level performance on one-shot learning                          tion of the weights of trained machine-learning systems is a potentially
problems with limited data84, which has consequences for molecular                        transformational development in science. Although models developed
and materials science where data are sparse and generally expensive                       from machine learning are predictive, they are not necessarily (or even
and slow to obtain.                                                                       usually) interpretable; there are several reasons for this. First, the way
                                                                                          in which a machine-learning model represents knowledge rarely maps
Efficient chemical representations                                                        directly to forms that scientists are familiar with. Given suitable data, an
$$
The standard description of chemical reactions, in terms of composi-                      artificial neural network might discover the ideal gas law (pV = nRT),
$$
tion, structure and properties, has been optimized for human learning.                    but the translation of connection weights into a formula, typically
Most machine-learning approaches for chemical reactions or properties                     through statistical learning, is non-trivial, even for a simple law such
use molecular or atomic descriptors to build models, the success of                       as this. The second reason is more subtle: the laws that underlie the
                                                                                                                      2 6 J U LY 2 0 1 8 | V O L 5 5 9 | N AT U R E | 5 5 3
                                                              © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 8 doc=math_p19 -->
RESEARCH Review
behaviour of a compound might depend on knowledge that scientists                         24. Hand, D. J. & Yu, K. Idiot’s Bayes—not so stupid after all? Int. Stat. Rev. 69,
do not yet possess, such as a many-body interaction giving rise to a new                      385–398 (2001).
                                                                                          25. Shakhnarovich, G., Darrell, T. & Indyk, P. Nearest-Neighbor Methods in Learning
type of superconductivity. If an advanced machine-learning system was                         and Vision: Theory and Practice (MIT Press, Boston, 2005).
able to learn key aspects of quantum mechanics, it is hard to envisage                    26. Rokach, L. & Maimon, O. in Data Mining and Knowledge Discovery Handbook
how its connection weights could be turned into a comprehensible                              (eds Maimon, O. & Rokach, L.) 149–174 (Springer, New York, 2010).
                                                                                          27. Shawe-Taylor, J. & Cristianini, N. Kernel Methods for Pattern Analysis (Cambridge
theory if the scientist lacked understanding of a fundamental compo-                          Univ. Press, Cambridge, 2004).
nent of it. Finally, there may be scientific laws that are so complex that,               28. Schmidhuber, J. Deep learning in neural networks: an overview. Neural Netw.
were they to be discovered by a machine-learning system, they would                           61, 85–117 (2015).
                                                                                          29. Corey, E. J. & Wipke, W. T. Computer-assisted design of complex organic
be too challenging for even a knowledgeable scientist to understand. A                        synthesis. Science 166, 178–192 (1969).
machine-learning system that could discern and use such laws would                        30. Segler, M. H. S., Preuss, M. & Waller, M. P. Planning chemical syntheses with
truly be a computational black box.                                                           deep neural networks and symbolic AI. Nature 555, 604–610 (2018).
                                                                                              A computer-driven retrosynthesis tool was trained on most published
   As scientists embrace the inclusion of machine learning with                               reactions in organic chemistry.
statistically driven design in their research programmes, the number                      31. Szymkuć, S. et al. Computer-assisted synthetic planning: the end of the
of reported applications is growing at an extraordinary rate. This                            beginning. Angew. Chem. Int. Ed. 55, 5904–5937 (2016).
new generation of computational science, supported by a platform of                       32. Klucznik, T. et al. Efficient syntheses of diverse, medicinally relevant targets
                                                                                              planned by computer and executed in the laboratory. Chem 4, 522–532
open-source tools and data sharing, has the potential to revolutionize                        (2018).
molecular and materials discovery.                                                        33. Segler, M. H. S. & Waller, M. P. Neural-symbolic machine learning for
                                                                                              retrosynthesis and reaction prediction. Chem. Eur. J. 23, 5966–5971 (2017).
Received: 20 October 2017; Accepted: 9 May 2018;                                          34. Cole, J. C. et al. Generation of crystal structures using known crystal structures
Published online 25 July 2018.                                                                as analogues. Acta Crystallogr. B 72, 530–541 (2016).
                                                                                          35. Gómez-Bombarelli, R. et al. Design of efficient molecular organic light-emitting
                                                                                              diodes by a high-throughput virtual screening and experimental approach. Nat.
1.  Dirac, P. A. M. Quantum mechanics of many-electron systems. Proc. R. Soc.                 Mater. 15, 1120–1127 (2016).
    Lond. A 123, 714–733 (1929).                                                              This study uses machine learning to guide all stages of a materials discovery
2. Pople, J. A. Quantum chemical models (Nobel lecture). Angew. Chem. Int. Ed. 38,            workflow from quantum-chemical calculations to materials synthesis.
    1894–1902 (1999).                                                                     36. Jastrzębski, S., Leśniak, D. & Czarnecki, W. M. Learning to SMILE(S). Preprint at
3. Boyd, D. B. Quantum chemistry program exchange, facilitator of theoretical and             https://arxiv.org/abs/1602.06289 (2016).
    computational chemistry in pre-internet history. ACS Symp. Ser. 1122, 221–273         37. Nam, J. & Kim, J. Linking the neural machine translation and the prediction of
    (2013).                                                                                   organic chemistry reactions. Preprint at https://arxiv.org/abs/1612.09529
4. Arita, M., Bowler, D. R. & Miyazaki, T. Stable and efficient linear scaling                (2016).
    first-principles molecular dynamics for 10000+ atoms. J. Chem. Theory                 38. Liu, B. et al. Retrosynthetic reaction prediction using neural sequence-to-
    Comput. 10, 5419–5425 (2014).                                                             sequence models. ACS Cent. Sci. 3, 1103–1113 (2017).
5. Wilkinson, K. A., Hine, N. D. M. & Skylaris, C.-K. Hybrid mpi-openmp parallelism       39. Altae-Tran, H., Ramsundar, B., Pappu, A. S. & Pande, V. Low data drug discovery
    in the Onetep linear-scaling electronic structure code: application to the                with one-shot learning. ACS Cent. Sci. 3, 283–293 (2017).
    delamination of cellulose nanofibrils. J. Chem. Theory Comput. 10, 4782–4794          40. Wicker, J. G. P. & Cooper, R. I. Will it crystallise? Predicting crystallinity of
    (2014).                                                                                   molecular materials. CrystEngComm 17, 1927–1934 (2015).
6. Havu, V., Blum, V., Havu, P. & Scheffler, M. Efficient O(N) integration for                This paper presents a crystal engineering application of machine learning to
    all-electron electronic structure calculation using numeric basis functions.              assess the probability of a given molecule forming a high-quality crystal.
    J. Comput. Phys. 228, 8367–8379 (2009).                                               41. Pillong, M. et al. A publicly available crystallisation data set and its application in
7. Catlow, C. R. A., Sokol, A. A. & Walsh, A. Computational Approaches to Energy              machine learning. CrystEngComm 19, 3737–3745 (2017).
    Materials (Wiley-Blackwell, New York, 2013).                                          42. Raccuglia, P. et al. Machine-learning-assisted materials discovery using failed
8. Hohenberg, P. & Kohn, W. Inhomogeneous electron gas. Phys. Rev. 136,                       experiments. Nature 533, 73–76 (2016).
    B864–B871 (1964).                                                                         The study trains a machine-learning model to predict the success of a
9. Kohn, W. & Sham, L. J. Self-consistent equations including exchange and                    chemical reaction, incorporating the results of unsuccessful attempts as well
    correlation effects. Phys. Rev. 140, A1133–A1138 (1965).                                  as known (successful) reactions.
10. Lejaeghere, K. et al. Reproducibility in density functional theory calculations of    43. Dragone, V., Sans, V., Henson, A. B., Granda, J. M. & Cronin, L. An autonomous
    solids. Science 351, aad3000 (2016).                                                      organic reaction search engine for chemical reactivity. Nat. Commun. 8, 15733
11. Hachmann, J. et al. The Harvard clean energy project: large-scale                         (2017).
    computational screening and design of organic photovoltaics on the world              44. Billinge, S. J. L. & Levin, I. The problem with determining atomic structure at the
    community grid. J. Phys. Chem. Lett. 2, 2241–2251 (2011).                                 nanoscale. Science 316, 561–565 (2007).
12. Jain, A. et al. Commentary: the materials project: a materials genome approach        45. Kalinin, S. V., Sumpter, B. G. & Archibald, R. K. Big–deep–smart data in imaging
    to accelerating materials innovation. APL Mater. 1, 011002 (2013).                        for guiding materials design. Nat. Mater. 14, 973–980 (2015).
13. Calderon, C. E. et al. The AFLOW standard for high-throughput materials               46. Ziatdinov, M., Maksov, A. & Kalinin, S. V. Learning surface molecular structures
    science calculations. Comput. Mater. Sci. 108, 233–238 (2015).                            via machine vision. npj Comput. Mater. 3, 31 (2017).
14. Agrawal, A. & Choudhary, A. Perspective: Materials informatics and big data:          47. de Albuquerque, V. H. C., Cortez, P. C., de Alexandria, A. R. & Tavares, J. M. R. S.
    realization of the ‘fourth paradigm’ of science in materials science. APL Mater.          A new solution for automatic microstructures analysis from images based on a
    4, 053208 (2016).                                                                         backpropagation artificial neural network. Nondestruct. Test. Eval. 23, 273–283
15. Schwab, K. The fourth industrial revolution. Foreign Affairs https://www.                 (2008).
    foreignaffairs.com/articles/2015-12-12/fourth-industrial-revolution (2015).           48. Hui, Y. & Liu, Y. Volumetric data exploration with machine learning-aided
16. Fourches, D., Muratov, E. & Tropsha, A. Trust, but verify: on the importance of           visualization in neutron science. Preprint at https://arxiv.org/abs/1710.05994
    chemical structure curation in cheminformatics and QSAR modeling research.                (2017).
    J. Chem. Inf. Model. 50, 1189–1204 (2010).                                            49. Carrasquilla, J. & Melko, R. G. Machine learning phases of matter. Nat. Phys. 13,
17. Kireeva, N. et al. Generative topographic mapping (GTM): universal tool for data          431–434 (2017).
    visualization, structure-activity modeling and dataset comparison. Mol. Inform.       50. Christensen, R., Hansen, H. A. & Vegge, T. Identifying systematic DFT errors in
    31, 301–312 (2012).                                                                       catalytic reactions. Catal. Sci. Technol. 5, 4946–4949 (2015).
18. Faber, F. A. et al. Prediction errors of molecular machine learning models lower      51. Snyder, J. C., Rupp, M., Hansen, K., Müller, K.-R. & Burke, K. Finding
    than hybrid DFT error. J. Chem. Theory Comput. 13, 5255–5264 (2017).                      density functionals with machine learning. Phys. Rev. Lett. 108, 253002
19. Rupp, M., Tkatchenko, A., Müller, K.-R. & von Lilienfeld, O. A. Fast and accurate         (2012).
    modeling of molecular atomization energies with machine learning. Phys. Rev.          52. Wellendorff, J. et al. Density functionals for surface science: exchange-
    Lett. 108, 058301 (2012).                                                                 correlation model development with Bayesian error estimation. Phys. Rev. B 85,
20. Bonchev, D. & Rouvray, D. H. Chemical Graph Theory: Introduction and                      235149 (2012).
    Fundamentals (Abacus Press, New York, 1991).                                          53. Mardirossian, N. & Head-Gordon, M. ωB97M-V a combinatorially optimized,
21. Schütt, K. T. et al. How to represent crystal structures for machine learning:            range-separated hybrid, meta-GGA density functional with VV10 nonlocal
    towards fast prediction of electronic properties. Phys. Rev. B 89, 205118 (2014).         correlation. J. Chem. Phys. 144, 214110 (2016).
    A radial-distribution-function description of periodic solids is adapted for          54. Brockherde, F. et al. Bypassing the Kohn-Sham equations with machine
    machine-learning models and applied to predict the electronic density of                  learning. Nat. Commun. 8, 872 (2017).
    states for a range of materials.                                                          This study transcends the standard approach to DFT by providing a direct
22. Ward, L. et al. Including crystal structure attributes in machine learning                mapping from density to energy, paving the way for higher-accuracy
    models of formation energies via Voronoi tessellations. Phys. Rev. B 96, 024104           approaches.
    (2017).                                                                               55. Behler, J. First principles neural network potentials for reactive simulations of
23. Isayev, O. et al. Universal fragment descriptors for predicting electronic                large molecular and condensed systems. Angew. Chem. Int. Ed. 56, 12828–
    properties of inorganic crystals. Nat. Commun. 8, 15679 (2017).                           12840 (2017).
5 5 4 | N AT U R E | V O L 5 5 9 | 2 6 J U LY 2 0 1 8
                                                              © 2018 Springer Nature Limited. All rights reserved.


<!-- PK PAGE 9 doc=math_p19 -->
Review RESEARCH
56. Smith, J. S., Isayev, O. & Roitberg, A. E. Ani-1: an extensible neural network            80. Kim, E. et al. Materials synthesis insights from scientific literature via text
    potential with DFT accuracy at force field computational cost. Chem. Sci. 8,                  extraction and machine learning. Chem. Mater. 29, 9436–9444 (2017).
    3192–3203 (2017).                                                                         81. Jankowski, N., Duch, W. & Gra̧bczewski, K. (eds) Meta-Learning in Computational
57. Bartók, A. P., Payne, M. C., Kondor, R. & Csányi, G. Gaussian approximation                   Intelligence (Springer, Berlin, 2011).
    potentials: the accuracy of quantum mechanics, without the electrons. Phys.               82. Graves, A., Wayne, G. & Danihelka, I. Neural Turing machines. Preprint at
    Rev. Lett. 104, 136403 (2010).                                                                https://arxiv.org/abs/1410.5401 (2014).
    In this study, machine learning is used to fit interatomic potentials that                83. Duan, Y. et al. One-shot imitation learning. Preprint at https://arxiv.org/
    reproduce the total energy and energy derivatives from quantum-mechanical                     abs/1703.07326 (2017).
    calculations and enable accurate low-cost simulations.                                    84. Lake, B. M., Salakhutdinov, R. & Tenenbaum, J. B. Human-level concept learning
58. Handley, C. M. & Popelier, P. L. A. Potential energy surfaces fitted by artificial            through probabilistic program induction. Science 350, 1332–1338 (2015).
    neural networks. J. Phys. Chem. A 114, 3371–3383 (2010).                                  85. Ghiringhelli, L. M., Vybiral, J., Levchenko, S. V., Draxl, C. & Scheffler, M. Big data
59. Pulido, A. et al. Functional materials discovery using energy–structure–function              of materials science: critical role of the descriptor. Phys. Rev. Lett. 114, 105503
    maps. Nature 543, 657–664 (2017).                                                             (2015).
60. Hill, J. et al. Materials science with large-scale data and informatics: unlocking        86. Curtarolo, S. et al. The high-throughput highway to computational materials
    new opportunities. MRS Bull. 41, 399–409 (2016).                                              design. Nat. Mater. 12, 191–201 (2013).
61. Kiselyova, N. N., Gladun, V. P. & Vashchenko, N. D. Computational materials               87. Seko, A., Togo, A. & Tanaka, I. in Nanoinformatics (ed. Tanaka, I.) 3–23 (Springer,
    design using artificial intelligence methods. J. Alloys Compd. 279, 8–13 (1998).              Singapore, 2018).
62. Saal, J. E., Kirklin, S., Aykol, M., Meredig, B. & Wolverton, C. Materials design and     88. Duvenaud, D. et al. Convolutional networks on graphs for learning molecular
    discovery with high-throughput density functional theory: the open quantum                    fingerprints. Preprint at https://arxiv.org/abs/1509.09292 (2015).
    materials database (OQMD). JOM 65, 1501–1509 (2013).                                      89. Steane, A. Quantum computing. Rep. Prog. Phys. 61, 117 (1998).
63. Pilania, G., Wang, C., Jiang, X., Rajasekaran, S. & Ramprasad, R. Accelerating            90. Harrow, A. W., Hassidim, A. & Lloyd, S. Quantum algorithm for linear systems of
    materials property predictions using machine learning. Sci. Rep. 3, 2810                      equations. Phys. Rev. Lett. 103, 150502 (2009).
    (2013).                                                                                   91. Aspuru-Guzik, A., Dutoi, A. D., Love, P. J. & Head-Gordon, M. Simulated quantum
64. Hautier, G., Fischer, C. C., Jain, A., Mueller, T. & Ceder, G. Finding nature's missing       computation of molecular energies. Science 309, 1704–1707 (2005).
    ternary oxide compounds using machine learning and density functional                         In an early application of quantum computing to molecular problems, a
    theory. Chem. Mater. 22, 3762–3767 (2010).                                                    quantum algorithm that scales linearly with the number of basis functions is
    In an early example of harnessing materials databases, information on known                   demonstrated for calculating properties of chemical interest.
    compounds is used to construct a machine-learning model to predict the                    92. Reiher, M., Wiebe, N., Svore, K. M., Wecker, D. & Troyer, M. Elucidating reaction
    viability of previously unreported chemistries.                                               mechanisms on quantum computers. Proc. Natl Acad. Sci. USA 114,
65. Walsh, A. The quest for new functionality. Nat. Chem. 7, 274–275 (2015).                      7555–7560 (2017).
66. Davies, D. W. et al. Computational screening of all stoichiometric inorganic              93. Dunjko, V., Taylor, J. M. & Briegel, H. J. Quantum-enhanced machine learning.
    materials. Chem 1, 617–627 (2016).                                                            Phys. Rev. Lett. 117, 130501 (2016).
67. Franceschetti, A. & Zunger, A. The inverse band-structure problem of finding an           94. Biamonte, J. et al. Quantum machine learning. Nature 549, 195–202 (2017).
    atomic configuration with given electronic properties. Nature 402, 60–63                  95. Schmidt, M. & Lipson, H. Distilling free-form natural laws from experimental
    (1999).                                                                                       data. Science 324, 81–85 (2009).
68. Kuhn, C. & Beratan, D. N. Inverse strategies for molecular design. J. Phys. Chem.         96. Rudy, S. H., Brunton, S. L., Proctor, J. L. & Kutz, J. N. Data-driven discovery of
    100, 10595–10599 (1996).                                                                      partial differential equations. Sci. Adv. 3, e1602614 (2017).
69. Oliynyk, A. O. et al. High-throughput machine-learning-driven synthesis of                97. Domingos, P. The Master Algorithm (Basic Books, New York, 2015).
    full-Heusler compounds. Chem. Mater. 28, 7324–7331 (2016).                                98. Coudert, F.-X. Reproducible research in computational chemistry of materials.
70. Legrain, F., Carrete, J., van Roekeghem, A., Madsen, G. K. H. & Mingo, N.                     Chem. Mater. 29, 2615–2617 (2017).
    Materials screening for the discovery of new half-heuslers: machine learning              99. Tetko, I. V., Maran, U. & Tropsha, A. Public (Q)SAR services, integrated modeling
    versus ab initio methods. J. Phys. Chem. B 122, 625–632 (2018).                               environments, and model repositories on the web: state of the art and
71. Moot, T. et al. Material informatics driven design and experimental validation of             perspectives for future development. Mol. Inform. 36, 1600082 (2017).
    lead titanate as an aqueous solar photocathode. Mater. Discov. 6, 9–16 (2016).
72. Faber, F. A., Lindmaa, A., Von Lilienfeld, O. A. & Armiento, R. Machine learning          Acknowledgements This work was supported by the EPSRC (grant numbers
    energies of 2 million elpasolite (ABC2D6) crystals. Phys. Rev. Lett. 117, 135502          EP/M009580/1, EP/K016288/1 and EP/L016354/1), the Royal Society and
    (2016).                                                                                   the Leverhulme Trust. O.I. acknowledges support from DOD-ONR (N00014-1673. Oprea, T. I. & Tropsha, A. Target, chemical and bioactivity databases –                   1-2311) and an Eshelman Institute for Innovation award.
    integration is key. Drug Discov. Today. Technol. 3, 357–365 (2006).
74. Sterling, T. & Irwin, J. J. ZINC 15 – ligand discovery for everyone. J. Chem. Inf.        Reviewer information Nature thanks F.-X. Coudert, M. Waller and the other
    Model. 55, 2324–2337 (2015).                                                              anonymous reviewer(s) for their contribution to the peer review of this work.
75. Tropsha, A. Best practices for QSAR model development, validation, and
    exploitation. Mol. Inform. 29, 476–488 (2010).                                            Author contributions All authors contributed equally to the design, writing and
76. Hansch, C. & Fujita, T. p-σ-π analysis. A method for the correlation of biological        editing of the manuscript.
    activity and chemical structure. J. Am. Chem. Soc. 86, 1616–1626 (1964).
77. Goodfellow, I. J. et al. Generative adversarial networks. Preprint at https://arxiv.      Competing interests The authors declare no competing interests.
    org/abs/1406.2661 (2014).
78. Guimaraes, G. L., Sanchez-Lengeling, B., Outeiral, C., Farias, P. L. C. & Aspuru-         Additional information
    Guzik, A. Objective-reinforced generative adversarial networks (ORGAN) for                Reprints and permissions information is available at http://www.nature.com/
    sequence generation models. Preprint at https://arxiv.org/abs/1705.10843                  reprints.
    (2017).                                                                                   Correspondence and requests for materials should be addressed to O.I. or A.W.
79. Fleuren, W. W. M. & Alkema, W. Application of text mining in the biomedical               Publisher’s note: Springer Nature remains neutral with regard to jurisdictional
    domain. Methods 74, 97–106 (2015).                                                        claims in published maps and institutional affiliations.
                                                                                                                           2 6 J U LY 2 0 1 8 | V O L 5 5 9 | N AT U R E | 5 5 5
                                                                  © 2018 Springer Nature Limited. All rights reserved.
<!-- PK END doc=math_p19 -->
