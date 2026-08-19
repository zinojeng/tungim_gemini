# Terminology-QA Edited Transcript

- Source: `audio.mp3`
- Model: `gpt-transcribe`
- Languages: en
- Terminology references: nuclear receptor, N-terminal domain (NTD), DNA-binding domain (DBD), ligand-binding domain (LBD), farnesoid X receptor (FXR), retinoid X receptor (RXR), inverted repeat separated by one nucleotide (IR1), direct repeat separated by one nucleotide (DR1), everted repeat separated by two nucleotides (ER2), molecular dynamics (MD), Anton supercomputer, AlphaFold, obeticholic acid (OCA), chenodeoxycholic acid (CDCA), lithocholic acid (LCA), GW4064, GAL4 DBD, VP16 activation domain, mammalian two-hybrid assay, salt bridge, size-exclusion chromatography with multi-angle light scattering (SEC-MALS), isothermal titration calorimetry (ITC), electrophoretic mobility shift assay (EMSA), small-angle X-ray scattering (SAXS), cryogenic electron microscopy (cryo-EM), upstream activating sequence (UAS), post-translational modification (PTM), tyrosine 174 (Y174)
- Context: An English-language ENDO 2026 medical conference recording.
Topic: Receptor Biology and Signal Transduction.
Session: Architectural Plasticity and Allostery in the Farnesoid X Receptor.
Speaker or recording label: C. Denise Okafor, PhD.
Preserve exact endocrine terminology, proper nouns, study and drug names, abbreviations, dosages, laboratory values, units, and numbers.
Do not summarize, translate, or paraphrase.

## 00:00:00.000–00:20:00.000

**Moderator:**
Our next speaker is Denise Okafor, assistant professor at Penn State University, and the title of her talk is Architectural Plasticity and Allostery in the Farnesoid X Receptor.
All right.

**C. Denise Okafor, PhD:**
Thank you.
Hi, everyone.
All right, I see it.
Yes, thanks.
Yes, I'm excited to tell you about our lab's work today on studying kind of the architecture of nuclear receptors.
The views expressed are mine and do not represent the views of the society.
### Nuclear receptor domain architecture and FXR

So, nuclear receptor domains.
Yeah, so today that we know that there are basically four nuclear receptor domains.
I'm showing you this model that conveniently has the N-terminal disordered domain left out.
But as we've learned from the first talk, we can't ignore the NTD, so I'll talk about that later, how we're trying to address that.
But for now, we're focusing on kind of the DNA-binding domain, ligand-binding domain, hinge, and the point that I want to make here is that these domains function cooperatively.
We know that there's DNA binding that takes place.
We know that there's ligand binding that happens with the LBD.
We know that the hinge is this disordered or flexible region that connects the two.
And so something that we really wanted to understand when I started the lab six years ago now is how are these domains talking to one another?
We know that ligand binding regulates DNA activity, right, the activity with the DNA.
We know that there has to be some kind of an interaction between domains, and we just thought that there was just very little understanding of what that was, so we set out to study that.
And so before I talk about the results, to kind of set the stage, even though I think for this audience, probably this does not need really to be said.
But it has been challenging to study full-length nuclear receptors structurally, and I think that a large part of that is because of the disordered nature of the hinge, disordered nature of the N-terminal domain.
And so this is a brief history of what we know structurally of full-length nuclear receptors.
Obviously, there's thousands, probably—hope that's not an exaggeration—of crystal structures of individual ligand-binding and DNA-binding domains, but there are only four crystal structures that have the intact LBD and DBD domains present.
And you can see that there have been some really nice kind of more structural or integrated models that have been created.
But overall, thinking about how many nuclear receptors we have and how long we've been doing this, we still have a poor understanding of just the architecture, the nature of how those domains interact.
And so, one thing I also want to point out is that if we take a look at the existing structures, so what I've done is I've aligned them by LBD, and so I'm letting the DBD kind of be all over the place.
You see that there, even in the handful that we have, there's a lot of structural variation and just, you know, arrangements of the domains.
So it's complicated, essentially.
So when I started my lab, we do a lot of MD simulations, and so we decided that we would do computational modeling and combine those with experiments to try and bridge the gap between what's not known and what we feel like still needs to be learned about these full-length receptor structures.
The receptor that we chose to work on is the farnesoid X receptor.
I think no one here, I would imagine, is a stranger to FXR.
We know it's expressed in the liver, intestines, important in bile acid metabolism, lipid metabolism, glucose metabolism.
And just thinking about how FXR functions, we know it's a type II receptor, so it functions as a heterodimer with RXR.
IR1, an inverted repeat separated by one nucleotide, is the canonical response element for FXR-RXR binding.
And here is a model of what that heterodimer looks like.
So again, this is a model because there are no experimental structures of this.
But you can see that we have the DNA, the DBDs binding DNA.
We have the ligand-binding domains with the interface that we know exists, the dimer interface that exists between RXR and all of its dimer partners.
And so I just wanted to do a quick nomenclature.
When I'm talking about architecture, I'm talking about, again, how are those domains arranged relative to one another.
And so for today's talk, what I want to do is talk about a story that has been published.
It's probably a couple years old now, but thinking about how, again, this architecture is quite plastic and quite driven by different binding partners of the receptor.
So we'll talk about how ligands drive this plasticity in the architecture, and then I'll talk about how DNA also can drive plasticity in these nuclear receptor structures.
And so we'll start out with the ligand-driven structure first.

