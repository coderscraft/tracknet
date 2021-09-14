import React from 'react';

const JSONFormator = (props) => {
  const { jsonStr } = props;
  return <pre>{JSON.stringify(JSON.parse(jsonStr), null, 4)}</pre>;
};

export default JSONFormator;
