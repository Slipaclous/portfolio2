export type ProjectDescriptionKey = 'mgEvent' | 'amarea' | 'leonardi' | 'rentabook' | 'bosmans' | 'bruxelles' | 'fiftyone';

export interface Project {
  title: string;
  descriptionKey: ProjectDescriptionKey;
  image: string;
  tags: string[];
  demo: string;
  github?: string;
}