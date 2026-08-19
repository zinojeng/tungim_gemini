# Differential Epigenomic and Transcriptional Programming of Macrophage Functional States

- Conference: ENDO 2026
- Session: Steroid Receptor Actions in Immunity
- Presentation ID: SY43-02
- Speaker: Inez Rogatsky, PhD
- Reviewed source interval: 33:15–64:35 (31:20)
- Source transcript: `transcript_gpt-transcribe.md` (`gpt-transcribe`)

## Moderator introduction and opening

**Moderator:** Thank you very much. I'm the other co-chair. Thank you very much for getting started. Our next speaker, whom I'm very pleased to invite to the stage, is Dr. Inez Rogatsky, who will be presenting her work on differential epigenomic and transcriptional programming of macrophage functional states. Thank you very much.

Hang on, we'll start here. Come on. Just have to—it's taking a moment. All right. And then, if you want to be over there. Thank you.

**Inez Rogatsky:** Hello, everybody. Good morning. Okay. So I'm very happy to be here. It's a fantastic meeting. Thank you so much to all the program builders. And, yeah, let's jump right into it. So I'm very happy to tell you what my lab has been up to over the past couple of years.

## Inflammation and homeostatic macrophage programming

We are broadly interested in the transcriptional control of inflammation, and of course we view it as a normal body response to infection, perhaps injury. We know that a key cell type that drives it is an inflammatory macrophage. Those cells, as monocytes, would migrate to the site of infection. They will produce numerous inflammatory mediators to ultimately create this hostile environment to eradicate the infection.

Okay, but we also know, of course, that too much inflammation is bad for you. And so one of the systemic levels of control is activation of the HPA axis. This is sort of a feedback mechanism: production of glucocorticoids by cells of the adrenal cortex. Those will be picked up by the glucocorticoid receptor, which is, of course, abundantly expressed across various cell types. GR will associate with numerous coregulator proteins. So GRIP1/NCoA2 is our favorite guy; we've been working on it for a while. GR will act upon macrophages to stop their migration and stop the production of inflammatory mediators.

Now, what we've learned over the past couple of decades is just how diverse macrophages really are. They originate from different progenitors. They populate different niches in the body. They have very different transcriptomic makeups and naturally different functions. And so perhaps all the way at the opposite end of this transcriptomic spectrum from those inflammatory guys I mentioned are the so-called tissue-repair, homeostatic macrophages. The old cursed name, which is having a major comeback, to my great pleasure, is M2, because this is the least number of characters you can use in a grant application.

They have very different functions. They are polarized by type 2 cytokines, IL-4 being a big player, and downstream of IL-4, the transcription factor STAT6 is activated to drive expression of a lot of so-called M2-specific genes. One of the STAT6 targets is itself a transcription factor, KLF4, believed by many to be sort of the master regulator of this particular lineage.

## Convergence of IL-4 and glucocorticoid programs

What people noticed a long time ago is that if you were to expose macrophages to glucocorticoids for a while, say 24 hours, you will produce macrophages that look a lot like M2. So are they really M2s? Do different pathways converge to generate this particular phenotype?

A postdoctoral fellow in the lab, Dinesh Deochand, a number of years ago, addressed this question. He took bone marrow-derived mouse macrophages and exposed them for 24 hours to IL-4 or glucocorticoids: corticosterone, the endogenous glucocorticoid in mice, or the highly potent synthetic glucocorticoid dexamethasone. He looked at gene expression initially by PCR.

What he saw was that there were a number of genes—Klf4, Klf9, and Mrc1—that were very well induced in all of our M2 populations. And then there were some that were much more signal-specific. So Arg1 and Pparg were primarily induced through IL-4 polarization. Conversely, Hif3a and Gilz were primarily targets for glucocorticoids. But, of course, we have this overlap. How big is this overlap?

What transcriptomic analysis is telling us is that all the numbers here are differentially expressed genes relative to M0s. A larger transcriptome, about 700 genes or so, is in M2 IL-4s, and about half this number is in M2 Dex. But what's interesting is that about 30% of those are also differentially expressed in M2 IL-4s. So there is an overlap.

