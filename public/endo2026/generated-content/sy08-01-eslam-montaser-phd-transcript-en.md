# Terminology-QA Edited Transcript

- Conference: ENDO 2026
- Session code: SY08
- Presentation ID: SY08-01
- Presentation: CGM-Based Dynamic Markers and Machine Learning for Tracking Diabetes Progression
- Primary speaker: Eslam Montaser, PhD
- Source: `audio.mp3` (reviewed child boundary 00:00–30:03 of the source session)
- Raw transcript: `transcript_gpt-transcribe.md`
- Model: `gpt-transcribe`
- Language: English
- Official VTT: not available for this child unit
- Slide evidence: 44 time-bounded, OCR-complete slides
- Editorial status: medical terminology, mathematical nomenclature, proper nouns, study designs, numerals, units, and paragraphing checked against the reviewed presentation metadata, time-bounded slide OCR, and primary literature. The transcript is not summarized or translated, and the presentation's Q&A is retained.

## 00:00:00.000–00:20:00.000

[Session co-chair]

Good morning, everyone.

Welcome to Endocrine Society meeting.

We are about to start our session, “In Range: Gadgets for a New Era of Precision Medicine in Glucose Management.”

I'm a pediatric endocrinologist, associate professor in the Department of Pediatrics, University of California, San Francisco.

I have the pleasure of co-chairing this session with my colleague, Dr. Gracia Aleppo.

[Gracia Aleppo, MD]

Good morning, everyone.

Welcome to Chicago.

Sorry about the weather.

Can't do anything about it.

I'm a professor of medicine, Northwestern University in Chicago, adult endocrinologist who loves technology.

So it's going to be a fantastic session.

We welcome you to just take your seats, and please mute your phone so there is no bells, whistles, alarms.

And every speaker will have 25 minutes plus five minutes of question.

If you want to ask a question, please go to the microphones, state your name where you're from, and state your question.

You also have the option of using the app, Endocrine Society meeting app.

You can send your question to us, and I can read them to our speaker.

So we start with our first presentation by Dr. Eslam Montaser, who is an assistant professor at Indiana University: “CGM-Based Dynamic Markers and Machine Learning for Tracking Diabetes Progression.”

Dr. Montaser, the stage is yours.

Thank you.

[Eslam Montaser, PhD]

Good morning, everyone.

First of all, thanks for the kind invitation and for the opportunity to speak today at ENDO meetings.

So it's a pleasure to be here today.

Today I will share our work on using CGM, especially CGM-based dynamic analysis and machine learning, to help detect metabolic decline at an early stage, much earlier than traditional clinical measures.

For me, for disclosure, nothing to disclose.

### Why OGTT is not enough

I want to start with the question of why OGTT is not enough.

We want to start with one important question: how do we currently monitor diabetes?

In most cases, we rely on measurements such as fasting glucose, HbA1c, and oral glucose tolerance tests (OGTTs), and of course all are extremely valuable tests.

But they share one important limitation.

They provide us only one value and a snapshot of metabolism.

So the patient comes to clinic, we perform one test, we get one value, and then we wait months or years for the next visit.

During that entire period, metabolism may already have changed, but we simply cannot see it.

Given this limitation, the question now becomes: can CGM reveal those changes earlier, before overt metabolic decline?

And I think to answer that question, we need to stop thinking only about glucose level.

As well for CGM, as you know well, CGM continuously records glucose throughout the day.

So throughout the day, we get CGM data, and most of us until this moment summarize it through using static metrics like looking for mean glucose, time above range, time below range, and of course all our useful metrics.

But they tell us how much glucose there is, but don't tell us how glucose behaves.

Glucose behavior may change long before glucose levels become abnormal, before dysglycemia.

And our hypothesis here was that glucose dynamics may provide earlier evidence of metabolic decline.

So let's see.

I like to think about CGM at three levels.

The first, and most familiar, uses static glucose measurements to answer the question: how high is glucose?

How much?

At the second level, we move to dynamics and ask: how does glucose move?

Is it stable?

Does it fluctuate normally?

So this is an important question here.

At the third level, we combine static metrics, dynamic metrics, or both in machine-learning models to predict the risk of disease progression, especially diabetes progression.

This presentation will show that dynamic metrics and machine-learning models could help detect metabolic decline before dysglycemia thresholds are crossed.

So our objective was straightforward.

We wanted to move beyond traditional CGM metrics and develop biomarkers that capture the dynamics of CGM data.

Specifically, we will focus on two complementary biomarkers.

The first is CGM entropy rate (ER), which is based on the entropy of the dynamical system representing diabetes.

