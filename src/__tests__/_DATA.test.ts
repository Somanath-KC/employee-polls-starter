import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('_DATA.js functions', () => {
  describe('_saveQuestion', () => {
    it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
      const questionData = {
        optionOneText: 'Option One Text',
        optionTwoText: 'Option Two Text',
        author: 'sarahedo'
      };

      const result = await _saveQuestion(questionData);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('timestamp');
      expect(result.author).toBe('sarahedo');
      expect(result.optionOne.text).toBe('Option One Text');
      expect(result.optionTwo.text).toBe('Option Two Text');
      expect(result.optionOne.votes).toEqual([]);
      expect(result.optionTwo.votes).toEqual([]);
      expect(typeof result.id).toBe('string');
      expect(typeof result.timestamp).toBe('number');
    });

    it('should return an error if incorrect data is passed - missing optionOneText', async () => {
      const questionData = {
        optionTwoText: 'Option Two Text',
        author: 'sarahedo'
      };

      await expect(_saveQuestion(questionData as any)).rejects.toBe(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });

    it('should return an error if incorrect data is passed - missing optionTwoText', async () => {
      const questionData = {
        optionOneText: 'Option One Text',
        author: 'testuser'
      };

      await expect(_saveQuestion(questionData as any)).rejects.toBe(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });

    it('should return an error if incorrect data is passed - missing author', async () => {
      const questionData = {
        optionOneText: 'Option One Text',
        optionTwoText: 'Option Two Text'
      };

      await expect(_saveQuestion(questionData as any)).rejects.toBe(
        'Please provide optionOneText, optionTwoText, and author'
      );
    });
  });

  describe('_saveQuestionAnswer', () => {
    it('should return true and save the answer when correctly formatted data is passed', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne' as const
      };

      const result = await _saveQuestionAnswer(answerData);

      expect(result).toBe(true);
    });

    it('should return an error if incorrect data is passed - missing authedUser', async () => {
      const answerData = {
        qid: 'testquestion',
        answer: 'optionOne' as const
      };

      await expect(_saveQuestionAnswer(answerData as any)).rejects.toBe(
        'Please provide authedUser, qid, and answer'
      );
    });

    it('should return an error if incorrect data is passed - missing qid', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        answer: 'optionOne' as const
      };

      await expect(_saveQuestionAnswer(answerData as any)).rejects.toBe(
        'Please provide authedUser, qid, and answer'
      );
    });

    it('should return an error if incorrect data is passed - missing answer', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'testquestion'
      };

      await expect(_saveQuestionAnswer(answerData as any)).rejects.toBe(
        'Please provide authedUser, qid, and answer'
      );
    });
  });
});