export interface oil_companies {
  codigo: string;
  name: string;
  description: string;
  logo_image: string;
  image: string;
  country: string,
  chairperson: string,
  industry: string;
  total_revenue: string,
  subsidiary: string;
  employees: number;
  parent_platforms: Array<ParentPlatform>;

}

export interface APIResponse<T> {
  results: Array<T>;

}

interface ParentPlatform {
  platform: {
    name: string;
  };
}