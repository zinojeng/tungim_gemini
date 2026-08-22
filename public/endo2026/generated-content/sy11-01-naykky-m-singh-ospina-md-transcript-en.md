# Terminology-corrected English transcript

- Conference: ENDO 2026
- Session: Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next
- Presentation ID: SY11-01
- Presentation: AI in Real Life: Lessons From Implementation of Artificial Intelligence in Healthcare
- Primary speaker: Naykky M. Singh Ospina, MD, MS
- Source boundary: 25:58–47:39 of the parent recording
- Editing scope: Terminology, proper names, punctuation, and paragraphing only; content order, limitations, and Q&A are preserved.

- Source: `audio.mp3`
- Model: `gpt-transcribe`
- Languages: en
- Keyword hints: ENDO 2026, Endocrine Society, hypothalamic-pituitary-adrenal axis, HPA axis, ACTH, CRH, cortisol, cortisone, cosyntropin, Synacthen, hydrocortisone, fludrocortisone, dexamethasone, prednisolone, adrenal insufficiency, Cushing syndrome, Cushing disease, Addison disease, aldosterone, renin, cortisol-binding globulin, mass spectrometry, nmol/L, µg/dL, endocrine hypertension, hyponatremia, hypernatremia, hypoglycemia, hypercalcemia, immune checkpoint inhibitor, SY11, Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next, Naykky M. Singh Ospina, MD
- Context: An English-language ENDO 2026 medical conference recording.

Topic: General Endocrinology.

Session: Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next.

Speaker or recording label: Naykky M. Singh Ospina, MD.

Preserve exact endocrine terminology, proper nouns, study and drug names, abbreviations, dosages, laboratory values, units, and numbers.

Do not summarize, translate, or paraphrase.

## Moderator transition and opening

Well, Dr. Singh Ospina is putting her presentation up.

I want to remind you to send in any questions that you might have through the Q&A function in the Endo Mobile app, so we can go to those at the end of the presentation.

Well, thank you, David, for that presentation, and thank you everybody for being here.

## From promise to impact: technical, clinical, and implementation gaps

So for the next 15 minutes or so, my approach is a little bit more reflective, thinking back on the lessons we have learned so far in the history of AI in medicine.

I don't have disclosures as they relate to this topic, and the outline is going to be first to kind of like reflect a little bit between the promise of AI that we have heard about and what the reality has actually been.

Then we're going to look at two specific tools in endocrinology and kind of like compare the implementation pathway that each has had.

And then through the talk, we're kind of like thinking of a way how things can move forward in the future.

So I think everybody in this room probably has heard about AI and how really, as David had mentioned, AI is going to replace physicians and is going to completely transform the way that we practice medicine.

And we have been hearing about this for many years now.

However, there seems to be a gap between this promise of AI and the actual impact that it is having in day to day.

As David kind of like already showcased, there's a limited scope for the applications that we are actually seeing in practice and what they can do and what they cannot do.

And we can think that all the history of all the applications in AI will have kind of like three main questions.

One, can the algorithm work?

Can the AI work?

Second, can it improve clinical care?

And then three, are the end users, so patients and clinicians, willing to use this technology?

And this is a little bit of like kind of like a chicken and the egg scenario, because you need all of them to be valid at the same time for it to happen, which makes it a really difficult challenge.

If we go first to the technical gap about why AI hasn't necessarily yet revolutionized everything that we do, we can think about the things that the current AI architectures do well.

So it's very good for pattern recognition, classification, prediction, and for a lot of the things that have to do with language.

However, healthcare is a little bit different.

The decisions that we make are very contextual, very specific.

There's a lot of need to manage uncertainty.

There's the need for causal reasoning, and we also provide longitudinal care and longitudinal thinking.

So there's a gap there, and that's a little bit of a technical gap that still these technologies need to mature so that they can actually fix the problems that we have in healthcare.

The second, the other two that I mentioned is the clinical and implementation gap.

And as I said, all of these three actually go together.

So we can think that we need the clinician trust and the patient trust so that we can use these tools that have been validated, that are clinically useful, that can be applied in different settings, that can be used in your day to day, but that also there's an environment, a regulatory environment, and a clinic readiness to use these technologies, and then that's what is building that trust.

But it's kind of like you need everything at the same time for it to work appropriately.

And what makes it harder then is that it's not only a technical challenge or a social challenge, it's both.

It's a socio-technical challenge to actually change the practice.

Now, another way then to think of when you are developing these technologies, you first want to make sure that you are addressing an important clinical need, and you want to involve from the get-go the end users.

As I said, this is kind of like something that has to be happening simultaneously.

Then you want to have your technical part, so make sure that it's validated, that it works, that it does what it is supposed to do.

You want to have the ethical and regulatory framework.

