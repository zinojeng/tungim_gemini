# Terminology-corrected English transcript

- Source: `audio.mp3`
- Model: `gpt-transcribe`
- Language: English
- Keyword hints: ENDO 2026, Endocrine Society, hypothalamic-pituitary-adrenal axis, HPA axis, ACTH, CRH, cortisol, cortisone, cosyntropin, Synacthen, hydrocortisone, fludrocortisone, dexamethasone, prednisolone, adrenal insufficiency, Cushing syndrome, Cushing disease, Addison disease, aldosterone, renin, cortisol-binding globulin, mass spectrometry, nmol/L, µg/dL, vasopressin, arginine vasopressin, AVP, oxytocin, prolactin, acromegaly, hypophysitis, craniopharyngioma, pituitary neuroendocrine tumor, PitNET, SY01, Molecular Biomarkers of Aggressiveness in Pituitary Neuroendocrine Tumors: From Early Detection to Targeted Therapy, Qilin Zhang, MD, PhD, MMSc
- Context: An English-language ENDO 2026 medical conference recording.

- Topic: Neuroendocrinology and Pituitary
- Session: *When Benign Isn't Harmless: Revisiting Aggressiveness and Extrasellar Spread in Pituitary Adenomas*
- Presentation: *Molecular Biomarkers of Aggressiveness in Pituitary Neuroendocrine Tumors: From Early Detection to Targeted Therapy*
- Primary speaker: Qilin Zhang, MD, PhD, MMSc
- Scope: Single agenda presentation; moderator introduction and attached Q&A are included.
- Editing: Medical terminology, proper nouns, numbers, units, punctuation, and paragraphing were corrected against the presentation metadata, published studies, and available slide text. Content order and meaning were preserved; no summary or translation was added.

## 00:00:00.000–00:20:00.000

### Moderator introduction

We move on to the last talk by Dr. Qilin Zhang, who's going to tell us about molecular biomarkers of aggressiveness in pituitary neuroendocrine tumors from early detection to targeted therapy.

Thank you.

### Qilin Zhang

Thank you, everyone.

Good morning.

I'm Qilin Zhang, also a neurosurgeon from China, and I also trained as a neuroendocrine researcher at Mass General Brigham.

And thank you for the previous two speakers.

So they focused on the surgical and genomic perspectives, and I will focus on RNA- and protein-level biomarkers and discuss their implications for targeted therapy.

### AI pathology risk model

So we know the pituitary tumors, right?

The current treatment is surgery, radiotherapy, and medications.

And however, around just 1% or less of these tumors show multiple recurrence or continued progression despite combined these treatments.

And these tumors are defined as aggressive tumors, although they are rare, they represent a major clinical challenge.

So to find these only less than 1% tumors, we do a retrospective cohort analysis.

And in our center, we find like over 2,000 tumors, and we find like over 100 tumors, they have aggressive tumors, and we have their H&E samples.

We scan their H&E slides.

We try to use the AI to predict whether they will become aggressive in the future based on their follow-up data.

So to exclude non-tumor and interfering regions, we send these images to the AI, and tumor area was then analyzed and identified morphological patterns shared by the aggressive treatment-resistant or poor-prognosis tumors.

Luckily, we found that some regions could be classified as high-risk or low-risk tumor regions.

So we found these regions, we found tumor with higher proportion of these high-risk regions have significantly higher risk of recurrence.

And this finding was consistent not only in our training cohort in our own hospital, but also prospective validation cohort in our brother hospital's external validation cohort in other hospital in China.

So importantly, after adjusting the known clinical risk factors we can collect from other centers, including age, like previous surgeries, extent of resections, this AI prediction model still significantly can work.

It can significantly stratify patients by recurrent risk.

And we are trying to submit this work and we are trying to make these models an online software.

So hopefully this AI model can become accessible to most clinical physicians and researchers in near future.

Next, since AI allowed us to identify high-risk and low-risk tumor regions, we asked which biomarkers were enriched in those high-risk areas.

Here on the left we show the H&E image.

