const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /system\s*:\s*/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
  /###\s*(system|assistant|human)\s*:/i,
  /override\s+(safety|security|rules|instructions)/i,
  /jailbreak/i,
  /DAN\s+mode/i,
  /developer\s+mode\s+enabled/i,
];

export interface InjectionCheckResult {
  safe: boolean;
  sanitized: string;
  detected?: string;
}

export function sanitizeMessage(message: string): InjectionCheckResult {
  let sanitized = message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
  sanitized = sanitized.replace(/\r\n/g, '\n');

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      return { safe: false, sanitized, detected: pattern.source };
    }
  }

  return { safe: true, sanitized };
}
