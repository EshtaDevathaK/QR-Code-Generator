import { useContext } from "react";
import Accordian from "../accordian";
import LightDarkMode from "../light-dark-mode";
import RandomColor from "../colorChange";
import TicTacToe from "../tic-tac-toe";
import TreeView from "../treeView";
import { FeatureFlagsContext } from "./context";
import menus from "../treeView/data";
import TabTest from "../CustomTabs/tab-test";

export default function FeatureFlags() {
  const { loading, enabledFlags } = useContext(FeatureFlagsContext);

  
  const componentsToRender = [
    {
      key: "showLightAndDarkMode",
      component: <LightDarkMode />,
    },
    {
      key: "showTicTacToeBoard",
      component: <TicTacToe />,
    },
    {
      key: "showRandomColorGenerator",
      component: <RandomColor />,
    },
    {
      key: "showAccordian",
      component: <Accordian />,
    },
    {
      key: "showTreeView",
      component: <TreeView  menus={menus} />,
    },
    {
        key : 'showTabs',
        component : <TabTest/>
    }
  ];

  function checkEnabledFlags(getCurrentKey) {
    return enabledFlags[getCurrentKey];
  }

  if (loading) return <h1>Loading data ! Please wait</h1>;

  return (
    <div>
      <h1>Feature Flags</h1>
      {componentsToRender.map((componentItem) =>
        checkEnabledFlags(componentItem.key) ? componentItem.component : null
      )}
    </div>
  );
}