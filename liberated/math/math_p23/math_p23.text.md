PKvNext Document

KEY: math_p23 | math |  | 4bb4403d | 201 | /papers/ShapefromShadingAMethodforObtainingtheShapeofaSmoothOpaqueObjectOneView.pdf
<!-- PK START doc=math_p23 -->


<!-- PK PAGE 1 doc=math_p23 -->
See discussions, stats, and author profiles for this publication at: https://www.researchgate.net/publication/37602086
Shape from Shading: A Method for Obtaining the Shape of a Smooth Opaque
Object from One View
Article · October 2004
Source: OAI
CITATIONS                                                                                                 READS
586                                                                                                       1,872
1 author:
              Berthold K. P. Horn
              Massachusetts Institute of Technology
              241 PUBLICATIONS 37,202 CITATIONS
                SEE PROFILE
 All content following this page was uploaded by Berthold K. P. Horn on 05 April 2014.
 The user has requested enhancement of the downloaded file.


<!-- PK PAGE 2 doc=math_p23 -->
Shape From Shading: A
Method for Obtaining the
Shape of a Smooth Opaque
Object From One View
Berthold K. P. Horn
MIT Artificial Intelligence Laboratory


<!-- PK PAGE 3 doc=math_p23 -->
MIT/LCS/TR-79
SHAPE FROM SHADING: A METHOD
: FOR OBTAINING THE SHAPE OF A
SMOOTH OPAQUE OBJECT FROM ONE VIEW
B. K. P. Horn


<!-- PK PAGE 4 doc=math_p23 -->
UNCLASSIFIED
Security Classification
DOCUMENT CONTROL DATA - R&D
(Security classification of title, body of abstract and indexing annotation must be entered when the overall report is classified)
. ORIGINATING ACTIVITY (Corporate author)
Massachusetts Institute of Technology UNCLASSIFIED
. 2b. GROUP
Project HAC
3. REPORT TITLE
Shape from Shading; A Method for Obtaining the Shape of a Smooth Opaque Object
From One View
4. DESCRIPTIVE NOTES (Type of report and inclusive dates)
Ph.D. Thesis, Department of Electrical Engineering, June 1970
S. AUTHOR(S) (Last name, first name, initial)
Horn, Berthold K. P.
. 6. REPORT DATE 7a. TOTAL NO. OF PAGES 7b. NO. OF REFS
November 1970 o 14
8a. CONTRACT OR GRANT NO. 9a. ORIGINATOR'S REPORT NUMBERI(S)
Nonr-4
onr-4102(02) MAC TR-79 (THESIS) .
c 9b. OTHER REPORT NO(S) (Any other numbers that may be
assigned this report)
d.
10. AVAILABILITY/LIMITATION NOTICES
Distribution of this document is unlimited.
t1. SUPPLEMENTARY NOTES 12. SPONSORING MILITARY ACTIVITY
None Advanced Research Projects Agency
3D-200 Pentagon
Washington, D.C. 20301
13. ABSTRACT
A method will be described for finding the shape of a smooth opaque object from a monocular image, given a knowledge of the surface photometry, the position of the lightsource and certain auxiliary information to resolve ambiguities. This method is complementary to the use of stereoscopy which relies on matching up sharp detail and will
fail on smooth objects. Until now the image processing of single views has been restricted to objects which can meaningfully be considered two-dimensional or bounded by
plane surfaces.
... A number of applications of this method will be discussed including one to lunar
topography and one to the scanning electron microscope. In both of these cases great
- simplifications occur in the equations. A note on polyhedra follows and a quantitative
theory of facial make-up is touched upon.
An implementation of some of these ideas on the PDP-6 computer with its attached imagedissector camera at the Artificial Intelligence Laboratory will be described, and also
a nose-recognition program.
14. KEY WORDS
Artificial Intelligence Visual Perception Image Processing
Depth Cues Machine Vision
DD .%% 1473 (M.LT.) ___ UNCLASSIFIED
Security Classification


<!-- PK PAGE 5 doc=math_p23 -->
ACKNOWLEDGMENTS
The author wishes to express his appreciation to everyone who
contributed to the interesting research environment.
‘Work reported herein was supported in part by Project MAC, an
M.1.T. research program sponsored by the Advanced Research
Projects Agency, Department of Defense, under Office of Naval -
Research Contract Number Nonr-4102(02). Reproduction in whole
or in part is permitted for any purpose of the United States
Government. .
This research was also supported by the South-African Chamber
of Mines and the Council for Industrial and Scientific Research.


<!-- PK PAGE 6 doc=math_p23 -->
SHAPE FROM SHADING: A METHOD FOR OBTAINING
THE SHAPE OF A SMOOTH OPAQUE OBJECT FROM ONE VIEW
F Berthold K. P. Horn
November 1970
PROJECT MAC
MASSACHUSETTS INSTITUTE OF TECHNOLOGY
Cambridge Massachusetts 02139


<!-- PK PAGE 7 doc=math_p23 -->
ACKNOWLEDGMENTS
The author wishes to express his appreciation to everyone who
contributed to the interesting research environment.
‘Work reported herein was supported in part by Project MAC, an
M.1.T. research program sponsored by the Advanced Research
Projects Agency, Department of Defense, under O0ffice of Naval -
Research Contract Number Nonr-4102(02). Reproduction in whole
or in part is permitted for any purpose of the United States
Government. .
This research was also supported by the South-African Chamber
of Mines and the Council for Industrial and Scientific Research.


<!-- PK PAGE 8 doc=math_p23 -->
SHAPE FROM SHADING: A METHOD FOR OBTAINING
$$
THE SHAPE OF A SMOOTH OPAQUE OBJECT FROM ONE VIEW=*
$$
Abstract
A method will be described for finding the shape of a smooth
opaque object from a monocular image, given a knowledge of the
surface photometry, the position of the light-source and certain
auxiliary information to resolve ambiguities. This method is
complementary to the use of stereoscopy which relies on matching
up sharp detail and will fail on smooth objects. Until now the
image processing of single views has been restricted to objects
which can meaningfully be considered two-dimensional or bounded
by plane surfaces.
It is possible to derive a first-order non-linear partial differential equation in two unknowns relating the intensity at the image
points to the shape of the object. This equation can be solved by
means of an equivalent set of five ordinary differential equations.
A curve traced out by solving this set of equations for one set of
starting values is called a characteristic strip. Starting one of
these strips from each point on some initial curve will produce the
whole solution surface. The initial curves can usually be constructed around so-called singular points.
A number of applications of this method will be discussed including
one to lunar topography and one to the scanning electron microscope.
In both of these cases great simplifications occur in the equations.
A note on polyhedra follows and a quantitative theory of facial makeup is touched upon.
An implementation of some of these ideas on the PDP-6 computer with
its attached image-dissector camera at the Artificial Intelligence
Laboratory will be described, and also a nose-recognition program.
*This report reproduces a thesis of the same title submitted to
the Department of Electrical Engineering, Massachusetts Institute
of Technology, in partial fulfillment of the requirements for the
degree of Doctor of Philosophy, June 1970.


<!-- PK PAGE 9 doc=math_p23 -->
Page 4
0. CONTENTS
1. INTRODUCTIONM 7
1.1 SHADING AS A MONOCULAR DEPTH CUE 7
1.2 HISTORY OF THE PROSLEM , 13
1.3 PREVIEW OF CHAPTFRS - GUIDE TO THE HURRIED RFADER 17
2. THEORETICAL RESULTS 19
2.1 THE REFLECTIVITY FUNCTION 19
2,1.1 DEFINITION OF THE REFLECTIVITY FUNCTICN 19
2,1.2 FUNCTIONS DERIVED FROM THE REFLECTIVITY FUNCTION 22
2.1.2,1 THE INTEGRATING PHOTOMETER 22 -
$$
2.1.2.2 PERFECT DIFFUSERS = LAMBERT®S LAW 26
$$
2,1.2,3 THE BOND ALBEDGC 27
2.1.3 THE DISCRIMIMANT 1+2IEG-(I%*+E*+g™) 27 .
2.1.4 REFLECTIVITY FUNCTIOMS AND THEIR MEASUREMEMT 30
2.,1.5 MATHEFAT ICAL MODELS OF SURFACES 37
2.2 CALCULATION OF IMAGE ILLUMINATION- 34
2.3 THE IMAGE ILLUMINATION EQUATIOM 37
2.3.1 PREVIEW OF HOW TO CBTAIN THF PARTIAL DIFFERENTIAL
EQUAT ION 37
2.3.2 NOTATION FOR VECTOR DIFFEREMTIATION 40
2,3.3 THE EQUATION IS A FIRST-GRDER MOM-LINEAR P,D.E. 47
2.3.4 SOME DERIVATIVES NEEDED IN THE SOLUTIOM 43
2,3.5 THE EQUIVALENT SET OF ORDIMARY DIFFERENTIAL
EQUATIONS 44
2.3,6 OUTLINE OF PROOF OF EQUIVALENGCE OF THE SET OF
0.D.E.”S TO THE P.D.E, 46
2.3.7 INITIAL CONDITIONS NEEDED 45
2.4 SIMPLIFYING CONDITIONS AND UNIFORM ILLUMIMATION 49
2.5 THE FIVE O,D.E”S FOR THE IMAGE ILLUMIMATIOM EQUATION 54
2.6 CAMERA PROJECTION EQUATIONS 54
2.7 OBTAINING INTENSITY GRADIENTS 57
2,5 OBTAINING INITIAL CONDITIONS 59
2.8.1 USE OF THE SINGULAR POINTS 59
2.8.2 THE SOLUTION WILL NOT MOVE FROM A SINGULAR POINT 41 .
2.8.3 GETTING THE INITIAL CURVE FROM A SINGULAR POINT 63
2.9 NON-POINT SOURCES 66
2.9.1 CIRCULARLY SYMMETRIC SOURCES 66
2,9.2 MULTIPLE SOURCES 68 -
2.10 TYPES OF EDGES 68
2.17 SHADOWS AND SELF-ILLUMINATION 70
2,12 THE INVERSE PROBLEM - GENERATING HALF-TONE IMAGES 77
2.13 HUMAN PERFORMAMCE WITH MOMOGULAR PICTURES 74
2.14 ERRORS AND INCOMNSISTENCIES 75
2.15 WHAT ARE LIKELY SOURCE DISTRIBUTIONS? 7¢
2.15,1 RELEVANCE TO PHOTOGRAPHY AND GRAPHICS 79
2,16 DETERMINING SHAPE FROM TEXTURE GRADIENTS §2


<!-- PK PAGE 10 doc=math_p23 -->
Page 5
3, PRACTICAL APPLICATION &5
3.1 THE SCAMNING ELECTROMN MICROSCOPE &5
3.7.1 DESCRIPTICY OF THE SCANMMING ELECTRCM MICRCSCOPE &5
3.1.72 EQUATIOMNS FOR THE SCANNING ELECTRCN MICROSCOPE &8
3,1.3 AMBIGUITIES AMD AMBIGUITY EDGES 90
3.2 LUMAR TOPOGRAPHY 93
3.2.1 INTRODUCTIOM TO LUMAR TOPOGRAPHY 93
32,2.2 REFLECTIVITY FUMCTION FOR THE MARIA OF THE MOCH 94
3.2.3 DERIVATICON OF THE SOLUTIOM FOR LUMAR TOPOGRAPHY 95
3,2.3.1 THE BASE CHARACTERISTICS 95
$$
3.2.3.2 THE INTEGRAL FOR =z 102
$$
3.2.3.,3 THE INTEGRAL FOR r 106
3,2.4 SOME COMMENTS ON THE INTEGRAL SOLUTION 109
3.3 APPLICATION TO OBJECTS BOUNDED BY PLANE SURFACES 110
3.4 FACIAL MAKE-UP 113
4, EXPERIMENTAL RESULTS 116
4.1 A PROGRAM SCLVING THE CHARACTERISTICS SEQUENTIALLY 1756
4,1.1 AUXILIARY ROUTINES 1168
4.1.1.,1 STEREQO PROJECTION AND OBJECT ROTATION 119
4,1.1.2 MEASURING THE REFLECTIVITY FUNCTICN 122
4.1.1.3 FINDING THE CALIBRATICN SPHERE 124
4,1.1.4 FINDING POINTS FOR GIVEN i AND e 126
4,1.1.5 SOME REFLECTIVITY FUNCTIONS 128
4,1.1.6 PROPERTIES OF THE IMAGE~DISSECTOR 132
4,1.2 NUMERICAL METHODS FOR SOLVING THE O0.D.E.”S 135
4,1.3 ACCURACY OBTAIMNABLE 13§
4,1.4 PROBLENMS WITH THE SEQUENTIAL APPROACH 139
4,2 A PROGRAM SOLVIMG THE CHARACTERISTICS IN PARALLEL 141
4,2,1 THE BASIC DATA STRUCTURE 142
4,2,2 EXTRA PRCCESSING POSSIBLE 144
4.,2,2.1 SHARPENING - UPDATIMG P AMD ¢ 144
4,2,2.2 INTERPOLATION AMND CROSSING TESTS 146
4,2.2.3 OBTAINING GOOD INTENSITY GRADIENTS 49
4.2.3 A DOZEMN REASONS TO TERMINATE A CHARACTERISTIC 152
4,2.4 OPERATION OF THE PROGRAM 154
4,2,4,1 THE INTEGRATIOM PROCESS 154
4,2.,4,2 OTHER PROCESSING AVAILABLE 161
4,.2.5 INSENSITIVITY TO IMPERFECTIONS IM THE SEMNSCR 163
4,3 A NOSE-RECOGNITION PROGRAHM 169
4,3,1 MODIFICATIONS TO THE BASIC PRCGRAM REQUIRED 170
4,3,2 NORMALIZATION PROCEDURE 175
4,3,3 COMPARISOM PROCEDURE 17¢
4.3.4 RESULTS OF THE NOSE-RECOGNITION PROGRAM 161
4.4 SUMMARY AND CONCLUSIONS 169
4,4.1 SUCGESTICNS FOR FUTURE WORK 191
5, REFERENCES 165


<!-- PK PAGE 11 doc=math_p23 -->
6
W T . Lt Y
-t P g ..o
e Wl ) / 1& Ehaa it
- H - ,,“' / /aj b ‘*\\\x e e
/// }\\\\"
/f/// ﬁ ‘\q \\§ ,
| : "’& Yy N
$$
N = A T o W
$$
R L “-i }i,’,’],é:,ﬂ‘!_‘x”:k
P . U e AEES O '
KB W . Y. T e
b g . ;‘?' o:g' R "“"\;'u‘; E N" q
it RIS RO Ko SR oy
s B X\
St N |
il BT
i, s - i
h "l’;: Camaith:
L :;;rig,“\\?
k i .
L s e ey :
ot e G Ty e
. . “‘;ﬁb&}:’ "rvf’w*’%{?‘? VE
Figure 1: Pictures of a nose with superimposed characteristic
rtgure | p
solutions and contours. Shape determined from the
shading (not intensity contours). See section 4.3
for details.


<!-- PK PAGE 12 doc=math_p23 -->
Page 7
1, INTRODUCT ICH ¢
1.1 SHADING AS A MONOCULAR DEPTH CUE:
Consider a smooth object known to have a uniform surface. An
image of such.an object will exhibit shading (gradations of
reflected light intensity) which can be used to determine its
shape, given only a picture from a single viewpoint, This is
not obvious since at each point in the image we know only the
reflectivity at the corresponding object point. For some
points (called singular points here) the reflectivity does
uniquely determine the local normal, but for almost all
points it does not. The shape of the surface cannot be found
by local operations alone.
oo
~O SOURCE
NORMAL
. 0 )3
i < SENSOR
Figure 2: Definition of the incident (i), emittance (e)
and phase angle (g).


<!-- PK PAGE 13 doc=math_p23 -->
Page §
For many surfaces the fraction of the incident light which is
scattered in a given direction is a smooth function of the
angles involved, It is convenient to think of the situation
as depending on three angles: the incident angle (between
local normal and incident ray), the emittance (or emergent)
angle (between local normal and emitted ray) and the phase
angle (between incident and emitted rays), i
It can be shown that the shape can be obtained from the ‘
shading if we know the reflectivity function and the position
$$
of the light=-source(s), The reflectivity and the gradient of
$$
the surface can be related by a non-linear first-order
partial differential equation in two unknowns. The recipe '
for solving this equation is to set up an equivalent set of
five ordinary different.ial equations (three for the
coordinates and two for the components of the gradient) and
then to integrate these numerically' along certain curved
paths on the object called characteristics [5]. For while we
cannot determine the gradient locally, we «can, roughly )
speaking, determine its component in one special direction,
Then taking a small step in this direction, we can repeat the i
process - the curve traced out on the object in this manne:
is called a characteristic. Its projection on the image
plane will be referred to as the base characteristic, The
shape of the visible surface of the object is thus given as a


<!-- PK PAGE 14 doc=math_p23 -->
Page 9
sequence of coordinates on some such curves along its
surface.
An initial known curve on the object Is needed to start the
solution. Such a curve can usually be constructed near the
r
singular points mentioned earlier using the known local
normal. The only additional Information needed is the
distance to the singular point and whether the surface is
convex or concave w.r,t, the observer at this point - such
ambiguities arise in several other instances in the process
of solution as will be seen.
%i&;“’%ﬁm ters Deall g D B
g ﬁ%@é’% ﬁgﬁw “Z;;m%»@g @Mwﬁ*m”ﬁ« et
\ e ’;wfgfxf%’{“ﬁ“‘miﬁ%%% SRR L
, Coe anid e y“:@%m%m%«@ﬁ“% 1x14fe%3£‘ fil
' e e aernoh (I R e e
P Tc; - s ,"*ﬁi‘?‘&n{c%‘:;ivgg}.ﬁimiwj#?"?‘y&gv}‘{Y‘J‘}! \xs'g,%i:’!; ,,g:%:' v‘i‘),;w“ S A
R W Rt ks g od
. . o
. e B
B B oo s SR I S el
Y i B e gg’*‘“%; e e AR
G e By i s ol B g S s
. ” 5 &Wifg“"@*ﬁ% e Seiimalelt S
L 4«2""5%”*‘ *aﬁ?‘“%ﬁ%ﬁ&;ﬁ LRy - "fﬂﬁ%
< mﬁ%*‘%%%wﬁwwﬁﬁfw w‘*'@i‘;«%@ﬁ» e L
e e e ”:é“f“‘*%? LG
%;ﬁ?ﬁ.w@%‘}:* S A e
SRR G e el e tail
Figure 3: Image of a sphere and a stereo-pair of the
characteristic curves obtained from the shading.
To solve the equations, the reflectivity as a function of the
three angles must be known, as well as the geometry relating
light-source, object and observer. Multiple or extended


<!-- PK PAGE 15 doc=math_p23 -->
Page 10
light-sources increase the complexity of the solution
algorithm presented. But all of this initially needed
information can be deduced from the 1image if a calibration
object of known shape is present in the same image.
Furthermore, incorrect assumptions about the reflectivity
function and the position of the light-source(s) can lead to
inconsistencies in the solution and it may be possible to -
utilize this information in the absence of a callbration
object. -
In practice it is found that if the object is at all complex,
its image will be segmented by edges. Some of these are
purely visual, due to the occlusion of one surface by
another, others are angular edges (also called joints here)
on a single object. Another kind of edge is the ambiguity
edge. This is an edge which the <characteristics cannot
cross, indicating an ambiguity which cannot be resolved
locally, One can solve inside each region bounded by these
various edges, but some global or external knowledge |is
‘ needed to match up the regions, In the case of an angular
edge on the object one can integrate up to the edge and then -
use the known location of the edge as an initial curve for
another region (provided one resolves the ambiguity present
here, as on all initial curves).


<!-- PK PAGE 16 doc=math_p23 -->
Page 11
A very similar situation also obtains when one bridges a
shadow. Since one edge of the shadow and the position of
the light source is known, we can trace alcong the rays
grazing the edge until the corresponding image points fall on
an illuminated region. Since we know the path of each ray,
we can calculate the coordinates of the point where it
impinges on the object. The edge of the shadow (whick need
not be on the same object) can now serve as an initial curve
from which to continue the solution,
A number of Iinteresting applications of this method can be
ment ioned. The first of these concerns the scanning electron
microscope (SEM) which produces Images which are particularly
easy to interpret, since the intensity recorded is a function
of the slope of the object at that point and is thus a form
of shading (as opposed to optical and transmission electron
microscopes which produce intensities which depend on
thickness and optical or electron density). The geometry of
t he scanning electron microscope allows several
simplifications in the algorithm for determining shape from
shading (e.g. there are no shadows). Because of the random
access capability of the beam of this microscope it should bhe
easy and useful to combine it with a small computer to obtain
three-dimensional information directly,


<!-- PK PAGE 17 doc=math_p23 -->
Page 172
Another important application lies in the determination of
lunar topography. Here the special reflectivity function of
the material in the maria of the moon allows a very great
simplification of the equations wused in the shape~from
shading algorithm, The equations in fact reduce to one
integral which has to be evaluated along each of a family of
predetermined straight lines in the image, making for high i
accuracy. This problem was first tackled for areas near the
terminator (the dividing line between the illuminated and tle
unilluminated part of the moon’s disk) by J. van Diggelen at
the Astronomical Institute of the Netherlands in 1957 [2] and
solved by T, Rindfleisch at the Jet Propulsion Laboratory in
1966 [4] and the method applied to several pictures returned
by the Ranger spacecraft, This gave the first indication
that the general solution discussed here might be possible.
It should be pointed out that this method is complementary to
the use of stereopsis, since the latter will match up sharp
detail and edges while the shading information will determine i
the shape of the smooth portions of the surface;
So far we have assumed that the surface is uniform In its
photometric properties, Any non-uniformity will cause this
algorithm to determine an incorrect shape. This is one of
the uses of facial make-up; by darkening certain slopes they


<!-- PK PAGE 18 doc=math_p23 -->
Page 13
can be made to appear steeper for example. In some cases
surface-markings can be detected if they lead to
discontinuities of the calculated shape.
Judging by our wide use of monocular pictures (photographs or
even paintings and woodcuts) of people and other smooth
objects, humans are good at interpreting shading information.
The short-comings of our method which are related to the
shading information available can be expected to be found in
human visual perception too. It will of course be difficult
to decide whether the visual system actually determines the
shape quantitatively or whether it uses the shading
information in a very qualitative way only. A quantitative
determination would involve operations more complicated than
those used in edge-finding for example; Since the
information is not local, the surface-shape calculations
cannot be carried out entirely in parallel.
1.2 HISTORY OF THE PROBLEMN:
After formulating the image illumination equation as the
basis of a method of finding shape from shading, a literature
search was performed to see if a solution had previously been
obtained. The literature on perception has only a few


<!-- PK PAGE 19 doc=math_p23 -->
) Page 14
conjectures on the possibility of determining shape from the
monocular depth-cuec of shading. Photogrammetry does not pay
much attention to the reflectivity function, but cnly varlous
integrals of it, measured by such devices as the integrating
photometer. Vilth few exceptions machine perception so far
has been restricted to objects whbich can usefully be
considered two-dimensional and objects bounded by planes )
(polyhedra).
The cne relevant research was found in tke paper on lunar
topography by T, Rindfleisch [4] which gives complete details
of a solution obtained in the form of an integral in the
special case of the reflectivity function of the moon. This
raised the hope that a general solution existed. The
(x’,y’,r) coordinate system used in [4] leads to Intractable
equations - but we found a solution wusing a different
coordinate system, (x”,y”,z). As a check the solution for
lunar topography was rederived from this set of equations
(Rindfleisch found his solution in quite a different manner - ;
searching for predetermined curves in the image along which
the surface can be found as some integral Iinvolving the )
measured image illumination). A first program (old SHADE)
was then written which solved along one characteristic at a
time using various predictor-corrector-modifier methods [7].


