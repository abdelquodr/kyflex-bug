import React, { useState } from 'react';

/*
    This file contains tab block, and container for tab, my original custom component.
    You also import TabKeyHooks with Tabs, Tab.

    How to use Tabs:
        <Tabs>
            //tab go here
        </Tabs>

    How to use Tab:
        <Tab id="this is optional" activeKey={key} select_key={some_key}>
            //tab content goes here
        </Tab>
*/

const Tabs = (props) => {
  return <>{props.children}</>;
};

const Tab = (props) => {
  const { activeKey, select_key, id = '', children } = props;

  const renderCSS = () => {
    const visibility =
      activeKey === select_key ? 'display-block' : 'display-none';
    return `${visibility} width100`;
  };
  return (
    <section id={id} className={renderCSS()}>
      {children}
    </section>
  );
};

const TabKeyHooks = (val) => {
  const [key, setKey] = useState(val);
  return { key, setKey };
};

export { Tabs, Tab, TabKeyHooks };
