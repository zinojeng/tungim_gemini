# Insights from Human Single-Cell Sequencing Across the Lifespan

- Conference: ENDO 2026
- Session: SY09-02
- Speaker: Carey Lumeng, MD, PhD, University of Michigan
- Source audio: `audio.mp3`
- Transcription model: `gpt-transcribe`

> Editorial status: terminology-corrected, readable English transcript. Medical terminology, proper nouns, gene and protein symbols, abbreviations, numbers, punctuation, speaker turns, headings, and paragraph breaks were corrected using the ENDO 2026 presentation metadata, the raw transcript, the available slide evidence, the terminology glossary, and primary or institutional sources. The presentation order, claims, qualifications, humor, questions, and answers were preserved. Audience identities without sufficient corroboration were generalized. The original API transcript remains unchanged in `transcript_gpt-transcribe.md`.

## 00:00:00.000–00:20:00.000

### Welcome and introduction

**Moderator:** Good morning, everyone, and welcome. My name is Ramiah Jacks. I am an assistant professor at The Ohio State University, and I will be your chair today. I am tasked with giving you several reminders. Please silence all your electronic devices. You can ask questions at the end of each talk by coming up to the microphone in the aisle or by submitting questions in the ENDO mobile app. To do this, go to this session and click the “Submit Your Questions” link. Finally, please respect the science and do not record any presentations without the presenter's permission.

I would like to welcome our next speaker, Dr. Carey Lumeng, from that state up north—the University of Michigan. For those of you who missed the introduction, I would also like to remind you to silence all electronic devices during this session.

### Scope of the presentation

**Carey Lumeng:** Good afternoon. Thanks, everybody, for coming, and thanks to the organizers for letting me talk about work from our laboratory. Much of it is unpublished, and I will also review some of the work in single-cell biology and adipose tissue.

I am going to cover a few broad topics. The first is the use of single-cell and single-nucleus approaches to understand human adipose-tissue biology; all the data I will show today are from humans. I will also discuss our as-yet-unpublished multi-omic analysis of human adipose tissue and our work toward a draft pediatric cell atlas of adipose tissue.

### Cellular composition of human adipose tissue

Following Tony, I also show this slide. Initially, I think most people regarded adipose tissue as a fairly boring place filled mainly with adipocytes. When we started looking—and this image is from mice, although we see a similar pattern in humans—we found that adipocytes are certainly the most common cells by volume. But if you look at the cells stained red here, representing every nucleus, it is hard to argue that adipocytes are the most prominent cell type by number.

This has been borne out in numerous studies showing that adipocytes account for only about 15%–20% of nuclei in human adipose tissue, depending on the depot. Subcutaneous fat is shown in blue and visceral fat in red.

What constitutes the rest? The remaining compartment has been termed the stromal vascular fraction. When we started this work, I think most people in adipose biology discarded these cells. Nowadays, we retain them because they make up about 75%–80% of the cells in adipose tissue. This fraction includes stem cells, preadipocytes, endothelial cells, neurons, and a wide range of leukocytes. Like Tony's group, our laboratory is particularly interested in macrophages, the most prominent leukocyte population.

We have used a range of techniques, including dissociating fat and using flow cytometry to quantify and separate these cells. As all of you know, especially from today's plenary sessions, there has been an explosion in the use of next-generation sequencing techniques to obtain a higher-resolution view of these cell populations. Many groups have pursued this over the past several years.

The approaches include protein-based assays using multiplexed hybridization to examine protein expression; sequencing-based spatial analyses to examine RNA levels in space, as discussed in the previous question; and single-cell approaches in which cells or nuclei are separated and their RNA transcription is analyzed to group the cells. These methods have been reviewed in several papers over the past few years.

Human studies require good communication with surgical teams, clear definitions of the sampled depots, and collection of metadata—which remains highly variable among groups and is something we are trying to improve over time. The general workflow is to obtain adipose tissue, isolate either nuclei or stromal vascular fraction cells, perform quality control to ensure that the nuclei are intact and suitable for sequencing, and then generate single-cell RNA-sequencing or single-nucleus RNA-sequencing datasets. Many of us have taken this approach and are now trying to unify it.

