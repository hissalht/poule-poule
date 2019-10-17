export const CardType = {
  EGG: 'EGG',
  CHICKEN: 'CHICKEN',
  FOX: 'FOX',
  DOG: 'DOG',
  DUCK: 'DUCK'
};

export function getEggCount(cardStack) {
  let eggs = 0;
  let activeChickens = 0;
  let activeFoxes = 0;
  // let activeDogs = 0;
  cardStack.forEach(card => {
    switch (card) {
      case CardType.EGG:
        eggs++;
        break;
      case CardType.CHICKEN:
        if (eggs > 0) {
          eggs--;
          activeChickens++;
        }
        break;
      case CardType.FOX:
        if (activeChickens > 0) {
          activeFoxes++;
          eggs++;
          activeChickens--;
        }
        break;
      case CardType.DOG:
        if (activeFoxes > 0) {
          activeFoxes--;
          activeChickens++;
          eggs--;
          // activeDogs++;
        }
        break;
      case CardType.DUCK:
        break;
      default:
        throw new Error(`Unknown card: ${card}`);
    }
  });
  return eggs;
}

export function getRandomCard() {
  return Object.values(CardType)[
    Math.floor(Math.random() * Object.values(CardType).length)
  ];
}
