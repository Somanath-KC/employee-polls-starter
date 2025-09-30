import { useAppSelector } from "../store/hooks";

export default function Leaderboard() {
  const users = useAppSelector((state) => state.users.users);
  const questions = useAppSelector((state) => state.questions.questions);

  // Calculate leaderboard data
  const leaderboardData = Object.values(users)
    .map((user) => {
      const questionsAsked = user.questions.length;
      const questionsAnswered = Object.keys(user.answers).length;
      const totalScore = questionsAsked + questionsAnswered;

      return {
        ...user,
        questionsAsked,
        questionsAnswered,
        totalScore,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div>
      <h1>Leaderboard</h1>
      <p>See how you rank among your colleagues</p>

      <div className="leaderboard">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className="leaderboard-item">
            <div
              style={{ fontSize: "24px", fontWeight: "bold", minWidth: "30px" }}
            >
              #{index + 1}
            </div>
            <img src={user.avatarURL} alt={user.name} className="avatar" />
            <div style={{ flex: 1 }}>
              <h3>{user.name}</h3>
              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <div>
                  <div>Questions Asked</div>
                  <div style={{ fontWeight: "bold" }}>
                    {user.questionsAsked}
                  </div>
                </div>
                <div>
                  <div>Questions Answered</div>
                  <div style={{ fontWeight: "bold" }}>
                    {user.questionsAnswered}
                  </div>
                </div>
                <div>
                  <div>Total Score</div>
                  <div style={{ fontWeight: "bold", color: "#007bff" }}>
                    {user.totalScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