Our laboratory has performed several such studies in humans. One of our earlier maps shows four major groups of cells: immune cells; stromal cells, used here as a broad category; vascular cells, including a wide range of endothelial cells; and adipocytes. These populations are transcriptionally distinct and can be grouped. For those less familiar with single-cell biology, each cluster contains cells with similar transcriptional profiles.

When we compared stromal vascular cell datasets with nuclear datasets, single-nucleus sequencing captured the adipocytes—as expected, because whole adipocytes do not pass through the instruments well. It also captured many endothelial cells that I think were previously underrepresented, including lymphatic endothelial cells, endothelial progenitor cells, and many pericytes. These cells can be obtained from stromal vascular fraction preparations, but they are captured much more efficiently in nuclear preparations from adipose tissue.

### Public atlases and harmonization

Our work and that of others have been assembled into several compendia; the more data one has, the better. A 2023 version combined our dataset with work by Margo Emont and colleagues and with several other datasets available at the time. That compendium contained nearly half a million cells or nuclei. The current challenge is deciding whether there truly are eight types of T cells or four types of adipocytes; nomenclature remains difficult.

These resources are accessible to researchers in public online repositories. Generally, you do not need to write code to determine whether your gene or cell type of interest is present. Resources include the Chan Zuckerberg Initiative's CELLxGENE database, the Broad Institute's Single Cell Portal, the WAT Knowledge Portal at `adiposetissue.org`, and the Common Metabolic Diseases Genome Atlas. At today's plenary, we also heard from Professor Farooqi about the Hormone Cell Atlas. These are useful resources for researchers with specific questions. They are geared largely toward human studies, although animal studies are also represented.

What are the challenges in the field? Adipose tissue is not a single depot. Humans have multiple depots that must be sampled, correctly identified, and appropriately annotated. One goal of the Human Cell Atlas Adipose Biological Network is to unify the available datasets into a single accessible compendium, clarify the relevant metadata, and standardize nomenclature. Dr. Weinstock, our next speaker, has been essential in advancing this effort.

### Paired subcutaneous and visceral adipose tissue

We have expanded our dataset to about 15 patients from whom we obtained paired subcutaneous and omental fat biopsies. Most were undergoing bariatric surgery and therefore had obesity, with a range of metabolic disease states. We are not currently powered to identify differences by metabolic disease status. We hope that expansion of the Human Cell Atlas dataset will change that over time.

Today I will focus mainly on differences between superficial abdominal subcutaneous adipose tissue and omental adipose tissue. Single-cell maps from subcutaneous and visceral fat show that most cell types are present in both depots. What is strikingly present in visceral adipose tissue, but not subcutaneous adipose tissue, is a cluster of mesothelial-like cells. These cells have been identified in almost every visceral adipose-tissue depot. Some evidence suggests that they are anti-adipogenic, and I will return to them later. They may help explain why visceral fat has cellular features that differ from those of subcutaneous fat.

If you culture cells from subcutaneous and visceral fat, these mesothelial-like cells are very prominent in visceral cultures. You can debate whether to call them contaminants, but they are present in substantial numbers in addition to true preadipocytes.

Visceral fat is also highly enriched in endothelial cells, consistent with other work showing that it is more vascular. We corroborated this in independent flow-cytometry experiments comparing visceral adipose tissue (VAT) and subcutaneous adipose tissue (SAT) for endothelial cells and preadipocytes: VAT contained a greater proportion of endothelial cells and fewer preadipocytes. This also correlated with attempts to perform adipogenesis assays in these cells.

### Joint single-nucleus RNA and ATAC sequencing

Most datasets generated to date have shown RNA profiles and differences in RNA expression. We decided to add another data layer to increase both complexity and information. I will explain how I think this has helped us reach some of the deeper biology.

