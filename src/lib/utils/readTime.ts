const CJK = /[㐀-䶿一-鿿豈-﫿぀-ヿ]/g;

const CJK_CHARS_PER_MINUTE = 400;
const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time for mixed Chinese and Latin text.
 *
 * Splitting on whitespace alone counts a whole Chinese article as a handful of
 * "words", because Chinese does not space its words — every post came out as
 * one minute. Chinese characters are counted directly, and only the remaining
 * Latin text is counted by word.
 */
export function getReadTime(content: string): string {
  const cjkCount = (content.match(CJK) || []).length;

  const latinWords = content
    .replace(CJK, ' ')
    .split(/\s+/g)
    .filter((word) => /[a-zA-Z0-9]/.test(word)).length;

  const minutes = Math.ceil(cjkCount / CJK_CHARS_PER_MINUTE + latinWords / WORDS_PER_MINUTE);

  return `${Math.max(1, minutes)} 分钟阅读`;
}
