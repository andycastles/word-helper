# word-helper
Show variations of words with specific letters either required, or prohibited.
Helper program for solving Wordle.

## Usage
Synax: node index.mjs [TEMPLATE] [OPTIONS]

  In [TEMPLATE] specify letters in their position or '.' for unknown letter.

  OPTIONS:
  -h --help            Show this help
  -s <letters>
  --skip <letters>     Letters which cannot be used
  -r <letters>
  --require  <letters> Letters which must be used
  
