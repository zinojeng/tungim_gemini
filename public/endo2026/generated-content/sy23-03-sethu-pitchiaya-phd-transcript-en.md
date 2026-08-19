# Terminology-QA Edited Transcript

- Source: `audio.mp3`
- Model: `gpt-transcribe`
- Languages: en
- Terminology references: heat shock factor 1 (HSF1), proteostasis, proteotoxic stress response (PSR), post-translational modification (PTM), heat shock element (HSE), androgen deprivation therapy (ADT), castration-resistant prostate cancer (CRPC), U2OS, LNCaP, 22Rv1, PC3, DU145, HSP990, MG132, JG98, DepMap, RNA polymerase II (RNA Pol II), H3K4me3, H3K27ac, BRD4, MED12, CBP/p300, A-485, OTX015, phospho-Ser320 (pS320), DNA-binding domain (DBD), trimerization domain (LZ1–3), regulatory domain (RD), activation domain (AD), CUT&RUN, BrU-seq, single-molecule tracking (SMT), HaloTag, JF549-HaloTag ligand (JF549-HL), JF646-HaloTag ligand (JF646-HL), azetidine-2-carboxylic acid (AZC/ACA), methylglyoxal (MGO), arsenic trioxide (ATO), NRF2/NFE2L2, HIF-1α
- Context: An English-language ENDO 2026 medical conference recording.
Topic: Receptor Biology and Signal Transduction.
Session: Transcription Regulation by Stress-induced Nuclear Biomolecular Condensates.
Speaker or recording label: Sethu Pitchiaya, PhD.
Preserve exact endocrine and cell-biology terminology, proper nouns, study and drug names, abbreviations, laboratory values, units, and numbers.
Do not summarize, translate, or paraphrase.

## 00:00:00.000–00:20:00.000

**Doug Kojetin, PhD (Moderator):**
Okay, and our final speaker today is from the University of Michigan, Sethu Pitchiaya. I probably messed your name up, maybe, but I think he snuck into our session. You're not talking about nuclear receptors.

**Sethu Pitchiaya, PhD:**
Definitely not.

**Doug Kojetin, PhD (Moderator):**
But there is “nuclear” in your title, so maybe you slipped in.

**Sethu Pitchiaya, PhD:**
I'm disordered.

**Doug Kojetin, PhD (Moderator):**
And disorder. Nuclear and disorder. So there are some parts of what this session is about. But yes, let's get rolling. Click on your name. All right. Click start. Okay, go ahead.

**Sethu Pitchiaya, PhD:**
All right, great. Thanks a bunch for the opportunity to share some of our work here and for putting together this amazing session. I thank the organizers for this.

I'm not going to be talking about nuclear receptors or nuclear hormone receptors. However, I'm going to talk to you about nuclear condensates—again, lots of order and disorder there—and how they impact a cellular process that is intricately involved in cellular homeostasis, as well as nuclear receptor biology and hormone-driven cancers.

I'm a Michigan homebrew, so you are going to see a lot of Michigan-inspired colors. Please bear with me.

### How cells respond to stress

Broadly, the lab is interested in understanding how cells deal with stress. When I say cells, I'm being fairly agnostic: we are interested in mammalian cells from various tissue contexts. When I say stress, I'm also being fairly agnostic. We are interested in what cells do when a perturbation pushes them away from a state of homeostasis.

Typically, cells make fundamental decisions at that point: they either give up and die, survive, or thrive. The decisions cells make mean many different things in physiological and pathological contexts. For instance, cells frequently dying in response to stress is a hallmark of degenerative diseases. On the other hand, cells being able to thrive in a harsh microenvironment is a hallmark of cancer. We seek to understand how cells make these foundationally distinct decisions in response to perturbations.

We look at the stress response through two distinct lenses. One lens is based on advice that you or I might receive when we are stressed: take a pause, maybe do some yoga, get a little flexible, and focus on things. We are our own cells, and that's what our gene-expression program does.

Normally, cells express lineage-driving genes—genes that keep a heart cell a heart cell or a kidney cell a kidney cell—as well as housekeeping genes that drive cellular function. However, when cells are stressed or perturbed, they take a pause and drive expression of only the genes they need to take care of the problem. This acute response is important for cellular survival, not just at the acute stage but also for long-term adaptation and survival. It is great that cells do this, but we do not know how they do it. We seek to understand how cells achieve transcriptional and translational selectivity during stress.