<!-- PK PAGE 20 doc=math_p23 -->
Page 15
Another program (REFLEC) was used to measure the reflectivity
$$
function from a calibration sphere., Various short=comings of
$$
our image-dissector sensing device were affecting the
accuracy of these miasurements, Since very little was known
about the <characteristics of this device on other than
theoretical grounds [9], a program (TEXTUR) was developed to
measure various properties such as resolution, signal to
_ noise ratlo, drift, settling time, scatter and pinholes in
the photocathode. An attempt was then made to provide
software to compensate for some defects such as distortion
and non-uniform sensitivity, using measurements from test
patterns (DISTOR).
_ These techniques allowed an estimation of what accuracy can
be achieved under optimal conditions,. The program had
numerous problems when dealing with objects other than simple
convex ones (mostly because it solved each characteristic
separately) and as must be apparent, was sensitive to
) imperfections in the sensling device (partly because of the
., way It obtained intensity gradients),
After the defects In the first program had been found, and a
decision made tc rewrite it, a great -simplification of the
main equations was found using a different coordinate system
(x,y,2) and a slight extensicn of standard vector notation


<!-- PK PAGE 21 doc=math_p23 -->
Page 16
(the voluminous equations for the inconvenient coordinate
system (x7,y",z) are not reproduced here), An unfortunate
but unimportant side~effect is an increase in the complexity
of the derivation of the lunar topography integral. The new
equations and numerous changes in the method of solution were
incorporated in a new program (new SHADE) which was less
sensitive to the various shortcomings of our Image-dissector, )
This program can handle objects somewhat more complicated
than its predecessor and solves all characteristics at the
same time.
In parallel with the programming work, thecoretical efforts
viere made to define and get around some of the difficulties
of the method of shape from shading. Of particular interest
were applications where the equations simplify greatly. |
Unfortunately the massive simplification found in the case of
lunar topography Is unique, Of most interest are the cases
where we have some advance knowledge of the characteristics
(for lunar topography they are corpletely independent of the .
image - for the scanning electron microscope they are paths
cf steepest descent). )


<!-- PK PAGE 22 doc=math_p23 -->
Page 17
1.3 PREVIEW OF CHAPTERS - GUIDE TO THE HURRIFED READER:
References to articles and books listed at the end will be by
numbers encliosed in brackets, Numbers contained in
parentheses refer to sections and subsections in this work,
In an attempt to be complete, a few subsections were included
which will have only limited appeal to some readers; hence
this guide.
Chapter 1 provides an introduction to the depth-cue of
shading, its wuse in determining shape and its history,
Chapter 2 develops the necessary equations in detail,
starting with the definition of the reflectivity function.
Subsect ijons 2.1.2 to 2.1.4 and 2.2 can well be skipped by the
hurried reader. In section 2.3 the partial differential
equation is obtained, the vector differentiation notation
introduced and an equivalent set of five ordinary
differential equations derived, Section 2.3 is perhaps the
: most important section. Sections 2,12 to 2.16 deal with some
miscel laneous implications~and may be omitted without loss of
continuity.
Chapter 3 describes in detail some practical situations where
the special conditions encountered make use of the method of
determining shape-from-shading particularly attractive.


<!-- PK PAGE 23 doc=math_p23 -->
Page 18
Section 3.1 deals with the scanning electron microscope. The
reader should be warned about the tedious derivation of the
simple integral for the case of lunar topography in 3.2 .
Omitting subsection 3.2.3 will avoid the bulk of the
algebraic detail, and most of the conclusions will be found
anyway In subsection 3.2.4 .
Chapter 4 describes the experiments carried out with the two )
programs (using the results developed in chapter 2) to obtain
shapes from images projected on an image dissector camera
attached to the PDP-6 conmputer in the Artificial Intélligence
Laboratory, Section 4.1 deals with the less successful first
program, and contains details on auxiliary routines, Section
4.2 deals with tke second program which solves t he
characteristics in parallel and also wuses the important
sharpening process. Sections 4,1 and 4.2 are next in
importance to section 2.3 .
Section 4,3 describes an application to a recognition task - -
that of nose-recognition, Section 4.4 contains an overall
summary and conclusions about the capabilities of the method '
of shape-from-shading, with subsect ion 4.,4.,1 giving
suggestions for future investigations., This is followed by a
list of references.


<!-- PK PAGE 24 doc=math_p23 -->
Page 19
2. THEORETICAL RESULTS:
2.1 THE REFLECTIVITY FUNCTION:
2.1.1 DEFINITION OF THE REFLECTIVITY FUNCTION:
- \6/
-O-
! L)
e SOLID ANGLE dw
9
SURFACE AREA dS
Figure 4: ITlustration of the variables used in the
definition of the reflectivity function.
Consider a surface element of slze dS inclined i w,r.t, the
incident ray and e w.r.t., the enitted ray (The angles are
‘ measured w.r.t. the normal). Let the incident light
intensity be I, per unit area perpendicular to the incident
ray. The amount of light falling on the surface element is
then I, cos(i) dS.
Let the emitted ray bhave intensity I, per unit solid angle
per unit area perpendicular to the emitted ray. So the


<!-- PK PAGE 25 doc=math_p23 -->
Page 20
Lot AL
NORMAL
+o RECEPTOR
EMERGEN,
$$
=<~ - r ANGLE e
$$
IN \\‘
c'bg \\\
Nr A \\\ [
Y/ \\ M
SLe p \!\\ »6_’3
L~ X¥ :
| 3
. Vd ‘Lc_
| «t :
. /
| 7
e -
/i
;o |
T |
7
/7 !
I'd P
. 7/ y |
/ ! |
i | .
7 O l
Ve . .
s - |
’ -/-/ ’
Z SuRFACE ]
- \-\.\- '\!
$$
tan(a) = cos(e)cos(g) - cos(i)
$$
cos(e)sin(g) -
$$
cos(A) = cos(g) - cos(i)cos(e)
$$
sin(i)sin(e)
Figure 5: Definition of the azimuth angle (A) and the
projection of the emittance angle on the phaseangle plane -(a).


<!-- PK PAGE 26 doc=math_p23 -->
Page 21
amount of light intercepted by an area subtending a solid
angle dw at the surface element will be I, cos(e) dS dw. The
reflectivity funcion &(i,e,g) is then defined to be I1,/1,.
If we want to be more precise about what units the intensity
is measured in, we have to take into account the spectral
) distribution of the light emitted by the source, as well as
the spectral sensitivity of the sensor (with this proviso we
can spcak of watts per unit area and watts per unit solid
angle per unit area etc.)., We need not be too concerned with
this if we either use white paint, or measure the
reflectiivity function with the same equipment later used in
the shape-from~shading algorithm, It should be noted that
for most surfaces the reflectivity function is not
independent of the color of the light used. Typically the
specular component of the reflected light, being reflected
before it has penetrated far into the surface, wlill be
unchanged, while the matt component will be colored by
: pigments in the surface coating.
) Several other definitions of the reflectivity function are in
use which are multiples of the one defined here by 7, 2,
cos(e) and/or cos(i), The specific formulation chosen here
makes the equation relating the incident light intensity to
the image illumination very simple.


<!-- PK PAGE 27 doc=math_p23 -->
Pare 272
2.,1.2 FUNCTIONS DERIVED FROM THE REFLECTIVITY FLNCTIONM:
The next few subsections (2.1.2,1, 2.1.2.2 and 2.,1.2.3) are
included to relate the reflectivity functions to those more
commonly mentioned in the literature, Some readers may want
to skip these subsections, )
2.,1.2.,1 THE INTEGRATING PHOTOMETER:
A flat sample of the surface under investigation is mounted
in the center of a8 hollow sphere coated on the inside with a
highly reflective matt substance. Through one small hole a
light ray enters and impinges on the sample with incident
angle 1. A photosensitive device 1is introduced through
another small hole and measures an Intensity proportional to
the light scattered by the sample into all directions.
The total intensity measured is: .


<!-- PK PAGE 28 doc=math_p23 -->
Page 23
SENSOR
SOURCE l:/
N
\Q / &
A
SAMP
AMPLE |
| |
|
ﬁ*\\"--.____m~_____,ﬂ~—’///4l
. A
Figure 6: A gonio-photometer (used for measuring
reflectivity functions).
S SENSOR
S
€
)
INTEGRATING
SPHERE
Figure 7: An integrating photometer.


<!-- PK PAGE 29 doc=math_p23 -->
Page 24
1T~ T7/2
h/r\~}[nllcos(e) dS sin(e) de dA
o Jo
T S/
7 i.e.: »/(\y/f\ +(i,e,g) J,cos(e) dS sin(e) de dA
o Yo
$$
Whe re cos(g) = cos(i) cos(e) + sin(i) sin(e) cos(A)
$$
The total incident intensity is I cos(i) dS. The fraction of ’
light reflected is then: i
2 ~Tr/2
$$
b(i) = {Jr\ v/A{)(i,e,g)--':(l/.’/.'):‘rsin("’e) de dA 1l/cos(i)
$$
o o .
This function of the incident angle i has been measured for
many paints and pigments, while the reflectivity function ¢
is known for very few surfaces. Since it is difficult to
, relate measurements of I, to measurements of total! reflected
intensity, the device is usually calibrated with the sample
replaced by a standard of known high reflectivity (e.g. Mg0
or BaS0, powder reflect more than 99% of the incident light
in the visible spectrum). .


<!-- PK PAGE 30 doc=math_p23 -->
Page 25
N
' de
1 AN
L
e TR AN
e ~\
/&;——-’\\
A P
—7 dA
Figure 8: Illustration showing quantities appearing in the
integral for the integrating photometer.
di
{I;:‘....-‘\\
Figure 9: Illustration showing quantities appearing in the
integral for the Bond albedo.


<!-- PK PAGE 31 doc=math_p23 -->
Page 26
2.1.2.2 PERFFECT DIFFUSERS -~ LAMBERT’S LAW:
Surfaces made of finely divided powder wusually closely
' approximate what htas been called 2 lambertian reflector or
perfect diffuser. Lambert ian emission was first defined for
black-body radiation and is such that the surface of the body
appears equally bright from all directions. In the context )
of reflectivity functions we call a surface lambertian If
$$
¢ = k cos(i) (the <cos(i) accounts for the variation in
$$
incident radiation). For the highly reflective standards
ment ioned above, we chose k such that all the incident light
is reflected.
21 T2
$$
{J(\ v/A\(I/Z)*s?n(ZG) de dA =1
$$
$$
[} (=]
$$
$$
k = 1/7T
$$
In addition to the various multiplicative factors shown
above, a normalized reflectivity functlion 1Is also wused, .
whe re :
$$
pb Ule,) = §(ie,e)
$$
$$
/9 is called the normal albedo and +'(0,0,0) =1,
$$


<!-- PK PAGE 32 doc=math_p23 -->
Page 27
?2.1.2.3 THE BOND ALBEDO:
Another integral of the reflectivity function which is used
is the Bond albedo, defined by astronomers as the ratio of
total reflected light from a sphere divided by the total
incident light .
If the incident intensity is I,, then the ratio of reflected
light to incident light is:
1w/t
$$
b= 11 fb(i) 277r sin(i) cos(1) di 1/(Itrr®)
$$
o
™/
$$
= V/ﬁ\ b(1) sin(2i) di
$$
[«
T2 ~N2T T/ 2
$$
=ff f{m,e,g) sin(i) sin(2e) de dA di
$$
o o o '
2.1.3 THE DISCRIMINAMNT 1+2IEG-(I +E~+G )
In this subsection a discriminant 1is developed which is
needed in the program implementing the shape-from-shading
algorithm. This section can be skipped without loss of
continuity,


<!-- PK PAGE 33 doc=math_p23 -->
Page 2§
The three angles i, e and g, being the sides of a spherical
triangle, have to satisfy the following relationships:
ite > g, e+tg » 1 and g+i ) e
It 1Is often convenient to express these three relationships
in terms of the cosines I, E and G of the three angles. We
first note that only one of the relationships could fail at a 3
time. For example if i+e < g :
i+%2e < g+e i.e. i < g+e and
2i+e < g+l i.e, e < g+i
The angles are all positive and less than TT7. Mow assume
that the condition i+e < g holds, then:
cos(i+e) > cos(g)
since cosine is monotonic decreasling for angles between 0 and -
TT. Expanding we get:
cos(i) cosle) - cos(g) > sin(il) sin(e)
Since the right-hand side 1is positive, the left-hand side
will be too and we can square the expression, Using I, E and


<!-- PK PAGE 34 doc=math_p23 -->
Page 29
G to stand for the cosines of i, e and g we get:
| (IE-G)" > (1-1*)(1-E%) i.e.
1+2 IEG-(I*+E*+G™) < 0
We now have to prove the converse 1i.,e, if the angles can
indeed form a spherical triangle then the discriminant will
be positive. Since i { e+tg we have g » i-e and similarly
since e { i+g we have g ) e~-i, so:
g » |e-i] and similarly | ) |g-e] and e ) |i-g]
Applying the cosine as before we get:
cos(g) - cos(1) cos(e) { sin(i) sin(e)
$$
cos(i) = cos(e) cos(g) { sin(e) sin(g)
$$
cos(e) - cos(g) cos(1) { sin(g) sin(l)
. From i+e { g etc. we get the same inequalities with the sign
reversed on the left-hand side. We needed to go to the
trouble of showing that these inequalities hold for absolute
values of the left-hand side, since it no longer |is
constraint to be positive., So we have:


<!-- PK PAGE 35 doc=math_p23 -->
Page 30
| IE-G] ¢ sin(i) sin(e)
|EG-I] ¢ sin(e) sin(g)
|GI-E| ¢ sin(g) sin(i)
Multiplying we get:
| CIE-G)(EG-I)(GI-E)| & (1-1*)(1-E*)(1-G™)
Using one of the two signs for the right-hand side and
expanding we get:
$$
(1-1EG) (1+21EG=(I*+E™+G*)) ) 0
$$
Since |I], |E] and |G| ¢ T we have (I-IEG) ) 0 and hence:
14 2IEG-(I™+E-+G%) ) 0
2.1.4 REFLECTIVITY FUNCTIONS AND THEIR MEASUREMENT : -
Surfaces where the three parameters i, e and g are not
sufficient to fully determine the reflectivity are unsuitable
for this analysis (or at least reduce the possible accuracy).
Examples are translucent objects and those with non-isotropic
$$
surface properties (e.g. the mineral commonly called tiger=-
$$


<!-- PK PAGE 36 doc=math_p23 -->
Page 31
eye, hair, thin wax), Perhaps the most important determinant
of the reflectivity function is the micro-structure of the
surface (i.e. that structure smaller than the resolution of
the sensor used in the determination of the reflectivity) and
different reflectivity functions may apply at different
magnifications (in addition, at high magnification objects
become increasingly translucent). It 1is best then to
determine the reflectivity function under conditions similar
to those wused in the determination of the shape of the
object.
One way to measure the reflectivity function is to employ a
gonio-photometer fitted with a small flat sample of the
surface to be investigated. The device can be set for any
combination of incident, emittance and phase angles.
To avoid having to move the source and the sensor into all
possible positions w.r.t, a flat sample of the surface when
. measuring the reflectivity function, it Is convenient to have
a test-object which presents all possible values of | and e
for a given g. (The constraints are i+te { g, e+g £ i and
g+i { e ). Use of such an object is greatly simplified by
using a telephoto lens and a distant source, giving almost
constant g. It Is convenient to tabulate the reflectivity
versus i and e for each of a series of valurs of g. A sphere


<!-- PK PAGE 37 doc=math_p23 -->
Page 32
is perbaps the easiest test-object to use if one is willing
to live with the decreasing accuracy in determining e as one
approaches the c¢dge.
One could also have an object of known shape in the same
scene as the object to be analysed, This solves the problem
of having to know the source location and the transfer ’
properties of the image forming system as well, In some )
cases objects of known shape and surface characteristics
differing from those of the object wunder study are useful -
for cxample a sphere with specular reflectivity can pinpoint
the locatlion of the light~sources (e.g. the eyes in a face),
2.1.5 MATHEMATICAL MODELS OF SURFACES:
A number of attempts have been made to predict reflectivity
functions on a theorectical basis starting with some assumed
micro-structure of the surface. White matt surfaces are .
usually finely divided grains of transparent material (e.g.
snow and crushed glass). White paint wusually consists of -
transparent ‘pigment” particles (e.g. of Si0, or TiO0, ) of
high refractive index (1.7 to 2.8) and small size (optimally
about the wavelength of visible light) suspended in a
transparent medium of low refractive index (1.3 say). If one


<!-- PK PAGE 38 doc=math_p23 -->
Page 33
PIGMENT TRANSPARENT
PARTICLES(H!GH/D MEDIUM (LOW/.«]
RO NN
— v
larg z Egij
& N @%é @ 07
v 3 O e e,
Figure 10: Model of surface-structure.
- 2
iiii
~—"" | | ‘
OPAQUE REFLECT IVE SUBSTANCE
Figure 11: Another model used in the derivation of
theoretical reflectivity functions.


<!-- PK PAGE 39 doc=math_p23 -->
Page 34
choses a somewhat regular arrangement of suspended particles
of wuniform size and makes some very restrictive assumptions,
one can derive a reflectivity function and study its
dependence on various parameters describing the model of the
surface.
Another type of surface 1is that of a highly reflective ‘
material (such as a metal) where the light rays do not )
penctrate into the material. Choosing a particular type of
surface depression and a statistical distribution of the size
of these, one can again derive a reflectivity function., Only
a few such models have been studied and little hope exists
for modelling real surfaces well enough and still deriving a
closed expression for the reflectivity function.
2,2 CALCULATION OF IMAGE ILLUMINATION:
The equations derived in this section are only Included for -
. reference, since the program to be described later avoids
their use by means of a normalization of the image intensity, )
These equations do have their immortance however In
justifying the choice of definition for the reflectivity
function and in designing optical systems used in
experimentation with the shape~from-shading method,


<!-- PK PAGE 40 doc=math_p23 -->
Pape 35
\
(I+ ) fo () 1o 4
//d[
i/ 2 _ A,
€
‘ i
LENS IMAGE
~ 7
1;?\
Figure 12: Diagram of optical system and quantities needed
in the calculation of image illumination.
Let d be the diameter of the pupil of the image forming
device, f, its focal length and M the image magnificatlion
(the ratio of the length of a line in the image to the
corresponding parallel line on the object).
Let a portion of the object surface of area dAg be inclined
at angle e to the line from It to the image-forming devlice.
$$
i Its image will have an area of dA; = dAoMl/cos(e).
$$
Let the incident intensity at the object patch be I, per unit
area perpendicular to the (incident ray, Then the emergent
$$
intensity per unit solid angle will be I, = I, ¢(l,e,g). The
$$
light captured by the image forming device is I, dA dw/cos(e)
where dw is the solid angle formed by the cone of angle a.


<!-- PK PAGE 41 doc=math_p23 -->
Page 36
$$
dw = 27Tt (l-cos(a/2)) = 47tsin (a/4)
$$
We would like to express this in terms of M and the so-called
f-number fg:
$$
fn=1/0 sin(b/2))
$$
$$
= J(1/74)+(T+M)> (Fo /)t = (1+4M)(fo/d) if (fo/d)>I )
$$
$$
The f-number usually indicated on the lens=harrel is (fo/d)
$$
or /(1/4)+(f, /d)* .
$$
Fr=-(1/4) = (1+M)*(f,/d)"
$$
(1+M)(fo/d) '
$$
cos(a/?) = =
$$
SE 4y + (1+ M) (F, /d)
(4f0-1) '
$$
cos (Q/2) = —_—
$$
$$
(4 fFp+M>=1)
$$
M
$$
dw = 277 (l-/ 1~ ———— ) ]
$$
$$
(4Fr+m2=1) ,
$$
M )
T M — if fa> 1
$$
(4fr+M>=1)
$$
The intensity per unit area in the image is:


<!-- PK PAGE 42 doc=math_p23 -->
Page 37
$$
1, = I, [dA,/(cos(e) M )Ix[cos(e)/dA ] dw
$$
$$
= I, dw/M* = L 2w/ (4fn) if M T
$$
$$
I, = I, § dw/M* = 1,4 Zw/(4F2) if M <1
$$
1t becomes apparent why we chose to define the reflectivity
function the way we did and also why one might want factors
of Tr and/or 2 in the definition, It should be noted that in
practice one does not usually employ this equation, but
rather normalizes the expressions used,
2.3 THE IMAGE ILLUMINATIOM EQUAT ION:
This sect ion contains the derivation of the image
illumination equation and the analytical formulation of the
shape-from-shading problem,
- 2.3.1 PREVIEW OF HOW TO OBTAIN THE PARTIAL DIFFERENTIAL
EQUATION:
At a known point on the object we can calculate g. We would
like to find the gradient (or at least Its component in one
direction) at this point so as to be able to continue the
solution to a neighboring point, Measurement of the light


<!-- PK PAGE 43 doc=math_p23 -->
Page 38
T g
]
|
gt |
/ |
| —
i O
LN | K]
$$
. VRIS, i =
$$
12 » 28]
— O
L < )
O =
5 @ .
@) g |
n
; n 0
NG 7
.\~
.
_ N
N
N
.-——-..—_.—.-———..——._._(f.) A >_
z
w
—
32
N s
2t
< 1\,\ -
' . > )
$$
! N\, “=
$$
| ——
™
Figure 13: Details of the geometry of image illumination
and projection in the imaging system.


<!-- PK PAGE 44 doc=math_p23 -->
Page 39
reflected tells us something about | and e, Since only one
measurement is involved, we cannot generally hope to
determine both i and e locally, but only a relation between
the two. There are exceptlional points where the normal s
locally  fully determined and this is wuseful in finding
initial conditions as explained later, This situation s
contrary to that obtaining 1in the use of texture gradlents
(see section 2.16) where the gradient |Is known locally
(except for a two-way ambiguity). In obtaining a solution
from the shading, only a global approach will work,
Collapse the two principal planes of the image-forming system
together, forming the x-y plane. Let the z-axis coincide
, with the optical axis and extend toward the object. Let f be
the exit pupil to image plane distance and assume that the
image and object space refractive indexes are equal.
Let t be the ratio of image illumination to object Iluminance
i (can be found from laws of optics - see section 2.2). Let
alx,y,z) be the incident light intensity (usually constant or
$$
obeys some inverse square law), Let A(x,y,2) = t¥a(x,y,2)
$$
$$
Let r = (x,y,2) be a point on the object and r’ o= (x’,y",f)
$$
the corresponding point in the Image.


<!-- PK PAGE 45 doc=math_p23 -->
Page 490
b(x’,y”) is the intensity reasured at the image point
(x°,y7).
$$
Let I = cos{(i), E = cos(e) and G = cos{g) .
$$
$$
Ve have ACr) $(I,E,G) = b(r’)
$$
Let p and a be the partial derivatives of z w,r,t. x and vy. ]
We would like to show that this equation involves x, vy, 2z, p
and q only, '
2.3,2 NOTATIOM FOR VECTOR DIFFERENTIATION:
$$
If A is a vector (3-tuple), then A = |[A| is the magnitude of
$$
$$
A. Also let z = A/ A be the corresponding unit vector,
$$
Consider the dot-product ﬁ.g_as matrix multiplication of the
1 by 3 matrix A by the 3 by I matrix BT (the transpose of B),
Consider partial differentiation w.r.t. a vector as the 3- ;
tuple whose components are found by differentiating w.r.t.
each component In turn. Then for example: )
- ”~
$$
Aﬁ = A
$$


