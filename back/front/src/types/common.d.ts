interface Route {
  [key: string]: {
    path: string;
    link: string;
    element: string | React.ReactNode | null |  JSX.Element;
    name: string;
  };
}

interface Props  {
  [key: string]: any;
}
interface State {
  [key: string]: {
    [key: string]: string
  };
}
interface LoginState {
  [key: string]: {
    [key: string]: boolean
  };
}