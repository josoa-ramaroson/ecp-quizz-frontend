import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EQuestionType } from "@/enums/question-type.enum";
import { IQuestion } from "@/interfaces/question.interface";

interface QuestionOptionsProps {
  question: IQuestion;
  onAnswerChange: (questionId: string, answerId:  string[] ) => void;
  currentAnswer:  string[] | undefined;
}

export const QuestionOptions = ({
  question,
  onAnswerChange,
  currentAnswer,
}: QuestionOptionsProps) => {
  const [shortAnswerText, setShortAnswerText] = useState<string>(
    typeof currentAnswer === "string" ? currentAnswer : ""
  );

  // Handle multiple choice selection
  const handleMultipleChoiceChange = (optionId: string, checked: boolean) => {
    const currentAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    
    if (checked) {
      // Add the option if it's not already in the array
      if (!currentAnswers.includes(optionId)) {
        onAnswerChange(question._id, [...currentAnswers, optionId]);
      }
    } else {
      // Remove the option if checked is false
      onAnswerChange(
        question._id,
        currentAnswers.filter((id) => id !== optionId)
      );
    }
  };

  // Handle short answer submission
  const handleShortAnswerChange = (value: string) => {
    setShortAnswerText(value);
    onAnswerChange(question._id, [value]);
  };

  const isChecked = (optionId: string) => {
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.includes(optionId);
    }
    return currentAnswer === optionId;
  };

  const renderQuestionOptions = () => {
    switch (question.type) {
      case EQuestionType.SINGLE_CHOICE:
        return (
          <RadioGroup
            value={currentAnswer? currentAnswer[0]: ""}
            onValueChange={(value) => onAnswerChange(question._id, [value])}
          >
            {question.answersOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 p-2 rounded"
              >
                <RadioGroupItem value={option.id} id={`${question._id}-${option.id}`} />
                <Label htmlFor={`${question._id}-${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case EQuestionType.MULTIPLE_CHOICE:
        return (
          <div className="space-y-2">
            {question.answersOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 p-2 rounded"
              >
                <Checkbox
                  id={`${question._id}-${option.id}`}
                  checked={isChecked(option.id)}
                  onCheckedChange={(checked) => 
                    handleMultipleChoiceChange(option.id, checked as boolean)
                  }
                />
                <Label htmlFor={`${question._id}-${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        );

      case EQuestionType.TRUE_FALSE:
        return (
          <RadioGroup
            value={currentAnswer? currentAnswer[0]: ""}
            onValueChange={(value) => onAnswerChange(question._id, [value])}
          >
            {question.answersOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 p-2 rounded"
              >
                <RadioGroupItem value={option.id} id={`${question._id}-${option.id}`} />
                <Label htmlFor={`${question._id}-${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case EQuestionType.SHORT_ANSWER:
        return (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Type your answer here..."
              value={shortAnswerText}
              onChange={(e) => handleShortAnswerChange(e.target.value)}
              className="p-2 "
            />
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  return <div className="mt-4">{renderQuestionOptions()}</div>;
};