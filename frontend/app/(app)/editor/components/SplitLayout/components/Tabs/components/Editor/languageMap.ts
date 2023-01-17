type Language = "python" | "javascript" | "typescript" | "markdown" | "html" | "css" | "sass" | "less" | "json" | "c" | "cpp" | "csharp"
type Extension = "py" | "js" | "jsx" | "ts" | "tsx" | "md" | "html" | "css" | "scss" | "sass" | "less" | "json" | "c" | "cpp" | "cs"

export default {
  "py": {
    "language": "python"
  },
  "js": {
    "language": "javascript"
  },
  "jsx": {
    "language": "javascript",
    "options": {
      "jsx": true
    }
  },
  "ts": {
    "language": "typescript"
  },
  "tsx": {
    "language": "typescript",
    "options": {
      "jsx": true
    }
  },
  "md": {
    "language": "markdown"
  },
  "html": {
    "language": "html"
  },
  "css": {
    "language": "css"
  },
  "scss": {
    "language": "sass"
  },
  "sass": {
    "language": "sass"
  },
  "less": {
    "language": "less"
  },
  "json": {
    "language": "json"
  },
  "c": {
    "language": "c"
  },
  "cpp": {
    "language": "cpp"
  },
  "cs": {
    "language": "csharp"
  }
} as { [name in Extension]: { language: Language, options?: any } }
