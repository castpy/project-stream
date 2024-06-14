export interface GroupByCategoryMovie {
  id: string;
  image: string;
  title: string;
  category: string[];
  customer: {
    name: string;
  };
}
