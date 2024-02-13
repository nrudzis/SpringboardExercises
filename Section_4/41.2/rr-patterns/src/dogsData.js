import dukeImg from './dog-images/duke.jpg';
import perryImg from './dog-images/perry.jpg';
import tubbyImg from './dog-images/tubby.jpg';
import whiskeyImg from './dog-images/whiskey.jpg';

const dogs = [
  {
    img: whiskeyImg,
    name: "Whiskey",
    age: 5,
    src: "whiskey",
    facts: [
      "Whiskey loves eating popcorn.",
      "Whiskey is a terrible guard dog.",
      "Whiskey wants to cuddle with you!"
    ]
  },
  {
    img: dukeImg,
    name: "Duke",
    age: 3,
    src: "duke",
    facts: [
      "Duke believes that ball is life.",
      "Duke likes snow.",
      "Duke enjoys pawing other dogs."
    ]
  },
  {

    img: perryImg,
    name: "Perry",
    age: 4,
    src: "perry",
    facts: [
      "Perry loves all humans.",
      "Perry demolishes all snacks.",
      "Perry hates the rain."
    ]
  },
  {
    img: tubbyImg,
    name: "Tubby",
    age: 4,
    src: "tubby",
    facts: [
      "Tubby is really stupid.",
      "Tubby does not like walks.",
      "Angelina used to hate Tubby, but claims not to anymore."
    ]
  }
];

export default dogs;