The second is Poincaré plot ellipse area (S), which visualizes and quantifies the attractor of the dynamical system representing diabetes.

We will see both are different mathematical frameworks, but have the same biological message.

And of course, if you want more information about both CGM-based dynamic markers, just go ahead, scan the QR code and get more information about both CGM-based dynamic markers.

### Entropy rate as a dynamic biomarker

Before we go through entropy rate, the first marker, we can simplify it without going deeply into the mathematics.

The entropy-rate calculation follows several mathematical steps.

The first is encoding CGM data as strings of letters.

As we can see in this plot, we convert each CGM segment into a letter, and each letter represents a glycemic state.

Here we define eight glycemic states, A through H.

State A is a glucose value below 54 mg/dL, B is 54 to 69 mg/dL, C is 70 to 120 mg/dL, and so on through H, above 250 mg/dL.

An individual can move during the day from one glycemic state to another.

Second, we compute the transition probability matrix.

From eight glycemic states, we obtain an 8 × 8 transition probability matrix representing the probability of moving from one glycemic state to another.

For each person, we have multiple daily CGM profiles.

From the transition probabilities, we build a weighted transition probability matrix and compute the stationary distribution—the proportion of time the person spends in each glycemic state.

Integrating all in one equation, we get the entropy rate as a marker for detecting progression of diabetes.

Let's see some examples here.

What is the difference?

The healthy individual has organized transition patterns.

Here we have one week of data from a healthy individual and the weighted transition probability matrix.

This person spends the majority of the time in state C, the favorable glycemic state.

Of course, he can move a little bit, but away from hyperglycemia.

In contrast, if we look at the plot from an individual with diabetes, diabetes produces more random patterns; the person can jump between different glycemic states. This is the difference between healthy and diabetic patterns.

What about an autoantibody-negative individual versus an individual with two or more autoantibodies?

The same.

The autoantibody-negative individual stays in state C for the majority of the time, whereas the autoantibody-positive individual can jump among states and move into hyperglycemia.

And here we could say biomarker for tracking progression over time.

We need the time here because we're talking about progression.

And here is a wonderful example.

This participant underwent an OGTT in March 2016, and the OGTT was completely normal, with a 2-hour glucose of 109 mg/dL.

In the case if we're using traditional measures or testing, we would say this guy is sure to be in good state, good and safe away from diabetes.

However, the entropy rate was elevated at 0.93 bits per transition, and nearly three years later, in February 2019, this person was diagnosed with type 1 diabetes.

That observation gave us like a message: we need to think well about using CGM.

CGM dynamics here could be useful for detecting metabolic deterioration years before traditional clinical measures or diagnostic criteria such as the OGTT reveal it.

### Poincaré plot ellipse area

The next framework is a different marker based on the area of the Poincaré plot ellipse.

As I mentioned, this marker also examines how glucose fluctuates over time.

The plot compares each CGM point with the next one.

If we have a compact ellipse, that indicates a stable system and stable glucose regulation.

If there is more spread, the ellipse is larger.

By combining short- and long-term variability into one measure, the area of the ellipse, a small area indicates stable, healthy regulation. We could also use both markers to assess treatment effectiveness and glycemic control.

The Poincaré plot ellipse area transforms CGM variability into a measure of metabolic instability.

Entropy rate serves as a predictability marker, while the Poincaré plot ellipse area serves as an instability marker.

So this is the difference.

Applying Poincaré plot ellipse area to healthy and diabetic individuals shows the same distinction.

For the healthy individual, the area is compact, reflecting stability and time spent in favorable glycemic states.

And for diabetic, we have, it's very clear the difference.

The same if we're talking about antibody negative versus positive.

Here we can see that the autoantibody-positive individual's CGM data are more widely spread, suggesting the beginning of metabolic decline.

So this is a way for tracking progression over time.

This example shows panels A and B for an autoantibody-negative individual and panels C and D for an autoantibody-positive individual, using both biomarkers.

As mentioned before, both markers convey the same message: glucose regulation and metabolic decline can be detected through these two approaches.

Using different data sets, we can examine progression from autoantibody-negative, to one autoantibody, to two or more autoantibodies, and then to established type 1 diabetes.

The curves clearly rise, showing how both markers could track disease progression.

So both markers, we could say, have the same message, looking for glucose behavior rather than glucose levels.

Can we apply both markers in different disease?

The answer is yes.

### Application to cystic fibrosis-related diabetes

In the cystic fibrosis population, we could use these methods to detect cystic fibrosis-related diabetes (CFRD) at an early stage, just as in type 1 or type 2 diabetes.

