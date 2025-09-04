# Game Constants

This file centralizes all configuration values and magic numbers used throughout the trivia application.

## Benefits of Using Constants

1. **Maintainability**: Easy to update game rules and configuration in one place
2. **Consistency**: Ensures the same values are used across all components
3. **Readability**: Makes code more self-documenting with meaningful names
4. **Type Safety**: Reduces typos and string literal errors
5. **Testing**: Easier to mock and test different configurations

## Usage Examples

```javascript
// Instead of hardcoded values
if (gameState === 'guessing') { ... }
dispatch(resetLives(3));

// Use constants
if (gameState === GAME_STATES.GUESSING) { ... }
dispatch(resetLives(INITIAL_LIVES));
```

## Constants Categories

- **Initial Values**: Starting state for game, score, lives, etc.
- **API Configuration**: Base URLs, request limits, cache times
- **Game Logic**: Thresholds, multipliers, scoring rules
- **Game States**: All possible game state values
- **Difficulty Levels**: Available difficulty options
- **Error Messages**: Standardized error and loading messages

## Future Enhancements

Consider adding:
- Theme constants (colors, fonts, spacing)
- Animation durations and easing functions
- Localization strings
- Feature flags for A/B testing
- Performance thresholds and limits