We use a single-nucleus approach to profile RNA and chromatin accessibility simultaneously in every nucleus. The chromatin assay is ATAC-seq. For those who may not know what ATAC-seq is, it samples the genome to identify regions in which chromatin is closed or open. In closed chromatin, the DNA is condensed and is presumed to be less accessible to transcription factors and less actively transcribed. In open chromatin, the DNA is accessible, and those regions typically correlate with gene expression.

In that sense, we can identify not only that a gene is upregulated but also why it may be upregulated: which regions are accessible and which transcription factors might drive the biological program. This approach has been used in adipose tissue before. Karen Mohlke's group studied human cells in adipogenesis assays, performing simultaneous bulk RNA and ATAC-seq profiling. They identified transcriptional changes that correlated with changes in DNA accessibility, showing that regions of DNA open during differentiation.

We used the 10x Genomics platform to profile chromatin accessibility and RNA simultaneously in nuclei from adipose tissue. In our current dataset, which we continue to expand, quality control left us with about 12,000 nuclei. The overall profile resembles what we see with RNA sequencing. Every UMAP I show integrates both DNA and RNA information. When ATAC and RNA profiles are viewed side by side, the ATAC signal indicating open DNA correlates well with the RNA signal indicating expression across cell types and cell states. We therefore think we have useful information about what drives the observed gene-expression changes.

I will describe several ways in which we have used this dataset to test hypotheses and generate new ones. First, where are the open DNA regions? As you might expect, many are in promoters, but fewer than half of the open regions in key cell types such as adipocytes and fibro-adipogenic progenitors (FAPs), or preadipocytes, are actually in promoters. Many regulatory regions occur in introns or outside genes, so we can sample broadly around each gene.

For the main adipose-tissue cell types, we see good correlation between the ATAC signal, which indicates accessible DNA, and RNA expression. We can therefore identify not only that a gene is active, but potentially why it is active.

For example, the ATAC-seq and RNA profiles across multiple cell types for `ADIPOQ`, the adiponectin gene, show specific accessibility peaks present only in adipocytes. These identify regions that may be responsible for active `ADIPOQ` transcription. In macrophages, `MS4A7` lies in a locus with several coregulated genes. That program is active specifically in macrophages rather than in other cell types, and the data identify candidate regulatory regions involved in turning it on.

### Cell-specific and depot-specific transcription-factor programs

We can then ask which transcription factors may occupy those open regions. Using sequences from the ATAC peaks, we look for transcription-factor motifs enriched in each cell type. Each cell type has a distinct regulatory profile.

In adipocytes, the dominant signals are related to C/EBP transcription factors, many of which have also been demonstrated in culture. These data, however, come from primary human adipocytes. In FAPs, FOS–JUN family AP-1 transcription factors are highly enriched and are largely switched off in mature adipocytes. Mesothelial cells—the visceral-fat-specific population discussed earlier—are enriched for anti-adipogenic transcription factors such as GATA and TEAD family members. Immune cells share enrichment for ETS-family transcription factors, with additional factors specific to macrophages and to T and B cells.

Profiles centered on transcription start sites show enrichment of C/EBPα in adipocytes, FOS in FAPs, and EBF1 in pericytes. Thus, these data provide good candidates for the transcription factors activated in a cell-type-specific fashion.

Because the dataset contains paired SAT and VAT samples, we can identify factors preferentially active in either depot. Certain PPAR transcription factors are more active in VAT than in SAT, whereas AP-1 transcription factors are somewhat more active in subcutaneous adipocytes. Similarly, in FAPs, PPARγ signals are more active in visceral fat, while AP-1 signals are more active in subcutaneous fat. This resembles what Professor Farooqi showed earlier: each depot has a distinct program in both progenitors and adipocytes. The next task is to determine why.

### Adipose-tissue macrophage programs

