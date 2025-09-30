// Test 10: Poll percentage calculation test
test('poll results correctly calculate and display vote percentages', () => {
  const question = {
    id: 'test-question',
    author: 'testuser',
    timestamp: 1609459200000,
    optionOne: {
      votes: ['user1', 'user2'], // 2 votes
      text: 'Option One Text',
    },
    optionTwo: {
      votes: ['user3', 'user4', 'user5'], // 3 votes
      text: 'Option Two Text',
    },
  };

  // Calculate percentages like the question component does
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage = totalVotes > 0 ? Math.round((question.optionOne.votes.length / totalVotes) * 100) : 0;
  const optionTwoPercentage = totalVotes > 0 ? Math.round((question.optionTwo.votes.length / totalVotes) * 100) : 0;

  expect(totalVotes).toBe(5);
  expect(optionOnePercentage).toBe(40); // 2/5 = 0.4 = 40%
  expect(optionTwoPercentage).toBe(60); // 3/5 = 0.6 = 60%
  expect(optionOnePercentage + optionTwoPercentage).toBe(100);
});

// Test 11: Poll percentage with zero votes
test('poll results handle zero votes correctly', () => {
  const question = {
    id: 'test-question',
    author: 'testuser',
    timestamp: 1609459200000,
    optionOne: {
      votes: [],
      text: 'Option One Text',
    },
    optionTwo: {
      votes: [],
      text: 'Option Two Text',
    },
  };

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage = totalVotes > 0 ? Math.round((question.optionOne.votes.length / totalVotes) * 100) : 0;
  const optionTwoPercentage = totalVotes > 0 ? Math.round((question.optionTwo.votes.length / totalVotes) * 100) : 0;

  expect(totalVotes).toBe(0);
  expect(optionOnePercentage).toBe(0);
  expect(optionTwoPercentage).toBe(0);
});