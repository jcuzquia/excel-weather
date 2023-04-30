import { NRELResponseQuery } from "../interfaces/NRELQuery";
import { SelectorOption } from "../interfaces/SelectorOptions";

export const getResourceItems = (response: NRELResponseQuery) => {
  try {
    if (response.outputs.length < 1) return null;
    const resourceItems: SelectorOption[] = response.outputs.map((output) => {
      const item: SelectorOption = { itemLabel: output.displayName, value: output.name };
      return item;
    });
    return resourceItems;
  } catch (error) {
    return [];
  }
};