Just to show you some examples, avoiding volcano plots today: the downregulated shared genes are your classic inflammatory mediators, Tnf, Cxcl14, Ifit1, and others. The ones that are upregulated—well, I just showed you some on the previous slide—are Klf genes, Ccl24, Chil3, and a number of others.

We profiled quite extensively the epigenomic makeup of those macrophages as well. We looked at chromatin accessibility by ATAC-seq. We looked at the enhancer landscape by H3K27ac. You can appreciate just how similar those Venn diagrams are. I literally copied and pasted them, both in terms of the relative numbers of differential peaks and in terms of that overlap between the two.

We began to wonder how such disparate pathways—one being classic steroid-receptor signaling and the other the JAK–STAT pathway—arrive in the same place. What I neglected to mention is work from the former postdoctoral fellow in the lab almost a decade ago now, Maddalena Coppo, who first showed a physical interaction between our favorite nuclear-receptor coregulator, GRIP1, and KLF4. She actually showed that GRIP1 can function as a KLF4 coactivator. We thought maybe GRIP1 is the guy that ties the two together, integrating those pathways.

To address this from the functional point of view, we deleted it, of course, using LysM-Cre, which is myeloid-cell-specific. Now Dinesh is dealing with eight populations because there are four differentially polarized states of two different genotypes. This is just to illustrate that GRIP1 is deleted in each population.

If we look at some of those target genes, no matter whether they were shared between the two, IL-4-specific, or glucocorticoid-specific, in each case losing GRIP1, here in red, dramatically attenuated their ability to be induced.

If you look genome-wide—and this is just like those Venn diagrams, except this is a bar graph showing the shared cluster, the glucocorticoid-specific cluster, and then the IL-4-specific cluster—the top of each bar represents genes that are no longer differential in the GRIP1 knockout. You can appreciate that the largest fraction of those GRIP1-dependent genes was inside this shared cluster: about a quarter of glucocorticoid-specific genes and a really sizable number of IL-4-specific genes as well, pointing to the pretty broad role of GRIP1 in programming those phenotypes.

## PPARγ, GRIP1, and enhancer occupancy

This is a nuclear-receptor session. I don't want to give you the impression that the only nuclear receptor that promotes this phenotype is GR. PPARγ has been known to promote this phenotype for many years. Quite recently, in a number of really elegant papers, László Nagy's lab looked at PPARγ-dependent programming in quite a bit of detail.

PPARγ, of course, is a type II nuclear receptor. It works in conjunction with its heterodimeric partner RXR, and it does not require a ligand—either endogenous lipids or synthetic TZD compounds—to be in the nucleus or to bind DNA. The role of the ligand is to dismiss corepressor complexes and HDACs, replace those with coactivators such as p160s and GRIP1, and recruit histone acetyltransferases, which help activate transcription.

The former graduate student in the lab, Maria Dacic, had been looking at László's papers and specifically the data for the PPARγ-knockout mouse. She said, “Those PPARγ-dependent genes are kind of the same as our GRIP1-dependent genes.” I said, “Maria, this is not our receptor. This is not our mouse. This is not our project, and you cannot directly compare the data between the two labs.” She really took it the wrong way because she somehow interpreted my words as an action plan.

She remade the PPARγ-knockout mouse by crossing PPARγ-floxed mice, which were kindly sent to us by Mitchell Lazar's lab, to our LysM-Cre, the same deleter we used to delete GRIP1. This illustrates that it works. But if we look at some of those genes—well, she's right. I can show you many more of those, but those that do not get upregulated well in M2 IL-4s in the PPARγ knockout are similarly impaired in the GRIP1 knockout.

I said, “Maria, drop it. This does not really mean that they work together. We know that many of the same genes are regulated by KLF4. We know that GRIP1 is a KLF4 coactivator. So this data doesn't implicate them in being in the same complex.” She said, “All right, but then how would you explain this?”

