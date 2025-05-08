import { useState } from 'react';
import type { CopypastaTemplate, Paragraph } from '../types/copypasta';
import { InputField } from './InputField';
import { templates } from '../data/templates';

export const CopypastaGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<CopypastaTemplate | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [generatedText, setGeneratedText] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

  const handleTemplateSelect = (template: CopypastaTemplate) => {
    setSelectedTemplate(template);
    setInputValues({});
    setGeneratedText('');
    setValidationErrors({});
  };

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
    // Clear validation error when user types
    setValidationErrors((prev) => ({
      ...prev,
      [inputId]: false,
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

  const validateInputs = (template: CopypastaTemplate): boolean => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    template.paragraphs.forEach((paragraph) => {
      paragraph.inputs.forEach((input) => {
        if (input.required && !inputValues[input.id]) {
          errors[input.id] = true;
          isValid = false;
        }
      });
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;

    if (!validateInputs(selectedTemplate)) {
      return;
    }

    const generatedParagraphs = selectedTemplate.paragraphs.map((paragraph) => generateText(paragraph));
    setGeneratedText(generatedParagraphs.join('\n\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Copypasta Generator</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Select a Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <h3 className="font-medium text-gray-700">{template.title}</h3>
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
                  <div key={input.id} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {input.placeholder}
                      {input.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <InputField
                      input={input}
                      value={inputValues[input.id] || input.default || ''}
                      onChange={(value) => handleInputChange(input.id, value)}
                      onInit={() => input.default ? handleInputChange(input.id, input.default) : {}}
                    />
                    {validationErrors[input.id] && (
                      <p className="text-sm text-red-600 font-medium">This field is required</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Generate
            </button>
            {generatedText && (
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Copy to Clipboard
              </button>
            )}
          </div>

          {generatedText && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Generated Text:</h3>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-800 border border-gray-200">
                {generatedText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