The second lens is also based on advice you or I might receive: now that you have taken a pause, perhaps go hang out with other people, get a little dynamic, and hit the dance floor—whatever helps you. Our cells accumulate a significant fraction of their biomolecules, especially their transcriptome and proteome, within what can be described as membraneless compartments, or what we call “blobs” in our lab.

These membraneless compartments can be described by a physicochemical principle called liquid–liquid phase separation, at least at the initial stage. This is gaining traction because these condensates form in response to stress. They are a feature, or a hallmark, of stress. We do not know what they are doing there, how they are regulated, or how they function—especially given that condensates can change their physical or material properties and that those changes correlate with various diseases. The second lens through which we study the cellular stress response is therefore: how do condensates contribute to cellular stress responses and pathology?

At the end of this talk, if you are going to invest in “blobology,” which is what we do a lot, I want to offer some generalizable principles—things you may want to consider in addition to the conventional route of how order and disorder contribute to condensates.

Today I'm going to talk about a story that is currently on bioRxiv, along with a lot of unpublished work, about how divergent condensate states can tune stress responses differently.

### HSF1 and protein homeostasis

I'll start with some foundational concepts about protein homeostasis, which is central to cellular homeostasis. Protein quality and quantity need to be controlled. Protein quality and structure are largely controlled by chaperones. Quantity is largely controlled by degradation machinery such as the proteasome, and this is critical for cell survival.

When cells are perturbed, proteins are notorious for being pushed away from their conventional structural states. They can form insoluble aggregates, which you have probably heard a lot about in the context of neurodegenerative diseases. This can lead to cell death because cells have a hard time dealing with these hard, solid fibril structures.

What can the cell do? It has evolved a process that is conserved from yeast to humans and is also present in plants. It involves a transcription factor called heat shock factor 1, or HSF1. HSF1 typically remains inactive in the absence of stress. Upon stress, it is activated largely through post-translational modifications, binds DNA, and drives expression of genes that support cellular homeostasis—especially chaperone genes that enable protein homeostasis. This process is central to cell survival.

Decreased HSF1 levels are associated with both shortened lifespan and neurodegenerative diseases. I'm showing two seminal studies. One was done in worms: if you increase or decrease HSF1 levels, you can change the lifespan of worms—more HSF1, longer lifespan; less HSF1, shorter lifespan. On the right is a blot from patients with Lewy body disease compared with control patients of the same age. You see decreased HSF1 levels and an associated increase in cleaved caspase-3, an indicator of apoptosis. There is a tight correlation between HSF1 levels and neurodegeneration.

On the flip side, cancer is quite the opposite. HSF1 levels correlate with better cancer growth and therefore anticorrelate with patient survival. I'm showing a couple of examples. In osteosarcoma, HSF1 levels can demarcate patients who survive. In breast cancer, if you look at the HSF1 cancer signature—the transcriptional module it drives—patients with a high HSF1 signature have lower survival, whereas those with a low HSF1 signature have higher survival. It has even been shown in head and neck cancers that the amount of chaperones in the tumor region is much higher than in adjacent normal tissue.

All of this suggests that HSF1 is also critical for cancer. It is a non-oncogene that drives cancer, and cancer cells rely on it. That makes sense: cells make a lot of proteins, and cancer cells make a lot of proteins. We have measured this in the lab. On average, a cancer cell makes approximately 10- to 1,000-fold more protein per unit time. Cells therefore need to be at an elevated state of protein homeostasis. They need many more chaperones and compensate with much higher HSF1 activity or HSF1 levels.

We have shown this as well. When you look at DepMap data, cancer-cell dependency on HSF1 is much greater than dependency on chaperones and is somewhat greater even than dependency on canonical oncogenes. When we made an HSF1-knockout cell line in the lab, we saw that these cells were highly susceptible not only to environmental stress and the classic proteotoxic model MG132, but also to proteotoxic drugs such as HSP990 and JG98. This suggests that cancer cells exhibit non-oncogene addiction to HSF1.

### HSF programs in the prostate after castration

