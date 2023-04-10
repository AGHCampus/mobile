# AGH Campus Map - Mobile App

## Getting Started

To get the react native project running on your mac, follow the following steps.

-   Open a terminal like [iTerm2](https://www.iterm2.com/downloads.html)
-   Highly recommend using
    [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) for interacting with
    git through the terminal.
-   Clone the repo into any directory you'd like

```shell
git clone https://github.com/AGHCampus/mobile.git
```

### VSCode Setup

-   Download [VSCode](https://code.visualstudio.com/)
-   Drag the project folder into VSCode (as an alternative you can open project
    directory in terminal and type `code .`)
-   Click on the bottom icon on the left (called Extensions) and add check
    recommended extension section. There are few that you should have:

    -   Prettier
    -   React Native Tools
    -   ESLint
    -   Jest

### Node and nvm Setup

Follow the nvm installation instructions
**[here](https://github.com/nvm-sh/nvm#install--update-script)**. Once nvm is
installed, use it to install Node 18 and set it as the default Node version for
your system:

```shell
nvm install 18
nvm use 18
```

Create links to node, npm and npx in your `/usr/local/bin/` directory. This
helps applications like Visual Studio Code find your node binaries:

```shell
sudo ln $NVM_DIR/versions/node/$(nvm current)/bin/node /usr/local/bin
sudo ln -s $NVM_DIR/versions/node/$(nvm current)/bin/npm /usr/local/bin
sudo ln -s $NVM_DIR/versions/node/$(nvm current)/bin/npx /usr/local/bin
```

### React Native Setup

#### Node Setup

To setup React Native just follow the offical instructions
**[here](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=ios)**
for iOS, and
**[here](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=android)**
for android.

Follow along the steps all the way through where you can successfully create a
sample app and be able to run it on **both iOS simulator and Android emulator**.

#### Watchman

If not already installed, please instal `watchman` by running this

```
brew install watchman
```

### Ruby Setup

If you encounter errors with `yarn pod`, most probably the ruby version is not
set up correctly.

-   In terminal, run `ruby -v` to check, if it's not version 3, follow the steps
    below.

You might already have ruby 3 installed, check the folder `~/.rbenv/versions`

-   If no version 3 folder exists, you'll need to manually install Ruby using
    your favorite ruby version manager.
    -   The below steps use rbenv:
        -   Install rbenv following the instructions
            [here](https://github.com/rbenv/rbenv#using-package-managers).
        -   Make sure to follow the instructions in your terminal to properly
            update your respective shell profile (e.g., bash, zsh, etc.).
        -   Install version 3.0.x of ruby using rbenv: `rbenv install 3.0.x`.
        -   Set the global version of ruby to 3.0.x: `rbenv global 3.0.x`.
-   Add the following snippets to ~/.zshrc

```shell
rbenv init
eval "$(rbenv init -)"
rbenv shell 3.0.1 # change to 3.0.x if you have a different version
```

-   Make sure `ruby -v` shows correct version every time you restart the
    Terminal

### Build and Run App

For iOS, you'll need to install CocoaPods:

```shell
brew install cocoapods
```

This project uses Yarn. You'll need to install Yarn if you don't have it yet.

```shell
brew install yarn
```

Go to project root and run:

```shell
yarn
yarn pod # to install ios dependencies
yarn start
```

In another terminal:

```shell
yarn ios # or yarn android
```

In order to debug native code or run on a device, you'll need to use Xcode or
Android Studio.

### Clean project

You might run into problems after switching branches or making a project
configuration change. Use these commands to empty out build folders and caches,
and then try building again.

> ⚠️ NOTE: Quit your React Native Packager before cleaning.

|                        |                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `yarn clean-modules`   | deletes `node_modules`                                                                                     |
| `yarn clean-and-ready` | cleans all modules, build cache and derived data, followed by `yarn` and `yarn pod` so you can test again. |
