export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}


// create a type script type based on json above
export interface HNStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[] | HNStory[];
  kidsResult: string[];
  score: number;
  text?: string;
  time: number;
  title: string;
  type: string;
}

export interface HNStoryCurated {
  comments: string;
  text: string;
  title: string;
}

