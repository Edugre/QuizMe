import React from "react";
import Layout from '@/components/layout/Layout';
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {

    const location = useLocation();
    const { quiz } = location.state;
    const navigate = useNavigate();

    const [qNumber, setQNumber] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showFinalDialog, setShowFinalDialog] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const handleQuestion = (selectedLetter: string): void => {
        const correctAnswer = quiz.quiz[qNumber].answer;
        const isAnswerCorrect = selectedLetter === correctAnswer;

        setIsCorrect(selectedLetter === correctAnswer);

        if (isAnswerCorrect) 
            setCorrectAnswers(correctAnswers + 1);
        setShowResult(true);
    }

    return (
        <Layout>
            <div className="min-h-screen">
                <div className="flex flex-col pt-12 pb-8 justify-center items-center">
                    <h1 className="text-4xl font-bold text-center">Quiz { quiz.difficulty } difficulty</h1>
                    <p className='text-xl text-gray-600 text-center max-w-2xl py-2'>
                        Question { qNumber + 1} of { quiz.quiz.length }
                    </p>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex justify-center">
                        <Card className="w-full max-w-4xl">
                            <CardContent className="p-6 space-y-6">
                                {/* Question Area */}
                                {quiz.quiz[qNumber] ? (
                                <div className="flex items-center justify-center border-gray-900 border rounded-lg h-40">
                                    <span>{quiz.quiz[qNumber].question}</span>
                                </div>
                                ) : null}
                                { /* Answers */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button 
                                        className="w-full h-20 px-4 text-sm flex items-center justify-center text-center whitespace-normal break-words cursor-pointer" 
                                        onClick={() => handleQuestion("A")}>{ quiz.quiz[qNumber].options.A }
                                    </Button>
                                    <Button 
                                        className="w-full h-20 px-4 text-sm flex items-center justify-center text-center whitespace-normal break-words cursor-pointer" 
                                        onClick={() => handleQuestion("B")}>{ quiz.quiz[qNumber].options.B }
                                    </Button>
                                    <Button 
                                        className="w-full h-20 px-4 text-sm flex items-center justify-center text-center whitespace-normal break-words cursor-pointer" 
                                        onClick={() => handleQuestion("C")}>{ quiz.quiz[qNumber].options.C }
                                    </Button>
                                    <Button 
                                        className="w-full h-20 px-4 text-sm flex items-center justify-center text-center whitespace-normal break-words cursor-pointer" 
                                        onClick={() => handleQuestion("D")}>{ quiz.quiz[qNumber].options.D }
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Dialog open={ showResult } onOpenChange={ setShowResult }>
                    <DialogContent className="text-center">
                        <DialogHeader>
                            <DialogTitle className={isCorrect ? "text-green-600" : "text-red-600"}>
                                {isCorrect ? "Correct!" : "Incorrect!"}
                            </DialogTitle>
                            <DialogDescription>
                                { quiz.quiz[qNumber].explanation }
                                <div className="flex items-center justify-center py-4">
                                    <Button onClick={qNumber === quiz.quiz.length - 1 ? 
                                        () => {
                                            setShowResult(false);
                                            setShowFinalDialog(true);
                                        }
                                        : () => {
                                            setQNumber(qNumber + 1);
                                            setShowResult(false);
                                            setIsCorrect(null);
                                        }
                                    }>
                                        { qNumber === quiz.quiz.length - 1 ? "Finish" : "Next Question"}
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog open={ showFinalDialog }>
                    <DialogContent className="text-center">
                        <DialogTitle>
                            You reached the end of the Quiz!
                        </DialogTitle>
                        <DialogDescription>
                            You got {correctAnswers}/10 questions correct.
                            <div className="flex items-center justify-center py-4">
                                <Button onClick={ () => navigate('/quiz-input')}>Go back</Button>
                            </div>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
}