# Terminology-corrected English transcript

- Conference: ENDO 2026
- Session: Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next
- Presentation ID: SY11-02
- Presentation: Everyday AI: Tools to Work Smarter in Clinical and Academic Life
- Primary speaker: David Toro Tobon, MD
- Source boundary: 00:00–25:58 of the parent recording
- Editing scope: Terminology, proper names, punctuation, and paragraphing only; content order and claims are preserved.

- Source: `audio.mp3`
- Model: `gpt-transcribe`
- Languages: en
- Keyword hints: ENDO 2026, Endocrine Society, hypothalamic-pituitary-adrenal axis, HPA axis, ACTH, CRH, cortisol, cortisone, cosyntropin, Synacthen, hydrocortisone, fludrocortisone, dexamethasone, prednisolone, adrenal insufficiency, Cushing syndrome, Cushing disease, Addison disease, aldosterone, renin, cortisol-binding globulin, mass spectrometry, nmol/L, µg/dL, endocrine hypertension, hyponatremia, hypernatremia, hypoglycemia, hypercalcemia, immune checkpoint inhibitor, SY11, Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next, David Toro Tobon, MD
- Context: An English-language ENDO 2026 medical conference recording.

Topic: General Endocrinology.

Session: Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next.

Speaker or recording label: David Toro Tobon, MD.

Preserve exact endocrine terminology, proper nouns, study and drug names, abbreviations, dosages, laboratory values, units, and numbers.

Do not summarize, translate, or paraphrase.

## Moderator introduction and framing

Okay, we're just gonna kick things off here.

Good afternoon, everyone, and welcome.

Thank you for being here at the end of a full day of science to talk about artificial intelligence in endocrinology.

I am Camilo González Velásquez, and together with my co-chair, Juan Pablo Brito, it is our pleasure to guide the next 45 minutes.

Artificial intelligence has arrived in our field faster than almost any tool before.

In our inboxes, in our notes, our imaging, and increasingly in the room with our patients.

The question for us is no longer whether it will touch endocrine practice, but how will we make it genuinely useful, and how will we do that safely?

Today is deliberately not a hype session.

We want the practical version of what actually works in the clinic right now, what it takes to fit these tools into a real workflow without adding burden, and how we keep trust, safety, equity, and patient-centered care at the center, not afterthoughts, but as we design.

I'm honored to introduce our two speakers who are exceptionally placed to do this.

In fact, we've organized the session around three honest questions: what is practical today, what we've learned in the hard way, and what comes next.

So let's get into it.

Our first speaker is David Toro Tobon, assistant professor, Mayo Clinic scholar, and an investigator at the Mayo Clinic's Care and AI Laboratory in the Division of Endocrinology.

He trained in internal medicine in Georgetown, completed an endocrinology fellowship at Mayo, and is now earning a master's in AI in artificial intelligence in healthcare.

His research applies AI, natural language processing, computer vision, and multimodal tools to improve care of thyroid disease alongside clinical work spanning thyroid disease and thyroid cancer.

That combination of practicing endocrinologist who is also an AI investigator makes him exactly the right person to ground us in what's ready today.

Our second speaker, Dr. Naykky M. Singh Ospina, is an endocrinologist and healthcare researcher at the University of Florida.

Her program centers on patient-centered endocrinology, the real diagnostic and management decisions patients face with thyroid nodules and thyroid cancer.

And her work on shared decision-making is supported by a career development award from the National Cancer Institute.

Like our first speaker, she has completed endocrinology fellowship at Mayo, and she now teaches and practices in Florida.

That pairing of rigorous evidence and patient-first lens makes her perspective in AI especially valuable.

Please help me welcome our two presenters.

At the end of our presentations, we'll have about 10 minutes of Q&A.

There are microphones in the aisles, and we'll also be fielding some questions that you can send through the ENDO mobile app.

We'll be field them in here, and we'll drive discussion towards the end.

So please, David, the floor is yours.

## Everyday AI: practical tools available now

Okay.

Good afternoon, everyone, and thank you so much for having me.

