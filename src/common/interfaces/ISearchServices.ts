/**
 * @exports
 * @interface ISearchService
 * @member
 */
export interface ISearchService {
  /**
   * Search for anything.
   *
   * @param search - Search value
   * @param callback - Callback function
   * @returns
   * @memberof ISearchService
   */
  search: (search: string, callback: void) => Promise<void>;
  /**
   * Get online html search page.
   *
   * @param search - Search value
   * @returns
   * @memberof ISearchService
   */
  getSearchPage: (search: string) => Promise<string>;
  /**
   * Format html page to list of readable data.
   *
   * @param page - HTML page.
   * @returns
   * @memberof ISearchService
   */
  format: (
    page: string
  ) => { search: string; title: string; description: string; link: string }[];
}