Then you want to be able to implement it in practice, and then you want to measure and see what the outcomes are.

So I'll pause here, and then as you are reflecting on this, kind of like pose the question of, from this kind of like little algorithm that I have shown you, which is the difficult part?

And for me, it's all of the parts, and the fact that all of the parts need to be happening at the same time.

All right.

For the next few minutes, then I want to compare, kind of like on that background, on that framework, two different AI technologies.

So one is using AI to facilitate diabetic retinopathy screening, and the other one is to use AI to facilitate the evaluation of patients with thyroid nodules.

## Comparing diabetic-retinopathy screening with thyroid-ultrasound evaluation

So here, these are the criteria to summarize the clinical problem and that socio-technical problem.

So the diabetic retinopathy, the problem in practice is that patients are not getting screened, and this is because there are some workflow difficulties.

You have to find extra time, go to extra clinics, you need more physicians to evaluate the images, and so forth.

The technical challenge is relatively easy in the sense that there's a standardized way to take the photo of the retina.

There's limited variability in these pictures, and actually the ophthalmologists agree that when the lesions are more than mild, something needs to be done.

So that's kind of like the basis there.

So what we want then is to identify these patients with more than mild disease.

The decision is refer or not refer to the ophthalmologist, and then we're expanding access to care.

On the other side, then think about the thyroid ultrasound scenario.

So the clinical problem is already more convoluted from the get-go.

So there's a little bit of overdiagnosis, overuse, variability in the care, in the management, variability in how the ultrasound reports are summarized.

Now, the technical part, there's a lot of variability on the quality of the ultrasound depending of how the images are obtained, interpretation based on the operator, and so forth.

And then, okay, we get a new cancer-risk estimate, but what are the options?

What do we do with this information?

There is the decision context is significant, and there are multiple things that we can do.

And again, the end is to improve the quality of care that these patients are receiving.

So just kind of like compare and contrast and think back to that, the clinical gap, the implementation gap, and the technical gap, which might have moved forward faster.

So we'll kind of like summarize the evidence for each of those.

## Autonomous AI for diabetic-retinopathy screening

So first, with diabetic retinopathy, there is a system that has been approved that is autonomous AI.

So the workflow is that the patient will go to the primary care clinic, they can get a picture.

There are a lot of variations of what these cameras can look like.

The quality of the image is assessed, and then the algorithm, without the integration of any human, will say there is more than mild disease, so this needs to be referred, versus not.

So this is autonomous AI making the decision.

There's flexibility with the image, and the results are given to the patient right away.

So the idea is that they leave the clinic with the appointment already.

So kind of like cutting up some of the workflow issues.

And the idea is that this is going to improve the access to care.

There is data that this tool works, and that's why it has been validated.

As you can see here, 13 studies, more than 13,000 participants, good or reasonable specificity and sensitivity.

And then that's just one system.

There are multiple systems with some variations on the technical aspect, but give or take, the performance is acceptable for practice.

So what do we have on that first kind of like column is that we have robust models that are validated and that have decent clinical performance.

What we also have for these models is systematic reviews.

So here, as you can see, at least 20,000 patients, in which you can have patients that are receiving the screening with the AI tool that provides that immediate results versus taking the images and then having to send it to another person and they don't leave the clinic with the appointment.

And you can see that for abnormal results, there is an increased risk of follow-up appointments when the results are abnormal.

Then let's talk a little bit about the implementation part.

So it's not only the algorithm that has to work.

In this study, for example, there was a 24% increase of referral completion in the arm that was using the technology, but they saw that this has to be done in the setting that there's also patient education about these are the results, this is what this means, this is why you have to go to the ophthalmologist, facilitating the scheduling, and then also making sure that the ophthalmologists are able to receive this new influx of patients.

So it's kind of like, as I mentioned, multiple aspects that need to be working at the same time.

Moreover, this technology is mature enough that depending what type of healthcare system you are, you can apply it in different ways.

So for example, if you are in a rural, very resource-constrained place where the idea is just to screen patients, then you are going to need modifications in terms of the type of the camera, the fact that you might have low power, low internet, and so forth.

But the idea here is just to expand the screening.

On the other hand, if you are working in an integrated healthcare system, you can use it really to scale up screening, to identify patients from the EHR, make have an alarm when they come to the primary care office and get the testing.

So same technology, very different uses depending on the context.

So here I think we can add, in addition to the validated and accepted clinical performance of the model, this can be integrated into different clinical settings and it can improve the outcomes.

So we'll compare that to the thyroid ultrasound evaluation.

## AI for thyroid-nodule ultrasound assessment

So I'll do the same, starting first with the AI model work.

And again, with some limitations, I focus on thyroid disease, so I know a little bit more about the background here.

So there are some limitations on how the models are developed and what the reference standard is used and so forth.

