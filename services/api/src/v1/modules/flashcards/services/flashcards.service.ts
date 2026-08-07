import { Injectable } from '@nestjs/common';
import { structuredFlashcardSchema } from '@hub/contracts';

@Injectable()
export class FlashcardsService {
  async generateDeck(title: string, cardCount: number = 5) {
    const rawDeck = {
      deckTitle: `Flashcard Deck: ${title}`,
      cards: Array.from({ length: cardCount }).map((_, idx) => ({
        id: `card_${idx + 1}`,
        front: `What is Key Concept #${idx + 1} of ${title}?`,
        back: `Detailed explanation and active recall solution for Concept #${idx + 1}.`,
        hint: `Think about core principles of ${title}.`,
      })),
    };

    return structuredFlashcardSchema.parse(rawDeck);
  }
}
