package workflows

import (
	"dagger.io/dagger"
	"dagger.io/dagger/core"
)

dagger.#Plan & {
	actions: {
		setup: {
			pull: core.#Pull & {
				source: "node:18"
			}
			copyPackageJson: core.#Copy & {
				input: pull.output
				contents: client.filesystem.".".read.contents
				dest: "/app"
				include: [
					"decorate-angular-cli.js",
					"package-lock.json",
					"package.json",
				]
			}
			installPackages: core.#Exec & {
				input: copyPackageJson.output
				workdir: "/app"
				args: ["npm", "ci"]
			}
			installNx: core.#Exec & {
				input: installPackages.output
				workdir: "/app"
				args: ["npm", "i", "-g", "nx@latest"]
			}
			copyFiles: core.#Copy & {
				input: installNx.output
				contents: client.filesystem.".".read.contents
				dest: "/app"
				exclude: [
					"decorate-angular-cli.js",
					"package-lock.json",
					"package.json",
				]
			}
			result: core.#Exec & {
				input: copyFiles.output
				workdir: "/app"
				args: ["echo", "succeeded"]
			}
		}
		build: {
      executors: core.#Exec & {
        input: setup.result.output
        workdir: "/app"
        args: ["nx", "build", "executors", "--verbose"]
        env: NX_DAEMON: client.env.NX_DAEMON
      }
      others: core.#Exec & {
        input: build.executors.output
        workdir: "/app"
        args: [
          "nx", "run-many", "--target=build", 
          "--projects=common,components,elements,executors,schematics,schematics-x,storybook", 
          "--parallel=2"
        ]
        env: NX_DAEMON: client.env.NX_DAEMON
      }
      result: core.#Subdir & {
        input: others.output
        path: "/app/dist/libs"
      }
    }
		release: core.#Exec & {
			input: build.others.output
			workdir: "/app"
			args: ["npx", "semantic-release"]
			env: {
				GITHUB_TOKEN: client.env.GITHUB_TOKEN
				GITHUB_ACTIONS: client.env.GITHUB_ACTIONS
				GITHUB_EVENT_PATH: client.env.GITHUB_EVENT_PATH
				GITHUB_EVENT_NAME: client.env.GITHUB_EVENT_NAME
				GITHUB_REF: client.env.GITHUB_REF
				GITHUB_REPOSITORY: client.env.GITHUB_REPOSITORY
				GITHUB_RUN_ID: client.env.GITHUB_RUN_ID
				GITHUB_SHA: client.env.GITHUB_SHA
				GITHUB_WORKSPACE: client.env.GITHUB_WORKSPACE
			}
		}
    publish: {
      updatePackageJson: core.#Exec & {
        input: release.output
        workdir: "/app"
        args: ["npm", "run", "scripts:set-package-versions", "$(git describe --tags --abbrev=0 --always)"]
      }
			loginNpm: core.#WriteFile & {
				input: publish.updatePackageJson.output
				path: "/root/.npmrc"
				contents: """
				//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}
				registry=https://registry.npmjs.org/
				always-auth=true
				"""
			}
      publishNPM: core.#Exec & {
        input: publish.loginNpm.output
        workdir: "/app"
        args: ["npm", "run", "publish:all"]
        env: NODE_AUTH_TOKEN: client.env.NODE_AUTH_TOKEN
				always: true
      }
    }
		buildStatic: {
			npmLinkAll: core.#Exec & {
				input: build.others.output
				workdir: "/app"
				args: ["npm", "run", "link:all"]
			}
			npmLinkExecutors: core.#Exec & {
				input: buildStatic.npmLinkAll.output
				workdir: "/app"
				args: ["npm", "link", "@ng-atomic/executors"]
			}
			npmLinkElements: core.#Exec & {
				input: buildStatic.npmLinkExecutors.output
				workdir: "/app"
				args: ["npm", "link", "@ng-atomic/elements"]
			}
			elements: core.#Exec & {
				input: buildStatic.npmLinkElements.output
				workdir: "/app"
				args: ["nx", "build-elements", "components"]
        env: NX_DAEMON: client.env.NX_DAEMON
			}
			storybook: core.#Exec & {
				input: buildStatic.elements.output
				workdir: "/app"
				args: ["nx", "build-storybook", "components"]
        env: {
					NX_DAEMON: client.env.NX_DAEMON
					NODE_OPTIONS: "--max-old-space-size=4096"
				}
				always: true
			}
			createIndexHtml: core.#WriteFile & {
				input: storybook.output
				path: "/app/dist/static/index.html"
				contents: """
				<html></html>
				"""
			}
			result: core.#Subdir & {
        input: createIndexHtml.output
        path: "/app/dist/static"
      }
		}
		deploy: {
			npmLinkExecutors: core.#Exec & {
				input: buildStatic.createIndexHtml.output
				workdir: "/app"
				args: ["npm", "link", "@ng-atomic/executors"]
			}
			run: core.#Exec & {
				input: deploy.npmLinkExecutors.output
				workdir: "/app"
				args: ["nx", "deploy", "components", "--noSilent"]
				env: {
					GITHUB_TOKEN: client.env.GITHUB_TOKEN
					NX_DAEMON: client.env.NX_DAEMON
					GIT_SSH_COMMAND: "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
				}
			}
		}
	}
	client: {
		env: {
			GITHUB_TOKEN: dagger.#Secret
			GITHUB_ACTIONS: string | *"false"
			GITHUB_EVENT_PATH: string | *""
			GITHUB_EVENT_NAME: string | *""
			GITHUB_REF: string | *"refs/heads/main"
			GITHUB_REPOSITORY: string | *""
			GITHUB_RUN_ID: string | *""
			GITHUB_SHA: string | *""
			GITHUB_WORKSPACE: string | *""
      NODE_AUTH_TOKEN: dagger.#Secret
			NX_CONFIGURATION: string | *"production"
      NX_DAEMON: string | *"false"
		}
		filesystem: {
			".": read: {
				contents: dagger.#FS
				include: [
					".git",
          ".storybook",
					"apps",
          "docs",
          "scripts",
					"libs",
					"tools",
					"decorate-angular-cli.js",
					"firebase.json",
					"jest.config.js",
					"jest.preset.js",
					"nx.json",
					"package-lock.json",
					"package.json",
					"tsconfig.base.json",
					"workspace.json"
				]
			}
			"./dist/libs": write: contents: actions.build.result.output
			"./dist/static": write: contents: actions.buildStatic.result.output
		}
	}
}