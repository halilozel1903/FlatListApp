# helloWorldApp

React Native app that loads contacts from the Random User API (`https://randomuser.me/api/`) and shows them in a `FlatList`. Each row shows a photo, name, and state. The search field filters by first name, last name, and state. Pull to refresh reloads the first page. Reaching the end of the list requests the next page of 15 contacts.

The app is in `FlastListExample/`.

## Versions

- React Native 0.63.5
- React 16.13.1
- Axios 1.13.6

## Requirements

- Node.js and Yarn 1
- Node 17 and later: Metro 0.59 hashes with MD4. Export `NODE_OPTIONS=--openssl-legacy-provider` before `yarn start`, `yarn android`, or `yarn ios`. Without it the bundler exits with `ERR_OSSL_EVP_UNSUPPORTED`.
- Android: JDK 11 and Android SDK 29 (min SDK 16, build-tools 29.0.2). The wrapper is Gradle 6.9.4 with Android Gradle Plugin 3.5.3. JDK 17 and later cannot start that wrapper.
- iOS: Xcode, CocoaPods, and the Podfile’s iOS 10.0 deployment target.

## Install

```sh
cd FlastListExample
yarn install
```

## Run

From `FlastListExample/`:

```sh
export NODE_OPTIONS=--openssl-legacy-provider
yarn start
```

In another terminal, from the same directory:

```sh
# Android. JAVA_HOME must point at JDK 11.
yarn android
```

```sh
# iOS. Podfile.lock still records React Native 0.63.3; pod install aligns the pods with 0.63.5.
cd ios
pod install
cd ..
yarn ios
```

## Test

From `FlastListExample/`:

```sh
yarn test --forceExit
```

This runs the render test in `__tests__/App-test.js`. `yarn test` without `--forceExit` prints a pass, then exits 1, because the contact request continues after Jest tears the environment down.
