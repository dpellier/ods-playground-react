# ODS Playground React

> A production-like application in React
> using [OVH Design System](https://ovh.github.io/design-system/latest/?path=/story/ovhcloud-design-system-welcome--page)

The goal of this application is to check how ODS components are behaving in a real-like application
(are they working as expected, are they easy to use, what can be improved, ...).

The application is built on top of:
- [ODS](https://ovh.github.io/design-system/latest/?path=/story/ovhcloud-design-system-welcome--page) for the UI components
- [React Router](https://reactrouter.com/en/main) for the navigation
- [Redux](https://redux.js.org/) for the state management
- [Formik](https://formik.org/) for the form management (until ODS provides a form component)

## Run locally

### Prerequisites

You need to have NodeJS (v18+) installed on your local machine. 

### Clone the repository

```shell
git clone git@github.com:dpellier/ods-playground-react.git
cd ods-playground-react
npm i
```

### Commands

`npm start`

Start a local server with live reload enabled.

`npm run build`

Bundle the application to be production ready.

`npm run preview`

Start a local server that use the production bundled sources.