<!-- PK PAGE 46 doc=math_p23 -->
Page 41
At times we will also need the partilial derivatives of vectors
w,r.t, vectors, These are defined as 3 by 3 matrices (the
first row being the result of differentiating w.r.t. the
first component and so on), then for exarple: .
100
$$
A =1 010
$$
~8 \o o1
We will also use partial derivatives of dot-products cof unit
vectors w.r.t, vectors, For example:
AN A
$$
X = A.B and we want Xgq
$$
$$
To avoid finding Zhwe write A X = QE and then:
$$
$$
AEX + A Xﬁ = Aﬁ.g
$$
Extending the definition of dot-product in the appropriate
way we find:
~ 100\ ., ~
$$
AB=lot10]BT = B
$$
2 001
$$
Xp = (1/A)(B - X A)
$$


<!-- PK PAGE 47 doc=math_p23 -->
Page 42
2.3.3 THE EQUATION IS A FIRST-ORDER NON-LINEAR P,D.E.:
If the reflectivity function is ¢(I,E,G), the normalized
$$
incident light intensity at the point r = (x,y,2) is A(r) and
$$
$$
the intensity at the corresponding image point L' = (x",y’,f)
$$
is b(L'), then:
$$
Ar) ¢(I,E,G) = b(r’)
$$
This image [llumination equation is the main equation studied
here. When finding a solution we assume A(:) and +(I,E,G)
are known and b(::) s obtained from the image. We want to
show that the equation is a first-order non~-linear partial
differential equation in two Independent variables, 1.e. an
equation of the form:
$$
F(x, v, 2, p, ) =0
$$
$$
where p = 2, and q = g, are the partial derivatives of =z ]
$$
w.r.t. x and y respectively. From the simple projection
geometry we have: )
$$
r’ = (f/z)*r
$$
~ ~


<!-- PK PAGE 48 doc=math_p23 -->
Page 43
Where f Is the exit pupil to image plane distance. We took
care of image reversal by orienting the x° and y° axes
appropriately. It remains to show that I, E and G are
" functions of x, vy, 2, p and a. An inward normal to the
$$
surface at the point r s n= (p, -q, 1).
$$
$$
Let the light-source be at r, = (xs,Ys5,25) Then the
$$
$$
incident ray will be ry=r-r,, and the emergent
$$
$$
ray -r, = -r. Clearly then:
$$
~A A Pl ~ ~ P d
$$
I = nares E=n.r, and G = Fiere
$$
Where the s denote unit vectors, All the terms thus
involve only x, v, 2, p and gq. It follows that we are deal ing
with a first-order non-linear partial differential equation
in the two unknowns x and vy.
’ 2.3.4 SOME DERIVATIVES NEEDED IN THE SOLUTION:
When solving the P.D.E. by the method of characteristics we
will need the following partial derivatives (see section
2.5), which it Is convenient to introduce here, following the
expansion of I, E and G in terms of dot-products. Using the
results developed in subsection 2.3.2 we get:


<!-- PK PAGE 49 doc=math_p23 -->
Page 44
$$
Iy = Ty, = (1/r )R = 1 7))
$$
$$
In = (I/n)(F = 103)
$$
$$
E, = Ex = (I/r )0 - E 7))
$$
$$
E, = (U/n)(F -ED)
$$
$$
Gr = Gy, + Gy, = (I/rg)(F = G F) + (1/r )(F -G T:) '
$$
$$
G, =0 )
$$
2.3.5 THE EQUIVALENT SET OF ORDIMARY DIFFEREMT IAL
EQUAT IOMS:
The wusual method of dealing with a first-order non-linear
partial differential equation is to solve an equivalent set
of five ordinary differential equations: .
$$
x = F,, y = Fq, z = pFp + qfq
$$
$$
6 = =Fx - pF, and q = -Fy = aF; .
$$
The dot denotes differentiation w.r.t. s, a parameter which )
varies with distance along a characteristic strip. The
subscripts denote partial derivatives. These equations are
solved along so-called characteristic strips (see [5), page
24), The characteristic strip are the characterlstic curves


<!-- PK PAGE 50 doc=math_p23 -->
Page 45
described earlier (values of x, v and 2) plus the values of p
and g on them,
$$
Since we can multiply the equation F = 0 by any non-zero
$$
smoot h function A(x, vy, #, p, q) without altering the
solution surface, we can obtain a different set of equations:
$$
;<=)F,, y =AFy, z=>\(pF,,+qF,)
$$
$$
p =2\(-F, - pFy) and q = X\(-F, = qF,)
$$
The solution to this new set of equations will differ only in
the values of the parameter s at any given point, For
example if we let
$$
=1/ /Fg + Fq + (pF, + qFg)*
$$
t he parameter s gives us arc-length along the
characteristics, This is wused 1In the programs to be
- described later. Of course we can only do this [If the
$$
denominator is not =zero; at singular points and ambiguity
$$
$$
edges it will be zero (l.e, F, = Fq =0 and A >o0), A
$$
different choice for XA will be used later in the discussion
of the scanning electron microscope (section 3.1).


<!-- PK PAGE 51 doc=math_p23 -->
Page 46
2,3.6 OUTLINE OF PROOF OF EQUIVALENCE OF THE SET OF
0.D.E.”S TO THE P.D.E.:
In this subsection the ecquivalence of the five ordinary
differential equations to the image illumination equation is
discussed. The reader who believes the equivalence holds may
well skip this subsection! ’
$$
At a given point (x,, Y., Z,) the equation F(x, y, z, p, q) =
$$
0 represents a relutlon between p and q. That Is, it confines
the possible solution normals at this point to a oneparameter family of directions [5]:
Increments in the feasible tangent planes thus satisfy:
$$
dz = Py (x) dx + g, (x) dy
$$
Differentlating w.r.t, X we get: ;
$$
0 = p/(x) dx + q/(x) dy
$$
(Dashes are derivatives w.r.t. & In this subsection). But
$$
by differentiating the equation F(x, y, =z, P, ) = 0 w,r,t, X
$$
we also get:


<!-- PK PAGE 52 doc=math_p23 -->
Page 47
$$
Fopol) + Fea, () = 0
$$
$$
Hence: dx/Fp = dy/Fq
$$
What we need now are similar equations for feasible
increments in 2, p and g. First we have:
$$
dz = p dx + q dy
$$
in the solution surface (this surface 1is selected from all
possible ones by choosing one passing through a given initial '
curve - see later, subsection 2.3.7). Hence:
$$
| dz/(pF, + qfq) = (p dx + q dy)/(pF, + qFg)
$$
$$
= dx/F, = dy/Fq
$$
$$
Finally differentiating F(x, vy, 2, p, Q) = 0 w,r.t, x and vy:
$$
$$
Fe + Fap + Fop + Fga, =0
$$
$$
- Fy + Fga + Fyp, + Fga, =0
$$
Dz Dz
$$
but py = q —_— = —_—
$$
* dxdy Dydx
$$
dp/(F,+pFy) = = (p,dx + p,dy)/(p,F, *+ p,F) = - dx/Fp
$$
$$
dq/(F,+sz) = = (q.dx + qydy)/(quP + qYFﬂ) = -~ dy/Fq
$$


<!-- PK PAGE 53 doc=math_p23 -->
Page 4§
$$
dx/Fp = dy/Fq = dz/(pFp + qF,)
$$
$$
= ~dp/(F, + pF3) = - da/(F, + qF;)
$$
Introducing the parameter s we get the five 0.D.E.’s
ment ioned earlier. We have shown that a solution to the
P.D.E. must also satisfy theses five 0.D.E.’s, It is a bit
more difficult to show that a solution to these 0.D.E.”s is ’
necessarily a solution of the P,D.E. (see (51, page 128).
Basically it needs to be shown that the equations for p and g
produce results which continue to be consistent (}.e. equal
to the partial derivatives of z w,r.t., x and y).
2.,3.7 INITIAL CONDITIONS MEEDED: _
To select a particular solution surface amongst all possible
solution surfaces one needs to specify an Initial curve
through which thke solution surface must pass:
$$
x = x(t), vy = y(t) and z = z(t)
$$
Along this curve we rnust satisfy:


<!-- PK PAGE 54 doc=math_p23 -->
Page 49
$$
2°(t) = p x7(t) +q y (t)
$$
$$
F(x(t), y(t), z(t), p(t), a(t)) = 0
$$
Here the dash represents differentiation w.r.t. t, This pair
of non-linear equations allows one to find p(t) and q(t)
along the initial curve (there may be more than one solution,
in which case there will be more than one solution surface).
The ‘characteristic strips sprout from this initial curve and
the solution surface can be described parametrically:
$$
x = x(s,t), y=y(s,t), 2 = 2(s,t) and
$$
$$
p =p(s,t), g = als,t)
$$
2.4 .SIMPLIFYING CONDITIONS AND UNIFORM ILLUMIMATICM:
Since the general equations are fairly complex it is of great
interest to find simplifying conditions, Scme of these are
) presented here, others will be found described in chapter 3.
1. DISTANT SOURCE: (Collimated source or the object subtends
a small angle at the source)


<!-- PK PAGE 55 doc=math_p23 -->
Page 50
INIT AL
CURVE >
A CHARACTER(ST\C/'/__ )
t 5
Figure 14: Characteristic strips sprouting from an
initial curve.
\ .
d¢
. \
$$
__—-—e \('..
$$
R Bt
_’-/"’—<____7
A e :
—7 4A
Figure 15: ITlustration showing quantities appearing in the
integral for the case of uniform illumination
(Similar to Figure 8).


<!-- PK PAGE 56 doc=math_p23 -->
Page 51
$$
A,.ri = 0 and for a truly distant source:
$$
Replace I by kr, and let k - o0 then:
$$
' I.=0, I, unchanged
$$
$$
E, =0, E, unchanged
$$
$$
G. = (I/re)(f} -6 Ee) , G =0
$$
In addition choosing the z-axis along . removes further
terms,
2. DISTANT CAMERA: (Telephoto lens or the object subtends a
small angle at the camera)
Replace re by kfe and let k-5 o0 then:
) 1. and I, unchanged
$$
E, = 0 , E, unchanged
$$
$$
Gy = (1/r)(Fp =G T) , Gn=0
$$
In addition choosing the z-axis along Fe removes further
terms.


<!-- PK PAGE 57 doc=math_p23 -->
Page 57
3. DISTANT SOURCE AND DISTAMNT CAMERA:
$$
Ir=20, I, unchanged
$$
$$
E£'= 0 , E,. unchanged
$$
$$
G:=0,Gh=0
$$
Most practical situations are an approximation of this ’
case,
4, SOURCE AT THE CAMERA:
$$
i = re I =E and G =1
$$
$$
I, = Ex unchanged
$$
$$
I. = Es unchanged
$$
$$
Gy=0and G, = 0
$$
5. DISTANT SOURCE AT DISTANT CAMERA: i
$$
I,=E_=G, =0 “
$$
$$
1, = E, unchanged, G, = 0
$$
‘ Choosing the object to be on the z-axis removes further
terms. This is the simplest possible case.


<!-- PK PAGE 58 doc=math_p23 -->
Page 53
6., UNIFORM ILLUMINATIGN:
Uniform illumination (or an approximation thereof) is
fairly cormon and might at first sight appear not to fit
into our framework. This subsection shows the
equivalence of uniform illunination to one where a point- A
source Is at the camera and a different reflectivity
function obtains.
The integrals here are analogous to the ones obtained for
the integrating photometer except that we have constant
emittance angle rather than constant Incident angle. If
| the incident light intensity is I, per unit area oriented
in any direction, then it Is easy to show that I,/ falls
per unit solid angle per unit area perpendicular to It.
The emitted Llight per unit solid angle per unit area
perpendicular to the emitted ray is thus:
2 /2
$$
) I, V(e) = 1.<r/rr)[f ﬁ(i,e,g)v’r(l/Z)-.':sin(Zi) di dA ]
$$
/cos (e) ° °
This is the same situation as if we had a source at the
camera and a reflectivity function such that:


<!-- PK PAGE 59 doc=math_p23 -->
Page 54
$$
bee,E, 1) = W)
$$
(Except that for uniform Illumination a certain amount of
self-shadowing can occur for non-convex objects)
2.5 THE FIVE 0,D,E.”S FOR THE IMAGE ILLUMINATICM EQUATION:
$$
Fix, v, 2, p, @) = A(D) $(LE,G) - b(r’) = 0
$$
We know A(:) and %(I,E,G), and obtain b({f) from the image.
$$
ke need F,, F,, F, F, and Fq. Since r = (x,y,2z) and
$$
$$
n = (-p,-q, 1) we can get all of these derivatives from Fr
$$
and F,.
$$
Fro= ACD §(ILEG) + A () $(1LE,G) = b (1)
$$
$$
Fo = A(r) ¢ ,(1,E,G)
$$
$$
Let a = (I,E,G) then: .
$$
(#1:: +2§* and +n ) ‘*a 2.,
Note that g _ and 2, are 3 by 3 matrices, the rows of which we
computed in a previous subsection (2.3.4).


<!-- PK PAGE 60 doc=math_p23 -->
Page 55
(/e )@ - 1 F0)
A A
$$
SS = (1/rgdn = E 1)
$$
$$
(1/rd(£- 6 £ + (1/r )(F, =6 F.)
$$
$$
1/r; =l/r; 0 ﬁ
$$
$$
| = | 1/r, 0 ~E/ 7.
$$
$$
0 (1/re=G/ry) I/ =Glrd [\ T
$$
Note that this is the product of two 3 by 3 matrices,.
Similarly:
$$
/m(r, = 1.0
$$
$$
a = | (1/m)(F, = EN) '
$$
~n ~ ~
0
-1/n 1/n 0 n
$$
= | -E/n 0 1/n T
$$
0 0 0 Lo
The calculation of b (r®) from b _,(r") will be described In
section 2,7 .


<!-- PK PAGE 61 doc=math_p23 -->
Page 56
2.6 CAMERA PROJECTION EQUATIONS:
The projection equaticns derived here are used in section
2.7 .
So far we have assumed the camera to be at the origin
oriented with its optical axis directed along the z-axis and )
the image-plane x° and y’ axes parallel to the x and y axes.
Mov ing the camera from the origin introduces only a minor
change iIn the equations, If however the camera is oriented
in a different way, some of the equations become more
complicated,
Let R be the orthonormal 3 by 3 matrix which takes the z~axis
into the optical axis and the x and y axes into the x° and y*
axes. Then:
f
=R
$$
where g = (0,0,1) is the unit vector along the z-axis in the
$$
image coordinate system. L' Is the vector from the exit- )
pupil to the image point in the same coordinate system.
If two images are taken with the camera orlented differently,
the area recorded in both Images will be spatially distorted


<!-- PK PAGE 62 doc=math_p23 -->
Page 57
only. That is, a simple transformation will take the one
image into the other.
(RyRT 7)) fo
r/ s ———x—
T O(RRT ELE S,
Where R, and R, are the two rotation matrices and f, and f,
the corresponding exit pupil to Image plane distances. This
. transformation 1is useful if one wishes to orlent the optical
axis along r; or r, (to simplify the equations for the
derivatlves),
2.7 OBTAINING IMTENSITY GRADIENTS:
To evaluate the derivative F,. (section 2,5) we need br(E:)'
$$
b (r") = b yr _5’:
$$
f f Rr .z
$$
- r"_ = RLY —— = (Rf) —oorv—o
$$
~ o~ ~ (Rg).g (R,l_j.g)L
f (Rg)(Rg)
$$
= — (R - — )
$$
(RI).g (Rr) .2
In the simple case that the camera is oriented precperly:


<!-- PK PAGE 63 doc=math_p23 -->
Page 5§
1 ¢ 0
$$
R=1010
$$
0 01
f 100 £z
$$
P’ = —— 01 0| - =2
$$
"Eorg\ooi1) r.g
flf1 00 f [0 0 x
$$
= ~{071 0]|-—[00 vy ]
$$
$$
z\0 01 z*\0 0 =z
$$
f[1 0 -x/z )
$$
= =01 -y/z
$$
2\0 0 0
Written out in full we have:
$$
: (by, by, by) = (f/2)Ib,,, by, =({x/2)by, + (y/2)by.)]
$$
b, and by/ are measured directly from the image.
Since the intensities measured from the image do not locally
determine the normal, one might well ask what, roughly, such
measurements do determine. The components of the gradient of .
the Intensity are related to the second derivatives of the
distance to the surface, while the intensity itself is )
related to the magnitude of the first derivatives. This
relationship becomes exact for the case of a distant source
at a distant camera (section 2.5, case 5; see also 3.1.2).
It should be noted that the equation for F_ (sectlion 2,5)


<!-- PK PAGE 64 doc=math_p23 -->
Page 59
also involves Ap., Usually A is fairly constant over the area
of the object recorded in the image, or at least satisfies a
simple inverse-~square equation,
$$
If A= (r,/r.) , then A = =2(r2/r1)r.
$$
(N r ¢/t
Where r; is the incident vector, and Fe Is the length of the
incident vector to the singular point,.
2.8 OBTAINING INITIAL CONDITIONS:
It would be a great disadvantage if one always required an
initfal curve to start the solution from, Fortunately it is
usually possible to calculate some initial curve if one makes
some assumptions about the surface and uses the special
points where the reflectivity uniquely determines the local
normal - these points will be called singular points.
2.8§.17 USE OF THE SINGULAR POINTS;:
The singular points are the brightest or the darkest polints
(depending on the reflectivity function). At all other
points the normal cannot be locally determined. The singular


<!-- PK PAGE 65 doc=math_p23 -->
Page 60
points are points corresponding to values of i and e for
which the reflectivity is a unique global maximum or minimum,
These may be either extrema in the calculus sense or at the
limiting values of the angles.
This method cannot be used if the surface does not contain a
surface element oriented in this special direction. The )
points are found by looking for the brightest (or darkest) ]
points in the image.
All we still need to know then is the distance of this point
from the camera, but since one is usually only interested in
relative distances this 1is not a serious restriction.
Unfortunately it will be found that the solution will not
$$
move from these singular points, l.e. x* = vy~ =0 , This s
$$
an indication that the algorithm needs to be informed about
which way the surface Is curved (convex or concave). To make
this more concrete assume we have a distant source and can
thus calculate G at each image point. -


<!-- PK PAGE 66 doc=math_p23 -->
Page 61
2.8.2 THE SOLUTION WILL NOT MOVE FROM A SIMGULAR POINT:
Consider the variation of ¢ with E first:
$$
1. If the extremum occurs for 0<E<] then ¢e = 0,
$$
$$
2. If the extremum occurs for E =1 then ﬁ = r, and hence
$$
$$
E, = (1/n)(Fg - ER) = 0,
$$
$$
3, If the extremum occurs for E = (¢ then E.Ee = 0 and
$$
$$
Ep = (I/n)f;. That is, xp+yp-2z=0 and E, = (I/nr)x and
$$
$$
Eq = (I/nr)y.
$$
$$
X = ¢c(1/ne)x and vy = $e(1/nr)y
$$
$$
&= ¢c(I/nr¥px+ay) = $ (1/nr)z
$$
$$
In case ! and 2 we have ¢E EP and +E Eq = 0,
$$
i Now consider the variation of + with I:
$$
1. If the extremum occurs for 0<I<! then +I = 0,
$$
$$
2. If the extremum occurs for I = 1 then E = fi and hence
$$
$$
I,= (/n)(Z, - 17 =0,
$$


<!-- PK PAGE 67 doc=math_p23 -->
Page 62
$$
3, If the extremum occurs for I = 0 then ﬁ.f;= 0 and
$$
$$
I.= (1/m)F,. That is (x-x,)p + (y-y,)g - (z-2,) = 0 and
$$
$$
Ip = (I/nry)(x-x,) and Iq = (I/nr;)(y~-y,).
$$
$$
x = + (1/nr ) {x=x,), y = + (1/nr;)(y-y,)
$$
$$
=4 (U/nr ) Ux=x,0p + (y=y,)a)
$$
$$
= ¢ (1/nr;)(z-2,) ’
$$
$$
In case 1 and Z we have +1 I, and #I Iq = 0.
$$
$$
Now x = F, and y = Fy and z = pF, +qFq.
$$
$$
Fo = ACD) $(1,E,G)
$$
$$
. 4)P=¢IIP +¢EEP
$$
$$
. ¢i = ¢111 * beEﬂ
$$
So in all combinations of cases 1 and 2 for F and cases 1 and
$$
2 for 1 we find x = § = 0 and hence also z = 0, therefore:
$$
$$
x* =y =0
$$
That is, the projection of the solution point into the Image
is not moving as the parameter s is changed.


<!-- PK PAGE 68 doc=math_p23 -->
Page 63
$$
In the casc E = 0 we find that even though x and ; may be
$$
$$
non-zero, x* and y° = 0.
$$
$$
All that remains is the case I = 0, Here too x* =y =0,
$$
when the source is at the camera or if E is undetermined., We
$$
» have found no paints with an extremum for I = 0 whkere E was
$$
determined (i.e. the global extremum was not unique).
2.8.3 GETTING THE INITIAL CURVE FROM A SINGULAR POINT:
If the surface is convex (or concave) at the singular point
band we have a guess at the radius of curvature (from the
overall size of the object for example) we can get around the
| problem of singular points by constructing small spherical
caps on them. Difficulties will be encountered if this point
happens to be a saddle point (The presence of a saddle polint
however usually indicates that other singular points exist
4 where the surface is either convex or concave).
Let § be the vector from the camera to the singular point
(found from its known image coordinates and its distance from
the camera). R is the estimated radius of curvature and p
the distance we decide to step away from the singular point
(determined in practice by considerations of uncertainty in


<!-- PK PAGE 69 doc=math_p23 -->
N,
% S,
</
" INITIAL CURVE
A
RN,
, S .
~
: Figure 16: Construction of the initial curve near a
singular point.
- SINGULAR
POINT
Figure 17: 1I1lustration portraying three solutions obtained
for varying initial radius of curvature -
showing the small effect which errors in the
initial curve have on the solution.


<!-- PK PAGE 70 doc=math_p23 -->
Page 65
the position of the singular point and the desired detail in
Pal
the solution)., The known normal at the singular point is Ep'
~
Ve construct a spherical cap with center § - RN,,
$$
Let RY = R - r*
$$
A
~ @ ~
$$
Let X = yxN, where y = (0,1,0)
$$
~ A
$$
) I’= N xX
$$
$$
T(t) = pIX cos(zme) + ¥ sin(2wt)] 0gt<!
$$
Points on the initial circle are then given by
TRAL
We also need an Initial guess at p and q, so we construct B‘,
(an outward normal):
$$
N,() = RN+ T(t)
$$
~s ~ ~t
v The requirement for an initial guess at the radius of
curvature is not as restrictive as it might seem, since the
required accuracy is extremely low, This 1Is because is
usually very much smaller than R, and hence a change in R
affects the position of the initilal curve very little,. Fven
more Iimportantly the values derived for p and q need not be


<!-- PK PAGE 71 doc=math_p23 -->
Page 66
accurate since they are only used as a first guess in an
iterative method of finding p and g on thke initial curve
before starting the solution.
$$
2.9 MON=-POINT SOURCES:
$$
Uniform scurces have already been dealt with, Perhaps the )
easiest other case is a circularly symmetric source at a
distance large compared to the dimensions of the object.
2.9.,1 CIRCULARLY SYMMETRIC SOURCES:
Distant circularly symmetric sources can be replaced by a
‘ point source after modifying the reflectivity function, One
merely convolves the reflectivity function with the spread
function of the source (a bit of spherical trigonometry lIs
involved here),. Strictly speaking one should perform the .
same operation with the entrance pupil of the camera since it
too subtends a finite angle at the object and accepts a )
$$
bundle of light-rays. Since ¢ Is smooth (except at I = 0 and
$$
$$
I = 1) it will be changed very little except at these points,
$$
The main change will be that ¢ does not tend to 0 as I tends
to 0, but rather for some negative value of I. Also the