It is a pleasure for me to be here talking about something that I'm very passionate about, something that I think is not the future but the present.

It's a reality that we're all living right now.

And that for those of you that might be a little bit scared, is not something that I think is going to replace us.

Probably all of you have heard about this concept of, Oh, AI is going to replace doctors.

I don't think that's true.

I think AI might start replacing doctors that are not using AI.

So we just need to learn how to deal with this.

I do have a disclosure, but it's not related to what we're going to be talking about.

And I want to make it very clear that even though I might be naming a lot of companies today by their proper name, I have no affiliation with them.

It's just very difficult to do a talk on this without naming these companies.

Artificial intelligence is something that I think has revolutionized the way we do things.

And I want to set the stage here a little bit because if we wanted to do a grand specific talk on artificial intelligence, it would take us a full conference of a couple of days.

And the technology is in very different stages of maturity.

So, full disclosure, we're not going to be talking about any of that, at least not in my part.

Naykky is going to talk about a couple of things and some examples.

But what I want to introduce right now, the next 10, 15 minutes, is things that are actually readily available today that you can be using and probably should be using right now, and the ways that we should be using it appropriately in clinical practice, in a way that improves patient care, but that we're doing it safely, ethically, and trying to, again, improve patient care.

So most of this is going to be around chatbots or large language models that we probably all have interacted with and that is being embedded in our workflow in some capacity.

What you're seeing on the screen right now, it's a comparison of how human intelligence works versus artificial intelligence.

And this is the reason why we're not being replaced, because in a concept, we're fundamentally different.

We behave differently.

We both process information and input to generate an output.

The difference is that if you take a look at the human intelligence, we cannot process that much amount of data.

We have limited capacity to process data, versus what the machines can do.

They have the capacity to process very large amounts of data, and that's what creates that difference in what we can generate as an output.

So we as humans have this capacity of generate outputs that have more emotional intelligence, that are more creative and innovative, that have more common sense, and we have more critical thinking.

Versus the machines, the artificial intelligence can, in some instances, analyze larger amounts of data in a more efficient way, faster, sometimes more accurate.

That's debatable depending on the application we're talking about, have a very good pattern recognition when you're analyzing, again, this vast corpus of data, and can automate things that just takes us a lot of time to do.

So that's what we're going to talk about.

And that's why when you use these tools, the way I think about it, I don't think of them as some autopilot feature that you just have them in the background doing whatever they want.

It's more of a co-pilot feature, and you're just kind of co-creating.

And this is the mentality that I always have by default when interacting with these tools.

Of course, things evolve, and again, the technologies are—there's a lot of things under the umbrella of AI.

So in the future, there's going to be some AI tools that are going to be more autonomous, we might not have to provide that much of an input.

But as of right now, the tools we're talking about, they all require this kind of co-creation.

So I just want you to start with this tool that many of us are using, and if you're not using it, it's going to come right now.

We've all had very busy clinics.

We all dread doing documentation, and thankfully, we've all now seen or are starting to see the AI scribes.

Very common tool.

You get your phone on your patient room, you start recording your encounter, and at the end of your encounter, the system generates a summary of that encounter for you.

Is this useful or not?

Thankfully, we now have a prospective, appropriately conducted randomized controlled trial that can give us some light into how this works.

There are two systems that you're seeing on the screen, and what these two systems show is that there is a decrease in the amount of time that it takes to generate those notes.

Now, these graphs look phenomenal.

It seems like there's a huge reduction in time.

In reality, that reduction is not that much.

It's about 41 seconds per note, so it's not that much.

However, there are some benefits.

Overall, this translates to 6 to 14 minutes per day.

But it decreases the cognitive load.

So the amount of time that you're not using thinking about many of these things can be redirected towards focusing theoretically on your patient and working on other things that are patient related.

Theoretically, again, it increases patient facing time.

So the amount of time that you were typing on your computer while you were in the room, maybe now you're using it talking to your patient and asking follow-up questions and doing other things that are targeted towards improving patient care.

And it decreases what is being called now in the literature as pajama time, the amount of time that you need at home to complete notes.