### Ligand-driven structural plasticity

So when we set out to do this, what we did was we just made predictions.
This was before AlphaFold; we started doing this.
So we made predictions of full-length FXR structure.
So we built homology models, and then we ran some simulations, we optimized the structure, and then we started to run these extended simulations using the supercomputer called Anton.
And so just to give you a brief summary of what we found, we ran many, many, many simulations, but I think the major result is encapsulated on this slide.
So what we saw is that if you look at the structure of the receptor, again, we've ignored the N-terminal domain.
Okay, we're focused on the ligand-binding domain, DNA-binding domain, and hinge.
We see that we don't see really much of anything that's happening that's dramatic when we have the apo structure.
But when we put in obeticholic acid, or OCA, which is quite a potent FXR agonist—
If it plays, yes, we see just more dramatic conformational changes.
So you can kind of see that whole thing just collapse into itself as soon as we start the simulation.
And so that was interesting.
And so we'll kind of follow up on this as we go, or we decided to follow up on this as we go.
So we took our many, many, many simulations that we ran, and then we kind of put them all together.
We clustered them, and we asked, what are the overarching conformations that we're seeing?
And what I'm showing you here is three different groups of kind of, again, architectures or arrangements of this FXR model that we found.
And something that was common to all of them is that all of these predict that the two domains end up really close to each other.
So you can see DBD-LBD, DBD is behind LBD in this case, DBD is on top of LBD in the orientation that I'm showing it.
But the kind of the thing that was common is that it's predicting that there are these interdomain interactions between the two domains.
And so we wanted to dig in more deeply into our simulations, and we asked what kinds of interactions are facilitating those interdomain interactions.
We noticed that there were salt bridges, lots of salt bridges, and so we figured that salt bridges were probably important for this.
And so just illustrating the one, for example, you can see in blue is the LBD, in gray is the hinge, and you can see that there's this network of salt bridges where it's those two lysines and that glutamic acid interaction that this network of salt bridges is forming.
So we looked into these more carefully, and we identified 60 unique interdomain salt bridges.
The numbers are not important.
What's more important is the proportion of the salt bridges.
So if we look at the breakdown, we see that of the 60, approximately 16 were from this between the two folded domains of DBD and the LBD.
We see that about 10 were between the DBD and the hinge, and then we see that a good number, the majority were actually between the LBD and the hinge, right?
So we're like, oh, the hinge is really participating in these salt bridges.
Seems interesting.
Interesting.
And then we also did kind of, we broke down the number of salt bridges and we broke down by amino acid where the amino acids come from, and we see that there is basically almost the same number of amino acids in the hinge that are forming these salt bridges as there are in the LBD.
So I show you all of this because the conclusion that we came from this was that the hinge is actually important in these interdomain interactions.
It's not just a linker, it's passive, it's actually participating and engaging in the interactions.
And so then we did experiments where we wanted to ask, is this something that we will see in experiments?
Everything I showed before was predicted by computation.
### Hinge-mediated interdomain contact