We recently performed a study in which we combined single-cell omics and spatial transcriptomics. We determined how the mouse prostate is organized and examined how cells in the mouse prostate respond to castration.

One key finding was that every lobe in the mouse prostate is composed of a distinct type of luminal epithelial cell, suggesting that they are developmentally different and have very specific lineages. Upon castration, however, the lineage-driving genes we discussed are no longer expressed, and the cells begin expressing stemness and stress-response gene programs.

When we correlated this with human disease, we found a tight correlation between the castration-response programs and programs in prostate cancer patients treated with androgen deprivation therapy, or ADT. A significant subfraction of those programs was elevated even in castration-resistant prostate cancer, with heat shock factors being one critical aspect of the disease.

Overall, low levels of heat shock factors are bad because they are associated with neurodegenerative disease. High levels are also bad because they allow cancers to survive.

### HSF1 nuclear foci in stress and cancer

When we examined how heat shock factors function in cells, we found a huge body of literature showing that these proteins can form nuclear foci in yeast, plant, and human cells in response to different perturbations. These include classical proteotoxic heat shock stress, proteasome disruption, the plant toxin and proline analog azetidine-2-carboxylic acid, and heavy-metal toxins. Overall, these condensates can form in response to many perturbations.

When we examine endogenous HSF1 in U2OS osteosarcoma cells, it looks relatively diffuse by immunostaining followed by super-resolution microscopy. Upon canonical heat shock, it forms bright puncta in the nucleus. If we put these cells into a mouse xenograft, however, they spontaneously form puncta.

If we examine cancer cell lines of varying aggressiveness—in this case, pancreatic cancers—the extent of condensation increases with disease aggressiveness. These condensates therefore seem to follow a pattern in their formation. A recent study also found that HSF1 forms puncta specifically in the nuclei of tumor cells in patient tumor sections, not in the stroma.

This led us to a specific question. As a biophysical chemist, I think condensation can drive two distinct biochemical outcomes. Either everything comes together and chemistry increases, or some components come together while others do not and chemistry decreases. For a transcription factor, that means either increased or decreased transcription.

### HSF1 condensates as transcription hubs

We modeled nine different stresses in 19 different cell lines and in *C. elegans*, using endogenous-protein staining and fluorescent-protein labeling. We found that HSF1 condensation in the nucleus is a reorganization event; there is no increase in HSF1 concentration.

Condensation is a concentration-dependent process, so condensates can certainly form as concentration increases. We wanted to test that. Using immunofluorescence staining and super-resolution microscopy of endogenous HSF1, we can measure the number of nuclear foci as a proxy for the number of distinct genomic locations at which HSF1 may be bound. We can also measure the nuclear partition coefficient—the amount of protein inside the foci versus outside—and mean fluorescence intensity, which is the expression level of HSF1 in the nucleus under these stresses.

What you see is that condensates, or nuclear foci, form even when there is a slight decrease in nuclear HSF1 levels. This is a reorganization event, not an increase in concentration.

We then asked what these structures are doing. HSF1 is a transcription factor that binds promoters, so we examined HSF1 and RNA polymerase II. Under unstressed conditions, both appear diffuse. When we apply proteotoxic stress, they condense together—they co-condense. We examined actively transcribing forms of RNA polymerase II and saw the same thing.

We thought that perhaps many promoters were present in those regions, marked by H3K4 trimethylation. However, H3K4me3 did not form puncta, so we did not think this was a tiled-promoter event. Perhaps it was enhancer-like activity. When we looked at H3K27 acetylation, it co-condensed. BRD4 co-condensed. MED12 co-condensed. Nascent RNA also co-condensed. We can measure this with what we call an enrichment index. All of the transcriptional apparatus is enriched, whereas markers associated with heterochromatin are not.

We wanted to ask whether HSF1 drives this process. As I mentioned, we made an HSF1-knockout cell line that lacks the ability to induce chaperones. When we stress these cells, BRD4—which normally co-condenses with HSF1—cannot condense in the absence of HSF1. This also applies to H3K27 acetylation, Mediator complexes, and RNA polymerase II. Without HSF1, these transcription hubs do not form in these cells upon stress.

