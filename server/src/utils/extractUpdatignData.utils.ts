export const extractUpdatingData = (source: Record<string, any>, fields: string[]) => {
  return fields.reduce(
    (acc, field) => {
      if (source && source[field] !== undefined) {
        acc[field] = source[field];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};
