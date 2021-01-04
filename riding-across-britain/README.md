# pieter.is

Personal website

## Setup

1. Clone the repo

    ```bash
    git clone git@github.com:pouwerkerk/pouwerkerk.github.io.git
    ```

2. Navigate to project directory and install dependencies

    ```bash
    cd pouwerkerk.github.io && yarn
    ```

3. Build bundle

    ```bash
    npm run build
    ```

## Editing

Use `start` to rebuild bundle and reload development server as you make changes.

```bash
npm run start
```

## Distributing

Use `build` to build the bundle and serve the generated HTML and JS files for production.

1. Build
```bash
npm run build
```

2. Serve
```bash
cd dist && python -m SimpleHTTPServer 8080
```

# TODO

1. Align labels with midpoints
2. Animate drawing lines
3. Add back and forward buttons
4. Add links to donation page
5. Add description for cause
6. Improve styling of labels
7. Add button to reset view
