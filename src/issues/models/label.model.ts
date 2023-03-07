export interface Label {
  id: number;
  url: string;
  name: string;
  color: string;
  node_id: string;
  default: boolean;
  description?: string;
}

export const toLabels = (json: string): Label[] => JSON.parse(json);

export const labelsToJson = (value: Label[]): string => JSON.stringify(value);