In the middle we show you the AI prediction model, which is red or yellow is high risk.

We found that high-risk regions had increased infiltration of immune cells, stromal cells, and other components of the tumor microenvironment.

This suggests that the high-risk regions are strongly associated with tumor microenvironment activations.

But the important question remains: what change occurred within the tumor cell in these regions other than their microenvironment?

### Multiomics and EMT^PRO

Next, we performed a multiomics study in another cohort that included 200 tumors and seven normal anterior pituitary glands as a reference.

And after all these analysis work, it's kind of complicated.

I don't want to talk about it anymore.

So using unsupervised clustering, we have seven clusters of them.

You can see the different tumors: four clusters were PIT1-lineage, two were TPIT-lineage, and one combined SF1-lineage and null-cell tumors.

Null-cell tumors were defined here by immunohistochemistry as negative for all three lineage transcription factors.

One of them was designated EMT^PRO.

One group contained tumors from multiple lineages here, and you can see from multiple lineages here, and but showed clearly higher invasive potential.

In this subgroup, 37.9% of tumors had Knosp grade 4, and 69% showed surgical invasion.

And we look into these subgroups and also shows higher score of immune score and stroma score, which we are consistent with our previous AI prediction models, and we are happy to see that.

And this feature was further validated by the immune or IHC stainings, of course.

And beyond the microenvironment, we see whether this invasive subgroup also showed activation of the EMT pathway, which is similar to the previous talker, thank you.

Several EMT-related transcription factors showed strong positive staining in these tumors.

So this is biologically relevant because the EMT is closely associated with tumor invasion, aggressiveness, and metastasis in many cancer subtypes.

But at the same time, EMT is also linked to stroma and immune microenvironment remodeling, and as well as the stemness-related features.

So therefore, we ask whether tumor cell plasticity or a change in differentiation status might also be associated with aggressive behavior.

So however, based on the bulk multi-omic data, we could not determine whether the high EMT signal come from tumor cell itself or simply reflect the increase of the microenvironment invasion.

So to answer this question, we minimize the confounding effect of the microenvironment.

The single-cell sequencing seemed to be the only choice.

### Differentiation framework from single-cell sequencing

This led us to consider PitNETs in the broader context of neuroendocrine tumors.

In other organs, such as the lung or gastrointestinal tract, neuroendocrine tumors are often classified by differentiation status.

This is classified as closely related to their prognosis, even called the poorly differentiated tumors as carcinomas.

However, this concept has not been really applied to our pituitary neuroendocrine tumor.

So we ask a simple question: could poorly differentiated PitNET, which are closely to the pituitary stem cell or progenitor cells, can be more aggressive, and conversely, could tumors closely to mature well-differentiated pituitary cells can be less aggressive, which mostly are functioning tumors.

But the challenge is that for both normal pituitary cells and PitNET, we still lack clear reference that the framework to define their differential status.

So without such a coordinating system, it's difficult to determine whether a tumor is more mature or more progenitor-like or less differentiated.

So to build this framework, we first performed single-cell sequencing on these three normal anterior pituitary glands.

And after clustering these cells, we identified distinct population that expressed transcription factor PIT1, but did not express any hormone genes.

It's weird.

But using the pseudotime or other differentiation-related analysis, we found these cells had developmental potential and could further differentiate into three pituitary hormone-producing cell types.

Therefore, we considered this population representative of PIT1-lineage progenitor cells.

So we then integrated our adult pituitary single-cell data with fetal anterior pituitary datasets generated by the group in Beijing.

So finally, we have their development strategy, we have our reference, we have our coordinators.

So next, we just doing the single-cell sequencing of pituitary tumors.

In this study, we included 21 PitNETs from different lineages, as you can see here.

So if we can combine this reference pituitary cell development with their tumors, we can see their tumor origin, or maybe help us to reveal what is tumor differentiation status.

So we put the normal pituitary cells on the left and put pituitary tumor cells on the tops, and when we align them across their hormone secretion abilities, and we can see the similarities during the comparisons.

