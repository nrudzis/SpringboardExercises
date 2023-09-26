const choice = (items) => {
  let randIndex = Math.floor(Math.random() * items.length);
  return items[randIndex];
}

const remove = (items, item) => {
  const index = items.indexOf(item);
  return index !== -1 ? items.splice(index, 1)[0] : undefined;
}

export {choice, remove};
