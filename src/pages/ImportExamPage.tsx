import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ImportedQuestion } from '../types';
import { Upload, FileText, AlertTriangle, CheckCircle, Loader2, Save, Trash2, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImportExamPage() {
  const { state, dispatch } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [questions, setQuestions] = useState<ImportedQuestion[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setQuestions([]);
    setOcrText('');
    setSaved(false);
    setError('');

    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  };

  const runOCR = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProcessingProgress(0);
    setError('');

    try {
      const Tesseract = await import('tesseract.js');
      
      let imageData: string | File;
      if (file.type.startsWith('image/')) {
        imageData = file;
      } else {
        // For PDFs, we'd need pdf.js - for now, handle images only
        setError('PDF processing requires an image preview. Please upload an image file (PNG, JPG) of your exam.');
        setIsProcessing(false);
        return;
      }

      const result = await Tesseract.recognize(imageData, 'eng', {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === 'recognizing text') {
            setProcessingProgress(Math.round(m.progress * 100));
          }
        },
      });

      const text = result.data.text;
      setOcrText(text);
      parseQuestions(text);
    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to process image. Please try a clearer image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const parseQuestions = (text: string) => {
    // Try to parse questions from OCR text
    // Look for patterns like "1. question text" followed by choices "a) ... b) ..."
    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    const parsed: ImportedQuestion[] = [];
    let currentQuestion: { text: string; choices: { text: string; isCorrect: boolean }[]; confidence: number } | null = null;

    const questionPattern = /^(\d+)[\.\)]\s+(.+)/;
    const choicePattern = /^([a-dA-D])[\.\)]\s+(.+)/;

    for (const line of lines) {
      const qMatch = line.match(questionPattern);
      const cMatch = line.match(choicePattern);

      if (qMatch) {
        if (currentQuestion) {
          parsed.push({
            ...currentQuestion,
            flagged: currentQuestion.confidence < 60,
          });
        }
        currentQuestion = {
          text: qMatch[2],
          choices: [],
          confidence: 80, // default
        };
      } else if (cMatch && currentQuestion) {
        currentQuestion.choices.push({
          text: cMatch[2],
          isCorrect: false,
        });
      } else if (currentQuestion) {
        // Continuation of question text
        currentQuestion.text += ' ' + line;
      }
    }

    if (currentQuestion) {
      parsed.push({
        ...currentQuestion,
        flagged: currentQuestion.confidence < 60,
      });
    }

    // If no structured questions found, create a single question from the text
    if (parsed.length === 0 && text.trim()) {
      parsed.push({
        text: text.substring(0, 200),
        choices: [
          { text: 'Answer option A', isCorrect: false },
          { text: 'Answer option B', isCorrect: true },
          { text: 'Answer option C', isCorrect: false },
          { text: 'Answer option D', isCorrect: false },
        ],
        confidence: 50,
        flagged: true,
      });
    }

    setQuestions(parsed);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...questions];
    if (field === 'text') {
      updated[index] = { ...updated[index], text: value };
    }
    setQuestions(updated);
  };

  const updateChoice = (qIndex: number, cIndex: number, field: string, value: string | boolean) => {
    const updated = [...questions];
    const choices = [...updated[qIndex].choices];
    if (field === 'text') {
      choices[cIndex] = { ...choices[cIndex], text: value as string };
    } else if (field === 'isCorrect') {
      // Only one correct answer
      choices.forEach((c, i) => {
        choices[i] = { ...c, isCorrect: i === cIndex };
      });
    }
    updated[qIndex] = { ...updated[qIndex], choices };
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!selectedSubject) {
      setError('Please select a subject');
      return;
    }
    if (questions.length === 0) {
      setError('No questions to save');
      return;
    }

    const quizId = `imported-${Date.now()}`;
    const quiz = {
      id: quizId,
      title: quizTitle || `Imported Exam ${new Date().toLocaleDateString()}`,
      imported: true,
      importedAt: new Date().toISOString(),
      questions: questions.map((q, qIdx) => ({
        id: `${quizId}-q${qIdx + 1}`,
        text: q.text,
        choices: q.choices.map((c, cIdx) => ({
          id: String.fromCharCode(97 + cIdx),
          text: c.text,
          isCorrect: c.isCorrect,
        })),
        confidence: q.confidence,
      })),
    };

    dispatch({ type: 'ADD_QUIZ', subjectId: selectedSubject, quiz });
    setSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Import Past Exam</h1>
        <p className="text-gray-500">
          Upload an image of a past exam to convert it into a quiz using OCR
        </p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Quiz saved successfully!</p>
            <Link to={`/subject/${selectedSubject}`} className="text-sm text-green-600 hover:underline">
              Go to subject →
            </Link>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-500" />
          Upload Exam Image
        </h2>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          {file ? (
            <div className="flex items-center gap-3 justify-center">
              <FileText className="w-8 h-8 text-indigo-500" />
              <div className="text-left">
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Click to upload an image of your exam</p>
              <p className="text-sm text-gray-400 mt-1">Supports PNG, JPG, JPEG</p>
            </>
          )}
        </div>

        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="max-h-48 rounded-lg border border-gray-200 mx-auto" />
          </div>
        )}

        {file && !isProcessing && questions.length === 0 && (
          <button
            onClick={runOCR}
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Run OCR (Extract Text)
          </button>
        )}

        {isProcessing && (
          <div className="mt-4 text-center">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Processing image...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3 max-w-xs mx-auto">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-1">{processingProgress}%</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* OCR Raw Text */}
      {ocrText && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Extracted Text</h2>
          <textarea
            value={ocrText}
            onChange={(e) => { setOcrText(e.target.value); parseQuestions(e.target.value); }}
            className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm font-mono resize-y"
          />
          <button
            onClick={() => parseQuestions(ocrText)}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            Re-parse questions from text
          </button>
        </div>
      )}

      {/* Questions Review */}
      {questions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-indigo-500" />
            Review & Edit Questions ({questions.length})
          </h2>

          <div className="space-y-6">
            {questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className={`p-4 rounded-xl border ${
                  q.flagged ? 'border-amber-300 bg-amber-50/50' : 'border-gray-200'
                }`}
              >
                {q.flagged && (
                  <div className="flex items-center gap-2 text-xs text-amber-700 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Low confidence — review carefully
                  </div>
                )}

                <div className="flex items-start gap-2 mb-3">
                  <span className="text-sm font-bold text-gray-400 mt-1">Q{qIdx + 1}.</span>
                  <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestion(qIdx, 'text', e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
                  />
                  <button
                    onClick={() => removeQuestion(qIdx)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 ml-6">
                  {q.choices.map((choice, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q${qIdx}-correct`}
                        checked={choice.isCorrect}
                        onChange={() => updateChoice(qIdx, cIdx, 'isCorrect', true)}
                        className="w-4 h-4 text-green-600"
                      />
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => updateChoice(qIdx, cIdx, 'text', e.target.value)}
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
                      />
                      <span className="text-xs text-gray-400 w-6">
                        {String.fromCharCode(65 + cIdx)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-6">
                  Select the radio button for the correct answer
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Section */}
      {questions.length > 0 && !saved && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Save className="w-5 h-5 text-indigo-500" />
            Save as Quiz
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="e.g., Midterm Exam 2024"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
              >
                <option value="">Select a subject...</option>
                {state.subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={!selectedSubject}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
