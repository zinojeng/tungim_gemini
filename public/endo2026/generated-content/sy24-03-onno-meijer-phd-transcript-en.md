# Transcript

- Source: `audio.mp3`
- Model: `gpt-transcribe`
- Languages: en
- Keyword hints: ENDO 2026, Endocrine Society, mineralocorticoid receptor, MR, glucocorticoid receptor, GR, aldosterone, cortisol, corticosterone, 11β-HSD2, nucleus of the solitary tract, NTS, NR3C2, hippocampus, CA2, NeuroD, proximity ligation assay, ChIP-seq, HPA axis, dexamethasone, hydrocortisone, Dexa-Cort, BPRS, finerenone, vamorolone, FRET, Onno Meijer, PhD
- Context: An English-language ENDO 2026 medical conference recording. Topic: Cardiovascular Endocrinology. Presentation: Corticosteroids in the Brain. Speaker: Onno Meijer, PhD. Preserve exact endocrine terminology, proper nouns, study and drug names, abbreviations, dosages, laboratory values, units, and numbers. Do not summarize, translate, or paraphrase.

## 00:00:00.000–00:20:00.000

Moderator: I'll hand over to my co-chair. Thank you. I'll start before Onno comes up, because that way we have more time to listen and have questions. Dr. Onno Meijer is in Leiden in the Netherlands. He trained under Dr. de Kloet, who is pretty much a pioneer in the mineralocorticoid receptor in the neuron. Then he came to the United States, to UCSF, to study under Mary Dallman and David Pearce, to study the way the MR and aldosterone work as a transcription factor, and has now returned to Leiden, where he has his own lab. All right.

Onno Meijer, PhD: Thank you so much for the invitation to talk here. Corticosteroids and the brain—anywhere but in the vasculature. I do receive funding from Corcept Therapeutics, but that has no bearing on this talk, in fact.

To go back to square one, we have the mineralocorticoid receptor, which is a receptor for both aldosterone and cortisol or corticosterone: a high-affinity receptor. This is the atlas that Dr. Ferrucci mentioned in the opening session, where we can see, based on single-cell datasets, where the MR is expressed, and we can see there's plenty of it in the brain.

The brain basically has not so much 11β-HSD2. If there is 11β-hydroxysteroid dehydrogenase type 2, cortisol is going to be degraded to cortisone, and then that actually makes the MR aldosterone-preferring, like in the kidney and other cell types. If that is absent, the MR is mainly a cortisol receptor.

Cortisol also binds to the glucocorticoid receptor with a lower affinity: the high-affinity cortisol receptor and the low-affinity cortisol receptor. This is going to come back in the talk because it is really relevant to how MR works in the brain. I am also going to touch on synthetic glucocorticoids like prednisolone, and particularly dexamethasone, which have a very low affinity for the MR and are really selective glucocorticoid receptor ligands.

So, in the brain, does MR listen to cortisol or corticosterone? There is a whole career by Dr. Geerling, who did many, many experiments to see whether this 11β-HSD2 enzyme is expressed in the brain. He concluded, for the mouse, that it is really only present in this very small group of cells in the nucleus of the solitary tract. They are really important and powerful. The law of mass action does not apply here: very few cells, but they are really important for sympathetic outflow and increasing salt hunger. These neurons also project anteriorly into the brain to regulate things like mood and reward. This is a lot of work.

Ironically, these days you can do a few clicks in the Allen Brain Atlas and go to single-cell data. These are four million cells from the mouse brain under basal conditions, males and females. We can look in this UMAP where MR is expressed, NR3C2, and where HSD2 is expressed. The vast majority of these cells represent neurons, but there are also groups of immune cells, astrocytes, and vascular cells where there is some HSD2. In the neurons, it is there in the NTS, but it is not there anywhere else.

