export interface List {
  id: string;
  image: string;
  title: string;
  customer: {
    name: string;
  };
}

export interface Movies {
  category: string;
  movies: List[];
}