It is clear that lactotroph tumors align with prolactin-secreting cells and somatotroph tumors align with GH-secreting cells.

But we see some tumors that comes up for our progenitor pituitary cells here.

They are from different lineages.

So we think that this comparison can help us to not reveal, maybe identify their tumor origin and reclassify the tumors into the well-differentiated tumors and poorly differentiated tumors.

And the good news is this differentiation, we also have, so with this classification, we have these markers of different clusters here.

So we can have these markers and we use like seven markers to identify what is poorly differentiated different lineage tumors.

We validated these markers in an independent cohort of 750 PitNETs, and this differentiation-based classification effectively predicted long-term recurrence risk and performed even better than Ki-67.

So however, we are not satisfied with this reference or this scoring so far.

Why?

Because in the adult pituitary data, we only identify one clear progenitor population, which is the PIT1 progenitor.

But as the literature showed, like the aggressive tumors, almost half of them are TPIT lineage tumors.

So the potential progenitor of the TPIT and SF1 lineage was still missing.

Then we noticed that there was more than 10 years ago, there was a Japanese group had reported an in vitro system to induce pituitary differentiation from the human stem cells.

Therefore, we try to reproduce this differentiation systems and hoping to capture the additional progenitor status during the pituitary development.

### Progenitor trajectories and corticotroph heterogeneity

Using this approach, we were able to generate pituitary-lineage cells under the expected culture conditions.

And after the onset of differentiation, we could also detect the secretion of multiple pituitary hormones in the cell culture medium, confirming the functional endocrine differentiation.

So we then performed single cell, sent these cells for two times, and before and after onset of differentiation.

And here is our newly data that just came out like six months ago.

We identified the pituitary cells, stem cells, neuron cells, mostly hypothalamus cells, and the microenvironment.

We exclude neuron-like cells and the microenvironment cells because we want to focus on the pituitary endocrine development.

As shown here, the cluster on the right represents proliferating cells, and the SOX2-positive cells represent stem cells.

The green population is SF1, the red is TPIT, and the blue is PIT1.

So we can see here there is, so we then use the pseudotime and cell development, we see how it comes from the proliferating cells to the secreting cells.

And we see, like, the pituitary cells do not differentiate from using a single linear pathway.

Instead, there appears to be two different pathways here.

One is in the black, one is in the yellow arrow.

Along these trajectories, we identified progenitor-like populations marked by GATA3 and CITED1.

Importantly, to discriminate, because GATA3 is also positive in SF1 cells or maybe some TSH-secreting cells.

But we also examined that the GATA2 is negative here.

So these progenitor cells, they are GATA3-positive and GATA2-negative.

So finally, we have how the pituitary cell development, and we are trying to focus on not the whole pituitary, but the data is too much, so we just focus on the PIT1 first because it has the highest volume of the aggressive tumors.

So with this updated reference.

With this reference, we could clearly identify TPIT progenitors and the TPIT lineage.

You can see here that we included 35 pituitary tumors.

Several Chinese groups shared their published data with us, giving a total of 35 tumors: 20 from patients with Cushing disease and 15 silent corticotroph tumors.

And after integrating these tumors together, we observed most SCA form into distinct clusters, with most Cushing disease clusters separately.

So you can see there are huge heterogeneity in the Cushing disease.

Although the functioning tumors share the clinical features of Cushing disease, their tumor biology is highly heterogeneous.

And we can see some Cushing disease tumors was overlapped with SCA tumors.

So if you have recall any clinical experience or case report you read, there may be some cases which previously performed as SCA first and transformed to Cushing disease later during their progress.

And we think maybe these two tumors are one of them.

So we also to see how is the tumor size and USP8 mutant.

I want to address the earlier question.

So this study we performed earlier this year, we see like in the Cushing disease there at least three subtypes.

One group comprises USP8-wild-type tumors.

The red line represents USP8-mutant tumors, and the dark blue line represents a subgroup of USP8-wild-type tumors.

So not all the USP8 wild type tumors are the same.

They are huge heterogeneities.