I want to thank Melissa Putman for supporting us with the data set here.

We use data from CF population with three different categories.

Even though we have a cross-sectional data set here, it is still informative.

We built a similar Poincaré plot-based biomarker, termed the CGM-derived glucose dynamic instability index (GDI), and then converted it into a CFRD risk score to make it easier to interpret clinically.

And this is some examples here, starting with to look for the progression over time.

We have three examples: normal glucose tolerance, abnormal glucose tolerance, and established CFRD.

Is there a significant difference?

Of course, it's significant difference.

Even we have a small sample size, we get some overlaps, as we can see between normal and abnormal.

It's expected in normal life.

And of course, to prove the benefit of using GDI as a marker for tracking progression in CFRD, we need a long data set with follow-up at least from three to five years.

Could we compare and classify normal glucose tolerance, abnormal glucose tolerance, and CFRD?

I think we have good results here.

We could differentiate CFRD from normal or abnormal glucose tolerance, with high areas under the receiver operating characteristic curve.

That's good.

For CFRD risk, GDI is converted into a single number representing the probability of risk.

A value very close to one indicates a high probability of CFRD.

### Machine learning with CGM features

As mentioned at the beginning, CGM provides both static and dynamic measures. We can use either type of measure, or combine them in machine-learning models, to predict risk or identify people at high risk of developing type 1 diabetes.

In the first paper, we used static CGM data from 60 healthy relatives of people with type 1 diabetes: 21 were autoantibody negative, 18 had one islet autoantibody, and 21 had two or more islet autoantibodies. They completed a 1-week CGM home test.

We examined three different scenarios: all CGM traces, overnight traces from 12:00 AM to 6:00 AM, and postprandial traces after standardized liquid mixed meals.

We applied the CGM features and metrics from those three scenarios to different machine-learning models to classify autoantibody-negative versus autoantibody-positive participants and identify those at higher risk of developing type 1 diabetes.

Without going deeply into the mathematics and numbers, we obtained good results for classifying people at higher immunological risk of type 1 diabetes.

### Machine learning with CGM and genetic profiling

The second paper used static CGM metrics from the same study, but only among the autoantibody-positive groups and only during the postprandial period. The goal was to classify participants with one autoantibody versus those with two or more autoantibodies.

Here we added a new component: the type 1 diabetes genetic risk score.

There were 39 participants.

## 00:20:00.000–00:30:03.000

The 39 healthy relatives comprised two autoantibody-positive groups: 18 with one islet autoantibody and 21 with two or more. We again used a 1-week CGM home test, but focused on CGM features after a standardized liquid mixed meal and applied machine learning to classify one versus two or more autoantibodies, thereby enhancing immunological detection of early type 1 diabetes.

As expected, the genetic risk score was uncorrelated with CGM metrics such as time above range and coefficient of variation. That is useful because the genetic score and CGM metrics provide complementary information.

Combining them in the machine-learning model improved performance. The linear support vector machine model with recursive feature elimination achieved an average area under the receiver operating characteristic curve of 0.93, compared with 0.80 when all features were used.

### Conclusions

The distinction between static and dynamic measures is clear. CGM-based dynamic markers could help track disease progression over time, unlike static metrics that summarize glucose values within or above defined ranges.

Dynamic CGM markers may capture metabolic decline before traditional measures. They also add information about changes across disease stages because they incorporate time, which is essential when tracking progression.

We want to detect stage 2 type 1 diabetes early by identifying dysglycemia as it develops, rather than waiting until established hyperglycemia.

Integrating static CGM markers, dynamic CGM markers, or both into machine-learning models could improve risk stratification.

The final take-home message is that CGM contains far more information than glucose level alone.

We should move beyond looking at a single number. We can use the dynamics in CGM data to track progression.

Dynamic glucose behavior may serve as an early digital biomarker of metabolic decline.

That is the most important message here.

Thank you for your time and attention today. I'm open to any questions.

### Q&A

[Session co-chair]

Thank you for your wonderful presentation.

Are there any questions from the audience?

I can start with one question that was submitted here. Do you think over-the-counter CGM devices that record every 15 minutes provide enough data to detect these differences?

[Eslam Montaser, PhD]

That's a good question.

Using CGM as a screening or progression-tracking tool is different from using it in people with diabetes.

For individuals with diabetes, we are looking for at least two weeks of data. But for otherwise healthy people at risk of diabetes, I think one week is enough to detect stage 2 type 1 diabetes at an early stage.

[Audience member]

Very interesting presentation. Are you going to develop a calculator or app so that providers can input CGM data and calculate the index you showed, such as the difference between 0.21 and 0.93?