<!-- PK PAGE 72 doc=math_p23 -->
Page 67
specular component will be more smeared out,
. L /)
\
CENTER OF /
SOURCE .
"’“ /\
OBJECT
. "
Figure 18: Illustration of circularly symmetric source and
quantities used in the convolution.
Let the source intensity be I(a) per unit solid angle at the
angle a from its center when viewed from the object. Then
the new reflectivity function $'(I,E,G) is:
LM~ QA 217 Qo
+'(I,E,G)i[p-J;(a) &(I',E,G') a da dv‘J/J[;(a) a da dv
- o Q o [+]
» Where a, is the total angular diameter of the source,


<!-- PK PAGE 73 doc=math_p23 -->
Page 6§
$$
And cos(A) = (cos(gl-cos(1) cos(e))/(sin(i) sin(e))
$$
$$
cos(i”) = cos(i) cos(a) + sin(i) sin(a) cos(v)
$$
$$
sin(S§A) = sin(i’) sin(a)/sin(v)
$$
$$
cos{g’) = cos(A+§A) sin(i’) sin(e) + cos(1”) cos(e)
$$
2.9.2 MULTIPLE SOURCES: -
When the source distribution is not easily treated as above
one can introduce a different AK for each source and replace
the main equation by:
$$
: 2 A BILLEG) = b(r)
$$
'3
Difficulties in finding initial condit ions will be
encountered with multiple sources unless they are of special
kinds (e.g. a point source and a uniform source).
2,10 TYPES OF EDGES:
Several kinds of edges appear in an Image - each with its own
properties and problems for our algorithm:


<!-- PK PAGE 74 doc=math_p23 -->
Page 69
1. Overlap - (occlusion of one object by another)
discontinuity in 2. The program must detect this or It
will erroneously continue a solution across such an edge.
$$
2, Joints =~ (angular edges on an object) discontinulities In
$$
the derivatives of z. One cannot continue p and g across
such an edge. It is possible however to use the position
- of the edge as a new Initial curve. This and the previous
condition can be detected as a step in the intensity
distribution or from a highlight on the edge.
3, View edges - special case of 1. , where no joint appears,
t.e. the surface is smooth and E tends to 0 as we approach
it, This is easily detected by the program during the
calculation of the solution.
4, Shadow edges - here I tends to 0 as we approach the edge
and again the program can easily detect this,
5., Other edge of shadow - if the shadow was bridged this edge
may serve as a new initial curve.
6. Arbiguity edges - some are lines of aggregation of
singular points (on which A 0, The characteristics
will not cross an ambiguity edge (see sectlion 3.7.3).


<!-- PK PAGE 75 doc=math_p23 -->
Page 7°¢
2,11 SHADOWS AMD SELF~ILLUMIMATION:
If the single source 1is not at the camera, shadows will
appear. Solutions can be carried across shadows since the
position of the source is known and one can construct a ray
through the last illuminated point and trace it until it
meets another Illuminated region. Only the coordinates and ’
not the local gradient of this new point will be known. It
is necessary to carry this operation out for all ‘
characteristics entering the shadow, producing a new initial
curve at the other edge of the shadow where we can restart
the solution, In practice care has to be taken because of
noisyness of the solution. '
Self-illumination is a difficult problem to deal with unless
the object is convex or Its albedo is low (less than 0.4),
An estimate of the effect of self-illumination can be
obtained from a consideration of two semi-infinite matt
planes joined at right angles. These are illuminated from a j
very great distance and such that the incident rays make an
angle a with one of the planes. Let the reflectivity of the )
surface obey lamberts law and the fraction of the incident
light reflected be k. Contrast between two Intensities I, and
I, is usually defined to be:


<!-- PK PAGE 76 doc=math_p23 -->
Page 71
%RCE
=z
T
i .‘i.....k
§\~
W |
N
Figure 19: Bridging a shadow.
i5EEEi%EE;EEiéiiiiiiiigéggigégggggg\
Figure 20: Two semi-infinite planes joined at right angles.
Used in the study of self-illumination.


<!-- PK PAGE 77 doc=math_p23 -->
Page 72
I‘ - Iq_
$$
C = —_—
$$
I, + I,
If we ignore light reflected more than once, we find the
cont rast between the two planes to be:
$$
C, = tan(a -T1/4) ,
$$
While if the self-illumination is taken into account we get: -
2 - k
$$
C, = —_— tan(a - 17/4)
$$
72 + k
Contrast is thus reduced by a factor of (2 - k)/(2 + k) .
This factor varies from 1/3 to ! as k varies from I to 0.
Note: the rest of chapter 2 contains some miscellaneous
items that did not fit in elsewhere.
2.12 THE INVERSE PROBLEM -~ GENERATING HALF-TONE IMAGES: )
The inverse problem of producing images of a specified scene
with shading and shadows Is vastly different from the method
of shape-fromshading. Most programs written for this
purpose can be used for objects bounded by planes only, The
main issues of optimization of the catculation of which


<!-- PK PAGE 78 doc=math_p23 -->
Page 73
surfaces are visible to the source and camera respectively
have been dealt with in some detail in recent work [§],
Although the two problems are inverses of one another, the
methods used are qufte different,
An interesting problem of a mathematical nature (and
incidentally with application to cutting wood-cuts) is that
- of producing curved lines in a plane such that the density of
lines-is proportional to the shading in the image of some
real or imagined object. Preferrably one would like as small
a number of “unneccesary” breaks in the lines as possible,
i.e, the lines should either close on themselves or leave the
image. Another restriction one might apply is that the lines
should not cross (When producing wood-cuts one would most
likely also reflect some of the surface texture in the cholce
of lines).
For a special case, a solution is immediately at hand. This
’ is the case where we have a distant camera at a distant
source (section -2.4, case 5; see also 3.1.2) and a
reflectivity function * such that:
$$
bC1,1,1) = 1 =1/ f1+p*+q*
$$


<!-- PK PAGE 79 doc=math_p23 -->
Page 74
Here the <contour lines give a solution, with no crossing
lines and no ‘unneccesary’ breaks, One of the most
attractive feature of contour maps is perhaps just this fact
that they provide scme shading information,
2.13 HUMAN PERFORMAMCE WITH MONOCULAR PICTURES: )
Jugding by the popularity of monocular pictures of people and -
other smooth objects, humans are good at interpreting shading
information, Since they use the same basic information as
our shape-from-shading algorithm we expect to find similar
short-comings (seeAsection on facial make-up for example).
Supposing the human visual system does not use the shading
information in simple heuristic ways only, one might expect
that the perception system “solves’ the equations or a much
simplified form of them, Since this cannot be done locally
(the way some portions of an edge-finding process might work)
it is difficult to suggest an elegant and simple mechanism }
and a place to look for it, Presumably It would have to
involve computational waves travelling outward from the ’
singular points.


<!-- PK PAGE 80 doc=math_p23 -->
Page 75
2.14 ERRORS AND IMCOMSISTENCIES:
It s difficult to estimate analytically the error in the
solution because the equations are so non-linear. +, b, and
A cannot be measured to better than 5 or 107 accuracy and
‘ numerous practical problems such as non-uniform sensitivity
of the sensor have to be taken care of.
Only a simple error analysis can be presented here. Suppose
we wish to determine the effect of varying inclinations on
how a given error in the input data (intensity In the image)
relates to errors in the coordinates determined on the
characteristics. We need to determine the rate of change of
p w.r.t. b, Consider a particularly simple case, that of a
distant source at a distant camera (As has been mentioned
previously and will be demonstrated in section 3.7, the
equations for this case are particularly simple). Next
assume that one of the gradient components, q say, Is 0.
$$
| We have b/A = (1) = 1/ [Teprea> ) = 1/ /T+pm )
$$
$$
Then p=/1/(¢ " (b/A)> - 1
$$
$$
We need to differentiate p w.r.t, the ratlo | = b/A.
$$


<!-- PK PAGE 81 doc=math_p23 -->
Page 76
-7 D
T T S s T o
(¢-' (1)) I-( (1))
$$
For both I—= 0 and I — 1, the error in p becomes very large
$$
for a gliven error in | (since in the first case 4"(1) — 0
and In the second case +"(l)'—¢ 1. This is not very
surprising since 1in the first case we are looking ]
perpendicularly down on the surface and I will vary very
slowly with p, while 1in the second case we have near :
tangential incidence and small changes 1in the angle of
incidence (and hence also I) will correspond to large changes
in p.
We note that 1In this rather special case, tkte error
contribution to the solution s large in some areas, while
being small in others where the incident angle 1is not to
close to 0 or m/2, The actual error will also depend on 4"
and the error in measuring b/A. In a case with less
restricted lighting conditions the relationship between the
inclination of the surface and the error-rate will be nrmore ’
complex, i
We considered the derivative of p w,r.t. l, since it is the
$$
integral of the error in p which constitutes the error in =z
$$
for any one characteristic.


<!-- PK PAGE 82 doc=math_p23 -->
Page 77
s §
$$
e(s) =‘/r.50(s) ds =v/r.p §1(s) ds
$$
° o
Where e(s) is the error in z for a given characteristic as a
function of arc-distance from the singular point, Sp(s) s
the error in p and §1(s) is the error in |,
- In this context one may also want to discuss inconsistencies
in the solution. If either the lighting conditions or the
reflectivity function are incorrectly specified, an incorrect
shape will be calculated. The shape determined may or may
not violate the requirement of smoothness, If the calculated
shape is not smooth it can be concluded that the solution (at
least in some region) is incorrect, and that the given source
position or the given reflectivity function are incorrect.
It is easy to give examples of the case where false
assumption will lead to a smooth solution, as well as those
where we obtain solutions with discontinuities,
$$
For simplicity consider a flat, inclined surface (z = x).
$$
The characteristics will be straight lines in this plane,
parallel to the x-z plane, Modifying the reflectivity of the
surface to be increasingly darker with increasing X, we
obtain a new solution which contains characteristics, again
parallel to the x-z plane, but curving toward large z for


<!-- PK PAGE 83 doc=math_p23 -->
Page 78
large x. This solution is smooth and contains no indication
of an error,
If now we apply instead a surface coating which is normal for
positive y and darker for negative y, we obtain a solution in
which the inconsistency is apparent, The characteristics in
the solution for negative y are more inclined than those for )
$$
positive y, and a discontinuity exists at y = 0,
$$
Using this kind of approach one could determine which kind of
surface markings are noticeable by an observer (i.e. lead to
inconsistencies in the solution) and those which merely alter
the apparént shape.
2,15 WHAT ARE LIKELY SOURCE DISTRIBUTIONS?
Since the complexity of the algorithm presented here
increases with the complex ity of the light-source .
distribution and since we only know how to bridge shadows
cast by one source, it is important to know which light- )
source distributions occur in practice. First one notes that
the situations found difficult by humans are almost certainly
going to give difficulties to our algorithm, For example,
when two sources cast shadows (such as on a road lighted by


<!-- PK PAGE 84 doc=math_p23 -->
Page 79
widely spaced street-lamps) the shape of unfamiliar objects
becomes difficult to ascertain because of the crossed
shadows. If the incident intensity varies greatly from one
image area to another (such as in a lightly wooded forest)
the tangle of lighted and dark areas makes perception more
difficult. On the other hand one would expect ‘natural’
conditions to be particularly easy. That 1is, one point
- source somewhat above the observer (the sun) combined with a
very diffuse (almost uniform) source (the sky). The diffuse
source will not throw sharp shadows of its own, The absence
of either of the two sources makes vision only slightly more
difficult,
2,15.1 RELEVANCE TO PHOTOGRAPHY AND GRAPHICS:
One would expect photographers to have something to
contribute to this subject and introductory booklets on
) artificial light photography confirm the above conclusions,
] The beginner is advised to use a number of [lights with
different characteristics as follows (Phrases of inexact
meaning will be placed in quotes):
1. The main light - The ideal main Llight is a large spot
light approximating the effect of the sun. It is usually


<!-- PK PAGE 85 doc=math_p23 -->
Page §0
placed 45 degrees above and 45 degreecs to the side of tkhe
subject. Its purpose is to establish the ‘form of the
subject’ and fix the ratio of lighted to dark areas. The
exact vratio 1is not important but thke position of the
source should result in good shading (which increases as
the source is moved further from the camera) without too
much shadow area (in which detail is more difficult to )
perceive), )
$$
2, The fill=in light (or axial light) - Its purpose ls to
$$
lighten slightly the shadows cast by the main light and
approximates the effect of the sky, It is placed near the
camera to prevent it from casting its own shadows and to
simulate the effect of uniform lighting (see an earlier
discussion of uniform illumination, section 2.4.,6). The
appearance of shadows within shadows is <considered
extremely ‘ugly” and should be avoided since it makes the
picture more difficult to interpret. The ratio of fill-1In
light Intensity to maln light intensity Is usually chosen .
to be about 1 to 3.
In addition a number of small sources may be used for extra
effects:


<!-- PK PAGE 86 doc=math_p23 -->
Page §1
3, The accent light - Its purpose is to enliven the rendering
by adding highlights and “sparkle”., It should be a small
collimated source which can be directed to llluminate
small sections of the subject. It is placed behind and to
the side of the subject so that it cannot cast shadows of
its own, This light can add catchlights (specular
| reflections such as on eyes or metal objects) and bright
) outlines (particularly on hair),
4. The background light - Its purpose is to “separate’ the
subject from the background. It illuminates the
background only, such that the intensity reflected by the
subject will nowhere match that of the background. This
ensures that the two can be easily “separated” - l.e. the
edge between them will be visible,
Other hints are that too many lights spoil the effect, having
the main-light at the camera creates a ‘flat” image, shadows
| crossing edges on the subject are to be avoided and that
. light parts of the (image draw the attention of the viewer,
It is interesting to note how much of what is vaguely
formulated in these introductions to photography can be
understood from the point of view of shading,


<!-- PK PAGE 87 doc=math_p23 -->
Page §2
2,16 DETERMINING SHAPE FRONM TEXTURE GRADIEMTS:
A problem related to that of determining shape using shading
is that of determining shape from the depth-cue of texture
gradients., A  textured surface will produce an image in
which the texture is distorted in a way reflecting both the
- direction and and the amount of the 1inclination of the i
surface. An image of a tilted surface with a random dectpattern for example will be compressed in one direction (the
average distance between dots is decreased) by an amount
proportional to the inclination of the surface. Both
direction and magnitude of the gradient can thus be
- determined - except for a two-way ambigulity,
In practice it may not always be easy to determine such
texture gradients reliably because of low resolution of the
imaging device and scatter, causing a reduction in contrast.
Some sinple textures may be handled by simple counting or
distance measurements as suggested above, while more )
. complicated textures (e.g. a plastered wall) will need more
sophisticated techniques, such as two~dimensional correlation )
(best obtained wusing the fast-fourier~transform). Some
experimentation with this technique showed promise, but did
not supply very reliable gradients and the method was slow,


<!-- PK PAGE 88 doc=math_p23 -->
Page §3
The next problem is how to obtain the shape from the texture
gradients., Starting at some point (whose distance from the
camera we assume known), we use some external knowledge to
resolve the two-way ambiguity. We can now take a small step
in any direction and find the gradient at this new point,
Continuing in this way we trace out some curve con the surface
of the object (somewhat analagous to the characteristics in
i the shape-from-shading method, except that here the curve is
quite arbitrary).
Let s be the arc-distance along tﬁe curve, z, the distance to
the initial point, and p and a the components of the
gradient, then:
S
$$
z(s) = 2z, +~/(:p,q) . ds
$$
©
If one takes smatl enough steps, one can continue to resolve
the ambiguity at each step by wusing the assumption of
b smoot hness. This can be done until we meet a point where
i the gradient Is zero. To continue past such a point would
require some external!l knowledge to again resolve the two-way
ambiguity. An aggregation of points with zero inclination
can form an ambiguity edge which cannot be crossed.


<!-- PK PAGE 89 doc=math_p23 -->
Page §4
Clearly we can reach a given point through many paths from
the initial point. This allows us some error checking, but
there certainly are better ways of making use of the excess
information, For that is what we have, since we know from
the solution to the shape-from-shading that only one value is
required at each point for the determination of the shape,
while we here have two (the components of the gradient), -
Most commonly when faced with such an excess of information
on can make use of some least-squares technique to improve _
the accuracy., Perhaps a relaxation method on a grid would be
useful (The grid need not be rectangutlar),


<!-- PK PAGE 90 doc=math_p23 -->
Parge &5
3, PRACTICAL APPLICATION:
3.1 THE SCAMNIMG ELECTRON MICROSCOPE:
This chapter deals with a few practical applications in which
the equations simplify considerably,
3,1.1 DESCRIPTION OF THE SCANNING ELECTROM MICROSCOPE:
This device uses an electron beam which is focused and
deflected much Llike the beam of a cathode ray tube and
impinges on a specimen in an evacuated chamber {111, The
narrow ray penetrates into the specimen for some distance,
creating secondary electrons along its path (a small number
of electrons are reflected at the surface). The depth of
penetration, the spread and the number of secondary electrons
are all functions of the material of that portion of the
) specimen. The number of secondary electrons which reach the
) vacuum through the surface will depend strongly on t he
inclination of the surface w.r.t. the beam, being least when
it is perpendicular,
These relatively slow secondary electrons are then attracted
by a positively charged grid and impinge on a phospor-coated


<!-- PK PAGE 91 doc=math_p23 -->
Page 86
ELECTRON
GUN
(1 || [ ]oEFLECTION
AND
FOCUSING
COILS
PHOTO- :
MULTIPLIER
|
}
"// SPECIMEN
I~
|
Figure 21: Sketch of a scanning electron microscope.
BEAM
SECONDARY
ELECTRONS
SURFACE OF
/ SPECIMEN
‘v‘ .
<X ,/
[
\ < |
Figure 22: Detail of electron beam impinging on specimen.


<!-- PK PAGE 92 doc=math_p23 -->
Page &7
photomultiplier, In this way a current is generated
proportional to the number of secondary electrons escaping
the specimen, There are other modes of operation which do
not however interest us here, The output is used to modulate
the intensity of the beam in a cathode ray tube while both
beams are scanned synchronously in a T.V. like raster, The
image created exhibits shading and is remarkably easy to
i interpret topgraphically, This is quite unlike the normal
use of optical or transmission electron microscopes which
portray density and thickness,
The magnification 1is easily increased by decreasing the
Vdeflection in the microscope. The resolution is poor
compared to the transmission electron microscope because of
the spread of the beam as it enters the specimen, but the
depth of field is much better than that of an optical
microscope because of the very narrow beam (extremely high fnumber), The higher field gradient on edges causes these to
) be outlined more brightly., This artifact, while appealing to
. people, may be a problem in the implementation of a computer
algorithm for finding the shape.
Often the final analysis does not involve exact determination
of the shape or two stereo-images can be used, but there
propably are also important cases where the shape must be


<!-- PK PAGE 93 doc=math_p23 -->
Page §§
determined and the stereoscopic method is not applicable.
This may be because at the magnification used the specimen
appears smooth without significant surface detail or because
it is difficult to line up the second Image. Since the
equat ions for this case turn out to be so simple it should be
rewarding to tie a scanning electron microscope directly into
a small computer. ’
3.1.2 EQUATIONS FOR THE SCANNING ELECTRON MICROSCOPE:
A little thought shows that this is analogous to the case
where the source is at the camera (or equivalently we have
uniform illumination); for one thing, no shadows appear.
Next we note that at all but the lowest magnifications the
projection is near-orthogonal. Because of these two effects
the five 0,D.E.”s simplify considerably:
$$
>'<=F,, 3'1=Fq, ;..!=pF,,+qu .
$$
$$
p=-F =-pF, and g = -F, - af,
$$
$$
Now Fy = A $,1, and F, = -b,
$$


<!-- PK PAGE 94 doc=math_p23 -->
Page &9
$$
I = Q.g/n = 1/n (where n =(-p,~-q,1))
$$
$$
I,= (I/M) (2 - 17) = (2/n) - (I/n®)R
$$
$$
I,=(1/n*)p and Iq = (1/n®)q
$$
$$
Hence: % = Fp o= (A & /n¥)p, v = Fq = (A 4./n®)q
$$
$$
2= (A ¢y/n)(p* + a")
$$
$$
p = -b, and q = -b,
$$
If ¢1 # 0 everywhere, we can change to a new measure s along
t he characteristic by multiplying a:.l equations by
$$
N =n®/(A §;) and we get:
$$
Y . . P Py
$$
X =p, y=4g, 2=p *+q
$$
$$
b = b, (n*/(A ¢.)), a = b (n*/(A ¢.))
$$
This extremely simple case thus has characteristics which are
curves of steepest descent (or ascent). Also note that the
$$
equation for =z does not couple back into the system of
$$
) equations (due to the orthogonal projection) thus increasing
. accuracy. The equations happen to be very similar to the
eikonel equations for the paths of light-rays in refractive
media. It may be possible to find ready-made solutions to
some speclal cases by using this analogy.


<!-- PK PAGE 95 doc=math_p23 -->
Page 90
We assumed that ¢1 # 0; this is equivalent to assuming that
an inverse exists which allows us to find I from a
measurement of the image intensity:
$$
W(¢(I,1,1)) = 1
$$
$$
Let 200 = (1= 9/ (2y(x))
$$
$$
Then 2(4(1,1,1)) = (1/2)%(p* + q*) :
$$
So we can find at each point the magnitude, but not the
direction of the local gradient, This is very different from
the method of determining shape from texture gradients
(section 2,16), where we can locally determine the gradient
except for a two-way ambiguity.
3.1.3 AMBIGUITIES AND AMBIGUITY EDGES:
This is an easy enough example to study ambiguities,
Consider the two surfaces:
3 3
$$
gz =g +x , z=z+ |x| :
$$
Clearly they <cannot be distinguished from monocular views
since their gradient magnitudes are identical: i.e. they
produce identical Intensity distributions in the image. This


<!-- PK PAGE 96 doc=math_p23 -->
Page 71
~. \ '\ AMBIGUITY
. /\\ W EDGE
S A\ B
\ /
\ /
Figure 23: A locally determined ambiguity edge.
Fe1/ 6wy )
| \\\l//AMB!GUlTY
— N
Figure 24: A globally determined ambiguity edge.
$$
£=1/003 + (-1 17083+ (y41))
$$


<!-- PK PAGE 97 doc=math_p23 -->
Page 92
manifests itself in a slowing down of the characteristics as
$$
they approach the tine x = 0 (alternatively )-9 o< ), They
$$
cannot cross this line aggregation of singular points, Note
that the characteristics approach this line at right angles
and that the edge is determined locally, each point on it
being a singular point.
A second kind of ambiguity edge can occur parallel to
characteristics, separating those which can be reached from
one singular point from those reachable only from another,
This kind of edge is not locally determined, since a change
in the surface is possible which removes one of the singular
boints and makes all the characteristics accessible from the
other. This can be done without altering an area near two
given points previously separated by an ambiguity edge.
Both types of ambiguity edges occur in the general case but
are not so easlily studied there. They divide the image into
regions within each of which a solution can be obtained. ]
Typically most such regions will have one singular point from
which one may obtain initial conditions (provided one makes a )
decision about whether the surface is concave or convex and
knows the distance to the singular point).


