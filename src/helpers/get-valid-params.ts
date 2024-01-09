import { NRELResponseQuery, attributes } from "../interfaces/NRELQuery";
import { SelectorOption } from "../interfaces/SelectorOptions";
import { usePlacesStore } from "../stores/places/places.store";
import { useUserStore } from "../stores/user/user.store";

export const getValidParams = async (
  resourceApi: string,
  year: string | number,
  interval: string | number
): Promise<SelectorOption[]> => {
  const user = useUserStore.getState().user;
  const selectedLocation = usePlacesStore.getState().selectedLocation;
  const paramsUrl = `${resourceApi}.csv?api_key=${useUserStore.getState().user.nrelAPIKey}&email=${
    user.email
  }&wkt=POINT(${selectedLocation.lng} ${selectedLocation.lat})&names=${year}&interval=${interval}}`;
  const response = await fetch(`${paramsUrl}&attributes=not_a_valid_attribute`); //using fetch to get data even if it is error
  const data = await response.json();
  const nrelQueryData = data as NRELResponseQuery;
  const paramsError = nrelQueryData.errors.find((error) => error.indexOf("The optional 'attributes' parameter") !== -1);
  const validValueRegex = /Values may include (.+)/;
  const attributesMatch = paramsError.match(validValueRegex);
  if (attributesMatch && attributesMatch.length > 1) {
    const attributesStr = attributesMatch[1].split(",").map((attribute) => attribute.trim());
    console.log(attributesStr);
    const attributes = attributesStr.map((value) => getAttribute(value.trim()));
    const options: SelectorOption[] = attributes.map((o) => ({ itemLabel: o.name, value: o.attribute }));
    return options;
  }
  return [];
};

export const getAttribute = (attr: string) => {
  const foundAttribute = attributes.find((attribute) => attribute.attribute === attr);
  return foundAttribute;
};
