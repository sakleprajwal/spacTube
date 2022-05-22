import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  
  {
    _id: uuid(),
    imgUrl: "https://picsum.photos/id/175/400/250",
    categoryName: "Trending",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    _id: uuid(),
    imgUrl: "https://picsum.photos/id/1079/400/250",
    categoryName: "Music",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    _id: uuid(),
    imgUrl: "https://picsum.photos/id/1077/400/250",
    categoryName: "Sport",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  
  {
    _id: uuid(),
    imgUrl: "https://picsum.photos/400/250",
    categoryName: "Gaming",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    _id: uuid(),
    imgUrl: "https://picsum.photos/id/230/400/250",
    categoryName: "Nature",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }, 
  {
    _id: uuid(),
    imgUrl: "https://picsum.photos/id/1/400/250",
    categoryName: "Web development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
