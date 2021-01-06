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
3. Improve styling of labels
4. Load low-res full map, but high res segments
5. Change map label/line color on dark/light mode
6. Simplify data
