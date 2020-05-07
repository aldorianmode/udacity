import { getSentiment } from '../src/client/js/formHandler';

describe('getSentiment', () => {
    // Ref: https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
    const mockSuccessResponse = {
        'error': false,
        'polarity': 'positive',
        'subjectivity': 'subjective',
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    it('should fetch data from server', done => {
        const testText = 'This is a test';
        getSentiment(testText, false /* not url */);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8081/getSentiment?text=${testText}`);
        done();
    })



})