[Eslam Montaser, PhD]

That's a good question.

To translate this mathematical framework into clinical practice, we need to convert the framework into software. A user could enter CGM data and obtain an entropy-rate marker or Poincaré plot marker as a single number.

From that number, we could classify people at high risk of developing type 1 diabetes. Software is the next step.

[Session co-chair]

I have one question of my own. From a pediatric endocrinologist's point of view, what proportion of the data you showed came from children?

The risk for a five-year-old with one positive autoantibody is very different from that for a 14-year-old. It is not only about time; everything else matters as well. How reliably can these data be translated to different age groups?

[Eslam Montaser, PhD]

Of course, early screening for children is better. For one week of data, it would be the same for children or adults.

It should also be the same for different CGM devices because the established framework could be useful across cases. We could still use it.

[Session co-chair]

We have one more submitted question. In private practice, how accessible are these CGM models? How can we use them? Are they clinically applicable?

[Eslam Montaser, PhD]

As I mentioned, we receive the CGM data, transform them, obtain one number, and use it to classify people.

[Session co-chair]

I'm sorry; from where I'm sitting, I did not see the line. Please go ahead.

[Audience member]

Thank you. I am a pediatric endocrinologist. Just a quick question about practical use.

Did you find differences among CGM brands or generations in your studies, specifically between devices that use raw data and those that apply algorithmic smoothing?

I imagine that raw data would produce a much higher entropy rate because, when measuring something dynamically, there are more minute-to-minute or five-minute fluctuations.

[Eslam Montaser, PhD]

That's a good question.

As I mentioned, we start with raw CGM data—the complete daily profile—and encode them differently. We then compute the transition probability matrix for entropy rate or use the Poincaré plot because we are looking at stability and predictability.

Both frameworks use the raw CGM data directly, and we can compute the markers from whatever raw CGM data we have.

[Audience member]

Thank you. That was beautiful science.

You may have answered this already, but I want to make sure: for entropy rate as a predictability marker and ellipse area as an instability marker, did you say that one week of data is enough?

[Eslam Montaser, PhD]

Yes, one week is enough.

We are talking about healthy people without diabetes, even if they have one or two autoantibodies.

As we know, stage 1 type 1 diabetes begins with two or more autoantibodies but without dysglycemia. When we talk about screening or tracking progression at an early stage, it is better to identify people at stage 1.

At stage 2, there are already two or more autoantibodies plus dysglycemia. In that case, we could enroll people in a drug or intervention arm, such as teplizumab, which can delay the onset of stage 3 type 1 diabetes.

[Audience member]

I was thinking about cost-effectiveness. Could this replace OGTT screening in TrialNet?

[Eslam Montaser, PhD]

Of course, staging is still performed with the OGTT.

[Session co-chair]

One more question, and then we will end this section. Please go ahead.

[Audience member]

Great talk. Do you have any sense of stability over time—meaning, if you measure it now and again a year or two from now, what happens over that longer period?

[Eslam Montaser, PhD]

That's a good question.

As with the OGTT, we could start with a baseline measurement and repeat it after six months or one year. That is how we would track progression.

We could also use one week of CGM at baseline to identify who may be at high risk after a specific period. It depends, but follow-up is preferable, for example, for people with stage 1 type 1 diabetes.

[Session co-chair]

Thank you so much, doctor. I appreciate it.

[Eslam Montaser, PhD]

Thank you so much.

## Editorial verification sources

- Montaser E, Farhy LS, Kovatchev BP. “CGM-Based Dynamic Markers of Glycemic Progression through Pre-Diabetes.” *The Journal of Clinical Endocrinology & Metabolism*. DOI: [10.1210/clinem/dgae379](https://doi.org/10.1210/clinem/dgae379).
- Montaser E, Breton MD, Brown SA, et al. “Predicting Immunological Risk for Stage 1 and Stage 2 Diabetes Using a 1-Week CGM Home Test, Nocturnal Glucose Increments, and Standardized Liquid Mixed Meal Breakfasts, with Classification Enhanced by Machine Learning.” *Diabetes Technology & Therapeutics*. DOI: [10.1089/dia.2023.0064](https://doi.org/10.1089/dia.2023.0064).
- Montaser E, Farhy LS, Rich SS. “Enhancing Type 1 Diabetes Immunological Risk Prediction with Continuous Glucose Monitoring and Genetic Profiling.” *Diabetes Technology & Therapeutics*. DOI: [10.1089/dia.2024.0496](https://doi.org/10.1089/dia.2024.0496).