Like Tony, my laboratory is interested in macrophages. There are multiple macrophage populations, including lipid-associated macrophages (LAMs), a CD206/MRC1-positive population, a TIMD4-positive population, and dendritic cells. We can identify population-specific gene expression and the ATAC signals showing how genes are activated in each population.

LAMs show strong activity of several AP-1 transcription factors, which are important for macrophage activation, as well as C/EBP factors. This program resembles the lipid-handling program in adipocytes. What is most striking is how different these macrophage states are from one another. There has been debate about whether they merely represent a spectrum, but the regulatory data suggest that they sense quite different programs even when they are spatially adjacent.

We often see a crown-like structure containing lipid-laden macrophages immediately next to a macrophage with no detectable lipid. In that sense, they are more like apples and bananas than apples and oranges. Resident MRC1-positive macrophages show activity of NFI transcription factors, whereas TIMD4-positive macrophages show activity of transcription factors involved in development, including the glucocorticoid receptor. We have also observed that glucocorticoids can shape many of these populations.

### Linking open chromatin to metabolic GWAS signals

We have extensive genome-wide association study (GWAS) data for metabolic and obesity-related traits, and we now have cell-type-specific maps of open chromatin. We can therefore ask whether GWAS risk alleles overlap accessible regions and infer which cell types may be enriched for genetic risk for particular metabolic traits.

This analysis was performed with our collaborators Steve Parker and Arushi Varshney, who have also applied it to skeletal muscle and pancreas. It uses our ATAC peaks and GWAS associations from UK Biobank. The method, linkage disequilibrium score regression, uses linkage disequilibrium to calculate an enrichment score for each locus and trait.

We included known datasets as controls. Islet beta cells, for example, contain ATAC-accessible regions enriched for type 2 diabetes associations, as Steve's group has shown previously. Bulk adipose tissue shows little enrichment. When we examine individual adipose cell types, however, adipocytes stand out as being highly enriched for GWAS signals related not only to type 2 diabetes but also to waist-to-hip ratio adjusted for BMI, fasting insulin, and insulin sensitivity. FAPs also show signals for body-composition measures and waist-to-hip ratio adjusted for BMI.

This increases the resolution at which we can identify potentially causal cell types. As a macrophage biologist I may be a little disappointed, but adipocytes seem to control their own fate: much of the genetic risk related to waist-to-hip ratio variation and fasting insulin lies in progenitors and adipocytes. When we further divide the data by depot, most of these signals appear in visceral-fat adipocytes and visceral-fat FAPs. We are continuing to explore this, but the risk seems specific both to depot and to cell type.

## 00:20:00.000–00:32:27.000

### Cell trajectories and mesothelial adipogenic potential

Another analysis concerns cell fate. RNA-sequencing data are often used to infer cell trajectories as a cell moves from one state to another. We now have additional information about how chromatin opens or closes between states. Using a tool developed by our collaborator Josh Welch, we asked how human adipose cell states are related when this extra data layer is included.

In subcutaneous fat, there is a clear relationship between FAPs and adipocytes, with a common progenitor in the middle moving toward adipocytes. Reports in mice and humans have suggested that mesothelial cells can generate adipocytes. In visceral fat we see the same FAP-to-adipocyte relationship, with a possible common node connecting mesothelial cells and FAPs.

The ATAC data also let us model how DNA opens as RNA expression turns on. For genes such as `ITIH5`, we see a progression of activity from mesothelial cells to FAPs to adipocytes, consistent with the possibility that they share a lineage.

We performed experiments to support this possibility. We fluorescence-activated cell sorted mesothelial cells and FAPs from human adipose tissue, cultured them under differentiation conditions, and found that both populations could become adipocytes even in minimal differentiation medium without rosiglitazone. The resulting adipocytes differed metabolically: FAP-derived adipocytes showed greater lipid accumulation and lipolysis. We wonder whether this helps explain the reported diversity of adipocytes, and we are continuing to investigate it.

### Draft pediatric adipose-tissue cell atlas

