const OpenAI = require("openai");
const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPICAPI_SECRET_KEY,
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});
const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https:
});
module.exports = {
  anthropic,
  openai,
  grok,
};