Now she is looking at PPARγ enhancer RNAs, or eRNAs, from those specific, well-established—we did not discover them—PPARγ enhancer sites. All of the ones that failed to produce enhancer RNAs in PPARγ knockouts had the same or a similar deficit in the GRIP1 knockout as well.

I was getting progressively more irritated by this whole thing, also because she really pulled this phenomenal postdoc in the lab into her project and into doing all those PCRs. I said, “Maria, drop it. We know very well that PPARγ–GRIP1 interaction is strictly agonist-dependent. We are not adding any ligands, and this just can't be right.”

She proceeded to generate a PPARγ cistrome in our M2 IL-4 macrophages and overlaid it with a cistrome of GRIP1, which we published a couple of years ago in the Genes paper by Chinenov. Over half of PPARγ peaks overlapped with GRIP1 peaks. Just to show you some of those heat maps, you can see that the signals actually get better upon IL-4 polarization. We can subcluster those peaks into the ones that we call prebound—they still get a lot better with IL-4—and the ones that were practically de novo. Aside from that, there was nothing particularly striking about those peaks. We get enrichment of PPREs and RXREs, as you would expect.

We predicted, naturally, that the role of GRIP1 in this complex would be to recruit some HATs. Maria produced a p300 cistrome as well, and over 60% of p300 peaks overlapped with at least one PPARγ peak. Here is a heat map of those, and you notice that the signals do get better upon IL-4-dependent polarization.

The natural conclusion we drew was that upon deletion of GRIP1, p300 is no longer recruited, and that is why transcription is down. Well, not quite. To our great surprise, PPARγ was falling off the DNA, and that was an incredibly dramatic result. That was true both for the prebound peaks and for the ones that were strictly IL-4-dependent.

We couldn't believe our eyes. We measured total PPARγ binding signals, and you can see in the wild type this nice upregulation upon IL-4 polarization and a dramatic decrease in the GRIP1 knockout. We do see a drop in p300 as well, but if you analyze them peak by peak, the effects are much stronger on PPARγ binding itself.

Just to zoom in on some specific examples, these are genes that I showed to be down in the GRIP1 knockout and the specific enhancers from which those eRNAs were produced. You see increased binding of GRIP1 upon IL-4 polarization. Likewise, there is a strong increase in binding of both PPARγ and p300 in IL-4-polarized macrophages, and both are lost in the GRIP1 knockout.

Whenever I personally see data like this, I believe that my not-terribly-specific CUT&RUNs are turning into ATAC-seq, and we're basically measuring chromatin accessibility. I can assure you that this is not the case, and not everything is down in the GRIP1 knockout.

In fact, to our big surprise, we saw dramatic loading of the CTCF insulator protein on those now-depleted enhancer sites, some of the adjacent sites, as well as the promoters of associated genes. This is terribly specific, because if you move outside of the binding regions of these genes, you don't see it. In fact, if I were to show you a volcano plot of CTCF binding between wild-type and GRIP1-knockout macrophages, it would be perfectly symmetrical.

The only way for us to take a broader look at CTCF binding is to look specifically at sites that overlap PPARγ enhancers. That is when you can see the increase, and it is quantified here on top. But this is actually an underestimate of what is going on, because we are not counting adjacent regions here, and we are not counting promoters either.

We arrive at this little model of GRIP1 having an unexpectedly central role in holding the whole complex together, because in the absence of GRIP1, PPARγ falls off, and essentially we have this broad deposition of the insulator protein onto the enhancers and associated promoter sites.

## Phagocytosis and efferocytosis

Given this highly collaborative nature of GRIP1 in interacting with at least three different transcription factors that drive this particular phenotype, you would think losing GRIP1 would impair their programming. So what do M2 macrophages do? They're phagocytes.

Initially, we looked at phagocytosis by feeding our differentially polarized populations pHrodo particles, which fluoresce in the acidic environment of the phagosome. We buy them from Sigma, I believe, and so we can image that. What you can appreciate is that in each of our M2-polarized populations, we upregulate phagocytosis. Importantly, this upregulation is largely GRIP1-dependent.

