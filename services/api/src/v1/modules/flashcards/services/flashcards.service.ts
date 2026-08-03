import { Injectable } from '@nestjs/common';
import { GenerateFlashcardsDto } from '../dto/generate-flashcards.dto';
import { structuredFlashcardSchema, StructuredFlashcardDeck } from '@hub/contracts';

@Injectable()
export class FlashcardsService {
  async generateFlashcardDeck(dto: GenerateFlashcardsDto): Promise<StructuredFlashcardDeck> {
    const cardCount = dto.cardCount || 5;

    const rawDeck = {
      deckTitle: `Flashcard Deck: ${dto.title}`,
      cards: Array.from({ length: cardCount }).map((_, i) => ({
        id: `card-${i + 1}`,
        front: `What is concept #${i + 1} regarding ${dto.title}?`,
        back: `Concept #${i + 1} definition extracted from study material.`,
        hint: `Think about core principles of ${dto.title}.`,
      })),
    };

    // Validate structured JSON response against Zod contract
    return structuredFlashcardSchema.parse(rawDeck);
  }
}