If we zoom in a little bit, we can see this small group of a couple of hundred neurons that have very high MR messenger RNA, that express HSD2 messenger RNA, that can make noradrenaline, and that are responsive to angiotensin. That neatly summarizes the fact that here, in this nucleus, the MR is an aldosterone receptor, and in no other neuronal cell types in the brain.

One thing: you see a lot of MR messenger RNA here. That is not all translated into a substantial amount of protein. In some cell types it is, but this seems to be a bit of a leaky promoter. Sometimes there is messenger RNA in cells where we really do not detect any MR protein.

In the brain, the MR is, in most cell types, a cortisol receptor. We have this dual system, and this is work from de Kloet starting in the 1980s, where the MR is the high-affinity receptor, mainly present in the hippocampus. The GR is abundant, and they are really co-expressed. A lot of the hippocampus is important for cognition and memory formation, so this is why a lot of the attention on MR has gone to the hippocampus.

This is an autoradiogram. Autoradiograms really favor cell-dense areas in the brain, so you are going to see a lot of signal there. There is MR in other cell types, but you do not see them here in this autoradiogram on the left because they are simply too dispersed.

Again, we can look at messenger RNA in single-cell datasets, which we did. We can see that the MR here is expressed very highly in the glutamatergic principal cells of the hippocampus. The GR is mainly in CA1, but here the MR predominates. In the GABAergic cells, it also seems that there is quite a bit of MR relative to GR. It is really in the non-neuronal cells where the GR seems to be predominant. There may be cells that have MR, but at the messenger-RNA level, the GR seems to be the predominantly expressed cortisol receptor.

A bit about signaling. The MR can act via non-genomic actions, in the cytoplasm. Of note, the EC50—the concentrations you need to activate these non-genomic effects—tends to be about tenfold higher than for the classical genomic effects. We know more about the genomic effects, trivially, because it is easy to measure messenger RNA.

The receptors go to the cell nucleus by nuclear translocation. Then they can either interact with other transcription factors, perhaps as monomers. For the GR, this is really a very important mechanism in terms of anti-inflammatory effects. The MR, not so much, but I do not think we can exclude that MR interacts with other transcription factors. This is as a monomer, and it can bind to DNA, heterodimerize, or even multimerize.

The MRs and the GRs can make homodimers; they can make heterodimers. Once they are bound to DNA, they interact with a host of different proteins. There are other transcription factors that sit on DNA with which they can interact. There are coregulators, basically effector proteins. The MR and the GR have an N-terminal and a C-terminal part, and there are specific interactions of both sides of the receptors with what we call activation function 1 coregulators and activation function 2 coregulators.

This is a nice cartoon, and the devil is in the details because, in any cell type in the body, these interactions will be different depending on which proteins are expressed in those cell types. In the end, that leads to gene expression, and we get these nice volcano plots with typically tens or hundreds of target genes. This is a nice example from a paper by Matthias Schmidt this year, where he knocked out the mineralocorticoid receptor specifically in glutamatergic cells in the brain, and you can see that it has strong effects on gene expression in those cells.

The previous slide was not totally accurate because the interactions between MR and GR occur not only in the cell nucleus, but can also already occur in the cytoplasm. This is a proximity ligation assay in which we detect molecular proximity—within roughly 40 nanometers—between the two molecules by a sort of immunofluorescence PCR-based technique. In the absence of hormone, we can see nicely that there are MR–GR complexes in the cytoplasm. We add corticosterone, and then there is translocation to the nucleus. We see these interactions between MR and GR, or these complexes with MR and GR, in the cell nucleus, and this should reflect transcriptional responses.

How does that work, and where do MR and GR actually work at DNA? Already 15 years ago or so, there was a chromatin immunoprecipitation experiment where we injected animals with corticosterone, took out the hippocampus, obtained the chromatin, and looked at where MR and GR were present on the chromatin. We also looked at which types of DNA-binding motifs were present where MR or GR was bound.

