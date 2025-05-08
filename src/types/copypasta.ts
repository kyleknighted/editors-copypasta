export interface CopypastaTemplate {
  id: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface Paragraph {
  id: string;
  text: string;
  inputs: Input[];
}

export interface Input {
  id: string;
  placeholder: string;
  type: 'text' | 'number' | 'select';
  options?: string[]; // For select type inputs
  required: boolean;
  default?: string;
}