That USP8-wild-type subgroup had the worst outcome.

We believe that the most aggressive corticotroph tumors arise from this USP8-wild-type subgroup.

So that's why USP8 mutant tumors in the aggressive tumors seems much more easier to manage.

And because of the following time of these single cell cases still limited, we cannot directly assess long-term prognosis of this cohort.

Based on this classification, the tumors in the blue area belong to the USP8-wild-type subgroup.

For this lineage, one marker is CITED1, and two tumors are GATA3-positive and GATA2-negative.

So we'd like to see now the prognosis.

We are now validating the prognostic value of these three signatures in a larger cohort of 200 Cushing disease cases to determine whether these markers can distinguish aggressive tumors at a very early stage.

### Biomarker continuum

At this point, I would like to use TPIT-lineage tumors as an example to summarize these markers.

Traditionally, the TPIT lineage was classified clinically into Cushing disease and silent corticotroph tumors, with additional information from hormone secretion or mutations such as USP8.

However, based on our data, I think TPIT-lineage tumors may not fit a simple binary classification.

Instead, we may represent a biological continuum, as if we look at a large enough cohort, we can see different tumors in the different points of this continuum.

At one end, tumors are more hormone secreting and less aggressive, but at the other end, tumors are large, less functional, more invasive, and more treatment resistant.

At the genomic level, aggressiveness may be enriched for alterations such as ATRX, DAXX, and TP53, together with increased copy-number variation, loss of heterozygosity, or chromosomal instability, consistent with Dr. Geer's studies.

At the transcriptomic and protein levels, it may be associated with tumor-microenvironment activation, EMT-pathway activation, and a less differentiated or progenitor-like state, including markers such as GATA3 and CITED1.

So as somewhere along this continuum, tumor may begin to acquire aggressive features.

Importantly, it is not an absolute cutoff.

These markers may not define aggressiveness in every individual cases, but they may help identify tumors with a higher probability of aggressive behavior.

So after defining all these markers, we now have rich datasets from multi-omic and single-cell analysis.

This next question is how we translate these findings into better patient care and new therapy explorations.

### PitNET organoids and surufatinib

One direction is organoid culture.

Since we have defined these activation pathways in these different tumor subtypes, we try to optimize the cell culture condition.

If we know that this pathway is activated, we have the activators in this culture medium.

If we see this pathway is downregulated, we need to add some inhibitor of this pathway.

With these optimized conditions, we were able to establish PitNET organoids with good morphology.

These organoids could survive for at least three months, maintain hormone secretion in the culture medium, and preserve key tumor-related features such as Ki-67, hormone expression, and lineage transcription factors.

So I want to emphasize that three months is really key for us because if you send a tumor for a single-cell sequencing or whole genomic sequencing or any sequencing, you have to wait at least several weeks or one or two months.

These three months give us a window to clarify the tumor's molecular characteristics and then decide which drugs to use in screening.

In these patient-derived models, we screened 1,344 drugs; I will show some of the results.

On this organoid platform, cabergoline and somatostatin analogues did not show strong effects.

But we think it's a selection bias because tumors who undergo surgeries with provided samples for these screenings are often a poor response to or resistant to these medications.

Those who respond well, we will never have their tumor samples, right?

And some previous reported guideline recommend options such as mTOR inhibitors, everolimus, and temozolomide also showed less activity than we expected.

But do we have any work drugs?

Beyond this, we identified several agents with stronger effects in the organoid models.

One of the most promising candidates was surufatinib, which targets VEGFR1–3, FGFR1, and CSF-1R.

The targets of surufatinib are closely related to tumor proliferation, angiogenesis, and the tumor microenvironment, all of which were identified in our multiomics data.

And interestingly, this drug was already approved or advanced neuroendocrine tumors, including non-pancreatic NETs, and in China, because the pituitary is not officially classified as neuroendocrine tumors, so these patients there already can be covered by their health insurance to take these drugs.

And so we treated one patient with pituitary carcinoma.

This patient has recurrent disease despite three surgeries and five radiotherapies, and one of the surgery is from the brainstem metastasis.