With both MR and GR, we saw clearly that there were GREs, so this is no surprise because these are the response elements where MR and GR bind. But with MR, we always, or almost always, saw that there was also this motif for the NeuroD transcription factor, and the NeuroD transcription factor is a lineage-determining factor in glutamatergic cells. This is the expression of NeuroD1 and NeuroD6 in the adult mouse hippocampus. Basically, we think this reflects the fact that, if you do bulk analysis—so the law of mass action does apply here—you will find MR mostly bound to chromatin in these glutamatergic cells in the hippocampus.

That fits very, very nicely with later work by Serena Dudek, where she actually found that the mineralocorticoid receptor is essential during development, particularly in the CA2 area. In the CA2 area, there is a lot of MR expression. She looked in MR-knockout mice. MR was gone, and all the cell-specific markers for the CA2 area of the hippocampus were also gone. Basically, if you do not have MR, this part of the brain does not differentiate properly.

This may be really important for autism. MR loss-of-function deletions and mutations in people have been associated strongly with autism—monogenic. That may be due to these developmental effects of the mineralocorticoid receptor on hippocampal differentiation.

That is development. There are also many, many effects of cortisol on the brain in adulthood, as we sit here. There are a bit too many to cover. What I will do is be a bit more generic and put this in context. Why does cortisol matter, and where do MR and GR come in?

These are data by Stafford Lightman from over 600 people who were continuously monitored for cortisol with a microdialysis device. You can see very nicely that there is this circadian rhythm in cortisol. It is high early in the morning. It is still pretty high in us now, for those who are not jet-lagged, and then it is going to be really low late at night. Cortisol is really important here.

Of course, cortisol is also a stress hormone. This is a Trier Social Stress Test from Lars Schwabe's paper, where we can see that, if we give an acute psychosocial stressor, cortisol nicely goes up in saliva and then, after two hours, comes back down again. Cortisol is important as a circadian hormone, and cortisol is important to help adaptation to stress. MR and GR function in these contexts.

Because MR affinity is so high, it is supposed to be important already at the lower range of hormone levels, whereas the GR, with the lower affinity, really only gets occupied at the circadian peak and after stress. A whole lot of research—and this is what Elisa referred to—suggests that the MR may actually be protective for neurocognition and mood in particular, and that too much GR activation, if this is not just a transient adaptive response but chronically elevated glucocorticoid receptor activation, may actually be bad.

There is one argument for the GR being the bad guy if it is chronically activated. In patients with Cushing syndrome, there are a lot of neurocognitive and neuropsychiatric effects and complaints, and these are largely recapitulated in people who are on chronic dexamethasone treatment. Chronic treatment with a synthetic glucocorticoid recapitulates a lot of the effects on the brain that you see in patients with Cushing syndrome. Those treatments really target GR. That is basically why the GR is supposed to be the bad guy in causing neuropsychiatric symptoms.

That is clearly so, but perhaps it is a little bit different. What I want to spend the last bit of my talk on is the question: where do the neuropsychiatric side effects of dexamethasone really come from? If you treat people with high doses of dexamethasone for a long time, about one-third of those people will develop mood swings, and it can even be psychosis in extreme cases. It is a problem, and I will come to that.

Let us go back to the hypothalamic–pituitary–adrenal axis: the regulation of cortisol by the brain, the pituitary, and the adrenal gland. I apologize; I saw this morning that this slide is in Dutch. But hypothalamus translates to hypothalamus, hypofyse translates to pituitary, and nier and bijnier translate to kidney and adrenal gland. Cortisol translates to cortisol. That is your crash course in Dutch.

This is the HPA axis. Cortisol comes out and feeds back. There is negative feedback of cortisol at the level of the pituitary gland and at the level of the hypothalamus. If you treat patients with synthetic glucocorticoids like dexamethasone, you actually activate this negative feedback. Cortisol will go to zero, or go very low. This is also the basis of the dexamethasone suppression test, now used to detect people who have mild autonomous cortisol secretion.