This was a nice result. However, I know for sure that my macrophages, or your macrophages, are not dealing with particles from Sigma. What they are really dealing with are massive numbers—hundreds of billions—of apoptotic cells a day, because about 1% of the total body cell number turns over daily.

This really elegant process, called efferocytosis, is initiated by apoptotic cells secreting various find-me signals, notably ATP, and exposing on the surface eat-me signals such as phosphatidylserine, which is normally hidden. Those are recognized by various receptors and adaptor molecules on the surface of the phagocyte. They will consume those cells, and they will produce numerous anti-inflammatory mediators because this death and consumption is supposed to be immunologically silent—no danger signals.

Macrophages have this enormous job to do. They have to recycle the membrane that they keep using while eating up those cells. They have to pump out cholesterol. They have to upregulate fatty-acid oxidation and suppress responses to TLRs, because they're chock-full of TLRs.

We began to worry whether the results of a really simplistic phagocytosis assay would hold in this more sophisticated, real system. We set up a new experiment by taking our differentially polarized GRIP1-knockout and wild-type populations. We actually added M2s polarized by IL-4 and glucocorticoid together because it is a more normal environment. We fed them apoptotic Jurkat cells, which were made apoptotic by treating them with staurosporine. We labeled them with pHrodo and mixed the two together with the macrophages for an hour. Then we could quantify the CD11b-positive, F4/80-positive macrophages that also had pHrodo in them.

To our great surprise, the only population that upregulated efferocytosis was the Dex-polarized one. IL-4 did not do it. In fact, it completely killed the effect of dexamethasone, and this upregulation yet again was strictly GRIP1-dependent.

We took a step back. We remade all our populations. We wanted to be really unbiased. We added M1s polarized by LPS and interferon-γ. We ran RNA-seq on everybody to make sure that our population-specific genes were expressed in a population-specific manner. We switched from staurosporine to UV and from pHrodo to CypHer5E, and repeated the experiments. We got the exact same result. The only population that upregulates efferocytosis is the glucocorticoid-polarized one.

You would think, if that's the case, that the transcriptomic makeup of our differentially polarized populations—all those efferocytosis-related receptors, adaptors, transcription factors, and metabolic genes—should be induced better in glucocorticoid-polarized macrophages. Nope. Actually, there is nothing here on this heat map to suggest that M2 Dex would be any better than M2 IL-4 or M1s. Actually, they look worse, because there's only a couple of genes. So what are we missing?

## Three-dimensional chromatin organization and a two-step model

We started thinking: 24 hours is an awfully long time for some large chromatin changes to happen, right? We became interested in those topologically associating domains and enhancer–promoter interactions and loops, and basically we convinced ourselves to do a Hi-C experiment.

I don't want to go through the details except to say that in the end, you produce these little hybrid pieces of DNA which are not next to each other in the linear genome but are close to each other in three-dimensional space, so you crosslink them. Then you sequence and sequence and sequence, because you need a billion reads minimum per sample to get the resolution that you want, which we did. We had two biological replicates. We sequenced each to half a billion. We pooled them together, and it seemed to have worked.

This is the PCA. The top one is Arima-HiC, and this is CUT&RUN for H3K27ac or the H3K4me3 promoter mark. You can see in each case that M1s are kind of in a different universe, far away. M2 Dex and M2 IL-4 are much closer together. This is only 6% variance, with M0s kind of stuck in the middle. That looked good, but we really wanted to believe that this was going to work.

We decided to examine more closely some of the loci which we know to be modulated in a very polarization-state-dependent manner, say the Il4 locus in M1s. Here is the H3K4me3 CUT&RUN track to illustrate that it is a specific promoter mark. You don't get it in M2 IL-4s or M2 Dexs.

This is what this Hi-C contact matrix looks like. The big black square is a TAD. The smaller blue ones are sub-TADs, and the tiny little black quadrants here are the loops. You can appreciate that around this Il4 locus, only in M1s do you get this massive TAD forming and all these new loops appearing.

