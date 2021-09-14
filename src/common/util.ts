
export const formatJson = (jsonStr: string) => (
  <pre>{JSON.stringify(JSON.parse(jsonStr), null, 4)}</pre>
);
