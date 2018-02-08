# Ocelot Consulting Swagger Editor

### What

A wrapper around swagger-editor that persists changes to the source yaml file

### Why

The official npm swagger module hadn't had a release in over 2 years, the editor was still using the old swagger editor and ui, and it was becoming painful to try and edit larger swagger files in it (plus the look and feel was a bit dated).

Originally this project was going to be a fork of the npm swagger module with the goal of updating the UI, but the changes in the swagger-editor project were too great to allow for any reuse of the current codebase.

### Installation

`npm i -g @ocelot-consulting/swagger`

### Usage

- Navigate to the root of your project
- A `package.json` file is required
- `package.json` either needs to be in the directory that `o-swagger` runs from, or by passing `--package /relative/or/absolute/path/to/package.json`
- By default, a `swagger.yaml` is expected to be located at `./api/swagger/swagger.yaml` relative to the root of your node project.
- You can override the default by passing `--fileName ./relative/path/to/swagger/file.yaml`
- Execute `o-swagger edit` to start the editor process and automatically open the editor ui in your default browser

Changes to the yaml are persisted back to the source file as long as the editor process keeps running.