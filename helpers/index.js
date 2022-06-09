import cn from "classnames";

export const parseUsers = (users) => {
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      city: user.address.city,
    };
  });
};

export const getHighlightedText = (text, highlight) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          className={cn({
            ["highlighted"]: part.toLowerCase() === highlight.toLowerCase(),
          })}
        >
          {part}
        </span>
      ))}{" "}
    </>
  );
};

export const sortByFieldName = (fieldName, data, sortedField, isSorted) => {
  let newIsSorted = false;
  let sorted;
  if (fieldName === sortedField && isSorted) {
    sorted = data.sort((a, b) => {
      return a[fieldName].toString().toLowerCase() >
        b[fieldName].toString().toLowerCase()
        ? -1
        : 1;
    });
  } else {
    sorted = data.sort((a, b) => {
      return a[fieldName].toString().toLowerCase() <
        b[fieldName].toString().toLowerCase()
        ? -1
        : 1;
    });
    newIsSorted = true;
  }

  return { newIsSorted, sorted };
};