But in all, these models can do what they say in terms of kind of like giving us an estimate of what is the risk of cancer for a particular patient.

And when we compare them with what the radiologists will do, the performance is also very similar.

So I think here we can also say the same.

There are models that are validated and they can have good clinical performance.

There are multiple, between four to six, that are already approved by the FDA as well.

But then, what about the evidence of clinical gap and the implementation gap?

This is where the thyroid ultrasound literature is less mature.

So I'm just going to showcase two studies, because these are actually some of the ones that get more to the point of changing patient care.

And you can see this study one here, they had 80 patients, and then they had five general endocrinologists.

They saw patients and do an assessment, and then retrospectively they had the AI take a look at those same images, and then they have a group of experts.

And what happens was that the AI was more in agreement with the experts than the general endocrinologists.

And the AI also identified more suspicious features and was making more referrals.

Now you can ask whether in practice, normally the general endocrinologist is the one who is taking care of the assessment of these ultrasounds.

On the other one is really experimental.

So they have medical students, young doctors, older doctors, or experienced doctors, and then they also, the patient did their evaluation of the nodule on their own, and then they did the evaluation with the assistance of the technology or the AI technology.

And what happens was that for the older or the more experienced physicians, there was not that much gain from using the AI.

But for the novice, it was more helpful.

So really at this point, what we have are more questions more than answers from the actual deployment in clinical practice.

So should we have an autonomous decision just as the diabetic retinopathy?

Probably not.

How should we use it?

As a first reader, a second reader, and then who should be the user?

Should primary care do it, general endo, radiologists, thyroid experts?

So kind of like more questions.

So for this part, I think we don't have this part here on integrated into clinical practice and changing outcomes.

These last few slides, just to kind of like highlight then, as I mentioned, the importance of the of the environment in which the technology is being deployed.

So you need that both organizational readiness as well as environment for supporting the implementation.

So both of these technologies are FDA approved, and there's validation studies, as I have shown you.

The diabetic retinopathy is included in the ADA guidelines.

There's a CPT code associated with the use of the technology.

It's also part of quality metrics that doing it with the use of AI is valid.

I show you the deployment studies.

There's the outcome data, and this is autonomous.

While the AI for thyroid is really the first two that have occurred.

And for me, I think some of this goes back to that initial question of what is the problem that we're trying to solve.

## Looking forward and conclusions

So what can we do moving forward?

I think we will need better AI in the sense that is more contextual, more longitudinal, more adaptable to actually what we need.

And then we need the better evidence that it works in practice and the better evidence that clinicians and patients want to use it.

And all of this has to happen from a human-centered approach.

My conclusions then will be that AI can create value if it addresses an important healthcare need, but not all the healthcare needs are the same, so we should start there.

Second, diagnostic accuracy is necessary, but it's not going to be sufficient.

And then the implementation is going to matter as much as the algorithm.

So I think moving forward, AI is going to succeed when it solves an important clinical problem, it fits into clinical practice, and it actually changes the care of patients for the better.

Thank you.

## Q&A

Thank you, Naykky, for that wonderful presentation.

Now we have time for questions, so you can come to the microphone if you have one.

In the meantime, we're going to pay attention to the ones in the app.

David, one of the questions is about AI evidence platforms like OpenEvidence, which advertise that they tend to find the source of information from the New England Journal of Medicine, for instance.

But how do the clinicians can decide which of these platforms to use?

For instance, endocrinologists might be more interested in JCEM than the New England Journal of Medicine.

Yeah, so I would say these platforms, even though they advertise now some, like, strategic partnerships with some journals, that doesn't mean they are restricted to that specific journal.

That just means that sometimes they highlight in a graphic way some of their content, but they are still combing the information across all the journals.

Just so you get an idea, for example, what OpenEvidence does, even though they don't disclose their algorithm, is every day they conduct a search of all the literature and apply evidence-based principles to say, okay, is the study randomized, or based on that type of study, the population, and the question, how would I grade the evidence of this study?

And they assign a priority on how they would assign that paper in their summary.

But they don't limit that to the strategic partnerships that they have.

So that should not be a limitation.

Thank you, David.

So we have a question there.

Yeah.

Thank you for the lectures.

An audience member identified herself as a third-year fellow at Texas Children's Hospital.

So I recently used the ChatGPT to comment and criticize my draft manuscript.

I want to know if there's any danger or risk that if I upload my, like, full draft manuscript to the AI.

Okay.

David, do you want to take it?

Yeah.

So there is.

If you are uploading it to one of these platforms, you have the risk that the data from that manuscript can be leaked into the world because of just the way these platforms work.

The risk is low, but most likely because most likely the people that are going to see that are going to be like data science engineers from Google and whatnot.

So it's not going to be like a huge risk, but there is some data leakage risk.

