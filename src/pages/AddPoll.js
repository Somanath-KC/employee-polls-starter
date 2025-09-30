import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { saveQuestion } from "../features/questions/questionsSlice";
import { addQuestionToUser } from "../features/users/usersSlice";

export default function AddPoll() {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const validateForm = () => {
    const newErrors = {};

    if (!optionOneText.trim() || optionOneText.trim().length < 5) {
      newErrors.optionOne = "Option One must be at least 5 characters long";
    }

    if (!optionTwoText.trim() || optionTwoText.trim().length < 5) {
      newErrors.optionTwo = "Option Two must be at least 5 characters long";
    }

    if (optionOneText.trim() === optionTwoText.trim()) {
      newErrors.duplicate = "Options must be different from each other";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const questionData = {
        optionOneText: optionOneText.trim(),
        optionTwoText: optionTwoText.trim(),
        author: currentUser,
      };

      const result = await dispatch(saveQuestion(questionData)).unwrap();

      // Add question to user's questions list
      dispatch(
        addQuestionToUser({
          userId: currentUser,
          questionId: result.id,
        })
      );

      navigate("/");
    } catch (error) {
      setErrors({ submit: "Failed to create poll. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create New Poll</h1>
      <p>Create a "Would You Rather" poll for your colleagues</p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {errors.submit && <div className="error">{errors.submit}</div>}
        {errors.duplicate && <div className="error">{errors.duplicate}</div>}

        <div className="form-group">
          <label htmlFor="optionOne">Option One</label>
          <textarea
            id="optionOne"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Enter the first option..."
            rows={3}
            style={errors.optionOne ? { borderColor: "#dc3545" } : {}}
          />
          {errors.optionOne && <div className="error">{errors.optionOne}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="optionTwo">Option Two</label>
          <textarea
            id="optionTwo"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Enter the second option..."
            rows={3}
            style={errors.optionTwo ? { borderColor: "#dc3545" } : {}}
          />
          {errors.optionTwo && <div className="error">{errors.optionTwo}</div>}
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button type="submit" disabled={isSubmitting} className="btn">
            {isSubmitting ? "Creating Poll..." : "Create Poll"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
