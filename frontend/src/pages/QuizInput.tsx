import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText} from 'lucide-react';

export const QuizInput = () => {
    const [studyText, setStudyText] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please select a PDF file');
        }
    };

    const handleGenerateQuiz = (event) => {
        if (!studyText.trim() && ! selectedFile) {
            alert('Please paste study content or upload a PDF file');
            return;
        } 
        if (!difficulty) {
            alert('Please select a difficulty level');
            return;
        }

        console.log('Generating quiz with:', {
            text: studyText,
            difficulty: difficulty,
            file: selectedFile
        });
    };

    const characterCount = studyText.length;
    const maxCharacters = 15000;

    const userName = "Eduardo";

    return (
        <Layout>
            <div className='min-h-screen bg-gray-50'>
                {/* Header */}
                <div className='flex flex-col items-center justify-center pt-12 pb-8 space-y-4'>
                    <h1 className='text-4xl font-bold text-center'>Welcome { userName }!</h1>
                    <p className='text-xl text-gray-600 text-center max-w-2xl'>
                        Paste a study guide or upload a PDF to generate a quiz
                    </p>
                </div>

                {/* Main Form */}
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
                    <Card>
                        <CardContent className='p-6 space-y-6'>

                            {/* Text Area */}
                            <div className='space-y-2'>
                                <div className='relative'>
                                    <Textarea
                                        placeholder='Paste study guide here...'
                                        value={studyText}
                                        onChange={(e) => setStudyText(e.target.value)}
                                        className='min-h-[300px] resize-none text-base leading-relaxed'
                                        maxLength={maxCharacters}
                                    />
                                    <div className='absolute bottom-3 right-3 text-sm text-gray-500 bg-white px-2 py-1 rounded'>
                                        {characterCount.toLocaleString()}/{maxCharacters.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex gap-4'> 
                                <Select value={difficulty} onValueChange={setDifficulty}>
                                    <SelectTrigger className='w-2/3'>
                                        <SelectValue placeholder='Difficulty Level' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='easy'>Easy</SelectItem>
                                        <SelectItem value='medium'>Medium</SelectItem>
                                        <SelectItem value='hard'>Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                {/* File Upload */}
                                <div className='relative w-1/3'>
                                    <input 
                                        type='file' accept='.pdf' onChange={handleFileChange}
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                        id='pdf-upload' 
                                    />
                                    <Button variant='outline' className='w-full justify-center' asChild>
                                        <label htmlFor='pdf-upload' className='cursor-pointer flex items-center space-x-2'>
                                            {selectedFile ? (
                                                <>
                                                    <FileText className='h-4 w-4' />
                                                    <span className='truncate'>{selectedFile.name}</span>
                                                </>
                                            ) : ( 
                                                <>
                                                    <Upload className='"h-4 w-4' />
                                                    <span>Choose PDF File</span>
                                                </>
                                            )}
                                        </label>
                                    </Button>
                                </div>
                            </div>

                            {/* OR Divider */}
                            {studyText && selectedFile && (
                                <div className='flex items-center space-x-4'>
                                    <div className='flex-1 border-t border-gray-300'></div>
                                    <span className='text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded'>
                                        Text and PDF will be combined
                                    </span>
                                    <div className='flex-1 border-t border-gray-300'></div>
                                </div>
                            )}

                            {/* Generate Button */}
                            <Button 
                                onClick={handleGenerateQuiz}
                                className='w-full h-12 text-lg font-semibold'
                                disabled={!studyText.trim() && !selectedFile} >
                                    Generate Quiz Now!
                            </Button>

                            {/* Help Text */}
                            <div className='text-center text-sm text-gray-500 space-y-1'>
                                <p>
                                    💡 Tip: For best results, include key concepts, definitions, and important details
                                </p>
                                <p>
                                    📄 Supported format: PDF files up to 10MB
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
} 