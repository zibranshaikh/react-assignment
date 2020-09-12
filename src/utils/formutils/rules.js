/* eslint-disable */
import { isEmpty as isEmptyObject, isNull, each } from "lodash";

//Rules for Different Validations in fields.

const isEmpty = value => value === undefined || isNull(value) || value === "";

export const join = rules => (value, data, validationMessage) =>
  rules
    .map(rule => rule(value, data, validationMessage))
    .filter(error => !!error)[0 /* first error */];

export const email = (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!isEmpty(value) && value && !regex.test(value)) {
    return "Invalid email address";
  }
}
export function required(value, state, validationMessage) {
  const type = typeof value;
  const restrictedTrimType = ["number", "boolean"];
  if (isEmpty(value)) {
    return `Required`;
  }
  if (restrictedTrimType.indexOf(type) === -1 && value && JSON.stringify(value).trim().length === 0) {
    return `Required`;
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return "Type in a number";
  }
}
