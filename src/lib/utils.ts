import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Variável com 100 emojis
export const emojis = ['😀', '😂', '😅', '😍', '😎', '😭', '🥳', '🤯', '😡', '🤩', '😜', '🤔', '🤗', '🙃', '🤐', '😴', '🥶', '🥺', '🤤', '🤑', 
  '🤧', '🤠', '👻', '💩', '👽', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '🐵', '🦄', '🐷', '🐼', 
  '🐨', '🐯', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐸', '🐲', '🐔', '🐧', '🐦', '🐤', '🐥', '🦉', '🦇', '🐺', '🐗', 
  '🦋', '🐛', '🐜', '🐝', '🐞', '🦀', '🦑', '🦐', '🐙', '🦆', '🦢', '🦩', '🦚', '🐢', '🐍', '🐠', '🐬', '🐳', '🐋', '🦈', 
  '🐊', '🦖', '🦕', '🐾', '🐉', '🐙', '🌵', '🎄', '🌲', '🌳', '🌴', '🌸', '🌺', '🌼', '🌻', '🌹', '🌷', '🌱', '🌿', '☘️'];
  
// Função que retorna um emoji aleatório
export function getRandomEmojis(count: number) {

  

  const randomEmojis = [];
  for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      randomEmojis.push(emojis[randomIndex]);
  }
  return randomEmojis;
}