We then asked whether the reverse was possible: does transcription machinery interact with HSF1 and drive co-condensation? For this and the rest of the talk, I will show what we define as average-image metaplots. We borrowed this idea from the omics space. You can take images, identify foci, place them on top of each other, make an average image, and examine global changes.

We can inhibit H3K27 acetylation with A-485, which inhibits CBP/p300. You see decreased H3K27 acetylation, BRD4 co-enrichment, and RNA polymerase II at the condensate. If we use the BRD4 inhibitor OTX015, H3K27 acetylation remains, as expected, but BRD4 and RNA polymerase II co-enrichment decrease. Overall, this suggests a possible stepwise co-enrichment after HSF1 forms a condensate.

### PTMs and HSF1 domain requirements

We next asked what intramolecular features drive condensation and function. One possibility is post-translational modification, because HSF1 is activated by PTMs and these are thought to drive transcription-factor activity.

When we examine endogenous levels in situ without overexpression, the phosphorylated form of HSF1 is present in punctate structures. It is reassuring that, upon heat shock, HSF1 migrates more slowly, showing that it receives many post-translational modifications. We use phospho-Ser320, or pS320, as an indicator of activation. There are currently, I think, 41 known PTMs on HSF1; pS320 is simply an indicator.

If we interfere with activation and post-translational modifications using cycloheximide, which has been shown to reduce HSF1 activation upon stress, we see a dramatic decrease in the partition percentage of HSF1. This suggests that post-translational modifications may drive reorganization of HSF1 into puncta in the cell.

Coming back to the theme of this session—ordered and disordered—HSF1 has several ordered and disordered domains. There are two major disordered domains: the regulatory domain and activation domain. It also has another multivalent domain, the trimerization domain.

Condensation can occur largely through multivalency. Multivalency can be achieved through multimeric domains such as the trimerization domain, or through intrinsically disordered regions, which look more like spaghetti and can crash into each other, although there is some specificity. I'm calling it crashing.

We made domain deletions and reintroduced these Halo-tagged variants into the cells at levels close to endogenous levels. Removing the structured DNA-binding domain or the structured trimerization domain ablated condensation. Removing the structured LZ4 domain or the unstructured activation domain did not ablate condensation; condensation still occurred. The intrinsically disordered activation domain therefore did not contribute dramatically to condensation.

With the intrinsically disordered regulatory domain, we saw the opposite. Removing the regulatory domain drove condensation even in the absence of stress, suggesting that the disordered regulatory domain is a negative regulator of condensation.

We then asked whether these disordered domains, although not directly related to condensate formation, are related to function. Using our co-enrichment assays, we found that in the absence of the activation domain, none of the transcriptional apparatus was co-enriched. The activation domain is probably roping these components into the condensate.

The regulatory-domain deletion produced something peculiar. Almost all of the transcriptional apparatus became enriched, even in the absence of stress, but actively transcribing RNA polymerase II was absent. It could not recruit actively transcribing RNA polymerase II even in the presence of stress. This is therefore a condensate poised for transcription but unable to transcribe anything.

This leads to a model in which these HSF1 condensates exhibit what we think is a stepwise organization. Formation is not concentration dependent, so it does not follow the classical rules of condensate formation. It is a reorganization event, and PTMs play a major role.

## 00:20:00.000–00:32:53.000

Each domain has a distinct function. DNA binding, DNA itself, and the trimerization domain contribute to multivalency. The disordered regions do not contribute directly to condensate formation but probably act as landing pads for cofactors that become co-enriched in the condensate.

### Type I and Type II stress-induced HSF1 condensates

We thought we had solved the problem: this was a transcription-activating condensate. We then applied many other stresses that we had previously shown to form condensates. There appeared to be one class of stresses in which HSF1 co-enriched with RNA polymerase II, actively transcribing RNA polymerase II, and nascent RNA. In another class, it did not. Condensates formed, but they were not transcriptionally active.

We performed the same set of transcriptional-enrichment assays. What I'm showing is an assortment of 183 different super-resolution microscopy experiments involving more than 10,000 nuclei and approximately 200,000 condensates, all averaged together. It was a lot of work.

Each component of the transcriptional apparatus, as well as an activation indicator, is shown along the rows, and stresses are shown along the columns. Heat shock gives a strong induction of pS320. All the other stresses produce slightly less pS320, suggesting slightly reduced activation.