And so we set up a mammalian two-hybrid assay, which has been used historically in the nuclear receptor field to learn a lot about how these domains can interact with each other or even how receptors are activated.
And so we took the GAL4 DBD and the VP16 activation domains.
And so the way that you set this up is that we fuse one domain to the GAL4 DBD and fuse the other domain to the VP16 activation domain, right?
And we're asking if these two things interact.
The way that we would know that is if we see an increase in our signal, in our luminescence signal.
If we don't see an increase in our signal, those two domains are not interacting.
This is what we set up.
And then before we start the experiment, we wanted to ask, what should we do?
How do we incorporate the hinge?
And so what we came up with was we would do a couple of different things.
In one case, we'd stick the hinge to the ligand-binding domain.
Second case, we would stick the hinge to the DNA-binding domain.
And so we started to test these different scenarios out.
So here is our background signal where we have no DBD.
So it's just the LBD.
It's kind of our baseline.
And so you see that we have, and what I'm showing you here is different FXR ligands.
So LCA is lithocholic acid, pretty much an antagonist, very weak activator, but mostly an antagonist.
CDCA is the endogenous activator, endogenous agonist for FXR.
OCA and GW4064 are synthetic potent ligands for FXR.
And so then when we then add in our DBD, okay, so now we're comparing that situation to scenario one.
We don't see an increase in the signal, so this tells us that those two domains are not interacting.
Then we add in our case with the DBD and the hinge, and we still don't see an increase in the signal.
So that tells us that the LBD is not interacting with the DBD and the hinge.
And then we now want to test our construct where we have the LBD attached to the hinge.
So we set up a new background, which again, there's no DBD, so it's just that new baseline.
And when we add the DBD, now we have an increase in signal.
So that tells us that the two domains will interact.
No, sorry, right here.
Okay, the two domains will interact, but only when the hinge is present, and specifically the hinge needs to be attached to the LBD, not to the DBD.
And so that was an interesting result to see.
And then the other thing that we noticed that was actually quite consistent with the simulations that we had was that we look at the ligands and we see that our weaker ligand, or antagonist, does not seem to do this activity.
Only the agonists of FXR do, and that was consistent with what we saw in our simulations.
And then finally, we wanted to then ask.
If those salt bridges that we saw, were they actually playing any role in this activity?
So we took some of the most prevalent salt bridges and we mutated those amino acids.
So here I'm showing you mutations of, you can see charged amino acids in the different domains.
And so we tested these conditions six to 12, where the first bar in each case is going to be the unmutated receptor, and then you have our mutants, and you can see that at least, not all, but at least some of them show this reduction in that interdomain interaction.
I think most interesting was number 10, which is that multi-salt bridge network that we saw in several simulations, and we were very happy actually to see that it significantly drops the interdomain contact.
And so just back to the title of my talk and thinking about plasticity, yeah, what we believe happens in FXR, potentially other receptors, is that these potent ligands can drive this rearrangement of the domains and again induce this contact.
But then if the ligand is unliganded, if the receptor is unliganded or with a weaker ligand, it probably is not likely to happen.
So this is an illustration of this kind of plasticity in the monomeric form of the receptor.
### DNA-induced FXR homodimerization

