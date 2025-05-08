import { useState } from 'react';
import type { CopypastaTemplate, Paragraph } from '../types/copypasta';
import { InputField } from './InputField';
import { templates } from '../data/templates';

export const CopypastaGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<CopypastaTemplate | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [generatedText, setGeneratedText] = useState<string>('');

  const handleTemplateSelect = (template: CopypastaTemplate) => {
    setSelectedTemplate(template);
    setInputValues({});
    setGeneratedText('');
  };

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const generateText = (paragraph: Paragraph) => {
    let text = paragraph.text;
    paragraph.inputs.forEach((input) => {
      const value = inputValues[input.id] || '';
      text = text.replace(new RegExp(String.raw`{${input.id}}`, "g"), value);
    });
    return text;
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;

    const generatedParagraphs = selectedTemplate.paragraphs.map((paragraph) => generateText(paragraph));
    setGeneratedText(generatedParagraphs.join('\n\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Copypasta Generator</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select a Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`p-4 border rounded-lg text-left ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-medium">{template.title}</h3>
            </button>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="space-y-6">
          {selectedTemplate.paragraphs.map((paragraph) => (
            <div key={paragraph.id} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paragraph.inputs.map((input) => (
                  <div key={input.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {input.placeholder}
                    </label>
                    <InputField
                      input={input}
                      value={inputValues[input.id] || input.default || ''}
                      onChange={(value) => handleInputChange(input.id, value)}
                      onInit={() => input.default ? handleInputChange(input.id, input.default) : {}}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Generate
            </button>
            {generatedText && (
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Copy to Clipboard
              </button>
            )}
          </div>

          {generatedText && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Generated Text:</h3>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                {generatedText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