And after six months of this drug treatment, the tumor showed partial shrinkage.

However, treatment had to be discontinued because of the proteinuria and hypertension.

And six months later, after discontinuation, the tumor showed clear progression again.

## 00:20:00.000–00:24:10.000

It has this spinal dissemination, and the patient was just expired last month.

And based on these findings, we have now initiated a clinical trial of this drug for pitNET.

This is a single-center, single-arm exploratory study to evaluate the efficacy and safety of surufatinib.

And hopefully this study will provide encouraging results for potential new therapy options for patients with aggressive pitNETs.

And during our protocol, we emphasized that we want to prioritize to recruit non-functioning tumors because we think, like prolactin tumors or functioning tumors, according to reports, they respond better to temozolomide.

So we want to focus on these non-functioning tumors.

Okay, that's pretty much.

And finally, I want to thank you sincerely to the two centers that have trained and supported me.

First is the Huashan Hospital Pituitary Center, which includes 84 physicians from 17 departments focused on pituitary disease.

I would also like to thank the Neuroendocrine Unit at Massachusetts General Brigham for their tremendous support, training, and guidance.

Thank you very much for your attention.

### Q&A

This presentation is open for questions.

Thanks.

**An audience member:** Thanks very much.

It's a really elegant presentation.

We have similar data on organoids in pheochromocytomas, metastatic pheochromocytomas and paragangliomas.

And it's very interesting.

We're also using drugs in vitro, but the interesting findings from that is that single drugs on their own are often not effective, including TKIs.

But when you combine them, either two or three, there's a synergistic or at least additive effect.

And having just written a review on TKIs in pheochromocytomas, they don't really do particularly well.

The patients get a PFS of six months, maybe nine months, even with sunitinib.

So I just wonder whether in your organoids in due course, you might use combinations of drugs, and that could then be used to predict tumor response in vivo as well as in vitro.

**Qilin Zhang:** Thank you for the question.

So, like the combination, we agree.

For TKIs, we also tried several agents at our center, including blood-brain barrier–penetrant TKIs, but they did not work very well.

We totally agree, and we not see a strong signal in TKI in organoid cultures.

So far, we have seen that surufatinib and several other agents show strong responses as single drugs.

We have not yet considered drug combinations because surufatinib and these other targeted drugs already have substantial toxicity, and severe adverse events have been observed in trials in other neuroendocrine tumors.

So we are not considering combinations, but that's really good suggestion.

We will try in the near future.

Thank you.

**An audience member:** In your pituitary organoids, were you able to exclude hypothalamic cells if these were derived from primitive stem cells?

Yeah.

So, hypothalamic cells, how we get the samples, the most question, right?

Were these derived from stem cells?

How were they derived?

**Qilin Zhang:** These tumor cells are from our surgical specimens.

They are tumor organoids.

So, like for this, for the iPSC-induced pituitary organoid we are doing from iPSC, it is totally in vitro.

But for the pituitary tumor cells, we are totally from our patients.

We are collecting, so there is no hypothalamus cells.

**An audience member:** For iPSC-derived cells, did you exclude hypothalamic cells?

**Qilin Zhang:** During culture, we did not exclude them, but during the single-cell sequencing analysis, we excluded them so that we could focus on the pituitary cells.

Otherwise, we will just see all the signatures, who is the difference between neuron cells and the secreting cells.

Thank you.

Any other questions?

If not, thank you very much.

Thank you.

### Verification sources

- Zhang Q et al. Integrated proteogenomic characterization of pituitary neuroendocrine tumors: <https://www.nature.com/articles/s41422-022-00736-5>
- Zhang Q et al. Single-cell characterization of PitNET differentiation: <https://pmc.ncbi.nlm.nih.gov/articles/PMC9975294/>
- Human fetal pituitary single-cell reference: <https://www.nature.com/articles/s41467-020-19012-4>
- Phase II study and target profile of surufatinib: <https://pmc.ncbi.nlm.nih.gov/articles/PMC10289989/>