But now we'll go to the dimer because FXR is really functioning as a dimer.
And actually, I'm not going to talk about the heterodimer.
I'll talk about full-length FXR, which we studied alone without RXR.
So we started to do experiments.
We purified this in our lab.
This is a purification that took about a year to optimize, but we were able to do it.
Well, postdoc in my lab was able to do it.
I didn't do it, but he was very successful.
And so he purified, and then he started to do these biophysical characterizations of FXR.
And so what he saw was when you put FXR with DNA alone, he saw that FXR was forming this dimer peak, and it was forming it with a direct repeat DNA or with inverted repeat DNA.
And I think for this audience, it's important to say that we were not the first to discover that FXR binds DNA as a homodimer, but we were kind of the first to ask, why does it do this?
Is this relevant at all?
And so we did size-exclusion chromatography with multi-angle light scattering, SEC-MALS, and what you see is that in the absence of DNA, so just that blue curve, we calculated a molecular weight of about 46.1 kilodaltons, corresponding approximately to FXR.
But when you have the DNA, we calculate this weight of 93.5 kilodaltons, approximately the mass of two molecules of FXR and one molecule of DNA.
So again, supporting that FXR, when you add DNA, you're getting this homodimer.
And then we also did ITC, which measures binding stoichiometry, and this is hard to see, but the most important point here is going to be highlighted.
I know it's really difficult to see, but that says 0.572, approximately 0.5, and we did a couple replicates of this.
And that stoichiometry of 0.5 confirms that it's two molecules of FXR binding one molecule of DNA.
So we collected a bunch of evidence to show that FXR is binding DNA as a homodimer.
And so then one thing that we thought about carefully, because when we study receptors, we know that their polarity with DNA binding is quite defined, right?
So like FXR, RXR heterodimer, FXR will bind that 5-prime site, RXR will bind the 3-prime site.
Like that, this is how they bind.
They don't switch.
They bind the site that they bind.
And so when we put that in mind, it became obvious to us that if FXR was binding as a homodimer, this would mean that FXR would need to bind the 5-prime site and bind the 3-prime site.
Both of those things had to happen.
And so we constructed two motifs that we call these half-site motifs, a 5-prime motif and a 3-prime motif, and then we asked, you know, does FXR bind both?
And then we used a competition assay to show that FXR is capable of binding both, higher affinity for IR1, much weaker affinity for the motifs with a specific binding for those half-site motifs.
So we confirmed that it binds those.
And we wanted to ask, is this a homodimer?
Does it do anything transcriptionally; is it transcriptionally relevant?
And so we obtained RXR-knockout cells, and what we did was we then, so, yes, okay.
So we, with our, we used luciferase assay with IR1, IR1-driven luciferase.
And so what you see is that when we have, when we transfect FXR and RXR, so this is our one-to-one, the x-axis is FXR-RXR ratios.
So one-to-one, we measure some level of transcription.
When we transfect only RXR, this is zero-to-one FXR-RXR, we see that there is very little or nothing happening.
And then when we transfect just FXR, we see that we have the same amount of transcription as we do, well, at least measured by this assay, same levels as we do with the heterodimer.
And so we showed that the homodimer is actually transcriptionally active.
And so then we wanted to ask, what is the structure of the homodimer?
And so we did try cryo-EM, I'll say that, and it was not happening.
But we then went to SAXS, which is small-angle X-ray scattering, can give you a shape, the kind of the shape of the complex.
And what we saw was that if you, if when we looked at the kind of the envelope that's predicted by SAXS, SAXS predicts this extended conformation.
And when we modeled our density or modeled our FXR homodimer into that, what we predict is that we have DNA, and we have one FXR monomer on one side, and we have a second FXR monomer on the other side of DNA.
So just kind of for a closer look at that, this is kind of what that looks like.
You have the DNA, and then you have monomer on one side and monomer on the other side.
The reason why this was interesting, a couple of reasons, is if we go back to what the FXR-RXR heterodimer looks like, I mentioned that the two LBDs have this interface.
This is the interface that we see with all RXR heterodimers.
Not only that, this is the interface that we see with every known nuclear receptor dimer that has been published, right?
Like I went through the PDB and I pulled representative structures from all the classes, all the families, and what we see is that there is always a dimer interface, whether they are homodimers or heterodimers, multi-domain structures, bless you, there is always a dimer interface with the ligand-binding domains.
And so, yes, they all have this LBD dimer interface.
Okay, so then we have our structure that doesn't show the interface.
But something that was really interesting also was that AlphaFold also predicted that we would have this extended conformation.
So when we put in the sequence of FXR and IR1, or two copies of FXR, AlphaFold also predicted this extended conformation of FXR, which was of the homodimer, which is really interesting and then kind of helps, kind of informs what we did next after this.
And so, so this is, yes, we have this kind of non-canonical structure.
### DNA sequence and quaternary architecture