The GR is going to be activated by dexamethasone, but the mineralocorticoid receptor has lost its ligand, because dexamethasone is not very effective at activating the mineralocorticoid receptor. Cortisol is down to zero. Not only do we have really high glucocorticoid receptor activation, but we also have really low mineralocorticoid receptor activation.

That begs the question: what now causes these side effects? Is it too much GR activation in the brain, or is it too little MR activation in the brain, or is it perhaps a combination of both? That is testable, because in people who are on high-dose dexamethasone, you can do the same as we do with patients who have adrenal insufficiency. You can give them 20 milligrams of cortisol every day and basically refill the mineralocorticoid receptor.

I shared this idea with a pediatric endocrinologist from Rotterdam, Erica van den Akker, and she said, "Oh, that's cool. Let's try that." This is the first single case that she studied, a child treated with dexamethasone for leukemia. In childhood leukemia, patients are treated for a long time with one week of dexamethasone, two weeks off, one week on, two weeks off. Again, about one-third of these children develop really bad mood swings. Sometimes this actually makes the children want to stop the treatment, and that would be fatal because it is really essential for the treatment of this leukemia.

This particular child, while on dexamethasone, had a lot of sleeping problems and emotional distress. Open label, they gave cortisol, normalizing the MR activity, we think, and then the sleeping problems and emotional distress went away. She did a couple of these open-label cases and decided to go for a clinical trial. In the clinical trial, it again actually seemed to work. Total Difficulties and Emotional Symptoms scores really went down if you treated with hydrocortisone, or cortisol, during the weeks when they were on dexamethasone.

The experimental beauty of this setup is that these children have to be treated after they have all these blocks. You can do a nice crossover design where they are a week on, a week off, a week on, and a week off, counterbalanced. But statistically this was flawed a little bit. It worked, but only if you took those children who had mood swings, of course, and they had not selected for that.

They thought, perhaps we should have a next trial to provide the definitive answer and first, in the first block, identify those children who have mood swings and then go for a placebo-controlled trial. That is what they did. I am already spoiling this here, but these are the scores on dexamethasone, day 1 and day 5. It is a five-day block of dexamethasone. There are a lot of mental side effects here, so these children were included in the trial. After that, nobody had any mood swings.

There was apparently this incredible placebo effect, which is not so strange because this is a very well-controlled trial, and there are a lot of explanations, a lot of patient involvement, and parent involvement. I have learned since that one of the major predictors of these mood swings is actually the stress level of the parents. If you are going to say, "You are in a trial, and we think this is going to reduce the mental side effects of dexamethasone," stress goes down and mental side effects go down.

In fact, what they do now at the Princess Máxima Center in Utrecht, in the Netherlands, where they treat these patients, is offer open-label placebo or cortisol. The parents can choose, and now they are evaluating whether that works, yes or no, because I have learned that placebo effects can work even if you know it is a placebo.

This is one part of the story. The other part is what happens in adults. We also thought we would do a trial, the Dexa-Cort trial, in people who undergo elective brain surgery. These people have a brain tumor and need to be operated on. What the neurosurgeons do is give very high doses of dexamethasone to prevent swelling and edema formation. Again, some of those people—if you talk to the neurosurgeons, they say, "Yeah, I want to get rid of these side effects because they're really..."

## 00:20:00.000–00:31:45.000

Onno Meijer, PhD: "...really bad." We got a trial approved, and we included 116 patients. It should have been 180, but COVID interfered, and this is what we could do. These patients got a perioperative dose of dexamethasone of more than 24 milligrams in total, which is a lot of dexamethasone, I can tell you. Then they were randomized to placebo or cortisol, twice 10 milligrams per day. I am a bit sad retrospectively, because I think the 10 milligrams in the evening was too high.

Yet, what we see is a significant effect of cortisol add-on. First, we saw not as many side effects as we would have expected beforehand, so perhaps again some placebo effect. But this is the BPRS score, a composite psychiatric rating scale. This is at the start of treatment, or at the moment they are hospitalized, and then on average they take five days of dexamethasone.

