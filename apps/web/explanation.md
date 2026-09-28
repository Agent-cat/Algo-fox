# Teacher Classroom Analytics Dashboard - Complete Formula & Technical Deep-Dive

This document provides an exhaustive, granular breakdown of how all performance scores, tag mastery scores, and risk scores are calculated, what exact data criteria are included vs. excluded, how contest and practice data interact, and recommendations for future features.

---

## 🧮 1. How Tag Mastery Score (0–100%) Is Calculated

The **Tag Mastery Score** evaluates student proficiency on a specific problem tag (e.g., *Arrays*, *Dynamic Programming*, *Graphs*).

### A. Data Criteria & Filter Conditions
- **Included Data**: Submissions made in `SUBMIT` mode only (code executions in `RUN` mode are excluded to prevent skewing stats during scratchpad testing).
- **Scope**: All problems associated with the specific tag that belong to classroom assignments or classroom contests.
- **Null / Zero Case**: If a student has zero `SUBMIT` attempts on a tag, `computeTagMastery()` returns **0%** immediately via early-exit.

---

### B. Mathematical Formula & Component Weighting

The total score is a weighted sum of **5 components**:

$$\text{Tag Mastery} = (\text{Correctness} \times 0.40) + (\text{Difficulty} \times 0.20) + (\text{Recency} \times 0.20) + (\text{Repeat Penalty} \times 0.10) + (\text{Coverage} \times 0.10)$$

#### 1. Correctness Rate (40% Weight)
- **Formula**: $\frac{\text{ACCEPTED Submissions}}{\text{Total SUBMIT Submissions}} \times 100$
- **Purpose**: Evaluates raw accuracy across all submit attempts for that tag.

#### 2. Difficulty-Weighted Score (20% Weight)
- **Weights Applied**:
  - `EASY`: $1\times$
  - `MEDIUM`: $2\times$
  - `HARD`: $3\times$
  - `CONCEPT`: Skipped / Excluded from difficulty weighting.
- **Formula**: $\frac{\sum \text{Weighted Accepted Points}}{\sum \text{Weighted Total Points}} \times 100$
- **Fallback**: If no problems of type Easy/Medium/Hard exist, it falls back to the raw Correctness Rate.

#### 3. Recency Rate (20% Weight)
- **Cutoff Window**: Last **30 days** (`recentCutoffDays = 30`).
- **Formula**: $\frac{\text{ACCEPTED Submissions in last 30 days}}{\text{Total Submissions in last 30 days}} \times 100$
- **Fallback**: If the student has zero submissions in the last 30 days, the Recency component contributes **0 points**.

#### 4. Repeat Attempts Penalty (10% Weight)
- **Metric**: Calculates average submit attempts taken before reaching the *first* `ACCEPTED` result on a problem.
- **Penalty Formula**: $\text{Penalty} = \min(100, \max(0, (\text{Avg Attempts Before Accepted} - 1) \times 20))$
- **Component Score**: $100 - \text{Penalty}$
- **Effect**: If a student solves a problem on the 1st try, penalty is 0 (100 pts). Each additional attempt costs 20 points off this 10% bucket.

#### 5. Tag Coverage Rate (10% Weight)
- **Formula**: $\min\left(100, \frac{\text{Distinct Problems Attempted in Tag}}{\text{Total Problems in Tag}} \times 100\right)$
- **Purpose**: Rewards students who attempt a broad range of problems within the tag rather than repeatedly solving a single problem.

---

### C. Tag Categorization Labels
The computed average tag score across all classroom students determines the tag's health status:
- **Struggling** (Red): Average Score $< 40\%$
- **Developing** (Amber): Average Score between $40\%$ and $69.9\%$
- **Proficient** (Green): Average Score $\ge 70\%$

---

## ⚠️ 2. How Risk Score (0–100) Is Calculated

The **Risk Score** measures how urgently a student needs teacher intervention. Higher scores represent higher risk. Students with a **Risk Score $\ge 60$** are flagged as **At-Risk**.

### A. Component Breakdown & Exact Weights

