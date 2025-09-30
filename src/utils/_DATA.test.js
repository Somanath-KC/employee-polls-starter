import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

// Test 1: _saveQuestion with correct data
test("_saveQuestion should return saved question with all expected fields when correctly formatted data is passed", async () => {
  const questionData = {
    optionOneText: "Option One Text",
    optionTwoText: "Option Two Text",
    author: "testuser",
  };

  const result = await _saveQuestion(questionData);

  expect(result).toHaveProperty("id");
  expect(result).toHaveProperty("timestamp");
  expect(result.author).toBe("testuser");
  expect(result.optionOne.text).toBe("Option One Text");
  expect(result.optionTwo.text).toBe("Option Two Text");
  expect(result.optionOne.votes).toEqual([]);
  expect(result.optionTwo.votes).toEqual([]);
  expect(typeof result.id).toBe("string");
  expect(typeof result.timestamp).toBe("number");
});

// Test 2: _saveQuestion with missing data
test("_saveQuestion should return an error if incorrect data is passed", async () => {
  const questionData = {
    optionTwoText: "Option Two Text",
    author: "testuser",
  };

  await expect(_saveQuestion(questionData)).rejects.toBe(
    "Please provide optionOneText, optionTwoText, and author"
  );
});

// Test 3: _saveQuestionAnswer with correct data
test("_saveQuestionAnswer should return true when correctly formatted data is passed", async () => {
  const answerData = {
    authedUser: "sarahedo",
    qid: "8xf0y6ziyjabvozdd253nd",
    answer: "optionOne",
  };

  const result = await _saveQuestionAnswer(answerData);
  expect(result).toBe(true);
});

// Test 4: _saveQuestionAnswer with missing data
test("_saveQuestionAnswer should return an error if incorrect data is passed", async () => {
  const answerData = {
    qid: "testquestion",
    answer: "optionOne",
  };

  await expect(_saveQuestionAnswer(answerData)).rejects.toBe(
    "Please provide authedUser, qid, and answer"
  );
});
