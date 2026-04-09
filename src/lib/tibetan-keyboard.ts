
export type KeyboardState = 'none' | 'M' | 'm';

export interface CharMapEntry {
  type: 'action' | 'output';
  val: string;
}

export interface ActionEntry {
  state: KeyboardState;
  next: KeyboardState;
  output: string;
}

export const HIMALAYAN_KEYBOARD_DATA = {
  charMap: {
    "a": { "type": "action", "val": "འ" },
    "s": { "type": "action", "val": "ས" },
    "d": { "type": "action", "val": "ད" },
    "f": { "type": "action", "val": "བ" },
    "h": { "type": "action", "val": "མ" },
    "g": { "type": "action", "val": "ང" },
    "z": { "type": "action", "val": "ཟ" },
    "x": { "type": "action", "val": "ཤ" },
    "c": { "type": "action", "val": "ཀ" },
    "v": { "type": "action", "val": "ཁ" },
    "b": { "type": "action", "val": "པ" },
    "q": { "type": "action", "val": "ཅ" },
    "w": { "type": "action", "val": "ཆ" },
    "e": { "type": "action", "val": "ེ" },
    "r": { "type": "action", "val": "ར" },
    "y": { "type": "action", "val": "ཡ" },
    "t": { "type": "action", "val": "ཏ" },
    "1": { "type": "action", "val": "༡" },
    "2": { "type": "action", "val": "༢" },
    "3": { "type": "action", "val": "༣" },
    "4": { "type": "action", "val": "༤" },
    "6": { "type": "action", "val": "༦" },
    "5": { "type": "action", "val": "༥" },
    "=": { "type": "action", "val": "ཝ" },
    "9": { "type": "action", "val": "༩" },
    "7": { "type": "action", "val": "༧" },
    "-": { "type": "action", "val": "ཧ" },
    "8": { "type": "action", "val": "༨" },
    "0": { "type": "action", "val": "༠" },
    "]": { "type": "action", "val": "ཚ" },
    "o": { "type": "action", "val": "ོ" },
    "u": { "type": "action", "val": "ུ" },
    "[": { "type": "action", "val": "ཙ" },
    "i": { "type": "action", "val": "ི" },
    "p": { "type": "action", "val": "ཕ" },
    "l": { "type": "action", "val": "ལ" },
    "j": { "type": "action", "val": "་" },
    "'": { "type": "action", "val": "།" },
    "k": { "type": "action", "val": "ག" },
    ";": { "type": "action", "val": "ཞ" },
    "\\": { "type": "action", "val": "ཛ" },
    ",": { "type": "action", "val": "ཐ" },
    "/": { "type": "action", "val": "ཉ" },
    "n": { "type": "action", "val": "ན" },
    "m": { "type": "action", "val": "m" },
    ".": { "type": "action", "val": "ཇ" },
    "`": { "type": "action", "val": "ཨ" },
    "A": { "type": "output", "val": "ཱ" },
    "S": { "type": "output", "val": "༟" },
    "D": { "type": "output", "val": "ཌ" },
    "F": { "type": "output", "val": "༾" },
    "H": { "type": "output", "val": "࿏" },
    "G": { "type": "output", "val": "༿" },
    "Z": { "type": "output", "val": "༴" },
    "X": { "type": "output", "val": "ཥ" },
    "C": { "type": "output", "val": "ཀྵ" },
    "V": { "type": "output", "val": "྇" },
    "B": { "type": "output", "val": "྆" },
    "Q": { "type": "output", "val": "༕" },
    "W": { "type": "output", "val": "༖" },
    "E": { "type": "output", "val": "༗" },
    "R": { "type": "output", "val": "ྼ" },
    "Y": { "type": "output", "val": "ྻ" },
    "T": { "type": "output", "val": "ཊ" },
    "!": { "type": "output", "val": "༪" },
    "@": { "type": "output", "val": "༫" },
    "#": { "type": "output", "val": "༬" },
    "$": { "type": "output", "val": "༭" },
    "^": { "type": "output", "val": "༯" },
    "%": { "type": "output", "val": "༮" },
    "+": { "type": "output", "val": "༽" },
    "(": { "type": "output", "val": "༲" },
    "&": { "type": "output", "val": "༰" },
    "_": { "type": "output", "val": "༼" },
    "*": { "type": "output", "val": "༱" },
    ")": { "type": "output", "val": "༳" },
    "}": { "type": "output", "val": "༝" },
    "O": { "type": "output", "val": "༚" },
    "U": { "type": "output", "val": "༘" },
    "{": { "type": "output", "val": "༜" },
    "I": { "type": "output", "val": "༙" },
    "P": { "type": "output", "val": "༛" },
    "L": { "type": "output", "val": "༆" },
    "J": { "type": "output", "val": "༂" },
    "\"": { "type": "output", "val": "༸" },
    "K": { "type": "output", "val": "༃" },
    ":": { "type": "output", "val": "༇" },
    "|": { "type": "output", "val": "༞" },
    "<": { "type": "output", "val": "ཋ" },
    "?": { "type": "output", "val": "༻" },
    "N": { "type": "output", "val": "ཎ" },
    "M": { "type": "action", "val": "M" },
    ">": { "type": "output", "val": "༺" },
    "~": { "type": "output", "val": "༁" }
  } as Record<string, CharMapEntry>,
  actions: {
    " ": [
      { "state": "none", "next": "none", "output": " " },
      { "state": "M", "next": "none", "output": " " },
      { "state": "m", "next": "none", "output": " " }
    ],
    "M": [
      { "state": "none", "next": "M", "output": "" }
    ],
    "m": [
      { "state": "none", "next": "m", "output": "" },
      { "state": "M", "next": "none", "output": "ྡྷ" },
      { "state": "m", "next": "none", "output": "྅" }
    ],
    "་": [
      { "state": "none", "next": "none", "output": "་" },
      { "state": "m", "next": "none", "output": "྄" }
    ],
    "།": [
      { "state": "none", "next": "none", "output": "།" },
      { "state": "m", "next": "none", "output": "༎" }
    ],
    "༠": [
      { "state": "none", "next": "none", "output": "༠" },
      { "state": "m", "next": "none", "output": "༈" }
    ],
    "༡": [
      { "state": "none", "next": "none", "output": "༡" },
      { "state": "m", "next": "none", "output": "༄" }
    ],
    "༢": [
      { "state": "none", "next": "none", "output": "༢" },
      { "state": "m", "next": "none", "output": "༅" }
    ],
    "༣": [
      { "state": "none", "next": "none", "output": "༣" },
      { "state": "m", "next": "none", "output": "ཾ" }
    ],
    "༤": [
      { "state": "none", "next": "none", "output": "༤" },
      { "state": "m", "next": "none", "output": "ྃ" }
    ],
    "༥": [
      { "state": "none", "next": "none", "output": "༥" },
      { "state": "m", "next": "none", "output": "༷" }
    ],
    "༦": [
      { "state": "none", "next": "none", "output": "༦" },
      { "state": "m", "next": "none", "output": "༵" }
    ],
    "༧": [
      { "state": "none", "next": "none", "output": "༧" },
      { "state": "m", "next": "none", "output": "ཿ" }
    ],
    "༨": [
      { "state": "none", "next": "none", "output": "༨" },
      { "state": "m", "next": "none", "output": "༔" }
    ],
    "༩": [
      { "state": "none", "next": "none", "output": "༩" },
      { "state": "m", "next": "none", "output": "༑" }
    ],
    "ཀ": [
      { "state": "none", "next": "none", "output": "ཀ" },
      { "state": "M", "next": "none", "output": "ྦྷ" },
      { "state": "m", "next": "none", "output": "ྐ" }
    ],
    "ཁ": [
      { "state": "none", "next": "none", "output": "ཁ" },
      { "state": "m", "next": "none", "output": "ྑ" }
    ],
    "ག": [
      { "state": "none", "next": "none", "output": "ག" },
      { "state": "M", "next": "none", "output": "ྒྷ" },
      { "state": "m", "next": "none", "output": "ྒ" }
    ],
    "ང": [
      { "state": "none", "next": "none", "output": "ང" },
      { "state": "m", "next": "none", "output": "ྔ" }
    ],
    "ཅ": [
      { "state": "none", "next": "none", "output": "ཅ" },
      { "state": "m", "next": "none", "output": "ྕ" }
    ],
    "ཆ": [
      { "state": "none", "next": "none", "output": "ཆ" },
      { "state": "m", "next": "none", "output": "ྖ" }
    ],
    "ཇ": [
      { "state": "none", "next": "none", "output": "ཇ" },
      { "state": "m", "next": "none", "output": "ྗ" }
    ],
    "ཉ": [
      { "state": "none", "next": "none", "output": "ཉ" },
      { "state": "m", "next": "none", "output": "ྙ" }
    ],
    "ཏ": [
      { "state": "none", "next": "none", "output": "ཏ" },
      { "state": "m", "next": "none", "output": "ྟ" }
    ],
    "ཐ": [
      { "state": "none", "next": "none", "output": "ཐ" },
      { "state": "m", "next": "none", "output": "ྠ" }
    ],
    "ད": [
      { "state": "none", "next": "none", "output": "ད" },
      { "state": "m", "next": "none", "output": "ྡ" }
    ],
    "ན": [
      { "state": "none", "next": "none", "output": "ན" },
      { "state": "m", "next": "none", "output": "ྣ" }
    ],
    "པ": [
      { "state": "none", "next": "none", "output": "པ" },
      { "state": "m", "next": "none", "output": "ྤ" }
    ],
    "ཕ": [
      { "state": "none", "next": "none", "output": "ཕ" },
      { "state": "m", "next": "none", "output": "ྥ" }
    ],
    "བ": [
      { "state": "none", "next": "none", "output": "བ" },
      { "state": "M", "next": "none", "output": "ྜྷ" },
      { "state": "m", "next": "none", "output": "ྦ" }
    ],
    "མ": [
      { "state": "none", "next": "none", "output": "མ" },
      { "state": "m", "next": "none", "output": "ྨ" }
    ],
    "ཙ": [
      { "state": "none", "next": "none", "output": "ཙ" },
      { "state": "m", "next": "none", "output": "ྩ" }
    ],
    "ཚ": [
      { "state": "none", "next": "none", "output": "ཚ" },
      { "state": "m", "next": "none", "output": "ྪ" }
    ],
    "ཛ": [
      { "state": "none", "next": "none", "output": "ཛ" },
      { "state": "M", "next": "none", "output": "ྫྷ" },
      { "state": "m", "next": "none", "output": "ྫ" }
    ],
    "ཝ": [
      { "state": "none", "next": "none", "output": "ཝ" },
      { "state": "m", "next": "none", "output": "ྺ" }
    ],
    "ཞ": [
      { "state": "none", "next": "none", "output": "ཞ" },
      { "state": "m", "next": "none", "output": "ྮ" }
    ],
    "ཟ": [
      { "state": "none", "next": "none", "output": "ཟ" },
      { "state": "m", "next": "none", "output": "ྯ" }
    ],
    "འ": [
      { "state": "none", "next": "none", "output": "འ" },
      { "state": "m", "next": "none", "output": "ྰ" }
    ],
    "ཡ": [
      { "state": "none", "next": "none", "output": "ཡ" },
      { "state": "m", "next": "none", "output": "ྱ" }
    ],
    "ར": [
      { "state": "none", "next": "none", "output": "ར" },
      { "state": "m", "next": "none", "output": "ྲ" }
    ],
    "ལ": [
      { "state": "none", "next": "none", "output": "ལ" },
      { "state": "m", "next": "none", "output": "ླ" }
    ],
    "ཤ": [
      { "state": "none", "next": "none", "output": "ཤ" },
      { "state": "M", "next": "none", "output": "ཌྷ" },
      { "state": "m", "next": "none", "output": "ྴ" }
    ],
    "ས": [
      { "state": "none", "next": "none", "output": "ས" },
      { "state": "m", "next": "none", "output": "ྶ" }
    ],
    "ཧ": [
      { "state": "none", "next": "none", "output": "ཧ" },
      { "state": "m", "next": "none", "output": "ྷ" }
    ],
    "ཨ": [
      { "state": "none", "next": "none", "output": "ཨ" },
      { "state": "m", "next": "none", "output": "ྸ" }
    ],
    "ི": [
      { "state": "none", "next": "none", "output": "ི" },
      { "state": "m", "next": "none", "output": "ྀ" }
    ],
    "ུ": [
      { "state": "none", "next": "none", "output": "ུ" },
      { "state": "m", "next": "none", "output": "ྭ" }
    ],
    "ེ": [
      { "state": "none", "next": "none", "output": "ེ" },
      { "state": "m", "next": "none", "output": "ཻ" }
    ],
    "ོ": [
      { "state": "none", "next": "none", "output": "ོ" },
      { "state": "m", "next": "none", "output": "ཽ" }
    ]
  } as Record<string, ActionEntry[]>
};

export class TibetanKeyboardProcessor {
  private state: KeyboardState = 'none';

  processKey(key: string): string | null {
    const charMapEntry = HIMALAYAN_KEYBOARD_DATA.charMap[key];
    if (!charMapEntry) {
      this.state = 'none';
      return null;
    }

    if (charMapEntry.type === 'output') {
      this.state = 'none';
      return charMapEntry.val;
    }

    if (charMapEntry.type === 'action') {
      const actionEntries = HIMALAYAN_KEYBOARD_DATA.actions[charMapEntry.val];
      if (!actionEntries) {
        this.state = 'none';
        return null;
      }

      const entry = actionEntries.find(e => e.state === this.state);
      if (entry) {
        this.state = entry.next;
        return entry.output;
      } else {
        // Fallback: if no entry for current state, reset and try from none
        const fallbackEntry = actionEntries.find(e => e.state === 'none');
        if (fallbackEntry) {
          this.state = fallbackEntry.next;
          return fallbackEntry.output;
        }
      }
    }

    this.state = 'none';
    return null;
  }

  reset() {
    this.state = 'none';
  }
}
