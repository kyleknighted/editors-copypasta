import type { CopypastaTemplate } from '../types/copypasta';

export const templates: CopypastaTemplate[] = [
  {
    id: '1',
    title: 'Sway the Vote',
    paragraphs: [
      {
        id: '1',
        text: 'In an effort to sway {votes}, I am vehemently against {againstThis}, I not only find no enjoyment in it, I actively loath doing it. So, while I support the team doing the {againstThis} thing if there is majority vote to go do it, I would most likely excuse myself from {event}.',
        inputs: [
          {
            id: 'againstThis',
            placeholder: 'Thing you don\'t want to do',
            type: 'text',
            required: true
          },
          {
            id: 'event',
            placeholder: 'Event Name',
            type: 'text',
            default: 'the event',
            required: true
          },
          {
            id: 'votes',
            placeholder: 'What do you need to sway?',
            type: 'text',
            default: 'the vote',
            required: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Do what I want',
    paragraphs: [
      {
        id: '1',
        text: 'It is completely ok and acceptable for me to {doThis} on some days. Additionally, it\'s also completely ok and acceptable for me to {alsoDoThis} on other days. In general, the rule of thumb that we should all follow is it\'s ok for me to {doAnything}. I hope this helps! Let me know if you have any questions, comments, or concerns.',
        inputs: [
          {
            id: 'doThis',
            placeholder: 'What do you want to do?',
            type: 'text',
            required: true
          },
          {
            id: 'alsoDoThis',
            placeholder: 'What else do you want to do?',
            type: 'text',
            required: true
          },
          {
            id: 'doAnything',
            placeholder: 'What else do you want to do?',
            type: 'text',
            required: true
          },
        ]
      }
    ]
  }
];
