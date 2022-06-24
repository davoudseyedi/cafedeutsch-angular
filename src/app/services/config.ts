import {environment} from "../../environments/environment.prod";

export class Config {

  public static readonly SITE_URL = environment.SITE_URL;
  public static readonly API = environment.API_BASE_URL;
  public static readonly WEBSITE_AUTH_BASE_URL = Config.API + '/auth';

  // Podcasts Api's
  public static readonly WEBSITE_ALL_PODCASTS = Config.API + '/client/episodes';
  public static readonly WEBSITE_FEATURED_PODCASTS = Config.API + '/featured-podcasts';
  public static readonly WEBSITE_PROMOTED_PODCASTS = Config.API + '/newest-podcast';

  // Blogs Api's
  public static readonly WEBSITE_ALL_BLOGS = Config.API + '/client/posts';

  // Category
  public static readonly WEBSITE_ALL_CATEGORY = Config.API + '/client/category';

  // Bookmark
  public static readonly WEBSITE_BOOKMARK = Config.API + '/client/bookmarks';


  // Contact Api
  public static readonly WEBSITE_CONTACT = Config.API + '/client/contact';





  /**
   * Defaults
   */
  public static readonly DEFAULT_META_TITLE = 'Cafe Deutsch';
  public static readonly DEFAULT_META_DESCRIPTION = 'Default description to set in meta description.';
  public static readonly DEFAULT_META_KEYWORDS = 'Default keywords to set in meta description.';


}
