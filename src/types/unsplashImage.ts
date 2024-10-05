export interface UnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  description: string | null;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  user: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string;
    bio: string | null;
    location: string | null;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
    };
  };
  location?: {
    title: string;
    name: string;
    city: string | null;
    country: string | null;
    position: {
      latitude: number;
      longitude: number;
    };
  };
}