We decided to focus on the loops because it seemed like this was something we could actually quantify. We basically created a list of 40 or 50 curated efferocytosis genes, and we scored all the enhancer loops and hubs—which are basically more than two or three loops out of a single enhancer—in each polarization state.

You get pictures kind of like this. This is Mertk, your classic efferocytosis receptor. These are your M1, M2 Dex, and M2 IL-4 states; these are the loops; and the blue bars here are the hubs. We lined up our active histone modifications for enhancers and promoters as well. You can see that in Mertk you get hubs and loops in every population, even though arguably a little more in M1s.

But then there were examples of these things being exquisitely specific. For Klf4, you only get hubs and loops in Dex-polarized macrophages, even though if you were to look at histone modifications, they're indistinguishable in M2 Dex and M2 IL-4.

We went down this list and created this really sophisticated scoring system: N for no hubs and no loops in any polarization state, plus for present, and two pluses for present uniquely and more extensively in a specific macrophage state, such as here. Then we threw out all the genes that had no hubs and no loops in any polarization state, and we plotted the rest.

It was striking how enriched those enhancer hubs and loops were specifically in Dex-polarized macrophages. I can tell you that enhancer–promoter loops looked very similar. So how come we're not seeing the transcriptional consequences? It seems like chromatin here is ready to go.

We went back to this in vitro experiment, and now we sorted macrophages into the ones that just saw apoptotic cells for an hour and the ones that actually swallowed them. We ran RNA-seq on each, and I only have two replicates, so I cannot give you sophisticated statistics. I'm literally showing you raw data, and all you need to see is just how tall the green bars are.

Simply seeing apoptotic cells, in light green, is already massively upregulating all those efferocytosis genes. Swallowing them makes things even better. I will stress again that this is a specific response because the same apoptotic cells, for the same genes, are not causing this upregulation in other macrophage states. This was definitely glucocorticoid-specific.

We are arriving at a two-step model of the process on the way to a professional efferocyte. I think the first step is slow, and that is when the macrophage accumulates, in our case over 24 hours, those specific histone and larger chromatin changes, those TADs, and those enhancer–promoter loops and hubs. But the second step is fast, because within an hour, even just seeing apoptotic cells already serves as a signal. Clearly, eating them up made it even better, and that kind of turns our polarized macrophage ultimately into a professional efferocyte.

## Acknowledgments and discussion

With this, I will close. The three people on top of this list are the guys who did all the bench work, and as you can imagine, we needed a lot of computational help. So these are our computational folks. I also thanked László because I spoke with him at the very beginning of this PPARγ project. I feel like such an impostor talking about PPARγ. And Mitch, for sending us the mouse.

I will be happy to answer your questions, but before that, this is a plug for the meeting that Inez—the other Inez—asked me to put in. Registration actually opens today, as I'm realizing, and here's this little QR code, and you can scan it. This is going to be phenomenal. I'm looking forward to that. And now I'm happy to answer your questions. Thank you very much.

**Moderator:** This talk is now open for questions.

**Audience member:** Fantastic work. The first question is: in your GRIP1 knockouts where PPARγ fell off, how about RXR?

**Inez Rogatsky:** Didn't do it. I knew we had to, but this was such an unexpected venture for us. My guess, given CTCF loading, is that it's probably gone—that the whole complex is gone—but we haven't looked.

**Audience member:** Cool. And the second question: in the macrophages that have Dex and now are eating things and kind of changing, what's the viability or lifespan after they've— is it different from your naïve M2 population?

**Inez Rogatsky:** We give them 24 hours in the polarization signal and then briefly give them apoptotic cells. We have not tried taking it out any longer, and there could be changes, probably. We can talk about this, but yes, this was our kind of standard time course that we—

**Audience member:** Thanks.

**Zeynep Madak-Erdogan:** Thanks. Zeynep Madak-Erdogan, University of Illinois. Great work. So my question is related to context. How general is this mechanism in terms of the tissue—different tissues—but also the cell types? You use Jurkat cells that are induced, but what would happen if it were another immune-cell population? I'm thinking tumor microenvironment.

