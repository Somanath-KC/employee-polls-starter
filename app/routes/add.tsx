import { useState } from "react";
import { useNavigate } from "react-router";
import AppLayout from "../../src/components/AppLayout";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { saveQuestion } from "../../src/features/questions/questionsSlice";
import { addQuestionToUser } from "../../src/features/users/usersSlice";

export function meta() {
  return [
    { title: "Add Poll - Employee Polls" },
    { name: "description", content: "Create a new poll" },
  ];
}

export default function Add() {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    optionOne?: string;
    optionTwo?: string;
  }>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.user);

  const validateForm = () => {
    const newErrors: { optionOne?: string; optionTwo?: string } = {};

    if (!optionOne.trim()) {
      newErrors.optionOne = "Option A is required";
    } else if (optionOne.trim().length < 5) {
      newErrors.optionOne = "Option A must be at least 5 characters long";
    }

    if (!optionTwo.trim()) {
      newErrors.optionTwo = "Option B is required";
    } else if (optionTwo.trim().length < 5) {
      newErrors.optionTwo = "Option B must be at least 5 characters long";
    }

    if (optionOne.trim() === optionTwo.trim()) {
      newErrors.optionTwo = "Options must be different";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !currentUser) return;

    setIsSubmitting(true);

    try {
      const question = await dispatch(
        saveQuestion({
          optionOneText: optionOne.trim(),
          optionTwoText: optionTwo.trim(),
          author: currentUser,
        })
      ).unwrap();

      dispatch(
        addQuestionToUser({
          userId: currentUser,
          questionId: question.id,
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Failed to save question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setOptionOne("");
    setOptionTwo("");
    setErrors({});
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Poll
            </h1>
            <p className="mt-2 text-gray-600">
              Ask your colleagues: "Would you rather...?"
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="option-one"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Option A
              </label>
              <textarea
                id="option-one"
                rows={3}
                value={optionOne}
                onChange={(e) => {
                  setOptionOne(e.target.value);
                  if (errors.optionOne) {
                    setErrors((prev) => ({ ...prev, optionOne: undefined }));
                  }
                }}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.optionOne
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Enter the first option..."
                maxLength={280}
              />
              {errors.optionOne && (
                <p className="mt-1 text-sm text-red-600">{errors.optionOne}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {optionOne.length}/280 characters
              </p>
            </div>

            <div className="text-center py-2">
              <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
                OR
              </span>
            </div>

            <div>
              <label
                htmlFor="option-two"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Option B
              </label>
              <textarea
                id="option-two"
                rows={3}
                value={optionTwo}
                onChange={(e) => {
                  setOptionTwo(e.target.value);
                  if (errors.optionTwo) {
                    setErrors((prev) => ({ ...prev, optionTwo: undefined }));
                  }
                }}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.optionTwo
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Enter the second option..."
                maxLength={280}
              />
              {errors.optionTwo && (
                <p className="mt-1 text-sm text-red-600">{errors.optionTwo}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {optionTwo.length}/280 characters
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting || !optionOne.trim() || !optionTwo.trim()
                }
                className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Poll"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Tips for great polls:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Make both options equally appealing</li>
              <li>• Be specific and clear in your wording</li>
              <li>• Consider workplace-relevant scenarios</li>
              <li>• Avoid controversial or sensitive topics</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
