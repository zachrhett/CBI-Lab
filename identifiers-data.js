/* Archive of Identifiers — educational / correlational only. Not diagnostic. */

const IDENTIFIERS = [
  // —— Cognitive ——
  {
    name: "Task-switching cost",
    domain: "cognitive",
    description: "Measurable slowing or error increase when alternating between distinct task sets. A direct operationalization of switching demand.",
    cbi: "Task Switching Frequency",
    notes: "Laboratory and workplace versions exist; high cost under time pressure compounds burden."
  },
  {
    name: "Working memory overload markers",
    domain: "cognitive",
    description: "Dropped details, re-reading, loss of place in multi-step procedures, or inability to hold goals while processing new input.",
    cbi: "Working Memory Demand",
    notes: "Observable in both self-report and performance sampling."
  },
  {
    name: "Attentional fragmentation",
    domain: "cognitive",
    description: "Difficulty sustaining focus on a single stream; rapid drift to secondary cues or notifications.",
    cbi: "Interruption Density, Task Switching",
    notes: "Often co-occurs with digital interruption environments."
  },
  {
    name: "Decision fatigue",
    domain: "cognitive",
    description: "Deterioration in decision quality or increased deferral after a long sequence of choices.",
    cbi: "Working Memory Demand, Time Pressure, Recovery Deficit",
    notes: "Correlational construct; mechanisms remain debated."
  },
  {
    name: "Rumination / perseverative cognition",
    domain: "cognitive",
    description: "Repetitive, hard-to-disengage negative thought that consumes capacity and impairs recovery periods.",
    cbi: "Working Memory Demand, Recovery Opportunity, Emotional Load",
    notes: "Transdiagnostic correlate of anxiety and depressive presentations."
  },
  {
    name: "Catastrophic appraisal",
    domain: "cognitive",
    description: "Tendency to interpret ambiguous demand or bodily signals as disastrous or uncontrollable.",
    cbi: "Emotional Load, Time Pressure",
    notes: "Links cognitive content to affective load."
  },
  {
    name: "Cognitive tunneling",
    domain: "cognitive",
    description: "Narrowing of attention under acute pressure such that peripheral but relevant information is missed.",
    cbi: "Time Pressure, Emotional Load"
  },
  {
    name: "Prospective memory failures",
    domain: "cognitive",
    description: "Forgetting to execute intended actions at the right time, especially under interruption.",
    cbi: "Interruption Density, Working Memory Demand, Task Switching"
  },

  // —— Affective ——
  {
    name: "Anxious hypervigilance",
    domain: "affective",
    description: "Persistent scanning for threat or error, with elevated baseline tension.",
    cbi: "Emotional Load, Interruption Density, Recovery Deficit",
    notes: "Correlates with anxiety-spectrum presentations; not diagnostic alone."
  },
  {
    name: "Irritability / low frustration tolerance",
    domain: "affective",
    description: "Disproportionate anger or irritation in response to minor obstacles or interruptions.",
    cbi: "Emotional Load, Time Pressure, Recovery Deficit"
  },
  {
    name: "Anhedonia (load-related)",
    domain: "affective",
    description: "Reduced capacity to experience pleasure or interest, especially after sustained high demand.",
    cbi: "Recovery Deficit, Emotional Load",
    notes: "May appear as occupational flatness or withdrawal from optional activity."
  },
  {
    name: "Emotional numbing",
    domain: "affective",
    description: "Blunted affective response as a short-term adaptation to continuous interpersonal or emotional demand.",
    cbi: "Emotional Load, Recovery Deficit",
    notes: "Familiar in high emotional-labor roles; overlaps burnout language."
  },
  {
    name: "Helplessness expectancy",
    domain: "affective",
    description: "Belief that actions will not influence outcomes, generalized from repeated uncontrollable stress.",
    cbi: "Recovery Deficit, Time Pressure, Emotional Load",
    notes: "Central to learned-helplessness models of depressive risk."
  },
  {
    name: "Affective spillover",
    domain: "affective",
    description: "Carry of work-related tension or low mood into non-work contexts.",
    cbi: "Recovery Opportunity, Emotional Load"
  },

  // —— Behavioral ——
  {
    name: "Avoidance of high-demand tasks",
    domain: "behavioral",
    description: "Postponing, delegating without need, or structuring the day to minimize difficult cognitive blocks.",
    cbi: "Working Memory Demand, Emotional Load, Time Pressure",
    notes: "Can be adaptive short-term; becomes costly when chronic."
  },
  {
    name: "Compensatory overwork",
    domain: "behavioral",
    description: "Extending hours or intensity to offset felt inefficiency, often reducing recovery further.",
    cbi: "Time Pressure, Recovery Deficit",
    notes: "Common in burnout trajectories."
  },
  {
    name: "Checking / reassurance loops",
    domain: "behavioral",
    description: "Repeated verification of work or seeking reassurance under uncertainty and load.",
    cbi: "Working Memory Demand, Emotional Load, Interruption Density",
    notes: "Stress can exacerbate obsessive–compulsive patterns without originating them."
  },
  {
    name: "Social withdrawal",
    domain: "behavioral",
    description: "Reduced optional social contact as capacity is reserved for mandatory demand.",
    cbi: "Recovery Deficit, Emotional Load"
  },
  {
    name: "Micro-break omission",
    domain: "behavioral",
    description: "Skipping brief recovery opportunities (pause, movement, gaze rest) during continuous work.",
    cbi: "Recovery Opportunity, Time Pressure"
  },
  {
    name: "Substance or stimulus reliance for regulation",
    domain: "behavioral",
    description: "Increased use of caffeine, nicotine, alcohol, or other agents to push through or wind down from load.",
    cbi: "Recovery Deficit, Emotional Load, Time Pressure",
    notes: "Correlational risk pathway toward harmful use; not a diagnosis."
  },

  // —— Somatic ——
  {
    name: "Sleep onset / maintenance difficulty",
    domain: "somatic",
    description: "Trouble falling or staying asleep in the context of unresolved cognitive or emotional load.",
    cbi: "Recovery Opportunity, Emotional Load, Working Memory Demand",
    notes: "Bidirectional with next-day CBI."
  },
  {
    name: "Muscular tension & pain",
    domain: "somatic",
    description: "Neck, shoulder, jaw, or back tension associated with sustained arousal and desk-bound high demand.",
    cbi: "Emotional Load, Time Pressure, Recovery Deficit"
  },
  {
    name: "Autonomic arousal signs",
    domain: "somatic",
    description: "Palpitations, sweating, gastrointestinal upset, or restlessness during or after high-load periods.",
    cbi: "Emotional Load, Time Pressure",
    notes: "Somatic correlates of stress physiology; interpret in full clinical context only."
  },
  {
    name: "Fatigue that rest does not fully clear",
    domain: "somatic",
    description: "Persistent tiredness disproportionate to recent sleep, suggesting cumulative allostatic cost.",
    cbi: "Recovery Deficit, Dynamic accumulation",
    notes: "Aligns with the dynamic (allostatic) component of the CBI model."
  },
  {
    name: "Appetite or intake disruption",
    domain: "somatic",
    description: "Skipping meals, stress eating, or irregular intake under time pressure and cognitive absorption.",
    cbi: "Time Pressure, Emotional Load, Recovery Opportunity"
  },

  // —— Interpersonal / occupational ——
  {
    name: "Depersonalization toward recipients of work",
    domain: "interpersonal",
    description: "Emotional distancing or cynical stance toward customers, patients, students, or colleagues.",
    cbi: "Emotional Load, Recovery Deficit",
    notes: "Core burnout dimension in Maslach-type models."
  },
  {
    name: "Reduced professional efficacy",
    domain: "interpersonal",
    description: "Sense of ineffectiveness or inability to make a difference despite effort.",
    cbi: "Recovery Deficit, Working Memory Demand, Time Pressure",
    notes: "Burnout dimension; correlates with sustained high burden."
  },
  {
    name: "Conflict sensitivity",
    domain: "interpersonal",
    description: "Heightened reactivity to interpersonal friction when cognitive reserve is low.",
    cbi: "Emotional Load, Interruption Density, Recovery Deficit"
  },
  {
    name: "Help-seeking inhibition",
    domain: "interpersonal",
    description: "Reluctance to request support, information, or relief even when available.",
    cbi: "Emotional Load, Helplessness-related appraisals",
    notes: "Can reflect culture, stigma, or internalized demand."
  },
  {
    name: "Role overload / role conflict",
    domain: "interpersonal",
    description: "Incompatible expectations across roles (work–family, multiple supervisors, care + production).",
    cbi: "Task Switching, Time Pressure, Emotional Load"
  },

  // —— Recovery ——
  {
    name: "Psychological detachment failure",
    domain: "recovery",
    description: "Inability to mentally disengage from work demand during off-time.",
    cbi: "Recovery Opportunity, Emotional Load, Working Memory Demand",
    notes: "Key recovery research construct (Sonnentag and others)."
  },
  {
    name: "Low recovery opportunity",
    domain: "recovery",
    description: "Structural absence of protected low-demand time, sleep window, or restorative activity.",
    cbi: "Recovery Opportunity (direct)",
    notes: "Input factor in the CBI model; strongest lever for dynamic load reduction."
  },
  {
    name: "Weekend / off-day non-recovery",
    domain: "recovery",
    description: "Off-days that fail to reduce latent load because of residual work cognition or second-shift demand.",
    cbi: "Recovery Opportunity, Dynamic accumulation"
  },
  {
    name: "Micro-recovery use",
    domain: "recovery",
    description: "Presence or absence of brief restorative practices during the work period (breath, movement, gaze change).",
    cbi: "Recovery Opportunity, Time Pressure"
  },

  // —— Dynamic / historical constructs ——
  {
    name: "Allostatic load (cognitive framing)",
    domain: "dynamic",
    description: "Cumulative cost of repeated adaptation to demand when recovery is insufficient. The dynamic term in CBI is a simplified educational analogue.",
    cbi: "Dynamic accumulation mode",
    notes: "Originally physiological (McEwen); extended here as a process metaphor for cognitive strain."
  },
  {
    name: "Learned helplessness",
    domain: "dynamic",
    description: "Acquired expectancy that outcomes are independent of action, following exposure to uncontrollable stressors.",
    cbi: "Recovery Deficit, Emotional Load, Time Pressure",
    notes: "Classic experimental tradition (Seligman); maps to depressive risk, not a diagnosis by itself."
  },
  {
    name: "Stress–vulnerability interaction",
    domain: "dynamic",
    description: "Model in which constitutional or developmental vulnerability plus sufficient stress load increases probability of severe episodes (including, in high-vulnerability cases, psychosis).",
    cbi: "Sustained high dynamic CBI",
    notes: "Stress is treated as precipitant/modulator, not primary cause of psychotic disorders for most people."
  },
  {
    name: "Neurosis (historical term)",
    domain: "dynamic",
    description: "Older clinical grouping for anxiety, depressive, and obsessive presentations without psychosis. Retained here only as historical vocabulary.",
    cbi: "—",
    notes: "Not a current diagnostic category in major manuals; do not use as a label for individuals."
  },
  {
    name: "Burnout (occupational construct)",
    domain: "dynamic",
    description: "Syndrome of exhaustion, cynicism, and reduced efficacy in response to chronic workplace stress.",
    cbi: "Emotional Load, Recovery Deficit, Time Pressure",
    notes: "Recognized in ICD-11 as an occupational phenomenon; not equivalent to a psychiatric diagnosis of depression."
  },
  {
    name: "Ego depletion (contested)",
    domain: "dynamic",
    description: "Hypothesis that self-control draws on a limited resource that can be temporarily exhausted. Empirical status is debated; the subjective experience of regulatory fatigue is widely reported.",
    cbi: "Emotional Load, Working Memory Demand",
    notes: "Include as a theoretical identifier, not as settled mechanism."
  },
  {
    name: "Defense rigidity under load",
    domain: "dynamic",
    description: "Psychoanalytic/dynamic observation that under prolonged strain, more flexible coping may give way to rigid or costly defenses.",
    cbi: "Emotional Load, Recovery Deficit",
    notes: "Educational lens only; not an operational clinical test."
  },
  {
    name: "Compulsion to repeat overload patterns",
    domain: "dynamic",
    description: "Re-enactment of high-demand or self-defeating work patterns despite insight, conceptualized in dynamic traditions as repetition.",
    cbi: "Task Switching, Recovery Deficit, Emotional Load",
    notes: "Interpretive construct; pair with behavioral identifiers when studying change."
  }
];
