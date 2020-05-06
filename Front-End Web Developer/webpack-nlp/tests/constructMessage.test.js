import isEqual from 'lodash/isEqual';
import { constructMessage } from '../src/client/js/constructMessage';

// Possible output strings
const SUB_POS_MSG   = "You seem subjectively positive";
const OBJ_POS_MSG   = "You seem objectively positive";
const SUB_NEG_MSG   = "You seem subjectively negative";
const OBJ_NEG_MSG   = "You seem objectively negative";
const SUB_NEU_MSG   = "You seem subjectively neutral";
const OBJ_NEU_MSG   = "You seem objectively neutral";
const POS_MSG       = "You seem positive";
const NEG_MSG       = "You seem negative";
const NEU_MSG       = "You seem neutral";
const ERR_MSG       = "Couldn't analyze text. Try again!";

// Possible sentiment object values (similar to https://docs.aylien.com/textapi/endpoints/#sentiment-analysis). Check
// src/server/index.js
const POS_VAL = "positive";
const NEU_VAL = "neutral";
const NEG_VAL = "negative";
const SUB_VAL = "subjective";
const OBJ_VAL = "objective";

const constructSentimentObj = (error, subjectivity, polarity) => 
    ( {'error': error, 'subjectivity': subjectivity ? subjectivity : undefined, 'polarity': polarity} );

describe('Message', () => {
    it('should be error', () => {
        const mockObj = constructSentimentObj(true, SUB_VAL, POS_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, ERR_MSG)).toBeTruthy();
    });

    it('should be subectively positive', () => {
        const mockObj = constructSentimentObj(false, SUB_VAL, POS_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, SUB_POS_MSG)).toBeTruthy();
    });

    it('should be subectively negative', () => {
        const mockObj = constructSentimentObj(false, SUB_VAL, NEG_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, SUB_NEG_MSG)).toBeTruthy();
    });

    it('should be subectively neutral', () => {
        const mockObj = constructSentimentObj(false, SUB_VAL, NEU_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, SUB_NEU_MSG)).toBeTruthy();
    });

    it('should be objectively negative', () => {
        const mockObj = constructSentimentObj(false, OBJ_VAL, NEG_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, OBJ_NEG_MSG)).toBeTruthy();
    });

    it('should be obectively positive', () => {
        const mockObj = constructSentimentObj(false, OBJ_VAL, POS_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, OBJ_POS_MSG)).toBeTruthy();
    });

    it('should be obectively neutral', () => {
        const mockObj = constructSentimentObj(false, OBJ_VAL, NEU_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, OBJ_NEU_MSG)).toBeTruthy();
    });

    it('should be negative', () => {
        const mockObj = constructSentimentObj(false, null, NEG_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, NEG_MSG)).toBeTruthy();
    });

    it('should be positive', () => {
        const mockObj = constructSentimentObj(false, null, POS_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, POS_MSG)).toBeTruthy();
    });

    it('should be neutral', () => {
        const mockObj = constructSentimentObj(false, null, NEU_VAL);
        const msg = constructMessage(mockObj);
        expect(isEqual(msg, NEU_MSG)).toBeTruthy();
    });
});