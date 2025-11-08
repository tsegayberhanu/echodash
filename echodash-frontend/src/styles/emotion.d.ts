import "@emotion/react";

declare module "@emotion/react" {
  export type Theme ={
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    shape: {
      borderRadius: string;
    };
    typography: {
      fontFamily: string;
    };
  }
}