| Risk Factor Component | Weight | Max Contribution | Exact Calculation Criteria |
|---|---|---|---|
| **Low Tag Mastery** | 30% | 30.0 pts | $(100 - \text{Average Mastery Across All Tags}) \times 0.30$ |
| **Low 14-Day Accuracy** | 20% | 20.0 pts | If 0 submissions in 14 days $\rightarrow$ **20.0 pts**. Else $(100 - \text{Accuracy}_{14d}) \times 0.20$ |
| **Inactivity Duration** | 15% | 15.0 pts | $\min\left(\frac{\text{Days Since Last SUBMIT}}{14}, 1.0\right) \times 15.0$ |
| **Repeated Failures** | 15% | 15.0 pts | $\frac{\text{Problems with } \ge 3 \text{ Fails \& No ACCEPTED}}{\max(\text{Total Classroom Problems}, 1)} \times 15.0$ |
| **Incomplete Assignments** | 10% | 10.0 pts | $\frac{\text{Not Started + Overdue Assignments}}{\max(\text{Total Assignments}, 1)} \times 10.0$ |
| **Declining Performance** | 10% | 10.0 pts | Triggers **10.0 pts** if $(\text{Accuracy}_{\text{last 7d}} < \text{Accuracy}_{\text{prev 7d}} - 20\%)$, else **0 pts**. |

### B. Top 3 Factor Selection
For every student flagged at-risk ($\ge 60$), the server action sorts all 6 factors by raw point contribution descending and attaches the **top 3 factor pills** (e.g. *"14 Days Inactive"*, *"Low Tag Mastery (32%)"*, *"2 Incomplete Assignments"*) to render on the student card.

---

## 🏆 3. Contests vs. Practice Data Handling

### A. What Is Included in Contest Analytics?
- **Participation Status**:
  - **Participated**: Student opened/entered the contest session.
  - **Not Participated**: Student did not join the contest.
- **Contest Score**: Sum of problem scores for all problems solved with `ACCEPTED` status **during contest timeframe** ($[\text{startTime}, \text{endTime}]$). Submissions made after `endTime` are excluded from contest score.
- **Contest Rank**:
  1. Sorted descending by **Contest Score**.
  2. Ties broken by **Earliest Time of Last ACCEPTED Submission** during the contest.

### B. Practice Accuracy Comparison Column
- Alongside contest performance, the dashboard computes **Practice Accuracy**:
  - Counts all `SUBMIT` mode submissions by the student outside of contests across all practice problems.
  - Gives teachers insight into whether a student suffers from contest anxiety (high practice accuracy, low contest score) or general lack of practice.

---

## 📊 4. Overview Metric Aggregations

1. **Total Students**: Total count of active students enrolled in the classroom (`_StudentClassrooms` relation).
2. **Problems Solved**: Distinct count of problems where the student achieved at least one `ACCEPTED` status in `SUBMIT` mode.
3. **Overall Accuracy**: $\frac{\text{Total ACCEPTED Submissions}}{\text{Total SUBMIT-mode Submissions}} \times 100$ (rounded to 1 decimal place).
4. **Average Tag Mastery**: Mean of all calculated tag mastery averages across the classroom.
5. **At-Risk Count**: Count of students whose composite Risk Score is $\ge 60$.

---

## 🚀 5. Recommended Feature Enhancements to Make It Even Better

To elevate the dashboard from standard analytics to a world-class enterprise learning system, here are top recommended feature additions:

### 1. 🤖 AI-Powered Intervention Recommendations
- **Concept**: Integrate Gemini API to generate personalized recommendations per at-risk student.
- **How it works**: Send the student's top risk factors, weak tags, and past failed test cases to Gemini to generate actionable advice (e.g., *"Assign 3 Easy Array problems on Two-Pointer technique before Friday"*).

### 2. 📅 Historical Performance Trend Line Charts
- **Concept**: Add time-series area charts showing tag mastery and accuracy changes over 4-week / 8-week intervals.
- **Value**: Allows teachers to track whether a classroom improved after a review session.

### 3. 🎯 One-Click Bulk Assignment Creation from Weak Tags
- **Concept**: Add a *"Remediate Weak Tags"* button directly on Struggling tag cards.
- **How it works**: Auto-generates a targeted assignment filled with Easy/Medium problems from the struggling tag and assigns it only to students in the Struggling range.

### 4. 📤 Automated PDF & Excel Performance Export Reports
- **Concept**: Allow teachers to download a formatted PDF summary or detailed XLSX report for parent-teacher conferences or accreditation compliance.

### 5. 🔔 Real-Time Alert Notifications for Teachers
- **Concept**: Trigger an alert notification when a student's risk score crosses 75 or when accuracy drops abruptly after a new assignment.