Heat shock gives this nice enhancer-condensate formation. Other conditions stall at different stages. With azetidine-2-carboxylic acid, a plant toxin and proline analog, assembly can progress to RNA polymerase II but not actively transcribing polymerase. With heavy-metal toxins, everything can be present except RNA polymerase II. Under several oxidative stresses and chemical hypoxia, RNA polymerase II and BRD4 are absent.

With methylglyoxal—a metabolite elevated in diabetes and a metabolic stressor—and arsenic trioxide, a chemotherapeutic used in acute promyelocytic leukemia, almost none of the cofactors are enriched.

When we perform the domain-deletion experiments, inhibiting activation with cycloheximide increases condensation under these Type II stresses. Removing the DNA-binding or trimerization domain prevents condensate formation. Type II stresses and condensates therefore follow formation rules similar to those of Type I, heat-shock-like condensates, except that Type II formation is PTM independent and stalls at distinct stages of hub assembly.

What does this mean for the cell? We performed a genome-wide assessment of HSF1 occupancy and HSF1 transcriptional activity using CUT&RUN, an epigenomic assay, and BrU-seq, a nascent-RNA sequencing assay. There was a consistent decrease in the extent of induction from canonical Type I stresses to Type II stresses. I am not saying that there was no induction; there was a decrease in the extent of induction. We performed spike-in controls and careful comparisons to ensure that this was real. Overall, there was a global decrease in genomic occupancy of HSF1 and in its transcriptional program.

### Distinct material properties and reversibility

We asked whether this was consistent with the biophysical properties of HSF1. We needed to see both diffusing HSF1 and HSF1 within condensates. Unfortunately, these condensates are so small that we cannot perform sub-condensate FRAP. We therefore hacked a labeling scheme for single-molecule tracking in which we label substoichiometrically with one dye and superstoichiometrically with another. This allows us to see condensates and single molecules at the same time.

The condensates formed during Type I stresses were much more dynamic than those formed during Type II stresses, suggesting that condensates have distinct material properties depending on the stress.

This leads to a model in which one state consists of transcriptionally active condensates, whereas other condensates may sequester HSF1 away from its function and perhaps co-sequester transcriptional apparatus away from transcription at other sites.

This is also consistent with data developing in the lab. If we remove a Type I stress, the condensates dissolve, as they should. Under Type II stresses, they persist, similar to what may be seen in Lewy body disease or neurodegeneration.

Overall, this has given us a paradigm for targeting HSF1 and perhaps condensates more broadly. In addition to viewing HSF1 and other transcription factors through activation, DNA binding, and transcription, we can view them through condensation, dissolution, inhibition of co-condensation, or promotion of an inactive aggregate state.

### Acknowledgments

With that, I'll stop and thank all the wonderful people who did the work. I'm just a spokesperson. The work was led by three people: MD-PhD student Jeff Dudley, clinical research fellow Joel Berends, and postdoctoral fellow Chayan De, along with a group of wonderful collaborators shown in red.

The Truttmann lab did some *C. elegans* work for us. We collaborated with Mats Ljungman for BrU-seq and with Srinivas Ramachandran in Colorado for epigenomics. I would also like to thank our current and past funding bodies. Finally, a shameless plug: we are hiring. If you are interested in doing some of this fun work, please feel free to reach out. I'll be happy to take questions.

### Questions and answers

**Audience member:**
Awesome study. In the context of those non-heat-shock condensates, are those transcription factors somewhere else, independent of HSF1, or are those other transcriptional readouts not forming condensates at all? You are looking at this through the lens of HSF1 condensates.

**Sethu Pitchiaya, PhD:**
That is correct. The question is whether other transcription factors can possibly form condensates in those contexts. Is that right?

**Audience member:**
Yes. During heat shock, you are looking at heat shock factor condensates because that is the response factor. But under heavy-metal or non-heat-shock stresses, are those transcriptional readouts or factors somewhere else that you are not examining?

**Sethu Pitchiaya, PhD:**
Correct. The transcriptional apparatus we are looking at is not present at the heat shock factor condensates under those stresses. However, under oxidative stress, for instance, we can see co-enrichment at condensates of NRF2, or NFE2L2, an oxidative-stress-associated transcription factor.