<!-- PK PAGE 98 doc=math_p23 -->
Page 93
3.2 LUNAR TOPOGRAPHY:
3,2,7 INTRODUCTION TO LUNAR TOPOGRAPHY:
The other very interesting simplification to the general
shape from shading equations occurs when we introduce the
special reflectivity function which applies to the material
- in the maria of the moon. This in fact was the first shape
from shading problem solved both theoretically and in an
operating algorithm [4], Using the special reflectivity
function and the fact that the sun is a distant source, it is
possible (but very tedious) to show that the equations
simlify so that the base characteristics (i.e. the
projection of the characteristics on the image plane) become
$$
straight lines radiating from the =zero-phase point. This
$$
$$
point corresponds to g = 0 and is directly opposite the sun
$$
as seen from the camera. Actually this is true only when the
sun Is located at negative 2z, for positive # (that Is in
) front of the camera), the relevant point is the phase
] point, directly in the sun.,


<!-- PK PAGE 99 doc=math_p23 -->
Page 94
3.2.2 REFLECTIVITY FUNCTION FOR THE MARIA OF THE MOON:
The variation of light reflected from the surface of the moon
with phase and inclination of the surface has been studied
for a long time. At a given lunar phase g, all possible
combinations of incident angle i and emittance angle e are
represented by some portion of the surface. A fairly good )
approximation is the Lommel-Seel iger formula [1]:
L (1/8)
$$
+(I,E,G) = ————
$$
(I/E) + N (G)
Where Tl is a constant and the function X(G) is defined by a
table. This formula can alsoc be derived froma simplified
mode! of the lunar surface. A slight gain in accuracy is
possible if [ s allowed to vary with G as well,. In
particular Fesenkov [71] finds the more accurate formula:
[ % (I/EX(1 + cos™(x/2))
Q(I,E,G) T ——ee
(I/E) + X, (1 + tan™(x/2))
Where as before:
G - (I/E)
$$
tan(X) = —_—
$$
/1 - G*
A recent theoretical model is that of Hapke [3] which
correspends fairly closely to the measured reflectivity


<!-- PK PAGE 100 doc=math_p23 -->
Page 95
function. In most of these formulaes we find that for a
given G, ¢ is constant for constant I/E, The Llines of
constant I/E are meridians.
$$
At full moon, when G = 1 we find that the whole face has
$$
constant luminosity. This is qulite unlike the effect on a
sphere coated with a typical matt paint where the image
- intensity would vary as:
/1 - (/RO ‘
Where R is the radius of the image and r the distance from
- the centre of the image. The full moon thus has the same
appearance as a flat disc if one is used to objects with
: normal matt surfaces. This may explain the flat appearance
of the full moon.
) 3.2.3 DERIVATION OF THE SOLUTION FOR LUMAR TOPOGRAPHY :
3.2.3.] THE BASE CHARACTERISTICS:
In the case of pictures taken of the lunar surface from
nearby (e.g. from orbit) we have the following:


<!-- PK PAGE 101 doc=math_p23 -->
Page 96
. Distant source (the moon subtends an angle of about ,03
milli-radians at the sun).
Z. Near point source (the sun subtends an angle of about 10
milli-radians at the moon).
3. Camera at the origin, -
4. The reflectivity function is constant for constant 1/E,
This is a property of the material of the maria of the
moon which has been known for some time.
We have (using results obtained in subsection 2,3.4):
$$
In =0 In = (I/m)(r - 1)
$$
A A -~ A
$$
Er = (I/r)(n - E 1) Ens= (/n)(r,- E n)
$$
$$
Gr=(1/r)(f=GF) Gy=0
$$
Where ?a is @ unit vector in the direction from the sun to
the moon.
If I and E depend on some parameter s, while I/E is constant:
$$
EI; = IEg
$$


<!-- PK PAGE 102 doc=math_p23 -->
Page 97
Since *(I,E,G) is constant for constant I/E:
$$
+:.1, + +E Eg = 0 and therefore:
$$
$$
1gs + Edg=0
$$
If I and E depend on soma parameter k:
$$
boly *+ ¢, B, = (I, - (I/EDE) = ($_ /ED(ED, - IE)
$$
$$
“ b= ¢ E = -(EY/D b,
$$
$$
¢ I+ ¢ E = ENg (BT, - IE,)
$$
Using some of our previous results we find:
$$
EI, - IE, = =(I/r)(0 =~ E})
$$
$$
EI, - IE, = (E/n)F, = (EI/m)R = (I/m)F + (EI/m)R
$$
$$
= (/M UGEDE - (F.DT = U/MExT)x 7
$$
1
2 ——— (rx:,)xn
nrr, -
$$
‘ And since A, = 0:
$$
$$
Fo=A¢, - b,
$$
Ve will ignore F, for now, mainly because it has an ugly
lookiﬁg expansion.


<!-- PK PAGE 103 doc=math_p23 -->
Page 95§
. )
$$
Fh=AE¢I,E —— (exr,)xn
$$
-~ n*rr,
$$
(rxrdxn =
$$
[x,(z-qy)~x(z,-qy,),y°(z-px)-y(zo-pxo),z(x,p+y,q)-z°(xp+yq)]
zz,
$$
Let X = --AE"«#):,:/EE —— where (x,,y,,2,) = f,. ]
$$
ntrr,
Note that A is a constant in this case. -
| X, y X Yo
$$
Fp = X| — (1 - g=) - =(] -~ q—)
$$
Zo F Z z
Yo X b4 Xo
$$
Fq = X| — (1 = p=) = =(1 =~ p—)
$$
Z, . Z Z
Mow looking back at the five 0.D,E.’s:
$$
i‘:Ffl y=Fff:’—=pr+qF,=px+qy
$$
$$
E) = -FK = DFEI q = -Fy - qu
$$
. . . . ¢ . -
Again we can decide to ignore p and q for the time being, and
attempt to determine the behavior of the characterlistics, ]
Our aim is to show that their projections in the image plane
are straight lines independent of the scene., The behavior of
y against x Is of little help and we next look at the
projections in the image plane:


<!-- PK PAGE 104 doc=math_p23 -->
Page 99
$$
x* = x (f/z) and y~ =y (f/=2)
$$
$$
(x“/F) = (1/2%)(Xz=xz) = (1/2%) [Xz=x (px+qy)]
$$
! X X
$$
= - |(I = =-p)x - ~-—ay
$$
z 3 z -
X [x, X y X X Y
$$
== |— (] - p- -g~) = =(1 - p- = ga-)
$$
z2 |\ Z, Z Z Z Z Z
x* X [x, x X y
$$
-=<-(—=-=)( = p- =-q-)
$$
f z\ 2, Z - Z
Similarly:
y' X[y, v X y
$$
- ==|(—==)(1 - p=- - g-)
$$
. f 2\ 2, z Z Z
Now if the surface is not tangent to the ray from the camera:
E # 0 i.e. r.n # 0 and therefore:
X Yy
$$
(1 - p-=aqg-) # 0
$$
, Z z
If in addition +I/% # 0, A# 0 and 2 # 0, then we can divide
the two equations:
o, Mo _ Y
y 2o Zz
;(' Xeo _ X
Z, F3


<!-- PK PAGE 105 doc=math_p23 -->
Page 100
This firstvorder ordinary differential equation for the base
characteristics is separable:
-dy”’ ~-dx *
Yo _ ¥~ xe _ x°
E, f Z, f
Solving this we obtain:
' d rd
Y, y X, X
$$
log(— = —) = log(— = —) + log(c) :
$$
Z, f Zo f
Let the arbitrary constant ¢ be tan(t):
1 Yo _ ¥\_ _1 Xe _ x°
sin(t) {2z,  f | cos(t) |z, °F
Thus the projections of the characteristics are straight
lines in the image plane emanating from the point:
Xe Yo
Zo ' Z,
If the sun 1Is behind the plane of the image (z,> 0 - as
would usually be the case for reasonable illumination and )
avoidance of extraneous light entering the lens) this point .
is called the zero-phase point, since it corresponds to the
point In the scene which is directly opposite the sun as seen
$$
from the cameara and hence g = 0. Because of the special
$$
properties of the reflectivity function of the maria of the
moon intensity variations in this region are entirely due to


<!-- PK PAGE 106 doc=math_p23 -->
Page 101
non-uniform surface properties rather than shape. It is for
this reason that this point is not usually included in the
image but lies somewhat outside it in the image-plane. This
will prove unfortunate later on whan we have to invent
initial conditions,
If the sun is in front of the image plane (2, < 0), the
i special point is the TT phase point, where the image of the
sun would appear in the image-plane.
So the obvious simplification to the equat ions which would
$$
arise if we let xo = ¥, = 0 cannot be exploited since we do
$$
not wish to orient the camera in this way.
We would like to arrange for s, the parameter that varies
along each characteristic, to correspond to arc-length, This
can be achieved by multiplying each of the five 0.D.E.”s by
A , where:
&1
$$
,_ A= -xrsT X y
$$
$$
(1 - p=- - qg-)
$$
Z F
$$
5.Z=-1;_5.) I e _x"\ 1
$$
f z. z| s z, f s
Then by choosing constants suitably:


<!-- PK PAGE 107 doc=math_p23 -->
' Page 102
x x° X,
$$
- = — = —+ 5 cos(t)
$$
- f Z,
y vy Y,
$$
- =— = —+ s sin(t)
$$
Z f Z,
Thus s gives arc length along the characteristics while the
value of t selects a particular characteristic. ’
3.2.3,2 THE INTEGRAL FOR z:
We next turn to 2z which we would like to find without solving
the messy equations for p and q.
» . L xo x y° y
$$
2 =px +py = AX[p(— - =) + g(— - =)
$$
Zo z Zo F
$$
=X Xs (p cos(t) + q sin(t) )
$$
This is a good place to Introduce some abbreviations of i}
commenly occuring dot-products:
X, Y,
2o Zo
X, Y,
2, Z,o


<!-- PK PAGE 108 doc=math_p23 -->
Page 103
$$
N = (cos(t), sin(t) ) . (p, Q)
$$
Note that L is predetermined (i.e. independent of the image)
and that L and M tend to ¢ if the camera ic pointed directly
$$
away from the sun (i.e. X, = Yo = 0)
$$
X Yy
$$
(1 - p- - g=) = (1=M=-sN)
$$
z 3
F -1
$$
X = =% ————
$$
$$
s (]-M=-sN)
$$
. -zN
$$
and so: 2 = ——————
$$
$$
(1-M=sN) i
$$
We now attempt to express this in terms of measureabhle and
calculable quantities (s.a. G, I/E, s and t). Since #1/% # 0
and differentiable it must be monotonic and hence have an
inverse, That is, given b/A we will be able to calculate 1/E
(G is known at each point).
$$
. r.= (x.v,,2,) and r = /xLeyrezt
$$
Xo Y.,
$$
r= (x,y,2) = 2(—+ s cos(t),—+ s sin(t), 1)
$$
ZQ zo
r
$$
Let Q= /s> + 2sL + (=)
$$
ZD


<!-- PK PAGE 109 doc=math_p23 -->
Page 104
$$
Then r = z0
$$
$$
n=(-p, =g, 1) n= /14+p*+ g
$$
~
$$
n.r =& (1-M=-sN)
$$
$$
2.!’, = ﬁo(z"M)
$$
ro kS
$$
Let T =sbL + (—) .
$$
zb
$$
Foek =T 2 24
$$
re . I 2EZ T 2z,
$$
G = = o S —_— T = —
$$
ror rr, Qr,
So we can calculate G for each point on the characteristic,
independent of t and the scene. Next we attempt to rewrite
the expression for z in terms of I/E:
n.r, r. oz (1-M) zQ
$$
IJE = "—x—=2 —m—  x—
$$
$$
n.r r, z(lI-M=sN) r,
$$
Z, sN
$$
= Q—[1 + —— )
$$
$$
ro (1-M=-sN)
$$
P -3 (I/E) l’o )
$$
Z = =- —_— -]
$$
s Q Z,
As mentioned before one can find an inverse \y to * s.t,:


<!-- PK PAGE 110 doc=math_p23 -->
Page 105
$$
q/(b/A,G) = I/E
$$
) F b r, 1!
s ¥ A z, Q
The usual tables for # in the case of the maria of the moon
’ however are not usually given in terms of I/E and G, but
rather & and g. Where :
G-1/E
$$
tan(oX) = ———
$$
/1-G%
X is the projection of the emittance angle on the phaseangle plane.
2, T z, (1-M)
$$
G - I/E = —x—= Q ————
$$
$$
ro Q ro (1-M=-sN)
$$
z, | r, (1-M) "
$$
=2 — — | — 4+ sL - —Q
$$
ro Q Zo (I"M-SN)
2, S N
$$
’ =« —x— | (s+L) ¢ — Q?
$$
Fo Q (I‘M'SN)
2 Zo T
$$
1-G =] - ——3(——:;_-
$$
ro Q
ro 5 .
$$
Define P = sgn(z,) /(—) ~-L
$$
2,


<!-- PK PAGE 111 doc=math_p23 -->
Page 106
1
e S Zn
$$
-G =|—P
$$
Qr
G-1/E 1 N
$$
=== — | ———— @+ (s+L)
$$
$$
/i-G* P\(1-M-sN)
$$
3.2.3.,3 THE INTEGRAL FOR r: )
So far we have been working in the coordinates x‘, y° and z.
The final result looks neater if we use r instead of z,
$$
r = 2Q
$$
$$
r= zQ + z(s+L)/Q
$$
P (s+L)
D —— Q + g —
$$
(1 -M=sM) Q
$$
r N -
$$
= | T Q + (s+lL)
$$
$$
Q \(1-M=sN)
$$
$$
F = =(rP/Q") tan(e)
$$
Written out more fully, we have:


<!-- PK PAGE 112 doc=math_p23 -->
Page 107
Fo » o
. sgn(z,) / (—) -L
r Zo
—_ —_—— tan(&k)
r reo
s +2sL+(—)*
2o
The numerator is a fixed quantity for each characteristic,
the denominator varies along each characteristic (but is
independent of the scene), while tan(xX) is obtained from the
measurement of b/A and the known G (using the function W),
The given ordinary differential equation for r has the simple
solution:
s
J[Atan(ﬂ)
-P —— ds
r(s) ° Q-
—_— ze
r(o)
X, Yo
$$
where L = — cos(t) + — sin(t)
$$
zO z0
. P ro (3 ro 2 -
$$
and Q=/s +2sL+ (—) , P = sgn(z,)/(—) - L
$$
29 Z,,
r(0) is the distance to the point from where the integration
was started.
To sum up: as one advances along each characteristic in
turn, one calculates G, measures b/A and uses \V to obtain


<!-- PK PAGE 113 doc=math_p23 -->
Page 108
tan(&), which is then used in the evaluation of the above
integral. The process is much simpler than the renaral shape
from shading algoritkm in that the base characteristics are
predetermined straight lines and only an intepral needs to be
evaluated, It is possible to write the above result in a
slightly more elegant form, which is the one derived by T,
Rindfleisch (for 2z, > 0): ’
by
1 Ne A ’ )
- | (r".2) tan() ds
r(P) flgxﬁ,[ 0
$$
D ——— = e
$$
r(P,)
$$
Where s’ = fs
$$
$$
N,= rxr® = =(f/2)(gxro)
$$
f y y X X Xy Xy
$$
= == zz, ( (- -2), (2 - ), (— -2
$$
F Z Zo Zo Z Z2Z, ZoZ
Y‘ X,
$$
= -fz,s(-sin(t), cos(t), —cos(t) = —sin(t))
$$
Z, Z,
xt X,y vy )
2> °
$$
Now L = —%—cosl(t)+2—i—-cos(t) sin(t)+ — sin® (t)
$$
29 zozD z; “
$$
N,= fz s/ 1+Zcos (t)-2-2=cos(t) sin(t)+ ——sin (t)
$$
k3 *
. zo zozp Z°
$$
=fz sP
$$


<!-- PK PAGE 114 doc=math_p23 -->
Page 109
$$
Exgo = -fz s (cos(t), sin(t), 0)
$$
$$
2, | = sflz,]
$$
1 N,
$$
—_— = =P
$$
IZXE,' leN.'
$$
| (7,80 = (5.3 = (r.®) /r = (z/0)= 1707
$$
- The two ways of writing the integral are thus equivalent.
3,2.4 SOME COMMENTS ON THE INTEGRAL SOLUTI1ON:
1. The base characteristics are predetermined straight lines
(independent of the image). This makes for high accuracy
and ease in planning a picture taking mission.
2. Only a single integral needs to be evaluated, not five
differential equations.
. 3. The primary input is the intensity, not its gradients,
again making for high accuracy.
4, Although, as usual, the reflected light-intensity does not
give a unique normal, it does determine the slope
component in the direction of the characteristic.


<!-- PK PAGE 115 doc=math_p23 -->
Page 110
J. van Diggelen [2) first noted a special case of this
when he solved the lunar topography problem for the
special case of an area near the terminator (lLine
separating sunlit from dark areas). The characteristics
are such that the slope along them can be determined
locally ., The s lope at right angles to t he
characteristics cannot be determined locally. i
5. Although T, Rindfleisch [4] did not mentlion it in his
paper it is very easy to bridge shadows since each lightray lies in a sun-camera-characteristic plane. Its image
can thus be traced on the base characteristic until we
again meet a lighted area. One need not even make special
provisions for this, but just use tan(x) for grazing
$$
incidence (intensity = 0) in the shaded section. '
$$
3.3 APPLICATICN TO OBJECTS BOUMDED BY PLANF SURFACFS:
Since a great deal of image processing these days is applied
to images of polyhedra one might enquire how one could apply i
this method to such objects. First we note that the main
features of these objects, the joints (angular edges on an
object) and edges (where one object occludes another), a}e a
stumbl ing block to the application of our method developed so


<!-- PK PAGE 116 doc=math_p23 -->
Page 111
far. Since we already know that the arcas of more or less
constant reflectivity are plane faces there is little point
in exploring them. So a cormpletely different approach is
indicated. Firstly we might check whether a parsing of the
scene obtained by some other method is correct in the sense
v that the intensities observed for the faces correspond to
their inclinations (the informaticn on the intensity of the
) faces is usally discarded). It is not clear however what one
might do if this test fails. Furthermore, the programs which
reduce the image to a line-drawing and tnen decide which
faces belong to each object cannot vreally determine the
inclinations of the various faces without additional
assumpt ions (orthogonality for example).
| One can however find the normals to each face directly from
the known slopes of the projection of the joints in the image
and the measured reflectivities. One must know which lines
: in the image are true joints (between two faces belonging to
w the same polyhedron) and which are fortuitous (edges between
faces of different objects). For each normal we need two
values. Each intensity gives us one non-linear equation and
each slope of an image of a joint gives us another. The
equat ion from the intensity is of course:


<!-- PK PAGE 117 doc=math_p23 -->
Page 112
$$
Alr) %'(I,E,G) - b(r’) =0
$$
o~ ~~
Where we know that I, E and G are functions of p and q. There
will be one such equation for eack face.
Where two faces with normals n, and n, intersect, they form a
joint which will be seen in the image. Suppose two points on .
this Image are’é and E. Then a vector perpendicular to the
plane through the joint and the camera is AxB, UWe also know
that the joint must be parallel to‘g‘xgl. But ﬂu<§ must be
perpendicular to the joint hence:
$$
(A"E) . (g‘xg,_) = 0
$$
\ S,
n,xn,
n,
$$
€= A ﬂ'xé -
$$
LENS
4 i
IMAGE
Figure 25: Projection of a joint on a polyhedron on
the image.


<!-- PK PAGE 118 doc=math_p23 -->
Page 113
Each joint contributes one such equation. NMext we determine
how many faces must Iintersect before we have enough
information for a scolution, Two faces intersecting give us
two equations from the intensities and one from the slope of
the image of the joint, while we need four unknowns . An
. infinity of solutions thus exist, With three faces a
solution is possible since we have six equations in six
’ unknowns . Because of the non-linearity of the eauations
more than one solution might exist. With a larger number of
faces we always have at least enough information for a
solution and at times have more equations than unknowns which
may remove some of the remaining ambiguities and improve the
accuracy. In this way too it may be possible to discover
which joints are really between faces of the same object.
3.4 FACIAL MAKE-UP:
m When a surface whose photometric properties are taken to be
. uniform 1is treated so as to éhange these properties in some
areas, the apparent shape is changed. This of course is one
$$
of the uses of make=-up. The shape of a face for example can
$$
4 be made to conform more closely to what a person thinks s
currently considered “ideal”’. This is achieved by making
some areas darker (causing them to appear steeper) and others


<!-- PK PAGE 119 doc=math_p23 -->
@ Page 171%
4 <=
Figure 26: Illustration of the effect of facial make-up.
N7 N
?\ N
OF B *H
< '
Figure 27: Illustration of the effect of facial make-up.


<!-- PK PAGE 120 doc=math_p23 -->
Page 115
lighter. Areas lightenad usually include singular points and
cause a change in the apparent skin darkness (a normalization
effect) and will change the apparant shape in areas other
than the singular points,
, These modifications can change the shape perceived when
viewad under the right lighting conditions, The effect will
g change somewhat with orientat jon and may at times disappear
when no reasonable shape would give rise to the shading
obscrved, Because of a numher of surface oils the skin has
a specular component in its reflectivity, it is also fairly
translucent, Both of these effects are sometimes controlled
with talcum powder. The removal of the specular components
makes the surface appear more smooth.


<!-- PK PAGE 121 doc=math_p23 -->
Page 116
4, EXPERIMENTAL RESULTS:
4,1 A PROGRAN SOLVING THE CHARACTERISTICS SEQUENTIALLY:
When the solution to the shape from shading problem had been
found using the inconvenient coordinate system (x°, v, 2), a
program was written which would solve the five 0.D.F.’s along i
one characteristic at a time (the equations used are not
reproduced here). The input data was obtained from the
image-dissector camera attached (at that «cime) to the PDP-§
computer in the Artificial Intelligence Laboratory. This
camera is a random access device: when given an x and a vy
" coordinate it returns a number proportional to the intensity
at that point in the image. The program first searches for a
maximum in intensity, constructs a small spherical cap around
it (to obtain an initial curve) and uses a standard numerical
method (see subsection 4.1.2) to solve the set of five
ordinary differential equations.
The prime data required in this soluticn 1is the intensity
gradient (x° and y’ derivatives of the intensity), which is )
obtained from the intensities measured for a small raster of
points near the current x° and y~, A linear function in x°
and y° is fitted to this set of intensities; the
coefficients of x° and y” are the desired gradients., The


<!-- PK PAGE 122 doc=math_p23 -->
Page 117
size of the raster is chosen to correspond to the step-size
used in the numerical solution method, so that successive
rasters almost, but not quite, touch. In this way fair
accuracy in the determination of the gradients is obtained
without loss in resolution.
If the least-squares fit s bad, indicating that surface
i detail is being missed with the stepsize used, or that tbhe
characteristic is traversing an edge or joint, the solution
for this characteristic is halted and the solution started
for the next characteristic. Other reasons for terminating
the solution are that the characteristic has left the field
of view of the image-dissector or reached a very dark region,
most likely a shadow or the background, When either the
(calculated) incident or emittance angles hecome very small
(indicating approach to an edge or shadow edge) or A very
large (indicating approach to another singular point or an
ambiguity edge) the solution will also be stopped.
. The data structure here is very simple; Jjust a record of
various values ( x“, y°, z, intensity, p° and q°) for each
point on each characteristic. The shape so determined can be
displayed in perspective and stereo on a DEC 340 display.
The characteristics appear as dashed lines - each dash
representing a step in the integration (We chose the


<!-- PK PAGE 123 doc=math_p23 -->
Page 11§
parameter s so that each dash represents the same arclength). The output can be photographed from the display
and plotted on a Calcomp plotter,
4.1.1 AUXILIARY ROUTINES: _
A number of auxiliary routines needed to be written for this
progran. First the Incompatable Time Sharing System (ITS)
on the PDP-¢é does not support a FORTRAM style arithmetic
language and all programming was done in assembly language
(MIDAS) ., The large amount of arithmetic involved,
particularly with the inconvenient notation and coordinate
system used at first, made it imperative to incorporate into
the assembler the ability to handle arithmetic statements,
Next we constructed a package of wuseful routines which
handles floating point 1/0, dynamic array allocation and easy
generation of display lists for the DEC 340. It also i
includes routines for the standard arithmetic functions
(SQRT, SIN, LOG etc.) and manipulation of vectors and i
matrices (multiplication, addition, inversion etc.).
Interrupts, user defined operations and command
interpretation are dealt with as well, Some of the remaining
routines will be briefly described in the next few sections,


<!-- PK PAGE 124 doc=math_p23 -->
Page 119
4,1,1,1 STEREO PROJECTIOMN AMND OBJECT ROTATION:
Since it is important (particularly during the debugging
phase) to be able to visualize the shape being calculated,
stereoscoplic output on the display is provided,.
Let d¢ be the separation of the eyes, f their distance from
) the display and dy the distance from the eyes to the origin
of the coordinate system (usually chosen to be at the
singular point from which the solution was started). The \
coordinates of the left-eye and right-eye images of the point
(x,y,2) are then (xz,y') and (x/,y") where:
$$
Xy, = (xxds/2)(f/(a+d,)) T ds/2
$$
|
$$
y’ = y (f/(z+d,))
$$
A pair of lenses is employed to focus on the surface of the
display while converging on the apparent point (x,y,z).
) Obviously one needs to know the scaling of the display 1in
. terms of dsiplay units per mm.
One would like to be able to view the objects from various
sides and perhaps even have some rotational motion to gain a
greater perception of depth. To this end the object can be
rotated around its origin (also offset and expanded in size).


<!-- PK PAGE 125 doc=math_p23 -->
Page 120
(x4,2)
//////”2
——
P /7
_ _ - /,;/ M
e -
(x¢,y') ~ - _- d /(x,,')\j') i
Sl
$$
= DISPLAY
$$
A TS T s Z SURFACE ~
&EYES-———"/
Figure 28: Stereo-projection of an object point.
ROLL #Z
______-eﬁ—%x
PITCH
YAW '
Y
Figure 29: Definition of Pitch, Yaw and Roll.


<!-- PK PAGE 126 doc=math_p23 -->
Page 121
This was preferred over the more common method of allowing
the eyes to be moved around in the object space.
To obtain any orientation with one matrix multiplication, the
three angles P (pitch), Y (yaw) and R (roll) are defined as
) rotations about the x, y and z axes respectively. They are '
applied in that order (order is important because rotat ions
i are not commutative).
$$
cos(R) =sin(R) 0 cos(Y) 0 sin(Y) 1 0 0
$$
$$
A =tsin(R) cos(R) 0 0 1 0 0 cos(P) =-sin(P)
$$
0 0 1 -sin(Y) 0 cos(Y) 0 sin(P) cos(P)
Using the abbreviation ¢ for cosine and s for sine we have:
$$
cR cY cR sY sP = sP ¢P cR sY cP + sR sP
$$
$$
A =|sR cY SR sY sP + cR ¢cP sR sY ¢P - cR sP
$$
-sY cY sP cY cP
The various parameters controlling the object rotation and
the projective mapping can either be preset or continously
read in from a number of potentiometers (connected to a
) multiplexor and an A/D ccnvertor) controlled by the viewer,
i While one display list appears, the other is being calculated
using the latest set of parameters and will in turn be :
displayed when completed., The parameters are also displayed,
they are:


<!-- PK PAGE 127 doc=math_p23 -->
Page 122
PITCH, YAW and ROLL (P, Y and R)
SIZEC or MAG - magnification of the object
FDIS or DIMG - distance from eye to display (f)
DGBJ - distance from eye to object (dyg)
DSEY or EYES - seperation of the eyes (dg)
For photographic purposes each of the two images In turn can )
be blown up (to account for the reduction in size in the
camera) and displayed a fixed number of times while the “
shutter is open. Windowing at the edge of the screen is
automatic and some very simple kinds of hidden Line
elimination are available but nct normally used. The same
stereo display package is used by the later version of the
program (new SHADE),
4.1.1,2 MEASURING THE REFLECTIVITY FUNCTION:
The reflectivity functions of some paints were measured using )
spheres (large rubber balls) as calibration objects, Both
camera and source were moved as far away as possible to )
achieve almost constant phase angle g. The image of a convex
object is especially wuseful because it contains two points
for all possible combinations of the incident and emittance
angles (i and e) for a given phase angle (g). The position