**Inez Rogatsky:** This is a fantastic question. There is already literature pointing out that the origin of apoptotic cells matters a lot, and the type of transcription program that they elicit in different macrophages—whether it is epithelial cells, tumor cells, or T cells—will be different. We are actually running some of these experiments with neutrophils right now because we're really interested in how that kind of projects into inflammation and resolution of inflammation. But the tumor microenvironment is definitely a big one there.

**Lee Kraus:** Lee Kraus, UT Southwestern. Really nice talk. I want to focus in a little on the molecular mechanisms, and I'm not sure if I saw in your data the effect of the GRIP1 knockdown or knockout on H3K27ac. I thought I only saw that in the wild type, and I'm just wondering what happens. Does that wipe out H3K27ac?

**Inez Rogatsky:** It's down quite dramatically in the knockout. We have not done epigenetic experiments in the knockout. We have tried, let's see, H3K27ac, H3K4me1, and H3K4me3. These are the ones that we have done, and in the knockout they're down, but not necessarily in an identical manner between different modifications.

**Lee Kraus:** I see, but I mean that's sort of the prediction, right? Because if you're affecting p300 recruitment, you would be affecting H3K27ac. I think this is interesting because, for a lot of systems, H3K27ac is sort of there; it marks the enhancers before things happen. Maybe it changes a little afterward, but we have a result with a different coregulator. It's the same thing: you deplete that coregulator and you just lose H3K27ac. It seems like a very potent way, targeting through p300, to change these enhancers. So I think that's pretty cool. Maybe we can talk about that.

The other thing I was going to ask is: have you looked for any other transcription-factor binding sites nearby where PPARγ is? Could it be that there's some role for GRIP1 in the activity of these other factors that could then be affecting PPARγ in some way?

**Inez Rogatsky:** AP-1 is like a virus. I mean, it dominates everything. You get massive amounts of AP-1. I don't remember now what—I mean, there were other transcription factors. AP-1 is something that just jumps at me immediately. All of this was with those astronomical p-values. So the PPREs and RXREs were kind of mixed with AP-1s at the same level. We were mostly trying to see whether there was any difference between the induced and kind of preexisting sites, but we did not see it. We didn't really drill down to look for others.

**Lee Kraus:** Thank you.

**Moderator:** Just a quick question, quick answer, in the interest of time.

**Audience member:** I was wondering also: I know some macrophages have MR, and I was wondering if you know if cortisol has a similar efferocytosis effect, or if that's more complicated.

**Inez Rogatsky:** For the efferocytosis part, these are the only conditions we've used, so we have not looked. We didn't even do it with corticosterone. But for our prior polarization data in the paper we published, we took Cort through everything we were doing with Dex. You add another replicate and Cort becomes statistically significant. It's basically just a little bit weaker, right? You push it a little and you get it. But we didn't do efferocytosis with Cort.

**Audience member:** Thanks.

**Moderator:** Thank you.

**Inez Rogatsky:** Thank you very much.

## Editorial verification sources

- Official ENDO 2026 agenda metadata and reviewed `presentation_component.json` for SY43-02.
- Rogatsky Lab / Hospital for Special Surgery profile: https://www.hss.edu/profiles/research/inez-rogatsky
- Chen X, et al. *Mechanisms of epigenomic and functional convergence between glucocorticoid- and IL4-driven macrophage programming.* Nature Communications. https://www.nature.com/articles/s41467-024-52942-x
- Coppo M, et al. *The transcriptional coregulator GRIP1 controls macrophage polarization and metabolic homeostasis.* Nature Communications. https://www.nature.com/articles/ncomms12254
- CypHer5E assay terminology verified against PubMed: https://pubmed.ncbi.nlm.nih.gov/16382909/

No unresolved clinically or scientifically material terms remain. Audience identities not clearly recoverable from the recording were generalized rather than guessed.