And so then we started to ask, what happens when we change the DNA, right?
Because we've done all of this with IR1.
IR1 is a canonical FXR response element, but there are other DNAs that FXR will bind.
And so we took a few other DNAs.
And so what I'm going to show you now is all unpublished moving forward, but this is AlphaFold.
These are AlphaFold predictions.
So here is that structure that I've just shown you, the IR1 extended conformation.
I'm coloring the DBDs pink and the ligand-binding domains blue.
So we tried different DNAs, direct repeat one, and then AlphaFold is predicting instead.

## 00:20:00.000–00:27:50.000

Compact conformation, right, where we have an interface between the two LBDs.
Okay, so that was interesting.
We tried a different DNA, ER2, which is an everted repeat, and AlphaFold again—where is my cursor?—AlphaFold again predicts extended.
The two LBDs are not interacting.
And then we tried this composite ER2-IR1 element, which really just behaves like an IR1, and AlphaFold again predicts this extended conformation.
And so we thought this was interesting.
So we were like, oh, let's see, how can we, you know—and we're doing experiments in the lab now to understand, to do SAXS and study the structures of these things.
But kind of following up, right, again, because AlphaFold seemed correct in the past, we were like, is it correct again?
Right.
So we then looked at the structure of our IR1 model, and we saw we were looking at the dimer interface, and there's this amino acid, this tyrosine that lies on that interface, which when we mutate it, we lose some of the activity.
And so we decided that that was maybe a good marker, a good way to ask, are we disrupting this dimer formation or are we not?
So what I'm showing you in yellow are those tyrosines, and then I've colored those tyrosines yellow in the other structures.
So what you see with the DR1 complex is the tyrosines are lying on opposite sides; they're not in the dimer interface.
And so what that would tell you is that mutating them should not disrupt the dimer formation of this version of the homodimer.
And so when we do that, we don't see a disruption of that homodimer.
Same thing with the ER2, right?
The tyrosines are far away from each other, so they shouldn't disrupt the dimer formation.
We don't see, again, a change in the activity.
But then when we come back to the IR1, the tyrosines are there in the dimer interface, and then there we do see that we lose some of the activity.
So.
The kind of the where this is now and where this is going is that we believe that DNA sequence is modulating the architecture of the homodimer, right?
And so it's going to look different depending on what DNA it's bound to, which then hopefully everyone can appreciate that that probably influences things like coregulator recruitment and just even overall the structure, the nature of the assembly, the transcriptional complex that assembles after.
So we're trying to—this is what we're working on, is trying to understand this plasticity in the homodimer.
So first part was ligands that drive plasticity, but then the second part is DNA also seems to adjust what kind of architecture forms.
And so hopefully we'll have something nice to show soon.
### Conclusions and acknowledgements

So I just want to thank my lab for all the work that was done.
And before I stop, I want to acknowledge two of my students here, two very talented students from my lab.
Unfortunately, Nishanti presented yesterday, but Thilini tomorrow is showing you all the stuff that we're doing on the NTD, because the NTD will not be ignored, as I said.
So I hope that people can come and see her talk or her poster.
But thank you all for listening, and I'm happy to take any questions.

### Q&A

**C. Denise Okafor, PhD:**
In the back.
Okay.

**Audience member:**
Hi, great talk.
I think you mentioned that the LBD-DBD interaction that you're looking at only happened when the hinge was on the LBD.
Do you know why that's the case?

**C. Denise Okafor, PhD:**
We don't know why, and we're still trying to figure this out.
We actually have a lot of hinge work that's happening in our lab as I speak.
But I think it just goes back to this model of nuclear receptors, that ligand binding induces a conformational change that then does all the other things.
And so, if you ask me, my model is that the ligand binding induces a conformational change that propagates to the hinge, and then that then does the other thing.
So I think this is like this step.
It's in the middle, but it does involve the hinge.
It goes from LBD to hinge.
That's my guess.