<!-- PK PAGE 128 doc=math_p23 -->
Page 123
of the light~source is measured, as well as tkre distance from
$$
the front of the sphere to the entrance pupil. The image=-
$$
discector is focused on the edge of the sphere.
With the sphere temporarily illuminated from several sources,
| the program finds its exact position and size, as well as the
difference in horizontal and vertical deflect ion sensitivity
- of the image-dissector, It is now In a position to calculate
the pcints in the image which correspond to given incident
and emittance angles. For a number of choices of both of
these angles it then reads the intensity at a small raster of
points (to reduce nolse and the effect of pin-holes in the
photo?cathode) near these positions and averages them. Since
there are wusually two places in the image with the same
Iincident and emittance angle, a check on the data is
available. The resultant table of values (usually
normal ized w.r.t, the brightest intensity) can be printed and
the whole process repeated after moving the light-source to a
) new position for a new phase angle. The program accounts for
) such things as change in incident light intensity as the
light-source gets moved around.


<!-- PK PAGE 129 doc=math_p23 -->
Page 124
4,1,1.,3 FINDING THE CALIBRATION SPHERE:
This subsection and the next deal! with details, needed in the
program for measuring the reflectivity function, which may
not be of general interest,
For good accuracy we fifst need to know the exit pupil to )
image plane distance (the focal length is given)., This would
be easy If one could focus on the front of the sphere. 1t
turns out that a simple approximation will work in a few
iterations. At each step one recalculates the estimated
distance to the edge of the sphere, the estimated exit pupil
to image plane distance and the estimated vradius of the
sphere, using the previous estimates and the measured radius
of the image.
Next we need to find the exact center and radius of tkhe
sphere from its image coordinates and the known distance to
its front. First consider horizontal coordinates only, )
$$
x, = f tan(a), x, = f tan(a+b) and x5 = f tan(a+Zb) .
$$
We are given x, and x, and wish to calculate x,, which can be
done after expanding the tangents,


<!-- PK PAGE 130 doc=math_p23 -->
Page )15
&
| —— ——
, |- - ‘
v IMAGE . ,
5
e [
LENS
Figure 30: Determining the exact position of the calibration
sphere.
/L
Ve
' Ye
Figure 31: Finding points for given incident and emittance
angles.


<!-- PK PAGE 131 doc=math_p23 -->
Page 1126
$$
tan(Zb) = (x3~x|)/(f1-x3x.)
$$
$$
tan(b) = (/1 + tan*(2b) = 1)/tan(2b)
$$
$$
x,/f = (x;, + f tan(b))/(f - x, tan(b))
$$
The same formulae are then used to find the vertical position
v,. Finally we need to find z,:
$$
r = Rgtan(b) (/1 + tan™(b) + tan(b))
$$
$$
z = Rgf/ /f* + x>+ y*
$$
$$
2 =2 (Rg + r)/Ryg
$$
) 4,1.1.4 FINDING POINTS FOR GIVEM i AND e:
Clearly the points for given incident angle lie on a circle
(on the surface of the sphere). Similarly for points with a
given emittance angle. These two circles may intersect in
two, one or no points, One can find this intersection by
first finding the line along which the planes containing i
these circles intersect, Applying the sine and cosine laws
we get: )


<!-- PK PAGE 132 doc=math_p23 -->
Page 127
$$
Let I = cos(i) as usual and D = |v]
$$
$$
D/sin(™ij) = r/sin(a) b = i-a
$$
$$
r cos(b) = r(cos{i) cos(a) + sin(i) sin(a))
$$
$$
=(r/D) (I /D> - r1 = 1™ + r (1 - 1%))
$$
$$
d = r cos(b)
$$
-
. Yo T Xt A
i} The equation of the plane in which the circle of points with
given incident angle i lies is:
A A
$$
VeV = Y,.v, =c say (where v = (x,y,2) )
$$
One can find a similar equation for the plane in which the
circle of point with given emittance angle e lies, The
int roduction of an arbitrary third plane allows us to find
one point v on the intersection of the first two. The line
of intersection of the first two planes must be parallel to
the cross-product of their normals (let them be v, and v, ).
) So the equation of the line we are looking for is:
$$
(v -v)) =ky where y =y xv,
$$
, The points we are trying to find must also lie on the sphere,
i.e.:


<!-- PK PAGE 133 doc=math_p23 -->
Page 125
2
$$
(v = v.) = rt
$$
1 ]
$$
o *ky, =x) =
$$
$$
k‘x|.x‘ * 2 ky oy mve) vy - rto= 0
$$
The above equation may have no solutlion for k, in which case
no point exists for the given incident and emittance angle,
Otherwise we can use the two solutions and substitute back to )
obtain the desired coordinates which are then transformed
into image coordinates.
4,1.,1.5 SOME REFLECTIVITY FUNCTIOMS:
The first paint investigated was a matt white paint
consisting of particles of Si02 and Ti0O, suspended in a
transparent base, Very roughly one finds that t he
reflectivity function behaves like cos(i) for a given g.
After playing with polynomial fits for a while, the following
fairly accurate formula was found by a prccess of little ]
interest here:
(1+4G)(2+G) 1+21EG-(I™+E+G")
brea - OO e (TeeD)
[ 16 (1-G)
Note the appearance of the discriminant discussed in an
earlier section (2,1.,3). The symbolic manipulation program


<!-- PK PAGE 134 doc=math_p23 -->
Page 129
I ——>
r.o0o .97 .93 .87 .78 .6& 56 .43 .29 .15
1.00 77
. 97 87 .78 .66
| .93 .93 .88 78 .67 .57
- . 87 97 .94 89 .79 .67 .57 .45
E 78 .99 .98 .95 .90 .81 .68 .59 .46 .32
i .68 .98 .95 .91 .82 .71 .59 .47 .33 1%
| .56 94 .90 .83 .74 61 45 34 17
.43 88 .79 .74 .62 .50 .34 ,1&
.29 79 70 .58 .42 .30 .15
.15 65 .50 .38 ,26 ,13
“ Figure 32:
ﬂ Table of reflectivity (for a white matt paint) versus
$$
I = cos(i) and E = cos(e) for G = cos(g) = 0.§1 . The
$$
intervals chosen <correspond to constant size steps in the
angles. Mote the blank areas for combinations of angles
which cannot form a spherical triangle (see section 2.17,3)


<!-- PK PAGE 135 doc=math_p23 -->
Page 130
MATHLAB  [13] was used to find the derivatives +:' fE and ¢6
needed for the shape-from-shading program, For “reasonable”
angles the above formula is about 5% accurate, becoming worse
for extreme angles. The repeatability of this measurerment
was disappointingly low, depending on the depth of the paint
coat and the <conditions of its application. Much of the
investigation of the behavior of the image-dissector was the :
result of efforts to trace the remaining causes of
inaccuracy. ‘
Some other paints and an eggshell showed a matt component
similar to the above, plus a very strong specular component
$$
, (vhich is small except near the point for which i = e and | +
$$
$$
e = g). This component is very sensitive to small changes in
$$
the surface properties such as can be brought about by
handl ing the object,
The image of a convex object with such a surface will usually
have two local maxima in intensity, One of these will be ]
. broad (corresponding to the matt component), the other narrow
and bright (corresponding to the specular component), These )
may be distinguished by a computer preogram on the basis of
just these properties, It would then be possible to start a
solution from the matt maximum (which is not a global
max imum) rather than the specular maximum, This might be a


<!-- PK PAGE 136 doc=math_p23 -->
Page 131
good idea because of the increased accuracy (for one thing
the normalization of image intensities would be more
accurate).
For the nose-recognition program, a plaster nose was used
‘ initially, coated with the matt paint described ahove. This
of course was not suitable for the final experiments, The
' ¢
1
) 1. A matt paint.
2. Lambertian reflec.
3. Skin on nose.
3
o 1
_ ) i
Figure 33: Comparison of some reflectivity functions.
restricted lighting conditions described later were chosen
) partly to avoid having to find the full-flegded function o of
. three angles for skin. Since no true sphere covered with
skin is available, measurements were taken of the shape of a
real nose and intensities in an image (of a transparency)
used to est imate +(I,I,1). In this way the non-linearities
of the photograpéic process (and they were great) did not
have to be determined separately. The properties of skin are


<!-- PK PAGE 137 doc=math_p23 -->
Page 137
of course not very uniform and also vary from person to
person, so no great effort toward accuracy was made. Skin
has a highly variable specular component, SO any
normal ization bad to be done not w,r.t, the brightest point, .
but one nearby. The resuttant table of b(I) versus I lies
somewhat below the one obtained from the matt paint under the
same lighting conditions. -
4,1.,1.6 PROPERTIFS OF THE IMAGE-DISSFCTOR:
In an attempt to track down poor results in the first try at
finding reflectivity functions accurately, the imagedissector was investigated in some detail [9]. Amongst
problems found were:
1. Unequal deflection sensitivity 1in horizontal and
vertical directions (differed by 12%).
2., Twist of image varying with disfance from center of
field of view, )
3. Poor resolution (3 line-pairs/mm - radius of tube 50
m) .


<!-- PK PAGE 138 doc=math_p23 -->
- 133
DISTOR 95 70:04:29 04:34:43 Page
L
- < 4 4 ? 7\
" DR T PN S
) ‘( &~ P » -~ - A > ’ T
Z ® LY - - -
- - - . r 7\
l{ & £ - a - -
- b hd a 4
l 3 A - » >
A ) » v ;
4 - - Fd » - ¢ ‘ i 7
1 < - . . , ¢ A ¢ I's
> o~ . L YVl ¢ ¢ -
* é
t .
N 2"
« r
- . . ¢ \z ¢ ¢ ¥ ¥
- ey ‘
4 -
v ox AR
-' ¢ ¢ £ [ »
- ] 2 ) Ps 2 .
e - - '
» 7
., T o, 7
7 VA A AN
Figure 34: Geometric distortion in image-dissector for a
triangular raster of points covering the photocathode. (The arrows are exaggerated 3 times.)


<!-- PK PAGE 139 doc=math_p23 -->
Page 134
4, Pinholes in the photo-cathode (about 20 of up to 0.5
mm in size), ’
5, Mon~uniform sensitivity of the photo-cathode (varies
more than 30%).
6., Fairly long settling time of the deflection coils, -
7. A targe amount of scatter, which reduces the
contrast by almost one-half and causes intensities
measured on the image of a uniform square on a dark
background to vary by 20%, depending on how close to
the edge the measurement is taken,
Some of these difficulties are inherent in the state-of-theart of these devices, others were repaired. In any case, it
was possible now to think about how to Improve the program to
be more insensitive to these shortcomings,
The program for finding reflectivity functions using spheres
as <calibration objects was sensitive to the (at that time) -
severe deflection inaccuracies, since the emittance angle
varies rapidly near the edge of the sphere (this effect could
be reduced with a parabolic test-object), A calibration
table was created by another program In which are recorded


<!-- PK PAGE 140 doc=math_p23 -->
Page 135
the image-dissector coordinates of a rectangular raster of
equally spaced points on the photo-cathode. Also recorded is
the sensitivity of the photo-cathode at each point, A simple
interpolation routine can then be applied to coordinates sent
to the image-dissector to counteract the distortion and,
. similarly, the intensity values returned can be corrected. A
more convenient triangular raster of polints covering the
i whole photo-cathode was later established. Adjustments to
the image-dissector eventually reduced the distortion by a
significant factor and use of this table was no longer vitatl,
although it did improve accuracy.
4,1,2 NUMERICAL METHODS FOR SOLVING THE 0,D,E,”S:
The five 0.D.E’s were at first solved using a well known
Runge-Kutta method [7, page 212]. The idea Is that at a
given point we can calculate the derivatives of the five
w variables (x°, v, 2, p° and q°) w.r.t. the parameter s,
. Using these we take a half-step forward (increment s by h/?
and calculate new values for x’, v°, z, p” and q° as though
derivat ives higher than the first where zero). We then
calculate the derivatives at this new point and take the same
step (now wusing the new derivatives, which wil( differ
slightly from the previous ones). We next take a ful!l step


<!-- PK PAGE 141 doc=math_p23 -->
SHADE  SCRIPT 70:05:18 ©8:15:53 Page 13¢
$$
PITCH= 08.480 VYAl= 8.800 ROLL= 0.000 SIZEC= 2.0
$$
$$
FDIS= 118.7 DOBJ= 608.2 DSEY= ©5B.0
$$
.-‘\ -
\\ .s \\ ll
\ ) (N
N v L7
e —— N e —— N
- -~ — \.. . .’ —”ﬁ ~— __\’. - ./ ‘—”--1
- TN - T TN ’
// T es N // * e v N\
, T \\ P I 4\ \\
< / v ’ / » ’
’ , \\ 7~ , \ \\
7 / \ \ s / \ \
,/ / ’ 1 } ,’ / \ '\
P / p \ R // . \ !
. ’ / ] 4 \
7 / / \ 4 ’/ ! )
7 7 1 ,’ / \
P / ] ’ / 1
’ 7 ! , ! !
I 1 r ’ 1
f’ , : I’ I4 !
/'l ,’ ": Vd ,I ','
’ ’ ’
< s
Pd
Figure 35: Stereo pair of solution produced by old SHADE. :
A Y A Y
\\ . \\ ,
\ ] \ ]
\ ] 3 \ | }
\ ! ' \ ] 2
\ l Ill ) \ l ,/ '?
~_~~~‘ \ : 7 I’l‘ --§“\ \ : 7/ I/’
. \~\\s \“~I / \\\‘\ \'.', 4
$$
-~‘—-‘~__\ ity % ’—':j-"’~“~\ =~ - —_'_/
$$
/‘ LR '~ /. .. ..\ .
7 g\ \\\ A Sa
rd - Ve ~
s 7 ¢\ ~ s rog ~
V4 1 1 7 { \
- / P /
—— ’r \ — A \
7 ) ) / F; 1
’ 4 14 P [
’ ] ’ ’ ]
o J/ J[ ) / J
— l’ _/ r”
- -~
Figure 36: Same solution viewed after a slight rotation.


<!-- PK PAGE 142 doc=math_p23 -->
Fage 137
(increment s by h) The final full step is taken wusing a
weighted average of the four derivatives found In this way.
Written out in symbols this becomes:
Let h be the step~size (for the parameter s)
$$
And Y = (x",y",z ,p’,q")
$$
) Also let the equations for the derivatives be:
$$
] Y = F(s, V)
$$
(In our case F is actually independent of s)
Denote  Y(s,) by Y, then at the n 'k step:
$$
Ki = h F(s., Yu)
$$
$$
ﬁt = h F(s,+h/2, Y +K,/2)
$$
$$
Ka = h Flsa+h/2, Yn,+K,/2)
$$
$$
Ky = h F(s,+h, Y, +K3)
$$
$$
Yoy =Y+ (1/76)(K, +2K, +2ZK 3+K )
$$
This method is easy to start (requires no previous values of
. Y) and stable, but requires four time-consuming evaluation of
the derivatives per step. For this reason various predictor-
“ modi fier-corrector methods [7, page 194] were tried and tbhe
simplest was found to give adequate accuracy:


<!-- PK PAGE 143 doc=math_p23 -->
Page 13§
$$
Prnse =Ya + 2h F(s, ., V)
$$
$$
Maw = Bwa = (4750(R = €D
$$
$$
Chvt = Y *+ (h/2)(F(s,, Muy) + F(s,, Y,))
$$
$$
Ineo = € * (1/5)(Pus = L)
$$
‘ P, M and C are the predictor, modifier and corrector
respectively, This method is stable and requires only two )
derivative evaluations per step, but 1Is not self-starting. )
The Runge-Kutta method was retained for the first step in the
integration,. Stability and accuracy were not serious
concerns since the noise in the data input contributes far
more to errors In the solution,
4.1.3 ACCURACY OBTAINABLE:
Under optimal conditions (using thke methods described to
cancel out most of the distortion and non-uniformity of
photo-cathode sensitivity) the program was allowed to scan a 3
sphere of 100 mm radius, A sphere was then fitted by an
iterative least-square method to the data points found. The ‘
data points nowhere deviated from the fitted spbere by more
than 10 mm, and by less than 5 mm except near the very edge
of the image. Such accuracy will not usually be obtained
because of non-uniformity in the paint, shortcomings of the


<!-- PK PAGE 144 doc=math_p23 -->
Page 139
sensing device etc.- For many purposes however less accuracy
is quite acceptable and for object recognition in particular
a more important criterion is most probably that similar
objects are distorted in similar ways.
) 4.1.4 PROBLEMS WITH THE SEQUENT IAL APPROACH:
It soon become apparent that solving the characteristics
sequent ially had many disadvantages in the general case, even
t hough it works well for lunar topography. The first reason
is that as the characteristics spread out from the singular
point, they begin to separate and leave large portions of the
image unexplored, obtaining only a very uneven sampling of
the surface of the object (This 1Is no problem for lunar
topography since here the solution is not started from the
singular point, but at a place where the spread of the
characteristics is small).
With @ more parallel approach new characteristics can be
) interpolated as we go along (and some deleted as they
approach too closely).
Next we find that the base characteristics (projections of
the characteristics onto the image) may sometimes cross.


<!-- PK PAGE 145 doc=math_p23 -->
Page 1490
IMAGE AREA
\\\ \\‘ \\\ l
N “!'
N
\\
: \\
\\ \
\ N
~ NN
\\ AN
<« N
hY
\ w
~ ~ ~ N
~ ~ N\
~ ~ ~
Figure 37: Comparison of spread of characteristics for ’
typical solutions in case of lunar topography
and general case.
This is not possible if the solution was exact, since it
indicates that the surface is double-valued or at least that
its gradient is double-valued. Characteristics may converge
or diverge froma (singular) point hovever, Crossing of
characteristics is really symptomatic of another problem
which was touched upon when proving the equivalence of the
five 0.D.E.”s to the P.D.E. : The differential equations for
p and g must continue to give consistent results with the
surface calculated - this does happen if the solution is .
exact, but cannot be hoped for with the noisy data obtained
from the image. What one would L|ike to do Is continuously
monitor whether the current p and q match with the slopes
obtained by first differences from points on the current and
neighboring characteristics. This is not possible if the
characteristics are solved separately and are spreading apart


<!-- PK PAGE 146 doc=math_p23 -->
Page 141
as well, A later section (4.2,2.1) will explain a method
used to continously adjust p and q to remnain consistent
(derived from the method explained earlier for finding p and
g on the initial curve).
At a very minimum, to avoid embarassment one would like to
' detect when two characteristics approach one another and stop
one before they cross, This is easy if the solutions are
w carried along in parallel, but involves lengthy comparison
tests otherwise.
4.2 A PROGRAM SOLVING THE CHARACTERISTICS 1IN PARALLEL :
Once it had becn demonstrated that the equations were correct
and a numerical solution possible it was decided to write a
second program which would sample the surface of the object
rmore evenly by lInterpolating new characteristics when needed.
) Less attention was paid to accuracy in the solution while
attempting to be less sensitive to various noise~effects, At
) the same time an effort to, find a more convenient coordinate
system produced the much shorter notation and resultant
equations described in chapter 2, The solution is achieved
by taking all characteristics one step forward at the sare
time.


