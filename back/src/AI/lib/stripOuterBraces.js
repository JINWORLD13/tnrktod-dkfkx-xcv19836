const stripOuterBraces = (msg) => {
  if (typeof msg !== "string") return msg;
  let cleaned = msg.trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object' && 
        ('comprehensive' in parsed || 'individual' in parsed)) {
      return JSON.stringify(parsed, null, 2);
    }
  } catch (e) {
  }
  cleaned = fixCommonJsonErrors(cleaned);
  let openCount = 0;
  let closeCount = 0;
  for (let char of cleaned) {
    if (char === '{') openCount++;
    if (char === '}') closeCount++;
  }
  if (openCount > closeCount) {
    const missing = openCount - closeCount;
    cleaned += '}'.repeat(missing);
  }
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object' && 
        ('comprehensive' in parsed || 'individual' in parsed)) {
      return JSON.stringify(parsed, null, 2);
    }
  } catch (e) {
  }
  const mainKeys = [
    '"comprehensive"',
    "'comprehensive'",
    '"individual"',
    "'individual'"
  ];
  let startPos = -1;
  for (const key of mainKeys) {
    const pos = cleaned.indexOf(key);
    if (pos !== -1 && (startPos === -1 || pos < startPos)) {
      startPos = pos;
    }
  }
  if (startPos === -1) {
    console.log('comprehensive 또는 individual 키를 찾을 수 없습니다.');
    return cleaned;
  }
  let outerStart = -1;
  for (let i = startPos - 1; i >= 0; i--) {
    if (cleaned[i] === '{') {
      outerStart = i;
      break;
    }
  }
  if (outerStart === -1) {
    outerStart = startPos;
    while (outerStart > 0 && /[\s,:]/.test(cleaned[outerStart - 1])) {
      outerStart--;
    }
  }
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let quote = null;
  let outerEnd = -1;
  const startsWithBrace = cleaned[outerStart] === '{';
  if (startsWithBrace) braceCount = 1;
  for (let i = outerStart + (startsWithBrace ? 1 : 0); i < cleaned.length; i++) {
    const char = cleaned[i];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    if ((char === '"' || char === "'") && !inString) {
      inString = true;
      quote = char;
      continue;
    } else if (char === quote && inString && !escapeNext) {
      inString = false;
      quote = null;
      continue;
    }
    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          outerEnd = i;
          break;
        }
      }
    }
  }
  let content;
  if (startsWithBrace && outerEnd !== -1) {
    content = cleaned.slice(outerStart + 1, outerEnd).trim();
  } else {
    const endPos = outerEnd !== -1 ? outerEnd : cleaned.length;
    content = cleaned.slice(outerStart, endPos).trim();
    content = removeTrailingGarbage(content);
    if (content.endsWith('}')) {
      content = content.slice(0, -1).trim();
    }
  }
  let rewrapped = `{${content}}`;
  rewrapped = convertQuotes(rewrapped);
  try {
    const parsed = JSON.parse(rewrapped);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    console.log('최종 파싱 실패:', e.message);
    return rewrapped;
  }
};
const fixCommonJsonErrors = (jsonStr) => {
  let fixed = jsonStr;
  fixed = fixed.replace(/("\w+Array":\s*\[[^\]]+\])"/g, '$1');
  fixed = fixed.replace(/""/g, '"');
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
  fixed = fixed.replace(/\\\\n/g, '\\n');
  return fixed;
};
const removeTrailingGarbage = (content) => {
  let trimmed = content;
  while (trimmed.length > 0) {
    const lastChar = trimmed[trimmed.length - 1];
    if (/[}\]"']/.test(lastChar)) {
      break;
    }
    if (/[\s,]/.test(lastChar)) {
      trimmed = trimmed.slice(0, -1);
      continue;
    }
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
};
const convertQuotes = (str) => {
  let result = '';
  let inString = false;
  let currentQuote = null;
  let escapeNext = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (escapeNext) {
      result += char;
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      result += char;
      escapeNext = true;
      continue;
    }
    if ((char === '"' || char === "'") && !inString) {
      inString = true;
      currentQuote = char;
      result += '"'; 
    } else if (char === currentQuote && inString) {
      inString = false;
      currentQuote = null;
      result += '"'; 
    } else {
      result += char;
    }
  }
  return result;
};
module.exports = { stripOuterBraces };