Thank you so much.

Thank you.

Thanks so much.

Another audience member from Glasgow, UK, who identified himself as the editor-in-chief of Endocrine Connections, said: Actually, my question was somewhat linked to the previous one here.

We've seen this as a problem where manuscripts, when we ask reviewers to look at manuscripts, they're loading it into a system and providing us a review in two seconds.

And these are effectively, this is going into the public domain.

These are non-peer-reviewed manuscripts going into the public domain, which is going to generate fake evidence.

And somebody who's going to then go into ChatGPT or a large language model is just going to look at that and use it as fact.

Are you seeing this?

And I think this also has an implication on the future of academic publishing.

Do you want to comment on that?

Absolutely.

There's two angles to that.

One of them is if you take a look at the surveys that have been done, it appears that at least 60% of the authors are actually using AI in some capacity in drafting their manuscript.

That number is likely higher.

So at least 60% likely higher.

The reporting is less than 15%.

So most people use it.

Most people don't report that they are using it.

This is a problem because then the reviewers are also a little bit at a disadvantage, because they cannot use the tool to review it.

There are a lot of risks, and I don't think they should be using it, but they are also using it.

There are no surveys that reported, but I am also 100% sure that it is being used.

I think we need to evolve in a way in which the journals have access to systems that are AI-assisted to help with reviews, but that are secure.

We use platforms that can preserve the integrity and the privacy of the system, similar like HIPAA, that can help facilitate the review without relegating the task and preserving the privacy.

I think that's where we need to start moving to.

So we have time for two more questions.

One question from the audience through the app.

Naykky, the question is how you are actually using AI for thyroid ultrasound.

Do you actually upload the images to the AI?

Is the device?

What is it?

Thank you for the question.

I think the short version there is there are different platforms or different systems.

So there are some systems that are part of the machine itself, while there are some other systems in which you actually upload the images.

Most of the systems are image-based, but there are some new ones that are actually allowing using the video for the interpretation.

So as I said, for this particular technology, last time I checked, there were six different FDA-approved applications.

So there are some variations in terms of what's the input.

Some are part of the machine, so you have to upload the pictures, and then some will mostly provide the risk of cancer, while some others are able to generate a report varying across the usual characteristics.

So I didn't go over all of them, but if you're interested, you can see there is some variation, and there's, because of those differences in the platforms, there's also some difference on the cost when acquiring it upfront and the particular hardware that you might need.

And the last question, please.

You was first.

Ah, yeah, sorry.

That's okay.

An audience member identified himself as a practicing endocrinologist from Washington State.

My question is for those who work in the health systems.

We have seen double-digit cost percentages where we're seeing health systems doing 12 to 15 percent of their line item cost of their revenue to be paying for these AI tools, whether it be in Epic or not in Epic.

What is your, what is, I mean, I don't know if you can speak to Mayo specifically, but is there anything where systems are saying, no, we're not going to pay 15 percent more, and we'd rather just hire another—

## Q&A conclusion

Naykky, you want to comment on that?

Okay.

Well, I think there, I think a lot of the applications are going to be on the administrative part, as has been discussed.

I don't think they are yet on the part of the clinical practice, as I have showcased here.

The diabetic retinopathy screening is probably one of the success stories with the CPT code and everything, but that's for care that is needed.

I think for the other tools that might be within the particular healthcare record system, there's more variability in terms of the actual benefit.

The other part, and just kind of like from some of the things that David described, at least for the scribes, so the use of the scribes has been associated with, for example, being able to bill higher for some of the notes.

So then some of the systems might be seeing some potential gain there.

So I think at the end, it also is kind of like where people are putting the value on.

Is the value on the quality of care?

Is the value on more revenue?

And so forth.

So I think it's quite complex.

So it will just be a matter of you are willing to pay X amount for what outcome.

From the data that we have so far, I think most are from the administrative perspective, and probably the scribes are one of the bigger examples.

And the data is that they actually might be leading to higher billing for the enterprise.

Well, we are up to the hour.

We want to thank the fantastic presentation, our speakers today, also the fantastic questions and your attendance.

Thank you very much for coming.

## Editorial verification sources

- ENDO 2026 child-unit slide OCR: `slides/slides_text.md`
- [University of Florida profile — Naykky Singh Ospina, MD](https://endocrinology.medicine.ufl.edu/profile/singh-ospina-naykky/)
- [ADA Standards of Care in Diabetes—2026: Retinopathy, Neuropathy, and Foot Care](https://diabetesjournals.org/care/article/49/Supplement_1/S261/163919/12-Retinopathy-Neuropathy-and-Foot-Care-Standards)
- [FDA 510(k) clearance — IDx-DR Analysis](https://www.accessdata.fda.gov/cdrh_docs/pdf20/K203629.pdf)