In patients who have a BPRS score of more than three, which is clinically significant or relevant, we see what cortisol does. We can actually see that the people on hydrocortisone, here in greenish, have a lower increase in the severity of their symptoms than the people on placebo. Jan says they start a little bit higher, but they end lower. We take this as an indication that it might work, but I do think it would have been much, much better if we had given 10–5–5, or even Chronocort, to really mimic the circadian rhythm.

With that, I will come to my conclusions. The MR is mostly a cortisol receptor in the brain, if I exclude the endothelial cells. MR interacts with GR to shape responsiveness to many stimuli. MR affects neurodevelopment and adult neuronal function. MR reactivation with cortisol may ameliorate the neuropsychiatric side effects of dexamethasone.

I would like to thank all the people involved, particularly the people who did the clinical trial, and that includes the Rotterdam neurosurgeons. I would like to thank you for your attention.

Moderator: Thank you. Questions?

Audience: I have a question about the heterodimers. Should we consider that now there is no more MR alone and MR is always with GR, or are there specific conditions where there are these heterodimers?

Onno Meijer, PhD: What drives heterodimerization? It is a good question, of course. I would think that if you are a pyramidal cell in CA2, you have predominantly MR, and then you are going to have homodimers. It depends on what is present. If you have HSD2, what is going to happen? If you have HSD2, there is still GR in some of those cells. Why? You would expect that if there is HSD2, cortisol is going to be broken down. So what does GR have to do there? There you would think: predominantly MR, predominantly homodimers. In some cells there is no MR, so there are GR homodimers. When they are together, they can heterodimerize. We know now that it starts with a dimer, but they are actually probably multimers.

The jury is out. A colleague who works in zebrafish makes these very nice models in which she forces heterodimerization or homodimerization based on the clever introduction of a mutation. We will learn more about that.

Audience: If I can have a second question: does the signaling through this heterodimer differ from that of the homodimer? And are MR-specific antagonists like finerenone, for example, blocking only MR or MR–GR?

Onno Meijer, PhD: That is an excellent question. If you have a tetramer, and you have an antagonist for one of the receptors while cortisol is still present, you can have an MR–cortisol, an MR–finerenone, and a GR–cortisol present in a one-to-four or a two-to-two stoichiometry. That is a bit of a headache, and I think we will not know. We will just have to see what the effects are. Actually teasing that apart is going to be hellishly difficult.

Audience: Thanks. In your proximity assay, did you try an MR antagonist with cortisol or even aldosterone?

Onno Meijer, PhD: That is a good question. We did not, so nothing happened, but we should try. There are antagonists. There are the type I antagonists, as they call them, for the progesterone receptor that actually prevent translocation. But most of the antagonists that we use actually, interestingly, start the whole signal transduction process by inducing translocation. Then we do not know whether it reaches DNA. What we are doing now is fractionating our cells into cytoplasm, nucleus, and chromatin-bound fractions, and that is actually going to be really interesting.

Moderator: Okay, question at the back.

Richard Auchus, MD, PhD: Rich Auchus from Ann Arbor. In the case of the dexamethasone-treated patient, there is no cortisol on MR, but is there aldosterone on MR? Is the problem the difference in the transcriptional profile that you get with one ligand versus another ligand, or is it simply that there is no ligand?

Onno Meijer, PhD: I think there is not a lot of ligand, but it is a fair question, because apparently MR is there. In normal conditions, aldosterone is outcompeted by cortisol because of the difference in levels. It is a good question what exactly is going to happen in terms of aldosterone sitting on MR, and I do not have the answer.

Audience: I have a question for Rich. Remember that ACTH is also important for aldosterone synthesis. The question is, does aldosterone go down when you have a patient fully suppressed with dexamethasone?

