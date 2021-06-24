
export class Config {
  public static readonly SITE_URL = 'http://cafedeutsch.lan';
  public static readonly API = Config.SITE_URL + '/api';



  public static readonly ANCHOR_API = 'https://api.rss2json.com/v1/api.json';


  //Podcasts Api's
  public static readonly WEBSITE_ALL_PODCASTS = Config.API + '/podcasts';
  public static readonly WEBSITE_FEATURED_PODCASTS = Config.API + '/featured-podcasts';

  //Blogs Api's
  public static readonly WEBSITE_ALL_BLOGS = Config.API + '/blogs';


  /**
   * Defaults
   */
  public static readonly DEFAULT_META_TITLE = 'Cafe Deutsch';
  public static readonly DEFAULT_META_DESCRIPTION = 'Default description to set in meta description.';
  public static readonly DEFAULT_META_KEYWORDS = 'Default keywords to set in meta description.';


}
