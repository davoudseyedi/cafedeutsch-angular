export class Language {

  private static title: any;

  // WEBSITE LANGUAGE
  public static  readonly  HOME = {
    title: 'کافه دویچ',
    description: ''
  }
  public static  readonly  EPISODES = {
    title: 'اپیزودها',
    description: ''
  }
  public static  readonly  SINGLE_EPISODE = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  PODCAST_CATEGORY = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  POSTS = {
    title: 'بلاگ',
    description: ''
  }
  public static  readonly  SINGLE_POST = {
    title: '{{var}}',
    description: ''
  }
  public static  readonly  POST_CATEGORY = {
    title: '{{var}}',
    description: ''
  }

  public static  readonly  CONTACT = {
    title: 'تماس با ما',
    description: ''
  }

  public static  readonly  ABOUT = {
    title: 'درباره ما',
    description: ''
  }
  public static  readonly  DONATE = {
    title: 'حمایت',
    description: ''
  }

  public static  readonly  DASHBOARD = {
    title: 'داشبورد',
    description: ''
  }

  public static  readonly  BOOKMARK = {
    title: 'علاقه مندی ها',
    description: ''
  }

  public static  readonly  SETTING = {
    title: 'تنظیمات',
    description: ''
  }


  public static getTitle(key:string): string {
    const myObj: {[index: string]:any} = Language;
    return myObj[key]['title'] + ' | CafeDeutsch';
  }

  public static getDescription(key:any): string {
    const myObj: {[index: string]:any} = Language;
    return myObj[key]['description'];
  }

}