Under chemical hypoxia or hypoxia, we see HIF-1α forming condensates that co-enrich the transcriptional apparatus—not the enhancer apparatus, but largely the promoter apparatus. We do see it. Transcription is not globally shut down, but HSF1 is pulling away transcriptional apparatus that could otherwise have been present there. If you remove HSF1, we see more of that apparatus in those condensates.

**Steve Kregel, PhD:**
Great talk, Sethu. Steve Kregel, Loyola University Chicago.

**Sethu Pitchiaya, PhD:**
Nice to meet you.

**Steve Kregel, PhD:**
Yes, we go way back. One thing we both know is that many cancer cells, particularly prostate cancer cells, are fundamentally the worst for microscopy. You rely on U2OS osteosarcoma cells, but then you tantalize all of us nuclear-hormone people by showing our favorite friends interacting. What other nuclear hormone receptors—or any nuclear receptors—are present in U2OS? Do you see them colocalize, and have you modulated them at all?

**Sethu Pitchiaya, PhD:**
Good question. U2OS is a great model because it is a nice, flat, clear cell line, so we always start with it. But, with a lot of effort, we did almost all the work you saw here in 19 different cell lines. These included your favorite prostate cancer cell lines: LNCaP, 22Rv1, PC3, and DU145, at the very least. In all cases, they followed a very similar paradigm as far as heat shock factor was concerned.

Nada talked about AR and condensates. We also examine this in the context of cellular stress responses and interactions with chaperone machinery. Those condensates are much more difficult to see, but perhaps super-resolution microscopy is needed to define them better, quantify them, and identify key principles of condensation.

**Steve Kregel, PhD:**
If you activate or antagonize AR, for example, do you see differences in HSF1 formation?

**Sethu Pitchiaya, PhD:**
We have done this. When we inhibit chaperones, that can increase AR activity because the chaperone is released from AR and AR becomes activated. With inhibition of certain chaperones—not all—we see a decrease in HSF condensation because now HSF—actually, I take that back. We see an increase in HSF condensation in the presence of those chaperone inhibitors. What we have not determined is whether AR and HSF1 interact.

**Steve Kregel, PhD:**
Awesome.

**Frances Sladek, PhD:**
Hi, Frances Sladek, UC Riverside. Just one quick question. You might have mentioned it, but I missed it in this very intense and interesting talk. Approximately how many HSF1 molecules are there per nucleus? Numbers obviously matter. Do you have an estimate of what numbers we are talking about?

**Sethu Pitchiaya, PhD:**
I had this estimate in the back of my head, and now I forget. I know the concentration: it is 400 nanomolar in the nucleus. Because we do super-resolution microscopy, we also know the number of HSF1 molecules in the condensates. In the large, mesoscale condensates, there are hundreds. In the small condensates, there are a few tens. I don't remember the exact number of HSF1 molecules in the nucleus. I'm so sorry.

**Frances Sladek, PhD:**
Okay, thanks.

**Doug Kojetin, PhD (Moderator):**
I will ask one question too. When you started by discussing temperature dependence, I first wondered whether the trigger was a thermodynamic effect of temperature. But then you added all these other stresses. What is the mechanistic trigger that causes the condensates to form?

**Sethu Pitchiaya, PhD:**
Great question, and that's a reviewer question.

**Doug Kojetin, PhD (Moderator):**
I am that reviewer.

**Sethu Pitchiaya, PhD:**
We think, first, that these stresses interfere with the post-translational modifications that make the condensates form. Second, many of these stresses probably affect HSF1 directly. With methylglyoxal, for instance, we are finding that it adds glycated adducts directly to HSF1. We think this causes HSF1 to form condensates with dense, aggregate-like, distinct biophysical properties that are unable to recruit the transcriptional apparatus.

Some of these stresses directly affect what HSF1 would normally do under heat shock, where none of those direct modification events is happening.

**Doug Kojetin, PhD (Moderator):**
Have you examined whether those different stresses influence HSF1 transcription, and therefore protein levels? An increase in protein concentration could push it over the concentration limit.

**Sethu Pitchiaya, PhD:**
Definitely. At least at the timescales of these experiments, there is no change in protein levels.

**Doug Kojetin, PhD (Moderator):**
All right. Let's thank our three reviewers.
