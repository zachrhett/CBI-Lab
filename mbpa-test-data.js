/* MBPA preference items — educational self-reflection only. Not a clinical or employment test. */
const MBPA_ITEMS = [
  { id: 'ei1', dim: 'EI', a: { pole: 'E', text: 'I gain energy from talking ideas through with others.' }, b: { pole: 'I', text: 'I gain energy from thinking ideas through on my own.' } },
  { id: 'ei2', dim: 'EI', a: { pole: 'E', text: 'In a new group, I usually introduce myself and join in.' }, b: { pole: 'I', text: 'In a new group, I usually observe before engaging.' } },
  { id: 'ei3', dim: 'EI', a: { pole: 'E', text: 'A full day of meetings can leave me stimulated if the content is good.' }, b: { pole: 'I', text: 'A full day of meetings usually leaves me needing quiet recovery.' } },
  { id: 'ei4', dim: 'EI', a: { pole: 'E', text: 'I prefer to work through problems by discussing them.' }, b: { pole: 'I', text: 'I prefer to work through problems before I discuss them.' } },
  { id: 'ei5', dim: 'EI', a: { pole: 'E', text: 'Breadth of contact with many people feels natural.' }, b: { pole: 'I', text: 'Depth with a few people feels more natural than breadth.' } },

  { id: 'sn1', dim: 'SN', a: { pole: 'S', text: 'I trust concrete facts and what has worked before.' }, b: { pole: 'N', text: 'I trust patterns, implications, and what could be possible.' } },
  { id: 'sn2', dim: 'SN', a: { pole: 'S', text: 'I prefer step-by-step instructions when learning something new.' }, b: { pole: 'N', text: 'I prefer the big picture first, then fill in details as needed.' } },
  { id: 'sn3', dim: 'SN', a: { pole: 'S', text: 'I notice practical details others often miss.' }, b: { pole: 'N', text: 'I notice connections and meanings others often miss.' } },
  { id: 'sn4', dim: 'SN', a: { pole: 'S', text: '“What is actually happening now” is my starting point.' }, b: { pole: 'N', text: '“What this might mean or become” is my starting point.' } },
  { id: 'sn5', dim: 'SN', a: { pole: 'S', text: 'I like work that produces tangible, finished results.' }, b: { pole: 'N', text: 'I like work that invents or reframes how things could work.' } },

  { id: 'tf1', dim: 'TF', a: { pole: 'T', text: 'When deciding, I prioritize consistency and logical criteria.' }, b: { pole: 'F', text: 'When deciding, I prioritize people and values impact.' } },
  { id: 'tf2', dim: 'TF', a: { pole: 'T', text: 'Direct critique feels useful if it improves the work.' }, b: { pole: 'F', text: 'Critique lands better when it also protects the relationship.' } },
  { id: 'tf3', dim: 'TF', a: { pole: 'T', text: 'I am more convinced by impersonal analysis.' }, b: { pole: 'F', text: 'I am more convinced when the human context is included.' } },
  { id: 'tf4', dim: 'TF', a: { pole: 'T', text: 'Fairness means applying the same rules to everyone.' }, b: { pole: 'F', text: 'Fairness means considering individual circumstances.' } },
  { id: 'tf5', dim: 'TF', a: { pole: 'T', text: 'I default to problem-first language under stress.' }, b: { pole: 'F', text: 'I default to people-first language under stress.' } },

  { id: 'jp1', dim: 'JP', a: { pole: 'J', text: 'I prefer a clear plan and decided milestones.' }, b: { pole: 'P', text: 'I prefer keeping options open as long as useful.' } },
  { id: 'jp2', dim: 'JP', a: { pole: 'J', text: 'Deadlines help me; unfinished loops bother me.' }, b: { pole: 'P', text: 'I work in bursts near deadlines; open loops are tolerable.' } },
  { id: 'jp3', dim: 'JP', a: { pole: 'J', text: 'I like environments with structure and predictable process.' }, b: { pole: 'P', text: 'I like environments that allow improvisation and flexibility.' } },
  { id: 'jp4', dim: 'JP', a: { pole: 'J', text: 'I feel better once a decision is made.' }, b: { pole: 'P', text: 'I feel better when I can still revise the decision.' } },
  { id: 'jp5', dim: 'JP', a: { pole: 'J', text: 'I pack and prepare ahead; surprises are costly.' }, b: { pole: 'P', text: 'I adapt in the moment; over-preparation can feel wasteful.' } }
];