<!-- PK PAGE 147 doc=math_p23 -->
Page 142
4.2,1 THE BASIC DATA STRUCTURE:
The values stored for each point (x, y, 2, intensity, p, Qq
and pointers to t he previous point on the same
characteristic) are here arranged not by characteristic but
by “ring”. A ring is a curve of constant arc-distance from
the singular point - i.,e. the n&k points on all the
characteristics form one ring (arranged in counter-clockwise
order of the corresponding image points), The complete datastructure is made up of a number of rings, the first of which
is the initial curve. As before, individual.characteristics
may stop for a variety of reasons (s.a. crossing an angular
edge) and this causes breaks to appear in the current ring,.
The break is indicated by a point having a negative
intensity, the value being a code for the cause. Some rings
_ thus represent closed curves (e.g. the initial curve) and
others more distant from the singular point are broken into
sections, the final ring having no active point on it (i.e.
positive intensity). Scavenger routines are usually invoked )
at each solution step and amongst other tasks, compress
series of dead points (i.e. negative intensity) into one, )
since only one is needed to mark a break in the ring.
As we have seen one of the main inducements for using the
parallel solution method is to allow Interpolation of new


<!-- PK PAGE 148 doc=math_p23 -->
Page 143
$$
characteristics = this is one of the reasons why the number
$$
of points in a ring may change from one to thre next and why
each point has to have a pointer into the previous ring,
indicating vhich element is its predecessor in the same
characteristic. This pointer is -1 if no previocus point
exists (e.g. on the initial curve or the first point in an
) interpolated characteristic).
We have seen how characteristics may be terminated causing a
break in the ring; it is also possible for a characteristic
to disappear, without causing a break, when two
characteristics approach too closely, In addition a break
can reclose if the points on either side of the break are
within the step-size (and pass the crossing~test explained
later) ., With all of this in mind it becomes clear that the
data-structure can at times look pretty confused and this has
to be remembered when defining a function which interrogates
the neighbors of a point (s.a. some sort of difference
. appproximation).
It was decided to wuse as data only the coordinates and the
slope at each point, because this was sufficient for the uses
to be made of the data and also was easily available. For
some uses more complicated surface descriptors may be in
place, such as the rational function approximations for each


<!-- PK PAGE 149 doc=math_p23 -->
Page 144
surface-section described by Coon [103. Usually the
increased complexity imposed by such an approach can be side~
stepped by rather using a smaller step-size to obtain a finer
grid.
It should be noted that the user of constant size steps along
the characteristics may produce difficulties on complex w
objects, For even wlith smooth surfaces the curves of ]
constant arc-distance from the singular point (thke rings) may
have cusps, This invalidates the use of difference methods
on points along these curves (s,a. are used in subsection
4,2,2.1 and 4.2.2.3). No difficulty was experienced with
images of the objects we experimented with, An alternative,
which would c¢ircumvent this problem, would be the wuse of
steps traversing a constant Increment in intensity, This
would turn the rings Into contours of constant intensity.
4,2,72 EXTRA PROCESSING POSSIBLE: .
4.2.2.1 SHARPEMING - UPDATING P AND q: W
We have already described how one can obtain p(t) and q(t) on
the 1initial curve by solving the set of non-linear equations
(subsection 2.3.7):


<!-- PK PAGE 150 doc=math_p23 -->
Page 145
$$
plt) X Lt) + a(t) y,(t) - 2, (t) =0
$$
$$
ACP) $(1,E,G) = b(r’) = 0
$$
In the proof that the solution of tﬁe five ordinary
different ial equations is also a solution of the original
partial differential equation, it was stated that the two
- equations for p and g do in fact continue to give the
i derivatives of z w.,r.t, x and y., Wren solving a difference
equation approximation from ncisy data we can expect the
solution for p and g to become progressively more inaccurate,
Yet the above pair of equations must hold on any path along
the surface of the object, In particular one can use them on
the curve defined by one ring to determine values of p and q.
For the initial curve we had the additional difficulty that
the two equations might have more than one solution and we
selected one on the basis of some external knowledge (e.g.
that the object is convex near the singular point), We have
» already assumed thgt the object is smooth and therefore we
will have fairly good values for p and q and cannot get into
M this difficulty at non-singular points, Even a simole
Newton-Raphsen method will suffice to get us more accurate
values of p and g,


<!-- PK PAGE 151 doc=math_p23 -->
Page 146
$$
Let g(p,a) = p Xeg*+t Q Ve - Z¢
$$
$$
h(p,a) = $(1,E,G) - b/A
$$
$$
And suppose: g(p+Sp, q+8q) = h(n+5p, atfa) = 0
$$
Then ignoring other than first-order terms we have:
$$
g, Bq\[ %P £(p,q) )
$$
That is:
$$
xe v¢) [$p) [=(p,a)
$$
P q §a h(p,q)
Here xy and y4 have to be estimated from difference
approximations, One may not want to apply the full
correction (&p, §a). lMore than one iteration will not be
required since p and q are very close to the correct values,
4.2.2.72 INTERPOLATION AND CROSSING TESTS: .
When the separation between two neighboring points in a ring
becomes greater than 1.5 times the step size along the
characteristic, a new characteristic is Interpolated, Its
x, v, 2, p and q values are set to the average of its
neighbors while the backward pointer 1is set to -1, A more


<!-- PK PAGE 152 doc=math_p23 -->
Page 147
complicated interpolation method can also be used which
constructs the line of intersection of the tangent planes at
the two neighboring points, It then finds the point on this
: line closest tc the twoc neighbors and finally uses a point
half-way between the point determinead previously by the
simpler method and this new point (This, for small angles
i between the tangent planes, is accurate for a spherical
surface). This method does not however add significantly to
the accuracy of the solution.
If two neighboring points in a section of a ring come closer
than 0.7 times the step-size, one is deleted (It is important
that this factor be less than 0,75, that is, one half of the
factor used in the interpolation decision, or succesive rings
on a flat region will have points interpolated on one step,
only to be removed on the next, with consequent loss of
accuracy).
. Finally one wants to stop neighboring characteristics from
crossing over each other, Consider the two points a and b on
) one ring and their successors c and d on the next, The test
consists of checking whether ¢ is to the left of the directed
line through bd and whether d is to the right of the directed
line through ac (Both tests are needed). If either fails,
the corresponding characteristic 1is terminated, causing a


<!-- PK PAGE 153 doc=math_p23 -->
Page 146
d
[4 \ +
!
!
)
¢ [}
\ 7
\ S /
\ I !
\ Aa. / !/
\ I : /
| /
A /
| f
\
Figure 38: The four points used in the crossing test.
_ P
\
\
\ \
\ \
. .
\
Figure 39: The five neighbors used in determining the
intensity gradient at P.
AT
- =
MN\
$$
=SSN .
$$
77 TSR
4';»1,@;4’ ARSI ND
ey
iR )
\BEEEA e s
N LTT K
$$
SO SSE==a DN
$$
SRFTFEE 5D
QAL T5-RK
$$
ENVSS =t
$$
‘ ‘
Figure 40: Covering the image with the rasters of points
read for each solution point.


<!-- PK PAGE 154 doc=math_p23 -->
Page 149
break to appear in the ring at that point, The test is
equivalent to checking whether the line segment cd falls in
front of the line segment ab (and does not cross it). This
test is applied across short breaks in rings as well, to stop
neighboring section of the ring from crossing over each
other,
Care has to be taken if the sections of a ring left all fall
on one side of the singular point, since the break tkren
actually encompasses an arc of more than TT and crossing tests
applied across it will invariable terminate more
characteristics on either side of it, This can be avoided i{f
the crossing test Is not applied to points whose images fall
too far apart (in terms of the projection of the current
step-size),
4,2.,2.3 OBTAINING GOOD INTFENSITY GRADIEMTS:
To be more noise-immune than the previous program, a better
’ way bhad to be found to obtain intensity sradients. Rather
t han Qse the intensities at a small raster of points to
estimate the local gradient, it was decided to use a
difference approx imation from intensities measured at
neighboring points, Using as many as possible of the


<!-- PK PAGE 155 doc=math_p23 -->
Pagce 150
intensities of the point ftself and its five Irmediate
neighbors, we can apply a simple least-squares method to
estimate the gradient, Sorme of the points may not exist as
explained previously and thte characteristic is terminated If
less than three points are available or only three which are
ncarly colinear, Suppose the coordinates of the points are
(xx.yg) (image coordinate system) and the intensities are by. )
We wish to find b, , by and b,.,, to minimize the following
expression:
' d 4
$$
Z(bx.xK * byryi * by, = b))
$$
K
This happens when:
PR P ’ ,
$$
S %y S XYy =Xk b, Sb xg
$$
” T P
X Sve S || by [l Shw
EX\: Ey; 21 b, Ebk
From by, and by, we can find by, by and b, by using the )
camera projection equations of an earlier section (2.7).
For good noise-immunity and some ability to detect surface
detail indicating that the solution is invalid, the intensity
for each solution point Is not read from only one image
point, Small tilted rectangular rasters of points are


<!-- PK PAGE 156 doc=math_p23 -->
Page 157
established around each point of the solution, The one axis
of the rectangle is parallel to the bhase characteristic at
that point, and the size is adjusted to correspond to the
$$
projection on the imagze of a square on the object of side=~ '
$$
length equal to the step-size, The intensity recorded for 3
solution point is the average of tke intensities read for the
i points in this raster and the r.m.s,/average is used to make
the edge-crossing decision., The rasters of all the points in
~ the data-structure almost, but not quite, touch and taken
together almost cover the total area of the image explored,
This insures that the data is not much affected by pin~-holes
in the photo-cathode of the image-dissector and that edge
crossing can easily be detected, without reducing the
resolution,
Both this program and the one discussed in section 4.1 spend
more than half their time accessing the image-dissector.
Between 20 and 100 intensities are read for each point in the
) solution, and each access takes about .2 to 1.0 milliseconds. A complete solution requires from ! to 5 minutes
) of real time,


<!-- PK PAGE 157 doc=math_p23 -->
Page 152
4,2,3 A DOZEN REASONS TO TERMINATE A CHARACTERISTIC:
This is a good place to summarize the reasons for terminating
the characteristics, The val ues printed near the end of a
characteristic (derived from the negative intensity code
discussed earlier) can be used to index this table,
I'. The characteristic has moved out of the field of view
of the image-dissector,
2, The r.m.s./average for the intensities read 1in the
raster has become too great, Indicating overlap of two
objects or an angular Jjoint on one objeoct or some
surface detail that 1Is being missed,
3. The intensity has become too low, indicating a shadow
region,
4, )\ is too large, indicating approach to either another _
singular point or an ambiguity edge.
5. There are too few ncighbors to construct a good
estimate of the local intensity gardient,


<!-- PK PAGE 158 doc=math_p23 -->
Page 153
6., o is too small,. ™K is the Jacobian of the image
transformation from zx and z, to 24/ and z,v, This
$$
transform becomes singular when X = 0, In most cases E
$$
will become too small befcre this happens.
7. A new point was interpolated but both its nelighbors
- were terminated before it could get anywhere.
' &, I too small - indicating approach to a shadow edge,
$$
9. E too small = indicating approach to an edge of the
$$
object,
10. This characteristic crossed over a neighboring one.
7. It was discovered that this point has a backward
pointer to a nonactive point. This is really an error
condition and shouldn’t normally happen.
12, The intensity is equal to or greater than that measured
i} at the singular point, indicating another singular
point or ambiguity edge.
Note that several of these conditions are redundant to ensure
that even with an inexact solution at least one will faijl at


<!-- PK PAGE 159 doc=math_p23 -->
Page 154
the right place.
4.2.4 OPERATION OF THE PROGRAM:
4.2.,4,1 THE INTEGRATION PROCESS
First the program needs to be given such parameters as the
position of the light-source, the distance to the object,
focal length of the lens and the step-size to be used in the
integration, It then proceeds to find a point of maximum
intensity (for some reflectivity functions one needs to
search for a minimum). This search can be directed to allow
a choice of one of several possible maxima. The program then
assumes that this point of maximum intensity 1is a singfgular
point and that the object is convex at this point (in some
cases we would like to assume it to be concave), After
constructing an initial curve (a small <circle) around the
singular point, it proceeds to read the Intensities at the
corresponding image points, The non-linear equations for op
and g on this curve are then solved iteratively, )
All intensities are normalized w,r.t., the Jintensity at the
singular point unless the surface has a specular cormponent,
In the latter case, the intensities on the initial curve are


<!-- PK PAGE 160 doc=math_p23 -->
3 GOuptesS Gulll >
$$
FIGURE 41A = *
$$
gl gl d ] % : )
$$
e~ ==S2SSss
$$
$$
Bz se=nty
$$
. %;3%§%§§$§§%
wossaee EEEERN
$$
K2 -?.ar.é-_-.-f-a==’-‘-"'=§= S
$$
:E:{'sé'f?é’:gf;;::f:;%ééf:*& renTR A
e\‘.\“‘e’i%si;‘sz'i%;;i;%fgzéégga3“‘“
‘R\\&&%Ze—vg:'-:g;ézést{g—;ets‘;—?fg’f'g"”
R @;;eg?g:—éz.—_zs:—;—é?;azé;‘ii’,"rnf”'
*\\\“@*‘@e&;g;.sgf:ﬁzgzs%?& 7
R *'@**gs;{f@f;—-:x——’—";’és—??‘;’l’:‘? e
$$
ST ==
$$
$$
: \\%¢§§$§E=§f“5"""'¢""’
$$
x&*é’sfz-‘f:efég%ﬂ*%@
NSSSSsEsSTT
$$
§§==‘===5’?’9//
$$
$$
SSS====27dl
$$
R 10 e
w
, FIGURE 4 f;-’:ffg'—”—::—:::—‘_m_—————g%;%
$$
HHFEETE=F == ~—-—_==~_=='=‘-=-}:‘= \
$$
$$
S -—_‘-~—~=—£—::”r: =7
$$
$$
X \i‘ = — S— T -‘—‘
$$
S T e — ’-"


<!-- PK PAGE 161 doc=math_p23 -->
15¢
Page
] \\\
SRR |
$$
. /42:‘.'3‘-‘ =
$$
‘;‘ﬁ‘\\\ ﬁ-"\ "',""
‘«-M o u‘\vﬁ%&’
"%;"Gkﬂ “%“."""’
. =
s ’al'o, SEESS X
\‘:«m'/ o S
N Gt gals ’
ESo rihe 'o'!/',
S % NAY
Vi pese i \\\‘\’4;.»,
/atjn‘g%"" \sEad |
$$
/'""*" 7 == uced by
$$
\“"’A" 01ut10::t—5hap


<!-- PK PAGE 162 doc=math_p23 -->
Page 157
X A
0 %8
for s
/
dfan ilgam
Ny ey "
| W NN
W \§
2% 2%
~ /T Vi gal
2 /48
ferrr ]
sl (i
(L N
W~ | WOl
\\¥y ANV,
G NS
P P
$$
e P aea==
$$
*’ AT o
/‘llll #llll
. (isuEEN (lamEEN
\gu T
\\!l- N N
W W
S \SSh
Figures 43 A, B, C: Stereo-pairs of same solutions as in
previous figures, rotated 90°.


<!-- PK PAGE 163 doc=math_p23 -->
Page 153
SHADE 314 70:05:06 06:25:27 BULLET 1
\\‘ /
R 7
/ !
\ {' ]
Figures 44 A, B, C: Contour maps of same solution as in
previous figures.


<!-- PK PAGE 164 doc=math_p23 -->
Page 159
used to establish a normalization value (The specular
reflectivity is too variable for use in normalization). It
is assumed that the initial curve has been chosen large
enough fo fall outside the region of strong specular
reflect ion.
For each step in the parameter s, the following procedure is
. then carried out:
1. For each point calculate the normal (D), the incident
vector (r;) and the emittance vector (r,). From these
obtain the derivatives I,, E, and G,.
2. Calculate %1, +E, +6 and hence +b'
3. Then obtain FP’ Fq and ),
4, Add (fx, Sy, Sz) to (x,y,z) to get the point on the next
$$
- ring for each characteristic. Here (gx, Sy, $z) =
$$
5. Interpolate new points where the points in the new ring
are too far apart and delete points where they are too
close together, Produce breaks where characteristics
have crossed over adjacent characteristics.


<!-- PK PAGE 165 doc=math_p23 -->
Page 160
6. Now read the intensities for all the points, Terminate
those characteristics with points of very low intensity
or high r.m,s/average.
7. Calculate b,s, by~ for all those points for which enough
neighbors exist., From these values obtain bx, by and by
by the projection equations, )
§. Now use n, r; and re to calculate Iz, E: and GI'
9, Next use #:’ ¢e and @G to calculate @P.
10. Then obtain F ., F, and F,.
11. Add (gp, $a) to (p,a) to obtain p and a for the
$$
uninterpolated points on the new ring. Here ({p,Sq) =
$$
$$
X (=F=pF,), (=F, =aF,) ).
$$
12. Interpolate p and g for the new points, )
13. Sharpen up the values for p and g on all points in the )
new ring.
14, Garbage-collect various items, such as series of points
with negative intensity,


<!-- PK PAGE 166 doc=math_p23 -->
Page 161
15, Stop if no points with positive intensity remain.
It should be apparent where the variocus tests for terminating
the characteristics fit into the above schema, The simple
Euler method for solving the differential equations could be
replaced by a Runge-Kutta method with increases in running
— time of a factor of two, but little improvement in accuracy.
\ The sharpening method, on the other hand, is very cheap and
contributes subsfantially to accuracy.
4.2.4.2 OTHER PROCESSING AVAILABLE
As explained before, the data-structure is displayed as it is
generated and can also be viewed from different angles when
completed, In addition a mode exists where the mapping from
three-space to the display surface is not performed by the
projection explained earlier, but a simple map from a
. rectangular area on the image-dissector to a rectangular area
on the display surface. This is particularly valuable for
overlaying the solution on an intensity modulated display of
what appears in the image. This aids greatly in debugging
since it is easy to pinpoint such problems as starting tkhe
solution from an inappropriate max irum in intensity,


<!-- PK PAGE 167 doc=math_p23 -->
Page 162
A number of other displays can be produced to aid in setting
| up the image-dissector. Prodigous amounts of detailed printout can be generated during a soluticn process and a more
parsimonious Llisting of the final data is available. It is
possible to substitute synthetic data (with selectable
amounts of noise) for the image-dissector input as a
repeatable way of checking out the program and to tide over )
those days when the image-dissector is being repaired! The .
data can be written to and read from thke disk and tape.
The stereoscopic display has to be viewed with an appropriate
pair of lenses which are not always handy., For this reasocn a
rout ine was provided which produces a contour map from the
data. This map is produced by first listing the
intersections of all the lines In the data structure (from
point to point in each characteristic, as well as from point
to point in each ring) with the selected contour planes., The
intersections are then sorted on contour plane. Within each
contour plane the following p}ocess is anplied repeatedly ;
unt il no points are left:
Pick a point and find the <closest neighbor within a
‘reasonable’ distance. ‘Reasonable’ distance is defined
to be 1.5 times the step-size used in the solution., Now
another point is selected closest to the new point also


<!-- PK PAGE 168 doc=math_p23 -->
Page 163
within a reascnable distance and so on until no more can
be found. The point chosen at cach step may not he the
first in the chain so constructed (which would close the
loop) unless no other points are available. Also the
line-segments connecting sucessive points may not make
angles of more than 7T7/2 with one another. The points
) are removed from the data as they are used in generat ing
h the contour except the very first point (to allow for
the eventuality of closing the contour),
The distances are wusually weighted with the dot~product of
the new segmont with the previous segment, to glive preference
to continuation of contours in the direction of the last
segment used., The method generates good contours where the
data is complete and smooth, and does fairly well otherwise.
4.2.5 INSENSITIVITY TO IMPERFECTIONS IN THE SENSOR:
This program is not quite as accurate as the one that solves
) the characteristics serially (mostly because of the simple
method for solving the differential equations numerically),
but vastly superior in its behavior when faced with noisy
data. Most of the improvement is due to the hetter way of
obtaining intensity gradients and to the use of the lateral


<!-- PK PAGE 169 doc=math_p23 -->
Page 16%
. R e Gats Whis -’ 3
$$
oPs S5 SISGNA.D- KVENe 8.8 ==
$$
$$
JEE= S5
$$
e,
ST et Ko O
’:‘;""53“—?@?&1‘ 10
e f‘g’-”?‘.‘s’éziggq}\i AS N
AR PR AR
I PR P S SRR
e e FIGURE %A
"5-?{?&?5?3?5'}75??%;%4%?“s&i‘ A
.:?;—-.é}’e’-.?é‘igéaféfziiéggi’i!{ﬁ%ﬁ&}““ ,
$$
eriooooo oo o=t
$$
Q. SRS T T I e T oo SR Lo S8 ca3 e
T e et L DL WY | A
: PR R e P e L EELL T
-52?:&&?;@27—.-&;::;1-;:&:-::—3::?..:-,3;9522522,»
e ey et Tt Lhr
i et F T Lt b
SRt g P R P L
R e Ly et L
T o S e e e e S aaEa
L ekttt ]
" —
'u POV N S Y "_'_:
e
e
A e e T i o e
e s e e
FIGURE 45B po e e


<!-- PK PAGE 170 doc=math_p23 -->
Page 165
,f.‘a.'&%%ggﬁ?;}‘:&\
s R e s mm s 0
e ;%ﬁg&&vggh&@@é :
P e o e e e S e
R ,@%@g&%g%gm%
$$
e ; ST = x
$$
. - e R
$$
P = ,?;?g@%%gg*g&i%%
$$
e e B e e B
SRS LI K K e ”’@‘@"bq&@ '&#
e T e T e R R R 82 ‘93 gf lyﬂ;‘" %%ﬂ'ﬁe s B gﬁ. ‘1 ;
SEEEERES IR By don R e e CRirs et s
TR i ‘aiﬁgé’&l f@gg_gﬁ; 22, AR g3
s aEEEERSS :;;;s.;:. Og&.,g.ﬁ-:g,ag,ga‘uw%;g
. o - Phags o, Bim e ety s%‘ s
$$
i e . = té,?;;h%%%@m%%émgﬁgg y
$$
SR A By BEE o @'*&aéﬁ—%g@s A
. . e sE e
- s i e
s . ISR el i
FIGURES 46 ABC /


<!-- PK PAGE 171 doc=math_p23 -->
Page 166
SHADE 314 70:085:087 10:26:31 CUBE 2
¢ RPTs i;g FS & AR a SN A
$$
£ »X,‘S'_-" L35 LNy ; \,.3{.:_ ;.,f;uu»..\({ T
$$
1 RS A M NI R Her i i) N .‘5“ tealial):
His va‘s hi‘i ORI 4 4 K
NIIEEERE e 1 [ SN e o
L R 8 (RO RO
TR ot 1K
% W ,}—/‘: ol Q
/iﬁ""’o"“‘-z XD o//" 555 L‘t SSUN
KA s AR
Lienty LYIN i)
X - e el g S, ~in
SR ¥ ] af g% \ "Q / B i
N W
N ) Il ' SN O
¢’§?~§ ALK SRR (X A5t
XA /] S, N e
o by Mg o 52 %,&. _g REmSe
$$
A Eome = NS
$$
SRR SSe :
Figures 47 and 48: Stereo-pairs of solutions obtained for
the plaster object and the cube with rounded corners.


<!-- PK PAGE 172 doc=math_p23 -->
Page 147
SHADE 314 78:05:07 13:25:52 FUM 2
$$
PITCH= 0.888 YAW=-1.320 ROLL= 3.0288 MAG= 3.9
$$
$$
DIMG= 114.8 D0OBJ=1283.8 EYES= 68.0
$$
} {‘:‘Zf “‘.‘:»\:\
N \
SR CQQRXDR
SR Q}s SR
AR KSR
RN RN
SANY X@&\ SO
R NN
SN RITRRS
LR RN
RANARNNNEN, E\.sik NS
TR ARnnesRriinky
“I‘\‘ miRS £ T ““‘ 9
L\ Y |\ ) :«'f".:,f
SO OO
e’y 4 OO0
Figure 49: Stereo-pair of side-view of solution obtained
- for the plaster object.


