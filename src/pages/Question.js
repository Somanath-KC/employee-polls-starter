import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { saveQuestionAnswer } from "../features/questions/questionsSlice";
import { addAnswerToUser } from "../features/users/usersSlice";

export default function Question() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const question = useAppSelector((state) => state.questions.questions[id]);
  const users = useAppSelector((state) => state.users.users);

  if (!question) {
    return <Navigate to="/404" replace />;
  }

  const author = users[question.author];
  const hasAnswered =
    question.optionOne.votes.includes(currentUser) ||
    question.optionTwo.votes.includes(currentUser);

  const userAnswer = hasAnswered
    ? question.optionOne.votes.includes(currentUser)
      ? "optionOne"
      : "optionTwo"
    : null;

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage =
    totalVotes > 0 ? (question.optionOne.votes.length / totalVotes) * 100 : 0;
  const optionTwoPercentage =
    totalVotes > 0 ? (question.optionTwo.votes.length / totalVotes) * 100 : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) return;

    setIsSubmitting(true);

    try {
      await dispatch(
        saveQuestionAnswer({
          authedUser: currentUser,
          qid: id,
          answer: selectedOption,
        })
      ).unwrap();

      dispatch(
        addAnswerToUser({
          userId: currentUser,
          questionId: id,
          answer: selectedOption,
        })
      );
    } catch (error) {
      console.error("Failed to save answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="poll-card">
        {author && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <img src={author.avatarURL} alt={author.name} className="avatar" />
            <div>
              <h3>{author.name} asks:</h3>
              <p className="text-muted">Would you rather...</p>
            </div>
          </div>
        )}

        {!hasAnswered ? (
          <form onSubmit={handleSubmit}>
            <div className="poll-options">
              <div
                className={`poll-option ${selectedOption === "optionOne" ? "selected" : ""}`}
                onClick={() => setSelectedOption("optionOne")}
              >
                <input
                  type="radio"
                  name="answer"
                  value="optionOne"
                  checked={selectedOption === "optionOne"}
                  onChange={() => setSelectedOption("optionOne")}
                  style={{ marginRight: "10px" }}
                />
                {question.optionOne.text}
              </div>

              <div
                className={`poll-option ${selectedOption === "optionTwo" ? "selected" : ""}`}
                onClick={() => setSelectedOption("optionTwo")}
              >
                <input
                  type="radio"
                  name="answer"
                  value="optionTwo"
                  checked={selectedOption === "optionTwo"}
                  onChange={() => setSelectedOption("optionTwo")}
                  style={{ marginRight: "10px" }}
                />
                {question.optionTwo.text}
              </div>
            </div>

            <div className="text-center" style={{ marginTop: "20px" }}>
              <button
                type="submit"
                disabled={!selectedOption || isSubmitting}
                className="btn"
              >
                {isSubmitting ? "Submitting..." : "Submit Vote"}
              </button>
            </div>
          </form>
        ) : (
          <div className="poll-results">
            <h3>Results:</h3>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{question.optionOne.text}</span>
                <span>{optionOnePercentage.toFixed(1)}%</span>
              </div>
              <div className="result-bar">
                <div
                  className="result-fill"
                  style={{ width: `${optionOnePercentage}%` }}
                ></div>
              </div>
              <div style={{ fontSize: "14px", color: "#6c757d" }}>
                {question.optionOne.votes.length} votes
                {userAnswer === "optionOne" && " (Your choice)"}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{question.optionTwo.text}</span>
                <span>{optionTwoPercentage.toFixed(1)}%</span>
              </div>
              <div className="result-bar">
                <div
                  className="result-fill"
                  style={{ width: `${optionTwoPercentage}%` }}
                ></div>
              </div>
              <div style={{ fontSize: "14px", color: "#6c757d" }}>
                {question.optionTwo.votes.length} votes
                {userAnswer === "optionTwo" && " (Your choice)"}
              </div>
            </div>

            <div
              className="text-center"
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <strong>Total Votes: {totalVotes}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
