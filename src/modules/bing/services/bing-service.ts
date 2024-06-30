import axios from 'axios';
import cheerio from 'cheerio';
import { ISearchService } from '@/common/interfaces/ISearchServices';

/**
 * @exports
 * @class BingService
 * @implements ISearchService
 * @member
 */
export class BingService implements ISearchService {
  constructor() {}

  /**
   * @inheritdoc
   */
  search = async (
    search: string
  ): Promise<{ search: string; data: { title: string; description: string; link: string; site: string }[] }> => {
    const htmlPage: string = await this.getSearchPage(search);
    return {
      search,
      data: this.format(htmlPage),
    };
  };

  /**
   * @inheritdoc
   */
  getSearchPage = async (search: string): Promise<string> => {
    return await (
      await axios.get(`https://www.bing.com/search?q=${search}`)
    ).data;
  };

  /**
   * @inheritdoc
   */
  format = (page: string): { title: string; description: string; link: string; site: string }[] => {
    const data: { search: string; title: string; description: string; link: string; site: string }[] = [];
    let $ = cheerio.load(page);

    $('#b_results')
      .children()
      .each(function () {
        let item: (typeof data)[0] = {} as (typeof data)[0];
        item.title = $(this).find('h2').text().trim();
        item.description = $(this).find('.b_caption').find('p').text().trim();
        item.link = $(this).find('.tilk').attr('href') as string;
        item.site = $(this).find('.tptt').text().trim();
        data.push(item);
      });

    return data;
  };
}