So these are benefits.

Other benefits, as you can see on the first side of things, it improves burnout a little bit.

And the other thing is that it decreases physician load.

So there are some benefits that are proven.

How much of an impact doesn't seem like much, but there is some impact that is starting to grow.

Of course, it's not perfect.

As you can see, we have complications from it.

All of these systems work on mathematical probabilities.

The systems that generate the summaries are mathematical models that generate a sequence of words based on what they think is the best next appropriate word.

So there are going to be risks that they are going to generate summaries that are not accurate.

And what you're seeing here is that these systems have probabilities of omitting data, adding data, having wrong inputs, and just misplacing information, putting it in the wrong place of the note.

So this happens, be aware of it.

That means that you have to review the note, and that's probably why the amount of time that it takes to complete the notes is not, or the saving time is not larger than what we're seeing.

That's why it's probably the 40 seconds that we're seeing now.

And this is the big question that I want to give you right now, and it seems like we're having better documentation, but does it mean we're having better clinical care?

And there's this interesting study that I'm not going to go into all the details now, but they took a large amount of patients, psychiatric patients, and they looked at how did the documentation of psychiatric symptoms change before and after the implementation of AI scribes.

And what they realized is that the documentation of psychiatric symptoms actually improved very significantly.

They are much better documented, but actually the amount of action on those symptoms decreased.

So we are documenting them better, but it seems like we are not taking that much action on those symptoms.

So there's many theories behind this, and again, this is just a recent study.

A lot of people are starting to think about this, but is it possible that maybe because we're taking this cognitive load, we're starting to maybe not think that much about what's happening with our patient?

Maybe the amount of time that we sit at the computer to do the assessment and plan forces us to figure out what is it that's the best next course of action.

So just food for thought.

And for those of you that might be interested in this type of thing, tomorrow, professional development workshop, I'll be talking a little bit more on active and passive learning with artificial intelligence.

So for those of you that might be interested.

## AI scribes: benefits, errors, and practical safeguards

Now, some tips and tricks.

If you do use these tools, I would say one of the sources of frustration is Most people want the notes to look like their own notes, and this is just not going to happen, because the AI scribes are not designed to make documentation sound like you.

They prioritize completeness over prose.

So just keep this in mind.

Expect that there's a learning curve and provide feedback.

Many scribes are designed to adapt to your accent, terminology, documentation style over time, and your corrections can train the algorithm.

But I want to make a big disclosure here, because even though many scribes can do this, if you are at a large hospital system, which many of us are, odds are your system is by default not designed to do this.

Because to do this, you have to give a lot of access to the data, and the large health systems are very protective to patient data.

So most of our systems are actually completely static.

They are not going to change.

They are not going to improve based on your documentation.

They are not designed to get any better.

They are designed to protect the patient's data.

So if they have told you that it's going to get better, it's probably not going to get better based on your specific style.

That is fake news.

So don't get frustrated.

Just try to adjust it and kind of make the most out of it.

Speak naturally but clearly.

The system is designed to filter out small talk.

You don't need to dictate, but it helps to make clear the intent and to articulate key findings, physical exam, diagnosis, plans, so that you can improve the accuracy of the final note.

Things like saying, for example, closing each problem verbally.

For X, the plan is this.

Signal in transitions.

Next, let's talk about this.

Or being explicit about when you're assessing or ruling out conditions.

That helps the system be less confused and generate less hallucinations.

Something that helps is also customizing templates.

A lot of these systems help you kind of specify whether you want to have more information or less information in the summaries.

So try to go and play with the settings of these systems.

Do not go with the defaults of the systems.

At the end of the summary or the consult, before you generate the summary, one thing that I do is I use the system as a dictaphone, and I just kind of dictate a summary of my thoughts, of what I thought happened in the encounter with the patient, and what I'm thinking of my assessment and plan.

And this helps the system ground all the note around my train of thought, and this helps the accuracy of that documentation.

And finally, many AI scribes are multilingual, and this is very useful for some of us that see patients that speak many languages.