**Audience member:**
So let me ask a question.
Do you see differences in helix 1 of the LBD?
Because this is something that's been shown to associate in a ligand-independent manner, and maybe— Different between different ligands, and this is the first helix that connects to the hinge.

**C. Denise Okafor, PhD:**
Yes, we see some interesting things in helix 1.
I don't know that we understand them, but it keeps popping up.
I think that after this, I used to ignore helix 1, but after these results, I now understand why helix 1 matters, because it's connected to the hinge.
So hopefully we'll show soon.

**Audience member:**
Awesome work, Denise, as always.

**C. Denise Okafor, PhD:**
Thank you.

**Audience member:**
There is one domain that you didn't mention at all, and that's the F domain.
Does FXR have an F domain?

**C. Denise Okafor, PhD:**
So this is the end of the LBD.

**Audience member:**
Yeah.
Usually 50 plus.
Does FXR have an F domain?

**C. Denise Okafor, PhD:**
It can be 50 plus.
It can be, right.
Does FXR not have an— I heard someone say it does not.

**Off-mic audience member:**
Does not.

**C. Denise Okafor, PhD:**
I don't think it does.

**Audience member:**
Thanks.
Well, then question two is, does the hinge have any PTMs that could be influencing this?

**C. Denise Okafor, PhD:**
I don't know.
Do you know?
I know the NTD has PTMs, right, but I don't know if the hinge is post-translationally modified.

**Audience member:**
Could you repeat the response?

**Thilini Pulahinge:**
The answer is yes, there are, and they're investigating it.

**C. Denise Okafor, PhD:**
Thank you so much, Thilini.
This is why I have the mini audience as backup.

**Eric Nelson:**
Eric Nelson, University of Illinois.
Fantastic work as always.
So you showed you could change the DNA, and that would change, I guess, the conformation of the FXR monomer-homodimer.
How about ligands?
Do they shift that as well?

**C. Denise Okafor, PhD:**
We have not yet.
This is exactly what is on our list to study next, and I think absolutely they're going to, right?
Like, how could they not?
But we haven't tested that yet.

**Audience member:**
Very nice talk.
I'm wondering if you did MALS again with your mutant, that you saw effect on activity to see if they are truly affecting the size by MALS, and really you have the monomer now.

**C. Denise Okafor, PhD:**
That's a great question.
I don't think we did SEC-MALS, but we did do the EMSAs, and we showed that the mutants will disrupt the, or at least reduce the formation of the homodimer.
But no, we didn't do SEC-MALS, so that's a—thank you for the question.

**Taosheng Chen:**
Interesting talk.
Taosheng Chen from St. Jude Children's Research Hospital.
In your one-hybrid system that you showed that the hinge region is critical, would you remind me that the DNA binding sequence, is it for DBD of FXR or is it actually for the fusion partner?

**C. Denise Okafor, PhD:**
It would be for the—wait, no, the DNA binding, the two-hybrid assay you're talking about, this is the GAL4 DNA binding, so the UAS.

**Taosheng Chen:**
So do you think the sequence, DNA binding sequence, itself might change the contribution of the hinge region?

**C. Denise Okafor, PhD:**
Very likely, yes.
This is something that we're also currently exploring, is understanding different DNAs and how the hinge is, yes, how manipulating the hinge is affecting or showing up with those different DNAs.

**Moderator:**
All right.
Thank you, Denise.

## Editorial verification sources

- Hazarika et al., *Nuclear Receptor Interdomain Communication is Mediated by the Hinge with Ligand Specificity* (PMID: [39332668](https://pubmed.ncbi.nlm.nih.gov/39332668/); DOI: [10.1016/j.jmb.2024.168805](https://doi.org/10.1016/j.jmb.2024.168805)).
- Khan, Yennawar, and Okafor, *DNA induces non-canonical dimerization of the farnesoid X receptor* (DOI: [10.1093/nar/gkag087](https://doi.org/10.1093/nar/gkag087)).
- RCSB Protein Data Bank, [farnesoid X receptor structure entries](https://www.rcsb.org/search?query=farnesoid%20X%20receptor), used to verify receptor/domain nomenclature and PDB terminology.
