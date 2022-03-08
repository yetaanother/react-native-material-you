# React Native with Material You

This library follows UI components
from [Google Material 3 Design Kit](https://www.figma.com/community/file/1035203688168086460)

## Loot bag

* 5 button types
* 3 card types
* 4 chip types
* 1 dialog
* 4 FAB types
* 2 Select types
* 1 Navigation bar
* 2 App bar types

## How to install

> npm i @yetaanother/react-native-material-you

## Show me the components

![](screenshots/components.png)

## Show me the code

```
import { Button, ThemeProvider } from "@yetaanother/react-native-material-you";

// ...
<ThemeProvider hexColor={"#6750A4"} dark={true}>
    <Button
        containerStyle={{ margin: 4 }}
        title={"Enabled"}
        type={"filled"}
    />
</ThemeProvider>      
```

* `ThemeProvider` should be at the root of your app to customize the theme color according
  to [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/#/dynamic)
* By default, this library will use Google's default theme color ("#6650a4") and light scheme.
* Components use a `props` attribute named `stateOverride`, you shouldn't be using that. It is only used while
  developing and testing the library.
* You can find more examples on various component usages inside `example/App.tsx`.
* Right now the example app don't have `@yetaanother/react-native-material-you` as a dependency because I use this app
  for development where I locally link the library using `wml`.
* If you want to run the example app install the library before running `expo start`.

## Contributing

* Ensure to run `prettier` on the codebase
* See `dev_notes.md` to run example app with locally linking the library.
* Right now I depend on `Intellij Ultimate` for linting and formatting. Will add static analysis tools in future to the
  library