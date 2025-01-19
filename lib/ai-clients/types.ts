export interface AIResponse {
  content: string;
  error?: string;
}

export interface AIClient {
  generateCompletion(messages: Array<{ role: string; content: string }>): Promise<AIResponse>;
}