So it can generate the note despite many languages being included in the conversation.

And just a couple of reminders: if you are using a scribe, you need to obtain patient consent.

Know your local policies.

Sometimes you just have one-way consent.

There's two-way consent in some states.

Know how you have to document the consent.

All of these depends on your state and your local policies, so I'm not going to go much into detail.

The other thing is that if you are not a large system but a smaller practice and you're contracting yourself, make sure to have a business associate agreement so that the tool that you're using is HIPAA compliant.

You want to make sure that there's a lot of free, quote-unquote, tools right now that can't technically do this.

Just make sure that the tool you're using has an agreement in place so that your data, your patient's data, is protected and you're following HIPAA compliance and regulations.

Okay.

## Clinical decision support at the point of care

Next is clinical decision support at the point of care, and this one I think we have all done.

I think many of us, based on statistics, are familiar with OpenEvidence.

As of May 2026, 65% of U.S. clinicians have used OpenEvidence.

In March 10, 2026, 1 million clinical consultations were recorded.

April 2026, 27 million clinical consultations were recorded, and this is not the only platform.

There's many of these that have now come.

So we have all of these platforms that are pretty much chatbots that are grounded on clinical literature.

So these work like a ChatGPT or Gemini or general chatbots, but they are grounded on clinical literature, and the objective is to give you information that hallucinates a little less.

So that's the goal.

The way they work is you do your initial question, they give you an answer, and the beauty of it is that you can do follow-up questions so that you can have a conversation and get additional information.

The two things that I don't see people doing very often is utilize these to produce patient handouts, which some of these tools are very good at doing and can provide enough information for our patients.

And the other thing that I think many people do is, or maybe don't use as much, is administrative documentation like prior authorizations.

So this is something that these tools do very well and can help us offload a little bit of that burden that takes us away from our patients.

And one trick is that these tools are multilingual.

So if you want to do, for example, patient handouts, you can ask them to do it in whatever language your patient speaks primarily.

So super, super useful tool to do.

Just keep in mind that, as anything, these tools hallucinate.

So this is a comparison of all the tools, and you might be surprised that actually the tools that are supposed to be clinically grounded, like OpenEvidence and UpToDate, actually hallucinate a little bit more than the ones that we use that are not clinically designed.

So these, I would say take these results with a grain of salt because studies sometimes are very difficult to measure.

There's two things that these columns are trying to show you.

One of them is the rate of medical mistakes, and the other one is the amount of times that the system acted different to how a physician would have acted.

So as you can see, the clinical ones didn't do so well compared to the big ones, the big names.

That being said, again, take it with a grain of salt.

We're also not expecting any of these systems to work independently.

This is a co-reasoner.

This is a co-pilot.

You are working with the tool.

You are the ultimate decision maker.

You should be the one making sense of what is coming out of it.

This is just trying to give you some help.

These are the mitigation strategies.

You have to be the human in the loop.

Do active verification.

Practice what I call digital skepticism.

The AI's job is to find and synthesize the evidence, but our job is to appraise it and verify it.

So never act on a claim that the AI tool gave you without verifying it.

Always click on the sources.

Thankfully, a lot of these tools are now giving you the source for their claim.

Read the abstract to confirm the summary is accurate.

And always, if you're dealing with a high-stakes decision, go to the full source.

So make sure that you're understanding what you're doing.

Do not act on an AI-generated summary if it's a high-stakes decision.

Now, since these are chatbots and you're interacting via conversations, the key to the success is making sure that you're giving enough context.

## Prompt engineering and privacy

And making the question as good as possible, giving as much information as possible.

So when you're doing, for example, a prior authorization, you're not going to get as much of a good result if you go with a very short prompt in which you're barely saying, who is the patient, versus if you go with a very comprehensive prompt in which you're very clearly specifying who are you, who is your patient, why is it that you're doing a prior authorization, and what is what you want to achieve with that prior authorization.

That change of perspective completely changes the outcome that you're going to get.

And in some instances, if you are using HIPAA compliant tools, you can even upload some parts of the clinical notes from that patient, and that will even get you better results.