Richard Auchus, MD, PhD: There is an acute effect of ACTH on aldosterone. It is about a doubling. Bob Dluhy showed that years ago. Chronically, it is more regulated by the renin–angiotensin system. I think you will still get that little rise in the morning, but it is really mostly—it is a doubling. The basal level is what really matters, and that is driven by the renin–angiotensin system.

Audience: But you still have to get cholesterol transported and side-chain cleavage.

Richard Auchus, MD, PhD: Right, but that can happen just through the angiotensin receptor. Bill Rainey did that.

Moderator: Jun.

Audience: Just a quick question following on from Fred's comment about the MR antagonist. I am still a bit worried about what sort of cognitive effects we should be looking out for in patients treated with MR antagonists. On the one hand, it is probably good for preventing dementia, but then, just in terms of side effects, should we be worried?

Onno Meijer, PhD: I do not know how worried we should be. That also goes for vamorolone, by the way, which is also an MR antagonist. If finerenone does not enter the brain, that would be good because then you would maintain that signaling. That is theoretically—I think Frédéric said something like this—an advantage of it.

Moderator: Okay, a question at the back.

Audience: That was a really nice talk. I had a question about the data that you showed. MR is essential for CA2 neuron identity, and presumably that was in male expression patterns, right? Given that corticosterone levels are regulated by estrogen, or highly dependent on estrogen, do you think that the threshold for CA2 identity is going to be different in females and/or may fluctuate with estrus?

Onno Meijer, PhD: That is a really nice question. As always, the crosstalk between the sex steroids and the glucocorticoid and corticosteroid receptors is relevant and complex. Mechanistically, the progesterone receptor is more likely to interact with MR and GR than the estrogen receptor. But once it is on the chromatin, of course they can influence each other. In terms of development, it is also going to depend on prenatal exposure to sex steroids and testosterone surges, et cetera. It is a good question, and I just have to plead ignorance. Sorry.

Audience: It has interesting implications for social cognition and behavior.

Onno Meijer, PhD: Yes, it is interesting. I do not know. Thank you.

Moderator: Okay.

Audience: Thank you. That was really interesting. I also have a question about ligand specificity. I was thinking more about fludrocortisone, but possibly related to Rich's question. Do you have other ligands that you have tested in terms of thinking about the heterodimer formation of MR and GR?

Onno Meijer, PhD: From a mechanistic perspective, no. What I can say is there is a paper by John Cidlowski last year, I think, where he looked with this assay—pretty much an in vitro energy-transfer assay. I forgot the name. What is the assay called?

Audience: It is a FRET assay.

Onno Meijer, PhD: Yes, a FRET assay, where they look at heterodimers as a function of the specific GR ligands in that case, and they see subtle differences. There are probably going to be differences because there is going to be some ligand-selective specific conformation. Although you can wonder: with finerenone, we know that there is a different coactivator profile, so that has a substantially different conformation. That may affect complex formation with GR, but I have no data.

Audience: Okay, so that probably answers my second question, which was about timing and stability. Do you have any information about the time course?

Onno Meijer, PhD: The time course of what?

Audience: The time course of the interactions, such as whether there is different stability.

Onno Meijer, PhD: You can do this in vitro. It is really complex. Take dexamethasone. Dexamethasone is a pure GR ligand in vivo. If we put it on our cells, we get fair activation of MR, but then the on–off rate—the affinity is okay, but the on–off rate is different. The residence time of the ligand on the receptor is very brief. It suffices to produce nuclear translocation, particularly under steady-state conditions, but it probably does not suffice to produce durable interactions with the transcriptional machinery.

Almost nobody looks at these types of on-rate and off-rate. Affinity is defined by the ratio between on-rate and off-rate, so we go by affinity, but that is not the whole story. There is a lot of pharmacology to be done.

Audience: Thank you.

Moderator: I think we are right on time, so we will bring the session to a close. Please put your hands together for all of the speakers. Fascinating session.
