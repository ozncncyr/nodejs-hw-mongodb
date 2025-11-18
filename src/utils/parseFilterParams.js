const parseContactType = type => {
  const istString = typeof type === 'string' || type instanceof String;
  if (!istString) return;
  const validTypes = ['personal', 'home', 'work', 'other'];
  return validTypes.includes(type) ? type : null;
};

const parseIsFavourite = fav => {
  if (fav === undefined) return;
  if (fav === 'true') return true;
  if (fav === 'false') return false;
  return null;
};

export const parseFilterParams = query => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