In the final minutes I would like to discuss something quite different. I am a pediatrician, and adipose tissue changes dramatically through childhood. Peak body fat occurs in infancy, then declines and becomes sexually divergent during adolescence. We were struck by the lack of information about childhood adipose-tissue biology, both in disease and in normal development. Adipose tissue in children can have major roles in growth—including both failure to thrive and obesity—as well as in nutrient metabolism, endocrine function, and reproductive function.

In collaboration with cardiac surgeons, general surgeons, endocrinologists, general pediatricians, and others at C.S. Mott Children's Hospital, we set out to build a draft pediatric adipose-tissue atlas. We currently have 44 samples and continue to add more. These include paired subcutaneous and omental adipose-tissue samples from children who are as healthy as we can identify. They do not have obesity and are not undergoing bariatric surgery. We also obtained epicardial adipose tissue from children with noncyanotic congenital heart disease. We performed multi-omic single-nucleus analysis using both ATAC-seq and RNA-seq.

Our maps span infants, preschool-age children, school-age children, adolescents, and adults. The adult samples come from our bariatric surgery cohort with obesity, so there will be differences between the groups. In general, all major cell types are present at every age. There may be proportional differences, but the overall snapshot of adipose-tissue composition is fairly stable.

Mesothelial cells remain highly enriched in pediatric visceral adipose tissue. When we compare SAT and VAT from adults and children, mesothelial cells are proportionally more abundant in children. Adults have more immune cells—macrophages and T cells—in subcutaneous fat, and more FAPs in visceral fat. There are several ways to analyze proportions, and we are evaluating those tools now.

For adipose-tissue macrophages, we currently have many more pediatric than adult cells. The combined map includes LAMs, a `PF4`-positive resident population, and a `LYVE1`-positive population. Relative to all macrophages, `LYVE1`-positive cells are increased in adults. LAMs are present in both age groups, while the resident `PF4`-positive population may be slightly increased in children.

With the ATAC data, we can examine transcription-factor programs in these populations. The `PF4`-positive macrophages enriched in children show MAF activity, consistent with a developmental macrophage program. The `LYVE1`-positive population is enriched for nuclear-factor family motifs and TFEB, while LAMs are enriched for AP-1 transcription factors. When we compare gene expression in pediatric and adult LAMs, adult LAMs show greater expression of lipid-metabolism genes such as `LPL`, `CD9`, and `PPARG`, whereas `PF4` and inflammatory cytokines are expressed more highly in pediatric LAMs. More work is needed to understand the functional significance of these differences.

### Conclusions

In conclusion, we have used single-nucleus approaches to identify adipose-tissue cell types and states. Watch for the Human Cell Atlas effort to unify nomenclature and definitions in human adipose tissue. Using ATAC-seq data, we found that metabolic-risk alleles are concentrated in active chromatin regions in visceral-fat adipocytes and FAPs. We identified VAT-specific mesothelial cells that may contribute to adipogenesis in humans, and we are defining age-dependent differences in macrophages and adipocytes by profiling across the lifespan.

This is the group that performed the work, including Ramiah. Peizi Wu conducted much of the bioinformatics, and Clarissa Strieder-Barboza performed much of the single-cell work. We collaborate with several bioinformaticians who know much more about this than I do, and the pediatric atlas has depended on a large collaborative group of surgeons and other colleagues. Thank you, and I am happy to take questions.

### Q&A — how visceral fat may affect systemic cardiometabolic disease

**Moderator:** Thank you, Carey, for that great talk. We have a good amount of time for questions. Please line up. We have questions online and in person.

**Audience member:** We know that visceral fat—mesenteric, omental, and epiploic fat—is associated with cardiometabolic disease, which has led to the conclusion that it is causative. You showed changes in mesothelial cells and in some genes. Are there pathways in those cells that could be responsible for systemic cardiometabolic dysfunction?

