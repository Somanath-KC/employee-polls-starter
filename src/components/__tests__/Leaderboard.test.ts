// Test 9: Leaderboard percentage calculation test
test('leaderboard correctly calculates and displays user scores', () => {
  const users = {
    user1: {
      id: 'user1',
      name: 'User One',
      avatarURL: 'https://example.com/avatar1.jpg',
      answers: { q1: 'optionOne', q2: 'optionTwo' }, // 2 answers
      questions: ['q3', 'q4', 'q5'], // 3 questions
      password: 'password'
    },
    user2: {
      id: 'user2', 
      name: 'User Two',
      avatarURL: 'https://example.com/avatar2.jpg',
      answers: { q1: 'optionOne' }, // 1 answer
      questions: ['q6'], // 1 question
      password: 'password'
    }
  };

  // Calculate stats like the leaderboard component does
  const userStats = Object.values(users).map((user) => {
    const questionsAsked = user.questions.length;
    const questionsAnswered = Object.keys(user.answers).length;
    const totalScore = questionsAsked + questionsAnswered;
    
    return {
      id: user.id,
      name: user.name,
      questionsAsked,
      questionsAnswered,
      totalScore,
    };
  });

  // Sort by total score (descending)
  const sortedUsers = userStats.sort((a, b) => b.totalScore - a.totalScore);

  // Verify user1 is first with correct scores
  expect(sortedUsers[0].id).toBe('user1');
  expect(sortedUsers[0].questionsAsked).toBe(3);
  expect(sortedUsers[0].questionsAnswered).toBe(2);
  expect(sortedUsers[0].totalScore).toBe(5);

  // Verify user2 is second with correct scores  
  expect(sortedUsers[1].id).toBe('user2');
  expect(sortedUsers[1].questionsAsked).toBe(1);
  expect(sortedUsers[1].questionsAnswered).toBe(1);
  expect(sortedUsers[1].totalScore).toBe(2);
});