And I'll tell you which are HIPAA compliant.

A good way to remember this is giving your prompt a P.U.L.S.E.

So give it a persona: you're an endocrinologist.

Give it a universe: you're in an outpatient clinic.

And give it a logic: you need to create a prior authorization for this medication.

I want you to include evidence behind this medication, and the expectation is that we will get the medication approved.

But this is very, very important.

I think because we have all these tools all the time available, we sometimes risk sharing information with them that we probably should not from our patients.

And HIPAA and privacy has always been important, in the U.S. at least.

It should be everywhere.

But you should assume that none of the chatbots and LLMs are HIPAA compliant unless very clearly stated otherwise.

Of the ones that I have been showing you and telling you, OpenEvidence and Doximity are the ones that are designed to be HIPAA compliant.

I would say there are caveats.

The fact that they are HIPAA compliant doesn't mean that your institution considers them as allowed.

So always double check that you're okay with your institution.

When you sign as an individual into these systems, you are signing a business agreement with them.

So you as an individual with both of these systems.

Are guaranteeing that the information you're sharing with them is HIPAA compliant.

But the fact is that if you are working for an institution, the patient information belongs to that institution, not to you as a physician.

So many health systems, like Mayo, for example, are not big fans of us sharing information with OpenEvidence, for instance.

It is HIPAA compliant, but just make sure your institution is not against you using it.

And this one is a big one that even though I don't have time, I want to emphasize it because we all have Microsoft applications in our computers.

And there is this misconception.

This is Copilot, their chatbot.

There's this big misconception that because they have this green shield and because this is a work account, that it is HIPAA compliant, and that is not true.

If you go and read the very small fine print, this green shield means that there is commercial data protection.

But commercial data protection just means that the data is not being used to train the models.

It does not mean that it is HIPAA compliant.

The only way to have HIPAA compliance in these systems is for you to have a paid version of the institutional license, and this is individual.

It's around $25 per person.

So I highly doubt any health system has paid this for absolutely all their employees.

So make sure that this is the case, because a lot of systems are using this green shield to tell their physicians, Oh, this is HIPAA compliant.

That is not true.

The fine print very clearly says so.

So when in doubt, just de-identify.

Convert exact dates to relative timelines.

Remove patient names.

You can use placeholders or patient age or gender.

Remove specific facilities, locations, or provider names, and then you can use that data in these systems.

## Academic work, authorship, and peer review

And then finally, I would say, a lot of us are involved in academic research and activities.

These tools are very useful for those.

This is a big list of things we can use it for.

We can use it as a co-reasoner to bounce ideas, to generate drafts, outlines, structures, titles.

For systematic reviews, there's these two tools, Elicit, Consensus, and many others that can generate full systematic reviews based on a query.

You can facilitate literature consumption.

You can generate podcasts from a paper.

You can generate mind maps, notebooks in which you can just interact with certain amounts of papers that you want to lump up in, like, a safe space.

You can generate full sets of slides.

If you have gone through the posters already, 50% of them have content that is AI generated.

And then generation of visual elements, language translation, and proofreading.

These are the tools that we have, many of them.

These are the tricks that I have for you.

Whenever you can give more information, add attachments, click Deep Research, Deep Consult, or Think Longer.

Just try to give, again, as much information as possible.

Just remember, you are the author.

Whatever you do with AI, you are responsible.

And I think I'm going to leave you with that because we don't have much time.

Just one last slide that you can take a photo if you want about peer reviewing, of things to do and not do, and then we'll have more questions to discuss things in a little bit.

And I'll get Naykky over here.

Thank you very much.

## Editorial verification sources

- ENDO 2026 child-unit slide OCR: `slides/slides_text.md`
- [Mayo Clinic profile — David Toro Tobon, MD](https://www.mayoclinic.org/biographies/toro-tobon-david-m-d/bio-20575677)
- [University of Florida profile — Naykky Singh Ospina, MD](https://endocrinology.medicine.ufl.edu/profile/singh-ospina-naykky/)
