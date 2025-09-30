import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import "./PollCard.css";

export default function PollCard({ question }) {
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.auth.user);

  const author = users[question.author];
  const hasAnswered =
    (currentUser && question.optionOne.votes.includes(currentUser)) ||
    (currentUser && question.optionTwo.votes.includes(currentUser));

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="poll-card">
      <div className="poll-card-header">
        {author && (
          <>
            <img
              src={author.avatarURL}
              alt={author.name}
              className="avatar poll-card-avatar"
            />
            <div>
              <p className="poll-card-author-name">{author.name}</p>
              <p className="text-muted poll-card-timestamp">
                {formatDate(question.timestamp)}
              </p>
            </div>
          </>
        )}
      </div>

      <h3 className="poll-card-title">Would You Rather...</h3>

      <div className="poll-card-options">
        <p className="poll-card-option">
          <span className="poll-card-option-label">A:</span>{" "}
          {question.optionOne.text}
        </p>
        <p className="poll-card-option">
          <span className="poll-card-option-label">B:</span>{" "}
          {question.optionTwo.text}
        </p>
      </div>

      <div className="poll-card-footer">
        <span
          className={`poll-card-status ${
            hasAnswered ? "answered" : "not-answered"
          }`}
        >
          {hasAnswered ? "Answered" : "Not Answered"}
        </span>

        <Link
          to={`/questions/${question.id}`}
          className="btn poll-card-view-btn"
        >
          View Poll
        </Link>
      </div>
    </div>
  );
}
