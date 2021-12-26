
export class Config {
  public static readonly SITE_URL = 'https://core-test.cafedeutsch.net';
  public static readonly API = Config.SITE_URL + '/api';
  public static readonly WEBSITE_AUTH_BASE_URL = Config.SITE_URL + '/user';



  // public static readonly ANCHOR_API = 'https://api.rss2json.com/v1/api.json';


  // Podcasts Api's
  public static readonly WEBSITE_ALL_PODCASTS = Config.API + '/podcasts';
  public static readonly WEBSITE_FEATURED_PODCASTS = Config.API + '/featured-podcasts';
  public static readonly WEBSITE_PROMOTED_PODCASTS = Config.API + '/newest-podcast';
  public static readonly WEBSITE_FLAGGING = Config.SITE_URL + '/entity/flagging';

  // Blogs Api's
  public static readonly WEBSITE_ALL_BLOGS = Config.API + '/blogs';

  // Contact Webform Api
  public static readonly WEBSITE_WEBFORM = Config.SITE_URL + '/webform_rest/submit';

  // Category
  public static readonly WEBSITE_PODCAST_CATEGORY = Config.API + '/podcast-category';
  public static readonly WEBSITE_BLOG_CATEGORY = Config.API + '/blog-category';

  // Taxonomy List
  public static readonly WEBSITE_BLOG_CATEGORY_LIST = Config.API + '/blog-taxonomies-list';





  /**
   * Defaults
   */
  public static readonly DEFAULT_META_TITLE = 'Cafe Deutsch';
  public static readonly DEFAULT_META_DESCRIPTION = 'Default description to set in meta description.';
  public static readonly DEFAULT_META_KEYWORDS = 'Default keywords to set in meta description.';


}