<!-- PK PAGE 173 doc=math_p23 -->
Page 168
SHADE 314 70:85:07 11:44:55 CUBE 2
— "
Figure 50 and 51: Contour maps of the solutions obtained
for the plaster object and the cube with rounded corners.


<!-- PK PAGE 174 doc=math_p23 -->
Pare 169
connection betveen the characteristics, The difference
approximation for the intensity gradients uses a support area
about six times as large as the one used by the least squares
approximation of the first program, .
Distort ions in the imaging device “merely’ produce
- distortions in x and vy, while non-uniformities in the
sensitivity will affect p and q and hence z. The only effect
‘ of low resolution will be that some edges will not be noticed
and the solution erroneously continuéd across them,
4.3 A NOSE-RECOGNITION PROGRAM:
To illustrate one use of the shape-from-shading method, it
was applied to a simple recognition task, Although there is
great interest in face-recognition [12] (partly because there
is a practical use for it), it was decided to tackle a subproblem - that of nose-recognition. In principle, facerecognition could be carried out by repeating the process
; explained here for not only the nose, but the chin, forebead
and the two cheeks, Transparencies of noses, rather than
real noses were used because they are always ready and do not
move during the minute or so it takes to determine the shape.
To avoid having to determine the reflectivity function for


<!-- PK PAGE 175 doc=math_p23 -->
Page 170
skin as a function of all three angles, special lighting
conditions were employed. The light-source was placed near
the carmera and the reflectivity function as a function of the
incident angle determined from the transparencies taken,
This meant that no separate determination of the nonlinearities in the photographic process was needed,
4.3.1 MODIFICATIONS TO THE BASIC PROGRAM REQUIRED:
A few minor changes and additions had to be installed in tbhe
main program for this task, Most prominent amongst these is
the procedure used to normalize the intensities read from the
image. Because of the strong specular component of highly
variable nature, the singular point could not be used for
this normal ization, The specular component in the
transparencies not only varies from person to person and time
to time but depends on the exposure used, since it usually is
bright enough to saturate the film, Normal ization was thus )
carried out w,r.t. an intensity derived from that measured on
the initial. curve, which was assumed to be outside the ’
specular region.


<!-- PK PAGE 176 doc=math_p23 -->
SHADE 298 70:04:29 ©5:33:18 GOOD 2 171
$$
PITCH= ©.888 YAY= 2.209 ROLL= 0.082 MAG= 9.7
$$
$$
DIMG= 140.0 DOBJ=1822.0@ EYES= 9.0
$$
yarg
. I H SO
(S22 "“"\\
L2 AKX TSNS
. 7 /0‘¢.~§“‘\“"$’
X ST IIRINR
RTINS
(NI
P"'I 5> D LSRN
"W%"%‘\&“?&’? suuu
(A RV ?“\.‘%‘ih gAYy
DS
TS LS O R AN S
K e Neessy
A S e
XY TR S
Q . < I B/ S
PRI l-‘@:! Ol d
- Figure 52: Solution obtained for a nose.
Note gaps left by the breaks caused by
the nostrils.


<!-- PK PAGE 177 doc=math_p23 -->
E.. )
- \\\\\\\\\Wj/////ﬁ/ |


<!-- PK PAGE 178 doc=math_p23 -->
SHADE 381 79:04:30 10:34:14 GOOD 2 173
(S N / 54#\ - 2
$$
i A T77TS ;u§s=§§§ AN , ,'%é‘%%‘”"wﬁav*””’
$$
e NN e
JIEERN NN, T
m QD NN s
LR A7 e,
$$
D = fSS
$$
NSug ragy ~ 458 5ur
(A A
‘\.ll...g§ "ﬁ--"” /Jl
$$
NN TN reguiB=ggfells ’
$$
$$
\\=\II|“\|. ol w8l
$$
NI r il mmmunElir
\ LT A AR
s N
N7 Nz
f 3 : R Y
% AN N2 0
TS AN N\ YRR
s P AN o
$$
=" Y F ‘\\\ N 50
$$
S 7 S
<% A A
AR\
Figure 54: Four views of solution obtained for a nose.
(With some hidden lines eliminated).


<!-- PK PAGE 179 doc=math_p23 -->
SHADE 314 70:05:06 £7:18:086 GO0OD 3 17%
$$
PITCH= ©0.0080 YAY= 0.88980 ROLL= 9.988 MAG= 2.7
$$
$$
DIMG= 114.8 DOBJ=10890.8° EYES= 68.0
$$
//17* '”\"- RS O ‘-\~.-'7‘ X
(K "‘i s &g‘ ) (X5 NI o RSN
$$
a'o, s ¢‘= \\5.,; Y, Q‘ B ey ey, ‘ G ..
$$
CIT I T "I n SN H \ h TN
S ity SN iR
S22 s G /s
$$
“‘%\"’%‘l e, = s\\ﬁﬁ%“;ﬁ:”'lb .
$$
$$
D TR s 2> = TR V00,20, e
$$
s S anst %’ 22, eSS O S 2D
$$
=y NS
$$
Figure 55: Stereo-pair of solution obtained for a nose.


<!-- PK PAGE 180 doc=math_p23 -->
' Page 175
4.3.2 NORMALIZATIGN PROCEDURE:
In order to simplify photographing the subjects, it s
necessary to make some decisions about which factors core is |
| going hold fixed and which are to be taken care of by some
normalization in the program, Altough it is possible to hold
) the head in a standard position by means of a bite-bar, it is
) inconvenient and it Is preferable to let the program take
care of small head-rotations. The distance from the camera
to the subject on the other hand is very easy to determine
and therefore no normalization of size was used. For
pictures of the whole head such size normalization would be
fairly accurate, whereas it cannot be for images of the ndse
alone which does not present sharp features to take
measurements of.
The rotational normalization procedure to be described can
handle quite large (<TT/6) rotations in both pitch (rotation
‘ about an ear to ear axis) and roll (rotation about a tip-ofnose to back-of-head axis), Yaw (rotation about a top-~ofm head to throat axis) is restricted by the requirement that
almost all of the surface of the nose should be visible., For
some noses this restricts the rotation to fairly small angles
- of course this presents no problem when taking the
photograph.


<!-- PK PAGE 181 doc=math_p23 -->
Page 176
LINE ALONG RIDGE
Y OF NOSE
TIP OF \ *
NOSE>~— . ¥
Figure 56: Illustration of rotational normalization ,
procedure.
-
J WIDTH
Figure 57: Illustration of parameters abstracted from one
horizontal contour through the nose.


<!-- PK PAGE 182 doc=math_p23 -->
Page 177
Independence of rotation is achieved by means of a routine
which establishes the orientation of the shape calculated and
then rotates it into a standard position, In addition the
parameters in the final comparison procedure where chosen to
be independent of small remaining errors in the orientations.
The orientation of the shape calculated is estimated from two
" horizontal contours through the nose, one passing through the
tip of the nose, the other higher up on the ridge. These
w contours of course are only defined as secuences of points
where the characteristics and rings pass thkrough each plane,.
The most forward points defined by these contours are
calculated by fitting a parabola to the three points with
lowest 2z coordinates. For each of the two contours we get
one such forward point, connecting them we obtain a line
which runs approximately along the ridre of the nose. This
line is rotated into a standard position (Lying in the vy-z
plane and leaning TT7/6 from the vertical),
The lower contour (through the tip of the nose) is also used
’ to estimate rotation about the vertical axis. The two points
on this contour at a given distance from the most forward
point define two angles w,r.t. the z-axis, The desired
rotation is one half of the difference of these two angles,


<!-- PK PAGE 183 doc=math_p23 -->
Page 17§
The three angles so determined are small and can thus be
treated independently, The rotation of the shape is
performed about the center of the spherical cap wused to
determine the initial curve, l.e. a point just inside the tip
of the nose. The whole process is repeated iteratively three
times., The errors remaining are almost always less than 0,07
radian (0.5 °). It was found that using only the few points '
indicated to determine the rotation was quite satisfactory,
although better accuracy 1is no doubt obtainable if the
calculation employed averages over several points,
4.3.3 COMPARISON PROCEDURE:
After the data has been brought into a standard orientation,
we would like to abstract a small number of parameters which
contain most of the information for comparison purposes. A
rather arbitrary decision was taken to use estimates of the
distance of the ridge of the nose from the standard line (In |
the y~z plane and leaning 11/6 from the vertical), the width
of the nose about half-way down to the cheek and the depth of "
the cheek from the ridge of the nose. These quantities where
measured for each of five horizontal contour planes, the
lowest through the tip of the nose, the highest a bit below
the saddle point (the bridge between the eyes), The fifteen


<!-- PK PAGE 184 doc=math_p23 -->
SHADE 314 70:05:97 ©9:94:12 GOOD 2 7y
Figure 58: The points on the 5 contours used to abstract
the fifteen values describing this nose.


<!-- PK PAGE 185 doc=math_p23 -->
Page 180
values so obtained are the only data used in the final
comparison procedure.
The distance down the side of the nose from where
measurements of the width of the nose are taken varies with
the contours, going from some large value for the plane
passing through the tip of the nose to one-half that value i
for the highest contour, The distance at which the depth of
the cheek is measured is twice that at which the width of the
nose is measured and thus also varies from contour to
contour, The depth of the cheek is the average of the depth
obtained on the left side and that obtained on the right.
The fifteen measurements obtained for each transparency are
stored in a table together with the number of the
transparency. ‘
The purpose of the comparison procedure 1is to establish if
any of the stored measurements match those obtained from a
new transparency. To determine this, a pseudo-distance is )
calculated (in the I5-dimensional vector space}), between each
stored vector and the new vector, The pseudo-distance is a
weighted r.m.s. of differences in coordinates [12], where tbhe
weights are proportional to the standard deviation observed
for that coordinate.


<!-- PK PAGE 186 doc=math_p23 -->
Page 161
$$
d*= zj(x{-x{)z/ r:
$$
i
where d is the pseudo-distance, xg and x; the components of
the two vectors, and 6, the standard deviation of the i*L
component., The uncertainty In the depth to the cheek is
greater than that in the width of the nose, for example, and -
"ﬂ it therefore has a lower weight than the latter, This
} procedure gives a comparison test which 1is in some sense
optimal [12],.
No doubt other comparison procedures and other <choices of
parameters would have been equally useful; in particular it
soon become apparent that fewer than 15 parameters would have
been equally as selective. The point is that once one has
data as complete as a full description of the shape, alrmost
any method will work and it is not even necessary to display
great sophistication in one”s use of statistics.
4.3.4 RESULTS OF THE NOSE-RECOGMNITIOM PROCRAM:
15 transparencies of 1Z noses were used in this experiment.
The pairs of transparencies for the three noses which were
photographed twice differed in camera to subject distance,
head rotation and exposure. A total of 30 shapes were


<!-- PK PAGE 187 doc=math_p23 -->
Page 182
R . . 7
FIGURES 59 ABC
: : M o ’ : y
i - o e B i 5 i ¥ 2 k- - i kS ;
'!i - i - '!l . T ™ A


<!-- PK PAGE 188 doc=math_p23 -->
.3:‘:5‘” ] . }‘:{j’g& P ‘,s.., T : A B ‘1‘ sv S -
.’ . i"‘ B " "‘:“.
B Wi St
$$
: = é’ - iy
$$
i 4 e e ’ﬁ} il U ﬁ;im» .
R & e L LI . e - T R
b i ‘X
B - e T e B Pt
'! 4 . s Bt o B ] i
AR


<!-- PK PAGE 189 doc=math_p23 -->
Page 184
calculated, two each for those noses of which only one
transparency was available (they differed because of the
noisy nature of the data). For each shape so determined, the
$$
rotational normal ization was applied and the I5=-tuple '
$$
description abstracted. The pseudo-distances between all
pairs of 1t-tuples were then determined.
The pseudo-distance between 15-tuples averaged to t he
following (the units are about 0.3 mm’s r.m.s.):
1. Between transparencies of different noses - 10, (range
2.4 - 15.3)
72, Between transparencies of the same nose -~ 2., (range 1,4
to 2.5)
3. Between shapes calculated from the same transparency
1. (range 0.1 to 2.1)
In all cases the distance from a given shape to a related
shape was less than a quarter of the distance to a unrelated
shape. Simply looking for the smallest pseudo-distance (and
_ checking whether it is fairly small), thus gives an effective
recognition procedure for this small data-set. it is clear
that for a much larger data-set unique identification would


<!-- PK PAGE 190 doc=math_p23 -->
Figure 61 Pape 185
TA 1B 2A 2B 3A 3B 4A 4B 5A 5B 46A 6B 7A 7B
TA 0o 1 10 9 § & 11 11 6 6 1011 10 190
18 1 0 11 10 § § 11 11 6 6 1011 10 11
2A 10 11 0 2 1111 14 14 7 & 14 15 13 12
2B 9 10 2 0 1111 13 13 7 7 13 14 13 12
3A E & 11 11 0 2 § & 4 4 6 7 § 9
38 ¢ & 1111 2 0 9 9 4 4 7 & 910
4A 117 11 14 13 § 9 0 0 10 § 3 3 3 4
4B 1711 14 13 & 9 0 ¢ 10 & 3 3 3 4
S5A 6 6 7 7 4 4 10190 0 2 9 10 9 9
5B 6 6 § 7 4 4 § § 7 0 7 & § 8
6A 1010 14 13 6 7 3 3 9 7 0 1 4 5
6B 11711 15 14 7 & 3 3 10 § 1 0 5 6
7A 10 10 13 13 & 9 3 3 9 & 4 5 0 2
7B 1011 12 12 9 10 4 4 9 & 5 6 2 0
' Table of pseudo-distances between some of the shapes
calculated. Pairs 2, 3 and 5 are each of two different
transparencies of one nose, while the other pairs are each
two shapes calculated from one transparency. The units of
distance are about 0.3 mm r.m.s. .


<!-- PK PAGE 191 doc=math_p23 -->
Page 186
be more unlikely without improving the accuracy in tkhre
solution and a detailed analysis of which parameters to
abstract for optimal recognition. It would however always be
possible to separate out some small subset of the total
stored set of nose-descriptions with very high probability
that the nose looked for will be in this set. Bledsoce [12]
uses the ratio of the size of this subset to the size of the
complete stored set as a measure of the effectiveness of the
recognition procedure.
Repeating the operations we described here for the other
large frontal planes (planes with normal parallel to the zaxis), one would obtain a face-recognition procedure, It is
very likely that the subsets of all stored face-decriptions
determined by applying the above method to cheeks, chin,
forehead and nose in turn will bhave only a small
intersection, This is not to say that other information
about the face, not obtainable from the shape~-from-shading
method could not add to the accuracy of such a procedure., It
must be pointed out that scme of the feature points used in
previous attacks on the face-recognition problem are not
defined by sharp discontinuities (for example the tip of the
nose) and could best be obtained from a descripticn of the
shape.


<!-- PK PAGE 192 doc=math_p23 -->
Page 187
The restriction about the positioning of the light-source
could ba removed if one took the trouble to measure the
reflectivity function in more detail and either recorded the
positioning of the light-source or worked out in detail a
method for finding the single |ight-source from the shadows
in the image (which should not be very difficult since we
| know the approximate shape of the object we are looking at).
) The full face-recognition problem was not tackled since it
would require a great deal more work without further
illustrating the method of determining shape-from~shading.
Also it will be noted thét the study involved a small set of
noses - a study with a large data-set would contribute little
more to the understanding of the method.
Some of the difficulties encountered when determining the
shape of noses are perhaps worth mentioning. Firstly, most
noses are not completely visible from any given point of
view, Most notably the underside (between the nostrils) is
frequently not visible, and often a small area on the side of
the nostrils is also hidden. This forced a cholice of
: parameters which did not depend on these areas, Maturally
the information of whether these areas are visible could in
itself be useful in the recognition procedure if it could be
reliably determined. In fact our program does not, because
of the combination of poor resolution in the image-dissector


<!-- PK PAGE 193 doc=math_p23 -->
Page 16£§
and the simple-minded edge detector, This could be
circumvented by placing the Llight~source slightly above the
camera, thus ensuring that there always is a narrow shadow
below the nostrils,
When the solution s erroneously continued across an edse
(such as that above the nostrils), a second undesireable
effect appears because of the sharpening procedure. The
incorrect coordinates of the points calculated after the edge
is crossed have some effect on their neighbors due to this
and thus decrease the accuracy of the solution ohtained
nearby.
Another problem is that some noses have not one, but two
closely spaced tips (probably because of the underlying
cartilage consisting of two symmetrical parts). This causes
the characteristic growing from one of these peaks towards
the other to stop, since it is approaching another singular
point. A simple solution consists of chosing the radius of
the initial curve large enough to completely include both
singular points, Finnally one finds that some noses
(particularly those belonging to females) have very low
ridges near the eyes, making it difficult to determine a
meaningful value for the width of the nose at that point.


<!-- PK PAGE 194 doc=math_p23 -->
Page 1589
It should be noted that the reflectivity function was not
determined with great precision and no account was taken of
its variation from person to person, It was not important
' that tre shape calculated was very close to that of the nose
from which the image was taken, but rather that diffgrences
in the shapes of noses should show up as differences in the
calculated shapes and that shapes determined from
) transparencies of the same nose should be similar, If the
images were all produced with the heads in the same
rotational position, the distortions wouid bhave made no
difference at all. For the small head rotations encountered,
the effect of the relatively minor distortions was very
small.
4.4 SUMMARY AND CONCLUSIONS:
After defining the reflectivity function, an equation was
found relating the intensity measured in the image of a
smoot h opaque object to the shape of the object. This
equation was then shown to be a first-order non-linear
partial differential equation in two unknowns and the
equivalent set of five ordinary differential equations was
derived. A number of especially simple cases vere
discussed, in particular applications to lunar topography and


<!-- PK PAGE 195 doc=math_p23 -->
Pace 190
the scanning electron microsceope. HMethods were described for
obtaining the auxiliary information required (e.g. tte
reflectivity function) and how to avoid the need for an
initiai known curve on the object, 0f importance too is the
method demonstrated for continuously updating p and q
(sharpening) as the solution progresses.,
The half-dozen or so other depth-cues were ignored here to
allow a comprehensive treatment of shading. The analytical
approach to the problem of determining shape from shading was
developed to demonstrate that an exact sofution is possible
and to determine just what the limitations of this approach
are. This is not to say that a more heuristic, approximate
approach does not have its merits too for certain types of
objects [141, 1t was decided to produce a progran to allow
experimentat ion with the solution method because many ideas
in the ficld of artificial intelligence and visual perception
are of little value until they can be tried on real data,
Fortunately an image~dissector was available to provide input
of image intensities to the computer,
Two programs were presented, one solving the 0.D.FE.”s for the
characteristics sequentially, the other in parallel,
Advantaces of the latter approach were found to be several,
Finally this latter program was adapted to provide input for


<!-- PK PAGE 196 doc=math_p23 -->
Page 191
a nose-recognition procedure,. :
It has been made apparent that shading is valuable as a
monocular depth-cue altough it may not be as accurate as sorme
others. It must be emphasizaed that no claim is made that
people employ this depth-cue in the same way, It may be that
the human visual system does not actually determine the shape
in three-space and if it does so it is likely that it uses a
different method. However there will be many similarities
between the two systems (e.g. in the errors they make)
because they utilize the same data.
4,4,1 SUGGESTIONS FOR FUTURE WORK:
I'. It would be instructive (but very time consuming) to
measure many reflectivity functions and see how many
fall into the pattern of a matt component, approximately
varying with cos(i), plus a specular component, If it
could be shown that most real reflectivity functions
| fall into this class, the method presented would be more
useful since it could determine approximate shapes
without knowing much more about the reflectivity
function. |


<!-- PK PAGE 197 doc=math_p23 -->
Page 192
2, It may be pessible to find more simplifying conditions
s, a. the ones found with certain lighting conditions,
positions of the Llight-source and special reflectivity
functions,
3, Other solution methods may be found, or modifications to
the integration method might increase the accuracy.
Perhaps a difference method on a fixed grid could be
found which somehow gets around such problems as that of
ambiguity edges,
4. One could study the two related problems of finding the
' reflectivity function, given the shape of the object and
the light-source distribution and finding the tlightsource distribution given the reflectivity function and
the shape.
5. Further study of certain types of inconsistencies and
their wuse is Indicated. Here for example we find the
problem of deciding whether certain faces in an image of
several polyhedra could consistently belong to one
object,
6., Some effort could be directed towards implementing more
fully some of the ideas developed theoretically here,


<!-- PK PAGE 198 doc=math_p23 -->
Page 193
s.a, shadow bridging, bandling multiple scurces and
multiple singular points,
7. Expanding the nose-recognition program into a full facerecognition program would increase its usefulness.,
8. One could study in more detail how pecople use the depth-
) cue of shading and how bad animals are at it,. Perhaps
one can get a better clue as to whether people develop a
three-dimensicnal model of the object from the shading
or if they use the shading information in some other
way.
9. There are probably a few more loose ends such as the
problem of how to start the solution if no convex or
concave singular points are available. Can one do
anything at all with saddle points (even though they can
camouflage themselves to be indistinguishable from
| simple convex or concave singular points)?
10. In addition to interpolation, is It reasonble to
extrapolate? That is, can one generate new
characteristics next to a solution sheet to explore new
areas, In particular when a break appears in a
sclution surface can it be patched-up later?


<!-- PK PAGE 199 doc=math_p23 -->
Page 194
11. More methods will have to be found to deal witk the
three-dimensional structure once one has determined it.
12. As pointed out earlier, the use of constant size steps
along the characteristics may not be ideal (remember
that we can adjust the.step-~size by choosing a different
}s). One particularly attractive idea would be to vuse
steps corresponding to constant intensity change in the
image. This would turn the rings into constant
intensity contours, rather than curves of constant arcdistance from the singular point.
13. Many objects have surfaces whose reflectivity cannot be
described by a function of three angles, or are so
specular that our methods are of little avail, One
might try to discover methods of dealing with such
objects, Examples are chrome car-bumpers, transiucent
wax, hair and a glass of water.


<!-- PK PAGE 200 doc=math_p23 -->
Page 195
5. REFEREMCES:
1. V. P. Fesenkov: “PHOTOMETRIC INVESTIGAT IONS Of THE
' LUNAR SURFAGE’ 1929  Astronomochheskii Zhurnal 5
(Translated by Redstone Scientific Information Centre).
2. J. van Diggelen: ‘A PHOTOMETRIC INVESTIGATION OF THE
. SLOPES AND HEIGHTS OF THE RAMGES OF HILLS IN THF MARIA
OF THE MOON’ July 1951 - Bulletin of the Astronomical
Institute of the Netherlands.
3. D. E. Willingham: “THF LUNAR REFLECTIVITY MODFL FOR
RANGER BLOCK III AMALYSIS® Movember 1964 - Technical
Report 32-664 Jet Propulsion Laboratory,
4, T. Rindfleisch: “PHOTOMETRIC METHOD FOR LUNAR
TOPOGRAPHY® March 1966 - Photogrammetric Engineering.
5. D. R. Garabedian: “PARTIAL DIFFFERENTIAL EOQUATIONS® 1944
i - John Wiley.
6. R. D. Richtmeyer and K., W, Morton: ‘DIFFERENCE METHODS
FOR INITIAL VALUE PROBLEMS? 1957 - John Wiley


<!-- PK PAGE 201 doc=math_p23 -->
View publication stats
<!-- PK END doc=math_p23 -->
