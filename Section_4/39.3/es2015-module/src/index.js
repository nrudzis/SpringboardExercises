import foods from './foods';
import {choice, remove} from './helpers';

let randFruit = choice(foods);

console.log(`I'd like one ${randFruit}, please.`);

let removedFruit = remove(foods, randFruit);

console.log(`Here you go: ${removedFruit}`);

console.log("Delicious! May I have another?");

console.log(`I'm sorry, we're all out. We have ${foods.length} left.`);
