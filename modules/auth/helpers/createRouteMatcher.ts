import { NextRequest } from "next/server";

/**
 * Creates a route matcher function that checks if a given request's pathname matches any of the provided patterns.
 *
 * @param patterns - An array of string patterns to match against the request's pathname.
 *                   The patterns can include "(.*)" to match any sequence of characters.
 * @example createRouteMatcher(["/login", "/dashboard", "/profile(.*)"])
 * @returns A function that takes a `NextRequest` object and returns `true` if the request's pathname matches any of the patterns, otherwise `false`.
 */

export const createRouteMatcher = (patterns: Array<String>) => {
  /**
   * Convert the patterns into an array of regular expressions.
   * The patterns are converted to regular expressions by:
   * - Prepending "^" to match the start of the string.
   * - Replacing "(.*)" with "(/.*)?" to match any sequence of characters.
   * - Appending "$" to match the end of the string.
   * - Creating a new `RegExp` object with the modified pattern.
   */
  const regexps = patterns.map((pattern) => new RegExp(`^${pattern.replace("(.*)", "(/.*)?")}$`));

  return (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    /**
     * Check if the request's pathname matches any of the regular expressions.
     * Return `true` if a match is found, otherwise `false`.
     * The `Array.prototype.some` method is used to iterate over the regular expressions and return `true` if any of them match the pathname.
     */
    return regexps.some((regexp) => regexp.test(pathname));
  };
};
