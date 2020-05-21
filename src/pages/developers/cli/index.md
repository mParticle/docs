---
title: mParticle Command Line Interface
---

[![npm version](http://img.shields.io/npm/v/@mparticle/cli.svg?style=flat)](https://www.npmjs.com/package/@mparticle/cli 'View this project on npm')
[![GitHub version](https://badge.fury.io/gh/mParticle%2Fmparticle-cli.svg)](https://badge.fury.io/gh/mParticle%2Fmparticle-cli)
[![Build Status](https://travis-ci.com/mParticle/mparticle-cli.svg?branch=master)](https://travis-ci.com/mParticle/mparticle-cli)

## Overview

The mParticle Command Line Interface (CLI) can be used to communicate with various mParticle services and functions through simple terminal commands.

Through the CLI, an engineer can directly interface with many of mParticle's services without needing to make requests directly, (such as commands via cUrl or Postman). Also, many of these requests can be integrated in any Continuous Integration/Continuous Deployment (CI/CD) systems.

<aside> Though the CLI is free to use for anyone, it does expose some premium features which require access credentials. Please reach out to your Customer Success Manager to get started.</aside>

## Installation

The CLI installs as a simple npm package. Simply install globally and then type `mp` once installed.

```shell
$ npm install -g @mparticle/cli
$ mp [COMMAND]
running command...
$ mp (-v|--version|version)
@mparticle/cli/1.X.X darwin-x64 node-v10.XX.X
$ mp --help [COMMAND]
USAGE
  $ mp COMMAND
```

### Verifying installation

To verify your installation and version, use the `mp --version`

```shell
$ mp --version
@mparticle/cli/1.X.X darwin-x64 node-v10.XX.X
```

### Getting Started

Simply use `mp help` to view a list of the available commands.

```shell
$ mp help
mParticle Command Line Interface

VERSION
  @mparticle/cli/1.X.X darwin-x64 node-v10.XX.X

USAGE
  $ mp [COMMAND]

COMMANDS
  autocomplete  display autocomplete installation instructions
  help          display help for mp
  planning      Manages Data Planning

```

### Setting up autocomplete

As a convenience, we provide a simple autocomplete feature, where you can type in part of a command, then press `<TAB>` to autocomplete a command.

Simply type `mp autocomplete` for instructions on configuring this feature.

### Staying up to date

Simply use `npm install -g @mparticle/cli` to upgrade to the latest version.

## Configuration

To perform commands on the CLI, you pass in flags such as authentication credentials or record identifiers. Some of these parameters can be added to an optional configuration file, `mp.config.json`, to be shared between commands or other mParticle applications.

The CLI will automatically search in the current working directory for a valid json filed named `mp.config.file`.

Alternatively, a json file can be passed in with the `--config=/path/to/config` flag.

For example, if you need to store configs for multiple projects, you could store them in a central location and pass in either a relative or absolute path to the cli:

```bash
$> mp planning:data-plan-versions:fetch --config=~/.myconfigs/custom.config.json
```

It is recommended to have a single `mp.config.json` file at the root of your project and always run the CLI from the root.  If you are using our data planning linters, you must name your file `mp.config.json` and keep it at the root of your folder.

### Example mp.config.json file

```json
{
  "global": {
    "workspaceId": "XXXXX",
    "clientId": "XXXXXX",
    "clientSecret": "XXXXXXXXX"
  },
  "planningConfig": {
    "dataPlanVersionFile": "./path/to/dataPlanVersionFile.json"
  }
}
```

### global

This contains settings that would pertain to your account credentials and application.

- `workspaceId`: The workspace identifier for your team's workspace
- `clientId`: A unique Client Identification string provided by your Customer Success Manager
- `clientSecret`: A secret key provided by your Customer Success Manager

It is recommended that you always have these three credentials in your configuration as they are used by other Platform API services, such as Data Planning

### planningConfig

These are configurations pertaining to your project's Data Master resources, such as data plans and data plan versions. `planningConfig` is required if you use our data plan linting tools, which you can learn more about [here](/developers/linting/). Note that from the UI under Data Master/Plans, the json you download is a specific `data plan version`.

 - `dataPlanVersionFile`: A relative or absolute path file to your desired data plan version (used in place of `dataPlanFile` and `versionNumber`)
 - `dataPlanId`: The ID of your current Data Plan
 - `dataPlanFile`: A relative or absolute path to your data plan file (must be used with `versionNumber` below)
 - `versionNumber`: The Current Version Number for your Data Plan (must be used with `dataPlanFile`)

## Workflow

At its core, the CLI exposes services in a manner that is consistent with our REST APIs. Each command will offer a unique set of sub commands, as well as arguments and flags.

The CLI also provides universal command flags for global functions, such as `--help` or `--outfile`.

The CLI command structure is as follows:

```shell
mp [COMMAND]:[SUBCOMMAND]:[subcommand] --[flag]=[value][args...]
```

By default, every command will output to the CLI’s standard out. By adding a flag of `--outFile=/path`, the user can output the response to a log file (or json file) depending on the use case.

The CLI provides a `--help` flag which reveals all acceptable parameters and flags for a command, as well as a list of commands. Furthermore, top level commands will reveal their respective sub commands upon execution.

## Authentication

Any CLI command that requires any mParticle HTTP API resources allows two options for authentication. You can pass credentials via either 1. command line or 2. an `mp.config.json` file in the root of your project.

Both of these methods will internally generate a bearer token on your behalf, as describe in [Platform API Authentication](https://docs.mparticle.com/developers/platform/#authentication).

Credentials Required:

- Workspace ID: [Managing Workspace](/guides/platform-guide/workspaces/#managing-workspaces)
- Client ID & Client Secret: In [Managing Workspace](/guides/platform-guide/workspaces/#managing-workspaces), after you click on the specific workspace, there will be a pop up with a Key and Secret. Fill this in as your Client ID and Client Secret.

### via CLI

Simply pass your authentication credentials via the following CLI flags:

```shell
$ mp [COMMAND]:[SUBCOMMAND] --workspaceID=XXXX --clientId=XXXXX --clientSecret=XXXXXX
```

### via Configuration File

To integrate with various services, we recommend adding an `mp.config.json` file to the root of your project. This will allow you to set various properties related to your mParticle account as well as other project settings, such as your data plan directory.

_For more information on [mp.config.json](/developers/cli#configuration)._

For example, to authenticate, make sure the following is in your `mp.config.json` file:

```json
// mp.config.json
{
  "global": {
    "workspaceId": "XXXXX",
    "clientId": "XXXXXX",
    "clientSecret": "XXXXXXXXX"
  }
}
```

This configuration file can then be referenced via the cli flag `--config`. Additionally, the cli will search your current working directory for `mp.config.json`.

## Services

### Data Planning

For customers subscribed to [Data Master](https://docs.mparticle.com/guides/data-master/), the CLI exposes commands to allow for Creating, Fetching, Updating, and Deleting data plans, as well as validating your events against a downloaded Data Plan.

Please be aware that all of these services require Platform API authentication credentials via `mp.config.json` or via CLI arguments: `clientId`, `clientSecret` and `workspaceId` as well as Data Planning access.

#### Fetching Data Plans and Data Plan Versions

Fetching a Data Plan requires that a data plan exists on the server. Simply pass the `dataPlanId` as a flag to fetch this resource.

![](/images/dataplanning/dataPlanId_in_details_view.png)

![](/images/dataplanning/dataPlanId_in_list_view.png)

The Resource must exist on the server, otherwise this will fail.

```shell
$ mp planning:data-plans:fetch --dataPlanId=XXXXXX
```

To fetch a Data Plan Version, simply use `mp planning:data-plan-versions:fetch` and pass a `dataPlanId` and `versionNumber`.

#### Creating a Data Plan and Data Plan Versions

Use the following command to create a Data Plan Resource (or Data Plan Version) on the server.

```shell
$ mp planning:data-plans:create --dataPlan="{ // Data plan as string //}"
```

You can also replace `dataPlan` with `dataPlanFile` to use a path to a locally stored data plan if that is more convenient.

For example:

```shell
$ mp planning:data-plans:create --dataPlanFile=/path/to/dataplan/file.json
```

To create a Data Plan Version, simply use `mp planning:data-plan-versions:create` and pass a `dataPlanId` as a secondary flag.

#### Editing a Data Plan and Data Plan Versions

To edit an existing Data Plan (or Data Plan Version) on the server, use the following:

```shell
$ mp planning:data-plans:update --dataPlanId=XXXX --dataPlan="{ // Data plan as string //}"
```

You can also replace `dataPlan` with `dataPlanFile` to use a path to a locally stored data plan if that is more convenient.

For example:

```shell
$ mp planning:data-plans:update --dataPlanId=XXXXX --dataPlanFile=/path/to/dataplan/file
```

To create a Data Plan Version, simply use `mp planning:data-plan-versions:update` and pass a `dataPlanId` as a secondary flag.

#### Deleting a Data Plan and Data Plan Versions

To delete a data plan, simply pass the `dataPlanId` into the delete command.

<aside>
Deleting a Data Plan is a permanent action, and cannot be undone.
</aside>

```shell
$ mp planning:data-plans:delete --dataPlanId=XXXX
```

Deleting a Data Plan version is similar, only requiring an additional flag of `versionNumber`

```shell
$ mp planning:data-plans:delete --dataPlanId=XXXXX --versionNumber=XX
```

#### Validating agasint a Data Plan

Validating an Event Batch is a more complex task and the CLI provides flexibility by allowing validation to be done either locally or via the server, depending on your needs. Running a validation locally does not make a request on our servers, and as such is faster and ideal for a CI/CD environment.

```shell
$ mp planning:batches:validate --batch="{ // batch as string}" --dataPlanVersion="{ // data plan version as string }"
```

This will locally run your batch against a data plan version and return any validation results to the console.

This command also supports an `--outfile` flag that will write the validation results to a file in your local directory, in case you'd like to save the results for future use.

Both `batch` and `dataPlanVersion` support a `batchFile` and `dataPlanVersionFile` parameter (as well as `dataPlan`/`dataPlanFile` and `versionNumber`) options for less verbose validation commands.