**Carey Lumeng:** They are very fibrotic, so fibrosis would be one answer. That has been a major challenge in the field. They also have inflammatory features, and there are probably subsets that we do not yet understand. The answer may also depend on where the biopsy is taken within the large omentum, which has been poorly standardized.

**Audience member:** But what would they produce that enters the circulation and causes the systemic effect? There has to be a signal.

**Carey Lumeng:** We have done some cell-communication analyses, but nothing compelling has emerged yet. We are working on it.

### Q&A — pediatric-to-adult trajectories

**Audience member:** I am a pediatrician, so the pediatric data were fascinating. Your adult dataset is from people with obesity, while the pediatric dataset is presumably from children without obesity. Have you performed the trajectory analyses in the pediatric dataset, and do they provide insight into what may lead to the adult state or what could be perturbed?

**Carey Lumeng:** That work is ongoing, and more cells and deeper sequencing will help. ATAC-seq is very sequencing-hungry; you can keep sequencing before the signal reaches saturation. We are therefore resequencing many samples to obtain more data.

### Q&A — additional epigenetic mechanisms

**Audience member:** Much of your presentation focused on ATAC-seq data. Are there efforts to investigate what drives the differences in gene-expression programs, such as histone modifications or DNA methylation?

**Carey Lumeng:** We have not done that work. Other groups have studied those mechanisms extensively in cultured adipogenesis systems, but that is the next step for some of our questions. We are using ATAC-seq as the most accessible current method for assessing global chromatin changes, but much more remains to be done.

### Q&A — children, adults with obesity, and lean adults

**Audience member:** I am a high-school student from the University of Chicago. I am also interested in the comparison between adults and children and the surprising similarities between adults with obesity and children. Do you think that similarity reflects sampling adults with obesity, where adipose tissue is also growing, or would normal-BMI adults show similar patterns?

**Carey Lumeng:** We have some data from lean adults that we are trying to integrate, but we need more. Cell proportions alone may not provide the answer. When we examine state differences within specific cell types, many differences become clearer than they do in a pure proportion analysis.

How cell proportions are measured also varies substantially among studies. Another challenge is that there are not many bioinformatics tools for comparing so many biological states together with clinical metadata. Those tools are being developed alongside our project. We are still working out how to account for paired samples and the clinical metadata one ultimately wants—sex, age across five age groups, obesity, and other variables.

### Q&A — preadipocytes, fibroblasts, and FAP nomenclature

**Audience member:** Are you distinguishing preadipocytes from fibroblasts? FAPs can represent both, and I wondered whether fibroblasts form a separate single-cell population.

**Carey Lumeng:** I think the answer is yes, but the nomenclature remains difficult. We have called them ASCs, or adipose stromal cells. The field has increasingly coalesced around the term FAPs, or fibro-adipogenic progenitors. They all look like fibroblasts under a microscope.

That is one of the challenges the Human Cell Atlas is addressing: what nomenclature can we all agree on? It is still not clear. Many of those categories include fibroblasts. Mesothelial cells also look like fibroblasts after extended culture, so historically they may have been included in the same group, but they are distinct.

**Moderator:** Thank you so much, Carey.

## Editorial verification sources

- ENDO 2026 presentation record for SY09-02: https://endo2026.endocrine.org/fsPopup.asp?PresentationID=1761449&mode=presInfo
- ENDO 2026 profile for Carey Lumeng: https://endo2026.endocrine.org/fsPopup.asp?PresenterId=2331798&mode=presenterinfo
- ENDO 2026 profile for symposium chair Ramiah Jacks: https://endo2026.endocrine.org/fsPopup.asp?PresenterID=2331883&mode=presenterinfo
- Human Cell Atlas Adipose Biological Network: https://data.humancellatlas.org/hca-bio-networks/adipose
- WAT Knowledge Portal: https://adiposetissue.org/
- Common Metabolic Diseases Genome Atlas: https://cmdga.org/help/getting-started/
- Consensus atlas review of human and mouse adipose tissue: https://www.nature.com/articles/s42255-025-01296-9
